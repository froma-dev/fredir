export const isStringDigit = (str: string) => /^\d$/.test(str);
export const parseStringDigit = (str: string) => parseInt(str, 10);
