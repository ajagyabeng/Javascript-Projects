// Hide input field until unit to convert from is selected.
document.querySelector("#input-form").style.display = "none";

// Hide output cards until unit to convert to is selected
document.querySelector("#g-block").style.display = "none";
document.querySelector("#kg-block").style.display = "none";
document.querySelector("#oz-block").style.display = "none";
document.querySelector("#lbs-block").style.display = "none";

/*------------EVENT LISTENERS-----------------*/
// Event Listener: Select unit to convert from
document.querySelector("#input-unit").addEventListener("change", (e) => {
  UI.enableOutputUnit();
  UI.checkCurrentInput(e);
});

// Event Listener: Select unit to convert to
document.querySelector("#output-unit").addEventListener("change", (e) => {
  UI.enableInputUnit();
  UI.checkCurrentOutput(e);
  UI.selectOutput(e);
});

// Event Listener: Disables selected input unit from output unit options
document.querySelector("#select-output-unit").addEventListener("click", (e) => {
  UI.disableOutputUnit();
});

// Event Listener: Disables slected output unit from input unit options
document.querySelector("#select-input-unit").addEventListener("click", (e) => {
  UI.disableInputUnit();
});

// Event Listener: Input
document.querySelector("#Input").addEventListener("input", (e) => {
  // Get hold of value for calculation
  const weight = e.target.value;

  const options = document.querySelectorAll(".input-unit-option");
  options.forEach((option) => {
    if (
      option.classList.contains("current") &&
      option.innerHTML === "Pounds(lbs)"
    ) {
      // lbs
      document.querySelector("#grams-output").innerHTML = weight / 0.0022046;
      document.querySelector("#kg-output").innerHTML = weight / 2.20462;
      document.querySelector("#oz-output").innerHTML = weight * 16;
    } else if (
      option.classList.contains("current") &&
      option.innerHTML === "Grams(g)"
    ) {
      // g
      document.querySelector("#kg-output").innerHTML = weight / 1000;
      document.querySelector("#lbs-output").innerHTML = weight / 453.6;
      document.querySelector("#oz-output").innerHTML = weight / 28.35;
    } else if (
      option.classList.contains("current") &&
      option.innerHTML === "Kilograms(kg)"
    ) {
      // kg
      document.querySelector("#grams-output").innerHTML = weight * 1000;
      document.querySelector("#lbs-output").innerHTML = weight * 2.20462;
      document.querySelector("#oz-output").innerHTML = weight * 35.274;
    } else if (
      option.classList.contains("current") &&
      option.innerHTML === "Ounces(oz)"
    ) {
      // oz
      document.querySelector("#kg-output").innerHTML = weight / 32.274;
      document.querySelector("#lbs-output").innerHTML = weight / 16;
      document.querySelector("#grams-output").innerHTML = weight * 28.35;
    }
  });
});

/*------------------------OOP: Classes-----------------------*/
class UI {
  /*---------------------- INPUT UNITS---------------------------*/
  static checkCurrentInput(e) {
    /*checks for currently selected input unit.*/

    // get the index of the newly selected input
    const selectedOptionIndex = e.target.options.selectedIndex;

    // check if an option already has the 'current' class then remove it before adding it to the newly selected option
    const options = document.querySelectorAll(".input-unit-option");
    options.forEach((option) => {
      if (option.classList.contains("current")) {
        option.classList.remove("current");
        options[selectedOptionIndex].classList.add("current");
      } else {
        options[selectedOptionIndex].classList.add("current");
      }
    });
    // Display the input field in a unit was selected
    if (e.target.value === "neutral") {
      document.querySelector("#input-form").style.display = "none";
    } else {
      document.querySelector("#input-form").style.display = "block";
    }
  }

  // DISABLE/ENABLE INPUT UNITS
  static enableInputUnit() {
    /*check if an option in unit to convert to is disabled and enable it.*/
    const toOptions = document.querySelectorAll(".input-unit-option");
    toOptions.forEach((option) => {
      if (option.hasAttribute("disabled")) {
        option.disabled = false;
      }
    });
  }

  static disableInputUnit() {
    const toOptions = document.querySelectorAll(".output-unit-option");
    toOptions.forEach((option) => {
      if (option.classList.contains("current")) {
        const toAttribute = option.getAttribute("value");
        // Get hold of options to convert to and set attribute to disabled
        const fromOptions = document.querySelectorAll(".input-unit-option");
        fromOptions.forEach((option) => {
          if (option.getAttribute("value") === toAttribute) {
            option.disabled = true;
          }
        });
      }
    });
  }

  /*----------------------OUTPUT UNITS---------------------------*/
  static checkCurrentOutput(e) {
    const selectedOptionIndex = e.target.options.selectedIndex;
    const options = document.querySelectorAll(".output-unit-option");
    options.forEach((option) => {
      if (option.classList.contains("current")) {
        option.classList.remove("current");
        options[selectedOptionIndex].classList.add("current");
      } else {
        options[selectedOptionIndex].classList.add("current");
      }
    });
  }

  static selectOutput(e) {
    /*Removes card when a different unit is selected*/
    const outputCards = document.querySelectorAll(".output-card");
    outputCards.forEach((card) => {
      card.style.display = "none";
    });
    if (e.target.value != "neutral") {
      document.getElementById(`${e.target.value}-block`).style.display =
        "block";
    }
  }

  // ENABLE/DISABLE OUTPUT UNITS

  static enableOutputUnit() {
    /*check if an option in unit to convert to is disabled and enable it.*/
    const toOptions = document.querySelectorAll(".output-unit-option");
    toOptions.forEach((option) => {
      if (option.hasAttribute("disabled")) {
        option.disabled = false;
      }
    });
  }

  static disableOutputUnit() {
    const fromOptions = document.querySelectorAll(".input-unit-option");
    fromOptions.forEach((option) => {
      if (option.classList.contains("current")) {
        const fromAttribute = option.getAttribute("value");
        // Get hold of options to convert to and set attribute to disabled
        const toOptions = document.querySelectorAll(".output-unit-option");
        toOptions.forEach((option) => {
          if (option.getAttribute("value") === fromAttribute) {
            option.disabled = true;
          }
        });
      }
    });
  }
}

/*
TODOS
1. 
*/
