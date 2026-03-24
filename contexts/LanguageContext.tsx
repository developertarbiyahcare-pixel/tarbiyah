import React, { createContext, useContext, ReactNode } from 'react';
import { translations } from '../translations';

export type Language = 'id' | 'en';
type TranslationKey = keyof typeof translations;

// Updated type: remove setLang
interface LanguageContextType {
  lang: Language;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const lang: Language = 'id'; // Hardcode language to Indonesian

  const t = (key: TranslationKey): string => {
    // Use the hardcoded lang. Fallback to key if translation is missing.
    return translations[key]?.[lang] || key;
  };

  // Provide the simplified context value
  return (
    <LanguageContext.Provider value={{ lang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
