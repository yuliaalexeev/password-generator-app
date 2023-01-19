function shuffleString(includedPasswordOptioins){
  let shuffledNumbers = [...includedPasswordOptioins].sort(() => Math.random() - 0.5);
  return shuffledNumbers.join("");
}