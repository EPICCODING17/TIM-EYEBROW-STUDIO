/* ===============================================
   TIM EYEBROW STUDIO — JavaScript
   =============================================== */

window.goHome = function(e) {
  if (e) e.preventDefault();
  const mainContent = document.getElementById("main-content");
  const serviceDetailView = document.getElementById("service-detail-view");
  const courseView = document.getElementById("course-view");
  const privacyPolicyView = document.getElementById("privacy-policy-view");
  
  if (mainContent) mainContent.classList.remove('hidden');
  if (serviceDetailView) serviceDetailView.classList.add('hidden');
  if (courseView) courseView.classList.add('hidden');
  if (privacyPolicyView) privacyPolicyView.classList.add('hidden');
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

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
      description: `คิ้ว Hairstroke คือ เทคนิคการสักคิ้วลายเส้นที่ใช้เครื่องมือและเข็มนาโนขนาดเล็กมากในการวาดเส้นขนคิ้วทีละเส้นให้ดูเหมือนขนคิ้วจริง เพื่อสร้างมิติและความเป็นธรรมชาติให้กับคิ้ว เหมาะสำหรับผู้ที่ต้องการเติมเต็มคิ้วบาง ขนคิ้วไม่เต็มทรง หรือต้องการคิ้วที่ดูสวยเหมือนแต่งหน้าตลอดเวลา โดยลายเส้นที่ได้จะเล็ก พลิ้วบาง และมีความคมชัด ทำให้ไม่รู้สึกเจ็บหรือเจ็บน้อยระหว่างทำ 

ลักษณะเด่นของคิ้ว HairStroke:
• ดูเหมือนเส้นขนจริง: ใช้เข็มนาโนวาดลายเส้นละเอียดทีละเส้นให้กลมกลืนกับขนคิ้วจริง 
• มีมิติ: มีการไล่เฉดสีและน้ำหนักของเส้นขน ทำให้คิ้วดูมีมิติ ไม่แข็งเป็นบล็อก 
• เป็นแผลปิด: หลังทำสามารถโดนน้ำได้ทันที เพราะเป็นการสักที่สร้างแผลปิด 
• เจ็บน้อย: เข็มนาโนมีขนาดเล็กมาก ทำให้ไม่รู้สึกเจ็บหรือเจ็บน้อยขณะทำ 
• เหมาะกับหลายสภาพผิว: สามารถทำได้กับทุกสภาพผิว โดยเฉพาะผิวที่ต้องการความเป็นธรรมชาติ 

ความแตกต่างกับเทคนิคอื่น:
• Microblading: แม้จะเป็นลายเส้นเหมือนกัน แต่ HairStroke มีการไล่น้ำหนักและความละเอียดที่มากกว่า ทำให้ดูเป็นธรรมชาติยิ่งขึ้น 
• คิ้วฝุ่น (Powder Brows): HairStroke เน้นการสร้างเส้นขนที่ดูพลิ้วไหว ต่างจากคิ้วฝุ่นที่ให้ลุคอ่อนละมุนเหมือนการเขียนคิ้ว
 
ข้อควรรู้:
• ผลลัพธ์ขึ้นอยู่กับสภาพผิว: สภาพผิวของแต่ละบุคคลมีผลต่อความติดทนของสีคิ้วหลังการสัก 
• ต้องอาศัยช่างผู้ชำนาญ: เทคนิคนี้ต้องใช้ทักษะ ความแม่นยำ และความละเอียดสูงในการลงเข็ม จึงควรเลือกช่างที่มีประสบการณ์ 
• การดูแลหลังสัก: แม้จะเป็นแผลปิด แต่ก็ควรดูแลรักษาความสะอาดและหลีกเลี่ยงการแกะสะเก็ด เพื่อให้สีคิ้วติดทนและสวยงาม 

Hairstroke Eyebrow Tattoo

Hairstroke brows are a semi-permanent makeup technique that uses specialized tools and ultra-fine nano needles to create individual hair-like strokes that resemble natural eyebrow hairs. This method adds dimension and a realistic look to the brows, making it ideal for those with sparse or uneven eyebrows, or for anyone who wants naturally full, defined brows that look perfectly groomed at all times. The strokes are thin, soft, and precise, and the procedure causes little to no pain.

Key Features of Hairstroke Brows:
• Natural hair-like strokes: Each line is drawn with nano needles to seamlessly blend with real eyebrow hairs.
• Dimensional effect: Shading and varied stroke weights are applied to create depth and a natural flow, avoiding a harsh, blocky look.
• Closed wound technique: The skin heals quickly, and the brows can get wet immediately after the procedure.
• Minimal pain: Nano needles are extremely fine, causing little to no discomfort during the process.
• Suitable for all skin types: Works especially well for clients seeking a natural and realistic look.

Differences from Other Techniques:
• Microblading: While both involve creating hair-like strokes, Hairstroke brows use finer detailing and gradient shading, resulting in a more natural and refined appearance.
• Powder Brows: Hairstroke focuses on realistic hair strokes, while Powder Brows create a soft, shaded look similar to eyebrow makeup.

Important Notes:
• Results depend on skin type: The longevity and final color retention can vary depending on the client’s skin condition.
• Requires an experienced artist: This advanced technique demands high precision, skill, and attention to detail, so choosing a skilled professional is crucial.
• Aftercare: Even though it’s a closed wound technique, proper aftercare—such as maintaining cleanliness and avoiding scab-picking—is essential for long-lasting, beautiful results.`,
      images: [
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/HS00001.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/HS00002.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/HS00003.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/HS00004.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/HS00005.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/HS00007.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/HS00008.png"
      ]
    },
    "Shading": {
      title: "การสักคิ้ว Shading",
      description: `💫 ลักษณะของคิ้ว Shading
	•	สีจะ ไล่โทนจากอ่อนบริเวณหัวคิ้ว → เข้มบริเวณหางคิ้ว
	•	ไม่มีเส้นขนชัดเจนเหมือน “แฮร์สโตรก”
	•	ผิวที่ได้หลังลอกจะดู “ฟุ้งนุ่ม” คล้ายการแต่งหน้าถาวร
	•	สามารถปรับให้ดูธรรมชาติหรือเข้มชัดได้ตามสไตล์ลูกค้า

👩‍🎨 เหมาะกับใคร
	•	คนที่ มีขนคิ้วบาง / รูปทรงคิ้วไม่ชัด / ต้องแต่งหน้าทุกวัน
	•	คนที่ มีรอยแผลเป็นหรือรอยแหว่งในคิ้ว
	•	ผู้ที่เคยสักคิ้วแบบเก่ามาแล้ว อยากปรับให้ดูนุ่มขึ้น
	•	คนที่ชอบลุค สวยแพง เรียบหรู ไม่ดูเข้มเกินไป

🩷 ข้อดีของคิ้ว Shading
	•	อยู่ได้นานประมาณ 1.5–2 ปี
	•	ไม่ต้องเขียนคิ้วทุกวัน
	•	สีไม่เพี้ยนเป็นเทา/แดงง่าย (ถ้าใช้หมึกคุณภาพดี)
	•	เหมาะกับทุกสภาพผิว โดยเฉพาะ “ผิวมัน” ที่มักไม่เหมาะกับแฮร์สโตรก

💫 What is Shading Brows?

Shading Brows, also known as Ombre Brows or Powder Brows, is a popular semi-permanent eyebrow technique that creates a soft, natural, and powdery effect — just like perfectly filled-in brows using an eyebrow pencil or brow powder.

✨ Key Features
	•	Soft color gradient — lighter at the front, darker toward the tail
	•	No individual hair strokes — instead, it looks smooth and airy
	•	The healed result appears natural, soft, and well-defined
	•	Can be adjusted to look super natural or bold and glamorous

👩‍🎨 Perfect For:
	•	Those with thin or sparse brows
	•	Anyone who wants defined brows without daily makeup
	•	Clients with old tattooed brows that need correction
	•	People who love a clean, elegant, “luxury” brow look

🔹 Procedure Steps
	1.	Consultation and brow mapping to suit the face shape
	2.	Drawing and adjusting the shape until the client is satisfied
	3.	Applying numbing cream
	4.	Using a PMU machine to softly shade pigment into the skin
	5.	Gradually building the ombre effect
	6.	Providing aftercare instructions

🩷 Benefits
	•	Lasts around 1.5–2 years
	•	No need to draw brows every day
	•	Doesn’t turn gray or red easily (with high-quality pigments)
	•	Ideal for all skin types, especially oily skin`,
      images: [
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/SD00001.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/SD00002.png"
      ]
    },
    "Lips": {
      title: "ฝังสีปาก Soft Lips",
      description: `ลักษณะสำคัญของฝังสีปาก Soft Lips
• ความเป็นธรรมชาติ: เน้นให้สีปากดูเป็นธรรมชาติ อ่อนนุ่ม ไม่ดูจัดหรือแรงเกินไป 
• ขอบปากไม่คมชัด: ขอบปากจะดูฟุ้ง ๆ เบลอ ๆ ไล่เฉดสีอย่างกลมกลืน ไม่เน้นเส้นขอบปากที่คมชัดเหมือนเทคนิคเก่า 
• การใช้สี: มักใช้โทนสีชมพูอ่อน พีช ส้ม หรือนู้ด เพื่อให้ได้ลุคที่ดูอ่อนวัยและสุขภาพดี 
• ลดความเจ็บปวดและบวม: มีการใช้เข็มขนาดเล็กพิเศษและเทคนิคการฝังสีที่เบามือ ทำให้ปากบอบช้ำน้อยลง ไม่บวมมาก และสามารถใช้ชีวิตได้ปกติหลังทำ 
• การแก้ปัญหาริมฝีปาก: ช่วยปรับสีปากที่คล้ำให้ดูสม่ำเสมอ เป็นสีชมพูระเรื่อ สุขภาพดี 

ข้อดี
• แก้ปัญหาสีปากคล้ำ ปากซีด หรือไม่มีชีวิตชีวาได้อย่างตรงจุด 
• ให้สีปากที่ดูอมชมพูระเรื่อ สวยงาม เป็นธรรมชาติ 
• ไม่ต้องทาลิปบ่อย ๆ ก็ยังดูมีสีปากสุขภาพดี 
• ลดความกังวลเรื่องปากคล้ำ ทำให้ยิ้มได้อย่างมั่นใจ 

Soft Lips Pigmentation
Soft Lips pigmentation is a semi-permanent lip tattooing technique that delivers a natural, soft, and delicate color result. Pigment is implanted into the outer layer of the skin (epidermis) to correct dark or pale lips, giving them a rosy or softly tinted appearance. The finish looks blurred and diffused, similar to Korean-style lipstick, while causing less trauma compared to traditional lip tattoo methods.

Key Characteristics of Soft Lips Pigmentation
• Natural effect: Focuses on soft, subtle, and natural-looking lip color rather than bold or harsh tones.
• Soft lip borders: The edges of the lips are softly blended and diffused, without sharp outlines like older tattooing techniques.
• Color choices: Typically uses soft shades such as light pink, peach, coral, or nude tones for a youthful and healthy look.
• Less pain and swelling: Uses fine needles and gentle pigmentation techniques, resulting in minimal trauma, less swelling, and a quick return to daily activities.
• Lip correction: Helps even out and brighten dark-toned lips, making them look naturally rosy and healthy.

Benefits
• Corrects dark, pale, or lifeless lips effectively.
• Provides a soft, rosy tint for a natural and beautiful appearance.
• Reduces the need for frequent lipstick application, while still maintaining a healthy lip color.
• Boosts confidence by eliminating concerns about lip discoloration and enhancing your smile.`,
      images: [
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/L00001.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/L00002.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/L00003.png"
      ]
    },
    "Eyeliner": {
      title: "สักตา Eyeliner",
      description: `การสักตา Eyeliner (Eyeliner Tattoo) คือ การฝังสีบริเวณรอบดวงตาด้วยเครื่องสักขนาดเล็ก เพื่อสร้างเส้นอายไลเนอร์ให้ดูชัดเจนขึ้นอย่างถาวร ซึ่งช่วยให้ดวงตาดูโดดเด่นและมีมิติมากขึ้น เสมือนการเขียนอายไลเนอร์แบบปกติ

ความหมายโดยละเอียด
• การฝังสี: เป็นกระบวนการที่ใช้เข็มสักขนาดเล็กฝังเม็ดสีลงบนชั้นผิวหนังบริเวณขอบตา
• ผลลัพธ์: ทำให้ขอบตาดูคมชัด โดดเด่น และดวงตาดูโตขึ้นอย่างเป็นธรรมชาติ โดยไม่ต้องใช้เครื่องสำอางในทุกวัน
• วัตถุประสงค์: เพื่อเพิ่มมิติให้กับดวงตา แก้ปัญหาขนตาบาง หรือสำหรับผู้ที่ต้องการประหยัดเวลาในการแต่งหน้าในชีวิตประจำวัน

ประโยชน์
• ความสวยงาม: ช่วยเพิ่มความคมชัดและความน่าสนใจให้กับดวงตา
• ความสะดวก: ประหยัดเวลาในการแต่งหน้าทุกวัน
• ความมั่นใจ: ทำให้ดูดีขึ้นแม้ในขณะที่ไม่ได้แต่งหน้า

Eyeliner Tattoo
Eyeliner tattoo is the process of implanting pigment around the eyes using a small tattoo device to create a permanent eyeliner effect. Pigment is implanted as a visible eyeliner line, resembling makeup for a bolder effect.

Detailed Meaning
• Pigment Implantation: A technique that uses a fine tattoo needle to deposit pigment into the skin along the lash line.
• Result: Creates sharper, more defined eyes, making them look naturally bigger and more expressive—without the need for daily makeup.
• Purpose: To enhance eye dimension, address sparse lashes, and save time on daily makeup routines.

Benefits
• Aesthetic: Enhances eye definition and overall attractiveness.
• Convenience: Saves time on daily makeup application.
• Confidence: Provides a polished appearance even without makeup.`,
      images: [
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/E00001.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/E00002.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/E00003.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/E00004.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/E00005.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/E00006.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/E00007.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/E00008.png"
      ]
    },
    "Inner-liner": {
      title: "การสักตา Inner liner",
      description: `การสักตาอินเนอร์ไลน์เนอร์ (Inner Liner) คือ การสักสีที่แนวโคนขนตาด้านในสุด ทำให้ขอบตาคมชัดอย่างเป็นธรรมชาติ และดูเหมือนขนตาเยอะขึ้น เหมาะกับผู้ที่ต้องการให้ดวงตาดูกลมโตแบบเป็นธรรมชาติที่สุด โดยไม่ต้องเขียนอายไลเนอร์เส้นใหญ่

ความหมายโดยละเอียด
• การฝังสี: เป็นกระบวนการที่ใช้เข็มสักขนาดเล็กฝังเม็ดสีลงบนชั้นผิวหนังบริเวณขอบตาด้านในสุด
• ผลลัพธ์: ทำให้โคนขนตาดูหนาขึ้นอย่างเห็นได้ชัด โดยที่ไม่ดูเหมือนเป็นการแต่งหน้าจนเกินไป
• วัตถุประสงค์: เพื่อความเป็นธรรมชาติสูงสุด เหมาะกับใบหน้าเปลือยเปล่า (Bare face) ทำให้ดูตื่นมาแล้วตาสวยเลย

ประโยชน์
• ความสวยงาม: ขนตาดูหนาเข้มขึ้นอย่างเป็นธรรมชาติ
• ความสะดวก: ประหยัดเวลาในการแต่งหน้าทุกวัน
• ความมั่นใจ: ทำให้ดูตาหวานและมีสเน่ห์แม้ในขณะที่ไม่ได้แต่งหน้า

Inner Liner Tattoo
Inner Liner is the process where pigment is applied directly at the lash line, creating a naturally defined look and giving the appearance of fuller lashes.

Detailed Meaning
• Pigment Implantation: A technique that uses a fine needle to deposit pigment directly into the inner lash line.
• Result: Creates a naturally defined look without the appearance of heavy makeup.
• Purpose: Perfect for those who want a "no-makeup" makeup look and naturally expressive eyes.

Benefits
• Aesthetic: Gives the illusion of thick, dark eyelashes.
• Convenience: Saves time on daily makeup application.
• Confidence: Provides a naturally beautiful appearance at all times.`,
      images: [
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/E00001.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/E00002.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/E00003.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/E00004.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/E00005.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/E00006.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/E00007.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/E00008.png"
      ]
    },
    "Soft liner": {
      title: "การสักตา Soft liner",
      description: `การสักตาซอฟไลเนอร์ (Soft-liner) คือ เทคนิคการสักที่ผสมผสานระหว่างอินเนอร์ไลน์เนอร์และอายไลเนอร์ รวมถึงการแรเงาให้ฟุ้งเป็นมิติ ให้ลุคคล้ายการแต่งตาด้วยอายแชโดว์ เพื่อให้ดวงตาดูหวานละมุน ไม่ดุจนเกินไป

ความหมายโดยละเอียด
• การฝังสี: เทคนิคขั้นสูงที่ผสมผสานการทำเส้นอายไลเนอร์ที่โคนขนตา และการปัดเงา (Shading) ให้ฟุ้งกระจายออกไปบริเวณเปลือกตาเล็กน้อย
• ผลลัพธ์: เติมความซอฟต์ละมุนให้ดวงตาดูมีมนต์เสน่ห์ คล้ายการไล่ระดับสีของอายแชโดว์
• วัตถุประสงค์: เพื่อปรับรูปตาให้ดูสมมาตร และทำให้การแต่งหน้าในชีวิตประจำวันง่ายขึ้นเพียงแค่ปัดมาสคาร่าก็สวยพร้อม

ประโยชน์
• ความสวยงาม: ช่วยเพิ่มมิติความฟุ้งละมุน ไม่ทำให้หน้าดูดุ
• ความสะดวก: ประหยัดเวลาในการลงอายแชโดว์
• ความมั่นใจ: ให้ลุคที่ดูหรูหรา ซอฟต์ และเซ็กซี่อย่างลงตัว

Soft-Liner Tattoo
Soft-Liner is a blend of inner liner and eyeliner tattoo, with additional shading for a soft, smoky finish similar to eyeshadow.

Detailed Meaning
• Pigment Implantation: An advanced technique combining lash line enhancement with a subtle gradient shading on the eyelid.
• Result: Creates a sultry, soft, and smoky effect that looks like perfectly blended makeup.
• Purpose: To provide a glamorous yet soft look that enhances the eye shape dynamically.

Benefits
• Aesthetic: Softens the eyes and adds a gorgeous, smoky dimension.
• Convenience: Eliminates the need for daily eyeshadow blending.
• Confidence: Ensures a perfect, smudge-proof makeup look 24/7.`,
      images: [
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/E00001.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/E00002.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/E00003.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/E00004.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/E00005.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/E00006.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/E00007.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/E00008.png"
      ]
    },
    "Labina": {
      title: "น้ำหมึกพิกเมนต์ LaBina® จากประเทศเยอรมนี",
      description: `LaBina® pigment inks
• We use high-quality raw materials
• Lightfastness and an impressive range of shades
• No chemical preservatives
• Without iron oxide
• Made in Germany
• More than 35 years of experience
• All colours are REACH compliant

Legal information regarding the REACH Regulation:
REACH is an EU regulation introduced in 2007. As such, it is a directly applicable law in all member states - in contrast to directives, which first have to be transposed into national laws. Since 04/01/2021, REACH also applies to all tattoo, microblading and permanent make-up inks used within the European Union.
All LaBina® pigment inks produced after 01/01/2021 of course already comply with the requirements of the revised REACH EU Regulation (EC) No. 1907/2006 as amended by Regulation (EU) 2020/2081.

Manufacturing of our pigment inks
Since 2004, the pigment inks developed by PERMANENT-Line and sold around the world by PERMANENT-Line GmbH & Co. KG have been produced by a renowned German laboratory that has been manufacturing tattoo and pigment inks since 1996. We sell them under the trademark LaBina® as well as under numerous other brands such as LaBina® Product Quality Pigments and on the international market as Privat Label Pigments.
Each LaBina® pigment ink comes with a declaration of conformity and an analysis summary, in accordance with EU Regulation 2020/2081, for the user to keep and show to the end consumer if they wish to see it.
For each new batch of pigment inks, all relevant raw materials are analysed by chemical-technology laboratories for the following parameters and ingredients before use and they are checked to make sure that they meet all legal requirements and recommendations:
[A] Heavy metals,
[B] Polycyclic Aromatic Hydrocarbons (PAH),
[C] Alcohol,
[D] Aromatic amines,
[E] Pigments and dyes,
[F] Biocides with restricted limit values,
[G] Biocides without limit values (restricted internally),
[H] Prohibited preservatives,
[I] Pigments and dyes prohibited according to Regulation (EU) 2020/2081 in conjunction with Annex Il of the Regulation (EC) 1223/2009 and in accordance with Regulation (EU) 2020/2081 in conjunction with Annex IV of the Regulation (EC) 1223/2009.

LaBina® pigment inks are free of cadmium, chromate, mercury, selenium, tellurium, thallium, uranium and soluble barium compounds in the measured standard laboratory procedure. All values for antimony, arsenic, barium sulphate, lead, chrome and zinc correspond to the strict limit values of the Council of Europe Resolution ResAP (2008)1 and lie under the recommended limit values.

Certificates:
LaBina® pigment colours are produced from the best raw materials and with the greatest care. PERMANENT-Line has always attached great importance to safe and low-allergen ingredients and transparency. Detailed analyses are published for each batch of pigmentation colour. These certificates are made available to the user with every colour delivery; they can be made available to end users via the QR code printed on the certificates.

---

น้ำหมึกพิกเมนต์ LaBina®
• เราใช้วัตถุดิบคุณภาพสูง
• สีติดทนนาน (Lightfastness) และมีเฉดสีให้เลือกหลากหลาย
• ปราศจากสารกันเสียทางเคมี
• ไม่ผสม Iron Oxide
• ผลิตในประเทศเยอรมนี
• มีประสบการณ์มากกว่า 35 ปี
• ทุกสีเป็นไปตามข้อกำหนด REACH

ข้อมูลทางกฎหมายเกี่ยวกับกฎระเบียบ REACH
REACH เป็นกฎระเบียบของสหภาพยุโรปที่เริ่มบังคับใช้ในปี 2007 ซึ่งเป็นกฎหมายที่มีผลบังคับใช้โดยตรงในทุกประเทศสมาชิก แตกต่างจาก "Directive" (ข้อกำหนด) ที่ต้องมีการถ่ายทอดเป็นกฎหมายระดับชาติของแต่ละประเทศก่อนจึงจะใช้ได้ โดยตั้งแต่วันที่ 04/01/2021 เป็นต้นมา กฎระเบียบ REACH ครอบคลุมถึงน้ำหมึกสัก หมึกไมโครเบลดดิ้ง และหมึกสักกึ่งถาวร (Permanent Make-Up: PMU) ที่ใช้งานภายในสหภาพยุโรปด้วย น้ำหมึกพิกเมนต์ LaBina® ทุกชนิดที่ผลิตหลังวันที่ 01/01/2021 ได้รับการรับรองว่าสอดคล้องกับข้อกำหนดของ กฎระเบียบ REACH (EC) No. 1907/2006 ที่ได้รับการแก้ไขเพิ่มเติมโดย Regulation (EU) 2020/2081 เป็นที่เรียบร้อยแล้ว

การผลิตน้ำหมึกพิกเมนต์ของเรา
ตั้งแต่ปี 2004 เป็นต้นมา น้ำหมึกพิกเมนต์ที่พัฒนาโดย PERMANENT-Line และจำหน่ายทั่วโลกโดย PERMANENT-Line GmbH & Co. KG ได้ถูกผลิตโดยห้องปฏิบัติการชื่อดังของเยอรมนี ซึ่งดำเนินการผลิตน้ำหมึกสักและพิกเมนต์มาตั้งแต่ปี 1996 เราจำหน่ายภายใต้เครื่องหมายการค้า LaBina® รวมถึงในแบรนด์อื่น ๆ เช่น LaBina® Product Quality Pigments และในตลาดต่างประเทศในชื่อ Private Label Pigments

น้ำหมึกพิกเมนต์แต่ละรุ่นของ LaBina® มาพร้อมกับเอกสารรับรองความสอดคล้อง (Declaration of Conformity) และสรุปผลการวิเคราะห์ ตามระเบียบข้อบังคับสหภาพยุโรป EU Regulation 2020/2081 เพื่อให้ผู้ใช้สามารถเก็บไว้หรือนำแสดงให้ผู้บริโภคปลายทางดูได้หากต้องการ

สำหรับการผลิตแต่ละล็อตของน้ำหมึกพิกเมนต์ วัตถุดิบทุกชนิดที่เกี่ยวข้องจะถูกตรวจวิเคราะห์โดยห้องปฏิบัติการด้านเคมี-เทคโนโลยี ตามพารามิเตอร์และสารต่าง ๆ ต่อไปนี้ เพื่อให้มั่นใจว่าสอดคล้องกับข้อกำหนดและคำแนะนำทางกฎหมายทั้งหมดก่อนนำมาใช้:
[A] โลหะหนัก
[B] สาร Polycyclic Aromatic Hydrocarbons (PAH)
[C] แอลกอฮอล์
[D] สาร Aromatic amines
[E] พิกเมนต์และสีย้อม
[F] สารชีวฆาต (Biocides) ที่มีค่าจำกัดสูงสุดตามกฎหมาย
[G] สารชีวฆาตที่ไม่มีค่าจำกัดสูงสุด (แต่ถูกควบคุมภายใน)
[H] สารกันเสียที่ห้ามใช้
[I] พิกเมนต์และสีย้อมที่ห้ามใช้ตามข้อบังคับ (EU) 2020/2081 ร่วมกับภาคผนวก II ของข้อบังคับ (EC) 1223/2009 และตามข้อบังคับ (EU) 2020/2081 ร่วมกับภาคผนวก IV ของข้อบังคับ (EC) 1223/2009

น้ำหมึกพิกเมนต์ LaBina® ปราศจาก แคดเมียม โครเมต ปรอท ซีลีเนียม เทลลูเรียม แทลเลียม ยูเรเนียม และสารประกอบแบเรียมที่ละลายน้ำได้ ภายใต้มาตรฐานการตรวจวัดในห้องปฏิบัติการ ค่าแอนติโมนี สารหนู แบเรียมซัลเฟต ตะกั่ว โครเมียม และสังกะสีทั้งหมด อยู่ในเกณฑ์ที่เข้มงวดของ สภายุโรป (Council of Europe Resolution ResAP (2008)1) และต่ำกว่าค่าที่กำหนดแนะนำอย่างเคร่งครัด

ใบรับรอง (Certificates):
น้ำหมึกพิกเมนต์ LaBina® ผลิตขึ้นจากวัตถุดิบคุณภาพสูงสุดและผ่านกระบวนการที่พิถีพิถัน บริษัท PERMANENT-Line ให้ความสำคัญกับความปลอดภัย การใช้ส่วนผสมที่ก่อการแพ้น้อย และความโปร่งใสมาโดยตลอด โดยมีการเผยแพร่ผลการวิเคราะห์อย่างละเอียดสำหรับทุกล็อตของสีพิกเมนต์ ใบรับรองเหล่านี้จะจัดส่งให้ผู้ใช้งานพร้อมกับสีในทุกการสั่งซื้อ และยังสามารถส่งต่อให้ผู้บริโภคปลายทางได้ผ่านทาง QR Code ที่พิมพ์อยู่บนใบรับรองด้วย`,
      images: [
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/LaBina1.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/LaBina2.png",
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/LaBina3.png"
      ]
    },
    "Mara Pro": {
      title: "สีสัก MARA Pro จากประเทศสหรัฐอเมริกา",
      description: `MARA Pro / MARA Colors
• MARA Pro offers pigment inks for permanent makeup (PMU) including lips, brows, eyes, and more.
• Made in the USA.
• Safety and quality standards:
  • MARA Colors uses a hybrid formula (partially natural / partially synthetic pigments) with high color concentration.
  • The pigment particles are very fine, allowing for good color diffusion and adhesion without needing multiple applications.
  • MSDS (Material Safety Data Sheets) are available for each color shade for verification before purchase.
  • The products are environmentally friendly (“cruelty-free”) and free from certain hazardous substances.

Safety, health and environmental regulations/legislation specific for the substance or mixture EU Legislation REGULATION (EU) 2020/878 amending Regulations EU 2015/830 and (EC) No 1907/2006 of the European Parliament and of the Council on the Registration, Evaluation, Authorization and Restriction of Chemicals (REACH) REGULATION (EC) 1272/2008 on the classification, labeling and packaging of substances and mixtures (CLP).

Key Features & Shades
• A wide range of lip pigment shades such as Brownie Pink, Cherry Blossom, Cranberry, Dark Strawberry, Ginger, Lollipop, Marshmallow, Nude, Raspberry, Warm Caramel, etc.
• The “NUDE” shade is a “desert rose” tone, suitable for pale or light-colored lips.
• The “RASPBERRY” shade is a cool pink, producing a medium rosy result.
• The Neutral Lip Pigments Set includes two shades, “Baby Lips” and “She’s Hot,” designed to balance lip color naturally and blend well without additional color correctors.
• The pigments are hybrid / glycerin-rich formula, designed to gradually fade over 1–4 years, allowing for easy touch-ups in the future.

Practice Ink & Accessories
• MARA Practice Ink is available for training on synthetic skin (latex), allowing artists to practice techniques without using actual pigments.
• MARA Pro needle cartridges are also available, featuring technologies such as ink spit-back membranes and precision design for gentle and accurate application on facial skin.

---

MARA Pro / MARA Colors
• MARA Pro จำหน่ายหมึกพิกเมนต์สำหรับงานสักความงาม (permanent makeup / PMU) ทั้งปาก คิ้ว ตา ฯลฯ
• ผลิตในสหรัฐอเมริกา (USA)
• มีแนวทางเรื่องความปลอดภัยและคุณภาพ:
  • MARA Colors ใช้สูตร “hybrid” (สารพิกเมนต์กึ่งธรรมชาติ / กึ่งสังเคราะห์) ที่มีความเข้มข้นสูง
  • มีขนาดอนุภาคของสีที่เล็ก ทำให้สีแพร่ซึมและเกาะผิวได้ดีโดยไม่จำเป็นต้องลงซ้ำมาก
  • มีการเผยแพร่ MSDS (Material Safety Data Sheet) สำหรับสีแต่ละเฉดให้ตรวจสอบได้ก่อนซื้อ
  • เป็นผลิตภัณฑ์ที่เป็นมิตรกับสิ่งแวดล้อม (“cruelty free”) และปลอดสารอันตรายบางอย่าง

ข้อบังคับด้านความปลอดภัย สุขภาพ และสิ่งแวดล้อมสำหรับสารหรือส่วนผสมเฉพาะ
ข้อบังคับของสหภาพยุโรป (EU Legislation):
• REGULATION (EU) 2020/878 เป็นการแก้ไขกฎระเบียบ EU 2015/830 และ (EC) No 1907/2006 ของรัฐสภายุโรปและสภายุโรป เกี่ยวกับ การจดทะเบียน การประเมิน การอนุญาต และข้อจำกัดของสารเคมี (REACH)
• REGULATION (EC) 1272/2008 เกี่ยวกับ การจำแนกประเภท การติดฉลาก และการบรรจุภัณฑ์ของสารและส่วนผสม (CLP)

คุณสมบัติเด่น & เฉดสี
• มีเฉดสีลิป (Lip pigments) หลายเฉด เช่น Brownie Pink, Cherry Blossom, Cranberry, Dark Strawberry, Ginger, Lollipop, Marshmallow, Nude, Raspberry, Warm Caramel ฯลฯ
• ตัวอย่างเฉดสี “NUDE” เป็นโทนสี “desert rose” ใช้สำหรับริมฝีปากที่ซีดหรือสีอ่อน
• เฉดสี “RASPBERRY” เป็นเฉดสีเย็น (cool pink) ที่ให้ผลลัพธ์เป็นชมพูกลาง ๆ ปานกลาง
• ชุด Neutral Lip Pigments Set มีสองเฉด ได้แก่ “Baby Lips” กับ “She’s Hot” ใช้สำหรับปรับสมดุลสีริมฝีปากให้ดูธรรมชาติและเบลนด์ได้ดีโดยไม่ต้องใช้ตัวแก้สีต่างหาก
• สูตรของสีเป็นแบบ hybrid / glycerin-rich pigment ที่ออกแบบมาให้ค่อย ๆ จางใน 1–4 ปี เพื่อให้ยังสามารถเติมแต่งใหม่ได้ในอนาคต

หมึกฝึก (Practice Ink) & อุปกรณ์เสริม
• มี MARA Practice Ink สำหรับฝึกบนหนังเทียม (latex) โดยเฉพาะ เพื่อให้ผู้ฝึกสามารถทดลองเทคนิคต่าง ๆ ได้โดยไม่ใช้สีจริง
• อุปกรณ์เข็ม / แคร์ทริดจ์ (needle cartridges) ของ MARA Pro ก็มีจำหน่าย พร้อมคุณสมบัติต่าง ๆ เช่น ระบบกันการย้อนกลับของหมึก (ink spit-back membrane) และออกแบบมาให้แม่นยำและอ่อนโยนสำหรับผิวหน้า`,
      images: [
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/MARA-Pro1.png"
      ]
    },
    "Xion S": {
      title: "อุปกรณ์เครื่องสัก Spektra Xion S",
      description: `The Spektra Xion S is a premium pen-style rotary machine designed specifically for permanent makeup (PMU) and cosmetic tattooing. Manufactured by Microbeau International in the USA, it offers precision, versatility, and comfort for professionals in the beauty industry.

🔧 Key Specifications
• Weight: 4.7 oz (134 g)
• Stroke Lengths: 1.8 mm and 2.5 mm included; 3.2 mm and 3.7 mm available separately
• Needle Tension Adjustment: One-turn GiveDial™ for precise control
• Motor: 6W MotorBolt™ system, engineered for PMU applications
• Voltage Range: 4–9.5 V DC
• Grip: Autoclavable, tapered from 26 mm to 19 mm
• Connectivity: RCA cable (sold separately)
• Compatibility: Works with most standard membrane cartridges
• Warranty: 2-year motor warranty; lifetime warranty on machine body (excluding normal wear)

🎨 Design & Ergonomics
The Xion S features a lightweight, ergonomic design that reduces hand fatigue during extended sessions. Its slim, tapered grip ensures a comfortable hold, enhancing maneuverability for detailed work. The machine’s versatility is further supported by interchangeable stroke options, allowing artists to tailor the tool to various PMU techniques.

🛠️ Performance & Versatility
Equipped with the MotorBolt™ system, the Xion S delivers consistent power suitable for a range of PMU procedures, including eyeliner, eyebrows, and lip blush. The adjustable stroke lengths and needle tension provide flexibility to accommodate different styles and client needs.

🧼 Maintenance & Hygiene
The Xion S’s grip is autoclavable, ensuring high standards of hygiene. The machine’s design allows for easy cleaning and maintenance, supporting safe and sanitary practices in professional settings.

📦 What’s Included
• Spektra Xion S machine
• Stroke wheels: 1.8 mm and 2.5 mm
• Spare eccentric for stroke adjustment
• Allen key
• Spare rubber band for grip
• User manual

เครื่องสัก Xion S (Spektra Xion S)
เครื่องสัก Spektra Xion S เป็นเครื่องสไตล์ปากกาแบบโรตารี่คุณภาพสูง ออกแบบมาสำหรับ งานสักความงาม (PMU) และสักเครื่องสำอาง โดยเฉพาะ ผลิตโดย Microbeau International (สหรัฐอเมริกา) ให้ความแม่นยำ ความยืดหยุ่น และความสะดวกสบายสำหรับมืออาชีพในวงการความงาม

🔧 ข้อมูลทางเทคนิคหลัก
• น้ำหนัก: 134 กรัม (4.7 ออนซ์)
• ความยาวจังหวะ (Stroke Lengths): มีให้ 1.8 มม. และ 2.5 มม. (รุ่น 3.2 มม. และ 3.7 มม. จำหน่ายแยก)
• ปรับแรงตึงเข็ม: One-turn GiveDial™ เพื่อการควบคุมอย่างแม่นยำ
• มอเตอร์: ระบบ 6W MotorBolt™ ออกแบบมาสำหรับงาน PMU
• แรงดันไฟฟ้า: 4–9.5 V DC
• ด้ามจับ: ออกแบบให้เรียวจาก 26 มม. ถึง 19 มม. และสามารถนำเข้าเครื่องอบฆ่าเชื้อ (Autoclavable)
• การเชื่อมต่อ: สาย RCA (จำหน่ายแยก)
• ความเข้ากันได้: ใช้งานกับแคร์ทริดจ์มาตรฐานส่วนใหญ่ได้
• การรับประกัน: มอเตอร์ 2 ปี ตัวเครื่องรับประกันตลอดอายุการใช้งาน (ยกเว้นการสึกหรอตามปกติ)

🎨 การออกแบบและสรีรศาสตร์
• ดีไซน์ เบาและถนัดมือ ลดความเมื่อยล้าขณะใช้งานนาน ๆ
• ด้ามจับเรียวช่วยให้ จับถนัดและควบคุมง่าย สำหรับงานละเอียด
• รองรับ ความยืดหยุ่นในการเปลี่ยนความยาวจังหวะ เพื่อปรับให้เหมาะกับเทคนิค PMU ที่แตกต่างกัน

🛠️ ประสิทธิภาพและความหลากหลาย
• ระบบ MotorBolt™ ให้พลังสม่ำเสมอ เหมาะกับการสักคิ้ว อายไลเนอร์ และลิปบลัช
• ปรับความยาวจังหวะและแรงตึงเข็ม ได้ตามสไตล์งานและความต้องการของลูกค้า

🧼 การดูแลรักษาและสุขอนามัย
• ด้ามจับสามารถ นำเข้าเครื่องอบฆ่าเชื้อ (Autoclavable) เพื่อรักษามาตรฐานความสะอาด
• ออกแบบให้ ทำความสะอาดง่าย สนับสนุนการใช้งานอย่างปลอดภัยในระดับมืออาชีพ

📦 สิ่งที่รวมมาในชุด
• เครื่อง Spektra Xion S
• วงล้อปรับจังหวะ: 1.8 มม. และ 2.5 มม.
• ชิ้นส่วนสำรองสำหรับปรับจังหวะ
• ประแจ Allen Key
• ยางรองสำรองสำหรับด้ามจับ
• คู่มือผู้ใช้`,
      images: [
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/The-Spektra-Xion-S1.png"
      ]
    },
    "Vertix": {
      title: "เข็มสัก Vertix Needle พรีเมียมเกรด",
      description: `🖌️Vertix Tattoo Needles
Vertix needles are cartridge-style needles designed specifically for permanent makeup (PMU) and tattooing, offering precision and safety for professional use.

Key Features of Vertix Needles
• High-Quality Material: Made from medical-grade stainless steel for sharpness and durability.
• Transparent Needle Tip: Allows visibility of ink flow and easier needle direction adjustment.
• Backflow Prevention System: Internal rubber membrane prevents ink backflow and reduces motor vibration.
• Elongated Tip Profile: Improves visibility during work and reduces ink splatter.
• Dual Side Vents Shell Design: Minimizes ink splatter and optimizes ink flow.
• CE Certified: Made in the USA and meets CE safety standards.

Types of Vertix Needles
• Round Liner (RL): Ideal for eyebrow, eyeliner, and lip lining.
• Round Shader (RS): Suitable for shading and coloring.
• Round Liner Tight (RLT): Extra narrow for highly detailed lines.
• U Magnum (UM): For filling larger areas such as eyebrows and lips.

Needle Sizes
• Diameter: 0.20 mm, 0.25 mm, and 0.33 mm
• Needle Count: 1, 3, 5, or 7 needles per cartridge
• Taper Length: Long Taper (LT), Medium Taper (MT), or Super Tight (ST)

Usage and Maintenance
• Application: Suitable for permanent makeup (eyebrows, lips, eyeliner) and tattoo lines.
• Maintenance: Single-use only for hygiene and safety purposes.

คุณสมบัติเด่นของเข็มสัก Vertix
• วัสดุคุณภาพสูง: ผลิตจากสแตนเลสเกรดการแพทย์ (Medical-Grade Stainless Steel) ที่มีความคมและทนทาน
• การออกแบบหัวเข็มโปร่งใส: ช่วยให้มองเห็นการไหลของหมึกและสามารถปรับทิศทางเข็มได้ง่าย
• ระบบป้องกันการย้อนกลับของหมึก (Backflow Prevention): มีแผ่นยางภายในที่ช่วยป้องกันการย้อนกลับของหมึกและลดแรงสั่นสะเทือนของมอเตอร์เครื่องสัก
• การออกแบบหัวเข็มยาว (Elongated Tip Profile): ช่วยเพิ่มมุมมองในการทำงานและลดการกระเด็นของหมึก
• การออกแบบช่องระบายอากาศด้านข้าง (Dual Side Vents Shell Design): ช่วยลดการกระเด็นของหมึกและเพิ่มการไหลของหมึกอย่างมีประสิทธิภาพ
• การรับรองมาตรฐาน CE: ผลิตในสหรัฐอเมริกาและได้รับการรับรองมาตรฐาน CE

ประเภทของเข็ม Vertix
• Round Liner (RL): เหมาะสำหรับการสักเส้นขอบตา คิ้ว และปาก
• Round Shader (RS): เหมาะสำหรับการลงสีและแรเงา
• Round Liner Tight (RLT): หัวเข็มแคบพิเศษ เหมาะสำหรับการสักเส้นที่ต้องการความละเอียดสูง
• U Magnum (UM): เหมาะสำหรับการลงสีในพื้นที่กว้าง เช่น คิ้วและปาก

ขนาดของเข็ม Vertix
• เส้นผ่านศูนย์กลางของเข็ม (Needle Diameter): มีขนาด 0.20mm, 0.25mm และ 0.33mm
• จำนวนเข็ม (Needle Count): มีตั้งแต่ 1, 3, 5, 7 เข็ม
• ความยาวของปลายเข็ม (Taper): มีทั้งแบบ Long Taper (LT), Medium Taper (MT) และ Super Tight (ST)

การใช้งานและการดูแลรักษา
• การใช้งาน: เหมาะสำหรับการสักถาวร เช่น คิ้ว ตา ปาก และการสักลายเส้น
• การดูแลรักษา: ควรใช้เข็มสัก Vertix เพียงครั้งเดียวและทิ้งหลังการใช้งาน เพื่อป้องกันการติดเชื้อและรักษาความปลอดภัย

การสั่งซื้อ / Where to Buy
สามารถสั่งซื้อเข็มสัก Vertix ได้จากร้านจำหน่ายอุปกรณ์สักที่เชื่อถือได้ / Vertix needles can be purchased from reputable PMU and tattoo suppliers:

<div class="flex flex-wrap gap-4 mt-6">
  <a href="https://www.pmusmpshop.com/%E0%B8%AA%E0%B8%B4%E0%B8%99%E0%B8%84%E0%B9%89%E0%B8%B2/%E0%B9%80%E0%B8%82%E0%B9%87%E0%B8%A1%E0%B8%AA%E0%B8%B1%E0%B8%81-vertix-nano-%E0%B8%81%E0%B8%A5%E0%B9%88%E0%B8%AD%E0%B8%87/?utm_source=chatgpt.com" target="_blank" class="btn-outline px-6 py-2 text-sm rounded-full flex items-center gap-2 transition-all">PMU & SMP Shop</a>
  <a href="https://www.darklab.com/collections/vertix?utm_source=chatgpt.com" target="_blank" class="btn-outline px-6 py-2 text-sm rounded-full flex items-center gap-2 transition-all">Darklab</a>
  <a href="https://www.fkirons.com/collections/vertix?utm_source=chatgpt.com" target="_blank" class="btn-outline px-6 py-2 text-sm rounded-full flex items-center gap-2 transition-all">FK Irons</a>
</div>`,
      images: [
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/Vertix1.png"
      ]
    },
    "Etalon Mix": {
      title: "น้ำยาลบรอยสัก Etalon Mix Remover",
      description: `The Etalon Mix remover is for professional use only. After completing a training course, you can use it responsibly. You can use this remover during your pigmentation to correct imperfections or lighten unsightly PMU without any negative effects.

ผลิตภัณฑ์ Etalon Mix Remover เหมาะสำหรับใช้โดยผู้เชี่ยวชาญเท่านั้น หลังจากผ่านการอบรมคอร์สแล้วจึงจะสามารถใช้งานได้อย่างถูกต้อง คุณสามารถใช้รีมูฟเวอร์นี้ระหว่างการฝังสีเพื่อแก้ไขข้อบกพร่อง หรือเพื่อลดความเข้มของงานสักถาวร (PMU) ที่ไม่สวยงามได้ โดยไม่ก่อให้เกิดผลกระทบด้านลบ`,
      images: [
        "https://cdn.jsdelivr.net/gh/timeyebrowstudio-spec/Img/The-Etalon-Mix-remover1.png"
      ],
      fullWidthImages: true
    }
  };

  const mainContent = document.getElementById("main-content");
  const serviceDetailView = document.getElementById("service-detail-view");
  const backToHomeBtn = document.getElementById("back-to-home");
  const serviceDetailTitle = document.getElementById("service-detail-title");
  const serviceDetailDesc = document.getElementById("service-detail-desc");
  const serviceDetailImages = document.getElementById("service-detail-images");

  // Select all links navigating to #services, #equipment, or #removal
  const serviceLinks = document.querySelectorAll('a[href="#services"], a[href="#equipment"], a[href="#removal"]');

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
        serviceDetailDesc.innerHTML = data.description;
        
        // Render playful staggered images (Masonry layout)
        serviceDetailImages.innerHTML = '';
        
        const isSingleImage = data.images.length === 1;

        if (data.fullWidthImages || isSingleImage) {
          serviceDetailImages.className = "flex flex-col gap-8 mt-12 pb-20 max-w-4xl mx-auto w-full";
        } else {
          serviceDetailImages.className = "columns-1 md:columns-2 gap-8 mt-12 pb-20 space-y-8";
        }

        data.images.forEach((imgSrc, index) => {
          let layoutClass = "";
          let delay = index * 150;
          
          let imgClass = "w-full h-full object-cover";

          if (data.fullWidthImages || isSingleImage) {
            layoutClass = "w-full h-auto"; // Natural height
            imgClass = "w-full h-auto object-contain"; // Prevent cropping
          } else if (index === 0) {
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
              <img src="${imgSrc}" class="${imgClass} transition-transform duration-[1.2s] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110" alt="${data.title} preview">
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

  // ---- Course View SPA functionality ----
  const courseLinks = document.querySelectorAll('a[href="#course"]');
  const courseView = document.getElementById("course-view");
  const backToHomeCourseBtn = document.getElementById("back-to-home-course");
  const bookCourseBtn = document.getElementById("book-course-btn");

  courseLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      if (mainContent && courseView) {
        mainContent.classList.add('hidden');
        courseView.classList.remove('hidden');
        
        if (serviceDetailView) serviceDetailView.classList.add('hidden');

        if (hamburger && mobileMenu) {
            hamburger.classList.remove("active");
            mobileMenu.classList.remove("open");
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  if (backToHomeCourseBtn && mainContent && courseView) {
    backToHomeCourseBtn.addEventListener('click', () => {
      courseView.classList.add('hidden');
      mainContent.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (bookCourseBtn && mainContent && courseView) {
    bookCourseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      courseView.classList.add('hidden');
      mainContent.classList.remove('hidden');
      setTimeout(() => {
        const target = document.querySelector("#booking");
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 50);
    });
  }

  // ---- Magnetic Effect ----
  const magneticEls = document.querySelectorAll(".magnetic");
  
  magneticEls.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const position = el.getBoundingClientRect();
      const x = e.clientX - position.left - position.width / 2;
      const y = e.clientY - position.top - position.height / 2;
      
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
    });
    
    el.addEventListener("mouseleave", () => {
      el.style.transform = "translate(0px, 0px)";
      setTimeout(() => {
        el.style.transform = "";
      }, 300);
    });
  });

  // ---- Cookie Banner & Privacy Policy ----
  const cookieBanner = document.getElementById("cookie-banner");
  const acceptCookiesBtn = document.getElementById("accept-cookies");
  const rejectCookiesBtn = document.getElementById("reject-cookies");
  const readPolicyLink = document.getElementById("read-policy-link");
  const privacyPolicyView = document.getElementById("privacy-policy-view");
  const backToHomePolicyBtn = document.getElementById("back-to-home-policy");

  if (cookieBanner && acceptCookiesBtn && rejectCookiesBtn) {
    const cookieStatus = localStorage.getItem("cookieStatus");
    if (!cookieStatus) {
      setTimeout(() => {
        cookieBanner.classList.remove("translate-y-full");
      }, 1000);
    }

    acceptCookiesBtn.addEventListener("click", () => {
      localStorage.setItem("cookieStatus", "accepted");
      cookieBanner.classList.add("translate-y-full");
    });
    
    rejectCookiesBtn.addEventListener("click", () => {
      localStorage.setItem("cookieStatus", "rejected");
      cookieBanner.classList.add("translate-y-full");
    });
  }

  // Privacy Policy SPA Navigation
  if (readPolicyLink && privacyPolicyView && mainContent && backToHomePolicyBtn) {
    readPolicyLink.addEventListener("click", (e) => {
      e.preventDefault();
      // Hide all other views
      mainContent.classList.add("hidden");
      const serviceDetailView = document.getElementById("service-detail-view");
      if (serviceDetailView) serviceDetailView.classList.add("hidden");
      if (courseView) courseView.classList.add("hidden");
      
      privacyPolicyView.classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    backToHomePolicyBtn.addEventListener("click", () => {
      privacyPolicyView.classList.add("hidden");
      mainContent.classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
