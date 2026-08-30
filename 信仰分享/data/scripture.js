window.FAITH_TOPICS = window.FAITH_TOPICS || {};
window.FAITH_TOPICS.scripture = {
  id: "scripture",
  title: "聖經論",
  titleEn: "Doctrine of Scripture",
  color: "indigo",
  verse: "「聖經都是神所默示的……叫屬神的人得以完全。」",
  verseRef: "提摩太後書 3:16–17",
  sections: [
    {
      id: "revelation",
      title: "啟示與默示",
      titleEn: "Revelation & Inspiration",
      blocks: [
        {
          type: "lead",
          body: "人能認識神，不是因為人夠聰明，而是因為神說話。福音派認信：新舊兩約為神所默示，絕對真確可信，是活潑的生命之道，是信仰和行為的最高準則。原著每字無誤，聖經是最高和最後權威，人不能用經驗、票數或智慧與之對衡。"
        },
        {
          type: "wordstudy",
          lang: "el",
          lemma: "θεόπνευστος",
          translit: "theopneustos",
          gloss: "神所呼出的",
          parse: "提後 3:16；θεός + πνέω。",
          research: "不是「神很啟發作者的靈感」那麼弱，而是聖經這產品是神所呼出。彼後 1:21：人被聖靈帶動（φερόμενοι）說出從神而來的話。默示是完全的（整卷）、又使用作者的文體與歷史處境。",
          explanation: "這與創 2:7 神吹氣給人形成美好對照：神的氣叫人活，也叫文字成為生命之道。讀經不是消費資訊，是領受神的呼吸。"
        },
        {
          type: "verse",
          ref: "彼得後書 1:20–21",
          lang: "el",
          original: "ὑπὸ πνεύματος ἁγίου φερόμενοι ἐλάλησαν ἀπὸ θεοῦ ἄνθρωποι",
          zh: "「因為預言從來沒有出於人意的，乃是人被聖靈感動，說出神的話來。」",
          notes: "人真實地說話，神真實地作主。不是機械默寫，也不是人的宗教天才。"
        },
        {
          type: "cards",
          cols: 3,
          items: [
            { icon: "📣", title: "一般啟示", body: "詩 19；羅 1：創造與良心，足以使人無可推諉，不足以給人福音細節。" },
            { icon: "📕", title: "特殊啟示", body: "神在歷史中說話，最終在子裡說出（來 1:1–2），並寫成聖經。" },
            { icon: "✅", title: "無誤", body: "原著在其所斷言的一切上真實。抄本有異文，但不推翻這認信。" }
          ]
        }
      ]
    },
    {
      id: "authority",
      title: "權威與釋經",
      titleEn: "Authority & Hermeneutics",
      blocks: [
        {
          type: "verse",
          ref: "提摩太後書 2:15",
          zh: "「你當竭力在神面前得蒙喜悅，作無愧的工人，按著正意分解真理的道。」",
          notes: "ὀρθοτομέω：切得正直。釋經是工人的手藝，不是靈感表演。"
        },
        {
          type: "research",
          title: "本教材的釋經約束",
          points: [
            "歷史文法：字義、文法、文體、上下文、救贖歷史。",
            "以經解經：清楚的經文解釋較難的經文。",
            "基督中心：律法與先知指向祂（路 24:27, 44）。",
            "聖靈光照：要先有敬虔、蒙光照，才能明白屬靈的話（林前 2:14）。",
            "應用不可反過來改寫意義：先「作者對原讀者說什麼」，才問「主今日要我們順服什麼」。"
          ]
        },
        {
          type: "compare",
          leftTitle: "一種理解",
          left: "<p>學術與靈命整合：釋經講道、系統神學、回應處境，但處境不能審判聖經。持守聖經無誤是使命宣言的第一句。</p>",
          rightTitle: "另一種理解",
          right: "<p>聖經可繼續改革教會；任何人提出準確的聖經根據，路線仍可改。拒絕新神學派、拒絕把經驗或民主放在經文之上。讀經要有敬虔，不是只作文學批評。</p>"
        },
        {
          type: "callout",
          tone: "warn",
          title: "兩種假權威",
          body: "自由派用歷史批評把神的話降成人的話。另一極端用私意「聖靈感動」把人的話升成神的話。福音派都不要這兩條路。"
        }
      ]
    },
    {
      id: "canon",
      title: "正典與功效",
      titleEn: "Canon & Sufficiency",
      blocks: [
        {
          type: "lead",
          body: "教會沒有創造正典，乃是承認神已經賜下的書卷。六十六卷足夠使屬神的人得以完全、預備行各樣善事——這是充足性，不是說註釋書無用，而是說沒有第二本與聖經平起平坐的權威。"
        },
        {
          type: "wordstudy",
          lang: "el",
          lemma: "ἱκανός / ἄρτιος",
          translit: "artios",
          gloss: "完備、裝備妥當",
          parse: "提後 3:17 ἄρτιος、ἐξηρτισμένος。",
          research: "聖經的功效：教訓、督責、歸正、學義。人論在此受約束：人的問題（無知、罪、扭曲、不會行義）神都用祂的話來處理。",
          explanation: "所以查經不是教會的附加活動，而是人成為「完全」的主要途徑。主日學實驗室存在的理由在這裡。"
        },
        {
          type: "verse",
          ref: "詩篇 19:7–8",
          lang: "he",
          original: "תּוֹרַת יְהוָה תְּמִימָה מְשִׁיבַת נָפֶשׁ",
          zh: "「耶和華的律法全備，能甦醒人心。」",
          notes: "תְּמִימָה：全備。נֶפֶשׁ 被神的話甦醒——聖經論直接服務人論。"
        }
      ]
    }
  ],
  lexicon: [
    { lang: "el", lemma: "θεόπνευστος", translit: "theopneustos", pos: "形容詞", gloss: "神所呼出", refs: "提後 3:16", research: "默示的經典用詞。", explanation: "聖經的源頭是神的氣。" },
    { lang: "el", lemma: "ὀρθοτομέω", translit: "orthotomeō", pos: "動詞", gloss: "按正意分解／切直", refs: "提後 2:15", research: "提後 2:15 對工人的吩咐。", explanation: "工人的手藝是把道切準，不扭曲。" },
    { lang: "he", lemma: "תּוֹרָה", translit: "torah", pos: "名詞", gloss: "訓誨、律法", refs: "詩 19:7; 詩 119", research: "不單是條例，是神的教導。", explanation: "律法顯出罪，也引導被贖的人如何活。" },
    { lang: "el", lemma: "γραφή", translit: "graphē", pos: "名詞", gloss: "經文、聖經", refs: "提後 3:16; 彼後 3:16", research: "彼得已把保羅書信與其他經書並列。", explanation: "正典意識在使徒時代已經出現。" }
  ],
  matching: [
    { prompt: "θεόπνευστος", verse: "提後 3:16", explain: "聖經是神所呼出，不是人的靈感作品。" },
    { prompt: "ὀρθοτομέω", verse: "提後 2:15", explain: "按正意分解：工人的責任。" },
    { prompt: "תְּמִימָה", verse: "詩 19:7", explain: "律法全備，能甦醒人的 נֶפֶשׁ。" }
  ],
  quiz: [
    { question: "θεόπνευστος 的意思最接近？", options: ["很有啟發性", "神所呼出／默示", "教會批准後才變成神的話"], correct: 1, feedback: "默示在先，教會承認在後。" },
    { question: "對聖經權威的認信是？", options: ["聖經與傳統同等", "聖經是最高、最後準則，經驗與票數不能對衡", "只有新約有權威"], correct: 1, feedback: "默示、無誤、最高權威：經驗與票數不能對衡。" },
    { question: "「按正意分解」首先要求？", options: ["先有強烈感覺", "歷史文法、上下文、以經解經，再求聖靈光照而順服", "先看市場需要"], correct: 1, feedback: "這是工人的手藝，不是行銷。" }
  ]
};
