import { toPersianNumber } from "utils/translateNumber";

const cost2string = (cost: any) => {
  const value = cost.value;
  const entries = Object.entries(value);
  let result = '';
  entries.forEach(([key, value], index) => {
    result += `${toPersianNumber(value)} تا ${key}`
    let virgool = '، ';
    if (index === entries.length - 2) {
      virgool = ' و '
    }
    if (index === entries.length - 1) {
      virgool = '';
    }
    result += virgool;
  })
  return result;
}

const reward2string = (reward: any) => {

}

export { cost2string, reward2string };