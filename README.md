# ServicePro - Master Tile & Marble Flooring Contractor Template
### Niche: Tile & Marble Flooring Contractor | Commercial HTML5 Template

**ServicePro** is a modern, high-converting, fully responsive HTML5/CSS3/ES6+ website template crafted specifically for tile, Italian marble, granite, and stone flooring contractors, artisans, interior architects, and construction service businesses.

Engineered to meet the strict commercial release standards of marketplaces such as **ThemeForest** and **TemplateMonster**.

---

## 🌟 Key Highlights & Features

- **Bootstrap 5.3.3**: Built with the latest stable Bootstrap core, modular utilities, and semantic HTML5.
- **Persistent Dark & Light Mode**: Real-time theme switching using CSS custom properties (`:root` & `[data-bs-theme="dark"]`) and browser `localStorage` persistence.
- **Icon-Only RTL / LTR Direction Switcher**: Dedicated `<button class="dir-toggle-btn">` switching document direction seamlessly between Left-to-Right and Right-to-Left.
- **Streamlined Navigation with Unique Home Showcase Dropdown**: Top navigation links: **Home ▾** (with dropdown switching between **Luxury Stone Showcase** and **Contractor Pro & Estimator**), **About Us**, **Services**, **Pricing**, **Blog**, and **Contact**, delivering an intuitive user experience without cluttered "Pages" dropdowns.
- **Dedicated Pricing & Specification Page (`pricing.html`)**: Fully featured page incorporating:
  - 3-Tier Investment Plans (Standard Residential at $24/sq ft, Architectural Luxury at $38/sq ft, Estate & Commercial Custom).
  - Quick Interactive Estimator Banner linking directly to the live cost calculator.
  - Comprehensive Specification Matrix table comparing material sizes, underlayment systems, joint tolerances, and warranties.
  - Transparent 4-Stage Payment Milestone Policy (20% deposit, 30% delivery, 30% subfloor, 20% final punch list).
  - Interactive Pricing & Contracting FAQ Accordion.
- **Unified Services Hub (`services.html`)**: Single comprehensive page incorporating:
  - 6-specialty stone catalog with Grid / List layout switcher.
  - Architectural craftsmanship & deflection engineering standards.
  - 4-Stage Precision Installation Protocol (Substrate analysis, dry-lay, leveling bedding, diamond buffing).
  - 3-Tier Investment & Material Comparison Table.
  - Interactive Stone Care & Installation FAQ Accordion.
  - Interactive Quick-Specs Modal with live ANSI mortar classes and tolerances.
- **Unified Blog & Knowledge Hub (`blog.html`)**: Single comprehensive page incorporating:
  - In-depth featured masterclass guide (*Preventing Acid Etching on Calacatta Marble* by Matteo Rossi).
  - Stone Chemistry Comparison Matrix (Calacatta vs. Granite vs. Porcelain).
  - Client Discussion Q&A thread and interactive inquiry submission form.
  - Filterable article archive with instant search and category pills.
  - Interactive Article Quick-Reader Modal.
- **Interactive Tile & Marble Cost Calculator (`home-contractor.html`)**: Live material estimator allowing users to adjust square footage, choose from 6 stone varieties, surface finishes, and pattern cuts to calculate labor, material, and turnaround days in real time.
- **Specialized Division Specification Pages (`service-*.html`)**: Dedicated technical specification pages for Italian Marble, Large Porcelain Slabs, Diamond Honing, Granite Slabs, Custom Mosaics, and Commercial Flooring.

---

## 📂 File Structure

```text
Tile and marble/
├── index.html                  # Layout 1: Luxury Stone Showcase (Architectural Gallery & Residential)
├── home-contractor.html        # Layout 2: Contractor Pro & Estimator (Live Calculator & Trade Specs)
├── about.html                  # About Us: 1998-2026 Timeline & Leadership
├── services.html               # All-in-One Services: Catalog, 4-Stage Protocol, Pricing Tiers, FAQ & Quick Specs Modal
├── blog.html                   # All-in-One Blog Hub: Search, Category Filters, Chemistry Guide, Q&A & Reader Modal
├── contact.html                # Contact Us: Quote Form & Interactive Map
├── pricing.html                # Pricing: Tier Packages & Feature Comparison Matrix
├── service-marble.html         # Division Specs: Italian Marble Installation & Bookmatching
├── service-porcelain.html      # Division Specs: Large-Format Porcelain Panels
├── service-honing.html         # Division Specs: Dustless Diamond Honing & Restoration
├── service-granite.html        # Division Specs: Granite & Engineered Quartz Slabs
├── service-mosaic.html         # Division Specs: Herringbone, Chevron & Custom Mosaics
├── service-commercial.html     # Division Specs: Commercial & Hotel Lobby Flooring
├── service-details.html        # Division Specs: Architectural Craftsmanship & Protocols
├── coming-soon.html            # Maintenance: Live JS Countdown Timer
├── 404.html                    # Error 404: Stone Slab Not Found
├── README.md                   # Complete Documentation & Customization Guide
└── assets/
    ├── css/
    │   └── style.css           # Global Theme & Component Stylesheet
    ├── js/
    │   └── main.js             # Theme Switcher, RTL Toggle, Quick Specs Modal, Article Reader Modal & Interactivity
    └── images/
        ├── logo.png                                # Official Transparent Brand Logo (High-Res, Multi-Surface Adaptive)
        ├── logo.jpg                                # Original Brand Logo (Marblon Tile & Marble Studio)
        ├── Italian Marble Installation.jpg         # Core Service 1 Image
        ├── Large-Format Porcelain Slabs.jpg        # Core Service 2 Image
        ├── Custom Granite & Quartz Slabs.jpg       # Core Service 3 Image
        ├── Diamond Honing & Restoration.jpg        # Core Service 4 Image
        ├── Custom Mosaics & Herringbone.jpg        # Core Service 5 Image
        ├── Commercial & Hotel Flooring.jpg         # Core Service 6 Image
        ├── Calacatta Grand Foyer.jpg               # Portfolio 1: Primary Image
        ├── Calacatta Grand Foyer.jpeg              # Portfolio 1: Alternate View Image
        ├── SoHo Loft Seamless Master Wetroom.jpg   # Portfolio 2: Primary Image
        ├── Italian Marble kitchen.jpg              # Portfolio 3: Primary Image
        ├── Italian Marble kitchen2.jpg             # Portfolio 3: Alternate View Image
        ├── Granite & Counters dinning.jpg          # Portfolio 4: Primary Image
        ├── Granite & Counters dinning1.jpg         # Portfolio 4: Alternate View Image
        ├── Commercial Lobbies carlton.jpg          # Portfolio 5: Primary Image
        ├── Commercial Lobbies carlton1.jpg         # Portfolio 5: Alternate View Image
        ├── Porcelain Slabs1.jpg                    # Portfolio 6: Primary Image
        └── Porcelain Slabs2.jpg                    # Portfolio 6 & 2: Alternate View Image
```

---

## 🎨 Color Palette & CSS Variables (10-Shade Earthy Travertine & Olive System)

The design system incorporates the 10-shade architectural earth, terracotta, travertine, and olive slate palette extracted directly from stone quarry tones:

| Swatch # | Hex Code | Tone Description | Role in Theme |
|---|---|---|---|
| 1 | `#582f0e` | Deep Terracotta Brown | Primary Hover / Deep Accents |
| 2 | `#7f4f24` | Warm Sienna / Amber Travertine | Primary Brand Color (Light Theme) |
| 3 | `#936639` | Warm Sandstone / Polished Ochre | Secondary Accents & Badges |
| 4 | `#a68a64` | Travertine Sand / Golden Earth | Primary Brand Color (Dark Theme) |
| 5 | `#b6ad90` | Muted Sand / Antique Cream | Light Borders & Subtle Dark Text |
| 6 | `#c2c5aa` | Pale Sage Mist / Celadon Carrara | Soft Badges & High-Contrast Light Muted |
| 7 | `#a4ac86` | Sage Green Moss | Muted Secondary Highlights |
| 8 | `#656d4a` | Olive Drab Moss | Accent Surfaces & Outlines |
| 9 | `#414833` | Dark Hunter Olive | Secondary Hover & Card Slate |
| 10 | `#333d29` | Midnight Forest Olive | Navbar Background & Footer Background |

---

## 🚀 How to Run & Preview

1. Open `index.html` or `services.html` directly in any web browser (Chrome, Firefox, Edge, Safari).
2. Toggle between **Dark Mode** and **Light Mode** using the moon/sun icon button in the navbar.
3. Toggle between **RTL** and **LTR** layout modes using the icon-only direction button in the navbar.
4. Visit `services.html` to explore the Grid/List view toggle, the 4-Stage Precision Protocol, the 3-Tier Investment Matrix, the Technical FAQ Accordion, and click **Full Specs** to trigger the interactive Quick-Specs Modal.
5. Visit `blog.html` to review the featured masterclass guide, stone chemistry table, client discussion Q&A, and test the live search and category filter.
6. Open `home-contractor.html` to test the interactive square-footage cost calculator.
7. Open `service-marble.html` (or any `service-*.html`) to inspect the dedicated division technical specifications.

---

## 📄 License & Release Notes

Commercial-grade template prepared for ThemeForest / Envato Market release. W3C-valid HTML5, WCAG AAA compliant text contrast, clean vanilla ES6+ JavaScript, and mobile-first responsive architecture.
