const dateInput = document.querySelector('.js-dateInput');
const today = new Date();
const pointsPool = document.querySelector('.js-point-pool');
var firtTime = true;
var monthGrid = [];

const MAX_AGE = 90;

// limit the to only past date and less than 90 years
dateInput.setAttribute('max', today.toISOString().split('T')[0]);
dateInput.setAttribute('min', new Date(today.getFullYear() - 90, today.getMonth(), today.getDate()).toISOString().split('T')[0]);

// //default value test
// dateInput.setAttribute('value', new Date(2000, 4, 27).toISOString().split('T')[0]);
// getDays();

//addEvent listener to the date input call eacg time the date change
dateInput.addEventListener('change', getDays);

//function that get the date from js-dateInput in html and give the number of days, weeks, mouth and years from the date to today
function getDays() {
    if (firtTime) {
        createMonthPoint();
        firtTime = false;
    }
    else {
        monthGrid.forEach(month => {
            month.classList.remove('c-month-point--active');
            month.classList.remove('c-month-point--past');
        }); 
    }
    var inputDate = document.querySelector(".js-dateInput").value;
    var date = new Date(inputDate);
    var diff = Math.abs(today.getTime() - date.getTime());
    var todayTotalMonth = today.getFullYear() * 12 + today.getMonth();
    var dateTotalMonth = date.getFullYear() * 12 + date.getMonth();
    var days = Math.floor(diff / (1000 * 3600 * 24));
    var weeks = Math.floor(days / 7);
    var years = Math.floor(days / 365);
    
    var endDate = new Date(date.getFullYear() + MAX_AGE, date.getMonth(), date.getDate() + 1);
    var endTotalMonth = endDate.getFullYear() * 12 + endDate.getMonth();
    var deltaMonth = endTotalMonth - dateTotalMonth;
    var deltaMonthToday = todayTotalMonth - dateTotalMonth;
    var monthLeft = deltaMonth - deltaMonthToday;


    monthGrid[deltaMonthToday].classList.add('c-month-point--active');
    // add past class to all the month before deltaMonthToday
    for (let i = 0; i < deltaMonthToday; i++) {
        monthGrid[i].classList.add('c-month-point--past');
    }


    displayDays(days, weeks, deltaMonthToday, years);
}

// function create MAX_AGE*12 divs with the class c-month-point
function createMonthPoint() {
    for (let i = 0; i < MAX_AGE * 12; i++) {
        const point = document.createElement('div');
        point.classList.add('c-month-point');
        pointsPool.appendChild(point);
        monthGrid.push(point);
    }
}

//function that display the number of days, weeks, months and years in the html
function displayDays(days, weeks, months, years) {
    document.querySelector(".c-stats").style.display = "flex";
    document.getElementById("days").innerHTML = days + " jours";
    document.getElementById("weeks").innerHTML = weeks + " semaines";
    document.getElementById("months").innerHTML = months + " mois";
    document.getElementById("years").innerHTML = years + " ans";
}