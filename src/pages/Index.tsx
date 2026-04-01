import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="min-h-screen font-golos"
      style={{
        background: "var(--bg-deep)",
        color: "var(--text-main)",
      }}
    >
      {/* ── CSS Variables ── */}
      <style>{`
        :root {
          --bg-deep: #080c14;
          --bg-card: #0d1422;
          --bg-glass: rgba(13,20,34,0.7);
          --accent: #3be3b0;
          --accent-dim: rgba(59,227,176,0.12);
          --accent2: #5b8fff;
          --text-main: #eef2ff;
          --text-muted: #7a8aad;
          --border-line: rgba(255,255,255,0.07);
        }

        .nav-glass {
          background: rgba(8,12,20,0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-line);
        }

        .hero-glow {
          background: radial-gradient(ellipse 70% 60% at 50% -10%,
            rgba(91,143,255,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 80% 40%,
            rgba(59,227,176,0.10) 0%, transparent 60%);
        }

        .accent-line {
          display: inline-block;
          width: 48px;
          height: 2px;
          background: var(--accent);
          transform-origin: left;
        }

        .card-hover {
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid var(--border-line);
        }
        .card-hover:hover {
          transform: translateY(-6px);
          border-color: rgba(59,227,176,0.3);
          box-shadow: 0 20px 60px rgba(59,227,176,0.08);
        }

        .btn-primary {
          background: var(--accent);
          color: #08111f;
          font-weight: 600;
          border-radius: 6px;
          padding: 14px 32px;
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-primary:hover {
          background: #5ff0c0;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(59,227,176,0.35);
        }

        .btn-outline {
          border: 1px solid rgba(255,255,255,0.2);
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
          border: 1px solid rgba(59,227,176,0.2);
          border-radius: 100px;
          padding: 4px 14px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.04em;
        }

        .mesh-bg {
          background:
            radial-gradient(circle at 20% 80%, rgba(91,143,255,0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(59,227,176,0.06) 0%, transparent 50%),
            var(--bg-deep);
        }

        .noise-overlay::after {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .anim-1 { animation: fade-in-up 0.7s ease-out 0.1s both; }
        .anim-2 { animation: fade-in-up 0.7s ease-out 0.3s both; }
        .anim-3 { animation: fade-in-up 0.7s ease-out 0.5s both; }
        .anim-4 { animation: fade-in-up 0.7s ease-out 0.7s both; }
        .anim-5 { animation: fade-in-up 0.7s ease-out 0.9s both; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        .float { animation: float 5s ease-in-out infinite; }

        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .pulse-ring {
          animation: pulse-ring 2.5s ease-out infinite;
        }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* ── Navigation ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-glass" : ""}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--accent)" }}>
                <span className="text-[#08111f] font-bold text-sm font-golos">П</span>
              </div>
              <div className="absolute inset-0 rounded-lg pulse-ring" style={{ border: "1px solid var(--accent)" }} />
            </div>
            <span className="font-cormorant font-semibold text-xl" style={{ color: "var(--text-main)" }}>
              Поехали
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {["О нас", "Услуги", "Портфолио", "Контакты"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm transition-colors duration-200 hover:text-white"
                style={{ color: "var(--text-muted)" }}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="btn-outline text-sm py-2 px-5">Войти</button>
            <button className="btn-primary text-sm py-2 px-5">Начать</button>
          </div>

          {/* Mobile menu */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: "var(--text-main)" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden nav-glass px-6 pb-6 pt-2 flex flex-col gap-4">
            {["О нас", "Услуги", "Портфолио", "Контакты"].map((item) => (
              <a key={item} href="#" className="text-base" style={{ color: "var(--text-muted)" }}>
                {item}
              </a>
            ))}
            <button className="btn-primary w-full justify-center mt-2">Начать</button>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-glow">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(var(--border-line) 1px, transparent 1px),
              linear-gradient(90deg, var(--border-line) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating orbs */}
        <div
          className="float absolute top-1/4 right-1/4 w-72 h-72 rounded-full opacity-10 blur-3xl"
          style={{ background: "var(--accent2)", animationDelay: "0s" }}
        />
        <div
          className="float absolute bottom-1/3 left-1/4 w-56 h-56 rounded-full opacity-8 blur-3xl"
          style={{ background: "var(--accent)", animationDelay: "2s" }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="anim-1">
            <span className="tag">Первая версия вашего сайта</span>
          </div>

          <h1 className="font-cormorant mt-6 mb-2 anim-2" style={{ fontSize: "clamp(52px, 9vw, 96px)", fontWeight: 300, lineHeight: 1.05 }}>
            Запустите свой проект
          </h1>
          <h1 className="font-cormorant mb-8 anim-3" style={{ fontSize: "clamp(52px, 9vw, 96px)", fontWeight: 300, lineHeight: 1.05, fontStyle: "italic", color: "var(--accent)" }}>
            быстро и красиво
          </h1>

          <p className="max-w-xl mx-auto text-lg mb-10 anim-4 leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Современный лендинг с уникальным дизайном — уже готов. Опишите вашу идею, и мы настроим каждую деталь под вас.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center anim-5">
            <button className="btn-primary text-base">
              <Icon name="Zap" size={18} />
              Начать проект
            </button>
            <button className="btn-outline text-base">
              <Icon name="Play" size={18} />
              Посмотреть примеры
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="mt-20 flex flex-col items-center gap-2 opacity-40 anim-5">
            <span className="text-xs tracking-widest uppercase font-golos" style={{ color: "var(--text-muted)" }}>
              Скролл
            </span>
            <div className="w-px h-12 animate-bounce" style={{ background: "var(--border-line)" }} />
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 relative z-10" style={{ borderTop: "1px solid var(--border-line)", borderBottom: "1px solid var(--border-line)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "30×", label: "быстрее разработка" },
              { num: "500+", label: "проектов запущено" },
              { num: "98%", label: "клиентов довольны" },
              { num: "24/7", label: "поддержка онлайн" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className="stat-num" style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>{stat.num}</span>
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-28 relative z-10 mesh-bg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <span className="accent-line" />
              <span className="text-sm font-medium tracking-widest uppercase" style={{ color: "var(--accent)" }}>
                Услуги
              </span>
            </div>
            <h2 className="font-cormorant" style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 300, maxWidth: 500 }}>
              Всё для вашего цифрового присутствия
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "Palette",
                title: "Дизайн & UI",
                desc: "Уникальный визуальный стиль, продуманная типографика и интуитивный пользовательский интерфейс.",
                tags: ["Figma", "UI Kit", "Брендинг"],
              },
              {
                icon: "Code2",
                title: "Разработка",
                desc: "Быстрый, чистый код на современных технологиях. React, TypeScript, адаптивная верстка.",
                tags: ["React", "TypeScript", "SEO"],
              },
              {
                icon: "Rocket",
                title: "Запуск & Поддержка",
                desc: "Деплой, домен, аналитика и постоянная поддержка. Ваш сайт всегда работает идеально.",
                tags: ["Деплой", "Аналитика", "24/7"],
              },
            ].map((card, i) => (
              <div
                key={i}
                className="card-hover rounded-2xl p-8"
                style={{ background: "var(--bg-card)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
                >
                  <Icon name={card.icon} size={22} />
                </div>
                <h3 className="font-cormorant mb-3" style={{ fontSize: 26, fontWeight: 400 }}>
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                  {card.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span key={tag} className="tag text-xs">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-28 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            {/* Left visual */}
            <div className="relative">
              <div
                className="float rounded-3xl overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, var(--bg-card) 0%, #111827 100%)",
                  border: "1px solid var(--border-line)",
                  aspectRatio: "4/3",
                }}
              >
                {/* Mock UI inside card */}
                <div className="p-8 h-full flex flex-col justify-between">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 rounded-full w-3/4 opacity-20" style={{ background: "var(--text-main)" }} />
                    <div className="h-3 rounded-full w-1/2 opacity-15" style={{ background: "var(--text-main)" }} />
                    <div className="h-8 rounded-lg w-2/5 mt-4" style={{ background: "var(--accent)", opacity: 0.8 }} />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[0.6, 0.9, 0.5, 0.8, 0.4, 0.7].map((h, i) => (
                      <div
                        key={i}
                        className="rounded"
                        style={{
                          height: `${h * 60}px`,
                          background: i % 2 === 0 ? "var(--accent2)" : "var(--accent)",
                          opacity: 0.3 + h * 0.3,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {/* Decoration */}
              <div
                className="absolute -bottom-6 -right-6 w-48 h-48 rounded-2xl -z-10"
                style={{ background: "var(--accent-dim)", border: "1px solid rgba(59,227,176,0.15)" }}
              />
            </div>

            {/* Right text */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="accent-line" />
                <span className="text-sm font-medium tracking-widest uppercase" style={{ color: "var(--accent)" }}>
                  Почему мы
                </span>
              </div>
              <h2 className="font-cormorant mb-8" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, lineHeight: 1.2 }}>
                Скорость не в ущерб качеству
              </h2>

              <div className="space-y-6">
                {[
                  { icon: "Bolt", title: "Запуск за 24 часа", desc: "От идеи до готового сайта — за один рабочий день." },
                  { icon: "Sparkles", title: "Уникальный дизайн", desc: "Никаких шаблонов — каждый проект создаётся с нуля." },
                  { icon: "ShieldCheck", title: "Надёжность", desc: "Хостинг, SSL, бэкапы и мониторинг включены." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5"
                      style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
                    >
                      <Icon name={item.icon} size={18} />
                    </div>
                    <div>
                      <h4 className="font-golos font-600 mb-1" style={{ color: "var(--text-main)" }}>{item.title}</h4>
                      <p className="text-sm" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="btn-primary mt-10">
                <Icon name="ArrowRight" size={18} />
                Узнать подробнее
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-28 relative z-10" style={{ borderTop: "1px solid var(--border-line)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="accent-line" />
                <span className="text-sm font-medium tracking-widest uppercase" style={{ color: "var(--accent)" }}>
                  Отзывы
                </span>
              </div>
              <h2 className="font-cormorant" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300 }}>
                Что говорят клиенты
              </h2>
            </div>
            <button className="btn-outline text-sm self-start md:self-auto">
              Все отзывы <Icon name="ArrowRight" size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                text: "Запустили интернет-магазин за 2 дня. Качество дизайна превзошло все ожидания — клиенты постоянно делают комплименты.",
                name: "Мария С.",
                role: "Основатель, BoutiqueStore",
                rating: 5,
              },
              {
                text: "Наконец нашли команду, которая понимает с полуслова. Сайт получился именно таким, каким я его представлял — строгим и современным.",
                name: "Александр К.",
                role: "CEO, TechVentures",
                rating: 5,
              },
              {
                text: "Работа с поехали — это удовольствие. Быстро, качественно, и всегда на связи. Рекомендую всем предпринимателям.",
                name: "Елена Р.",
                role: "Директор, EduCenter",
                rating: 5,
              },
            ].map((review, i) => (
              <div
                key={i}
                className="card-hover rounded-2xl p-7 flex flex-col justify-between"
                style={{ background: "var(--bg-card)" }}
              >
                <div>
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Icon key={j} name="Star" size={14} />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)", fontStyle: "italic" }}>
                    «{review.text}»
                  </p>
                </div>
                <div className="flex items-center gap-3" style={{ borderTop: "1px solid var(--border-line)", paddingTop: 16 }}>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium"
                    style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
                  >
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{review.name}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div
            className="rounded-3xl p-12 md:p-20 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0d1a2e 0%, #0a1628 50%, #0d1a2e 100%)",
              border: "1px solid rgba(59,227,176,0.2)",
            }}
          >
            {/* Background accent */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 blur-3xl opacity-20 -top-10"
              style={{ background: "var(--accent)" }}
            />

            <span className="tag mb-6 inline-block">Начните прямо сейчас</span>
            <h2 className="font-cormorant mb-6" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300 }}>
              Готовы запустить<br />
              <span style={{ color: "var(--accent)", fontStyle: "italic" }}>ваш проект?</span>
            </h2>
            <p className="mb-10 max-w-lg mx-auto" style={{ color: "var(--text-muted)" }}>
              Напишите нам — и мы обсудим вашу идею, предложим решение и запустим сайт в кратчайшие сроки.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-base px-10">
                <Icon name="MessageCircle" size={20} />
                Написать нам
              </button>
              <button className="btn-outline text-base px-10">
                <Icon name="Phone" size={20} />
                Позвонить
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="py-12 relative z-10"
        style={{ borderTop: "1px solid var(--border-line)" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: "var(--accent)" }}>
                <span className="text-[#08111f] font-bold text-xs">П</span>
              </div>
              <span className="font-cormorant font-semibold text-lg">Поехали</span>
            </div>

            <div className="flex gap-8">
              {["Услуги", "О нас", "Портфолио", "Контакты"].map((item) => (
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

            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              © 2025 Поехали. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;