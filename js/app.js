// Loader
window.addEventListener("DOMContentLoaded", (event) => {
  const loader = document.querySelector(".loader-wrapper");
  setTimeout(() =>  {
    loader.classList.add("is-done");
  }, 1000);
});

// Header
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const sec_creative_design = document.querySelector(".js-sec-creative-design");
  const sec_creative_design_offset_height = sec_creative_design.offsetHeight;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    // Show header when going to creative design section
    if (scrollY >= sec_creative_design_offset_height) {
      header.classList.add("is-show");
    } else {
      header.classList.remove("is-show");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, Observer);

  const header = document.querySelector("header");
  const menuLinks = document.querySelectorAll("header .menu a");
  const sections = gsap.utils.toArray("main section[id]");
  const colorSections = document.querySelectorAll(
    ".js-sec-works, .js-sec-services, .js-sec-gallery"
  );

  // ---- Hàm set active menu ----
  function setActive(id) {
    menuLinks.forEach(link => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
    });
  }

  // ---- Đổi màu header theo section ----
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          header.classList.add("is-change-color");
        } else {
          header.classList.remove("is-change-color");
        }
      });
    },
    {
      root: null,
      threshold: 0,
      rootMargin: "0px 0px -100% 0px"
    }
  );

  colorSections.forEach((section) => observer.observe(section));

  // ---- Active menu khi scroll ----
  sections.forEach(section => {
    const id = section.getAttribute("id");

    ScrollTrigger.create({
      trigger: section,
      start: "top 70%",   // active khi 30% section vào viewport
      end: "bottom 70%",
      onEnter: () => setActive(id),
      onEnterBack: () => setActive(id),
    });
  });

  // ---- Active menu khi click ----
  menuLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href").replace("#", "");
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        // Scroll mượt (cần ScrollToPlugin nếu muốn GSAP scroll)
        targetEl.scrollIntoView({ behavior: "smooth" });
      }

      setActive(targetId);
    });
  });

  // ---- Observer GSAP (optional) ----
  Observer.create({
    type: "scroll",
    tolerance: 10,
    preventDefault: false,
  });
});

// Works
document.addEventListener("DOMContentLoaded", () => {
  let item_01 = ".js-sec-works-list .item-01";
  let item_02 = ".js-sec-works-list .item-02";
  let item_03 = ".js-sec-works-list .item-03";
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".js-sec-works-list",
      start: "top bottom",
      end: "bottom bottom",
      scrub: 1,
      // markers: true,
      invalidateOnRefresh: true,
    }
  });
  tl.to(item_01, { xPercent: -110, ease: "none" }, 0);
  tl.to(item_02, { xPercent: -15, ease: "none" }, 0);
  tl.to(item_03, { xPercent: 80, ease: "none" }, 0);

  // Re-measure the entire height and calculate the correct sticky position.
  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});

// Design
document.addEventListener("DOMContentLoaded", () => {
  const horizontalSection = document.querySelector(".js-sec-design");
  const horizontalList = document.querySelector(".js-sec-design-list");

  // Tính chiều rộng phần content ngang
  const totalScrollWidth = horizontalList.scrollWidth;
  const viewportWidth = window.innerWidth;
  const scrollDistance = totalScrollWidth - viewportWidth;

  gsap.to(horizontalList, {
    x: () => -scrollDistance, // horizontal translation along the roll direction
    ease: "none",
    scrollTrigger: {
      trigger: horizontalSection,
      pin: true, // keep section fixed
      scrub: 1, // Smooth sync with scroll
      start: "top top", // start when top viewport is touched
      end: () => "+=" + scrollDistance, // scroll length = horizontal content length
      anticipatePin: 1, // Helps animation smoother at the start of the battery, avoiding frame stuttering
      invalidateOnRefresh: true, // Tell ScrollTrigger to refresh dynamic values ​​when called
      // markers: true,
    }
  });
});

// Services
document.addEventListener("DOMContentLoaded", () => {
  const secServices = document.querySelector(".js-sec-services");
  const secServicesInfo = document.querySelector(".js-sec-services-info");
  const allItem = document.querySelectorAll(".js-sec-services-list .item");
  const allImage = document.querySelectorAll(".js-sec-services-images .image");
  if (!secServices || !secServicesInfo) return;

  let serviceTL = null; // save this section's own timeline

  function initServicesScroll() {
    // Kill old timeline if any
    if (serviceTL) {
      serviceTL.scrollTrigger.kill();
      serviceTL.kill();
      serviceTL = null;
    }

    const infoHeight = secServicesInfo.offsetHeight;
    const viewportHeight = window.innerHeight;

    if (infoHeight <= viewportHeight) {
      // No need pin, reset
      gsap.set(secServicesInfo, { y: 0 });
      return;
    }

    // Create timeline + scrollTrigger
    serviceTL = gsap.timeline({
      scrollTrigger: {
        trigger: secServices,
        start: "top top",
        end: "+=" + (infoHeight - viewportHeight),
        pin: true,
        scrub: true,
        anticipatePin: 1,
        // markers: true,
      },
    });

    serviceTL.to(secServicesInfo, {
      y: -(infoHeight - viewportHeight),
      ease: "none",
    });
  }

  initServicesScroll();

  // Hover item and active corresponding image
  allItem.forEach(item => {
    item.addEventListener('mouseover', ()=> {
      let id = item.dataset.id;
      allImage.forEach(image => {
        image.classList.toggle("is-active", image.getAttribute('id') === id);
      });
    })
  });

  window.addEventListener("resize", () => {
    initServicesScroll();
    ScrollTrigger.refresh();
  });
});

// Product
document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".js-sec-product-slider", {
    slidesPerView: "auto",
    spaceBetween: 40,
    loop: false,
    speed: 600, // increase smoothness when moving
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
    
    // increase smoothness
    freeMode: {
      enabled: true,
      momentum: true,
      momentumRatio: 1,
      momentumBounce: true,
      momentumVelocityRatio: 1,
    },
    touchRatio: 1,
  });
});

// Gallery
document.addEventListener("DOMContentLoaded", () => {
  const secGallery = document.querySelector(".js-sec-gallery");
  const secGalleryImages = document.querySelector(".js-sec-gallery-images");
  const secGalleryImagesHeight = secGalleryImages.offsetHeight;
  const allImage = document.querySelectorAll(".js-sec-gallery-images .image");
  const allItem = document.querySelectorAll(".js-sec-gallery-list .item");
  const viewportHeight = window.innerHeight;

  if (!secGallery || !secGalleryImages) return;

  let galleryTL = null;

  function initGalleryScroll() {
    // Kill old timeline if any
    if (galleryTL) {
      galleryTL.scrollTrigger.kill();
      galleryTL.kill();
      galleryTL = null;
    }

    // Create timeline + scrollTrigger
    galleryTL = gsap.timeline({
      scrollTrigger: {
        trigger: secGallery,
        start: "top top",
        end: "+=" + (secGalleryImagesHeight - viewportHeight),
        pin: true,
        scrub: true,
        anticipatePin: 1,
        // markers: true,
      },
    });

    galleryTL.to(secGalleryImages, {
      y: -(secGalleryImagesHeight - viewportHeight),
      ease: "none",
    });

    // Active item theo image
    allImage.forEach((image) => {
      ScrollTrigger.create({
        trigger: image,
        start: "top 70%",
        end: "bottom 70%",
        scrub: true,
        onEnter: () => setActive(image.id),
        onEnterBack: () => setActive(image.id)
      });
    });
    function setActive(id) {
      allItem.forEach(item => {
        item.classList.toggle("is-active", item.dataset.id === id);
      });
    }
  }

  initGalleryScroll();

  window.addEventListener("resize", () => {
    initGalleryScroll();
    ScrollTrigger.refresh();
  });
});