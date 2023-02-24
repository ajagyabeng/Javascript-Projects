// Elements to Hide on webpage when it loads
const itemsToHide = [
  "#input-form",
  "#g-block",
  "#kg-block",
  "#oz-block",
  "#lbs-block",
];
itemsToHide.forEach((item) => {
  document.querySelector(item).style.display = "none";
});

/*------------EVENT LISTENERS-----------------*/
document.querySelector("#input-unit").addEventListener("change", (e) => {
  UI.enableOutputUnit();
  UI.checkSelectedUnit(e);
  UI.showInputField(e);
  UI.reselectUnitValue();
});

document.querySelector("#output-unit").addEventListener("change", (e) => {
  UI.enableInputUnit();
  UI.checkSelectedUnit(e);
  UI.selectOutput(e);
  UI.reselectUnitValue();
});

document.querySelector("#select-output-unit").addEventListener("click", (e) => {
  UI.disableOutputUnit();
});

document.querySelector("#select-input-unit").addEventListener("click", (e) => {
  UI.disableInputUnit();
});

document.querySelector("#Input").addEventListener("input", (e) => {
  const weight = e.target.value;
  Operation.convert(weight);
});

/*------------------------OOP: Classes-----------------------*/
class UI {
  /*---------------------- INPUT UNITS---------------------------*/
  static checkSelectedUnit(e) {
    /*Checks options to between the current selected option*/
    const selectedOptionIndex = e.target.options.selectedIndex; // Gets the index of newly selected option
    const convertDirection = e.target.id.split("-")[0]; // input or output
    const options = document.querySelectorAll(
      `.${convertDirection}-unit-option`
    );
    options.forEach((option) => {
      if (option.classList.contains(`current-${convertDirection}`)) {
        option.classList.remove(`current-${convertDirection}`);
        options[selectedOptionIndex].classList.add(
          `current-${convertDirection}`
        );
      } else {
        options[selectedOptionIndex].classList.add(
          `current-${convertDirection}`
        );
      }
    });
  }

  static showInputField(e) {
    /*Displays input field when an input unit is selected*/
    if (e.target.value === "input-neutral") {
      document.querySelector("#input-form").style.display = "none";
    } else {
      document.querySelector("#input-form").style.display = "block";
    }
  }

  static disableInputUnit() {
    /*Disables input unit that has been selected as the output unit*/
    const toOptions = document.querySelectorAll(".output-unit-option");
    toOptions.forEach((option) => {
      if (option.classList.contains("current-output")) {
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
    /*Enables a previously disabled input unit to make it available for selection when it is no longer the selected output unit*/
    const toOptions = document.querySelectorAll(".input-unit-option");
    toOptions.forEach((option) => {
      if (option.hasAttribute("disabled")) {
        option.disabled = false;
      }
    });
  }

  /*----------------------OUTPUT UNITS---------------------------*/
  static selectOutput(e) {
    /*Hides previously selected output card and displays output card for newly selected unit.*/
    const outputCards = document.querySelectorAll(".output-card");
    outputCards.forEach((card) => {
      card.style.display = "none";
    });
    if (e.target.value != "output-neutral") {
      document.getElementById(`${e.target.value}-block`).style.display =
        "block";
    }
  }

  static reselectUnitValue() {
    /*Checks value in input field and returns its' converted value to a new selected output unit card*/
    if (document.querySelector("#Input").value) {
      const weight = document.querySelector("#Input").value;
      Operation.convert(weight);
    }
  }

  static disableOutputUnit() {
    /*Disables output unit that has been selected as the input unit*/
    const fromOptions = document.querySelectorAll(".input-unit-option");
    fromOptions.forEach((option) => {
      if (option.classList.contains("current-input")) {
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
    /*Enables a previously disabled output unit to make it available for selection when it is no longer the selected input unit*/
    const toOptions = document.querySelectorAll(".output-unit-option");
    toOptions.forEach((option) => {
      if (option.hasAttribute("disabled")) {
        option.disabled = false;
      }
    });
  }

  static showResult(formulas, inputUnit, outputUnit) {
    /*Displays result in output card*/
    if (outputUnit != "output-neutral" && inputUnit != "input-neutral") {
      document.querySelector(`#${outputUnit}-output`).innerHTML =
        formulas[`${inputUnit}${outputUnit}`];
    }
  }
}

class Operation {
  static convert(weight) {
    /*Calculates conversion and calls showResults to display result*/
    const formulas = {
      lbsg: weight / 0.0022046,
      lbskg: weight / 2.20462,
      lbsoz: weight * 16,
      gkg: weight / 1000,
      glbs: weight / 453.6,
      goz: weight / 28.35,
      kgg: weight * 1000,
      kglbs: weight * 2.20462,
      kgoz: weight * 35.274,
      ozkg: weight / 35.274,
      ozlbs: weight / 16,
      ozg: weight * 28.35,
    };

    const inputUnit = document
      .querySelector(".current-input")
      .getAttribute("value");

    if (document.querySelector(".current-output")) {
      const outputUnit = document
        .querySelector(".current-output")
        .getAttribute("value");
      UI.showResult(formulas, inputUnit, outputUnit);
    }
  }
}

/*
TODOS
1. Further DRY code
2. Stop disabling units but switch between units instead
*/
