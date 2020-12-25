import getLocale from './getLocale';

export const toPersianNumber = (num) => {
  const persian = {
    0: '۰',
    1: '۱',
    2: '۲',
    3: '۳',
    4: '۴',
    5: '۵',
    6: '۶',
    7: '۷',
    8: '۸',
    9: '۹',
  };
  num = num.toString();
  let len = num.length;
  let converted = '';
  for (let i = 0; i < len; i++) {
    converted += persian[num[i]] || num[i];
  }
  return converted;
};

export const toEnglishNumber = (num) => {
  const english = {
    '۰': '0',
    '۱': '1',
    '۲': '2',
    '۳': '3',
    '۴': '4',
    '۵': '5',
    '۶': '6',
    '۷': '7',
    '۸': '8',
    '۹': '9',
  };
  num = num.toString();
  let len = num.length;
  let converted = '';
  for (let i = 0; i < len; i++) {
    converted += english[num[i]] || num[i];
  }
  return converted;
};

export function tLocalNum(num) {
  return translateNumber({ num });
}

export default function translateNumber({ lang = getLocale(), num }) {
  switch (lang) {
    case 'fa':
      return toPersianNumber(num);
    default:
      return toEnglishNumber(num);
  }
}

const faSer = [
  'اول',
  'دوم',
  'سوم',
  'چهارم',
  'پنچم',
  'ششم',
  'هفتم',
  'هشتم',
  'نهم',
  'دهم',
  'یازدهم',
  'دوازدهم',
  'سیزدهم',
  'چهاردهم',
  'پانزدهم',
  'شانزدهم',
  'هفدهم',
  'هجدهم',
  'نوزدهم',
  'بیستم',
  'بیست‌ویکم',
  'بیست‌ودوم',
  'بیست‌وسوم',
  'بیست‌وچهارم',
  'بیست‌وپنجم',
];

export function faSeri(i) {
  return faSer[i] || i - 1 + ' ام';
}
