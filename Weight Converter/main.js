// Hide input field until unit to convert from is selected.
document.querySelector("#input-form").style.display = "none";

// Hide output cards until unit to convert to is selected
document.querySelector("#g-block").style.display = "none";
document.querySelector("#kg-block").style.display = "none";
document.querySelector("#oz-block").style.display = "none";
document.querySelector("#lbs-block").style.display = "none";

/*------------EVENT LISTENERS-----------------*/
// Event Listener: Select unit to convert from
document.querySelector("#unit-from").addEventListener("change", (e) => {
  /*check if an option in unit to convert to is disabled and enable it.*/
  const toOptions = document.querySelectorAll(".to-option");
  toOptions.forEach((option) => {
    if (option.hasAttribute("disabled")) {
      option.disabled = false;
    }
  });

  /*checks if a unit has been selected before displaying input field*/
  const selectedOptionIndex = e.target.options.selectedIndex;
  // add a class to selected element
  const options = document.querySelectorAll(".from-option");
  options.forEach((option) => {
    if (option.classList.contains("current")) {
      // check if an option already has the 'current' class then remove it before adding it to the newly selected option
      option.classList.remove("current");
      options[selectedOptionIndex].classList.add("current");
    } else {
      options[selectedOptionIndex].classList.add("current");
    }
  });

  if (e.target.value === "neutral") {
    document.querySelector("#input-form").remove();
  } else {
    document.querySelector("#input-form").style.display = "block";
  }
});

// Event Listener: Select unit to convert to
document.querySelector("#unit-to").addEventListener("change", (e) => {
  /*Removes card when a different unit is selected*/
  const outputCards = document.querySelectorAll(".output-card");
  outputCards.forEach((card) => {
    card.style.display = "none";
  });
  if (e.target.value != "all") {
    document.getElementById(`${e.target.value}-block`).style.display = "block";
  }
});

// Event Listener: Disables unit that is to be converted from
document.querySelector("#select-unit").addEventListener("click", (e) => {
  const fromOptions = document.querySelectorAll(".from-option");
  fromOptions.forEach((option) => {
    if (option.classList.contains("current")) {
      const fromAttribute = option.getAttribute("value");
      // Get hold of options to convert to and set attribute to disabled
      const toOptions = document.querySelectorAll(".to-option");
      toOptions.forEach((option) => {
        if (option.getAttribute("value") === fromAttribute) {
          option.disabled = true;
        }
      });
    }
  });
});

// Event Listener: Input
document.querySelector("#lbsInput").addEventListener("input", (e) => {
  // Get hold of value
  // document.querySelector("#output").style.visibility = "visible";
  const lbs = e.target.value;

  // display gram value in output
  document.querySelector("#grams-output").innerHTML = lbs / 0.0022046;

  // display kilogram value in output
  document.querySelector("#kg-output").innerHTML = lbs / 2.2046;

  // display ounze value in output
  document.querySelector("#oz-output").innerHTML = lbs * 16;
});

/*
1. Remove previsouly selected output when new output is selected.
2. Write code to convert weight to each other
*/
