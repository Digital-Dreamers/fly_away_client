export const upperCase = (word) => {
  let upper = word.charAt(0).toUpperCase() + word.slice(1)
  return upper
}

export const newDateFormat = (number) => {
  const month = number.slice(5, 7)
  const day = number.slice(8, 10)
  const year = number.slice(0, 4)
  const newDateFormat = month + '/' + day + '/' + year

  return newDateFormat
}

// TEST NEW DATE FUCNTION AND USE ONCE TEST SHOW EVERYTING IS WORKING CORRECTLY!
// function newDateFormat(date) {
//   let removeTime = date.split("-");
//   let newDate = [removeTime[1], removeTime[2]];
//   for (let i = 0; i < 1; i++) {
//     newDate.push(removeTime[0]);
//   }
//   return newDate.join("/");
// }
