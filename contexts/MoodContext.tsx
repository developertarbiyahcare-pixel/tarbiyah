
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type Mood = 'neutral' | 'cemas' | 'syukur' | 'sedih' | 'bahagia' | string;

interface AdaptiveVerse {
    arabic: string;
    translation: string;
    source: string;
}

interface MoodContextType {
    mood: Mood;
    adaptiveVerse: AdaptiveVerse | null;
    setMood: (mood: Mood) => void;
    setAdaptiveVerse: (verse: AdaptiveVerse | null) => void;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const MoodProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [mood, setMoodState] = useState<Mood>('neutral');
    const [adaptiveVerse, setAdaptiveVerseState] = useState<AdaptiveVerse | null>(null);

    const setMood = useCallback((newMood: Mood) => {
        const moodClass = `theme-${newMood.toLowerCase()}`;
        // Clear existing theme classes
        document.body.className = document.body.className.replace(/theme-\w+/g, '').trim();
        if (newMood !== 'neutral') {
            document.body.classList.add(moodClass);
        }
        setMoodState(newMood);
    }, []);

    const setAdaptiveVerse = useCallback((verse: AdaptiveVerse | null) => {
        setAdaptiveVerseState(verse);
    }, []);

    return (
        <MoodContext.Provider value={{ mood, adaptiveVerse, setMood, setAdaptiveVerse }}>
            {children}
        </MoodContext.Provider>
    );
};

export const useMood = (): MoodContextType => {
    const context = useContext(MoodContext);
    if (!context) {
        throw new Error('useMood must be used within a MoodProvider');
    }
    return context;
};
