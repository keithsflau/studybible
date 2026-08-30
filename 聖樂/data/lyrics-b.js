/**
 * 聖樂教室 — 聖詩全文（精選課 16–30）
 * 公開領域：完整原文 + 本課教學中譯。
 * In Christ Alone：不錄全文。
 */
(function () {
  const L = (window.SACRED_MUSIC_HYMN_LYRICS = window.SACRED_MUSIC_HYMN_LYRICS || {});
  function v(n, orig, zh, extra) {
    return Object.assign({ n: n, kind: "verse", orig: orig, zh: zh }, extra || {});
  }
  function c(orig, zh, extra) {
    return Object.assign({ kind: "chorus", orig: orig, zh: zh }, extra || {});
  }

  L["to-god-be-glory"] = {
    full: true,
    origLang: "en",
    origLabel: "英語原詞（公開領域）",
    zhLabel: "中文教學譯文",
    lead: "克羅斯比 1875 年三節加副歌。中文為本課教學譯文。",
    note: "副歌每節後重唱。榮耀的內容在各節：賜子、代贖、再見主面。",
    stanzas: [
      v(
        1,
        [
          "To God be the glory, great things He hath done;",
          "So loved He the world that He gave us His Son,",
          "Who yielded His life an atonement for sin,",
          "And opened the lifegate that all may go in."
        ],
        ["榮耀都歸於上帝，祂成就了大事；", "祂如此愛世界，甚至賜下聖子，", "聖子捨命作罪的挽回，", "並打開生命的門，叫萬人可以進去。"]
      ),
      c(
        [
          "Praise the Lord, praise the Lord,",
          "Let the earth hear His voice!",
          "Praise the Lord, praise the Lord,",
          "Let the people rejoice!",
          "O come to the Father, through Jesus the Son,",
          "And give Him the glory, great things He hath done."
        ],
        ["讚美主，讚美主，", "願全地聽見祂的聲音！", "讚美主，讚美主，", "願萬民歡喜！", "來到父面前，藉著聖子耶穌，", "把榮耀歸給祂，因祂成就了大事。"],
        { repeat: "每節後重唱" }
      ),
      v(
        2,
        [
          "O perfect redemption, the purchase of blood,",
          "To every believer the promise of God;",
          "The vilest offender who truly believes,",
          "That moment from Jesus a pardon receives."
        ],
        ["完全的救贖，是血所買的，", "是上帝給每一個信徒的應許；", "最卑污的罪人若真實相信，", "那一刻就從耶穌得著赦免。"]
      ),
      v(
        3,
        [
          "Great things He hath taught us, great things He hath done,",
          "And great our rejoicing through Jesus the Son;",
          "But purer, and higher, and greater will be",
          "Our wonder, our transport, when Jesus we see."
        ],
        ["大事祂已教導我們，大事祂已成就，", "我們因聖子耶穌大大歡喜；", "但更純潔、更高、更大的，", "將是我們看見耶穌時的驚嘆與喜樂。"]
      )
    ]
  };

  L["praise-to-the-lord"] = {
    full: true,
    origLang: "de",
    origLabel: "德語原詞（公開領域）",
    zhLabel: "中文教學譯文",
    enLabel: "英語意譯（Winkworth，公開領域）",
    lead: "尼安德 1680 年德語五節，對照凱薩琳·溫克沃思公開領域英譯。中文為本課對德語原詩的教學譯文。",
    note: "英語詩本有時只唱四節；本課錄德語五節全文。",
    stanzas: [
      v(
        1,
        [
          "Lobe den Herren, den mächtigen König der Ehren,",
          "meine geliebete Seele, das ist mein Begehren.",
          "Kommet zu Hauf, Psalter und Harfe, wacht auf,",
          "lasset den Lobgesang hören!"
        ],
        ["讚美上主，尊榮的大君王，", "我親愛的靈魂啊，這是我的心願。", "都來聚集，詩篇與豎琴啊，醒來，", "讓頌讚的歌聲被聽見！"],
        {
          en: [
            "Praise to the Lord, the Almighty, the King of creation!",
            "O my soul, praise Him, for He is thy health and salvation!",
            "All ye who hear, now to His temple draw near;",
            "Join me in glad adoration!"
          ]
        }
      ),
      v(
        2,
        [
          "Lobe den Herren, der alles so herrlich regieret,",
          "der dich auf Flügeln des Fittichs so sicher geführet,",
          "der du in Wohl auf den Quellen der Kraft",
          "ständig von neuem gerühret."
        ],
        ["讚美上主，祂如此榮耀地統治萬有，", "用翅膀穩穩帶領你，", "使你在力量的泉源上", "不斷重新得力。"],
        {
          en: [
            "Praise to the Lord, who o’er all things so wondrously reigneth,",
            "Shelters thee under His wings, yea, so gently sustaineth!",
            "Hast thou not seen how thy desires e’er have been",
            "Granted in what He ordaineth?"
          ]
        }
      ),
      v(
        3,
        [
          "Lobe den Herren, der künstlich und fein dich bereitet,",
          "der dir Gesundheit verliehen, dich freundlich geleitet.",
          "In wieviel Not hat nicht der gnädige Gott",
          "über dir Flügel gebreitet!"
        ],
        ["讚美上主，祂精巧細密地塑造你，", "賜你健康，溫和地引導你。", "在多少困苦中，這有恩惠的上帝", "不曾在你上頭展開翅膀！"],
        {
          en: [
            "Praise to the Lord, who hath fearfully, wondrously, made thee;",
            "Health hath vouchsafed, and doth graciously aid thee.",
            "What need or grief ever hath failed of relief?",
            "Wings of His mercy did shade thee."
          ]
        }
      ),
      v(
        4,
        [
          "Lobe den Herren, der deinen Stand sichtbar gesegnet,",
          "der aus dem Himmel mit Strömen der Liebe geregnet.",
          "Denke daran, was der Allmächtige kann,",
          "der dir mit Liebe begegnet."
        ],
        ["讚美上主，祂明顯賜福你的地步，", "從天上用愛的江河降雨。", "思想全能者所能行的，", "祂以慈愛與你相遇。"],
        {
          en: [
            "Praise to the Lord, who doth prosper thy work and defend thee;",
            "Surely His goodness and mercy here daily attend thee.",
            "Ponder anew what the Almighty can do,",
            "If with His love He befriend thee."
          ]
        }
      ),
      v(
        5,
        [
          "Lobe den Herren, was in mir ist, lobe den Namen.",
          "Alles, was Odem hat, lobe mit Abrahams Samen.",
          "Er ist dein Licht, Seele, vergiss es ja nicht;",
          "lob ihn in Ewigkeit. Amen."
        ],
        ["讚美上主，凡在我裡面的，都讚美這名。", "凡有氣息的，與亞伯拉罕的後裔一同讚美。", "祂是你的光，靈魂啊，千萬不要忘記；", "到永遠讚美祂。阿們。"],
        {
          en: [
            "Praise to the Lord! O let all that is in me adore Him!",
            "All that hath life and breath, come now with praises before Him.",
            "Let the Amen sound from His people again,",
            "Gladly for aye we adore Him."
          ]
        }
      )
    ]
  };

  L["come-thou-fount"] = {
    full: true,
    origLang: "en",
    origLabel: "英語原詞（公開領域）",
    zhLabel: "中文教學譯文",
    lead: "魯賓遜 1758 年四節。今日詩本常只唱三節；第 4 節仍是原作。中文為本課教學譯文。",
    note: "「以便以謝」見撒母耳記上 7:12。第 4 節較少被唱，並非後人添作。",
    stanzas: [
      v(
        1,
        [
          "Come, Thou Fount of every blessing,",
          "Tune my heart to sing Thy grace;",
          "Streams of mercy, never ceasing,",
          "Call for songs of loudest praise.",
          "Teach me some melodious sonnet,",
          "Sung by flaming tongues above.",
          "Praise the mount! I’m fixed upon it,",
          "Mount of Thy redeeming love."
        ],
        ["萬福的源頭啊，求降臨，", "調準我的心來唱祢的恩典；", "憐憫的江河永不停止，", "呼召最響亮的頌讚。", "教我一首優美的詩，", "是上面火焰之舌所唱的。", "讚美那山！我立定在其上，", "祢救贖之愛的山。"]
      ),
      v(
        2,
        [
          "Here I raise my Ebenezer;",
          "Hither by Thy help I’m come;",
          "And I hope, by Thy good pleasure,",
          "Safely to arrive at home.",
          "Jesus sought me when a stranger,",
          "Wandering from the fold of God;",
          "He, to rescue me from danger,",
          "Interposed His precious blood."
        ],
        ["在此我立起以便以謝；", "靠祢的幫助，我來到這裡；", "我也盼望，因祢的美意，", "安然到家。", "耶穌在我還是外人時尋找我，", "我正走迷離開上帝的圈；", "為救我脫離危險，", "祂隔上自己的寶血。"]
      ),
      v(
        3,
        [
          "O to grace how great a debtor",
          "Daily I’m constrained to be!",
          "Let Thy goodness, like a fetter,",
          "Bind my wandering heart to Thee.",
          "Prone to wander, Lord, I feel it,",
          "Prone to leave the God I love;",
          "Here’s my heart, O take and seal it,",
          "Seal it for Thy courts above."
        ],
        ["啊，我每日被迫承認", "自己是恩典何等大的負債人！", "願祢的恩慈像鎖鏈，", "把我流浪的心綁在祢身上。", "主啊，我覺得自己易於走迷，", "易於離開我所愛的上帝；", "這裡是我的心，求收取並印上，", "為祢上面的院子印上它。"]
      ),
      v(
        4,
        [
          "O that day when freed from sinning,",
          "I shall see Thy lovely face;",
          "Clothed then in blood-washed linen",
          "How I’ll sing Thy sovereign grace;",
          "Come, my Lord, no longer tarry,",
          "Take my ransomed soul away;",
          "Send Thine angels now to carry",
          "Me to realms of endless day."
        ],
        ["但願那日脫離犯罪，", "我必要見祢可愛的面；", "那時披上血洗的細麻，", "我要怎樣唱祢主宰的恩典；", "我的主啊，不要再遲延，", "把我被贖的靈魂帶走；", "差祢的使者現在來抬我", "到永晝的境界。"],
        { note: "原作第 4 節，今日較少唱" }
      )
    ]
  };

  L["in-christ-alone"] = {
    full: false,
    keepExcerpt: true,
    reason:
      "© 2001 Thankyou Music（Keith Getty / Stuart Townend）。詞、曲與通行中譯均在版權期內。本課不提供可複製、可投影的全文。",
    hint: "請於合法詩歌本、CCLI SongSelect，或 Getty Music 等授權平台查看官方全文。取得授權後，使用官方歌詞投影；請勿改詞後當作自己的作品。"
  };

  L["in-the-cross"] = {
    full: true,
    origLang: "en",
    origLabel: "英語原詞（公開領域）",
    zhLabel: "中文教學譯文",
    lead: "包令 1825 年四節。中文為本課教學譯文。",
    note: "有的詩本重複第 1 節作結尾；四節即原作核心全文。",
    stanzas: [
      v(
        1,
        [
          "In the cross of Christ I glory,",
          "Towering o’er the wrecks of time;",
          "All the light of sacred story",
          "Gathers round its head sublime."
        ],
        ["我在基督的十字架裡誇耀，", "它高聳在時間的廢墟之上；", "聖史一切的光", "都聚集在這崇高的頭上。"]
      ),
      v(
        2,
        [
          "When the woes of life o’ertake me,",
          "Hopes deceive, and fears annoy,",
          "Never shall the cross forsake me.",
          "Lo! it glows with peace and joy."
        ],
        ["當人生的禍患追上我，", "盼望欺騙，恐懼攪擾，", "十字架永不離棄我。", "看哪，它發著平安與喜樂的光。"]
      ),
      v(
        3,
        [
          "When the sun of bliss is beaming",
          "Light and love upon my way,",
          "From the cross the radiance streaming",
          "Adds more luster to the day."
        ],
        ["當福樂的日頭", "把光與愛照在我路上，", "從十字架流出的光輝", "使白晝更加明亮。"]
      ),
      v(
        4,
        [
          "Bane and blessing, pain and pleasure,",
          "By the cross are sanctified;",
          "Peace is there that knows no measure,",
          "Joys that through all time abide."
        ],
        ["禍與福，苦與樂，", "都因十字架成為聖；", "那裡有無法測量的平安，", "有貫穿一切時間的喜樂。"]
      )
    ]
  };

  L["deep-deep-love"] = {
    full: true,
    origLang: "en",
    origLabel: "英語原詞（公開領域）",
    zhLabel: "中文教學譯文",
    lead: "弗朗西斯約 1875 年三節。中文為本課教學譯文。",
    note: "三節即傳統全文。海洋意象要唱出主權的愛，不是情歌。",
    stanzas: [
      v(
        1,
        [
          "O the deep, deep love of Jesus,",
          "Vast, unmeasured, boundless, free!",
          "Rolling as a mighty ocean",
          "In its fullness over me!",
          "Underneath me, all around me,",
          "Is the current of Thy love;",
          "Leading onward, leading homeward,",
          "To Thy glorious rest above!"
        ],
        ["啊，耶穌何等深、何等深的愛，", "廣大、無法測量、無限、自由！", "如大洋翻騰，", "以其豐滿漫過我！", "在我下面，環繞我的，", "是祢愛的潮流；", "領我向前，領我回家，", "到祢上面榮耀的安息！"]
      ),
      v(
        2,
        [
          "O the deep, deep love of Jesus,",
          "Spread His praise from shore to shore!",
          "How He loveth, ever loveth,",
          "Changeth never, nevermore!",
          "How He watches o’er His loved ones,",
          "Died to call them all His own;",
          "How for them He intercedeth,",
          "Watcheth o’er them from the throne!"
        ],
        ["啊，耶穌何等深、何等深的愛，", "願頌讚從岸傳到岸！", "祂怎樣愛，永遠愛，", "永不、永不再改變！", "祂怎樣看顧祂所愛的人，", "死了，為要稱他們全屬自己；", "祂怎樣為他們代求，", "從寶座上看顧他們！"]
      ),
      v(
        3,
        [
          "O the deep, deep love of Jesus,",
          "Love of every love the best!",
          "’Tis an ocean vast of blessing,",
          "’Tis a haven giving rest!",
          "O the deep, deep love of Jesus,",
          "’Tis a heaven of heavens to me;",
          "And it lifts me up to glory,",
          "For it lifts me up to Thee!"
        ],
        ["啊，耶穌何等深、何等深的愛，", "在一切愛中至美！", "是廣大福氣的海洋，", "是賜安息的港灣！", "啊，耶穌何等深、何等深的愛，", "對我是天上的天；", "它把我舉到榮耀，", "因它把我舉到祢那裡！"]
      )
    ]
  };

  L["joy-to-the-world"] = {
    full: true,
    origLang: "en",
    origLabel: "英語原詞（公開領域）",
    zhLabel: "中文教學譯文",
    lead: "瓦茨 1719 年據詩篇 98 的意譯四節。中文為本課教學譯文。這不是馬槽敘事，是全地向已來之王歡呼。",
    note: "四節即原作全文。第 3 節（罪與荊棘）不宜刪。",
    stanzas: [
      v(
        1,
        [
          "Joy to the world, the Lord is come!",
          "Let earth receive her King;",
          "Let every heart prepare Him room,",
          "And heaven and nature sing."
        ],
        ["普世歡騰，主已降臨！", "願大地迎接她的君王；", "願每一顆心為祂預備地方，", "天與自然一同歌唱。"]
      ),
      v(
        2,
        [
          "Joy to the earth, the Savior reigns!",
          "Let men their songs employ;",
          "While fields and floods, rocks, hills, and plains",
          "Repeat the sounding joy."
        ],
        ["大地歡騰，救主作王！", "願人運用他們的詩歌；", "田野與江河、磐石、山岡與平原", "都回應這響亮的喜樂。"]
      ),
      v(
        3,
        [
          "No more let sins and sorrows grow,",
          "Nor thorns infest the ground;",
          "He comes to make His blessings flow",
          "Far as the curse is found."
        ],
        ["不再讓罪與憂愁生長，", "也不讓荊棘侵擾土地；", "祂來，要使福氣流到", "咒詛所及的一切地方。"]
      ),
      v(
        4,
        [
          "He rules the world with truth and grace,",
          "And makes the nations prove",
          "The glories of His righteousness,",
          "And wonders of His love."
        ],
        ["祂以真理與恩典統治世界，", "使列國證實", "祂公義的榮耀，", "並祂慈愛的奇事。"]
      )
    ]
  };

  L["christ-risen"] = {
    full: true,
    origLang: "en",
    origLabel: "英語原詞（公開領域）",
    zhLabel: "中文教學譯文",
    lead: "衛斯理 1739 年復活節詩。下列六節是會眾最常齊唱、且皆屬原作傳統的文本（阿利路亞為配合 EASTER HYMN 而嵌入）。中文為本課教學譯文。",
    note: "衛斯理初稿詩節更多、原本無每行「Alleluia」。此六節是英語教會最完整的常用唱本，不是後人新寫。",
    stanzas: [
      v(
        1,
        [
          "Christ the Lord is risen today, Alleluia!",
          "Sons of men and angels say, Alleluia!",
          "Raise your joys and triumphs high, Alleluia!",
          "Sing, ye heavens, and earth reply, Alleluia!"
        ],
        ["基督已經復活，阿利路亞！", "世人與天使都當說，阿利路亞！", "把喜樂與凱旋高舉，阿利路亞！", "諸天歌唱，大地回應，阿利路亞！"]
      ),
      v(
        2,
        [
          "Lives again our glorious King, Alleluia!",
          "Where, O death, is now thy sting? Alleluia!",
          "Once He died our souls to save, Alleluia!",
          "Where thy victory, O grave? Alleluia!"
        ],
        ["我們榮耀的王又活了，阿利路亞！", "死亡啊，你的毒鉤在哪裡？阿利路亞！", "祂曾死，為要救我們的靈魂，阿利路亞！", "墳墓啊，你的勝利在哪裡？阿利路亞！"]
      ),
      v(
        3,
        [
          "Love’s redeeming work is done, Alleluia!",
          "Fought the fight, the battle won, Alleluia!",
          "Death in vain forbids Him rise, Alleluia!",
          "Christ has opened paradise, Alleluia!"
        ],
        ["愛的救贖之功已成，阿利路亞！", "仗已打過，勝仗已得，阿利路亞！", "死亡徒然禁止祂起來，阿利路亞！", "基督已打開樂園，阿利路亞！"]
      ),
      v(
        4,
        [
          "Soar we now where Christ has led, Alleluia!",
          "Following our exalted Head, Alleluia!",
          "Made like Him, like Him we rise, Alleluia!",
          "Ours the cross, the grave, the skies, Alleluia!"
        ],
        ["我們如今飛向基督所領之地，阿利路亞！", "跟隨我們被高舉的頭，阿利路亞！", "被造成像祂，像祂我們起來，阿利路亞！", "十字架、墳墓、諸天都是我們的，阿利路亞！"]
      ),
      v(
        5,
        [
          "Hail the Lord of earth and heaven, Alleluia!",
          "Praise to Thee by both be given, Alleluia!",
          "Thee we greet triumphant now, Alleluia!",
          "Hail the Resurrection, thou, Alleluia!"
        ],
        ["歡呼天地的主，阿利路亞！", "願二者都把讚美歸祢，阿利路亞！", "我們如今以得勝迎接祢，阿利路亞！", "歡呼祢這復活，阿利路亞！"]
      ),
      v(
        6,
        [
          "King of glory, Soul of bliss, Alleluia!",
          "Everlasting life is this, Alleluia!",
          "Thee to know, Thy power to prove, Alleluia!",
          "Thus to sing, and thus to love, Alleluia!"
        ],
        ["榮耀的王，福樂的靈魂，阿利路亞！", "永遠的生命就是這個，阿利路亞！", "認識祢，證實祢的大能，阿利路亞！", "如此歌唱，如此愛，阿利路亞！"]
      )
    ]
  };

  L["o-sacred-head"] = {
    full: true,
    origLang: "de",
    origLabel: "德語（Gerhardt，公開領域）",
    zhLabel: "中文教學譯文",
    enLabel: "英語意譯（J. W. Alexander，公開領域）",
    lead: "格哈特 1656 年德語（據中世紀《Salve caput cruentatum》傳統）。下列四節是受難週最常唱的核心，對照亞歷山大公開領域英譯。中文為本課教學譯文。",
    note: "格哈特德譯共十節；本課錄會眾最完整常用的四節，不添後人新詞。",
    stanzas: [
      v(
        1,
        [
          "O Haupt voll Blut und Wunden,",
          "voll Schmerz und voller Hohn,",
          "o Haupt, zum Spott gebunden",
          "mit einer Dornenkron,",
          "o Haupt, sonst schön gezieret",
          "mit höchster Ehr und Zier,",
          "jetzt aber hoch schimpfieret:",
          "gegrüßet seist du mir!"
        ],
        ["啊，滿了血與傷的頭，", "滿了疼痛與譏誚，", "啊，被綁去受辱的頭，", "戴著荊棘冠冕，", "啊，從前以至高尊榮妝飾的頭，", "如今卻深受侮辱：", "願我向祢問安！"],
        {
          en: [
            "O sacred Head, now wounded,",
            "With grief and shame weighed down,",
            "Now scornfully surrounded",
            "With thorns, Thine only crown.",
            "O sacred Head, what glory,",
            "What bliss till now was Thine!",
            "Yet, though despised and gory,",
            "I joy to call Thee mine."
          ]
        }
      ),
      v(
        2,
        [
          "Nun, was du, Herr, erduldet,",
          "ist alles meine Last;",
          "ich hab es selbst verschuldet,",
          "was du getragen hast.",
          "Schau her, hier steh ich Armer,",
          "der Zorn verdienet hat;",
          "gib mir, o mein Erbarmer,",
          "den Anblick deiner Gnad!"
        ],
        ["主啊，祢所忍受的，", "全是我的重擔；", "是我自己負的債，", "是祢所背負的。", "看哪，我這窮人站在這裡，", "本該承受忿怒；", "我的憐憫者啊，求賜我", "看見祢的恩典！"],
        {
          en: [
            "What Thou, my Lord, hast suffered",
            "Was all for sinners’ gain;",
            "Mine, mine was the transgression,",
            "But Thine the deadly pain.",
            "Lo, here I fall, my Savior!",
            "’Tis I deserve Thy place;",
            "Look on me with Thy favor,",
            "Vouchsafe to me Thy grace."
          ]
        }
      ),
      v(
        3,
        [
          "Ich danke dir von Herzen,",
          "o Jesu, liebster Freund,",
          "für deines Todes Schmerzen,",
          "da du’s so gut gemeint.",
          "Ach gib, daß ich mich halte",
          "zu dir und deiner Treu",
          "und, wenn ich nun erkalte,",
          "in dir mein Ende sei."
        ],
        ["我從心裡感謝祢，", "耶穌，最親愛的朋友，", "為祢死亡的疼痛，", "因祢的心意是良善。", "啊，求使我持守", "於祢和祢的信實，", "當我冷淡將盡，", "願我的結局在祢裡面。"],
        {
          en: [
            "What language shall I borrow",
            "To thank Thee, dearest Friend,",
            "For this Thy dying sorrow,",
            "Thy pity without end?",
            "O make me Thine forever!",
            "And should I fainting be,",
            "Lord, let me never, never",
            "Outlive my love to Thee."
          ]
        }
      ),
      v(
        4,
        [
          "Erscheine mir zum Schilde,",
          "zum Trost in meinem Tod,",
          "und lass mich sehn dein Bilde",
          "in deiner Kreuzesnot.",
          "Da will ich nach dir blicken,",
          "da will ich glaubensvoll",
          "dich fest an mein Herz drücken.",
          "Wer so stirbt, der stirbt wohl."
        ],
        ["求向我顯現作盾牌，", "在我死時作安慰，", "讓我看見祢的形像", "在祢十架的困苦中。", "我要在那裡仰望祢，", "滿有信心", "把祢緊貼我心。", "如此死的，死得其所。"],
        {
          en: [
            "Be near when I am dying,",
            "O show Thy cross to me!",
            "And, for my succor flying,",
            "Come, Lord, to set me free.",
            "These eyes, new faith receiving,",
            "From Thee shall never move;",
            "For he who dies believing",
            "Dies safely in Thy love."
          ]
        }
      )
    ]
  };

  L["abide-with-me"] = {
    full: true,
    origLang: "en",
    origLabel: "英語原詞（公開領域）",
    zhLabel: "中文教學譯文",
    lead: "萊特 1847 年原作八節。今日詩本常唱五節；本課按原作錄全。中文為本課教學譯文。",
    note: "常用唱本多為 1、2、6、7、8 節。其餘三節仍是萊特原作，不是後人添詞。",
    stanzas: [
      v(
        1,
        [
          "Abide with me: fast falls the eventide;",
          "The darkness deepens; Lord, with me abide.",
          "When other helpers fail, and comforts flee,",
          "Help of the helpless, O abide with me."
        ],
        ["與我同住：黃昏正急急落下；", "黑暗加深；主啊，與我同住。", "當別的幫助者失敗，安慰逃去，", "無助者的幫助啊，求與我同住。"]
      ),
      v(
        2,
        [
          "Swift to its close ebbs out life’s little day;",
          "Earth’s joys grow dim, its glories pass away;",
          "Change and decay in all around I see;",
          "O Thou who changest not, abide with me."
        ],
        ["生命短短的白晝迅速退潮到盡頭；", "地上的喜樂變暗，榮耀消逝；", "我看見周圍盡是改變與衰殘；", "不改變的主啊，求與我同住。"]
      ),
      v(
        3,
        [
          "Not a brief glance I beg, a passing word,",
          "But as Thou dwell’st with Thy disciples, Lord,",
          "Familiar, condescending, patient, free.",
          "Come not to sojourn, but abide with me."
        ],
        ["我所求的不是短暫一瞥、一句過路的話，", "乃是像祢與門徒同住那樣，主啊，", "親切、俯就、忍耐、自由。", "不要只來寄居，乃要與我同住。"],
        { note: "原作第 3 節，部分詩本從缺" }
      ),
      v(
        4,
        [
          "Come not in terrors, as the King of kings,",
          "But kind and good, with healing in Thy wings;",
          "Tears for all woes, a heart for every plea.",
          "Come, Friend of sinners, thus abide with me."
        ],
        ["不要帶著恐怖而來，如萬王之王，", "只要仁慈良善，翅膀有醫治；", "為一切禍患流淚，為每一懇求存心。", "罪人之友啊，求這樣與我同住。"],
        { note: "原作第 4 節，部分詩本從缺" }
      ),
      v(
        5,
        [
          "Thou on my head in early youth didst smile,",
          "And, though rebellious and perverse meanwhile,",
          "Thou hast not left me, oft as I left Thee.",
          "On to the close, O Lord, abide with me."
        ],
        ["我幼年時，祢曾向我的頭微笑，", "雖然其間我悖逆乖僻，", "祢沒有離開我，儘管我常常離開祢。", "直到盡頭，主啊，求與我同住。"],
        { note: "原作第 5 節，部分詩本從缺" }
      ),
      v(
        6,
        [
          "I need Thy presence every passing hour.",
          "What but Thy grace can foil the tempter’s power?",
          "Who, like Thyself, my guide and stay can be?",
          "Through cloud and sunshine, Lord, abide with me."
        ],
        ["我需要祢的同在，在每一流逝的時刻。", "除祢的恩典，誰能挫敗試探者的權勢？", "誰能像祢作我的引導與倚靠？", "經過雲與日，主啊，求與我同住。"]
      ),
      v(
        7,
        [
          "I fear no foe, with Thee at hand to bless;",
          "Ills have no weight, and tears no bitterness.",
          "Where is death’s sting? Where, grave, thy victory?",
          "I triumph still, if Thou abide with me."
        ],
        ["有祢在旁賜福，我不怕仇敵；", "災禍沒有重量，眼淚沒有苦毒。", "死亡的毒鉤在哪裡？墳墓啊，你的勝利在哪裡？", "若祢與我同住，我仍得勝。"]
      ),
      v(
        8,
        [
          "Hold Thou Thy cross before my closing eyes;",
          "Shine through the gloom and point me to the skies.",
          "Heaven’s morning breaks, and earth’s vain shadows flee;",
          "In life, in death, O Lord, abide with me."
        ],
        ["求把祢的十字架舉在我將閉的眼前；", "照進幽暗，指我向諸天。", "天上的早晨破曉，地上虛空的影逃去；", "在生、在死，主啊，求與我同住。"]
      )
    ]
  };

  L["blessed-assurance"] = {
    full: true,
    origLang: "en",
    origLabel: "英語原詞（公開領域）",
    zhLabel: "中文教學譯文",
    lead: "克羅斯比 1873 年三節加副歌。中文為本課教學譯文。",
    note: "副歌每節後重唱。確據的根據是血與義，不是感覺。",
    stanzas: [
      v(
        1,
        [
          "Blessed assurance, Jesus is mine!",
          "O what a foretaste of glory divine!",
          "Heir of salvation, purchase of God,",
          "Born of His Spirit, washed in His blood."
        ],
        ["有福的確據，耶穌是我的！", "何等神聖榮耀的預嘗！", "救恩的後嗣，上帝所買的，", "由祂的靈所生，在祂的血裡洗淨。"]
      ),
      c(
        [
          "This is my story, this is my song,",
          "Praising my Savior all the day long;",
          "This is my story, this is my song,",
          "Praising my Savior all the day long."
        ],
        ["這是我的故事，這是我的歌曲，", "終日讚美我的救主；", "這是我的故事，這是我的歌曲，", "終日讚美我的救主。"],
        { repeat: "每節後重唱" }
      ),
      v(
        2,
        [
          "Perfect submission, perfect delight,",
          "Visions of rapture now burst on my sight;",
          "Angels descending bring from above",
          "Echoes of mercy, whispers of love."
        ],
        ["完全的順服，完全的喜樂，", "狂喜的異象如今向我眼前迸發；", "天使降下，從上面帶來", "憐憫的回聲，慈愛的低語。"]
      ),
      v(
        3,
        [
          "Perfect submission, all is at rest,",
          "I in my Savior am happy and blest,",
          "Watching and waiting, looking above,",
          "Filled with His goodness, lost in His love."
        ],
        ["完全的順服，一切都安息，", "我在救主裡快樂蒙福，", "守望等候，仰望上面，", "被祂的恩慈充滿，沉浸在祂的愛裡。"]
      )
    ]
  };

  L["how-firm-foundation"] = {
    full: true,
    origLang: "en",
    origLabel: "英語原詞（公開領域）",
    zhLabel: "中文教學譯文",
    lead: "里彭 1787 年詩集傳統七節（作者署「K」）。中文為本課教學譯文。除第 1 節外，其餘幾乎是神的第一人稱應許。",
    note: "常用唱本多為 1、3、4、5、7 節。第 2、6 節仍屬傳統全文。",
    stanzas: [
      v(
        1,
        [
          "How firm a foundation, ye saints of the Lord,",
          "Is laid for your faith in His excellent Word!",
          "What more can He say than to you He hath said,",
          "You who unto Jesus for refuge have fled?"
        ],
        ["主的聖徒啊，何等堅固的根基", "已為你們的信心立在祂佳美的話語上！", "除了祂已經對你們說的，祂還能說什麼？", "你們這些逃到耶穌裡避難的人。"]
      ),
      v(
        2,
        [
          "In every condition, in sickness, in health,",
          "In poverty’s vale, or abounding in wealth;",
          "At home and abroad, on the land, on the sea,",
          "As thy days may demand, shall thy strength ever be."
        ],
        ["在每一種光景：疾病或健康，", "在貧窮的谷，或豐裕之中；", "在家或在外，在陸或在海，", "按你日子的需要，你的力量必常在。"],
        { note: "傳統第 2 節，部分詩本從缺" }
      ),
      v(
        3,
        [
          "“Fear not, I am with thee, O be not dismayed,",
          "For I am thy God, and will still give thee aid;",
          "I’ll strengthen thee, help thee, and cause thee to stand,",
          "Upheld by My righteous, omnipotent hand.”"
        ],
        ["「不要懼怕，我與你同在，不要驚惶，", "因我是你的上帝，仍要幫助你；", "我要堅固你，幫助你，使你站立，", "被我公義、全能的手托住。」"]
      ),
      v(
        4,
        [
          "“When through the deep waters I call thee to go,",
          "The rivers of woe shall not thee overflow;",
          "For I will be with thee, thy troubles to bless,",
          "And sanctify to thee thy deepest distress.”"
        ],
        ["「當我召你經過深水，", "憂傷的江河必不漫過你；", "因我必與你同在，賜福你的患難，", "並使你最深的苦痛成為聖。」"]
      ),
      v(
        5,
        [
          "“When through fiery trials thy pathway shall lie,",
          "My grace, all sufficient, shall be thy supply;",
          "The flame shall not hurt thee; I only design",
          "Thy dross to consume, and thy gold to refine.”"
        ],
        ["「當你的路經過火煉的試煉，", "我全備的恩典必作你的供給；", "火焰必不傷害你；我只定意", "燒掉你的渣滓，熬煉你的金子。」"]
      ),
      v(
        6,
        [
          "“Even down to old age all My people shall prove",
          "My sovereign, eternal, unchangeable love;",
          "And when hoary hairs shall their temples adorn,",
          "Like lambs they shall still in My bosom be borne.”"
        ],
        ["「直到年老，我一切子民都要證實", "我主宰的、永遠的、不改變的愛；", "當白髮裝飾他們的鬢角，", "他們仍要像羊羔被抱在我懷中。」"],
        { note: "傳統第 6 節，部分詩本從缺" }
      ),
      v(
        7,
        [
          "“The soul that on Jesus hath leaned for repose",
          "I will not, I will not desert to his foes;",
          "That soul, though all hell should endeavor to shake,",
          "I’ll never, no, never, no, never forsake.”"
        ],
        ["「那靠耶穌得安息的靈魂，", "我決不、決不撇下他給仇敵；", "那靈魂，縱使陰間盡力動搖，", "我也永不、永不、永不丟棄。」"]
      )
    ]
  };

  L["old-rugged-cross"] = {
    full: true,
    origLang: "en",
    origLabel: "英語原詞（1913，美國公開領域）",
    zhLabel: "中文教學譯文",
    lead: "貝納德 1913 年四節加副歌，在美國已屬公開領域。中文為本課教學譯文，不是現代版權詩本《古舊十字架》的逐字。特定錄音與後期編曲仍可能另有版權。",
    note: "珍貴的不是木頭，是那掛在上面的主。副歌每節後重唱。",
    stanzas: [
      v(
        1,
        [
          "On a hill far away stood an old rugged cross,",
          "The emblem of suffering and shame;",
          "And I love that old cross where the dearest and best",
          "For a world of lost sinners was slain."
        ],
        ["在遠方的山上立著古舊粗糙的十字架，", "是受苦與羞辱的記號；", "我愛那古舊十字架，至親愛、至美好的一位", "曾在那裡為失喪的世人被殺。"]
      ),
      c(
        [
          "So I’ll cherish the old rugged cross,",
          "Till my trophies at last I lay down;",
          "I will cling to the old rugged cross,",
          "And exchange it some day for a crown."
        ],
        ["因此我要珍重古舊十字架，", "直到最後放下我的戰利品；", "我要抓住古舊十字架，", "有一天用它換一頂冠冕。"],
        { repeat: "每節後重唱" }
      ),
      v(
        2,
        [
          "O that old rugged cross, so despised by the world,",
          "Has a wondrous attraction for me;",
          "For the dear Lamb of God left His glory above",
          "To bear it to dark Calvary."
        ],
        ["啊，那被世界藐視的古舊十字架，", "對我有奇妙的吸引；", "因親愛的上帝羔羊離開上面的榮耀，", "把它背到黑暗的各各他。"]
      ),
      v(
        3,
        [
          "In that old rugged cross, stained with blood so divine,",
          "A wondrous beauty I see,",
          "For ’twas on that old cross Jesus suffered and died,",
          "To pardon and sanctify me."
        ],
        ["在那被神聖之血所染的古舊十字架上，", "我看見奇妙的榮美，", "因耶穌在那古舊十字架上受苦而死，", "為要赦免我、使我成聖。"]
      ),
      v(
        4,
        [
          "To the old rugged cross I will ever be true;",
          "Its shame and reproach gladly bear;",
          "Then He’ll call me some day to my home far away,",
          "Where His glory forever I’ll share."
        ],
        ["我要永遠忠於古舊十字架；", "甘心背負它的羞辱與非難；", "然後有一天祂要召我到遠方的家，", "在那裡我要永遠分享祂的榮耀。"]
      )
    ]
  };

  L["all-creatures"] = {
    full: true,
    origLang: "en",
    origLabel: "英語韻文（Draper，公開領域）",
    zhLabel: "中文教學譯文",
    lead: "Draper 1919 年英語韻文（據方濟《太陽歌》），在美國已屬公開領域。中文為本課教學譯文。敬拜的對象是三一上帝，不是受造物本身。",
    note: "下列七節是會眾常用的完整 Draper 文本。阿利路亞按曲調 LASST UNS ERFREUEN 嵌入。",
    stanzas: [
      v(
        1,
        [
          "All creatures of our God and King,",
          "Lift up your voice and with us sing",
          "Alleluia! Alleluia!",
          "Thou burning sun with golden beam,",
          "Thou silver moon with softer gleam!",
          "O praise Him! O praise Him!",
          "Alleluia! Alleluia! Alleluia!"
        ],
        ["我們上帝與君王的一切受造，", "揚起聲音，與我們同唱", "阿利路亞！阿利路亞！", "燃燒的日頭啊，帶著金光，", "銀色的月亮啊，帶著柔輝！", "讚美祂！讚美祂！", "阿利路亞！阿利路亞！阿利路亞！"]
      ),
      v(
        2,
        [
          "Thou rushing wind that art so strong,",
          "Ye clouds that sail in heaven along,",
          "O praise Him! Alleluia!",
          "Thou rising morn, in praise rejoice,",
          "Ye lights of evening, find a voice!",
          "O praise Him! O praise Him!",
          "Alleluia! Alleluia! Alleluia!"
        ],
        ["如此剛強的疾風啊，", "在天上航行的雲啊，", "讚美祂！阿利路亞！", "上升的早晨啊，在讚美中歡喜，", "黃昏的光啊，尋找聲音！", "讚美祂！讚美祂！", "阿利路亞！阿利路亞！阿利路亞！"]
      ),
      v(
        3,
        [
          "Thou flowing water, pure and clear,",
          "Make music for thy Lord to hear,",
          "O praise Him! Alleluia!",
          "Thou fire so masterful and bright,",
          "That givest man both warmth and light!",
          "O praise Him! O praise Him!",
          "Alleluia! Alleluia! Alleluia!"
        ],
        ["流動的水啊，純潔清澈，", "為你的主奏樂，讓祂聽見，", "讚美祂！阿利路亞！", "如此有力明亮的火啊，", "你給人溫暖與光！", "讚美祂！讚美祂！", "阿利路亞！阿利路亞！阿利路亞！"]
      ),
      v(
        4,
        [
          "Dear mother earth, who day by day",
          "Unfoldest blessings on our way,",
          "O praise Him! Alleluia!",
          "The flowers and fruits that in thee grow,",
          "Let them His glory also show!",
          "O praise Him! O praise Him!",
          "Alleluia! Alleluia! Alleluia!"
        ],
        ["親愛的大地啊，你日復一日", "在我們路上展開福氣，", "讚美祂！阿利路亞！", "在你裡面生長的花與果，", "也讓它們顯明祂的榮耀！", "讚美祂！讚美祂！", "阿利路亞！阿利路亞！阿利路亞！"]
      ),
      v(
        5,
        [
          "And all ye men of tender heart,",
          "Forgiving others, take your part,",
          "O praise Him! Alleluia!",
          "Ye who long pain and sorrow bear,",
          "Praise God and on Him cast your care!",
          "O praise Him! O praise Him!",
          "Alleluia! Alleluia! Alleluia!"
        ],
        ["凡心腸柔和的人啊，", "饒恕別人，加入你們的分，", "讚美祂！阿利路亞！", "長久背負痛苦與憂傷的人啊，", "讚美上帝，把憂慮卸給祂！", "讚美祂！讚美祂！", "阿利路亞！阿利路亞！阿利路亞！"]
      ),
      v(
        6,
        [
          "And thou most kind and gentle death,",
          "Waiting to hush our latest breath,",
          "O praise Him! Alleluia!",
          "Thou leadest home the child of God,",
          "And Christ our Lord the way hath trod.",
          "O praise Him! O praise Him!",
          "Alleluia! Alleluia! Alleluia!"
        ],
        ["還有你，最仁慈溫和的死亡啊，", "等候使我們最後的氣息平靜，", "讚美祂！阿利路亞！", "你領上帝的孩子回家，", "我們的主基督已走過這路。", "讚美祂！讚美祂！", "阿利路亞！阿利路亞！阿利路亞！"]
      ),
      v(
        7,
        [
          "Let all things their Creator bless,",
          "And worship Him in humbleness,",
          "O praise Him! Alleluia!",
          "Praise, praise the Father, praise the Son,",
          "And praise the Spirit, Three in One!",
          "O praise Him! O praise Him!",
          "Alleluia! Alleluia! Alleluia!"
        ],
        ["願萬有都稱頌他們的創造主，", "謙卑敬拜祂，", "讚美祂！阿利路亞！", "讚美父，讚美子，", "讚美聖靈，三位一體！", "讚美祂！讚美祂！", "阿利路亞！阿利路亞！阿利路亞！"]
      )
    ]
  };

  L["guide-me"] = {
    full: true,
    origLang: "en",
    origLabel: "英語傳統詞（公開領域）",
    zhLabel: "中文教學譯文",
    lead: "威廉斯 1745 年威爾斯原詩的通行英語三節（公開領域）。中文為本課教學譯文。有的詩本另有較少唱的第 4 節，本課不臆造補入。",
    note: "威爾斯原題《Arglwydd, arwain trwy’r anialwch》。英語三節即會眾最完整的常用全文。CWM RHONDDA（1905）是曲調，不改變詞的公開領域地位。",
    stanzas: [
      v(
        1,
        [
          "Guide me, O Thou great Jehovah,",
          "Pilgrim through this barren land;",
          "I am weak, but Thou art mighty;",
          "Hold me with Thy powerful hand.",
          "Bread of heaven, Bread of heaven,",
          "Feed me till I want no more;",
          "Feed me till I want no more."
        ],
        ["大君王耶和華啊，求引導我，", "我是走過這貧瘠之地的旅客；", "我軟弱，祢卻有大能；", "用祢大能的手扶持我。", "天上的糧，天上的糧，", "餵養我，直到我不再缺乏；", "餵養我，直到我不再缺乏。"]
      ),
      v(
        2,
        [
          "Open now the crystal fountain,",
          "Whence the healing stream doth flow;",
          "Let the fire and cloudy pillar",
          "Lead me all my journey through.",
          "Strong Deliverer, strong Deliverer,",
          "Be Thou still my Strength and Shield;",
          "Be Thou still my Strength and Shield."
        ],
        ["求現在打開水晶的泉源，", "醫治的水流從那裡湧出；", "願火柱與雲柱", "引導我走完全程。", "大能的拯救者，大能的拯救者，", "求仍作我的力量與盾牌；", "求仍作我的力量與盾牌。"]
      ),
      v(
        3,
        [
          "When I tread the verge of Jordan,",
          "Bid my anxious fears subside;",
          "Death of death, and hell’s Destruction,",
          "Land me safe on Canaan’s side.",
          "Songs of praises, songs of praises,",
          "I will ever give to Thee;",
          "I will ever give to Thee."
        ],
        ["當我踏到約旦的邊上，", "求吩咐我焦慮的恐懼平息；", "死亡的死，陰間的毀滅者啊，", "把我平安送到迦南那邊。", "頌讚的歌，頌讚的歌，", "我要永遠歸給祢；", "我要永遠歸給祢。"]
      )
    ]
  };
})();
