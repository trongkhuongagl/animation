// Loader
window.addEventListener("DOMContentLoaded", (event) => {
  const loader = document.querySelector(".loader-wrapper");
  setTimeout(() =>  {
    loader.style.opacity = "0";
    loader.style.transition = "opacity 0.3s ease";
    loader.style.display = "none"
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
  tl.to(".item-01", { xPercent: -100, ease: "none" }, 0);
  tl.to(".item-03", { xPercent: 100, ease: "none" }, 0);

  // Re-measure the entire height and calculate the correct sticky position.
  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});