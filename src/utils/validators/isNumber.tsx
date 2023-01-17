import { toEnglishNumber } from "../translateNumber";

const isNumber = (str: string) => {
  var regex = new RegExp(`\\d{${str.length}}`);
  if (regex.test(str)) {
    return true;
  } else {
    return false;
  }
};

export default isNumber;