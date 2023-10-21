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

// Your existing GSAP code
gsap.set(".cursor", { xPercent: -50, yPercent: -50 });
let xTo = gsap.quickTo(".cursor", "x", { duration: 0.6, ease: "power3" }),
  yTo = gsap.quickTo(".cursor", "y", { duration: 0.6, ease: "power3" });

window.addEventListener("mousemove", (e) => {
  xTo(e.clientX);
  yTo(e.clientY);
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
