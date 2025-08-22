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