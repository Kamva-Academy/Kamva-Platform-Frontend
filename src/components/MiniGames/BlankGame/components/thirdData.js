import { ItemTypes } from './ItemTypes';

export const thirdData = [
  [
    {
      type: ItemTypes.NOT_BLANK,
      text: 'Domain = { ',
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
      text: 'for each ',
    },
    {
      type: ItemTypes.BLANK,
      text: '2',
      blankIndex: 1,
    },
    {
      type: ItemTypes.NOT_BLANK,
      text: ' in ',
    },
    {
      type: ItemTypes.BLANK,
      text: '3',
      blankIndex: 2,
    },
    {
      type: ItemTypes.NOT_BLANK,
      text: ' : ',
    },
  ],
  [
    {
      type: ItemTypes.NOT_BLANK,
      text: `${'         '}if `,
    },
    {
      type: ItemTypes.BLANK,
      text: '4',
      blankIndex: 3,
    },
    {
      type: ItemTypes.NOT_BLANK,
      text: ' is empty : ',
    },
  ],
  [
    {
      type: ItemTypes.NOT_BLANK,
      text: `${'                  '}set `,
    },
    {
      type: ItemTypes.BLANK,
      text: '5',
      blankIndex: 4,
    },
    {
      type: ItemTypes.NOT_BLANK,
      text: '.domain equal to ',
    },
    {
      type: ItemTypes.BLANK,
      text: '6',
      blankIndex: 5,
    },
  ],
  [
    {
      type: ItemTypes.NOT_BLANK,
      text: `${'                  '}for each cell in row number `,
    },
    {
      type: ItemTypes.BLANK,
      text: '7',
      blankIndex: 6,
    },
    {
      type: ItemTypes.NOT_BLANK,
      text: '.',
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
      text: `${'                           '}if cell `,
    },
    {
      type: ItemTypes.BLANK,
      text: '9',
      blankIndex: 8,
    },
    {
      type: ItemTypes.NOT_BLANK,
      text: ' ',
    },
    {
      type: ItemTypes.BLANK,
      text: '10',
      blankIndex: 9,
    },
  ],
  [
    {
      type: ItemTypes.NOT_BLANK,
      text: `${'                                    '}delete cell.value from `,
    },
    {
      type: ItemTypes.BLANK,
      text: '11',
      blankIndex: 10,
    },
    {
      type: ItemTypes.NOT_BLANK,
      text: '.',
    },
    {
      type: ItemTypes.BLANK,
      text: '12',
      blankIndex: 11,
    },
  ],
  [
    {
      type: ItemTypes.NOT_BLANK,
      text: `${'                  '}for each cell in column number `,
    },
    {
      type: ItemTypes.BLANK,
      text: '13',
      blankIndex: 12,
    },
    {
      type: ItemTypes.NOT_BLANK,
      text: '.',
    },
    {
      type: ItemTypes.BLANK,
      text: '14',
      blankIndex: 13,
    },
  ],
  [
    {
      type: ItemTypes.NOT_BLANK,
      text: `${'                           '}if cell `,
    },
    {
      type: ItemTypes.BLANK,
      text: '15',
      blankIndex: 14,
    },
    {
      type: ItemTypes.NOT_BLANK,
      text: ' ',
    },
    {
      type: ItemTypes.BLANK,
      text: '16',
      blankIndex: 15,
    },
  ],
  [
    {
      type: ItemTypes.NOT_BLANK,
      text: `${'                                    '}delete cell.value from `,
    },
    {
      type: ItemTypes.BLANK,
      text: '17',
      blankIndex: 16,
    },
    {
      type: ItemTypes.NOT_BLANK,
      text: '.',
    },
    {
      type: ItemTypes.BLANK,
      text: '18',
      blankIndex: 17,
    },
  ],
  [
    {
      type: ItemTypes.NOT_BLANK,
      text: `${'                  '}define x = value of `,
    },
    {
      type: ItemTypes.BLANK,
      text: '19',
      blankIndex: 18,
    },
    {
      type: ItemTypes.NOT_BLANK,
      text: ' / 3 ',
    },
  ],
  [
    {
      type: ItemTypes.NOT_BLANK,
      text: `${'                  '}define y = value of `,
    },
    {
      type: ItemTypes.BLANK,
      text: '20',
      blankIndex: 19,
    },
    {
      type: ItemTypes.NOT_BLANK,
      text: ' / 3 ',
    },
  ],
  [
    {
      type: ItemTypes.NOT_BLANK,
      text: `${'                  '}for each cell in `,
    },
    {
      type: ItemTypes.BLANK,
      text: '21',
      blankIndex: 20,
    },
    {
      type: ItemTypes.NOT_BLANK,
      text: ' at x , y ',
    },
  ],
  [
    {
      type: ItemTypes.NOT_BLANK,
      text: `${'                           '}if cell `,
    },
    {
      type: ItemTypes.BLANK,
      text: '22',
      blankIndex: 21,
    },
    {
      type: ItemTypes.NOT_BLANK,
      text: ' ',
    },
    {
      type: ItemTypes.BLANK,
      text: '23',
      blankIndex: 22,
    },
  ],
  [
    {
      type: ItemTypes.NOT_BLANK,
      text: `${'                                    '}delete cell.value from `,
    },
    {
      type: ItemTypes.BLANK,
      text: '24',
      blankIndex: 23,
    },
    {
      type: ItemTypes.NOT_BLANK,
      text: '.',
    },
    {
      type: ItemTypes.BLANK,
      text: '25',
      blankIndex: 24,
    },
  ],
];

export const thirdAnswers = [
  '{1,2,3,4,5,6,7,8,9}',
  'myCell',
  'table',
  'myCell',
  'myCell',
  'Domain',
  'myCell',
  'row',
  'is not',
  'empty',
  'myCell',
  'domain',
  'myCell',
  'column',
  'is not',
  'empty',
  'myCell',
  'domain',
  'myCell.row',
  'myCell.column',
  'square',
  'is not',
  'empty',
  'myCell',
  'domain',
];

export const thirdHelps = [
  {
    line: 0,
    help:
      'در این قسمت می‌خواهیم یک دامنه‌ی اولیه در Domain تعریف کنیم تا در ابتدا دامنه‌ی هر خونه خالی را مساوی Domain قرار بدهیم و بعد به مرور دامنه‌ی حقیقی را بدست بیاوریم',
  },
  {
    line: 1,
    help: 'می‌خواهیم دامنه‌ی همه‌ی خونه‌های خالی جدول رو بدست بیاریم',
  },
  {
    line: 2,
    help: '',
  },
  {
    line: 3,
    help:
      'در این مرحله، دامنه‌ی اولیه‌ی خانه‌ خالی مورد نظر رو مساوی با Domain قرار می‌دیم تا در ادامه محدودیت‌ها رو روی اون پیاده کنیم و دامنه حقیقی رو بدست بیاریم',
  },
  {
    line: 4,
    help:
      'می‌خواهیم محدودیت ناشی از خونه‌هایی که هم‌سطر با خونه موردنظرمون هستند رو اعمال کنیم.برای همین باید همه‌ خونه‌های پر اون سطر رو بررسی کنیم و دامنه خونه موردنظر رو با کمک اون مقادیر به روز کنیم',
  },
  {
    line: 5,
    help: '',
  },
  {
    line: 6,
    help: '',
  },
  {
    line: 7,
    help:
      'می‌خواهیم محدودیت ناشی از خونه‌هایی که ستون با خونه موردنظرمون هستند رو اعمال کنیم.برای همین باید همه‌ خونه‌های پر اون ستون رو بررسی کنیم و دامنه خونه موردنظر رو با کمک اون مقادیر به روز کنیم',
  },
  {
    line: 8,
    help: '',
  },
  {
    line: 9,
    help: '',
  },
  {
    line: 10,
    help:
      'می‌خواهیم محدودیت ناشی از خونه‌هایی که با خونه موردنظرمون در یک مربع قرار گرفتن رو اعمال کنیم. برای همین، باید با کمک xوy شماره مربع موردنظر رو پیدا کنیم',
  },
  {
    line: 11,
    help: '',
  },
  {
    line: 12,
    help: 'می‌خواهیم محدودیت ناشی از خونه‌هایی که با خونه‌ی موردنظرمون در یک مربع قرار گرفتن رو اعمال کنیم. پس باید همه‌ی خونه‌های پر اون مربع رو بررسی کنیم و دامنه خونه موردنظر رو با کمک اون مقادیر به روز کنیم',
  },
  {
    line: 13,
    help: '',
  },
  {
    line: 14,
    help: '',
  },
];
