(() => {
  // src/js/main.js
  var dateInput = document.querySelector(".js-dateInput");
  var today = new Date();
  var pointsPool = document.querySelector(".js-point-pool");
  var firtTime = true;
  var monthGrid = [];
  var MAX_AGE = 90;
  dateInput.setAttribute("max", today.toISOString().split("T")[0]);
  dateInput.setAttribute("min", new Date(today.getFullYear() - 90, today.getMonth(), today.getDate()).toISOString().split("T")[0]);
  dateInput.setAttribute("value", new Date(2e3, 5, 27).toISOString().split("T")[0]);
  getDays();
  dateInput.addEventListener("change", getDays);
  function getDays() {
    if (firtTime) {
      createMonthPoint();
      firtTime = false;
    } else {
      monthGrid.forEach((month) => {
        month.classList.remove("c-month-point--active");
        month.classList.remove("c-month-point--past");
      });
    }
    var inputDate = document.querySelector(".js-dateInput").value;
    var date = new Date(inputDate);
    var diff = Math.abs(today.getTime() - date.getTime());
    var todayTotalMonth = today.getFullYear() * 12 + today.getMonth();
    var dateTotalMonth = date.getFullYear() * 12 + date.getMonth();
    var days = Math.floor(diff / (1e3 * 3600 * 24));
    var weeks = Math.floor(days / 7);
    var years = Math.floor(days / 365);
    var endDate = new Date(date.getFullYear() + MAX_AGE, date.getMonth(), date.getDate() + 1);
    var endTotalMonth = endDate.getFullYear() * 12 + endDate.getMonth();
    var deltaMonth = endTotalMonth - dateTotalMonth;
    var deltaMonthToday = todayTotalMonth - dateTotalMonth;
    var monthLeft = deltaMonth - deltaMonthToday;
    monthGrid[deltaMonthToday].classList.add("c-month-point--active");
    for (let i = 0; i < deltaMonthToday; i++) {
      monthGrid[i].classList.add("c-month-point--past");
    }
    displayDays(days, weeks, deltaMonthToday, years);
  }
  function createMonthPoint() {
    for (let i = 0; i <= MAX_AGE * 12; i++) {
      const point = document.createElement("div");
      point.classList.add("c-month-point");
      pointsPool.appendChild(point);
      monthGrid.push(point);
      if (i % (12 * 30) == 0) {
        const after = document.createElement("p");
        after.classList.add("c-month-point--after");
        after.innerHTML = i / 12;
        point.appendChild(after);
      }
    }
  }
  function displayDays(days, weeks, months, years) {
    document.querySelector(".c-stats").style.display = "flex";
    document.getElementById("days").innerHTML = days + " jours";
    document.getElementById("weeks").innerHTML = weeks + " semaines";
    document.getElementById("months").innerHTML = months + " mois";
    document.getElementById("years").innerHTML = years + " ans";
    const MAX_MONTHS = MAX_AGE * 12;
    const remainingYears = MAX_AGE - years;
    const remainingMonths = MAX_MONTHS - months;
    document.querySelector(".js-interractif__mounts").innerHTML = remainingMonths;
    document.querySelector(".js-interractif__years").innerHTML = remainingYears;
    document.querySelector(".c-interractif__display").style.display = "block";
  }
})();
