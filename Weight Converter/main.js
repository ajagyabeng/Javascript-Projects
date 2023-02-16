// Event Listener: Input
document.querySelector("#lbsInput").addEventListener("input", (e) => {
  // Get hold of value
  const lbs = e.target.value;

  document.querySelector("#grams-output").innerHTML = lbs / 0.0022046;

  document.querySelector("#kg-output").innerHTML = lbs / 2.2046;

  document.querySelector("#oz-output").innerHTML = lbs * 16;
});
