// Prevnt display of some items.
document.querySelector("#input-form").style.display = "none";

document.querySelector("#g-block").style.display = "none";
document.querySelector("#kg-block").style.display = "none";
document.querySelector("#oz-block").style.display = "none";
document.querySelector("#lbs-block").style.display = "none";

/*------------EVENT LISTENERS-----------------*/
document.querySelector("#input-unit").addEventListener("change", (e) => {
  UI.enableOutputUnit();
  UI.checkCurrentInput(e);
});

document.querySelector("#output-unit").addEventListener("change", (e) => {
  UI.enableInputUnit();
  UI.checkCurrentOutput(e);
  UI.selectOutput(e);
});

document.querySelector("#select-output-unit").addEventListener("click", (e) => {
  UI.disableOutputUnit();
});

document.querySelector("#select-input-unit").addEventListener("click", (e) => {
  UI.disableInputUnit();
});

document.querySelector("#Input").addEventListener("input", (e) => {
  const weight = e.target.value;

  const options = document.querySelectorAll(".input-unit-option");
  options.forEach((option) => {
    if (
      option.classList.contains("current") &&
      option.innerHTML === "Pounds(lbs)"
    ) {
      document.querySelector("#g-outputut").innerHTML = weight / 0.0022046;
      document.querySelector("#kg-output").innerHTML = weight / 2.20462;
      document.querySelector("#oz-output").innerHTML = weight * 16;
    } else if (
      option.classList.contains("current") &&
      option.innerHTML === "Grams(g)"
    ) {
      document.querySelector("#kg-output").innerHTML = weight / 1000;
      document.querySelector("#lbs-output").innerHTML = weight / 453.6;
      document.querySelector("#oz-output").innerHTML = weight / 28.35;
    } else if (
      option.classList.contains("current") &&
      option.innerHTML === "Kilograms(kg)"
    ) {
      document.querySelector("#g-outputut").innerHTML = weight * 1000;
      document.querySelector("#lbs-output").innerHTML = weight * 2.20462;
      document.querySelector("#oz-output").innerHTML = weight * 35.274;
    } else if (
      option.classList.contains("current") &&
      option.innerHTML === "Ounces(oz)"
    ) {
      document.querySelector("#kg-output").innerHTML = weight / 32.274;
      document.querySelector("#lbs-output").innerHTML = weight / 16;
      document.querySelector("#g-outputut").innerHTML = weight * 28.35;
    }
  });
});

/*------------------------OOP: Classes-----------------------*/
class UI {
  /*---------------------- INPUT UNITS---------------------------*/
  static checkCurrentInput(e) {
    /*checks for currently selected input unit.*/
    const selectedOptionIndex = e.target.options.selectedIndex;

    const options = document.querySelectorAll(".input-unit-option");
    options.forEach((option) => {
      if (option.classList.contains("current")) {
        option.classList.remove("current");
        options[selectedOptionIndex].classList.add("current");
      } else {
        options[selectedOptionIndex].classList.add("current");
      }
    });

    if (e.target.value === "input-neutral") {
      document.querySelector("#input-form").style.display = "none";
    } else {
      document.querySelector("#input-form").style.display = "block";
    }
  }

  static disableInputUnit() {
    /*Disables a unit from selection when it is selected as the output unit*/
    const toOptions = document.querySelectorAll(".output-unit-option");
    toOptions.forEach((option) => {
      if (option.classList.contains("current")) {
        const toAttribute = option.getAttribute("value");

        const fromOptions = document.querySelectorAll(".input-unit-option");
        fromOptions.forEach((option) => {
          if (option.getAttribute("value") === toAttribute) {
            option.disabled = true;
          }
        });
      }
    });
  }

  static enableInputUnit() {
    /*Enables a previously disabled input unit*/
    const toOptions = document.querySelectorAll(".input-unit-option");
    toOptions.forEach((option) => {
      if (option.hasAttribute("disabled")) {
        option.disabled = false;
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

  static disableOutputUnit() {
    const fromOptions = document.querySelectorAll(".input-unit-option");
    fromOptions.forEach((option) => {
      if (option.classList.contains("current")) {
        const fromAttribute = option.getAttribute("value");

        const toOptions = document.querySelectorAll(".output-unit-option");
        toOptions.forEach((option) => {
          if (option.getAttribute("value") === fromAttribute) {
            option.disabled = true;
          }
        });
      }
    });
  }

  static enableOutputUnit() {
    /*Enables a previously disabled output unit*/
    const toOptions = document.querySelectorAll(".output-unit-option");
    toOptions.forEach((option) => {
      if (option.hasAttribute("disabled")) {
        option.disabled = false;
      }
    });
  }
}

/*
TODOS
1. 
*/
