export const months = [
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

export const getMonthStringFromInteger = (monthInt:number): null | string => {
  if (monthInt < 0 || monthInt > 11) {
    return null;
  }
  return months[monthInt - 1];
}