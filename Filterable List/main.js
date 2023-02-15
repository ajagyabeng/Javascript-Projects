// Get input element
const filterInput = document.querySelector("#filter-input");

// Add eventlistener
filterInput.addEventListener("keyup", filterNames);

function filterNames() {
  // Get value of input
  const filterValue = filterInput.value.toUpperCase();

  // Get names ul
  const ul = document.querySelector("#names");

  // Get lis from ul
  const lis = ul.querySelectorAll(".collection-item");

  //Loop through collection-item lis
  lis.forEach((li) => {
    //
    let a = li.getElementsByTagName("a")[0];

    // Check if it matches
    if (a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      // checks if filterValue is in list of names
      li.style.display = "";
    } else {
      li.style.display = "none";
    }
  });
}
