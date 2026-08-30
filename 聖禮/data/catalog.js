/**
 * 聖禮課程 — 輕量目錄（首屏只載入此檔）
 * 各章正文見 data/intro.js … data/liturgy.js，按章懶載入。
 */
window.SACRAMENTS_CATALOG = {
  title: "聖禮",
  titleEn: "Sacraments & Ordinances",
  lead:
    "這是一門福音派聖禮課，不是羅馬天主教的七聖事體系，也不是把餅杯與水禮貶成可有可無的節目。聖禮是基督所設立、有可見記號、與上帝應許相連的蒙恩管道（means of grace）。效力在乎聖靈與信心，不在乎禮文魔術。",
  verse: {
    zh: "所以，你們要去，使萬民作我的門徒，奉父、子、聖靈的名給他們施洗。凡我所吩咐你們的，都教訓他們遵守，我就常與你們同在，直到世界的末了。",
    ref: "馬太福音 28:19–20"
  },
  hero: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/The-Last-Supper-Restored-Da-Vinci_32x16.jpg/1280px-The-Last-Supper-Restored-Da-Vinci_32x16.jpg",
    alt: "達文西《最後的晚餐》",
    credit: "Leonardo da Vinci, The Last Supper (public domain)"
  },
  stance:
    "本教室的認信位置：聖經作裁判；基督一次獻上的十架為中心；聖靈與信心為聖禮效力；教會為施行的家。歷史更正教通常認信兩大聖禮：洗禮與聖餐（Baptism and the Lord’s Supper）。婚姻、按立、嬰兒奉獻等是重要教會禮儀與牧養實踐，但不與基督親自設立的兩聖禮等同——除非某傳統如此認信，本課會標明。",
  chapters: [
    {
      id: "intro",
      no: "01",
      title: "導論：什麼是聖禮？",
      titleEn: "What Is a Sacrament?",
      era: "記號、應許與可見的道",
      blurb:
        "聖禮（sacramentum）、禮儀（ordinance）、蒙恩管道（means of grace）：記號與實體、應許與信心、可見的道如何與講道同行。拒絕 ex opere operato，也拒絕空符號。",
      keywords: "聖禮 sacramentum ordinance 蒙恩管道 可見的道 visible Word 記號 應許 信心 兩大聖禮",
      tone: "linear-gradient(135deg,#1b2436,#6b3a2a)",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Good_shepherd_01b_close.jpg/800px-Good_shepherd_01b_close.jpg"
    },
    {
      id: "biblical",
      no: "02",
      title: "聖經神學",
      titleEn: "Biblical Theology of the Signs",
      era: "從預表到基督的設立",
      blurb:
        "割禮、逾越節、洪水與紅海、嗎哪與磐石：舊約預表怎樣指向基督。主親自設立洗禮與聖餐，使徒教會怎樣實踐。",
      keywords: "割禮 逾越節 預表 嗎哪 磐石 馬太28 林前10 林前11 使徒行傳",
      tone: "linear-gradient(135deg,#1e3a4c,#3d6b4f)",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Open_book_nae_02.jpg/800px-Open_book_nae_02.jpg"
    },
    {
      id: "history",
      no: "03",
      title: "歷史巡禮",
      titleEn: "A Historical Pilgrimage",
      era: "早期教會至當代福音派",
      blurb:
        "從使徒後期、奧古斯丁、中世紀對記號的誤用，到宗教改革辯論、清教徒與浸信、衛斯理，以及今日的隨意、稀少、表演化或禮儀主義。",
      keywords: "奧古斯丁 中世紀 七聖事 宗教改革 路德 加爾文 慈運理 清教徒 衛斯理",
      tone: "linear-gradient(135deg,#3f2a1a,#8a5a2b)",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Scriptorium-monk-2.jpg/800px-Scriptorium-monk-2.jpg"
    },
    {
      id: "baptism",
      no: "04",
      title: "洗禮專章",
      titleEn: "Holy Baptism",
      era: "歸入基督的死與復活",
      blurb:
        "意義、模式（浸／澆／灑）、物件（信而受洗與嬰兒洗的院內辯論）、三一公式、一次洗禮、重洗與會籍。經文必須兩邊都讀。",
      keywords: "洗禮 浸禮 嬰兒洗 信而受洗 羅馬書6 歌羅西書2 彼得前書3 太28 重洗",
      tone: "linear-gradient(135deg,#12344d,#2b6cb0)",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Piero_della_Francesca_002.jpg/800px-Piero_della_Francesca_002.jpg"
    },
    {
      id: "supper",
      no: "05",
      title: "聖餐專章",
      titleEn: "The Lord’s Supper",
      era: "記念、交通、盼望",
      blurb:
        "設立經文、過去十架／現在聯合／將來筵席、餅杯、頻率、林前11的聖潔與勸誡、兒童領餐、圍欄與公開／封閉聖餐。",
      keywords: "聖餐 主餐 擘餅 eucharist 林前11 配得 省察 屬靈同在 變質說",
      tone: "linear-gradient(135deg,#4c1d12,#b45309)",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Juan_de_Juanes_002.jpg/800px-Juan_de_Juanes_002.jpg"
    },
    {
      id: "compare",
      no: "06",
      title: "比較神學",
      titleEn: "Comparative Sacramental Theology",
      era: "天主教、東正教與更正教各家",
      blurb:
        "天主教七聖事、東正教、信義宗真實臨在、改革宗屬靈同在、浸信記念、五旬宗經驗。對照表公正陳述，並給福音派判斷。",
      keywords: "七聖事 東正教 信義宗 改革宗 浸信 五旬宗 變質 同質 記念",
      tone: "linear-gradient(135deg,#1e293b,#4a5568)",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Lucas_Cranach_d.%C3%84._-_Martin_Luther%2C_1528_%28Veste_Coburg%29.jpg/640px-Lucas_Cranach_d.%C3%84._-_Martin_Luther%2C_1528_%28Veste_Coburg%29.jpg"
    },
    {
      id: "pastoral",
      no: "07",
      title: "牧養與執行",
      titleEn: "Pastoral Administration",
      era: "怎樣主持、怎樣設界限",
      blurb:
        "如何主持洗禮與聖餐、裝備執事同工、教會秩序、對未信與未受洗者的邀請與界限，以及常見錯謬問答。其他禮儀按牧養實踐教導。",
      keywords: "主持 執事 圍欄 未受洗 嬰兒奉獻 堅振 婚姻 按立 抹油 洗腳",
      tone: "linear-gradient(135deg,#14532d,#0f766e)",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/John_Bunyan.jpg/640px-John_Bunyan.jpg"
    },
    {
      id: "liturgy",
      no: "08",
      title: "禮文與金句",
      titleEn: "Liturgical Outlines & Memory Verses",
      era: "可在堂會使用的福音派大綱",
      blurb:
        "關鍵經文金句，加上簡短可用的福音派洗禮、聖餐與嬰兒奉獻禮文大綱。不是整本受版權保護的禮文書，乃是可改編的骨架。",
      keywords: "禮文 金句 洗禮詞 聖餐詞 阿們 奉獻禮 記念詞",
      tone: "linear-gradient(135deg,#3b1f2a,#7c2d12)",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Long_Room_Interior%2C_Trinity_College_Dublin%2C_Ireland_-_Diliff.jpg/1280px-Long_Room_Interior%2C_Trinity_College_Dublin%2C_Ireland_-_Diliff.jpg"
    }
  ]
};
