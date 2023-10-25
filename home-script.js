 // Split text into spans
  let typeSplit = new SplitType("[text-split]", {
    types: "words, chars",
    tagName: "span"
  });
  //LENIS SCROLL
  ("use strict"); // fix lenis in safari

  if (Webflow.env("editor") === undefined) {
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.5,
      infinite: false,
      gestureOrientation: "vertical",
      normalizeWheel: false,
      smoothTouch: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    $("[data-lenis-start]").on("click", function () {
      lenis.start();
    });
    $("[data-lenis-stop]").on("click", function () {
      lenis.stop();
    });
    $("[data-lenis-toggle]").on("click", function () {
      $(this).toggleClass("stop-scroll");
      if ($(this).hasClass("stop-scroll")) {
        lenis.stop();
      } else {
        lenis.start();
      }
    });

    function connectToScrollTrigger() {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
    }
    // Uncomment this if using GSAP ScrollTrigger
    // connectToScrollTrigger();
  }
  //GSAP
  //PreLoader
  function pageLoad() {
    let tl = gsap.timeline();

    tl.from(
      ".tag",
      {
        opacity: 0,
        y: "110%",
        duration: 1
      },
      2
    )
      .from(
        ".is-top--fs0-ff2-tt5",
        {
          opacity: 0,
          y: "110%",
          ease: "power2.out",
          duration: 1.5
        },
        0.4
      )
      .from(
        ".is-center--fs0",
        {
          opacity: 0,
          y: "100%",
          ease: "power1.out",
          duration: 1.5
        },
        0.6
      )
      .from(
        ".is-bottom--fs0-ff2",
        {
          opacity: 0,
          y: "110%",
          ease: "power2.out",
          duration: 1.5
        },
        0.8
      )
      .from(
        ".scroll_down_lottie",
        {
          opacity: 0,
          ease: "power2.out",
          duration: 1.5
        },
        5
      )
      .from(
        ".navbar_component",
        {
          y: "-110%",
          ease: "power2.out",
          duration: 1.5
        },
        2
      )
      .to(
        ".hero_base--ca1",
        {
          scale: 1,
          filter: "blur(0px)",
          ease: "power1.out",
          duration: 2
        },
        2
      )
      .to(
        ".slider_tag_wrapper",
        {
          opacity: 1,
          ease: "power1.out",
          duration: 2
        },
        2.5
      )
      .to(
        ".hero_list,.navbar_component",
        {
          opacity: 1,
          ease: "power1.out",
          duration: 0.4
        },
        0
      );
  }
  pageLoad();

  // Link timelines to scroll position
  function createScrollTrigger(triggerElement, timeline) {
    // Reset tl when scroll out of view past bottom of screen
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(0);
        timeline.pause();
      }
    });

    // Play tl when scrolled into view (60% from top of screen)
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 60%",
      onEnter: () => timeline.play()
    });
  }

  $("[words-slide-up]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".word"), {
      opacity: 0,
      yPercent: 100,
      duration: 0.5,
      ease: "back.out(2)",
      stagger: { amount: 0.5 }
    });
    createScrollTrigger($(this), tl);
  });

  $("[words-rotate-in]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.set($(this).find(".word"), { transformPerspective: 1000 });
    tl.from($(this).find(".word"), {
      rotationX: -90,
      duration: 0.6,
      ease: "power2.out",
      stagger: { amount: 0.6 }
    });
    createScrollTrigger($(this), tl);
  });

  $("[words-slide-from-right]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".word"), {
      opacity: 0,
      x: "1em",
      duration: 0.6,
      ease: "power2.out",
      stagger: { amount: 0.2 }
    });
    createScrollTrigger($(this), tl);
  });

  $("[letters-slide-up]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      yPercent: 110,
      duration: 0.2,
      ease: "power1.out",
      stagger: { amount: 0.6 }
    });
    createScrollTrigger($(this), tl);
  });

  $("[letters-slide-down]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      yPercent: -120,
      duration: 0.3,
      ease: "power1.out",
      stagger: { amount: 0.7 }
    });
    createScrollTrigger($(this), tl);
  });

  $("[letters-fade-in]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      opacity: 0,
      duration: 0.2,
      ease: "power1.out",
      stagger: { amount: 0.8 }
    });
    createScrollTrigger($(this), tl);
  });

  $("[scrub-each-word]").each(function (index) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "top 90%",
        end: "top center",
        scrub: true
      }
    });
    tl.from($(this).find(".word"), {
      opacity: 0.2,
      duration: 0.2,
      ease: "power1.out",
      stagger: { each: 0.4 }
    });
  });

  // Avoid flash of unstyled content
  gsap.set("[text-split]", { opacity: 1 });


// MARQUEE POWER-UP

function getAttributeValue(defaultVal, attrVal) {
  const defaultValType = typeof defaultVal;
  if (typeof attrVal !== "string" || attrVal.trim() === "") return defaultVal;
  if (attrVal === "true" && defaultValType === "boolean") return true;
  if (attrVal === "false" && defaultValType === "boolean") return false;
  if (isNaN(attrVal) && defaultValType === "string") return attrVal;
  if (!isNaN(attrVal) && defaultValType === "number") return +attrVal;
  return defaultVal;
}

$("[tr-marquee-element='component']").each(function (index) {
  let componentEl = $(this),
    panelEl = componentEl.find("[tr-marquee-element='panel']"),
    triggerHoverEl = componentEl.find("[tr-marquee-element='triggerhover']"),
    triggerClickEl = componentEl.find("[tr-marquee-element='triggerclick']"),
    speed = getAttributeValue(100, componentEl.attr("tr-marquee-speed")),
    isVertical = getAttributeValue(
      false,
      componentEl.attr("tr-marquee-vertical")
    ),
    isReversed = getAttributeValue(
      false,
      componentEl.attr("tr-marquee-reverse")
    ),
    isScrollDirectional = getAttributeValue(
      false,
      componentEl.attr("tr-marquee-scrolldirection")
    ),
    isScrollScrub = getAttributeValue(
      false,
      componentEl.attr("tr-marquee-scrollscrub")
    ),
    moveDistance = isReversed ? 100 : -100;

  // Duplicate panel content for seamless loop
  panelEl.append(panelEl.html());

  let marqueeTimeline = gsap.timeline({
    repeat: -1,
    onReverseComplete: () => marqueeTimeline.progress(1)
  });

  if (isVertical) {
    speed = panelEl.first().height() / speed;
    marqueeTimeline.fromTo(
      panelEl,
      { yPercent: 0 },
      { yPercent: moveDistance, ease: "none", duration: speed }
    );
  } else {
    speed = panelEl.first().width() / speed;
    marqueeTimeline.fromTo(
      panelEl,
      { xPercent: 0 },
      { xPercent: moveDistance, ease: "none", duration: speed }
    );
  }

  let scrubObject = { value: 1 };

  ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      if (isScrollDirectional) {
        marqueeTimeline.timeScale(self.direction);
      }
      if (isScrollScrub) {
        let velocityFactor = self.getVelocity() * 0.006;
        velocityFactor = gsap.utils.clamp(-60, 60, velocityFactor);
        gsap.fromTo(
          scrubObject,
          { value: velocityFactor },
          {
            value: 1,
            duration: 0.5,
            onUpdate: () => marqueeTimeline.timeScale(scrubObject.value)
          }
        );
      }
    }
  });
});

//Slider Hero
$(".slider-upgrade_component").each(function (index) {
  const locationSwiper = new Swiper(
    $(this).find(".swiper.is-slider-locations")[0],
    {
      slidesPerView: 1,
      loop: true,
      speed: 2500,
      direction: "vertical",
      allowTouchMove: false,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      }
    }
  );

  const bgSwiper = new Swiper($(this).find(".swiper.is-slider-bg_upgrade")[0], {
    slidesPerView: 1,
    loop: true,
    speed: 2500,
    effect: "fade",
    allowTouchMove: false,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    }
  });
});
//Slider Services
$(".slider-services_component").each(function (index) {
  const bgsSwiper = new Swiper(
    $(this).find(".swiper.is-slider-bg_services")[0],
    {
      slidesPerView: 1,
      speed: 600,
      //effect: "fade",
      allowTouchMove: false,
      parallax: true
    }
  );

  const locationsSwiper = new Swiper(
    $(this).find(".swiper.is-services-locations")[0],
    {
      slidesPerView: 1,
      speed: 400,
      direction: "vertical"
    }
  );

  const textSwiper = new Swiper(
    $(this).find(".swiper.is-slider-titles_services")[0],
    {
      slidesPerView: "auto",
      speed: 600,
      slideToClickedSlide: true,
      grabCursor: true,
      keyboard: true,
      centeredSlides: true,
      slideActiveClass: "is-active",
      slideDuplicateActiveClass: "is-active",
      thumbs: {
        swiper: bgsSwiper
      },
      navigation: {
        nextEl: $(this).find(".swiper-next")[0],
        prevEl: $(this).find(".swiper-prev")[0],
        disabledClass: "is-disabled"
      }
    }
  );

  textSwiper.controller.control = locationsSwiper;
});

//Slider Process
$(".slider-process_component--gd1-cd5").each(function (index) {
  const listSwiper = new Swiper($(this).find(".swiper.is-slider-process")[0], {
    slidesPerView: "auto",
    allowTouchMove: false,
    speed: 500,
    direction: "vertical",
    centeredSlides: false,
    navigation: {
      nextEl: $(this).find(".swiper-next-down")[0],
      prevEl: $(this).find(".swiper-prev-up")[0],
      disabledClass: "is-disabled"
    },
    slideActiveClass: "is-active",
    slideDuplicateActiveClass: "is-active"
  });

  const photoSwiper = new Swiper(
    $(this).find(".swiper.is-slider-process-img")[0],
    {
      slidesPerView: 1,
      speed: 500,
      effect: "fade",
      keyboard: true
    }
  );

  listSwiper.controller.control = photoSwiper;
  photoSwiper.controller.control = listSwiper;
});

//Slider Explore
$(".slider-explore_component").each(function (index) {
  const bgeSwiper = new Swiper(
    $(this).find(".swiper.is-slider-bg_explore")[0],
    {
      slidesPerView: 1,
      loop: false,
      loopedSlides: 4,
      speed: 600,
      effect: "fade",
      allowTouchMove: false
    }
  );

  const continentSwiper = new Swiper(
    $(this).find(".swiper.is-slider-bg_continent")[0],
    {
      slidesPerView: 1,
      loop: false,
      loopedSlides: 4,
      speed: 400
    }
  );
  const locationseSwiper = new Swiper(
    $(this).find(".swiper.is-explore-locations")[0],
    {
      slidesPerView: 1,
      loop: false,
      loopedSlides: 4,
      speed: 400,
      direction: "vertical"
    }
  );
  const texteSwiper = new Swiper(
    $(this).find(".swiper.is-slider-titles_explore")[0],
    {
      slidesPerView: "auto",
      loop: false,
      loopedSlides: 4,
      speed: 600,
      slideToClickedSlide: true,
      grabCursor: true,
      keyboard: true,
      centeredSlides: true,
      slideActiveClass: "is-active",
      slideDuplicateActiveClass: "is-active",
      pagination: {
        el: ".swiper-pagination",
        type: "progressbar"
      },
      navigation: {
        nextEl: $(this).find(".swiper-next")[0],
        prevEl: $(this).find(".swiper-prev")[0],
        disabledClass: "is-disabled"
      }
    }
  );

  texteSwiper.controller.control = continentSwiper;
  continentSwiper.controller.control = bgeSwiper;
  bgeSwiper.controller.control = locationseSwiper;
});

//Slider Timeline
$(".slider-timeline_component").each(function (index) {
  const timelineSwiper = new Swiper(
    $(this).find(".swiper.is-slider-timeline")[0],
    {
      slidesPerView: "auto",
      centeredSlides: false,
      speed: 500,
      mousewheel: false,
      grabCursor: true
    }
  );
});

//Slider Reviews
$(".slider-thumbs_component").each(function (index) {
  const reviewSwiper = new Swiper($(this).find(".swiper.is-slider-thumbs")[0], {
    slidesPerView: "auto",
    freeMode: true,
    centeredSlides: false,
    speed: 500,
    mousewheel: false,
    grabCursor: true
  });
});

//Counter JS
// Example 3 - Multiple Numbers incl. count down, currency.
const optionsCountDown = {
  enableScrollSpy: true,
  startVal: 0,
  duration: 2
};
const numAnimDown = new countUp.CountUp("count-years", 8, optionsCountDown);

const optionsSubs = {
  enableScrollSpy: true,
  duration: 2
};

const numAnimSubs = new countUp.CountUp("count-honemooners", 280, optionsSubs);

const optionsRevenue = {
  enableScrollSpy: true,
  duration: 2
};
const numAnimRevenue = new countUp.CountUp(
  "count-families",
  190,
  optionsRevenue
);

//GSAP Show & Hide Lottie Drag

gsap.set(".cursor", { xPercent: -50, yPercent: -50 });

let xTo = gsap.quickTo(".cursor", "x", { duration: 0.3, ease: "power3" }),
  yTo = gsap.quickTo(".cursor", "y", { duration: 0.3, ease: "power3" });

window.addEventListener("mousemove", (e) => {
  // xTo(e.pageX);
  // yTo(e.pageY);
  xTo(e.clientX);
  yTo(e.clientY);
});

$(".cta_wrap, .process_wrap, .reviews_wrap").each(function (index) {
  ScrollTrigger.create({
    trigger: $(this),
    start: "top 10%",
    end: "bottom 10%",
    onEnter: () => {
      $(".navbar_component").addClass("light");
    },
    onEnterBack: () => {
      $(".navbar_component").addClass("light");
    }
  });
});

$(".services_wrap, .explore_wrap").each(function (index) {
  ScrollTrigger.create({
    trigger: $(this),
    start: "top 10%",
    end: "bottom 10%",
    onEnter: () => {
      $(".navbar_component").removeClass("light");
    },
    onEnterBack: () => {
      $(".navbar_component").removeClass("light");
    }
  });
});


//Lightbox Modal & Toggle Switch
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".toggle-button");
  const icons = document.querySelectorAll(".icon-embed");
  const lightbox = document.querySelector(".lightbox_component");
  const toggleSwitch = document.querySelector(".toggle-switch");
  const html = document.documentElement; // Added to select the html element
  const exploreWrap = document.querySelector(".explore_wrap");

  toggleButton.addEventListener("click", (event) => {
    event.preventDefault();

    icons.forEach((icon) => {
      icon.classList.toggle("is--active");
    });

    lightbox.classList.toggle("is--active");
    toggleSwitch.classList.toggle("is--active");

    if (lightbox.classList.contains("is--active")) {
      html.style.overflow = "hidden"; // Added to prevent scrolling
      exploreWrap.scrollIntoView({ block: "start" });
    } else {
      html.style.overflow = ""; // Added to allow scrolling
    }
  });
});

// Handle group clicks
const groups = document.querySelectorAll(".continent-group");

groups.forEach((group) => {
  group.addEventListener("click", function () {
    // Toggle selected class for all paths within the clicked group
    this.querySelectorAll("path").forEach((path) => {
      path.classList.toggle("selected");
    });
  });
});


// Your existing jQuery code
$(".map__continent").hover(function () {
  $(this)
    .siblings(".map__continent")
    .find(".continent")
    .toggleClass("sibling-continent");
});

$(".dot-embed").mouseenter(function () {
  $(".location").text($(this).attr("continent-name"));
});

$(".dot-embed").mouseleave(function () {
  $(".location").text("SELECT A CONTINENT");
});

$(".pop-item").css("display", "none");
$(".pop-item").eq(0).css("display", "block");

$(".item-dot").click(function () {
  var currentNumber = $(this).closest(".item-dot").index();
  $(".pop-item").css("display", "none");
  $(".pop-item").eq(currentNumber).css("display", "block");
});

//open popup
$(".dot-embed").on("click", function () {
  $(".pop-wrap").addClass("is--show");
});

$(".item-link").on("click", function () {
  $(".pop-wrap").removeClass("is--show");
});
