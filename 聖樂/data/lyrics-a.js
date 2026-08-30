/**
 * 聖樂教室 — 聖詩全文（精選課 1–15）
 * 公開領域：完整原文 + 本課教學中譯。
 * 仍受版權者：不錄可投影全文；How Great Thou Art 只錄瑞典原詩（PD）。
 */
(function () {
  const L = (window.SACRED_MUSIC_HYMN_LYRICS = window.SACRED_MUSIC_HYMN_LYRICS || {});
  function v(n, orig, zh, extra) {
    return Object.assign({ n: n, kind: "verse", orig: orig, zh: zh }, extra || {});
  }
  function c(orig, zh, extra) {
    return Object.assign({ kind: "chorus", orig: orig, zh: zh }, extra || {});
  }

  L["amazing-grace"] = {
    full: true,
    origLang: "en",
    origLabel: "英語原詞（公開領域）",
    zhLabel: "中文教學譯文",
    lead: "牛頓 1779 年《奧尼聖詩》原作六節。中文為本課教學譯文（第一節沿用華人教會長年習用的開頭）。後世常加的「到了天家，已過千年」並非牛頓原作，故不錄。",
    note: "原題 Faith’s Review and Expectation。拼寫已略現代化（saved / Through 等），詞句仍是牛頓六節。請勿把後世版權編曲當作自由使用。",
    stanzas: [
      v(
        1,
        [
          "Amazing grace! how sweet the sound",
          "That saved a wretch like me!",
          "I once was lost, but now am found;",
          "Was blind, but now I see."
        ],
        ["奇異恩典，何等甘甜，", "救了像我這等人！", "前我失喪，今被尋回，", "瞎眼今得看見。"]
      ),
      v(
        2,
        [
          "'Twas grace that taught my heart to fear,",
          "And grace my fears relieved;",
          "How precious did that grace appear",
          "The hour I first believed!"
        ],
        ["這恩典教我心生敬畏，", "又寬解我的恐懼；", "當我初次相信那一刻，", "這恩典何等寶貴！"]
      ),
      v(
        3,
        [
          "Through many dangers, toils and snares,",
          "I have already come;",
          "'Tis grace hath brought me safe thus far,",
          "And grace will lead me home."
        ],
        ["經過許多危險、勞苦、網羅，", "我已經走了過來；", "是恩典領我安然至此，", "也必領我回家。"]
      ),
      v(
        4,
        [
          "The Lord has promised good to me,",
          "His word my hope secures;",
          "He will my shield and portion be,",
          "As long as life endures."
        ],
        ["主已應許恩待於我，", "祂的話語穩固我的盼望；", "祂必作我盾牌與產業，", "直到生命終了。"]
      ),
      v(
        5,
        [
          "Yes, when this flesh and heart shall fail,",
          "And mortal life shall cease;",
          "I shall possess, within the veil,",
          "A life of joy and peace."
        ],
        ["是的，等到這肉身與心跳都衰竭，", "必死的生命止息；", "我必在幔內得著產業：", "喜樂與平安的生命。"]
      ),
      v(
        6,
        [
          "The earth shall soon dissolve like snow,",
          "The sun forbear to shine;",
          "But God, who called me here below,",
          "Will be forever mine."
        ],
        ["地將如雪消融，", "日頭不再發光；", "但召我在世上的上帝，", "必永遠屬我。"]
      )
    ]
  };

  L["mighty-fortress"] = {
    full: true,
    origLang: "de",
    origLabel: "德語原詞（公開領域）",
    zhLabel: "中文教學譯文",
    enLabel: "英語意譯（F. H. Hedge，公開領域）",
    lead: "路德約 1529 年《Ein feste Burg ist unser Gott》四節德語原文，對照 Hedge 1853 年英語意譯。中文為本課教學譯文，不轉錄現代版權詩本。",
    note: "德語按通行新正字法略作可讀化，詩行仍是路德四節。英語為公開領域意譯，不是逐字對譯。",
    stanzas: [
      v(
        1,
        [
          "Ein feste Burg ist unser Gott,",
          "ein gute Wehr und Waffen.",
          "Er hilft uns frei aus aller Not,",
          "die uns jetzt hat betroffen.",
          "Der alt böse Feind",
          "mit Ernst er’s jetzt meint;",
          "groß Macht und viel List",
          "sein grausam Rüstung ist;",
          "auf Erd ist nicht seinsgleichen."
        ],
        [
          "上主是我們堅固保障，",
          "是美好的堡壘與兵器。",
          "祂救我們脫離一切困苦，",
          "就是如今臨到我們的。",
          "那古老的惡敵",
          "如今認真要下手；",
          "權勢大、詭計多，",
          "是他殘暴的軍裝；",
          "地上沒有可與他相比的。"
        ],
        {
          en: [
            "A mighty fortress is our God,",
            "A bulwark never failing;",
            "Our helper He, amid the flood",
            "Of mortal ills prevailing:",
            "For still our ancient foe",
            "Doth seek to work us woe;",
            "His craft and power are great,",
            "And, armed with cruel hate,",
            "On earth is not his equal."
          ]
        }
      ),
      v(
        2,
        [
          "Mit unsrer Macht ist nichts getan,",
          "wir sind gar bald verloren;",
          "es streit’ für uns der rechte Mann,",
          "den Gott hat selbst erkoren.",
          "Fragst du, wer der ist?",
          "Er heißt Jesus Christ,",
          "der Herr Zebaoth,",
          "und ist kein andrer Gott;",
          "das Feld muss er behalten."
        ],
        [
          "靠我們的力量，一事無成，",
          "我們很快就會滅亡；",
          "但那一位義者為我們爭戰，",
          "是上帝親自揀選的。",
          "你問祂是誰？",
          "祂名叫耶穌基督，",
          "萬軍之耶和華，",
          "再沒有別的神；",
          "戰場必須由祂守住。"
        ],
        {
          en: [
            "Did we in our own strength confide,",
            "Our striving would be losing;",
            "Were not the right Man on our side,",
            "The Man of God’s own choosing:",
            "Dost ask who that may be?",
            "Christ Jesus, it is He;",
            "Lord Sabaoth, His Name,",
            "From age to age the same,",
            "And He must win the battle."
          ]
        }
      ),
      v(
        3,
        [
          "Und wenn die Welt voll Teufel wär",
          "und wollt uns gar verschlingen,",
          "so fürchten wir uns nicht so sehr,",
          "es soll uns doch gelingen.",
          "Der Fürst dieser Welt,",
          "wie sau’r er sich stellt,",
          "tut er uns doch nicht;",
          "das macht, er ist gericht’:",
          "ein Wörtlein kann ihn fällen."
        ],
        [
          "縱使世界滿了魔鬼，",
          "要將我們全然吞滅，",
          "我們仍不必那樣懼怕，",
          "我們終必得勝。",
          "這世界的王",
          "儘管面目猙獰，",
          "仍不能傷害我們；",
          "因他已被定罪：",
          "一句小話就能打倒他。"
        ],
        {
          en: [
            "And though this world, with devils filled,",
            "Should threaten to undo us,",
            "We will not fear, for God hath willed",
            "His truth to triumph through us:",
            "The Prince of Darkness grim,",
            "We tremble not for him;",
            "His rage we can endure,",
            "For lo, his doom is sure,",
            "One little word shall fell him."
          ]
        }
      ),
      v(
        4,
        [
          "Das Wort sie sollen lassen stahn",
          "und kein’ Dank dazu haben;",
          "er ist bei uns wohl auf dem Plan",
          "mit seinem Geist und Gaben.",
          "Nehmen sie den Leib,",
          "Gut, Ehr, Kind und Weib:",
          "lass fahren dahin,",
          "sie haben’s kein’ Gewinn;",
          "das Reich muss uns doch bleiben."
        ],
        [
          "他們必須讓這話語立定，",
          "並不因此有功可居；",
          "主與我們同在戰場上，",
          "帶著祂的靈與恩賜。",
          "縱奪去身體、",
          "財物、名譽、兒女、配偶：",
          "就任憑奪去吧，",
          "他們仍毫無所得；",
          "國度終必屬我們。"
        ],
        {
          en: [
            "That word above all earthly powers,",
            "No thanks to them, abideth;",
            "The Spirit and the gifts are ours",
            "Through Him Who with us sideth:",
            "Let goods and kindred go,",
            "This mortal life also;",
            "The body they may kill:",
            "God’s truth abideth still,",
            "His kingdom is forever."
          ]
        }
      )
    ]
  };

  L["holy-holy-holy"] = {
    full: true,
    origLang: "en",
    origLabel: "英語原詞（公開領域）",
    zhLabel: "中文教學譯文",
    lead: "希伯 1826 年四節原文。中文為本課教學譯文，第一節沿用華人教會長年習用的「聖哉」開頭。",
    note: "曲調 NICAEA（Dykes, 1861）不在歌詞版權討論之內；詞本身屬公開領域。",
    stanzas: [
      v(
        1,
        [
          "Holy, holy, holy! Lord God Almighty!",
          "Early in the morning our song shall rise to Thee;",
          "Holy, holy, holy, merciful and mighty!",
          "God in three Persons, blessed Trinity!"
        ],
        ["聖哉，聖哉，聖哉，全能大主宰！", "清晨我眾歌頌，歡聲應天外。", "聖哉，聖哉，聖哉，仁愛又全能！", "三位一體真神，當受大讚美。"]
      ),
      v(
        2,
        [
          "Holy, holy, holy! All the saints adore Thee,",
          "Casting down their golden crowns around the glassy sea;",
          "Cherubim and seraphim falling down before Thee,",
          "Who was, and is, and evermore shall be."
        ],
        ["聖哉，聖哉，聖哉，眾聖都敬拜祢，", "金冠脫下，環繞玻璃海；", "基路伯與撒拉弗俯伏主面前，", "昔在、今在、以後永在。"]
      ),
      v(
        3,
        [
          "Holy, holy, holy! Though the darkness hide Thee,",
          "Though the eye of sinful man Thy glory may not see;",
          "Only Thou art holy; there is none beside Thee,",
          "Perfect in power, in love, and purity."
        ],
        ["聖哉，聖哉，聖哉，黑暗雖遮蔽祢，", "有罪的眼不能見祢的榮耀；", "惟有祢是聖潔，除祢別無神，", "能力、仁愛、純潔全備。"]
      ),
      v(
        4,
        [
          "Holy, holy, holy! Lord God Almighty!",
          "All Thy works shall praise Thy Name, in earth, and sky, and sea;",
          "Holy, holy, holy; merciful and mighty!",
          "God in three Persons, blessed Trinity!"
        ],
        ["聖哉，聖哉，聖哉，全能大主宰！", "天地海洋一切作為都讚美祢的名；", "聖哉，聖哉，聖哉，仁愛又全能！", "三位一體真神，當受大讚美。"]
      )
    ]
  };

  L["when-i-survey"] = {
    full: true,
    origLang: "en",
    origLabel: "英語原詞（公開領域）",
    zhLabel: "中文教學譯文",
    lead: "瓦茨 1707 年原作五節。許多詩本刪去第 4 節（「His dying crimson」）；本課按原作補回。中文為本課教學譯文。",
    note: "第 4 節在部分詩本從缺，並非後人添作。",
    stanzas: [
      v(
        1,
        [
          "When I survey the wondrous cross",
          "On which the Prince of glory died,",
          "My richest gain I count but loss,",
          "And pour contempt on all my pride."
        ],
        ["每當我思想奇妙十字架，", "榮耀之主在上面犧牲；", "從前名利、驕傲、奢華，", "我看都是糞土不如。"]
      ),
      v(
        2,
        [
          "Forbid it, Lord, that I should boast,",
          "Save in the death of Christ my God!",
          "All the vain things that charm me most,",
          "I sacrifice them to His blood."
        ],
        ["主啊，禁止我別處自誇，", "只誇我神基督的死！", "凡曾迷住我的虛空，", "我都獻上，因祂的血。"]
      ),
      v(
        3,
        [
          "See from His head, His hands, His feet,",
          "Sorrow and love flow mingled down!",
          "Did e’er such love and sorrow meet,",
          "Or thorns compose so rich a crown?"
        ],
        ["看哪，從祂頭、手與腳，", "憂傷與愛一齊流下！", "何曾有愛與憂如此相遇，", "荊棘竟編成如此冠冕？"]
      ),
      v(
        4,
        [
          "His dying crimson, like a robe,",
          "Spreads o’er His body on the tree;",
          "Then I am dead to all the globe,",
          "And all the globe is dead to me."
        ],
        ["祂臨終的鮮紅如袍，", "披在樹上那身體；", "於是我向全地已死，", "全地也向我已死。"],
        { note: "原作第 4 節，部分詩本從缺" }
      ),
      v(
        5,
        [
          "Were the whole realm of nature mine,",
          "That were a present far too small;",
          "Love so amazing, so divine,",
          "Demands my soul, my life, my all."
        ],
        ["倘若大自然全歸我有，", "仍是太輕的禮物；", "如此奇妙、神聖的愛，", "要我的心、我的命、我的一切。"]
      )
    ]
  };

  L["and-can-it-be"] = {
    full: true,
    origLang: "en",
    origLabel: "英語原詞（公開領域）",
    zhLabel: "中文教學譯文",
    lead: "衛斯理 1738 年原作六節。今日詩本常唱 1、3、4、6 四節；第 2、5 節仍是原作，本課一併錄出。中文為本課教學譯文。",
    note: "初刊於 Hymns and Sacred Poems（1739 附近傳統文本）。第 5 節（「Still the small inward voice」）較少被唱。",
    stanzas: [
      v(
        1,
        [
          "And can it be that I should gain",
          "An interest in the Saviour’s blood?",
          "Died He for me, who caused His pain?",
          "For me, who Him to death pursued?",
          "Amazing love! how can it be",
          "That Thou, my God, shouldst die for me?"
        ],
        ["何能如此，我竟蒙恩，", "竟得救主寶血的功勞？", "祂竟為我死——我原是叫祂受苦的；", "為我，那追逼祂至死的人？", "奇妙的愛！何能如此，", "我的上帝竟為我死？"]
      ),
      v(
        2,
        [
          "’Tis mystery all: th’Immortal dies:",
          "Who can explore His strange design?",
          "In vain the firstborn seraph tries",
          "To sound the depths of love divine.",
          "’Tis mercy all! let earth adore,",
          "Let angel minds inquire no more."
        ],
        ["全是奧祕：永活者竟死！", "誰能測度這奇異的計畫？", "長子撒拉弗也徒然嘗試，", "探不到神愛的深淵。", "全是憐憫！大地當敬拜，", "天使的心思不必再問。"]
      ),
      v(
        3,
        [
          "He left His Father’s throne above—",
          "So free, so infinite His grace—",
          "Emptied Himself of all but love,",
          "And bled for Adam’s helpless race:",
          "’Tis mercy all, immense and free,",
          "For, O my God, it found out me!"
        ],
        ["祂離開父的寶座——", "恩典何等自由、無限——", "倒空自己，只留下愛，", "為亞當無助的族類流血：", "全是憐憫，浩大白白，", "我的上帝，竟尋見了我！"]
      ),
      v(
        4,
        [
          "Long my imprisoned spirit lay,",
          "Fast bound in sin and nature’s night;",
          "Thine eye diffused a quickening ray—",
          "I woke, the dungeon flamed with light;",
          "My chains fell off, my heart was free,",
          "I rose, went forth, and followed Thee."
        ],
        ["我被囚的靈久臥，", "罪與本性的夜牢緊鎖；", "祢眼發出甦醒的光——", "我醒了，地牢燃起光明；", "鎖鏈脫落，我心得自由，", "我起來，出去，跟隨祢。"]
      ),
      v(
        5,
        [
          "Still the small inward voice I hear,",
          "That whispers all my sins forgiven;",
          "Still the atoning blood is near,",
          "That quenched the wrath of hostile Heaven.",
          "I feel the life His wounds impart;",
          "I feel the Saviour in my heart."
        ],
        ["我仍聽見裡面細微的聲音，", "低語我一切罪已赦；", "贖罪的血仍在近處，", "熄滅了敵對之天的忿怒。", "我感到祂的傷所賜的生命；", "我感到救主在我心裡。"],
        { note: "原作第 5 節，今日較少唱" }
      ),
      v(
        6,
        [
          "No condemnation now I dread;",
          "Jesus, and all in Him, is mine;",
          "Alive in Him, my living Head,",
          "And clothed in righteousness divine,",
          "Bold I approach th’eternal throne,",
          "And claim the crown, through Christ my own."
        ],
        ["如今我不再懼怕定罪；", "耶穌，以及在祂裡面的一切，都是我的；", "在祂——我活的頭——裡面活著，", "披上神聖的義，", "我放膽來到永恆寶座，", "因基督稱那冠冕是我的。"]
      )
    ]
  };

  L["how-great-thou-art"] = {
    full: false,
    originalPd: true,
    origLang: "sv",
    origLabel: "瑞典原詩（公開領域）",
    zhLabel: "中文教學譯文（譯瑞典原詩，非 Hine）",
    reason:
      "Stuart K. Hine 英譯（二十世紀中葉）與多數華語《祢真偉大》譯配、通行錄音仍受版權保護。本課不錄 Hine 四節加副歌的全文，也不錄現代中文詩歌本逐字。",
    hint: "若崇拜使用 Hine 英譯或通行中譯，請向 CCLI／版權代理申報，並使用官方歌詞投影。請勿把下面的瑞典原詩教學譯文當作《祢真偉大》來投影。",
    keepExcerpt: true,
    lead: "以下是卡爾·博貝格 1885 年瑞典原詩《O store Gud》九節加副歌（公開領域）。中文是本課對瑞典原詩的教學譯文，結構跟隨博貝格，不是 Hine 的「Then sings my soul」。",
    note: "瑞典拼寫按通行現代轉寫（värld / livets / lovsångsljud），詩行仍是博貝格九節。第 9 節副歌改為「Tack, gode Gud」。",
    stanzas: [
      v(
        1,
        [
          "O store Gud, när jag den värld beskådar",
          "Som du har skapat med ditt allmaktsord,",
          "Hur där din visdom leder livets trådar,",
          "Och alla väsen mättas vid ditt bord."
        ],
        ["偉大的上帝，當我瞻望這世界，", "是祢用全能的話所造；", "祢的智慧在此牽引生命的線，", "一切活物都在祢的席上得飽足。"]
      ),
      c(
        [
          "Då brister själen ut i lovsångsljud:",
          "O store Gud! O store Gud!",
          "Då brister själen ut i lovsångsljud:",
          "O store Gud! O store Gud!"
        ],
        ["於是靈魂迸出頌讚的聲音：", "偉大的上帝！偉大的上帝！", "於是靈魂迸出頌讚的聲音：", "偉大的上帝！偉大的上帝！"],
        { repeat: "第 1–8 節後重唱；第 9 節改見該節" }
      ),
      v(
        2,
        [
          "När jag betraktar himlens höga under,",
          "Där gyllne världsskepp plöja etern blå,",
          "Och sol och måne mäta tidens stunder",
          "Och växla om, som tvenne klockor gå."
        ],
        ["當我思想諸天的高偉奇事，", "金色的世界之舟犁過藍色穹蒼，", "日頭與月亮量度時間的片刻，", "彼此交替，如兩座鐘行走。"]
      ),
      v(
        3,
        [
          "När jag hör åskans röst i stormen brusa,",
          "Och blixtens klingor springa fram ur skyn;",
          "När regnets kalla, friska skurar susa,",
          "Och löftets båge glänser för min syn."
        ],
        ["當我聽見雷聲在風暴中咆哮，", "閃電的劍從雲中跳出；", "當冰冷清新的陣雨颯颯而過，", "應許的虹在我眼前發光。"]
      ),
      v(
        4,
        [
          "När sommarvinden susar över fälten,",
          "När blommor dofta invid källans strand,",
          "När trastar drilla i de gröna tälten",
          "Vid furuskogens tysta, dunkla rand."
        ],
        ["當夏日的風吹過田野，", "花香在泉邊散發，", "當鶇鳥在綠色帳幕裡鳴囀，", "靠近松林安靜幽暗的邊緣。"]
      ),
      v(
        5,
        [
          "När jag i bibeln skådar alla under",
          "Som Herren gjort se’n förste Adams tid,",
          "Hur nådefull han varit alla stunder",
          "Och hjälpt sitt folk ur livets synd och strid."
        ],
        ["當我在聖經中看見一切奇事，", "是主從始祖亞當的日子所行；", "祂每時每刻何等有恩惠，", "救祂的百姓脫離生命的罪與爭戰。"]
      ),
      v(
        6,
        [
          "När jag hör dårar i sin dårskaps dimma",
          "Förneka Gud och håna vad han sagt,",
          "Men ser likväl att de hans hjälp förnimma",
          "Och uppehållas av hans nåd och makt."
        ],
        ["當我聽見愚妄人在愚昧的昏暗中", "否認上帝、譏誚祂所說的，", "卻仍看見他們也嘗到祂的幫助，", "被祂的恩典與權能所扶持。"]
      ),
      v(
        7,
        [
          "Och när jag ser hans bild till jorden sväva",
          "Och göra väl och hjälpa överallt;",
          "När jag ser satan fly och döden bäva",
          "För Herren i förklarad korsgestalt."
        ],
        ["當我看見祂的形像臨到地上，", "處處行善、處處扶助；", "當我看見撒但逃跑、死亡戰兢，", "在十架上顯明的主面前。"]
      ),
      v(
        8,
        [
          "När tryckt av syndens skuld jag faller neder",
          "Vid Herrens fot och ber om nåd och frid,",
          "Och han min själ på rätta vägen leder",
          "Och frälsar mig från all min synd och strid."
        ],
        ["當我被罪債壓迫，俯伏", "在主腳前，求恩典與平安，", "祂就領我的靈魂走正路，", "救我脫離一切的罪與爭戰。"]
      ),
      v(
        9,
        [
          "När slutligt alla tidens höljen falla,",
          "Och i åskådning byter sig min tro,",
          "Och evighetens klara klockor kalla",
          "Min frälsta ande till dess sabbatsro.",
          "Då brister själen ut i lovsångsljud:",
          "Tack, gode Gud! Tack, gode Gud!"
        ],
        [
          "當最終一切時間的遮蔽都落下，",
          "我的信心換成面對面的瞻望，",
          "永恆清亮的鐘聲呼喚",
          "我蒙救的靈進入安息。",
          "於是靈魂迸出頌讚的聲音：",
          "感謝，良善的上帝！感謝，良善的上帝！"
        ]
      )
    ]
  };

  L["it-is-well"] = {
    full: true,
    origLang: "en",
    origLabel: "英語原詞（公開領域）",
    zhLabel: "中文教學譯文",
    lead: "斯皮福 1873 年四節加副歌。中文為本課教學譯文。",
    note: "副歌每節後重唱。第 3 節「My sin, not in part but the whole」是神學重心，不宜刪。",
    stanzas: [
      v(
        1,
        [
          "When peace, like a river, attendeth my way,",
          "When sorrows like sea billows roll;",
          "Whatever my lot, Thou hast taught me to say,",
          "It is well, it is well with my soul."
        ],
        ["當平安如江河伴隨我的路，", "當憂傷如海浪翻騰；", "無論際遇如何，祢已教我說：", "我心靈安好，我心靈安好。"]
      ),
      c(
        ["It is well with my soul,", "It is well, it is well with my soul."],
        ["我心靈安好，", "我心靈安好，我心靈安好。"],
        { repeat: "每節後重唱" }
      ),
      v(
        2,
        [
          "Though Satan should buffet, though trials should come,",
          "Let this blest assurance control,",
          "That Christ hath regarded my helpless estate,",
          "And hath shed His own blood for my soul."
        ],
        ["縱撒但擊打，縱試煉臨到，", "讓這有福的確據作主：", "基督已顧念我無助的光景，", "並為我的靈魂流了自己的血。"]
      ),
      v(
        3,
        [
          "My sin—oh, the bliss of this glorious thought!—",
          "My sin, not in part but the whole,",
          "Is nailed to the cross, and I bear it no more,",
          "Praise the Lord, praise the Lord, O my soul!"
        ],
        ["我的罪——啊，這榮耀思想的福樂！——", "我的罪，不是一部分，乃是全部，", "已釘在十字架上，我不再背負；", "讚美主，讚美主，我的心哪！"]
      ),
      v(
        4,
        [
          "And Lord, haste the day when the faith shall be sight,",
          "The clouds be rolled back as a scroll;",
          "The trump shall resound, and the Lord shall descend,",
          "Even so, it is well with my soul."
        ],
        ["主啊，求加速那日：信心要成為眼見，", "雲彩如書卷被捲起；", "號筒要響，主要降臨，", "即便如此，我心靈安好。"]
      )
    ]
  };

  L["great-faithfulness"] = {
    full: true,
    origLang: "en",
    origLabel: "英語原詞（1923，美國公開領域）",
    zhLabel: "中文教學譯文",
    lead: "奇澤姆 1923 年英語原詞三節加副歌，在美國已屬公開領域。中文為本課教學譯文，不是現代版權詩本《祢信實何廣大》的逐字。後世編曲、特定中譯與錄音仍可能另有版權。",
    note: "投影英語 1923 原詞在美國一般可作公開領域使用；若使用特定中文詩歌本或後期編曲，請另查該版本授權。",
    stanzas: [
      v(
        1,
        [
          "Great is Thy faithfulness, O God my Father;",
          "There is no shadow of turning with Thee;",
          "Thou changest not, Thy compassions, they fail not;",
          "As Thou hast been, Thou forever wilt be."
        ],
        ["祢的信實何其廣大，我的父神；", "在祢並沒有轉動的影兒；", "祢不改變，祢的憐憫也不止息；", "祢從前怎樣，永遠也必怎樣。"]
      ),
      c(
        [
          "Great is Thy faithfulness! Great is Thy faithfulness!",
          "Morning by morning new mercies I see;",
          "All I have needed Thy hand hath provided—",
          "Great is Thy faithfulness, Lord, unto me!"
        ],
        ["祢的信實廣大！祢的信實廣大！", "早晨復早晨，我看見新的憐憫；", "凡我所需要的，都是祢手所供給——", "祢的信實廣大，主，向著我！"],
        { repeat: "每節後重唱" }
      ),
      v(
        2,
        [
          "Summer and winter, and springtime and harvest,",
          "Sun, moon and stars in their courses above,",
          "Join with all nature in manifold witness",
          "To Thy great faithfulness, mercy and love."
        ],
        ["夏與冬，春與收成，", "日、月、星辰在其上的軌道，", "與一切受造一同多方見證", "祢廣大的信實、憐憫與慈愛。"]
      ),
      v(
        3,
        [
          "Pardon for sin and a peace that endureth,",
          "Thine own dear presence to cheer and to guide;",
          "Strength for today and bright hope for tomorrow,",
          "Blessings all mine, with ten thousand beside!"
        ],
        ["罪得赦免，並有持久的平安，", "有祢親愛的同在安慰與引導；", "今日的力量，明日光明的盼望，", "福氣都是我的，還有千萬在其上！"]
      )
    ]
  };

  L["be-thou-my-vision"] = {
    full: true,
    origLang: "en",
    origLabel: "英語韻文（Hull，公開領域）",
    zhLabel: "中文教學譯文",
    lead: "Eleanor Hull 1912 年韻文五節（據 Mary Byrne 1905 直譯），屬公開領域。中文為本課教學譯文。古愛爾蘭原詩《Rop tú mo baile》更早，此處錄會眾通用的英語韻文。",
    note: "「異象」在本詩是「求主成為我的看見」，不是個人事業藍圖。",
    stanzas: [
      v(
        1,
        [
          "Be Thou my Vision, O Lord of my heart;",
          "Naught be all else to me, save that Thou art.",
          "Thou my best Thought, by day or by night,",
          "Waking or sleeping, Thy presence my light."
        ],
        ["求主作我異象，我心的主；", "除祢以外，別無可慕。", "白晝或黑夜，祢是我最好的思念；", "睡或醒，祢的同在是我的光。"]
      ),
      v(
        2,
        [
          "Be Thou my Wisdom, and Thou my true Word;",
          "I ever with Thee and Thou with me, Lord;",
          "Thou my great Father, I Thy true son;",
          "Thou in me dwelling, and I with Thee one."
        ],
        ["求主作我智慧，作我真實的道；", "我常與祢同在，祢也與我同在；", "祢是我大父，我是祢的真兒子；", "祢住在我裡面，我與祢合一。"]
      ),
      v(
        3,
        [
          "Be Thou my battle Shield, Sword for the fight;",
          "Be Thou my Dignity, Thou my Delight;",
          "Thou my soul’s Shelter, Thou my high Tower:",
          "Raise Thou me heavenward, O Power of my power."
        ],
        ["求主作我爭戰的盾、爭戰的劍；", "作我的尊榮，作我的喜樂；", "祢是我靈魂的藏身處，是我的高臺：", "我力量的力量啊，求舉起我向天。"]
      ),
      v(
        4,
        [
          "Riches I heed not, nor man’s empty praise,",
          "Thou mine Inheritance, now and always;",
          "Thou and Thou only, first in my heart,",
          "High King of Heaven, my Treasure Thou art."
        ],
        ["財富我不看重，人虛空的讚美也不看重，", "祢是我的產業，如今直到永遠；", "惟有祢，在我心中居首位，", "天上的大君王，祢是我的財寶。"]
      ),
      v(
        5,
        [
          "High King of Heaven, my victory won,",
          "May I reach Heaven’s joys, O bright Heaven’s Sun!",
          "Heart of my own heart, whatever befall,",
          "Still be my Vision, O Ruler of all."
        ],
        ["天上的大君王，我的勝仗已得，", "願我到達天上的福樂，明亮的日頭啊！", "我心中的心，無論遭遇什麼，", "仍求作我異象，萬有的主宰。"]
      )
    ]
  };

  L["all-hail-power"] = {
    full: true,
    origLang: "en",
    origLabel: "英語傳統詞（公開領域）",
    zhLabel: "中文教學譯文",
    lead: "佩羅內 1779 年原作與里彭後來補入、會眾長年習用的詩節，合成下列六節（皆公開領域）。中文為本課教學譯文。",
    note: "佩羅內初稿詩節更多；此處錄英語世界最常齊唱的傳統完整組。末節「O that with yonder sacred throng」為里彭所加，亦屬公開領域。",
    stanzas: [
      v(
        1,
        [
          "All hail the power of Jesus’ name!",
          "Let angels prostrate fall;",
          "Bring forth the royal diadem,",
          "And crown Him Lord of all."
        ],
        ["擁戴耶穌聖名的權能！", "願天使俯伏；", "捧出王的冠冕，", "擁戴祂為萬有之主。"]
      ),
      v(
        2,
        [
          "Ye chosen seed of Israel’s race,",
          "Ye ransomed from the fall,",
          "Hail Him who saves you by His grace,",
          "And crown Him Lord of all."
        ],
        ["以色列蒙揀選的後裔，", "你們從墮落中被贖回的，", "歡呼那位用恩典拯救你們的，", "擁戴祂為萬有之主。"]
      ),
      v(
        3,
        [
          "Sinners, whose love can ne’er forget",
          "The wormwood and the gall,",
          "Go, spread your trophies at His feet,",
          "And crown Him Lord of all."
        ],
        ["罪人哪，你們的愛永不忘記", "那茵陳與苦膽，", "去，把戰利品鋪在祂腳前，", "擁戴祂為萬有之主。"]
      ),
      v(
        4,
        [
          "Let every kindred, every tribe",
          "On this terrestrial ball,",
          "To Him all majesty ascribe,",
          "And crown Him Lord of all."
        ],
        ["願地上每一親族、每一支派，", "在這地球之上，", "把一切威嚴歸給祂，", "擁戴祂為萬有之主。"]
      ),
      v(
        5,
        [
          "Crown Him, ye morning stars of light,",
          "Who fixed this floating ball;",
          "Now hail the strength of Israel’s might,",
          "And crown Him Lord of all."
        ],
        ["清晨的星啊，擁戴祂，", "祂立定這浮懸的地球；", "如今歡呼以色列大能的力量，", "擁戴祂為萬有之主。"]
      ),
      v(
        6,
        [
          "O that with yonder sacred throng",
          "We at His feet may fall!",
          "We’ll join the everlasting song,",
          "And crown Him Lord of all."
        ],
        ["但願我們與那邊聖潔的群眾，", "一同俯伏在祂腳前！", "我們要加入永恆的詩歌，", "擁戴祂為萬有之主。"]
      )
    ]
  };

  L["crown-him"] = {
    full: true,
    origLang: "en",
    origLabel: "英語原詞（公開領域）",
    zhLabel: "中文教學譯文",
    lead: "布里奇斯 1851 與特林 1874 的公開領域詩節，按會眾常用的六節錄出。中文為本課教學譯文。",
    note: "不同詩本選節略有出入；下列六節覆蓋羔羊、愛、生命、和平、歲月、天上之主。",
    stanzas: [
      v(
        1,
        [
          "Crown Him with many crowns,",
          "The Lamb upon His throne;",
          "Hark! how the heavenly anthem drowns",
          "All music but its own:",
          "Awake, my soul, and sing",
          "Of Him who died for thee,",
          "And hail Him as thy matchless King",
          "Through all eternity."
        ],
        ["當戴冠冕，千萬冠冕，", "戴在寶座上的羔羊；", "聽哪，天上的頌歌淹沒", "一切別的音樂：", "我的心哪，醒來歌唱", "那位為你死的，", "歡呼祂為無可比的王，", "直到永永遠遠。"]
      ),
      v(
        2,
        [
          "Crown Him the Lord of love;",
          "Behold His hands and side,",
          "Those wounds, yet visible above,",
          "In beauty glorified:",
          "No angel in the sky",
          "Can fully bear that sight,",
          "But downward bends his burning eye",
          "At mysteries so bright."
        ],
        ["當戴冠冕，愛之主；", "看祂的手與肋旁，", "那些傷在天上仍可見，", "在榮美中得了榮耀：", "天上沒有一個天使", "能全然承受那景象，", "只得垂下燃燒的眼目，", "對如此明亮的奧祕。"]
      ),
      v(
        3,
        [
          "Crown Him the Lord of life,",
          "Who triumphed o’er the grave,",
          "And rose victorious in the strife",
          "For those He came to save;",
          "His glories now we sing,",
          "Who died, and rose on high,",
          "Who died eternal life to bring,",
          "And lives that death may die."
        ],
        ["當戴冠冕，生命之主，", "祂勝過墳墓，", "在爭戰中得勝復活，", "為那些祂來拯救的人；", "我們如今唱祂的榮耀，", "祂死了，又升到高處，", "祂死是要帶來永生，", "祂活著，好叫死亡死去。"]
      ),
      v(
        4,
        [
          "Crown Him the Lord of peace,",
          "Whose power a scepter sways",
          "From pole to pole, that wars may cease,",
          "And all be prayer and praise:",
          "His reign shall know no end,",
          "And round His pierced feet",
          "Fair flowers of paradise extend",
          "Their fragrance ever sweet."
        ],
        ["當戴冠冕，和平之主，", "祂的權能揮動權杖", "從極地到極地，好叫戰爭止息，", "萬有都成為禱告與讚美：", "祂的國度沒有窮盡，", "在祂被刺的腳周圍，", "樂園美麗的花伸展", "永遠甘甜的香氣。"]
      ),
      v(
        5,
        [
          "Crown Him the Lord of years,",
          "The Potentate of time,",
          "Creator of the rolling spheres,",
          "Ineffably sublime.",
          "All hail, Redeemer, hail!",
          "For Thou hast died for me;",
          "Thy praise shall never, never fail",
          "Throughout eternity."
        ],
        ["當戴冠冕，歲月之主，", "時間的主宰，", "運轉諸天的創造者，", "高超得無法言說。", "救贖主啊，萬民歡呼！", "因祢已為我死；", "對祢的讚美永不、永不衰殘，", "直到永永遠遠。"]
      ),
      v(
        6,
        [
          "Crown Him the Lord of heaven,",
          "Enthroned in worlds above;",
          "Crown Him the King to whom is given",
          "The wondrous name of Love.",
          "Crown Him with many crowns,",
          "As thrones before Him fall;",
          "Crown Him, ye kings, with many crowns,",
          "For He is King of all."
        ],
        ["當戴冠冕，天上之主，", "在上界登上寶座；", "擁戴這位君王，祂得了", "「愛」這奇妙的名。", "當戴冠冕，千萬冠冕，", "寶座都在祂面前倒下；", "君王啊，用許多冠冕擁戴祂，", "因祂是萬有的王。"]
      )
    ]
  };

  L["church-foundation"] = {
    full: true,
    origLang: "en",
    origLabel: "英語原詞（公開領域）",
    zhLabel: "中文教學譯文",
    lead: "斯通 1866 年信經聖詩。下列六節含會眾最常唱的五節，並補回常被刪的「The Church shall never perish」。中文為本課教學譯文。",
    note: "斯通原組詩更長；此六節是英語詩本最完整的常用全文。",
    stanzas: [
      v(
        1,
        [
          "The Church’s one foundation",
          "Is Jesus Christ her Lord;",
          "She is His new creation",
          "By water and the Word.",
          "From heaven He came and sought her",
          "To be His holy bride;",
          "With His own blood He bought her,",
          "And for her life He died."
        ],
        ["教會唯一的根基", "是主耶穌基督；", "她是祂的新造，", "由水與道而出。", "祂從天上來尋她，", "要她作聖潔的新婦；", "用自己的血買了她，", "為她的生命而死。"]
      ),
      v(
        2,
        [
          "Elect from every nation,",
          "Yet one o’er all the earth;",
          "Her charter of salvation,",
          "One Lord, one faith, one birth;",
          "One holy name she blesses,",
          "Partakes one holy food,",
          "And to one hope she presses,",
          "With every grace endued."
        ],
        ["從萬國中蒙揀選，", "在全地卻仍是一個；", "她救恩的憲章是：", "一主、一信、一洗；", "她稱頌同一個聖名，", "同領同一份聖食，", "向同一個盼望直奔，", "被各樣恩典所穿戴。"]
      ),
      v(
        3,
        [
          "Though with a scornful wonder",
          "Men see her sore oppressed,",
          "By schisms rent asunder,",
          "By heresies distressed,",
          "Yet saints their watch are keeping;",
          "Their cry goes up, “How long?”",
          "And soon the night of weeping",
          "Shall be the morn of song."
        ],
        ["雖然人帶著輕蔑的驚訝", "看見她深受壓迫，", "被分裂撕開，", "被異端困擾，", "聖徒仍在守望；", "他們的呼喊上升：「要到幾時？」", "哭泣的夜很快", "要成為歌唱的早晨。"]
      ),
      v(
        4,
        [
          "The Church shall never perish!",
          "Her dear Lord to defend,",
          "To guide, sustain, and cherish,",
          "Is with her to the end;",
          "Though there be those that hate her,",
          "And false sons in her pale,",
          "Against or foe or traitor",
          "She ever shall prevail."
        ],
        ["教會永不滅亡！", "她親愛的主要護衛、", "引導、扶持、顧惜她，", "與她同在直到末了；", "縱有恨她的人，", "也有假兒子在她範圍內，", "無論敵人或叛徒，", "她終必得勝。"],
        { note: "原作詩節，部分詩本從缺" }
      ),
      v(
        5,
        [
          "’Mid toil and tribulation,",
          "And tumult of her war,",
          "She waits the consummation",
          "Of peace forevermore;",
          "Till with the vision glorious",
          "Her longing eyes are blest,",
          "And the great Church victorious",
          "Shall be the Church at rest."
        ],
        ["在勞苦與患難中，", "在她爭戰的喧嚷裡，", "她等候那永遠和平", "的成全；", "直到榮耀的異象", "使她渴慕的眼得福，", "得勝的大教會", "要成為安息的教會。"]
      ),
      v(
        6,
        [
          "Yet she on earth hath union",
          "With God the Three in One,",
          "And mystic sweet communion",
          "With those whose rest is won.",
          "O happy ones and holy!",
          "Lord, give us grace that we",
          "Like them, the meek and lowly,",
          "On high may dwell with Thee."
        ],
        ["然而她在地上已與", "三一的上帝聯合，", "並與那些已得安息的人", "有奧祕甘甜的相通。", "快樂而聖潔的人哪！", "主啊，賜恩給我們，", "好叫我們像他們一樣謙卑，", "在高處與祢同住。"]
      )
    ]
  };

  L["rock-of-ages"] = {
    full: true,
    origLang: "en",
    origLabel: "英語原詞（公開領域）",
    zhLabel: "中文教學譯文",
    lead: "托普雷迪 1776 年四節。中文為本課教學譯文。第一節末句按後來最通行的會眾文本（Save from wrath and make me pure）。",
    note: "初刊文本末句或作 “Cleanse me from its guilt and power”；神學相同，本課用會眾最熟的傳本。",
    stanzas: [
      v(
        1,
        [
          "Rock of Ages, cleft for me,",
          "Let me hide myself in Thee;",
          "Let the water and the blood,",
          "From Thy wounded side which flowed,",
          "Be of sin the double cure;",
          "Save from wrath and make me pure."
        ],
        ["萬古磐石為我裂開，", "容我藏身在祢裡面；", "願那水與血", "從祢受傷的肋旁流出，", "成為罪的雙重醫治；", "救我脫離忿怒，使我清潔。"]
      ),
      v(
        2,
        [
          "Not the labors of my hands",
          "Can fulfill Thy law’s demands;",
          "Could my zeal no respite know,",
          "Could my tears forever flow,",
          "All for sin could not atone;",
          "Thou must save, and Thou alone."
        ],
        ["我雙手的勞苦", "不能滿足祢律法的要求；", "縱使我的熱心毫無歇息，", "縱使我的淚永遠流，", "這一切仍不能贖罪；", "必須祢拯救，惟有祢。"]
      ),
      v(
        3,
        [
          "Nothing in my hand I bring,",
          "Simply to the cross I cling;",
          "Naked, come to Thee for dress;",
          "Helpless, look to Thee for grace;",
          "Foul, I to the fountain fly;",
          "Wash me, Savior, or I die."
        ],
        ["我手中一無所有，", "單單抓住十字架；", "赤身來求祢給我衣服；", "無助，仰望祢的恩典；", "污穢的我逃向那泉源；", "洗我，救主，否則我必死。"]
      ),
      v(
        4,
        [
          "While I draw this fleeting breath,",
          "When mine eyes shall close in death,",
          "When I soar to worlds unknown,",
          "See Thee on Thy judgment throne,",
          "Rock of Ages, cleft for me,",
          "Let me hide myself in Thee."
        ],
        ["當我還在呼吸這短暫的氣息，", "當我的眼在死裡閉上，", "當我升向未知的世界，", "看見祢在審判的寶座上，", "萬古磐石為我裂開，", "容我藏身在祢裡面。"]
      )
    ]
  };

  L["just-as-i-am"] = {
    full: true,
    origLang: "en",
    origLabel: "英語原詞（公開領域）",
    zhLabel: "中文教學譯文",
    lead: "艾略特 1835 年原作。下列七節是傳統完整文本。中文為本課教學譯文。",
    note: "第 7 節在部分短詩本從缺，仍屬原作傳統。",
    stanzas: [
      v(
        1,
        [
          "Just as I am, without one plea,",
          "But that Thy blood was shed for me,",
          "And that Thou bidd’st me come to Thee,",
          "O Lamb of God, I come."
        ],
        ["照我本相，無一可訴，", "只因祢的血為我流，", "並且祢召我來到祢面前，", "上帝的羔羊，我來。"]
      ),
      v(
        2,
        [
          "Just as I am, and waiting not",
          "To rid my soul of one dark blot,",
          "To Thee, whose blood can cleanse each spot,",
          "O Lamb of God, I come."
        ],
        ["照我本相，不再等候", "先除掉靈魂上一塊暗污，", "到祢面前——祢的血能洗淨每一點，", "上帝的羔羊，我來。"]
      ),
      v(
        3,
        [
          "Just as I am, though tossed about",
          "With many a conflict, many a doubt,",
          "Fightings and fears within, without,",
          "O Lamb of God, I come."
        ],
        ["照我本相，縱被拋來拋去，", "多有爭戰，多有疑惑，", "裡面外面都有打鬥與恐懼，", "上帝的羔羊，我來。"]
      ),
      v(
        4,
        [
          "Just as I am, poor, wretched, blind;",
          "Sight, riches, healing of the mind,",
          "Yea, all I need, in Thee to find,",
          "O Lamb of God, I come."
        ],
        ["照我本相，貧窮、困苦、瞎眼；", "視力、豐富、心意的醫治，", "是的，我一切所需，都在祢裡面找著，", "上帝的羔羊，我來。"]
      ),
      v(
        5,
        [
          "Just as I am, Thou wilt receive,",
          "Wilt welcome, pardon, cleanse, relieve;",
          "Because Thy promise I believe,",
          "O Lamb of God, I come."
        ],
        ["照我本相，祢必收納，", "必歡迎、赦免、洗淨、寬解；", "因我相信祢的應許，", "上帝的羔羊，我來。"]
      ),
      v(
        6,
        [
          "Just as I am, Thy love unknown",
          "Has broken every barrier down;",
          "Now to be Thine, yea, Thine alone,",
          "O Lamb of God, I come."
        ],
        ["照我本相，祢無名可測的愛", "已拆毀每一道攔阻；", "如今要屬祢，是的，單屬祢，", "上帝的羔羊，我來。"]
      ),
      v(
        7,
        [
          "Just as I am, of that free love",
          "The breadth, length, depth, and height to prove,",
          "Here for a season, then above,",
          "O Lamb of God, I come."
        ],
        ["照我本相，要證實那自由的愛", "何等長、闊、高、深，", "在此暫時，然後在上面，", "上帝的羔羊，我來。"],
        { note: "傳統第 7 節，部分詩本從缺" }
      )
    ]
  };

  L["what-a-friend"] = {
    full: true,
    origLang: "en",
    origLabel: "英語原詞（公開領域）",
    zhLabel: "中文教學譯文",
    lead: "斯克里文約 1855 年三節。中文為本課教學譯文。",
    note: "此詩先是家書，後成會眾聖詩。三節即傳統全文。",
    stanzas: [
      v(
        1,
        [
          "What a friend we have in Jesus,",
          "All our sins and griefs to bear!",
          "What a privilege to carry",
          "Everything to God in prayer!",
          "O what peace we often forfeit,",
          "O what needless pain we bear,",
          "All because we do not carry",
          "Everything to God in prayer."
        ],
        ["我們有何等的恩友在耶穌裡，", "祂擔當我們一切的罪與憂傷！", "何等權利，能把", "萬事帶到上帝面前禱告！", "啊，我們常常失去何等的平安，", "擔受何等不必要的痛苦，", "都因我們沒有把", "萬事帶到上帝面前禱告。"]
      ),
      v(
        2,
        [
          "Have we trials and temptations?",
          "Is there trouble anywhere?",
          "We should never be discouraged;",
          "Take it to the Lord in prayer.",
          "Can we find a friend so faithful",
          "Who will all our sorrows share?",
          "Jesus knows our every weakness;",
          "Take it to the Lord in prayer."
        ],
        ["我們有試煉與試探嗎？", "何處有患難嗎？", "我們不該灰心；", "帶到主面前禱告。", "能找到這樣忠信的朋友，", "與我們分擔一切憂傷嗎？", "耶穌知道我們每一個軟弱；", "帶到主面前禱告。"]
      ),
      v(
        3,
        [
          "Are we weak and heavy laden,",
          "Cumbered with a load of care?",
          "Precious Savior, still our refuge;",
          "Take it to the Lord in prayer.",
          "Do thy friends despise, forsake thee?",
          "Take it to the Lord in prayer!",
          "In His arms He’ll take and shield thee;",
          "Thou wilt find a solace there."
        ],
        ["我們軟弱、重擔壓身，", "被憂慮的擔子纏累嗎？", "寶貴的救主仍是我們的避難所；", "帶到主面前禱告。", "朋友藐視你、離棄你嗎？", "帶到主面前禱告！", "祂要用手臂接納並遮護你；", "你必在那裡得安慰。"]
      )
    ]
  };
})();
