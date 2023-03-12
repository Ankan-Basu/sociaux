function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()+\=\[\]{};':"\\|,<>\/?~ ]/;
    return specialChars.test(str);
  }
  
  console.log(containsSpecialChars('hello-xD')); // 👉️ true
  console.log(containsSpecialChars('a bc')); // 👉️ false
  console.log(containsSpecialChars('3one_two')); // 👉️ false
  
//   if (containsSpecialChars('hello!')) {
//     // 👇️ this runs
//     console.log('✅ string contains special characters');
//   } else {
//     console.log('⛔️ string does NOT contain special characters');
//   }
  