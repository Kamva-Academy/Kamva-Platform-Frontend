import { ItemTypes } from './ItemTypes';

export const firstData = [
  [
    {
      type: ItemTypes.NOT_BLANK,
      text: 'minCell = cell with domain{ ',
    },
    {
      type: ItemTypes.BLANK,
      text: '1',
      blankIndex: 0,
    },
    {
      type: ItemTypes.NOT_BLANK,
      text: ' } ',
    },
  ],
  [
    {
      type: ItemTypes.NOT_BLANK,
      text: 'for each cell in ',
    },
    {
      type: ItemTypes.BLANK,
      text: '2',
      blankIndex: 1,
    },
    {
      type: ItemTypes.NOT_BLANK,
      text: ' : ',
    },
  ],
  [
    {
      type: ItemTypes.NOT_BLANK,
      text: `${'         '}if cell `,
    },
    {
      type: ItemTypes.BLANK,
      text: '3',
      blankIndex: 2,
    },
    {
      type: ItemTypes.NOT_BLANK,
      text: ' ',
    },
    {
      type: ItemTypes.BLANK,
      text: '4',
      blankIndex: 3,
    },
    {
      type: ItemTypes.NOT_BLANK,
      text: ' : ',
    },
  ],
  [
    {
      type: ItemTypes.NOT_BLANK,
      text: `${'                  '}if cell.`,
    },
    {
      type: ItemTypes.BLANK,
      text: '5',
      blankIndex: 4,
    },
    {
      type: ItemTypes.NOT_BLANK,
      text: '.',
    },
    {
      type: ItemTypes.BLANK,
      text: '6',
      blankIndex: 5,
    },
    {
      type: ItemTypes.NOT_BLANK,
      text: ' is ',
    },
    {
      type: ItemTypes.BLANK,
      text: '7',
      blankIndex: 6,
    },
    {
      type: ItemTypes.NOT_BLANK,
      text: ' ',
    },
    {
      type: ItemTypes.BLANK,
      text: '8',
      blankIndex: 7,
    },
    {
      type: ItemTypes.NOT_BLANK,
      text: '.',
    },
    {
      type: ItemTypes.BLANK,
      text: '9',
      blankIndex: 8,
    },
    {
      type: ItemTypes.NOT_BLANK,
      text: '.',
    },
    {
      type: ItemTypes.BLANK,
      text: '10',
      blankIndex: 9,
    },
    {
      type: ItemTypes.NOT_BLANK,
      text: ' ',
    },
  ],
  [
    {
      type: ItemTypes.NOT_BLANK,
      text: `${'                           '}set `,
    },
    {
      type: ItemTypes.BLANK,
      text: '11',
      blankIndex: 10,
    },
    {
      type: ItemTypes.NOT_BLANK,
      text: ' equal to cell ',
    },
  ],
  [
    {
      type: ItemTypes.NOT_BLANK,
      text: 'return min cell ',
    },
  ],
];

export const firstAnswers = [
  '{1,2,3,4,5,6,7,8,9}',
  'table',
  'is',
  'empty',
  'domain',
  'size',
  'smaller than',
  'minCell',
  'domain',
  'size',
  'minCell',
];

export const firstHelps = [
  {
    line: 0,
    help:
      'در ابتدا خونه‌ای به اسم minCell، با بزرگترین دامنه‌ی ممکن تعریف میکنیم تا بعد با بررسی خونه‌های خالی جدول خونه‌ای رو پیدا کنیم که کمترین دامنه رو داره و در minCell جایگزین کنیم',
  },
  {
    line: 1,
    help: 'می‌خواهیم همه‌ی خونه‌های خالی جدول رو بررسی کنیم.',
  },
  {
    line: 2,
    help: '',
  },
  {
    line: 3,
    help:
      'اندازه‌ی دامنه‌ی هر خونه خالی از جدول رو با اندازه‌ی دامنه‌ی minCell مقایسه میکنیم. اگر کوچکتر بود، میفهمیم که اون خونه رو باید در minCell نگه داریم.',
  },
  {
    line: 4,
    help: '',
  },
  {
    line: 5,
    help: '',
  },
];
