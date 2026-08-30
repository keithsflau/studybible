/**
 * 教會紀律 — 篇章目錄（首屏只載入此檔）
 * 各課正文見 data/*.js，按章懶載入。
 */
window.DISCIPLINE_CATALOG = {
  title: "教會紀律",
  titleEn: "Church Discipline",
  lead:
    "這是一份給福音派地方教會長老、同工與會友的教學手冊。教會紀律不是羞辱人的刑具，也不是放任罪的代名詞；乃是基督作頭的身體，按聖經挽回弟兄、保護羊群、榮耀基督、潔淨見證。",
  verse: {
    zh: "弟兄們，若有人偶然被過犯所勝，你們屬靈的人就當用溫柔的心把他挽回過來；又當自己小心，恐怕也被引誘。",
    ref: "加拉太書 6:1"
  },
  aims: [
    { no: "01", title: "挽回弟兄", body: "目標是得著那人，不是除掉他。公開決裂是最後一步，不是第一步。" },
    { no: "02", title: "保護羊群", body: "一點麵酵能使全團發起來。紀律也是為軟弱者、受害者和年輕信徒。" },
    { no: "03", title: "榮耀基督", body: "教會是基督的身體與新婦。聖潔的見證把榮耀歸給頭，而不是歸給人的手腕。" },
    { no: "04", title: "潔淨見證", body: "會籍與主餐說出「誰屬於主的子民」。紀律保守這句話不被虛空。" }
  ],
  featuredId: "process",
  chapters: [
    {
      id: "intro",
      no: "01",
      title: "導論：為何有教會紀律？",
      titleEn: "Why Discipline Exists",
      blurb: "愛不是放任；聖潔與福音並行。權柄在基督，教會是身體。長老牧養，會眾認信，聖經作最後裁判。",
      tone: "linear-gradient(135deg,#1b2436,#3f2a1a)",
      keywords: "愛 放任 聖潔 福音 權柄 基督是頭 身體 地方教會 長老 會友"
    },
    {
      id: "scripture",
      no: "02",
      title: "聖經基礎",
      titleEn: "Biblical Foundations",
      blurb: "太18、林前5、加6、帖後3、多3、提前5、來12、雅5：每段講解與金句，作一切程序的根基。",
      tone: "linear-gradient(135deg,#3f1d12,#8a5a2b)",
      keywords: "馬太 哥林多 加拉太 帖撒羅尼迦 提多 提摩太 希伯來 雅各 經文"
    },
    {
      id: "purpose",
      no: "03",
      title: "紀律的目的與精神",
      titleEn: "Aims & Spirit",
      blurb: "挽回、警戒、保護、榮耀神。反對律法主義，也反對縱容。溫柔與勇敢必須同在。",
      tone: "linear-gradient(135deg,#14532d,#3f2a1a)",
      keywords: "目的 挽回 警戒 保護 榮耀 律法主義 縱容 溫柔"
    },
    {
      id: "process",
      no: "04",
      title: "步驟與程序",
      titleEn: "Steps & Process",
      blurb: "私下勸勉 → 一兩個人 → 告訴教會／長老團 → 不聽則看他像外邦人稅吏。紀錄、見證、保密、時限與會友大會。",
      tone: "linear-gradient(135deg,#1e3a4c,#4a7c9b)",
      keywords: "步驟 私下 見證 長老團 會友大會 紀錄 保密 投票 太18"
    },
    {
      id: "scope",
      no: "05",
      title: "範圍與分類",
      titleEn: "Scope & Cases",
      blurb: "私人得罪、公開罪行、教義背道、分裂、怠惰、婚姻不忠、金錢、網上見證。何謂尚未到紀律，何謂必須立刻行動。",
      tone: "linear-gradient(135deg,#4c1d12,#b45309)",
      keywords: "範圍 分類 私人 公開 異端 分裂 怠惰 婚姻 金錢 網絡"
    },
    {
      id: "membership",
      no: "06",
      title: "聖餐與會籍",
      titleEn: "The Table & Membership",
      blurb: "停止領餐、除名、復籍。信徒受浸與重生的會籍。主餐是恩典的表記，也是聖潔的界線。",
      tone: "linear-gradient(135deg,#3f2a1a,#7c2d12)",
      keywords: "聖餐 主餐 會籍 受浸 洗禮 除名 復籍 停止領餐 聖禮"
    },
    {
      id: "special",
      no: "07",
      title: "特殊個案",
      titleEn: "Hard Cases",
      blurb: "家暴與性侵犯先保護受害者並報案；長老被指控；未成年；精神病與成癮；已經離開的人。",
      tone: "linear-gradient(135deg,#4c0519,#9a3412)",
      keywords: "家暴 性侵 報案 受害者 長老指控 未成年 精神病 成癮 離開"
    },
    {
      id: "restore",
      no: "08",
      title: "挽回與復和",
      titleEn: "Restoration",
      blurb: "真悔改的記號、復和的步伐、如何重新接納、如何牧養雙方。林後2：赦免、安慰、顯出愛心。",
      tone: "linear-gradient(135deg,#14532d,#0f766e)",
      keywords: "挽回 復和 悔改 接納 林後 赦免 安慰 牧養雙方"
    },
    {
      id: "faq",
      no: "09",
      title: "常見錯謬問答",
      titleEn: "Q&A on Common Errors",
      blurb: "閒話當紀律、群組審判、只罰窮人、人情大過聖經、用紀律報復、不敢執行以致腐敗。",
      tone: "linear-gradient(135deg,#1b2436,#5b4a2e)",
      keywords: "問答 閒話 群組 偏心 人情 報復 縱容 腐敗"
    },
    {
      id: "templates",
      no: "10",
      title: "表格與清單",
      titleEn: "Outlines & Checklists",
      blurb: "勸勉紀錄大綱、會議程序清單、經文索引。純教學模板，請勿在此填寫真實姓名或敏感個資。",
      tone: "linear-gradient(135deg,#0c1222,#3f2a1a)",
      keywords: "表格 清單 紀錄 會議 經文索引 模板 程序"
    }
  ]
};
