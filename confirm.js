const noButton = document.getElementById("noButton");
const yesButton = document.getElementById("yesButton");


/* =========================================
   YES BUTTON
========================================= */

yesButton.addEventListener("click", function () {
    window.location.href = "thanks.html";
});


/* =========================================
   MOVE NO BUTTON
========================================= */

function moveNoButton() {

    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;

    const padding = 30;

    const maxX =
        window.innerWidth -
        buttonWidth -
        padding;

    const maxY =
        window.innerHeight -
        buttonHeight -
        padding;


    const randomX =
        padding +
        Math.random() *
        (maxX - padding);


    const randomY =
        padding +
        Math.random() *
        (maxY - padding);


    /*
     * Only make it fixed AFTER
     * the user tries to interact with it.
     */

    noButton.style.position = "fixed";

    noButton.style.left =
        `${randomX}px`;

    noButton.style.top =
        `${randomY}px`;

    noButton.style.zIndex = "9999";
}


/* =========================================
   MOUSE
========================================= */

noButton.addEventListener(
    "mouseenter",
    moveNoButton
);


/* =========================================
   CLICK
========================================= */

noButton.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        moveNoButton();

    }
);


/* =========================================
   TOUCH
========================================= */

noButton.addEventListener(
    "touchstart",
    function (event) {

        event.preventDefault();

        moveNoButton();

    },
    {
        passive: false
    }
);
