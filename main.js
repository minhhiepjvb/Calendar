document.addEventListener("DOMContentLoaded", function () {
    const dayList = document.querySelector(".days");
    const monthYear = document.querySelector(".month-year");
    const dayWeek = document.querySelector(".day-week");
    const prevMonth = document.getElementById("prev-month");
    const nextMonth = document.getElementById("next-month")

    function renderCalendar(year, month) {

        clearCalendar()

        //Declare firt date of month
        const firstDayOfMonth = new Date(year, month, 1);

        //Get last date of month
        const lastDayOfMonth = new Date(year, month + 1, 0);

        //show month-year
        showMonthYear(firstDayOfMonth)

        //Get fist day of week
        const firstDayOfWeek = new Date(firstDayOfMonth);
        firstDayOfWeek.setDate(1 - firstDayOfWeek.getDay());

        //Declare current date and make a loop from first day of month 
        let currentDate = new Date(firstDayOfWeek);

        //Loop date of Month
        while (currentDate <= lastDayOfMonth) {
            const listItem = document.createElement("li");
            listItem.textContent = currentDate.getDate();

            //Check current day
            if (isToday(currentDate)) {
                listItem.classList.add("active");
            }

            dayList.appendChild(listItem);

            //Move to next day
            currentDate.setDate(currentDate.getDate() + 1);

            //Check date belong to month
            if (currentDate.getMonth() === month) {
                listItem.classList.remove("inactive");
            } else {
                listItem.classList.add("inactive")
            }

        }
    }

    function showMonthYear(date) {
        const monthDisplay = date.toLocaleString("default", { month: "long" });
        const yearDisplay = date.getFullYear();
        monthYear.textContent = `${monthDisplay} ${yearDisplay}`;
    }

    function clearCalendar() {
        //Delete old date
        dayList.innerHTML = "";
    }

    function isToday(date) {
        const today = new Date();
        return (date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
        );
    }

    //Get current date
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    //Add dayweek into header
    dayWeek.textContent = `${today.toLocaleString("default", { weekday: "long" })}, ${today.toLocaleString("default", { month: "long" })} ${today.getDate()}`;

    renderCalendar(currentYear, currentMonth);
});