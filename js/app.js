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
  const creative_design = document.querySelector(".js-sec-creative-design");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        header.classList.add('show');
      } else {
        header.classList.remove('show');
      }
    });
  }, {
    root: null,
    threshold: 0,
    rootMargin: "0px 0px -99% 0px"
  });

  observer.observe(creative_design);
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