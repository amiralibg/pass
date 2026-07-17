import type { Locale } from '../../store/prefs'

export interface TriviaQuestion {
  id: string
  prompt: Record<Locale, string>
  /** Index into choices for the correct answer (before shuffle). */
  choices: Record<Locale, [string, string, string, string]>
  correctIndex: 0 | 1 | 2 | 3
}

export interface QuestionPack {
  id: string
  nameKey: string
  questions: TriviaQuestion[]
}

export const QUESTION_PACKS: QuestionPack[] = [
  {
    id: 'general',
    nameKey: 'general',
    questions: [
      {
        id: 'g1',
        prompt: { en: 'How many continents are there?', fa: 'چند قاره وجود دارد؟' },
        choices: {
          en: ['5', '6', '7', '8'],
          fa: ['۵', '۶', '۷', '۸'],
        },
        correctIndex: 2,
      },
      {
        id: 'g2',
        prompt: { en: 'What color do you get mixing red and blue?', fa: 'ترکیب قرمز و آبی چه رنگی می‌شود؟' },
        choices: {
          en: ['Green', 'Purple', 'Orange', 'Brown'],
          fa: ['سبز', 'بنفش', 'نارنجی', 'قهوه‌ای'],
        },
        correctIndex: 1,
      },
      {
        id: 'g3',
        prompt: { en: 'Which planet is known as the Red Planet?', fa: 'کدام سیاره به سیارهٔ سرخ معروف است؟' },
        choices: {
          en: ['Venus', 'Mars', 'Jupiter', 'Mercury'],
          fa: ['زهره', 'مریخ', 'مشتری', 'عطارد'],
        },
        correctIndex: 1,
      },
      {
        id: 'g4',
        prompt: { en: 'How many minutes are in two hours?', fa: 'دو ساعت چند دقیقه است؟' },
        choices: {
          en: ['60', '90', '120', '180'],
          fa: ['۶۰', '۹۰', '۱۲۰', '۱۸۰'],
        },
        correctIndex: 2,
      },
      {
        id: 'g5',
        prompt: { en: 'What do bees make?', fa: 'زنبورها چه چیزی می‌سازند؟' },
        choices: {
          en: ['Milk', 'Honey', 'Butter', 'Cheese'],
          fa: ['شیر', 'عسل', 'کره', 'پنیر'],
        },
        correctIndex: 1,
      },
      {
        id: 'g6',
        prompt: { en: 'Which ocean is the largest?', fa: 'بزرگ‌ترین اقیانوس کدام است؟' },
        choices: {
          en: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
          fa: ['اطلس', 'هند', 'قطب شمال', 'آرام'],
        },
        correctIndex: 3,
      },
      {
        id: 'g7',
        prompt: { en: 'How many sides does a hexagon have?', fa: 'شش‌ضلعی چند ضلع دارد؟' },
        choices: {
          en: ['5', '6', '7', '8'],
          fa: ['۵', '۶', '۷', '۸'],
        },
        correctIndex: 1,
      },
      {
        id: 'g8',
        prompt: { en: 'What is H2O commonly called?', fa: 'H2O معمولاً چه نامیده می‌شود؟' },
        choices: {
          en: ['Salt', 'Water', 'Oxygen', 'Ice cream'],
          fa: ['نمک', 'آب', 'اکسیژن', 'بستنی'],
        },
        correctIndex: 1,
      },
      {
        id: 'g9',
        prompt: { en: 'Which animal is known as the King of the Jungle?', fa: 'کدام حیوان به سلطان جنگل معروف است؟' },
        choices: {
          en: ['Tiger', 'Elephant', 'Lion', 'Gorilla'],
          fa: ['ببر', 'فیل', 'شیر', 'گوریل'],
        },
        correctIndex: 2,
      },
      {
        id: 'g10',
        prompt: { en: 'How many days are in a leap year?', fa: 'سال کبیسه چند روز دارد؟' },
        choices: {
          en: ['365', '366', '364', '360'],
          fa: ['۳۶۵', '۳۶۶', '۳۶۴', '۳۶۰'],
        },
        correctIndex: 1,
      },
      {
        id: 'g11',
        prompt: { en: 'What is the capital of France?', fa: 'پایتخت فرانسه کجاست؟' },
        choices: {
          en: ['Lyon', 'Marseille', 'Paris', 'Nice'],
          fa: ['لیون', 'مارسی', 'پاریس', 'نیس'],
        },
        correctIndex: 2,
      },
      {
        id: 'g12',
        prompt: { en: 'Which instrument has 88 keys?', fa: 'کدام ساز ۸۸ کلید دارد؟' },
        choices: {
          en: ['Guitar', 'Piano', 'Violin', 'Flute'],
          fa: ['گیتار', 'پیانو', 'ویولن', 'فلوت'],
        },
        correctIndex: 1,
      },
      {
        id: 'g13',
        prompt: { en: 'What do you call a baby cat?', fa: 'بچه گربه چه نام دارد؟' },
        choices: {
          en: ['Puppy', 'Cub', 'Kitten', 'Calf'],
          fa: ['توله سگ', 'توله', 'بچه گربه', 'گوساله'],
        },
        correctIndex: 2,
      },
      {
        id: 'g14',
        prompt: { en: 'Which gas do plants absorb?', fa: 'گیاهان کدام گاز را جذب می‌کنند؟' },
        choices: {
          en: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Helium'],
          fa: ['اکسیژن', 'نیتروژن', 'دی‌اکسید کربن', 'هلیوم'],
        },
        correctIndex: 2,
      },
      {
        id: 'g15',
        prompt: { en: 'How many legs does a spider have?', fa: 'عنکبوت چند پا دارد؟' },
        choices: {
          en: ['6', '8', '10', '12'],
          fa: ['۶', '۸', '۱۰', '۱۲'],
        },
        correctIndex: 1,
      },
      {
        id: 'g16',
        prompt: { en: 'What is the largest mammal?', fa: 'بزرگ‌ترین پستاندار کدام است؟' },
        choices: {
          en: ['Elephant', 'Blue whale', 'Giraffe', 'Hippo'],
          fa: ['فیل', 'نهنگ آبی', 'زرافه', 'اسب آبی'],
        },
        correctIndex: 1,
      },
      {
        id: 'g17',
        prompt: { en: 'Which fruit is yellow and curved?', fa: 'کدام میوه زرد و خمیده است؟' },
        choices: {
          en: ['Apple', 'Banana', 'Lemon', 'Mango'],
          fa: ['سیب', 'موز', 'لیمو', 'انبه'],
        },
        correctIndex: 1,
      },
      {
        id: 'g18',
        prompt: { en: 'What is 9 × 9?', fa: '۹ × ۹ چند می‌شود؟' },
        choices: {
          en: ['72', '81', '99', '90'],
          fa: ['۷۲', '۸۱', '۹۹', '۹۰'],
        },
        correctIndex: 1,
      },
      {
        id: 'g19',
        prompt: { en: 'Which season comes after winter?', fa: 'بعد از زمستان کدام فصل می‌آید؟' },
        choices: {
          en: ['Summer', 'Autumn', 'Spring', 'Monsoon'],
          fa: ['تابستان', 'پاییز', 'بهار', 'فصل باران'],
        },
        correctIndex: 2,
      },
      {
        id: 'g20',
        prompt: { en: 'What is the freezing point of water (°C)?', fa: 'نقطهٔ انجماد آب چند درجه سانتی‌گراد است؟' },
        choices: {
          en: ['0', '10', '32', '100'],
          fa: ['۰', '۱۰', '۳۲', '۱۰۰'],
        },
        correctIndex: 0,
      },
      {
        id: 'g21',
        prompt: { en: 'How many wheels does a bicycle usually have?', fa: 'دوچرخه معمولاً چند چرخ دارد؟' },
        choices: {
          en: ['1', '2', '3', '4'],
          fa: ['۱', '۲', '۳', '۴'],
        },
        correctIndex: 1,
      },
      {
        id: 'g22',
        prompt: { en: 'Which bird cannot fly?', fa: 'کدام پرنده نمی‌تواند پرواز کند؟' },
        choices: {
          en: ['Eagle', 'Penguin', 'Sparrow', 'Owl'],
          fa: ['عقاب', 'پنگوئن', 'گنجشک', 'جغد'],
        },
        correctIndex: 1,
      },
      {
        id: 'g23',
        prompt: { en: 'What currency is used in Japan?', fa: 'واحد پول ژاپن چیست؟' },
        choices: {
          en: ['Yuan', 'Won', 'Yen', 'Baht'],
          fa: ['یوان', 'وون', 'ین', 'بات'],
        },
        correctIndex: 2,
      },
      {
        id: 'g24',
        prompt: { en: 'Which shape has three sides?', fa: 'کدام شکل سه ضلع دارد؟' },
        choices: {
          en: ['Square', 'Triangle', 'Circle', 'Pentagon'],
          fa: ['مربع', 'مثلث', 'دایره', 'پنج‌ضلعی'],
        },
        correctIndex: 1,
      },
      {
        id: 'g25',
        prompt: { en: 'What do you use to measure temperature?', fa: 'دما را با چه چیزی اندازه می‌گیرند؟' },
        choices: {
          en: ['Barometer', 'Thermometer', 'Compass', 'Ruler'],
          fa: ['فشارسنج', 'دماسنج', 'قطب‌نما', 'خط‌کش'],
        },
        correctIndex: 1,
      },
      {
        id: 'g26',
        prompt: { en: 'Which metal is liquid at room temperature?', fa: 'کدام فلز در دمای اتاق مایع است؟' },
        choices: {
          en: ['Iron', 'Mercury', 'Copper', 'Silver'],
          fa: ['آهن', 'جیوه', 'مس', 'نقره'],
        },
        correctIndex: 1,
      },
      {
        id: 'g27',
        prompt: { en: 'How many strings does a standard guitar have?', fa: 'گیتار معمولی چند سیم دارد؟' },
        choices: {
          en: ['4', '5', '6', '8'],
          fa: ['۴', '۵', '۶', '۸'],
        },
        correctIndex: 2,
      },
      {
        id: 'g28',
        prompt: { en: 'What is the capital of Iran?', fa: 'پایتخت ایران کجاست؟' },
        choices: {
          en: ['Isfahan', 'Shiraz', 'Tehran', 'Tabriz'],
          fa: ['اصفهان', 'شیراز', 'تهران', 'تبریز'],
        },
        correctIndex: 2,
      },
      {
        id: 'g29',
        prompt: { en: 'Which sense uses your nose?', fa: 'کدام حس با بینی است؟' },
        choices: {
          en: ['Taste', 'Smell', 'Touch', 'Hearing'],
          fa: ['چشایی', 'بویایی', 'لامسه', 'شنوایی'],
        },
        correctIndex: 1,
      },
      {
        id: 'g30',
        prompt: { en: 'What is the opposite of “north”?', fa: 'مخالف «شمال» چیست؟' },
        choices: {
          en: ['East', 'West', 'South', 'Up'],
          fa: ['شرق', 'غرب', 'جنوب', 'بالا'],
        },
        correctIndex: 2,
      },
      {
        id: 'g31',
        prompt: { en: 'How many hours are in a day?', fa: 'یک شبانه‌روز چند ساعت است؟' },
        choices: {
          en: ['12', '24', '36', '48'],
          fa: ['۱۲', '۲۴', '۳۶', '۴۸'],
        },
        correctIndex: 1,
      },
      {
        id: 'g32',
        prompt: { en: 'Which organ pumps blood?', fa: 'کدام عضو خون را پمپ می‌کند؟' },
        choices: {
          en: ['Lungs', 'Heart', 'Liver', 'Brain'],
          fa: ['ریه', 'قلب', 'کبد', 'مغز'],
        },
        correctIndex: 1,
      },
      {
        id: 'g33',
        prompt: { en: 'What is the tallest animal?', fa: 'بلندترین حیوان کدام است؟' },
        choices: {
          en: ['Elephant', 'Giraffe', 'Camel', 'Horse'],
          fa: ['فیل', 'زرافه', 'شتر', 'اسب'],
        },
        correctIndex: 1,
      },
      {
        id: 'g34',
        prompt: { en: 'How many colors in a rainbow?', fa: 'رنگین‌کمان چند رنگ دارد؟' },
        choices: {
          en: ['5', '6', '7', '8'],
          fa: ['۵', '۶', '۷', '۸'],
        },
        correctIndex: 2,
      },
      {
        id: 'g35',
        prompt: { en: 'Which direction does the sun rise?', fa: 'خورشید از کدام جهت طلوع می‌کند؟' },
        choices: {
          en: ['West', 'East', 'North', 'South'],
          fa: ['غرب', 'شرق', 'شمال', 'جنوب'],
        },
        correctIndex: 1,
      },
      {
        id: 'g36',
        prompt: { en: 'What do caterpillars become?', fa: 'کرم ابریشم معمولاً چه می‌شود؟' },
        choices: {
          en: ['Beetles', 'Butterflies', 'Spiders', 'Ants'],
          fa: ['سوسک', 'پروانه', 'عنکبوت', 'مورچه'],
        },
        correctIndex: 1,
      },
      {
        id: 'g37',
        prompt: { en: 'Which is a primary color?', fa: 'کدام رنگ اصلی است؟' },
        choices: {
          en: ['Green', 'Purple', 'Blue', 'Pink'],
          fa: ['سبز', 'بنفش', 'آبی', 'صورتی'],
        },
        correctIndex: 2,
      },
      {
        id: 'g38',
        prompt: { en: 'How many teeth do adult humans usually have?', fa: 'انسان بالغ معمولاً چند دندان دارد؟' },
        choices: {
          en: ['28', '30', '32', '36'],
          fa: ['۲۸', '۳۰', '۳۲', '۳۶'],
        },
        correctIndex: 2,
      },
      {
        id: 'g39',
        prompt: { en: 'What is the largest ocean on Earth?', fa: 'بزرگ‌ترین اقیانوس زمین کدام است؟' },
        choices: {
          en: ['Atlantic', 'Pacific', 'Indian', 'Arctic'],
          fa: ['اطلس', 'آرام', 'هند', 'قطبی'],
        },
        correctIndex: 1,
      },
      {
        id: 'g40',
        prompt: { en: 'Which planet is closest to the Sun?', fa: 'نزدیک‌ترین سیاره به خورشید کدام است؟' },
        choices: {
          en: ['Venus', 'Mercury', 'Earth', 'Mars'],
          fa: ['زهره', 'عطارد', 'زمین', 'مریخ'],
        },
        correctIndex: 1,
      },
      {
        id: 'g41',
        prompt: { en: 'What is ice made of?', fa: 'یخ از چه ساخته شده؟' },
        choices: {
          en: ['Salt', 'Frozen water', 'Plastic', 'Metal'],
          fa: ['نمک', 'آب یخ‌زده', 'پلاستیک', 'فلز'],
        },
        correctIndex: 1,
      },
      {
        id: 'g42',
        prompt: { en: 'Which bird is a symbol of peace?', fa: 'کدام پرنده نماد صلح است؟' },
        choices: {
          en: ['Eagle', 'Dove', 'Crow', 'Owl'],
          fa: ['عقاب', 'کبوتر', 'کلاغ', 'جغد'],
        },
        correctIndex: 1,
      },
      {
        id: 'g43',
        prompt: { en: 'How many months have 28 days?', fa: 'چند ماه ۲۸ روز دارند؟' },
        choices: {
          en: ['1', '2', '6', '12'],
          fa: ['۱', '۲', '۶', '۱۲'],
        },
        correctIndex: 3,
      },
      {
        id: 'g44',
        prompt: { en: 'What do you call frozen rain?', fa: 'باران یخ‌زده چه نام دارد؟' },
        choices: {
          en: ['Fog', 'Hail', 'Mist', 'Dew'],
          fa: ['مه', 'تگرگ', 'غبار', 'شبنم'],
        },
        correctIndex: 1,
      },
      {
        id: 'g45',
        prompt: { en: 'Which sense uses your ears?', fa: 'کدام حس با گوش است؟' },
        choices: {
          en: ['Smell', 'Hearing', 'Taste', 'Sight'],
          fa: ['بویایی', 'شنوایی', 'چشایی', 'بینایی'],
        },
        correctIndex: 1,
      },
      {
        id: 'g46',
        prompt: { en: 'What is the capital of Italy?', fa: 'پایتخت ایتالیا کجاست؟' },
        choices: {
          en: ['Milan', 'Rome', 'Venice', 'Naples'],
          fa: ['میلان', 'رم', 'ونیز', 'ناپل'],
        },
        correctIndex: 1,
      },
      {
        id: 'g47',
        prompt: { en: 'Which animal is known for black and white stripes?', fa: 'کدام حیوان راه راه سیاه و سفید است؟' },
        choices: {
          en: ['Tiger', 'Zebra', 'Panda', 'Skunk'],
          fa: ['ببر', 'گورخر', 'پاندا', 'راسو'],
        },
        correctIndex: 1,
      },
      {
        id: 'g48',
        prompt: { en: 'How many sides does a stop sign usually have?', fa: 'تابلوی ایست معمولاً چند ضلع دارد؟' },
        choices: {
          en: ['6', '7', '8', '9'],
          fa: ['۶', '۷', '۸', '۹'],
        },
        correctIndex: 2,
      },
      {
        id: 'g49',
        prompt: { en: 'What gas do we breathe in to live?', fa: 'برای زنده ماندن کدام گاز را تنفس می‌کنیم؟' },
        choices: {
          en: ['Carbon dioxide', 'Oxygen', 'Nitrogen only', 'Helium'],
          fa: ['دی‌اکسید کربن', 'اکسیژن', 'فقط نیتروژن', 'هلیوم'],
        },
        correctIndex: 1,
      },
      {
        id: 'g50',
        prompt: { en: 'Which tool measures weight?', fa: 'کدام ابزار وزن را اندازه می‌گیرد؟' },
        choices: {
          en: ['Ruler', 'Scale', 'Compass', 'Clock'],
          fa: ['خط‌کش', 'ترازو', 'قطب‌نما', 'ساعت'],
        },
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'pop',
    nameKey: 'pop',
    questions: [
      {
        id: 'p1',
        prompt: { en: 'Which app is known for short videos?', fa: 'کدام اپ به ویدیوهای کوتاه معروف است؟' },
        choices: {
          en: ['TikTok', 'Excel', 'Maps', 'Calendar'],
          fa: ['تیک‌تاک', 'اکسل', 'نقشه', 'تقویم'],
        },
        correctIndex: 0,
      },
      {
        id: 'p2',
        prompt: { en: 'Mario is a character from which company?', fa: 'ماریو شخصیت کدام شرکت است؟' },
        choices: {
          en: ['Sony', 'Nintendo', 'Sega', 'Xbox'],
          fa: ['سونی', 'نینتندو', 'سگا', 'ایکس‌باکس'],
        },
        correctIndex: 1,
      },
      {
        id: 'p3',
        prompt: { en: 'Which platform is famous for tweets?', fa: 'کدام پلتفرم به توییت معروف است؟' },
        choices: {
          en: ['Instagram', 'X (Twitter)', 'LinkedIn', 'Pinterest'],
          fa: ['اینستاگرام', 'ایکس (توییتر)', 'لینکدین', 'پینترست'],
        },
        correctIndex: 1,
      },
      {
        id: 'p4',
        prompt: { en: 'Harry Potter’s school is called…', fa: 'مدرسهٔ هری پاتر چه نام دارد؟' },
        choices: {
          en: ['Beauxbatons', 'Hogwarts', 'Durmstrang', 'Ilvermorny'],
          fa: ['بوکس‌باتون', 'هاگوارتز', 'دورمسترنگ', 'ایلوِرمرنی'],
        },
        correctIndex: 1,
      },
      {
        id: 'p5',
        prompt: { en: 'Which company makes the iPhone?', fa: 'آیفون ساخت کدام شرکت است؟' },
        choices: {
          en: ['Samsung', 'Google', 'Apple', 'Nokia'],
          fa: ['سامسونگ', 'گوگل', 'اپل', 'نوکیا'],
        },
        correctIndex: 2,
      },
      {
        id: 'p6',
        prompt: { en: 'In football, how many players per team on the field?', fa: 'در فوتبال هر تیم چند بازیکن روی زمین دارد؟' },
        choices: {
          en: ['9', '10', '11', '12'],
          fa: ['۹', '۱۰', '۱۱', '۱۲'],
        },
        correctIndex: 2,
      },
      {
        id: 'p7',
        prompt: { en: 'Which streaming service has “Stranger Things”?', fa: 'سریال Stranger Things روی کدام سرویس است؟' },
        choices: {
          en: ['Netflix', 'Disney+', 'Hulu', 'Max'],
          fa: ['نتفلیکس', 'دیزنی‌پلاس', 'هولو', 'مکس'],
        },
        correctIndex: 0,
      },
      {
        id: 'p8',
        prompt: { en: 'What color is Pikachu mostly?', fa: 'پیکاچو بیشتر چه رنگی است؟' },
        choices: {
          en: ['Blue', 'Yellow', 'Red', 'Green'],
          fa: ['آبی', 'زرد', 'قرمز', 'سبز'],
        },
        correctIndex: 1,
      },
      {
        id: 'p9',
        prompt: { en: 'Which social app is known for Stories?', fa: 'کدام اپ به استوری معروف است؟' },
        choices: {
          en: ['Instagram', 'Spotify', 'Uber', 'Zoom'],
          fa: ['اینستاگرام', 'اسپاتیفای', 'اوبر', 'زوم'],
        },
        correctIndex: 0,
      },
      {
        id: 'p10',
        prompt: { en: '“The Lion King” is mainly set in…', fa: 'داستان شیرشاه عمدتاً کجاست؟' },
        choices: {
          en: ['The Arctic', 'The African savanna', 'The Amazon', 'Australia'],
          fa: ['قطب شمال', 'ساوانای آفریقا', 'آمازون', 'استرالیا'],
        },
        correctIndex: 1,
      },
      {
        id: 'p11',
        prompt: { en: 'Which console is made by Sony?', fa: 'کدام کنسول ساخت سونی است؟' },
        choices: {
          en: ['Switch', 'Xbox', 'PlayStation', 'Steam Deck'],
          fa: ['سوییچ', 'ایکس‌باکس', 'پلی‌استیشن', 'استیم دک'],
        },
        correctIndex: 2,
      },
      {
        id: 'p12',
        prompt: { en: 'What does “LOL” usually mean?', fa: 'معمولاً LOL یعنی چه؟' },
        choices: {
          en: ['Lots of love', 'Laugh out loud', 'Look out later', 'Level of luck'],
          fa: ['عشق زیاد', 'با صدای بلند خندیدن', 'بعداً ببین', 'سطح شانس'],
        },
        correctIndex: 1,
      },
      {
        id: 'p13',
        prompt: { en: 'Which sport uses a shuttlecock?', fa: 'کدام ورزش از توپ پردار استفاده می‌کند؟' },
        choices: {
          en: ['Tennis', 'Badminton', 'Golf', 'Hockey'],
          fa: ['تنیس', 'بدمینتون', 'گلف', 'هاکی'],
        },
        correctIndex: 1,
      },
      {
        id: 'p14',
        prompt: { en: 'Who lives in a pineapple under the sea?', fa: 'کی توی آناناس زیر دریا زندگی می‌کند؟' },
        choices: {
          en: ['Patrick', 'SpongeBob', 'Squidward', 'Mr. Krabs'],
          fa: ['پاتریک', 'باب‌اسفنجی', 'اختاپوس', 'آقای خرچنگ'],
        },
        correctIndex: 1,
      },
      {
        id: 'p15',
        prompt: { en: 'Which company owns YouTube?', fa: 'یوتیوب متعلق به کدام شرکت است؟' },
        choices: {
          en: ['Meta', 'Amazon', 'Google', 'Microsoft'],
          fa: ['متا', 'آمازون', 'گوگل', 'مایکروسافت'],
        },
        correctIndex: 2,
      },
      {
        id: 'p16',
        prompt: { en: 'In chess, which piece can jump over others?', fa: 'در شطرنج کدام مهره می‌تواند از روی بقیه بپرد؟' },
        choices: {
          en: ['Bishop', 'Knight', 'Rook', 'Queen'],
          fa: ['فیل', 'اسب', 'رخ', 'وزیر'],
        },
        correctIndex: 1,
      },
      {
        id: 'p17',
        prompt: { en: 'Which drink is espresso mostly made from?', fa: 'اسپرسو عمدتاً از چه چیزی درست می‌شود؟' },
        choices: {
          en: ['Tea leaves', 'Coffee beans', 'Cocoa pods', 'Mint'],
          fa: ['برگ چای', 'دانه قهوه', 'کاکائو', 'نعناع'],
        },
        correctIndex: 1,
      },
      {
        id: 'p18',
        prompt: { en: 'What is the name of Elsa’s sister in Frozen?', fa: 'اسم خواهر السا در فروزن چیست؟' },
        choices: {
          en: ['Anna', 'Ariel', 'Belle', 'Moana'],
          fa: ['آنا', 'اریل', 'بل', 'موآنا'],
        },
        correctIndex: 0,
      },
      {
        id: 'p19',
        prompt: { en: 'Which app is mainly for music streaming?', fa: 'کدام اپ بیشتر برای استریم موسیقی است؟' },
        choices: {
          en: ['Spotify', 'Gmail', 'Notion', 'Dropbox'],
          fa: ['اسپاتیفای', 'جیمیل', 'نوشن', 'دراپ‌باکس'],
        },
        correctIndex: 0,
      },
      {
        id: 'p20',
        prompt: { en: 'Olympic rings: how many are there?', fa: 'حلقه‌های المپیک چند تا هستند؟' },
        choices: {
          en: ['4', '5', '6', '7'],
          fa: ['۴', '۵', '۶', '۷'],
        },
        correctIndex: 1,
      },
      {
        id: 'p21',
        prompt: { en: 'Which messaging app uses a green logo (Android default)?', fa: 'کدام پیام‌رسان لوگوی سبز معروف دارد؟' },
        choices: {
          en: ['Telegram', 'WhatsApp', 'Signal', 'iMessage'],
          fa: ['تلگرام', 'واتساپ', 'سیگنال', 'آی‌مسیج'],
        },
        correctIndex: 1,
      },
      {
        id: 'p22',
        prompt: { en: 'In Among Us, the impostors try to…', fa: 'در Among Us ایمپاستورها سعی می‌کنند…' },
        choices: {
          en: ['Fix the ship', 'Eliminate crew', 'Cook dinner', 'Win at chess'],
          fa: ['تعمیر کشتی', 'حذف خدمه', 'شام بپزند', 'شطرنج ببرند'],
        },
        correctIndex: 1,
      },
      {
        id: 'p23',
        prompt: { en: 'Which city hosts the Eiffel Tower?', fa: 'برج ایفل در کدام شهر است؟' },
        choices: {
          en: ['Rome', 'Paris', 'Berlin', 'Madrid'],
          fa: ['رم', 'پاریس', 'برلین', 'مادرید'],
        },
        correctIndex: 1,
      },
      {
        id: 'p24',
        prompt: { en: 'What does a DJ primarily do?', fa: 'دی‌جی عمدتاً چه کار می‌کند؟' },
        choices: {
          en: ['Cook food', 'Play music', 'Drive taxis', 'Paint walls'],
          fa: ['غذا می‌پزد', 'موسیقی پخش می‌کند', 'تاکسی می‌راند', 'دیوار رنگ می‌کند'],
        },
        correctIndex: 1,
      },
      {
        id: 'p25',
        prompt: { en: 'Which superhero is also called the Dark Knight?', fa: 'کدام ابرقهرمان به شوالیهٔ تاریکی معروف است؟' },
        choices: {
          en: ['Superman', 'Batman', 'Spider-Man', 'Iron Man'],
          fa: ['سوپرمن', 'بتمن', 'مرد عنکبوتی', 'آیرون‌من'],
        },
        correctIndex: 1,
      },
      {
        id: 'p26',
        prompt: { en: 'Minecraft is mainly about…', fa: 'ماینکرفت بیشتر دربارهٔ چیست؟' },
        choices: {
          en: ['Racing cars', 'Building & crafting', 'Cooking shows', 'Stock trading'],
          fa: ['مسابقه ماشین', 'ساخت و کرافت', 'برنامه آشپزی', 'بورس'],
        },
        correctIndex: 1,
      },
      {
        id: 'p27',
        prompt: { en: 'Which brand’s logo is a bitten apple?', fa: 'لوگوی کدام برند سیب گاززده است؟' },
        choices: {
          en: ['Microsoft', 'Apple', 'Amazon', 'Nike'],
          fa: ['مایکروسافت', 'اپل', 'آمازون', 'نایک'],
        },
        correctIndex: 1,
      },
      {
        id: 'p28',
        prompt: { en: 'How many players on a basketball team on court?', fa: 'در بسکتبال چند بازیکن هر تیم روی زمین است؟' },
        choices: {
          en: ['4', '5', '6', '7'],
          fa: ['۴', '۵', '۶', '۷'],
        },
        correctIndex: 1,
      },
      {
        id: 'p29',
        prompt: { en: 'Which app is for short-form voice/rooms historically?', fa: 'کدام اپ به اتاق‌های صوتی معروف شد؟' },
        choices: {
          en: ['Clubhouse', 'Photoshop', 'Excel', 'Figma'],
          fa: ['کلاب‌هاوس', 'فتوشاپ', 'اکسل', 'فیگما'],
        },
        correctIndex: 0,
      },
      {
        id: 'p30',
        prompt: { en: '“May the Force be with you” is from…', fa: 'جملهٔ «نیرو با تو باشد» از کدام اثر است؟' },
        choices: {
          en: ['Star Trek', 'Star Wars', 'Dune', 'Matrix'],
          fa: ['پیشتازان فضا', 'جنگ ستارگان', 'تلماسه', 'ماتریکس'],
        },
        correctIndex: 1,
      },
      {
        id: 'p31',
        prompt: { en: 'Which company makes PlayStation?', fa: 'پلی‌استیشن ساخت کدام شرکت است؟' },
        choices: {
          en: ['Nintendo', 'Sony', 'Microsoft', 'Sega'],
          fa: ['نینتندو', 'سونی', 'مایکروسافت', 'سگا'],
        },
        correctIndex: 1,
      },
      {
        id: 'p32',
        prompt: { en: 'What is the name of Mickey Mouse’s dog?', fa: 'اسم سگ میکی‌ماوس چیست؟' },
        choices: {
          en: ['Goofy', 'Pluto', 'Odie', 'Snoopy'],
          fa: ['گوفی', 'پلوتو', 'اودی', 'اسنوپی'],
        },
        correctIndex: 1,
      },
      {
        id: 'p33',
        prompt: { en: 'Which app is known for disappearing photos?', fa: 'کدام اپ به عکس‌های ناپدیدشونده معروف است؟' },
        choices: {
          en: ['Snapchat', 'LinkedIn', 'Dropbox', 'Notion'],
          fa: ['اسنپ‌چت', 'لینکدین', 'دراپ‌باکس', 'نوشن'],
        },
        correctIndex: 0,
      },
      {
        id: 'p34',
        prompt: { en: 'Who is known as the Caped Crusader?', fa: 'کی به جنگجوی شنل‌دار معروف است؟' },
        choices: {
          en: ['Superman', 'Batman', 'Flash', 'Aquaman'],
          fa: ['سوپرمن', 'بتمن', 'فلش', 'آکوامن'],
        },
        correctIndex: 1,
      },
      {
        id: 'p35',
        prompt: { en: 'Which movie features a ring that must be destroyed?', fa: 'کدام فیلم انگشتری دارد که باید نابود شود؟' },
        choices: {
          en: ['Harry Potter', 'Lord of the Rings', 'Narnia', 'Star Wars'],
          fa: ['هری پاتر', 'ارباب حلقه‌ها', 'نارنیا', 'جنگ ستارگان'],
        },
        correctIndex: 1,
      },
      {
        id: 'p36',
        prompt: { en: 'What does “BRB” mean?', fa: 'BRB یعنی چه؟' },
        choices: {
          en: ['Be right back', 'Big red button', 'Bring real bread', 'Best rock band'],
          fa: ['الآن برمی‌گردم', 'دکمه قرمز بزرگ', 'نان واقعی بیاور', 'بهترین بند راک'],
        },
        correctIndex: 0,
      },
      {
        id: 'p37',
        prompt: { en: 'Which sport is played at Wimbledon?', fa: 'در ویمبلدون کدام ورزش بازی می‌شود؟' },
        choices: {
          en: ['Golf', 'Tennis', 'Cricket', 'Rugby'],
          fa: ['گلف', 'تنیس', 'کریکت', 'راگبی'],
        },
        correctIndex: 1,
      },
      {
        id: 'p38',
        prompt: { en: 'Which browser is made by Google?', fa: 'کدام مرورگر ساخت گوگل است؟' },
        choices: {
          en: ['Firefox', 'Safari', 'Chrome', 'Edge'],
          fa: ['فایرفاکس', 'سافاری', 'کروم', 'اج'],
        },
        correctIndex: 2,
      },
      {
        id: 'p39',
        prompt: { en: 'In Fortnite, players often…', fa: 'در فورتنایت بازیکن‌ها معمولاً…' },
        choices: {
          en: ['Build and battle', 'Cook lasagna', 'Write essays', 'Paint houses'],
          fa: ['می‌سازند و می‌جنگند', 'لازانیا می‌پزند', 'انشا می‌نویسند', 'خانه رنگ می‌کنند'],
        },
        correctIndex: 0,
      },
      {
        id: 'p40',
        prompt: { en: 'Which singer is known as the “Queen of Pop”?', fa: 'کدام خواننده به «ملکه پاپ» معروف است؟' },
        choices: {
          en: ['Madonna', 'Adele', 'Beyoncé', 'Taylor Swift'],
          fa: ['مدونا', 'ادیل', 'بیانسه', 'تیلور سویفت'],
        },
        correctIndex: 0,
      },
      {
        id: 'p41',
        prompt: { en: 'What color is the Hulk usually?', fa: 'هالک معمولاً چه رنگی است؟' },
        choices: {
          en: ['Blue', 'Green', 'Red', 'Yellow'],
          fa: ['آبی', 'سبز', 'قرمز', 'زرد'],
        },
        correctIndex: 1,
      },
      {
        id: 'p42',
        prompt: { en: 'Which platform is mainly for job networking?', fa: 'کدام پلتفرم بیشتر برای شبکه کاری است؟' },
        choices: {
          en: ['TikTok', 'LinkedIn', 'Twitch', 'Pinterest'],
          fa: ['تیک‌تاک', 'لینکدین', 'تویچ', 'پینترست'],
        },
        correctIndex: 1,
      },
      {
        id: 'p43',
        prompt: { en: '“Hakuna Matata” is from which film?', fa: '«Hakuna Matata» از کدام فیلم است؟' },
        choices: {
          en: ['Aladdin', 'The Lion King', 'Moana', 'Frozen'],
          fa: ['علاءالدین', 'شیرشاه', 'موآنا', 'فروزن'],
        },
        correctIndex: 1,
      },
      {
        id: 'p44',
        prompt: { en: 'Which console has Joy-Con controllers?', fa: 'کدام کنسول جوی‌کان دارد؟' },
        choices: {
          en: ['PS5', 'Xbox', 'Nintendo Switch', 'Atari'],
          fa: ['پی‌اس۵', 'ایکس‌باکس', 'نینتندو سوییچ', 'آتاری'],
        },
        correctIndex: 2,
      },
      {
        id: 'p45',
        prompt: { en: 'What is a viral short video often called?', fa: 'ویدیوی کوتاه وایرال معمولاً چه نامیده می‌شود؟' },
        choices: {
          en: ['Reel / Short', 'Novel', 'Podcast', 'Spreadsheet'],
          fa: ['ریل / شورت', 'رمان', 'پادکست', 'جدول'],
        },
        correctIndex: 0,
      },
      {
        id: 'p46',
        prompt: { en: 'Which drink brand uses a red can often?', fa: 'کدام برند نوشابه قوطی قرمز معروف دارد؟' },
        choices: {
          en: ['Pepsi', 'Coca-Cola', 'Sprite', 'Fanta'],
          fa: ['پپسی', 'کوکاکولا', 'اسپرایت', 'فانتا'],
        },
        correctIndex: 1,
      },
      {
        id: 'p47',
        prompt: { en: 'Who lives at 221B Baker Street (fiction)?', fa: 'در داستان، کی در خیابان بیکر ۲۲۱ب زندگی می‌کند؟' },
        choices: {
          en: ['Watson only', 'Sherlock Holmes', 'Poirot', 'Marlowe'],
          fa: ['فقط واتسون', 'شرلوک هلمز', 'پوآرو', 'مارلو'],
        },
        correctIndex: 1,
      },
      {
        id: 'p48',
        prompt: { en: 'Which app is mainly for maps & navigation?', fa: 'کدام اپ بیشتر برای نقشه و مسیریابی است؟' },
        choices: {
          en: ['Google Maps', 'Spotify', 'Netflix', 'Duolingo'],
          fa: ['گوگل مپس', 'اسپاتیفای', 'نتفلیکس', 'دولینگو'],
        },
        correctIndex: 0,
      },
      {
        id: 'p49',
        prompt: { en: 'In chess, the king moves how many squares?', fa: 'در شطرنج شاه حداکثر چند خانه جابه‌جا می‌شود؟' },
        choices: {
          en: ['1', '2', '3', 'Any'],
          fa: ['۱', '۲', '۳', 'هر تعداد'],
        },
        correctIndex: 0,
      },
      {
        id: 'p50',
        prompt: { en: 'Which company owns Instagram?', fa: 'اینستاگرام متعلق به کدام شرکت است؟' },
        choices: {
          en: ['Apple', 'Meta', 'Amazon', 'Tesla'],
          fa: ['اپل', 'متا', 'آمازون', 'تسلا'],
        },
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'sports',
    nameKey: 'sports',
    questions: [
      {
        id: 's1',
        prompt: { en: 'How many players on a soccer team on the field?', fa: 'در فوتبال چند بازیکن هر تیم روی زمین است؟' },
        choices: {
          en: ['9', '10', '11', '12'],
          fa: ['۹', '۱۰', '۱۱', '۱۲'],
        },
        correctIndex: 2,
      },
      {
        id: 's2',
        prompt: { en: 'In basketball, a shot from beyond the arc is worth…', fa: 'در بسکتبال شوت خارج از قوس چند امتیاز است؟' },
        choices: {
          en: ['1', '2', '3', '4'],
          fa: ['۱', '۲', '۳', '۴'],
        },
        correctIndex: 2,
      },
      {
        id: 's3',
        prompt: { en: 'What do you hit in tennis?', fa: 'در تنیس به چه چیزی ضربه می‌زنید؟' },
        choices: {
          en: ['Puck', 'Shuttlecock', 'Ball', 'Birdie only'],
          fa: ['پاک', 'شاتل', 'توپ', 'فقط بردی'],
        },
        correctIndex: 2,
      },
      {
        id: 's4',
        prompt: { en: 'How long is an Olympic swimming pool (meters)?', fa: 'طول استخر المپیک چند متر است؟' },
        choices: {
          en: ['25', '50', '75', '100'],
          fa: ['۲۵', '۵۰', '۷۵', '۱۰۰'],
        },
        correctIndex: 1,
      },
      {
        id: 's5',
        prompt: { en: 'In volleyball, how many players per team on court?', fa: 'در والیبال چند بازیکن هر تیم روی زمین است؟' },
        choices: {
          en: ['5', '6', '7', '8'],
          fa: ['۵', '۶', '۷', '۸'],
        },
        correctIndex: 1,
      },
      {
        id: 's6',
        prompt: { en: 'What sport uses a puck?', fa: 'کدام ورزش از پاک استفاده می‌کند؟' },
        choices: {
          en: ['Soccer', 'Ice hockey', 'Tennis', 'Golf'],
          fa: ['فوتبال', 'هاکی روی یخ', 'تنیس', 'گلف'],
        },
        correctIndex: 1,
      },
      {
        id: 's7',
        prompt: { en: 'A marathon is about how many kilometers?', fa: 'ماراتن حدوداً چند کیلومتر است؟' },
        choices: {
          en: ['21', '32', '42', '50'],
          fa: ['۲۱', '۳۲', '۴۲', '۵۰'],
        },
        correctIndex: 2,
      },
      {
        id: 's8',
        prompt: { en: 'In baseball, how many strikes make an out?', fa: 'در بیسبال چند استرایک اوت است؟' },
        choices: {
          en: ['2', '3', '4', '5'],
          fa: ['۲', '۳', '۴', '۵'],
        },
        correctIndex: 1,
      },
      {
        id: 's9',
        prompt: { en: 'Which sport is Formula 1?', fa: 'فرمول یک مربوط به کدام ورزش است؟' },
        choices: {
          en: ['Cycling', 'Auto racing', 'Sailing', 'Skiing'],
          fa: ['دوچرخه‌سواری', 'اتومبیل‌رانی', 'قایق‌رانی', 'اسکی'],
        },
        correctIndex: 1,
      },
      {
        id: 's10',
        prompt: { en: 'In boxing, matches are divided into…', fa: 'در بوکس مسابقه به چه تقسیم می‌شود؟' },
        choices: {
          en: ['Sets', 'Rounds', 'Quarters', 'Chukkers'],
          fa: ['ست', 'راند', 'کوارتر', 'چاکر'],
        },
        correctIndex: 1,
      },
      {
        id: 's11',
        prompt: { en: 'What color card means a soccer player is sent off?', fa: 'کدام کارت یعنی اخراج در فوتبال؟' },
        choices: {
          en: ['Yellow', 'Red', 'Green', 'Blue'],
          fa: ['زرد', 'قرمز', 'سبز', 'آبی'],
        },
        correctIndex: 1,
      },
      {
        id: 's12',
        prompt: { en: 'Which sport uses a birdie and eagle scoring?', fa: 'کدام ورزش امتیاز بردی و ایگل دارد؟' },
        choices: {
          en: ['Tennis', 'Golf', 'Bowling', 'Darts'],
          fa: ['تنیس', 'گلف', 'بولینگ', 'دارت'],
        },
        correctIndex: 1,
      },
      {
        id: 's13',
        prompt: { en: 'In table tennis, a game often goes to…', fa: 'در پینگ‌پنگ معمولاً بازی تا چند امتیاز است؟' },
        choices: {
          en: ['11', '15', '21', '25'],
          fa: ['۱۱', '۱۵', '۲۱', '۲۵'],
        },
        correctIndex: 0,
      },
      {
        id: 's14',
        prompt: { en: 'What do wrestlers compete on?', fa: 'کشتی‌گیران روی چه چیزی رقابت می‌کنند؟' },
        choices: {
          en: ['Court', 'Mat', 'Pitch', 'Rink'],
          fa: ['کورت', 'تشک', 'زمین چمن', 'پیست یخ'],
        },
        correctIndex: 1,
      },
      {
        id: 's15',
        prompt: { en: 'Which country hosted the 2016 Olympics?', fa: 'المپیک ۲۰۱۶ در کدام کشور برگزار شد؟' },
        choices: {
          en: ['China', 'Brazil', 'UK', 'Japan'],
          fa: ['چین', 'برزیل', 'انگلستان', 'ژاپن'],
        },
        correctIndex: 1,
      },
      {
        id: 's16',
        prompt: { en: 'In cricket, what do you hit the ball with?', fa: 'در کریکت توپ را با چه می‌زنید؟' },
        choices: {
          en: ['Racket', 'Bat', 'Club', 'Stick'],
          fa: ['راکت', 'بت', 'چوب گلف', 'چوب'],
        },
        correctIndex: 1,
      },
      {
        id: 's17',
        prompt: { en: 'A hat-trick usually means…', fa: 'هت‌تریک معمولاً یعنی…' },
        choices: {
          en: ['One goal', 'Two goals', 'Three goals', 'Own goal'],
          fa: ['یک گل', 'دو گل', 'سه گل', 'گل به خودی'],
        },
        correctIndex: 2,
      },
      {
        id: 's18',
        prompt: { en: 'Which sport has a slam dunk?', fa: 'کدام ورزش اسلم دانک دارد؟' },
        choices: {
          en: ['Volleyball', 'Basketball', 'Tennis', 'Handball'],
          fa: ['والیبال', 'بسکتبال', 'تنیس', 'هندبال'],
        },
        correctIndex: 1,
      },
      {
        id: 's19',
        prompt: { en: 'In skiing, what do you wear on your feet?', fa: 'در اسکی چه چیزی به پا می‌کنید؟' },
        choices: {
          en: ['Skates', 'Skis', 'Flippers', 'Cleats only'],
          fa: ['اسکیت', 'اسکی', 'فیپر', 'فقط استوک'],
        },
        correctIndex: 1,
      },
      {
        id: 's20',
        prompt: { en: 'How many periods in ice hockey regulation?', fa: 'هاکی روی یخ معمولاً چند پریود دارد؟' },
        choices: {
          en: ['2', '3', '4', '5'],
          fa: ['۲', '۳', '۴', '۵'],
        },
        correctIndex: 1,
      },
      {
        id: 's21',
        prompt: { en: 'Which ball sport is played with hands and a net, no bounce needed?', fa: 'کدام ورزش توپی با دست و تور است؟' },
        choices: {
          en: ['Tennis', 'Volleyball', 'Golf', 'Croquet'],
          fa: ['تنیس', 'والیبال', 'گلف', 'کروکت'],
        },
        correctIndex: 1,
      },
      {
        id: 's22',
        prompt: { en: 'What is the keeper’s main job in soccer?', fa: 'کار اصلی دروازه‌بان فوتبال چیست؟' },
        choices: {
          en: ['Score corners', 'Stop shots', 'Throw javelins', 'Call timeouts'],
          fa: ['گل کرنر', 'مهار شوت', 'پرتاب نیزه', 'تایم‌اوت'],
        },
        correctIndex: 1,
      },
      {
        id: 's23',
        prompt: { en: 'In bowling, how many pins are there?', fa: 'در بولینگ چند پین وجود دارد؟' },
        choices: {
          en: ['8', '9', '10', '12'],
          fa: ['۸', '۹', '۱۰', '۱۲'],
        },
        correctIndex: 2,
      },
      {
        id: 's24',
        prompt: { en: 'Which sport uses a pommel horse?', fa: 'کدام ورزش اسب‌حلقه دارد؟' },
        choices: {
          en: ['Gymnastics', 'Equestrian only', 'Polo', 'Rodeo'],
          fa: ['ژیمناستیک', 'فقط سوارکاری', 'چوگان', 'رودئو'],
        },
        correctIndex: 0,
      },
      {
        id: 's25',
        prompt: { en: 'Tour de France is a race in…', fa: 'تور دو فرانس مسابقهٔ چیست؟' },
        choices: {
          en: ['Running', 'Cycling', 'Swimming', 'Rowing'],
          fa: ['دو', 'دوچرخه‌سواری', 'شنا', 'قایقرانی'],
        },
        correctIndex: 1,
      },
      {
        id: 's26',
        prompt: { en: 'In badminton, you hit a…', fa: 'در بدمینتون به چه ضربه می‌زنید؟' },
        choices: {
          en: ['Ball', 'Shuttlecock', 'Puck', 'Disc'],
          fa: ['توپ', 'شاتل', 'پاک', 'دیسک'],
        },
        correctIndex: 1,
      },
      {
        id: 's27',
        prompt: { en: 'Which MMA org is most famous worldwide?', fa: 'کدام سازمان MMA معروف‌تر است؟' },
        choices: {
          en: ['NHL', 'UFC', 'FIFA', 'NBA'],
          fa: ['NHL', 'UFC', 'فیفا', 'NBA'],
        },
        correctIndex: 1,
      },
      {
        id: 's28',
        prompt: { en: 'A touchdown is scored in…', fa: 'تاچ‌داون در کدام ورزش زده می‌شود؟' },
        choices: {
          en: ['Rugby only', 'American football', 'Soccer', 'Baseball'],
          fa: ['فقط راگبی', 'فوتبال آمریکایی', 'فوتبال', 'بیسبال'],
        },
        correctIndex: 1,
      },
      {
        id: 's29',
        prompt: { en: 'Which sport uses a balance beam?', fa: 'کدام ورزش چوب تعادل دارد؟' },
        choices: {
          en: ['Diving', 'Gymnastics', 'Archery', 'Fencing'],
          fa: ['شیرجه', 'ژیمناستیک', 'تیراندازی', 'شمشیربازی'],
        },
        correctIndex: 1,
      },
      {
        id: 's30',
        prompt: { en: 'The World Cup is mainly for which sport?', fa: 'جام جهانی عمدتاً برای کدام ورزش است؟' },
        choices: {
          en: ['Tennis', 'Soccer/Football', 'Golf', 'Chess'],
          fa: ['تنیس', 'فوتبال', 'گلف', 'شطرنج'],
        },
        correctIndex: 1,
      },
      {
        id: 's31',
        prompt: { en: 'In surfing, what do you ride?', fa: 'در موج‌سواری روی چه سوار می‌شوید؟' },
        choices: {
          en: ['Wave', 'Mountain', 'Cloud', 'Ice rink'],
          fa: ['موج', 'کوه', 'ابر', 'پیست یخ'],
        },
        correctIndex: 0,
      },
      {
        id: 's32',
        prompt: { en: 'Which sport has a hole-in-one?', fa: 'کدام ورزش هول‌این‌وان دارد؟' },
        choices: {
          en: ['Bowling', 'Golf', 'Darts', 'Pool'],
          fa: ['بولینگ', 'گلف', 'دارت', 'بیلیارد'],
        },
        correctIndex: 1,
      },
      {
        id: 's33',
        prompt: { en: 'A penalty kick is part of…', fa: 'ضربه پنالتی بخشی از کدام ورزش است؟' },
        choices: {
          en: ['Basketball', 'Soccer', 'Tennis', 'Swimming'],
          fa: ['بسکتبال', 'فوتبال', 'تنیس', 'شنا'],
        },
        correctIndex: 1,
      },
      {
        id: 's34',
        prompt: { en: 'Which sport uses foils and sabers?', fa: 'کدام ورزش فلوره و سابر دارد؟' },
        choices: {
          en: ['Archery', 'Fencing', 'Judo', 'Karate'],
          fa: ['تیراندازی', 'شمشیربازی', 'جودو', 'کاراته'],
        },
        correctIndex: 1,
      },
      {
        id: 's35',
        prompt: { en: 'In relay races, runners pass a…', fa: 'در دو امدادی دونده‌ها چه چیزی پاس می‌دهند؟' },
        choices: {
          en: ['Ball', 'Baton', 'Puck', 'Flag only'],
          fa: ['توپ', 'چوب امدادی', 'پاک', 'فقط پرچم'],
        },
        correctIndex: 1,
      },
      {
        id: 's36',
        prompt: { en: 'Which country is famous for sumo wrestling?', fa: 'کدام کشور به کشتی سومو معروف است؟' },
        choices: {
          en: ['China', 'Japan', 'Korea', 'Thailand'],
          fa: ['چین', 'ژاپن', 'کره', 'تایلند'],
        },
        correctIndex: 1,
      },
      {
        id: 's37',
        prompt: { en: 'A grand slam in tennis means winning…', fa: 'گرند اسلم تنیس یعنی بردن…' },
        choices: {
          en: ['One major', 'All four majors', 'Olympics only', 'Davis Cup only'],
          fa: ['یک تورنمنت', 'هر چهار تورنمنت بزرگ', 'فقط المپیک', 'فقط دیویس کاپ'],
        },
        correctIndex: 1,
      },
      {
        id: 's38',
        prompt: { en: 'Which sport is played on a diamond-shaped field?', fa: 'کدام ورزش روی زمین لوزی‌شکل است؟' },
        choices: {
          en: ['Soccer', 'Baseball', 'Hockey', 'Rugby'],
          fa: ['فوتبال', 'بیسبال', 'هاکی', 'راگبی'],
        },
        correctIndex: 1,
      },
      {
        id: 's39',
        prompt: { en: 'In weightlifting, athletes lift a…', fa: 'در وزنه‌برداری ورزشکار چه چیزی بلند می‌کند؟' },
        choices: {
          en: ['Barbell', 'Javelin', 'Puck', 'Shuttle'],
          fa: ['هالتِر', 'نیزه', 'پاک', 'شاتل'],
        },
        correctIndex: 0,
      },
      {
        id: 's40',
        prompt: { en: 'Which ball is the largest in common sports?', fa: 'کدام توپ در ورزش‌های رایج بزرگ‌تر است؟' },
        choices: {
          en: ['Golf', 'Tennis', 'Basketball', 'Table tennis'],
          fa: ['گلف', 'تنیس', 'بسکتبال', 'پینگ‌پنگ'],
        },
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'science',
    nameKey: 'science',
    questions: [
      {
        id: 'sc1',
        prompt: { en: 'What planet do we live on?', fa: 'ما روی کدام سیاره زندگی می‌کنیم؟' },
        choices: {
          en: ['Mars', 'Earth', 'Venus', 'Jupiter'],
          fa: ['مریخ', 'زمین', 'زهره', 'مشتری'],
        },
        correctIndex: 1,
      },
      {
        id: 'sc2',
        prompt: { en: 'Water boils at what °C at sea level?', fa: 'آب در سطح دریا در چند درجه می‌جوشد؟' },
        choices: {
          en: ['0', '50', '100', '212'],
          fa: ['۰', '۵۰', '۱۰۰', '۲۱۲'],
        },
        correctIndex: 2,
      },
      {
        id: 'sc3',
        prompt: { en: 'What force pulls objects toward Earth?', fa: 'کدام نیرو اجسام را به زمین می‌کشد؟' },
        choices: {
          en: ['Magnetism', 'Gravity', 'Friction', 'Inertia'],
          fa: ['مغناطیس', 'گرانش', 'اصطکاک', 'اینرسی'],
        },
        correctIndex: 1,
      },
      {
        id: 'sc4',
        prompt: { en: 'DNA is found mainly in which cell part?', fa: 'DNA عمدتاً در کدام بخش سلول است؟' },
        choices: {
          en: ['Nucleus', 'Cell wall', 'Vacuole', 'Cytoplasm only'],
          fa: ['هسته', 'دیواره', 'واکوئل', 'فقط سیتوپلاسم'],
        },
        correctIndex: 0,
      },
      {
        id: 'sc5',
        prompt: { en: 'What gas do plants produce in photosynthesis?', fa: 'گیاهان در فتوسنتز کدام گاز تولید می‌کنند؟' },
        choices: {
          en: ['CO2', 'Oxygen', 'Nitrogen', 'Methane'],
          fa: ['دی‌اکسید کربن', 'اکسیژن', 'نیتروژن', 'متان'],
        },
        correctIndex: 1,
      },
      {
        id: 'sc6',
        prompt: { en: 'How many bones in an adult human body (approx)?', fa: 'بدن انسان بالغ حدوداً چند استخوان دارد؟' },
        choices: {
          en: ['106', '206', '306', '406'],
          fa: ['۱۰۶', '۲۰۶', '۳۰۶', '۴۰۶'],
        },
        correctIndex: 1,
      },
      {
        id: 'sc7',
        prompt: { en: 'What is the chemical symbol for gold?', fa: 'نماد شیمیایی طلا چیست؟' },
        choices: {
          en: ['Ag', 'Au', 'Fe', 'Pb'],
          fa: ['Ag', 'Au', 'Fe', 'Pb'],
        },
        correctIndex: 1,
      },
      {
        id: 'sc8',
        prompt: { en: 'Light travels faster than…', fa: 'نور سریع‌تر از چه حرکت می‌کند؟' },
        choices: {
          en: ['Sound', 'Nothing', 'Both same', 'Only in water'],
          fa: ['صدا', 'هیچ', 'هر دو برابر', 'فقط در آب'],
        },
        correctIndex: 0,
      },
      {
        id: 'sc9',
        prompt: { en: 'Which is a mammal?', fa: 'کدام پستاندار است؟' },
        choices: {
          en: ['Shark', 'Dolphin', 'Crocodile', 'Eagle'],
          fa: ['کوسه', 'دلفین', 'تمساح', 'عقاب'],
        },
        correctIndex: 1,
      },
      {
        id: 'sc10',
        prompt: { en: 'What do you call animals that eat only plants?', fa: 'جانورانی که فقط گیاه می‌خورند چه نام دارند؟' },
        choices: {
          en: ['Carnivores', 'Herbivores', 'Omnivores', 'Insectivores'],
          fa: ['گوشت‌خوار', 'گیاه‌خوار', 'همه‌چیزخوار', 'حشره‌خوار'],
        },
        correctIndex: 1,
      },
      {
        id: 'sc11',
        prompt: { en: 'The center of an atom is called the…', fa: 'مرکز اتم چه نام دارد؟' },
        choices: {
          en: ['Electron', 'Nucleus', 'Orbit', 'Shell'],
          fa: ['الکترون', 'هسته', 'مدار', 'پوسته'],
        },
        correctIndex: 1,
      },
      {
        id: 'sc12',
        prompt: { en: 'Which vitamin comes mainly from sunlight?', fa: 'کدام ویتامین بیشتر از نور خورشید می‌آید؟' },
        choices: {
          en: ['A', 'B', 'C', 'D'],
          fa: ['A', 'B', 'C', 'D'],
        },
        correctIndex: 3,
      },
      {
        id: 'sc13',
        prompt: { en: 'What is H2SO4 commonly known as?', fa: 'H2SO4 معمولاً به چه معروف است؟' },
        choices: {
          en: ['Table salt', 'Sulfuric acid', 'Baking soda', 'Vinegar'],
          fa: ['نمک خوراکی', 'اسید سولفوریک', 'جوش شیرین', 'سرکه'],
        },
        correctIndex: 1,
      },
      {
        id: 'sc14',
        prompt: { en: 'Earth’s natural satellite is the…', fa: 'ماهواره طبیعی زمین چیست؟' },
        choices: {
          en: ['Sun', 'Moon', 'Mars', 'ISS'],
          fa: ['خورشید', 'ماه', 'مریخ', 'ایستگاه فضایی'],
        },
        correctIndex: 1,
      },
      {
        id: 'sc15',
        prompt: { en: 'Which blood cells help fight infection?', fa: 'کدام سلول‌های خونی با عفونت می‌جنگند؟' },
        choices: {
          en: ['Red', 'White', 'Platelets', 'Plasma only'],
          fa: ['قرمز', 'سفید', 'پلاکت', 'فقط پلاسما'],
        },
        correctIndex: 1,
      },
      {
        id: 'sc16',
        prompt: { en: 'Sound cannot travel through…', fa: 'صدا از کجا نمی‌تواند عبور کند؟' },
        choices: {
          en: ['Air', 'Water', 'Vacuum', 'Metal'],
          fa: ['هوا', 'آب', 'خلا', 'فلز'],
        },
        correctIndex: 2,
      },
      {
        id: 'sc17',
        prompt: { en: 'What is the hardest natural substance?', fa: 'سخت‌ترین ماده طبیعی کدام است؟' },
        choices: {
          en: ['Gold', 'Iron', 'Diamond', 'Quartz'],
          fa: ['طلا', 'آهن', 'الماس', 'کوارتز'],
        },
        correctIndex: 2,
      },
      {
        id: 'sc18',
        prompt: { en: 'Which planet has the most famous rings?', fa: 'کدام سیاره حلقه‌های معروف دارد؟' },
        choices: {
          en: ['Mars', 'Saturn', 'Mercury', 'Neptune'],
          fa: ['مریخ', 'زحل', 'عطارد', 'نپتون'],
        },
        correctIndex: 1,
      },
      {
        id: 'sc19',
        prompt: { en: 'Photosynthesis needs…', fa: 'فتوسنتز به چه نیاز دارد؟' },
        choices: {
          en: ['Darkness only', 'Sunlight', 'Only salt', 'Only wind'],
          fa: ['فقط تاریکی', 'نور خورشید', 'فقط نمک', 'فقط باد'],
        },
        correctIndex: 1,
      },
      {
        id: 'sc20',
        prompt: { en: 'What is absolute zero?', fa: 'صفر مطلق چیست؟' },
        choices: {
          en: ['0°C', '0°F', '0 K', '100 K'],
          fa: ['۰ درجه سانتی', '۰ فارنهایت', '۰ کلوین', '۱۰۰ کلوین'],
        },
        correctIndex: 2,
      },
      {
        id: 'sc21',
        prompt: { en: 'Which particle has a negative charge?', fa: 'کدام ذره بار منفی دارد؟' },
        choices: {
          en: ['Proton', 'Neutron', 'Electron', 'Nucleus'],
          fa: ['پروتون', 'نوترون', 'الکترون', 'هسته'],
        },
        correctIndex: 2,
      },
      {
        id: 'sc22',
        prompt: { en: 'The study of weather is called…', fa: 'علم مطالعه هوا چه نام دارد؟' },
        choices: {
          en: ['Geology', 'Meteorology', 'Biology', 'Astronomy'],
          fa: ['زمین‌شناسی', 'هواشناسی', 'زیست‌شناسی', 'ستاره‌شناسی'],
        },
        correctIndex: 1,
      },
      {
        id: 'sc23',
        prompt: { en: 'What do bees collect from flowers?', fa: 'زنبورها از گل‌ها چه جمع می‌کنند؟' },
        choices: {
          en: ['Nectar', 'Sand', 'Salt', 'Oil'],
          fa: ['شهد', 'شن', 'نمک', 'نفت'],
        },
        correctIndex: 0,
      },
      {
        id: 'sc24',
        prompt: { en: 'Which organ digests food first after swallowing?', fa: 'بعد از بلع، غذا اول به کدام عضو می‌رود؟' },
        choices: {
          en: ['Liver', 'Stomach', 'Kidney', 'Heart'],
          fa: ['کبد', 'معده', 'کلیه', 'قلب'],
        },
        correctIndex: 1,
      },
      {
        id: 'sc25',
        prompt: { en: 'What is the main gas in Earth’s atmosphere?', fa: 'گاز اصلی جو زمین چیست؟' },
        choices: {
          en: ['Oxygen', 'Nitrogen', 'CO2', 'Hydrogen'],
          fa: ['اکسیژن', 'نیتروژن', 'دی‌اکسید کربن', 'هیدروژن'],
        },
        correctIndex: 1,
      },
      {
        id: 'sc26',
        prompt: { en: 'A light-year measures…', fa: 'سال نوری چه چیزی را اندازه می‌گیرد؟' },
        choices: {
          en: ['Time only', 'Distance', 'Weight', 'Temperature'],
          fa: ['فقط زمان', 'فاصله', 'وزن', 'دما'],
        },
        correctIndex: 1,
      },
      {
        id: 'sc27',
        prompt: { en: 'Which metal is magnetic among common ones?', fa: 'کدام فلز رایج خاصیت مغناطیسی دارد؟' },
        choices: {
          en: ['Gold', 'Iron', 'Copper', 'Silver'],
          fa: ['طلا', 'آهن', 'مس', 'نقره'],
        },
        correctIndex: 1,
      },
      {
        id: 'sc28',
        prompt: { en: 'What is the pH of pure water roughly?', fa: 'pH آب خالص تقریباً چند است؟' },
        choices: {
          en: ['0', '7', '14', '1'],
          fa: ['۰', '۷', '۱۴', '۱'],
        },
        correctIndex: 1,
      },
      {
        id: 'sc29',
        prompt: { en: 'Dinosaurs lived in which era broadly?', fa: 'دایناسورها عمدتاً در کدام دوره بودند؟' },
        choices: {
          en: ['Ice Age only', 'Mesozoic', 'Modern age', 'Future'],
          fa: ['فقط عصر یخبندان', 'مزوزوئیک', 'عصر مدرن', 'آینده'],
        },
        correctIndex: 1,
      },
      {
        id: 'sc30',
        prompt: { en: 'Which invention is attributed to Alexander Graham Bell?', fa: 'کدام اختراع به الکساندر گراهام بل نسبت داده می‌شود؟' },
        choices: {
          en: ['Light bulb', 'Telephone', 'Airplane', 'Radio'],
          fa: ['لامپ', 'تلفن', 'هواپیما', 'رادیو'],
        },
        correctIndex: 1,
      },
      {
        id: 'sc31',
        prompt: { en: 'What does a seismograph measure?', fa: 'لرزه‌نگار چه چیزی را اندازه می‌گیرد؟' },
        choices: {
          en: ['Wind', 'Earthquakes', 'Rain', 'Tide'],
          fa: ['باد', 'زلزله', 'باران', 'جزر و مد'],
        },
        correctIndex: 1,
      },
      {
        id: 'sc32',
        prompt: { en: 'Which is a renewable energy source?', fa: 'کدام منبع انرژی تجدیدپذیر است؟' },
        choices: {
          en: ['Coal', 'Solar', 'Oil', 'Natural gas'],
          fa: ['زغال', 'خورشیدی', 'نفت', 'گاز طبیعی'],
        },
        correctIndex: 1,
      },
      {
        id: 'sc33',
        prompt: { en: 'The human body is mostly…', fa: 'بدن انسان بیشتر از چیست؟' },
        choices: {
          en: ['Iron', 'Water', 'Salt', 'Carbon only'],
          fa: ['آهن', 'آب', 'نمک', 'فقط کربن'],
        },
        correctIndex: 1,
      },
      {
        id: 'sc34',
        prompt: { en: 'What orbits Earth every ~90 minutes (human-made)?', fa: 'چه چیزی حدود هر ۹۰ دقیقه دور زمین می‌چرخد (ساخت انسان)؟' },
        choices: {
          en: ['Moon', 'ISS', 'Sun', 'Mars'],
          fa: ['ماه', 'ایستگاه فضایی', 'خورشید', 'مریخ'],
        },
        correctIndex: 1,
      },
      {
        id: 'sc35',
        prompt: { en: 'Which blood type is often called universal donor?', fa: 'کدام گروه خونی اهداکننده عمومی معروف است؟' },
        choices: {
          en: ['AB+', 'O-', 'A+', 'B+'],
          fa: ['AB+', 'O-', 'A+', 'B+'],
        },
        correctIndex: 1,
      },
      {
        id: 'sc36',
        prompt: { en: 'What is the powerhouse of the cell?', fa: 'نیروگاه سلول کدام است؟' },
        choices: {
          en: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi'],
          fa: ['هسته', 'میتوکندری', 'ریبوزوم', 'گلژی'],
        },
        correctIndex: 1,
      },
      {
        id: 'sc37',
        prompt: { en: 'Which scientist proposed relativity?', fa: 'کدام دانشمند نسبیت را مطرح کرد؟' },
        choices: {
          en: ['Newton', 'Einstein', 'Darwin', 'Tesla'],
          fa: ['نیوتن', 'اینشتین', 'داروین', 'تسلا'],
        },
        correctIndex: 1,
      },
      {
        id: 'sc38',
        prompt: { en: 'Rust forms when iron reacts with…', fa: 'زنگ آهن وقتی آهن با چه واکنش می‌دهد؟' },
        choices: {
          en: ['Only salt', 'Oxygen and moisture', 'Helium', 'Gold'],
          fa: ['فقط نمک', 'اکسیژن و رطوبت', 'هلیوم', 'طلا'],
        },
        correctIndex: 1,
      },
      {
        id: 'sc39',
        prompt: { en: 'Which is colder: absolute zero or ice?', fa: 'کدام سردتر است: صفر مطلق یا یخ؟' },
        choices: {
          en: ['Ice', 'Absolute zero', 'Same', 'Neither exists'],
          fa: ['یخ', 'صفر مطلق', 'یکی', 'هیچ‌کدام وجود ندارد'],
        },
        correctIndex: 1,
      },
      {
        id: 'sc40',
        prompt: { en: 'What do we call animals active at night?', fa: 'جانوران فعال در شب چه نام دارند؟' },
        choices: {
          en: ['Diurnal', 'Nocturnal', 'Aquatic', 'Migratory'],
          fa: ['روزفعال', 'شب‌زی', 'آبزی', 'مهاجر'],
        },
        correctIndex: 1,
      },
    ],
  },
]

export function getQuestionPack(packId: string): QuestionPack {
  return QUESTION_PACKS.find((p) => p.id === packId) ?? QUESTION_PACKS[0]!
}

export function getPackQuestions(packId: string): TriviaQuestion[] {
  return getQuestionPack(packId).questions
}
