/**
 * 聖樂教室 — 輕量目錄（首屏只載入此檔）
 * 篇章正文見 data/intro.js 等，聖詩詳課見 data/hymns-a.js、hymns-b.js，按需懶載入。
 */
window.SACRED_MUSIC_CATALOG = {
  title: "聖樂教室",
  titleEn: "An Evangelical Classroom for Sacred Music",
  lead:
    "敬拜是回應啟示，不是製造氣氛。本教室按福音派聖樂神學，帶你從聖經中的詩歌走到宗教改革的會眾唱詩，再進入英語聖詩黃金時代、中文聖詩與當代敬拜的分辨。音樂必須服事聖道；會眾歌唱優先於表演。",
  verse: {
    zh: "當用詩章、頌詞、靈歌，彼此對說，口唱心和地讚美主。",
    ref: "以弗所書 5:19"
  },
  hero: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Long_Room_Interior%2C_Trinity_College_Dublin%2C_Ireland_-_Diliff.jpg/1280px-Long_Room_Interior%2C_Trinity_College_Dublin%2C_Ireland_-_Diliff.jpg",
    alt: "都柏林三一學院長廊：聖樂教室與經典書房相鄰的學術聖所",
    credit: "Photo: Diliff, Trinity College Dublin Long Room, CC BY-SA"
  },
  featuredId: "amazing-grace",
  featuredImage:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/GeorgeWhitefield.jpg/640px-GeorgeWhitefield.jpg",
  occasions: ["主日", "聖餐", "受難", "復活", "聖誕", "宣教", "喪禮", "認罪", "差遣", "三一", "見證"],
  chapters: [
    {
      id: "intro",
      no: "01",
      kind: "essay",
      kindLabel: "神學導論",
      title: "什麼是聖樂？",
      titleEn: "What Is Sacred Music?",
      era: "福音派聖樂神學",
      blurb:
        "敬拜是回應啟示。歌詞必須合乎聖經；音樂服事聖道，不是壓過聖道。會眾歌唱優先，三一頌讚為中心，並謹慎娛樂化與表演化。",
      tone: "linear-gradient(135deg,#1d2a4a,#6b4c7a)",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Good_shepherd_01b_close.jpg/800px-Good_shepherd_01b_close.jpg"
    },
    {
      id: "scripture",
      no: "02",
      kind: "essay",
      kindLabel: "聖經課",
      title: "聖經中的聖樂",
      titleEn: "Sacred Song in Scripture",
      era: "從出埃及到新天新地",
      blurb:
        "詩篇、出埃及記 15、歷代志聖殿樂班、以弗所 5:19、歌羅西 3:16、啟示錄詩歌。聖樂不是後來教會的發明，乃是神子民對救贖的回答。",
      tone: "linear-gradient(135deg,#3d4f3a,#8b7355)",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Scriptorium-monk-2.jpg/800px-Scriptorium-monk-2.jpg",
      relatedHymns: ["praise-to-the-lord", "holy-holy-holy", "how-great-thou-art"]
    },
    {
      id: "early",
      no: "03",
      kind: "essay",
      kindLabel: "歷史巡禮",
      title: "早期教會與額我略聖詠",
      titleEn: "The Early Church & Gregorian Chant",
      era: "第一至第十世紀",
      blurb:
        "安布羅斯、奧古斯丁的眼淚、額我略聖詠。福音派批判地欣賞：取其敬畏、聖經性與會眾可跟的簡樸，拒絕把禮儀本身變成救恩。",
      tone: "linear-gradient(135deg,#3f2a1a,#8a5a2b)",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Scriptorium-monk-2.jpg/800px-Scriptorium-monk-2.jpg",
      relatedHymns: ["o-sacred-head", "be-thou-my-vision", "all-creatures"]
    },
    {
      id: "reformation",
      no: "04",
      kind: "essay",
      kindLabel: "歷史巡禮",
      title: "宗教改革聖詩",
      titleEn: "Reformation Song",
      era: "第十六世紀",
      blurb:
        "路德把福音放回會眾口中；加爾文以詩篇唱詩守護敬拜的簡樸。這是一次「會眾唱詩革命」：聖道不再只屬於詩班。",
      tone: "linear-gradient(135deg,#4c1d12,#b45309)",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Lucas_Cranach_d.%C3%84._-_Martin_Luther%2C_1528_%28Veste_Coburg%29.jpg/640px-Lucas_Cranach_d.%C3%84._-_Martin_Luther%2C_1528_%28Veste_Coburg%29.jpg",
      relatedHymns: ["mighty-fortress", "praise-to-the-lord", "all-creatures"]
    },
    {
      id: "english",
      no: "05",
      kind: "essay",
      kindLabel: "歷史巡禮",
      title: "英語聖詩黃金時代",
      titleEn: "The English Hymn Golden Age",
      era: "第十八至十九世紀",
      blurb:
        "瓦茨讓新約教會用自己的舌歌唱；衛斯理把稱義的喜樂寫進會眾能喊出來的旋律；牛頓與古柏在奧尼的牧養裡唱出恩典。",
      tone: "linear-gradient(135deg,#1e3a4c,#4a7c9b)",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/GeorgeWhitefield.jpg/640px-GeorgeWhitefield.jpg",
      relatedHymns: ["when-i-survey", "and-can-it-be", "amazing-grace", "come-thou-fount"]
    },
    {
      id: "gospel",
      no: "06",
      kind: "essay",
      kindLabel: "歷史巡禮",
      title: "福音詩歌與中文聖詩",
      titleEn: "Gospel Song & the Chinese Hymn",
      era: "十九世紀至今",
      blurb:
        "慕迪／桑基、芬尼·克羅斯比，以及辯教士翻譯、中文讚美詩與今日華人教會。福音要能被普通會眾用母語唱出來。",
      tone: "linear-gradient(135deg,#14532d,#0f766e)",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/John_Bunyan.jpg/640px-John_Bunyan.jpg",
      relatedHymns: ["to-god-be-glory", "blessed-assurance", "just-as-i-am", "in-the-cross"]
    },
    {
      id: "contemporary",
      no: "07",
      kind: "essay",
      kindLabel: "歷史巡禮",
      title: "當代敬拜的益處與危機",
      titleEn: "Contemporary Worship: Gift and Trial",
      era: "二十世紀後期至今",
      blurb:
        "可唱性、神學深度、會眾參與、演出文化。當代歌曲可以成為教會的新詩篇，也可以把敬拜變成演唱會。分辨是牧者的責任。",
      tone: "linear-gradient(135deg,#312e81,#6d28d9)",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Open_book_nae_02.jpg/800px-Open_book_nae_02.jpg",
      relatedHymns: ["in-christ-alone", "how-great-thou-art", "great-faithfulness"]
    },
    {
      id: "hymns",
      no: "08",
      kind: "hymns",
      kindLabel: "精選課",
      title: "聖詩精選課",
      titleEn: "Thirty Hymn Lessons",
      era: "教室實習",
      blurb:
        "三十首經典：曲名中英、詞曲作者、神學主題、詳細介紹、公開領域全部歌詞（原文與教學中譯）、場合與帶領提示。當代受版權作品只作教學摘句。",
      tone: "linear-gradient(135deg,#1b2436,#5b4a2e)",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Open_book_nae_02.jpg/800px-Open_book_nae_02.jpg"
    },
    {
      id: "planning",
      no: "09",
      kind: "essay",
      kindLabel: "實務課",
      title: "敬拜策劃實務",
      titleEn: "Planning the Sunday Service",
      era: "教會年曆與聖道邏輯",
      blurb:
        "按教會年曆與講道主題選詩；序樂—宣召—認罪—聖道—回應—聖餐—差遣的音樂邏輯；詩班、敬拜隊與會眾；樂器與簡樸敬拜。",
      tone: "linear-gradient(135deg,#1e293b,#334155)",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/C.S.Lewis.JPG/640px-C.S.Lewis.JPG"
    },
    {
      id: "criteria",
      no: "10",
      kind: "essay",
      kindLabel: "評鑑課",
      title: "福音派評鑑標準",
      titleEn: "An Evangelical Rubric",
      era: "怎樣決定唱或不唱",
      blurb:
        "神學是否合乎聖經、是否基督中心、會眾能否唱、旋律是否服事歌詞、情感是否健康、是否榮耀上帝而非表演者。",
      tone: "linear-gradient(135deg,#3b1220,#9f1239)",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Good_shepherd_01b_close.jpg/800px-Good_shepherd_01b_close.jpg"
    }
  ],
  hymns: [
    { id: "amazing-grace", pack: "hymns-a", n: 1, titleZh: "奇異恩典", titleEn: "Amazing Grace", lyricist: "John Newton 約翰·牛頓", composer: "NEW BRITAIN（美國民間調，1831 年刊出）", year: "1779", theme: "恩典與悔改", meter: "8.6.8.6 (C.M.)", key: "G / F 大調", tempo: "♩ = 72–84，敘事而不拖沓", occasions: ["主日", "見證", "喪禮", "認罪"], blurb: "販奴者被恩典追上之後的見證詩：不是自我感覺，而是「我曾失喪，今被尋回」。" },
    { id: "mighty-fortress", pack: "hymns-a", n: 2, titleZh: "堅固保障", titleEn: "A Mighty Fortress Is Our God / Ein feste Burg", lyricist: "Martin Luther 馬丁·路德", composer: "EIN FESTE BURG（路德，約 1529）", year: "約 1529", theme: "上帝主權與屬靈爭戰", meter: "8.7.8.7.6.6.6.6.7", key: "C / D 大調", tempo: "♩ = 96–108，堅定如行進", occasions: ["主日", "宗教改革主日", "差遣"], blurb: "宗教改革的戰歌：我們的保障是上帝自己，不是人的勇氣。" },
    { id: "holy-holy-holy", pack: "hymns-a", n: 3, titleZh: "聖哉聖哉聖哉", titleEn: "Holy, Holy, Holy", lyricist: "Reginald Heber 希伯", composer: "NICAEA（John B. Dykes, 1861）", year: "1826", theme: "三一頌讚", meter: "11.12.12.10", key: "D 大調", tempo: "♩ = 88–100，莊嚴而不僵硬", occasions: ["主日", "三一", "宣召"], blurb: "把以賽亞六章與啟示錄四章放進主日第一首：敬拜從「聖哉」開始。" },
    { id: "when-i-survey", pack: "hymns-a", n: 4, titleZh: "每當我思想奇妙十字架", titleEn: "When I Survey the Wondrous Cross", lyricist: "Isaac Watts 以撒·瓦茨", composer: "HAMBURG / ROCKINGHAM", year: "1707", theme: "十架與獻上", meter: "8.8.8.8 (L.M.)", key: "F / E♭ 大調", tempo: "♩ = 68–80，默想速度", occasions: ["聖餐", "受難", "主日"], blurb: "英語聖詩中最克制、最昂貴的十架默想：萬有若歸我，仍嫌太少。" },
    { id: "and-can-it-be", pack: "hymns-a", n: 5, titleZh: "何能如此", titleEn: "And Can It Be That I Should Gain", lyricist: "Charles Wesley 查理·衛斯理", composer: "SAGINA（Thomas Campbell, 1825）", year: "1738", theme: "稱義與釋放", meter: "8.8.8.8.8.8", key: "G 大調", tempo: "♩ = 100–112，喜樂而清楚", occasions: ["主日", "復活", "見證"], blurb: "衛斯理悔改那年的驚嘆：永活之神竟為我死，監牢的鎖鏈脫落。" },
    { id: "how-great-thou-art", pack: "hymns-a", n: 6, titleZh: "祢真偉大", titleEn: "How Great Thou Art / O store Gud", lyricist: "Carl Boberg；英譯 Stuart K. Hine", composer: "瑞典民謠調", year: "1885／1949 英譯", theme: "創造與救贖的敬畏", meter: "11.10.11.10 與副歌", key: "B♭ / A 大調", tempo: "♩ = 72–84，由默觀推向頌讚", occasions: ["主日", "宣教", "喪禮"], copyright: true, blurb: "從雷雨中的「上帝啊，祢何等偉大」走到各各他。英譯與通行中譯多受版權保護。" },
    { id: "it-is-well", pack: "hymns-a", n: 7, titleZh: "我心靈得安寧", titleEn: "It Is Well with My Soul", lyricist: "Horatio Spafford 斯皮福", composer: "VILLE DU HAVRE（P. P. Bliss, 1876）", year: "1873", theme: "苦難中的平安", meter: "11.8.11.9 與副歌", key: "C / D♭ 大調", tempo: "♩ = 76–88，穩而不甜膩", occasions: ["喪禮", "主日", "安慰"], blurb: "大西洋海難之後的認信：平安不在環境，而在十架所成的義。" },
    { id: "great-faithfulness", pack: "hymns-a", n: 8, titleZh: "祢信實何廣大", titleEn: "Great Is Thy Faithfulness", lyricist: "Thomas O. Chisholm 奇澤姆", composer: "FAITHFULNESS（William Runyan, 1923）", year: "1923", theme: "上帝的信實", meter: "11.10.11.10 與副歌", key: "E♭ / D 大調", tempo: "♩ = 80–92，溫厚如晨禱", occasions: ["主日", "新年", "喪禮"], blurb: "哀歌三章 23 節的會眾版：早晨的憐憫，不是自我激勵。" },
    { id: "be-thou-my-vision", pack: "hymns-a", n: 9, titleZh: "求主作我異象", titleEn: "Be Thou My Vision / Rop tú mo baile", lyricist: "古愛爾蘭；英譯 Mary Byrne / Eleanor Hull", composer: "SLANE（愛爾蘭民謠）", year: "約八世紀／1912 英譯", theme: "專心愛主", meter: "10.10.10.10", key: "E♭ / D 大調", tempo: "♩ = 84–96，行進如朝聖", occasions: ["主日", "差遣", "獻身"], blurb: "把「異象」從夢幻拉回專一：祢是我的爭戰、我的智慧、我的產業。" },
    { id: "all-hail-power", pack: "hymns-a", n: 10, titleZh: "擁戴歌", titleEn: "All Hail the Power of Jesus' Name", lyricist: "Edward Perronet 佩羅內", composer: "CORONATION / DIADEM / MILES LANE", year: "1779", theme: "基督的王權", meter: "8.6.8.6.8.6", key: "G / F 大調", tempo: "♩ = 96–108，加冕進行曲", occasions: ["主日", "升天", "差遣"], blurb: "天上地下一切膝都當跪拜：不是氣氛高潮，而是終末的預演。" },
    { id: "crown-him", pack: "hymns-a", n: 11, titleZh: "當戴冠冕", titleEn: "Crown Him with Many Crowns", lyricist: "Matthew Bridges / Godfrey Thring", composer: "DIADEMATA（George Elvey, 1868）", year: "1851／1874", theme: "基督的多面榮耀", meter: "6.6.8.6 D (S.M.D.)", key: "D / E♭ 大調", tempo: "♩ = 100–112，光明而穩", occasions: ["主日", "復活", "升天"], blurb: "羔羊配得許多冠冕：生命之主、和平之主、愛子之主，一節一層基督論。" },
    { id: "church-foundation", pack: "hymns-a", n: 12, titleZh: "教會唯一的根基", titleEn: "The Church's One Foundation", lyricist: "Samuel J. Stone 斯通", composer: "AURELIA（Samuel Wesley, 1864）", year: "1866", theme: "教會論", meter: "7.6.7.6 D", key: "E♭ / D 大調", tempo: "♩ = 88–100，莊重如信經", occasions: ["主日", "教會節期", "聖餐"], blurb: "寫於教義爭辯之中：教會不是潮流團體，根基只有耶穌基督。" },
    { id: "rock-of-ages", pack: "hymns-a", n: 13, titleZh: "萬古磐石", titleEn: "Rock of Ages, Cleft for Me", lyricist: "Augustus Toplady 托普雷迪", composer: "TOPLADY / REDHEAD NO. 76", year: "1776", theme: "稱義與隱藏", meter: "7.7.7.7.7.7", key: "B♭ / A 大調", tempo: "♩ = 72–84，懇求而不感傷", occasions: ["聖餐", "認罪", "喪禮"], blurb: "雙手空空來到裂開的磐石：功勞、眼淚、熱心都不能贖罪。" },
    { id: "just-as-i-am", pack: "hymns-a", n: 14, titleZh: "照我本相", titleEn: "Just As I Am", lyricist: "Charlotte Elliott 艾略特", composer: "WOODWORTH（William Bradbury, 1849）", year: "1835", theme: "邀請與稱義", meter: "8.8.8.6", key: "D / E♭ 大調", tempo: "♩ = 76–88，懇切而安靜", occasions: ["認罪", "聖餐", "宣教"], blurb: "病榻上的女子把「帶著你的本相來」寫成會眾都能走上來的詩。" },
    { id: "what-a-friend", pack: "hymns-a", n: 15, titleZh: "耶穌恩友", titleEn: "What a Friend We Have in Jesus", lyricist: "Joseph Scriven 斯克里文", composer: "CONVERSE（Charles Converse, 1868）", year: "約 1855", theme: "禱告與安慰", meter: "8.7.8.7 D", key: "F / G 大調", tempo: "♩ = 84–96，親切而不輕佻", occasions: ["主日", "喪禮", "探訪"], blurb: "寫給憂傷母親的私函，後來成為普世最會唱的禱告課。" },
    { id: "to-god-be-glory", pack: "hymns-b", n: 16, titleZh: "榮耀都歸於主", titleEn: "To God Be the Glory", lyricist: "Fanny J. Crosby 芬尼·克羅斯比", composer: "TO GOD BE THE GLORY（W. H. Doane, 1875）", year: "1875", theme: "救贖與頌讚", meter: "11.11.11.11 與副歌", key: "A♭ / G 大調", tempo: "♩ = 104–116，歡慶而咬字清楚", occasions: ["主日", "宣教", "差遣"], blurb: "失明女詩人把約翰福音三章十六節唱成會眾的凱旋：榮耀不歸人。" },
    { id: "praise-to-the-lord", pack: "hymns-b", n: 17, titleZh: "讚美上主大君王", titleEn: "Praise to the Lord, the Almighty / Lobe den Herren", lyricist: "Joachim Neander 尼安德", composer: "LOBE DEN HERREN（1665）", year: "1680", theme: "創造中的讚美", meter: "14.14.4.7.8", key: "G / F 大調", tempo: "♩ = 100–112，翱翔而穩", occasions: ["主日", "宣召", "收成"], blurb: "改革宗敬虔運動的晨歌：讚美那位作你健康與保障的君王。" },
    { id: "come-thou-fount", pack: "hymns-b", n: 18, titleZh: "萬福源頭", titleEn: "Come, Thou Fount of Every Blessing", lyricist: "Robert Robinson 魯賓遜", composer: "NETTLETON（美國民間，1813）", year: "1758", theme: "恩典與易遊移的心", meter: "8.7.8.7 D", key: "D / E♭ 大調", tempo: "♩ = 92–104，溫暖如見證", occasions: ["主日", "聖餐", "認罪"], blurb: "求恩典把自己綁在主身上：我們都是容易走迷的心。" },
    { id: "in-christ-alone", pack: "hymns-b", n: 19, titleZh: "在基督裡", titleEn: "In Christ Alone", lyricist: "Stuart Townend / Keith Getty", composer: "Keith Getty", year: "2001", theme: "基督中心的救贖史", meter: "8.8.8.8 D", key: "D / E♭ 大調", tempo: "♩ = 68–76，敘事如信經", occasions: ["主日", "聖餐", "復活"], copyright: true, blurb: "當代少有的「可唱信經」。神學紮實，但歌詞與編曲均受版權保護，本課只作教學摘句。" },
    { id: "in-the-cross", pack: "hymns-b", n: 20, titleZh: "十字架永是我的榮耀", titleEn: "In the Cross of Christ I Glory", lyricist: "John Bowring 包令", composer: "RATHBUN（Ithamar Conkey, 1849）", year: "1825", theme: "十架為榮耀", meter: "8.7.8.7", key: "B♭ / A♭ 大調", tempo: "♩ = 80–92，明亮而收斂", occasions: ["聖餐", "受難", "主日"], blurb: "華人教會極熟的十架詩：患難中仍以十字架為唯一可誇。" },
    { id: "deep-deep-love", pack: "hymns-b", n: 21, titleZh: "主愛長闊高深", titleEn: "O the Deep, Deep Love of Jesus", lyricist: "Samuel Trevor Francis 弗朗西斯", composer: "EBENEZER / TON-Y-BOTEL（Thomas Williams, 1890）", year: "1875", theme: "基督的愛", meter: "8.7.8.7 D", key: "F 小調", tempo: "♩ = 84–96，如潮水推進", occasions: ["聖餐", "主日", "宣教"], blurb: "以弗所書三章十八節的海洋意象：主愛不是甜膩，而是深、闊、強、永。" },
    { id: "joy-to-the-world", pack: "hymns-b", n: 22, titleZh: "普世歡騰", titleEn: "Joy to the World", lyricist: "Isaac Watts 以撒·瓦茨", composer: "ANTIOCH（據韓德爾改編）", year: "1719", theme: "基督作王", meter: "8.6.8.6 擴充", key: "D / C 大調", tempo: "♩ = 100–116，歡慶而有重量", occasions: ["聖誕", "主日", "降臨期"], blurb: "原是詩篇 98 的意譯，不是馬槽搖籃曲：全地要向已來的王歡呼。" },
    { id: "christ-risen", pack: "hymns-b", n: 23, titleZh: "基督已經復活", titleEn: "Christ the Lord Is Risen Today", lyricist: "Charles Wesley 查理·衛斯理", composer: "EASTER HYMN（Lyra Davidica, 1708）", year: "1739", theme: "復活", meter: "7.7.7.7 與阿利路亞", key: "C / D 大調", tempo: "♩ = 108–120，光明的宣告", occasions: ["復活", "主日", "喪禮"], blurb: "每行結尾的「阿利路亞」不是裝飾，而是空墳墓的喊聲。" },
    { id: "o-sacred-head", pack: "hymns-b", n: 24, titleZh: "聖首受重傷", titleEn: "O Sacred Head, Now Wounded / O Haupt voll Blut und Wunden", lyricist: "中世紀默想；Paul Gerhardt 德譯", composer: "PASSION CHORALE（Hassler / 巴赫和聲）", year: "1656 德譯", theme: "基督受苦", meter: "7.6.7.6 D", key: "C 小調 / D 小調", tempo: "♩ = 60–72，受難默想", occasions: ["受難", "聖餐", "週五"], blurb: "巴赫《馬太受難曲》使之不朽：不是煽情，而是凝視為我受傷的頭。" },
    { id: "abide-with-me", pack: "hymns-b", n: 25, titleZh: "與我同住", titleEn: "Abide with Me", lyricist: "Henry Francis Lyte 萊特", composer: "EVENTIDE（W. H. Monk, 1861）", year: "1847", theme: "臨終與同在", meter: "10.10.10.10", key: "E♭ / D 大調", tempo: "♩ = 68–80，黃昏禱告", occasions: ["喪禮", "晚堂", "主日"], blurb: "肺病牧者最後的懇求：萬變之中，求那不變者與我同住。" },
    { id: "blessed-assurance", pack: "hymns-b", n: 26, titleZh: "有福的確據", titleEn: "Blessed Assurance", lyricist: "Fanny J. Crosby 芬尼·克羅斯比", composer: "ASSURANCE（Phoebe Knapp, 1873）", year: "1873", theme: "救恩確據", meter: "9.10.9.9 與副歌", key: "D / C 大調", tempo: "♩ = 92–104，見證的步伐", occasions: ["主日", "見證", "宣教"], blurb: "「這是我的故事，這是我的歌曲」：確據來自基督的血與義，不是感覺。" },
    { id: "how-firm-foundation", pack: "hymns-b", n: 27, titleZh: "穩固根基", titleEn: "How Firm a Foundation", lyricist: "「K」氏（Rippon 詩集，1787）", composer: "FOUNDATION（美國民間）", year: "1787", theme: "聖經應許", meter: "11.11.11.11", key: "G / A 大調", tempo: "♩ = 88–100，穩如磐石", occasions: ["主日", "喪禮", "差遣"], blurb: "幾乎整首是神對人說話：你不是唱自己的勇氣，是把應許還給神。" },
    { id: "old-rugged-cross", pack: "hymns-b", n: 28, titleZh: "古舊十字架", titleEn: "The Old Rugged Cross", lyricist: "George Bennard 貝納德", composer: "Bennard, 1913", year: "1913", theme: "十架與跟隨", meter: "12.8.12.8 與副歌", key: "B♭ / A 大調", tempo: "♩ = 76–88，敘事見證", occasions: ["聖餐", "受難", "主日"], blurb: "二十世紀北美最被唱的十架歌之一：珍貴的不是木頭，是那掛在上面的主。" },
    { id: "all-creatures", pack: "hymns-b", n: 29, titleZh: "萬物頌讚真神", titleEn: "All Creatures of Our God and King / Laudato si'", lyricist: "亞西西的方濟；英譯 W. H. Draper", composer: "LASST UNS ERFREUEN（1623）", year: "約 1225／1919 英譯", theme: "創造頌讚", meter: "8.8.4.4.8.8 與阿利路亞", key: "D / E♭ 大調", tempo: "♩ = 96–108，開放而喜樂", occasions: ["主日", "宣召", "收成"], blurb: "太陽、風、水、死亡都成為弟兄姊妹：受造界的讚美指向創造主，不是自然崇拜。" },
    { id: "guide-me", pack: "hymns-b", n: 30, titleZh: "求主引導", titleEn: "Guide Me, O Thou Great Jehovah / Arglwydd, arwain trwy’r anialwch", lyricist: "William Williams 威廉斯", composer: "CWM RHONDDA（John Hughes, 1905）", year: "1745／1905 曲", theme: "天路引導", meter: "8.7.8.7.8.7", key: "G / A♭ 大調", tempo: "♩ = 92–104，朝聖行進", occasions: ["主日", "差遣", "喪禮"], blurb: "威爾斯的曠野詩：火柱、嗎哪、約旦——把出埃及唱成一生的天路。" }
  ]
};
