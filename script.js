/* ===============================================
   TIM EYEBROW STUDIO — JavaScript
   =============================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ---- Navbar Scroll Effect ----
  const navbar = document.getElementById("navbar");
  const navbarInner = document.getElementById("navbar-inner");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbarInner.classList.add("scrolled");
    } else {
      navbarInner.classList.remove("scrolled");
    }
  });

  // ---- Hero Video Fallback ----
  const heroVideo = document.getElementById("hero-video");
  const heroFallback = document.querySelector(".hero-fallback-img");

  if (heroVideo) {
    heroVideo.addEventListener("error", () => {
      // Video failed to load, show fallback image
      heroVideo.style.display = "none";
      if (heroFallback) heroFallback.style.display = "block";
    });

    // Also check if video source fails
    const videoSource = heroVideo.querySelector("source");
    if (videoSource) {
      videoSource.addEventListener("error", () => {
        heroVideo.style.display = "none";
        if (heroFallback) heroFallback.style.display = "block";
      });
    }

    // If video can play, hide the fallback
    heroVideo.addEventListener("canplay", () => {
      if (heroFallback) heroFallback.style.display = "none";
    });
  }

  // ---- Mobile Menu Toggle ----
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("open");
  });

  // ---- Mobile Submenu Toggles ----
  const mobileDropdowns = document.querySelectorAll(".mobile-dropdown-toggle");
  mobileDropdowns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const submenu = btn.nextElementSibling;
      const arrow = btn.querySelector(".mobile-arrow");

      // Close other submenus
      mobileDropdowns.forEach((otherBtn) => {
        if (otherBtn !== btn) {
          const otherSub = otherBtn.nextElementSibling;
          const otherArrow = otherBtn.querySelector(".mobile-arrow");
          if (otherSub) otherSub.classList.remove("open");
          if (otherArrow) otherArrow.classList.remove("rotate-180");
        }
      });

      if (submenu) submenu.classList.toggle("open");
      if (arrow) arrow.classList.toggle("rotate-180");
    });
  });

  // ---- Mobile Sub-Submenu Toggles ----
  const mobileSubDropdowns = document.querySelectorAll(
    ".mobile-sub-dropdown-toggle",
  );
  mobileSubDropdowns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const submenu = btn.nextElementSibling;
      const arrow = btn.querySelector(".mobile-sub-arrow");

      if (submenu) submenu.classList.toggle("open");
      if (arrow) arrow.classList.toggle("rotate-180");
    });
  });

  // ---- Close mobile menu on link click ----
  const mobileLinks = document.querySelectorAll(
    "#mobile-menu a:not(.mobile-dropdown-toggle):not(.mobile-sub-dropdown-toggle)",
  );
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("open");
    });
  });

  // ---- Scroll Animations (IntersectionObserver) ----
  const animatedElements = document.querySelectorAll(
    ".fade-up, .fade-left, .fade-right, .scale-in",
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  animatedElements.forEach((el) => observer.observe(el));

  // ---- Smooth Scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ---- Gallery lightbox (simple) ----
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");

  if (lightbox && lightboxImg) {
    galleryItems.forEach((item) => {
      item.addEventListener("click", () => {
        const img = item.querySelector("img");
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.classList.remove("hidden");
          lightbox.classList.add("flex");
          document.body.style.overflow = "hidden";
        }
      });
    });

    const closeLightbox = () => {
      lightbox.classList.add("hidden");
      lightbox.classList.remove("flex");
      document.body.style.overflow = "";
    };

    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLightbox();
    });
  }

  // ---- Counter Animation ----
  const counters = document.querySelectorAll(".counter");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute("data-target"));
          const suffix = el.getAttribute("data-suffix") || "";
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += step;
            if (current < target) {
              el.textContent = Math.floor(current) + suffix;
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = target + suffix;
            }
          };

          updateCounter();
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((c) => counterObserver.observe(c));

  // ---- Course tab switching ----
  const courseTabs = document.querySelectorAll(".course-tab");
  const coursePanels = document.querySelectorAll(".course-panel");

  courseTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-tab");

      courseTabs.forEach((t) => t.classList.remove("tab-active"));
      tab.classList.add("tab-active");

      coursePanels.forEach((panel) => {
        panel.classList.add("hidden");
        if (panel.id === target) {
          panel.classList.remove("hidden");
        }
      });
    });
  });

  // ---- Navbar active section highlight ----
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      if (scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("text-red-400");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("text-red-400");
      }
    });
  });

  // ---- Service Detail SPA functionality ----
  const serviceData = {
    "Hairstroke": {
      title: "การสักคิ้ว Hairstroke",
      description: "คิ้ว Hairstroke คือ เทคนิคการสักคิ้วลายเส้นที่ใช้เครื่องมือและเข็มนาโนขนาดเล็กมากในการวาดเส้นขนคิ้วทีละเส้นให้ดูเหมือนขนคิ้วจริง ....\n\n[ เว้นไว้ให้คุณใส่รายละเอียดอื่นๆ เพิ่มเติม ]",
      images: ["images/before-after-brows.png", "images/before-after-brows.png", "images/before-after-brows.png", "images/before-after-brows.png"]
    },
    "Shading": {
      title: "การสักคิ้ว Shading",
      description: "การสักคิ้ว Shading (เชดดิ้ง) หรือที่บางคนเรียกว่า คิ้วฝุ่น / Ombre Brows / Powder Brows\nเป็นเทคนิคการสักคิ้วที่ได้รับความนิยมมากในปัจจุบัน ......\n\n[ เว้นไว้ให้คุณใส่รายละเอียดอื่นๆ เพิ่มเติม ]",
      images: ["images/before-after-brows.png", "images/before-after-brows.png", "images/before-after-brows.png", "images/before-after-brows.png"]
    },
    "Lips": {
      title: "ฝังสีปาก Soft Lips",
      description: "การฟังสีปาก soft lips\nฝังสีปาก (Soft Lips) คือเทคนิคการสักปากกึ่งถาวรที่ให้ผลลัพธ์ดูเป็นธรรมชาติ อ่อนนุ่ม และมีความละมุนของเฉดสี โดยเป็นการใช้เม็ดสีฝังลงบนชั้นผิวหนังชั้นนอกหรือหนังกำพร้า .....\n\n[ เว้นไว้ให้คุณใส่รายละเอียดอื่นๆ เพิ่มเติม ]",
      images: ["images/hero-beauty.png", "images/hero-beauty.png", "images/hero-beauty.png", "images/hero-beauty.png"]
    },
    "Eyeliner": {
      title: "สักตา Eyeliner",
      description: "สักตา eyeliner\nการสักตา eyeliner คือ การฝังสีบริเวณรอบดวงตาด้วยเครื่องสักขนาดเล็ก เพื่อสร้างเส้นอายไลเนอร์ให้ดูชัดเจนขึ้นอย่างถาวร ซึ่งช่วยให้ดวงตาดูโตและมีมิติมากขึ้น ....\n\n[ เว้นไว้ให้คุณใส่รายละเอียดอื่นๆ เพิ่มเติม ]",
      images: ["images/tattoo-removal.png", "images/tattoo-removal.png", "images/tattoo-removal.png", "images/tattoo-removal.png"]
    },
    "Inner-liner": {
      title: "การสักตา Inner liner",
      description: "การสักตา In liner\nการสักในliner (Inner liner) คือ การฝังสีลงบริเวณขอบตาด้านในสุด ใต้แนวโคนขนตา เพื่อทำให้ดวงตาดูคมชัดเป็นธรรมชาติ ขนตาดูหนาขึ้นอย่างเห็นได้ชัด ......\n\n[ เว้นไว้ให้คุณใส่รายละเอียดอื่นๆ เพิ่มเติม ]",
      images: ["images/tattoo-removal.png", "images/tattoo-removal.png", "images/tattoo-removal.png", "images/tattoo-removal.png"]
    },
    "Soft liner": {
      title: "การสักตา Soft liner",
      description: "การฟังสีปาก soft lips\nฝังสีปาก (Soft Lips) คือเทคนิคการสักปากกึ่งถาวรที่ให้ผลลัพธ์ดูเป็นธรรมชาติ อ่อนนุ่ม และมีความละมุนของเฉดสี .......\n\n[ เว้นไว้ให้คุณใส่รายละเอียดอื่นๆ เพิ่มเติม ]",
      images: ["images/hero-beauty.png", "images/hero-beauty.png", "images/hero-beauty.png", "images/hero-beauty.png"]
    }
  };

  const mainContent = document.getElementById("main-content");
  const serviceDetailView = document.getElementById("service-detail-view");
  const backToHomeBtn = document.getElementById("back-to-home");
  const serviceDetailTitle = document.getElementById("service-detail-title");
  const serviceDetailDesc = document.getElementById("service-detail-desc");
  const serviceDetailImages = document.getElementById("service-detail-images");

  // Select all links navigating to #services
  const serviceLinks = document.querySelectorAll('a[href="#services"]');

  serviceLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const linkText = link.textContent.trim();
      let serviceKey = null;

      // Match text with our database
      for (const key in serviceData) {
        if (linkText.includes(key)) {
          serviceKey = key;
          break;
        }
      }

      if (serviceKey && mainContent && serviceDetailView) {
        e.preventDefault();
        
        // Populate data
        const data = serviceData[serviceKey];
        serviceDetailTitle.textContent = data.title;
        serviceDetailDesc.textContent = data.description;
        
        // Render playful staggered images (Masonry layout)
        serviceDetailImages.innerHTML = '';
        data.images.forEach((imgSrc, index) => {
          let layoutClass = "";
          let delay = index * 150;
          
          if (index === 0) {
            layoutClass = "aspect-[4/3] w-full"; // Landscape
          } else if (index === 1) {
            layoutClass = "aspect-[3/4] w-full"; // Portrait
          } else if (index === 2) {
            layoutClass = "aspect-[3/4] w-full"; // Portrait
          } else {
            layoutClass = "aspect-[4/3] w-full"; // Landscape
          }

          const imgHtml = `
            <div 
              class="${layoutClass} rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-black/60 group cursor-pointer opacity-0 translate-y-12 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] break-inside-avoid"
              style="transition-delay: ${delay}ms;"
            >
              <img src="${imgSrc}" class="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110" alt="${data.title} preview">
            </div>
          `;
          serviceDetailImages.innerHTML += imgHtml;
        });

        // Trigger animations after a tiny delay
        setTimeout(() => {
          const wrappers = serviceDetailImages.querySelectorAll(':scope > div');
          wrappers.forEach(wrap => {
            wrap.classList.remove('opacity-0', 'translate-y-12');
            wrap.classList.add('opacity-100', 'translate-y-0');
          });
        }, 50);
        
        // Hide main homepage content, show service detail
        mainContent.classList.add('hidden');
        serviceDetailView.classList.remove('hidden');
        
        // Close Mobile Menu if active
        if (hamburger && mobileMenu) {
            hamburger.classList.remove("active");
            mobileMenu.classList.remove("open");
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  if (backToHomeBtn && mainContent && serviceDetailView) {
    backToHomeBtn.addEventListener('click', () => {
      serviceDetailView.classList.add('hidden');
      mainContent.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
