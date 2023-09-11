const dayList = document.querySelector(".days");
const monthList = document.querySelector(".months");
const yearList = document.querySelector(".years");
const monthYear = document.querySelector(".month-year");
const onlyYear = document.getElementById("only-year");
const decade = document.getElementById("decade");
const dayWeek = document.querySelector(".day-week");
const monthCalendar = document.querySelector(".month-calendar");
const dateCalendar = document.querySelector(".date-calendar");
const yearCalendar = document.querySelector(".year-calendar");
const prevMonth = document.getElementById("prev-month");
const nextMonth = document.getElementById("next-month");
const prevYear = document.getElementById("prev-year");
const nextYear = document.getElementById("next-year");
const prevDecade = document.getElementById("prev-decade");
const nextDecade = document.getElementById("next-decade");

//Get current date
const date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();

//Array month
const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct", "Nov", "Dec"];

//Add today into header
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
        const isCurrentMonth = i === month && year === new Date().getFullYear();
        liTag += `<li class="${isCurrentMonth ? "active" : ""}" data-month="${i}">${shortMonths[i]}</li>`;
    }

    // Fill the remaining cells with "inactive" months
    for (let i = 0; i < CELLS - 12; i++) {
        const nextYear = year + 1; // Get next month
        const nextMonth = i + 1; // Start at first month of year
        liTag += `<li class="inactive" data-month="${i}" data-year="${nextYear}">${shortMonths[nextMonth - 1]}</li>`;
    }

    monthList.innerHTML = liTag;
    onlyYear.innerText = `${year}`;

    const monthItems = document.querySelectorAll(".months li");
    monthItems.forEach((monthItem) => {
        monthItem.addEventListener("click", () => {
            const selectedMonth = parseInt(monthItem.getAttribute("data-month"));
            const yearOfSelectedMonth = parseInt(monthItem.getAttribute("data-year") ?? new Date().getFullYear());
            // render month of year
            renderCalendar(yearOfSelectedMonth, selectedMonth);
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

    const today = new Date();

    const yearsToShow = 16; // year will be fixed in 16 cell
    const startYear = centerYear - Math.floor(yearsToShow / 2) + 4;
    const endYear = centerYear + Math.ceil(yearsToShow / 2) + 4;
    console.log(startYear);
    let liTag = "";

    for (let i = startYear; i < endYear; i++) {
        if (i === currentYear) {
            liTag += `<li class="${currentYear === today.getFullYear() ? 'active' : ''}" data-year="${i}">${i}</li>`;
        } else {
            // decade current and year i
            const currentDecade = Math.floor(currentYear / 10) * 10;
            const yearDecade = Math.floor(i / 10) * 10;

            // Check i if belong to decade
            const isActive = yearDecade >= currentDecade && yearDecade < currentDecade + 10;

            liTag += `<li class="${isActive ? '' : 'inactive'}" data-year="${i}">${i}</li>`;
        }
    }

    yearList.innerHTML = liTag;
    decade.innerText = `${startYear + 1} - ${startYear + 10} `;

    // Show  selected month
    const yearItems = document.querySelectorAll(".years li");
    yearItems.forEach((yearItem) => {
        yearItem.addEventListener("click", () => {
            const selectedYear = parseInt(yearItem.getAttribute("data-year"));
            // render month selected of year
            renderMonthCalendar(selectedYear, new Date().getMonth());
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

//Click prev decade
prevDecade.addEventListener("click", function () {
    currentYear -= 10;
    renderYearCalendar(currentYear);
});

//click next decade
nextDecade.addEventListener("click", () => {
    currentYear += 10;

    // const prevDecadeItems = document.querySelectorAll(`.years li[data-year]`);
    // prevDecadeItems.forEach((yearItem) => {
    //     yearItem.classList.remove("active");
    // });

    renderYearCalendar(currentYear);
});

//click current day
dayWeek.addEventListener("click", () => {
    location.reload();
});

