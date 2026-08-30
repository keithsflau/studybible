/**
 * 基督教輔導學 — 篇章目錄（首屏只載入此檔）
 * 各講正文見 data/*.js，按章懶載入。
 */
window.COUNSELING_CATALOG = {
  title: "基督教輔導學",
  titleEn: "Christian Counseling",
  lead:
    "這是一門福音派神學院的基督教輔導學課：以聖經為裁判、以基督為中心、以地方教會為家。輔導是靈魂關顧與門徒訓練的延伸，不是代替福音，不是代替教會，也不是代替必要時的醫療與精神科。",
  verse: {
    zh: "弟兄們，我自己也深信你們是滿有良善，充足了諸般的知識，也能彼此勸戒。",
    ref: "羅馬書 15:14"
  },
  hero: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Rembrandt_Harmensz_van_Rijn_-_Return_of_the_Prodigal_Son_-_Google_Art_Project.jpg/1280px-Rembrandt_Harmensz_van_Rijn_-_Return_of_the_Prodigal_Son_-_Google_Art_Project.jpg",
    alt: "林布蘭《浪子回頭》",
    credit: "Rembrandt, Return of the Prodigal Son (public domain)"
  },
  stance:
    "本課教室的認信位置：聖經充足且有權威；人按上帝形象被造、因墮落而破碎；稱義因信基督，成聖是聖靈在教會裡的工作。輔導服事聖道與牧養，不自立為另一套救法。我們公平介紹聖經輔導（nouthetic）、福音派整合派與牧養關顧，並給出負責的判斷：既不反智，也不把心理學當福音。危機、家暴、自殺與精神病，安全與轉介優先。本網站是教學，不是熱線，也不是診療室。",
  featuredId: "intro",
  groups: [
    { id: "foundations", title: "根基五講", titleEn: "Foundations" },
    { id: "topics", title: "核心課題十講", titleEn: "Core Issues" },
    { id: "context", title: "處境、危機與實習", titleEn: "Context & Practicum" }
  ],
  chapters: [
    {
      id: "intro",
      no: "01",
      group: "foundations",
      title: "導論：什麼是基督教輔導？",
      titleEn: "What Is Christian Counseling?",
      era: "靈魂關顧，不是另一套救法",
      blurb: "門徒訓練、智慧、聖靈的工作，對比世俗治療文化。分辨牧養談話、正式輔導、危機與轉介。",
      keywords: "輔導 靈魂關顧 門徒 智慧 聖靈 治療文化 牧養談話 轉介 界限",
      tone: "linear-gradient(135deg,#1b2436,#3d5a4c)"
    },
    {
      id: "theology",
      no: "02",
      group: "foundations",
      title: "聖經神學基礎",
      titleEn: "Biblical Theology of Soul Care",
      era: "人、基督、聖靈、教會、盼望",
      blurb: "上帝形象、墮落、罪與身體；基督與聖靈；教會與終末盼望。詩篇、箴言、羅馬書、加拉太書、雅各書。",
      keywords: "人論 上帝形象 墮落 罪 身體 基督 聖靈 教會 盼望 詩篇 箴言 羅馬書",
      tone: "linear-gradient(135deg,#1e3a4c,#3d6b4f)"
    },
    {
      id: "schools",
      no: "03",
      group: "foundations",
      title: "歷史與學派",
      titleEn: "History & Schools",
      era: "從靈魂醫治到現代心理學",
      blurb: "初期教會、清教徒、亞當斯聖經輔導、整合派、福音派牧養輔導。對照表與教授判斷。",
      keywords: "亞當斯 nouthetic 鮑力生 整合派 牧養輔導 清教徒 心理學 學派",
      tone: "linear-gradient(135deg,#3f2a1a,#8a5a2b)"
    },
    {
      id: "ethics",
      no: "04",
      group: "foundations",
      title: "輔導倫理與界限",
      titleEn: "Ethics & Boundaries",
      era: "保密、能力與轉介",
      blurb: "保密及其限度、雙重關係、性界線、紀錄、能力範圍。何時必須打破保密。",
      keywords: "倫理 保密 雙重關係 性界線 紀錄 能力 轉介 強制舉報",
      tone: "linear-gradient(135deg,#1b2436,#4a5568)"
    },
    {
      id: "process",
      no: "05",
      group: "foundations",
      title: "輔導過程",
      titleEn: "The Counseling Process",
      era: "從建立关系到結束",
      blurb: "聆聽、問題概念化（屬靈／關係／身體／處境）、目標、作業與結束。不是一套魔術程序。",
      keywords: "過程 聆聽 概念化 目標 作業 結束 關係 屬靈 身體 處境",
      tone: "linear-gradient(135deg,#14532d,#0f766e)"
    },
    {
      id: "guilt",
      no: "06",
      group: "topics",
      title: "罪咎與羞恥",
      titleEn: "Guilt & Shame",
      era: "真實的罪與受傷的臉",
      blurb: "分辨真罪咎、假罪咎與羞恥。十字架同時對付罪與遮蓋羞辱。華人面子文化的牧養提醒。",
      keywords: "罪咎 羞恥 面子 認罪 稱義 羅馬書 詩篇51",
      tone: "linear-gradient(135deg,#3f1d12,#8a5a2b)"
    },
    {
      id: "anxiety",
      no: "07",
      group: "topics",
      title: "焦慮與恐懼",
      titleEn: "Anxiety & Fear",
      era: "把憂慮交託，也承認身體",
      blurb: "詩篇與登山寶訓中的懼怕。分辨普通焦慮、恐慌與需要醫療評估的情況。信心不是假裝不怕。",
      keywords: "焦慮 恐懼 擔心 詩篇 腓立比書 恐慌 驚恐發作",
      tone: "linear-gradient(135deg,#1e3a4c,#4a7c9b)"
    },
    {
      id: "depression",
      no: "08",
      group: "topics",
      title: "抑鬱與絕望",
      titleEn: "Depression & Despair",
      era: "哀歌不是沒有信心",
      blurb: "詩篇四十二、約伯與以利亞。何時是靈魂的黑夜，何時必須轉介精神科。不可把憂鬱當信心不足來羞辱。",
      keywords: "抑鬱 憂鬱 絕望 哀歌 約伯 以利亞 轉介 精神科",
      tone: "linear-gradient(135deg,#1b2436,#3f2a1a)"
    },
    {
      id: "anger",
      no: "09",
      group: "topics",
      title: "憤怒與饒恕",
      titleEn: "Anger & Forgiveness",
      era: "義怒、罪怒與十字架的赦免",
      blurb: "弗4、太18、約瑟故事。饒恕不是否認傷害，也不是立刻恢復信任。家暴處境不可誤用「要饒恕」。",
      keywords: "憤怒 饒恕 義怒 復和 信任 家暴 以弗所書",
      tone: "linear-gradient(135deg,#4c1d12,#b45309)"
    },
    {
      id: "marriage",
      no: "10",
      group: "topics",
      title: "婚姻與衝突",
      titleEn: "Marriage & Conflict",
      era: "盟約，不是技巧課",
      blurb: "創2、弗5、彼前3。衝突中的聆聽與悔改。分辨普通爭執與虐待。輔導夫婦不是站在較大聲的一邊。",
      keywords: "婚姻 衝突 盟約 夫妻 弗5 家暴 分居",
      tone: "linear-gradient(135deg,#4c1d3a,#7c2d52)"
    },
    {
      id: "family",
      no: "11",
      group: "topics",
      title: "父母與子女／家庭系統",
      titleEn: "Parents, Children & Family",
      era: "尊榮與管教，不是偶像",
      blurb: "弗6、申6、箴言。華人家庭主義、孝道與福音。輔導時看見系統，卻不把人化約成角色。",
      keywords: "家庭 父母 子女 孝道 管教 系統 尊榮",
      tone: "linear-gradient(135deg,#14532d,#3f2a1a)"
    },
    {
      id: "grief",
      no: "12",
      group: "topics",
      title: "喪親與苦難神義",
      titleEn: "Grief & Theodicy",
      era: "陪伴哀哭，不急著解釋",
      blurb: "約伯記、詩篇、羅8。神義問題要講，卻不可在靈堂當系統神學考試。盼望不是禁哀。",
      keywords: "喪親 苦難 神義 約伯 哀傷 盼望 復活",
      tone: "linear-gradient(135deg,#1b2436,#5b4a2e)"
    },
    {
      id: "addiction",
      no: "13",
      group: "topics",
      title: "成癮",
      titleEn: "Addiction",
      era: "偶像、習慣與身體",
      blurb: "酒、賭、色情、手機與工作。罪與疾病語言都要用得準。教會挽回與專業戒癮可並行。",
      keywords: "成癮 偶像 賭博 色情 酒精 習慣 戒癮",
      tone: "linear-gradient(135deg,#3f1d12,#7c2d12)"
    },
    {
      id: "sexuality",
      no: "14",
      group: "topics",
      title: "性與單身／純潔",
      titleEn: "Sexuality & Singleness",
      era: "身體是殿，不是商品",
      blurb: "創1–2、太19、林前6–7。單身不是次等。慾望、色情、婚前界線。牧養要聖潔，也要溫柔。",
      keywords: "性 單身 純潔 色情 林前6 身體 慾望",
      tone: "linear-gradient(135deg,#3b1f2a,#7c2d12)"
    },
    {
      id: "church-harm",
      no: "15",
      group: "topics",
      title: "教會傷害與權柄誤用",
      titleEn: "Church Hurt & Misused Authority",
      era: "挽回靈魂，不是代替治理",
      blurb: "與教會紀律區分：輔導處理創傷與挽回；紀律是治理程序。兩者可並行，不可互相吞沒。",
      keywords: "教會傷害 權柄 屬靈濫用 紀律 挽回 太18",
      tone: "linear-gradient(135deg,#4c0519,#9a3412)"
    },
    {
      id: "crisis",
      no: "16",
      group: "context",
      title: "危機處理教學",
      titleEn: "Crisis: Principles & Referral",
      era: "安全第一，網頁不是熱線",
      blurb: "自殺意念、家暴、性侵犯：原則、轉介、不可做什麼。本講是教學，不是緊急服務。",
      keywords: "危機 自殺 家暴 性侵犯 轉介 報案 安全 熱線",
      tone: "linear-gradient(135deg,#4c0519,#7f1d1d)"
    },
    {
      id: "chinese",
      no: "17",
      group: "context",
      title: "華人教會處境",
      titleEn: "The Chinese Church Context",
      era: "面子、家庭與屬靈語言",
      blurb: "面子、講見證壓力、把精神病當鬼附、把憂鬱當信心不足、家庭主義。文化要懂，聖經仍作裁判。",
      keywords: "華人 面子 見證 鬼附 家庭主義 孝道 香港 堂會",
      tone: "linear-gradient(135deg,#3f2a1a,#0f766e)"
    },
    {
      id: "reading",
      no: "18",
      group: "context",
      title: "金句與閱讀",
      titleEn: "Scripture & Reading List",
      era: "先讀經，再讀書",
      blurb: "關鍵經文索引。亞當斯、鮑力生、區普、韋約翰；克拉布與過猶不及需謹慎。不捏造書目。",
      keywords: "金句 閱讀 亞當斯 鮑力生 區普 韋約翰 克拉布 書單",
      tone: "linear-gradient(135deg,#1e293b,#8a5a2b)"
    },
    {
      id: "practicum",
      no: "19",
      group: "context",
      title: "實習反思題",
      titleEn: "Practicum & Seminar Questions",
      era: "給神學生的小組討論",
      blurb: "按各講設計的教室討論題、角色扮演原則與綜合個案。練習分辨，不是表演創傷。",
      keywords: "實習 討論 神學生 小組 個案 反思",
      tone: "linear-gradient(135deg,#14532d,#1e3a4c)"
    }
  ]
};
