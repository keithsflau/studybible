/**
 * 基督教經典書籍巡禮 — 輕量目錄（首屏只載入此檔）
 * 全書正文見 data/early.js … data/contemporary.js，按章懶載入。
 */
window.CLASSICS_CATALOG = {
  title: "基督教經典書籍巡禮",
  titleEn: "A Pilgrimage through Christian Classics",
  lead:
    "從使徒教父到當代福音派，精選一百本最值得一讀的基督教書籍。不是一份炫耀學問的書單，而是一條以聖經為本、以基督為中心的閱讀天路：幫助弟兄姊妹在歷史中聽見同一福音，並把所讀的帶回禱告、教會與日常。",
  verse: {
    zh: "我們既有這許多的見證人，如同雲彩圍著我們，就當放下各樣的重擔，脫去容易纏累我們的罪，存心忍耐，奔那擺在我們前頭的路程。",
    ref: "希伯來書 12:1"
  },
  hero: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Long_Room_Interior%2C_Trinity_College_Dublin%2C_Ireland_-_Diliff.jpg/1280px-Long_Room_Interior%2C_Trinity_College_Dublin%2C_Ireland_-_Diliff.jpg",
    alt: "都柏林三一學院長廊書庫",
    credit: "Photo: Diliff, Trinity College Dublin Long Room, CC BY-SA"
  },
  featuredId: "pilgrims-progress",
  chapters: [
    {
      id: "early",
      no: "01",
      title: "聖經與早期教會",
      titleEn: "Scripture & the Early Church",
      era: "第一至第八世紀",
      blurb:
        "使徒教父、護教士與尼西亞前後的教父：教會如何在逼迫與異端中守住「一次交付聖徒的真道」，並把聖經讀成認信基督的書。",
      tone: "linear-gradient(135deg,#3f2a1a,#8a5a2b)",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Good_shepherd_01b_close.jpg/800px-Good_shepherd_01b_close.jpg"
    },
    {
      id: "medieval",
      no: "02",
      title: "中世紀靈修與經院",
      titleEn: "Medieval Devotion & Scholasticism",
      era: "第六至第十五世紀",
      blurb:
        "從牧養手冊、安瑟倫的「信以求知」，到阿奎那與《效法基督》。福音派讀中世紀，不是拜古，而是分辨：何處指向十架恩典，何處需謹慎。",
      tone: "linear-gradient(135deg,#1e3a4c,#4a7c9b)",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Scriptorium-monk-2.jpg/800px-Scriptorium-monk-2.jpg"
    },
    {
      id: "reformation",
      no: "03",
      title: "宗教改革",
      titleEn: "The Reformation",
      era: "第十六世紀",
      blurb:
        "唯獨聖經、唯獨恩典、唯獨信心、唯獨基督、唯獨上帝榮耀。路德、加爾文與改革者把被埋沒的福音再次放回講台與家庭。",
      tone: "linear-gradient(135deg,#4c1d12,#b45309)",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Lucas_Cranach_d.%C3%84._-_Martin_Luther%2C_1528_%28Veste_Coburg%29.jpg/640px-Lucas_Cranach_d.%C3%84._-_Martin_Luther%2C_1528_%28Veste_Coburg%29.jpg"
    },
    {
      id: "puritan",
      no: "04",
      title: "清教徒與敬虔運動",
      titleEn: "Puritans & Piety",
      era: "第十七至十八世紀",
      blurb:
        "把改革宗教義活成心靈的牧養：治死罪、知足、與三一神相交。本巡禮的中心書是班揚《天路歷程》——一幅用故事畫出來的救恩之路。",
      tone: "linear-gradient(135deg,#1b2436,#5b4a2e)",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/John_Bunyan.jpg/640px-John_Bunyan.jpg"
    },
    {
      id: "awakening",
      no: "05",
      title: "福音覺醒與宣教",
      titleEn: "Awakening & Mission",
      era: "第十八至十九世紀",
      blurb:
        "大覺醒、廢奴、海外宣教與講台復興。福音不是書房裡的標本，乃是催促人過聖潔生活、並把基督傳到地極的活道。",
      tone: "linear-gradient(135deg,#14532d,#0f766e)",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/GeorgeWhitefield.jpg/640px-GeorgeWhitefield.jpg"
    },
    {
      id: "modern",
      no: "06",
      title: "近現代福音派神學與護教",
      titleEn: "Modern Evangelical Theology",
      era: "第十七世紀思想錄至二十世紀",
      blurb:
        "面對啟蒙、自由主義與世俗化：梅欽、華菲德、路易士、巴刻、斯托得與薛華等，幫助教會在理性與心靈上「為真道竭力地爭辯」。",
      tone: "linear-gradient(135deg,#1e293b,#334155)",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/C.S.Lewis.JPG/640px-C.S.Lewis.JPG"
    },
    {
      id: "contemporary",
      no: "07",
      title: "當代經典（仍值得一讀）",
      titleEn: "Contemporary Classics",
      era: "二十世紀中葉至今",
      blurb:
        "尚未被百年篩過、卻已牧養一代人的書。包括華人教會走過火煉的見證。讀當代，更要對照聖經，避免把作者當成新的教皇。",
      tone: "linear-gradient(135deg,#312e81,#6d28d9)",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Open_book_nae_02.jpg/800px-Open_book_nae_02.jpg"
    }
  ]
};

window.CLASSICS_BOOKS = [
  /* ——— 01 早期教會 ——— */
  { id: "didache", chapter: "early", n: 1, titleZh: "十二使徒遺訓", titleOrig: "Didache", author: "佚名（使徒教父傳統）", year: "約一世紀末", era: "使徒教父", lang: "希臘文", isbn: "9780881416145", cover: "covers/didache.jpg", blurb: "早期教會生活手冊：洗禮、禁食、聖餐與「兩條路」。" },
  { id: "clement-1", chapter: "early", n: 2, titleZh: "革利免一書", titleOrig: "1 Clement", author: "羅馬的革利免", year: "約公元 96", era: "使徒教父", lang: "希臘文", cover: "covers/clement-1.jpg", blurb: "以舊約與使徒榜樣勸哥林多恢復秩序與謙卑。" },
  { id: "ignatius-letters", chapter: "early", n: 3, titleZh: "伊格那丟書信", titleOrig: "Letters of Ignatius", author: "安提阿的伊格那丟", year: "約公元 110", era: "使徒教父", lang: "希臘文", cover: "covers/ignatius-letters.jpg", blurb: "赴死途中寫信：基督的肉身真實、教會合一、為主殉道。" },
  { id: "justin-apology", chapter: "early", n: 4, titleZh: "護教書", titleOrig: "First Apology", author: "殉道者游斯丁", year: "約公元 155", era: "護教士", lang: "希臘文", cover: "covers/justin-apology.jpg", blurb: "向羅馬世界解釋基督徒不是無神、亂倫或叛國，乃敬拜道成肉身的道。" },
  { id: "irenaeus-heresies", chapter: "early", n: 5, titleZh: "駁異端", titleOrig: "Against Heresies", author: "里昂的愛任紐", year: "約公元 180", era: "護教士", lang: "希臘文（拉丁譯本傳世）", cover: "covers/irenaeus-heresies.jpg", blurb: "以使徒統緒與四福音對抗諾斯底主義，高舉創造與道成肉身。" },
  { id: "tertullian-apology", chapter: "early", n: 6, titleZh: "護教篇", titleOrig: "Apologeticus", author: "特土良", year: "公元 197", era: "拉丁教父", lang: "拉丁文", cover: "covers/tertullian-apology.jpg", blurb: "北非法學家的鋒利護教：「殉道者的血是教會的種子」。" },
  { id: "athanasius-incarnation", chapter: "early", n: 7, titleZh: "論道成肉身", titleOrig: "On the Incarnation", author: "亞他那修", year: "約公元 318", era: "尼西亞", lang: "希臘文", isbn: "9780881414271", cover: "covers/athanasius-incarnation.jpg", blurb: "若基督不是真神真人，我們就不能得救。路易士稱之為「傑作」。" },
  { id: "basil-holy-spirit", chapter: "early", n: 8, titleZh: "論聖靈", titleOrig: "On the Holy Spirit", author: "大巴西流", year: "約公元 375", era: "加帕多家", lang: "希臘文", isbn: "9780881418767", cover: "covers/basil-holy-spirit.jpg", blurb: "以聖經與敬拜證明聖靈與聖父聖子同質、同受敬拜。" },
  { id: "gregory-nazianzus-orations", chapter: "early", n: 9, titleZh: "神學演講", titleOrig: "Theological Orations", author: "納西盎的貴格利", year: "公元 379–381", era: "加帕多家", lang: "希臘文", cover: "covers/gregory-nazianzus-orations.jpg", blurb: "三一論最精美的講章之一：敬畏奧秘，卻不放棄聖經的清晰。" },
  { id: "gregory-nyssa-moses", chapter: "early", n: 10, titleZh: "摩西的生平", titleOrig: "The Life of Moses", author: "尼撒的貴格利", year: "約公元 390", era: "加帕多家", lang: "希臘文", isbn: "9780809103317", cover: "covers/gregory-nyssa-moses.jpg", blurb: "以摩西出埃及讀成靈程：從解放到在幽暗中瞻望神。需以聖經歷史為先。" },
  { id: "chrysostom-priesthood", chapter: "early", n: 11, titleZh: "論聖職", titleOrig: "On the Priesthood", author: "金口約翰", year: "約公元 386", era: "安提阿／君士坦丁堡", lang: "希臘文", isbn: "9780881413069", cover: "covers/chrysostom-priesthood.jpg", blurb: "講道王子論牧者的恐懼與責任：喂養群羊，而非管轄群羊。" },
  { id: "augustine-confessions", chapter: "early", n: 12, titleZh: "懺悔錄", titleOrig: "Confessiones", author: "希波的奧古斯丁", year: "約公元 397–400", era: "拉丁教父", lang: "拉丁文", isbn: "9780199537822", cover: "covers/augustine-confessions.jpg", blurb: "向神傾訴的自傳神學：不安的心、恩典的追逐、時間與記憶。" },
  { id: "augustine-city-of-god", chapter: "early", n: 13, titleZh: "上帝之城", titleOrig: "De Civitate Dei", author: "希波的奧古斯丁", year: "公元 413–426", era: "拉丁教父", lang: "拉丁文", isbn: "9780140448948", cover: "covers/augustine-city-of-god.jpg", blurb: "羅馬陷落之後：兩座城、兩種愛，歷史在上帝護理中走向終局。" },
  { id: "augustine-doctrine", chapter: "early", n: 14, titleZh: "論基督教教義", titleOrig: "De Doctrina Christiana", author: "希波的奧古斯丁", year: "公元 396–426", era: "拉丁教父", lang: "拉丁文", isbn: "9780199540631", cover: "covers/augustine-doctrine.jpg", blurb: "釋經與講道手冊：以愛神愛人為解經目的，並善用世俗學問。" },
  { id: "cyril-unity", chapter: "early", n: 15, titleZh: "論基督的合一", titleOrig: "On the Unity of Christ", author: "亞歷山太的區利羅", year: "約公元 433", era: "以弗所會議前後", lang: "希臘文", isbn: "9780881411331", cover: "covers/cyril-unity.jpg", blurb: "一位主、神人二性：救恩要求那位死而復活的是真神真人。" },
  { id: "vincent-lerins", chapter: "early", n: 16, titleZh: "記憶錄", titleOrig: "Commonitorium", author: "萊林的文森", year: "公元 434", era: "西方教父", lang: "拉丁文", isbn: "9780913757420", cover: "covers/vincent-lerins.jpg", blurb: "「到處、常常、被所有人相信」——檢驗新奇教訓的古典準則。" },

  /* ——— 02 中世紀 ——— */
  { id: "boethius-consolation", chapter: "medieval", n: 17, titleZh: "哲學的慰藉", titleOrig: "Consolatio Philosophiae", author: "波伊提烏", year: "約公元 524", era: "晚期古代", lang: "拉丁文", isbn: "9780140447804", cover: "covers/boethius-consolation.jpg", blurb: "獄中對話：命運、自由、至善。需以基督為真安慰來讀。" },
  { id: "gregory-pastoral", chapter: "medieval", n: 18, titleZh: "牧範", titleOrig: "Regula Pastoralis", author: "大貴格利", year: "公元 590", era: "早期中世紀", lang: "拉丁文", isbn: "9780881413182", cover: "covers/gregory-pastoral.jpg", blurb: "中世紀最有影響力的牧養手冊：不同的羊，需要不同的藥。" },
  { id: "anselm-proslogion", chapter: "medieval", n: 19, titleZh: "宣講篇", titleOrig: "Proslogion", author: "坎特伯里的安瑟倫", year: "公元 1077–1078", era: "經院初期", lang: "拉丁文", isbn: "9780268016975", cover: "covers/anselm-proslogion.jpg", blurb: "「那比不能想像有更大者」：禱告中的本體論論證。" },
  { id: "anselm-cur-deus", chapter: "medieval", n: 20, titleZh: "神為何成為人", titleOrig: "Cur Deus Homo", author: "坎特伯里的安瑟倫", year: "公元 1098", era: "經院初期", lang: "拉丁文", isbn: "9780813207872", cover: "covers/anselm-cur-deus.jpg", blurb: "滿足說的古典表述：罪虧缺神的榮耀，惟基督能補還。" },
  { id: "bernard-loving-god", chapter: "medieval", n: 21, titleZh: "論愛神", titleOrig: "De Diligendo Deo", author: "明谷的伯爾納", year: "約公元 1126", era: "熙篤會", lang: "拉丁文", isbn: "9780879070076", cover: "covers/bernard-loving-god.jpg", blurb: "愛的四個階段：從愛自己到為神的緣故愛神。路德亦敬重伯爾納。" },
  { id: "aquinas-summa", chapter: "medieval", n: 22, titleZh: "神學大全（選讀）", titleOrig: "Summa Theologiae", author: "多馬斯·阿奎那", year: "1265–1274", era: "盛期經院", lang: "拉丁文", isbn: "9780199548989", cover: "covers/aquinas-summa.jpg", blurb: "不必整本吞下。讀論上帝、基督、聖禮與自然律的精華，並以聖經校正。" },
  { id: "bonaventure-journey", chapter: "medieval", n: 23, titleZh: "心靈邁向天主之路", titleOrig: "Itinerarium Mentis in Deum", author: "文德", year: "公元 1259", era: "方濟會", lang: "拉丁文", isbn: "9780872202009", cover: "covers/bonaventure-journey.jpg", blurb: "從受造之物上升到十架上的上帝：知識要跪下來敬拜。" },
  { id: "kempis-imitation", chapter: "medieval", n: 24, titleZh: "效法基督", titleOrig: "De Imitatione Christi", author: "金碧士（托馬斯·肯培）", year: "約 1418–1427", era: "現代靈修運動", lang: "拉丁文", isbn: "9780141191768", cover: "covers/kempis-imitation.jpg", blurb: "除聖經外流傳最廣的靈修書之一。重內在生命，需補上稱義與教會。" },
  { id: "dante-comedy", chapter: "medieval", n: 25, titleZh: "神曲", titleOrig: "La Divina Commedia", author: "但丁", year: "約 1308–1321", era: "盛期中世紀文學", lang: "意大利文", isbn: "9780142437223", cover: "covers/dante-comedy.jpg", blurb: "地獄、煉獄、天堂的史詩。當文學與神學想像讀，勿把煉獄當成聖經教義。", caution: true },
  { id: "cloud-unknowing", chapter: "medieval", n: 26, titleZh: "不知之雲", titleOrig: "The Cloud of Unknowing", author: "佚名英國神秘主義者", year: "十四世紀後期", era: "英國神秘傳統", lang: "中古英文", isbn: "9780140443851", cover: "covers/cloud-unknowing.jpg", blurb: "以愛穿過「不知之雲」親近神。福音派當以聖經啟示約束神秘經驗。", caution: true },
  { id: "julian-norwich", chapter: "medieval", n: 27, titleZh: "神聖之愛的啟示", titleOrig: "Revelations of Divine Love", author: "諾里奇的朱利安", year: "約 1373–1395", era: "英國神秘傳統", lang: "中古英文", isbn: "9780140446739", cover: "covers/julian-norwich.jpg", blurb: "「萬物都將安好」的異象。可取其對神慈愛的渴慕，須以聖經審判異象。", caution: true },
  { id: "wycliffe-scripture", chapter: "medieval", n: 28, titleZh: "論聖經的真理", titleOrig: "De Veritate Sacrae Scripturae", author: "約翰·威克里夫", year: "約 1378", era: "改革前驅", lang: "拉丁文", cover: "covers/wycliffe-scripture.jpg", blurb: "聖經擁有至高權威，當譯成方言。改革的晨星。" },

  /* ——— 03 宗教改革 ——— */
  { id: "luther-freedom", chapter: "reformation", n: 29, titleZh: "基督徒的自由", titleOrig: "Von der Freiheit eines Christenmenschen", author: "馬丁·路德", year: "1520", era: "宗教改革", lang: "德文／拉丁文", isbn: "9780800632014", cover: "covers/luther-freedom.jpg", blurb: "因信稱義的短篇精華：在基督裡完全自由，在愛裡作眾人的僕人。" },
  { id: "luther-bondage", chapter: "reformation", n: 30, titleZh: "意志的捆綁", titleOrig: "De Servo Arbitrio", author: "馬丁·路德", year: "1525", era: "宗教改革", lang: "拉丁文", isbn: "9780800634223", cover: "covers/luther-bondage.jpg", blurb: "駁伊拉斯謨：罪人不能自救，救恩從頭到尾是神的作為。" },
  { id: "luther-catechism", chapter: "reformation", n: 31, titleZh: "小問答", titleOrig: "Der Kleine Katechismus", author: "馬丁·路德", year: "1529", era: "宗教改革", lang: "德文", isbn: "9780758611185", cover: "covers/luther-catechism.jpg", blurb: "十誡、信經、主禱文、聖禮：為家庭餐桌上的教理而寫。" },
  { id: "melanchthon-loci", chapter: "reformation", n: 32, titleZh: "神學共通點", titleOrig: "Loci Communes", author: "腓力·墨蘭頓", year: "1521（初版）", era: "宗教改革", lang: "拉丁文", isbn: "9780758615077", cover: "covers/melanchthon-loci.jpg", blurb: "第一本新教系統神學綱要：罪、律法、福音、稱義。" },
  { id: "calvin-institutes", chapter: "reformation", n: 33, titleZh: "基督教要義", titleOrig: "Institutio Christianae Religionis", author: "約翰·加爾文", year: "1536–1559", era: "宗教改革", lang: "拉丁文／法文", isbn: "9780664220280", cover: "covers/calvin-institutes.jpg", blurb: "敬虔與教義並重的鉅著：認識神與認識自己，指向敬拜與教會生活。" },
  { id: "zwingli-clarity", chapter: "reformation", n: 34, titleZh: "論上帝之道的清晰與確定", titleOrig: "Of the Clarity and Certainty of the Word of God", author: "烏利希·慈運理", year: "1522", era: "瑞士改革", lang: "德文", cover: "covers/zwingli-clarity.jpg", blurb: "聖經自己光照讀者：神的話清晰、足夠、使人得救。" },
  { id: "bucer-kingdom", chapter: "reformation", n: 35, titleZh: "論基督的國度", titleOrig: "De Regno Christi", author: "馬丁·布塞珥", year: "1550", era: "改革宗", lang: "拉丁文", isbn: "9780664243081", cover: "covers/bucer-kingdom.jpg", blurb: "寫給英王的改革藍圖：教會紀律、牧養、教育與公共生活。" },
  { id: "vermigli-commonplaces", chapter: "reformation", n: 36, titleZh: "神學共通錄", titleOrig: "Loci Communes", author: "彼得·威米革利", year: "1576（輯成）", era: "改革宗", lang: "拉丁文", cover: "covers/vermigli-commonplaces.jpg", blurb: "意大利改革者的神學匯編，深深影響英國與改革宗教義。" },
  { id: "tyndale-obedience", chapter: "reformation", n: 37, titleZh: "基督徒的順服", titleOrig: "The Obedience of a Christian Man", author: "威廉·丁道爾", year: "1528", era: "英國改革", lang: "英文", isbn: "9780140431162", cover: "covers/tyndale-obedience.jpg", blurb: "為聖經譯本與世俗權柄辯護：真順服從聽神的話開始。" },
  { id: "cranmer-homilies", chapter: "reformation", n: 38, titleZh: "講道集", titleOrig: "Book of Homilies", author: "托馬斯·克蘭麥等", year: "1547／1563", era: "英國改革", lang: "英文", cover: "covers/cranmer-homilies.jpg", blurb: "給堂會宣讀的官方講章：聖經、救恩、信心與善行。" },
  { id: "knox-reformation", chapter: "reformation", n: 39, titleZh: "蘇格蘭宗教改革史", titleOrig: "History of the Reformation in Scotland", author: "約翰·諾克斯", year: "約 1559–1571", era: "蘇格蘭改革", lang: "英文", cover: "covers/knox-reformation.jpg", blurb: "不是冷靜史書，而是先知式敘事：神如何在一國復興福音。" },
  { id: "ursinus-heidelberg", chapter: "reformation", n: 40, titleZh: "海德堡要理問答註釋", titleOrig: "Commentary on the Heidelberg Catechism", author: "撒迦利亞·烏爾西努", year: "1585（講義輯成）", era: "改革宗經院", lang: "拉丁文", isbn: "9780875524542", cover: "covers/ursinus-heidelberg.jpg", blurb: "「你唯一的安慰是什麼？」從問答走到完整的救恩與生活神學。" },
  { id: "bullinger-decades", chapter: "reformation", n: 41, titleZh: "講道十年集", titleOrig: "The Decades", author: "海因里希·布靈格", year: "1549–1551", era: "蘇黎世改革", lang: "拉丁文／德文", isbn: "9781601788276", cover: "covers/bullinger-decades.jpg", blurb: "五十篇教理講章，曾是英國聖職人員的指定讀物。" },
  { id: "hooker-polity", chapter: "reformation", n: 42, titleZh: "教會政體法規", titleOrig: "Of the Laws of Ecclesiastical Polity", author: "理查·胡克爾", year: "1594–1597", era: "英國國教", lang: "英文", isbn: "9780199604951", cover: "covers/hooker-polity.jpg", blurb: "以自然、理性與聖經為教會秩序辯護。讀時持守聖經最終權威。" },

  /* ——— 04 清教徒（含《天路歷程》） ——— */
  { id: "foxe-martyrs", chapter: "puritan", n: 43, titleZh: "殉道史", titleOrig: "Acts and Monuments", author: "約翰·福克斯", year: "1563（初版）", era: "英國新教", lang: "英文", isbn: "9780199236848", cover: "covers/foxe-martyrs.jpg", blurb: "從初期教會到瑪麗女王時期的殉道見證：血能說話。" },
  { id: "sibbes-bruised-reed", chapter: "puritan", n: 44, titleZh: "壓傷的蘆葦", titleOrig: "The Bruised Reed", author: "理查·薛伯斯", year: "1630", era: "清教徒", lang: "英文", isbn: "9780851517407", cover: "covers/sibbes-bruised-reed.jpg", blurb: "為灰心的信徒而寫：基督不折斷壓傷的蘆葦，也不吹滅將殘的燈火。" },
  { id: "watson-body", chapter: "puritan", n: 45, titleZh: "神學體系", titleOrig: "A Body of Divinity", author: "托馬斯·華森", year: "1692", era: "清教徒", lang: "英文", isbn: "9780851513836", cover: "covers/watson-body.jpg", blurb: "以威斯敏斯特小要理問答為骨的講章神學：清晰、牧養、可讀。" },
  { id: "watson-contentment", chapter: "puritan", n: 46, titleZh: "敬虔知足的藝術", titleOrig: "The Art of Divine Contentment", author: "托馬斯·華森", year: "1653", era: "清教徒", lang: "英文", isbn: "9781877617133", cover: "covers/watson-contentment.jpg", blurb: "從腓立比書四章學習在任何景況中知足——不是 stoic，而是信靠護理。" },
  { id: "owen-mortification", chapter: "puritan", n: 47, titleZh: "治死罪", titleOrig: "Of the Mortification of Sin in Believers", author: "約翰·歐文", year: "1656", era: "清教徒", lang: "英文", isbn: "9780851518671", cover: "covers/owen-mortification.jpg", blurb: "「不治死罪的人，必被罪治死。」靠聖靈治死罪的經典小書。" },
  { id: "owen-communion", chapter: "puritan", n: 48, titleZh: "與三一神相交", titleOrig: "Communion with God", author: "約翰·歐文", year: "1657", era: "清教徒", lang: "英文", isbn: "9780851516073", cover: "covers/owen-communion.jpg", blurb: "分別與聖父的愛、聖子的恩、聖靈的安慰相交：教義成為敬拜。" },
  { id: "baxter-pastor", chapter: "puritan", n: 49, titleZh: "改革宗牧師", titleOrig: "The Reformed Pastor", author: "理查·巴克斯特", year: "1656", era: "清教徒", lang: "英文", isbn: "9780851511917", cover: "covers/baxter-pastor.jpg", blurb: "先改革自己，再改革羊群。探訪、教理問答、為靈魂警醒。" },
  { id: "baxter-rest", chapter: "puritan", n: 50, titleZh: "聖徒永遠的安息", titleOrig: "The Saints' Everlasting Rest", author: "理查·巴克斯特", year: "1650", era: "清教徒", lang: "英文", isbn: "9781877611285", cover: "covers/baxter-rest.jpg", blurb: "病榻上寫天堂：以默想永遠的安息對抗今世的焦慮。" },
  { id: "pilgrims-progress", chapter: "puritan", n: 51, titleZh: "天路歷程", titleOrig: "The Pilgrim's Progress", author: "約翰·班揚", year: "1678／1684", era: "清教徒", lang: "英文", featured: true, isbn: "9780141439714", cover: "covers/pilgrims-progress.jpg", extraCover: "covers/pilgrims-progress.jpg", blurb: "本巡禮的中心書。從毀滅城到天城：福音的寓言地圖。" },
  { id: "bunyan-grace", chapter: "puritan", n: 52, titleZh: "豐盛的恩典", titleOrig: "Grace Abounding to the Chief of Sinners", author: "約翰·班揚", year: "1666", era: "清教徒", lang: "英文", isbn: "9780140432800", cover: "covers/bunyan-grace.jpg", blurb: "班揚的屬靈自傳：控告、應許、釋放——《天路歷程》的內心底本。" },
  { id: "bunyan-holy-war", chapter: "puritan", n: 53, titleZh: "聖戰", titleOrig: "The Holy War", author: "約翰·班揚", year: "1682", era: "清教徒", lang: "英文", isbn: "9780851513720", cover: "covers/bunyan-holy-war.jpg", blurb: "瑪努亞城失守與收復：人心被罪佔領、被基督收復的第二幅寓言。" },
  { id: "flavel-providence", chapter: "puritan", n: 54, titleZh: "護理的奧秘", titleOrig: "The Mystery of Providence", author: "約翰·弗拉維爾", year: "1678", era: "清教徒", lang: "英文", isbn: "9780851511047", cover: "covers/flavel-providence.jpg", blurb: "觀察神在家庭、試煉、時機中的手：不是迷信，而是敬虔的註釋。" },
  { id: "brooks-remedies", chapter: "puritan", n: 55, titleZh: "抵擋撒但的珍貴良方", titleOrig: "Precious Remedies Against Satan's Devices", author: "托馬斯·布魯克斯", year: "1652", era: "清教徒", lang: "英文", isbn: "9780851510026", cover: "covers/brooks-remedies.jpg", blurb: "拆穿試探的計謀，並開出聖經的解藥。屬靈爭戰的實用手冊。" },
  { id: "rutherford-letters", chapter: "puritan", n: 56, titleZh: "獄中書簡", titleOrig: "Letters of Samuel Rutherford", author: "撒母耳·盧瑟福", year: "1664（輯成）", era: "蘇格蘭聖約派", lang: "英文", isbn: "9780851513881", cover: "covers/rutherford-letters.jpg", blurb: "司布真稱為「最接近聖靈默示的書信」之一：在受苦中愛基督。" },
  { id: "edwards-affections", chapter: "puritan", n: 57, titleZh: "宗教情操", titleOrig: "A Treatise Concerning Religious Affections", author: "約拿單·愛德華茲", year: "1746", era: "大覺醒", lang: "英文", isbn: "9780851515953", cover: "covers/edwards-affections.jpg", blurb: "真悔改必影響情感；但不是一切熱烈都是聖靈。分辨復興的經典。" },
  { id: "brainerd-diary", chapter: "puritan", n: 58, titleZh: "布雷納德日記", titleOrig: "The Life and Diary of David Brainerd", author: "大衛·布雷納德（愛德華茲編）", year: "1749", era: "大覺醒／宣教", lang: "英文", isbn: "9780801006760", cover: "covers/brainerd-diary.jpg", blurb: "短促、病弱、火熱的宣教士日記，塑造了後世無數宣教呼召。" },

  /* ——— 05 覺醒與宣教 ——— */
  { id: "whitefield-journals", chapter: "awakening", n: 59, titleZh: "日記與講章", titleOrig: "Journals and Sermons", author: "喬治·懷特腓", year: "1737–1770", era: "大覺醒", lang: "英文", isbn: "9780851515007", cover: "covers/whitefield-journals.jpg", blurb: "野外講道、新生、跨大西洋復興：把加爾文主義講成淚水與呼籲。" },
  { id: "wesley-journals", chapter: "awakening", n: 60, titleZh: "約翰·衛斯理日記", titleOrig: "The Journal of John Wesley", author: "約翰·衛斯理", year: "1735–1790", era: "循道復興", lang: "英文", isbn: "9780802131942", cover: "covers/wesley-journals.jpg", blurb: "馬背上的牧者日誌。福音派可不同意其成聖論，卻當學其紀律與熱忱。" },
  { id: "newton-cardiphonia", chapter: "awakening", n: 61, titleZh: "心聲集", titleOrig: "Cardiphonia", author: "約翰·牛頓", year: "1781", era: "福音派聖公會", lang: "英文", isbn: "9781877611544", cover: "covers/newton-cardiphonia.jpg", blurb: "販奴者蒙恩後的牧養書信：恩典如何醫治記憶與良心。" },
  { id: "wilberforce-view", chapter: "awakening", n: 62, titleZh: "真實基督教觀", titleOrig: "A Practical View of Christianity", author: "威廉·威伯福斯", year: "1797", era: "克拉朋聯盟", lang: "英文", isbn: "9781598561227", cover: "covers/wilberforce-view.jpg", blurb: "駁斥名義上的基督教：真信仰必結出悔改、憐憫與公共公義。" },
  { id: "carey-enquiry", chapter: "awakening", n: 63, titleZh: "基督徒當竭力使用方法帶領外邦人歸正之探究", titleOrig: "An Enquiry", author: "威廉·克理", year: "1792", era: "近代宣教", lang: "英文", cover: "covers/carey-enquiry.jpg", blurb: "近代宣教運動的火花：大使命尚未撤銷，教會當起來前往。" },
  { id: "judson-memoir", chapter: "awakening", n: 64, titleZh: "賈德森傳", titleOrig: "Memoir of Adoniram Judson", author: "法蘭西斯·韋蘭等", year: "1853", era: "美浸宣教", lang: "英文", isbn: "9781597520843", cover: "covers/judson-memoir.jpg", blurb: "緬甸的監獄、詞典與墳墓：宣教是長期的死而復活。" },
  { id: "taylor-secret", chapter: "awakening", n: 65, titleZh: "戴德生的屬靈秘訣", titleOrig: "Hudson Taylor's Spiritual Secret", author: "戴存義、戴賀美", year: "1932", era: "內地會", lang: "英文", isbn: "9780802400277", cover: "covers/taylor-secret.jpg", blurb: "「支取基督」的聯合生命：不是苦修，而是信靠那位住在裡面的主。" },
  { id: "muller-narratives", chapter: "awakening", n: 66, titleZh: "信心的見證", titleOrig: "Narratives of the Lord's Dealings", author: "喬治·慕勒", year: "1837 起", era: "弟兄運動", lang: "英文", isbn: "9780883681824", cover: "covers/muller-narratives.jpg", blurb: "不向人募款、只向神禱告養活孤兒：見證神仍聽禱告。" },
  { id: "spurgeon-lectures", chapter: "awakening", n: 67, titleZh: "給我學生的講課", titleOrig: "Lectures to My Students", author: "司布真", year: "1875–1894", era: "維多利亞福音派", lang: "英文", isbn: "9780310329114", cover: "covers/spurgeon-lectures.jpg", blurb: "講道、聲音、幽默、禱告與崩潰：牧師學院裡最不枯燥的課。" },
  { id: "spurgeon-grace", chapter: "awakening", n: 68, titleZh: "全是恩典", titleOrig: "All of Grace", author: "司布真", year: "1886", era: "維多利亞福音派", lang: "英文", isbn: "9780802454522", cover: "covers/spurgeon-grace.jpg", blurb: "為未信者寫的小書：救恩從頭到尾是恩典，請來就近基督。" },
  { id: "spurgeon-morning", chapter: "awakening", n: 69, titleZh: "晨夕靜思", titleOrig: "Morning and Evening", author: "司布真", year: "1865–1868", era: "維多利亞福音派", lang: "英文", isbn: "9781871676310", cover: "covers/spurgeon-morning.jpg", blurb: "一年兩則的經典靈修：以基督為中心的日常糧食。" },
  { id: "ryle-holiness", chapter: "awakening", n: 70, titleZh: "聖潔", titleOrig: "Holiness", author: "萊爾（J. C. Ryle）", year: "1877", era: "福音派聖公會", lang: "英文", isbn: "9781879735583", cover: "covers/ryle-holiness.jpg", blurb: "沒有聖潔，無人能見主。平衡稱義與成聖，駁斥廉價恩典與完美主義。" },
  { id: "ryle-knots", chapter: "awakening", n: 71, titleZh: "解開的結", titleOrig: "Knots Untied", author: "萊爾", year: "1874", era: "福音派聖公會", lang: "英文", isbn: "9780851513249", cover: "covers/ryle-knots.jpg", blurb: "洗禮、重生、敬拜、教會等「打結」的教義，用聖經一一解開。" },
  { id: "bonar-winners", chapter: "awakening", n: 72, titleZh: "得人的話", titleOrig: "Words to Winners of Souls", author: "霍雷修斯·伯納", year: "1877（英版廣傳）", era: "蘇格蘭自由教會", lang: "英文", isbn: "9780875521640", cover: "covers/bonar-winners.jpg", blurb: "向傳道人發出的懇切責備：先為自己的冷淡哀哭，再去得人。" },

  /* ——— 06 近現代 ——— */
  { id: "pascal-pensees", chapter: "modern", n: 73, titleZh: "思想錄", titleOrig: "Pensées", author: "布萊茲·帕斯卡", year: "1670（遺著）", era: "十七世紀護教", lang: "法文", isbn: "9780140446456", cover: "covers/pascal-pensees.jpg", blurb: "數學家的碎片護教：人的偉大與悲慘，惟基督能縫合。勿誤引「上帝形狀的真空」。" },
  { id: "chesterton-orthodoxy", chapter: "modern", n: 74, titleZh: "正統", titleOrig: "Orthodoxy", author: "卻斯特頓", year: "1908", era: "二十世紀文學護教", lang: "英文", isbn: "9780898705522", cover: "covers/chesterton-orthodoxy.jpg", blurb: "以悖論保衛使徒信經：世界有驚喜，因為它是被造的童話。" },
  { id: "machen-liberalism", chapter: "modern", n: 75, titleZh: "基督教與自由主義", titleOrig: "Christianity and Liberalism", author: "梅欽", year: "1923", era: "基要主義／福音派", lang: "英文", isbn: "9780802864994", cover: "covers/machen-liberalism.jpg", blurb: "自由主義不是基督教的一種，而是另一種宗教。二十世紀福音派的定海針。" },
  { id: "warfield-inspiration", chapter: "modern", n: 76, titleZh: "聖經的默示與權威", titleOrig: "The Inspiration and Authority of the Bible", author: "華菲德", year: "1948（文集）", era: "舊普林斯頓", lang: "英文", isbn: "9780875525273", cover: "covers/warfield-inspiration.jpg", blurb: "以嚴謹學術捍衛聖經完全默示：神的話，也是人的話。" },
  { id: "lewis-mere", chapter: "modern", n: 77, titleZh: "返璞歸真", titleOrig: "Mere Christianity", author: "C. S. 路易士", year: "1952", era: "文學護教", lang: "英文", isbn: "9780060652920", cover: "covers/lewis-mere.jpg", blurb: "從道德律到三一與新生命：把「核心基督教」講給戰爭中的收音機聽眾。" },
  { id: "lewis-screwtape", chapter: "modern", n: 78, titleZh: "地獄來鴻", titleOrig: "The Screwtape Letters", author: "C. S. 路易士", year: "1942", era: "文學護教", lang: "英文", isbn: "9780060652937", cover: "covers/lewis-screwtape.jpg", blurb: "一隻老鬼寫給姪子的信：試探往往在瑣碎、自憐與「宗教氣氛」裡。" },
  { id: "lewis-abolition", chapter: "modern", n: 79, titleZh: "人之廢", titleOrig: "The Abolition of Man", author: "C. S. 路易士", year: "1943", era: "文學護教", lang: "英文", isbn: "9780060652944", cover: "covers/lewis-abolition.jpg", blurb: "若教育拆毀客觀價值（Tao），人終將被技術與欲望廢掉。" },
  { id: "tozer-pursuit", chapter: "modern", n: 80, titleZh: "追求神", titleOrig: "The Pursuit of God", author: "陶恕", year: "1948", era: "福音派靈修", lang: "英文", isbn: "9781600660030", cover: "covers/tozer-pursuit.jpg", blurb: "神先尋找我們，我們才尋找祂。針對忙碌、膚淺的福音派敬虔。" },
  { id: "chambers-utmost", chapter: "modern", n: 81, titleZh: "竭誠為主", titleOrig: "My Utmost for His Highest", author: "邁爾·錢伯斯", year: "1927（輯成）", era: "福音派靈修", lang: "英文", isbn: "9781627075336", cover: "covers/chambers-utmost.jpg", blurb: "最廣為使用的英文靈修之一。當以整本聖經平衡其「絕對奉獻」的語氣。" },
  { id: "bonhoeffer-cost", chapter: "modern", n: 82, titleZh: "做門徒的代價", titleOrig: "Nachfolge / The Cost of Discipleship", author: "潘霍華", year: "1937", era: "認信教會", lang: "德文", isbn: "9780684815008", cover: "covers/bonhoeffer-cost.jpg", blurb: "「廉價恩典是教會的死敵。」福音派取其十架門徒，慎辨其後期一些表述。", caution: true },
  { id: "bonhoeffer-together", chapter: "modern", n: 83, titleZh: "團契生活", titleOrig: "Gemeinsames Leben / Life Together", author: "潘霍華", year: "1939", era: "認信教會", lang: "德文", isbn: "9780060608521", cover: "covers/bonhoeffer-together.jpg", blurb: "地下神學院的共同生活：聖經、禱告、孤單與彼此服事。" },
  { id: "packer-knowing", chapter: "modern", n: 84, titleZh: "認識神", titleOrig: "Knowing God", author: "巴刻（J. I. Packer）", year: "1973", era: "當代福音派", lang: "英文", isbn: "9780830816507", cover: "covers/packer-knowing.jpg", blurb: "把清教徒論上帝的教義寫成可讀的靈修神學。一代福音派的入門鉅著。" },
  { id: "stott-basic", chapter: "modern", n: 85, titleZh: "基督教信仰", titleOrig: "Basic Christianity", author: "約翰·斯托得", year: "1958", era: "當代福音派", lang: "英文", isbn: "9780830834037", cover: "covers/stott-basic.jpg", blurb: "基督是誰、祂做了什麼、我們當如何回應：仍是最佳福音小書之一。" },
  { id: "stott-cross", chapter: "modern", n: 86, titleZh: "當代基督十架", titleOrig: "The Cross of Christ", author: "約翰·斯托得", year: "1986", era: "當代福音派", lang: "英文", isbn: "9780830833207", cover: "covers/stott-cross.jpg", blurb: "二十世紀最重要的替代贖罪論述之一：十架是神的公義與愛。" },
  { id: "schaeffer-there", chapter: "modern", n: 87, titleZh: "永在的神", titleOrig: "The God Who Is There", author: "薛華", year: "1968", era: "福音派護教", lang: "英文", isbn: "9780830819478", cover: "covers/schaeffer-there.jpg", blurb: "從哲學、藝術與文化斷層談「真理」：神存在，並且已經說話。" },
  { id: "lloyd-jones-depression", chapter: "modern", n: 88, titleZh: "屬靈低潮", titleOrig: "Spiritual Depression", author: "鐘馬田", year: "1965", era: "改革宗福音派", lang: "英文", isbn: "9780802813879", cover: "covers/lloyd-jones-depression.jpg", blurb: "「為何憂悶？」向自己講道：把福音應用在灰心、自義與恐懼上。" },

  /* ——— 07 當代 ——— */
  { id: "lewis-divorce", chapter: "contemporary", n: 89, titleZh: "大離婚", titleOrig: "The Great Divorce", author: "C. S. 路易士", year: "1945", era: "文學護教", lang: "英文", isbn: "9780060652951", cover: "covers/lewis-divorce.jpg", blurb: "從灰色城到高山的巴士：地獄是把自己關在裡面的選擇。寓言，非死後地理學。" },
  { id: "packer-evangelism", chapter: "contemporary", n: 90, titleZh: "傳福音與神的主權", titleOrig: "Evangelism and the Sovereignty of God", author: "巴刻", year: "1961", era: "當代福音派", lang: "英文", isbn: "9780830834112", cover: "covers/packer-evangelism.jpg", blurb: "神的主權不是傳福音的剎車，乃是引擎與安慰。" },
  { id: "henry-uneasy", chapter: "contemporary", n: 91, titleZh: "現代基要主義不安的良心", titleOrig: "The Uneasy Conscience of Modern Fundamentalism", author: "卡爾·亨利", year: "1947", era: "新福音派", lang: "英文", isbn: "9780802806611", cover: "covers/henry-uneasy.jpg", blurb: "持守聖經權威，同時走出文化孤立：福音也關乎鄰舍與公共生活。" },
  { id: "newbigin-pluralist", chapter: "contemporary", n: 92, titleZh: "多元社會中的福音", titleOrig: "The Gospel in a Pluralist Society", author: "萊斯利·紐比真", year: "1989", era: "宣教學", lang: "英文", isbn: "9780802804266", cover: "covers/newbigin-pluralist.jpg", blurb: "西方本身已成宣教工場。信心不是私人偏好，乃是對真理的委身。" },
  { id: "piper-desiring", chapter: "contemporary", n: 93, titleZh: "渴慕神", titleOrig: "Desiring God", author: "約翰·派博", year: "1986", era: "當代改革宗福音派", lang: "英文", isbn: "9781601423108", cover: "covers/piper-desiring.jpg", blurb: "基督教享樂主義：神在我們以祂為樂之時最被榮耀。" },
  { id: "keller-reason", chapter: "contemporary", n: 94, titleZh: "為什麼是耶穌", titleOrig: "The Reason for God", author: "提摩太·凱勒", year: "2008", era: "當代護教", lang: "英文", isbn: "9781594483493", cover: "covers/keller-reason.jpg", blurb: "對曼哈頓懷疑者說話：懷疑本身也需被懷疑，福音比兩邊的極端更大。" },
  { id: "keller-prodigal", chapter: "contemporary", n: 95, titleZh: "浪子神", titleOrig: "The Prodigal God", author: "提摩太·凱勒", year: "2008", era: "當代護教", lang: "英文", isbn: "9781594484025", cover: "covers/keller-prodigal.jpg", blurb: "路加十五章的兩個兒子：不信與自義都需要恩典的父親。" },
  { id: "carson-god-there", chapter: "contemporary", n: 96, titleZh: "神在這裡", titleOrig: "The God Who Is There", author: "卡森（D. A. Carson）", year: "2010", era: "聖經神學", lang: "英文", isbn: "9780801013720", cover: "covers/carson-god-there.jpg", blurb: "從創世記到啟示錄的故事線：認識那位已經說話、並且來到的神。" },
  { id: "nee-normal-life", chapter: "contemporary", n: 97, titleZh: "正常的基督徒生活", titleOrig: "The Normal Christian Life", author: "倪柝聲", year: "1957（英譯廣傳）", era: "中國教會", lang: "中文／英文輯成", isbn: "9780875083902", cover: "covers/nee-normal-life.jpg", blurb: "羅馬書五至八章的「同死同活」。有造就，亦有教會論與釋經上需分辨之處。", caution: true },
  { id: "wang-mingdao", chapter: "contemporary", n: 98, titleZh: "作主的門徒", titleOrig: "作主的門徒", author: "王明道", year: "二十世紀中葉", era: "中國教會", lang: "中文", cover: "covers/wang-mingdao.jpg", blurb: "北京的守望者：重生、分別為聖、不與世俗或政治偶像妥協。" },
  { id: "john-sung", chapter: "contemporary", n: 99, titleZh: "靈歷集光", titleOrig: "靈歷集光", author: "宋尚節", year: "後人輯錄", era: "中國奮興", lang: "中文", cover: "covers/john-sung.jpg", blurb: "理學博士成為佈道家：認罪、十架、復興。讀其火，也學其破碎。" },
  { id: "li-cheng-wanderer", chapter: "contemporary", n: 100, titleZh: "遊子吟", titleOrig: "A Table in the Wilderness（中文原著）", author: "里程", year: "1996 起增訂", era: "當代華人護教", lang: "中文", cover: "covers/li-cheng-wanderer.jpg", isbn: "9781931393072", blurb: "寫給知識分子遊子的系統護教與福音入門：科學、歷史、聖經與生命。" }
];
