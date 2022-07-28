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

export const makePath = (...args: string[]): string=> {
  let output = "";
  const argsLength = args.length
  for (let i = 0; i < argsLength; i++) {
    // if last arg do not add a slash
    if (i === argsLength - 1) {
      output += args[i]
    } else {
    // otherwise, add a slash
      output += `${args[i]}/`
    }
  }
  return output;
}