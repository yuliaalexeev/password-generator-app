'use strict';
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
  let levelTxtEl = document.querySelector(".strength__txt");
  let levelClassName = '';
  let strengthTxt = '';
  let passwordStrength = 0;
  const MAX_TOO_WEAK = 5;
  const MAX_WEAK = 10;
  const MAX_MEDIUM = 15;

  if (gPasswordLength === 0) return;
  if (gPasswordLength <= MAX_TOO_WEAK) {
    strengthTxt = 'Too Weak!';
    passwordStrength = 1;
    levelClassName = 'level--too-weak-fill';
  } else if (gPasswordLength > MAX_TOO_WEAK && gPasswordLength <= MAX_WEAK) {
    strengthTxt = 'Weak';
    passwordStrength = 2;
    levelClassName = 'level--weak-fill';
  } else if (gPasswordLength > MAX_WEAK && gPasswordLength <= MAX_MEDIUM) {
    strengthTxt = 'Medium';
    passwordStrength = 3;
    levelClassName = 'level--medium-fill';
  } else {
    strengthTxt = 'Strong';
    passwordStrength = 4;
    levelClassName = 'level--strong-fill';
  }

  levelTxtEl.innerText = strengthTxt;
  renderStrengthLevels(passwordStrength, levelClassName);
}

function renderStrengthLevels(filledLevelsNum, levelClassName) {
  let HtmlStr = '';
  const LEVELS = 4;

  for (let i = 0; i < LEVELS; i++) {
    HtmlStr += `<span class="level ${i < filledLevelsNum ? levelClassName : ""}"></span>`;
  }

  let levelEl = document.querySelector(".strength__level");
  levelEl.innerHTML = HtmlStr;
}

function onSelectedRangeNumber() {
  let rangeInputEl = document.querySelector(".range__input");
  gPasswordLength = rangeInputEl.value;
  rangeNumEl.innerText = rangeInputEl.value;
  renderPasswordStrengthTxt();
}

function onCopyPassword() {
  if (copyInputEl.disabled) return;
  try {
    navigator.clipboard.writeText(copyInputEl.value);
    copyTxtEl.style.display = "block";
    setTimeout(() => copyTxtEl.style.display = "none", 500);
  } catch (err) {
    console.error('Failed to copy password: ', err);
  }
}

function onGeneratePassword(e) {
  e.preventDefault();
  const includeUppercaseLetters = document.getElementById("includeUppercaseLetters").checked;
  const includeLowercaseLetters = document.getElementById("includeLowercaseLetters").checked;
  const includeNumbers = document.getElementById("includeNumbers").checked;
  const includeSymbols = document.getElementById("includeSymbols").checked;

  if (gPasswordLength === 0 || !includeUppercaseLetters && !includeLowercaseLetters 
     && !includeNumbers && !includeSymbols) return;
  copyInputEl.removeAttribute("disabled");

  const password = generatePassword(includeUppercaseLetters, includeLowercaseLetters, 
    includeNumbers, includeSymbols);
  
  copyInputEl.value = password;
}

function generatePassword(includeUppercaseLetters, includeLowercaseLetters, includeNumbers, includeSymbols) {
  let password = '';

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

  password = shuffleString(password);
  return password.substring(0, gPasswordLength);
}
