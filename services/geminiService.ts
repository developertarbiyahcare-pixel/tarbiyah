
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import type { AIResponse, DalilResponse, HalalAnalysisResponse, TadabburResponse, KhutbahOutlineResponse, AITarbiyahPlan, AIJournalInsight } from '../types';
import type { Language } from '../contexts/LanguageContext';

// Declare process for TypeScript
declare const process: {
  env: {
    API_KEY: string;
  };
};

const apiKey = process.env.API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey });

const handleAIError = (error: unknown, serviceName: string): never => {
    console.error(`Error in ${serviceName}:`, error);
    if (error instanceof Error && error.message.includes('API key')) {
        throw new Error('Kunci API tidak valid atau belum diatur. Cek konfigurasi API_KEY.');
    }
    if (error instanceof Error && error.message.includes('JSON')) {
        throw new Error('AI memberikan respons yang tidak valid. Coba lagi.');
    }
    throw new Error(`Gagal mendapatkan respons dari ${serviceName}. Periksa koneksi internet Anda atau coba lagi nanti.`);
};

const parseJsonResponse = <T>(jsonText: string, serviceName: string): T => {
    try {
        const parsed = JSON.parse(jsonText);
        if (typeof parsed !== 'object' || parsed === null) {
            throw new Error('Struktur JSON tidak valid.');
        }
        return parsed as T;
    } catch (error) {
        console.error(`Failed to parse JSON from ${serviceName}:`, jsonText);
        throw handleAIError(error, `JSON Parser for ${serviceName}`);
    }
}

export const getAITafsir = async (surahName: string, ayahNumber: number, ayahText: string, translation: string): Promise<string> => {
    try {
        const systemInstruction = `Anda adalah seorang mufassir (ahli tafsir) yang bijak. Berikan penjelasan tafsir yang ringkas namun mendalam untuk ayat yang diberikan, merujuk pada tafsir-tafsir mu'tabar seperti Tafsir Ibnu Katsir, Tafsir Jalalain, atau Tafsir Al-Misbah. Fokus pada makna utama, pelajaran (faedah), dan relevansinya bagi kehidupan Muslim saat ini. Jawaban harus berupa teks naratif yang mudah dipahami, bukan JSON.`;
        const prompt = `Tafsirkan ayat berikut:\nSurah: ${surahName}\nAyat: ${ayahNumber}\nTeks Arab: "${ayahText}"\nTerjemahan: "${translation}"`;

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: { systemInstruction, temperature: 0.6 },
        });

        const text = response.text;
        if (!text) throw new Error("Respon AI kosong.");
        return text.trim();
    } catch (error) {
        throw handleAIError(error, "AI Tafsir Service");
    }
};

export const getAIAsbabunNuzul = async (surahName: string, ayahNumber: number): Promise<string> => {
    try {
        const systemInstruction = `Anda adalah seorang ahli Ulumul Qur'an yang fokus pada Asbabun Nuzul (Sebab Turunnya Ayat). Berikan riwayat yang paling shahih dan relevan mengenai sebab turunnya ayat yang spesifik ini. Jika ada beberapa riwayat, sebutkan yang paling kuat. Jika TIDAK ADA riwayat asbabun nuzul yang spesifik untuk ayat ini, jelaskan konteks umum turunnya surah tersebut atau tema utama ayat tersebut. Jawaban harus berupa teks naratif.`;
        const prompt = `Jelaskan Asbabun Nuzul dari QS. ${surahName} ayat ${ayahNumber}.`;

        const response = await ai.models.generateContent({
            model: "gemini-3-pro-preview",
            contents: prompt,
            config: { systemInstruction, temperature: 0.5 },
        });

        const text = response.text;
        if (!text) throw new Error("Respon AI kosong.");
        return text.trim();
    } catch (error) {
        throw handleAIError(error, "AI Asbabun Nuzul Service");
    }
};

export const getAIDalilPendukung = async (surahName: string, ayahNumber: number, ayahText: string): Promise<string> => {
    try {
        const systemInstruction = `Anda adalah seorang ahli hadits. Carikan satu atau dua hadits shahih yang paling relevan untuk menjelaskan atau menguatkan makna dari ayat Al-Qur'an yang diberikan. Sertakan matan (teks) hadits (terjemahan) dan sumber riwayatnya (misal: HR. Bukhari). Jawaban harus berupa teks naratif.`;
        const prompt = `Carikan hadits shahih yang menjadi dalil pendukung atau penjelas untuk QS. ${surahName} ayat ${ayahNumber} yang berbunyi: "${ayahText}"`;

        const response = await ai.models.generateContent({
            model: "gemini-3-pro-preview",
            contents: prompt,
            config: { systemInstruction, temperature: 0.5 },
        });

        const text = response.text;
        if (!text) throw new Error("Respon AI kosong.");
        return text.trim();
    } catch (error) {
        throw handleAIError(error, "AI Dalil Pendukung Service");
    }
};

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A short, engaging title for the advice." },
        quran_arabic: { type: Type.STRING, description: "The Arabic text of one relevant Qur'an verse." },
        quran_translation: { type: Type.STRING, description: "The Indonesian/English translation of the Qur'an verse, including the Surah name and verse number (e.g., QS. Ar-Ra'd: 28)." },
        hadith: { type: Type.STRING, description: "The text of an authentic (sahih) hadith relevant to the user's problem." },
        hadith_source: { type: Type.STRING, description: "The source or narrator of the hadith (e.g., HR. Bukhari)." },
        doa_arabic: { type: Type.STRING, description: "The Arabic text of a relevant prayer." },
        doa_latin: { type: Type.STRING, description: "The Latin transliteration of the prayer." },
        doa_translation: { type: Type.STRING, description: "The Indonesian/English translation of the prayer." },
        steps: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Three practical, short, and actionable steps the user can take."
        }
    },
    required: ["title", "quran_arabic", "quran_translation", "hadith", "hadith_source", "doa_arabic", "doa_latin", "doa_translation", "steps"]
};

const dalilResponseSchema = {
    type: Type.OBJECT,
    properties: {
        quran_ref: { type: Type.STRING, description: "Reference to the Qur'an verse (e.g., QS. Al-Baqarah: 183)." },
        quran_arabic: { type: Type.STRING, description: "The Arabic text of the Qur'an verse." },
        quran_translation: { type: Type.STRING, description: "The Indonesian translation of the verse." },
        hadith_ref: { type: Type.STRING, description: "Reference to the hadith (e.g., HR. Bukhari no. 1904)." },
        hadith_text: { type: Type.STRING, description: "The text of the relevant hadith." },
    },
    required: ["quran_ref", "quran_arabic", "quran_translation", "hadith_ref", "hadith_text"]
};

const halalAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        status: { 
            type: Type.STRING, 
            description: "Halal status. Must be one of: 'HALAL' (if all ingredients are clearly halal), 'HARAM' (if there is a clearly haram ingredient), or 'SYUBHAT' (if there are critical ingredients needing further verification, e.g., gelatin, lecithin, glycerin, flavorings).",
            enum: ['HALAL', 'HARAM', 'SYUBHAT'] 
        },
        explanation: { 
            type: Type.STRING, 
            description: "A brief and clear explanation. If SYUBHAT, specify which ingredient is the critical point and why (e.g., 'Gelatin is a critical point as it can be derived from haram animals. It needs to be confirmed if the gelatin is halal certified.'). If HARAM, name the ingredient. If HALAL, provide a short confirmation." 
        },
    },
    required: ["status", "explanation"]
};

const tadabburResponseSchema = {
    type: Type.OBJECT,
    properties: {
        story_title: { type: Type.STRING, description: "A relevant and comforting title for the parable or story." },
        story_source: { type: Type.STRING, description: "The main source of the story (e.g., 'QS. Al-Qashash: 7' or 'A story from Islamic History')." },
        story_text: { type: Type.STRING, description: "The narrative text of the story or parable, concisely and beautifully." },
        reflection_points: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Three reflection points (tadabbur) that connect the story's wisdom to the user's situation."
        }
    },
    required: ["story_title", "story_source", "story_text", "reflection_points"]
};

const khutbahOutlineSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "An engaging and relevant title for the sermon based on the theme." },
        muqaddimah: { 
            type: Type.OBJECT,
            properties: {
                pembukaan: { type: Type.STRING, description: "The complete text of a standard muqaddimah (hamdalah, syahadat, shalawat, wasiat taqwa)." },
                ayat_pembuka: { type: Type.STRING, description: "One relevant Qur'an verse to open the theme, with its reference (e.g., QS. Al-Asr: 1-3)." }
            },
            required: ["pembukaan", "ayat_pembuka"]
        },
        khutbah_pertama: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    point_title: { type: Type.STRING, description: "The title or theme of the discussion point." },
                    explanation: { type: Type.STRING, description: "A brief explanation and points for the khatib to elaborate on." },
                    dalil: { type: Type.STRING, description: "One proof (Qur'an or Sahih Hadith) that supports the discussion point, with its reference." }
                },
                required: ["point_title", "explanation", "dalil"]
            },
            description: "An array of 3 main points for the first sermon."
        },
        khutbah_kedua: {
            type: Type.OBJECT,
            properties: {
                ringkasan: { type: Type.STRING, description: "A brief summary of the first sermon." },
                doa_penutup: { type: Type.STRING, description: "The complete text of a standard closing prayer in Arabic for the Muslim community." }
            },
            required: ["ringkasan", "doa_penutup"]
        }
    },
    required: ["title", "muqaddimah", "khutbah_pertama", "khutbah_kedua"]
};

const aiTarbiyahPlanSchema = {
    type: Type.OBJECT,
    properties: {
        focus: { type: Type.STRING, description: "A short, motivating focus for the week based on the user's goal." },
        days: {
            type: Type.ARRAY,
            description: "An array of 7 daily plans.",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.STRING, description: "The day of the week, e.g., 'Senin (Hari 1)'." },
                    tasks: {
                        type: Type.ARRAY,
                        description: "An array of 1 to 3 tasks for the day.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                title: { type: Type.STRING, description: "A concise title for the task." },
                                description: { type: Type.STRING, description: "A short description of the task." },
                                link: { type: Type.STRING, description: "A relevant internal link from the application, e.g., /tauhid/iman, /hadits-arbain/16. Should be a valid path." }
                            },
                            required: ["title", "description", "link"]
                        }
                    }
                },
                required: ["day", "tasks"]
            }
        }
    },
    required: ["focus", "days"]
};

const aiJournalInsightSchema = {
    type: Type.OBJECT,
    properties: {
        emotion: { type: Type.STRING, description: "One or two words identifying the dominant emotion in the journal entry (e.g., 'Cemas', 'Syukur', 'Sedih')." },
        verse: { type: Type.STRING, description: "The full Arabic text of ONE relevant and comforting Qur'an verse." },
        verseSource: { type: Type.STRING, description: "The source of the verse (e.g., 'QS. Ar-Ra\\'d: 28')." },
        action: { type: Type.STRING, description: "One short, simple, and practical act of worship or reflection the user can do (e.g., 'Coba luangkan 5 menit untuk berdzikir Astaghfirullah 100x.')." },
    },
    required: ["emotion", "verse", "verseSource", "action"]
};


export const getAIResponse = async (category: string, description: string, lang: Language): Promise<AIResponse> => {
    try {
        const systemInstruction = lang === 'id' 
            ? `You are TARBIYAH CARE V.29.9.25, an Islamic wellness and life guidance AI assistant. Your purpose is to provide serene, faith-based guidance based on Ahlus Sunnah wal Jama'ah. Your tone should be empathetic, wise, and encouraging. Respond ONLY in Indonesian. Your response MUST strictly follow the provided JSON schema. Do not include any introductory or concluding text, explanations, or markdown backticks around the JSON.`
            : `You are TARBIYAH CARE V.29.9.25, an Islamic wellness and life guidance AI assistant. Your purpose is to provide serene, faith-based guidance based on Ahlus Sunnah wal Jama'ah. Your tone should be empathetic, wise, and encouraging. Respond ONLY in English. Your response MUST strictly follow the provided JSON schema. Do not include any introductory or concluding text, explanations, or markdown backticks around the JSON. Ensure translations for Quran and Hadith are in English.`;
        
        const prompt = lang === 'id'
            ? `Kategori: ${category}. Masalah pengguna: "${description}". Berikan panduan.`
            : `Category: ${category}. User's problem: "${description}". Provide guidance.`;

        const response = await ai.models.generateContent({
            model: "gemini-3-pro-preview",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.8,
            },
        });

        const text = response.text;
        if (!text) throw new Error("Respon AI kosong.");
        return parseJsonResponse<AIResponse>(text.trim(), "AI Response Service");
    } catch (error) {
        throw handleAIError(error, "AI Response Service");
    }
};

export const getAIJournalInsight = async (journalText: string): Promise<AIJournalInsight> => {
    try {
        const systemInstruction = `Anda adalah seorang konselor spiritual Islami yang bijak, lembut, dan penuh empati. Tugas Anda adalah menganalisis catatan jurnal seorang Muslim dan memberikan wawasan yang menenangkan. JANGAN memberikan nasihat panjang atau menggurui. Respons Anda HARUS singkat, suportif, dan praktis. Jawab HANYA dalam Bahasa Indonesia dan patuhi skema JSON yang diberikan.`;
        
        const prompt = `Analisis catatan jurnal berikut: "${journalText}". Berikan satu wawasan yang menenangkan.`;

        const response = await ai.models.generateContent({
            model: "gemini-3-pro-preview",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: aiJournalInsightSchema,
                temperature: 0.7,
            },
        });

        const text = response.text;
        if (!text) throw new Error("Respon AI kosong.");
        return parseJsonResponse<AIJournalInsight>(text.trim(), "AI Journal Insight Service");
    } catch (error) {
        throw handleAIError(error, "AI Journal Insight Service");
    }
};

export const getAIDalil = async (topic: string): Promise<DalilResponse> => {
    try {
        const systemInstruction = `Anda adalah seorang ahli dalil (Al-Qur'an dan Hadits). Tugas Anda adalah memberikan SATU dalil dari Al-Qur'an dan SATU dalil dari Hadits Shahih yang paling relevan dengan topik yang diberikan. Jawaban HARUS dalam format JSON yang ketat sesuai skema. Jangan tambahkan teks pembuka atau penutup.`;
        const prompt = `Topik: "${topic}". Berikan dalil Al-Qur'an dan Hadits yang relevan.`;

        const response = await ai.models.generateContent({
            model: "gemini-3-pro-preview",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: dalilResponseSchema,
                temperature: 0.5,
            },
        });

        const text = response.text;
        if (!text) throw new Error("Respon AI kosong.");
        return parseJsonResponse<DalilResponse>(text.trim(), "AI Dalil Service");
    } catch (error) {
        throw handleAIError(error, "AI Dalil Service");
    }
};

export const getAITadabbur = async (situation: string): Promise<TadabburResponse> => {
    try {
        const systemInstruction = `Anda adalah seorang mufassir dan pencerita yang bijak. Tugas Anda adalah memberikan sebuah kisah atau perumpamaan singkat dari Al-Qur'an, Hadits, atau sejarah Islam yang relevan dengan situasi pengguna, lalu berikan tiga poin perenungan (tadabbur) yang menenangkan. Jawaban HARUS dalam format JSON yang ketat sesuai skema.`;
        const prompt = `Situasi pengguna: "${situation}". Berikan kisah dan poin perenungan.`;

        const response = await ai.models.generateContent({
            model: "gemini-3-pro-preview",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: tadabburResponseSchema,
                temperature: 0.8,
            },
        });

        const text = response.text;
        if (!text) throw new Error("Respon AI kosong.");
        return parseJsonResponse<TadabburResponse>(text.trim(), "AI Tadabbur Service");
    } catch (error) {
        throw handleAIError(error, "AI Tadabbur Service");
    }
};

export const getAISearchResponse = async (query: string, lang: Language): Promise<GenerateContentResponse> => {
    try {
        const systemInstruction = `Anda adalah asisten AI yang informatif. Berikan jawaban yang ringkas dan akurat berdasarkan pengetahuan Anda dan hasil pencarian web. Jawab dalam bahasa ${lang === 'id' ? 'Indonesia' : 'English'}.`;
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: query,
            config: {
                systemInstruction,
                tools: [{googleSearch: {}}],
            },
        });
        return response;
    } catch (error) {
        throw handleAIError(error, "AI Search Service");
    }
};

export const getAIMapsResponse = async (query: string, latitude: number, longitude: number, lang: Language): Promise<GenerateContentResponse> => {
    try {
        const systemInstruction = `Anda adalah asisten pencarian lokasi yang membantu menemukan tempat-tempat relevan berdasarkan permintaan pengguna. Berikan jawaban ringkas jika perlu. Jawab dalam bahasa ${lang === 'id' ? 'Indonesia' : 'English'}.`;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: query,
            config: {
                systemInstruction,
                tools: [{googleMaps: {}}],
                toolConfig: {
                    retrievalConfig: {
                        latLng: {
                            latitude: latitude,
                            longitude: longitude
                        }
                    }
                }
            },
        });
        return response;
    } catch (error) {
        throw handleAIError(error, "AI Maps Service");
    }
};

export const getAIAsbabulWurud = async (hadithTitle: string, hadithTranslation: string): Promise<string> => {
    try {
        const systemInstruction = `Anda adalah seorang ahli hadits yang menguasai Asbabul Wurud (konteks atau sebab-sebab munculnya sebuah hadits). Berikan penjelasan yang ringkas dan jelas mengenai konteks historis atau pertanyaan yang melatarbelakangi hadits yang diberikan. Jika tidak ada riwayat asbabul wurud yang spesifik, jelaskan konteks umum dan pentingnya hadits tersebut. Jawaban harus berupa teks naratif, bukan JSON.`;
        const prompt = `Hadits: "${hadithTitle}"\nTerjemahan: "${hadithTranslation}"\n\nJelaskan Asbabul Wurud atau konteks umum dari hadits ini.`;

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.6,
            },
        });

        const text = response.text;
        if (!text) throw new Error("Respon AI kosong.");
        return text.trim();
    } catch (error) {
        throw handleAIError(error, "AI Asbabul Wurud Service");
    }
};

export const getAIKhutbahOutline = async (topic: string, event: string, style: string): Promise<KhutbahOutlineResponse> => {
    try {
        const systemInstruction = `Anda adalah seorang khatib (penceramah) dan penulis khutbah yang berpengalaman. Tugas Anda adalah menyusun draf (outline) khutbah yang terstruktur, relevan, dan sesuai dengan gaya bahasa yang diminta. Jawaban HARUS dalam format JSON yang ketat sesuai skema. Jangan tambahkan teks pembuka atau penutup.`;
        const prompt = `Tema Khutbah: "${topic}".\nKonteks Acara: ${event}.\nGaya Bahasa: ${style}.\n\nSusun draf khutbah yang lengkap.`;

        const response = await ai.models.generateContent({
            model: "gemini-3-pro-preview",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: khutbahOutlineSchema,
                temperature: 0.7,
            },
        });

        const text = response.text;
        if (!text) throw new Error("Respon AI kosong.");
        return parseJsonResponse<KhutbahOutlineResponse>(text.trim(), "AI Khutbah Outline Service");
    } catch (error) {
        throw handleAIError(error, "AI Khutbah Outline Service");
    }
};

export const getAISejarahNabiAnswer = async (question: string): Promise<string> => {
    try {
        const systemInstruction = `Anda adalah seorang sejarawan Islam yang ahli dalam kisah para nabi dan rasul (Qisas al-Anbiya). Jawab pertanyaan pengguna dengan akurat, jelas, dan merujuk pada sumber-sumber yang valid (Al-Qur'an, Hadits Shahih, dan kitab-kitab sejarah Islam yang mu'tabar). Jawaban harus dalam bentuk narasi informatif, bukan JSON.`;
        const prompt = `Pertanyaan: "${question}"`;

        const response = await ai.models.generateContent({
            model: "gemini-3-pro-preview",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.5,
            },
        });

        const text = response.text;
        if (!text) throw new Error("Respon AI kosong.");
        return text.trim();
    } catch (error) {
        throw handleAIError(error, "AI Sejarah Nabi Service");
    }
};

export const getAITarbiyahPlan = async (goal: string, focusAspect: string, time: string): Promise<AITarbiyahPlan> => {
    try {
        const systemInstruction = `Anda adalah seorang murabbi (pembimbing spiritual) AI yang bijaksana. Tugas Anda adalah membuat rencana tarbiyah (pembinaan) mingguan yang personal, praktis, dan relevan berdasarkan input pengguna. Pastikan link yang diberikan merujuk pada path yang valid di dalam aplikasi. Jawaban HARUS dalam format JSON yang ketat sesuai skema.`;
        const prompt = `Tujuan spiritual pengguna: "${goal}".\nAspek yang ingin diperbaiki: ${focusAspect}.\nWaktu yang tersedia per hari: ${time}.\n\nBuatkan rencana tarbiyah untuk 7 hari.`;

        const response = await ai.models.generateContent({
            model: "gemini-3-pro-preview",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: aiTarbiyahPlanSchema,
                temperature: 0.8,
            },
        });

        const text = response.text;
        if (!text) throw new Error("Respon AI kosong.");
        return parseJsonResponse<AITarbiyahPlan>(text.trim(), "AI Tarbiyah Plan Service");
    } catch (error) {
        throw handleAIError(error, "AI Tarbiyah Plan Service");
    }
};

export const getAIHalalAnalysis = async (ingredients: string): Promise<HalalAnalysisResponse> => {
    try {
        const systemInstruction = `Anda adalah seorang auditor halal berpengalaman. Analisis daftar bahan produk berikut dan identifikasi titik kritis kehalalannya. Berikan status (HALAL, HARAM, atau SYUBHAT) dan penjelasan singkat. Fokus hanya pada bahan yang benar-benar kritis (misal: gelatin, lesitin, gliserin, alkohol, perisa). Jika tidak ada bahan kritis, anggap HALAL. Jawaban HARUS dalam format JSON yang ketat sesuai skema.`;
        const prompt = `Daftar Bahan: "${ingredients}"`;

        const response = await ai.models.generateContent({
            model: "gemini-3-pro-preview",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: halalAnalysisSchema,
                temperature: 0.2,
            },
        });

        const text = response.text;
        if (!text) throw new Error("Respon AI kosong.");
        return parseJsonResponse<HalalAnalysisResponse>(text.trim(), "AI Halal Analysis Service");
    } catch (error) {
        throw handleAIError(error, "AI Halal Analysis Service");
    }
};

export const getAIImageText = async (base64Image: string): Promise<string> => {
    try {
        const imagePart = {
            inlineData: {
                mimeType: 'image/jpeg',
                data: base64Image,
            },
        };

        const prompt = "Ekstrak semua teks dari gambar ini. Fokus pada daftar bahan atau komposisi. Kembalikan hanya teksnya saja.";

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: { parts: [imagePart, { text: prompt }] },
        });

        const text = response.text;
        if (!text) throw new Error("Tidak ada teks yang terdeteksi pada gambar.");
        return text.trim();
    } catch (error) {
        throw handleAIError(error, "AI Image Text Service");
    }
};

export const getAITahsinFeedback = async (surahName: string): Promise<string> => {
    try {
        const systemInstruction = `Anda adalah seorang guru tahsin Al-Qur'an. Berikan umpan balik yang konstruktif dan memotivasi untuk bacaan surah yang diberikan. Fokus pada 2-3 poin tajwid yang umum terjadi. Jangan menilai bacaan karena Anda tidak mendengarnya, tapi berikan nasihat umum terkait surah tersebut. Jawaban harus berupa teks naratif, bukan JSON.`;
        const prompt = `Berikan umpan balik umum untuk seseorang yang sedang berlatih membaca ${surahName}.`;
        
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.7,
            },
        });

        const text = response.text;
        if (!text) throw new Error("Respon AI kosong.");
        return text.trim();
    } catch (error) {
        throw handleAIError(error, "AI Tahsin Feedback Service");
    }
};
