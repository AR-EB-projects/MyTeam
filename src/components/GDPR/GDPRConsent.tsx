"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./GDPRConsent.css";

export const GDPRConsent: React.FC = () => {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("gdpr-consent-accepted");
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("gdpr-consent-accepted", "true");
        setIsVisible(false);
    };

    if (pathname === "/privacy" || pathname === "/terms") return null;
    if (!isVisible) return null;

    return (
        <div className="gdpr-overlay">
            <div className="gdpr-container fade-in">
                <div className="gdpr-content">
                    <div className="gdpr-icon">
                        <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                    </div>
                    <h2 className="text-green-accent">Защита на данните</h2>
                    <p>
                        Това приложение използва локално съхранение и бисквитки за осигуряване на функционалността на Вашата членска карта, следене на присъствията и получаване на известия. 
                    </p>
                    <p className="text-secondary text-small">
                        С натискането на бутона "Приемам", Вие се съгласявате с нашата{" "}
                        <Link href="/privacy" className="legal-link" target="_blank" rel="noopener noreferrer">Политика за поверителност</Link> и{" "}
                        <Link href="/terms" className="legal-link" target="_blank" rel="noopener noreferrer">Общи условия</Link>, регулирани от Българското законодателство (ЗЗЛД) и Регламент (ЕС) 2016/679 (GDPR).
                    </p>
                    <div className="gdpr-actions">
                        <button onClick={handleAccept} className="btn btn-primary w-full">
                            Приемам
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
