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
        slideToClickedSlide: false,
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
  //End of Swiper
  
  //Select2
  $(document).ready(function () {
    $(".f-input-field.is--continent").select2();
  });
  
  // Function to handle selection change
  $(document).ready(function () {
    $(".country-select").on("change", function () {
      var selectedValues = $(this).val();
      var inputId = $(this).data("input");
      if (selectedValues) {
        $("#" + inputId).val(selectedValues.join(", "));
      } else {
        $("#" + inputId).val(""); // clear the text field if no values are selected
      }
    });
  });
  
  //DATE PICKER Range
  document.getElementsByClassName("date-range")[0].flatpickr({
    mode: "range",
    altInput: true,
    altFormat: "d M, Y",
    dateFormat: "Y-m-d",
    minDate: "today",
    onChange: function (selectedDates, dateStr, instance) {
      if (selectedDates.length === 2) {
        // Ensure both dates are selected
        var days =
          (selectedDates[1] - selectedDates[0]) / (1000 * 60 * 60 * 24) + 1; // Calculate days
        var weeks = Math.floor(days / 7); // Calculate weeks
  
        // Update the div content
        var outputDiv = document.querySelector(".date-text--fs7-2");
        outputDiv.innerHTML = `<span class="days-span">${days} days</span> (<span class="week-span">${weeks} weeks</span>)`;
      }
    }
  });
  
  //Date Picker Birthdate
  document.getElementsByClassName("date-bday")[0].flatpickr({
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
    maxDate: "2009-12-31" // Users can only select dates before today
  });
  //Date Picker Normal
  document.getElementsByClassName("date")[0].flatpickr({
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d"
  });
  //Date Picker Normal
  document.getElementsByClassName("date-cruise")[0].flatpickr({
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d"
  });
  
  //Jquery
  $(".f-form-trip").on("click", function () {
    $(".trip-type-img--ca1").removeClass("active"); // Remove active class from all
    $(this).find(".trip-type-img--ca1").addClass("active"); // Add active class to the selected one
  });
  
  $(".f-pill-btn-other-trip").each(function (index) {
    $(this).on("click", function () {
      $(".f-input-field-other-trip.active").eq(index).removeClass("active");
    });
  });
  $(".f-pill-btn-other-preference").each(function (index) {
    $(this).on("click", function () {
      $(".f-input-field-other-preference.active").eq(index).removeClass("active");
    });
  });
  
  $(".f-pill-btn-other-hobby").each(function (index) {
    $(this).on("click", function () {
      $(".f-input-field-other-hobby.active").eq(index).removeClass("active");
    });
  });
  
  $(".form_main_option_item.other").each(function (index) {
    $(this).on("click", function () {
      $(".f-input-field-other-source.active").eq(index).removeClass("active");
    });
  });
  
  $(".form_main_option_item.other-budget").each(function (index) {
    $(this).on("click", function () {
      $(".f-input-field-other-budget.active").eq(index).removeClass("active");
    });
  });

  $(".form_main_option_item.instagram").each(function (index) {
    $(this).on("click", function () {
      $(".f-input-field-instagram--cd3.active").eq(index).removeClass("active");
    });
  });
  // New part - Adds 'active' class when options other than Instagram are clicked
  $(".form_main_option_item:not(.instagram)").each(function () {
    $(this).on("click", function () {
      // Assuming there is a specific way to determine which '.f-input-field-instagram--cd3' element to activate
      // For simplicity, let's activate all of them. Adjust the selector as needed for your use case.
      $(".f-input-field-instagram--cd3").addClass("active");
    });
  });
  
  //ADD FIELDS JS
  $(document).ready(function () {
    var maxFields = 20; // Adjust this value as needed
  
    var settings = [
      {
        numberOfPeopleInput: "#Number-of-Attendees-Fv", // Family Vacation attendee input ID
        buttonAdd: $("#add-fv-option"),
        className: ".fv-option",
        firstFieldId: "#fv-option-1"
      },
      {
        numberOfPeopleInput: "#Number-of-Attendees-Cr", // Couples Retreat attendee input ID
        buttonAdd: $("#add-cr-option"),
        className: ".cr-option",
        firstFieldId: "#cr-option-1"
      },
      {
        numberOfPeopleInput: "#Number-of-Attendees-Ft", // Friends Trip attendee input ID
        buttonAdd: $("#add-ft-option"),
        className: ".ft-option",
        firstFieldId: "#ft-option-1"
      }
    ];
  
    settings.forEach((setting) => {
      $(setting.numberOfPeopleInput).on("input", function () {
        var numberOfPeople = $(this).val();
        numberOfPeople = Math.min(numberOfPeople, maxFields);
        $(setting.className).not(":first").remove();
  
        for (var i = 1; i < numberOfPeople; i++) {
          addNewField(setting.buttonAdd, setting.className, setting.firstFieldId);
        }
      });
  
      setting.buttonAdd.click(function () {
        addNewField(setting.buttonAdd, setting.className, setting.firstFieldId);
      });
    });
  
    function addNewField(buttonAdd, className, firstFieldId) {
      var totalFields = $(className).length;
  
      if (totalFields < maxFields) {
        var field = $(firstFieldId).clone();
        var count = totalFields + 1;
  
        field.attr("id", field.attr("id").replace("1", count));
        field
          .find("label")
          .attr("for", "additional-option" + count)
          .text("Person " + count);
        field.find("input").attr({
          id: "additional-option" + count,
          "data-name": "additional-option" + count,
          name: "additional-option" + count,
          value: ""
        });
  
        $(className + ":last").after(field);
      }
  
      if (totalFields + 1 === maxFields) {
        buttonAdd.attr("disabled", "disabled");
      }
    }
  });
  function addNewField(buttonAdd, className, firstFieldId) {
    var totalFields = $(className).length;
  
    if (totalFields < maxFields) {
      var field = $(firstFieldId).clone();
      var count = totalFields + 1;
  
      field.attr("id", field.attr("id").replace("1", count));
      field
        .find("label")
        .attr("for", "additional-option" + count)
        .text("Person " + count);
      field
        .find("input")
        .attr({
          id: "additional-option" + count,
          "data-name": "additional-option" + count,
          name: "additional-option" + count,
          value: ""
        })
        .val("") // ensure the field is empty
        .trigger("input") // trigger the input event to facilitate validation
        .trigger("focusout"); // trigger focusout event to facilitate validation
  
      $(className + ":last").after(field);
    }
  
    if (totalFields + 1 === maxFields) {
      buttonAdd.attr("disabled", "disabled");
    }
  }
  
  //Quantity Input
  const incrementButtons = document.querySelectorAll(".input-number-increment");
  const decrementButtons = document.querySelectorAll(".input-number-decrement");
  
  function updateInputValue(inputField, newValue) {
    inputField.value = newValue;
    // Trigger a change event to inform the form of the updated value
    inputField.dispatchEvent(new Event("change", { bubbles: true }));
  }
  
  incrementButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const counterGroup = event.target.closest(".input-group");
      const inputField = counterGroup.querySelector(".input-number");
      let currentValue = parseInt(inputField.value, 10);
      if (isNaN(currentValue)) {
        updateInputValue(inputField, 1);
      } else {
        updateInputValue(inputField, currentValue + 1);
      }
    });
  });
  
  decrementButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const counterGroup = event.target.closest(".input-group");
      const inputField = counterGroup.querySelector(".input-number");
      let currentValue = parseInt(inputField.value, 10);
      if (isNaN(currentValue) || currentValue <= 0) {
        updateInputValue(inputField, 0);
      } else {
        updateInputValue(inputField, currentValue - 1);
      }
    });
  });
  
  // Find the form
  var form = $('form[data-name="Upgrade form"]');
  // Update the values of the inputs
  form.find(".input-number").each(function () {
    $(this).val("0");
  });
  //Show Destination Items
  function filterDestinationItems() {
    var selectedRadio = document.querySelector(
      'input[name="Type-of-trip"]:checked'
    );
  
    // Exit the function if no radio button is selected
    if (selectedRadio === null) {
      return;
    }
  
    var selectedTripType = selectedRadio.value;
    console.log("Selected Trip Type:", selectedTripType); // logs the selected value to the console
  
    // Get all destination-item elements
    var elements = document.querySelectorAll(".destination-item");
  
    // Iterate through the elements
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
  
      // Get the trip type attribute from the destination-item element
      var tripType = element.getAttribute("data-match-attribute");
  
      // Show or hide the element based on the attribute value
      element.style.display = tripType === selectedTripType ? "grid" : "none";
    }
  }
  
  // Event listener for radio button selection
  document
    .querySelectorAll('input[name="Type-of-trip"]')
    .forEach(function (radio) {
      radio.addEventListener("change", filterDestinationItems);
    });
  
  //DOWNLOAD PDF, OPEN IN NEW TAB
  // Function to convert HTML to PDF and open in a new tab
  async function convertToPdf() {
    let element = document.getElementById("summary-step");
  
    // Hide elements
    let elementsToHide = document.querySelectorAll(".hide-on-pdf");
    elementsToHide.forEach((el) => (el.style.display = "none"));
  
    let worker = await html2pdf()
      .from(element)
      .toPdf()
      .output("blob")
      .then((data) => {
        let fileURL = URL.createObjectURL(data);
        window.open(fileURL);
      });
  
    // Show elements again
    elementsToHide.forEach((el) => (el.style.display = ""));
  }
  // Event listener to trigger PDF conversion on button click
  
  document.getElementById("downloadPDF").addEventListener("click", convertToPdf);
  
  /*document.getElementById("downloadPDF").addEventListener("click", function () {
    window.print();
  });*/
  
  //Checkbox Values to Input Hidden
  
  var form = document.getElementById("Upgrade-Form");
  
  // Create hidden inputs for each category
  var hobbiesHiddenInput = createHiddenInput("selectedHobbies");
  var preferencesHiddenInput = createHiddenInput("selectedPreferences");
  var budgetHiddenInput = createHiddenInput("selectedBudget");
  
  // Append hidden inputs to form
  form.appendChild(hobbiesHiddenInput);
  form.appendChild(preferencesHiddenInput);
  form.appendChild(budgetHiddenInput);
  
  // Set up event listener for changes on form
  form.addEventListener("change", function () {
    updateHiddenInput("hobbies-options", hobbiesHiddenInput);
    updateHiddenInput("preferences-options", preferencesHiddenInput);
    updateHiddenInput("budget-options", budgetHiddenInput);
  });
  
  function createHiddenInput(name) {
    var hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = name;
    hiddenInput.id = name;
    return hiddenInput;
  }
  
  function updateHiddenInput(optionCategoryId, hiddenInput) {
    var checkboxes = document.querySelectorAll(
      `#${optionCategoryId} input[type="checkbox"]:checked`
    );
    var values = [];
    checkboxes.forEach(function (checkbox) {
      values.push(checkbox.name);
    });
    hiddenInput.value = values.join(",");
  }
  
  //Pop Up Modal
  $(document).ready(function () {
    $(document).on("click", '[data-ajaxmodal-element="form-link"]', function (e) {
      e.preventDefault();
      let linkUrl = $(this).attr("href");
  
      $.ajax({
        url: linkUrl,
        success: function (response) {
          let formContent = $(response)
            .find('[data-ajaxmodal-element="form-content"]')
            .html();
          console.log(formContent); // Check the console to see if the form content is loaded
        },
        error: function (error) {
          console.error("Error loading content", error);
        }
      });
    });
  });
  