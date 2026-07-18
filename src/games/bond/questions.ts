import type { Locale } from '../../store/prefs'

export interface BondQuestion {
  id: string
  prompt: Record<Locale, string>
  /** Subject picks one; friends guess which. */
  choices: Record<Locale, [string, string, string, string]>
}

export interface BondPack {
  id: string
  questions: BondQuestion[]
}

/**
 * Large bilingual question dictionaries for Know You.
 * ~80 per pack so several nights rarely repeat with freshPick.
 */
export const BOND_PACKS: BondPack[] = [
  {
    id: 'friends',
    questions: [
      {
        id: 'f1',
        prompt: {
          en: 'Ideal Friday night?',
          fa: 'جمعهٔ ایده‌آل؟',
        },
        choices: {
          en: ['Stay in', 'Big night out', 'Small hang', 'Solo adventure'],
          fa: ['خانه', 'بیرون شلوغ', 'دورهمی کوچک', 'ماجراجویی تنهایی'],
        },
      },
      {
        id: 'f2',
        prompt: {
          en: 'Coffee order personality?',
          fa: 'شخصیت سفارش قهوه؟',
        },
        choices: {
          en: ['Black / simple', 'Sweet latte', 'Whatever’s free', 'Tea, actually'],
          fa: ['ساده / تلخ', 'لاته شیرین', 'هرچی رایگان', 'در اصل چای'],
        },
      },
      {
        id: 'f3',
        prompt: {
          en: 'In a group photo they are…',
          fa: 'تو عکس گروهی معمولاً…',
        },
        choices: {
          en: ['Center stage', 'Making a face', 'Half out of frame', 'Holding the camera'],
          fa: ['وسط کادر', 'شکلک درمیاره', 'نصفش بیرون', 'دوربین دستشه'],
        },
      },
      {
        id: 'f4',
        prompt: {
          en: 'Text reply speed?',
          fa: 'سرعت جواب پیام؟',
        },
        choices: {
          en: ['Instant', 'Within an hour', 'Same day… maybe', 'Seen 3 days ago'],
          fa: ['فوری', 'تا یک ساعت', 'همون روز… شاید', 'سین ۳ روز پیش'],
        },
      },
      {
        id: 'f5',
        prompt: {
          en: 'Preferred travel style?',
          fa: 'سبک سفر مورد علاقه؟',
        },
        choices: {
          en: ['Plan every hour', 'Loose itinerary', 'Wing it', 'Staycation'],
          fa: ['برنامه‌ریزی کامل', 'برنامه شل', 'بدون برنامه', 'سفر خانگی'],
        },
      },
      {
        id: 'f6',
        prompt: {
          en: 'Most likely snack at 1am?',
          fa: 'احتمال بیشتر برای خوراکی ۱ شب؟',
        },
        choices: {
          en: ['Chips', 'Leftovers', 'Ice cream', 'Nothing — asleep'],
          fa: ['چیپس', 'غذای مونده', 'بستنی', 'هیچی — خواب'],
        },
      },
      {
        id: 'f7',
        prompt: {
          en: 'How do they handle being wrong?',
          fa: 'وقتی اشتباه می‌کنند؟',
        },
        choices: {
          en: ['Admit fast', 'Joke it off', 'Debate forever', 'Change topic'],
          fa: ['زود قبول', 'با شوخی رد', 'تا ابد بحث', 'عوض کردن موضوع'],
        },
      },
      {
        id: 'f8',
        prompt: {
          en: 'Superpower they’d pick?',
          fa: 'قدرت فوق‌العاده‌ای که انتخاب می‌کنند؟',
        },
        choices: {
          en: ['Invisibility', 'Flying', 'Mind reading', 'Pause time'],
          fa: ['نامرئی', 'پرواز', 'ذهن‌خوانی', 'توقف زمان'],
        },
      },
      {
        id: 'f9',
        prompt: {
          en: 'Karaoke song energy?',
          fa: 'انرژی آهنگ کارائوکه؟',
        },
        choices: {
          en: ['Power ballad', 'Rap verse', 'Chaotic meme song', 'Refuse to sing'],
          fa: ['بالاد قوی', 'رپ', 'آهنگ میم آشوب', 'اصلاً نمی‌خونه'],
        },
      },
      {
        id: 'f10',
        prompt: {
          en: 'Phone battery at end of day?',
          fa: 'باتری گوشی آخر شب؟',
        },
        choices: {
          en: ['Above 50%', 'Around 20%', 'Under 5%', 'Already dead'],
          fa: ['بالای ۵۰٪', 'حدود ۲۰٪', 'زیر ۵٪', 'از قبل مرده'],
        },
      },
      {
        id: 'f11',
        prompt: {
          en: 'If they won a small lottery…',
          fa: 'اگر لاتاری کوچیک ببرند…',
        },
        choices: {
          en: ['Save it', 'Treat friends', 'Upgrade gear', 'Disappear for a week'],
          fa: ['پس‌انداز', 'خرج دوستا', 'ارتقای وسیله', 'یک هفته غیب'],
        },
      },
      {
        id: 'f12',
        prompt: {
          en: 'Morning person?',
          fa: 'آدم صبح؟',
        },
        choices: {
          en: ['Up with the sun', 'Functional by 10', 'Night owl forever', 'Depends on coffee'],
          fa: ['با طلوع بیدار', 'تا ۱۰ اوکی', 'شب‌زنده‌دار', 'بستگی به قهوه'],
        },
      },
      {
        id: 'f13',
        prompt: {
          en: 'Favorite seat in a café?',
          fa: 'صندلی محبوب در کافه؟',
        },
        choices: {
          en: ['By the window', 'Hidden corner', 'Center table', 'Wherever’s free'],
          fa: ['کنار پنجره', 'گوشه پنهان', 'میز وسط', 'هر جا خالیه'],
        },
      },
      {
        id: 'f14',
        prompt: {
          en: 'How do they give advice?',
          fa: 'چطور نصیحت می‌کنند؟',
        },
        choices: {
          en: ['Direct', 'Soft & careful', 'Through memes', 'They listen more'],
          fa: ['مستقیم', 'نرم و محتاط', 'با میم', 'بیشتر گوش می‌دن'],
        },
      },
      {
        id: 'f15',
        prompt: {
          en: 'Movie night role?',
          fa: 'نقش شب فیلم؟',
        },
        choices: {
          en: ['Picks the movie', 'Brings snacks', 'Talks through it', 'Falls asleep'],
          fa: ['انتخاب فیلم', 'آوردن خوراکی', 'وسط حرف می‌زنه', 'می‌خوابه'],
        },
      },
      {
        id: 'f16',
        prompt: {
          en: 'Most used emoji vibe?',
          fa: 'حال‌وهوای ایموجی پراستفاده؟',
        },
        choices: {
          en: ['😂', '💀', '❤️', '🔥'],
          fa: ['😂', '💀', '❤️', '🔥'],
        },
      },
      {
        id: 'f17',
        prompt: {
          en: 'When plans get canceled…',
          fa: 'وقتی برنامه کنسل می‌شه…',
        },
        choices: {
          en: ['Relieved', 'Slightly offended', 'Already in bed', 'Suggests backup'],
          fa: ['راحت شد', 'یکم دلخور', 'از قبل تو تخت', 'جایگزین پیشنهاد می‌ده'],
        },
      },
      {
        id: 'f18',
        prompt: {
          en: 'Shopping style?',
          fa: 'سبک خرید؟',
        },
        choices: {
          en: ['In and out', 'Browse forever', 'Online only', 'Needs a friend'],
          fa: ['ورود و خروج سریع', 'تا ابد می‌چرخه', 'فقط آنلاین', 'به دوست نیاز داره'],
        },
      },
      {
        id: 'f19',
        prompt: {
          en: 'How competitive are they?',
          fa: 'چقدر رقابتی‌اند؟',
        },
        choices: {
          en: ['Chill', 'Quietly intense', 'Trash talk king', 'Only at board games'],
          fa: ['آروم', 'ساکت ولی جدی', 'پادشاه تیکه', 'فقط بازی رومیزی'],
        },
      },
      {
        id: 'f20',
        prompt: {
          en: 'Favorite weather?',
          fa: 'هوای مورد علاقه؟',
        },
        choices: {
          en: ['Sunny', 'Rainy', 'Cold & crisp', 'Doesn’t notice'],
          fa: ['آفتابی', 'بارانی', 'سرد و تیز', 'متوجه نمی‌شه'],
        },
      },
      {
        id: 'f21',
        prompt: {
          en: 'At a buffet they…',
          fa: 'تو بوفه معمولاً…',
        },
        choices: {
          en: ['One careful plate', 'Tower of food', 'Desserts first', 'Judges others’ plates'],
          fa: ['یک بشقاب محتاط', 'برج غذا', 'اول دسر', 'بشقاب بقیه را قضاوت'],
        },
      },
      {
        id: 'f22',
        prompt: {
          en: 'How do they tell stories?',
          fa: 'چطور داستان تعریف می‌کنند؟',
        },
        choices: {
          en: ['Short & punchy', 'Long scenic route', 'Gets distracted', 'Needs props'],
          fa: ['کوتاه و کوبنده', 'راه طولانی', 'حواس‌پرت می‌شه', 'به وسیله نیاز داره'],
        },
      },
      {
        id: 'f23',
        prompt: {
          en: 'Fitness energy?',
          fa: 'انرژی ورزش؟',
        },
        choices: {
          en: ['Gym rat', 'Walks count', 'Yoga/stretch', 'Couch is cardio'],
          fa: ['باشگاهی', 'پیاده‌روی کافیه', 'یوگا/کشش', 'مبل کاردیوئه'],
        },
      },
      {
        id: 'f24',
        prompt: {
          en: 'When they cook…',
          fa: 'وقتی آشپزی می‌کنند…',
        },
        choices: {
          en: ['Follows recipe', 'Improvises chaos', 'Orders takeout', 'Makes one specialty'],
          fa: ['دستور را رعایت', 'آشوب بداهه', 'بیرون سفارش', 'یک تخصص دارد'],
        },
      },
      {
        id: 'f25',
        prompt: {
          en: 'Social battery after a party?',
          fa: 'باتری اجتماعی بعد مهمانی؟',
        },
        choices: {
          en: ['Still buzzing', 'Needs alone time', 'Sleeps 12 hours', 'Plans the next one'],
          fa: ['هنوز پرانرژی', 'به تنهایی نیاز', '۱۲ ساعت خواب', 'بعدی را برنامه‌ریزی'],
        },
      },
      {
        id: 'f26',
        prompt: {
          en: 'Favorite app category?',
          fa: 'دسته اپ مورد علاقه؟',
        },
        choices: {
          en: ['Social', 'Games', 'Productivity', 'Food delivery'],
          fa: ['اجتماعی', 'بازی', 'بهره‌وری', 'سفارش غذا'],
        },
      },
      {
        id: 'f27',
        prompt: {
          en: 'How do they apologize?',
          fa: 'چطور عذرخواهی می‌کنند؟',
        },
        choices: {
          en: ['Quick & clear', 'With a gift', 'With a joke', 'Takes forever'],
          fa: ['سریع و واضح', 'با هدیه', 'با شوخی', 'خیلی طول می‌کشه'],
        },
      },
      {
        id: 'f28',
        prompt: {
          en: 'In traffic they…',
          fa: 'تو ترافیک…',
        },
        choices: {
          en: ['Zen playlist', 'Rage quietly', 'Narrate everything', 'Fall asleep as passenger'],
          fa: ['پلی‌لیست ذن', 'ساکت عصبانی', 'همه‌چیز تعریف', 'به عنوان مسافر خواب'],
        },
      },
      {
        id: 'f29',
        prompt: {
          en: 'Gift-giving style?',
          fa: 'سبک هدیه دادن؟',
        },
        choices: {
          en: ['Thoughtful & personal', 'Practical', 'Last-minute genius', 'Experiences over things'],
          fa: ['فکرشده و شخصی', 'کاربردی', 'آخرین لحظه نابغه', 'تجربه بهتر از وسیله'],
        },
      },
      {
        id: 'f30',
        prompt: {
          en: 'Most likely browser tabs?',
          fa: 'احتمال بیشتر برای تب‌های مرورگر؟',
        },
        choices: {
          en: ['5 tidy ones', '47 chaos tabs', 'One forever tab', 'Doesn’t close anything'],
          fa: ['۵ تا مرتب', '۴۷ تب آشوب', 'یک تب ابدی', 'هیچی نمی‌بنده'],
        },
      },
      {
        id: 'f31',
        prompt: {
          en: 'How do they handle spoilers?',
          fa: 'با اسپویلر چطور؟',
        },
        choices: {
          en: ['Avoid at all costs', 'Doesn’t care', 'Looks them up', 'Gets dramatic'],
          fa: ['به هر قیمت پرهیز', 'اهمیت نمی‌ده', 'جستجو می‌کنه', 'دراماتیک می‌شه'],
        },
      },
      {
        id: 'f32',
        prompt: {
          en: 'Favorite pizza topping vibe?',
          fa: 'حال‌وهوای تاپینگ پیتزا؟',
        },
        choices: {
          en: ['Classic cheese', 'Loaded everything', 'Weird combo', 'No pineapple forever'],
          fa: ['پنیر کلاسیک', 'همه‌چیز پر', 'ترکیب عجیب', 'هیچ‌وقت آناناس'],
        },
      },
      {
        id: 'f33',
        prompt: {
          en: 'At the airport they…',
          fa: 'تو فرودگاه…',
        },
        choices: {
          en: ['Early & calm', 'Sprinting to gate', 'Snack tour', 'Lost in duty-free'],
          fa: ['زود و آروم', 'دویدن به گیت', 'تور خوراکی', 'گم در دیوتی‌فری'],
        },
      },
      {
        id: 'f34',
        prompt: {
          en: 'How sentimental are they?',
          fa: 'چقدر احساساتی‌اند؟',
        },
        choices: {
          en: ['Keeps everything', 'Keeps memories only', 'Throws out fast', 'Cries at ads'],
          fa: ['همه‌چیز نگه می‌داره', 'فقط خاطره', 'زود دور می‌ریزه', 'برای تبلیغ گریه'],
        },
      },
      {
        id: 'f35',
        prompt: {
          en: 'Group chat role?',
          fa: 'نقش تو گروه چت؟',
        },
        choices: {
          en: ['Starter of chaos', 'Silent reader', 'Meme supplier', 'Organizer'],
          fa: ['شروع‌کننده آشوب', 'خواننده ساکت', 'تأمین‌کننده میم', 'سازمان‌دهنده'],
        },
      },
      {
        id: 'f36',
        prompt: {
          en: 'Favorite season?',
          fa: 'فصل مورد علاقه؟',
        },
        choices: {
          en: ['Spring', 'Summer', 'Fall', 'Winter'],
          fa: ['بهار', 'تابستان', 'پاییز', 'زمستان'],
        },
      },
      {
        id: 'f37',
        prompt: {
          en: 'When learning something new…',
          fa: 'وقتی چیز تازه یاد می‌گیرند…',
        },
        choices: {
          en: ['Tutorial spiral', 'Jump in messy', 'Ask a friend', 'Give up cute'],
          fa: ['گرداب آموزش', 'آشوب‌وار شیرجه', 'از دوست می‌پرسه', 'بامزه تسلیم'],
        },
      },
      {
        id: 'f38',
        prompt: {
          en: 'Most likely pet?',
          fa: 'احتمال بیشتر حیوان خانگی؟',
        },
        choices: {
          en: ['Dog', 'Cat', 'Plant “pet”', 'None — freedom'],
          fa: ['سگ', 'گربه', 'گیاه «پت»', 'هیچی — آزادی'],
        },
      },
      {
        id: 'f39',
        prompt: {
          en: 'How do they dance?',
          fa: 'چطور می‌رقصند؟',
        },
        choices: {
          en: ['Main character', 'Subtle sway', 'Only when forced', 'Chaos limbs'],
          fa: ['شخصیت اصلی', 'تاب نرم', 'فقط با اجبار', 'اعضای آشوب'],
        },
      },
      {
        id: 'f40',
        prompt: {
          en: 'Favorite drink order?',
          fa: 'سفارش نوشیدنی مورد علاقه؟',
        },
        choices: {
          en: ['Water always', 'Soda', 'Fancy mocktail', 'Whatever you get'],
          fa: ['همیشه آب', 'سودا', 'موکتل شیک', 'هرچی تو بگیری'],
        },
      },
      {
        id: 'f41',
        prompt: {
          en: 'In a museum they…',
          fa: 'تو موزه…',
        },
        choices: {
          en: ['Read every plaque', 'Skip to gift shop', 'Take artsy photos', 'Sit and people-watch'],
          fa: ['هر پلاک را می‌خونه', 'می‌ره فروشگاه', 'عکس هنری', 'می‌نشینه مردم‌نگری'],
        },
      },
      {
        id: 'f42',
        prompt: {
          en: 'How clean is their room usually?',
          fa: 'اتاقشان معمولاً چقدر تمیزه؟',
        },
        choices: {
          en: ['Spotless', 'Lived-in neat', 'Creative mess', 'Do not enter'],
          fa: ['بی‌نقص', 'مرتب زندگی‌شده', 'آشوب خلاق', 'وارد نشو'],
        },
      },
      {
        id: 'f43',
        prompt: {
          en: 'Favorite kind of humor?',
          fa: 'نوع طنز مورد علاقه؟',
        },
        choices: {
          en: ['Dry', 'Chaotic loud', 'Wholesome', 'Dark'],
          fa: ['خشک', 'بلند آشوب', 'سالم و گرم', 'سیاه'],
        },
      },
      {
        id: 'f44',
        prompt: {
          en: 'When meeting new people…',
          fa: 'وقتی آدم جدید می‌بینند…',
        },
        choices: {
          en: ['Instant friend', 'Warm but shy', 'Observer first', 'Needs an intro'],
          fa: ['دوست فوری', 'گرم ولی خجالتی', 'اول ناظر', 'به معرفی نیاز'],
        },
      },
      {
        id: 'f45',
        prompt: {
          en: 'Most likely hobby rabbit hole?',
          fa: 'احتمال بیشتر سوراخ خرگوش سرگرمی؟',
        },
        choices: {
          en: ['Cooking', 'Gaming', 'Fitness', 'Random Wikipedia'],
          fa: ['آشپزی', 'گیمینگ', 'ورزش', 'ویکی‌پدیای رندم'],
        },
      },
      {
        id: 'f46',
        prompt: {
          en: 'How do they wake others up?',
          fa: 'چطور بقیه را بیدار می‌کنند؟',
        },
        choices: {
          en: ['Gentle', 'Loud chaos', 'Food bait', 'They don’t — they wait'],
          fa: ['ملایم', 'آشوب بلند', 'طعمه غذا', 'نمی‌کنند — صبر'],
        },
      },
      {
        id: 'f47',
        prompt: {
          en: 'Favorite holiday vibe?',
          fa: 'حال‌وهوای تعطیلات مورد علاقه؟',
        },
        choices: {
          en: ['Family big table', 'Trip with friends', 'Quiet reset', 'Costume chaos'],
          fa: ['میز بزرگ خانواده', 'سفر با دوستا', 'ریست آرام', 'آشوب لباس'],
        },
      },
      {
        id: 'f48',
        prompt: {
          en: 'When the Wi-Fi dies…',
          fa: 'وقتی وای‌فای می‌میرد…',
        },
        choices: {
          en: ['Panic', 'Goes outside', 'Starts a conversation', 'Doesn’t notice for an hour'],
          fa: ['پانیک', 'می‌ره بیرون', 'حرف شروع می‌کنه', 'یک ساعت نمی‌فهمه'],
        },
      },
      {
        id: 'f49',
        prompt: {
          en: 'Most likely secret talent?',
          fa: 'احتمال بیشتر استعداد مخفی؟',
        },
        choices: {
          en: ['Cooking', 'Drawing', 'Sports', 'Impressions'],
          fa: ['آشپزی', 'نقاشی', 'ورزش', 'تقلید صدا'],
        },
      },
      {
        id: 'f50',
        prompt: {
          en: 'How do they pack for a trip?',
          fa: 'چطور برای سفر بسته می‌بندند؟',
        },
        choices: {
          en: ['Minimal', 'Overpacks', 'Night-before scramble', 'Color-coded'],
          fa: ['مینیمال', 'زیاد می‌بنده', 'شب قبل آشوب', 'رنگ‌بندی‌شده'],
        },
      },
      {
        id: 'f51',
        prompt: {
          en: 'Favorite ice cream role?',
          fa: 'نقش بستنی مورد علاقه؟',
        },
        choices: {
          en: ['Classic vanilla', 'Weird flavor hunter', 'Shares everything', 'Guards their scoop'],
          fa: ['وانیل کلاسیک', 'شکارچی طعم عجیب', 'همه‌چیز شریک', 'اسکوپ را نگهبان'],
        },
      },
      {
        id: 'f52',
        prompt: {
          en: 'In a debate they…',
          fa: 'تو بحث…',
        },
        choices: {
          en: ['Calm facts', 'Passionate volume', 'Changes side for fun', 'Mediates'],
          fa: ['واقعیت آرام', 'بلند پرشور', 'برای تفریح طرف عوض', 'میانجی'],
        },
      },
      {
        id: 'f53',
        prompt: {
          en: 'Most likely sleep schedule?',
          fa: 'احتمال بیشتر برنامه خواب؟',
        },
        choices: {
          en: ['Early to bed', '2am artist', 'Naps forever', 'Inconsistent chaos'],
          fa: ['زود می‌خوابه', 'هنرمند ۲ شب', 'چرت ابدی', 'آشوب نامنظم'],
        },
      },
      {
        id: 'f54',
        prompt: {
          en: 'How do they handle compliments?',
          fa: 'با تعریف چطور؟',
        },
        choices: {
          en: ['Says thanks', 'Deflects', 'Compliments back harder', 'Doesn’t believe it'],
          fa: ['تشکر می‌کنه', 'رد می‌کنه', 'سخت‌تر تعریف برمی‌گردونه', 'باور نمی‌کنه'],
        },
      },
      {
        id: 'f55',
        prompt: {
          en: 'Favorite board game energy?',
          fa: 'انرژی بازی رومیزی؟',
        },
        choices: {
          en: ['Strategy brain', 'Party games only', 'Lucky chaos', 'Rules lawyer'],
          fa: ['مغز استراتژی', 'فقط پارتی', 'آشوب شانس', 'وکیل قوانین'],
        },
      },
      {
        id: 'f56',
        prompt: {
          en: 'When they’re late…',
          fa: 'وقتی دیر می‌کنند…',
        },
        choices: {
          en: ['Honest text', 'Creative excuse', 'Silent arrival', 'Blames traffic always'],
          fa: ['پیام صادق', 'بهانه خلاق', 'ورود ساکت', 'همیشه ترافیک'],
        },
      },
      {
        id: 'f57',
        prompt: {
          en: 'Most likely playlist mood?',
          fa: 'حال‌وهوای پلی‌لیست محتمل؟',
        },
        choices: {
          en: ['Sad bangers', 'Upbeat chaos', 'Lo-fi focus', 'Nostalgia mix'],
          fa: ['آهنگ غمگین قوی', 'آشوب شاد', 'لو‌فای تمرکز', 'میکس نوستالژی'],
        },
      },
      {
        id: 'f58',
        prompt: {
          en: 'How do they treat leftovers?',
          fa: 'با غذای مونده چطور؟',
        },
        choices: {
          en: ['Eats next day', 'Forgets in fridge', 'Creates new dish', 'Gives to friends'],
          fa: ['فردا می‌خوره', 'تو یخچال فراموش', 'غذای تازه می‌سازه', 'به دوستا می‌ده'],
        },
      },
      {
        id: 'f59',
        prompt: {
          en: 'Favorite seat on a plane?',
          fa: 'صندلی محبوب هواپیما؟',
        },
        choices: {
          en: ['Window', 'Aisle', 'Exit row stretch', 'Doesn’t care'],
          fa: ['پنجره', 'راهرو', 'خروجی کشیده', 'اهمیت نمی‌ده'],
        },
      },
      {
        id: 'f60',
        prompt: {
          en: 'When someone cries…',
          fa: 'وقتی کسی گریه می‌کند…',
        },
        choices: {
          en: ['Hugs first', 'Practical help', 'Awkward but kind', 'Joins the tears'],
          fa: ['اول بغل', 'کمک عملی', 'دست‌وپاچلفتی مهربان', 'باهاشون گریه'],
        },
      },
      {
        id: 'f61',
        prompt: {
          en: 'Most likely weekend project?',
          fa: 'احتمال بیشتر پروژه آخر هفته؟',
        },
        choices: {
          en: ['Deep clean', 'New hobby', 'Binge series', 'Sleep catch-up'],
          fa: ['تمیزکاری عمیق', 'سرگرمی تازه', 'ماراتن سریال', 'جبران خواب'],
        },
      },
      {
        id: 'f62',
        prompt: {
          en: 'How spicy do they like food?',
          fa: 'غذا را چقدر تند دوست دارند؟',
        },
        choices: {
          en: ['Mild forever', 'Medium brave', 'Pain is flavor', 'Regrets every time'],
          fa: ['همیشه ملایم', 'متوسط شجاع', 'درد یعنی طعم', 'هر بار پشیمون'],
        },
      },
      {
        id: 'f63',
        prompt: {
          en: 'Favorite kind of party?',
          fa: 'نوع مهمانی مورد علاقه؟',
        },
        choices: {
          en: ['House hang', 'Club night', 'Dinner long talk', 'Costume theme'],
          fa: ['دورهمی خونه', 'شب کلاب', 'شام حرف طولانی', 'تم لباس'],
        },
      },
      {
        id: 'f64',
        prompt: {
          en: 'How do they take photos?',
          fa: 'چطور عکس می‌گیرند؟',
        },
        choices: {
          en: ['Candid king', 'Pose director', 'Selfie only', 'Rarely — lives it'],
          fa: ['پادشاه کاندید', 'کارگردان ژست', 'فقط سلفی', 'به‌ندرت — زندگی می‌کنه'],
        },
      },
      {
        id: 'f65',
        prompt: {
          en: 'Most likely allergy story?',
          fa: 'احتمال بیشتر داستان آلرژی؟',
        },
        choices: {
          en: ['Real struggle', 'Mild annoyance', 'Dramatic sneeze', 'None — lucky'],
          fa: ['درگیر واقعی', 'آزار ملایم', 'عطسه دراماتیک', 'هیچی — خوش‌شانس'],
        },
      },
      {
        id: 'f66',
        prompt: {
          en: 'When they lose something…',
          fa: 'وقتی چیزی گم می‌کنند…',
        },
        choices: {
          en: ['Retrace calmly', 'Blame the room', 'Buy another', 'Ask everyone 5 times'],
          fa: ['آروم ردگیری', 'اتاق را مقصر', 'یکی دیگه می‌خره', '۵ بار از همه می‌پرسه'],
        },
      },
      {
        id: 'f67',
        prompt: {
          en: 'Favorite sandwich energy?',
          fa: 'انرژی ساندویچ مورد علاقه؟',
        },
        choices: {
          en: ['Simple classic', 'Overstuffed', 'Gourmet attempt', 'Whatever’s in fridge'],
          fa: ['کلاسیک ساده', 'پر و شلوغ', 'تلاش گورمه', 'هرچی تو یخچاله'],
        },
      },
      {
        id: 'f68',
        prompt: {
          en: 'How do they handle horror movies?',
          fa: 'با فیلم ترسناک چطور؟',
        },
        choices: {
          en: ['Loves them', 'Watches through fingers', 'Needs company', 'Absolutely not'],
          fa: ['عاشقشونه', 'از لای انگشت', 'به همراه نیاز', 'اصلاً نه'],
        },
      },
      {
        id: 'f69',
        prompt: {
          en: 'Most likely childhood dream job?',
          fa: 'احتمال بیشتر شغل رؤیایی کودکی؟',
        },
        choices: {
          en: ['Astronaut', 'Singer/actor', 'Athlete', 'Something wholesome'],
          fa: ['فضانورد', 'خواننده/بازیگر', 'ورزشکار', 'چیزی گرم و خوب'],
        },
      },
      {
        id: 'f70',
        prompt: {
          en: 'When the check arrives…',
          fa: 'وقتی صورت‌حساب می‌آید…',
        },
        choices: {
          en: ['Splits fair', 'Treats everyone', 'Calculates precisely', 'Forgets wallet comedy'],
          fa: ['تقسیم عادلانه', 'خرج همه', 'دقیق حساب', 'کمدی فراموشی کیف'],
        },
      },
      {
        id: 'f71',
        prompt: {
          en: 'Favorite kind of shoes?',
          fa: 'نوع کفش مورد علاقه؟',
        },
        choices: {
          en: ['Sneakers always', 'Cute formal', 'Comfort slides', 'Whatever’s clean'],
          fa: ['همیشه اسنیکر', 'رسمی بامزه', 'دمپایی راحت', 'هرچی تمیزه'],
        },
      },
      {
        id: 'f72',
        prompt: {
          en: 'How do they react to bugs?',
          fa: 'با حشره چطور؟',
        },
        choices: {
          en: ['Calm relocate', 'Scream comedy', 'Warrior mode', 'Leaves the room'],
          fa: ['آروم جابه‌جا', 'جیغ کمدی', 'حالت جنگجو', 'از اتاق می‌ره'],
        },
      },
      {
        id: 'f73',
        prompt: {
          en: 'Most likely study/work spot?',
          fa: 'احتمال بیشتر جای کار/درس؟',
        },
        choices: {
          en: ['Desk at home', 'Café ambience', 'Bed laptop', 'Library silence'],
          fa: ['میز خونه', 'حال کافه', 'لپ‌تاپ تخت', 'سکوت کتابخانه'],
        },
      },
      {
        id: 'f74',
        prompt: {
          en: 'When they get good news…',
          fa: 'وقتی خبر خوب می‌شنوند…',
        },
        choices: {
          en: ['Quiet smile', 'Screams joy', 'Tells everyone', 'Celebrates with food'],
          fa: ['لبخند ساکت', 'جیغ شادی', 'به همه می‌گه', 'با غذا جشن'],
        },
      },
      {
        id: 'f75',
        prompt: {
          en: 'Favorite cereal/breakfast vibe?',
          fa: 'حال‌وهوای صبحانه؟',
        },
        choices: {
          en: ['Sweet cereal', 'Eggs & savory', 'Coffee only', 'Skips often'],
          fa: ['غلات شیرین', 'تخم‌مرغ شور', 'فقط قهوه', 'اغلب رد می‌کنه'],
        },
      },
      {
        id: 'f76',
        prompt: {
          en: 'How do they navigate?',
          fa: 'چطور مسیر پیدا می‌کنند؟',
        },
        choices: {
          en: ['GPS slave', 'Memory map', 'Asks strangers', 'Gets fashionably lost'],
          fa: ['برده جی‌پی‌اس', 'نقشه حافظه', 'از غریبه می‌پرسه', 'شیک گم می‌شه'],
        },
      },
      {
        id: 'f77',
        prompt: {
          en: 'Most likely thrift/find style?',
          fa: 'سبک پیدا کردن دست‌دوم؟',
        },
        choices: {
          en: ['Treasure hunter', 'Brand only', 'Borrows forever', 'Doesn’t care'],
          fa: ['شکارچی گنج', 'فقط برند', 'تا ابد قرض', 'اهمیت نمی‌ده'],
        },
      },
      {
        id: 'f78',
        prompt: {
          en: 'When watching sports…',
          fa: 'وقتی ورزش می‌بینند…',
        },
        choices: {
          en: ['Super fan', 'Casual vibes', 'Only Olympics', 'Asks who’s winning'],
          fa: ['طرفدار پروپاقرص', 'حال معمولی', 'فقط المپیک', 'می‌پرسه کی برده'],
        },
      },
      {
        id: 'f79',
        prompt: {
          en: 'Favorite rainy day activity?',
          fa: 'فعالیت روز بارانی مورد علاقه؟',
        },
        choices: {
          en: ['Movies & blanket', 'Cook something', 'Walk in rain', 'Catch up sleep'],
          fa: ['فیلم و پتو', 'چیزی بپزه', 'پیاده زیر باران', 'خواب جبران'],
        },
      },
      {
        id: 'f80',
        prompt: {
          en: 'How do they end a night out?',
          fa: 'چطور شب بیرون را تمام می‌کنند؟',
        },
        choices: {
          en: ['One last stop', 'Home ASAP', 'Food mission', 'Sunrise accidental'],
          fa: ['یک توقف آخر', 'زود خونه', 'ماموریت غذا', 'طلوع تصادفی'],
        },
      },
    ],
  },
  {
    id: 'couple',
    questions: [
      {
        id: 'c1',
        prompt: {
          en: 'Love language they lead with?',
          fa: 'زبان عشقی اصلیشون؟',
        },
        choices: {
          en: ['Words', 'Time together', 'Gifts', 'Acts of service'],
          fa: ['حرف', 'وقت با هم', 'هدیه', 'کمک کردن'],
        },
      },
      {
        id: 'c2',
        prompt: {
          en: 'Ideal date vibe?',
          fa: 'حال‌وهوای قرار ایده‌آل؟',
        },
        choices: {
          en: ['Fancy dinner', 'Walk + snacks', 'Home movie', 'Spontaneous trip'],
          fa: ['شام شیک', 'پیاده‌روی + خوراکی', 'فیلم خونه', 'سفر آنی'],
        },
      },
      {
        id: 'c3',
        prompt: {
          en: 'Who texts “on my way” first?',
          fa: 'کی اول می‌گه «راه افتادم»؟',
        },
        choices: {
          en: ['Always them', 'Usually them', 'Rarely them', 'Never — they just appear'],
          fa: ['همیشه اونا', 'معمولاً اونا', 'به‌ندرت', 'هیچ‌وقت — ظاهر می‌شن'],
        },
      },
      {
        id: 'c4',
        prompt: {
          en: 'Movie genre they pretend to hate but love?',
          fa: 'ژانری که تظاهر می‌کنند بدشان می‌آید ولی عاشقش‌اند؟',
        },
        choices: {
          en: ['Rom-coms', 'Horror', 'Reality TV docs', 'Animated films'],
          fa: ['کمدی رمانتیک', 'ترسناک', 'مستند ریئلیتی', 'انیمیشن'],
        },
      },
      {
        id: 'c5',
        prompt: {
          en: 'Conflict style?',
          fa: 'سبک بحث؟',
        },
        choices: {
          en: ['Talk it out now', 'Need a cool-down', 'Joke until it softens', 'Write a long message'],
          fa: ['الان حرف بزنیم', 'اول آروم شم', 'با شوخی نرم شه', 'پیام بلند بنویسم'],
        },
      },
      {
        id: 'c6',
        prompt: {
          en: 'Pet name energy?',
          fa: 'انرژی اسم مستعار؟',
        },
        choices: {
          en: ['All the time', 'Only in private', 'Ironic nicknames', 'First name forever'],
          fa: ['همیشه', 'فقط خصوصی', 'لقب طنز', 'همیشه اسم واقعی'],
        },
      },
      {
        id: 'c7',
        prompt: {
          en: 'Who plans the surprises?',
          fa: 'کی سورپرایز رو برنامه‌ریزی می‌کنه؟',
        },
        choices: {
          en: ['Them', 'Their partner', 'Both equally', 'Nobody — chaos'],
          fa: ['خودشون', 'پارتنرشون', 'هر دو مساوی', 'هیچ‌کس — آشوب'],
        },
      },
      {
        id: 'c8',
        prompt: {
          en: 'Shared playlist role?',
          fa: 'نقششون تو پلی‌لیست مشترک؟',
        },
        choices: {
          en: ['Curator', 'Chaos adder', 'Silent liker', 'Never opens it'],
          fa: ['کیوریتور', 'آشوب‌افزا', 'لایک‌کننده ساکت', 'هیچ‌وقت باز نمی‌کنه'],
        },
      },
      {
        id: 'c9',
        prompt: {
          en: 'Breakfast in bed?',
          fa: 'صبحانه روی تخت؟',
        },
        choices: {
          en: ['Dream come true', 'Crumbs nightmare', 'Only on birthdays', 'They’d cook it'],
          fa: ['رؤیا', 'کابوس خرده', 'فقط تولد', 'خودشون می‌پزن'],
        },
      },
      {
        id: 'c10',
        prompt: {
          en: 'Anniversary memory style?',
          fa: 'سبک یادآوری سالگرد؟',
        },
        choices: {
          en: ['Exact dates', 'Approximate season', 'Reminded by calendar', 'Wait, we have one?'],
          fa: ['تاریخ دقیق', 'تقریباً فصل', 'تقویم یادآوری', 'صبر کن، داریم؟'],
        },
      },
      {
        id: 'c11',
        prompt: {
          en: 'PDA comfort level?',
          fa: 'سطح راحتی ابراز علاقه در جمع؟',
        },
        choices: {
          en: ['Very open', 'Hand-holding max', 'Eyes only', 'Save it for home'],
          fa: ['خیلی باز', 'حداکثر دست در دست', 'فقط نگاه', 'بگذار برای خونه'],
        },
      },
      {
        id: 'c12',
        prompt: {
          en: 'If they could teleport for a weekend…',
          fa: 'اگر برای آخر هفته تله‌پورت می‌شدند…',
        },
        choices: {
          en: ['Beach', 'Mountains', 'A city they’ve never seen', 'Straight back to the couch'],
          fa: ['ساحل', 'کوه', 'شهری که ندیده‌اند', 'مستقیم به مبل'],
        },
      },
      {
        id: 'c13',
        prompt: {
          en: 'Who steals the blankets?',
          fa: 'کی پتو را می‌دزدد؟',
        },
        choices: {
          en: ['Definitely them', 'Their partner', 'Both — war', 'They buy two'],
          fa: ['حتماً اونا', 'پارتنرشون', 'هر دو — جنگ', 'دو تا می‌خرن'],
        },
      },
      {
        id: 'c14',
        prompt: {
          en: 'First to say sorry?',
          fa: 'کی اول عذرخواهی می‌کند؟',
        },
        choices: {
          en: ['Usually them', 'Usually partner', 'Depends on ego day', 'They apologize with food'],
          fa: ['معمولاً اونا', 'معمولاً پارتنر', 'بستگی به روز غرور', 'با غذا عذر'],
        },
      },
      {
        id: 'c15',
        prompt: {
          en: 'Couple costume energy?',
          fa: 'انرژی لباس زوج؟',
        },
        choices: {
          en: ['Always yes', 'Only if funny', 'Never ever', 'Matching hoodies count'],
          fa: ['همیشه بله', 'فقط اگر بامزه', 'هیچ‌وقت', 'هودی جفت کافیه'],
        },
      },
      {
        id: 'c16',
        prompt: {
          en: 'Who picks the restaurant?',
          fa: 'کی رستوران را انتخاب می‌کند؟',
        },
        choices: {
          en: ['Them', 'Partner', 'Endless “you choose”', 'Delivery app decides'],
          fa: ['خودشون', 'پارتنر', '«تو انتخاب کن» ابدی', 'اپ سفارش تصمیم'],
        },
      },
      {
        id: 'c17',
        prompt: {
          en: 'Jealousy style?',
          fa: 'سبک حسادت؟',
        },
        choices: {
          en: ['Rare & chill', 'Quiet notice', 'Playful tease', 'Needs reassurance'],
          fa: ['کم و آروم', 'توجه ساکت', 'دست‌انداختن بازی', 'به اطمینان نیاز'],
        },
      },
      {
        id: 'c18',
        prompt: {
          en: 'Who is messier at home?',
          fa: 'کی تو خونه شلوغ‌کارتره؟',
        },
        choices: {
          en: ['Them', 'Partner', 'Equal chaos', 'Secretly both'],
          fa: ['خودشون', 'پارتنر', 'آشوب مساوی', 'هر دو مخفی'],
        },
      },
      {
        id: 'c19',
        prompt: {
          en: 'Best gift from a partner?',
          fa: 'بهترین هدیه از پارتنر؟',
        },
        choices: {
          en: ['Handmade note', 'Experience day', 'Something practical', 'Food surprise'],
          fa: ['یادداشت دست‌ساز', 'روز تجربه', 'چیز کاربردی', 'سورپرایز غذا'],
        },
      },
      {
        id: 'c20',
        prompt: {
          en: 'Who falls asleep during movies?',
          fa: 'کی وسط فیلم می‌خوابد؟',
        },
        choices: {
          en: ['Them', 'Partner', 'Both every time', 'Neither — snack alert'],
          fa: ['خودشون', 'پارتنر', 'هر دو هر بار', 'هیچ‌کدام — خوراکی بیدار'],
        },
      },
      {
        id: 'c21',
        prompt: {
          en: 'Couple trip packing?',
          fa: 'بسته‌بندی سفر زوج؟',
        },
        choices: {
          en: ['Overpacks together', 'Minimal duo', 'One packs for both', 'Forgot charger again'],
          fa: ['با هم زیاد', 'مینیمال دو نفره', 'یکی برای هر دو', 'باز شارژر جا موند'],
        },
      },
      {
        id: 'c22',
        prompt: {
          en: 'Who remembers birthdays better?',
          fa: 'کی تولدها را بهتر یادش می‌ماند؟',
        },
        choices: {
          en: ['Them', 'Partner', 'Shared calendar gods', 'Friends remind both'],
          fa: ['خودشون', 'پارتنر', 'خدایان تقویم مشترک', 'دوستا به هر دو یادآوری'],
        },
      },
      {
        id: 'c23',
        prompt: {
          en: 'Argument soundtrack?',
          fa: 'ساندترک بحث؟',
        },
        choices: {
          en: ['Quiet intensity', 'Passionate volume', 'Silent treatment short', 'Walk + talk later'],
          fa: ['شدت ساکت', 'بلند پرشور', 'سکوت کوتاه', 'پیاده + حرف بعد'],
        },
      },
      {
        id: 'c24',
        prompt: {
          en: 'Who initiates plans?',
          fa: 'کی برنامه را شروع می‌کند؟',
        },
        choices: {
          en: ['Them mostly', 'Partner mostly', '50/50', 'Group chat decides'],
          fa: ['بیشتر اونا', 'بیشتر پارتنر', '۵۰/۵۰', 'گروه چت تصمیم'],
        },
      },
      {
        id: 'c25',
        prompt: {
          en: 'Couch cuddle style?',
          fa: 'سبک بغل روی مبل؟',
        },
        choices: {
          en: ['Full octopus', 'Shoulder lean', 'Feet war', 'Separate blankets peace'],
          fa: ['هشت‌پای کامل', 'تکیه شانه', 'جنگ پا', 'صلح پتو جدا'],
        },
      },
      {
        id: 'c26',
        prompt: {
          en: 'Who is the better cook?',
          fa: 'کی آشپز بهتری است؟',
        },
        choices: {
          en: ['Them', 'Partner', 'Takeout champions', 'They cook together chaos'],
          fa: ['خودشون', 'پارتنر', 'قهرمان بیرون‌بر', 'با هم آشوب می‌پزن'],
        },
      },
      {
        id: 'c27',
        prompt: {
          en: 'Flirt style in public?',
          fa: 'سبک فلرت در جمع؟',
        },
        choices: {
          en: ['Whisper jokes', 'Obvious compliments', 'Subtle looks', 'Acts normal — secretly soft'],
          fa: ['جوک نجوا', 'تعریف واضح', 'نگاه ظریف', 'عادی — مخفی نرم'],
        },
      },
      {
        id: 'c28',
        prompt: {
          en: 'Who handles bugs?',
          fa: 'کی حشره را جمع می‌کند؟',
        },
        choices: {
          en: ['Them the hero', 'Partner the hero', 'Both scream', 'Call a friend'],
          fa: ['قهرمان اونا', 'قهرمان پارتنر', 'هر دو جیغ', 'زنگ به دوست'],
        },
      },
      {
        id: 'c29',
        prompt: {
          en: 'Shared savings vibe?',
          fa: 'حال‌وهوای پس‌انداز مشترک؟',
        },
        choices: {
          en: ['Strict budget', 'Fun fund first', 'Separate forever', 'Chaotic receipts'],
          fa: ['بودجه سخت', 'اول صندوق تفریح', 'جدا تا ابد', 'رسید آشوب'],
        },
      },
      {
        id: 'c30',
        prompt: {
          en: 'Who steals fries?',
          fa: 'کی سیب‌زمینی را می‌دزدد؟',
        },
        choices: {
          en: ['Them shamelessly', 'Partner shamelessly', 'Fair trade system', 'Order two always'],
          fa: ['بی‌شرم اونا', 'بی‌شرم پارتنر', 'سیستم مبادله', 'همیشه دو تا'],
        },
      },
      {
        id: 'c31',
        prompt: {
          en: 'Morning-after-date energy?',
          fa: 'انرژی صبح بعد قرار؟',
        },
        choices: {
          en: ['Text immediately', 'Play it cool', 'Send a meme', 'Already planning next'],
          fa: ['فوری پیام', 'خونسرد بازی', 'میم می‌فرسته', 'از قبل برنامه بعد'],
        },
      },
      {
        id: 'c32',
        prompt: {
          en: 'Who is more romantic?',
          fa: 'کی رمانتیک‌تر است؟',
        },
        choices: {
          en: ['Them', 'Partner', 'Equal softies', 'Romance = food'],
          fa: ['خودشون', 'پارتنر', 'نرم مساوی', 'رمانس = غذا'],
        },
      },
      {
        id: 'c33',
        prompt: {
          en: 'Couple workout?',
          fa: 'ورزش زوج؟',
        },
        choices: {
          en: ['Yes gym dates', 'Walks count', 'Never together', 'Competitive chaos'],
          fa: ['بله قرار باشگاه', 'پیاده‌روی کافیه', 'هیچ‌وقت با هم', 'آشوب رقابتی'],
        },
      },
      {
        id: 'c34',
        prompt: {
          en: 'Who loses keys more?',
          fa: 'کی بیشتر کلید گم می‌کند؟',
        },
        choices: {
          en: ['Them', 'Partner', 'Both weekly', 'AirTag couple'],
          fa: ['خودشون', 'پارتنر', 'هر دو هفتگی', 'زوج ایرتگ'],
        },
      },
      {
        id: 'c35',
        prompt: {
          en: 'Best apology method?',
          fa: 'بهترین روش عذرخواهی؟',
        },
        choices: {
          en: ['Honest talk', 'Favorite snack', 'Quality time', 'Funny note'],
          fa: ['حرف صادق', 'خوراکی محبوب', 'وقت با کیفیت', 'یادداشت بامزه'],
        },
      },
      {
        id: 'c36',
        prompt: {
          en: 'Who controls the thermostat?',
          fa: 'کی ترموستات را کنترل می‌کند؟',
        },
        choices: {
          en: ['Them', 'Partner', 'Ongoing cold war', 'Two blankets solution'],
          fa: ['خودشون', 'پارتنر', 'جنگ سرد جاری', 'راه‌حل دو پتو'],
        },
      },
      {
        id: 'c37',
        prompt: {
          en: 'Couple social media?',
          fa: 'شبکه اجتماعی زوج؟',
        },
        choices: {
          en: ['Post together a lot', 'Rare soft posts', 'Private forever', 'One posts, one cringes'],
          fa: ['زیاد با هم پست', 'پست نرم کم', 'خصوصی تا ابد', 'یکی پست یکی کرینج'],
        },
      },
      {
        id: 'c38',
        prompt: {
          en: 'Who is first to adopt a pet idea?',
          fa: 'کی اول ایده حیوان خانگی می‌دهد؟',
        },
        choices: {
          en: ['Them', 'Partner', 'Both instantly', 'Never — travel first'],
          fa: ['خودشون', 'پارتنر', 'هر دو فوری', 'هیچ‌وقت — اول سفر'],
        },
      },
      {
        id: 'c39',
        prompt: {
          en: 'Date night cooking fail…',
          fa: 'شکست آشپزی شب قرار…',
        },
        choices: {
          en: ['Laugh + order in', 'Try again stubborn', 'Blame the recipe', 'Call a parent'],
          fa: ['بخند + سفارش', 'لجباز دوباره', 'دستور را مقصر', 'زنگ به والدین'],
        },
      },
      {
        id: 'c40',
        prompt: {
          en: 'Who remembers song lyrics?',
          fa: 'کی متن آهنگ را یادش می‌ماند؟',
        },
        choices: {
          en: ['Them', 'Partner', 'Wrong lyrics proudly', 'Humming only'],
          fa: ['خودشون', 'پارتنر', 'متن غلط با افتخار', 'فقط زمزمه'],
        },
      },
      {
        id: 'c41',
        prompt: {
          en: 'Long-distance test energy?',
          fa: 'انرژی تست رابطه از راه دور؟',
        },
        choices: {
          en: ['Would crush it', 'Would struggle', 'Needs visits often', 'Not for them'],
          fa: ['عالی پیش می‌برن', 'سخت می‌شه', 'به دیدار زیاد نیاز', 'براشون نیست'],
        },
      },
      {
        id: 'c42',
        prompt: {
          en: 'Who is the planner of big trips?',
          fa: 'کی برنامه‌ریز سفرهای بزرگ است؟',
        },
        choices: {
          en: ['Them spreadsheet', 'Partner vibes', 'Shared chaos doc', 'Travel agent friend'],
          fa: ['اکسل اونا', 'حال پارتنر', 'داک آشوب مشترک', 'دوست آژانس'],
        },
      },
      {
        id: 'c43',
        prompt: {
          en: 'Couple game night?',
          fa: 'شب بازی زوج؟',
        },
        choices: {
          en: ['Co-op forever', 'Competitive menace', 'Party with friends', 'Prefer movies'],
          fa: ['کوآپ تا ابد', 'تهدید رقابتی', 'پارتی با دوستا', 'ترجیح فیلم'],
        },
      },
      {
        id: 'c44',
        prompt: {
          en: 'Who buys the concert tickets?',
          fa: 'کی بلیت کنسرت می‌خرد؟',
        },
        choices: {
          en: ['Them impulse', 'Partner organizer', 'Both refresh page', 'Misses every drop'],
          fa: ['تکانشی اونا', 'سازمان‌ده پارتنر', 'هر دو رفرش', 'هر دراپ از دست'],
        },
      },
      {
        id: 'c45',
        prompt: {
          en: 'Inside joke frequency?',
          fa: 'تکرار جوک داخلی؟',
        },
        choices: {
          en: ['Constant', 'Weekly classics', 'Rare gems', 'Nobody else gets them'],
          fa: ['مدام', 'کلاسیک هفتگی', 'جواهر کم', 'هیچ‌کس نمی‌فهمه'],
        },
      },
      {
        id: 'c46',
        prompt: {
          en: 'Who is softer when sick?',
          fa: 'کی وقتی مریض است نرم‌تر است؟',
        },
        choices: {
          en: ['Them needs care', 'Partner needs care', 'Both dramatic', 'Both stoic'],
          fa: ['اونا مراقبت می‌خوان', 'پارتنر مراقبت', 'هر دو دراماتیک', 'هر دو سرسخت'],
        },
      },
      {
        id: 'c47',
        prompt: {
          en: 'Best “thinking of you” move?',
          fa: 'بهترین حرکت «بهت فکر می‌کردم»؟',
        },
        choices: {
          en: ['Random voice note', 'Snack delivery', 'Meme that fits', 'Show up with coffee'],
          fa: ['ویس رندم', 'ارسال خوراکی', 'میم جور', 'با قهوه ظاهر شدن'],
        },
      },
      {
        id: 'c48',
        prompt: {
          en: 'Who rearranges furniture?',
          fa: 'کی مبلمان را جابه‌جا می‌کند؟',
        },
        choices: {
          en: ['Them suddenly', 'Partner suddenly', 'Together debate', 'Never moves anything'],
          fa: ['ناگهانی اونا', 'ناگهانی پارتنر', 'با هم بحث', 'هیچی حرکت نمی‌ده'],
        },
      },
      {
        id: 'c49',
        prompt: {
          en: 'Couple budget date?',
          fa: 'قرار بودجه محدود؟',
        },
        choices: {
          en: ['Picnic masters', 'Walk + ice cream', 'Home cooking date', 'Free museum day'],
          fa: ['استاد پیک‌نیک', 'پیاده + بستنی', 'قرار آشپزی خونه', 'روز موزه رایگان'],
        },
      },
      {
        id: 'c50',
        prompt: {
          en: 'Who is more likely to cry at weddings?',
          fa: 'کی بیشتر احتمال دارد عروسی گریه کند؟',
        },
        choices: {
          en: ['Them', 'Partner', 'Both wrecked', 'Neither — happy stoics'],
          fa: ['خودشون', 'پارتنر', 'هر دو داغون', 'هیچ‌کدام — خوش سرسخت'],
        },
      },
      {
        id: 'c51',
        prompt: {
          en: 'Shared grocery cart energy?',
          fa: 'انرژی سبد خرید مشترک؟',
        },
        choices: {
          en: ['List strict', 'Impulse snacks', 'Split aisles', 'Argue over brands'],
          fa: ['لیست سخت', 'خوراکی تکانشی', 'راهرو جدا', 'بحث برند'],
        },
      },
      {
        id: 'c52',
        prompt: {
          en: 'Who takes longer to get ready?',
          fa: 'کی بیشتر طول می‌کشد آماده شود؟',
        },
        choices: {
          en: ['Them', 'Partner', 'Equal forever', 'Whoever showered last'],
          fa: ['خودشون', 'پارتنر', 'مساوی ابدی', 'کی آخر دوش گرفت'],
        },
      },
      {
        id: 'c53',
        prompt: {
          en: 'Favorite couple tradition?',
          fa: 'سنت زوج مورد علاقه؟',
        },
        choices: {
          en: ['Sunday breakfast', 'Night walks', 'Monthly date night', 'Random road trips'],
          fa: ['صبحانه یکشنبه', 'پیاده‌روی شب', 'قرار ماهانه', 'سفر جاده‌ای رندم'],
        },
      },
      {
        id: 'c54',
        prompt: {
          en: 'Who is the big spoon usually?',
          fa: 'کی معمولاً بیگ اسپون است؟',
        },
        choices: {
          en: ['Them', 'Partner', 'Switches', 'Neither — hot weather'],
          fa: ['خودشون', 'پارتنر', 'عوض می‌شه', 'هیچ‌کدام — هوا گرم'],
        },
      },
      {
        id: 'c55',
        prompt: {
          en: 'When meeting the family…',
          fa: 'وقتی خانواده را می‌بینند…',
        },
        choices: {
          en: ['Charm mode', 'Quiet polite', 'Nervous comedy', 'Already besties'],
          fa: ['حالت جذاب', 'مودب ساکت', 'کمدی عصبی', 'از قبل رفیق'],
        },
      },
      {
        id: 'c56',
        prompt: {
          en: 'Who starts the “we should…” ideas?',
          fa: 'کی ایده «باید…» را شروع می‌کند؟',
        },
        choices: {
          en: ['Them dreamer', 'Partner realist', 'Both schemers', 'Ideas die in chat'],
          fa: ['رؤیاپرداز اونا', 'واقع‌گرا پارتنر', 'هر دو توطئه‌گر', 'ایده‌ها تو چت می‌میرن'],
        },
      },
      {
        id: 'c57',
        prompt: {
          en: 'Couple photo style?',
          fa: 'سبک عکس زوج؟',
        },
        choices: {
          en: ['Candids forever', 'Posed cute', 'Silly faces', 'Rare — live it'],
          fa: ['کاندید تا ابد', 'ژست بامزه', 'صورت بامزه', 'کم — زندگی کن'],
        },
      },
      {
        id: 'c58',
        prompt: {
          en: 'Who is more likely to get hangry?',
          fa: 'کی بیشتر احتمال دارد هنگری شود؟',
        },
        choices: {
          en: ['Them', 'Partner', 'Both dangerous', 'Snacks prevent war'],
          fa: ['خودشون', 'پارتنر', 'هر دو خطرناک', 'خوراکی جنگ را می‌گیرد'],
        },
      },
      {
        id: 'c59',
        prompt: {
          en: 'Best rainy date?',
          fa: 'بهترین قرار بارانی؟',
        },
        choices: {
          en: ['Café talk', 'Museum wander', 'Cook + movie', 'Walk anyway'],
          fa: ['حرف کافه', 'پرسه موزه', 'آشپزی + فیلم', 'هرطور پیاده'],
        },
      },
      {
        id: 'c60',
        prompt: {
          en: 'Who remembers where stuff is?',
          fa: 'کی یادش می‌ماند چیزها کجاست؟',
        },
        choices: {
          en: ['Them', 'Partner', 'Neither — search party', 'Shared notes app'],
          fa: ['خودشون', 'پارتنر', 'هیچ‌کدام — گروه جستجو', 'اپ یادداشت مشترک'],
        },
      },
      {
        id: 'c61',
        prompt: {
          en: 'Flirty text style?',
          fa: 'سبک پیام فلرت؟',
        },
        choices: {
          en: ['Voice notes', 'Teasing jokes', 'Sweet short', 'Paragraph novels'],
          fa: ['ویس', 'جوک دست‌انداختن', 'کوتاه شیرین', 'رمان پاراگرافی'],
        },
      },
      {
        id: 'c62',
        prompt: {
          en: 'Who is the morning person in the couple?',
          fa: 'کی تو رابطه آدم صبح است؟',
        },
        choices: {
          en: ['Them', 'Partner', 'Neither', 'Depends on coffee supply'],
          fa: ['خودشون', 'پارتنر', 'هیچ‌کدام', 'بستگی به موجودی قهوه'],
        },
      },
      {
        id: 'c63',
        prompt: {
          en: 'Couple chore split?',
          fa: 'تقسیم کار خانه؟',
        },
        choices: {
          en: ['Clear roles', 'Whoever’s free', 'Scoreboard comedy', 'Outsource dream'],
          fa: ['نقش واضح', 'کی آزاد', 'کمدی جدول امتیاز', 'رؤیای برون‌سپاری'],
        },
      },
      {
        id: 'c64',
        prompt: {
          en: 'Who is more likely to start dancing in the kitchen?',
          fa: 'کی بیشتر احتمال دارد تو آشپزخانه برقصد؟',
        },
        choices: {
          en: ['Them', 'Partner', 'Both instantly', 'Only if song is right'],
          fa: ['خودشون', 'پارتنر', 'هر دو فوری', 'فقط اگر آهنگ درست'],
        },
      },
      {
        id: 'c65',
        prompt: {
          en: 'Favorite “us” snack?',
          fa: 'خوراکی «ما» مورد علاقه؟',
        },
        choices: {
          en: ['Ice cream share', 'Late fries', 'Homemade something', 'Whatever’s on sale'],
          fa: ['بستنی شراکتی', 'سیب‌زمینی دیر', 'چیز خونگی', 'هرچی حراجه'],
        },
      },
      {
        id: 'c66',
        prompt: {
          en: 'Who plans the proposals of plans (meta)?',
          fa: 'کی برنامه‌ریزی برنامه‌ها را می‌کند؟',
        },
        choices: {
          en: ['Them', 'Partner', 'Spreadsheet couple', 'Spontaneous forever'],
          fa: ['خودشون', 'پارتنر', 'زوج اکسل', 'آنی تا ابد'],
        },
      },
      {
        id: 'c67',
        prompt: {
          en: 'When one is stressed…',
          fa: 'وقتی یکی استرس دارد…',
        },
        choices: {
          en: ['Hugs + listen', 'Fix-it mode', 'Distraction comedy', 'Snack delivery'],
          fa: ['بغل + گوش', 'حالت حل‌کن', 'کمدی حواس‌پرتی', 'ارسال خوراکی'],
        },
      },
      {
        id: 'c68',
        prompt: {
          en: 'Couple airport dynamic?',
          fa: 'دینامیک فرودگاه زوج؟',
        },
        choices: {
          en: ['Early birds', 'Gate sprinters', 'Snack tourists', 'One chill one panic'],
          fa: ['پرندگان زود', 'دونده گیت', 'توریست خوراکی', 'یکی آروم یکی پانیک'],
        },
      },
      {
        id: 'c69',
        prompt: {
          en: 'Who is more likely to adopt a plant?',
          fa: 'کی بیشتر احتمال دارد گیاه بیاورد؟',
        },
        choices: {
          en: ['Them', 'Partner', 'Both — jungle home', 'Neither — kill plants'],
          fa: ['خودشون', 'پارتنر', 'هر دو — خونه جنگل', 'هیچ‌کدام — گیاه‌کش'],
        },
      },
      {
        id: 'c70',
        prompt: {
          en: 'Best anniversary vibe?',
          fa: 'حال‌وهوای بهترین سالگرد؟',
        },
        choices: {
          en: ['Quiet meaningful', 'Big celebration', 'Trip escape', 'Home feast'],
          fa: ['معنادار آرام', 'جشن بزرگ', 'فرار سفر', 'ضیافت خونه'],
        },
      },
      {
        id: 'c71',
        prompt: {
          en: 'Who says “I love you” more?',
          fa: 'کی بیشتر «دوستت دارم» می‌گوید؟',
        },
        choices: {
          en: ['Them', 'Partner', 'Equal softies', 'In actions more'],
          fa: ['خودشون', 'پارتنر', 'نرم مساوی', 'بیشتر با عمل'],
        },
      },
      {
        id: 'c72',
        prompt: {
          en: 'Couple Sunday morning?',
          fa: 'صبح یکشنبه زوج؟',
        },
        choices: {
          en: ['Sleep in', 'Brunch hunt', 'Chores + music', 'Adventure day'],
          fa: ['خواب طولانی', 'شکار برانچ', 'کار خانه + موسیقی', 'روز ماجراجویی'],
        },
      },
      {
        id: 'c73',
        prompt: {
          en: 'Who is the better gift wrapper?',
          fa: 'کی کادو را بهتر می‌پیچد؟',
        },
        choices: {
          en: ['Them neat', 'Partner neat', 'Bag chaos both', 'Professional store wrap'],
          fa: ['مرتب اونا', 'مرتب پارتنر', 'آشوب کیسه هر دو', 'پیچ حرفه‌ای فروشگاه'],
        },
      },
      {
        id: 'c74',
        prompt: {
          en: 'When watching a scary movie…',
          fa: 'وقتی فیلم ترسناک می‌بینند…',
        },
        choices: {
          en: ['Them brave', 'Partner brave', 'Both behind pillow', 'They pick comedy instead'],
          fa: ['شجاع اونا', 'شجاع پارتنر', 'هر دو پشت بالش', 'به جاش کمدی'],
        },
      },
      {
        id: 'c75',
        prompt: {
          en: 'Who is more likely to start a group trip?',
          fa: 'کی بیشتر احتمال دارد سفر گروهی راه بیندازد؟',
        },
        choices: {
          en: ['Them', 'Partner', 'A friend does', 'They prefer duo trips'],
          fa: ['خودشون', 'پارتنر', 'یک دوست', 'ترجیح سفر دونفره'],
        },
      },
      {
        id: 'c76',
        prompt: {
          en: 'Shared dream home vibe?',
          fa: 'حال‌وهوای خونه رؤیایی مشترک؟',
        },
        choices: {
          en: ['City apartment', 'Quiet suburb', 'Near water', 'Wherever friends are'],
          fa: ['آپارتمان شهر', 'حومه آرام', 'نزدیک آب', 'هر جا دوستا هستن'],
        },
      },
      {
        id: 'c77',
        prompt: {
          en: 'Who hogs the charger?',
          fa: 'کی شارژر را می‌قاپد؟',
        },
        choices: {
          en: ['Them', 'Partner', 'Both — buy two', 'Power bank peace'],
          fa: ['خودشون', 'پارتنر', 'هر دو — دو تا بخر', 'صلح پاوربانک'],
        },
      },
      {
        id: 'c78',
        prompt: {
          en: 'Couple “we’re lost” reaction?',
          fa: 'واکنش زوج «گم شدیم»؟',
        },
        choices: {
          en: ['Laugh adventure', 'Silent GPS focus', 'Blame each other cute', 'Ask locals immediately'],
          fa: ['بخند ماجراجویی', 'تمرکز ساکت جی‌پی‌اس', 'مقصر بامزه همدیگه', 'فوری از محلی بپرس'],
        },
      },
      {
        id: 'c79',
        prompt: {
          en: 'Who is more likely to cry at a movie?',
          fa: 'کی بیشتر احتمال دارد فیلم گریه کند؟',
        },
        choices: {
          en: ['Them', 'Partner', 'Both wrecked', 'Neither — stone faces'],
          fa: ['خودشون', 'پارتنر', 'هر دو داغون', 'هیچ‌کدام — صورت سنگی'],
        },
      },
      {
        id: 'c80',
        prompt: {
          en: 'Best “just because” gift?',
          fa: 'بهترین هدیه «همین‌طوری»؟',
        },
        choices: {
          en: ['Favorite snack', 'Playlist', 'Tiny souvenir', 'A long hug'],
          fa: ['خوراکی محبوب', 'پلی‌لیست', 'سوغات کوچک', 'بغل طولانی'],
        },
      },
      {
        id: 'c81',
        prompt: {
          en: 'Who starts the laundry?',
          fa: 'کی لباسشویی را شروع می‌کند؟',
        },
        choices: {
          en: ['Them', 'Partner', 'Whoever runs out of socks', 'Never — pile grows'],
          fa: ['خودشون', 'پارتنر', 'کی جوراب تموم شه', 'هیچ‌وقت — توده رشد'],
        },
      },
    ],
  },
  {
    id: 'spicy',
    questions: [
      { id: 's1', prompt: { en: 'Ideal first move?', fa: 'حرکت اول ایده‌آل؟' }, choices: { en: ['A bold kiss', 'Slow tease', 'Whisper something', 'Let them lead'], fa: ['یک بوسهٔ جسورانه', 'ناز و اِهِن‌واِهِن آروم', 'یک چیز در گوشی', 'بذار اون پیش‌قدم شه'] } },
      { id: 's2', prompt: { en: 'Lights on or off?', fa: 'چراغ روشن یا خاموش؟' }, choices: { en: ['On, always', 'Off', 'Dim / candles', 'Depends on the mood'], fa: ['همیشه روشن', 'خاموش', 'کم‌نور / شمع', 'بستگی به حال‌وهوا'] } },
      { id: 's3', prompt: { en: 'Biggest turn-on?', fa: 'بزرگ‌ترین محرک؟' }, choices: { en: ['Confidence', 'A good voice', 'Sense of humor', 'Physical touch'], fa: ['اعتمادبه‌نفس', 'یک صدای خوب', 'حس شوخ‌طبعی', 'تماس فیزیکی'] } },
      { id: 's4', prompt: { en: 'Most likely flirting style?', fa: 'محتمل‌ترین سبک لاس زدن؟' }, choices: { en: ['Direct & bold', 'Playful teasing', 'Shy but obvious', 'Smooth talker'], fa: ['مستقیم و جسور', 'شوخی و سربه‌سر گذاشتن', 'خجالتی ولی تابلو', 'زبون‌باز'] } },
      { id: 's5', prompt: { en: 'Ideal date that leads somewhere?', fa: 'قرار ایده‌آلی که یه جایی ختم شه؟' }, choices: { en: ['Night in together', 'Dancing out', 'Rooftop & wine', 'Road trip escape'], fa: ['یه شب دونفره تو خونه', 'رقص بیرون', 'پشت‌بوم و شراب', 'فرار با یه سفر جاده‌ای'] } },
      { id: 's6', prompt: { en: 'Riskiest place they’d kiss?', fa: 'پرریسک‌ترین جایی که می‌بوسه؟' }, choices: { en: ['Elevator', 'Back of a taxi', 'Balcony at a party', 'Never risky'], fa: ['آسانسور', 'صندلی عقب تاکسی', 'بالکن یه مهمونی', 'هیچ‌وقت ریسکی نه'] } },
      { id: 's7', prompt: { en: 'Their guilty pleasure?', fa: 'لذت گناه‌آلودشون؟' }, choices: { en: ['Sexting', 'Late-night calls', 'Jealousy games', 'Cheesy romance'], fa: ['سکسی‌چت', 'تماس‌های نیمه‌شب', 'بازی‌های حسادت', 'عاشقانهٔ آبکی'] } },
      { id: 's8', prompt: { en: 'Dominant or submissive?', fa: 'سلطه‌گر یا تسلیم؟' }, choices: { en: ['Dominant', 'Submissive', 'Switch', 'Depends who’s asking'], fa: ['سلطه‌گر', 'تسلیم', 'هردو (سوییچ)', 'بستگی داره کی بپرسه'] } },
      { id: 's9', prompt: { en: 'Most likely to say yes to?', fa: 'محتمل‌ترین چیزی که بهش بله می‌گه؟' }, choices: { en: ['A spicy dare', 'Skinny dipping', 'A midnight rendezvous', 'A daring photo'], fa: ['یه جرئت تند', 'شنای لخت', 'یه قرار نیمه‌شب', 'یه عکس جسورانه'] } },
      { id: 's10', prompt: { en: 'Their idea of foreplay?', fa: 'تعریفشون از پیش‌نوازش؟' }, choices: { en: ['Deep conversation', 'Teasing all day', 'A slow dance', 'Just go for it'], fa: ['یه گفتگوی عمیق', 'تمام روز سربه‌سر گذاشتن', 'یه رقص آروم', 'مستقیم سر اصل مطلب'] } },
      { id: 's11', prompt: { en: 'Text back speed after a spicy message?', fa: 'سرعت جواب بعد از یه پیام داغ؟' }, choices: { en: ['Instant', 'Plays it cool', 'Leaves you on read', 'Calls instead'], fa: ['آنی', 'خونسرد بازی می‌کنه', 'سین می‌کنه بی‌جواب', 'به‌جاش زنگ می‌زنه'] } },
      { id: 's12', prompt: { en: 'Most attractive trait in a partner?', fa: 'جذاب‌ترین ویژگی در یه پارتنر؟' }, choices: { en: ['Confidence', 'Mystery', 'Playfulness', 'Intensity'], fa: ['اعتمادبه‌نفس', 'رمزآلود بودن', 'شیطنت', 'شدت و حرارت'] } },
      { id: 's13', prompt: { en: 'Their biggest secret fantasy theme?', fa: 'موضوع بزرگ‌ترین فانتزی مخفی‌شون؟' }, choices: { en: ['Role-play', 'Somewhere public', 'Being in charge', 'Losing control'], fa: ['رول‌پلی', 'یه جای عمومی', 'کنترل دست خودشون', 'از دست دادن کنترل'] } },
      { id: 's14', prompt: { en: 'Morning or night person… in bed?', fa: 'آدم صبحی یا شبی… تو تخت؟' }, choices: { en: ['Morning', 'Late night', 'Afternoon', 'Any time, honestly'], fa: ['صبح', 'آخرشب', 'بعدازظهر', 'صادقانه هر وقت'] } },
      { id: 's15', prompt: { en: 'Most likely reaction to a bold compliment?', fa: 'محتمل‌ترین واکنش به یه تعریف جسورانه؟' }, choices: { en: ['Blush hard', 'Fire one back', 'Get shy', 'Pretend to be cool'], fa: ['بدجور سرخ می‌شه', 'یکی داغ‌تر تحویل می‌ده', 'خجالتی می‌شه', 'ادای خونسردی درمیاره'] } },
      { id: 's16', prompt: { en: 'Their weakness?', fa: 'نقطه‌ضعفشون؟' }, choices: { en: ['Neck kisses', 'Eye contact', 'A deep voice', 'Being teased'], fa: ['بوسهٔ گردن', 'تماس چشمی', 'یه صدای بم', 'سربه‌سر گذاشته شدن'] } },
      { id: 's17', prompt: { en: 'Boldest thing they’d do on vacation?', fa: 'جسورانه‌ترین کاری که تو تعطیلات می‌کنن؟' }, choices: { en: ['Hook up with a stranger', 'Skinny dip', 'Kiss on the beach', 'Stay classy'], fa: ['با یه غریبه رابطه', 'شنای لخت', 'بوسه رو ساحل', 'باکلاس می‌مونن'] } },
      { id: 's18', prompt: { en: 'Their flirt-to-serious ratio?', fa: 'نسبت لاس زدن به جدی بودنشون؟' }, choices: { en: ['All flirt', 'Mostly serious', 'Balanced', 'Flirts then vanishes'], fa: ['کاملاً لاس', 'بیشتر جدی', 'متعادل', 'لاس می‌زنه بعد غیب می‌شه'] } },
      { id: 's19', prompt: { en: 'Ideal way to be seduced?', fa: 'راه ایده‌آل برای اغوا شدنشون؟' }, choices: { en: ['Words', 'Touch', 'A look', 'A surprise'], fa: ['با حرف', 'با لمس', 'با یه نگاه', 'با یه سورپرایز'] } },
      { id: 's20', prompt: { en: 'Most likely to keep whose number secret?', fa: 'محتمل‌ترین شماره‌ای که مخفی نگه می‌دارن؟' }, choices: { en: ['An ex', 'A crush', 'A fling', 'They tell all'], fa: ['یه اکس', 'یه کراش', 'یه رابطهٔ گذرا', 'همه‌چیو می‌گن'] } },
    ],
  },
]

export function getBondQuestions(packId: string): BondQuestion[] {
  return BOND_PACKS.find((p) => p.id === packId)?.questions ?? BOND_PACKS[0]!.questions
}
