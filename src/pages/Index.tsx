import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// ── Изображения ──────────────────────────────────────────────────────────────
const IMG_AERIAL   = "https://cdn.poehali.dev/projects/c54448cf-9c30-4ea2-82e9-5b168d5a7bed/files/a04bc391-e183-4d97-9ca0-33fb9ca6851e.jpg";
const IMG_TERRACE  = "https://cdn.poehali.dev/projects/c54448cf-9c30-4ea2-82e9-5b168d5a7bed/files/ee94520e-9289-4ca3-8670-eab49dc84425.jpg";
const IMG_STREAM   = "https://cdn.poehali.dev/projects/c54448cf-9c30-4ea2-82e9-5b168d5a7bed/files/1fe30834-e60d-40d9-bf70-7b11a54c7fa6.jpg";
const IMG_PARKING  = "https://cdn.poehali.dev/projects/c54448cf-9c30-4ea2-82e9-5b168d5a7bed/files/0be8afb4-4a35-415d-ac3a-7990543356f0.jpg";
const IMG_SECTION  = "https://cdn.poehali.dev/projects/c54448cf-9c30-4ea2-82e9-5b168d5a7bed/files/8f9d1159-44c2-42c8-964b-a41e12db637c.jpg";
const IMG_INTERIOR = "https://cdn.poehali.dev/projects/c54448cf-9c30-4ea2-82e9-5b168d5a7bed/files/df4851bb-e385-45ed-8d4c-d1c1577491f3.jpg";
const IMG_PLAN     = "https://cdn.poehali.dev/projects/c54448cf-9c30-4ea2-82e9-5b168d5a7bed/files/40aecdc8-33bd-4c3b-8e86-3aaef705f892.jpg";

// ── Данные ───────────────────────────────────────────────────────────────────
const INFRA = [
  {
    icon: "Waves",
    title: "Терраса с выходом к запруде",
    desc: "У каждого дома — собственная терраса с прямым видом на запруду. Панорамное остекление, деревянный настил, зона отдыха прямо у воды.",
    img: IMG_TERRACE,
    color: "#4fc3a1",
  },
  {
    icon: "Droplets",
    title: "Ручей замкнутого цикла",
    desc: "Между домами течёт живой ручей с фильтрацией и рециркуляцией воды. Создаёт особую атмосферу и микроклимат поселка круглый год.",
    img: IMG_STREAM,
    color: "#5b9bd5",
  },
  {
    icon: "Car",
    title: "Персональная парковка",
    desc: "Перед каждым домом — собственная мощёная парковка на 2–3 автомобиля с подсветкой и удобным въездом с общей дороги.",
    img: IMG_PARKING,
    color: "#c8a84b",
  },
  {
    icon: "Lightbulb",
    title: "Ландшафтное освещение",
    desc: "Вся территория оснащена умной световой системой: подсветка дорожек, парковок, ручья и зелёных зон. Экономичные LED на таймере.",
    img: IMG_AERIAL,
    color: "#4fc3a1",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Проектирование",
    desc: "Разрабатываем план поселка с учётом рельефа, гидрологии участка и расположения каждого дома относительно запруды.",
    icon: "PenLine",
  },
  {
    num: "02",
    title: "Строительство домов",
    desc: "Дома возводятся на поверхности по монолитной технологии с гидро- и теплоизоляцией высшего класса.",
    icon: "HardHat",
  },
  {
    num: "03",
    title: "Обсыпка грунтом",
    desc: "После готовности конструкции дом обсыпается грунтом, формируется ландшафт — терраса остаётся открытой к запруде.",
    icon: "Mountain",
  },
  {
    num: "04",
    title: "Инфраструктура поселка",
    desc: "Прокладывается ручей, обустраивается запруда, монтируется освещение дорог и парковок, высаживаются растения.",
    icon: "Sprout",
  },
];

const BENEFITS = [
  { icon: "Thermometer", title: "15°C круглый год", desc: "Стабильная температура грунта обеспечивает комфорт без больших расходов на отопление и кондиционирование." },
  { icon: "Volume2",     title: "Полная тишина",     desc: "Земляной покров создаёт идеальную звукоизоляцию — снаружи не слышно ни ветра, ни соседей, ни дороги." },
  { icon: "Leaf",        title: "Живой ландшафт",    desc: "Крыша — настоящий газон. Поселок выглядит как холмистая долина, а не жилой квартал." },
  { icon: "Shield",      title: "Максимальная защита",desc: "Монолитный железобетон выдерживает любые нагрузки. Дом защищён от урагана, пожара и взлома." },
  { icon: "Zap",         title: "Экономия до 40%",   desc: "На отоплении зимой и охлаждении летом. Грунт работает как естественный термостат." },
  { icon: "Droplets",    title: "Замкнутый водный цикл", desc: "Ручей и запруда работают на рециркуляции — никаких потерь воды, очистка естественным путём." },
];

const PLOTS = [
  { area: "180 м²", land: "8 соток",  price: "от 9,2 млн ₽",  tag: "Старт продаж", gold: false },
  { area: "240 м²", land: "12 соток", price: "от 13,5 млн ₽", tag: "Популярный",   gold: true  },
  { area: "320 м²", land: "16 соток", price: "от 19,8 млн ₽", tag: "Премиум",      gold: true  },
];

const GALLERY = [IMG_AERIAL, IMG_TERRACE, IMG_STREAM, IMG_INTERIOR, IMG_PARKING, IMG_PLAN];

// ── Компонент ─────────────────────────────────────────────────────────────────
const Index = () => {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [activeInfra, setActiveInfra] = useState(0);
  const [activeStep,  setActiveStep]  = useState(0);
  const [galleryIdx,  setGalleryIdx]  = useState(0);
  const [formSent,    setFormSent]    = useState(false);
  const infraTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    infraTimer.current = setInterval(() => setActiveInfra(p => (p + 1) % INFRA.length), 4000);
    return () => { if (infraTimer.current) clearInterval(infraTimer.current); };
  }, []);

  useEffect(() => {
    const iv = setInterval(() => setActiveStep(p => (p + 1) % STEPS.length), 3000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => setGalleryIdx(p => (p + 1) % GALLERY.length), 5000);
    return () => clearInterval(iv);
  }, []);

  const switchInfra = (i: number) => {
    setActiveInfra(i);
    if (infraTimer.current) clearInterval(infraTimer.current);
    infraTimer.current = setInterval(() => setActiveInfra(p => (p + 1) % INFRA.length), 4000);
  };

  return (
    <div className="min-h-screen font-golos" style={{ background: "var(--bg-deep)", color: "var(--text-main)" }}>

      {/* ── CSS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Golos+Text:wght@400;500;600&display=swap');

        :root {
          --bg-deep:      #050809;
          --bg-card:      #0c1012;
          --bg-section:   #070b0e;
          --accent:       #4fc3a1;
          --accent2:      #c8a84b;
          --accent3:      #5b9bd5;
          --accent-dim:   rgba(79,195,161,0.10);
          --accent2-dim:  rgba(200,168,75,0.10);
          --accent3-dim:  rgba(91,155,213,0.11);
          --text-main:    #dde8e4;
          --text-muted:   #5a7a70;
          --border-line:  rgba(255,255,255,0.06);
        }

        .font-cormorant { font-family: 'Cormorant', Georgia, serif; }
        .font-golos     { font-family: 'Golos Text', system-ui, sans-serif; }

        /* ── Nav ── */
        .nav-glass {
          background: rgba(5,8,9,0.94);
          backdrop-filter: blur(28px);
          border-bottom: 1px solid var(--border-line);
        }

        /* ── Cards ── */
        .card-hover {
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid var(--border-line);
        }
        .card-hover:hover {
          transform: translateY(-6px);
          border-color: rgba(79,195,161,0.25);
          box-shadow: 0 20px 60px rgba(79,195,161,0.06);
        }

        /* ── Buttons ── */
        .btn-primary {
          background: var(--accent);
          color: #050809;
          font-weight: 600;
          border-radius: 8px;
          padding: 13px 28px;
          transition: all 0.22s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }
        .btn-primary:hover {
          background: #6dd9bc;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(79,195,161,0.28);
        }
        .btn-outline {
          border: 1px solid rgba(255,255,255,0.12);
          color: var(--text-main);
          border-radius: 8px;
          padding: 13px 28px;
          transition: all 0.22s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }
        .btn-outline:hover {
          border-color: var(--accent);
          color: var(--accent);
          box-shadow: 0 0 0 1px rgba(79,195,161,0.15);
        }
        .btn-gold {
          background: var(--accent2);
          color: #050809;
          font-weight: 600;
          border-radius: 8px;
          padding: 13px 28px;
          transition: all 0.22s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-gold:hover {
          background: #debb5e;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(200,168,75,0.28);
        }

        /* ── Tags ── */
        .tag {
          background: var(--accent-dim);
          color: var(--accent);
          border: 1px solid rgba(79,195,161,0.20);
          border-radius: 100px;
          padding: 4px 14px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .tag-gold {
          background: var(--accent2-dim);
          color: var(--accent2);
          border: 1px solid rgba(200,168,75,0.20);
          border-radius: 100px;
          padding: 4px 14px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .tag-blue {
          background: var(--accent3-dim);
          color: var(--accent3);
          border: 1px solid rgba(91,155,213,0.20);
          border-radius: 100px;
          padding: 4px 14px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        /* ── Stat numbers ── */
        .stat-num {
          font-family: 'Cormorant', serif;
          font-weight: 300;
          color: var(--accent);
          line-height: 1;
        }

        /* ── Noise overlay ── */
        .noise-overlay::after {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.25;
        }

        /* ── Animations ── */
        @keyframes fade-in-up {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .anim-1 { animation: fade-in-up 0.75s ease-out 0.05s both; }
        .anim-2 { animation: fade-in-up 0.75s ease-out 0.20s both; }
        .anim-3 { animation: fade-in-up 0.75s ease-out 0.38s both; }
        .anim-4 { animation: fade-in-up 0.75s ease-out 0.56s both; }
        .anim-5 { animation: fade-in-up 0.75s ease-out 0.74s both; }

        @keyframes float {
          0%,100% { transform:translateY(0); }
          50%      { transform:translateY(-9px); }
        }
        .float { animation: float 7s ease-in-out infinite; }

        @keyframes pulse-ring {
          0%   { transform:scale(1);   opacity:0.55; }
          100% { transform:scale(1.85);opacity:0; }
        }
        .pulse-ring { animation: pulse-ring 2.8s ease-out infinite; }

        @keyframes shimmer {
          0%   { background-position:-200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer {
          background: linear-gradient(90deg, transparent 0%, rgba(79,195,161,0.10) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmer 3.5s linear infinite;
        }

        @keyframes glow-pulse {
          0%,100% { opacity:0.5; }
          50%      { opacity:1; }
        }
        .glow-pulse { animation: glow-pulse 2.5s ease-in-out infinite; }

        @keyframes stream-flow {
          0%   { stroke-dashoffset:0; }
          100% { stroke-dashoffset:-80; }
        }
        .stream-line {
          stroke-dasharray: 10 8;
          animation: stream-flow 2s linear infinite;
        }

        @keyframes water-wave {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .water-wave { animation: water-wave 6s linear infinite; }

        /* ── Image cross-fade ── */
        .img-fade { transition: opacity 0.8s ease; }

        /* ── Infra tabs ── */
        .infra-tab { transition: all 0.25s ease; border: 1px solid var(--border-line); }
        .infra-tab:hover { border-color: rgba(79,195,161,0.3); }
        .infra-tab-active { border-color: var(--accent) !important; background: rgba(79,195,161,0.06) !important; }

        /* ── Step active ── */
        .step-active {
          border-color: rgba(79,195,161,0.45) !important;
          background: rgba(79,195,161,0.05) !important;
        }

        /* ── Form input ── */
        .form-input {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 8px;
          padding: 13px 16px;
          color: var(--text-main);
          outline: none;
          transition: border-color 0.2s;
          font-family: 'Golos Text', system-ui, sans-serif;
          font-size: 14px;
          width: 100%;
        }
        .form-input::placeholder { color: var(--text-muted); }
        .form-input:focus { border-color: var(--accent); }

        /* ── Section divider line ── */
        .section-line {
          width: 40px; height: 1px;
          background: var(--accent);
          margin-bottom: 16px;
        }

        /* ── Gallery ── */
        .gallery-thumb { transition: all 0.25s ease; border: 2px solid transparent; }
        .gallery-thumb-active { border-color: var(--accent) !important; }

        /* ── Progress bar ── */
        @keyframes progress-fill {
          from { width: 0%; }
          to   { width: 100%; }
        }
        .progress-fill { animation: progress-fill 4s linear; }

        /* ── Scrollbar hide ── */
        .scrollbar-hide::-webkit-scrollbar { display: none; }

        /* ── Land slice visual ── */
        .land-layer {
          position: relative;
          overflow: hidden;
        }

        /* ── Map placeholder ── */
        .map-placeholder {
          background: var(--bg-card);
          border: 1px solid var(--border-line);
          border-radius: 16px;
          overflow: hidden;
        }
      `}</style>

      <div className="noise-overlay" />

      {/* ══════════════════════════════════════
          НАВИГАЦИЯ
      ══════════════════════════════════════ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-glass" : ""}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Логотип */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative flex-shrink-0">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--accent)" }}>
                <Icon name="Home" size={16} color="#050809" />
              </div>
              <div className="absolute inset-0 rounded-xl pulse-ring" style={{ border: "1px solid var(--accent)" }} />
            </div>
            <div>
              <span className="font-cormorant font-semibold text-xl leading-none block" style={{ color: "var(--text-main)" }}>
                ЗемлеДом
              </span>
              <span className="text-[10px] tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
                поселок подземных домов
              </span>
            </div>
          </a>

          {/* Desktop навигация */}
          <div className="hidden md:flex items-center gap-7">
            {[
              ["Поселок",        "#village"],
              ["Инфраструктура", "#infra"],
              ["Технология",     "#tech"],
              ["Преимущества",   "#benefits"],
              ["Участки",        "#plots"],
              ["Галерея",        "#gallery"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-sm transition-colors hover:text-white"
                style={{ color: "var(--text-muted)" }}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="btn-outline text-sm py-2.5 px-5">Буклет</button>
            <button className="btn-primary text-sm py-2.5 px-5">
              <Icon name="Phone" size={14} />
              Связаться
            </button>
          </div>

          {/* Бургер */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: "var(--text-main)" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden nav-glass px-6 pb-6 pt-2 flex flex-col gap-4">
            {["Поселок", "Инфраструктура", "Технология", "Преимущества", "Участки", "Галерея"].map(item => (
              <a
                key={item}
                href="#"
                className="text-base py-1"
                style={{ color: "var(--text-muted)" }}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button className="btn-primary w-full justify-center mt-2">Связаться</button>
          </div>
        )}
      </nav>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section id="village" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Фон */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMG_AERIAL})`, filter: "brightness(0.32) saturate(1.2)" }}
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, rgba(5,8,9,0.55) 0%, rgba(5,8,9,0.15) 40%, rgba(5,8,9,0.72) 80%, rgba(5,8,9,1) 100%)"
        }} />
        {/* Сетка */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `linear-gradient(var(--border-line) 1px, transparent 1px), linear-gradient(90deg, var(--border-line) 1px, transparent 1px)`,
          backgroundSize: "100px 100px",
        }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-28 grid lg:grid-cols-2 gap-16 items-center">
          {/* Текст */}
          <div>
            <div className="anim-1 mb-6 flex gap-3 flex-wrap">
              <span className="tag">Поселок подземных домов</span>
              <span className="tag-gold">Единственный в России</span>
            </div>

            <h1
              className="font-cormorant anim-2 mb-6"
              style={{ fontSize: "clamp(38px, 5vw, 70px)", fontWeight: 300, lineHeight: 1.06, letterSpacing: "-0.01em" }}
            >
              Жить под{" "}
              <span style={{ color: "var(--accent)", fontStyle: "italic" }}>землёй</span>{" "}—<br />
              у запруды, с ручьём<br />
              <span style={{ color: "var(--accent2)", fontStyle: "italic" }}>у каждого дома.</span>
            </h1>

            <p className="anim-3 text-lg leading-relaxed mb-10 max-w-lg" style={{ color: "var(--text-muted)" }}>
              Закрытый поселок, где каждый дом вписан в рельеф. Дома строятся
              на земле и обсыпаются грунтом — создаётся искусственный холмистый
              ландшафт, а терраса с панорамным остеклением смотрит на запруду.
            </p>

            <div className="anim-4 flex flex-col sm:flex-row gap-4">
              <button className="btn-primary text-base">
                <Icon name="MapPin" size={18} />
                Посмотреть на карте
              </button>
              <button className="btn-outline text-base">
                Забронировать участок
                <Icon name="ArrowRight" size={17} />
              </button>
            </div>

            {/* Статистика */}
            <div
              className="anim-5 mt-12 pt-8 flex gap-8 flex-wrap"
              style={{ borderTop: "1px solid var(--border-line)" }}
            >
              {[
                { val: "24",     unit: "участка",          sub: "в поселке" },
                { val: "7",      unit: "свободных",        sub: "старт продаж" },
                { val: "2 км",   unit: "от города",        sub: "Московская обл." },
                { val: "40%",    unit: "экономии",         sub: "на энергии" },
              ].map(s => (
                <div key={s.val}>
                  <div className="stat-num" style={{ fontSize: "clamp(28px,3vw,40px)" }}>{s.val}</div>
                  <div className="text-sm font-medium mt-0.5">{s.unit}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Правый блок — анимированная схема разреза */}
          <div className="anim-3 float hidden lg:block">
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                border: "1px solid rgba(79,195,161,0.18)",
                background: "var(--bg-card)",
                aspectRatio: "4/3",
              }}
            >
              <img
                src={IMG_SECTION}
                alt="Разрез подземного дома"
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.75) saturate(1.1)" }}
              />
              {/* Легенда */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div
                  className="rounded-2xl p-4"
                  style={{ background: "rgba(5,8,9,0.82)", backdropFilter: "blur(12px)", border: "1px solid var(--border-line)" }}
                >
                  <div className="text-xs mb-3 font-medium" style={{ color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    Слои конструкции
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: "Газон / грунт",        color: "var(--accent)" },
                      { label: "Гидроизоляция",         color: "var(--accent2)" },
                      { label: "Монолитная плита",       color: "var(--accent3)" },
                      { label: "Жилое пространство",    color: "var(--text-main)" },
                      { label: "Терраса → Запруда",     color: "var(--accent)" },
                    ].map(l => (
                      <div key={l.label} className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: l.color }} />
                        <span className="text-xs" style={{ color: l.color }}>{l.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Скролл-индикатор */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>Скролл</span>
          <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, var(--accent), transparent)" }} />
        </div>
      </section>

      {/* ══════════════════════════════════════
          КОНЦЕПЦИЯ ПОСЕЛКА
      ══════════════════════════════════════ */}
      <section className="py-24" style={{ background: "var(--bg-section)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Текст */}
            <div>
              <div className="section-line" />
              <div className="mb-4"><span className="tag">Концепция</span></div>
              <h2
                className="font-cormorant mb-6"
                style={{ fontSize: "clamp(28px,3.6vw,50px)", fontWeight: 300, lineHeight: 1.1 }}
              >
                Дом на земле —<br />
                <span style={{ color: "var(--accent)", fontStyle: "italic" }}>невидимый снаружи</span>
              </h2>
              <div className="space-y-5 text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                <p>
                  Наш подход отличается от классического подземного строительства:
                  дома возводятся <span style={{ color: "var(--text-main)" }}>на поверхности</span>,
                  по проверенной монолитной технологии, с полноценной гидроизоляцией и теплоизоляцией.
                </p>
                <p>
                  После завершения строительства конструкция обсыпается грунтом,
                  формируя <span style={{ color: "var(--text-main)" }}>искусственный холмистый рельеф</span>.
                  Снаружи — зелёные холмы. Внутри — просторный современный дом.
                </p>
                <p>
                  Терраса каждого дома остаётся открытой и смотрит на
                  <span style={{ color: "var(--accent)" }}> персональную запруду</span>.
                  Соседи не видят окон друг друга — поселок спроектирован так,
                  что приватность абсолютна.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: "Eye",      title: "Нет контакта окнами", desc: "Дома не смотрят друг на друга" },
                  { icon: "Trees",    title: "Живой ландшафт",       desc: "Искусственные холмы и газон" },
                  { icon: "Droplets", title: "Запруда у каждого",   desc: "Индивидуальный выход к воде" },
                  { icon: "Lightbulb","title": "Умное освещение",    desc: "LED-подсветка всей территории" },
                ].map((f, i) => (
                  <div
                    key={i}
                    className="card-hover rounded-xl p-4"
                    style={{ background: "var(--bg-card)" }}
                  >
                    <Icon name={f.icon} size={18} color="var(--accent)" />
                    <div className="text-sm font-medium mt-2 mb-1">{f.title}</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Изображение + план */}
            <div className="space-y-4">
              <div
                className="rounded-3xl overflow-hidden"
                style={{ border: "1px solid var(--border-line)", aspectRatio: "16/10" }}
              >
                <img
                  src={IMG_INTERIOR}
                  alt="Интерьер подземного дома"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ border: "1px solid var(--border-line)", aspectRatio: "4/3" }}
                >
                  <img src={IMG_TERRACE} alt="Терраса" className="w-full h-full object-cover" />
                </div>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ border: "1px solid var(--border-line)", aspectRatio: "4/3" }}
                >
                  <img src={IMG_PLAN} alt="Генплан" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ИНФРАСТРУКТУРА
      ══════════════════════════════════════ */}
      <section id="infra" className="py-24" style={{ background: "var(--bg-deep)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="section-line mx-auto" />
            <div className="mb-4"><span className="tag">Инфраструктура</span></div>
            <h2
              className="font-cormorant"
              style={{ fontSize: "clamp(28px,3.6vw,52px)", fontWeight: 300, lineHeight: 1.1 }}
            >
              Поселок как единая<br />
              <span style={{ color: "var(--accent)", fontStyle: "italic" }}>экосистема</span>
            </h2>
          </div>

          {/* Большой переключаемый блок */}
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Вкладки */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              {INFRA.map((item, i) => (
                <button
                  key={i}
                  onClick={() => switchInfra(i)}
                  className={`infra-tab rounded-2xl p-5 text-left ${activeInfra === i ? "infra-tab-active" : ""}`}
                  style={{ background: "var(--bg-card)" }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        background: activeInfra === i ? "rgba(79,195,161,0.14)" : "rgba(255,255,255,0.04)",
                      }}
                    >
                      <Icon
                        name={item.icon}
                        size={18}
                        color={activeInfra === i ? item.color : "var(--text-muted)"}
                      />
                    </div>
                    <div>
                      <div
                        className="text-sm font-medium mb-1"
                        style={{ color: activeInfra === i ? "var(--text-main)" : "var(--text-muted)" }}
                      >
                        {item.title}
                      </div>
                      {activeInfra === i && (
                        <div className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                          {item.desc}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Прогресс-бар */}
                  {activeInfra === i && (
                    <div className="mt-3 h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <div className="progress-fill h-full rounded-full" style={{ background: item.color }} />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Картинка */}
            <div className="lg:col-span-3 relative rounded-3xl overflow-hidden" style={{
              minHeight: 360,
              border: "1px solid var(--border-line)",
            }}>
              {INFRA.map((item, i) => (
                <img
                  key={i}
                  src={item.img}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover img-fade"
                  style={{ opacity: activeInfra === i ? 1 : 0 }}
                />
              ))}
              {/* Overlay */}
              <div className="absolute inset-0" style={{
                background: "linear-gradient(to top, rgba(5,8,9,0.8) 0%, transparent 55%)",
              }} />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-xs mb-1 font-medium uppercase tracking-widest" style={{ color: INFRA[activeInfra].color }}>
                  {INFRA[activeInfra].title}
                </div>
                <p className="text-sm leading-relaxed max-w-sm" style={{ color: "rgba(221,232,228,0.75)" }}>
                  {INFRA[activeInfra].desc}
                </p>
              </div>
              {/* Dots */}
              <div className="absolute top-4 right-4 flex gap-2">
                {INFRA.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => switchInfra(i)}
                    className="rounded-full transition-all"
                    style={{
                      width: activeInfra === i ? 20 : 6,
                      height: 6,
                      background: activeInfra === i ? "var(--accent)" : "rgba(255,255,255,0.25)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Ручей — отдельный акцент */}
          <div
            className="mt-8 rounded-3xl overflow-hidden relative"
            style={{ background: "var(--bg-card)", border: "1px solid rgba(91,155,213,0.15)" }}
          >
            <div className="shimmer absolute inset-0" style={{
              background: "linear-gradient(90deg, transparent, rgba(91,155,213,0.06), transparent)",
            }} />
            <div className="relative z-10 p-8 grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <div className="tag-blue inline-block mb-4">Искусственный ручей</div>
                <h3
                  className="font-cormorant mb-3"
                  style={{ fontSize: "clamp(22px,2.5vw,36px)", fontWeight: 300, lineHeight: 1.1 }}
                >
                  Замкнутый водный цикл<br />
                  <span style={{ color: "var(--accent3)", fontStyle: "italic" }}>между домами</span>
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  Ручей проходит между участками по всему поселку. Система рециркуляции и биофильтрации
                  очищает воду естественным путём. Уровень воды и скорость течения регулируются автоматически.
                  Зимой ручей не замерзает — система обогрева русла встроена в насосную станцию.
                </p>
              </div>
              <div className="flex justify-center">
                {/* SVG анимация ручья */}
                <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Дома */}
                  <rect x="10" y="20" width="50" height="35" rx="4" fill="#0c1012" stroke="rgba(79,195,161,0.3)" strokeWidth="1"/>
                  <rect x="15" y="25" width="40" height="20" rx="2" fill="rgba(79,195,161,0.07)"/>
                  <text x="35" y="41" textAnchor="middle" fill="rgba(79,195,161,0.5)" fontSize="8">Дом</text>
                  <rect x="140" y="20" width="50" height="35" rx="4" fill="#0c1012" stroke="rgba(79,195,161,0.3)" strokeWidth="1"/>
                  <rect x="145" y="25" width="40" height="20" rx="2" fill="rgba(79,195,161,0.07)"/>
                  <text x="165" y="41" textAnchor="middle" fill="rgba(79,195,161,0.5)" fontSize="8">Дом</text>
                  <rect x="10" y="105" width="50" height="35" rx="4" fill="#0c1012" stroke="rgba(79,195,161,0.3)" strokeWidth="1"/>
                  <rect x="15" y="110" width="40" height="20" rx="2" fill="rgba(79,195,161,0.07)"/>
                  <text x="35" y="126" textAnchor="middle" fill="rgba(79,195,161,0.5)" fontSize="8">Дом</text>
                  <rect x="140" y="105" width="50" height="35" rx="4" fill="#0c1012" stroke="rgba(79,195,161,0.3)" strokeWidth="1"/>
                  <rect x="145" y="110" width="40" height="20" rx="2" fill="rgba(79,195,161,0.07)"/>
                  <text x="165" y="126" textAnchor="middle" fill="rgba(79,195,161,0.5)" fontSize="8">Дом</text>

                  {/* Ручей — горизонтальный верх */}
                  <path d="M60 37 Q100 30 140 37" stroke="rgba(91,155,213,0.6)" strokeWidth="3" fill="none" className="stream-line"/>
                  {/* Ручей — правый вертикаль */}
                  <path d="M165 55 Q172 80 165 105" stroke="rgba(91,155,213,0.6)" strokeWidth="3" fill="none" className="stream-line"/>
                  {/* Ручей — горизонтальный низ */}
                  <path d="M60 122 Q100 130 140 122" stroke="rgba(91,155,213,0.6)" strokeWidth="3" fill="none" className="stream-line"/>
                  {/* Ручей — левый вертикаль */}
                  <path d="M35 55 Q28 80 35 105" stroke="rgba(91,155,213,0.6)" strokeWidth="3" fill="none" className="stream-line"/>

                  {/* Насосная станция */}
                  <circle cx="100" cy="80" r="14" fill="rgba(91,155,213,0.1)" stroke="rgba(91,155,213,0.4)" strokeWidth="1.5"/>
                  <circle cx="100" cy="80" r="7" fill="rgba(91,155,213,0.2)" className="glow-pulse"/>
                  <text x="100" y="84" textAnchor="middle" fill="rgba(91,155,213,0.8)" fontSize="7">насос</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ТЕХНОЛОГИЯ
      ══════════════════════════════════════ */}
      <section id="tech" className="py-24" style={{ background: "var(--bg-section)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Шаги */}
            <div>
              <div className="section-line" />
              <div className="mb-4"><span className="tag">Технология</span></div>
              <h2
                className="font-cormorant mb-10"
                style={{ fontSize: "clamp(28px,3.6vw,50px)", fontWeight: 300, lineHeight: 1.1 }}
              >
                Как строится<br />
                <span style={{ color: "var(--accent)", fontStyle: "italic" }}>подземный дом</span>
              </h2>

              <div className="flex flex-col gap-4">
                {STEPS.map((s, i) => (
                  <div
                    key={i}
                    className={`step-item rounded-2xl p-5 transition-all duration-300 card-hover ${activeStep === i ? "step-active" : ""}`}
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border-line)" }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: activeStep === i ? "rgba(79,195,161,0.12)" : "rgba(255,255,255,0.03)",
                        }}
                      >
                        <Icon
                          name={s.icon}
                          size={18}
                          color={activeStep === i ? "var(--accent)" : "var(--text-muted)"}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1.5">
                          <span
                            className="font-cormorant text-2xl"
                            style={{ color: activeStep === i ? "var(--accent)" : "var(--border-line)", fontWeight: 300 }}
                          >
                            {s.num}
                          </span>
                          <span
                            className="text-sm font-medium"
                            style={{ color: activeStep === i ? "var(--text-main)" : "var(--text-muted)" }}
                          >
                            {s.title}
                          </span>
                        </div>
                        {activeStep === i && (
                          <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                            {s.desc}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Визуальная схема разреза */}
            <div>
              <div
                className="rounded-3xl overflow-hidden mb-4"
                style={{ border: "1px solid var(--border-line)", aspectRatio: "4/3" }}
              >
                <img
                  src={IMG_SECTION}
                  alt="Схема конструкции"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Технические характеристики */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "Layers",       title: "Монолит 250 мм",      sub: "толщина стен" },
                  { icon: "Droplets",     title: "Гидроизоляция 3 слоя",sub: "надёжная защита" },
                  { icon: "Wind",         title: "Вентиляция с рекуп.",  sub: "КПД 80%+" },
                  { icon: "Thermometer",  title: "Теплоизоляция 200 мм", sub: "PIR-плиты" },
                  { icon: "Zap",          title: "А++ энергокласс",      sub: "сертификат" },
                  { icon: "Clock",        title: "Гарантия 50 лет",      sub: "на конструкцию" },
                ].map((t, i) => (
                  <div
                    key={i}
                    className="card-hover rounded-xl p-4 flex items-start gap-3"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border-line)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "var(--accent-dim)" }}
                    >
                      <Icon name={t.icon} size={14} color="var(--accent)" />
                    </div>
                    <div>
                      <div className="text-xs font-medium">{t.title}</div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>{t.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ПРЕИМУЩЕСТВА
      ══════════════════════════════════════ */}
      <section id="benefits" className="py-24" style={{ background: "var(--bg-deep)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="section-line mx-auto" />
            <div className="mb-4"><span className="tag">Почему подземный дом</span></div>
            <h2
              className="font-cormorant"
              style={{ fontSize: "clamp(28px,3.6vw,52px)", fontWeight: 300, lineHeight: 1.1 }}
            >
              6 причин, которые изменят<br />
              <span style={{ color: "var(--accent)", fontStyle: "italic" }}>ваше понимание жилья</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {BENEFITS.map((b, i) => (
              <div
                key={i}
                className="card-hover rounded-2xl p-6"
                style={{ background: "var(--bg-card)" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "var(--accent-dim)" }}
                >
                  <Icon name={b.icon} size={20} color="var(--accent)" />
                </div>
                <h3 className="font-medium text-base mb-2">{b.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{b.desc}</p>
              </div>
            ))}
          </div>

          {/* Большая цитата */}
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{ border: "1px solid rgba(79,195,161,0.12)", background: "var(--bg-card)" }}
          >
            <div className="shimmer absolute inset-0 opacity-50" />
            <div className="relative z-10 p-10 text-center">
              <Icon name="Quote" size={28} color="rgba(79,195,161,0.3)" />
              <p
                className="font-cormorant italic mt-4 max-w-2xl mx-auto"
                style={{ fontSize: "clamp(20px,2.8vw,36px)", fontWeight: 300, lineHeight: 1.35, color: "var(--text-main)" }}
              >
                «Дом под землёй — это не бункер. Это{" "}
                <span style={{ color: "var(--accent)" }}>терраса у воды</span>,
                живой ручей у калитки и{" "}
                <span style={{ color: "var(--accent2)" }}>15°C без отопления</span>.»
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ГАЛЕРЕЯ
      ══════════════════════════════════════ */}
      <section id="gallery" className="py-24" style={{ background: "var(--bg-section)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10">
            <div className="section-line" />
            <div className="mb-4"><span className="tag">Галерея</span></div>
            <h2
              className="font-cormorant"
              style={{ fontSize: "clamp(28px,3.6vw,52px)", fontWeight: 300, lineHeight: 1.1 }}
            >
              Визуализация<br />
              <span style={{ color: "var(--accent)", fontStyle: "italic" }}>поселка</span>
            </h2>
          </div>

          {/* Главное фото */}
          <div
            className="relative rounded-3xl overflow-hidden mb-4"
            style={{ border: "1px solid var(--border-line)", aspectRatio: "16/8" }}
          >
            {GALLERY.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Фото ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover img-fade"
                style={{ opacity: galleryIdx === i ? 1 : 0 }}
              />
            ))}
            {/* Навигация галереи */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(5,8,9,0.7)", border: "1px solid var(--border-line)" }}
              onClick={() => setGalleryIdx(p => (p - 1 + GALLERY.length) % GALLERY.length)}
            >
              <Icon name="ChevronLeft" size={18} color="var(--text-main)" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(5,8,9,0.7)", border: "1px solid var(--border-line)" }}
              onClick={() => setGalleryIdx(p => (p + 1) % GALLERY.length)}
            >
              <Icon name="ChevronRight" size={18} color="var(--text-main)" />
            </button>
            {/* Счётчик */}
            <div
              className="absolute bottom-4 right-4 text-xs px-3 py-1.5 rounded-full"
              style={{ background: "rgba(5,8,9,0.75)", color: "var(--text-muted)", backdropFilter: "blur(8px)" }}
            >
              {galleryIdx + 1} / {GALLERY.length}
            </div>
          </div>

          {/* Превью */}
          <div className="grid grid-cols-6 gap-3">
            {GALLERY.map((src, i) => (
              <button
                key={i}
                onClick={() => setGalleryIdx(i)}
                className={`gallery-thumb rounded-xl overflow-hidden ${galleryIdx === i ? "gallery-thumb-active" : ""}`}
                style={{ aspectRatio: "4/3" }}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          УЧАСТКИ
      ══════════════════════════════════════ */}
      <section id="plots" className="py-24" style={{ background: "var(--bg-deep)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <div className="section-line" />
            <div className="mb-4"><span className="tag">Выбрать участок</span></div>
            <h2
              className="font-cormorant"
              style={{ fontSize: "clamp(28px,3.6vw,52px)", fontWeight: 300, lineHeight: 1.1 }}
            >
              Три формата.<br />
              <span style={{ color: "var(--accent)", fontStyle: "italic" }}>Один поселок.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PLOTS.map((p, i) => (
              <div
                key={i}
                className="card-hover rounded-3xl overflow-hidden flex flex-col"
                style={{
                  background: "var(--bg-card)",
                  border: i === 1 ? "1px solid rgba(200,168,75,0.35)" : "1px solid var(--border-line)",
                  boxShadow: i === 1 ? "0 0 40px rgba(200,168,75,0.04)" : "none",
                }}
              >
                {/* Шапка */}
                <div className="p-6 pb-0 flex items-center justify-between">
                  <span className={p.gold ? "tag-gold" : "tag"} style={{ fontSize: 11 }}>{p.tag}</span>
                  {i === 1 && (
                    <div
                      className="w-2 h-2 rounded-full glow-pulse"
                      style={{ background: "var(--accent2)", boxShadow: "0 0 8px var(--accent2)" }}
                    />
                  )}
                </div>

                {/* Площадь */}
                <div className="p-6">
                  <div className="stat-num mb-1" style={{ fontSize: "clamp(34px,4vw,50px)" }}>{p.area}</div>
                  <div className="text-sm" style={{ color: "var(--text-muted)" }}>жилая площадь</div>
                </div>

                {/* Фичи */}
                <div className="px-6 pb-4 flex-1">
                  <div className="flex flex-col gap-3">
                    {[
                      { icon: "Map",        label: p.land + " земельный участок" },
                      { icon: "Waves",      label: "Терраса с видом на запруду" },
                      { icon: "Droplets",   label: "Ручей на границе участка" },
                      { icon: "Car",        label: "Парковка на 2–3 машины" },
                      { icon: "Lightbulb",  label: "Ландшафтное освещение" },
                      { icon: "Eye",        label: "Приватность: нет контакта окнами" },
                    ].map(f => (
                      <div key={f.label} className="flex items-center gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
                        <Icon name={f.icon} size={13} color="var(--accent)" />
                        {f.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Цена и кнопка */}
                <div className="p-6 pt-0">
                  <div className="mb-4 pt-4" style={{ borderTop: "1px solid var(--border-line)" }}>
                    <div className="stat-num" style={{ fontSize: 26 }}>{p.price}</div>
                  </div>
                  <button
                    className={i === 1 ? "btn-gold w-full justify-center" : "btn-outline w-full justify-center"}
                  >
                    {i === 1 ? "Забронировать" : "Узнать подробнее"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Генплан */}
          <div
            className="mt-10 rounded-3xl overflow-hidden relative"
            style={{ border: "1px solid var(--border-line)", aspectRatio: "21/9" }}
          >
            <img src={IMG_PLAN} alt="Генплан поселка" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{
              background: "linear-gradient(to right, rgba(5,8,9,0.85) 0%, rgba(5,8,9,0.2) 60%)",
            }} />
            <div className="absolute left-0 top-0 bottom-0 flex items-center p-10">
              <div>
                <div className="tag mb-4">Генеральный план</div>
                <h3
                  className="font-cormorant mb-2"
                  style={{ fontSize: "clamp(22px,2.5vw,38px)", fontWeight: 300, lineHeight: 1.1 }}
                >
                  24 участка вокруг<br />
                  <span style={{ color: "var(--accent)", fontStyle: "italic" }}>центральной запруды</span>
                </h3>
                <p className="text-sm max-w-xs" style={{ color: "var(--text-muted)" }}>
                  Все дома ориентированы террасами к воде. Ни один дом не смотрит окнами на соседа.
                </p>
                <button className="btn-outline mt-5 text-sm">
                  <Icon name="Expand" size={14} />
                  Смотреть план
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ФОРМА / CTA
      ══════════════════════════════════════ */}
      <section id="contact" className="py-24 relative overflow-hidden" style={{ background: "var(--bg-section)" }}>
        {/* Фоновое свечение */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ width: 700, height: 400, background: "var(--accent)", opacity: 0.04, filter: "blur(120px)" }}
        />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Текст */}
            <div>
              <div className="section-line" />
              <div className="mb-4"><span className="tag">Старт продаж</span></div>
              <h2
                className="font-cormorant mb-5"
                style={{ fontSize: "clamp(28px,3.8vw,54px)", fontWeight: 300, lineHeight: 1.08 }}
              >
                Осталось{" "}
                <span style={{ color: "var(--accent)", fontStyle: "italic" }}>7 участков</span>{" "}
                по<br />стартовой цене
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
                Оставьте заявку — мы покажем генплан поселка, расскажем про расположение
                каждого участка относительно запруды и ответим на все вопросы.
              </p>

              {/* Контакты */}
              <div className="space-y-3">
                {[
                  { icon: "Phone",  text: "+7 800 555-00-00",    label: "Звонок бесплатный" },
                  { icon: "Mail",   text: "info@zemlandom.ru",   label: "Почта" },
                  { icon: "MapPin", text: "Московская область",  label: "Расположение" },
                ].map(c => (
                  <div key={c.text} className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "var(--accent-dim)" }}
                    >
                      <Icon name={c.icon} size={15} color="var(--accent)" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{c.text}</div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>{c.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Соцсети */}
              <div className="mt-8 flex gap-3">
                {[
                  { icon: "MessageCircle", label: "Telegram" },
                  { icon: "Phone",         label: "WhatsApp" },
                  { icon: "Play",          label: "YouTube" },
                ].map(s => (
                  <button
                    key={s.label}
                    className="flex items-center gap-2 text-xs py-2 px-4 rounded-xl transition-all"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border-line)", color: "var(--text-muted)" }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(79,195,161,0.35)";
                      (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-line)";
                      (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
                    }}
                  >
                    <Icon name={s.icon} size={13} />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Форма */}
            <div
              className="rounded-3xl p-8"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-line)" }}
            >
              {formSent ? (
                <div className="text-center py-8">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "var(--accent-dim)" }}
                  >
                    <Icon name="Check" size={28} color="var(--accent)" />
                  </div>
                  <h3 className="font-cormorant text-2xl mb-2" style={{ fontWeight: 300 }}>Заявка отправлена!</h3>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Мы свяжемся с вами в течение рабочего дня.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="font-cormorant text-2xl mb-1" style={{ fontWeight: 300 }}>Оставить заявку</h3>
                  <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
                    Бесплатная консультация + буклет с генпланом
                  </p>

                  <div className="space-y-3">
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Ваше имя"
                    />
                    <input
                      className="form-input"
                      type="tel"
                      placeholder="Телефон"
                    />
                    <input
                      className="form-input"
                      type="email"
                      placeholder="Email (необязательно)"
                    />
                    <select className="form-input" defaultValue="">
                      <option value="" disabled>Интересует участок...</option>
                      <option value="180">180 м² — от 9,2 млн ₽</option>
                      <option value="240">240 м² — от 13,5 млн ₽</option>
                      <option value="320">320 м² — от 19,8 млн ₽</option>
                      <option value="other">Просто узнать подробнее</option>
                    </select>
                    <textarea
                      className="form-input"
                      placeholder="Вопрос или комментарий"
                      rows={3}
                      style={{ resize: "none" }}
                    />
                  </div>

                  <button
                    className="btn-primary w-full justify-center mt-5 text-base"
                    onClick={() => setFormSent(true)}
                  >
                    <Icon name="Send" size={16} />
                    Отправить заявку
                  </button>
                  <p className="text-xs text-center mt-3" style={{ color: "var(--text-muted)" }}>
                    Нажимая «Отправить», вы соглашаетесь с политикой конфиденциальности
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ФУТЕР
      ══════════════════════════════════════ */}
      <footer className="py-12" style={{ background: "var(--bg-deep)", borderTop: "1px solid var(--border-line)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
            {/* Логотип */}
            <a href="#" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--accent)" }}>
                <Icon name="Home" size={16} color="#050809" />
              </div>
              <div>
                <span className="font-cormorant font-semibold text-xl leading-none block" style={{ color: "var(--text-main)" }}>
                  ЗемлеДом
                </span>
                <span className="text-[10px] tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
                  поселок подземных домов
                </span>
              </div>
            </a>

            {/* Навигация */}
            <div className="flex flex-wrap gap-6">
              {["Поселок", "Инфраструктура", "Технология", "Преимущества", "Участки", "Галерея"].map(item => (
                <a
                  key={item}
                  href="#"
                  className="text-sm transition-colors hover:text-white"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div
            className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderTop: "1px solid var(--border-line)" }}
          >
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              © 2025 ЗемлеДом. Все права защищены.
            </p>
            <div className="flex gap-5">
              {["Политика конфиденциальности", "Договор оферты"].map(l => (
                <a
                  key={l}
                  href="#"
                  className="text-xs transition-colors hover:text-white"
                  style={{ color: "var(--text-muted)" }}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;
