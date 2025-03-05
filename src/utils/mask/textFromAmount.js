export const textFromAmount = (amount, text, text1, text2) => {
  if (amount === 1) return text;
  if (amount > 4) return text1;
  return text2;
};
