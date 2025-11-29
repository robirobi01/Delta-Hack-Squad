// Converts English numbers to Bangla numbers
export const toBanglaNumber = (str: string | number): string => {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(str).replace(/[0-9]/g, (w) => banglaDigits[+w]);
};
