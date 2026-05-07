# 🚀 خطوات نشر الـ Website على GitHub Pages

> **سعيد** — كل حاجة جاهزة. محتاج بس **خطوة واحدة من جانبك** لإكمال الـ deploy (login على GitHub).

---

## ⚡ Quick Deploy (أسهل طريقة)

افتح PowerShell في فولدر `rs-sales` وشغّل:

```powershell
cd "c:\Users\pc\Documents\claude\rs-sales"
.\deploy.ps1 -Mode first-time
```

السكريبت هيعمل تلقائياً:
1. ✅ Build الـ MkDocs site
2. ✅ git init + commit
3. 🔐 **GitHub login** (هيفتحلك browser تـ login بحسابك Performancepsycho)
4. ✅ ينشئ repo private اسمه `rs-sales-playbook`
5. ✅ يـ push كل المحتوى
6. ✅ يـ deploy على GitHub Pages

---

## 🌐 الـ Link

بعد أول deploy ناجح:

**🔗 https://performancepsycho.github.io/rs-sales-playbook/**

(GitHub Pages بياخد 2-5 دقايق يبقى live أول مرة)

---

## ⚠️ مهم: GitHub Pages مع Private Repo

GitHub Free plan **لا يدعم** Pages لـ Private repos.

عندك خيارين:

### Option A: ترقية لـ GitHub Pro ($4/شهر)
1. روح [github.com/settings/billing/plans](https://github.com/settings/billing/plans)
2. Upgrade لـ Pro
3. الـ Pages هيشتغل تلقائياً
4. الـ repo يفضل private + الـ link يفتح للـ public

### Option B: خلي الـ repo Public بدلاً من Private
1. عدل في `deploy.ps1`: غير `--private` لـ `--public`
2. السكريبت هيعمل repo public + Pages مجاناً
3. **بس** الكود هيكون visible لأي حد بـ search

**التوصية:** ابدأ بـ Public + اضف noindex.js اللي عملته (يمنع Google من فهرسته). لو لاحظت المنافسين بيدخلوا، ترقّى لـ Pro.

---

## 🔄 لإحدثات لاحقة (بعد أول deploy)

```powershell
.\deploy.ps1
```

(بدون `-Mode first-time`) — يـ build + commit + push + deploy في خطوة واحدة.

---

## 🛠️ Troubleshooting

### مشكلة: "GitHub login فشل"
**الحل:** افتح browser على [github.com](https://github.com) وتأكد إنك logged in بـ Performancepsycho، وبعدها شغّل السكريبت تاني.

### مشكلة: "mkdocs مش موجود"
**الحل:**
```powershell
pip install mkdocs-material
```

### مشكلة: "GitHub Pages مش بيشتغل بعد deploy"
**الحل:**
1. روح [github.com/Performancepsycho/rs-sales-playbook/settings/pages](https://github.com/Performancepsycho/rs-sales-playbook/settings/pages)
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** / Folder: **/ (root)**
4. Save
5. استنى 2-5 دقايق

---

## 📊 ايه اللي اتعمل في الـ Playbook

✅ **7 ورش كاملة** بـ scripts:
- 📘 المحاسب المالي (3 angles × 7 stages)
- 📗 المحاسب الشامل (3 angles × 7 stages)
- 📕 خبير الضرائب (3 angles × 7 stages)
- 📙 Odoo Accounting (3 angles × 7 stages)
- 📓 هندسة التكاليف (3 angles × 7 stages)
- 📔 التحليل المالي (3 angles × 7 stages)
- 📒 المدير المالي CFO (3 angles × 7 stages)

**= 21 angle × 7 stages × 2 channels (واتساب + كول) = ~294 سكريبت**

✅ **Anti-patterns** لكل angle
✅ **Quick Decision Trees** للسيلز
✅ **Quick Reference Cards** قابلة للحفظ
✅ **Custom MkDocs theme** مع RTL + dark mode + Cairo font
