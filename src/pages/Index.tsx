import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMG_AERIAL = "https://cdn.poehali.dev/projects/c54448cf-9c30-4ea2-82e9-5b168d5a7bed/files/6f1fa707-c85d-422e-8e67-0e36d96d6b34.jpg";
const IMG_TERRACE = "https://cdn.poehali.dev/projects/c54448cf-9c30-4ea2-82e9-5b168d5a7bed/files/4f2ae72a-c457-4a47-98e8-47d1880bc610.jpg";
const IMG_STREAM = "https://cdn.poehali.dev/projects/c54448cf-9c30-4ea2-82e9-5b168d5a7bed/files/dd966cbd-81fc-4f3d-b836-240577f3581d.jpg";
const IMG_PARKING = "https://cdn.poehali.dev/projects/c54448cf-9c30-4ea2-82e9-5b168d5a7bed/files/1618b1fd-d3a1-457f-a487-c33f6b629b5f.jpg";
const IMG_SECTION = "https://cdn.poehali.dev/projects/c54448cf-9c30-4ea2-82e9-5b168d5a7bed/files/a3aeaba0-21ac-472e-8286-2761731389bf.jpg";
const IMG_POND = "https://cdn.poehali.dev/projects/c54448cf-9c30-4ea2-82e9-5b168d5a7bed/files/3e53e7d8-55bd-4558-9682-b1ad66bc5fc5.jpg";

const INFRA = [
  {
    icon: "Waves",
    title: "Терраса с выходом к запруде",
    desc: "У каждого дома — собственная терраса с прямым видом на запруду. Панорамное остекление, деревянный настил, зона отдыха прямо у воды.",
    img: IMG_TERRACE,
  },
  {
    icon: "Droplets",
    title: "Искусственный ручей замкнутого цикла",
    desc: "Между домами течёт живой ручей с фильтрацией и рециркуляцией воды. Создаёт особую атмосферу и микроклимат поселка круглый год.",
    img: IMG_STREAM,
  },
  {
    icon: "Car",
    title: "Персональная парковочная площадка",
    desc: "Перед каждым домом — собственная мощёная парковка на 2–3 автомобиля с подсветкой и удобным въездом с общей дороги.",
    img: IMG_PARKING,
  },
  {
    icon: "Lightbulb",
    title: "Ландшафтное освещение",
    desc: "Вся территория оснащена умной световой системой: подсветка дорожек, парковок, ручья и зелёных зон. Экономичные LED-светильники на таймере.",
    img: IMG_AERIAL,
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
    desc: "После готовности конструкции дом обсыпается грунтом, формируется ландшафт, терраса остаётся открытой.",
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
  { icon: "Volume2", title: "Полная тишина", desc: "Земляной покров создаёт идеальную звукоизоляцию — снаружи не слышно ни ветра, ни соседей, ни дороги." },
  { icon: "Leaf", title: "Живой ландшафт сверху", desc: "Крыша — это настоящий газон или сад. Поселок выглядит как холмистая долина, а не жилой квартал." },
  { icon: "Shield", title: "Максимальная безопасность", desc: "Стены из монолитного железобетона выдерживают любые нагрузки. Дом защищён от урагана, пожара и взлома." },
  { icon: "Zap", title: "Экономия до 40%", desc: "На отоплении зимой и охлаждении летом. Грунт работает как естественный термостат." },
  { icon: "Droplets", title: "Замкнутый водный цикл", desc: "Ручей и запруда работают на рециркуляции — никаких потерь воды, очистка происходит естественным путём." },
];

const PLOTS = [
  { area: "180 м²", land: "8 соток", price: "от 9,2 млн ₽", tag: "Старт продаж", tagColor: "accent" },
  { area: "240 м²", land: "12 соток", price: "от 13,5 млн ₽", tag: "Популярный", tagColor: "gold" },
  { area: "320 м²", land: "16 соток", price: "от 19,8 млн ₽", tag: "Премиум", tagColor: "gold" },
];

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeInfra, setActiveInfra] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const infraRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    infraRef.current = setInterval(() => {
      setActiveInfra((prev) => (prev + 1) % INFRA.length);
    }, 3500);
    return () => { if (infraRef.current) clearInterval(infraRef.current); };
  }, []);

  useEffect(() => {
    const iv = setInterval(() => setActiveStep((p) => (p + 1) % STEPS.length), 2800);
    return () => clearInterval(iv);
  }, []);

  const handleInfraClick = (i: number) => {
    setActiveInfra(i);
    if (infraRef.current) clearInterval(infraRef.current);
    infraRef.current = setInterval(() => {
      setActiveInfra((prev) => (prev + 1) % INFRA.length);
    }, 3500);
  };

  return (
    <div className="min-h-screen font-golos" style={{ background: "var(--bg-deep)", color: "var(--text-main)" }}>

      {/* ── CSS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Golos+Text:wght@400;500;600&display=swap');

        :root {
          --bg-deep:    #06090a;
          --bg-card:    #0d1214;
          --bg-glass:   rgba(6,9,10,0.80);
          --accent:     #4fc3a1;
          --accent2:    #c8a84b;
          --accent3:    #5b9bd5;
          --accent-dim: rgba(79,195,161,0.11);
          --accent2-dim:rgba(200,168,75,0.10);
          --accent3-dim:rgba(91,155,213,0.12);
          --text-main:  #e8eeec;
          --text-muted: #6a8278;
          --border-line:rgba(255,255,255,0.07);
        }

        .font-cormorant { font-family: 'Cormorant', Georgia, serif; }
        .font-golos     { font-family: 'Golos Text', system-ui, sans-serif; }

        .nav-glass {
          background: rgba(6,9,10,0.92);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid var(--border-line);
        }

        .card-hover {
          transition: transform 0.32s ease, border-color 0.32s ease, box-shadow 0.32s ease;
          border: 1px solid var(--border-line);
        }
        .card-hover:hover {
          transform: translateY(-5px);
          border-color: rgba(79,195,161,0.28);
          box-shadow: 0 18px 56px rgba(79,195,161,0.07);
        }

        .btn-primary {
          background: var(--accent);
          color: #06090a;
          font-weight: 600;
          border-radius: 6px;
          padding: 14px 32px;
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-primary:hover {
          background: #6dd9bc;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(79,195,161,0.3);
        }

        .btn-outline {
          border: 1px solid rgba(255,255,255,0.15);
          color: var(--text-main);
          border-radius: 6px;
          padding: 14px 32px;
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-outline:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        .stat-num {
          font-family: 'Cormorant', serif;
          font-weight: 300;
          color: var(--accent);
          line-height: 1;
        }

        .tag {
          background: var(--accent-dim);
          color: var(--accent);
          border: 1px solid rgba(79,195,161,0.22);
          border-radius: 100px;
          padding: 4px 14px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.04em;
        }

        .tag-gold {
          background: var(--accent2-dim);
          color: var(--accent2);
          border: 1px solid rgba(200,168,75,0.22);
          border-radius: 100px;
          padding: 4px 14px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.04em;
        }

        .noise-overlay::after {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.3;
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-1 { animation: fade-in-up 0.7s ease-out 0.1s both; }
        .anim-2 { animation: fade-in-up 0.7s ease-out 0.3s both; }
        .anim-3 { animation: fade-in-up 0.7s ease-out 0.5s both; }
        .anim-4 { animation: fade-in-up 0.7s ease-out 0.7s both; }
        .anim-5 { animation: fade-in-up 0.7s ease-out 0.9s both; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-10px); }
        }
        .float { animation: float 7s ease-in-out infinite; }

        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.5; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        .pulse-ring { animation: pulse-ring 2.8s ease-out infinite; }

        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        .shimmer {
          background: linear-gradient(90deg, transparent 0%, rgba(79,195,161,0.12) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }

        @keyframes water-flow {
          0%   { background-position: 0 0; }
          100% { background-position: 60px 0; }
        }
        .water-anim {
          animation: water-flow 4s linear infinite;
        }

        @keyframes glow-pulse {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1; }
        }
        .glow-pulse { animation: glow-pulse 2.5s ease-in-out infinite; }

        .step-active {
          border-color: rgba(79,195,161,0.5) !important;
          background: rgba(79,195,161,0.06) !important;
        }

        .img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(6,9,10,0.85) 0%, rgba(6,9,10,0.1) 60%);
        }

        .infra-tab-active {
          border-color: var(--accent) !important;
          color: var(--accent) !important;
        }

        .scrollbar-hide::-webkit-scrollbar { display: none; }

        /* Water stream SVG animation */
        @keyframes stream-flow {
          0%   { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -80; }
        }
        .stream-line {
          stroke-dasharray: 12 8;
          animation: stream-flow 2s linear infinite;
        }
      `}</style>

      <div className="noise-overlay" />

      {/* ══════════════════════════════════════
          НАВИГАЦИЯ
      ══════════════════════════════════════ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-glass" : ""}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--accent)" }}>
                <Icon name="Home" size={17} color="#06090a" />
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

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {[["Поселок", "#village"], ["Инфраструктура", "#infra"], ["Технология", "#tech"], ["Преимущества", "#benefits"], ["Участки", "#plots"]].map(([l, h]) => (
              <a key={l} href={h} className="text-sm transition-colors hover:text-white" style={{ color: "var(--text-muted)" }}>{l}</a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="btn-outline text-sm py-2.5 px-5">Рассчитать стоимость</button>
            <button className="btn-primary text-sm py-2.5 px-5">
              <Icon name="Phone" size={14} />
              Связаться
            </button>
          </div>

          <button className="md:hidden p-2 rounded-lg" style={{ color: "var(--text-main)" }} onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden nav-glass px-6 pb-6 pt-2 flex flex-col gap-4">
            {["Поселок", "Инфраструктура", "Технология", "Преимущества", "Участки"].map((item) => (
              <a key={item} href="#" className="text-base py-1" style={{ color: "var(--text-muted)" }} onClick={() => setMenuOpen(false)}>{item}</a>
            ))}
            <button className="btn-primary w-full justify-center mt-2">Связаться</button>
          </div>
        )}
      </nav>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section id="village" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Фоновое изображение */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMG_AERIAL})`, filter: "brightness(0.38) saturate(1.1)" }}
        />
        {/* Градиент поверх */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, rgba(6,9,10,0.5) 0%, rgba(6,9,10,0.2) 40%, rgba(6,9,10,0.7) 80%, rgba(6,9,10,1) 100%)"
        }} />
        {/* Сетка */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `linear-gradient(var(--border-line) 1px, transparent 1px), linear-gradient(90deg, var(--border-line) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-24 grid lg:grid-cols-2 gap-16 items-center">
          {/* Текст */}
          <div>
            <div className="anim-1 mb-6 flex gap-3 flex-wrap">
              <span className="tag">Поселок подземных домов</span>
              <span className="tag-gold">Единственный в России</span>
            </div>

            <h1 className="font-cormorant anim-2 mb-6" style={{
              fontSize: "clamp(38px, 5.2vw, 72px)",
              fontWeight: 300,
              lineHeight: 1.07,
              letterSpacing: "-0.01em",
            }}>
              Жить под{" "}
              <span style={{ color: "var(--accent)", fontStyle: "italic" }}>землёй</span>
              {" "}—<br />
              у запруды, с ручьём<br />
              <span style={{ color: "var(--accent2)", fontStyle: "italic" }}>у каждого дома.</span>
            </h1>

            <p className="anim-3 text-lg leading-relaxed mb-10 max-w-lg" style={{ color: "var(--text-muted)" }}>
              Закрытый поселок, где каждый дом вписан в рельеф. Терраса с видом на запруду,
              живой ручей между участками, персональная парковка и умное ландшафтное освещение —
              всё спроектировано как единое целое.
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

            {/* Stats */}
            <div className="anim-5 mt-12 flex gap-8 pt-8 flex-wrap" style={{ borderTop: "1px solid var(--border-line)" }}>
              {[
                { num: "24", label: "участка в поселке" },
                { num: "3 га", label: "общая территория" },
                { num: "40%", label: "экономия на отоплении" },
              ].map((s) => (
                <div key={s.num}>
                  <div className="stat-num" style={{ fontSize: "clamp(22px, 2.8vw, 32px)" }}>{s.num}</div>
                  <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Карточка-схема поселка */}
          <div className="float hidden lg:flex flex-col gap-4">
            {/* Мини-схема сверху */}
            <div className="rounded-2xl overflow-hidden relative" style={{
              border: "1px solid rgba(79,195,161,0.2)",
              background: "var(--bg-card)",
              aspectRatio: "16/9",
            }}>
              <img src={IMG_POND} alt="Запруда поселка" className="w-full h-full object-cover" style={{ opacity: 0.75 }} />
              <div className="img-overlay" />
              <div className="absolute bottom-4 left-4">
                <span className="tag" style={{ fontSize: 12 }}>Центральная запруда</span>
              </div>
            </div>
            {/* Два мини-превью */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden relative" style={{
                border: "1px solid rgba(79,195,161,0.15)",
                aspectRatio: "4/3",
              }}>
                <img src={IMG_TERRACE} alt="Терраса" className="w-full h-full object-cover" style={{ opacity: 0.7 }} />
                <div className="img-overlay" />
                <div className="absolute bottom-2 left-3 text-xs font-medium" style={{ color: "var(--accent)" }}>Терраса</div>
              </div>
              <div className="rounded-xl overflow-hidden relative" style={{
                border: "1px solid rgba(79,195,161,0.15)",
                aspectRatio: "4/3",
              }}>
                <img src={IMG_STREAM} alt="Ручей" className="w-full h-full object-cover" style={{ opacity: 0.7 }} />
                <div className="img-overlay" />
                <div className="absolute bottom-2 left-3 text-xs font-medium" style={{ color: "var(--accent)" }}>Ручей</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>листать</div>
          <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, var(--accent), transparent)" }} />
        </div>
      </section>

      {/* ══════════════════════════════════════
          ИНФРАСТРУКТУРА
      ══════════════════════════════════════ */}
      <section id="infra" className="py-24" style={{ background: "var(--bg-deep)" }}>
        <div className="max-w-6xl mx-auto px-6">
          {/* Заголовок */}
          <div className="mb-14">
            <div className="mb-4"><span className="tag">Инфраструктура поселка</span></div>
            <h2 className="font-cormorant mb-4" style={{
              fontSize: "clamp(32px, 4vw, 58px)", fontWeight: 300, lineHeight: 1.1,
            }}>
              Каждый элемент{" "}
              <span style={{ color: "var(--accent)", fontStyle: "italic" }}>спроектирован</span>
              {" "}как целое
            </h2>
            <p className="text-lg max-w-xl" style={{ color: "var(--text-muted)" }}>
              Поселок — это не просто набор домов. Терраса, запруда, ручей, парковка и освещение
              создают единую живую систему.
            </p>
          </div>

          {/* Табы + большое фото */}
          <div className="grid lg:grid-cols-5 gap-6 items-start">
            {/* Табы */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              {INFRA.map((item, i) => (
                <button
                  key={i}
                  onClick={() => handleInfraClick(i)}
                  className={`text-left rounded-2xl p-5 card-hover transition-all ${i === activeInfra ? "infra-tab-active" : ""}`}
                  style={{
                    background: i === activeInfra ? "rgba(79,195,161,0.06)" : "var(--bg-card)",
                    border: `1px solid ${i === activeInfra ? "rgba(79,195,161,0.4)" : "var(--border-line)"}`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{
                      background: i === activeInfra ? "rgba(79,195,161,0.15)" : "rgba(255,255,255,0.04)",
                    }}>
                      <Icon name={item.icon} size={19} color={i === activeInfra ? "var(--accent)" : "var(--text-muted)"} />
                    </div>
                    <div>
                      <div className="font-medium text-sm mb-1" style={{ color: i === activeInfra ? "var(--text-main)" : "var(--text-muted)" }}>
                        {item.title}
                      </div>
                      {i === activeInfra && (
                        <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                          {item.desc}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Большое фото */}
            <div className="lg:col-span-3 relative rounded-3xl overflow-hidden" style={{
              aspectRatio: "4/3",
              border: "1px solid rgba(79,195,161,0.2)",
            }}>
              {INFRA.map((item, i) => (
                <div
                  key={i}
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{ opacity: i === activeInfra ? 1 : 0 }}
                >
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  <div className="img-overlay" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(79,195,161,0.2)" }}>
                        <Icon name={item.icon} size={15} color="var(--accent)" />
                      </div>
                      <span className="font-medium text-sm">{item.title}</span>
                    </div>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
              {/* Точки-индикаторы */}
              <div className="absolute top-5 right-5 flex gap-2">
                {INFRA.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleInfraClick(i)}
                    className="rounded-full transition-all"
                    style={{
                      width: i === activeInfra ? 20 : 6,
                      height: 6,
                      background: i === activeInfra ? "var(--accent)" : "rgba(255,255,255,0.25)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ВОДНАЯ СИСТЕМА — РУЧЕЙ И ЗАПРУДА
      ══════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#070b0e" }}>
        {/* Декоративная подсветка */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full opacity-[0.06] blur-[80px]"
          style={{ background: "var(--accent3)" }} />

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Фото запруды */}
            <div className="relative rounded-3xl overflow-hidden" style={{
              aspectRatio: "4/3",
              border: "1px solid rgba(91,155,213,0.2)",
            }}>
              <img src={IMG_POND} alt="Запруда" className="w-full h-full object-cover" style={{ filter: "saturate(1.2) brightness(0.85)" }} />
              <div className="absolute inset-0" style={{
                background: "linear-gradient(to top, rgba(7,11,14,0.8) 0%, transparent 60%)"
              }} />
              {/* SVG-ручей */}
              <svg className="absolute bottom-0 left-0 right-0 w-full" height="60" viewBox="0 0 400 60" preserveAspectRatio="none">
                <path d="M0 30 Q50 10 100 30 Q150 50 200 30 Q250 10 300 30 Q350 50 400 30" fill="none" stroke="rgba(91,155,213,0.5)" strokeWidth="2" className="stream-line" />
                <path d="M0 40 Q60 20 120 40 Q180 60 240 40 Q300 20 360 40 Q380 50 400 40" fill="none" stroke="rgba(79,195,161,0.3)" strokeWidth="1.5" className="stream-line" style={{ animationDelay: "0.8s" }} />
              </svg>
              <div className="absolute bottom-5 left-6">
                <span className="tag-gold text-xs">Замкнутый водный цикл</span>
              </div>
            </div>

            {/* Текст */}
            <div>
              <div className="mb-5"><span className="tag" style={{ background: "var(--accent3-dim)", color: "var(--accent3)", borderColor: "rgba(91,155,213,0.22)" }}>Водная инфраструктура</span></div>
              <h2 className="font-cormorant mb-6" style={{
                fontSize: "clamp(28px, 3.5vw, 50px)", fontWeight: 300, lineHeight: 1.12,
              }}>
                Запруда — у каждого.<br />
                Ручей —{" "}
                <span style={{ color: "var(--accent3)", fontStyle: "italic" }}>живёт и течёт.</span>
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
                Каждый дом имеет собственную террасу с прямым видом на общую запруду.
                Ручей протекает между участками по закрытому циклу: вода очищается
                естественным путём через биофильтры и возвращается в оборот.
                Никаких потерь, никаких затрат на обслуживание.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: "Recycle", title: "Замкнутый цикл", desc: "Вода рециркулирует без потерь круглый год" },
                  { icon: "Waves", title: "Биофильтрация", desc: "Естественная очистка через аквапланты" },
                  { icon: "Eye", title: "Вид с террасы", desc: "Каждый дом смотрит прямо на запруду" },
                  { icon: "Snowflake", title: "Работает зимой", desc: "Подогрев ключевых участков ручья" },
                ].map((f) => (
                  <div key={f.title} className="flex gap-3 p-4 rounded-xl" style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-line)",
                  }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{
                      background: "var(--accent3-dim)",
                    }}>
                      <Icon name={f.icon} size={16} color="var(--accent3)" />
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-0.5">{f.title}</div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ОСВЕЩЕНИЕ И ПАРКОВКИ
      ══════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background: "var(--bg-deep)" }}>
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] opacity-[0.05] blur-[100px]"
          style={{ background: "var(--accent2)" }} />

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Текст */}
            <div>
              <div className="mb-5"><span className="tag-gold">Освещение и парковки</span></div>
              <h2 className="font-cormorant mb-6" style={{
                fontSize: "clamp(28px, 3.5vw, 50px)", fontWeight: 300, lineHeight: 1.12,
              }}>
                Поселок живёт<br />
                <span style={{ color: "var(--accent2)", fontStyle: "italic" }}>после захода солнца.</span>
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
                Продуманная система ландшафтного освещения подчёркивает архитектуру,
                освещает пешеходные дорожки, зону ручья и подъезды к парковкам.
                Вечером поселок выглядит как сцена — красиво и безопасно.
              </p>

              <div className="space-y-4">
                {[
                  { icon: "Lamp", num: "180+", label: "светоточек на территории", color: "accent2" },
                  { icon: "Car", num: "2–3", label: "парковочных места у каждого дома", color: "accent" },
                  { icon: "Navigation", num: "1,2 км", label: "подъездных дорог с подсветкой", color: "accent3" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-5 p-4 rounded-2xl" style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-line)",
                  }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{
                      background: `var(--${s.color}-dim)`,
                    }}>
                      <Icon name={s.icon} size={22} color={`var(--${s.color})`} />
                    </div>
                    <div>
                      <div className="stat-num" style={{ fontSize: 26 }}>{s.num}</div>
                      <div className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Фото парковки */}
            <div className="space-y-4">
              <div className="relative rounded-3xl overflow-hidden" style={{
                aspectRatio: "16/10",
                border: "1px solid rgba(200,168,75,0.2)",
              }}>
                <img src={IMG_PARKING} alt="Парковка ночью" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{
                  background: "linear-gradient(to top, rgba(6,9,10,0.7) 0%, transparent 50%)"
                }} />
                <div className="absolute bottom-5 left-6 right-6">
                  <div className="text-sm font-medium mb-1">Персональная парковка</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>LED-освещение, мощёное покрытие, дренаж</div>
                </div>
                {/* Декоративные огни */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {[0, 0.4, 0.8].map((d, i) => (
                    <div key={i} className="w-2 h-2 rounded-full glow-pulse" style={{
                      background: "var(--accent2)",
                      animationDelay: `${d}s`,
                      boxShadow: "0 0 6px var(--accent2)",
                    }} />
                  ))}
                </div>
              </div>
              {/* Подпись */}
              <div className="flex gap-3 flex-wrap">
                {["LED Smart-освещение", "Таймер + датчики", "Пешеходные дорожки", "Дренаж"].map((f) => (
                  <span key={f} style={{
                    background: "var(--accent2-dim)",
                    color: "var(--accent2)",
                    border: "1px solid rgba(200,168,75,0.18)",
                    borderRadius: 100,
                    padding: "3px 12px",
                    fontSize: 12,
                    fontWeight: 500,
                  }}>{f}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ТЕХНОЛОГИЯ СТРОИТЕЛЬСТВА
      ══════════════════════════════════════ */}
      <section id="tech" className="py-24" style={{ background: "#070b0e" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Шаги */}
            <div>
              <div className="mb-5"><span className="tag">Как мы строим</span></div>
              <h2 className="font-cormorant mb-10" style={{
                fontSize: "clamp(28px, 3.5vw, 50px)", fontWeight: 300, lineHeight: 1.12,
              }}>
                4 этапа от проекта<br />
                до{" "}
                <span style={{ color: "var(--accent)", fontStyle: "italic" }}>готового поселка</span>
              </h2>

              <div className="space-y-3">
                {STEPS.map((step, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`cursor-pointer rounded-2xl p-5 transition-all ${i === activeStep ? "step-active" : "card-hover"}`}
                    style={{
                      background: i === activeStep ? "rgba(79,195,161,0.05)" : "var(--bg-card)",
                      border: `1px solid ${i === activeStep ? "rgba(79,195,161,0.4)" : "var(--border-line)"}`,
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="font-cormorant" style={{
                        fontSize: 32, fontWeight: 300, color: i === activeStep ? "var(--accent)" : "var(--text-muted)", lineHeight: 1,
                      }}>
                        {step.num}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <Icon name={step.icon} size={16} color={i === activeStep ? "var(--accent)" : "var(--text-muted)"} />
                          <span className="font-medium text-sm">{step.title}</span>
                        </div>
                        {i === activeStep && (
                          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{step.desc}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Иллюстрация сечения */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden relative" style={{
                border: "1px solid rgba(79,195,161,0.2)",
                background: "var(--bg-card)",
                aspectRatio: "3/4",
              }}>
                <img src={IMG_SECTION} alt="Сечение дома" className="w-full h-full object-cover" style={{ opacity: 0.7 }} />
                <div className="absolute inset-0" style={{
                  background: "linear-gradient(to top, rgba(7,11,14,0.9) 0%, rgba(7,11,14,0.1) 50%)"
                }} />

                {/* Подписи слоёв */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 gap-2">
                  {[
                    { label: "Грунт + газон", y: "top-[8%]", color: "var(--accent)" },
                    { label: "Гидроизоляция", y: "top-[22%]", color: "var(--accent2)" },
                    { label: "Монолитная плита", y: "top-[34%]", color: "var(--accent3)" },
                    { label: "Жилое пространство", y: "top-[52%]", color: "var(--text-main)" },
                    { label: "Терраса → Запруда", y: "top-[68%]", color: "var(--accent)" },
                  ].map((l) => (
                    <div key={l.label} className={`absolute left-4 flex items-center gap-2 ${l.y}`}>
                      <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                      <span className="text-xs font-medium" style={{ color: l.color, textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}>{l.label}</span>
                    </div>
                  ))}
                </div>
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
            <div className="mb-4"><span className="tag">Почему подземный дом</span></div>
            <h2 className="font-cormorant" style={{
              fontSize: "clamp(30px, 3.8vw, 54px)", fontWeight: 300, lineHeight: 1.1,
            }}>
              6 причин, которые изменят<br />
              <span style={{ color: "var(--accent)", fontStyle: "italic" }}>ваше понимание жилья</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => (
              <div key={i} className="card-hover rounded-2xl p-6" style={{ background: "var(--bg-card)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "var(--accent-dim)" }}>
                  <Icon name={b.icon} size={20} color="var(--accent)" />
                </div>
                <h3 className="font-medium text-base mb-2">{b.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{b.desc}</p>
              </div>
            ))}
          </div>

          {/* Большая цитата / акцент */}
          <div className="mt-16 relative rounded-3xl overflow-hidden" style={{
            border: "1px solid rgba(79,195,161,0.15)",
            background: "var(--bg-card)",
          }}>
            <div className="shimmer absolute inset-0 opacity-60" />
            <div className="relative z-10 p-10 text-center">
              <p className="font-cormorant italic max-w-2xl mx-auto" style={{
                fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 300, lineHeight: 1.3, color: "var(--text-main)",
              }}>
                «Дом под землёй — это не бункер. Это{" "}
                <span style={{ color: "var(--accent)" }}>терраса у воды</span>
                , живой ручей у калитки и{" "}
                <span style={{ color: "var(--accent2)" }}>15°C без отопления</span>.»
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          УЧАСТКИ
      ══════════════════════════════════════ */}
      <section id="plots" className="py-24" style={{ background: "#070b0e" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <div className="mb-4"><span className="tag">Выбрать участок</span></div>
            <h2 className="font-cormorant" style={{
              fontSize: "clamp(30px, 3.8vw, 54px)", fontWeight: 300, lineHeight: 1.1,
            }}>
              Три формата.<br />
              <span style={{ color: "var(--accent)", fontStyle: "italic" }}>Один поселок.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PLOTS.map((p, i) => (
              <div key={i} className="card-hover rounded-3xl overflow-hidden flex flex-col" style={{
                background: "var(--bg-card)",
                border: i === 1 ? "1px solid rgba(200,168,75,0.35)" : "1px solid var(--border-line)",
              }}>
                {/* Шапка */}
                <div className="p-6 pb-0 flex items-center justify-between">
                  <span className={i === 1 ? "tag-gold" : "tag"} style={{ fontSize: 12 }}>{p.tag}</span>
                  {i === 1 && (
                    <div className="w-2 h-2 rounded-full glow-pulse" style={{ background: "var(--accent2)", boxShadow: "0 0 8px var(--accent2)" }} />
                  )}
                </div>
                {/* Площадь */}
                <div className="p-6">
                  <div className="stat-num mb-1" style={{ fontSize: "clamp(36px, 4vw, 52px)" }}>{p.area}</div>
                  <div className="text-sm" style={{ color: "var(--text-muted)" }}>жилая площадь</div>
                </div>
                <div className="px-6 pb-4 flex-1">
                  <div className="flex flex-col gap-3">
                    {[
                      { icon: "Map", label: p.land + " земельный участок" },
                      { icon: "Waves", label: "Терраса с видом на запруду" },
                      { icon: "Droplets", label: "Ручей на границе участка" },
                      { icon: "Car", label: "Парковка на 2–3 машины" },
                      { icon: "Lightbulb", label: "Ландшафтное освещение" },
                    ].map((f) => (
                      <div key={f.label} className="flex items-center gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
                        <Icon name={f.icon} size={14} color="var(--accent)" />
                        {f.label}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <div className="mb-4 pt-4" style={{ borderTop: "1px solid var(--border-line)" }}>
                    <div className="stat-num" style={{ fontSize: 28 }}>{p.price}</div>
                  </div>
                  <button className={i === 1 ? "btn-primary w-full justify-center" : "btn-outline w-full justify-center"}>
                    Забронировать
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA + КОНТАКТЫ
      ══════════════════════════════════════ */}
      <section id="contact" className="py-24 relative overflow-hidden" style={{ background: "var(--bg-deep)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-[0.06] blur-[100px]"
          style={{ background: "var(--accent)" }} />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="mb-5"><span className="tag">Старт продаж</span></div>
          <h2 className="font-cormorant mb-6" style={{
            fontSize: "clamp(32px, 4.5vw, 64px)", fontWeight: 300, lineHeight: 1.08,
          }}>
            Осталось{" "}
            <span style={{ color: "var(--accent)", fontStyle: "italic" }}>7 участков</span>{" "}
            по<br />стартовой цене
          </h2>
          <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Оставьте заявку — мы покажем генплан поселка, расскажем про расположение
            каждого участка относительно запруды и ответим на все вопросы.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="btn-primary text-base">
              <Icon name="MessageCircle" size={18} />
              Оставить заявку
            </button>
            <button className="btn-outline text-base">
              <Icon name="Download" size={17} />
              Скачать буклет
            </button>
          </div>

          {/* Контакты */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {[
              { icon: "Phone", text: "+7 800 555-00-00" },
              { icon: "Mail", text: "info@zemlandom.ru" },
              { icon: "MapPin", text: "Московская область" },
            ].map((c) => (
              <div key={c.text} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                <Icon name={c.icon} size={15} color="var(--accent)" />
                {c.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer className="py-8" style={{
        borderTop: "1px solid var(--border-line)",
        background: "#040608",
      }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "var(--accent)" }}>
              <Icon name="Home" size={13} color="#040608" />
            </div>
            <span className="font-cormorant text-lg" style={{ color: "var(--text-main)" }}>ЗемлеДом</span>
          </div>
          <div className="text-xs" style={{ color: "var(--text-muted)" }}>© 2025 Поселок подземных домов. Все права защищены.</div>
          <div className="flex gap-5">
            {["Политика", "Условия", "Контакты"].map((l) => (
              <a key={l} href="#" className="text-xs transition-colors hover:text-white" style={{ color: "var(--text-muted)" }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;