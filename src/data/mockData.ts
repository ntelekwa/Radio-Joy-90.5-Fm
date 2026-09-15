import { Article, Category, Program, StationFrequency, TeamMember, ShoutoutMessage, PushNotification } from '../types';

export const STATION_INFO = {
  name: 'Radio Joy 90.5 FM',
  shortName: 'JOY FM',
  frequency: '90.5 MHz',
  slogan: '',
  city: 'Kibirizi, Kigoma, Tanzania',
  address: 'Kibirizi, Halmashauri ya Manispaa ya Kigoma-Ujiji, Mkoa wa Kigoma',
  organization: 'Joy in the Harvest',
  phoneStudio: '+255 768 386 899',
  phoneOffice: '+255 768 386 899',
  whatsapp: '+255 768 386 899',
  whatsappLink: 'https://wa.me/255768386899',
  email: 'joyradiofm464@gmail.com',
  emailInfo: 'info@radiojoyfm.co.tz',
  website: 'https://radiojoyfm.co.tz',
  streamUrl: 'https://radiotadio.co.tz/joy-fm-stream',
  logoUrl: 'https://radiojoyfm.co.tz/wp-content/uploads/2023/07/cropped-cropped-LOGO-KM.jpg',
  social: {
    twitter: 'https://twitter.com/radiojoyfm',
    facebook: 'https://facebook.com/RadioJoyFmKigoma',
    instagram: 'https://instagram.com/radiojoyfm',
    youtube: 'https://youtube.com/@radiojoyfm',
  },
  established: '2015',
  broadcastHours: '24/7 Masaa 24',
};

export const CATEGORIES: Category[] = [
  {
    id: 'habari-leo',
    name: 'Habari Leo',
    nameSwahili: 'Habari za Leo',
    slug: 'habari-leo',
    count: 357,
    color: 'from-blue-600 to-blue-800',
    accentBg: 'bg-blue-600/10 text-blue-400 border-blue-600/20',
    description: 'Habari kuu za siku, matukio ya kitaifa, na ripoti za serikali na maendeleo Kigoma',
  },
  {
    id: 'michezo',
    name: 'Michezo',
    nameSwahili: 'Dimba la Michezo',
    slug: 'michezo',
    count: 255,
    color: 'from-yellow-500 to-amber-600',
    accentBg: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    description: 'Uchambuzi wa michezo ya kitaifa na kimataifa, Ligi Kuu ya NBC, na soka la Kigoma',
  },
  {
    id: 'burudani',
    name: 'Burudani',
    nameSwahili: 'Burudani & Sanaa',
    slug: 'burudani',
    count: 188,
    color: 'from-blue-500 to-indigo-600',
    accentBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    description: 'Muziki wa kitamaduni, Bongo Flava, gospel, mahojiano ya mastaa na sanaa za Afrika Mashariki',
  },
  {
    id: 'jamii',
    name: 'Jamii & Maendeleo',
    nameSwahili: 'Jamii & Afya',
    slug: 'jamii',
    count: 142,
    color: 'from-amber-500 to-yellow-600',
    accentBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    description: 'Usaidizi wa wasiojiweza, miradi ya hospitali, shule, maji safi na mazingira ya Ziwa Tanganyika',
  },
  {
    id: 'kitaifa',
    name: 'Kitaifa',
    nameSwahili: 'Kitaifa & Miradi',
    slug: 'kitaifa',
    count: 120,
    color: 'from-sky-500 to-blue-700',
    accentBg: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    description: 'Mbio za Mwenge wa Uhuru, miradi ya kimkakati ya reli, barabara na maamuzi ya kiserikali',
  },
  {
    id: 'kimataifa',
    name: 'Kimataifa',
    nameSwahili: 'Afrika Mashariki',
    slug: 'kimataifa',
    count: 85,
    color: 'from-blue-700 to-slate-800',
    accentBg: 'bg-blue-700/10 text-blue-300 border-blue-700/20',
    description: 'Nchi jirani za Burundi, DRC, Rwanda na maendeleo ya Jumuiya ya Afrika Mashariki (EAC)',
  },
];

export const ARTICLES: Article[] = [
  {
    "id": "joy-2425",
    "title": "Mbunge atoa milioni 2.5 kusaidia mama asiyekuwa nyumba",
    "summary": "Wananchi wa Kijiji cha Ruchugi Wilayani Uvinza Mkoani Kigoma wamesema kuwa hatua za mbunge wa",
    "content": [
      "Wananchi wa Kijiji cha Ruchugi Wilayani Uvinza Mkoani Kigoma wamesema kuwa hatua za mbunge wa jimbo la Kigoma Kaskazini kujitoa kwa ajili ya wananchi wake kutokana na namna ambavyo ameendelea kuwasaidia watu wenye mahitaji mbalimbali Na Orida Sayon Mbunge wa jimbo la Kigoma Kusini, Mhe. Nuru Kashakari, ametoa kiasi cha shilingi milioni 2.5 kwa ajili ya kumsaidia mama asiye na makazi ya…"
    ],
    "rawHtml": "<p>Wananchi wa Kijiji cha Ruchugi Wilayani Uvinza Mkoani Kigoma wamesema kuwa hatua za mbunge wa jimbo la Kigoma Kaskazini kujitoa kwa ajili ya wananchi wake kutokana na namna ambavyo ameendelea kuwasaidia watu wenye mahitaji mbalimbali Na Orida Sayon Mbunge wa jimbo la Kigoma Kusini, Mhe. Nuru Kashakari, ametoa kiasi cha shilingi milioni 2.5 kwa ajili ya kumsaidia mama asiye na makazi ya…</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/09/14/10837/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "jamii",
    "imageUrl": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200&q=80",
    "caption": "Mbunge atoa milioni 2.5 kusaidia mama asiyekuwa nyumba",
    "author": {
      "name": "Orida Sayon",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "14 Sep 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Uvinza",
      "Kigoma"
    ],
    "isBreaking": true,
    "isTrending": false,
    "viewsCount": 3125,
    "sharesCount": 375,
    "originalUrl": "https://radiojoyfm.co.tz/mbunge-atoa-milioni-2-5-kusaidia-mama-asiyekuwa-nyumba/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2424",
    "title": "Kigoma imeanza kutumia e-Ardhi kuimarisha huduma za ardhi",
    "summary": "Matumizi ya teknolojia yanavyoweza kuongeza kasi ya utoaji wa huduma za ardhi. Na Josephine Kiravu",
    "content": [
      "Matumizi ya teknolojia yanavyoweza kuongeza kasi ya utoaji wa huduma za ardhi. Na Josephine Kiravu Mkoa wa Kigoma umeanza rasmi kutumia mfumo wa Kielektroniki wa E ardhi, hatua inayotajwa kurahisisha na kuongeza ufanisi katika utoaji wa huduma za ardhi kwa wananchi. Akizungumza na wanahabari mkoani Kigoma Kamishana wa ardhi kutoka Wizara ya ardhi nyumba na maendeleo ya makazi…"
    ],
    "rawHtml": "<p>Matumizi ya teknolojia yanavyoweza kuongeza kasi ya utoaji wa huduma za ardhi. Na Josephine Kiravu Mkoa wa Kigoma umeanza rasmi kutumia mfumo wa Kielektroniki wa E ardhi, hatua inayotajwa kurahisisha na kuongeza ufanisi katika utoaji wa huduma za ardhi kwa wananchi. Akizungumza na wanahabari mkoani Kigoma Kamishana wa ardhi kutoka Wizara ya ardhi nyumba na maendeleo ya makazi…</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/09/14/10842/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "teknolojia",
    "imageUrl": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
    "caption": "Kigoma imeanza kutumia e-Ardhi kuimarisha huduma za ardhi",
    "author": {
      "name": "Josephine Kiravu",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "14 Sep 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kigoma"
    ],
    "isBreaking": false,
    "isTrending": true,
    "viewsCount": 3060,
    "sharesCount": 366,
    "originalUrl": "https://radiojoyfm.co.tz/kigoma-imeanza-kutumia-e-ardhi-kuimarisha-huduma-za-ardhi/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2423",
    "title": "Mwang’onda ataka wahandisi kuimarisha usimamizi wa miradi Kigoma",
    "summary": "Utekelezaji wa mradi huo unahusisha ujenzi wa vyumba nane vya madarasa, ofisi, jengo la utawala,",
    "content": [
      "Utekelezaji wa mradi huo unahusisha ujenzi wa vyumba nane vya madarasa, ofisi, jengo la utawala, maktaba, TEHAMA, maabara na matundu 13 ya vyoo Na Lucas Hoha Wanafunzi katika Kijiji cha Msimba, Kata ya Mugonya, Halmashauri ya Wilaya ya Kigoma Mkoa wa Kigoma ambao walikuwa wakikabiliwa na changamoto ya umbali mrefu wa kwenda shule ya sekondari Luiche, sasa wameondokana na adha hiyo baada…"
    ],
    "rawHtml": "<p>Utekelezaji wa mradi huo unahusisha ujenzi wa vyumba nane vya madarasa, ofisi, jengo la utawala, maktaba, TEHAMA, maabara na matundu 13 ya vyoo Na Lucas Hoha Wanafunzi katika Kijiji cha Msimba, Kata ya Mugonya, Halmashauri ya Wilaya ya Kigoma Mkoa wa Kigoma ambao walikuwa wakikabiliwa na changamoto ya umbali mrefu wa kwenda shule ya sekondari Luiche, sasa wameondokana na adha hiyo baada…</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/09/12/10817/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "habari-leo",
    "imageUrl": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=1200&q=80",
    "caption": "Mwang’onda ataka wahandisi kuimarisha usimamizi wa miradi Kigoma",
    "author": {
      "name": "Lucas Hoha",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "13 Sep 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kigoma"
    ],
    "isBreaking": false,
    "isTrending": true,
    "viewsCount": 2995,
    "sharesCount": 357,
    "originalUrl": "https://radiojoyfm.co.tz/mwangonda-ataka-wahandisi-kuimarisha-usimamizi-wa-miradi-kigoma/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2422",
    "title": "Mwenge wa uhuru wakagua na kuzindua miradi Kigoma MC",
    "summary": "Mbio za Mwenge wa Uhuru Kitaifa mwaka 2026 zimewasili katika Manispaa ya Kigoma Ujiji, Mkoani",
    "content": [
      "Mbio za Mwenge wa Uhuru Kitaifa mwaka 2026 zimewasili katika Manispaa ya Kigoma Ujiji, Mkoani Kigoma, ambapo Mwenge huo unatembelea, kukagua, kuzindua na kuweka mawe ya msingi katika miradi mbalimbali ya maendeleo. Na Lucas Hoha Ukiwa katika Manispaa ya Kigoma Ujiji, Mwenge wa Uhuru umeshazindua Bweni la Wavulana katika Shule ya Sekondari Buronge, lenye thamani ya zaidi ya shilingi…"
    ],
    "rawHtml": "<p>Mbio za Mwenge wa Uhuru Kitaifa mwaka 2026 zimewasili katika Manispaa ya Kigoma Ujiji, Mkoani Kigoma, ambapo Mwenge huo unatembelea, kukagua, kuzindua na kuweka mawe ya msingi katika miradi mbalimbali ya maendeleo. Na Lucas Hoha Ukiwa katika Manispaa ya Kigoma Ujiji, Mwenge wa Uhuru umeshazindua Bweni la Wavulana katika Shule ya Sekondari Buronge, lenye thamani ya zaidi ya shilingi…</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/09/13/10829/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "habari-leo",
    "imageUrl": "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1200&q=80",
    "caption": "Mwenge wa uhuru wakagua na kuzindua miradi Kigoma MC",
    "author": {
      "name": "Lucas Hoha",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "13 Sep 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kigoma",
      "Mwenge wa Uhuru"
    ],
    "isBreaking": false,
    "isTrending": true,
    "viewsCount": 2930,
    "sharesCount": 348,
    "originalUrl": "https://radiojoyfm.co.tz/mwenge-wa-uhuru-wakagua-na-kuzindua-miradi-kigoma-mc/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2421",
    "title": "Miradi 7 ya zaidi ya  bilioni 15.4 kuzinduliwa na mwenge wa uhuru Buhigwe",
    "summary": "Mwenge wa uhuru umeendelea kukagua na kuzindua miradi ya maendeleo katika maeneo mbalimbali ya wilaya",
    "content": [
      "Mwenge wa uhuru umeendelea kukagua na kuzindua miradi ya maendeleo katika maeneo mbalimbali ya wilaya za Mkoa wa Kigoma huku ukisisitiza miradi hiyo kutunzwa Na Hagai Ruyagila Mwenge wa Uhuru umeanza mbio zake leo Septemba 11, 2026 katika Wilaya ya Buhigwe mkoani Kigoma, ukitokea Wilaya ya Kasulu, ambapo unatarajiwa kuzindua, kutembelea, kukagua na kuweka mawe ya msingi katika miradi…"
    ],
    "rawHtml": "<p>Mwenge wa uhuru umeendelea kukagua na kuzindua miradi ya maendeleo katika maeneo mbalimbali ya wilaya za Mkoa wa Kigoma huku ukisisitiza miradi hiyo kutunzwa Na Hagai Ruyagila Mwenge wa Uhuru umeanza mbio zake leo Septemba 11, 2026 katika Wilaya ya Buhigwe mkoani Kigoma, ukitokea Wilaya ya Kasulu, ambapo unatarajiwa kuzindua, kutembelea, kukagua na kuweka mawe ya msingi katika miradi…</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/09/11/10791/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "habari-leo",
    "imageUrl": "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1200&q=80",
    "caption": "Miradi 7 ya zaidi ya  bilioni 15.4 kuzinduliwa na mwenge wa uhuru Buhigwe",
    "author": {
      "name": "Hagai Ruyagila",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "11 Sep 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Buhigwe",
      "Mwenge wa Uhuru"
    ],
    "isBreaking": false,
    "isTrending": false,
    "viewsCount": 2865,
    "sharesCount": 339,
    "originalUrl": "https://radiojoyfm.co.tz/miradi-7-ya-zaidi-ya-bilioni-15-4-kuzinduliwa-na-mwenge-wa-uhuru-buhigwe/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2419",
    "title": "Mwenge kutembelea miradi 7 ya zaidi ya bilioni 37",
    "summary": "Mwenge wa uhuru 2026 umeendelea na mbio zake katika Halmashauri ya mji wa Kasulu ambapo",
    "content": [
      "Mwenge wa uhuru 2026 umeendelea na mbio zake katika Halmashauri ya mji wa Kasulu ambapo unatembelea, kukagua na kuzindua miradi mbalimbali ya maendeleo Na Hagai Ruyagila Mkurugenzi wa Halmashauri ya Mji Kasulu mkoani Kigoma, Mwl. Vumilia Julius Simbeye, amepokea Mwenge wa Uhuru 2026 kutoka kwa Mkurugenzi Mtendaji wa Halmashauri ya Wilaya ya Kasulu, CPA Francis Kafuku…"
    ],
    "rawHtml": "<p>Mwenge wa uhuru 2026 umeendelea na mbio zake katika Halmashauri ya mji wa Kasulu ambapo unatembelea, kukagua na kuzindua miradi mbalimbali ya maendeleo Na Hagai Ruyagila Mkurugenzi wa Halmashauri ya Mji Kasulu mkoani Kigoma, Mwl. Vumilia Julius Simbeye, amepokea Mwenge wa Uhuru 2026 kutoka kwa Mkurugenzi Mtendaji wa Halmashauri ya Wilaya ya Kasulu, CPA Francis Kafuku…</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/09/10/10776/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "habari-leo",
    "imageUrl": "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1200&q=80",
    "caption": "Mwenge kutembelea miradi 7 ya zaidi ya bilioni 37",
    "author": {
      "name": "Hagai Ruyagila",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "10 Sep 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kasulu",
      "Mwenge wa Uhuru"
    ],
    "isBreaking": false,
    "isTrending": false,
    "viewsCount": 2800,
    "sharesCount": 330,
    "originalUrl": "https://radiojoyfm.co.tz/mwenge-kutembelea-miradi-7-ya-zaidi-ya-bilioni-37/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2418",
    "title": "Mradi wa maji wenye thamani ya zaidi ya Bilion 1 nyamnyunsi",
    "summary": "Kukamilika kwa mradi wa maji Nyamnyusi utasaidia kupunguza changamoto za wananchi kutembea umbali mrefu kutafuta",
    "content": [
      "Kukamilika kwa mradi wa maji Nyamnyusi utasaidia kupunguza changamoto za wananchi kutembea umbali mrefu kutafuta huduma ya maji Na Emmanuel Kamangu Mwenge wa uhuru 2026 umekagua na kuzindua mradi wa maji wenye thamani ya zaidi ya Bilion 1 katika kijiji cha nyamnyunsi halmashauri ya wilaya ya kasulu ikiwa ni mwendelezo wa mkakati wa serikali wa kuhakikisha inamtua mama ndo kichwani."
    ],
    "rawHtml": "<p>Kukamilika kwa mradi wa maji Nyamnyusi utasaidia kupunguza changamoto za wananchi kutembea umbali mrefu kutafuta huduma ya maji Na Emmanuel Kamangu Mwenge wa uhuru 2026 umekagua na kuzindua mradi wa maji wenye thamani ya zaidi ya Bilion 1 katika kijiji cha nyamnyunsi halmashauri ya wilaya ya kasulu ikiwa ni mwendelezo wa mkakati wa serikali wa kuhakikisha inamtua mama ndo kichwani.</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/09/10/10782/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "jamii",
    "imageUrl": "https://images.unsplash.com/photo-1541888946425-d0fbb180c5f2?w=1200&q=80",
    "caption": "Mradi wa maji wenye thamani ya zaidi ya Bilion 1 nyamnyunsi",
    "author": {
      "name": "Emmanuel Kamangu",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "10 Sep 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kigoma",
      "Habari"
    ],
    "isBreaking": false,
    "isTrending": false,
    "viewsCount": 2735,
    "sharesCount": 321,
    "originalUrl": "https://radiojoyfm.co.tz/mradi-wa-maji-wenye-thamani-ya-zaidi-ya-bilion-1-nyamnyunsi/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2417",
    "title": "Huduma ya M-mama yapunguza vifo vya mama na mtoto",
    "summary": "Afya ya mama na mtoto ni jambo muhimu katika maendeleo ya jamii na taifa kwa",
    "content": [
      "Afya ya mama na mtoto ni jambo muhimu katika maendeleo ya jamii na taifa kwa ujumla miongoni mwa changamoto zinazoweza kuhatarisha maisha ya wajawazito na watoto ni kuchelewa kupata huduma za afya, hasa pale ambapo mgonjwa anahitaji usafiri wa haraka kwenda kituo cha afya Na Emmanuel Kamangu Huduma ya usafiri wa dharula kwa mama mjamzito na mama aliye jifungua yaani M-mama katika…"
    ],
    "rawHtml": "<p>Afya ya mama na mtoto ni jambo muhimu katika maendeleo ya jamii na taifa kwa ujumla miongoni mwa changamoto zinazoweza kuhatarisha maisha ya wajawazito na watoto ni kuchelewa kupata huduma za afya, hasa pale ambapo mgonjwa anahitaji usafiri wa haraka kwenda kituo cha afya Na Emmanuel Kamangu Huduma ya usafiri wa dharula kwa mama mjamzito na mama aliye jifungua yaani M-mama katika…</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/09/10/10788/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "jamii",
    "imageUrl": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200&q=80",
    "caption": "Huduma ya M-mama yapunguza vifo vya mama na mtoto",
    "author": {
      "name": "Emmanuel Kamangu",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "10 Sep 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kigoma",
      "Habari"
    ],
    "isBreaking": false,
    "isTrending": false,
    "viewsCount": 2670,
    "sharesCount": 312,
    "originalUrl": "https://radiojoyfm.co.tz/huduma-ya-m-mama-yapunguza-vifo-vya-mama-na-mtoto/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2416",
    "title": "Miradi 13 kutembelewa na mwenge wa uhuru Kasulu",
    "summary": "Kiongozi wa mbio za mwenge wa uhuru mwaka 2026 Wazo Mwang’onda amesema dhamira ya serikali",
    "content": [
      "Kiongozi wa mbio za mwenge wa uhuru mwaka 2026 Wazo Mwang’onda amesema dhamira ya serikali ni kuhakikisha inaboresha miundombinu ya kutolea huduma muhimu kwa wananchi Na Hagai Ruyagila Mwenge wa Uhuru kwa mwaka 2026 umeanza mbio zake katika Wilaya ya Kasulu mkoani Kigoma ukitokea Wilayani Kibondo ambapo miradi mbalimbali ya maendeleo ikiwemo elimu, afya, barabara na maji inatarajiwa…"
    ],
    "rawHtml": "<p>Kiongozi wa mbio za mwenge wa uhuru mwaka 2026 Wazo Mwang’onda amesema dhamira ya serikali ni kuhakikisha inaboresha miundombinu ya kutolea huduma muhimu kwa wananchi Na Hagai Ruyagila Mwenge wa Uhuru kwa mwaka 2026 umeanza mbio zake katika Wilaya ya Kasulu mkoani Kigoma ukitokea Wilayani Kibondo ambapo miradi mbalimbali ya maendeleo ikiwemo elimu, afya, barabara na maji inatarajiwa…</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/09/09/10761/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "habari-leo",
    "imageUrl": "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1200&q=80",
    "caption": "Miradi 13 kutembelewa na mwenge wa uhuru Kasulu",
    "author": {
      "name": "Hagai Ruyagila",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "9 Sep 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kasulu",
      "Mwenge wa Uhuru"
    ],
    "isBreaking": false,
    "isTrending": false,
    "viewsCount": 2605,
    "sharesCount": 303,
    "originalUrl": "https://radiojoyfm.co.tz/miradi-13-kutembelewa-na-mwenge-wa-uhuru-kasulu/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2415",
    "title": "Zaidi ya Tsh 122 milioni zajenga bwalo la chakula, jiko banifu Makere sekondari",
    "summary": "Uboreshaji wa miundombinu ya elimu inasaidia wanafunzi kupata mazingira rafiki ya kujinzia Na Hagai Ruyagila",
    "content": [
      "Uboreshaji wa miundombinu ya elimu inasaidia wanafunzi kupata mazingira rafiki ya kujinzia Na Hagai Ruyagila Mwenge wa uhuru 2026 umezindua na kukagua mradi wa ujenzi wa bwalo la chakula pamoja na majiko banifu katika Shule ya Sekondari Makere, Halmashauri ya Wilaya ya Kasulu, mkoani Kigoma, wenye thamani ya zaidi ya shilingi milioni 122. Akisoma taarifa ya mradi huo…"
    ],
    "rawHtml": "<p>Uboreshaji wa miundombinu ya elimu inasaidia wanafunzi kupata mazingira rafiki ya kujinzia Na Hagai Ruyagila Mwenge wa uhuru 2026 umezindua na kukagua mradi wa ujenzi wa bwalo la chakula pamoja na majiko banifu katika Shule ya Sekondari Makere, Halmashauri ya Wilaya ya Kasulu, mkoani Kigoma, wenye thamani ya zaidi ya shilingi milioni 122. Akisoma taarifa ya mradi huo…</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/09/09/10769/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "jamii",
    "imageUrl": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",
    "caption": "Zaidi ya Tsh 122 milioni zajenga bwalo la chakula, jiko banifu Makere sekondari",
    "author": {
      "name": "Hagai Ruyagila",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "9 Sep 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kigoma",
      "Habari"
    ],
    "isBreaking": false,
    "isTrending": false,
    "viewsCount": 2540,
    "sharesCount": 294,
    "originalUrl": "https://radiojoyfm.co.tz/zaidi-ya-tsh-122-milioni-zajenga-bwalo-la-chakula-jiko-banifu-makere-sekondari/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2414",
    "title": "Mwenge wa uhuru kuzinndua miradi ya bilioni 73.2 Kigoma",
    "summary": "Mwenge wa uhuru umewasili Mkoani Kigoma ambapo umepokelewa katika Halmashauri ya Wilaya Kakonko na unatarajia",
    "content": [
      "Mwenge wa uhuru umewasili Mkoani Kigoma ambapo umepokelewa katika Halmashauri ya Wilaya Kakonko na unatarajia kutembelea, kukagua na kuweka mawe ya msingi katika miradi mbalimbali ya maendeleo. Na Mwandishi wetu Mwenge wa Uhuru umepokelewa na kuanzia mbio zake Mkoa wa Kigoma katika Halmashauri ya Wilaya ya Kakonko, ambapo jumla ya miradi yenye thamani ya Shilingi Bil.73.2 itazinduliwa…"
    ],
    "rawHtml": "<p>Mwenge wa uhuru umewasili Mkoani Kigoma ambapo umepokelewa katika Halmashauri ya Wilaya Kakonko na unatarajia kutembelea, kukagua na kuweka mawe ya msingi katika miradi mbalimbali ya maendeleo. Na Mwandishi wetu Mwenge wa Uhuru umepokelewa na kuanzia mbio zake Mkoa wa Kigoma katika Halmashauri ya Wilaya ya Kakonko, ambapo jumla ya miradi yenye thamani ya Shilingi Bil.73.2 itazinduliwa…</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/09/08/10747/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "habari-leo",
    "imageUrl": "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1200&q=80",
    "caption": "Mwenge wa uhuru kuzinndua miradi ya bilioni 73.2 Kigoma",
    "author": {
      "name": "Mwandishi Wetu",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "8 Sep 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kakonko",
      "Kigoma",
      "Mwenge wa Uhuru"
    ],
    "isBreaking": false,
    "isTrending": false,
    "viewsCount": 2475,
    "sharesCount": 285,
    "originalUrl": "https://radiojoyfm.co.tz/mwenge-wa-uhuru-kuzinndua-miradi-ya-bilioni-73-2-kigoma/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2413",
    "title": "Mwenge wa uhuru waridhishwa na mradi wa maji Luhuru Kakonko",
    "summary": "Mradi wa maji Luhuru uliopo Wilayani Kakonko unaenda kuwa mwarobaini ya ukosefubwa maji kwa wananchi",
    "content": [
      "Mradi wa maji Luhuru uliopo Wilayani Kakonko unaenda kuwa mwarobaini ya ukosefubwa maji kwa wananchi waliokuwa wakitembea umbali mrefu kufuata huduma za maji Na Mwandishi wetu Kiongozi wa Mbio za Mwenge wa Uhuru kitaifa Wazo Mwang’onda ametoa wito wa kuendelea kutunzwa miundombinu ya maji ili iweze kudumu na kutoa huduma kwa muda mrefu. Kiongozi huyo ametoa wito huo mara baada ya…"
    ],
    "rawHtml": "<p>Mradi wa maji Luhuru uliopo Wilayani Kakonko unaenda kuwa mwarobaini ya ukosefubwa maji kwa wananchi waliokuwa wakitembea umbali mrefu kufuata huduma za maji Na Mwandishi wetu Kiongozi wa Mbio za Mwenge wa Uhuru kitaifa Wazo Mwang’onda ametoa wito wa kuendelea kutunzwa miundombinu ya maji ili iweze kudumu na kutoa huduma kwa muda mrefu. Kiongozi huyo ametoa wito huo mara baada ya…</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/09/08/10752/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "jamii",
    "imageUrl": "https://images.unsplash.com/photo-1541888946425-d0fbb180c5f2?w=1200&q=80",
    "caption": "Mwenge wa uhuru waridhishwa na mradi wa maji Luhuru Kakonko",
    "author": {
      "name": "Wazo Mwang’onda",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "8 Sep 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kakonko",
      "Mwenge wa Uhuru"
    ],
    "isBreaking": false,
    "isTrending": false,
    "viewsCount": 2410,
    "sharesCount": 276,
    "originalUrl": "https://radiojoyfm.co.tz/mwenge-wa-uhuru-waridhishwa-na-mradi-wa-maji-luhuru-kakonko/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2412",
    "title": "DC Kasulu awataka vijana kuwa wazalendo",
    "summary": "Vijana wametakiwa kufanya kazi kwa bidi na kujishughulisha na kazi zitakazowaingia kipato ili kuepeuka utegemezi",
    "content": [
      "Vijana wametakiwa kufanya kazi kwa bidi na kujishughulisha na kazi zitakazowaingia kipato ili kuepeuka utegemezi Na Hagai Ruyagila Mkuu wa Wilaya ya Kasulu mkoani Kigoma, Kanali Isaac Mwakisu, amewataka vijana wa Halmashauri ya Mji Kasulu kujiandaa kwa ajili ya maisha yao ya baadaye kwa kuwa wazalendo, kufanya kazi kwa bidii na kujihusisha na shughuli zenye manufaa kwao na taifa kwa…"
    ],
    "rawHtml": "<p>Vijana wametakiwa kufanya kazi kwa bidi na kujishughulisha na kazi zitakazowaingia kipato ili kuepeuka utegemezi Na Hagai Ruyagila Mkuu wa Wilaya ya Kasulu mkoani Kigoma, Kanali Isaac Mwakisu, amewataka vijana wa Halmashauri ya Mji Kasulu kujiandaa kwa ajili ya maisha yao ya baadaye kwa kuwa wazalendo, kufanya kazi kwa bidii na kujihusisha na shughuli zenye manufaa kwao na taifa kwa…</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/09/07/10741/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "habari-leo",
    "imageUrl": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&q=80",
    "caption": "DC Kasulu awataka vijana kuwa wazalendo",
    "author": {
      "name": "Hagai Ruyagila",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "7 Sep 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kasulu"
    ],
    "isBreaking": false,
    "isTrending": false,
    "viewsCount": 2345,
    "sharesCount": 267,
    "originalUrl": "https://radiojoyfm.co.tz/dc-kasulu-awataka-vijana-kuwa-wazalendo/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2411",
    "title": "TAKUKURU yakabidhi mashine kwa ajili ya watoto njiti Kigoma",
    "summary": "Hospitali ya rufaa ya Mkoa wa Kigoma Maweni imepokea mashine kwa ajili ya watoto njiti",
    "content": [
      "Hospitali ya rufaa ya Mkoa wa Kigoma Maweni imepokea mashine kwa ajili ya watoto njiti kutoka taasisi ya kupambana na kuzuia rushwa TAKUKURU Taasisi ya Kuzuia na Kupambana na Rushwa (TAKUKURU) imekabidhi mashine mbili maalum kwa ajili ya kusaidia utoaji wa huduma kwa watoto waliozaliwa kabla ya muda, maarufu kama watoto njiti, katika Hospitali ya Rufaa ya Mkoa wa Kigoma Maweni."
    ],
    "rawHtml": "<p>Hospitali ya rufaa ya Mkoa wa Kigoma Maweni imepokea mashine kwa ajili ya watoto njiti kutoka taasisi ya kupambana na kuzuia rushwa TAKUKURU Taasisi ya Kuzuia na Kupambana na Rushwa (TAKUKURU) imekabidhi mashine mbili maalum kwa ajili ya kusaidia utoaji wa huduma kwa watoto waliozaliwa kabla ya muda, maarufu kama watoto njiti, katika Hospitali ya Rufaa ya Mkoa wa Kigoma Maweni.</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/09/05/10731/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "jamii",
    "imageUrl": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200&q=80",
    "caption": "TAKUKURU yakabidhi mashine kwa ajili ya watoto njiti Kigoma",
    "author": {
      "name": "Chumba cha Habari cha Radio Joy",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "5 Sep 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kigoma"
    ],
    "isBreaking": false,
    "isTrending": false,
    "viewsCount": 2280,
    "sharesCount": 258,
    "originalUrl": "https://radiojoyfm.co.tz/takukuru-yakabidhi-mashine-kwa-ajili-ya-watoto-njiti-kigoma/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2410",
    "title": "Mwenge wa uhuru kuwasili Kasulu Septemba 9, 2026",
    "summary": "Mwenge wa Uhuru ni miongoni mwa alama muhimu za kitaifa, ambazo hutumika kuhamasisha wananchi kuhusu",
    "content": [
      "Mwenge wa Uhuru ni miongoni mwa alama muhimu za kitaifa, ambazo hutumika kuhamasisha wananchi kuhusu masuala ya maendeleo, amani, umoja, uzalendo na utekelezaji wa miradi mbalimbali ya maendeleo nchini. Na Hagai Ruyagila Mkuu wa wilaya ya Kasulu mkoani Kigoma, Kanali Isaac Mwakisu, ameongoza kikao cha kamati maalum cha maandalizi ya mapokezi ya Mwenge wa Uhuru…"
    ],
    "rawHtml": "<p>Mwenge wa Uhuru ni miongoni mwa alama muhimu za kitaifa, ambazo hutumika kuhamasisha wananchi kuhusu masuala ya maendeleo, amani, umoja, uzalendo na utekelezaji wa miradi mbalimbali ya maendeleo nchini. Na Hagai Ruyagila Mkuu wa wilaya ya Kasulu mkoani Kigoma, Kanali Isaac Mwakisu, ameongoza kikao cha kamati maalum cha maandalizi ya mapokezi ya Mwenge wa Uhuru…</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/09/02/10707/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "habari-leo",
    "imageUrl": "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1200&q=80",
    "caption": "Mwenge wa uhuru kuwasili Kasulu Septemba 9, 2026",
    "author": {
      "name": "Hagai Ruyagila",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "2 Sep 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kasulu",
      "Mwenge wa Uhuru"
    ],
    "isBreaking": false,
    "isTrending": false,
    "viewsCount": 2215,
    "sharesCount": 249,
    "originalUrl": "https://radiojoyfm.co.tz/mwenge-wa-uhuru-kuwasili-kasulu-septemba-9-2026/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2409",
    "title": "Mayeye CUP yaanza kurindima Kigoma DC",
    "summary": "Mbunge wa Jimbo la Kigoma Kaskazini mkoani Kigoma ameanzisha mashindano ya mpira wa miguu yenye",
    "content": [
      "Mbunge wa Jimbo la Kigoma Kaskazini mkoani Kigoma ameanzisha mashindano ya mpira wa miguu yenye lengo la mashindano hayo ni kukuza vipaji na kudumisha mshikamano miongoni mwa jamii. Na Sadick Kibwana Ligi ya mbunge wa Jimbo la Kigoma Kaskazini, Mhe. Kiza Mayeye (Mayeye Cup), imeanza rasmi Jumanne hii, Septemba 1, 2026, katika uwanja wa tarafa ya Mwandiga ikihusisha jumla ya timu 32."
    ],
    "rawHtml": "<p>Mbunge wa Jimbo la Kigoma Kaskazini mkoani Kigoma ameanzisha mashindano ya mpira wa miguu yenye lengo la mashindano hayo ni kukuza vipaji na kudumisha mshikamano miongoni mwa jamii. Na Sadick Kibwana Ligi ya mbunge wa Jimbo la Kigoma Kaskazini, Mhe. Kiza Mayeye (Mayeye Cup), imeanza rasmi Jumanne hii, Septemba 1, 2026, katika uwanja wa tarafa ya Mwandiga ikihusisha jumla ya timu 32.</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/09/02/10706/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "michezo",
    "imageUrl": "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&q=80",
    "caption": "Mayeye CUP yaanza kurindima Kigoma DC",
    "author": {
      "name": "Sadick Kibwana",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "2 Sep 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kigoma"
    ],
    "isBreaking": false,
    "isTrending": false,
    "viewsCount": 2150,
    "sharesCount": 240,
    "originalUrl": "https://radiojoyfm.co.tz/mayeye-cup-yaanza-kurindima-kigoma-dc/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2408",
    "title": "Madiwani Kasulu waomba TARURA kuboresha barabara",
    "summary": "Miundombinu ya barabara ni sehemu muhimu katika maendeleo ya nchi kwani hutumika kusafirisha watu, bidhaa",
    "content": [
      "Miundombinu ya barabara ni sehemu muhimu katika maendeleo ya nchi kwani hutumika kusafirisha watu, bidhaa na huduma kutoka sehemu moja kwenda nyingine. Na Hagai Ruyagila Madiwani wa Halmashauri ya Mji Kasulu Mkoani Kigoma, wameiomba serikali kupitia Wakala wa Barabara za Vijijini na Mijini (TARURA), kundelea kuboresha barabara za pembezoni mwa mji wa Kasulu ambazo zimekuwa na changamoto…"
    ],
    "rawHtml": "<p>Miundombinu ya barabara ni sehemu muhimu katika maendeleo ya nchi kwani hutumika kusafirisha watu, bidhaa na huduma kutoka sehemu moja kwenda nyingine. Na Hagai Ruyagila Madiwani wa Halmashauri ya Mji Kasulu Mkoani Kigoma, wameiomba serikali kupitia Wakala wa Barabara za Vijijini na Mijini (TARURA), kundelea kuboresha barabara za pembezoni mwa mji wa Kasulu ambazo zimekuwa na changamoto…</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/09/01/10686/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "habari-leo",
    "imageUrl": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=1200&q=80",
    "caption": "Madiwani Kasulu waomba TARURA kuboresha barabara",
    "author": {
      "name": "Hagai Ruyagila",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "1 Sep 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kasulu"
    ],
    "isBreaking": false,
    "isTrending": false,
    "viewsCount": 2085,
    "sharesCount": 231,
    "originalUrl": "https://radiojoyfm.co.tz/madiwani-kasulu-waomba-tarura-kuboresha-barabara/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2407",
    "title": "DC Kasulu aongoza maadhimisho miaka 20 ya Polisi jamii",
    "summary": "Katika kuadhimisha miaka 20 ya Polisi jamii shughuli mbalimbali zimefanyika ikiwemo usafi wa mazingira katika",
    "content": [
      "Katika kuadhimisha miaka 20 ya Polisi jamii shughuli mbalimbali zimefanyika ikiwemo usafi wa mazingira katika maeneo mbalimbali huku Jeshi hilo likitoa wito kwa wananchi kushirikiana katika kutoa taarifa za uhalifu na wahalifu Na Mwandishi wetu Mkuu wa Wilaya ya Kasulu Kanali Isaac Mwakisu ameongoza zoezi la usafi wa Mazingira katika Halmashauri hiyo akimwakilisha Mkuu wa Mkoa wa Kigoma…"
    ],
    "rawHtml": "<p>Katika kuadhimisha miaka 20 ya Polisi jamii shughuli mbalimbali zimefanyika ikiwemo usafi wa mazingira katika maeneo mbalimbali huku Jeshi hilo likitoa wito kwa wananchi kushirikiana katika kutoa taarifa za uhalifu na wahalifu Na Mwandishi wetu Mkuu wa Wilaya ya Kasulu Kanali Isaac Mwakisu ameongoza zoezi la usafi wa Mazingira katika Halmashauri hiyo akimwakilisha Mkuu wa Mkoa wa Kigoma…</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/09/01/10698/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "habari-leo",
    "imageUrl": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80",
    "caption": "DC Kasulu aongoza maadhimisho miaka 20 ya Polisi jamii",
    "author": {
      "name": "Mwandishi Wetu",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "1 Sep 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kasulu"
    ],
    "isBreaking": false,
    "isTrending": false,
    "viewsCount": 2020,
    "sharesCount": 222,
    "originalUrl": "https://radiojoyfm.co.tz/dc-kasulu-aongoza-maadhimisho-miaka-20-ya-polisi-jamii/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2406",
    "title": "Wajawazito Kasulu watakiwa kutumia vizuri dawa za fefo na foliki",
    "summary": "Matumizi foliki na fefo kwa kufuata maelekezo ya mtaalamu wa afya husaidia kulinda afya ya",
    "content": [
      "Matumizi foliki na fefo kwa kufuata maelekezo ya mtaalamu wa afya husaidia kulinda afya ya mama na mtoto na kupunguza baadhi ya hatari wakati wa ujauzito. Na Emmanuel Kamangu Wanawake wajawazito katika Halmashauri ya Mji wa Kasulu wametakiwa kutumia vizuri dawa aina ya fefo pamoja na foliki ambazo husaidia kukua vizuri kwa viungo vya mtoto aliyeko tumbon."
    ],
    "rawHtml": "<p>Matumizi foliki na fefo kwa kufuata maelekezo ya mtaalamu wa afya husaidia kulinda afya ya mama na mtoto na kupunguza baadhi ya hatari wakati wa ujauzito. Na Emmanuel Kamangu Wanawake wajawazito katika Halmashauri ya Mji wa Kasulu wametakiwa kutumia vizuri dawa aina ya fefo pamoja na foliki ambazo husaidia kukua vizuri kwa viungo vya mtoto aliyeko tumbon.</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/08/31/10676/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "jamii",
    "imageUrl": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200&q=80",
    "caption": "Wajawazito Kasulu watakiwa kutumia vizuri dawa za fefo na foliki",
    "author": {
      "name": "Emmanuel Kamangu",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "31 Ago 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kasulu"
    ],
    "isBreaking": false,
    "isTrending": false,
    "viewsCount": 1955,
    "sharesCount": 213,
    "originalUrl": "https://radiojoyfm.co.tz/wajawazito-kasulu-watakiwa-kutumia-vizuri-dawa-za-fefo-na-foliki/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2405",
    "title": "DC Kasulu kufunga soko kama usafi hautafanyika",
    "summary": "Usafi wa mazingira ni jambo muhimu sana katika maisha ya kila siku ya binadamu. Mazingira",
    "content": [
      "Usafi wa mazingira ni jambo muhimu sana katika maisha ya kila siku ya binadamu. Mazingira safi ni yale ambayo hayana uchafu kama taka, maji machafu, vyakula vilivyooza na vitu vingine vinavyoweza kusababisha madhara kwa afya ya binadamu. Kila mtu ana wajibu wa kuhakikisha mazingira yake yanakuwa safi na salama Na Hagai Ruyagila Mkuu wa Wilaya ya Kasulu, Kanali Isaac Mwakisu…"
    ],
    "rawHtml": "<p>Usafi wa mazingira ni jambo muhimu sana katika maisha ya kila siku ya binadamu. Mazingira safi ni yale ambayo hayana uchafu kama taka, maji machafu, vyakula vilivyooza na vitu vingine vinavyoweza kusababisha madhara kwa afya ya binadamu. Kila mtu ana wajibu wa kuhakikisha mazingira yake yanakuwa safi na salama Na Hagai Ruyagila Mkuu wa Wilaya ya Kasulu, Kanali Isaac Mwakisu…</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/08/31/10680/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "biashara",
    "imageUrl": "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=1200&q=80",
    "caption": "DC Kasulu kufunga soko kama usafi hautafanyika",
    "author": {
      "name": "Hagai Ruyagila",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "31 Ago 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kasulu"
    ],
    "isBreaking": false,
    "isTrending": false,
    "viewsCount": 1890,
    "sharesCount": 204,
    "originalUrl": "https://radiojoyfm.co.tz/dc-kasulu-kufunga-soko-kama-usafi-hautafanyika/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2404",
    "title": "Wananchi Titye Kasulu waanza ujenzi wa shule mpya ya msingi",
    "summary": "Shule mpya inapunguza changamoto za umbali na msongamano, na hivyo kutoa mazingira bora yanayoweza kuongeza",
    "content": [
      "Shule mpya inapunguza changamoto za umbali na msongamano, na hivyo kutoa mazingira bora yanayoweza kuongeza mahudhurio, ushiriki na ufaulu wa wanafunzi Na Emmanuel Kamangu Wananchi wa Kijiji cha Titye, Kata ya Titye, Wilaya ya Kasulu, wameanza ujenzi wa shule mpya ya msingi ikiwa ni mkakati wa kupunguza msongamano katika Shule ya Msingi Titye na kuhakikisha wanafunzi wanapata mazingira…"
    ],
    "rawHtml": "<p>Shule mpya inapunguza changamoto za umbali na msongamano, na hivyo kutoa mazingira bora yanayoweza kuongeza mahudhurio, ushiriki na ufaulu wa wanafunzi Na Emmanuel Kamangu Wananchi wa Kijiji cha Titye, Kata ya Titye, Wilaya ya Kasulu, wameanza ujenzi wa shule mpya ya msingi ikiwa ni mkakati wa kupunguza msongamano katika Shule ya Msingi Titye na kuhakikisha wanafunzi wanapata mazingira…</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/08/28/10670/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "jamii",
    "imageUrl": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",
    "caption": "Wananchi Titye Kasulu waanza ujenzi wa shule mpya ya msingi",
    "author": {
      "name": "Emmanuel Kamangu",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "28 Ago 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kasulu"
    ],
    "isBreaking": false,
    "isTrending": false,
    "viewsCount": 1825,
    "sharesCount": 195,
    "originalUrl": "https://radiojoyfm.co.tz/wananchi-titye-kasulu-waanza-ujenzi-wa-shule-mpya-ya-msingi/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2403",
    "title": "Wazazi wakabidhi madawati 100 kwa wanafunzi  shule ya msingi Titye Kasulu",
    "summary": "Kutengeneza madawati huwasaidia wanafunzi kupata sehemu nzuri ya kukalia wakati wa masomo badala ya kukaa",
    "content": [
      "Kutengeneza madawati huwasaidia wanafunzi kupata sehemu nzuri ya kukalia wakati wa masomo badala ya kukaa sakafuni, wanafunzi hukaa kwenye madawati na hivyo kuwa tayari kujifunza Na Emmanuel Kamangu Wazazi na walezi wa shule ya msingi titye kata ya titye Halmashauri ya Wilaya ya Kasulu wametengeneza madawati 100 na kuyakabidhi kwa shule hiyo ili kukabiliana na wimbi la watoto kukaa…"
    ],
    "rawHtml": "<p>Kutengeneza madawati huwasaidia wanafunzi kupata sehemu nzuri ya kukalia wakati wa masomo badala ya kukaa sakafuni, wanafunzi hukaa kwenye madawati na hivyo kuwa tayari kujifunza Na Emmanuel Kamangu Wazazi na walezi wa shule ya msingi titye kata ya titye Halmashauri ya Wilaya ya Kasulu wametengeneza madawati 100 na kuyakabidhi kwa shule hiyo ili kukabiliana na wimbi la watoto kukaa…</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/08/27/10665/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "jamii",
    "imageUrl": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",
    "caption": "Wazazi wakabidhi madawati 100 kwa wanafunzi  shule ya msingi Titye Kasulu",
    "author": {
      "name": "Emmanuel Kamangu",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "27 Ago 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kasulu"
    ],
    "isBreaking": false,
    "isTrending": false,
    "viewsCount": 1760,
    "sharesCount": 186,
    "originalUrl": "https://radiojoyfm.co.tz/wazazi-wakabidhi-madawati-100-kwa-wanafunzi-shule-ya-msingi-titye-kasulu/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2402",
    "title": "Cambridge shire yasisitiza malezi bora kwa watoto Kigoma",
    "summary": "Malezi bora ya watoto ni jambo muhimu katika maisha ya kila mtoto na malezi huanzia",
    "content": [
      "Malezi bora ya watoto ni jambo muhimu katika maisha ya kila mtoto na malezi huanzia nyumbani kwa huhusisha namna wazazi au walezi wanavyomlea, kumlinda, kumfundisha au kumpa mahitaji muhimu, mtoto anayepata malezi bora huwa na nafasi kubwa ya kukua akiwa na afya njema, tabia nzuri na uwezo wa kuishi vizuri na watu wengine Na Sofia Cosmas Wazazi na walezi katika Manispaa ya Kigoma Ujiji…"
    ],
    "rawHtml": "<p>Malezi bora ya watoto ni jambo muhimu katika maisha ya kila mtoto na malezi huanzia nyumbani kwa huhusisha namna wazazi au walezi wanavyomlea, kumlinda, kumfundisha au kumpa mahitaji muhimu, mtoto anayepata malezi bora huwa na nafasi kubwa ya kukua akiwa na afya njema, tabia nzuri na uwezo wa kuishi vizuri na watu wengine Na Sofia Cosmas Wazazi na walezi katika Manispaa ya Kigoma Ujiji…</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/08/26/10659/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "jamii",
    "imageUrl": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",
    "caption": "Cambridge shire yasisitiza malezi bora kwa watoto Kigoma",
    "author": {
      "name": "Chumba cha Habari cha Radio Joy",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "26 Ago 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kigoma"
    ],
    "isBreaking": false,
    "isTrending": false,
    "viewsCount": 1695,
    "sharesCount": 177,
    "originalUrl": "https://radiojoyfm.co.tz/cambridge-shire-yasisitiza-malezi-bora-kwa-watoto-kigoma/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2401",
    "title": "Waziri wa ulinzi akagua miradi ya maendeleo Kigoma",
    "summary": "Ziara ya Waziri Nyansaho Mkoani Kigoma inalenga kufuatilia utekelezaji wa miradi ya maendeleo yenye umuhimu",
    "content": [
      "Ziara ya Waziri Nyansaho Mkoani Kigoma inalenga kufuatilia utekelezaji wa miradi ya maendeleo yenye umuhimu wa kimkakati, huku ikisisitiza umuhimu wa usalama, miundombinu na ustawi wa wananchi Na Mwandishi wetu Waziri wa Ulinzi na Jeshi la Kujenga Taifa Dkt. Rhimo Nyansaho amesema ujenzi wa kituo cha pamoja cha Forodha kilichopo Manyovu wilayani Buhigwe Mkoani hapa…"
    ],
    "rawHtml": "<p>Ziara ya Waziri Nyansaho Mkoani Kigoma inalenga kufuatilia utekelezaji wa miradi ya maendeleo yenye umuhimu wa kimkakati, huku ikisisitiza umuhimu wa usalama, miundombinu na ustawi wa wananchi Na Mwandishi wetu Waziri wa Ulinzi na Jeshi la Kujenga Taifa Dkt. Rhimo Nyansaho amesema ujenzi wa kituo cha pamoja cha Forodha kilichopo Manyovu wilayani Buhigwe Mkoani hapa…</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/08/24/10642/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "habari-leo",
    "imageUrl": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80",
    "caption": "Waziri wa ulinzi akagua miradi ya maendeleo Kigoma",
    "author": {
      "name": "Mwandishi Wetu",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "24 Ago 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kigoma"
    ],
    "isBreaking": false,
    "isTrending": false,
    "viewsCount": 1630,
    "sharesCount": 168,
    "originalUrl": "https://radiojoyfm.co.tz/waziri-wa-ulinzi-akagua-miradi-ya-maendeleo-kigoma/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2400",
    "title": "Wazazi na walezi watakiwa kulea watoto katika maadili Kasulu",
    "summary": "Malezi bora kwa watoto ni msingi imara kwa maisha yao ya baadaye Na Hagai Ruyagila",
    "content": [
      "Malezi bora kwa watoto ni msingi imara kwa maisha yao ya baadaye Na Hagai Ruyagila Wazazi na Walezi katika Halmashauri ya Mji Kasulu Mkoani Kigoma wametakiwa kuwalea watoto wao katika misingi ya maadili mema, ili waweze kuwa na mwenendo mzuri, kuheshimu jamii na kuwa viongozi bora wa baadaye. Wito huo umetolewa na kaimu mkurugenzi wa Halmashauri ya Mji Kasulu, Nurfus Aziz Ndee…"
    ],
    "rawHtml": "<p>Malezi bora kwa watoto ni msingi imara kwa maisha yao ya baadaye Na Hagai Ruyagila Wazazi na Walezi katika Halmashauri ya Mji Kasulu Mkoani Kigoma wametakiwa kuwalea watoto wao katika misingi ya maadili mema, ili waweze kuwa na mwenendo mzuri, kuheshimu jamii na kuwa viongozi bora wa baadaye. Wito huo umetolewa na kaimu mkurugenzi wa Halmashauri ya Mji Kasulu, Nurfus Aziz Ndee…</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/08/24/10647/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "jamii",
    "imageUrl": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",
    "caption": "Wazazi na walezi watakiwa kulea watoto katika maadili Kasulu",
    "author": {
      "name": "Hagai Ruyagila",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "24 Ago 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kasulu"
    ],
    "isBreaking": false,
    "isTrending": false,
    "viewsCount": 1565,
    "sharesCount": 159,
    "originalUrl": "https://radiojoyfm.co.tz/wazazi-na-walezi-watakiwa-kulea-watoto-katika-maadili-kasulu/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2399",
    "title": "Ulinzi shirikishi waimarisha usalama kwa wananchi Murusi Kasulu",
    "summary": "Ulinzi shirikishi ni jukumu la mwananchi katika kuhakikisha vitendo vya wizi, udokozi na uporaji vinakomeshwa",
    "content": [
      "Ulinzi shirikishi ni jukumu la mwananchi katika kuhakikisha vitendo vya wizi, udokozi na uporaji vinakomeshwa kwenye jamii na kuchochea maendeleo Na Hagai Ruyagila Uwepo wa kikundi cha ulinzi shirikishi katika Kata ya Murusi, Halmashauri ya Mji Kasulu mkoani Kigoma, umeendelea kusaidia kuimarisha hali ya ulinzi na usalama pamoja na kurejesha utulivu kwa wananchi wa kata hiyo."
    ],
    "rawHtml": "<p>Ulinzi shirikishi ni jukumu la mwananchi katika kuhakikisha vitendo vya wizi, udokozi na uporaji vinakomeshwa kwenye jamii na kuchochea maendeleo Na Hagai Ruyagila Uwepo wa kikundi cha ulinzi shirikishi katika Kata ya Murusi, Halmashauri ya Mji Kasulu mkoani Kigoma, umeendelea kusaidia kuimarisha hali ya ulinzi na usalama pamoja na kurejesha utulivu kwa wananchi wa kata hiyo.</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/08/21/10611/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "habari-leo",
    "imageUrl": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80",
    "caption": "Ulinzi shirikishi waimarisha usalama kwa wananchi Murusi Kasulu",
    "author": {
      "name": "Hagai Ruyagila",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "21 Ago 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kasulu"
    ],
    "isBreaking": false,
    "isTrending": false,
    "viewsCount": 1500,
    "sharesCount": 150,
    "originalUrl": "https://radiojoyfm.co.tz/ulinzi-shirikishi-waimarisha-usalama-kwa-wananchi-murusi-kasulu/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2398",
    "title": "Wajasiriamali mwalo wa Kalalangabo Kigoma waomba barabara kuboreshwa",
    "summary": "Uboreshaji wa miundombinu ni sehemu ya mkakati wa kukuza na kustawisha biashara za wajariamali na",
    "content": [
      "Uboreshaji wa miundombinu ni sehemu ya mkakati wa kukuza na kustawisha biashara za wajariamali na kuongeza kipato cha familia zao na Taifa kwa ujumla Na Josephine Kiravu Wajasiriamali katika mwalo wa Kalalangabo kata ya Ziwani Halmashauri ya Wilaya ya Kigoma wameiomba Serikali kuboresha miundombinu ya barabara kutoka eneo hilo kuelekea kibirizi sambamba na kusimamia vyema usafi wa…"
    ],
    "rawHtml": "<p>Uboreshaji wa miundombinu ni sehemu ya mkakati wa kukuza na kustawisha biashara za wajariamali na kuongeza kipato cha familia zao na Taifa kwa ujumla Na Josephine Kiravu Wajasiriamali katika mwalo wa Kalalangabo kata ya Ziwani Halmashauri ya Wilaya ya Kigoma wameiomba Serikali kuboresha miundombinu ya barabara kutoka eneo hilo kuelekea kibirizi sambamba na kusimamia vyema usafi wa…</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/08/21/10619/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "biashara",
    "imageUrl": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=1200&q=80",
    "caption": "Wajasiriamali mwalo wa Kalalangabo Kigoma waomba barabara kuboreshwa",
    "author": {
      "name": "Josephine Kiravu",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "21 Ago 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kigoma"
    ],
    "isBreaking": false,
    "isTrending": false,
    "viewsCount": 1435,
    "sharesCount": 141,
    "originalUrl": "https://radiojoyfm.co.tz/wajasiriamali-mwalo-wa-kalalangabo-kigoma-waomba-barabara-kuboreshwa/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2397",
    "title": "RC Sirro azitaka halmashauri kusimamia miradi kikamilifu",
    "summary": "Usimamizi wa miradi na kuikamilisha kwa wakati husaidia kuanza kutoa huduma zilizo bora kwa wananchi",
    "content": [
      "Usimamizi wa miradi na kuikamilisha kwa wakati husaidia kuanza kutoa huduma zilizo bora kwa wananchi Na Mwandishi wetu Mkuu wa Mkoa wa Kigoma Balozi Simon Sirro amezitaka Halmashauri Mkoani humo kuendelea kuzingatia usimamizi wa miradi na kuikamilisha kwa wakati na kwa ubora unaotakiwa Balozi Sirro amesema hayo akiwa wilayani Kibondo katika ziara ya kukagua miradi ya maendeleo…"
    ],
    "rawHtml": "<p>Usimamizi wa miradi na kuikamilisha kwa wakati husaidia kuanza kutoa huduma zilizo bora kwa wananchi Na Mwandishi wetu Mkuu wa Mkoa wa Kigoma Balozi Simon Sirro amezitaka Halmashauri Mkoani humo kuendelea kuzingatia usimamizi wa miradi na kuikamilisha kwa wakati na kwa ubora unaotakiwa Balozi Sirro amesema hayo akiwa wilayani Kibondo katika ziara ya kukagua miradi ya maendeleo…</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/08/21/10634/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "habari-leo",
    "imageUrl": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&q=80",
    "caption": "RC Sirro azitaka halmashauri kusimamia miradi kikamilifu",
    "author": {
      "name": "Mwandishi Wetu",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "21 Ago 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kigoma",
      "Habari"
    ],
    "isBreaking": false,
    "isTrending": false,
    "viewsCount": 1370,
    "sharesCount": 132,
    "originalUrl": "https://radiojoyfm.co.tz/rc-sirro-azitaka-halmashauri-kusimamia-miradi-kikamilifu/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2396",
    "title": "Waziri Katimba ataka wananchi kuchangamkia mikopo ya 10% Kigoma",
    "summary": "Serikali imekuwa ikitoa mikopo ya asilimia 10 ya mapato ya halmashauri kwa makundi mbalimbali, huku",
    "content": [
      "Serikali imekuwa ikitoa mikopo ya asilimia 10 ya mapato ya halmashauri kwa makundi mbalimbali, huku ikiweka msisitizo katika usimamizi na utoaji wa elimu kwa wanufaika ili kuhakikisha mikopo hiyo inaleta matokeo yaliyokusudiwa. Na Mwandishi Wetu Naibu Waziri wa Katiba na Sheria, Bi. Zainab Katimba, amewataka Maafisa Maendeleo ya Jamii kuendelea kutoa elimu na hamasa kwa wananchi…"
    ],
    "rawHtml": "<p>Serikali imekuwa ikitoa mikopo ya asilimia 10 ya mapato ya halmashauri kwa makundi mbalimbali, huku ikiweka msisitizo katika usimamizi na utoaji wa elimu kwa wanufaika ili kuhakikisha mikopo hiyo inaleta matokeo yaliyokusudiwa. Na Mwandishi Wetu Naibu Waziri wa Katiba na Sheria, Bi. Zainab Katimba, amewataka Maafisa Maendeleo ya Jamii kuendelea kutoa elimu na hamasa kwa wananchi…</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/08/20/10583/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "habari-leo",
    "imageUrl": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&q=80",
    "caption": "Waziri Katimba ataka wananchi kuchangamkia mikopo ya 10% Kigoma",
    "author": {
      "name": "Mwandishi Wetu",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "20 Ago 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kigoma"
    ],
    "isBreaking": false,
    "isTrending": false,
    "viewsCount": 1305,
    "sharesCount": 123,
    "originalUrl": "https://radiojoyfm.co.tz/waziri-katimba-ataka-wananchi-kuchangamkia-mikopo-ya-10-kigoma/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2395",
    "title": "Madereva walia na ukosefu wa stendi Kibirizi Kigoma",
    "summary": "Kata ya Kibirizi ni miongoni mwa Kata zenye mwingiliano wa watu kutokana na shughuli mbalimbali",
    "content": [
      "Kata ya Kibirizi ni miongoni mwa Kata zenye mwingiliano wa watu kutokana na shughuli mbalimbali za biashara zinazofanyika katika eneo hilo na kutokana na sababu hiyo vyombo vya usafiri lazima ziwepo na uhitaji wa stendi ni jambo muhimu Na LucaS Hoha Baadhi ya madereva wa vyombo vya moto vinavyosafirisha abiria kutoka Soko la Kibirizi kwenda Ujiji na maeneo mengine ya Manispaa ya Kigoma…"
    ],
    "rawHtml": "<p>Kata ya Kibirizi ni miongoni mwa Kata zenye mwingiliano wa watu kutokana na shughuli mbalimbali za biashara zinazofanyika katika eneo hilo na kutokana na sababu hiyo vyombo vya usafiri lazima ziwepo na uhitaji wa stendi ni jambo muhimu Na LucaS Hoha Baadhi ya madereva wa vyombo vya moto vinavyosafirisha abiria kutoka Soko la Kibirizi kwenda Ujiji na maeneo mengine ya Manispaa ya Kigoma…</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/08/20/10597/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "habari-leo",
    "imageUrl": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&q=80",
    "caption": "Madereva walia na ukosefu wa stendi Kibirizi Kigoma",
    "author": {
      "name": "Lucas Hoha",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "20 Ago 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kigoma"
    ],
    "isBreaking": false,
    "isTrending": false,
    "viewsCount": 1240,
    "sharesCount": 114,
    "originalUrl": "https://radiojoyfm.co.tz/madereva-walia-na-ukosefu-wa-stendi-kibirizi-kigoma/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2394",
    "title": "RC Kigoma ataka vyama vya ushirika kuwa waadilifu",
    "summary": "Zao la tumbaku ni moja ya mazao makuu ya biashara katika mkoa wa Kigoma ikiwaingizia",
    "content": [
      "Zao la tumbaku ni moja ya mazao makuu ya biashara katika mkoa wa Kigoma ikiwaingizia kipato wakulima wengi hasa katika wilaya za Kasulu, Kakonko na Uvinza Na Josephine Kiravu Mkuu wa Mkoa wa Kigoma Balozi Simon Sirro amevitaka vyama vya ushirika kuwa waadilifu ili kuendelea kukuza uzalishaji wa zao la tumbaku ambapo kwa mwaka 2025/2026 lilishika nafasi ya pili kwa ngazi ya mkoa kwa…"
    ],
    "rawHtml": "<p>Zao la tumbaku ni moja ya mazao makuu ya biashara katika mkoa wa Kigoma ikiwaingizia kipato wakulima wengi hasa katika wilaya za Kasulu, Kakonko na Uvinza Na Josephine Kiravu Mkuu wa Mkoa wa Kigoma Balozi Simon Sirro amevitaka vyama vya ushirika kuwa waadilifu ili kuendelea kukuza uzalishaji wa zao la tumbaku ambapo kwa mwaka 2025/2026 lilishika nafasi ya pili kwa ngazi ya mkoa kwa…</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/08/20/10605/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "biashara",
    "imageUrl": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&q=80",
    "caption": "RC Kigoma ataka vyama vya ushirika kuwa waadilifu",
    "author": {
      "name": "Josephine Kiravu",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "20 Ago 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kigoma"
    ],
    "isBreaking": false,
    "isTrending": false,
    "viewsCount": 1175,
    "sharesCount": 105,
    "originalUrl": "https://radiojoyfm.co.tz/rc-kigoma-ataka-vyama-vya-ushirika-kuwa-waadilifu/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2393",
    "title": "Kigoma yazidi kuimarisha utayari dhidi ya ebola",
    "summary": "Serikali kwa kushirikiana na wadau mbalimbali imeendelea kutoa elimu kwa wananchi ili waweze kujikinga na",
    "content": [
      "Serikali kwa kushirikiana na wadau mbalimbali imeendelea kutoa elimu kwa wananchi ili waweze kujikinga na magonjwa ya mlipuko ikiwemo Ebola Na Mwandishi wetu Ukiwa ni mikakati wa Serikali kuimarisha utayari katika kudhibiti uwezekano wa magonjwa ya mlipuko kuingia nchini, Ofisi ya Rais, TAMISEMI kwa kushirikiana na Wizara ya Afya wameongoza zoezi la ukaguzi wa maeneo tengefu kwa lengo…"
    ],
    "rawHtml": "<p>Serikali kwa kushirikiana na wadau mbalimbali imeendelea kutoa elimu kwa wananchi ili waweze kujikinga na magonjwa ya mlipuko ikiwemo Ebola Na Mwandishi wetu Ukiwa ni mikakati wa Serikali kuimarisha utayari katika kudhibiti uwezekano wa magonjwa ya mlipuko kuingia nchini, Ofisi ya Rais, TAMISEMI kwa kushirikiana na Wizara ya Afya wameongoza zoezi la ukaguzi wa maeneo tengefu kwa lengo…</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/08/19/10579/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "jamii",
    "imageUrl": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",
    "caption": "Kigoma yazidi kuimarisha utayari dhidi ya ebola",
    "author": {
      "name": "Mwandishi Wetu",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "19 Ago 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kigoma"
    ],
    "isBreaking": false,
    "isTrending": false,
    "viewsCount": 1110,
    "sharesCount": 96,
    "originalUrl": "https://radiojoyfm.co.tz/kigoma-yazidi-kuimarisha-utayari-dhidi-ya-ebola/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2392",
    "title": "Vijana watakiwa kujikita katika kufanya kazi Buhigwe",
    "summary": "Vijana wameeleza kuwa baadhi yao wamekuwa wakikwepa kazi zinazohitaji juhudi kubwa na badala yake kutafuta",
    "content": [
      "Vijana wameeleza kuwa baadhi yao wamekuwa wakikwepa kazi zinazohitaji juhudi kubwa na badala yake kutafuta kazi rahisi. Na Emmanuel Kamangu Vijana katika Halmashauri ya Wilaya ya Buhigwe Mkoani Kigoma wametakiwa kuachana na tabia ya utegemezi na kujikita katika kufanya kazi ili kujikwamua kiuchumi na kujenga maisha yao ya baadaye. Wito huo umetolewa na Afisa Maendeleo ya Jamii wa…"
    ],
    "rawHtml": "<p>Vijana wameeleza kuwa baadhi yao wamekuwa wakikwepa kazi zinazohitaji juhudi kubwa na badala yake kutafuta kazi rahisi. Na Emmanuel Kamangu Vijana katika Halmashauri ya Wilaya ya Buhigwe Mkoani Kigoma wametakiwa kuachana na tabia ya utegemezi na kujikita katika kufanya kazi ili kujikwamua kiuchumi na kujenga maisha yao ya baadaye. Wito huo umetolewa na Afisa Maendeleo ya Jamii wa…</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/08/18/10574/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "habari-leo",
    "imageUrl": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&q=80",
    "caption": "Vijana watakiwa kujikita katika kufanya kazi Buhigwe",
    "author": {
      "name": "Emmanuel Kamangu",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "18 Ago 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Buhigwe"
    ],
    "isBreaking": false,
    "isTrending": false,
    "viewsCount": 1045,
    "sharesCount": 87,
    "originalUrl": "https://radiojoyfm.co.tz/vijana-watakiwa-kujikita-katika-kufanya-kazi-buhigwe/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2391",
    "title": "DC Kigoma ahimiza wananchi kuzingatia usafi wa mazingira",
    "summary": "Usafi wa mazingira ni jambo muhimu sana katika maisha ya kila siku na kila mtu",
    "content": [
      "Usafi wa mazingira ni jambo muhimu sana katika maisha ya kila siku na kila mtu ana wajibu wa kuhakikisha mazingira yanakuwa safi na salama na hii ni muhimu zaidi katika maeneo ya sokoni kwa sababu sokoni hukusanyika watu wengi na huuzwa vyakula na bidhaa mbalimbali ambazo zinazalisha uchafu Na Mwandishi wetu Mkuu wa Wilaya ya Kigoma Mkoani Kigoma Dkt. Rashid Chuachua amewahimiza wananchi…"
    ],
    "rawHtml": "<p>Usafi wa mazingira ni jambo muhimu sana katika maisha ya kila siku na kila mtu ana wajibu wa kuhakikisha mazingira yanakuwa safi na salama na hii ni muhimu zaidi katika maeneo ya sokoni kwa sababu sokoni hukusanyika watu wengi na huuzwa vyakula na bidhaa mbalimbali ambazo zinazalisha uchafu Na Mwandishi wetu Mkuu wa Wilaya ya Kigoma Mkoani Kigoma Dkt. Rashid Chuachua amewahimiza wananchi…</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/08/17/10557/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "habari-leo",
    "imageUrl": "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=1200&q=80",
    "caption": "DC Kigoma ahimiza wananchi kuzingatia usafi wa mazingira",
    "author": {
      "name": "Mwandishi Wetu",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "17 Ago 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kigoma"
    ],
    "isBreaking": false,
    "isTrending": false,
    "viewsCount": 980,
    "sharesCount": 78,
    "originalUrl": "https://radiojoyfm.co.tz/dc-kigoma-ahimiza-wananchi-kuzingatia-usafi-wa-mazingira/",
    "sourceType": "wordpress"
  },
  {
    "id": "joy-2390",
    "title": "ALAT Kigoma yatembelea miradi ya maendeleo Kibondo",
    "summary": "Halmashauri ya Wilaya Kibondo Mkoani Kigoma imepongezwa kwa utekelezaji wa miradi ya maendeleo kwa wananchi",
    "content": [
      "Halmashauri ya Wilaya Kibondo Mkoani Kigoma imepongezwa kwa utekelezaji wa miradi ya maendeleo kwa wananchi Na Mwandishi wetu ‎Wajumbe wa jumuiya ya tawala za Mitaa Tanzania, ALAT Mkoa wa Kigoma wametakiwa kuendelea kishirikiana katika kufikia malengo ya kukuza maendeleo na uchumi wa halmashari za mkoa wa Kigoma. Mwenyekiti wa ALAT mkoa wa Kigoma Bw."
    ],
    "rawHtml": "<p>Halmashauri ya Wilaya Kibondo Mkoani Kigoma imepongezwa kwa utekelezaji wa miradi ya maendeleo kwa wananchi Na Mwandishi wetu ‎Wajumbe wa jumuiya ya tawala za Mitaa Tanzania, ALAT Mkoa wa Kigoma wametakiwa kuendelea kishirikiana katika kufikia malengo ya kukuza maendeleo na uchumi wa halmashari za mkoa wa Kigoma. Mwenyekiti wa ALAT mkoa wa Kigoma Bw.</p>\n<p><a href=\"https://radiotadio.co.tz/joyfm/2026/08/15/10540/\" rel=\"nofollow\">Source</a></p>\n",
    "category": "habari-leo",
    "imageUrl": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&q=80",
    "caption": "ALAT Kigoma yatembelea miradi ya maendeleo Kibondo",
    "author": {
      "name": "Mwandishi Wetu",
      "role": "Mwandishi wa Habari • Radio Joy 90.5 FM",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
    },
    "publishedAt": "15 Ago 2026",
    "readTimeMinutes": 2,
    "tags": [
      "Kibondo",
      "Kigoma"
    ],
    "isBreaking": false,
    "isTrending": false,
    "viewsCount": 915,
    "sharesCount": 69,
    "originalUrl": "https://radiojoyfm.co.tz/alat-kigoma-yatembelea-miradi-ya-maendeleo-kibondo/",
    "sourceType": "wordpress"
  }
];

export const PROGRAMS: Program[] = [
  {
    id: 'prog-1',
    title: 'Good Morning Kigoma',
    timeSlot: '06:00 AM – 10:00 AM',
    startHour: 6,
    startMinute: 0,
    endHour: 10,
    endMinute: 0,
    period: 'Morning',
    days: ['Jumatatu', 'Jumanne', 'Jumatano', 'Alhamisi', 'Ijumaa', 'Jumamosi', 'Jumapili'],
    hostName: '',
    hostRole: '',
    hostAvatar: '',
    description: 'Amka na taarifa motomoto za magazeti, hali ya hewa ya Ziwa Tanganyika, matukio ya Kigoma-Ujiji na mijadala ya maendeleo ya jamii.',
    currentTopic: 'Uboreshaji wa Miundombinu ya Barabara za Wilaya na Miradi ya Maji Kigoma',
    bannerUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1000&auto=format&fit=crop',
    genre: 'Habari, Magazeti & Maendeleo',
    startTimeFormatted: '06:00 AM',
    endTimeFormatted: '10:00 AM',
  },
  {
    id: 'prog-2',
    title: 'Mashua',
    timeSlot: '10:00 AM – 12:00 PM',
    startHour: 10,
    startMinute: 0,
    endHour: 12,
    endMinute: 0,
    period: 'Afternoon',
    days: ['Jumatatu', 'Jumanne', 'Jumatano', 'Alhamisi', 'Ijumaa', 'Jumamosi', 'Jumapili'],
    hostName: '',
    hostRole: '',
    hostAvatar: '',
    description: 'Kipindi kinachoiweka jamii ya Kigoma pamoja: elimu, afya ya familia, haki za walemavu, misaada ya Joy in the Harvest na fursa za kiuchumi.',
    currentTopic: 'Uwezeshaji wa Kiuchumi kwa Wavuvi na Wanawake Wajasiriamali Kibirizi',
    bannerUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000&auto=format&fit=crop',
    genre: 'Jamii, Afya & Ujasiriamali',
    startTimeFormatted: '10:00 AM',
    endTimeFormatted: '12:00 PM',
  },
  {
    id: 'prog-3',
    title: 'Habari',
    timeSlot: '12:00 PM – 01:00 PM',
    startHour: 12,
    startMinute: 0,
    endHour: 13,
    endMinute: 0,
    period: 'Afternoon',
    days: ['Jumatatu', 'Jumanne', 'Jumatano', 'Alhamisi', 'Ijumaa', 'Jumamosi', 'Jumapili'],
    hostName: '',
    hostRole: '',
    hostAvatar: '',
    description: 'Taarifa kamili ya habari za mchana: matukio ya kitaifa kutoka Dodoma na Dar es Salaam, ripoti za mikoani na habari za kimataifa.',
    currentTopic: 'Matukio Makuu ya Adhuhuri Tanzania & Ukanda wa Maziwa Makuu',
    bannerUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1000&auto=format&fit=crop',
    genre: 'Habari za Adhuhuri & Kitaifa',
    startTimeFormatted: '12:00 PM',
    endTimeFormatted: '01:00 PM',
  },
  {
    id: 'prog-4',
    title: 'East Africa Show',
    timeSlot: '03:00 PM – 05:00 PM',
    startHour: 15,
    startMinute: 0,
    endHour: 17,
    endMinute: 0,
    period: 'Afternoon',
    days: ['Jumatatu', 'Jumanne', 'Jumatano', 'Alhamisi', 'Ijumaa', 'Jumamosi', 'Jumapili'],
    hostName: '',
    hostRole: '',
    hostAvatar: '',
    description: 'Kuunganisha jamii za ukanda wa Afrika Mashariki na Maziwa Makuu (Tanzania, Burundi, DRC, Rwanda): muziki, biashara mipakani, utamaduni na amani.',
    currentTopic: 'Ushirikiano wa Kibiashara na Utamaduni wa Ziwa Tanganyika',
    bannerUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop',
    genre: 'Afrika Mashariki, Utamaduni & Burudani',
    startTimeFormatted: '03:00 PM',
    endTimeFormatted: '05:00 PM',
  },
  {
    id: 'prog-5',
    title: 'Sauti ya Jamii',
    timeSlot: '05:00 PM – 06:00 PM',
    startHour: 17,
    startMinute: 0,
    endHour: 18,
    endMinute: 0,
    period: 'Evening',
    days: ['Jumatatu', 'Jumanne', 'Jumatano', 'Alhamisi', 'Ijumaa', 'Jumamosi', 'Jumapili'],
    hostName: '',
    hostRole: '',
    hostAvatar: '',
    description: 'Kipindi maalum cha kuangazia changamoto za wananchi, kero za kijamii, utawala bora, haki za watoto na maendeleo ya vijijini na mijini.',
    currentTopic: 'Mjadala: Ulinzi wa Mazingira na Upatikanaji wa Maji Safi Vijijini',
    bannerUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000&auto=format&fit=crop',
    genre: 'Jamii, Maendeleo & Kero za Wananchi',
    startTimeFormatted: '05:00 PM',
    endTimeFormatted: '06:00 PM',
  },
  {
    id: 'prog-6',
    title: 'Dimba la Michezo',
    timeSlot: '06:00 PM – 08:00 PM',
    startHour: 18,
    startMinute: 0,
    endHour: 20,
    endMinute: 0,
    period: 'Evening',
    days: ['Jumatatu', 'Jumanne', 'Jumatano', 'Alhamisi', 'Ijumaa', 'Jumamosi', 'Jumapili'],
    hostName: '',
    hostRole: '',
    hostAvatar: '',
    description: 'Uchambuzi motomoto wa Ligi Kuu ya NBC Tanzania, soka la kimataifa (EPL, La Liga, UCL), mashindano ya Kombe la Shirikisho na michezo ya Kigoma.',
    currentTopic: 'Uchambuzi wa Mechi za Ligi Kuu na Maandalizi ya Vilabu vya Kigoma',
    bannerUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1000&auto=format&fit=crop',
    genre: 'Michezo, Soka & Uchambuzi',
    startTimeFormatted: '06:00 PM',
    endTimeFormatted: '08:00 PM',
  },
  {
    id: 'prog-7',
    title: 'RJ Habari',
    timeSlot: '08:00 PM – 08:10 PM',
    startHour: 20,
    startMinute: 0,
    endHour: 20,
    endMinute: 10,
    period: 'Night',
    days: ['Jumatatu', 'Jumanne', 'Jumatano', 'Alhamisi', 'Ijumaa', 'Jumamosi', 'Jumapili'],
    hostName: '',
    hostRole: '',
    hostAvatar: '',
    description: 'Muhtasari wa dakika 10 wenye taarifa zote kuu za siku nchini Tanzania na duniani kote kabla ya kuanza kwa RJ Matukio.',
    currentTopic: 'Muhtasari wa Taarifa Kuu za Siku (Kigoma, Dodoma, Kimataifa)',
    bannerUrl: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1000&auto=format&fit=crop',
    genre: 'Habari Kuu za Usiku (Bulletins)',
    startTimeFormatted: '08:00 PM',
    endTimeFormatted: '08:10 PM',
  },
  {
    id: 'prog-8',
    title: 'RJ Matukio',
    timeSlot: '08:10 PM – 08:40 PM',
    startHour: 20,
    startMinute: 10,
    endHour: 20,
    endMinute: 40,
    period: 'Night',
    days: ['Jumatatu', 'Jumanne', 'Jumatano', 'Alhamisi', 'Ijumaa', 'Jumamosi', 'Jumapili'],
    hostName: '',
    hostRole: '',
    hostAvatar: '',
    description: 'Uchambuzi wa kina wa matukio ya kijamii, ripoti za kiuchunguzi, na sauti za wananchi kutoka wilaya za Kigoma, Kasulu, Kibondo na Uvinza.',
    currentTopic: 'Ripoti Maalum: Miradi ya Kiuchumi na Maisha ya Wananchi Mwambao mwa Ziwa',
    bannerUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
    genre: 'Matukio, Uchunguzi & Mahojiano',
    startTimeFormatted: '08:10 PM',
    endTimeFormatted: '08:40 PM',
  },
  {
    id: 'prog-9',
    title: 'East Africa Show',
    timeSlot: '09:00 PM – 11:00 PM',
    startHour: 21,
    startMinute: 0,
    endHour: 23,
    endMinute: 0,
    period: 'Night',
    days: ['Jumatatu', 'Jumanne', 'Jumatano', 'Alhamisi', 'Ijumaa', 'Jumamosi', 'Jumapili'],
    hostName: '',
    hostRole: '',
    hostAvatar: '',
    description: 'Vipindi vya utamaduni, muziki bora wa Afrika Mashariki, ujumbe wa amani na matumaini kwa jamii za Ukanda wa Maziwa Makuu.',
    currentTopic: 'Muziki Laini wa Afrika Mashariki na Ujumbe wa Matumaini',
    bannerUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=1000&auto=format&fit=crop',
    genre: 'Afrika Mashariki, Utamaduni & Amani',
    startTimeFormatted: '09:00 PM',
    endTimeFormatted: '11:00 PM',
  }
];

export const FREQUENCIES: StationFrequency[] = [
  { city: 'Kigoma Mjini & Kibirizi', frequency: '90.5 MHz', region: 'Kituo Kikuu (HQ)', transmitter: 'Mnara wa Kibirizi, Kigoma' },
  { city: 'Kasulu & Manyovu', frequency: '90.5 MHz', region: 'Wilaya ya Kasulu', transmitter: 'Kasulu Hill, Kigoma' },
  { city: 'Uvinza & Malagarasi', frequency: '90.5 MHz', region: 'Wilaya ya Uvinza', transmitter: 'Mnara wa Uvinza, Bonde la Malagarasi' },
  { city: 'Kibondo & Kakonko', frequency: '90.5 MHz', region: 'Wilaya ya Kibondo', transmitter: 'Mnara wa Kibondo, Kigoma Kaskazini' },
  { city: 'Buhigwe & Munanila', frequency: '90.5 MHz', region: 'Wilaya ya Buhigwe', transmitter: 'Mnara wa Buhigwe, Kigoma' },
  { city: 'Ujiji & Mwanga', frequency: '90.5 MHz', region: 'Manispaa ya Kigoma-Ujiji', transmitter: 'Ujiji Repeater, Kigoma' },
  { city: 'Ziwa Tanganyika & Mwambao', frequency: '90.5 MHz', region: 'Ukanda wa Ziwa Tanganyika', transmitter: 'Kibirizi Port High Mast' },
  { city: 'Mtandaoni Duniani Kote (Online)', frequency: 'radiojoyfm.co.tz', region: 'Digital Live Stream', transmitter: 'Seva ya Matangazo ya Moja kwa Moja' },
];

export const TEAM_MEMBERS: TeamMember[] = [];

export const INITIAL_SHOUTOUTS: ShoutoutMessage[] = [
  {
    id: 'sh-1',
    senderName: 'Hamisi Omari',
    location: 'Kibirizi, Kigoma',
    message: 'Nawapata vizuri sana Radio Joy 90.5 FM! Hongereni kwa habari za uhakika na matangazo safi Ziwa Tanganyika.',
    timestamp: 'Dakika 2 zilizopita',
    likes: 15,
    programTitle: 'Good morning Kigoma',
  },
  {
    id: 'sh-2',
    senderName: 'Fatuma Bakari',
    location: 'Ujiji, Kigoma',
    message: 'Salamu kwa studio yote ya Radio Joy! Kipindi cha Mashua kinatupa elimu kubwa sana akina mama.',
    timestamp: 'Dakika 8 zilizopita',
    likes: 11,
    programTitle: 'Mashua',
  },
  {
    id: 'sh-3',
    senderName: 'Shaban Mwita',
    location: 'Kasulu Mjini',
    message: 'Tuko pamoja kwenye 90.5 FM Kasulu! Michezo inachambuliwa kwa kiwango cha juu sana.',
    timestamp: 'Dakika 16 zilizopita',
    likes: 22,
    programTitle: 'Dimba la Michezo',
  },
  {
    id: 'sh-4',
    senderName: 'Zawadi Mwambungu',
    location: 'Buhigwe',
    message: 'Radio Joy inatutia moyo sana kupitia Joy in the Harvest. Mungu aibariki kazi yenu nzuri Kigoma.',
    timestamp: 'Saa 1 iliyopita',
    likes: 18,
    programTitle: 'Kigoma Leo',
  }
];

export const INITIAL_NOTIFICATIONS: PushNotification[] = [
  {
    id: 'notif-1',
    title: 'HABARI ZA HIVI PUNDE 🚨',
    body: 'Mbunge atoa milioni 2.5 kusaidia mama asiyekuwa nyumba Ruchugi Uvinza.',
    timestamp: 'Dakika 10 zilizopita',
    type: 'breaking',
    isRead: false,
    relatedArticleId: 'joy-2425',
  },
  {
    id: 'notif-2',
    title: 'REDIO IKO HEWANI LIVE 🎙️',
    body: 'Kipindi cha Good morning Kigoma kiko hewani sasa kwenye 90.5 FM! Tuma maoni yako moja kwa moja studio.',
    timestamp: 'Saa 1 iliyopita',
    type: 'radio',
    isRead: false,
  },
  {
    id: 'notif-3',
    title: 'TAARIFA YA MICHEZO ⚽',
    body: 'Mayeye CUP yaanza kurindima Kigoma DC kuibua vipaji vipya vya soka.',
    timestamp: 'Masaa 3 yaliyopita',
    type: 'sports',
    isRead: true,
    relatedArticleId: 'joy-2409',
  }
];
