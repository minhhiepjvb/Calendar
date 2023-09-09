const dayList = document.querySelector(".days");
const monthYear = document.querySelector(".month-year");
const dayWeek = document.querySelector(".day-week");
const prevMonth = document.getElementById("prev-month");
const nextMonth = document.getElementById("next-month");
const monthCalendar = document.querySelector(".month-calendar");
const dateCalendar = document.querySelector(".date-calendar");
prevNextIcon = document.querySelectorAll(".icon span");

//Get current date
const date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

//Add dayweek into header
dayWeek.textContent = `${date.toLocaleString("default", { weekday: "long" })}, ${date.toLocaleString("default", { month: "long" })} ${date.getDate()}`;


//Render calendar
function renderCalendar() {
    const CELLS = 42;
    let firstDayofMonth = new Date(currentYear, currentMonth, 1).getDay(), // getting first day of month
        lastDateofMonth = new Date(currentYear, currentMonth + 1, 0).getDate(), // getting last date of month
        lastDayofMonth = new Date(currentYear, currentMonth, lastDateofMonth).getDay(), // getting last day of month
        lastDateofLastMonth = new Date(currentYear, currentMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";


    const offsetTop = firstDayofMonth;
    const offsetBottom = CELLS - lastDateofMonth - offsetTop;

    for (let i = lastDateofLastMonth - offsetTop + 1; i <= lastDateofLastMonth; i++) {
        liTag += `<li class="inactive">${i}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currentMonth === date.getMonth() && currentYear === date.getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = 1; i <= offsetBottom; i++) {
        liTag += `<li class="inactive">${i}</li>`;
    }

    monthYear.innerText = `${months[currentMonth]} ${currentYear}`;
    dayList.innerHTML = liTag;
}

renderCalendar()

//Render month

function renderMonthCalendar() {
    dateCalendar.style.display = "none";
    monthCalendar.style.display = "block";
}

monthYear.addEventListener("click", () => {
    renderMonthCalendar();
})
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

//click current day
dayWeek.addEventListener("click", () => {
    location.reload();
});