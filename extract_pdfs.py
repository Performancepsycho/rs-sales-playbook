"""Extract text from workshop PDFs using OCR (Tesseract).
PDFs are image-based — pure text extraction won't work, OCR is required.
"""
import os
import sys
from pathlib import Path
import io

import fitz  # PyMuPDF
import pytesseract
from PIL import Image

# Configure Tesseract paths
TESSERACT_CMD = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
TESSDATA_DIR = os.path.expanduser("~/tessdata")

pytesseract.pytesseract.tesseract_cmd = TESSERACT_CMD
os.environ["TESSDATA_PREFIX"] = TESSDATA_DIR

PDFS_DIR = Path(r"c:\Users\pc\Documents\claude\rs-hero\06_KNOWLEDGE\courses")
OUTPUT_DIR = Path(r"c:\Users\pc\Documents\claude\rs-sales\pdf_extracts")
OUTPUT_DIR.mkdir(exist_ok=True)


def extract_pdf(pdf_path: Path) -> str:
    """Extract text from a PDF using OCR (Arabic + English)."""
    print(f"  Opening: {pdf_path.name}")
    doc = fitz.open(str(pdf_path))
    print(f"  Pages: {len(doc)}")

    all_text = []
    for page_num, page in enumerate(doc, 1):
        # Try direct text extraction first (faster)
        direct_text = page.get_text().strip()

        if direct_text and len(direct_text) > 50:
            # Page has real text — use it
            all_text.append(f"=== Page {page_num} (text) ===\n{direct_text}")
            print(f"    Page {page_num}: text extraction ({len(direct_text)} chars)")
            continue

        # Fall back to OCR (page is image-based)
        # Render page as high-res image
        pix = page.get_pixmap(dpi=300)
        img_data = pix.tobytes("png")
        img = Image.open(io.BytesIO(img_data))

        # OCR with Arabic + English
        try:
            ocr_text = pytesseract.image_to_string(
                img,
                lang="ara+eng",
                config='--psm 3'
            ).strip()
            all_text.append(f"=== Page {page_num} (OCR) ===\n{ocr_text}")
            print(f"    Page {page_num}: OCR extracted ({len(ocr_text)} chars)")
        except Exception as e:
            print(f"    Page {page_num}: OCR failed - {e}")
            all_text.append(f"=== Page {page_num} (FAILED) ===\n[OCR failed: {e}]")

    doc.close()
    return "\n\n".join(all_text)


def main():
    if not PDFS_DIR.exists():
        print(f"ERROR: PDFs dir not found: {PDFS_DIR}")
        sys.exit(1)

    pdfs = list(PDFS_DIR.glob("*.pdf"))
    print(f"Found {len(pdfs)} PDFs in {PDFS_DIR}\n")

    # Filter to a single PDF if argument provided (for testing)
    if len(sys.argv) > 1:
        target = sys.argv[1]
        pdfs = [p for p in pdfs if target in p.name]
        if not pdfs:
            print(f"No PDF matching '{target}' found")
            sys.exit(1)

    for pdf in pdfs:
        print(f"\n{'='*60}\nProcessing: {pdf.name}\n{'='*60}")
        try:
            text = extract_pdf(pdf)
            output_file = OUTPUT_DIR / f"{pdf.stem}.txt"
            output_file.write_text(text, encoding="utf-8")
            print(f"  [OK] Saved: {output_file.name} ({len(text):,} chars)")
        except Exception as e:
            print(f"  [ERR] {pdf.name}: {e}")

    print(f"\n\nDone. Extracts saved to: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
