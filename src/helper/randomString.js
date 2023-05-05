const randomString = (length = 5) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

const randomDate = () => {
  let start = new Date(1950, 05, 05);
  let end = new Date(2023, 01, 01);
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
    .toISOString()
    .slice(0, 10);
};
// const randomDatev2 = (lenght) => {
//   let result = "";

//   const characters = "1234567890";
//   const charactersLength = characters.length;
//   let counter = 0;

//   while (counter < 1) {
//     result += characters.charAt(Math.floor(Math.random() * 2));
//     counter++;
//   }
//   counter = 0;
//   while (counter < 3) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     counter++;
//   }
//   return result + "-";
// };
// console.log(randomDate(4));

module.exports = { randomString, randomDate };
