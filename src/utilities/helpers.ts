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
]

export const encodeReadableURIComponent = (input: string): string => {
  const filteredString = input.replace(/[\W]+/g, "_");
  const cleanEndString = filteredString.replace(/_$/, '')
  const finalString = cleanEndString.replace(/^_/, '')
  return finalString;
}

export const getFilenameFromImageURL = (url: string): string => {
  const filename = url.substring(url.lastIndexOf('/')+1);
  return filename
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