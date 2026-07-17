import type { Locale } from '../../store/prefs'

export interface StoryStarter {
  id: string
  text: Record<Locale, string>
}

export interface StarterPack {
  id: string
  starters: StoryStarter[]
}

/**
 * Large bilingual starter dictionaries for Story.
 * ~80 openers per pack so several nights rarely repeat with freshPick.
 */
export const STARTER_PACKS: StarterPack[] = [
  {
    id: 'cozy',
    starters: [
      {
        id: 'c1',
        text: {
          en: 'It was a quiet Tuesday when the doorbell rang twice…',
          fa: 'سه‌شنبه‌ای آرام بود که زنگ در دو بار به صدا درآمد…',
        },
      },
      {
        id: 'c2',
        text: {
          en: 'Nobody expected the bakery to close at midnight, but…',
          fa: 'هیچ‌کس انتظار نداشت نانوایی نیمه‌شب تعطیل شود، اما…',
        },
      },
      {
        id: 'c3',
        text: {
          en: 'The group chat went silent for three whole minutes…',
          fa: 'گروه چت سه دقیقهٔ تمام ساکت ماند…',
        },
      },
      {
        id: 'c4',
        text: {
          en: 'Someone left a sticky note on the fridge that said…',
          fa: 'کسی روی یخچال یادداشتی چسبانده بود که می‌گفت…',
        },
      },
      {
        id: 'c5',
        text: {
          en: 'The last train of the night was emptier than usual…',
          fa: 'آخرین قطار شب خلوت‌تر از همیشه بود…',
        },
      },
      {
        id: 'c6',
        text: {
          en: 'They had agreed never to talk about the picnic again, until…',
          fa: 'قرار گذاشته بودند دیگر دربارهٔ پیک‌نیک حرف نزنند، تا اینکه…',
        },
      },
      {
        id: 'c7',
        text: {
          en: 'A mysterious playlist appeared on the shared speaker…',
          fa: 'یک پلی‌لیست مرموز روی اسپیکر مشترک ظاهر شد…',
        },
      },
      {
        id: 'c8',
        text: {
          en: 'The neighbor knocked and asked for a cup of sugar — and also…',
          fa: 'همسایه زد و یک فنجان شکر خواست — و همچنین…',
        },
      },
      {
        id: 'c9',
        text: {
          en: 'Rain started exactly when the movie reached its best scene…',
          fa: 'باران دقیقاً وقتی شروع شد که فیلم به بهترین صحنه‌اش رسید…',
        },
      },
      {
        id: 'c10',
        text: {
          en: 'The coffee shop had one empty table and a reserved sign that lied…',
          fa: 'کافه یک میز خالی داشت و تابلوی رزرو که دروغ می‌گفت…',
        },
      },
      {
        id: 'c11',
        text: {
          en: 'Someone’s laundry was still spinning when the power cut…',
          fa: 'لباس کسی هنوز می‌چرخید که برق قطع شد…',
        },
      },
      {
        id: 'c12',
        text: {
          en: 'The plant in the corner finally flowered, and that meant…',
          fa: 'گیاه گوشه بالاخره گل داد، و این یعنی…',
        },
      },
      {
        id: 'c13',
        text: {
          en: 'A package arrived with no name — only a smiley sticker…',
          fa: 'بسته‌ای بدون اسم رسید — فقط یک استیکر لبخند…',
        },
      },
      {
        id: 'c14',
        text: {
          en: 'The elevator stopped between floors and someone hummed…',
          fa: 'آسانسور بین طبقات ایستاد و کسی زمزمه کرد…',
        },
      },
      {
        id: 'c15',
        text: {
          en: 'Sunday morning smelled like toast and unfinished plans…',
          fa: 'صبح یکشنبه بوی نان تست و برنامه‌های نیمه‌کاره می‌داد…',
        },
      },
      {
        id: 'c16',
        text: {
          en: 'They found an old ticket stub in the couch cushion…',
          fa: 'ته‌بلیت قدیمی‌ای توی کوسن مبل پیدا کردند…',
        },
      },
      {
        id: 'c17',
        text: {
          en: 'The Wi-Fi name changed overnight to something oddly personal…',
          fa: 'اسم وای‌فای یک‌شبه به چیزی عجیب و شخصی تغییر کرد…',
        },
      },
      {
        id: 'c18',
        text: {
          en: 'A cat walked into the meeting like it owned the agenda…',
          fa: 'گربه‌ای مثل صاحب جلسه وارد میتینگ شد…',
        },
      },
      {
        id: 'c19',
        text: {
          en: 'The shared calendar had a mystery event titled “Don’t cancel”…',
          fa: 'تقویم مشترک رویدادی مرموز داشت با عنوان «کنسل نکنید»…',
        },
      },
      {
        id: 'c20',
        text: {
          en: 'Someone brought soup for everyone and refused to explain why…',
          fa: 'کسی برای همه سوپ آورد و از توضیح دادن خودداری کرد…',
        },
      },
      {
        id: 'c21',
        text: {
          en: 'The street musician stopped mid-song and pointed at them…',
          fa: 'نوازنده خیابانی وسط آهنگ ایستاد و به آن‌ها اشاره کرد…',
        },
      },
      {
        id: 'c22',
        text: {
          en: 'A balloon floated into the open window carrying a note…',
          fa: 'بادکنکی با یک یادداشت از پنجره باز وارد شد…',
        },
      },
      {
        id: 'c23',
        text: {
          en: 'The leftovers tasted better than the original dinner…',
          fa: 'غذای مونده از شام اصلی خوشمزه‌تر بود…',
        },
      },
      {
        id: 'c24',
        text: {
          en: 'They almost missed the bus, but the driver waited for a reason…',
          fa: 'تقریباً اتوبوس را از دست دادند، اما راننده دلیلی برای صبر داشت…',
        },
      },
      {
        id: 'c25',
        text: {
          en: 'The bookstore clerk recommended a title with a knowing look…',
          fa: 'متصدی کتابفروشی با نگاهی معنا‌دار کتابی پیشنهاد کرد…',
        },
      },
      {
        id: 'c26',
        text: {
          en: 'A forgotten umbrella returned with a thank-you tag…',
          fa: 'چتر فراموش‌شده با برچسب تشکر برگشت…',
        },
      },
      {
        id: 'c27',
        text: {
          en: 'The night market lights flickered in a pattern that felt like a code…',
          fa: 'چراغ‌های بازار شب به الگویی چشمک زدند که شبیه کد بود…',
        },
      },
      {
        id: 'c28',
        text: {
          en: 'Someone’s ringtone was a song from ten years ago…',
          fa: 'آهنگ زنگ کسی مربوط به ده سال پیش بود…',
        },
      },
      {
        id: 'c29',
        text: {
          en: 'The soup boiled over at the exact wrong moment…',
          fa: 'سوپ دقیقاً در بدترین لحظه جوش آورد…',
        },
      },
      {
        id: 'c30',
        text: {
          en: 'A handwritten recipe fell out of a library book…',
          fa: 'دستور پخت دست‌نویس از کتاب کتابخانه افتاد بیرون…',
        },
      },
      {
        id: 'c31',
        text: {
          en: 'The couch had a warm spot that shouldn’t have been warm…',
          fa: 'مبل جای گرمی داشت که نباید گرم می‌بود…',
        },
      },
      {
        id: 'c32',
        text: {
          en: 'They opened the wrong door and found a tiny party already happening…',
          fa: 'در اشتباه را باز کردند و مهمانی کوچکی در جریان بود…',
        },
      },
      {
        id: 'c33',
        text: {
          en: 'The houseplant leaned toward the gossip…',
          fa: 'گیاه خانگی به سمت شایعه خم شد…',
        },
      },
      {
        id: 'c34',
        text: {
          en: 'A delivery driver asked for a photo with the group…',
          fa: 'پیک از گروه عکس خواست…',
        },
      },
      {
        id: 'c35',
        text: {
          en: 'The kettle whistled a tune nobody recognized…',
          fa: 'کتری آهنگی سوت زد که کسی نمی‌شناخت…',
        },
      },
      {
        id: 'c36',
        text: {
          en: 'Someone’s headphones leaked the soundtrack of the evening…',
          fa: 'هدفون کسی ساندترک شب را لو داد…',
        },
      },
      {
        id: 'c37',
        text: {
          en: 'The park bench had initials that matched two people at the table…',
          fa: 'روی نیمکت پارک حروفی بود که با دو نفر دور میز جور بود…',
        },
      },
      {
        id: 'c38',
        text: {
          en: 'A postcard arrived from a city none of them had visited…',
          fa: 'کارت‌پستالی از شهری آمد که هیچ‌کدام نرفته بودند…',
        },
      },
      {
        id: 'c39',
        text: {
          en: 'The leftovers container was labeled with tomorrow’s date…',
          fa: 'ظرف غذای مونده تاریخ فردا را داشت…',
        },
      },
      {
        id: 'c40',
        text: {
          en: 'Snow started falling on a city that never gets snow…',
          fa: 'برف در شهری بارید که هیچ‌وقت برف ندارد…',
        },
      },
      {
        id: 'c41',
        text: {
          en: 'The microwave clock blinked 12:00 like a countdown…',
          fa: 'ساعت مایکروویو مثل شمارش معکوس ۱۲:۰۰ چشمک می‌زد…',
        },
      },
      {
        id: 'c42',
        text: {
          en: 'Someone brought a board game with missing pieces on purpose…',
          fa: 'کسی عمداً بازی رومیزی با مهره‌های ناقص آورد…',
        },
      },
      {
        id: 'c43',
        text: {
          en: 'The hallway light stayed on for a reason nobody admitted…',
          fa: 'چراغ راهرو به دلیلی روشن ماند که کسی اعتراف نکرد…',
        },
      },
      {
        id: 'c44',
        text: {
          en: 'A quiet toast glowed on the stove like a tiny sunrise…',
          fa: 'نان تست آرام روی اجاق مثل طلوع کوچک می‌درخشید…',
        },
      },
      {
        id: 'c45',
        text: {
          en: 'They found matching socks that no one owned…',
          fa: 'جوراب‌های جفتی پیدا کردند که مال هیچ‌کس نبود…',
        },
      },
      {
        id: 'c46',
        text: {
          en: 'The playlist skipped every love song except one…',
          fa: 'پلی‌لیست همه آهنگ‌های عاشقانه را رد کرد مگر یکی…',
        },
      },
      {
        id: 'c47',
        text: {
          en: 'A stranger returned a lost scarf with a story attached…',
          fa: 'غریبه‌ای شال گمشده را با یک داستان برگرداند…',
        },
      },
      {
        id: 'c48',
        text: {
          en: 'The balcony plant had grown overnight in a suspicious way…',
          fa: 'گیاه بالکن یک‌شبه به شکل مشکوکی رشد کرده بود…',
        },
      },
      {
        id: 'c49',
        text: {
          en: 'Someone’s alarm was set for a time that made no sense…',
          fa: 'آلارم کسی برای ساعتی تنظیم شده بود که معنی نداشت…',
        },
      },
      {
        id: 'c50',
        text: {
          en: 'The tea tasted like a memory from last winter…',
          fa: 'چای طعم خاطره‌ای از زمستان گذشته داشت…',
        },
      },
      {
        id: 'c51',
        text: {
          en: 'A sticky calendar reminder said “tell them tonight”…',
          fa: 'یادآور چسبان تقویم نوشته بود «امشب بهشان بگو»…',
        },
      },
      {
        id: 'c52',
        text: {
          en: 'The bus announcement said their stop twice…',
          fa: 'اعلام ایستگاه اتوبوس دو بار ایستگاهشان را گفت…',
        },
      },
      {
        id: 'c53',
        text: {
          en: 'Someone’s laugh made the whole street turn…',
          fa: 'خنده کسی کل خیابان را برگرداند…',
        },
      },
      {
        id: 'c54',
        text: {
          en: 'The candle burned unevenly toward the secret…',
          fa: 'شمع کج به سمت راز سوخت…',
        },
      },
      {
        id: 'c55',
        text: {
          en: 'A rain-soaked flyer promised free dessert for bravery…',
          fa: 'تراکت خیس باران دسر رایگان برای شجاعت وعده می‌داد…',
        },
      },
      {
        id: 'c56',
        text: {
          en: 'The fridge magnet rearranged itself into a sentence…',
          fa: 'مگنت یخچال خودش را به یک جمله چید…',
        },
      },
      {
        id: 'c57',
        text: {
          en: 'They heard footsteps upstairs in a one-story house…',
          fa: 'در خانهٔ یک‌طبقه صدای قدم بالای سر شنیدند…',
        },
      },
      {
        id: 'c58',
        text: {
          en: 'The photo booth strip had an extra frame…',
          fa: 'نوار عکس غرفه‌ای یک فریم اضافه داشت…',
        },
      },
      {
        id: 'c59',
        text: {
          en: 'Someone’s shadow waved before they did…',
          fa: 'سایهٔ کسی قبل از خودش دست تکان داد…',
        },
      },
      {
        id: 'c60',
        text: {
          en: 'The night ended earlier than planned, and then restarted…',
          fa: 'شب زودتر از برنامه تمام شد، و بعد دوباره شروع شد…',
        },
      },
      {
        id: 'c61',
        text: {
          en: 'A soft knock came from inside the closet…',
          fa: 'ضربهٔ نرمی از داخل کمد آمد…',
        },
      },
      {
        id: 'c62',
        text: {
          en: 'The soup recipe called for an ingredient that didn’t exist…',
          fa: 'دستور سوپ ماده‌ای می‌خواست که وجود نداشت…',
        },
      },
      {
        id: 'c63',
        text: {
          en: 'They shared one umbrella and somehow stayed dry and soaked…',
          fa: 'یک چتر شریک شدند و هم خشک ماندند هم خیس شدند…',
        },
      },
      {
        id: 'c64',
        text: {
          en: 'The streetlights followed them home like curious friends…',
          fa: 'چراغ‌های خیابان مثل دوست کنجکاو تا خانه دنبالشان کردند…',
        },
      },
      {
        id: 'c65',
        text: {
          en: 'A voicemail played itself at dinner…',
          fa: 'پیام صوتی سر شام خودش پخش شد…',
        },
      },
      {
        id: 'c66',
        text: {
          en: 'The crossword clue was their names…',
          fa: 'سرنخ جدول کلمات متقاطع اسم‌هایشان بود…',
        },
      },
      {
        id: 'c67',
        text: {
          en: 'Someone’s coat pocket held a map of the block…',
          fa: 'جیب کت کسی نقشهٔ محله را داشت…',
        },
      },
      {
        id: 'c68',
        text: {
          en: 'The oven timer beeped a secret rhythm…',
          fa: 'تایمر فر با ریتم مخفی بیپ زد…',
        },
      },
      {
        id: 'c69',
        text: {
          en: 'A pigeon stared through the café window with judgment…',
          fa: 'کبوتری با قضاوت از شیشه کافه خیره شد…',
        },
      },
      {
        id: 'c70',
        text: {
          en: 'The night bus had one seat left and a story waiting…',
          fa: 'اتوبوس شب یک صندلی خالی داشت و داستانی در انتظار…',
        },
      },
      {
        id: 'c71',
        text: {
          en: 'They opened a jar of jam labeled “for emergencies”…',
          fa: 'شیشه مربایی با برچسب «برای مواقع اضطراری» باز کردند…',
        },
      },
      {
        id: 'c72',
        text: {
          en: 'The hallway smelled like popcorn and unfinished jokes…',
          fa: 'راهرو بوی پاپ‌کورن و جوک‌های نیمه‌کاره می‌داد…',
        },
      },
      {
        id: 'c73',
        text: {
          en: 'A soft rain argued with the roof all evening…',
          fa: 'باران نرم تمام عصر با سقف بحث کرد…',
        },
      },
      {
        id: 'c74',
        text: {
          en: 'Someone left shoes by the door that weren’t theirs…',
          fa: 'کسی کفش‌هایی جلوی در گذاشت که مال خودش نبود…',
        },
      },
      {
        id: 'c75',
        text: {
          en: 'The lamp flickered every time someone almost told the truth…',
          fa: 'چراغ هر بار که کسی تقریباً حقیقت را می‌گفت چشمک می‌زد…',
        },
      },
      {
        id: 'c76',
        text: {
          en: 'A warm scarf appeared on the empty chair…',
          fa: 'شال گرمی روی صندلی خالی ظاهر شد…',
        },
      },
      {
        id: 'c77',
        text: {
          en: 'The kitchen radio only played songs from one year…',
          fa: 'رادیو آشپزخانه فقط آهنگ‌های یک سال را پخش می‌کرد…',
        },
      },
      {
        id: 'c78',
        text: {
          en: 'They found a key under the doormat with a ribbon…',
          fa: 'زیر پادری کلیدی با روبان پیدا کردند…',
        },
      },
      {
        id: 'c79',
        text: {
          en: 'The moon looked closer than the streetlight…',
          fa: 'ماه نزدیک‌تر از چراغ خیابان به نظر می‌رسید…',
        },
      },
      {
        id: 'c80',
        text: {
          en: 'Someone whispered a plan that sounded like dessert…',
          fa: 'کسی نقشه‌ای نجوا کرد که شبیه دسر بود…',
        },
      },
    ],
  },
  {
    id: 'wild',
    starters: [
      {
        id: 'w1',
        text: {
          en: 'The raccoon was wearing a tiny crown when it said…',
          fa: 'راکون تاج کوچکی به سر داشت وقتی گفت…',
        },
      },
      {
        id: 'w2',
        text: {
          en: 'Gravity took a short break over the parking lot…',
          fa: 'جاذبه برای لحظه‌ای روی پارکینگ تعطیل شد…',
        },
      },
      {
        id: 'w3',
        text: {
          en: 'Someone’s shadow decided to walk the other way…',
          fa: 'سایهٔ کسی تصمیم گرفت به سمت دیگر راه برود…',
        },
      },
      {
        id: 'w4',
        text: {
          en: 'The vending machine dispensed a golden ticket and a warning…',
          fa: 'دستگاه فروش بلیت طلایی داد و یک هشدار…',
        },
      },
      {
        id: 'w5',
        text: {
          en: 'At exactly 3:33 the streetlights started blinking in Morse…',
          fa: 'دقیقاً ساعت ۳:۳۳ چراغ‌های خیابان به مورس چشمک زدند…',
        },
      },
      {
        id: 'w6',
        text: {
          en: 'The Wi-Fi password whispered itself into existence…',
          fa: 'رمز وای‌فای خودش را نجواکنان به وجود آورد…',
        },
      },
      {
        id: 'w7',
        text: {
          en: 'A pigeon landed with a tiny briefcase and…',
          fa: 'کبوتری با کیف‌دستی کوچک فرود آمد و…',
        },
      },
      {
        id: 'w8',
        text: {
          en: 'The moon texted back for the first time…',
          fa: 'ماه برای اولین بار جواب پیام را داد…',
        },
      },
      {
        id: 'w9',
        text: {
          en: 'Time skipped a beat and left everyone mid-sentence…',
          fa: 'زمان یک ضربان جا انداخت و همه را وسط جمله گذاشت…',
        },
      },
      {
        id: 'w10',
        text: {
          en: 'The fridge opened itself and offered a quest…',
          fa: 'یخچال خودش باز شد و مأموریتی پیشنهاد کرد…',
        },
      },
      {
        id: 'w11',
        text: {
          en: 'A cloud shaped like a thumbs-up followed them home…',
          fa: 'ابری شبیه لایک تا خانه دنبالشان کرد…',
        },
      },
      {
        id: 'w12',
        text: {
          en: 'The elevator buttons rearranged into a dare…',
          fa: 'دکمه‌های آسانسور به یک چالش چیده شدند…',
        },
      },
      {
        id: 'w13',
        text: {
          en: 'Someone’s reflection winked first…',
          fa: 'بازتاب کسی اول چشمک زد…',
        },
      },
      {
        id: 'w14',
        text: {
          en: 'The toaster launched bread into another dimension…',
          fa: 'توستر نان را به بُعد دیگری پرتاب کرد…',
        },
      },
      {
        id: 'w15',
        text: {
          en: 'A talking cactus demanded better lighting…',
          fa: 'کاکتوس حرف‌زن نور بهتر خواست…',
        },
      },
      {
        id: 'w16',
        text: {
          en: 'The city pigeons formed a union overnight…',
          fa: 'کبوترهای شهر یک‌شبه اتحادیه تشکیل دادند…',
        },
      },
      {
        id: 'w17',
        text: {
          en: 'Rain fell upward and asked for directions…',
          fa: 'باران به بالا بارید و آدرس پرسید…',
        },
      },
      {
        id: 'w18',
        text: {
          en: 'A sneaker tied itself and started jogging alone…',
          fa: 'کفش ورزشی خودش را بست و تنها دویدن را شروع کرد…',
        },
      },
      {
        id: 'w19',
        text: {
          en: 'The microwave claimed it could see the future…',
          fa: 'مایکروویو ادعا کرد آینده را می‌بیند…',
        },
      },
      {
        id: 'w20',
        text: {
          en: 'Someone’s ringtone summoned a tiny dragon…',
          fa: 'آهنگ زنگ کسی اژدهای کوچکی احضار کرد…',
        },
      },
      {
        id: 'w21',
        text: {
          en: 'The calendar flipped to a day that didn’t exist…',
          fa: 'تقویم به روزی برگشت که وجود نداشت…',
        },
      },
      {
        id: 'w22',
        text: {
          en: 'A traffic cone started giving life advice…',
          fa: 'مخروط ترافیک شروع به نصیحت زندگی کرد…',
        },
      },
      {
        id: 'w23',
        text: {
          en: 'The moon took a coffee break behind a cloud…',
          fa: 'ماه پشت ابر برای قهوه استراحت کرد…',
        },
      },
      {
        id: 'w24',
        text: {
          en: 'Socks began a rebellion in the laundry basket…',
          fa: 'جوراب‌ها در سبد رخت شورش کردند…',
        },
      },
      {
        id: 'w25',
        text: {
          en: 'A street mural stepped off the wall…',
          fa: 'نقاشی دیواری از دیوار پایین آمد…',
        },
      },
      {
        id: 'w26',
        text: {
          en: 'The GPS insisted they turn left into a dream…',
          fa: 'جی‌پی‌اس اصرار کرد به چپ بپیچند به داخل یک رؤیا…',
        },
      },
      {
        id: 'w27',
        text: {
          en: 'Someone’s shadow ordered dessert…',
          fa: 'سایهٔ کسی دسر سفارش داد…',
        },
      },
      {
        id: 'w28',
        text: {
          en: 'The park ducks requested a formal meeting…',
          fa: 'اردک‌های پارک جلسه رسمی خواستند…',
        },
      },
      {
        id: 'w29',
        text: {
          en: 'A balloon argued about physics mid-air…',
          fa: 'بادکنکی وسط هوا درباره فیزیک بحث کرد…',
        },
      },
      {
        id: 'w30',
        text: {
          en: 'The night sky paused buffering…',
          fa: 'آسمان شب بافر شد و مکث کرد…',
        },
      },
      {
        id: 'w31',
        text: {
          en: 'A houseplant learned sarcasm overnight…',
          fa: 'گیاه خانگی یک‌شبه کنایه یاد گرفت…',
        },
      },
      {
        id: 'w32',
        text: {
          en: 'The dishwasher started composing poetry…',
          fa: 'ماشین ظرفشویی شعر گفتن را شروع کرد…',
        },
      },
      {
        id: 'w33',
        text: {
          en: 'Someone sneezed and temporarily swapped voices…',
          fa: 'کسی عطسه کرد و موقتاً صداها عوض شد…',
        },
      },
      {
        id: 'w34',
        text: {
          en: 'The moon put on sunglasses…',
          fa: 'ماه عینک آفتابی زد…',
        },
      },
      {
        id: 'w35',
        text: {
          en: 'A vending machine stocked itself with secrets…',
          fa: 'دستگاه فروش خودش را با راز پر کرد…',
        },
      },
      {
        id: 'w36',
        text: {
          en: 'The stairs rearranged into a spiral joke…',
          fa: 'پله‌ها به یک شوخی مارپیچ چیده شدند…',
        },
      },
      {
        id: 'w37',
        text: {
          en: 'A cloud dropped a single glittery shoe…',
          fa: 'ابری یک کفش اکلیلی انداخت…',
        },
      },
      {
        id: 'w38',
        text: {
          en: 'The remote control changed channels in reality…',
          fa: 'ریموت کنترل کانال واقعیت را عوض کرد…',
        },
      },
      {
        id: 'w39',
        text: {
          en: 'Someone’s hat floated away with a purpose…',
          fa: 'کلاه کسی با هدف شناور شد و رفت…',
        },
      },
      {
        id: 'w40',
        text: {
          en: 'The street signs started roasting pedestrians…',
          fa: 'تابلوهای خیابان عابران را دست انداختند…',
        },
      },
      {
        id: 'w41',
        text: {
          en: 'A sandwich demanded better company…',
          fa: 'ساندویچی هم‌نشین بهتر خواست…',
        },
      },
      {
        id: 'w42',
        text: {
          en: 'The elevator music became a prophecy…',
          fa: 'موسیقی آسانسور تبدیل به پیشگویی شد…',
        },
      },
      {
        id: 'w43',
        text: {
          en: 'Raindrops formed a temporary orchestra…',
          fa: 'قطرات باران ارکستر موقت تشکیل دادند…',
        },
      },
      {
        id: 'w44',
        text: {
          en: 'A squirrel opened a tiny consulting firm…',
          fa: 'سنجابی شرکت مشاوره کوچک باز کرد…',
        },
      },
      {
        id: 'w45',
        text: {
          en: 'The moon sent a calendar invite…',
          fa: 'ماه دعوت تقویم فرستاد…',
        },
      },
      {
        id: 'w46',
        text: {
          en: 'Someone’s backpack unzipped into a portal…',
          fa: 'کوله‌پشتی کسی به یک پورتال باز شد…',
        },
      },
      {
        id: 'w47',
        text: {
          en: 'The coffee foam predicted the evening…',
          fa: 'کف قهوه عصر را پیش‌بینی کرد…',
        },
      },
      {
        id: 'w48',
        text: {
          en: 'A streetlamp winked in binary…',
          fa: 'چراغ خیابان به باینری چشمک زد…',
        },
      },
      {
        id: 'w49',
        text: {
          en: 'The laundry spun out a new identity…',
          fa: 'لباسشویی هویت تازه‌ای چرخاند بیرون…',
        },
      },
      {
        id: 'w50',
        text: {
          en: 'A pigeon delivered a formal complaint…',
          fa: 'کبوتری شکایت رسمی تحویل داد…',
        },
      },
      {
        id: 'w51',
        text: {
          en: 'The fridge magnet spelled “run” then “dance”…',
          fa: 'مگنت یخچال نوشت «بدو» بعد «برقص»…',
        },
      },
      {
        id: 'w52',
        text: {
          en: 'Someone’s umbrella inverted into a satellite dish…',
          fa: 'چتر کسی به آنتن ماهواره برعکس شد…',
        },
      },
      {
        id: 'w53',
        text: {
          en: 'The night bus skipped a stop that wasn’t on the map…',
          fa: 'اتوبوس شب ایستگاهی را رد کرد که روی نقشه نبود…',
        },
      },
      {
        id: 'w54',
        text: {
          en: 'A toast popped up wearing a cape…',
          fa: 'نان تست با شنل بیرون پرید…',
        },
      },
      {
        id: 'w55',
        text: {
          en: 'The moon practiced stand-up comedy…',
          fa: 'ماه استندآپ تمرین کرد…',
        },
      },
      {
        id: 'w56',
        text: {
          en: 'Someone’s shoes tied themselves into a dare…',
          fa: 'کفش‌های کسی خودش را به یک چالش بست…',
        },
      },
      {
        id: 'w57',
        text: {
          en: 'A cloud typed a message in the sky…',
          fa: 'ابری پیامی در آسمان تایپ کرد…',
        },
      },
      {
        id: 'w58',
        text: {
          en: 'The microwave counted down from forever…',
          fa: 'مایکروویو از بی‌نهایت شمارش معکوس کرد…',
        },
      },
      {
        id: 'w59',
        text: {
          en: 'A traffic light stayed yellow on purpose…',
          fa: 'چراغ راهنمایی عمداً زرد ماند…',
        },
      },
      {
        id: 'w60',
        text: {
          en: 'The park fountain whispered stock tips…',
          fa: 'فواره پارک نکته بورس نجوا کرد…',
        },
      },
      {
        id: 'w61',
        text: {
          en: 'Someone’s reflection arrived late…',
          fa: 'بازتاب کسی دیر رسید…',
        },
      },
      {
        id: 'w62',
        text: {
          en: 'The elevator opened onto a beach…',
          fa: 'آسانسور به ساحل باز شد…',
        },
      },
      {
        id: 'w63',
        text: {
          en: 'A sock became mayor for one hour…',
          fa: 'جورابی برای یک ساعت شهردار شد…',
        },
      },
      {
        id: 'w64',
        text: {
          en: 'The moon borrowed someone’s charger…',
          fa: 'ماه شارژر کسی را قرض گرفت…',
        },
      },
      {
        id: 'w65',
        text: {
          en: 'A street cat scheduled a press conference…',
          fa: 'گربه خیابانی کنفرانس خبری گذاشت…',
        },
      },
      {
        id: 'w66',
        text: {
          en: 'The toaster burned a message into the bread…',
          fa: 'توستر پیامی روی نان سوزاند…',
        },
      },
      {
        id: 'w67',
        text: {
          en: 'Someone’s shadow started a podcast…',
          fa: 'سایهٔ کسی پادکست شروع کرد…',
        },
      },
      {
        id: 'w68',
        text: {
          en: 'The Wi-Fi renamed itself “trust me”…',
          fa: 'وای‌فای اسمش را گذاشت «بهم اعتماد کن»…',
        },
      },
      {
        id: 'w69',
        text: {
          en: 'A balloon negotiated for more helium…',
          fa: 'بادکنکی برای هلیوم بیشتر مذاکره کرد…',
        },
      },
      {
        id: 'w70',
        text: {
          en: 'The night sky hiccupped a constellation…',
          fa: 'آسمان شب یک صورت فلکی سکسکه کرد…',
        },
      },
      {
        id: 'w71',
        text: {
          en: 'Someone’s backpack whispered spoilers…',
          fa: 'کوله‌پشتی کسی اسپویلر نجوا کرد…',
        },
      },
      {
        id: 'w72',
        text: {
          en: 'The fridge light went on strike…',
          fa: 'چراغ یخچال اعتصاب کرد…',
        },
      },
      {
        id: 'w73',
        text: {
          en: 'A duck asked for the Wi-Fi password…',
          fa: 'اردکی رمز وای‌فای پرسید…',
        },
      },
      {
        id: 'w74',
        text: {
          en: 'The moon rated the party five stars…',
          fa: 'ماه مهمانی را پنج ستاره داد…',
        },
      },
      {
        id: 'w75',
        text: {
          en: 'Someone’s hat predicted the weather incorrectly…',
          fa: 'کلاه کسی هوا را غلط پیش‌بینی کرد…',
        },
      },
      {
        id: 'w76',
        text: {
          en: 'The stairs counted themselves out loud…',
          fa: 'پله‌ها بلندبلند خودشان را شمردند…',
        },
      },
      {
        id: 'w77',
        text: {
          en: 'A cloud sold tickets to the sunset…',
          fa: 'ابری بلیت غروب فروخت…',
        },
      },
      {
        id: 'w78',
        text: {
          en: 'The remote found a channel called Tomorrow…',
          fa: 'ریموت کانالی به نام فردا پیدا کرد…',
        },
      },
      {
        id: 'w79',
        text: {
          en: 'Someone’s sneakers left without them…',
          fa: 'کفش ورزشی کسی بدون خودش رفت…',
        },
      },
      {
        id: 'w80',
        text: {
          en: 'The city pigeons unionized the breadcrumbs…',
          fa: 'کبوترهای شهر خرده‌نان را اتحادیه‌ای کردند…',
        },
      },
    ],
  },
  {
    id: 'mystery',
    starters: [
      {
        id: 'm1',
        text: {
          en: 'The locked drawer finally opened — inside was only…',
          fa: 'کشوی قفل‌شده بالاخره باز شد — داخلش فقط…',
        },
      },
      {
        id: 'm2',
        text: {
          en: 'Everyone at the table remembered a different version of last night…',
          fa: 'هر کس دور میز نسخهٔ متفاوتی از دیشب را به یاد داشت…',
        },
      },
      {
        id: 'm3',
        text: {
          en: 'The map had one road that wasn’t on any satellite…',
          fa: 'روی نقشه جاده‌ای بود که در هیچ ماهواره‌ای نبود…',
        },
      },
      {
        id: 'm4',
        text: {
          en: 'A voicemail arrived from a number that didn’t exist…',
          fa: 'پیام صوتی از شماره‌ای آمد که وجود نداشت…',
        },
      },
      {
        id: 'm5',
        text: {
          en: 'The photo on the wall had changed overnight…',
          fa: 'عکس روی دیوار یک‌شبه عوض شده بود…',
        },
      },
      {
        id: 'm6',
        text: {
          en: 'They found a key labeled “do not use after dark”…',
          fa: 'کلیدی پیدا کردند با برچسب «بعد از تاریکی استفاده نشود»…',
        },
      },
      {
        id: 'm7',
        text: {
          en: 'The clock ran backwards for exactly twelve seconds…',
          fa: 'ساعت دقیقاً دوازده ثانیه عقب رفت…',
        },
      },
      {
        id: 'm8',
        text: {
          en: 'Someone had signed the guestbook with tomorrow’s date…',
          fa: 'کسی دفتر مهمان را با تاریخ فردا امضا کرده بود…',
        },
      },
      {
        id: 'm9',
        text: {
          en: 'A letter arrived with no stamp and perfect timing…',
          fa: 'نامه‌ای بدون تمبر با زمان‌بندی کامل رسید…',
        },
      },
      {
        id: 'm10',
        text: {
          en: 'The hallway mirror showed one extra person…',
          fa: 'آینه راهرو یک نفر اضافه نشان می‌داد…',
        },
      },
      {
        id: 'm11',
        text: {
          en: 'Footprints led into the room and never out…',
          fa: 'رد پا وارد اتاق شد و بیرون نرفت…',
        },
      },
      {
        id: 'm12',
        text: {
          en: 'The radio hissed a name they all recognized…',
          fa: 'رادیو نامی هیس کرد که همه می‌شناختند…',
        },
      },
      {
        id: 'm13',
        text: {
          en: 'A door that was always locked stood slightly open…',
          fa: 'دری که همیشه قفل بود کمی باز ایستاده بود…',
        },
      },
      {
        id: 'm14',
        text: {
          en: 'The diary skipped three days and resumed mid-sentence…',
          fa: 'دفتر خاطرات سه روز را جا انداخت و وسط جمله ادامه داد…',
        },
      },
      {
        id: 'm15',
        text: {
          en: 'Someone’s watch stopped at the same minute every night…',
          fa: 'ساعت کسی هر شب همان دقیقه می‌ایستاد…',
        },
      },
      {
        id: 'm16',
        text: {
          en: 'The library book returned itself overdue with a note…',
          fa: 'کتاب کتابخانه خودش را با یادداشت دیر برگرداند…',
        },
      },
      {
        id: 'm17',
        text: {
          en: 'A candle burned without wax disappearing…',
          fa: 'شمعی بدون کم شدن موم سوخت…',
        },
      },
      {
        id: 'm18',
        text: {
          en: 'The attic light was on though nobody went up…',
          fa: 'چراغ اتاق زیر شیروانی روشن بود هرچند کسی بالا نرفت…',
        },
      },
      {
        id: 'm19',
        text: {
          en: 'They found matching gloves on opposite ends of town…',
          fa: 'دستکش‌های جفت را در دو سر شهر پیدا کردند…',
        },
      },
      {
        id: 'm20',
        text: {
          en: 'A stranger waved as if they’d met before…',
          fa: 'غریبه‌ای طوری دست تکان داد انگار قبلاً دیده بودند…',
        },
      },
      {
        id: 'm21',
        text: {
          en: 'The password hint was their childhood street…',
          fa: 'راهنمای رمز، خیابان کودکی‌شان بود…',
        },
      },
      {
        id: 'm22',
        text: {
          en: 'Snow covered only one side of the street…',
          fa: 'برف فقط یک طرف خیابان را پوشاند…',
        },
      },
      {
        id: 'm23',
        text: {
          en: 'A sealed envelope sat under the plant for years…',
          fa: 'پاکت مهروموم‌شده سال‌ها زیر گیاه نشسته بود…',
        },
      },
      {
        id: 'm24',
        text: {
          en: 'The phone rang once from an unknown tower…',
          fa: 'گوشی یک بار از برجی ناشناس زنگ خورد…',
        },
      },
      {
        id: 'm25',
        text: {
          en: 'Someone’s shadow arrived three seconds early…',
          fa: 'سایهٔ کسی سه ثانیه زودتر رسید…',
        },
      },
      {
        id: 'm26',
        text: {
          en: 'The basement stairs had one extra step tonight…',
          fa: 'پله‌های زیرزمین امشب یک پله اضافه داشت…',
        },
      },
      {
        id: 'm27',
        text: {
          en: 'A map was drawn in condensation on the window…',
          fa: 'نقشه‌ای با بخار روی شیشه کشیده شده بود…',
        },
      },
      {
        id: 'm28',
        text: {
          en: 'They heard their own laugh from another room…',
          fa: 'خنده خودشان را از اتاق دیگر شنیدند…',
        },
      },
      {
        id: 'm29',
        text: {
          en: 'The painting’s eyes tracked the dessert tray…',
          fa: 'چشم‌های تابلو سینی دسر را دنبال کرد…',
        },
      },
      {
        id: 'm30',
        text: {
          en: 'A key turned in the lock from the outside alone…',
          fa: 'کلید از بیرون تنها در قفل چرخید…',
        },
      },
      {
        id: 'm31',
        text: {
          en: 'The old radio played tomorrow’s weather…',
          fa: 'رادیو قدیمی هوای فردا را پخش کرد…',
        },
      },
      {
        id: 'm32',
        text: {
          en: 'Someone left wet footprints on a dry floor…',
          fa: 'کسی رد پای خیس روی کف خشک گذاشت…',
        },
      },
      {
        id: 'm33',
        text: {
          en: 'The mailbox held a letter addressed to “all of you”…',
          fa: 'صندوق نامه نامه‌ای خطاب به «همه شما» داشت…',
        },
      },
      {
        id: 'm34',
        text: {
          en: 'A curtain moved when the windows were closed…',
          fa: 'پرده وقتی پنجره‌ها بسته بود حرکت کرد…',
        },
      },
      {
        id: 'm35',
        text: {
          en: 'They found a ticket for a show that never happened…',
          fa: 'بلیط نمایشی پیدا کردند که هرگز اجرا نشد…',
        },
      },
      {
        id: 'm36',
        text: {
          en: 'The hallway clock chimed thirteen…',
          fa: 'ساعت راهرو سیزده بار نواخت…',
        },
      },
      {
        id: 'm37',
        text: {
          en: 'A photo developed with an extra silhouette…',
          fa: 'عکسی ظاهر شد با یک سایه اضافه…',
        },
      },
      {
        id: 'm38',
        text: {
          en: 'The basement door was warm to the touch…',
          fa: 'در زیرزمین به لمس گرم بود…',
        },
      },
      {
        id: 'm39',
        text: {
          en: 'Someone’s name appeared in the guest book twice…',
          fa: 'اسم کسی دو بار در دفتر مهمان بود…',
        },
      },
      {
        id: 'm40',
        text: {
          en: 'The street was empty except for one waiting chair…',
          fa: 'خیابان خالی بود جز یک صندلی منتظر…',
        },
      },
      {
        id: 'm41',
        text: {
          en: 'A whisper came through the heater vents…',
          fa: 'نجوایی از دریچه‌های شوفاژ آمد…',
        },
      },
      {
        id: 'm42',
        text: {
          en: 'The flashlight beam bent around a corner…',
          fa: 'پرتو چراغ‌قوه دور گوشه خم شد…',
        },
      },
      {
        id: 'm43',
        text: {
          en: 'They opened a box labeled “open last”…',
          fa: 'جعبه‌ای با برچسب «آخر باز کنید» را باز کردند…',
        },
      },
      {
        id: 'm44',
        text: {
          en: 'A dog barked at an empty corner…',
          fa: 'سگی به گوشه خالی پارس کرد…',
        },
      },
      {
        id: 'm45',
        text: {
          en: 'The elevator stopped at a floor that wasn’t numbered…',
          fa: 'آسانسور در طبقه‌ای ایستاد که شماره نداشت…',
        },
      },
      {
        id: 'm46',
        text: {
          en: 'Someone’s phone showed a call lasting zero seconds…',
          fa: 'گوشی کسی تماسی به مدت صفر ثانیه نشان داد…',
        },
      },
      {
        id: 'm47',
        text: {
          en: 'The mirror fogged into a question mark…',
          fa: 'آینه به شکل علامت سؤال بخار گرفت…',
        },
      },
      {
        id: 'm48',
        text: {
          en: 'A locked phone unlocked for a stranger’s face…',
          fa: 'گوشی قفل‌شده با صورت غریبه باز شد…',
        },
      },
      {
        id: 'm49',
        text: {
          en: 'The attic smelled like rain from another city…',
          fa: 'اتاق زیر شیروانی بوی باران شهر دیگری می‌داد…',
        },
      },
      {
        id: 'm50',
        text: {
          en: 'They found a map with their apartment circled…',
          fa: 'نقشه‌ای پیدا کردند که آپارتمانشان دورش خط خورده بود…',
        },
      },
      {
        id: 'm51',
        text: {
          en: 'A doorbell rang from a house with no power…',
          fa: 'زنگ در خانه‌ای بدون برق به صدا درآمد…',
        },
      },
      {
        id: 'm52',
        text: {
          en: 'The night sky had one star blinking Morse…',
          fa: 'آسمان شب یک ستاره به مورس چشمک می‌زد…',
        },
      },
      {
        id: 'm53',
        text: {
          en: 'Someone’s diary wrote a page while closed…',
          fa: 'دفتر خاطرات کسی وقتی بسته بود یک صفحه نوشت…',
        },
      },
      {
        id: 'm54',
        text: {
          en: 'The basement light switch was already up…',
          fa: 'کلید چراغ زیرزمین از قبل بالا بود…',
        },
      },
      {
        id: 'm55',
        text: {
          en: 'A shoe print faced the wrong direction…',
          fa: 'رد کفش به سمت اشتباه بود…',
        },
      },
      {
        id: 'm56',
        text: {
          en: 'They heard a song that hadn’t been released yet…',
          fa: 'آهنگی شنیدند که هنوز منتشر نشده بود…',
        },
      },
      {
        id: 'm57',
        text: {
          en: 'The window latch unlocked itself at midnight…',
          fa: 'چفت پنجره نیمه‌شب خودش باز شد…',
        },
      },
      {
        id: 'm58',
        text: {
          en: 'A stranger knew their order before they spoke…',
          fa: 'غریبه‌ای سفارششان را قبل از حرف زدن می‌دانست…',
        },
      },
      {
        id: 'm59',
        text: {
          en: 'The hallway rug pointed toward the wrong door…',
          fa: 'فرش راهرو به سمت در اشتباه اشاره داشت…',
        },
      },
      {
        id: 'm60',
        text: {
          en: 'Someone’s shadow stayed behind when they left…',
          fa: 'سایهٔ کسی وقتی رفت جا ماند…',
        },
      },
      {
        id: 'm61',
        text: {
          en: 'The clock hands overlapped on an impossible hour…',
          fa: 'عقربه‌های ساعت روی ساعتی غیرممکن روی هم افتادند…',
        },
      },
      {
        id: 'm62',
        text: {
          en: 'A sealed jar held a note floating in water…',
          fa: 'شیشه مهروموم‌شده یادداشتی شناور در آب داشت…',
        },
      },
      {
        id: 'm63',
        text: {
          en: 'They found a key that fit every lock poorly…',
          fa: 'کلیدی پیدا کردند که به هر قفل بد می‌خورد…',
        },
      },
      {
        id: 'm64',
        text: {
          en: 'The attic stairs creaked a rhythm like speech…',
          fa: 'پله‌های شیروانی ریتمی مثل حرف زدن صدا می‌داد…',
        },
      },
      {
        id: 'm65',
        text: {
          en: 'A photo booth strip showed a fifth person…',
          fa: 'نوار عکس غرفه‌ای نفر پنجم را نشان داد…',
        },
      },
      {
        id: 'm66',
        text: {
          en: 'The radio station played only their names…',
          fa: 'ایستگاه رادیو فقط اسم‌هایشان را پخش کرد…',
        },
      },
      {
        id: 'm67',
        text: {
          en: 'Someone left a coat that still held body heat…',
          fa: 'کسی کتی گذاشت که هنوز گرمای بدن داشت…',
        },
      },
      {
        id: 'm68',
        text: {
          en: 'The basement window showed daylight at night…',
          fa: 'پنجره زیرزمین شب، روز را نشان می‌داد…',
        },
      },
      {
        id: 'm69',
        text: {
          en: 'A letter arrived dated next week…',
          fa: 'نامه‌ای با تاریخ هفته بعد رسید…',
        },
      },
      {
        id: 'm70',
        text: {
          en: 'The door chain was fastened from the inside…',
          fa: 'زنجیر در از داخل بسته بود…',
        },
      },
      {
        id: 'm71',
        text: {
          en: 'They found a map drawn in a language none of them knew…',
          fa: 'نقشه‌ای به زبانی پیدا کردند که هیچ‌کدام نمی‌دانستند…',
        },
      },
      {
        id: 'm72',
        text: {
          en: 'A candle flame leaned toward the secret…',
          fa: 'شعله شمع به سمت راز خم شد…',
        },
      },
      {
        id: 'm73',
        text: {
          en: 'The phone’s call log listed a contact named “Almost”…',
          fa: 'لیست تماس گوشی مخاطبی به نام «تقریباً» داشت…',
        },
      },
      {
        id: 'm74',
        text: {
          en: 'Someone’s footsteps echoed twice…',
          fa: 'قدم‌های کسی دو بار پژواک داشت…',
        },
      },
      {
        id: 'm75',
        text: {
          en: 'The mirror fogged from the other side…',
          fa: 'آینه از طرف دیگر بخار گرفت…',
        },
      },
      {
        id: 'm76',
        text: {
          en: 'A locked suitcase hummed softly…',
          fa: 'چمدان قفل‌شده آرام زمزمه می‌کرد…',
        },
      },
      {
        id: 'm77',
        text: {
          en: 'The night air smelled like an old library…',
          fa: 'هوای شب بوی کتابخانه قدیمی می‌داد…',
        },
      },
      {
        id: 'm78',
        text: {
          en: 'They opened a drawer that hadn’t been there yesterday…',
          fa: 'کشویی باز کردند که دیروز نبود…',
        },
      },
      {
        id: 'm79',
        text: {
          en: 'A single glove pointed toward the exit…',
          fa: 'یک دستکش به سمت خروج اشاره داشت…',
        },
      },
      {
        id: 'm80',
        text: {
          en: 'The streetlights died one by one behind them…',
          fa: 'چراغ‌های خیابان یکی‌یکی پشت سرشان خاموش شدند…',
        },
      },
    ],
  },
  {
    id: 'adventure',
    starters: [
      {
        id: 'a1',
        text: {
          en: 'The trail forked and both paths looked wrong…',
          fa: 'مسیر دو شاخه شد و هر دو راه غلط به نظر می‌رسید…',
        },
      },
      {
        id: 'a2',
        text: {
          en: 'A compass spun until someone said a name…',
          fa: 'قطب‌نما چرخید تا کسی اسمی گفت…',
        },
      },
      {
        id: 'a3',
        text: {
          en: 'They found a backpack that wasn’t theirs at the trailhead…',
          fa: 'سر مسیر کوله‌ای پیدا کردند که مال خودشان نبود…',
        },
      },
      {
        id: 'a4',
        text: {
          en: 'The bridge looked older than the map claimed…',
          fa: 'پل قدیمی‌تر از ادعای نقشه به نظر می‌رسید…',
        },
      },
      {
        id: 'a5',
        text: {
          en: 'A signal flare rose from a place with no people…',
          fa: 'منور از جایی بدون آدم بالا رفت…',
        },
      },
      {
        id: 'a6',
        text: {
          en: 'The cave entrance breathed warm air…',
          fa: 'دهانه غار هوای گرم بیرون داد…',
        },
      },
      {
        id: 'a7',
        text: {
          en: 'Someone’s map had a red X that moved…',
          fa: 'نقشه کسی ضربدر قرمزی داشت که حرکت می‌کرد…',
        },
      },
      {
        id: 'a8',
        text: {
          en: 'The river whispered a shortcut…',
          fa: 'رودخانه میان‌بر نجوا کرد…',
        },
      },
      {
        id: 'a9',
        text: {
          en: 'A lighthouse blinked a personal message…',
          fa: 'فانوس دریایی پیام شخصی چشمک زد…',
        },
      },
      {
        id: 'a10',
        text: {
          en: 'They hitchhiked with a driver who knew their destination…',
          fa: 'با راننده‌ای لیفت گرفتند که مقصدشان را می‌دانست…',
        },
      },
      {
        id: 'a11',
        text: {
          en: 'The mountain path rearranged after lunch…',
          fa: 'مسیر کوه بعد از ناهار جابه‌جا شد…',
        },
      },
      {
        id: 'a12',
        text: {
          en: 'A tent zipper opened from the outside…',
          fa: 'زیپ چادر از بیرون باز شد…',
        },
      },
      {
        id: 'a13',
        text: {
          en: 'The stars formed an arrow…',
          fa: 'ستاره‌ها فلش ساختند…',
        },
      },
      {
        id: 'a14',
        text: {
          en: 'Someone found a ticket for a ferry that left at dawn…',
          fa: 'کسی بلیت فری پیدا کرد که سحر حرکت می‌کرد…',
        },
      },
      {
        id: 'a15',
        text: {
          en: 'The desert wind carried a radio broadcast…',
          fa: 'باد صحرا پخش رادیویی آورد…',
        },
      },
      {
        id: 'a16',
        text: {
          en: 'A locked gate opened for a password none of them spoke…',
          fa: 'دروازه قفل برای رمزی باز شد که هیچ‌کدام نگفتند…',
        },
      },
      {
        id: 'a17',
        text: {
          en: 'The jungle path smelled like rain and diesel…',
          fa: 'مسیر جنگل بوی باران و گازوئیل می‌داد…',
        },
      },
      {
        id: 'a18',
        text: {
          en: 'They found footprints that matched no shoe size…',
          fa: 'رد پایی پیدا کردند که با هیچ سایز کفش جور نبود…',
        },
      },
      {
        id: 'a19',
        text: {
          en: 'A rope ladder hung from nowhere useful…',
          fa: 'نردبان طنابی از جایی بی‌فایده آویزان بود…',
        },
      },
      {
        id: 'a20',
        text: {
          en: 'The island on the map wasn’t there at high tide…',
          fa: 'جزیره روی نقشه در جزرومد بالا نبود…',
        },
      },
      {
        id: 'a21',
        text: {
          en: 'Someone’s watch gained an hour in the canyon…',
          fa: 'ساعت کسی در دره یک ساعت جلو رفت…',
        },
      },
      {
        id: 'a22',
        text: {
          en: 'The campsite had a fire already lit…',
          fa: 'کمپ از قبل آتش روشن داشت…',
        },
      },
      {
        id: 'a23',
        text: {
          en: 'A trail marker pointed in four directions at once…',
          fa: 'نشان مسیر هم‌زمان به چهار جهت اشاره داشت…',
        },
      },
      {
        id: 'a24',
        text: {
          en: 'They heard a train where no tracks ran…',
          fa: 'جایی که ریلی نبود صدای قطار شنیدند…',
        },
      },
      {
        id: 'a25',
        text: {
          en: 'The fog lifted to reveal a second path…',
          fa: 'مه بلند شد و مسیر دومی نمایان شد…',
        },
      },
      {
        id: 'a26',
        text: {
          en: 'A kayak waited with two paddles and a note…',
          fa: 'کایاکی با دو پارو و یک یادداشت منتظر بود…',
        },
      },
      {
        id: 'a27',
        text: {
          en: 'The cliff edge held a picnic blanket…',
          fa: 'لبه صخره پتوی پیک‌نیک داشت…',
        },
      },
      {
        id: 'a28',
        text: {
          en: 'Someone’s binoculars showed tomorrow’s weather…',
          fa: 'دوربین دوچشمی کسی هوای فردا را نشان داد…',
        },
      },
      {
        id: 'a29',
        text: {
          en: 'The tunnel under the city had fresh graffiti…',
          fa: 'تونل زیر شهر گرافیتی تازه داشت…',
        },
      },
      {
        id: 'a30',
        text: {
          en: 'A hot air balloon basket sat empty in a field…',
          fa: 'سبد بالون هوای گرم خالی در مزرعه نشسته بود…',
        },
      },
      {
        id: 'a31',
        text: {
          en: 'The GPS coordinates led to a vending machine…',
          fa: 'مختصات جی‌پی‌اس به دستگاه فروش رسید…',
        },
      },
      {
        id: 'a32',
        text: {
          en: 'They found a passport stamped with imaginary countries…',
          fa: 'پاسپورتی با مهر کشورهای خیالی پیدا کردند…',
        },
      },
      {
        id: 'a33',
        text: {
          en: 'A storm paused long enough for a decision…',
          fa: 'طوفان به اندازه یک تصمیم مکث کرد…',
        },
      },
      {
        id: 'a34',
        text: {
          en: 'The abandoned station still sold tickets…',
          fa: 'ایستگاه متروک هنوز بلیت می‌فروخت…',
        },
      },
      {
        id: 'a35',
        text: {
          en: 'Someone’s backpack held a second map…',
          fa: 'کوله‌پشتی کسی نقشه دومی داشت…',
        },
      },
      {
        id: 'a36',
        text: {
          en: 'The lake reflected a building that wasn’t behind them…',
          fa: 'دریاچه ساختمانی را منعکس کرد که پشتشان نبود…',
        },
      },
      {
        id: 'a37',
        text: {
          en: 'A cable car arrived with no operator…',
          fa: 'تله‌کابین بدون اپراتور رسید…',
        },
      },
      {
        id: 'a38',
        text: {
          en: 'The trail snack was labeled “for courage”…',
          fa: 'خوراکی مسیر برچسب «برای شجاعت» داشت…',
        },
      },
      {
        id: 'a39',
        text: {
          en: 'They crossed a border that wasn’t on any map…',
          fa: 'از مرزی عبور کردند که روی هیچ نقشه‌ای نبود…',
        },
      },
      {
        id: 'a40',
        text: {
          en: 'A paper plane delivered coordinates…',
          fa: 'هواپیمای کاغذی مختصات تحویل داد…',
        },
      },
      {
        id: 'a41',
        text: {
          en: 'The mountain hut had tea already poured…',
          fa: 'کلبه کوه چای از قبل ریخته داشت…',
        },
      },
      {
        id: 'a42',
        text: {
          en: 'Someone’s flashlight revealed a door in the rock…',
          fa: 'چراغ‌قوه کسی دری در صخره نشان داد…',
        },
      },
      {
        id: 'a43',
        text: {
          en: 'The tide left a message in shells…',
          fa: 'جزر پیامی با صدف گذاشت…',
        },
      },
      {
        id: 'a44',
        text: {
          en: 'A scooter with a full tank waited at the curb…',
          fa: 'اسکوتری با باک پر کنار جدول منتظر بود…',
        },
      },
      {
        id: 'a45',
        text: {
          en: 'The forest path hummed like an engine…',
          fa: 'مسیر جنگل مثل موتور زمزمه می‌کرد…',
        },
      },
      {
        id: 'a46',
        text: {
          en: 'They found a compass that pointed to dessert…',
          fa: 'قطب‌نمایی پیدا کردند که به دسر اشاره می‌کرد…',
        },
      },
      {
        id: 'a47',
        text: {
          en: 'A bridge toll asked for a secret instead of money…',
          fa: 'عوارض پل به جای پول راز خواست…',
        },
      },
      {
        id: 'a48',
        text: {
          en: 'The canyon echo returned a different sentence…',
          fa: 'پژواک دره جمله متفاوتی برگرداند…',
        },
      },
      {
        id: 'a49',
        text: {
          en: 'Someone’s boots tracked sand from a beach far away…',
          fa: 'چکمه کسی شن ساحلی دور را با خود آورد…',
        },
      },
      {
        id: 'a50',
        text: {
          en: 'The overnight train had one empty sleeper cabin…',
          fa: 'قطار شب یک کوپه خواب خالی داشت…',
        },
      },
      {
        id: 'a51',
        text: {
          en: 'A trail camera captured something waving…',
          fa: 'دوربین مسیر چیزی را در حال دست تکان دادن گرفت…',
        },
      },
      {
        id: 'a52',
        text: {
          en: 'The map’s “you are here” sticker moved…',
          fa: 'برچسب «شما اینجایید» نقشه جابه‌جا شد…',
        },
      },
      {
        id: 'a53',
        text: {
          en: 'They rented a boat that knew the current…',
          fa: 'قایقی کرایه کردند که جریان را می‌شناخت…',
        },
      },
      {
        id: 'a54',
        text: {
          en: 'A summit register had their names already…',
          fa: 'دفتر قله از قبل اسم‌هایشان را داشت…',
        },
      },
      {
        id: 'a55',
        text: {
          en: 'The desert radio played only one song…',
          fa: 'رادیو صحرا فقط یک آهنگ پخش می‌کرد…',
        },
      },
      {
        id: 'a56',
        text: {
          en: 'Someone found a lantern that wouldn’t go out…',
          fa: 'کسی فانوسی پیدا کرد که خاموش نمی‌شد…',
        },
      },
      {
        id: 'a57',
        text: {
          en: 'The cave walls answered questions…',
          fa: 'دیوارهای غار به سوالات جواب می‌دادند…',
        },
      },
      {
        id: 'a58',
        text: {
          en: 'A ferry ticket said “round trip to elsewhere”…',
          fa: 'بلیت فری نوشته بود «رفت‌وبرگشت به جای دیگر»…',
        },
      },
      {
        id: 'a59',
        text: {
          en: 'The trail ended at a door with a doorbell…',
          fa: 'مسیر به دری با زنگ رسید…',
        },
      },
      {
        id: 'a60',
        text: {
          en: 'They packed for rain and found sunshine waiting…',
          fa: 'برای باران بسته‌بندی کردند و آفتاب منتظر بود…',
        },
      },
      {
        id: 'a61',
        text: {
          en: 'A mountain goat blocked the path with purpose…',
          fa: 'بز کوهی با هدف راه را بست…',
        },
      },
      {
        id: 'a62',
        text: {
          en: 'The campsite rules were written in jokes…',
          fa: 'قوانین کمپ با جوک نوشته شده بود…',
        },
      },
      {
        id: 'a63',
        text: {
          en: 'Someone’s tent had a view that changed hourly…',
          fa: 'چادر کسی منظره‌ای داشت که ساعتی عوض می‌شد…',
        },
      },
      {
        id: 'a64',
        text: {
          en: 'The river stones spelled a warning…',
          fa: 'سنگ‌های رود هشداری هجی کردند…',
        },
      },
      {
        id: 'a65',
        text: {
          en: 'A hitchhiker offered better directions than the map…',
          fa: 'مسافر لیفت مسیر بهتر از نقشه داد…',
        },
      },
      {
        id: 'a66',
        text: {
          en: 'The abandoned runway still had landing lights…',
          fa: 'باند متروک هنوز چراغ فرود داشت…',
        },
      },
      {
        id: 'a67',
        text: {
          en: 'They found a bike locked with a riddle…',
          fa: 'دوچرخه‌ای با قفل معما پیدا کردند…',
        },
      },
      {
        id: 'a68',
        text: {
          en: 'A trail mix bag contained a metal key…',
          fa: 'کیسه تنقلات مسیر یک کلید فلزی داشت…',
        },
      },
      {
        id: 'a69',
        text: {
          en: 'The ridge wind carried laughter from below…',
          fa: 'باد یال کوه خنده از پایین آورد…',
        },
      },
      {
        id: 'a70',
        text: {
          en: 'Someone’s camera roll had photos from a trip not taken…',
          fa: 'گالری کسی عکس سفری داشت که نرفته بودند…',
        },
      },
      {
        id: 'a71',
        text: {
          en: 'The border stamp glowed faintly…',
          fa: 'مهر مرز کم‌نور می‌درخشید…',
        },
      },
      {
        id: 'a72',
        text: {
          en: 'A dock creaked like it was clearing its throat…',
          fa: 'اسکله طوری جیرجیر کرد انگار گلویش را صاف می‌کند…',
        },
      },
      {
        id: 'a73',
        text: {
          en: 'The overnight bus stopped in a town not listed…',
          fa: 'اتوبوس شب در شهری ایستاد که لیست نبود…',
        },
      },
      {
        id: 'a74',
        text: {
          en: 'They found a backpack packed for two…',
          fa: 'کوله‌ای پیدا کردند که برای دو نفر بسته شده بود…',
        },
      },
      {
        id: 'a75',
        text: {
          en: 'A trail sign said “almost there” for three hours…',
          fa: 'تابلو مسیر سه ساعت نوشت «تقریباً رسیدی»…',
        },
      },
      {
        id: 'a76',
        text: {
          en: 'The canyon floor held a picnic for strangers…',
          fa: 'کف دره پیک‌نیکی برای غریبه‌ها داشت…',
        },
      },
      {
        id: 'a77',
        text: {
          en: 'Someone’s boots chose the steeper path…',
          fa: 'چکمه کسی مسیر شیب‌دارتر را انتخاب کرد…',
        },
      },
      {
        id: 'a78',
        text: {
          en: 'The lighthouse keeper left tea and a riddle…',
          fa: 'نگهبان فانوس چای و معما گذاشت…',
        },
      },
      {
        id: 'a79',
        text: {
          en: 'A paper map folded itself into a plane…',
          fa: 'نقشه کاغذی خودش را به هواپیما تا کرد…',
        },
      },
      {
        id: 'a80',
        text: {
          en: 'The adventure started when the power bank died…',
          fa: 'ماجراجویی وقتی پاوربانک مرد شروع شد…',
        },
      },
    ],
  },
]

export function getPackStarters(packId: string): StoryStarter[] {
  return STARTER_PACKS.find((p) => p.id === packId)?.starters ?? STARTER_PACKS[0]!.starters
}
