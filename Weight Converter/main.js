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
  document.querySelector("#input-form").style.display = "block";
});

// Event Listener: Select unit to convert to
document.querySelector("#unit-to").addEventListener("change", (e) => {
  document.getElementById(`${e.target.value}-block`).style.display = "block";
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
3. Block selected unit to convert from appearing in unit to convert to.
*/
