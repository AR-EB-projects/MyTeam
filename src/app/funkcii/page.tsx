// @ts-nocheck
"use client";

import React, { useState, useEffect, useRef } from "react";
import "../page.css";
import NavBar from "@/components/NavBar";
import { 
  Users, CreditCard, IdCard, BarChart3, Calendar, 
  ChevronDown, User, MessageSquare, ArrowRight, Zap,
  Play, X
} from "lucide-react";

function RevealSection({ children }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(true);
        obs.unobserve(el);
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal-hidden ${active ? "reveal-active" : ""}`}>
      {children}
    </div>
  );
}

const FEATURES = [
  {
    id: 1,
    title: "Автоматизирано събиране на такси",
    icon: <CreditCard size={24} />,
    emoji: "💸",
    how: "Забравете за тетрадките и \"гоненето\" на родители. Системата следи плащанията в реално време и изпраща автоматични напомняния.",
    result: "100% събираемост без неудобни разговори."
  },
  {
    id: 2,
    title: "Интелигентен график и присъствия",
    icon: <Calendar size={24} />,
    emoji: "📅",
    how: "Онлайн график, достъпен за треньори и родители. Отбелязване на присъствия с един клик и автоматично следене на лимити (например при предплатени карти).",
    result: "Край на Viber въпросите „Кога е тренировката?“."
  },
  {
    id: 3,
    title: "Дигитален профил на спортиста",
    icon: <User size={24} />,
    emoji: "👤",
    how: "Пълно досие за всяко дете – лични данни, история на плащанията, здравна информация и развитие в клуба. Всичко е защитено и организирано.",
    result: "Професионално отношение към всеки член."
  },
  {
    id: 4,
    title: "Смарт карти за лоялност",
    icon: <IdCard size={24} />,
    emoji: "🃏",
    how: "Вашите членове получават персонални карти, които им осигуряват реални отстъпки при нашите партньори (като Sport Depot).",
    result: "Софтуерът се изплаща сам чрез добавената стойност за родителите."
  },
  {
    id: 5,
    title: "Комуникационен център",
    icon: <MessageSquare size={24} />,
    emoji: "💬",
    how: "Централизирани съобщения и известия. Важната информация (промяна в час, лагери, състезания) достига до всички за секунди.",
    result: "Пълна тишина във Viber групите и фокус върху работата."
  },
  {
    id: 6,
    title: "Финансови отчети и анализи",
    icon: <BarChart3 size={24} />,
    emoji: "📈",
    how: "Ясна картина за приходите и разходите на клуба по всяко време. Следите растежа си с реални данни, а не на око.",
    result: "Спокойствие и сигурност за бъдещето на клуба."
  }
];

function VideoModal({ onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  }, []);

  const handleOverlayClick = () => {
    if (videoRef.current) videoRef.current.pause();
    onClose();
  };

  return (
    <div
      onClick={handleOverlayClick}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.92)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 900,
          background: "#000",
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 0 60px rgba(57,255,20,0.2)",
          border: "1px solid rgba(255,255,255,0.1)"
        }}
      >
        <button
          onClick={handleOverlayClick}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 10,
            background: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "50%",
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#fff",
            transition: "all 0.3s ease"
          }}
        >
          <X size={24} />
        </button>
        <video
          ref={videoRef}
          src="/demo.mp4"
          controls
          playsInline
          style={{ width: "100%", display: "block", maxHeight: "70vh" }}
        />
        <div style={{ padding: "32px", textAlign: "center", background: "#070C14", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <a href="/#Контакт" onClick={onClose} className="vip-main-cta-btn" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "14px",
            background: "var(--neon-green)",
            color: "#000",
            padding: "20px 48px",
            borderRadius: "16px",
            fontSize: "17px",
            fontWeight: 900,
            textDecoration: "none",
            transition: "all 0.3s ease",
            boxShadow: "0 10px 30px rgba(57, 255, 20, 0.3)",
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}>
            Започнете безплатно сега
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function FunkciiPage() {
  const [activeFeature, setActiveFeature] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <>
      <NavBar />
      <RevealSection>
        <section id="Функции" className="features-redesign-section" style={{ padding: "100px 24px", background: "#070C14", scrollMarginTop: "100px", paddingTop: "160px", minHeight: "100vh" }}>
          <div className="section-container-wide" style={{ maxWidth: 900 }}>
            
            {/* HEADER */}
            <div className="features-header-v3" style={{ marginBottom: 80, textAlign: "center" }}>
              <div className="dash-tag-centered" style={{ marginBottom: 20 }}>СЕКЦИЯ: ФУНКЦИИ</div>
              <h1 className="section-title-premium" style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}>
                Всичко, от което Вашият клуб се нуждае,<br />
                <span className="text-neon">събрано в един екран</span>
              </h1>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "18px", maxWidth: 700, margin: "0 auto", lineHeight: 1.6 }}>
                MyTeam7 автоматизира рутината, за да Ви остави време за най-важното – тренировъчния процес.
              </p>
            </div>

            {/* ACCORDION LIST */}
            <div className="features-accordion-v3" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {FEATURES.map((f) => (
                <div 
                  key={f.id} 
                  className={`feature-item-v3 ${activeFeature === f.id ? "active" : ""}`}
                  onClick={() => setActiveFeature(activeFeature === f.id ? null : f.id)}
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "24px",
                    cursor: "pointer",
                    overflow: "hidden",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    boxShadow: activeFeature === f.id ? "0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(57,255,20,0.05)" : "none",
                    transform: activeFeature === f.id ? "translateY(-4px)" : "translateY(0)",
                    borderColor: activeFeature === f.id ? "rgba(57,255,20,0.3)" : "rgba(255,255,255,0.05)"
                  }}
                >
                  <div className="feature-trigger-v3" style={{
                    padding: "32px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 24
                  }}>
                    {/* Icon Column */}
                    <div className="feature-icon-box" style={{
                      width: "56px",
                      height: "56px",
                      background: activeFeature === f.id ? "var(--neon-green)" : "rgba(255,255,255,0.05)",
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      color: activeFeature === f.id ? "#000" : "var(--neon-green)",
                      transition: "all 0.3s ease"
                    }}>
                      {f.icon}
                    </div>

                    {/* Text Column */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                        <h3 style={{ 
                          fontSize: "22px", 
                          fontWeight: 800, 
                          color: activeFeature === f.id ? "var(--neon-green)" : "#fff",
                          transition: "color 0.3s ease"
                        }}>
                          {f.id}. {f.title} {f.emoji}
                        </h3>
                        <div style={{
                          transform: activeFeature === f.id ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                          color: activeFeature === f.id ? "var(--neon-green)" : "rgba(255,255,255,0.2)",
                          flexShrink: 0
                        }}>
                          <ChevronDown size={24} />
                        </div>
                      </div>

                      {/* Summary / Clamped line */}
                      <div style={{
                        maxHeight: activeFeature === f.id ? "0" : "32px",
                        opacity: activeFeature === f.id ? 0 : 1,
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                        marginTop: 4
                      }}>
                        <p style={{ 
                          color: "rgba(255,255,255,0.4)", 
                          fontSize: "15px", 
                          whiteSpace: "nowrap", 
                          overflow: "hidden", 
                          textOverflow: "ellipsis",
                          margin: 0
                        }}>
                          {f.how}
                        </p>
                      </div>

                      {/* Expanded Content */}
                      <div style={{
                        maxHeight: activeFeature === f.id ? "400px" : "0",
                        opacity: activeFeature === f.id ? 1 : 0,
                        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                        overflow: "hidden"
                      }}>
                        <div style={{ paddingTop: 16 }}>
                          <div style={{ marginBottom: 20 }}>
                            <div style={{ color: "var(--neon-green)", fontWeight: 800, fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>КАК ПОМАГА:</div>
                            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "16px", lineHeight: 1.6 }}>{f.how}</p>
                          </div>
                          
                          <div style={{ 
                            background: "rgba(57, 255, 20, 0.05)", 
                            padding: "20px", 
                            borderRadius: "16px", 
                            borderLeft: "4px solid var(--neon-green)",
                            display: "flex",
                            alignItems: "center",
                            gap: 16
                          }}>
                            <Zap size={20} color="var(--neon-green)" />
                            <div>
                              <div style={{ color: "var(--neon-green)", fontWeight: 800, fontSize: "13px", letterSpacing: "0.5px" }}>РЕЗУЛТАТ:</div>
                              <div style={{ color: "#fff", fontWeight: 700, fontSize: "15px" }}>{f.result}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ marginTop: 80, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
               <button 
                 onClick={() => setShowVideoModal(true)}
                 className="vip-main-cta-btn" 
                 style={{
                   display: "inline-flex",
                   alignItems: "center",
                   gap: "18px",
                   background: "var(--neon-green)",
                   color: "#000",
                   padding: "24px 64px",
                   borderRadius: "20px",
                   fontSize: "20px",
                   fontWeight: 900,
                   border: "none",
                   cursor: "pointer",
                   transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                   boxShadow: "0 15px 40px rgba(57, 255, 20, 0.3)",
                   textTransform: "uppercase",
                   letterSpacing: "1px"
                 }}
               >
                <Play size={24} fill="#000" />
                ВИЖ КАК РАБОТИ
              </button>
            </div>

          </div>
        </section>
      </RevealSection>

      {showVideoModal && <VideoModal onClose={() => setShowVideoModal(false)} />}
    </>
  );
}
