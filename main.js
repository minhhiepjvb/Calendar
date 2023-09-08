
const dayList = document.querySelector(".days");
const monthYear = document.querySelector(".month-year");
const dayWeek = document.querySelector(".day-week");
const prevMonth = document.getElementById("prev-month");
const nextMonth = document.getElementById("next-month")

//Get current date
const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth();

//Add dayweek into header
dayWeek.textContent = `${today.toLocaleString("default", { weekday: "long" })}, ${today.toLocaleString("default", { month: "long" })} ${today.getDate()}`;

renderCalendar(currentYear, currentMonth);

function renderCalendar(year, month) {

    clearCalendar()

    //Declare firt date of month
    const firstDayOfMonth = new Date(year, month, 1);

    //Get last date of month
    const lastDateOfMonth = new Date(year, month + 1, 0);



    //show current month-year
    showMonthYear(firstDayOfMonth)

    //Get fist day of week
    const firstDayOfWeek = new Date(firstDayOfMonth);
    firstDayOfWeek.setDate(1 - firstDayOfWeek.getDay());

    //Declare current date
    let currentDate = new Date(firstDayOfWeek);

    //Create date of month


    while (currentDate <= lastDateOfMonth) {
        const listItem = document.createElement("li");
        listItem.textContent = currentDate.getDate();

        //Check current day
        if (isToday(currentDate)) {
            listItem.classList.add("active");
        }

        dayList.appendChild(listItem)



        //Check date of month
        if (currentDate.getMonth() > month || currentDate.getMonth() < month) {
            listItem.classList.add("inactive");
        }

        //Move to next day
        currentDate.setDate(currentDate.getDate() + 1);
    }

}

//Show month and year 
function showMonthYear(date) {
    const monthDisplay = date.toLocaleString("default", { month: "long" });
    const yearDisplay = date.getFullYear();
    monthYear.textContent = `${monthDisplay} ${yearDisplay}`;
}

//clear content inside calendar
function clearCalendar() {
    dayList.innerHTML = "";
}

//check current day
function isToday(date) {
    const today = new Date();
    return (date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
    );
}

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
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    renderCalendar(currentYear, currentMonth);
});
