const configs = [
  {
    options: [
      '1, 2, 3, 4, 5, 6, 7, 8, 9',
      'myCell',
      'table',
      'row',
      'column',
      'is not',
      'empty',
      'myCell.row',
      'myCell.column',
      'Domain',
      'domain',
      'square',
    ],
    paragraphs: [
      {
        help:
          'در این قسمت می‌خوایم یک دامنه اولیه در Domain تعریف کنیم، تا در ابتدا دامنه هر خونه خالی رو مساوی Domain قرار  بدیم و بعد به مرور دامنه حقیقی رو به دست بیاریم. ',
        lines: [
          {
            tab: 0,
            items: [
              'Domain = {',
              {
                type: 'blank',
                answer: 0,
              },
              '}',
            ],
          },
        ],
      },
      {
        help: 'می‌خوایم دامنه همه خونه‌های خالی جدول رو به دست بیاریم. ',
        lines: [
          {
            tab: 0,
            items: [
              'for each ',
              {
                type: 'blank',
                answer: 1,
              },
              ' in ',
              {
                type: 'blank',
                answer: 2,
              },
              ':',
            ],
          },
          {
            tab: 1,
            items: [
              'if',
              {
                type: 'blank',
                answer: 1,
              },
              ' is empty',
              ':',
            ],
          },
        ],
      },
      {
        help:
          'در این مرحله دامنه اولیه خانه خالی مورد نظر رو مساوی با  Domain قرار می‌دیم تا در ادامه محدودیت‌ها رو روی اون پیاده کنیم و دامنه حقیقی رو به دست بیاریم.',
        lines: [
          {
            tab: 2,
            items: [
              'set',
              {
                type: 'blank',
                answer: 1,
              },
              '.domain equal to',
              {
                type: 'blank',
                answer: 9,
              },
            ],
          },
        ],
      },
      {
        help:
          'می‌خوایم محدودیت ناشی از خونه‌هایی که هم سطر با خونه موردنظرمون هستن رو اعمال کنیم. برای همین باید همه خونه‌های پر اون سطر رو بررسی کنیم و دامنه خونه مورد نظر رو با کمک اون مقادیر به روز کنیم.',
        lines: [
          {
            tab: 2,
            items: [
              'for each cell in row number',
              {
                type: 'blank',
                answer: 1,
              },
              {
                type: 'blank',
                answer: 3,
              },
            ],
          },
          {
            tab: 3,
            items: [
              'if cell',
              {
                type: 'blank',
                answer: 5,
              },
              {
                type: 'blank',
                answer: 6,
              },
            ],
          },
          {
            tab: 4,
            items: [
              'delete cell.value from',
              {
                type: 'blank',
                answer: 1,
              },
              '.',
              {
                type: 'blank',
                answer: 10,
              },
            ],
          },
        ],
      },
      {
        help:
          'می‌خوایم محدودیت ناشی از خونه‌هایی که هم ستون با خونه موردنظرمون هستن رو اعمال کنیم. برای همین باید همه خونه‌های پر اون ستون رو بررسی کنیم و دامنه خونه مورد نظر رو با کمک اون مقادیر به روز کنیم.',
        lines: [
          {
            tab: 2,
            items: [
              'for each cell in column number',
              {
                type: 'blank',
                answer: 1,
              },
              {
                type: 'blank',
                answer: 4,
              },
            ],
          },
          {
            tab: 3,
            items: [
              'if cell',
              {
                type: 'blank',
                answer: 5,
              },
              {
                type: 'blank',
                answer: 6,
              },
            ],
          },
          {
            tab: 4,
            items: [
              'delete cell.value from',
              {
                type: 'blank',
                answer: 1,
              },
              '.',
              {
                type: 'blank',
                answer: 10,
              },
            ],
          },
        ],
      },
      {
        help:
          'می‌خوایم محدودیت ناشی از خونه هایی که با خونه مورد نظرمون در یک مربع قرار گرفتن رو اعمال کنیم. برای همین باید به کمک x ,y  شماره مربع مورد نظر  رو پیدا کنیم. ',
        lines: [
          {
            tab: 2,
            items: [
              'define x = value of ',
              {
                type: 'blank',
                answer: 7,
              },
              '/ 3',
            ],
          },
          {
            tab: 2,
            items: [
              'define y = value of ',
              {
                type: 'blank',
                answer: 8,
              },
              '/ 3',
            ],
          },
        ],
      },
      {
        help:
          'میخوایم محدودیت ناشی از خونه هایی که با خونه مورد نظرمون در یک مربع قرار گرفتن رو اعمال کنیم. پس باید همه خونه‌های پر اون مربع رو بررسی کنیم و دامنه خونه مورد نظر ر و به کمک اونها به روز کنیم. ',
        lines: [
          {
            tab: 2,
            items: [
              'for each cell in',
              {
                type: 'blank',
                answer: 7,
              },
              'at  x, y',
            ],
          },
          {
            tab: 3,
            items: [
              'if cell',
              {
                type: 'blank',
                answer: 5,
              },
              {
                type: 'blank',
                answer: 6,
              },
            ],
          },
          {
            tab: 4,
            items: [
              'delete cell.value from',
              {
                type: 'blank',
                answer: 1,
              },
              '.',
              {
                type: 'blank',
                answer: 11,
              },
            ],
          },
        ],
      },
    ],
  },

  {
    options: [
      '1, 2, 3, 4, 5, 6, 7, 8, 9',
      'minCell',
      'table',
      'empty',
      'domain',
      'size',
      'smaller than',
      'is',
    ],
    paragraphs: [
      {
        help:
          'در ابتدا خونه‌ای به اسم minCell با بزرگترین دامنه ممکن تعریف میکنیم تا بعد با بررسی خونه‌های خالی جدول خونه‌ای رو پیدا کنیم که کمترین دامنه رو داره و اون رو در minCell جایگزین کنیم.',
        lines: [
          {
            tab: 0,
            items: [
              'minCell = cell with domain {',
              {
                type: 'blank',
                answer: 0,
              },
              '}',
            ],
          },
        ],
      },
      {
        help: 'می‌خوایم خونه‌های خالی جدول رو بررسی کنیم.',
        lines: [
          {
            tab: 0,
            items: [
              'for each cell in ',
              {
                type: 'blank',
                answer: 2,
              },
              ':',
            ],
          },
          {
            tab: 1,
            items: [
              'if cell ',
              {
                type: 'blank',
                answer: 7,
              },
              {
                type: 'blank',
                answer: 3,
              },
              ':',
            ],
          },
        ],
      },
      {
        help:
          'اندازه دامنه هر خونه خالی جدول رو با اندازه دامنه minCell مقایسه می‌کنیم. اگر کوچکتر بود، می فهمیم که اون خونه رو باید در minCell نگه داریم.',
        lines: [
          {
            tab: 2,
            items: [
              'if cell.',
              {
                type: 'blank',
                answer: 4,
              },
              '.',
              {
                type: 'blank',
                answer: 2,
              },

              'is',
              {
                type: 'blank',
                answer: 6,
              },
              {
                type: 'blank',
                answer: 1,
              },
              '.',
              {
                type: 'blank',
                answer: 4,
              },
              '.',
              {
                type: 'blank',
                answer: 2,
              },
            ],
          },
          {
            tab: 3,
            items: [
              'set',
              {
                type: 'blank',
                answer: 1,
              },
              'equal to cell',
            ],
          },
        ],
      },
      {
        help: '',
        lines: [
          {
            tab: 0,
            items: ['return minCell'],
          },
        ],
      },
    ],
  },

  {
    options: ['0', 'empty', 'full', 'table', 'is', 'size', 'domain'],
    paragraphs: [
      {
        help: 'اگر تمام جدول پر شده باشد کار ما به پایان رسیده.',
        lines: [
          {
            tab: 0,
            items: [
              'if',
              {
                type: 'blank',
                answer: 3,
              },
              'is',
              {
                type: 'blank',
                answer: 2,
              },
              ':',
            ],
          },
          {
            tab: 1,
            items: ['finish the algorithm'],
          },
        ],
      },
      {
        help: 'باید همه خانه‌های خالی جدول رو بررسی کنیم.',
        lines: [
          {
            tab: 0,
            items: [
              'for each cell in ',
              {
                type: 'blank',
                answer: 3,
              },
              ':',
            ],
          },
          {
            tab: 1,
            items: [
              'if cell ',
              {
                type: 'blank',
                answer: 4,
              },
              {
                type: 'blank',
                answer: 1,
              },
              ':',
            ],
          },
        ],
      },

      {
        help:
          'اگر اندازه دامنه خونه‌ای از جدول صفر شد یعنی در وضعیت ناسازگاری هستیم.',
        lines: [
          {
            tab: 2,
            items: [
              'if cell. ',
              {
                type: 'blank',
                answer: 6,
              },
              '.',
              {
                type: 'blank',
                answer: 5,
              },
              'is',
              {
                type: 'blank',
                answer: 0,
              },
              ':',
            ],
          },
          {
            tab: 3,
            items: ['return wrong answer'],
          },
        ],
      },

      {
        help: '',
        lines: [
          {
            tab: 0,
            items: ['return true answer '],
          },
        ],
      },
    ],
  },
];

export default configs;
