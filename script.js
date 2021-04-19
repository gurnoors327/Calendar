const date = new Date();

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = new Date().toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();
let calendar = document.querySelector(".calendar");

var indian_holiday_string = "";
var dallas_holiday_string = "";

const month_names = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const indian_dallas_holiday = [
  [0, 1, "New Year's Day"],
  [3, 2, "Good Friday"],
  [11, 27, "Christmas (observed)"],
];

// Month, Day, Occasion
const indian_holiday = [
  [0, 1, "New Year's Day"],
  [0, 26, "Republic Day"],
  [2, 29, "Holi"],
  [3, 2, "Good Friday"],
  [4, 13, "Ramzan/ Eid-ul-Fitr"],
  [7, 30, "Janmashtami"],
  [9, 15, "Dussehra"],
  [10, 4, "Diwali"],
  [10, 5, "Diwali"],
  [11, 27, "Christmas (observed)"],
];

// Month, Day, Occasion
const dallas_holiday = [
  [0, 1, "New Year's Day"],
  [3, 2, "Good Friday"],
  [4, 31, "Memorial Day"],
  [6, 5, "Independence Day (observed)"],
  [8, 6, "Labor Day"],
  [10, 25, "Thanksgiving"],
  [10, 26, "Thanksgiving"],
  [11, 24, "Christmas Eve"],
  [11, 27, "Christmas (observed)"],
  [11, 31, "New Year’s Eve"],
];
