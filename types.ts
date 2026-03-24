

export interface AIResponse {
    title: string;
    quran_arabic: string;
    quran_translation: string;
    hadith: string;
    hadith_source: string;
    doa_arabic: string;
    doa_latin: string;
    doa_translation: string;
    steps: string[];
}

export interface DalilResponse {
    quran_ref: string;
    quran_arabic: string;
    quran_translation: string;
    hadith_ref: string;
    hadith_text: string;
}

export interface TadabburResponse {
    story_title: string;
    story_source: string;
    story_text: string;
    reflection_points: string[];
}

export interface KhutbahPoint {
    point_title: string;
    explanation: string;
    dalil: string;
}

export interface KhutbahOutlineResponse {
    title: string;
    muqaddimah: {
        pembukaan: string;
        ayat_pembuka: string;
    };
    khutbah_pertama: KhutbahPoint[];
    khutbah_kedua: {
        ringkasan: string;
        doa_penutup: string;
    };
}

export interface HalalAnalysisResponse {
    status: 'HALAL' | 'HARAM' | 'SYUBHAT';
    explanation: string;
}

export interface ConsultationHistoryItem {
    id: string; // C-{timestamp}
    timestamp: string;
    mode: 'konsultasi';
    query: string;
    category: string;
    aiResponse: AIResponse;
}

export interface SearchHistoryItem {
    id: string; // D-{timestamp}, T-{timestamp}, P-{timestamp}
    timestamp: string;
    mode: 'dalil' | 'tadabbur' | 'pengetahuan';
    query: string;
    response: any; // Can be DalilResponse, TadabburResponse, or Maps response
}


export interface FAQItem {
    id: number;
    question: string;
    answer: string;
}

export interface FavoriteVerse {
    id: string; // e.g., "1:1"
    surahNumber: number;
    surahName: string;
    ayahNumber: number;
}

export interface Testimonial {
    id: number;
    name: string;
    rating: number;
    comment: string | { id: string, en: string };
    date?: string;
}

export interface Surah {
    number: number;
    name: {
        short: string;
        long: string;
        transliteration: { id: string };
        translation: { id: string };
    };
    revelation: { id: string };
    numberOfVerses: number;
}

export interface Ayah {
    number: { inSurah: number, inQuran: number };
    meta: { juz: number, page: number, hizbQuarter: number };
    text: { arab: string };
    translation: { id: string };
    audio: { primary: string };
    tafsir: {
        id: {
            short: string;
            long: string;
        }
    };
}

export interface SurahDetail extends Surah {
    verses: Ayah[];
    preBismillah: {
        text: { arab: string };
        audio: { primary: string };
    } | null;
}

export interface LastRead {
    number: number;
    name: string;
}

export interface LastReadVerse {
    surahNumber: number;
    surahName: string;
    ayahNumber: number;
    timestamp: number;
}

export interface VerseInJuz extends Ayah {
    surah: Surah;
}

export interface JuzDetail {
    number: number;
    verses: VerseInJuz[];
}

// --- Spaced Repetition System Type ---
export interface SrsHadithItem {
  hadithId: number;
  nextReviewDate: string; // ISO date string or YYYY-MM-DD
  intervalDays: number;
  consecutiveCorrect: number;
}

export interface SrsReviewHistoryItem {
    date: string; // ISO date string
    status: 'Lancar' | 'Kurang Lancar';
    reviewInterval: number; // in days
}


// --- Paginated Content Types ---
export interface ContentPage {
    title: string;
    body: {
        type: 'paragraph' | 'list' | 'sublist' | 'table' | 'collapsible';
        title?: string;
        text?: string;
        items?: (string | { title: string; points: string[] })[];
        table?: { headers: string[]; rows: string[][] };
    }[];
}

export interface KitabKuningTopic {
    id: string;
    title: string;
    author: string;
    icon: string;
    subtitle: string;
    pages: ContentPage[];
}

// --- Journey Types ---
export interface JourneyStep {
  id: string;
  title: { id: string; en: string };
  path: string;
  icon: string;
  duration?: string; // New: e.g., 'Minggu 1', '3 Hari'
  frequency?: string; // New: e.g., '1x Selesai', 'Setiap Hari'
}

export interface JourneyLevel {
  id: string;
  title: { id: string; en: string };
  subtitle: { id: string; en: string };
  steps: JourneyStep[];
}

export interface JourneyProgress {
  [stepId: string]: boolean;
}

export interface AITarbiyahTask {
    title: string;
    description: string;
    link: string; // e.g., "/hadits-arbain/16"
}

export interface AITarbiyahPlan {
    focus: string;
    days: {
        day: string; // e.g., "Senin (Hari 1)"
        tasks: AITarbiyahTask[];
    }[];
}

// --- New Feature Types ---
export interface AIJournalInsight {
    emotion: string;
    verse: string;
    verseSource: string;
    action: string;
}

export interface JurnalEntry {
    id: number;
    date: string;
    prompt: { id: string; en: string };
    entry: string;
    aiInsight?: AIJournalInsight;
}

export interface LenteraEntry {
    id: number;
    date: string;
    title: string;
    content: string;
    likes: number;
    dislikes: number;
    isGiveaway?: boolean;
    location?: string;
}

export interface CustomArticle {
    id: string;
    title: string;
    category: string;
    content: string; // Simple text content for now
    date: string;
    author: string;
}

export interface PeloporItem {
  id: number;
  title: { id: string; en: string };
  description: { id: string; en: string };
  icon: string;
}

export interface PeloporCategory {
  category: { id: string; en: string };
  icon: string;
  items: PeloporItem[];
}

export interface KuisQuestion {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
}

export interface QuizResult {
    date: string;
    score: number;
    correct: number;
    incorrect: number;
    timeTaken: string;
    difficulty: 'mudah' | 'sedang' | 'sulit';
}

export interface HukumSyariahContent {
    type: 'paragraph' | 'list' | 'table';
    title?: string;
    text?: string;
    items?: (string | { title: string; points: string[] })[];
    table?: {
        headers: string[];
        rows: string[][];
    };
}

export interface HukumSyariahTopic {
    id: string;
    title: string;
    icon: string;
    subtitle: string;
    content: HukumSyariahContent[];
    dalil?: {
        text: string;
        source: string;
    };
}

export interface UserProfile {
    photo?: string;
    name?: string;
    instagram?: string;
    whatsapp?: string;
    kota?: string;
    tanggalLahir?: string;
    bio?: string;
    isVerified?: boolean;
}