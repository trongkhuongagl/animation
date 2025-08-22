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
  // const sec_works = document.querySelector(".js-sec-works");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Show header when going to creative design section
    if (scrollY >= sec_creative_design_offset_height) {
      header.classList.add("is-show");
    } else {
      header.classList.remove("is-show");
    }

    // Change header color when in sec-works area
    // if (sec_works) {
    //   const rect = sec_works.getBoundingClientRect();

    //   // Condition: element is still visible in viewport
    //   const isInView =
    //     rect.top <= 0 && // touch or surpass the top
    //     rect.bottom > 0; // still in viewport

    //   if (isInView) {
    //     header.classList.add("is-change-color");
    //   } else {
    //     header.classList.remove("is-change-color");
    //   }
    // }

  });
});


document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const sections = document.querySelectorAll(
    ".js-sec-works, .js-sec-services"
  );

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
      root: null, // viewport
      threshold: 0, // trigger as soon as the top edge enters the viewport
      rootMargin: "0px 0px -100% 0px", 
      /*
       * rootMargin -100% below to ensure class only stays in .js-sec-works area.
       * When the element slides out of the bottom viewport it will remove the class.
      */
    }
  );

  sections.forEach((section) => observer.observe(section));
});


// Works
document.addEventListener("DOMContentLoaded", () => {
  let item_01 = ".js-sec-works-list .item-01";
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
  tl.to(item_01, { xPercent: -100, ease: "none" }, 0);
  tl.to(item_03, { xPercent: 100, ease: "none" }, 0);

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
// document.addEventListener("DOMContentLoaded", () => {
//   gsap.registerPlugin(ScrollTrigger);

//   function initGallery() {
//     const section = document.querySelector(".js-sec-gallery");
//     const images = gsap.utils.toArray(".js-sec-gallery-images .image");
//     const items = document.querySelectorAll(".js-sec-gallery-list .item");

//     // Tính tổng chiều cao thật của các ảnh (bao gồm margin)
//     let totalHeight = 0;
//     images.forEach(img => {
//       const style = getComputedStyle(img);
//       const mt = parseFloat(style.marginTop) || 0;
//       const mb = parseFloat(style.marginBottom) || 0;
//       totalHeight += img.offsetHeight + mt + mb;
//     });

//     gsap.to(images, {
//       yPercent: -100 * (images.length - 1),
//       ease: "none",
//       scrollTrigger: {
//         trigger: section,
//         start: "top top",
//         end: () => "+=" + (totalHeight - section.offsetHeight), 
//         pin: true,
//         scrub: true,
//       }
//     });

//     // Active item theo image
//     images.forEach((image) => {
//       ScrollTrigger.create({
//         trigger: image,
//         start: "top 70%",
//         end: "bottom 70%",
//         scrub: true,
//         onEnter: () => setActive(image.id),
//         onEnterBack: () => setActive(image.id)
//       });
//     });

//     function setActive(id) {
//       items.forEach(item => {
//         item.classList.toggle("is-active", item.dataset.id === id);
//       });
//     }
//   }

//   initGallery();
// });

document.addEventListener("DOMContentLoaded", () => {
  const secGallery = document.querySelector(".js-sec-gallery");
  const secGalleryImages = document.querySelector(".js-sec-gallery-images");
  const secGalleryImagesHeight = secGalleryImages.offsetHeight;
  const allImage = document.querySelectorAll(".js-sec-gallery-images .image");
  const allTtem = document.querySelectorAll(".js-sec-gallery-list .item");
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
      allTtem.forEach(item => {
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