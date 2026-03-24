import React from 'react';

const LanguageToggle: React.FC = () => {
    // FIX: Property 'setLang' does not exist on type 'LanguageContextType'.
    // The language is hardcoded to 'id' in LanguageProvider, so language switching is disabled.
    // This component now returns null to prevent errors and remove the non-functional UI.
    return null;
};
  
export default LanguageToggle;
