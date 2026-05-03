import { useState } from "react";

// ══════════════════════════════════════════════════════════════
// MORY 統合診断システム v3 — Hitomi Ito original data
// ══════════════════════════════════════════════════════════════

const CHARS = {
  Upa: {
    emoji: "🐰", color: "#F9C5D1", accent: "#E8849A", soft: "#fff0f3",
    jp: "Upa（うさぎ）", en: "Upa (Rabbit)",
    traitJp: "ふわふわの可愛さ・距離感が大切・見守っていてほしい",
    traitEn: "Soft sweetness · Needs space · Wants to be watched over",
    lightJp: ["ふわふわの可愛さ", "距離感を大切にする", "見守る優しさ"],
    lightEn: ["Soft sweetness", "Values personal space", "Gentle watchfulness"],
    shadowJp: ["取り巻きをほしがる", "共依存・同調心理", "自己否定", "寂しがり・甘え"],
    shadowEn: ["Seeks followers", "Codependency", "Self-denial", "Loneliness, neediness"],
    bodyJp: "エネルギー代謝・腎臓・耳・自律神経・子宮・男性器",
    bodyEn: "Energy metabolism · Kidneys · Ears · Autonomic nervous system",
    symptomJp: "疲れ・不眠・更年期・月経トラブル",
    symptomEn: "Fatigue · Insomnia · Menopause · Menstrual issues",
    overJp: "疲弊・環境に無理に合わせようとしている（人・もの・事・場所）",
    overEn: "Exhaustion · Forcing yourself to fit in (people, things, situations, places)",
  },
  Rai: {
    emoji: "🦎", color: "#B5E5CF", accent: "#3A9E70", soft: "#f0fff8",
    jp: "Rai（カメレオン）", en: "Rai (Chameleon)",
    traitJp: "我が道を行く・アドベンチャー・探究心が強い・危険回避",
    traitEn: "Goes own way · Adventurous · Curious · Risk-avoidant",
    lightJp: ["我が道を行く", "アドベンチャー精神", "探究心が強い", "危険回避の本能"],
    lightEn: ["Goes own way", "Adventurous spirit", "Strong curiosity", "Avoids danger instinctively"],
    shadowJp: ["同調することで戦わない", "時間・空気を読まない", "ひとりぼちになりがち"],
    shadowEn: ["Avoids conflict by conforming", "Misreads timing/atmosphere", "Tends to isolate"],
    bodyJp: "胃・腸・肝臓・膝・口・手",
    bodyEn: "Stomach · Intestines · Liver · Knees · Mouth · Hands",
    symptomJp: "むくみ",
    symptomEn: "Edema/swelling",
    overJp: "迷い・自分軸を失う・疲弊しやすい",
    overEn: "Indecision · Losing self-axis · Easy burnout",
  },
  Fo: {
    emoji: "🐺", color: "#D5C5E8", accent: "#7B5EA7", soft: "#f8f4ff",
    jp: "Fo（オオカミ）", en: "Fo (Wolf)",
    traitJp: "頭首としての家族愛・身を挺して守る愛・博愛・気品・決断",
    traitEn: "Family love as leader · Protective love · Benevolence · Dignity · Decisiveness",
    lightJp: ["頭首としての家族愛", "身を挺して守る", "博愛・気品", "決断力"],
    lightEn: ["Family love as leader", "Protects with whole self", "Benevolence & dignity", "Decisiveness"],
    shadowJp: ["戦うことで守る", "好き嫌いが激しい", "乱すことを嫌う", "主であり軸"],
    shadowEn: ["Protects by fighting", "Strong likes/dislikes", "Hates disorder", "Must be the leader"],
    bodyJp: "頭・肺・循環器・目・胆のう・神経・のど",
    bodyEn: "Head · Lungs · Circulatory · Eyes · Gallbladder · Nerves · Throat",
    symptomJp: "頭痛・めまい",
    symptomEn: "Headache · Dizziness",
    overJp: "攻撃性・孤立・休めない・戦い続ける",
    overEn: "Aggression · Isolation · Can't rest · Keeps fighting",
  },
  Pepi: {
    emoji: "🐍", color: "#FFE5B4", accent: "#E07B39", soft: "#fffaf0",
    jp: "Pepi（ヘビ）", en: "Pepi (Snake)",
    traitJp: "志を貫く・プライド・親念を持つ・品格・情熱",
    traitEn: "Stays true to purpose · Pride · Deep conviction · Character · Passion",
    lightJp: ["志を貫く", "プライド", "親念を持つ", "品格・情熱"],
    lightEn: ["Stays true to purpose", "Pride", "Deep conviction", "Character & passion"],
    shadowJp: ["執着・絡みつく", "冷酷", "自己陶酔", "神経質"],
    shadowEn: ["Attachment, clinging", "Coldness", "Self-absorption", "Nervousness"],
    bodyJp: "膀胱・尿管・肩・腰・足",
    bodyEn: "Bladder · Urinary tract · Shoulders · Lower back · Feet",
    symptomJp: "水の代謝",
    symptomEn: "Water metabolism issues",
    overJp: "執着・変化への恐れ・停滞・過去からの選択",
    overEn: "Attachment · Fear of change · Stagnation · Choosing from the past",
  },
};

// ── Full prescriptions with food/scent/touch ──────────────────
const PRESCRIPTIONS = {
  Upa: {
    balanceJp: "やさしさを保ちながら、自分の中心軸を取り戻そう",
    balanceEn: "Keep your gentleness while reclaiming your own center",
    rx: [
      {
        char: "Fo", icon: "🐺",
        titleJp: "Foの力で「できない」を言葉に",
        titleEn: "Use Fo's strength to say 'I can't'",
        bodyJp: "「できない」「しない」を声に出してみよう。自分の好きなこと・できることを知ること。カバンの中を整理して、自分の空間を取り戻そう。",
        bodyEn: "Say out loud: 'I can't' and 'I won't'. Know what you love and what you can do. Tidy your bag — reclaim your personal space.",
      },
      {
        char: "Pepi", icon: "🐍",
        titleJp: "Pepiで今の自分の気持ちを優先",
        titleEn: "Prioritize now with Pepi",
        bodyJp: "過去からの選択ではなく、今この瞬間の自分の気持ちを優先しよう。「昔からこうしてきた」を一度手放してみて。",
        bodyEn: "Not from past patterns — choose from how you feel right now. Release 'this is how I've always done it.'",
      },
      {
        char: "Rai", icon: "🦎",
        titleJp: "Raiでひとりの時間と環境を変える",
        titleEn: "Change environment with Rai",
        bodyJp: "ひとりの時間を作ろう。カフェ、図書館、トイレ、お風呂——どこでもいい。環境を変えるだけで、気持ちがリセットされる。",
        bodyEn: "Make time alone. A café, library, bathroom, bath — anywhere works. Just changing your environment resets everything.",
      },
    ],
    food: {
      jp: "鉄分・食物繊維・カカオ・フルーツ・ナッツ\n皮膚と神経を安定させる食べ物・色彩を意識して",
      en: "Iron · Dietary fiber · Cacao · Fruits · Nuts\nFoods and colors that stabilize skin & nerves",
    },
    touch: {
      jp: "柔らかい感触に触れる（ふわふわのもの、温かいもの）",
      en: "Touch soft textures — something fluffy or warm",
    },
    scent: {
      jp: "穏やかに落ち着けるハーブや香り（ラベンダー、カモミールなど）",
      en: "Calming herbs & scents (lavender, chamomile, etc.)",
    },
  },
  Rai: {
    balanceJp: "柔軟さの中に、揺れない自分の核を育てよう",
    balanceEn: "Within your flexibility, nurture an unshakeable inner core",
    rx: [
      {
        char: "Upa", icon: "🐰",
        titleJp: "Upaで今の自分を受け入れる",
        titleEn: "Accept yourself now with Upa",
        bodyJp: "今の「迷っている自分」でいい。変わらなくていい瞬間もある。自分に「よく頑張ってるね」と言ってあげよう。",
        bodyEn: "It's okay to be uncertain. Not every moment needs change. Tell yourself: 'You're doing really well.'",
      },
      {
        char: "Fo", icon: "🐺",
        titleJp: "Foで直感で一つ決める",
        titleEn: "Decide one thing by instinct with Fo",
        bodyJp: "全部を考えなくていい。今日たった一つ、直感で決めてみよう。あなたの答えはあなたの内側にある。",
        bodyEn: "You don't need to think everything through. Choose just one thing today using instinct. Your answer is inside you.",
      },
      {
        char: "Pepi", icon: "🐍",
        titleJp: "Pepiで「適応しなきゃ」を手放す",
        titleEn: "Release 'I must adapt' with Pepi",
        bodyJp: "「合わせなきゃいけない」という焦りを手放して。あなたのペースで変化は起きていい。",
        bodyEn: "Let go of the urgency to conform. Change is allowed to happen at your own pace.",
      },
    ],
    food: {
      jp: "胃腸を整える食べ物（発酵食品・温かいスープ・消化の良いもの）\n肝臓をいたわる緑黄色野菜・ブロッコリーなど",
      en: "Gut-supporting foods (fermented foods, warm soups, easily digestible)\nLiver-supporting greens like broccoli",
    },
    touch: {
      jp: "自然の中を歩く・草や土に触れる",
      en: "Walk in nature · Touch grass or soil",
    },
    scent: {
      jp: "フレッシュなハーブ（ミント、ユーカリ）で気持ちをリフレッシュ",
      en: "Fresh herbs (mint, eucalyptus) to refresh your mood",
    },
  },
  Fo: {
    balanceJp: "力強さの中に、やわらかさの余白を作ろう",
    balanceEn: "Within your strength, create space for softness",
    rx: [
      {
        char: "Upa", icon: "🐰",
        titleJp: "Upaで「何もしない」を許す",
        titleEn: "Allow 'doing nothing' with Upa",
        bodyJp: "強さは休むことも知っている。今日は「何もしない時間」を作ろう。それも勇気ある選択。柔らかいものに触れて、力を抜いて。",
        bodyEn: "True strength knows when to rest. Create 'doing nothing' time today. That too is a courageous choice.",
      },
      {
        char: "Rai", icon: "🦎",
        titleJp: "Raiで流れに乗ってみる",
        titleEn: "Go with the flow with Rai",
        bodyJp: "全部を力で解決しなくていい。流れに乗ってみる、という選択もある。柔軟さは弱さではない。",
        bodyEn: "Not everything needs to be solved by force. Sometimes flowing with it is wiser. Flexibility isn't weakness.",
      },
      {
        char: "Pepi", icon: "🐍",
        titleJp: "Pepiで「こうあるべき」を脱ぐ",
        titleEn: "Shed 'should' with Pepi",
        bodyJp: "「こうあるべき」という思いを一つ脱いでみよう。古い皮を脱ぐように、軽くなれる。",
        bodyEn: "Shed one 'should be' belief. Like a snake shedding skin, you can become lighter.",
      },
    ],
    food: {
      jp: "頭・循環器をサポート（青魚・オメガ3・ビタミンB群・深呼吸と水分補給）\n胆のうには苦味野菜（ゴーヤ・春菊）",
      en: "Support head & circulation (blue fish, omega-3, B vitamins, breathe & hydrate)\nBitter vegetables for gallbladder (bitter gourd, chrysanthemum greens)",
    },
    touch: {
      jp: "大地に足をつける・裸足で歩く・温かいお風呂でゆっくり",
      en: "Ground your feet · Walk barefoot · Long warm bath",
    },
    scent: {
      jp: "落ち着く深い香り（サンダルウッド、シダーウッド）",
      en: "Deep grounding scents (sandalwood, cedarwood)",
    },
  },
  Pepi: {
    balanceJp: "手放した後の空白を、新しいエネルギーで満たそう",
    balanceEn: "Fill the space after release with new energy",
    rx: [
      {
        char: "Rai", icon: "🦎",
        titleJp: "Raiで小さく動いてみる",
        titleEn: "Take small steps with Rai",
        bodyJp: "大きな変化でなくていい。今日できる小さな一歩を踏み出してみよう。流れは少しずつ変わる。",
        bodyEn: "No need for a big change. Take one small step today. The flow shifts gradually.",
      },
      {
        char: "Fo", icon: "🐺",
        titleJp: "Foで前に一歩踏み出す",
        titleEn: "Step forward with Fo",
        bodyJp: "手放した後は、前に進む力が必要。あなたの足で、一つ行動してみよう。内なる野生を信じて。",
        bodyEn: "After release comes action. Take one step forward on your own. Trust your inner wild.",
      },
      {
        char: "Upa", icon: "🐰",
        titleJp: "Upaで変化の途中の自分を抱きしめる",
        titleEn: "Embrace mid-change self with Upa",
        bodyJp: "変化の途中は不安なもの。今の自分を「よくやってる」と受け入れながら進もう。",
        bodyEn: "Being mid-change is unsettling. Accept where you are now and keep moving forward.",
      },
    ],
    food: {
      jp: "水の代謝を助ける（ハトムギ・利尿作用のある食材・カリウム豊富な食べ物）\n肩・腰・足には温め（生姜・シナモン・根菜類）",
      en: "Support water metabolism (job's tears, diuretic foods, potassium-rich foods)\nWarm foods for shoulders/back/feet (ginger, cinnamon, root vegetables)",
    },
    touch: {
      jp: "温める・ストレッチ・肩や腰をゆっくりほぐす",
      en: "Apply warmth · Stretch · Gently release shoulders and lower back",
    },
    scent: {
      jp: "再生・浄化の香り（ジュニパー、フランキンセンス）",
      en: "Renewal & cleansing scents (juniper, frankincense)",
    },
  },
};

// ── Feelings ──────────────────────────────────────────────────
const FEELINGS = [
  { jp: "疲弊している", en: "Exhausted", icon: "😮‍💨", char: "Upa" },
  { jp: "無理に合わせてる", en: "Forcing to fit in", icon: "😰", char: "Upa" },
  { jp: "寂しい・甘えたい", en: "Lonely, needy", icon: "💧", char: "Upa" },
  { jp: "迷っている", en: "Uncertain", icon: "🌀", char: "Rai" },
  { jp: "ひとりになりたい", en: "Want to be alone", icon: "🌿", char: "Rai" },
  { jp: "ざわざわする", en: "Restless", icon: "🌊", char: "Rai" },
  { jp: "イライラ・怒り", en: "Irritated / Angry", icon: "🔥", char: "Fo" },
  { jp: "頑張りすぎ", en: "Overdoing it", icon: "⚡", char: "Fo" },
  { jp: "休めない", en: "Can't rest", icon: "🏃", char: "Fo" },
  { jp: "執着している", en: "Attached", icon: "🌀", char: "Pepi" },
  { jp: "手放したい", en: "Want to release", icon: "🍃", char: "Pepi" },
  { jp: "変化が怖い", en: "Fear of change", icon: "😟", char: "Pepi" },
  { jp: "穏やか", en: "Calm", icon: "☀️", char: null },
  { jp: "元気", en: "Energetic", icon: "✨", char: null },
];

const BODY_AREAS = [
  { jp: "頭・めまい・頭痛", en: "Head / Dizziness / Headache", icon: "🧠", char: "Fo" },
  { jp: "目・のど", en: "Eyes / Throat", icon: "👁", char: "Fo" },
  { jp: "肺・循環器", en: "Lungs / Circulation", icon: "🫀", char: "Fo" },
  { jp: "胃・腸・肝臓", en: "Stomach / Intestines / Liver", icon: "🌀", char: "Rai" },
  { jp: "膝・手", en: "Knees / Hands", icon: "🦵", char: "Rai" },
  { jp: "むくみ", en: "Swelling / Edema", icon: "💧", char: "Rai" },
  { jp: "腎臓・耳・自律神経", en: "Kidneys / Ears / Autonomic", icon: "👂", char: "Upa" },
  { jp: "疲れ・不眠・月経", en: "Fatigue / Insomnia / Menstrual", icon: "🌙", char: "Upa" },
  { jp: "膀胱・肩・腰・足", en: "Bladder / Shoulders / Back / Feet", icon: "🦴", char: "Pepi" },
  { jp: "水の代謝・むくみ", en: "Water metabolism", icon: "🌊", char: "Pepi" },
];

// ── Diagnosis ─────────────────────────────────────────────────
function diagnose(feelings, bodyAreas, energy, thoughts) {
  const scores = { Upa: 0, Rai: 0, Fo: 0, Pepi: 0 };

  feelings.forEach(f => {
    const found = FEELINGS.find(x => x.jp === f);
    if (found?.char) scores[found.char] += 3;
  });

  bodyAreas.forEach(b => {
    const found = BODY_AREAS.find(x => x.jp === b);
    if (found?.char) scores[found.char] += 3;
  });

  if (energy <= 3) scores.Fo += 2;
  if (energy <= 4) scores.Upa += 2;

  const kw = thoughts;
  if (/疲|眠れ|不眠|無理に|合わせ|寂|甘え/.test(kw)) scores.Upa += 2;
  if (/迷|わからない|ひとり|適応|変わり/.test(kw)) scores.Rai += 2;
  if (/怒|イライラ|疲れ|しんど|頑張|辛|休め/.test(kw)) scores.Fo += 2;
  if (/手放|やめ|終わり|執着|変化|怖/.test(kw)) scores.Pepi += 2;

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const total = Object.values(scores).reduce((a,b)=>a+b,0);
  return { dominant: sorted[0][0], scores, sorted, total: total || 1 };
}

// ══════════════════════════════════════════════════════════════
// APP
// ══════════════════════════════════════════════════════════════
export default function MORYApp() {
  const [lang, setLang] = useState("jp");
  const [screen, setScreen] = useState("home");
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState(null);
  const [selFeelings, setSelFeelings] = useState([]);
  const [selBody, setSelBody] = useState([]);
  const [energy, setEnergy] = useState(5);
  const [thoughts, setThoughts] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [rxTab, setRxTab] = useState(0);
  const [rxSection, setRxSection] = useState("advice"); // advice | food | touch
  const [animIn, setAnimIn] = useState(true);

  const t = (jp, en) => lang === "jp" ? jp : en;

  const goTo = (s) => {
    setAnimIn(false);
    setTimeout(() => { setScreen(s); setAnimIn(true); }, 160);
  };

  const startMode = (m) => {
    setMode(m); setStep(0);
    setSelFeelings([]); setSelBody([]);
    setEnergy(5); setThoughts("");
    setResult(null); setRxTab(0); setRxSection("advice");
    goTo("form");
  };

  const toggle = (arr, setArr, val) =>
    setArr(p => p.includes(val) ? p.filter(x=>x!==val) : [...p, val]);

  const TOTAL = mode === "checkin" ? 3 : 4;

  const submit = () => {
    const diag = diagnose(selFeelings, selBody, energy, thoughts);
    setHistory(h => [{ date: new Date().toLocaleDateString("ja-JP"), ...diag, energy, feelings: selFeelings }, ...h].slice(0,10));
    setResult(diag);
    goTo("result");
  };

  return (
    <div style={S.shell}>
      <div style={S.blob1}/><div style={S.blob2}/><div style={S.blob3}/>

      {/* Navbar */}
      <div style={S.nav}>
        <span style={S.logo} onClick={() => goTo("home")}>MORY</span>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <button style={S.navBtn} onClick={() => goTo("history")}>{t("記録","Log")}</button>
          {["jp","en"].map(l => (
            <button key={l}
              style={{ ...S.langBtn, ...(lang===l ? S.langOn : {}) }}
              onClick={() => setLang(l)}>{l.toUpperCase()}</button>
          ))}
        </div>
      </div>

      <div style={{ ...S.content, opacity: animIn?1:0, transition:"opacity 0.16s" }}>

        {/* ══ HOME ══ */}
        {screen === "home" && (
          <div style={S.col}>
            <div style={{ textAlign:"center", marginTop:4 }}>
              <div style={S.logoLg}>MORY</div>
              <div style={S.subLg}>{t("統合バランス診断", "Integrated Balance Diagnosis")}</div>
            </div>

            <p style={S.heroTxt}>
              {t(
                "体と心のサインに耳を傾けて\n4つのキャラクターのバランスを整え\n穏やかな自分へ戻ろう。",
                "Listen to your body & mind.\nBalance your 4 inner characters\nand return to your gentle self."
              )}
            </p>

            {/* 4 chars display */}
            <div style={S.charsGrid}>
              {Object.entries(CHARS).map(([name, c]) => (
                <div key={name} style={{ ...S.charCard, background:c.soft, border:`1.5px solid ${c.color}` }}>
                  <span style={{ fontSize:28 }}>{c.emoji}</span>
                  <span style={{ fontSize:11, fontWeight:700, color:c.accent }}>{name}</span>
                  <span style={{ fontSize:9, color:"#aaa", textAlign:"center", lineHeight:1.3 }}>
                    {t(c.lightJp[0], c.lightEn[0])}
                  </span>
                </div>
              ))}
            </div>

            <button style={{ ...S.btn, background:"linear-gradient(135deg,#F9C5D1,#B5E5CF)" }}
              onClick={() => startMode("checkin")}>
              🌿 {t("毎日チェックイン", "Daily Check-in")}
            </button>
            <button style={{ ...S.btn, background:"linear-gradient(135deg,#D5C5E8,#FFE5B4)", marginTop:10 }}
              onClick={() => startMode("symptom")}>
              🔍 {t("体感・違和感から診断", "Diagnose from Symptoms")}
            </button>

            <p style={S.disc}>
              {t("※ MORYは医療診断ではありません。セルフケアのヒントとしてご利用ください。薬や治療の代わりにはなりません。",
                 "※ MORY is not medical diagnosis. Use as a self-care guide, not a substitute for treatment.")}
            </p>
          </div>
        )}

        {/* ══ FORM ══ */}
        {screen === "form" && (
          <div style={S.card}>
            <div style={S.progRow}>
              {Array.from({length:TOTAL}).map((_,i)=>(
                <div key={i} style={{ ...S.dot, background: i<=step?"#7B5EA7":"#e8e8e8" }}/>
              ))}
            </div>
            <p style={{ textAlign:"center",color:"#ccc",fontSize:11,margin:"0 0 16px" }}>
              {t(`ステップ ${step+1} / ${TOTAL}`, `Step ${step+1} / ${TOTAL}`)}
            </p>

            {/* Step 0: feelings */}
            {step===0 && <>
              <h2 style={S.qT}>{t("今、どんな気持ち・感覚？","How are you feeling right now?")}</h2>
              <p style={S.qH}>{t("当てはまるものを選んでね（複数OK）","Select all that apply")}</p>
              <div style={S.chips}>
                {FEELINGS.map(f => {
                  const on = selFeelings.includes(f.jp);
                  const c = f.char ? CHARS[f.char] : null;
                  return (
                    <button key={f.jp}
                      style={{ ...S.chip,
                        background: on ? (c?.color||"#f3eeff") : "white",
                        border: `1.5px solid ${on ? (c?.accent||"#7B5EA7") : "#eee"}`,
                        color: on ? (c?.accent||"#7B5EA7") : "#555",
                        fontWeight: on ? 700 : 400,
                      }}
                      onClick={() => toggle(selFeelings, setSelFeelings, f.jp)}>
                      {f.icon} {t(f.jp, f.en)}
                    </button>
                  );
                })}
              </div>
            </>}

            {/* Step 1: energy */}
            {step===1 && <>
              <h2 style={S.qT}>{t("今日のエネルギーは？","Your energy today?")}</h2>
              <div style={{ display:"flex", alignItems:"center", gap:12, margin:"24px 0 8px" }}>
                <span style={{ fontSize:24 }}>😴</span>
                <input type="range" min={1} max={10} value={energy}
                  onChange={e=>setEnergy(Number(e.target.value))} style={S.slider}/>
                <span style={{ fontSize:24 }}>⚡</span>
              </div>
              <div style={{ textAlign:"center", fontSize:40, fontWeight:900, color:"#7B5EA7", letterSpacing:2 }}>
                {energy}<span style={{ fontSize:18,color:"#ccc" }}>/10</span>
              </div>
              <div style={{ textAlign:"center",fontSize:13,color:"#888",marginTop:6 }}>
                {energy<=3 ? t("かなり消耗しています…","Quite depleted…")
                 : energy<=6 ? t("まあまあです","Moderate")
                 : t("エネルギーがあります！","Good energy!")}
              </div>
            </>}

            {/* Step 2 symptom: body */}
            {step===2 && mode==="symptom" && <>
              <h2 style={S.qT}>{t("どこに違和感・不快感がある？","Where do you feel discomfort?")}</h2>
              <p style={S.qH}>{t("複数選択OK","Multiple OK")}</p>
              <div style={S.chips}>
                {BODY_AREAS.map(b => {
                  const on = selBody.includes(b.jp);
                  const c = b.char ? CHARS[b.char] : null;
                  return (
                    <button key={b.jp}
                      style={{ ...S.chip,
                        background: on ? (c?.color||"#f3eeff") : "white",
                        border: `1.5px solid ${on ? (c?.accent||"#7B5EA7") : "#eee"}`,
                        color: on ? (c?.accent||"#7B5EA7") : "#555",
                        fontWeight: on ? 700 : 400,
                      }}
                      onClick={() => toggle(selBody, setSelBody, b.jp)}>
                      {b.icon} {t(b.jp, b.en)}
                    </button>
                  );
                })}
              </div>
            </>}

            {/* Last step: thoughts */}
            {((step===2 && mode==="checkin") || (step===3 && mode==="symptom")) && <>
              <h2 style={S.qT}>{t("頭の中にあること","What's on your mind?")}</h2>
              <p style={S.qH}>{t("自由に書いてみよう（任意）","Write freely (optional)")}</p>
              <textarea value={thoughts} onChange={e=>setThoughts(e.target.value)}
                placeholder={t(
                  "例：最近眠れない、仕事がしんどい、無理に合わせてる感じがする…",
                  "e.g. Can't sleep, overwhelmed, feel like I'm forcing myself to fit in…"
                )}
                style={S.textarea}/>
            </>}

            <div style={{ display:"flex", gap:10, marginTop:22 }}>
              {step>0 && <button style={S.secBtn} onClick={()=>setStep(s=>s-1)}>← {t("戻る","Back")}</button>}
              {step<TOTAL-1
                ? <button style={S.btn} onClick={()=>setStep(s=>s+1)}>{t("次へ","Next")} →</button>
                : <button style={{ ...S.btn, background:"linear-gradient(135deg,#7B5EA7,#E8849A)" }} onClick={submit}>
                    ✨ {t("診断する","Diagnose")}
                  </button>
              }
            </div>
          </div>
        )}

        {/* ══ RESULT ══ */}
        {screen==="result" && result && (() => {
          const { dominant, scores, sorted, total } = result;
          const dc = CHARS[dominant];
          const prx = PRESCRIPTIONS[dominant];
          const rxItems = prx.rx;

          return (
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>

              {/* Dominant */}
              <div style={{ ...S.card, textAlign:"center", borderTop:`4px solid ${dc.accent}` }}>
                <p style={{ color:"#bbb",fontSize:12,margin:"0 0 10px" }}>
                  {t("今、最も強く出ているキャラクター","Your dominant character right now")}
                </p>
                <div style={{ fontSize:58 }}>{dc.emoji}</div>
                <h2 style={{ color:dc.accent, margin:"8px 0 3px", fontSize:20 }}>{t(dc.jp,dc.en)}</h2>
                <p style={{ color:"#777",fontSize:12,margin:"0 0 12px",lineHeight:1.6 }}>{t(dc.traitJp,dc.traitEn)}</p>
                <div style={{ background:dc.soft, borderRadius:12, padding:"10px 14px",
                  borderLeft:`3px solid ${dc.accent}`, textAlign:"left" }}>
                  <p style={{ margin:"0 0 4px",fontSize:11,color:dc.accent,fontWeight:700 }}>
                    ⚠️ {t("強く出すぎているサイン","Signs it's too dominant")}
                  </p>
                  <p style={{ margin:0, fontSize:12, color:"#666", lineHeight:1.6 }}>
                    {t(dc.overJp, dc.overEn)}
                  </p>
                </div>
              </div>

              {/* Balance bar */}
              <div style={S.card}>
                <p style={{ fontWeight:700,color:"#555",fontSize:13,margin:"0 0 14px" }}>
                  ☯ {t("4つのバランス状態","Balance State")}
                </p>
                {sorted.map(([name,score]) => {
                  const c = CHARS[name];
                  const pct = Math.round((score/total)*100);
                  const isDom = name===dominant;
                  return (
                    <div key={name} style={{ marginBottom:12 }}>
                      <div style={{ display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4 }}>
                        <span style={{ fontWeight: isDom?700:400 }}>{c.emoji} {name}
                          <span style={{ fontSize:10,color:"#bbb",marginLeft:6 }}>
                            {t(c.lightJp[0],c.lightEn[0])}
                          </span>
                        </span>
                        <span style={{ color:isDom?c.accent:"#bbb",fontWeight:isDom?700:400 }}>
                          {pct}%{isDom ? t(" ← 優位","← dominant") : ""}
                        </span>
                      </div>
                      <div style={{ background:"#f0f0f0",borderRadius:8,height:10,overflow:"hidden" }}>
                        <div style={{
                          height:"100%", borderRadius:8, width:`${Math.max(pct,2)}%`,
                          background: isDom ? `linear-gradient(90deg,${c.color},${c.accent})` : c.color,
                          transition:"width 0.7s ease",
                        }}/>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Prescription */}
              <div style={S.card}>
                <p style={{ fontWeight:800,color:"#7B5EA7",fontSize:14,margin:"0 0 3px" }}>
                  🌿 {t("MORYバランス処方箋","MORY Balance Prescription")}
                </p>
                <p style={{ color:"#aaa",fontSize:12,margin:"0 0 14px",lineHeight:1.6 }}>
                  {t(prx.balanceJp, prx.balanceEn)}
                </p>

                {/* Section tabs */}
                <div style={{ display:"flex",gap:6,marginBottom:14 }}>
                  {[
                    { id:"advice", jp:"💬 アドバイス", en:"💬 Advice" },
                    { id:"food",   jp:"🍎 食べ物",    en:"🍎 Food" },
                    { id:"touch",  jp:"🤲 感触・香り", en:"🤲 Touch & Scent" },
                  ].map(tab => (
                    <button key={tab.id}
                      style={{
                        flex:1, padding:"8px 4px", borderRadius:10, border:"none",
                        fontSize:11, fontWeight:700, cursor:"pointer",
                        background: rxSection===tab.id ? "#7B5EA7" : "#f0f0f0",
                        color: rxSection===tab.id ? "white" : "#888",
                        transition:"all 0.15s",
                      }}
                      onClick={() => setRxSection(tab.id)}>
                      {t(tab.jp, tab.en)}
                    </button>
                  ))}
                </div>

                {rxSection==="advice" && <>
                  {/* Character tabs */}
                  <div style={{ display:"flex",gap:6,marginBottom:12,flexWrap:"wrap" }}>
                    {rxItems.map((r,i) => {
                      const rc = CHARS[r.char];
                      return (
                        <button key={i}
                          style={{
                            padding:"6px 12px", borderRadius:20, border:"none",
                            fontSize:11, cursor:"pointer", fontWeight:700,
                            background: rxTab===i ? rc.accent : rc.color,
                            color: rxTab===i ? "white" : rc.accent,
                            transition:"all 0.15s",
                          }}
                          onClick={() => setRxTab(i)}>
                          {r.icon} {r.char}
                        </button>
                      );
                    })}
                  </div>
                  {(() => {
                    const r = rxItems[rxTab];
                    const rc = CHARS[r.char];
                    return (
                      <div style={{ background:rc.color+"99", borderRadius:16,
                        padding:"16px 18px", border:`1.5px solid ${rc.accent}` }}>
                        <p style={{ margin:"0 0 8px",fontWeight:700,color:rc.accent,fontSize:14 }}>
                          {r.icon} {t(r.titleJp, r.titleEn)}
                        </p>
                        <p style={{ margin:0,color:"#444",fontSize:13,lineHeight:1.9 }}>
                          {t(r.bodyJp, r.bodyEn)}
                        </p>
                      </div>
                    );
                  })()}
                </>}

                {rxSection==="food" && (
                  <div style={{ background:dc.soft, borderRadius:16,
                    padding:"16px 18px", border:`1.5px solid ${dc.color}` }}>
                    <p style={{ margin:"0 0 8px",fontWeight:700,color:dc.accent,fontSize:13 }}>
                      🍎 {t("おすすめの食べ物・栄養","Recommended Foods & Nutrition")}
                    </p>
                    <p style={{ margin:0,color:"#444",fontSize:13,lineHeight:1.9,whiteSpace:"pre-line" }}>
                      {t(prx.food.jp, prx.food.en)}
                    </p>
                  </div>
                )}

                {rxSection==="touch" && (
                  <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                    <div style={{ background:dc.soft, borderRadius:16,
                      padding:"14px 16px", border:`1.5px solid ${dc.color}` }}>
                      <p style={{ margin:"0 0 6px",fontWeight:700,color:dc.accent,fontSize:13 }}>
                        🤲 {t("感触・触れ方","Touch & Texture")}
                      </p>
                      <p style={{ margin:0,color:"#444",fontSize:13,lineHeight:1.8 }}>
                        {t(prx.touch.jp, prx.touch.en)}
                      </p>
                    </div>
                    <div style={{ background:dc.soft, borderRadius:16,
                      padding:"14px 16px", border:`1.5px solid ${dc.color}` }}>
                      <p style={{ margin:"0 0 6px",fontWeight:700,color:dc.accent,fontSize:13 }}>
                        🌸 {t("香り・ハーブ","Scent & Herbs")}
                      </p>
                      <p style={{ margin:0,color:"#444",fontSize:13,lineHeight:1.8 }}>
                        {t(prx.scent.jp, prx.scent.en)}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Body awareness */}
              <div style={{ ...S.card, background:dc.soft }}>
                <p style={{ margin:"0 0 6px",fontSize:12,color:"#aaa" }}>
                  {t("今、意識したい体の部位","Body areas to be aware of")}
                </p>
                <p style={{ margin:"0 0 6px",fontWeight:700,color:dc.accent,fontSize:15 }}>
                  {t(dc.bodyJp, dc.bodyEn)}
                </p>
                <p style={{ margin:0,fontSize:12,color:"#888" }}>
                  {t("→ "+dc.symptomJp, "→ "+dc.symptomEn)}
                </p>
              </div>

              <p style={S.disc}>
                {t("※ セルフケアのヒントです。症状が続く場合は専門家にご相談ください。",
                   "※ Self-care hints only. Consult a professional if symptoms persist.")}
              </p>

              <div style={{ display:"flex",gap:10 }}>
                <button style={S.secBtn} onClick={() => goTo("home")}>🏠 {t("ホーム","Home")}</button>
                <button style={S.secBtn} onClick={() => goTo("history")}>📋 {t("記録","Log")}</button>
              </div>
            </div>
          );
        })()}

        {/* ══ HISTORY ══ */}
        {screen==="history" && (
          <div style={S.card}>
            <h2 style={{ ...S.qT, marginBottom:18 }}>📋 {t("記録","History")}</h2>
            {history.length===0
              ? <p style={{ color:"#ddd",textAlign:"center",marginTop:28 }}>
                  {t("まだ記録がありません","No records yet")}
                </p>
              : history.map((h,i) => {
                  const c = CHARS[h.dominant];
                  const pcts = h.sorted?.map(([name,score]) =>
                    `${name} ${Math.round((score/h.total)*100)}%`
                  ).join(" · ");
                  return (
                    <div key={i} style={{ ...S.histItem, borderLeft:`4px solid ${c.accent}` }}>
                      <div style={{ display:"flex",alignItems:"center",gap:12 }}>
                        <span style={{ fontSize:28 }}>{c.emoji}</span>
                        <div style={{ flex:1 }}>
                          <p style={{ margin:0,fontWeight:700,color:c.accent }}>{h.dominant}</p>
                          <p style={{ margin:"2px 0 0",fontSize:11,color:"#bbb" }}>{pcts}</p>
                        </div>
                        <div style={{ textAlign:"right" }}>
                          <p style={{ margin:0,fontSize:11,color:"#aaa" }}>{h.date}</p>
                          <p style={{ margin:0,fontSize:12 }}>⚡ {h.energy}/10</p>
                        </div>
                      </div>
                    </div>
                  );
                })
            }
            <button style={{ ...S.secBtn,marginTop:16,width:"100%" }} onClick={()=>goTo("home")}>
              ← {t("ホームへ","Home")}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

const S = {
  shell:{ minHeight:"100vh", background:"#FAFAF7",
    fontFamily:"'Hiragino Kaku Gothic ProN','Noto Sans JP',sans-serif",
    position:"relative", overflow:"hidden" },
  blob1:{ position:"fixed",top:-80,right:-80,width:260,height:260,borderRadius:"50%",
    background:"radial-gradient(circle,#F9C5D1,transparent 70%)",opacity:0.5,pointerEvents:"none" },
  blob2:{ position:"fixed",bottom:-80,left:-60,width:240,height:240,borderRadius:"50%",
    background:"radial-gradient(circle,#B5E5CF,transparent 70%)",opacity:0.4,pointerEvents:"none" },
  blob3:{ position:"fixed",top:"40%",left:"20%",width:180,height:180,borderRadius:"50%",
    background:"radial-gradient(circle,#D5C5E8,transparent 70%)",opacity:0.2,pointerEvents:"none" },
  nav:{ display:"flex",justifyContent:"space-between",alignItems:"center",
    padding:"13px 18px", background:"rgba(255,255,255,0.82)",
    backdropFilter:"blur(12px)", borderBottom:"1px solid rgba(0,0,0,0.05)",
    position:"sticky", top:0, zIndex:100 },
  logo:{ fontSize:22,fontWeight:900,letterSpacing:4,color:"#7B5EA7",
    cursor:"pointer",fontFamily:"'Georgia',serif" },
  navBtn:{ background:"none",border:"none",cursor:"pointer",fontSize:13,color:"#999",padding:"4px 8px" },
  langBtn:{ background:"none",border:"1.5px solid #ddd",borderRadius:20,
    padding:"3px 10px",fontSize:11,cursor:"pointer",color:"#bbb",fontWeight:700 },
  langOn:{ border:"1.5px solid #7B5EA7",color:"#7B5EA7",background:"#f3eeff" },
  content:{ maxWidth:480,margin:"0 auto",padding:"18px 14px 56px" },
  col:{ display:"flex",flexDirection:"column",alignItems:"center",gap:12 },
  logoLg:{ fontSize:46,fontWeight:900,letterSpacing:8,fontFamily:"'Georgia',serif",
    background:"linear-gradient(135deg,#E8849A,#7B5EA7,#3A9E70)",
    WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" },
  subLg:{ fontSize:12,letterSpacing:3,color:"#ccc",marginTop:2 },
  heroTxt:{ textAlign:"center",color:"#666",fontSize:13,lineHeight:1.9,
    whiteSpace:"pre-line",margin:0 },
  charsGrid:{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,width:"100%" },
  charCard:{ borderRadius:16,padding:"14px 10px",display:"flex",flexDirection:"column",
    alignItems:"center",gap:5,boxShadow:"0 2px 10px rgba(0,0,0,0.05)" },
  btn:{ width:"100%",padding:"15px 20px",borderRadius:14,border:"none",
    fontSize:14,fontWeight:700,cursor:"pointer",color:"#444",
    boxShadow:"0 4px 14px rgba(0,0,0,0.07)" },
  secBtn:{ flex:1,padding:"12px 14px",borderRadius:12,
    border:"1.5px solid #e0e0e0",fontSize:13,fontWeight:600,
    cursor:"pointer",background:"white",color:"#666" },
  card:{ background:"rgba(255,255,255,0.9)",backdropFilter:"blur(12px)",
    borderRadius:20,padding:20,boxShadow:"0 6px 24px rgba(0,0,0,0.06)" },
  progRow:{ display:"flex",gap:8,justifyContent:"center",marginBottom:8 },
  dot:{ width:10,height:10,borderRadius:"50%",transition:"background 0.3s" },
  qT:{ fontSize:16,fontWeight:800,color:"#333",margin:"0 0 6px",lineHeight:1.5 },
  qH:{ fontSize:12,color:"#bbb",margin:"0 0 14px" },
  chips:{ display:"flex",flexWrap:"wrap",gap:8 },
  chip:{ padding:"8px 13px",borderRadius:22,fontSize:13,cursor:"pointer",
    transition:"all 0.15s" },
  slider:{ flex:1,accentColor:"#7B5EA7" },
  textarea:{ width:"100%",height:110,borderRadius:12,border:"1.5px solid #eee",
    padding:13,fontSize:13,color:"#444",resize:"none",fontFamily:"inherit",
    background:"#fafaf7",outline:"none",boxSizing:"border-box",lineHeight:1.8 },
  histItem:{ background:"white",borderRadius:12,padding:"13px 15px",
    marginBottom:8,boxShadow:"0 2px 8px rgba(0,0,0,0.04)" },
  disc:{ fontSize:11,color:"#ccc",textAlign:"center",lineHeight:1.6,margin:0 },
};
