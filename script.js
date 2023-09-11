const dayList = document.querySelector(".days");
const monthList = document.querySelector(".months");
const yearList = document.querySelector(".years");
const monthYear = document.querySelector(".month-year");
const onlyYear = document.getElementById("only-year")
const dayWeek = document.querySelector(".day-week");
const prevMonth = document.getElementById("prev-month");
const nextMonth = document.getElementById("next-month");
const prevYear = document.getElementById("prev-year")
const nextYear = document.getElementById("next-year");
const monthCalendar = document.querySelector(".month-calendar");
const dateCalendar = document.querySelector(".date-calendar");
const yearCalendar = document.querySelector(".year-calendar");
prevNextIcon = document.querySelectorAll(".icon span");

//Get current date
const date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct", "Nov", "Dec"];

//Add dayweek into header
dayWeek.textContent = `${date.toLocaleString("default", { weekday: "long" })}, ${date.toLocaleString("default", { month: "long" })} ${date.getDate()}`;


//Render calendar
function renderCalendar(year, month) {
    const CELLS = 42;
    let firstDayofMonth = new Date(year, month, 1).getDay(), // getting first day of month
        lastDateofMonth = new Date(year, month + 1, 0).getDate(), // getting last date of month
        lastDayofMonth = new Date(year, month, lastDateofMonth).getDay(), // getting last day of month
        lastDateofLastMonth = new Date(year, month, 0).getDate(); // getting last date of previous month
    let liTag = "";


    const offsetTop = firstDayofMonth;
    const offsetBottom = CELLS - lastDateofMonth - offsetTop;

    for (let i = lastDateofLastMonth - offsetTop + 1; i <= lastDateofLastMonth; i++) {
        liTag += `<li class="inactive">${i}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && month === date.getMonth() && year === date.getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = 1; i <= offsetBottom; i++) {
        liTag += `<li class="inactive">${i}</li>`;
    }

    monthYear.innerText = `${months[month]} ${year}`;
    dayList.innerHTML = liTag;
}

renderCalendar(currentYear, currentMonth);

//Render month of year
function renderMonthCalendar(year, month) {
    dateCalendar.style.display = "none";
    monthCalendar.style.display = "block";

    const CELLS = 16; // month will fixed in 16 cell
    let liTag = "";


    for (let i = 0; i < 12; i++) {
        const isCurrentMonth = i === month;
        const monthYearCheck = new Date(year, i, 1).getFullYear();

        if (monthYearCheck === year) {
            liTag += `<li class="${isCurrentMonth ? "active" : ""}" data-month="${i}">${shortMonths[i]}</li>`;
        }
        else {
            liTag += `<li class="inactive" data-month="${i}">${shortMonths[i]}</li>`;
        }
    }

    // Fill the remaining cells with "inactive" months
    for (let i = 0; i < CELLS - 12; i++) {
        const nextYear = year + 1; // Get next month
        const nextMonth = i + 1; // Start at first month of year
        liTag += `<li class="inactive"}">${shortMonths[nextMonth - 1]}</li>`;
    }

    monthList.innerHTML = liTag;
    onlyYear.innerText = `${year}`;

    const monthItems = document.querySelectorAll(".months li");
    monthItems.forEach((monthItem) => {
        monthItem.addEventListener("click", () => {
            const selectedMonth = parseInt(monthItem.getAttribute("data-month"));
            // render month of year
            renderCalendar(year, selectedMonth);
            dateCalendar.style.display = "block";
            monthCalendar.style.display = "none";
            yearCalendar.style.display = "none";
        });
    });
}


//Render year
function renderYearCalendar(centerYear) {
    dateCalendar.style.display = "none";
    monthCalendar.style.display = "none";
    yearCalendar.style.display = "block";

    const yearsToShow = 16; // year to show
    const yearsBeforeCenter = Math.floor(yearsToShow / 2); // year before center year
    const yearsAfterCenter = yearsToShow - yearsBeforeCenter - 1; // year behind center year

    let liTag = "";

    for (let i = centerYear - yearsBeforeCenter; i <= centerYear + yearsAfterCenter; i++) {
        const isCurrentYear = i === currentYear;
        liTag += `<li class="${isCurrentYear ? "active" : ""}" data-year="${i}">${i}</li>`;
    }

    yearList.innerHTML = liTag;

    // Show month
    const yearItems = document.querySelectorAll(".years li");
    yearItems.forEach((yearItem) => {
        yearItem.addEventListener("click", () => {
            const selectedYear = parseInt(yearItem.getAttribute("data-year"));
            // render month of year
            renderMonthCalendar(selectedYear);
            dateCalendar.style.display = "none";
            monthCalendar.style.display = "block";
            yearCalendar.style.display = "none";
        });
    });
}
// Show year
onlyYear.addEventListener("click", () => {
    renderYearCalendar(currentYear);
});

// Show month calendar
monthYear.addEventListener("click", () => {
    renderMonthCalendar(currentYear, currentMonth);
});

//Click prev month
prevMonth.addEventListener("click", function () {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentYear, currentMonth);
});

//click next month
nextMonth.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentYear, currentMonth);
});

//Click prev year
prevYear.addEventListener("click", function () {
    currentYear--;
    currentMonth = currentMonth - 11;
    renderMonthCalendar(currentYear, currentMonth);
});

//click next year
nextYear.addEventListener("click", () => {
    currentYear++;
    currentMonth = currentMonth + 11;
    renderMonthCalendar(currentYear, currentMonth);
});

//click current day
dayWeek.addEventListener("click", () => {
    location.reload();
});