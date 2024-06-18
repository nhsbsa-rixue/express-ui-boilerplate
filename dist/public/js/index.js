"use strict";
const colorThief = new ColorThief();
const imageElements = document.querySelectorAll(".nhsuk-card__img");
function changeColor(colors) {
    let changeColors = colors.map((c) => `rgb(${c[0]},${c[1]},${c[2]})`);
    document.body.style.background = `linear-gradient(to right, ${changeColors[0]}, ${changeColors[1]}, ${changeColors[2]})`;
}
// Function to handle the hover event
function mouseOver() {
    let colors;
    if (this.complete) {
        colors = colorThief.getPalette(this, 3);
        changeColor(colors);
    }
    else {
        this.addEventListener("load", function () {
            colors = colorThief.getPalette(this, 3);
            changeColor(colors);
        });
    }
}
// Attach the hover event to all image elements
imageElements.forEach(function (img) {
    img.crossOrigin = "Anonymous";
    // Add event listener for mouseover
    img.onmouseover = mouseOver;
});
mouseOver.bind(imageElements[0])();
//# sourceMappingURL=index.js.map