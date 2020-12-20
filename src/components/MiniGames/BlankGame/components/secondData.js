import { ItemTypes } from './ItemTypes';

export const secondData = [
  [
    {
      type: ItemTypes.NOT_BLANK,
      text: 'if ',
    },
    {
      type: ItemTypes.BLANK,
      text: '1',
      blankIndex: 0,
    },
    {
      type: ItemTypes.NOT_BLANK,
      text: ' is ',
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
      text: `${'         '}finish the algorithm `,
    },
  ],
  [
    {
      type: ItemTypes.NOT_BLANK,
      text: 'for each cell in ',
    },
    {
      type: ItemTypes.BLANK,
      text: '3',
      blankIndex: 2,
    },
  ],
  [
    {
      type: ItemTypes.NOT_BLANK,
      text: `${'         '}if cell  `,
    },
    {
      type: ItemTypes.BLANK,
      text: '4',
      blankIndex: 3,
    },
    {
      type: ItemTypes.NOT_BLANK,
      text: ' ',
    },
    {
      type: ItemTypes.BLANK,
      text: '5',
      blankIndex: 4,
    },
  ],
  [
    {
      type: ItemTypes.NOT_BLANK,
      text: `${'                  '}if cell.`,
    },
    {
      type: ItemTypes.BLANK,
      text: '6',
      blankIndex: 5,
    },
    {
      type: ItemTypes.NOT_BLANK,
      text: '.',
    },
    {
      type: ItemTypes.BLANK,
      text: '7',
      blankIndex: 6,
    },
    {
      type: ItemTypes.NOT_BLANK,
      text: ' is ',
    },
    {
      type: ItemTypes.BLANK,
      text: '8',
      blankIndex: 7,
    },
  ],
  [
    {
      type: ItemTypes.NOT_BLANK,
      text: `${'                           '}return wrong answer `,
    },
  ],
  [
    {
      type: ItemTypes.NOT_BLANK,
      text: ' return true answer',
    },
  ],
];

export const secondAnswers = [
  'table',
  'full',
  'table',
  'is',
  'empty',
  'domain',
  'size',
  '0',
];

export const secondHelps = [
  {
    line: 0,
    help: 'اگر تمام جدول پر شده باشد، کار ما به پایان رسیده',
  },
  {
    line: 1,
    help: '',
  },
  {
    line: 2,
    help: 'باید همه‌ی خانه‌های خالی جدول را بررسی کنیم',
  },
  {
    line: 3,
    help: '',
  },
  {
    line: 4,
    help:
      'اگر اندازه‌ی دامنه‌ی خونه‌ای از جدول صفر شده باشد، یعنی الان در وضعیت ناسازگاری هستیم',
  },
  {
    line: 5,
    help: '',
  },
  {
    line: 6,
    help: '',
  },
];
