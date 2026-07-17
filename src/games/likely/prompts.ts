import type { Locale } from '../../store/prefs'

export type LikelyMode = 'never' | 'most'
export type LikelyHeat = 'normal' | 'spicy'

export interface LikelyPrompt {
  id: string
  text: Record<Locale, string>
}

export interface LikelyPack {
  id: string
  mode: LikelyMode
  heat: LikelyHeat
  prompts: LikelyPrompt[]
}

/**
 * Large bilingual prompt dictionaries for Likely.
 * Mode × heat packs (~80 each) so several nights rarely repeat with freshPick.
 */
export const LIKELY_PACKS: LikelyPack[] = [
  {
    id: 'never-normal',
    mode: 'never',
    heat: 'normal',
    prompts: [
      {
        id: 'nn1',
        text: {
          en: 'Never have I ever gone a full day without my phone.',
          fa: 'هرگز یک روز کامل بدون گوشی نبوده‌ام.',
        },
      },
      {
        id: 'nn2',
        text: {
          en: 'Never have I ever pretended to know a song I didn’t.',
          fa: 'هرگز تظاهر نکرده‌ام آهنگی را بلدم که بلد نبودم.',
        },
      },
      {
        id: 'nn3',
        text: {
          en: 'Never have I ever stalked an ex on social media.',
          fa: 'هرگز اکس را در شبکه‌های اجتماعی چک نکرده‌ام.',
        },
      },
      {
        id: 'nn4',
        text: {
          en: 'Never have I ever laughed at a joke I didn’t understand.',
          fa: 'هرگز به جوکی که نفهمیدم نخندیده‌ام.',
        },
      },
      {
        id: 'nn5',
        text: {
          en: 'Never have I ever fallen asleep during a movie with friends.',
          fa: 'هرگز وسط فیلم با دوستا نخوابیده‌ام.',
        },
      },
      {
        id: 'nn6',
        text: {
          en: 'Never have I ever said “I’m five minutes away” when I wasn’t.',
          fa: 'هرگز نگفته‌ام «۵ دقیقه‌ام» وقتی نبودم.',
        },
      },
      {
        id: 'nn7',
        text: {
          en: 'Never have I ever Googled myself.',
          fa: 'هرگز خودم را گوگل نکرده‌ام.',
        },
      },
      {
        id: 'nn8',
        text: {
          en: 'Never have I ever eaten food that fell on the floor.',
          fa: 'هرگز غذایی که زمین افتاده نخورده‌ام.',
        },
      },
      {
        id: 'nn9',
        text: {
          en: 'Never have I ever sent a text to the wrong person.',
          fa: 'هرگز پیام را برای آدم غلط نفرستاده‌ام.',
        },
      },
      {
        id: 'nn10',
        text: {
          en: 'Never have I ever stayed up all night scrolling.',
          fa: 'هرگز تا صبح اسکرول نکرده‌ام.',
        },
      },
      {
        id: 'nn11',
        text: {
          en: 'Never have I ever blamed the Wi-Fi for my own mistake.',
          fa: 'هرگز اشتباهم را گردن وای‌فای نینداخته‌ام.',
        },
      },
      {
        id: 'nn12',
        text: {
          en: 'Never have I ever cried at a trailer.',
          fa: 'هرگز برای تریلر گریه نکرده‌ام.',
        },
      },
      {
        id: 'nn13',
        text: {
          en: 'Never have I ever rewatched the same show just for comfort.',
          fa: 'هرگز یک سریال را فقط برای آرامش دوباره ندیده‌ام.',
        },
      },
      {
        id: 'nn14',
        text: {
          en: 'Never have I ever danced when I thought nobody was watching.',
          fa: 'هرگز وقتی فکر می‌کردم کسی نمی‌بیند نرقصیده‌ام.',
        },
      },
      {
        id: 'nn15',
        text: {
          en: 'Never have I ever taken a “quick nap” that lasted hours.',
          fa: 'هرگز چرت «سریع»ی که ساعت‌ها طول بکشد نداشته‌ام.',
        },
      },
      {
        id: 'nn16',
        text: {
          en: 'Never have I ever used a filter and pretended I didn’t.',
          fa: 'هرگز فیلتر نزده‌ام و تظاهر کنم نزدم.',
        },
      },
      {
        id: 'nn17',
        text: {
          en: 'Never have I ever forgotten someone’s name mid-conversation.',
          fa: 'هرگز وسط حرف اسم کسی را فراموش نکرده‌ام.',
        },
      },
      {
        id: 'nn18',
        text: {
          en: 'Never have I ever worn the same outfit two days in a row.',
          fa: 'هرگز دو روز پشت سر هم همان لباس را نپوشیده‌ام.',
        },
      },
      {
        id: 'nn19',
        text: {
          en: 'Never have I ever lied about liking a gift.',
          fa: 'هرگز درباره دوست داشتن هدیه دروغ نگفته‌ام.',
        },
      },
      {
        id: 'nn20',
        text: {
          en: 'Never have I ever skipped brushing my teeth before bed.',
          fa: 'هرگز قبل خواب مسواک را جا نینداخته‌ام.',
        },
      },
      {
        id: 'nn21',
        text: {
          en: 'Never have I ever binge-watched an entire season in a day.',
          fa: 'هرگز یک فصل کامل را در یک روز ندیده‌ام.',
        },
      },
      {
        id: 'nn22',
        text: {
          en: 'Never have I ever pretended to be busy to avoid plans.',
          fa: 'هرگز برای فرار از برنامه تظاهر به شلوغی نکرده‌ام.',
        },
      },
      {
        id: 'nn23',
        text: {
          en: 'Never have I ever sung in the shower like a concert.',
          fa: 'هرگز تو دوش مثل کنسرت نخوانده‌ام.',
        },
      },
      {
        id: 'nn24',
        text: {
          en: 'Never have I ever eaten dessert before dinner.',
          fa: 'هرگز قبل شام دسر نخورده‌ام.',
        },
      },
      {
        id: 'nn25',
        text: {
          en: 'Never have I ever been late because of “traffic.”',
          fa: 'هرگز به‌خاطر «ترافیک» دیر نکرده‌ام.',
        },
      },
      {
        id: 'nn26',
        text: {
          en: 'Never have I ever screenshot a chat to show someone.',
          fa: 'هرگز از چت اسکرین‌شات نگرفته‌ام تا به کسی نشان دهم.',
        },
      },
      {
        id: 'nn27',
        text: {
          en: 'Never have I ever laughed so hard I cried.',
          fa: 'هرگز آن‌قدر نخندیده‌ام که گریه کنم.',
        },
      },
      {
        id: 'nn28',
        text: {
          en: 'Never have I ever forgotten where I parked.',
          fa: 'هرگز جا پارک را فراموش نکرده‌ام.',
        },
      },
      {
        id: 'nn29',
        text: {
          en: 'Never have I ever worn pajamas to a video call (camera off).',
          fa: 'هرگز با لباس خواب در تماس ویدیویی نبوده‌ام (دوربین خاموش).',
        },
      },
      {
        id: 'nn30',
        text: {
          en: 'Never have I ever argued with a GPS out loud.',
          fa: 'هرگز بلند با جی‌پی‌اس بحث نکرده‌ام.',
        },
      },
      {
        id: 'nn31',
        text: {
          en: 'Never have I ever bought something just because it was on sale.',
          fa: 'هرگز چیزی فقط به‌خاطر حراج نخریده‌ام.',
        },
      },
      {
        id: 'nn32',
        text: {
          en: 'Never have I ever pretended to text to avoid talking.',
          fa: 'هرگز برای فرار از حرف زدن تظاهر به پیام دادن نکرده‌ام.',
        },
      },
      {
        id: 'nn33',
        text: {
          en: 'Never have I ever cried at an airport goodbye.',
          fa: 'هرگز در فرودگاه برای خداحافظی گریه نکرده‌ام.',
        },
      },
      {
        id: 'nn34',
        text: {
          en: 'Never have I ever eaten an entire pizza alone.',
          fa: 'هرگز یک پیتزای کامل را تنها نخورده‌ام.',
        },
      },
      {
        id: 'nn35',
        text: {
          en: 'Never have I ever kept a plant I eventually killed.',
          fa: 'هرگز گیاهی نگه نداشته‌ام که آخرش کشتمش.',
        },
      },
      {
        id: 'nn36',
        text: {
          en: 'Never have I ever peed in a pool (as a kid counts).',
          fa: 'هرگز تو استخر ادرار نکرده‌ام (کودکی هم حسابه).',
        },
      },
      {
        id: 'nn37',
        text: {
          en: 'Never have I ever fallen asleep on public transport and missed my stop.',
          fa: 'هرگز تو حمل‌ونقل عمومی نخوابیده‌ام که ایستگاهم را از دست بدهم.',
        },
      },
      {
        id: 'nn38',
        text: {
          en: 'Never have I ever said “you too” when the waiter said enjoy your meal.',
          fa: 'هرگز وقتی گارسون گفته نوش جان، نگفته‌ام «شما هم».',
        },
      },
      {
        id: 'nn39',
        text: {
          en: 'Never have I ever Googled how to spell a simple word.',
          fa: 'هرگز املای کلمه ساده را گوگل نکرده‌ام.',
        },
      },
      {
        id: 'nn40',
        text: {
          en: 'Never have I ever worn socks with sandals.',
          fa: 'هرگز جوراب با صندل نپوشیده‌ام.',
        },
      },
      {
        id: 'nn41',
        text: {
          en: 'Never have I ever laughed at my own joke first.',
          fa: 'هرگز اول به جوک خودم نخندیده‌ام.',
        },
      },
      {
        id: 'nn42',
        text: {
          en: 'Never have I ever forgotten an umbrella on a rainy day.',
          fa: 'هرگز در روز بارانی چتر را جا نینداخته‌ام.',
        },
      },
      {
        id: 'nn43',
        text: {
          en: 'Never have I ever waved back at someone who wasn’t waving at me.',
          fa: 'هرگز به کسی که به من دست تکان نمی‌داد دست تکان نداده‌ام.',
        },
      },
      {
        id: 'nn44',
        text: {
          en: 'Never have I ever eaten cereal for dinner.',
          fa: 'هرگز برای شام غلات نخورده‌ام.',
        },
      },
      {
        id: 'nn45',
        text: {
          en: 'Never have I ever stayed friends with an ex.',
          fa: 'هرگز با اکس دوست نمانده‌ام.',
        },
      },
      {
        id: 'nn46',
        text: {
          en: 'Never have I ever used someone else’s Netflix password.',
          fa: 'هرگز از رمز نتفلیکس کس دیگری استفاده نکرده‌ام.',
        },
      },
      {
        id: 'nn47',
        text: {
          en: 'Never have I ever practiced a conversation in the mirror.',
          fa: 'هرگز جلوی آینه مکالمه تمرین نکرده‌ام.',
        },
      },
      {
        id: 'nn48',
        text: {
          en: 'Never have I ever been scared of a horror movie for days.',
          fa: 'هرگز چند روز از فیلم ترسناک نترسیده‌ام.',
        },
      },
      {
        id: 'nn49',
        text: {
          en: 'Never have I ever forgotten a close friend’s birthday.',
          fa: 'هرگز تولد دوست نزدیک را فراموش نکرده‌ام.',
        },
      },
      {
        id: 'nn50',
        text: {
          en: 'Never have I ever worn dirty clothes because laundry was “too much.”',
          fa: 'هرگز لباس کثیف نپوشیده‌ام چون لباسشویی «زیاد» بود.',
        },
      },
      {
        id: 'nn51',
        text: {
          en: 'Never have I ever spilled a drink on myself in public.',
          fa: 'هرگز در جمع نوشیدنی روی خودم نریخته‌ام.',
        },
      },
      {
        id: 'nn52',
        text: {
          en: 'Never have I ever taken a selfie and deleted 40 versions.',
          fa: 'هرگز سلفی نگرفته‌ام و ۴۰ نسخه پاک نکرده باشم.',
        },
      },
      {
        id: 'nn53',
        text: {
          en: 'Never have I ever lied about my age (even by a year).',
          fa: 'هرگز درباره سنم دروغ نگفته‌ام (حتی یک سال).',
        },
      },
      {
        id: 'nn54',
        text: {
          en: 'Never have I ever eaten something expired on purpose.',
          fa: 'هرگز عمداً چیزی تاریخ‌گذشته نخورده‌ام.',
        },
      },
      {
        id: 'nn55',
        text: {
          en: 'Never have I ever walked into a glass door.',
          fa: 'هرگز به در شیشه‌ای نخورده‌ام.',
        },
      },
      {
        id: 'nn56',
        text: {
          en: 'Never have I ever pretended to like coffee.',
          fa: 'هرگز تظاهر نکرده‌ام قهوه دوست دارم.',
        },
      },
      {
        id: 'nn57',
        text: {
          en: 'Never have I ever ghosted a group chat.',
          fa: 'هرگز گروه چت را روح نکرده‌ام.',
        },
      },
      {
        id: 'nn58',
        text: {
          en: 'Never have I ever cried during a sports game.',
          fa: 'هرگز وسط بازی ورزشی گریه نکرده‌ام.',
        },
      },
      {
        id: 'nn59',
        text: {
          en: 'Never have I ever worn shoes on the wrong feet (even briefly).',
          fa: 'هرگز کفش را جابه‌جا به پا نکرده‌ام (حتی کوتاه).',
        },
      },
      {
        id: 'nn60',
        text: {
          en: 'Never have I ever fallen for a scam email (almost counts).',
          fa: 'هرگز گول ایمیل کلاهبرداری نخورده‌ام (تقریباً هم حسابه).',
        },
      },
      {
        id: 'nn61',
        text: {
          en: 'Never have I ever talked to my pet like a person.',
          fa: 'هرگز با حیوان خانگی مثل آدم حرف نزده‌ام.',
        },
      },
      {
        id: 'nn62',
        text: {
          en: 'Never have I ever been kicked out of a chat for spam.',
          fa: 'هرگز به‌خاطر اسپم از چت بیرون انداخته نشده‌ام.',
        },
      },
      {
        id: 'nn63',
        text: {
          en: 'Never have I ever worn pajamas to the store.',
          fa: 'هرگز با لباس خواب به مغازه نرفته‌ام.',
        },
      },
      {
        id: 'nn64',
        text: {
          en: 'Never have I ever forgotten why I walked into a room.',
          fa: 'هرگز فراموش نکرده‌ام چرا وارد اتاق شدم.',
        },
      },
      {
        id: 'nn65',
        text: {
          en: 'Never have I ever sung the wrong lyrics confidently.',
          fa: 'هرگز متن غلط آهنگ را با اعتمادبه‌نفس نخوانده‌ام.',
        },
      },
      {
        id: 'nn66',
        text: {
          en: 'Never have I ever eaten ice cream in winter without shame.',
          fa: 'هرگز زمستان بدون شرم بستنی نخورده‌ام.',
        },
      },
      {
        id: 'nn67',
        text: {
          en: 'Never have I ever pretended my video froze on a call.',
          fa: 'هرگز در تماس تظاهر نکرده‌ام ویدیو فریز شده.',
        },
      },
      {
        id: 'nn68',
        text: {
          en: 'Never have I ever been afraid of the dark as an adult.',
          fa: 'هرگز به‌عنوان بزرگسال از تاریکی نترسیده‌ام.',
        },
      },
      {
        id: 'nn69',
        text: {
          en: 'Never have I ever kept a tab open for months.',
          fa: 'هرگز تبی را ماه‌ها باز نگه نداشته‌ام.',
        },
      },
      {
        id: 'nn70',
        text: {
          en: 'Never have I ever laughed until I snorted.',
          fa: 'هرگز آن‌قدر نخندیده‌ام که فین فین کنم.',
        },
      },
      {
        id: 'nn71',
        text: {
          en: 'Never have I ever worn the same socks two days.',
          fa: 'هرگز دو روز همان جوراب را نپوشیده‌ام.',
        },
      },
      {
        id: 'nn72',
        text: {
          en: 'Never have I ever said “we should hang out” and never followed up.',
          fa: 'هرگز نگفته‌ام «باید ببینیم هم‌دیگر را» و پیگیری نکرده باشم.',
        },
      },
      {
        id: 'nn73',
        text: {
          en: 'Never have I ever cried because of a book.',
          fa: 'هرگز به‌خاطر کتاب گریه نکرده‌ام.',
        },
      },
      {
        id: 'nn74',
        text: {
          en: 'Never have I ever eaten someone else’s fries without asking.',
          fa: 'هرگز بدون پرسیدن سیب‌زمینی کس دیگری را نخورده‌ام.',
        },
      },
      {
        id: 'nn75',
        text: {
          en: 'Never have I ever been lost in my own neighborhood.',
          fa: 'هرگز تو محله خودم گم نشده‌ام.',
        },
      },
      {
        id: 'nn76',
        text: {
          en: 'Never have I ever worn sunglasses indoors for no reason.',
          fa: 'هرگز بی‌دلیل داخل عینک آفتابی نزده‌ام.',
        },
      },
      {
        id: 'nn77',
        text: {
          en: 'Never have I ever forgotten a password I just created.',
          fa: 'هرگز رمزی را که همین الان ساختم فراموش نکرده‌ام.',
        },
      },
      {
        id: 'nn78',
        text: {
          en: 'Never have I ever talked to myself out loud while cooking.',
          fa: 'هرگز موقع آشپزی بلند با خودم حرف نزده‌ام.',
        },
      },
      {
        id: 'nn79',
        text: {
          en: 'Never have I ever stayed in the shower until the water went cold.',
          fa: 'هرگز تو دوش نمانده‌ام تا آب سرد شود.',
        },
      },
      {
        id: 'nn80',
        text: {
          en: 'Never have I ever laughed at a serious moment.',
          fa: 'هرگز در لحظه جدی نخندیده‌ام.',
        },
      },
    ],
  },
  {
    id: 'never-spicy',
    mode: 'never',
    heat: 'spicy',
    prompts: [
      {
        id: 'ns1',
        text: {
          en: 'Never have I ever kissed someone on the first date.',
          fa: 'هرگز در قرار اول کسی را نبوسیده‌ام.',
        },
      },
      {
        id: 'ns2',
        text: {
          en: 'Never have I ever sent a risky text and instantly regretted it.',
          fa: 'هرگز پیام ریسکی نفرستاده‌ام که فوری پشیمون شوم.',
        },
      },
      {
        id: 'ns3',
        text: {
          en: 'Never have I ever had a crush on a friend’s sibling.',
          fa: 'هرگز به خواهر/برادر دوست کرش نداشته‌ام.',
        },
      },
      {
        id: 'ns4',
        text: {
          en: 'Never have I ever made out at a party.',
          fa: 'هرگز در مهمانی معاشقه نکرده‌ام.',
        },
      },
      {
        id: 'ns5',
        text: {
          en: 'Never have I ever stalked my crush’s entire photo archive.',
          fa: 'هرگز کل آرشیو عکس کرشم را چک نکرده‌ام.',
        },
      },
      {
        id: 'ns6',
        text: {
          en: 'Never have I ever hooked up with someone from this friend group’s orbit.',
          fa: 'هرگز با کسی از مدار این گروه دوست صمیمی نشده‌ام.',
        },
      },
      {
        id: 'ns7',
        text: {
          en: 'Never have I ever lied about how many people I’ve kissed.',
          fa: 'هرگز درباره تعداد کسانی که بوسیده‌ام دروغ نگفته‌ام.',
        },
      },
      {
        id: 'ns8',
        text: {
          en: 'Never have I ever had a friends-with-benefits situation.',
          fa: 'هرگز رابطه دوست-با-مزایا نداشته‌ام.',
        },
      },
      {
        id: 'ns9',
        text: {
          en: 'Never have I ever been walked in on while changing.',
          fa: 'هرگز موقع عوض کردن لباس کسی سرزده وارد نشده.',
        },
      },
      {
        id: 'ns10',
        text: {
          en: 'Never have I ever flirted with someone while in a relationship.',
          fa: 'هرگز وقتی در رابطه بودم با کسی فلرت نکرده‌ام.',
        },
      },
      {
        id: 'ns11',
        text: {
          en: 'Never have I ever drunk-texted an ex.',
          fa: 'هرگز مست به اکس پیام نداده‌ام.',
        },
      },
      {
        id: 'ns12',
        text: {
          en: 'Never have I ever had a secret crush on someone at this table.',
          fa: 'هرگز کرش مخفی روی کسی دور این میز نداشته‌ام.',
        },
      },
      {
        id: 'ns13',
        text: {
          en: 'Never have I ever been skinny-dipping.',
          fa: 'هرگز برهنه شنا نکرده‌ام.',
        },
      },
      {
        id: 'ns14',
        text: {
          en: 'Never have I ever sent a thirst trap on purpose.',
          fa: 'هرگز عمداً عکس تحریک‌آمیز پست نکرده‌ام.',
        },
      },
      {
        id: 'ns15',
        text: {
          en: 'Never have I ever kissed more than one person in the same week.',
          fa: 'هرگز در یک هفته بیش از یک نفر را نبوسیده‌ام.',
        },
      },
      {
        id: 'ns16',
        text: {
          en: 'Never have I ever had a one-night stand.',
          fa: 'هرگز رابطه یک‌شبه نداشته‌ام.',
        },
      },
      {
        id: 'ns17',
        text: {
          en: 'Never have I ever been caught checking someone out.',
          fa: 'هرگز موقع نگاه کردن به کسی گیر نیفتاده‌ام.',
        },
      },
      {
        id: 'ns18',
        text: {
          en: 'Never have I ever pretended to be single when I wasn’t.',
          fa: 'هرگز وقتی مجرد نبودم تظاهر به مجردی نکرده‌ام.',
        },
      },
      {
        id: 'ns19',
        text: {
          en: 'Never have I ever had a steamy dream about someone I know.',
          fa: 'هرگز خواب داغ درباره کسی که می‌شناسم ندیده‌ام.',
        },
      },
      {
        id: 'ns20',
        text: {
          en: 'Never have I ever used a dating app while on a night out.',
          fa: 'هرگز وسط شب بیرون از اپ دوستیابی استفاده نکرده‌ام.',
        },
      },
      {
        id: 'ns21',
        text: {
          en: 'Never have I ever been the “other person” in a messy situation.',
          fa: 'هرگز «نفر سوم» در موقعیت آشفته نبوده‌ام.',
        },
      },
      {
        id: 'ns22',
        text: {
          en: 'Never have I ever role-played in a relationship.',
          fa: 'هرگز در رابطه نقش‌بازی نکرده‌ام.',
        },
      },
      {
        id: 'ns23',
        text: {
          en: 'Never have I ever been dumped over text.',
          fa: 'هرگز با پیام ترک نشده‌ام.',
        },
      },
      {
        id: 'ns24',
        text: {
          en: 'Never have I ever dumped someone over text.',
          fa: 'هرگز کسی را با پیام ترک نکرده‌ام.',
        },
      },
      {
        id: 'ns25',
        text: {
          en: 'Never have I ever hooked up in a car.',
          fa: 'هرگز در ماشین صمیمی نشده‌ام.',
        },
      },
      {
        id: 'ns26',
        text: {
          en: 'Never have I ever been caught sneaking out.',
          fa: 'هرگز موقع دزدکی بیرون رفتن گیر نیفتاده‌ام.',
        },
      },
      {
        id: 'ns27',
        text: {
          en: 'Never have I ever kissed someone I shouldn’t have.',
          fa: 'هرگز کسی را که نباید نبوسیده‌ام.',
        },
      },
      {
        id: 'ns28',
        text: {
          en: 'Never have I ever had a “what happens at the party stays…” moment.',
          fa: 'هرگز لحظه «هر چه در مهمانی…» نداشته‌ام.',
        },
      },
      {
        id: 'ns29',
        text: {
          en: 'Never have I ever sent nudes (or almost did).',
          fa: 'هرگز عکس برهنه نفرستاده‌ام (یا تقریباً).',
        },
      },
      {
        id: 'ns30',
        text: {
          en: 'Never have I ever received nudes I didn’t ask for.',
          fa: 'هرگز عکس برهنه‌ای که نخواستم نگرفته‌ام.',
        },
      },
      {
        id: 'ns31',
        text: {
          en: 'Never have I ever had a crush on a coworker or classmate.',
          fa: 'هرگز به همکار یا هم‌کلاسی کرش نداشته‌ام.',
        },
      },
      {
        id: 'ns32',
        text: {
          en: 'Never have I ever been in a love triangle.',
          fa: 'هرگز در مثلث عشقی نبوده‌ام.',
        },
      },
      {
        id: 'ns33',
        text: {
          en: 'Never have I ever kissed in public and gotten stares.',
          fa: 'هرگز در جمع نبوییده‌ام که زل بزنند.',
        },
      },
      {
        id: 'ns34',
        text: {
          en: 'Never have I ever used alcohol as courage to flirt.',
          fa: 'هرگز از الکل برای شجاعت فلرت استفاده نکرده‌ام.',
        },
      },
      {
        id: 'ns35',
        text: {
          en: 'Never have I ever had a “walk of shame” morning.',
          fa: 'هرگز صبح «پیاده‌روی شرم» نداشته‌ام.',
        },
      },
      {
        id: 'ns36',
        text: {
          en: 'Never have I ever lied about being busy to go on a date.',
          fa: 'هرگز برای رفتن به قرار درباره شلوغی دروغ نگفته‌ام.',
        },
      },
      {
        id: 'ns37',
        text: {
          en: 'Never have I ever been caught in a lie about where I was.',
          fa: 'هرگز در دروغ درباره جایم گیر نیفتاده‌ام.',
        },
      },
      {
        id: 'ns38',
        text: {
          en: 'Never have I ever flirted just to get free drinks / favors.',
          fa: 'هرگز فقط برای نوشیدنی/لطف رایگان فلرت نکرده‌ام.',
        },
      },
      {
        id: 'ns39',
        text: {
          en: 'Never have I ever had a secret dating life my friends didn’t know.',
          fa: 'هرگز زندگی دوستیابی مخفی که دوستا ندانند نداشته‌ام.',
        },
      },
      {
        id: 'ns40',
        text: {
          en: 'Never have I ever been locked out while underdressed.',
          fa: 'هرگز نیمه‌لخت بیرون در نمانده‌ام.',
        },
      },
      {
        id: 'ns41',
        text: {
          en: 'Never have I ever made out with a stranger.',
          fa: 'هرگز با غریبه معاشقه نکرده‌ام.',
        },
      },
      {
        id: 'ns42',
        text: {
          en: 'Never have I ever been on a date with two people in one day.',
          fa: 'هرگز در یک روز با دو نفر قرار نداشته‌ام.',
        },
      },
      {
        id: 'ns43',
        text: {
          en: 'Never have I ever had a spicy playlist I hide.',
          fa: 'هرگز پلی‌لیست تندی پنهان نکرده‌ام.',
        },
      },
      {
        id: 'ns44',
        text: {
          en: 'Never have I ever been walked in on while… intimate.',
          fa: 'هرگز موقع صمیمیت کسی سرزده وارد نشده.',
        },
      },
      {
        id: 'ns45',
        text: {
          en: 'Never have I ever sexted the wrong person.',
          fa: 'هرگز سکس‌تکست را برای آدم غلط نفرستاده‌ام.',
        },
      },
      {
        id: 'ns46',
        text: {
          en: 'Never have I ever had a crush on a friend’s partner (even briefly).',
          fa: 'هرگز به پارتنر دوست کرش نداشته‌ام (حتی کوتاه).',
        },
      },
      {
        id: 'ns47',
        text: {
          en: 'Never have I ever joined the mile-high club (or joked about trying).',
          fa: 'هرگز عضو باشگاه مایل بالا نبوده‌ام (یا شوخی تلاش).',
        },
      },
      {
        id: 'ns48',
        text: {
          en: 'Never have I ever been dared to kiss someone and done it.',
          fa: 'هرگز شرط بوسه نخورده‌ام و انجام نداده باشم.',
        },
      },
      {
        id: 'ns49',
        text: {
          en: 'Never have I ever dated someone my parents hated.',
          fa: 'هرگز با کسی که والدینم بدشان می‌آمد قرار نداشته‌ام.',
        },
      },
      {
        id: 'ns50',
        text: {
          en: 'Never have I ever had a relationship I kept “low-key” on purpose.',
          fa: 'هرگز رابطه‌ای عمداً کم‌پروفایل نگه نداشته‌ام.',
        },
      },
      {
        id: 'ns51',
        text: {
          en: 'Never have I ever been caught mid-hookup by a roommate.',
          fa: 'هرگز وسط صمیمیت همخانه گیرم نینداخته.',
        },
      },
      {
        id: 'ns52',
        text: {
          en: 'Never have I ever used a fake name on a night out.',
          fa: 'هرگز در شب بیرون اسم جعلی استفاده نکرده‌ام.',
        },
      },
      {
        id: 'ns53',
        text: {
          en: 'Never have I ever had chemistry with someone I “shouldn’t.”',
          fa: 'هرگز با کسی که «نباید» شیمی نداشته‌ام.',
        },
      },
      {
        id: 'ns54',
        text: {
          en: 'Never have I ever been the reason a couple argued.',
          fa: 'هرگز دلیل بحث یک زوج نبوده‌ام.',
        },
      },
      {
        id: 'ns55',
        text: {
          en: 'Never have I ever kissed someone to make another person jealous.',
          fa: 'هرگز برای حسادت کس دیگری کسی را نبوسیده‌ام.',
        },
      },
      {
        id: 'ns56',
        text: {
          en: 'Never have I ever had a spicy dream about someone at this table.',
          fa: 'هرگز خواب تند درباره کسی دور این میز ندیده‌ام.',
        },
      },
      {
        id: 'ns57',
        text: {
          en: 'Never have I ever been caught looking at someone in a swimsuit.',
          fa: 'هرگز موقع نگاه به کسی با مایو گیر نیفتاده‌ام.',
        },
      },
      {
        id: 'ns58',
        text: {
          en: 'Never have I ever had “just friends” that wasn’t just friends.',
          fa: 'هرگز «فقط دوست»ی نداشته‌ام که فقط دوست نبود.',
        },
      },
      {
        id: 'ns59',
        text: {
          en: 'Never have I ever been ghosted after a great date.',
          fa: 'هرگز بعد قرار عالی روح نشده‌ام.',
        },
      },
      {
        id: 'ns60',
        text: {
          en: 'Never have I ever ghosted after a great date.',
          fa: 'هرگز بعد قرار عالی روح نکرده‌ام.',
        },
      },
      {
        id: 'ns61',
        text: {
          en: 'Never have I ever had a weekend I couldn’t fully explain.',
          fa: 'هرگز آخر هفته‌ای نداشته‌ام که کامل توضیحش ندهم.',
        },
      },
      {
        id: 'ns62',
        text: {
          en: 'Never have I ever been attracted to a friend’s ex.',
          fa: 'هرگز به اکس دوست جذب نشده‌ام.',
        },
      },
      {
        id: 'ns63',
        text: {
          en: 'Never have I ever had a spicy nickname for someone.',
          fa: 'هرگز برای کسی لقب تند نداشته‌ام.',
        },
      },
      {
        id: 'ns64',
        text: {
          en: 'Never have I ever been dared to strip (even a little) in a game.',
          fa: 'هرگز در بازی شرط درآوردن لباس نخورده‌ام (حتی کم).',
        },
      },
      {
        id: 'ns65',
        text: {
          en: 'Never have I ever been in a hot tub with someone I liked.',
          fa: 'هرگز با کسی که دوستش داشتم در جکوزی نبوده‌ام.',
        },
      },
      {
        id: 'ns66',
        text: {
          en: 'Never have I ever lied about why I left a party early.',
          fa: 'هرگز درباره دلیل زود ترک کردن مهمانی دروغ نگفته‌ام.',
        },
      },
      {
        id: 'ns67',
        text: {
          en: 'Never have I ever had a “we need to talk” conversation after a night out.',
          fa: 'هرگز بعد شب بیرون مکالمه «باید حرف بزنیم» نداشته‌ام.',
        },
      },
      {
        id: 'ns68',
        text: {
          en: 'Never have I ever been the last one left at a messy afterparty.',
          fa: 'هرگز آخرین نفر افترپارتی آشفته نبوده‌ام.',
        },
      },
      {
        id: 'ns69',
        text: {
          en: 'Never have I ever kissed in an elevator.',
          fa: 'هرگز در آسانسور نبوییده‌ام.',
        },
      },
      {
        id: 'ns70',
        text: {
          en: 'Never have I ever had a crush on two people at once.',
          fa: 'هرگز هم‌زمان روی دو نفر کرش نداشته‌ام.',
        },
      },
      {
        id: 'ns71',
        text: {
          en: 'Never have I ever been caught mid-flirt by the wrong person.',
          fa: 'هرگز وسط فلرت توسط آدم غلط گیر نیفتاده‌ام.',
        },
      },
      {
        id: 'ns72',
        text: {
          en: 'Never have I ever used “studying” as cover for a date.',
          fa: 'هرگز «درس خواندن» را پوشش قرار نکرده‌ام.',
        },
      },
      {
        id: 'ns73',
        text: {
          en: 'Never have I ever had a steamy chat I deleted in panic.',
          fa: 'هرگز چت داغی نداشته‌ام که از ترس پاک کنم.',
        },
      },
      {
        id: 'ns74',
        text: {
          en: 'Never have I ever been told I was a good kisser (or bad).',
          fa: 'هرگز به من نگفته‌اند بوسه‌زن خوبم (یا بد).',
        },
      },
      {
        id: 'ns75',
        text: {
          en: 'Never have I ever had a night where my phone stayed on do-not-disturb for a reason.',
          fa: 'هرگز شبی نداشته‌ام که گوشی عمداً مزاحم نشود.',
        },
      },
      {
        id: 'ns76',
        text: {
          en: 'Never have I ever been jealous of a friend’s dating life.',
          fa: 'هرگز به زندگی دوستیابی دوست حسادت نکرده‌ام.',
        },
      },
      {
        id: 'ns77',
        text: {
          en: 'Never have I ever had a spicy “almost” moment with someone.',
          fa: 'هرگز لحظه تند «تقریباً» با کسی نداشته‌ام.',
        },
      },
      {
        id: 'ns78',
        text: {
          en: 'Never have I ever been asked “are you single?” by a stranger.',
          fa: 'هرگز غریبه‌ای ازم نپرسیده «مجردی؟».',
        },
      },
      {
        id: 'ns79',
        text: {
          en: 'Never have I ever said yes to a dare I regretted by morning.',
          fa: 'هرگز به شرطی بله نگفته‌ام که تا صبح پشیمون شوم.',
        },
      },
      {
        id: 'ns80',
        text: {
          en: 'Never have I ever had a crush so obvious everyone knew.',
          fa: 'هرگز کرشی نداشته‌ام که همه‌جا معلوم باشد.',
        },
      },
      {
        id: 'ns81',
        text: {
          en: 'Never have I ever been the subject of spicy group-chat gossip.',
          fa: 'هرگز موضوع شایعه تند گروه چت نبوده‌ام.',
        },
      },
    ],
  },
  {
    id: 'most-normal',
    mode: 'most',
    heat: 'normal',
    prompts: [
      {
        id: 'mn1',
        text: {
          en: 'Who is most likely to become famous?',
          fa: 'کی از همه بیشتر احتمال دارد معروف شود؟',
        },
      },
      {
        id: 'mn2',
        text: {
          en: 'Who is most likely to survive a zombie apocalypse?',
          fa: 'کی از همه بیشتر احتمال دارد آخرالزمان زامبی را زنده بماند؟',
        },
      },
      {
        id: 'mn3',
        text: {
          en: 'Who is most likely to start a group chat at 2am?',
          fa: 'کی از همه بیشتر احتمال دارد ساعت ۲ شب گروه بزند؟',
        },
      },
      {
        id: 'mn4',
        text: {
          en: 'Who is most likely to cry at an ad?',
          fa: 'کی از همه بیشتر احتمال دارد برای تبلیغ گریه کند؟',
        },
      },
      {
        id: 'mn5',
        text: {
          en: 'Who is most likely to get lost in their own neighborhood?',
          fa: 'کی از همه بیشتر احتمال دارد تو محلهٔ خودش گم شود؟',
        },
      },
      {
        id: 'mn6',
        text: {
          en: 'Who is most likely to become a billionaire?',
          fa: 'کی از همه بیشتر احتمال دارد میلیاردر شود؟',
        },
      },
      {
        id: 'mn7',
        text: {
          en: 'Who is most likely to forget their own birthday?',
          fa: 'کی از همه بیشتر احتمال دارد تولد خودش را فراموش کند؟',
        },
      },
      {
        id: 'mn8',
        text: {
          en: 'Who is most likely to talk their way out of a ticket?',
          fa: 'کی از همه بیشتر احتمال دارد با حرف جریمه را رد کند؟',
        },
      },
      {
        id: 'mn9',
        text: {
          en: 'Who is most likely to adopt too many pets?',
          fa: 'کی از همه بیشتر احتمال دارد حیوون زیاد بیاورد؟',
        },
      },
      {
        id: 'mn10',
        text: {
          en: 'Who is most likely to accidentally reply-all?',
          fa: 'کی از همه بیشتر احتمال دارد اشتباهی Reply All بزند؟',
        },
      },
      {
        id: 'mn11',
        text: {
          en: 'Who is most likely to live abroad?',
          fa: 'کی از همه بیشتر احتمال دارد خارج زندگی کند؟',
        },
      },
      {
        id: 'mn12',
        text: {
          en: 'Who is most likely to write a bestselling book?',
          fa: 'کی از همه بیشتر احتمال دارد کتاب پرفروش بنویسد؟',
        },
      },
      {
        id: 'mn13',
        text: {
          en: 'Who is most likely to show up fashionably late?',
          fa: 'کی از همه بیشتر احتمال دارد شیک دیر برسد؟',
        },
      },
      {
        id: 'mn14',
        text: {
          en: 'Who is most likely to become a conspiracy theorist for a week?',
          fa: 'کی از همه بیشتر احتمال دارد یک هفته تئوری توطئه ببافد؟',
        },
      },
      {
        id: 'mn15',
        text: {
          en: 'Who is most likely to win a cooking competition?',
          fa: 'کی از همه بیشتر احتمال دارد مسابقه آشپزی ببرد؟',
        },
      },
      {
        id: 'mn16',
        text: {
          en: 'Who is most likely to go viral for the wrong reason?',
          fa: 'کی از همه بیشتر احتمال دارد به دلیل غلط وایرال شود؟',
        },
      },
      {
        id: 'mn17',
        text: {
          en: 'Who is most likely to fall asleep mid-conversation?',
          fa: 'کی از همه بیشتر احتمال دارد وسط حرف خوابش ببرد؟',
        },
      },
      {
        id: 'mn18',
        text: {
          en: 'Who is most likely to win on a game show?',
          fa: 'کی از همه بیشتر احتمال دارد مسابقه تلویزیونی ببرد؟',
        },
      },
      {
        id: 'mn19',
        text: {
          en: 'Who is most likely to become a chef?',
          fa: 'کی از همه بیشتر احتمال دارد آشپز شود؟',
        },
      },
      {
        id: 'mn20',
        text: {
          en: 'Who is most likely to invent a useless but funny product?',
          fa: 'کی از همه بیشتر احتمال دارد محصول بی‌فایده ولی بامزه اختراع کند؟',
        },
      },
      {
        id: 'mn21',
        text: {
          en: 'Who is most likely to get a tattoo on impulse?',
          fa: 'کی از همه بیشتر احتمال دارد تاتو تکانشی بزند؟',
        },
      },
      {
        id: 'mn22',
        text: {
          en: 'Who is most likely to start a podcast nobody asked for?',
          fa: 'کی از همه بیشتر احتمال دارد پادکستی شروع کند که کسی نخواست؟',
        },
      },
      {
        id: 'mn23',
        text: {
          en: 'Who is most likely to win an argument with a customer service bot?',
          fa: 'کی از همه بیشتر احتمال دارد با ربات پشتیبانی بحث را ببرد؟',
        },
      },
      {
        id: 'mn24',
        text: {
          en: 'Who is most likely to become a teacher?',
          fa: 'کی از همه بیشتر احتمال دارد معلم شود؟',
        },
      },
      {
        id: 'mn25',
        text: {
          en: 'Who is most likely to cry at a wedding of people they barely know?',
          fa: 'کی از همه بیشتر احتمال دارد عروسی آدم‌هایی که کم می‌شناسد گریه کند؟',
        },
      },
      {
        id: 'mn26',
        text: {
          en: 'Who is most likely to survive on snacks for a week?',
          fa: 'کی از همه بیشتر احتمال دارد یک هفته با تنقلات زنده بماند؟',
        },
      },
      {
        id: 'mn27',
        text: {
          en: 'Who is most likely to become a travel influencer?',
          fa: 'کی از همه بیشتر احتمال دارد اینفلوئنسر سفر شود؟',
        },
      },
      {
        id: 'mn28',
        text: {
          en: 'Who is most likely to forget why they opened the fridge?',
          fa: 'کی از همه بیشتر احتمال دارد فراموش کند چرا یخچال را باز کرد؟',
        },
      },
      {
        id: 'mn29',
        text: {
          en: 'Who is most likely to win a dance battle?',
          fa: 'کی از همه بیشتر احتمال دارد مسابقه رقص ببرد؟',
        },
      },
      {
        id: 'mn30',
        text: {
          en: 'Who is most likely to become a detective?',
          fa: 'کی از همه بیشتر احتمال دارد کارآگاه شود؟',
        },
      },
      {
        id: 'mn31',
        text: {
          en: 'Who is most likely to get stuck in a tree (somehow)?',
          fa: 'کی از همه بیشتر احتمال دارد (جوری) تو درخت گیر کند؟',
        },
      },
      {
        id: 'mn32',
        text: {
          en: 'Who is most likely to become a stand-up comedian?',
          fa: 'کی از همه بیشتر احتمال دارد استندآپ‌کمدین شود؟',
        },
      },
      {
        id: 'mn33',
        text: {
          en: 'Who is most likely to finish a book in one night?',
          fa: 'کی از همه بیشتر احتمال دارد یک کتاب را یک‌شبه تمام کند؟',
        },
      },
      {
        id: 'mn34',
        text: {
          en: 'Who is most likely to start a cult… jokingly?',
          fa: 'کی از همه بیشتر احتمال دارد فرقه… شوخی شروع کند؟',
        },
      },
      {
        id: 'mn35',
        text: {
          en: 'Who is most likely to win at karaoke night?',
          fa: 'کی از همه بیشتر احتمال دارد شب کارائوکه ببرد؟',
        },
      },
      {
        id: 'mn36',
        text: {
          en: 'Who is most likely to become a pilot?',
          fa: 'کی از همه بیشتر احتمال دارد خلبان شود؟',
        },
      },
      {
        id: 'mn37',
        text: {
          en: 'Who is most likely to lose their keys every week?',
          fa: 'کی از همه بیشتر احتمال دارد هر هفته کلید گم کند؟',
        },
      },
      {
        id: 'mn38',
        text: {
          en: 'Who is most likely to become a fashion icon?',
          fa: 'کی از همه بیشتر احتمال دارد آیکون مد شود؟',
        },
      },
      {
        id: 'mn39',
        text: {
          en: 'Who is most likely to talk to animals like they answer?',
          fa: 'کی از همه بیشتر احتمال دارد با حیوانات طوری حرف بزند که جواب می‌دهند؟',
        },
      },
      {
        id: 'mn40',
        text: {
          en: 'Who is most likely to win a trivia night?',
          fa: 'کی از همه بیشتر احتمال دارد شب اطلاعات عمومی ببرد؟',
        },
      },
      {
        id: 'mn41',
        text: {
          en: 'Who is most likely to become a mayor of a tiny town?',
          fa: 'کی از همه بیشتر احتمال دارد شهردار شهر کوچک شود؟',
        },
      },
      {
        id: 'mn42',
        text: {
          en: 'Who is most likely to get caught talking to themselves?',
          fa: 'کی از همه بیشتر احتمال دارد موقع حرف زدن با خود گیر بیفتد؟',
        },
      },
      {
        id: 'mn43',
        text: {
          en: 'Who is most likely to become an astronaut?',
          fa: 'کی از همه بیشتر احتمال دارد فضانورد شود؟',
        },
      },
      {
        id: 'mn44',
        text: {
          en: 'Who is most likely to organize the perfect surprise party?',
          fa: 'کی از همه بیشتر احتمال دارد سورپرایز مهمانی بی‌نقص بچیند؟',
        },
      },
      {
        id: 'mn45',
        text: {
          en: 'Who is most likely to sleep through an earthquake drill?',
          fa: 'کی از همه بیشتر احتمال دارد تمرین زلزله را بخوابد؟',
        },
      },
      {
        id: 'mn46',
        text: {
          en: 'Who is most likely to become a sports coach?',
          fa: 'کی از همه بیشتر احتمال دارد مربی ورزش شود؟',
        },
      },
      {
        id: 'mn47',
        text: {
          en: 'Who is most likely to invent a new slang word?',
          fa: 'کی از همه بیشتر احتمال دارد کلمه عامیانه تازه بسازد؟',
        },
      },
      {
        id: 'mn48',
        text: {
          en: 'Who is most likely to win a staring contest?',
          fa: 'کی از همه بیشتر احتمال دارد مسابقه زل زدن ببرد؟',
        },
      },
      {
        id: 'mn49',
        text: {
          en: 'Who is most likely to become a detective of lost items?',
          fa: 'کی از همه بیشتر احتمال دارد کارآگاه وسایل گم‌شده شود؟',
        },
      },
      {
        id: 'mn50',
        text: {
          en: 'Who is most likely to start laughing at a funeral (nerves)?',
          fa: 'کی از همه بیشتر احتمال دارد (از استرس) تو مراسم بخندد؟',
        },
      },
      {
        id: 'mn51',
        text: {
          en: 'Who is most likely to become a YouTuber?',
          fa: 'کی از همه بیشتر احتمال دارد یوتیوبر شود؟',
        },
      },
      {
        id: 'mn52',
        text: {
          en: 'Who is most likely to survive a week without complaining?',
          fa: 'کی از همه بیشتر احتمال دارد یک هفته بدون غر زنده بماند؟',
        },
      },
      {
        id: 'mn53',
        text: {
          en: 'Who is most likely to become a judge on a reality show?',
          fa: 'کی از همه بیشتر احتمال دارد داور برنامه ریئلیتی شود؟',
        },
      },
      {
        id: 'mn54',
        text: {
          en: 'Who is most likely to lose a fight with a vending machine?',
          fa: 'کی از همه بیشتر احتمال دارد با دستگاه فروش دعوا را ببازد؟',
        },
      },
      {
        id: 'mn55',
        text: {
          en: 'Who is most likely to become a novelist?',
          fa: 'کی از همه بیشتر احتمال دارد رمان‌نویس شود؟',
        },
      },
      {
        id: 'mn56',
        text: {
          en: 'Who is most likely to bring snacks to every hangout?',
          fa: 'کی از همه بیشتر احتمال دارد به هر دورهمی خوراکی بیاورد؟',
        },
      },
      {
        id: 'mn57',
        text: {
          en: 'Who is most likely to become a wildlife photographer?',
          fa: 'کی از همه بیشتر احتمال دارد عکاس حیات وحش شود؟',
        },
      },
      {
        id: 'mn58',
        text: {
          en: 'Who is most likely to accidentally start a trend?',
          fa: 'کی از همه بیشتر احتمال دارد تصادفی ترند شروع کند؟',
        },
      },
      {
        id: 'mn59',
        text: {
          en: 'Who is most likely to win “most likely to succeed” in a yearbook?',
          fa: 'کی از همه بیشتر احتمال دارد در سالنامه «موفق‌ترین» شود؟',
        },
      },
      {
        id: 'mn60',
        text: {
          en: 'Who is most likely to become a barista with a cult following?',
          fa: 'کی از همه بیشتر احتمال دارد باریستا با طرفدار فرقه شود؟',
        },
      },
      {
        id: 'mn61',
        text: {
          en: 'Who is most likely to get locked out of their own house?',
          fa: 'کی از همه بیشتر احتمال دارد از خونه خودش بیرون بماند؟',
        },
      },
      {
        id: 'mn62',
        text: {
          en: 'Who is most likely to become a game designer?',
          fa: 'کی از همه بیشتر احتمال دارد طراح بازی شود؟',
        },
      },
      {
        id: 'mn63',
        text: {
          en: 'Who is most likely to cry during a graduation speech?',
          fa: 'کی از همه بیشتر احتمال دارد وسط سخنرانی فارغ‌التحصیلی گریه کند؟',
        },
      },
      {
        id: 'mn64',
        text: {
          en: 'Who is most likely to become a professional gamer?',
          fa: 'کی از همه بیشتر احتمال دارد گیمر حرفه‌ای شود؟',
        },
      },
      {
        id: 'mn65',
        text: {
          en: 'Who is most likely to survive a week of camping?',
          fa: 'کی از همه بیشتر احتمال دارد یک هفته کمپینگ دوام بیاورد؟',
        },
      },
      {
        id: 'mn66',
        text: {
          en: 'Who is most likely to become a voice actor?',
          fa: 'کی از همه بیشتر احتمال دارد صداپیشه شود؟',
        },
      },
      {
        id: 'mn67',
        text: {
          en: 'Who is most likely to win a pie-eating contest?',
          fa: 'کی از همه بیشتر احتمال دارد مسابقه خوردن پای ببرد؟',
        },
      },
      {
        id: 'mn68',
        text: {
          en: 'Who is most likely to become a travel blogger?',
          fa: 'کی از همه بیشتر احتمال دارد بلاگر سفر شود؟',
        },
      },
      {
        id: 'mn69',
        text: {
          en: 'Who is most likely to fall asleep in a cinema?',
          fa: 'کی از همه بیشتر احتمال دارد تو سینما خوابش ببرد؟',
        },
      },
      {
        id: 'mn70',
        text: {
          en: 'Who is most likely to become a scientist?',
          fa: 'کی از همه بیشتر احتمال دارد دانشمند شود؟',
        },
      },
      {
        id: 'mn71',
        text: {
          en: 'Who is most likely to start a neighborhood newsletter?',
          fa: 'کی از همه بیشتر احتمال دارد خبرنامه محله شروع کند؟',
        },
      },
      {
        id: 'mn72',
        text: {
          en: 'Who is most likely to win a costume contest?',
          fa: 'کی از همه بیشتر احتمال دارد مسابقه لباس ببرد؟',
        },
      },
      {
        id: 'mn73',
        text: {
          en: 'Who is most likely to become a DJ?',
          fa: 'کی از همه بیشتر احتمال دارد دی‌جی شود؟',
        },
      },
      {
        id: 'mn74',
        text: {
          en: 'Who is most likely to get stuck in an elevator talking to strangers?',
          fa: 'کی از همه بیشتر احتمال دارد تو آسانسور گیر کند و با غریبه حرف بزند؟',
        },
      },
      {
        id: 'mn75',
        text: {
          en: 'Who is most likely to become a food critic?',
          fa: 'کی از همه بیشتر احتمال دارد منتقد غذا شود؟',
        },
      },
      {
        id: 'mn76',
        text: {
          en: 'Who is most likely to invent a holiday?',
          fa: 'کی از همه بیشتر احتمال دارد تعطیلات اختراع کند؟',
        },
      },
      {
        id: 'mn77',
        text: {
          en: 'Who is most likely to win a marathon (or try)?',
          fa: 'کی از همه بیشتر احتمال دارد ماراتن ببرد (یا تلاش کند)؟',
        },
      },
      {
        id: 'mn78',
        text: {
          en: 'Who is most likely to become a podcast host with famous guests?',
          fa: 'کی از همه بیشتر احتمال دارد میزبان پادکست با مهمان معروف شود؟',
        },
      },
      {
        id: 'mn79',
        text: {
          en: 'Who is most likely to forget their own anniversary (of anything)?',
          fa: 'کی از همه بیشتر احتمال دارد سالگرد هر چیزی را فراموش کند؟',
        },
      },
      {
        id: 'mn80',
        text: {
          en: 'Who is most likely to become the group’s unofficial therapist?',
          fa: 'کی از همه بیشتر احتمال دارد درمانگر غیررسمی گروه شود؟',
        },
      },
    ],
  },
  {
    id: 'most-spicy',
    mode: 'most',
    heat: 'spicy',
    prompts: [
      {
        id: 'ms1',
        text: {
          en: 'Who is most likely to make out with a stranger tonight?',
          fa: 'کی از همه بیشتر احتمال دارد امشب با غریبه معاشقه کند؟',
        },
      },
      {
        id: 'ms2',
        text: {
          en: 'Who is most likely to have a secret fling?',
          fa: 'کی از همه بیشتر احتمال دارد رابطه مخفی کوتاه داشته باشد؟',
        },
      },
      {
        id: 'ms3',
        text: {
          en: 'Who is most likely to send a risky text after midnight?',
          fa: 'کی از همه بیشتر احتمال دارد بعد نیمه‌شب پیام ریسکی بفرستد؟',
        },
      },
      {
        id: 'ms4',
        text: {
          en: 'Who is most likely to get caught flirting with the wrong person?',
          fa: 'کی از همه بیشتر احتمال دارد موقع فلرت با آدم غلط گیر بیفتد؟',
        },
      },
      {
        id: 'ms5',
        text: {
          en: 'Who is most likely to have a spicy dream about someone here?',
          fa: 'کی از همه بیشتر احتمال دارد خواب تند درباره کسی اینجا ببیند؟',
        },
      },
      {
        id: 'ms6',
        text: {
          en: 'Who is most likely to be a great kisser?',
          fa: 'کی از همه بیشتر احتمال دارد بوسه‌زن عالی باشد؟',
        },
      },
      {
        id: 'ms7',
        text: {
          en: 'Who is most likely to start a friends-with-benefits situation?',
          fa: 'کی از همه بیشتر احتمال دارد دوست-با-مزایا شروع کند؟',
        },
      },
      {
        id: 'ms8',
        text: {
          en: 'Who is most likely to get dared into a kiss and do it?',
          fa: 'کی از همه بیشتر احتمال دارد شرط بوسه بخورد و انجام دهد؟',
        },
      },
      {
        id: 'ms9',
        text: {
          en: 'Who is most likely to have the wildest dating history?',
          fa: 'کی از همه بیشتر احتمال دارد وحشی‌ترین تاریخچه دوستیابی را داشته باشد؟',
        },
      },
      {
        id: 'ms10',
        text: {
          en: 'Who is most likely to hook up at a party?',
          fa: 'کی از همه بیشتر احتمال دارد در مهمانی صمیمی شود؟',
        },
      },
      {
        id: 'ms11',
        text: {
          en: 'Who is most likely to get jealous the easiest?',
          fa: 'کی از همه بیشتر احتمال دارد راحت‌ترین حسادت را بگیرد؟',
        },
      },
      {
        id: 'ms12',
        text: {
          en: 'Who is most likely to be caught mid-hookup?',
          fa: 'کی از همه بیشتر احتمال دارد وسط صمیمیت گیر بیفتد؟',
        },
      },
      {
        id: 'ms13',
        text: {
          en: 'Who is most likely to have a secret crush on someone at this table?',
          fa: 'کی از همه بیشتر احتمال دارد کرش مخفی روی کسی دور میز داشته باشد؟',
        },
      },
      {
        id: 'ms14',
        text: {
          en: 'Who is most likely to use a dating app during this hangout?',
          fa: 'کی از همه بیشتر احتمال دارد وسط این دورهمی اپ دوستیابی باز کند؟',
        },
      },
      {
        id: 'ms15',
        text: {
          en: 'Who is most likely to be the “bad influence” on a night out?',
          fa: 'کی از همه بیشتر احتمال دارد «تأثیر بد» شب بیرون باشد؟',
        },
      },
      {
        id: 'ms16',
        text: {
          en: 'Who is most likely to have a walk-of-shame story?',
          fa: 'کی از همه بیشتر احتمال دارد داستان پیاده‌روی شرم داشته باشد؟',
        },
      },
      {
        id: 'ms17',
        text: {
          en: 'Who is most likely to flirt for free drinks?',
          fa: 'کی از همه بیشتر احتمال دارد برای نوشیدنی رایگان فلرت کند؟',
        },
      },
      {
        id: 'ms18',
        text: {
          en: 'Who is most likely to kiss two people in one week?',
          fa: 'کی از همه بیشتر احتمال دارد در یک هفته دو نفر را ببوسد؟',
        },
      },
      {
        id: 'ms19',
        text: {
          en: 'Who is most likely to be in a messy love triangle?',
          fa: 'کی از همه بیشتر احتمال دارد در مثلث عشقی آشفته باشد؟',
        },
      },
      {
        id: 'ms20',
        text: {
          en: 'Who is most likely to have the hottest “almost” moment?',
          fa: 'کی از همه بیشتر احتمال دارد داغ‌ترین لحظه «تقریباً» را داشته باشد؟',
        },
      },
      {
        id: 'ms21',
        text: {
          en: 'Who is most likely to get caught checking someone out?',
          fa: 'کی از همه بیشتر احتمال دارد موقع نگاه کردن به کسی گیر بیفتد؟',
        },
      },
      {
        id: 'ms22',
        text: {
          en: 'Who is most likely to send nudes (or almost)?',
          fa: 'کی از همه بیشتر احتمال دارد عکس برهنه بفرستد (یا تقریباً)؟',
        },
      },
      {
        id: 'ms23',
        text: {
          en: 'Who is most likely to be the subject of spicy gossip?',
          fa: 'کی از همه بیشتر احتمال دارد موضوع شایعه تند باشد؟',
        },
      },
      {
        id: 'ms24',
        text: {
          en: 'Who is most likely to have chemistry with someone they shouldn’t?',
          fa: 'کی از همه بیشتر احتمال دارد با کسی که نباید شیمی داشته باشد؟',
        },
      },
      {
        id: 'ms25',
        text: {
          en: 'Who is most likely to get locked out underdressed?',
          fa: 'کی از همه بیشتر احتمال دارد نیمه‌لخت بیرون در بماند؟',
        },
      },
      {
        id: 'ms26',
        text: {
          en: 'Who is most likely to have a secret dating life?',
          fa: 'کی از همه بیشتر احتمال دارد زندگی دوستیابی مخفی داشته باشد؟',
        },
      },
      {
        id: 'ms27',
        text: {
          en: 'Who is most likely to be dared to strip in a game?',
          fa: 'کی از همه بیشتر احتمال دارد در بازی شرط درآوردن لباس بخورد؟',
        },
      },
      {
        id: 'ms28',
        text: {
          en: 'Who is most likely to make the first move?',
          fa: 'کی از همه بیشتر احتمال دارد حرکت اول را بزند؟',
        },
      },
      {
        id: 'ms29',
        text: {
          en: 'Who is most likely to have a steamy elevator moment?',
          fa: 'کی از همه بیشتر احتمال دارد لحظه داغ آسانسور داشته باشد؟',
        },
      },
      {
        id: 'ms30',
        text: {
          en: 'Who is most likely to ghost after a great date?',
          fa: 'کی از همه بیشتر احتمال دارد بعد قرار عالی روح کند؟',
        },
      },
      {
        id: 'ms31',
        text: {
          en: 'Who is most likely to get ghosted and still text again?',
          fa: 'کی از همه بیشتر احتمال دارد روح شود و باز پیام بدهد؟',
        },
      },
      {
        id: 'ms32',
        text: {
          en: 'Who is most likely to date someone their friends hate?',
          fa: 'کی از همه بیشتر احتمال دارد با کسی قرار بگذارد که دوستا بدشان می‌آید؟',
        },
      },
      {
        id: 'ms33',
        text: {
          en: 'Who is most likely to have a spicy nickname for someone here?',
          fa: 'کی از همه بیشتر احتمال دارد برای کسی اینجا لقب تند داشته باشد؟',
        },
      },
      {
        id: 'ms34',
        text: {
          en: 'Who is most likely to be the reason a couple argues?',
          fa: 'کی از همه بیشتر احتمال دارد دلیل بحث یک زوج باشد؟',
        },
      },
      {
        id: 'ms35',
        text: {
          en: 'Who is most likely to kiss to make someone jealous?',
          fa: 'کی از همه بیشتر احتمال دارد برای حسادت کسی ببوسد؟',
        },
      },
      {
        id: 'ms36',
        text: {
          en: 'Who is most likely to have a “what happens here stays here” night?',
          fa: 'کی از همه بیشتر احتمال دارد شب «هر چه اینجا…» داشته باشد؟',
        },
      },
      {
        id: 'ms37',
        text: {
          en: 'Who is most likely to be caught mid-flirt by their crush?',
          fa: 'کی از همه بیشتر احتمال دارد وسط فلرت توسط کرش گیر بیفتد؟',
        },
      },
      {
        id: 'ms38',
        text: {
          en: 'Who is most likely to have the wildest weekend they can’t fully explain?',
          fa: 'کی از همه بیشتر احتمال دارد وحشی‌ترین آخر هفته‌ای داشته باشد که کامل توضیح ندهد؟',
        },
      },
      {
        id: 'ms39',
        text: {
          en: 'Who is most likely to use “studying” as a cover for a date?',
          fa: 'کی از همه بیشتر احتمال دارد «درس» را پوشش قرار کند؟',
        },
      },
      {
        id: 'ms40',
        text: {
          en: 'Who is most likely to have a crush so obvious everyone knows?',
          fa: 'کی از همه بیشتر احتمال دارد کرشی داشته باشد که همه بفهمند؟',
        },
      },
      {
        id: 'ms41',
        text: {
          en: 'Who is most likely to be the best at dirty jokes?',
          fa: 'کی از همه بیشتر احتمال دارد بهترین جوک‌های کثیف را بگوید؟',
        },
      },
      {
        id: 'ms42',
        text: {
          en: 'Who is most likely to get a hickey and try to hide it?',
          fa: 'کی از همه بیشتر احتمال دارد جای بوسه بگیرد و پنهان کند؟',
        },
      },
      {
        id: 'ms43',
        text: {
          en: 'Who is most likely to flirt with the bartender?',
          fa: 'کی از همه بیشتر احتمال دارد با بارمن فلرت کند؟',
        },
      },
      {
        id: 'ms44',
        text: {
          en: 'Who is most likely to have a secret soft spot for romance?',
          fa: 'کی از همه بیشتر احتمال دارد نقطه ضعف مخفی برای رمانس داشته باشد؟',
        },
      },
      {
        id: 'ms45',
        text: {
          en: 'Who is most likely to be caught in a steamy chat?',
          fa: 'کی از همه بیشتر احتمال دارد در چت داغ گیر بیفتد؟',
        },
      },
      {
        id: 'ms46',
        text: {
          en: 'Who is most likely to have a spicy playlist they hide?',
          fa: 'کی از همه بیشتر احتمال دارد پلی‌لیست تند پنهان داشته باشد؟',
        },
      },
      {
        id: 'ms47',
        text: {
          en: 'Who is most likely to start something with a friend’s ex?',
          fa: 'کی از همه بیشتر احتمال دارد با اکس دوست چیزی شروع کند؟',
        },
      },
      {
        id: 'ms48',
        text: {
          en: 'Who is most likely to be the last one left at a messy afterparty?',
          fa: 'کی از همه بیشتر احتمال دارد آخرین نفر افترپارتی آشفته باشد؟',
        },
      },
      {
        id: 'ms49',
        text: {
          en: 'Who is most likely to say yes to a dare they regret by morning?',
          fa: 'کی از همه بیشتر احتمال دارد به شرطی بله بگوید که تا صبح پشیمون شود؟',
        },
      },
      {
        id: 'ms50',
        text: {
          en: 'Who is most likely to have a crush on two people at once?',
          fa: 'کی از همه بیشتر احتمال دارد هم‌زمان روی دو نفر کرش داشته باشد؟',
        },
      },
      {
        id: 'ms51',
        text: {
          en: 'Who is most likely to get asked “are you single?” by a stranger?',
          fa: 'کی از همه بیشتر احتمال دارد غریبه ازش بپرسد «مجردی؟»',
        },
      },
      {
        id: 'ms52',
        text: {
          en: 'Who is most likely to be the “other person” in a messy story?',
          fa: 'کی از همه بیشتر احتمال دارد «نفر سوم» داستان آشفته باشد؟',
        },
      },
      {
        id: 'ms53',
        text: {
          en: 'Who is most likely to have the hottest “we need to talk” aftermath?',
          fa: 'کی از همه بیشتر احتمال دارد داغ‌ترین پیامد «باید حرف بزنیم» را داشته باشد؟',
        },
      },
      {
        id: 'ms54',
        text: {
          en: 'Who is most likely to kiss in public without caring who sees?',
          fa: 'کی از همه بیشتر احتمال دارد در جمع ببوسد بی‌توجه به نگاه‌ها؟',
        },
      },
      {
        id: 'ms55',
        text: {
          en: 'Who is most likely to have chemistry with someone in this room right now?',
          fa: 'کی از همه بیشتر احتمال دارد همین الان با کسی تو این اتاق شیمی داشته باشد؟',
        },
      },
      {
        id: 'ms56',
        text: {
          en: 'Who is most likely to be a terrible (or amazing) wingman?',
          fa: 'کی از همه بیشتر احتمال دارد وینگ‌من افتضاح (یا عالی) باشد؟',
        },
      },
      {
        id: 'ms57',
        text: {
          en: 'Who is most likely to get caught sneaking someone in?',
          fa: 'کی از همه بیشتر احتمال دارد موقع دزدکی آوردن کسی گیر بیفتد؟',
        },
      },
      {
        id: 'ms58',
        text: {
          en: 'Who is most likely to have a spicy voicemail they regret?',
          fa: 'کی از همه بیشتر احتمال دارد ویس تند پشیمون‌کننده داشته باشد؟',
        },
      },
      {
        id: 'ms59',
        text: {
          en: 'Who is most likely to be the first to leave with someone?',
          fa: 'کی از همه بیشتر احتمال دارد اول با کسی ترک کند؟',
        },
      },
      {
        id: 'ms60',
        text: {
          en: 'Who is most likely to have a secret soft crush on a friend’s sibling?',
          fa: 'کی از همه بیشتر احتمال دارد کرش نرم مخفی روی خواهر/برادر دوست داشته باشد؟',
        },
      },
      {
        id: 'ms61',
        text: {
          en: 'Who is most likely to turn a “harmless” game spicy?',
          fa: 'کی از همه بیشتر احتمال دارد بازی «بی‌خطر» را تند کند؟',
        },
      },
      {
        id: 'ms62',
        text: {
          en: 'Who is most likely to be caught mid-thirst-scroll?',
          fa: 'کی از همه بیشتر احتمال دارد وسط اسکرول تشنه گیر بیفتد؟',
        },
      },
      {
        id: 'ms63',
        text: {
          en: 'Who is most likely to have the wildest truth in Truth or Dare?',
          fa: 'کی از همه بیشتر احتمال دارد وحشی‌ترین حقیقت Truth or Dare را داشته باشد؟',
        },
      },
      {
        id: 'ms64',
        text: {
          en: 'Who is most likely to get a reputation for being a flirt?',
          fa: 'کی از همه بیشتر احتمال دارد شهرت فلرتر بگیرد؟',
        },
      },
      {
        id: 'ms65',
        text: {
          en: 'Who is most likely to have a steamy car story?',
          fa: 'کی از همه بیشتر احتمال دارد داستان داغ ماشین داشته باشد؟',
        },
      },
      {
        id: 'ms66',
        text: {
          en: 'Who is most likely to be the one everyone thinks is dating someone?',
          fa: 'کی از همه بیشتر احتمال دارد کسی باشد که همه فکر کنند با یکی هست؟',
        },
      },
      {
        id: 'ms67',
        text: {
          en: 'Who is most likely to start drama by accident?',
          fa: 'کی از همه بیشتر احتمال دارد تصادفی درام شروع کند؟',
        },
      },
      {
        id: 'ms68',
        text: {
          en: 'Who is most likely to have a spicy “we shouldn’t” moment?',
          fa: 'کی از همه بیشتر احتمال دارد لحظه تند «نباید» داشته باشد؟',
        },
      },
      {
        id: 'ms69',
        text: {
          en: 'Who is most likely to be caught blushing hard tonight?',
          fa: 'کی از همه بیشتر احتمال دارد امشب قرمز شدید شود؟',
        },
      },
      {
        id: 'ms70',
        text: {
          en: 'Who is most likely to make someone here nervous (in a good way)?',
          fa: 'کی از همه بیشتر احتمال دارد کسی اینجا را (خوب) عصبی کند؟',
        },
      },
      {
        id: 'ms71',
        text: {
          en: 'Who is most likely to have the best (or worst) pickup line?',
          fa: 'کی از همه بیشتر احتمال دارد بهترین (یا بدترین) خط آشنایی را داشته باشد؟',
        },
      },
      {
        id: 'ms72',
        text: {
          en: 'Who is most likely to end the night in someone’s DMs?',
          fa: 'کی از همه بیشتر احتمال دارد شب را در دایرکت کسی تمام کند؟',
        },
      },
      {
        id: 'ms73',
        text: {
          en: 'Who is most likely to be dared into something spicy and accept?',
          fa: 'کی از همه بیشتر احتمال دارد شرط تند بخورد و قبول کند؟',
        },
      },
      {
        id: 'ms74',
        text: {
          en: 'Who is most likely to have a secret soft side after flirting hard?',
          fa: 'کی از همه بیشتر احتمال دارد بعد فلرت سخت، طرف نرم مخفی داشته باشد؟',
        },
      },
      {
        id: 'ms75',
        text: {
          en: 'Who is most likely to get called out for staring?',
          fa: 'کی از همه بیشتر احتمال دارد به‌خاطر زل زدن صدا زده شود؟',
        },
      },
      {
        id: 'ms76',
        text: {
          en: 'Who is most likely to have a crush that becomes a problem?',
          fa: 'کی از همه بیشتر احتمال دارد کرشی داشته باشد که مشکل شود؟',
        },
      },
      {
        id: 'ms77',
        text: {
          en: 'Who is most likely to be the chaotic romantic of the group?',
          fa: 'کی از همه بیشتر احتمال دارد رمانتیک آشوب گروه باشد؟',
        },
      },
      {
        id: 'ms78',
        text: {
          en: 'Who is most likely to leave with a story they can’t tell parents?',
          fa: 'کی از همه بیشتر احتمال دارد با داستانی برود که به والدین نگوید؟',
        },
      },
      {
        id: 'ms79',
        text: {
          en: 'Who is most likely to have the hottest group-chat screenshot?',
          fa: 'کی از همه بیشتر احتمال دارد داغ‌ترین اسکرین‌شات گروه چت را داشته باشد؟',
        },
      },
      {
        id: 'ms80',
        text: {
          en: 'Who is most likely to make tonight legendary for the wrong reasons?',
          fa: 'کی از همه بیشتر احتمال دارد امشب را به دلایل غلط افسانه‌ای کند؟',
        },
      },
    ],
  },
]

export function getLikelyPrompts(mode: LikelyMode, heat: LikelyHeat): LikelyPrompt[] {
  return (
    LIKELY_PACKS.find((p) => p.mode === mode && p.heat === heat)?.prompts ??
    LIKELY_PACKS[0]!.prompts
  )
}

export function countLikelyPrompts(mode: LikelyMode, heat: LikelyHeat): number {
  return getLikelyPrompts(mode, heat).length
}
