import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen font-golos"
      style={{ background: "var(--bg-deep)", color: "var(--text-main)" }}
    >
      {/* ── CSS Variables & Styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Golos+Text:wght@400;500;600&display=swap');

        :root {
          --bg-deep:   #0a0d07;
          --bg-card:   #111508;
          --bg-glass:  rgba(15,20,8,0.75);
          --accent:    #8bc34a;
          --accent2:   #c8a84b;
          --accent-dim: rgba(139,195,74,0.12);
          --accent2-dim: rgba(200,168,75,0.10);
          --text-main: #eef0e8;
          --text-muted: #7a8a68;
          --border-line: rgba(255,255,255,0.07);
        }

        .font-cormorant { font-family: 'Cormorant', Georgia, serif; }
        .font-golos     { font-family: 'Golos Text', system-ui, sans-serif; }

        .nav-glass {
          background: rgba(10,13,7,0.88);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid var(--border-line);
        }

        .accent-line {
          display: inline-block;
          width: 48px; height: 2px;
          background: var(--accent);
          transform-origin: left;
        }

        .card-hover {
          transition: transform 0.32s ease, border-color 0.32s ease, box-shadow 0.32s ease;
          border: 1px solid var(--border-line);
        }
        .card-hover:hover {
          transform: translateY(-6px);
          border-color: rgba(139,195,74,0.3);
          box-shadow: 0 20px 60px rgba(139,195,74,0.07);
        }

        .btn-primary {
          background: var(--accent);
          color: #0a0d07;
          font-weight: 600;
          border-radius: 6px;
          padding: 14px 32px;
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-primary:hover {
          background: #a5d65e;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(139,195,74,0.3);
        }

        .btn-outline {
          border: 1px solid rgba(255,255,255,0.18);
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
          border: 1px solid rgba(139,195,74,0.22);
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

        /* Ground cross-section hero */
        .ground-section {
          position: relative;
          overflow: hidden;
        }

        .ground-surface {
          background: linear-gradient(180deg,
            transparent 0%,
            rgba(139,195,74,0.04) 60%,
            rgba(101,144,45,0.12) 75%,
            rgba(80,55,25,0.25) 82%,
            rgba(60,40,15,0.45) 90%,
            rgba(45,30,10,0.65) 100%
          );
        }

        .earth-layer {
          background: linear-gradient(180deg,
            rgba(80,55,25,0.3) 0%,
            rgba(65,44,18,0.5) 40%,
            rgba(50,35,12,0.7) 100%
          );
        }

        .noise-overlay::after {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.35;
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .anim-1 { animation: fade-in-up 0.7s ease-out 0.1s both; }
        .anim-2 { animation: fade-in-up 0.7s ease-out 0.3s both; }
        .anim-3 { animation: fade-in-up 0.7s ease-out 0.5s both; }
        .anim-4 { animation: fade-in-up 0.7s ease-out 0.7s both; }
        .anim-5 { animation: fade-in-up 0.7s ease-out 0.9s both; }

        @keyframes float {
          0%, 100% { transform: translateY(0);     }
          50%       { transform: translateY(-12px); }
        }
        .float { animation: float 6s ease-in-out infinite; }

        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.5; }
          100% { transform: scale(1.7); opacity: 0;   }
        }
        .pulse-ring { animation: pulse-ring 2.8s ease-out infinite; }

        @keyframes grow-up {
          from { height: 0; }
          to   { height: 100%; }
        }

        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0;  }
        }
        .shimmer {
          background: linear-gradient(90deg,
            transparent 0%, rgba(139,195,74,0.15) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }

        .step-active {
          border-color: rgba(139,195,74,0.5) !important;
          background: rgba(139,195,74,0.06) !important;
        }

        .cross-section-house {
          clip-path: polygon(15% 90%, 15% 30%, 50% 5%, 85% 30%, 85% 90%);
        }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

      <div className="noise-overlay" />

      {/* ══════════════════════════════════════════
          НАВИГАЦИЯ
      ══════════════════════════════════════════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "nav-glass" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <div className="relative">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "var(--accent)" }}
              >
                <Icon name="Mountain" size={18} color="#0a0d07" />
              </div>
              <div
                className="absolute inset-0 rounded-xl pulse-ring"
                style={{ border: "1px solid var(--accent)" }}
              />
            </div>
            <div>
              <span
                className="font-cormorant font-semibold text-xl leading-none block"
                style={{ color: "var(--text-main)" }}
              >
                ЗемлеДом
              </span>
              <span className="text-[10px] tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
                подземное строительство
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              ["Концепция", "#concept"],
              ["Технология", "#tech"],
              ["Проекты", "#projects"],
              ["Преимущества", "#benefits"],
              ["Контакты", "#contact"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-sm transition-colors duration-200 hover:text-white"
                style={{ color: "var(--text-muted)" }}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="btn-outline text-sm py-2.5 px-6">
              Рассчитать стоимость
            </button>
            <button className="btn-primary text-sm py-2.5 px-6">
              <Icon name="Phone" size={14} />
              Связаться
            </button>
          </div>

          {/* Mobile burger */}
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
            {["Концепция", "Технология", "Проекты", "Преимущества", "Контакты"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-base py-1"
                  style={{ color: "var(--text-muted)" }}
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              )
            )}
            <button className="btn-primary w-full justify-center mt-2">
              Связаться
            </button>
          </div>
        )}
      </nav>

      {/* ══════════════════════════════════════════
          HERO — СЕЧЕНИЕ ЗЕМЛИ
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden ground-section">
        {/* Фоновая сетка */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(var(--border-line) 1px, transparent 1px),
              linear-gradient(90deg, var(--border-line) 1px, transparent 1px)`,
            backgroundSize: "72px 72px",
          }}
        />
        {/* Слои земли — нижняя половина */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1/3 ground-surface"
        />

        {/* Декоративные «корни» */}
        <div className="absolute bottom-0 left-1/4 w-px h-40 opacity-20" style={{ background: "linear-gradient(to bottom, transparent, var(--accent2))" }} />
        <div className="absolute bottom-0 left-1/3 w-px h-28 opacity-15" style={{ background: "linear-gradient(to bottom, transparent, var(--accent2))" }} />
        <div className="absolute bottom-0 right-1/4 w-px h-36 opacity-20" style={{ background: "linear-gradient(to bottom, transparent, var(--accent2))" }} />

        {/* Основной контент */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center pt-24">
          {/* Текст */}
          <div>
            <div className="anim-1 mb-6">
              <span className="tag">Инновационное строительство</span>
            </div>

            <h1
              className="font-cormorant anim-2 mb-6"
              style={{
                fontSize: "clamp(40px, 5.5vw, 76px)",
                fontWeight: 300,
                lineHeight: 1.08,
                letterSpacing: "-0.01em",
              }}
            >
              Дом под{" "}
              <span
                style={{ color: "var(--accent)", fontStyle: "italic" }}
              >
                землёй.
              </span>
              <br />
              Без подземных работ.
            </h1>

            <p
              className="anim-3 text-lg leading-relaxed mb-10 max-w-lg"
              style={{ color: "var(--text-muted)" }}
            >
              Мы строим дома на поверхности по обычным технологиям,
              а затем обсыпаем их грунтом — создавая настоящий
              подземный дом с живым ландшафтом наверху. Без котлованов,
              без риска, без огромных затрат.
            </p>

            <div className="anim-4 flex flex-col sm:flex-row gap-4">
              <button className="btn-primary text-base">
                <Icon name="PlayCircle" size={20} />
                Смотреть концепцию
              </button>
              <button className="btn-outline text-base">
                Рассчитать проект
                <Icon name="ArrowRight" size={18} />
              </button>
            </div>

            {/* Mini stats */}
            <div
              className="anim-5 mt-12 flex gap-8 pt-8"
              style={{ borderTop: "1px solid var(--border-line)" }}
            >
              {[
                { num: "40%", label: "экономия на отоплении" },
                { num: "15°C", label: "стабильная температура" },
                { num: "50+", label: "проектов реализовано" },
              ].map((s) => (
                <div key={s.num}>
                  <div className="stat-num" style={{ fontSize: "clamp(22px, 3vw, 32px)" }}>
                    {s.num}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Иллюстрация сечения */}
          <div className="relative float hidden lg:block">
            {/* Карточка-сечение */}
            <div
              className="rounded-3xl overflow-hidden relative"
              style={{
                border: "1px solid rgba(139,195,74,0.2)",
                background: "var(--bg-card)",
                aspectRatio: "1/1",
                maxWidth: 460,
              }}
            >
              {/* Небо */}
              <div
                className="absolute top-0 left-0 right-0"
                style={{
                  height: "38%",
                  background:
                    "linear-gradient(180deg, #0c1810 0%, #111c0c 100%)",
                }}
              >
                {/* Трава */}
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{ height: 12 }}
                >
                  {[...Array(28)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute bottom-0"
                      style={{
                        left: `${i * 3.6}%`,
                        width: 2,
                        height: `${6 + Math.sin(i) * 4}px`,
                        background: "var(--accent)",
                        opacity: 0.7,
                        borderRadius: "2px 2px 0 0",
                        transform: `rotate(${(i % 3) * 5 - 5}deg)`,
                        transformOrigin: "bottom",
                      }}
                    />
                  ))}
                </div>
                {/* Деревья */}
                <div className="absolute bottom-3 left-8 flex items-end gap-3">
                  {[32, 22, 28].map((h, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div
                        style={{
                          width: 14 + i * 2,
                          height: h,
                          background: "rgba(139,195,74,0.4)",
                          borderRadius: "50% 50% 20% 20%",
                        }}
                      />
                      <div
                        style={{
                          width: 3,
                          height: 10,
                          background: "rgba(139,195,74,0.25)",
                        }}
                      />
                    </div>
                  ))}
                </div>
                {/* Звёзды / луна */}
                <div className="absolute top-4 right-6">
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(200,168,75,0.6) 0%, transparent 70%)",
                      boxShadow: "0 0 12px rgba(200,168,75,0.3)",
                    }}
                  />
                </div>
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: 1.5,
                      height: 1.5,
                      background: "rgba(255,255,255,0.5)",
                      top: `${10 + (i * 13) % 60}%`,
                      left: `${20 + (i * 17) % 60}%`,
                    }}
                  />
                ))}
              </div>

              {/* Грунт */}
              <div
                className="absolute left-0 right-0"
                style={{
                  top: "38%",
                  bottom: 0,
                  background:
                    "linear-gradient(180deg, #2d1f0a 0%, #231808 40%, #1a1205 100%)",
                }}
              >
                {/* Текстура земли */}
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full opacity-30"
                    style={{
                      width: 3 + (i % 4),
                      height: 2,
                      background: "rgba(80,55,20,0.8)",
                      top: `${5 + (i * 17) % 80}%`,
                      left: `${(i * 13) % 90}%`,
                    }}
                  />
                ))}

                {/* ДОМ внутри земли */}
                <div
                  className="absolute"
                  style={{
                    top: "8%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "70%",
                  }}
                >
                  {/* Крыша */}
                  <div
                    style={{
                      width: "100%",
                      height: 0,
                      borderLeft: "50px solid transparent",
                      borderRight: "50px solid transparent",
                      borderBottom: "40px solid rgba(139,195,74,0.35)",
                      marginBottom: -1,
                    }}
                  />
                  {/* Тело дома */}
                  <div
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(15,22,8,0.95) 0%, rgba(12,18,6,0.98) 100%)",
                      border: "1px solid rgba(139,195,74,0.25)",
                      borderRadius: "0 0 8px 8px",
                      padding: "10px 8px",
                    }}
                  >
                    {/* Окна */}
                    <div className="flex gap-2 justify-center mb-2">
                      {[0, 1].map((w) => (
                        <div
                          key={w}
                          style={{
                            width: 22,
                            height: 16,
                            background:
                              "rgba(200,168,75,0.25)",
                            border: "1px solid rgba(200,168,75,0.4)",
                            borderRadius: 2,
                            boxShadow:
                              "0 0 8px rgba(200,168,75,0.15) inset",
                          }}
                        />
                      ))}
                    </div>
                    {/* Дверь */}
                    <div className="flex justify-center">
                      <div
                        style={{
                          width: 14,
                          height: 20,
                          background: "rgba(139,195,74,0.2)",
                          border: "1px solid rgba(139,195,74,0.3)",
                          borderRadius: "4px 4px 0 0",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Слои грунта */}
                <div
                  className="absolute bottom-0 left-0 right-0 flex flex-col"
                  style={{ height: "18%" }}
                >
                  {["rgba(40,28,10,0.6)", "rgba(30,20,8,0.7)"].map(
                    (bg, i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          background: bg,
                          borderTop: "1px solid rgba(255,255,255,0.03)",
                        }}
                      />
                    )
                  )}
                </div>
              </div>

              {/* Подписи */}
              <div
                className="absolute left-3 top-[22%] text-xs font-medium"
                style={{ color: "rgba(139,195,74,0.7)" }}
              >
                Поверхность земли
              </div>
              <div
                className="absolute right-3 top-[50%] text-xs font-medium text-right"
                style={{ color: "rgba(200,168,75,0.7)" }}
              >
                Дом под<br />грунтом
              </div>

              {/* Линия уровня земли */}
              <div
                className="absolute left-0 right-0"
                style={{
                  top: "38%",
                  height: 1,
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(139,195,74,0.5) 20%, rgba(139,195,74,0.5) 80%, transparent 100%)",
                }}
              />
            </div>

            {/* Декор-пластина позади */}
            <div
              className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl -z-10"
              style={{
                border: "1px solid rgba(139,195,74,0.08)",
                background: "rgba(139,195,74,0.02)",
              }}
            />
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
            Прокрутите
          </span>
          <div className="w-px h-8" style={{ background: "var(--text-muted)" }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          КОНЦЕПЦИЯ
      ══════════════════════════════════════════ */}
      <section
        id="concept"
        className="py-28 relative z-10"
        style={{ borderTop: "1px solid var(--border-line)" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-5">
              <span className="accent-line" />
              <span
                className="text-sm font-medium tracking-widest uppercase"
                style={{ color: "var(--accent)" }}
              >
                Наша концепция
              </span>
              <span className="accent-line" />
            </div>
            <h2
              className="font-cormorant mb-5"
              style={{
                fontSize: "clamp(34px, 4.5vw, 56px)",
                fontWeight: 300,
                lineHeight: 1.15,
              }}
            >
              Подземный дом без{" "}
              <span style={{ color: "var(--accent)", fontStyle: "italic" }}>
                подземных работ
              </span>
            </h2>
            <p
              className="max-w-2xl mx-auto text-lg leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Традиционное подземное строительство — это дорогостоящие
              земляные работы, водозащита и сложная инженерия.
              Мы нашли принципиально иной путь.
            </p>
          </div>

          {/* Сравнение: традиционный vs наш */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {/* Традиционный способ */}
            <div
              className="rounded-2xl p-8"
              style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(255,80,80,0.1)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(255,80,80,0.1)", color: "#ff6060" }}
                >
                  <Icon name="X" size={18} />
                </div>
                <h3
                  className="font-cormorant text-xl"
                  style={{ fontWeight: 400 }}
                >
                  Традиционный подход
                </h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Глубокий котлован — огромные затраты на технику",
                  "Сложная гидроизоляция и дренаж",
                  "Риски обрушения грунта при строительстве",
                  "Ограниченный доступ для строителей",
                  "Высокая стоимость: +60–80% к бюджету",
                  "Сроки строительства увеличиваются вдвое",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Icon
                      name="CircleDot"
                      size={14}
                      color="rgba(255,96,96,0.5)"
                      className="mt-0.5 flex-shrink-0"
                    />
                    <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Наш способ */}
            <div
              className="rounded-2xl p-8 relative overflow-hidden"
              style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(139,195,74,0.2)",
              }}
            >
              <div
                className="absolute top-0 right-0 w-40 h-40 blur-3xl opacity-10 rounded-full"
                style={{ background: "var(--accent)" }}
              />
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
                >
                  <Icon name="Check" size={18} />
                </div>
                <h3
                  className="font-cormorant text-xl"
                  style={{ fontWeight: 400 }}
                >
                  Наш подход — ЗемлеДом
                </h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Строим дом на поверхности по стандартным технологиям",
                  "Надёжная внешняя гидроизоляция в комфортных условиях",
                  "Обсыпка грунтом с формированием ландшафта",
                  "Посев травы и высадка растений на крыше",
                  "Стоимость близка к обычному строительству",
                  "Сроки — как у стандартного дома",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Icon
                      name="CircleCheck"
                      size={14}
                      color="var(--accent)"
                      className="mt-0.5 flex-shrink-0"
                    />
                    <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ТЕХНОЛОГИЯ — 4 ЭТАПА
      ══════════════════════════════════════════ */}
      <section
        id="tech"
        className="py-28 relative z-10"
        style={{
          background:
            "linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-card) 50%, var(--bg-deep) 100%)",
          borderTop: "1px solid var(--border-line)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-5">
              <span className="accent-line" />
              <span
                className="text-sm font-medium tracking-widest uppercase"
                style={{ color: "var(--accent)" }}
              >
                Технология строительства
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2
                className="font-cormorant"
                style={{
                  fontSize: "clamp(32px, 4vw, 52px)",
                  fontWeight: 300,
                  lineHeight: 1.2,
                }}
              >
                Как это делается
              </h2>
              <p
                className="max-w-sm text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                Четыре последовательных этапа превращают обычный
                участок в зелёный холм с уютным домом внутри.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                num: "01",
                icon: "Hammer",
                title: "Строительство",
                desc: "Возводим дом на поверхности: фундамент, стены, перекрытия, кровля. Работаем в комфортных условиях с доступом ко всем сторонам.",
                detail: "Монолитный ж/б или сборный каркас",
              },
              {
                num: "02",
                icon: "Shield",
                title: "Гидроизоляция",
                desc: "Наносим многослойную гидроизоляцию снаружи, устанавливаем дренажные маты и геотекстиль для защиты от влаги.",
                detail: "5-слойная защитная система",
              },
              {
                num: "03",
                icon: "Layers",
                title: "Обсыпка грунтом",
                desc: "Послойно засыпаем дом подготовленным грунтом, формируя плавные холмы и террасы вокруг и поверх конструкции.",
                detail: "Послойное уплотнение по 30 см",
              },
              {
                num: "04",
                icon: "Leaf",
                title: "Ландшафт",
                desc: "Создаём живой ландшафт: засев травой, посадка кустарников и деревьев, организация дорожек и террасных зон.",
                detail: "Живая зелёная кровля и склоны",
              },
            ].map((step, i) => (
              <div
                key={i}
                className={`rounded-2xl p-7 cursor-pointer transition-all duration-300 card-hover ${
                  activeStep === i ? "step-active" : ""
                }`}
                style={{ background: "var(--bg-card)" }}
                onClick={() => setActiveStep(i)}
              >
                {/* Number */}
                <div
                  className="font-cormorant mb-5"
                  style={{
                    fontSize: 48,
                    fontWeight: 300,
                    lineHeight: 1,
                    color:
                      activeStep === i
                        ? "var(--accent)"
                        : "rgba(255,255,255,0.1)",
                    transition: "color 0.3s ease",
                  }}
                >
                  {step.num}
                </div>

                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background:
                      activeStep === i
                        ? "var(--accent-dim)"
                        : "rgba(255,255,255,0.04)",
                    color:
                      activeStep === i ? "var(--accent)" : "var(--text-muted)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Icon name={step.icon} size={18} />
                </div>

                <h3
                  className="font-golos font-semibold mb-3"
                  style={{ color: "var(--text-main)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "var(--text-muted)" }}
                >
                  {step.desc}
                </p>
                <div
                  className="text-xs font-medium"
                  style={{ color: "var(--accent2)" }}
                >
                  {step.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ПРЕИМУЩЕСТВА
      ══════════════════════════════════════════ */}
      <section
        id="benefits"
        className="py-28 relative z-10"
        style={{ borderTop: "1px solid var(--border-line)" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Список преимуществ */}
            <div>
              <div className="flex items-center gap-4 mb-5">
                <span className="accent-line" />
                <span
                  className="text-sm font-medium tracking-widest uppercase"
                  style={{ color: "var(--accent)" }}
                >
                  Почему ЗемлеДом
                </span>
              </div>
              <h2
                className="font-cormorant mb-10"
                style={{
                  fontSize: "clamp(32px, 4vw, 52px)",
                  fontWeight: 300,
                  lineHeight: 1.2,
                }}
              >
                Преимущества
                <br />
                <span style={{ color: "var(--accent)", fontStyle: "italic" }}>
                  подземного жилья
                </span>
              </h2>

              <div className="space-y-5">
                {[
                  {
                    icon: "Thermometer",
                    title: "Постоянная температура",
                    desc: "Грунт поддерживает +12…+16°C круглый год. Летом прохладно, зимой тепло — без мощного отопления.",
                    accent: "var(--accent)",
                  },
                  {
                    icon: "VolumeX",
                    title: "Полная звукоизоляция",
                    desc: "Метровый слой земли гасит любые внешние шумы: дорога, соседи, ветер — ничего не слышно.",
                    accent: "var(--accent)",
                  },
                  {
                    icon: "Wind",
                    title: "Защита от стихий",
                    desc: "Ураган, смерч, экстремальный холод или жара — дом под землёй невосприимчив к погодным катаклизмам.",
                    accent: "var(--accent)",
                  },
                  {
                    icon: "TreePine",
                    title: "Живой ландшафт",
                    desc: "Участок остаётся «нетронутым» — дом скрыт под холмом, а вокруг цветут луга и деревья.",
                    accent: "var(--accent2)",
                  },
                  {
                    icon: "Zap",
                    title: "Экономия энергии до 40%",
                    desc: "Пассивное термостатирование грунтом снижает счета за отопление и кондиционирование в разы.",
                    accent: "var(--accent2)",
                  },
                  {
                    icon: "Clock",
                    title: "Долговечность",
                    desc: "Фасад под землёй не разрушается от ультрафиолета, осадков и перепадов температур. Срок службы — 100+ лет.",
                    accent: "var(--accent2)",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div
                      className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5 transition-all duration-300"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        color: item.accent,
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <Icon name={item.icon} size={18} />
                    </div>
                    <div>
                      <h4
                        className="font-semibold mb-1"
                        style={{ color: "var(--text-main)" }}
                      >
                        {item.title}
                      </h4>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Правая часть: цифры */}
            <div className="space-y-5">
              {[
                {
                  value: "−40%",
                  label: "затрат на отопление и охлаждение",
                  sub: "По сравнению с надземным домом той же площади",
                  color: "var(--accent)",
                },
                {
                  value: "15°C",
                  label: "стабильная температура в грунте",
                  sub: "На глубине 2+ метров — круглый год",
                  color: "var(--accent)",
                },
                {
                  value: "100+",
                  label: "лет срок службы конструкции",
                  sub: "Фасад защищён от внешних воздействий",
                  color: "var(--accent2)",
                },
                {
                  value: "0 дБ",
                  label: "внешних шумов внутри",
                  sub: "Грунт является идеальным звукопоглотителем",
                  color: "var(--accent2)",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-7 card-hover"
                  style={{ background: "var(--bg-card)" }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div
                        className="font-cormorant mb-1"
                        style={{
                          fontSize: "clamp(36px, 4vw, 52px)",
                          fontWeight: 300,
                          color: stat.color,
                          lineHeight: 1,
                        }}
                      >
                        {stat.value}
                      </div>
                      <div
                        className="font-semibold mb-1"
                        style={{ color: "var(--text-main)" }}
                      >
                        {stat.label}
                      </div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {stat.sub}
                      </div>
                    </div>
                    <div
                      className="shimmer w-16 h-16 rounded-xl flex-shrink-0"
                      style={{ opacity: 0.4 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ПРОЕКТЫ
      ══════════════════════════════════════════ */}
      <section
        id="projects"
        className="py-28 relative z-10"
        style={{
          background: "var(--bg-card)",
          borderTop: "1px solid var(--border-line)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <span className="accent-line" />
                <span
                  className="text-sm font-medium tracking-widest uppercase"
                  style={{ color: "var(--accent)" }}
                >
                  Реализованные проекты
                </span>
              </div>
              <h2
                className="font-cormorant"
                style={{
                  fontSize: "clamp(32px, 4vw, 52px)",
                  fontWeight: 300,
                }}
              >
                Дома, которые живут
                <br />
                <span style={{ color: "var(--accent)", fontStyle: "italic" }}>
                  в согласии с природой
                </span>
              </h2>
            </div>
            <button className="btn-outline text-sm self-start md:self-auto">
              Все проекты <Icon name="ArrowRight" size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Холм «Сосновый»",
                area: "220 м²",
                tag: "Одноэтажный",
                desc: "Одноэтажный дом под пологим холмом. Живая крыша засеяна луговыми травами, фасад полностью скрыт.",
                features: ["Атриум с зенитным фонарём", "Панорамные окна на юг", "Зелёная кровля 220 м²"],
              },
              {
                name: "Усадьба «Дубрава»",
                area: "380 м²",
                tag: "Двухуровневый",
                desc: "Двухуровневый комплекс с подземным переходом между корпусами. Искусственные холмы образуют единый ландшафт.",
                features: ["Два корпуса с переходом", "Подземный гараж", "Камин в гостиной"],
              },
              {
                name: "Коттедж «Степной»",
                area: "160 м²",
                tag: "Компактный",
                desc: "Компактный дом для семьи из 4 человек. Минималистичный интерьер, максимальная энергоэффективность.",
                features: ["Пассивное солнечное отопление", "Дождевой сад", "Септик-биореактор"],
              },
            ].map((proj, i) => (
              <div
                key={i}
                className="card-hover rounded-2xl overflow-hidden group"
                style={{ background: "var(--bg-deep)" }}
              >
                {/* Иллюстрация-заглушка */}
                <div
                  className="relative overflow-hidden"
                  style={{ height: 200 }}
                >
                  {/* Пейзаж */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, #0c1610 0%, #111c0a 60%, #1a2408 100%)",
                    }}
                  />
                  {/* Звёзды */}
                  {[...Array(12)].map((_, j) => (
                    <div
                      key={j}
                      className="absolute rounded-full"
                      style={{
                        width: 1.5,
                        height: 1.5,
                        background: "rgba(255,255,255,0.4)",
                        top: `${(j * 11) % 50}%`,
                        left: `${(j * 17) % 90}%`,
                      }}
                    />
                  ))}
                  {/* Холм */}
                  <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{ height: "60%" }}
                  >
                    <svg
                      viewBox="0 0 400 120"
                      className="w-full h-full"
                      preserveAspectRatio="none"
                    >
                      <path
                        d={
                          i === 0
                            ? "M0,120 L0,80 Q100,20 200,40 Q300,60 400,50 L400,120 Z"
                            : i === 1
                            ? "M0,120 L0,60 Q80,10 160,30 Q240,50 300,20 Q360,0 400,30 L400,120 Z"
                            : "M0,120 L0,70 Q120,30 200,50 Q280,70 400,40 L400,120 Z"
                        }
                        fill="rgba(30,40,12,0.9)"
                      />
                      <path
                        d={
                          i === 0
                            ? "M0,80 Q100,20 200,40 Q300,60 400,50"
                            : i === 1
                            ? "M0,60 Q80,10 160,30 Q240,50 300,20 Q360,0 400,30"
                            : "M0,70 Q120,30 200,50 Q280,70 400,40"
                        }
                        fill="none"
                        stroke="rgba(139,195,74,0.5)"
                        strokeWidth="1.5"
                      />
                      {/* Трава на холме */}
                      {[...Array(16)].map((_, j) => (
                        <line
                          key={j}
                          x1={25 * j + 5}
                          y1={
                            i === 0
                              ? 80 - Math.abs(Math.sin(j * 0.6)) * 40 + 8
                              : i === 1
                              ? 65 - Math.abs(Math.sin(j * 0.5)) * 45 + 8
                              : 70 - Math.abs(Math.sin(j * 0.55)) * 35 + 8
                          }
                          x2={25 * j + 5}
                          y2={
                            i === 0
                              ? 80 - Math.abs(Math.sin(j * 0.6)) * 40 + 8 - 6
                              : i === 1
                              ? 65 - Math.abs(Math.sin(j * 0.5)) * 45 + 8 - 6
                              : 70 - Math.abs(Math.sin(j * 0.55)) * 35 + 8 - 6
                          }
                          stroke="rgba(139,195,74,0.6)"
                          strokeWidth="1.5"
                        />
                      ))}
                    </svg>
                  </div>
                  {/* Значок площади */}
                  <div
                    className="absolute top-4 right-4 tag-gold text-xs"
                    style={{ backdropFilter: "blur(8px)" }}
                  >
                    {proj.area}
                  </div>
                  {/* Тип */}
                  <div
                    className="absolute top-4 left-4 tag text-xs"
                    style={{ backdropFilter: "blur(8px)" }}
                  >
                    {proj.tag}
                  </div>
                </div>

                {/* Описание */}
                <div className="p-6">
                  <h3
                    className="font-cormorant text-xl mb-2"
                    style={{ fontWeight: 400, color: "var(--text-main)" }}
                  >
                    {proj.name}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {proj.desc}
                  </p>
                  <ul className="space-y-1">
                    {proj.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                        <div
                          className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: "var(--accent)" }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="mt-5 text-sm flex items-center gap-2 transition-colors duration-200"
                    style={{ color: "var(--accent)" }}
                  >
                    Подробнее <Icon name="ArrowRight" size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ОТЗЫВЫ
      ══════════════════════════════════════════ */}
      <section
        className="py-28 relative z-10"
        style={{ borderTop: "1px solid var(--border-line)" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14 text-center">
            <div className="flex items-center justify-center gap-4 mb-5">
              <span className="accent-line" />
              <span
                className="text-sm font-medium tracking-widest uppercase"
                style={{ color: "var(--accent)" }}
              >
                Владельцы ЗемлеДомов
              </span>
              <span className="accent-line" />
            </div>
            <h2
              className="font-cormorant"
              style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 300 }}
            >
              Жизнь под землёй — это{" "}
              <span style={{ color: "var(--accent)", fontStyle: "italic" }}>
                не фантастика
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                text: "Зимой никогда не было ниже +18 без отопления. Летом +22 без кондиционера. Счета за энергию снизились в три раза по сравнению с нашим предыдущим домом.",
                name: "Андрей и Наталья В.",
                role: "Холм «Сосновый», 2 года",
                icon: "Thermometer",
              },
              {
                text: "Гости всегда изумляются, когда узнают, что мы живём под землёй. Внутри — обычный светлый дом с высокими потолками и панорамными окнами. Никакого ощущения пещеры.",
                name: "Сергей К.",
                role: "Усадьба «Дубрава», 3 года",
                icon: "Sun",
              },
              {
                text: "Мы хотели жить в гармонии с природой, не жертвуя комфортом. ЗемлеДом дал нам именно это. Ребёнок играет на «крыше» — это просто луг с цветами.",
                name: "Екатерина и Дмитрий Р.",
                role: "Коттедж «Степной», 1 год",
                icon: "Leaf",
              },
            ].map((review, i) => (
              <div
                key={i}
                className="card-hover rounded-2xl p-7 flex flex-col justify-between"
                style={{ background: "var(--bg-card)" }}
              >
                <div>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                    style={{
                      background: "var(--accent-dim)",
                      color: "var(--accent)",
                    }}
                  >
                    <Icon name={review.icon} size={18} />
                  </div>
                  <p
                    className="text-sm leading-relaxed mb-6"
                    style={{ color: "var(--text-muted)", fontStyle: "italic" }}
                  >
                    «{review.text}»
                  </p>
                </div>
                <div
                  className="flex items-center gap-3"
                  style={{
                    borderTop: "1px solid var(--border-line)",
                    paddingTop: 16,
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold"
                    style={{
                      background: "var(--accent-dim)",
                      color: "var(--accent)",
                    }}
                  >
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{review.name}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {review.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA
      ══════════════════════════════════════════ */}
      <section
        id="contact"
        className="py-28 relative z-10"
        style={{ borderTop: "1px solid var(--border-line)" }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div
            className="rounded-3xl p-12 md:p-20 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #0d1a08 0%, #0a1406 50%, #0d1a08 100%)",
              border: "1px solid rgba(139,195,74,0.2)",
            }}
          >
            {/* Glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 blur-3xl opacity-15 -top-10"
              style={{ background: "var(--accent)" }}
            />
            {/* Декоративный холм */}
            <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden opacity-10">
              <svg viewBox="0 0 800 80" className="w-full" preserveAspectRatio="none">
                <path
                  d="M0,80 L0,50 Q200,10 400,30 Q600,50 800,20 L800,80 Z"
                  fill="var(--accent)"
                />
              </svg>
            </div>

            <span className="tag mb-6 inline-block">Начните проект сегодня</span>
            <h2
              className="font-cormorant mb-6"
              style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300 }}
            >
              Ваш зелёный холм
              <br />
              <span style={{ color: "var(--accent)", fontStyle: "italic" }}>
                ждёт вас
              </span>
            </h2>
            <p
              className="mb-10 max-w-lg mx-auto leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Расскажите нам о своём участке и пожеланиях — мы разработаем
              концепцию дома, впишем его в рельеф и рассчитаем стоимость
              строительства.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-base px-10">
                <Icon name="MessageCircle" size={18} />
                Обсудить проект
              </button>
              <button className="btn-outline text-base px-10">
                <Icon name="Calculator" size={18} />
                Рассчитать стоимость
              </button>
            </div>

            {/* Контакты под кнопками */}
            <div
              className="mt-10 flex flex-wrap justify-center gap-8"
              style={{ color: "var(--text-muted)" }}
            >
              {[
                { icon: "Phone", text: "+7 (800) 555-35-35" },
                { icon: "Mail", text: "info@zemledom.ru" },
                { icon: "MapPin", text: "Работаем по всей России" },
              ].map((c) => (
                <div key={c.text} className="flex items-center gap-2 text-sm">
                  <Icon name={c.icon} size={14} color="var(--accent)" />
                  {c.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ФУТЕР
      ══════════════════════════════════════════ */}
      <footer
        className="py-12 relative z-10"
        style={{
          borderTop: "1px solid var(--border-line)",
          background: "var(--bg-card)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "var(--accent)" }}
              >
                <Icon name="Mountain" size={16} color="#0a0d07" />
              </div>
              <div>
                <span
                  className="font-cormorant font-semibold text-lg"
                  style={{ color: "var(--text-main)" }}
                >
                  ЗемлеДом
                </span>
                <span
                  className="text-xs block"
                  style={{ color: "var(--text-muted)" }}
                >
                  Строим дома, которых не видно
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6 flex-wrap justify-center">
              {["Концепция", "Технология", "Проекты", "Преимущества", "Контакты"].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item}
                  </a>
                )
              )}
            </div>

            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              © 2024 ЗемлеДом. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
