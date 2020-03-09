const calculateDeliveryDay = waitInDays => {
  let dayDelivered = new Date();
  if (dayDelivered.getHours() >= 20) {
    const month = dayDelivered.getMonth() + 1;
    const year = dayDelivered.getFullYear();
    const day = dayDelivered.getDate() + 1;
    dayDelivered = new Date(
      year.toString() + "-" + month.toString() + "-" + day.toString()
    );
  }
  let i = 0;
  while (i < waitInDays) {
    dayDelivered.setDate(dayDelivered.getDate() + 1);
    if (dayDelivered.getDay() !== 0 && dayDelivered.getDay() !== 6) i++;
    if (waitInDays === 1) i++;
  }

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
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
    "December"
  ];

  const day = days[dayDelivered.getDay()];
  const date = dayDelivered.getDate();
  const month = months[dayDelivered.getMonth()];

  dayDelivered = `${day} ${date.toString()} ${month}`;

  return dayDelivered;
};

export default calculateDeliveryDay;
