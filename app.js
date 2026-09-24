/* =====================================================
   GOOGLE APPS SCRIPT URL
===================================================== */

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwg3KtDFJt4nECB0PAM7WZ154OcZbwcRggFVWuqbUi1d51yavQd1JgM0yuaxDn9HPXt/exec";


/* =====================================================
   ELEMENTS
===================================================== */

const email = document.getElementById("email");

const form =
    document.getElementById("dateApplication");

const dateTimeInput =
    document.getElementById("dateTime");

const message =
    document.getElementById("message");

const proceedButton =
    document.getElementById("proceedButton");


const currentMonthElement =
    document.getElementById("currentMonth");

const calendarDays =
    document.getElementById("calendarDays");

const previousMonth =
    document.getElementById("previousMonth");

const nextMonth =
    document.getElementById("nextMonth");


const selectedDateDisplay =
    document.getElementById("selectedDateDisplay");

const selectedDateText =
    document.getElementById("selectedDateText");

const changeDateButton =
    document.getElementById("changeDateButton");


const timeSection =
    document.getElementById("timeSection");

const timeSlots =
    document.getElementById("timeSlots");


const finalDateTime =
    document.getElementById("finalDateTime");

const finalDateText =
    document.getElementById("finalDateText");

const finalTimeText =
    document.getElementById("finalTimeText");

const changeTimeButton =
    document.getElementById("changeTimeButton");


/* =====================================================
   DATE VARIABLES
===================================================== */

const today = new Date();

today.setHours(
    0,
    0,
    0,
    0
);


let displayedMonth =
    new Date(
        today.getFullYear(),
        today.getMonth(),
        1
    );


let selectedDate = null;

let selectedTime = null;


/* =====================================================
   TIME OPTIONS
===================================================== */

const availableTimes = [

    {
        value: "06:00",
        label: "06:00 AM"
    },

    {
        value: "07:00",
        label: "07:00 AM"
    },

    {
        value: "08:00",
        label: "08:00 AM"
    },

    {
        value: "09:00",
        label: "09:00 AM"
    },

    {
        value: "10:00",
        label: "10:00 AM"
    },

    {
        value: "11:00",
        label: "11:00 AM"
    },

    {
        value: "12:00",
        label: "12:00 PM"
    },

    {
        value: "13:00",
        label: "01:00 PM"
    },

    {
        value: "14:00",
        label: "02:00 PM"
    },

    {
        value: "15:00",
        label: "03:00 PM"
    }

];

/* =====================================================
   FORMAT DATE
===================================================== */

function formatDate(date) {

    return date.toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        }
    );

}


/* =====================================================
   FORMAT MONTH
===================================================== */

function formatMonth(date) {

    return date.toLocaleDateString(
        "en-US",
        {
            month: "long",
            year: "numeric"
        }
    );

}


/* =====================================================
   CHECK SAME DAY
===================================================== */

function isSameDay(date1, date2) {

    return (

        date1.getFullYear() ===
        date2.getFullYear()

        &&

        date1.getMonth() ===
        date2.getMonth()

        &&

        date1.getDate() ===
        date2.getDate()

    );

}


/* =====================================================
   RENDER CALENDAR
===================================================== */

function renderCalendar() {

    currentMonthElement.textContent =
        formatMonth(displayedMonth);


    calendarDays.innerHTML = "";


    const firstDay =
        new Date(
            displayedMonth.getFullYear(),
            displayedMonth.getMonth(),
            1
        );


    const daysInMonth =
        new Date(
            displayedMonth.getFullYear(),
            displayedMonth.getMonth() + 1,
            0
        ).getDate();


    let startingDay =
        firstDay.getDay();


    startingDay =
        startingDay === 0
            ? 6
            : startingDay - 1;


    /*
     * Empty spaces.
     */

    for (
        let i = 0;
        i < startingDay;
        i++
    ) {

        const empty =
            document.createElement("div");

        empty.className =
            "calendar-empty";

        calendarDays.appendChild(
            empty
        );

    }


    /*
     * Days.
     */

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const date =
            new Date(
                displayedMonth.getFullYear(),
                displayedMonth.getMonth(),
                day
            );


        const button =
            document.createElement("button");


        button.type =
            "button";


        button.className =
            "calendar-day";


        button.textContent =
            day;


        /*
         * Disable past dates.
         */

        if (date < today) {

            button.classList.add(
                "disabled"
            );

        }


        /*
         * Today.
         */

        if (isSameDay(date, today)) {

            button.classList.add(
                "today"
            );

        }


        /*
         * Selected date.
         */

        if (
            selectedDate &&
            isSameDay(
                date,
                selectedDate
            )
        ) {

            button.classList.add(
                "selected"
            );

        }


        /*
         * Date click.
         */

        if (date >= today) {

            button.addEventListener(
                "click",
                function () {

                    selectDate(date);

                }
            );

        }


        calendarDays.appendChild(
            button
        );

    }

}


/* =====================================================
   SELECT DATE
===================================================== */

function selectDate(date) {

    selectedDate =
        new Date(date);


    selectedTime =
        null;


    updateDateTimeInput();


    selectedDateText.textContent =
        formatDate(selectedDate);


    selectedDateDisplay.classList.remove(
        "hidden"
    );


    timeSection.classList.remove(
        "hidden"
    );


    finalDateTime.classList.add(
        "hidden"
    );


    renderTimeSlots();

    renderCalendar();

    checkForm();


    setTimeout(
        function () {

            timeSection.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });

        },
        100
    );

}


/* =====================================================
   RENDER TIME SLOTS
===================================================== */

function renderTimeSlots() {

    timeSlots.innerHTML = "";


    availableTimes.forEach(
        function (time) {

            const button =
                document.createElement("button");


            button.type =
                "button";


            button.className =
                "time-slot";


            button.textContent =
                time.label;


            if (
                selectedTime ===
                time.value
            ) {

                button.classList.add(
                    "selected"
                );

            }


            button.addEventListener(
                "click",
                function () {

                    selectTime(time);

                }
            );


            timeSlots.appendChild(
                button
            );

        }
    );

}


/* =====================================================
   SELECT TIME
===================================================== */

function selectTime(time) {

    selectedTime =
        time.value;


    updateDateTimeInput();


    finalDateText.textContent =
        formatDate(selectedDate);


    finalTimeText.textContent =
        time.label;


    finalDateTime.classList.remove(
        "hidden"
    );


    renderTimeSlots();

    checkForm();


    setTimeout(
        function () {

            finalDateTime.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });

        },
        100
    );

}


/* =====================================================
   UPDATE DATETIME
===================================================== */

function updateDateTimeInput() {

    if (
        !selectedDate ||
        !selectedTime
    ) {

        dateTimeInput.value = "";

        return;

    }


    const year =
        selectedDate.getFullYear();


    const month =
        String(
            selectedDate.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            selectedDate.getDate()
        ).padStart(2, "0");


    dateTimeInput.value =
        `${year}-${month}-${day}T${selectedTime}`;

}


/* =====================================================
   PREVIOUS MONTH
===================================================== */

previousMonth.addEventListener(
    "click",
    function () {

        const previous =
            new Date(
                displayedMonth.getFullYear(),
                displayedMonth.getMonth() - 1,
                1
            );


        const currentMonth =
            new Date(
                today.getFullYear(),
                today.getMonth(),
                1
            );


        if (previous >= currentMonth) {

            displayedMonth =
                previous;

            renderCalendar();

        }

    }
);


/* =====================================================
   NEXT MONTH
===================================================== */

nextMonth.addEventListener(
    "click",
    function () {

        displayedMonth =
            new Date(
                displayedMonth.getFullYear(),
                displayedMonth.getMonth() + 1,
                1
            );


        renderCalendar();

    }
);


/* =====================================================
   CHANGE DATE
===================================================== */

changeDateButton.addEventListener(
    "click",
    function () {

        selectedDate =
            null;

        selectedTime =
            null;

        dateTimeInput.value =
            "";


        selectedDateDisplay.classList.add(
            "hidden"
        );


        timeSection.classList.add(
            "hidden"
        );


        finalDateTime.classList.add(
            "hidden"
        );


        renderCalendar();

        checkForm();

    }
);


/* =====================================================
   CHANGE TIME
===================================================== */

changeTimeButton.addEventListener(
    "click",
    function () {

        selectedTime =
            null;


        dateTimeInput.value =
            "";


        finalDateTime.classList.add(
            "hidden"
        );


        renderTimeSlots();

        checkForm();

    }
);


/* =====================================================
   COFFEE VALUE
===================================================== */

function getCoffeeValue() {

    const selected =
        document.querySelector(
            'input[name="coffee"]:checked'
        );


    return selected
        ? selected.value
        : "";

}

function getCarryRating() {
    const selected = document.querySelector(
        'input[name="carryRating"]:checked'
    );

    return selected ? selected.value : "";
}
/* =====================================================
   CHECK FORM
===================================================== */

function checkForm() {
    const hasEmail =
        email.value.trim() !== "" &&
        email.checkValidity();

    const hasDateTime = dateTimeInput.value !== "";
    const hasCoffee = getCoffeeValue() !== "";
    const hasCarryRating = getCarryRating() !== "";
    const hasMessage = message.value.trim() !== "";

    proceedButton.disabled = !(
        hasEmail &&
        hasDateTime &&
        hasCoffee &&
        hasCarryRating &&
        hasMessage
    );
}

/* =====================================================
   INPUT LISTENERS
===================================================== */

message.addEventListener(
    "input",
    checkForm
);

email.addEventListener("input", checkForm);

document
    .querySelectorAll(
        'input[name="coffee"]'
    )
    .forEach(
        function (radio) {

            radio.addEventListener(
                "change",
                checkForm
            );

        }
    );

document.querySelectorAll('input[name="carryRating"]').forEach(function (radio) {
    radio.addEventListener("change", checkForm);
});
/* =====================================================
   SUBMIT FORM
===================================================== */

form.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        checkForm();


        if (
            proceedButton.disabled
        ) {

            return;

        }



        /* =============================================
           COLLECT RESPONSE
        ============================================== */

       const applicationData = {
    email: email.value.trim(),
    dateTime: dateTimeInput.value,
    coffee: getCoffeeValue(),
    carryRating: getCarryRating(),
    message: message.value.trim(),
    submittedAt: new Date().toISOString()
};

        /* =============================================
           BUTTON LOADING STATE
        ============================================== */

        proceedButton.disabled =
            true;


        proceedButton.innerHTML =
            "<span>Submitting...</span>";


        try {

            /* =========================================
               SEND TO GOOGLE SHEETS
            ========================================== */

            await fetch(
                GOOGLE_SCRIPT_URL,
                {

                    method: "POST",

                    mode: "no-cors",

                    headers: {
                        "Content-Type":
                            "text/plain;charset=utf-8"
                    },

                    body:
                        JSON.stringify(
                            applicationData
                        )

                }
            );


            /* =========================================
               SAVE LOCALLY AS BACKUP
            ========================================== */

            localStorage.setItem(
                "secretNerdDate",
                JSON.stringify(
                    applicationData
                )
            );


            /* =========================================
               SUCCESS
            ========================================== */

            proceedButton.innerHTML =
                "<span>Submitted ✓</span>";


            setTimeout(
                function () {

                    document.body.classList.add("page-exit");

setTimeout(() => {
    window.location.href = "question.html";
}, 500);

                },
                700
            );

        }


        catch (error) {

            console.error(
                "Submission error:",
                error
            );


            proceedButton.disabled =
                false;


            proceedButton.innerHTML =
                `
                <span>Try Again</span>
                <span class="button-arrow">→</span>
                `;


            alert(
                "Something went wrong while submitting. Please try again."
            );

        }

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

renderCalendar();

checkForm();

/* =========================================================
   FLOATING BACKGROUND PARTICLES
   ========================================================= */

function createParticles() {

    const symbols = ["✦", "✧", "·", "✦"];

    for (let i = 0; i < 12; i++) {

        const particle = document.createElement("div");

        particle.className = "background-particle";

        particle.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.top =
            Math.random() * 100 + "%";

        particle.style.animationDelay =
            Math.random() * 6 + "s";

        particle.style.animationDuration =
            5 + Math.random() * 4 + "s";

        document.body.appendChild(particle);
    }
}

createParticles();
