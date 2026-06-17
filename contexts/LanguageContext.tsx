'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type Language = 'KO' | 'EN' | 'ES';

const STORAGE_KEY = 'weet-language';
const LANG_ATTR: Record<Language, string> = { KO: 'ko', EN: 'en', ES: 'es' };

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('KO');

    // Restore the persisted choice on mount (SSR default stays Korean for SEO).
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved === 'KO' || saved === 'EN' || saved === 'ES') {
                // One-time hydration from persisted preference. A lazy useState
                // initializer can't read localStorage without causing an SSR/client
                // hydration mismatch (server always renders the 'KO' default), so
                // syncing in this mount effect is the correct pattern here.
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setLanguageState(saved);
            }
        } catch {
            /* localStorage unavailable — keep default */
        }
    }, []);

    // Keep the document language attribute in sync for a11y/SEO. (F15)
    useEffect(() => {
        document.documentElement.lang = LANG_ATTR[language];
    }, [language]);

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch {
            /* ignore persistence failures */
        }
    }, []);

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
