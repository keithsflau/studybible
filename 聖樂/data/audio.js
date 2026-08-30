/**
 * Legal hymn recordings only: Wikimedia Commons PD / CC files.
 * Wired onto SACRED_MUSIC_CATALOG.hymns[].audio
 * Restricted titles get a CCLI note, never a pirate full track.
 */
(function () {
  const catalog = window.SACRED_MUSIC_CATALOG;
  if (!catalog || !catalog.hymns) return;

  function commons(file, oggPath, extras) {
    const ogg = "https://upload.wikimedia.org/wikipedia/commons/" + oggPath;
    const slash = oggPath.lastIndexOf("/");
    const encodedName = oggPath.slice(slash + 1);
    return Object.assign(
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/" + oggPath + "/" + encodedName + ".mp3",
        srcOgg: ogg,
        source: "Wikimedia Commons",
        sourcePage: "https://commons.wikimedia.org/wiki/File:" + file.replace(/ /g, "_")
      },
      extras
    );
  }

  const byId = {
    "amazing-grace": commons("Amazing Grace US Marine Band.ogg", "2/21/Amazing_Grace_US_Marine_Band.ogg", {
      title: "Amazing Grace",
      performer: "United States Marine Band（編曲 Capt. Ryan Nowlin）",
      license: "Public domain（美國政府作品）",
      licenseUrl: "https://commons.wikimedia.org/wiki/Commons:Licensing#Material_in_the_public_domain",
      kind: "band",
      kindLabel: "軍樂團"
    }),
    "mighty-fortress": commons(
      '"Ein feste Burg" performed by the United States Army Band in December 2018.oga',
      '4/4e/%22Ein_feste_Burg%22_performed_by_the_United_States_Army_Band_in_December_2018.oga',
      {
        title: "Ein feste Burg ist unser Gott",
        performer: "United States Army Band（2018）",
        license: "Public domain（美國政府作品）",
        licenseUrl: "https://commons.wikimedia.org/wiki/Commons:Licensing#Material_in_the_public_domain",
        kind: "band",
        kindLabel: "軍樂團"
      }
    ),
    "holy-holy-holy": commons("Army and Navy Hymnal-0004.ogg", "e/ec/Army_and_Navy_Hymnal-0004.ogg", {
      title: "Holy, Holy, Holy! Lord God Almighty",
      performer: "Kevin W. Davidson（LibriVox，《The Army and Navy Hymnal》選段）",
      license: "Public domain（LibriVox CC0 / PD Dedication）",
      licenseUrl: "https://librivox.org/pages/public-domain/",
      kind: "sung",
      kindLabel: "人聲演唱"
    }),
    "when-i-survey": commons(
      "HWW When I survey the wondrous cross (Rockingham LM).ogg",
      "5/56/HWW_When_I_survey_the_wondrous_cross_%28Rockingham_LM%29.ogg",
      {
        title: "When I Survey the Wondrous Cross（ROCKINGHAM）",
        performer: "Richard MS Irwin（Hymns Without Words）",
        license: "CC BY-SA 4.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
        kind: "instrumental",
        kindLabel: "器樂伴奏"
      }
    ),
    "and-can-it-be": commons("And Can it Be.ogg", "8/8e/And_Can_it_Be.ogg", {
      title: "And Can It Be",
      performer: "Clyde McLennan（Small Church Music）",
      license: "CC BY 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
      kind: "sung",
      kindLabel: "人聲演唱"
    }),
    "how-great-thou-art": {
      restricted: true,
      note: "Stuart K. Hine 英譯與多數通行錄音、中譯仍受版權保護。本課不提供未授權全曲。請於 CCLI／原出版者取得授權後，在合法來源播放。"
    },
    "be-thou-my-vision": commons(
      "Be thou my vision acoustic by walmartshopper.ogg",
      "e/eb/Be_thou_my_vision_acoustic_by_walmartshopper.ogg",
      {
        title: "Be Thou My Vision",
        performer: "Walmartshopper（原聲結他，英語維基上傳者）",
        license: "Public domain（作者釋出）",
        licenseUrl: "https://commons.wikimedia.org/wiki/Commons:Licensing#Material_in_the_public_domain",
        kind: "sung",
        kindLabel: "原聲演唱"
      }
    ),
    "crown-him": commons("Crown Him with many Crowns.ogg", "8/80/Crown_Him_with_many_Crowns.ogg", {
      title: "Crown Him with Many Crowns",
      performer: "Vallejo Drive Church SDA",
      license: "CC BY 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
      kind: "sung",
      kindLabel: "會眾／詩班"
    }),
    "church-foundation": commons(
      "HWW The Churchs one foundation.ogg",
      "5/5d/HWW_The_Churchs_one_foundation.ogg",
      {
        title: "The Church's One Foundation",
        performer: "Richard MS Irwin（Hymns Without Words）",
        license: "CC BY-SA 4.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
        kind: "instrumental",
        kindLabel: "器樂伴奏"
      }
    ),
    "rock-of-ages": commons(
      "EdisonMixedQuartet RockOfAges1913.ogg",
      "b/b5/EdisonMixedQuartet_RockOfAges1913.ogg",
      {
        title: "Rock of Ages（1913 愛迪生錄音）",
        performer: "Edison Mixed Quartet",
        license: "Public domain（1926 年前美國錄音）",
        licenseUrl: "https://commons.wikimedia.org/wiki/Template:PD-US-record-expired",
        kind: "historic",
        kindLabel: "歷史錄音"
      }
    ),
    "just-as-i-am": commons("Woodworth.ogg", "f/f5/Woodworth.ogg", {
      title: "WOODWORTH（Just As I Am 曲調）",
      performer: "管風琴示範（Wikimedia Commons）",
      license: "CC BY-SA 2.5",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.5/",
      kind: "tune",
      kindLabel: "曲調示範"
    }),
    "what-a-friend": commons(
      "HWW What A Friend We Have In Jesus.ogg",
      "b/b8/HWW_What_A_Friend_We_Have_In_Jesus.ogg",
      {
        title: "What a Friend We Have in Jesus",
        performer: "Richard MS Irwin（Hymns Without Words）",
        license: "CC BY-SA 4.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
        kind: "instrumental",
        kindLabel: "器樂伴奏"
      }
    ),
    "to-god-be-glory": commons("HWW To God Be The Glory.ogg", "b/b1/HWW_To_God_Be_The_Glory.ogg", {
      title: "To God Be the Glory",
      performer: "Richard MS Irwin（Hymns Without Words）",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      kind: "instrumental",
      kindLabel: "器樂伴奏"
    }),
    "come-thou-fount": commons("Army and Navy Hymnal-0112.ogg", "f/f1/Army_and_Navy_Hymnal-0112.ogg", {
      title: "Come, Thou Fount of Every Blessing",
      performer: "Anna Roberts（LibriVox，《The Army and Navy Hymnal》選段）",
      license: "Public domain（LibriVox CC0 / PD Dedication）",
      licenseUrl: "https://librivox.org/pages/public-domain/",
      kind: "sung",
      kindLabel: "人聲演唱"
    }),
    "in-christ-alone": {
      restricted: true,
      note: "詞曲屬 Stuart Townend / Keith Getty，錄音與歌詞均受版權保護。本課不提供未授權全曲。請於 CCLI／Getty Music 等合法來源播放。"
    },
    "joy-to-the-world": commons("Joy-to-the-World KB.ogg", "4/40/Joy-to-the-World_KB.ogg", {
      title: "Joy to the World",
      performer: "Kim Butler、Alan Davis-Drake、Diyan、Claire Goget、Karen Savage、SKVE、Kara Shallenberg、Kristin Hughes（無伴奏，2006）",
      license: "Public domain（作者釋出）",
      licenseUrl: "https://commons.wikimedia.org/wiki/Commons:Licensing#Material_in_the_public_domain",
      kind: "sung",
      kindLabel: "無伴奏合唱"
    }),
    "christ-risen": commons("Army and Navy Hymnal-0063.ogg", "6/67/Army_and_Navy_Hymnal-0063.ogg", {
      title: "Christ the Lord Is Risen Today",
      performer: "Eden Rea-Hedrick（LibriVox，《The Army and Navy Hymnal》選段）",
      license: "Public domain（LibriVox CC0 / PD Dedication）",
      licenseUrl: "https://librivox.org/pages/public-domain/",
      kind: "sung",
      kindLabel: "人聲演唱"
    }),
    "abide-with-me": commons("Army and Navy Hymnal-0009.ogg", "f/fa/Army_and_Navy_Hymnal-0009.ogg", {
      title: "Abide with Me",
      performer: "Ruth Golding（LibriVox，《The Army and Navy Hymnal》選段）",
      license: "Public domain（LibriVox CC0 / PD Dedication）",
      licenseUrl: "https://librivox.org/pages/public-domain/",
      kind: "sung",
      kindLabel: "人聲演唱"
    }),
    "blessed-assurance": commons("Army and Navy Hymnal-0212.ogg", "b/b9/Army_and_Navy_Hymnal-0212.ogg", {
      title: "Blessed Assurance",
      performer: "Eden Rea-Hedrick（LibriVox，《The Army and Navy Hymnal》選段）",
      license: "Public domain（LibriVox CC0 / PD Dedication）",
      licenseUrl: "https://librivox.org/pages/public-domain/",
      kind: "sung",
      kindLabel: "人聲演唱"
    }),
    "all-creatures": commons(
      "All Creatures of Our God and King.ogg",
      "2/2f/All_Creatures_of_Our_God_and_King.ogg",
      {
        title: "All Creatures of Our God and King",
        performer: "Vallejo Drive Church SDA",
        license: "CC BY 3.0",
        licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
        kind: "sung",
        kindLabel: "會眾／詩班"
      }
    )
  };

  catalog.hymns.forEach(function (h) {
    if (byId[h.id]) h.audio = byId[h.id];
  });
})();
