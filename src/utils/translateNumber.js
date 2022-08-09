import getLocale from './getLocale';

const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
const e2p = s => s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])

export const toPersianNumber = (string) => string.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))

export const toEnglishNumber = (string) => string.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])

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
