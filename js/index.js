'use strict';
// const gCharacters = "abcdefghijklmnopqrstuvwxyz";
// const gNumbers = "0123456789";
// const gSymbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?"/';

const UPPERCASE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:\"<>,.?/~`\'';

let gPasswordLength = 0;
let gGeneratedPassword = '';

let copyTxtEl = document.querySelector(".copy__txt");
let copyInputEl = document.querySelector(".copy__input");
let rangeNumEl = document.querySelector(".range__num");

copyInputEl.value = 'P4$5W0rD!';
copyTxtEl.style.display = 'none';


function onInit() {
  renderPasswordStrengthTxt();
  renderStrengthLevels();
}

function renderPasswordStrengthTxt() {
  var levelTxtEl = document.querySelector(".strength__txt");
  const MAX_TOO_WEAK = 5;
  const MAX_WEAK = 10;
  const MAX_MEDIUM = 15;

  var strengthTxt = '';
  var passwordStrength = 0;

  if (gPasswordLength === 0) return;
  if (gPasswordLength <= MAX_TOO_WEAK) {
    strengthTxt = 'Too Weak!';
    passwordStrength = 1;
  } else if ((gPasswordLength > MAX_TOO_WEAK) & (gPasswordLength <= MAX_WEAK)) {
    strengthTxt = 'Weak';
    passwordStrength = 2;
  } else if ((gPasswordLength > MAX_WEAK) & (gPasswordLength <= MAX_MEDIUM)) {
    strengthTxt = 'Medium';
    passwordStrength = 3;
  } else {
    strengthTxt = 'Strong';
    passwordStrength = 4;
  }

  levelTxtEl.innerText = strengthTxt;
  renderStrengthLevels(passwordStrength);
}

// function renderFilledStrengthLevel(filledLevels) {
//   renderStrengthLevels(filledLevels);
// }
function getFilledLevelClassName(filledLevelsNum){
  var filledLevelClassName = 0;
    const levelsClassName = {
    1: filledLevelClassName = 'level--too-weak-fill',
    2: filledLevelClassName = 'level--weak-fill',
    3: filledLevelClassName = 'level--medium-fill',
    4: filledLevelClassName = 'level--strong-fill',
  };
  return levelsClassName[filledLevelsNum];
}

function renderStrengthLevels(filledLevelsNum) {
  var HtmlStr = '';
  var filledLevelClass = getFilledLevelClassName(filledLevelsNum)
  const LEVELS = 4;

  for (let i = 0; i < LEVELS; i++) {
    HtmlStr += `<span class='level ${i < filledLevelsNum ? filledLevelClass : ""}'></span>`;
  }

  var levelEl = document.querySelector(".strength__level");
  levelEl.innerHTML = HtmlStr;
}

function onSelectedRangeNumber() {
  var rangeInputEl = document.querySelector(".range__input");
  gPasswordLength = rangeInputEl.value;
  rangeNumEl.innerText = rangeInputEl.value;
  renderPasswordStrengthTxt();
}

// function onCopyPassword() {
//   if(copyInputEl.disabled === true) return;
//   copyInputEl.select();
//   //copyInputEl.setSelectionRange(0, 99999); // For mobile devices
//   navigator.clipboard.writeText(copyInputEl.value);
//   copyTxtEl.style.display = "block";
//   setTimeout(function () {
//     copyTxtEl.style.display = "none";
//   }, 500);
// }

const onCopyPassword = async () => {
  if (copyInputEl.disabled) return;
  try {
    await navigator.clipboard.writeText(copyInputEl.value);
    copyTxtEl.style.display = "block";
    setTimeout(() => copyTxtEl.style.display = "none", 500);
  } catch (err) {
    console.error("Failed to copy password: ", err);
  }
};

// let includeUppercaseLetters = false;
// let includeNumbers = false;

// function toggleOptionCheckbox(e) {
//   console.log('e', e)
//   includeUppercaseLetters = !includeUppercaseLetters;
// }
// // function onIncludeNumbers(){
// //   includeNumbers = !includeNumbers;
// // }

function onGeneratePassword(e) {
  e.preventDefault();
  if (gPasswordLength === 0) return;
  copyInputEl.removeAttribute("disabled");

 // Get the values of the checkboxes
 const includeUppercaseLetters = document.getElementById("includeUppercaseLetters").checked;
 const includeLowercaseLetters = document.getElementById("includeLowercaseLetters").checked;
 const includeNumbers = document.getElementById("includeNumbers").checked;
 const includeSymbols = document.getElementById("includeSymbols").checked;

   // Generate the password using the values of the checkboxes
   const password = setPasswordToGenerate(includeUppercaseLetters, includeLowercaseLetters, includeNumbers, includeSymbols);
console.log('got password from setPassword to generate', password)
   copyInputEl.value = password;
}

function setPasswordToGenerate(includeUppercaseLetters, includeLowercaseLetters, includeNumbers, includeSymbols) {
  // const UPPERCASE_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  // const LOWERCASE_LETTERS = "abcdefghijklmnopqrstuvwxyz";
  // const NUMBERS = "0123456789";
  // const SYMBOLS = "!@#$%^&*()_+-=[]{}|;':\"<>,.?/~`";

  let password = "";

  if (includeUppercaseLetters) {
    password += UPPERCASE_LETTERS;
  }

  if (includeLowercaseLetters) {
    password += LOWERCASE_LETTERS;
  }

  if (includeNumbers) {
    password += NUMBERS;
  }

  if (includeSymbols) {
    password += SYMBOLS;
  }

  // Shuffle the password string to create a random password
  password = shuffleString(password);
  return password.substring(0, gPasswordLength);
}



function shuffleString(includedPasswordOptioins){
  console.log('gPasswordLength',gPasswordLength)

  let shuffledNumbers = [...includedPasswordOptioins].sort(() => Math.random() - 0.5);
  return shuffledNumbers.join("");
}


















// For input range track
for (let e of document.querySelectorAll('input[type="range"]')) {
  e.style.setProperty("--value", e.value);
  e.style.setProperty("--min", e.min == "" ? "0" : e.min);
  e.style.setProperty("--max", e.max == "" ? "100" : e.max);
  e.addEventListener("input", () => e.style.setProperty("--value", e.value));
}

function resetPassword() {
  copyInputEl.value = '';
}
