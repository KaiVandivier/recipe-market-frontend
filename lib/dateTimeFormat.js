const dateTimeFormat = new Intl.DateTimeFormat("default", {
  weekday: "long", year: "numeric", month: "long", day: "numeric",
  hour: "numeric", minute: "numeric"
});

export default dateTimeFormat;
