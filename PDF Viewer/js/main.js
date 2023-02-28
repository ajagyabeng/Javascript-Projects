// Define variables
let pdfDoc = null,
  pageNum = 1,
  pageIsRendering = false,
  pageNumIsPending = null;

const scale = 1.5,
  canvas = document.querySelector("#pdf-render"),
  context = canvas.getContext("2d");

/*----------------------Open PDF----------------------*/
// Add location of pdf
const url = "../docs/sample.pdf";

//Get Document: pdfjsLib - from the cdn used: returns an object with a promise in it.
pdfjsLib
  .getDocument(url)
  .promise.then((pdfData) => {
    pdfDoc = pdfData;

    // add total number of pages to the DOM
    document.querySelector("#page-count").textContent = pdfDoc.numPages;

    renderPage(pageNum);
  })
  .catch((err) => {
    const div = document.createElement("div");
    div.className = "error";
    div.appendChild(document.createTextNode(err.message));
    document.querySelector("body").insertBefore(div, canvas);

    // remove top-bar
    document.querySelector(".top-bar").style.display = "none";
  });

/*---------------------Functions-------------------------*/

function renderPage(num) {
  // Renders a page in the document
  pageIsRendering = true; // page is in the process of rendering

  // Get page: getPage is a method from the pdfDoc object - returns a promise(use .then to access the page returned)
  pdfDoc.getPage(num).then((page) => {
    // console.log(page);

    // set scale for the viewport
    const viewport = page.getViewport({ scale: scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Define object to be passed into .render method from the page object
    const renderContext = {
      canvasContext: context,
      viewport,
    };

    page.render(renderContext).promise.then(() => {
      pageIsRendering = false; // Reset to false because at this point the page is finished rendering

      if (pageNumIsPending !== null) {
        renderPage(pageNumIsPending); // adds the page number
        pageNumIsPending = null;
      }
    });
    // Ouput current page
    document.querySelector("#page-num").textContent = num;
  });
}

// Check for pages rendering
function queueRenderPage(num) {
  if (pageIsRendering) {
    pageNumIsPending = num;
  } else {
    renderPage(num);
  }
}

// Show Previous page
function showPrevPage() {
  if (pageNum <= 1) {
    return;
  }
  pageNum--;
  queueRenderPage(pageNum);
}

// Show Next page
function showNextPage() {
  if (pageNum >= pdfDoc.numPages) {
    return;
  }
  pageNum++;
  queueRenderPage(pageNum);
}

// Button eventListeners
document.querySelector("#prev-page").addEventListener("click", showPrevPage);
document.querySelector("#next-page").addEventListener("click", showNextPage);
