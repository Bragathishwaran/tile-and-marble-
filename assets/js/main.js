/**
 * ServicePro - Master Tile & Marble Flooring Contractor Template
 * Main Client & Frontend JavaScript
 * Vanilla ES6+ - Theme Switching, RTL/LTR Direction, Calculator, Filters, Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------
     1. THEME SWITCHER (DARK & LIGHT MODE PERSISTENCE)
     -------------------------------------------------- */
  const THEME_KEY = 'servicepro_theme';
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');

  const getPreferredTheme = () => {
    const storedTheme = localStorage.getItem(THEME_KEY);
    if (storedTheme) return storedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    themeToggleBtns.forEach((btn) => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'fas fa-sun text-warning';
          btn.setAttribute('title', 'Switch to Light Mode');
          btn.setAttribute('aria-label', 'Switch to Light Mode');
        } else {
          icon.className = 'fas fa-moon text-secondary';
          btn.setAttribute('title', 'Switch to Dark Mode');
          btn.setAttribute('aria-label', 'Switch to Dark Mode');
        }
      }
    });

    // Notify custom event for charts or dynamic components
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
  };

  // Initialize theme on page load
  const currentTheme = getPreferredTheme();
  setTheme(currentTheme);

  // Attach click listeners to all theme buttons
  themeToggleBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const activeTheme = document.documentElement.getAttribute('data-bs-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  });

  /* --------------------------------------------------
     2. RTL & LTR DIRECTION TOGGLE WITH PERSISTENCE
     -------------------------------------------------- */
  const DIR_KEY = 'servicepro_dir';
  const dirToggleBtns = document.querySelectorAll('.dir-toggle-btn');

  const getPreferredDirection = () => {
    const storedDir = localStorage.getItem(DIR_KEY);
    if (storedDir) return storedDir;
    return document.documentElement.getAttribute('dir') || 'ltr';
  };

  const setDirection = (dir) => {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem(DIR_KEY, dir);

    dirToggleBtns.forEach((btn) => {
      if (dir === 'rtl') {
        btn.setAttribute('title', 'Switch to Left-to-Right (LTR)');
        btn.setAttribute('aria-label', 'Switch to Left-to-Right (LTR)');
        btn.classList.add('active');
      } else {
        btn.setAttribute('title', 'Switch to Right-to-Left (RTL)');
        btn.setAttribute('aria-label', 'Switch to Right-to-Left (RTL)');
        btn.classList.remove('active');
      }
    });

    window.dispatchEvent(new CustomEvent('directionChanged', { detail: { dir } }));
  };

  // Initialize direction on load
  const currentDir = getPreferredDirection();
  setDirection(currentDir);

  // Attach click listeners to RTL/LTR buttons
  dirToggleBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const activeDir = document.documentElement.getAttribute('dir') || 'ltr';
      const newDir = activeDir === 'rtl' ? 'ltr' : 'rtl';
      setDirection(newDir);
    });
  });

  /* --------------------------------------------------
     3. NAVBAR SCROLL EFFECT & BACK-TO-TOP
     -------------------------------------------------- */
  const navbar = document.querySelector('.sp-navbar');
  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (navbar) {
      if (scrollPos > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollPos > 350) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --------------------------------------------------
     3.1 SMOOTH NAVBAR DROPDOWN STABILITY
     -------------------------------------------------- */
  const dropdownToggles = document.querySelectorAll('.sp-navbar .dropdown-toggle');
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth >= 992 && toggle.getAttribute('href') === '#') {
        e.preventDefault();
      }
    });
  });

  /* --------------------------------------------------
     4. NUMERIC COUNTERS (INTERSECTION OBSERVER)
     -------------------------------------------------- */
  const counterElements = document.querySelectorAll('.counter-number[data-target]');
  if (counterElements.length > 0) {
    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const duration = 2000;
      const stepTime = 20;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.innerText = target.toLocaleString();
          clearInterval(timer);
        } else {
          el.innerText = Math.floor(current).toLocaleString();
        }
      }, stepTime);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counterElements.forEach((el) => counterObserver.observe(el));
  }

  /* --------------------------------------------------
     5. PORTFOLIO & GALLERY FILTER
     -------------------------------------------------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach((item) => {
          if (filterValue === 'all' || item.classList.contains(filterValue)) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  /* Portfolio Card Touch & Click Alternate Image Toggle */
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  portfolioCards.forEach((card) => {
    const altBadge = card.querySelector('.portfolio-alt-badge');
    const primaryImg = card.querySelector('.portfolio-img-primary');
    const altImg = card.querySelector('.portfolio-img-alt');

    if (altBadge && primaryImg && altImg) {
      altBadge.style.pointerEvents = 'auto';
      altBadge.addEventListener('click', (e) => {
        e.stopPropagation();
        const isAlt = altImg.classList.contains('active-alt');
        if (isAlt) {
          altImg.classList.remove('active-alt');
          altImg.style.opacity = '0';
          primaryImg.style.opacity = '1';
          altBadge.innerHTML = '<i class="fas fa-camera-rotate me-1"></i> Alternate View';
        } else {
          altImg.classList.add('active-alt');
          altImg.style.opacity = '1';
          primaryImg.style.opacity = '0';
          altBadge.innerHTML = '<i class="fas fa-check me-1"></i> Primary View';
        }
      });
    }
  });

  /* --------------------------------------------------
     6. SERVICES VIEW TOGGLE (GRID VS LIST)
     -------------------------------------------------- */
  const gridViewBtn = document.getElementById('viewGridBtn');
  const listViewBtn = document.getElementById('viewListBtn');
  const servicesContainer = document.getElementById('servicesContainer');

  if (gridViewBtn && listViewBtn && servicesContainer) {
    gridViewBtn.addEventListener('click', () => {
      gridViewBtn.classList.add('btn-gold');
      gridViewBtn.classList.remove('btn-outline-secondary');
      listViewBtn.classList.remove('btn-gold');
      listViewBtn.classList.add('btn-outline-secondary');

      servicesContainer.classList.remove('list-view');
      servicesContainer.classList.add('row', 'g-4');
      const cards = servicesContainer.querySelectorAll('.service-card-item');
      cards.forEach((card) => {
        card.className = 'service-card-item col-lg-4 col-md-6';
      });
    });

    listViewBtn.addEventListener('click', () => {
      listViewBtn.classList.add('btn-gold');
      listViewBtn.classList.remove('btn-outline-secondary');
      gridViewBtn.classList.remove('btn-gold');
      gridViewBtn.classList.add('btn-outline-secondary');

      servicesContainer.classList.add('list-view');
      servicesContainer.classList.remove('row');
      const cards = servicesContainer.querySelectorAll('.service-card-item');
      cards.forEach((card) => {
        card.className = 'service-card-item col-12 mb-4';
      });
    });
  }

  /* --------------------------------------------------
     7. TILE & MARBLE MATERIAL & COST CALCULATOR
     -------------------------------------------------- */
  const calcForm = document.getElementById('flooringCalculatorForm');
  if (calcForm) {
    const areaInput = document.getElementById('calcArea');
    const areaValDisplay = document.getElementById('calcAreaDisplay');
    const materialSelect = document.getElementById('calcMaterial');
    const finishSelect = document.getElementById('calcFinish');
    const patternSelect = document.getElementById('calcPattern');
    const subfloorCheck = document.getElementById('calcSubfloor');

    // Display Result Elements
    const resTotal = document.getElementById('calcResTotal');
    const resMaterialCost = document.getElementById('calcResMaterial');
    const resLaborCost = document.getElementById('calcResLabor');
    const resDays = document.getElementById('calcResDays');
    const resWasteTile = document.getElementById('calcResWaste');

    const updateCalculator = () => {
      const area = parseFloat(areaInput.value) || 0;
      if (areaValDisplay) areaValDisplay.textContent = `${area} sq ft`;

      const materialBaseRate = parseFloat(materialSelect.value) || 15;
      const finishMultiplier = parseFloat(finishSelect.value) || 1.0;
      const patternWastePercent = parseFloat(patternSelect.value) || 0.10;
      const needsSubfloor = subfloorCheck && subfloorCheck.checked ? 3.50 : 0;

      // Calculation Breakdown
      const grossArea = area * (1 + patternWastePercent);
      const materialCost = grossArea * (materialBaseRate * finishMultiplier);
      const installationLaborRate = 9.50;
      const laborCost = area * (installationLaborRate + needsSubfloor);
      const totalEstimated = materialCost + laborCost;

      const days = Math.max(1, Math.ceil(area / 180));

      if (resTotal) resTotal.textContent = `$${Math.round(totalEstimated).toLocaleString()}`;
      if (resMaterialCost) resMaterialCost.textContent = `$${Math.round(materialCost).toLocaleString()}`;
      if (resLaborCost) resLaborCost.textContent = `$${Math.round(laborCost).toLocaleString()}`;
      if (resDays) resDays.textContent = `${days}-${days + 1} Days`;
      if (resWasteTile) resWasteTile.textContent = `${Math.round(grossArea)} sq ft (incl. ${Math.round(patternWastePercent * 100)}% cuts)`;
    };

    [areaInput, materialSelect, finishSelect, patternSelect].forEach((input) => {
      if (input) {
        input.addEventListener('input', updateCalculator);
        input.addEventListener('change', updateCalculator);
      }
    });

    if (subfloorCheck) {
      subfloorCheck.addEventListener('change', updateCalculator);
    }

    updateCalculator();
  }

  /* --------------------------------------------------
     8. INTERACTIVE QUOTE & CONTACT FORM VALIDATION
     -------------------------------------------------- */
  const quoteForms = document.querySelectorAll('.needs-validation');
  quoteForms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (!form.checkValidity()) {
        form.classList.add('was-validated');
      } else {
        form.classList.remove('was-validated');
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending Inquiry...';
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-check-circle me-2"></i> Quote Request Sent!';
            submitBtn.classList.remove('btn-gold');
            submitBtn.classList.add('btn-success');
          }

          alert('Thank you! Your flooring quote request has been received. Our stone specialist will contact you within 24 hours with a comprehensive estimate.');

          form.reset();

          setTimeout(() => {
            if (submitBtn) {
              submitBtn.innerHTML = originalText;
              submitBtn.classList.add('btn-gold');
              submitBtn.classList.remove('btn-success');
            }
          }, 4000);
        }, 1200);
      }
    });
  });

  /* --------------------------------------------------
     9. COMING SOON COUNTDOWN TIMER
     -------------------------------------------------- */
  const countdownEl = document.getElementById('launchCountdown');
  if (countdownEl) {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 45);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance < 0) {
        clearInterval(timer);
        countdownEl.innerHTML = '<h3 class="text-success">Grand Showroom Opening Today!</h3>';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const dEl = document.getElementById('countDays');
      const hEl = document.getElementById('countHours');
      const mEl = document.getElementById('countMinutes');
      const sEl = document.getElementById('countSeconds');

      if (dEl) dEl.textContent = String(days).padStart(2, '0');
      if (hEl) hEl.textContent = String(hours).padStart(2, '0');
      if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
      if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
    }, 1000);
  }

  /* --------------------------------------------------
     10. SERVICES QUICK-SPECS MODAL HANDLER
     -------------------------------------------------- */
  const serviceSpecData = {
    marble: {
      title: "Italian Marble Installation & Vein Bookmatching",
      badge: "Natural Stone Division",
      mortar: "ANSI A118.15 Ultra-High Performance Modified Polymer Thin-Set",
      tolerance: "Lippage < 1/32\" (0.8mm) using mechanical tension clips",
      underlayment: "Schluter-DITRA uncoupling membrane with L/720 deflection verification",
      sealer: "Nano-fluoropolymer penetrating impregnator (oil & acid repelling)",
      warranty: "25-Year Master Installation Guarantee",
      description: "Our certified marble guild handles Calacatta Borghini, Statuario, and Bianco Carrara slabs. Each room layout is 3D digitized and dry-laid in our warehouse before on-site installation to ensure vein continuity and bookmatch alignment across thresholds and waterfall miter edges."
    },
    porcelain: {
      title: "Large-Format Sintered Porcelain Panels (5x10 ft)",
      badge: "Slab Panels Division",
      mortar: "Zero-slump crystalline high-tack polymer adhesive",
      tolerance: "True flush seam tolerance with vacuum levelers",
      underlayment: "Vapor-impermeable waterproof substrate with anti-fracture backing",
      sealer: "Zero sealing required (inherently non-porous sintered surface)",
      warranty: "Lifetime Panel Integrity & Delamination Warranty",
      description: "Rigged and placed using aerospace vacuum suction lifters. Perfect for floor-to-ceiling seamless shower enclosures, master wetrooms, and contemporary kitchen statement islands with zero grout lines to clean."
    },
    honing: {
      title: "Dustless Diamond Honing & Stone Restoration",
      badge: "Restoration Division",
      mortar: "Color-matched polyester resin joint repair & consolidation",
      tolerance: "Mirror planar leveling (100% lippage eradication)",
      underlayment: "Existing stone surface inspection and moisture equilibrium testing",
      sealer: "Multi-stage penetrant with deep poultice oil extraction",
      warranty: "5-Year High-Sheen Stain Resistance Plan",
      description: "Our specialized planetary wet diamond machines grind away acid etch rings, pet marks, and deep scratches under continuous HEPA slurry containment. No airborne dust or volatile organic compounds enter your living spaces."
    },
    granite: {
      title: "Granite & Engineered Quartz Slab Fabrication",
      badge: "Architectural Hardstone",
      mortar: "Epoxy-modified heavy stone bonding compound",
      tolerance: "CNC waterjet 1/64\" precision miters and seam joins",
      underlayment: "Structural reinforced plywood substrate with steel flat-bar stiffeners",
      sealer: "Siloxane deep penetrant for outdoor thermal flamed or indoor polished slabs",
      warranty: "20-Year Structural & Seam Warranty",
      description: "Heavy-duty exterior pavers and interior luxury countertops. Resists extreme temperatures, heavy impact, and commercial foot-traffic without fading or micro-fracturing."
    },
    mosaic: {
      title: "Herringbone, Chevron & Hand-Cut Mosaics",
      badge: "Artisan Mosaic Division",
      mortar: "Non-sag smooth white latex-modified thinset",
      tolerance: "Zero pattern drift across 45° and 90° intersections",
      underlayment: "Self-leveling cement underlayment with crack-isolation sheet",
      sealer: "Breathable fluorochemical protector with anti-fungal additive",
      warranty: "15-Year Artisan Craftsmanship Warranty",
      description: "Hand-arranged statement patterns with brass, bronze, and copper transition inlays. Laser-projected reference centerlines ensure pristine symmetry from entrance doors to hearth walls."
    },
    commercial: {
      title: "Commercial & Hotel Lobby Flooring",
      badge: "Commercial Contracts",
      mortar: "Heavy dynamic load ANSI A118.4 fast-setting mortar system",
      tolerance: "ADA compliant slip-resistance coefficient > 0.60 DCOF",
      underlayment: "Fast-curing moisture mitigation epoxy barrier up to 100% RH",
      sealer: "High-traffic commercial silicone impregnator",
      warranty: "10-Year Commercial Traffic Warranty",
      description: "Turnkey installations with dedicated night and weekend shifts for zero operational downtime. Certified OSHA-30 supervisors oversee full compliance with commercial building codes and ADA standards."
    }
  };

  const specButtons = document.querySelectorAll('.view-spec-btn');
  const specModalEl = document.getElementById('serviceQuickSpecsModal');
  const specTitle = document.getElementById('serviceSpecsTitle');
  const specContent = document.getElementById('serviceSpecsContent');

  if (specButtons.length > 0 && specModalEl && window.bootstrap) {
    const specModal = new bootstrap.Modal(specModalEl);

    specButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const serviceKey = btn.getAttribute('data-service') || 'marble';
        const data = serviceSpecData[serviceKey] || serviceSpecData.marble;

        if (specTitle) specTitle.textContent = data.title;
        if (specContent) {
          specContent.innerHTML = `
            <div class="mb-3">
              <span class="badge badge-gold-subtle mb-2">${data.badge}</span>
              <p class="text-muted leading-relaxed">${data.description}</p>
            </div>
            <div class="table-responsive">
              <table class="table table-bordered align-middle">
                <tbody>
                  <tr>
                    <td class="fw-bold bg-surface-alt" style="width: 32%;">Adhesive / Mortar Class</td>
                    <td>${data.mortar}</td>
                  </tr>
                  <tr>
                    <td class="fw-bold bg-surface-alt">Installation Tolerance</td>
                    <td>${data.tolerance}</td>
                  </tr>
                  <tr>
                    <td class="fw-bold bg-surface-alt">Underlayment System</td>
                    <td>${data.underlayment}</td>
                  </tr>
                  <tr>
                    <td class="fw-bold bg-surface-alt">Surface Sealing Protocol</td>
                    <td>${data.sealer}</td>
                  </tr>
                  <tr>
                    <td class="fw-bold bg-surface-alt">Warranty Standard</td>
                    <td><span class="badge bg-success">${data.warranty}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          `;
        }

        specModal.show();
      });
    });
  }

  /* --------------------------------------------------
     11. BLOG FILTER & SEARCH LOGIC
     -------------------------------------------------- */
  const blogSearchInput = document.getElementById('blogSearchInput');
  const blogCategoryFilters = document.querySelectorAll('#blogCategoryFilters .filter-pill');
  const blogItems = document.querySelectorAll('.blog-item');

  if (blogItems.length > 0) {
    let activeCategory = 'all';
    let searchQuery = '';

    const applyBlogFilters = () => {
      blogItems.forEach((item) => {
        const itemCat = item.getAttribute('data-category') || '';
        const itemText = (item.textContent + ' ' + (item.getAttribute('data-keywords') || '')).toLowerCase();

        const matchesCat = activeCategory === 'all' || itemCat === activeCategory;
        const matchesSearch = searchQuery === '' || itemText.includes(searchQuery);

        if (matchesCat && matchesSearch) {
          item.style.display = 'block';
          item.style.opacity = '1';
        } else {
          item.style.display = 'none';
        }
      });
    };

    if (blogCategoryFilters.length > 0) {
      blogCategoryFilters.forEach((btn) => {
        btn.addEventListener('click', () => {
          blogCategoryFilters.forEach((b) => {
            b.classList.remove('btn-gold', 'active');
            b.classList.add('btn-outline-secondary');
          });
          btn.classList.add('btn-gold', 'active');
          btn.classList.remove('btn-outline-secondary');

          activeCategory = btn.getAttribute('data-filter') || 'all';
          applyBlogFilters();
        });
      });
    }

    if (blogSearchInput) {
      blogSearchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        applyBlogFilters();
      });
    }
  }

  /* --------------------------------------------------
     12. BLOG ARTICLE QUICK-READER MODAL
     -------------------------------------------------- */
  const articleModalData = {
    "2": {
      title: "Large-Format Porcelain Slabs vs. Natural Marble: An Architect's Breakdown",
      badge: "Slab Panels Division",
      readTime: "7 min read",
      author: "Matteo Rossi & Sarah Jenkins, AIA",
      date: "October 19, 2026",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
      content: `
        <p class="lead text-muted">When designing contemporary wetrooms or expansive kitchen focal points, architects face a pivotal dilemma: specify timeless authentic Italian marble, or choose modern sintered porcelain panels?</p>
        <h5 class="fw-bold mt-4">1. Flexural Strength and Slab Weight</h5>
        <p class="text-muted">6mm porcelain panels weigh merely 2.8 lbs per square foot compared to 3/4" natural marble slabs at 10.5 lbs per square foot. This drastic weight reduction allows porcelain to clad existing vertical surfaces without requiring structural foundation reinforcement.</p>
        <h5 class="fw-bold mt-4">2. Zero Absorption vs Natural Porosity</h5>
        <p class="text-muted">Porcelain is sintered at temperatures exceeding 2,200°F, creating a water absorption rate of less than 0.05%. It is virtually impervious to wine, cosmetics, hair dye, and acidic cleaners—making it an ideal candidate for master shower enclosures.</p>
        <div class="p-3 bg-surface rounded-3 border my-3">
          <strong>Artisan Recommendation:</strong> Use natural marble for formal foyers, living spaces, and fireplaces where geological depth and tactile warmth are paramount; choose large porcelain panels for high-steam curbless showers and heavy-cooking kitchen countertops.
        </div>
      `
    },
    "3": {
      title: "How Dustless Diamond Honing Restores 30-Year-Old Historic Floors",
      badge: "Restoration Division",
      readTime: "4 min read",
      author: "Matteo Rossi",
      date: "October 05, 2026",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80",
      content: `
        <p class="lead text-muted">Over decades of foot traffic, even the finest Carrara and Crema Marfil floors develop dull traffic paths, scratches, and micro-lippage. Complete slab replacement is costly and disruptive—diamond honing offers a permanent restorative alternative.</p>
        <h5 class="fw-bold mt-4">The Wet Grinding Advantage</h5>
        <p class="text-muted">Our wet planetary machines deliver constant water misting directly to industrial resin-bond diamond pads ranging from 50 to 3,000 grit. The water encapsulates all stone particles into a slurry that is continuously extracted by dual-vacuum containment. The result is zero airborne dust, restoring factory mirror gloss or a modern honed matte sheen without harming nearby furnishings or air filtration systems.</p>
      `
    },
    "4": {
      title: "Mastering French Chevron & Herringbone Layouts Without Pattern Drift",
      badge: "Design & Patterns",
      readTime: "6 min read",
      author: "Gianni Bellini, Master Mason",
      date: "September 24, 2026",
      image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1000&q=80",
      content: `
        <p class="lead text-muted">A herringbone or chevron pattern is unforgiving. A deviation of just 1/64 of an inch in the initial row compounds into a noticeable half-inch wave across a 40-foot room.</p>
        <h5 class="fw-bold mt-4">The Cardinal Rules of Precision Parquetry</h5>
        <ul class="text-muted">
          <li><strong>Laser Orthogonal Baseline:</strong> Always project a dual-beam 90° laser grid from the room's primary architectural focal line.</li>
          <li><strong>Dry-Bench Sorting:</strong> Natural stone tiles vary slightly in sizing. Every piece must be caliper-checked and segregated into tight tolerance lots.</li>
          <li><strong>Mechanical Wedge Tensioning:</strong> Tension clips lock opposing points simultaneously, preventing tiles from creeping while mortar cures.</li>
        </ul>
      `
    },
    "5": {
      title: "Subfloor Deflection Standards: Calculating L/720 for Natural Stone",
      badge: "Technical Engineering",
      readTime: "8 min read",
      author: "Technical Guild Committee",
      date: "September 11, 2026",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
      content: `
        <p class="lead text-muted">While ceramic tile tolerates an L/360 deflection standard, natural stone requires a stringent L/720 deflection rating (the span divided by 720). Without this stiffness, the stone will crack under normal foot traffic.</p>
        <h5 class="fw-bold mt-4">Structural Reinforcement Steps</h5>
        <p class="text-muted">We evaluate joist depth, unsupported span length, and subfloor plywood thickness. In high-span residential layouts, we install secondary 1/2" exterior-grade plywood underlayment with staggered seams, bonded with Schluter-DITRA uncoupling membrane to guarantee zero shear transfer.</p>
      `
    },
    "6": {
      title: "The Art of Quad Bookmatching: Creating Architectural Rorschach Walls",
      badge: "Design & Patterns",
      readTime: "5 min read",
      author: "Matteo Rossi",
      date: "August 29, 2026",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80",
      content: `
        <p class="lead text-muted">Quad bookmatching—taking four consecutive slabs from the exact same quarry block and mirroring them horizontally and vertically—creates a breathtaking natural kaleidoscope effect.</p>
        <h5 class="fw-bold mt-4">Slab Selection and Calibration</h5>
        <p class="text-muted">Only a fraction of quarry blocks exhibit the balanced, energetic vein vectors necessary for dramatic 4-way bookmatching. We inspect quarry blocks in Carrara and Pietrasanta, digitize the cut faces, and simulate the installed wall in 3D before cutting begins.</p>
      `
    }
  };

  const articleModalEl = document.getElementById('articleReaderModal');
  const readerBadge = document.getElementById('readerBadge');
  const readerTitle = document.getElementById('articleReaderTitle');
  const readerBody = document.getElementById('articleReaderBody');

  if (articleModalEl) {
    articleModalEl.addEventListener('show.bs.modal', (event) => {
      const button = event.relatedTarget;
      if (!button) return;
      const articleId = button.getAttribute('data-article-id') || '2';
      const data = articleModalData[articleId] || articleModalData['2'];

      if (readerBadge) readerBadge.textContent = data.badge;
      if (readerTitle) readerTitle.textContent = data.title;
      if (readerBody) {
        readerBody.innerHTML = `
          <div class="d-flex align-items-center gap-3 mb-3 text-muted small">
            <span><i class="fas fa-user text-primary me-1"></i> ${data.author}</span>
            <span><i class="fas fa-calendar-alt text-primary me-1"></i> ${data.date}</span>
            <span><i class="fas fa-clock text-primary me-1"></i> ${data.readTime}</span>
          </div>
          <img src="${data.image}" alt="${data.title}" class="rounded-3 w-100 mb-4 shadow-sm" style="max-height: 320px; object-fit: cover;">
          <div class="article-text-flow">
            ${data.content}
          </div>
        `;
      }
    });
  }
});
