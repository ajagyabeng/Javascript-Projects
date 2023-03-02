class Operation {
  static filterNames() {
    // Get value of input
    const filterValue = document
      .querySelector("#filter-input")
      .value.toUpperCase();

    // Get names ul
    const ul = document.querySelector("#names");

    // Get lis from ul
    const lis = ul.querySelectorAll(".collection-item");

    //Loop through collection-item lis
    lis.forEach((li) => {
      let a = li.getElementsByTagName("a")[0];

      // Check if it matches
      if (a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
        li.style.display = "";
      } else {
        li.style.display = "none";
      }
    });
  }
}

export { Operation };
