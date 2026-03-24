
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';
import { trackEvent } from '../../services/trackingService';
import ProgressRing from '../ui/ProgressRing';
import { doaData } from '../../data/doa';

// --- Constants from RamadhanTracker ---
const RAMADHAN_START_DATE = '2025-03-01'; // Kept for reference, but new logic is more dynamic.

const RAMADHAN_BASE_DATE = '2025-03-01T00:00:00';
const IDUL_FITRI_BASE_DATE = '2025-03-31T00:00:00';

// --- Types from RamadhanTracker ---
type PuasaState = 'puasa' | 'tidak' | undefined;

// --- Helpers from RamadhanTracker ---
const calculateTimeLeft = (targetDate: string) => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }
    return timeLeft;
};

const getNextEventDate = (baseDateString: string) => {
    const now = new Date();
    let eventDate = new Date(baseDateString);
    while (eventDate < now) {
        eventDate.setFullYear(eventDate.getFullYear() + 1);
        eventDate.setDate(eventDate.getDate() - 11); 
    }
    return eventDate.toISOString();
};


// --- Original Roadmap Data & Types ---
const roadmapData = {
    spiritual: {
        title: { id: "Spiritual", en: "Spiritual" }, icon: "fa-solid fa-mosque",
        tasks: [
            { id: 'spiritual-0', name: { id: "Shalat 5 waktu tepat waktu", en: "5 daily prayers on time" }, priority: { id: "Tinggi", en: "High" } },
            { id: 'spiritual-1', name: { id: "Tilawah Al-Qur'an 1 halaman/hari", en: "Recite Qur'an 1 page/day" }, priority: { id: "Tinggi", en: "High" } },
            { id: 'spiritual-2', name: { id: "Dzikir pagi & petang", en: "Morning & evening remembrances" }, priority: { id: "Sedang", en: "Medium" } },
            { id: 'spiritual-3', name: { id: "Shalat Dhuha", en: "Dhuha prayer" }, priority: { id: "Rendah", en: "Low" } },
            { id: 'spiritual-4', name: { id: "Shalat Tahajud 2 rakaat", en: "Pray Tahajud 2 rak'ahs" }, priority: { id: "Tinggi", en: "High" } },
            { id: 'spiritual-5', name: { id: "Membaca tafsir Al-Qur'an 1 ayat", en: "Read Tafsir of 1 Qur'an verse" }, priority: { id: "Sedang", en: "Medium" } },
            { id: 'spiritual-6', name: { id: "Bershalawat kepada Nabi 100x", en: "Send Salawat upon the Prophet 100x" }, priority: { id: "Sedang", en: "Medium" } }
        ]
    },
    emosional: {
        title: { id: "Emosional", en: "Emotional" }, icon: "fa-solid fa-heart-pulse",
        tasks: [
            { id: 'emosional-0', name: { id: "Latihan sabar (tidak marah)", en: "Practice patience (don't get angry)" }, priority: { id: "Tinggi", en: "High" } },
            { id: 'emosional-1', name: { id: "Menulis jurnal syukur", en: "Write a gratitude journal" }, priority: { id: "Sedang", en: "Medium" } },
            { id: 'emosional-2', name: { id: "Berbaik sangka kepada Allah", en: "Think good of Allah" }, priority: { id: "Tinggi", en: "High" } },
            { id: 'emosional-3', name: { id: "Memaafkan kesalahan orang lain", en: "Forgive others' mistakes" }, priority: { id: "Sedang", en: "Medium" } },
            { id: 'emosional-4', name: { id: "Menahan diri dari ghibah (menggunjing)", en: "Refrain from backbiting (ghibah)" }, priority: { id: "Tinggi", en: "High" } },
            { id: 'emosional-5', name: { id: "Melakukan muhasabah (introspeksi) sebelum tidur", en: "Perform self-reflection (muhasabah) before sleep" }, priority: { id: "Sedang", en: "Medium" } },
            { id: 'emosional-6', name: { id: "Menjaga pandangan dari yang haram", en: "Guard the gaze from the unlawful" }, priority: { id: "Tinggi", en: "High" } }
        ]
    },
    sosial: {
        title: { id: "Sosial", en: "Social" }, icon: "fa-solid fa-users",
        tasks: [
            { id: 'sosial-0', name: { id: "Menyambung silaturahmi (keluarga/teman)", en: "Connect with family/friends" }, priority: { id: "Tinggi", en: "High" } },
            { id: 'sosial-1', name: { id: "Memberi sedekah", en: "Give charity" }, priority: { id: "Sedang", en: "Medium" } },
            { id: 'sosial-2', name: { id: "Senyum kepada sesama Muslim", en: "Smile at fellow Muslims" }, priority: { id: "Rendah", en: "Low" } },
            { id: 'sosial-3', name: { id: "Membantu tetangga", en: "Help a neighbor" }, priority: { id: "Sedang", en: "Medium" } },
            { id: 'sosial-4', name: { id: "Mendoakan kebaikan untuk saudara Muslim", en: "Pray for the well-being of a Muslim brother/sister" }, priority: { id: "Sedang", en: "Medium" } },
            { id: 'sosial-5', name: { id: "Menjenguk orang sakit (jika ada kesempatan)", en: "Visit the sick (if there is an opportunity)" }, priority: { id: "Sedang", en: "Medium" } },
            { id: 'sosial-6', name: { id: "Memberi salam terlebih dahulu", en: "Be the first to give Salam" }, priority: { id: "Rendah", en: "Low" } }
        ]
    },
    intelektual: {
        title: { id: "Intelektual", en: "Intellectual" }, icon: "fa-solid fa-book-reader",
        tasks: [
            { id: 'intelektual-0', name: { id: "Membaca buku Islami 15 menit/hari", en: "Read an Islamic book for 15 mins/day" }, priority: { id: "Tinggi", en: "High" } },
            { id: 'intelektual-1', name: { id: "Mendengarkan kajian ilmu", en: "Listen to an Islamic lecture" }, priority: { id: "Sedang", en: "Medium" } },
            { id: 'intelektual-2', name: { id: "Mempelajari 1 hadits baru", en: "Learn 1 new hadith" }, priority: { id: "Sedang", en: "Medium" } },
            { id: 'intelektual-3', name: { id: "Merenungi ciptaan Allah (Tafakkur)", en: "Reflect on Allah's creation (Tafakkur)" }, priority: { id: "Rendah", en: "Low" } },
            { id: 'intelektual-4', name: { id: "Mempelajari 1 kosakata baru Bahasa Arab", en: "Learn 1 new Arabic vocabulary" }, priority: { id: "Rendah", en: "Low" } },
            { id: 'intelektual-5', name: { id: "Menonton video biografi ulama/sahabat", en: "Watch a biography video of a scholar/companion" }, priority: { id: "Sedang", en: "Medium" } },
            { id: 'intelektual-6', name: { id: "Mencatat faedah ilmu yang didapat hari ini", en: "Jot down a beneficial knowledge point gained today" }, priority: { id: "Sedang", en: "Medium" } }
        ]
    },
    finansial: {
        title: { id: "Finansial", en: "Financial" }, icon: "fa-solid fa-sack-dollar",
        tasks: [
            { id: 'finansial-0', name: { id: "Membuat anggaran & melacak pengeluaran", en: "Create a budget & track expenses" }, priority: { id: "Tinggi", en: "High" } },
            { id: 'finansial-1', name: { id: "Menghindari hutang berbasis riba", en: "Avoid riba-based debt" }, priority: { id: "Tinggi", en: "High" } },
            { id: 'finansial-2', name: { id: "Menabung untuk haji/umrah/kurban", en: "Save for hajj/umrah/qurban" }, priority: { id: "Sedang", en: "Medium" } },
            { id: 'finansial-3', name: { id: "Membayar zakat (jika wajib)", en: "Pay zakat (if applicable)" }, priority: { id: "Tinggi", en: "High" } },
            { id: 'finansial-4', name: { id: "Menyisihkan uang untuk dana darurat", en: "Set aside money for an emergency fund" }, priority: { id: "Sedang", en: "Medium" } },
            { id: 'finansial-5', name: { id: "Mempelajari 1 konsep ekonomi syariah", en: "Learn 1 concept of Islamic economics" }, priority: { id: "Rendah", en: "Low" } }
        ]
    },
    fisik: {
        title: { id: "Fisik", en: "Physical" }, icon: "fa-solid fa-person-running",
        tasks: [
            { id: 'fisik-0', name: { id: "Makan makanan halal & thayyib", en: "Eat halal & wholesome food" }, priority: { id: "Tinggi", en: "High" } },
            { id: 'fisik-1', name: { id: "Olahraga teratur (misal: jalan kaki)", en: "Regular exercise (e.g., walking)" }, priority: { id: "Sedang", en: "Medium" } },
            { id: 'fisik-2', name: { id: "Tidur yang cukup dan berkualitas", en: "Get enough quality sleep" }, priority: { id: "Tinggi", en: "High" } },
            { id: 'fisik-3', name: { id: "Menjaga kebersihan diri & lingkungan", en: "Maintain personal & environmental hygiene" }, priority: { id: "Rendah", en: "Low" } },
            { id: 'fisik-4', name: { id: "Menggunakan siwak/sikat gigi sebelum shalat", en: "Use siwak/toothbrush before prayer" }, priority: { id: "Rendah", en: "Low" } },
            { id: 'fisik-5', name: { id: "Tidak makan berlebihan (berhenti sebelum kenyang)", en: "Do not overeat (stop before full)" }, priority: { id: "Tinggi", en: "High" } }
        ]
    }
};

type RoadmapCategoryKey = keyof typeof roadmapData;
type Priority = 'Tinggi' | 'Sedang' | 'Rendah';
type PriorityFilter = 'Semua' | Priority;
type StatusFilter = 'Semua' | 'Selesai' | 'Belum Selesai';

const getUserId = (): string | null => {
    try {
        const authData = localStorage.getItem('tarbiyahAuth');
        if (authData) {
            return JSON.parse(authData).waNumber;
        }
        return null;
    } catch (error) {
        console.error("Failed to parse auth data from localStorage:", error);
        return null;
    }
};

// Helper function for robust date key generation
const formatDateToKey = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};


const Roadmap: React.FC = () => {
    const { lang, t } = useLanguage();
    const userId = getUserId();
    const today = formatDateToKey(new Date());

    // --- Sound Effect Function ---
    const playCompletionSound = () => {
        try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 note
            gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5); // Play for 500ms
        } catch (e) {
            console.error("Web Audio API is not supported in this browser.", e);
        }
    };
    
    const playTargetBeepSound = () => {
        try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime); // E5 note, higher pitch
            gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5); // Play for 500ms
        } catch (e) {
            console.error("Web Audio API is not supported in this browser.", e);
        }
    };


    // --- Task to Link Mapping ---
    const taskLinks: Record<string, string> = {
        'spiritual-1': '/mushaf',
        'spiritual-3': '/pedoman/shalat-dhuha',
        'spiritual-4': '/pedoman/shalat-tahajud',
        'spiritual-5': '/mushaf',
        'spiritual-6': '/pedoman/sholawat',
        'emosional-1': '/jurnal-muhasabah',
        'sosial-1': '/donasi',
        'intelektual-0': '/pustaka-ilmu',
        'intelektual-2': '/hadits-arbain',
        'intelektual-3': '/peristiwa/alam-semesta',
        'intelektual-4': '/istilah',
        'intelektual-5': '/tokoh',
    };

    // --- Ramadhan Tracker States ---
    const [puasaTracker, setPuasaTracker] = useState<Record<string, PuasaState>>({});
    const [juzTracker, setJuzTracker] = useState<Record<string, boolean>>({});
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);
    const [nextRamadhanDate] = useState(() => getNextEventDate(RAMADHAN_BASE_DATE));
    const [nextIdulFitriDate] = useState(() => getNextEventDate(IDUL_FITRI_BASE_DATE));
    const [ramadhanCountdown, setRamadhanCountdown] = useState(() => calculateTimeLeft(nextRamadhanDate));
    const [idulFitriCountdown, setIdulFitriCountdown] = useState(() => calculateTimeLeft(nextIdulFitriDate));

    // --- Daily Roadmap States ---
    const [roadmapState, setRoadmapState] = useState<Record<string, boolean>>({});
    const [history, setHistory] = useState<Record<string, Record<string, boolean>>>({});
    const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('Semua');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('Semua');

    // --- Shalat Tracker States ---
    const [shalatHistory, setShalatHistory] = useState<Record<string, Record<string, boolean>>>({});
    const [gender, setGender] = useState<'male' | 'female'>(() => {
        const savedGender = localStorage.getItem(`userGender_${userId}`);
        return (savedGender as 'male' | 'female') || 'male';
    });
    const shalatTracker = useMemo(() => shalatHistory[today] || {}, [shalatHistory, today]);
    
    // --- Dzikir Checklist States ---
    const [dzikirState, setDzikirState] = useState<Record<string, boolean>>({});
    const [dzikirHistory, setDzikirHistory] = useState<Record<string, Record<string, boolean>>>({});
    const [openDzikir, setOpenDzikir] = useState<string | null>(null);

    // --- Tasbih Digital States ---
    const [tasbihCount, setTasbihCount] = useState(0);
    const [tasbihTarget, setTasbihTarget] = useState('33');

    const handleNumericInput = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ''); // Allow only digits
        setter(value);
    };


    // --- Combined `useEffect` hooks ---
    useEffect(() => {
        if (!userId) return;
        
        // Load Ramadhan Tracker Data
        try {
            const savedPuasaData = localStorage.getItem(`ramadhanPuasaTracker_${userId}`);
            if (savedPuasaData) setPuasaTracker(JSON.parse(savedPuasaData));
            const savedJuzData = localStorage.getItem(`ramadhanJuzTracker_${userId}`);
            if (savedJuzData) setJuzTracker(JSON.parse(savedJuzData));
        } catch (error) { console.error("Failed to load Ramadhan data:", error); }

        // Load Daily Roadmap Data
        try {
            const historyKey = `roadmapHistory_${userId}`;
            const savedHistory = localStorage.getItem(historyKey);
            if (savedHistory) {
                const parsedHistory = JSON.parse(savedHistory);
                setHistory(parsedHistory);
                setRoadmapState(parsedHistory[today] || {});
            }
        } catch (error) { console.error("Failed to load roadmap history:", error); }

        // Load Shalat Tracker Data
        try {
            const savedShalatHistory = localStorage.getItem(`shalatHistory_${userId}`);
            if (savedShalatHistory) setShalatHistory(JSON.parse(savedShalatHistory));
        } catch (error) {
            console.error("Failed to load Shalat tracker data:", error);
        }

        // Load Dzikir Checklist Data
        try {
            const dzikirHistoryKey = `dzikirHistory_${userId}`;
            const savedDzikirHistory = localStorage.getItem(dzikirHistoryKey);
            if (savedDzikirHistory) {
                const parsedDzikir = JSON.parse(savedDzikirHistory);
                setDzikirHistory(parsedDzikir);
                setDzikirState(parsedDzikir[today] || {});
            }
        } catch (error) { console.error("Failed to load dzikir history:", error); }

    }, [userId, today]);

    // --- Data Saving Effects ---
    useEffect(() => { if (!userId) return; try { localStorage.setItem(`ramadhanPuasaTracker_${userId}`, JSON.stringify(puasaTracker)); } catch (error) { console.error("Failed to save puasa tracker data:", error); } }, [puasaTracker, userId]);
    useEffect(() => { if (!userId) return; try { localStorage.setItem(`ramadhanJuzTracker_${userId}`, JSON.stringify(juzTracker)); } catch (error) { console.error("Failed to save juz tracker data:", error); } }, [juzTracker, userId]);
    useEffect(() => { if (!userId) return; try { localStorage.setItem(`roadmapHistory_${userId}`, JSON.stringify(history)); } catch (error) { console.error("Failed to save roadmap history:", error); } }, [history, userId]);
    useEffect(() => {
        if (!userId) return;
        try {
            localStorage.setItem(`shalatHistory_${userId}`, JSON.stringify(shalatHistory));
        } catch (error) {
            console.error("Failed to save Shalat history:", error);
        }
    }, [shalatHistory, userId]);
    useEffect(() => {
        if (!userId) return;
        localStorage.setItem(`userGender_${userId}`, gender);
    }, [gender, userId]);
    useEffect(() => {
        if (!userId) return;
        try {
            const updatedHistory = { ...dzikirHistory, [today]: dzikirState };
            localStorage.setItem(`dzikirHistory_${userId}`, JSON.stringify(updatedHistory));
        } catch (error) {
            console.error("Failed to save dzikir history:", error);
        }
    }, [dzikirState, userId, today, dzikirHistory]);


    // --- Ramadhan Tracker Logic & Effects ---
    useEffect(() => {
        const timer = setInterval(() => {
            setRamadhanCountdown(calculateTimeLeft(nextRamadhanDate));
            setIdulFitriCountdown(calculateTimeLeft(nextIdulFitriDate));
        }, 1000);
        return () => clearInterval(timer);
    }, [nextRamadhanDate, nextIdulFitriDate]);

    const handlePuasaToggle = (day: number) => {
        if (!isRamadhan || day > dayOfRamadhan) return;
        const dayKey = `day${day}`;
        const currentState = puasaTracker[dayKey];
        let newState: PuasaState = currentState === 'puasa' ? 'tidak' : currentState === 'tidak' ? undefined : 'puasa';
        setPuasaTracker(prev => ({ ...prev, [dayKey]: newState }));
        if (newState === 'puasa') trackEvent('ramadhan_task_completed', { taskType: 'puasa', day });
    };
    
    const handleJuzToggle = (juz: number) => {
        if (!isRamadhan) return;
        const juzKey = `juz${juz}`;
        const isCompleting = !juzTracker[juzKey];
        setJuzTracker(prev => ({ ...prev, [juzKey]: !prev[juzKey] }));
        if (isCompleting) trackEvent('ramadhan_task_completed', { taskType: 'tilawah', juz });
    };

    const handleAccordionToggle = (id: string) => setOpenAccordion(prev => (prev === id ? null : id));

    const isRamadhan = useMemo(() => {
        const now = new Date(today + 'T00:00:00');
        const currentYear = now.getFullYear();

        const getRamadhanStartForYear = (year: number) => {
            let eventDate = new Date(RAMADHAN_BASE_DATE); // '2025-03-01T00:00:00'
            const baseYear = eventDate.getFullYear();
            const yearDiff = year - baseYear;
            eventDate.setFullYear(baseYear + yearDiff);
            eventDate.setDate(eventDate.getDate() - (11 * yearDiff)); // Approximate shift
            return eventDate;
        };

        const checkDateInRange = (dateToCheck: Date, year: number) => {
            const startDate = getRamadhanStartForYear(year);
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 29); // Assuming 30 days for simplicity
            return dateToCheck >= startDate && dateToCheck <= endDate;
        };
        
        return checkDateInRange(now, currentYear) || checkDateInRange(now, currentYear - 1);
    }, [today]);

    const dayOfRamadhan = useMemo(() => {
        if (!isRamadhan) return -1;
        const startDate = new Date(RAMADHAN_START_DATE + 'T00:00:00');
        const currentDate = new Date(today + 'T00:00:00');
        const diffTime = currentDate.getTime() - startDate.getTime();
        return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }, [today, isRamadhan]);

    const puasaProgress = useMemo(() => { const completedDays = Object.values(puasaTracker).filter(status => status === 'puasa').length; return { completedDays, totalDays: 30, percentage: Math.round((completedDays / 30) * 100) || 0 }; }, [puasaTracker]);
    const juzProgress = useMemo(() => { const completedJuz = Object.values(juzTracker).filter(Boolean).length; return { completedJuz, totalJuz: 30, percentage: Math.round((completedJuz / 30) * 100) || 0 }; }, [juzTracker]);
    
    const formattedDate = new Date(today + 'T00:00:00').toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // --- Daily Roadmap Logic ---
    const handleToggleTask = (taskKey: string) => {
        if (!userId) return;
        const isChecked = !!roadmapState[taskKey];
        const isCompleting = !isChecked;
        
        if (isCompleting) {
            playCompletionSound();
        }
        
        const newState = { ...roadmapState, [taskKey]: isCompleting };
        setRoadmapState(newState);
        
        const newHistory = { ...history, [today]: newState };
        setHistory(newHistory);

        if (isCompleting) {
            trackEvent('roadmap_task_completed', { taskKey });
        }
    };

    const getPriorityClass = (priority: Priority) => {
        switch (priority) {
            case 'Tinggi': return 'bg-red-500';
            case 'Sedang': return 'bg-yellow-500';
            case 'Rendah': return 'bg-sky-500';
            default: return 'bg-gray-500';
        }
    };
    
    const dzikirCategory = doaData.find(cat => cat.category.id === "Dzikir Pagi & Sore")!;
    const dzikirTasksCount = dzikirCategory.prayers.length;
    const totalTasks = Object.values(roadmapData).reduce((sum, cat) => sum + cat.tasks.length, 0) + dzikirTasksCount;
    const completedDzikir = Object.values(dzikirState).filter(Boolean).length;
    const completedRoadmapTasks = Object.values(roadmapState).filter(Boolean).length;
    const completedTasks = completedRoadmapTasks + completedDzikir;
    const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const filteredRoadmap = useMemo(() => {
        const result: Record<string, any> = {};
        (Object.keys(roadmapData) as RoadmapCategoryKey[]).forEach(categoryKey => {
            const category = roadmapData[categoryKey];
            const filteredTasks = category.tasks.map((task, index) => ({ task, originalIndex: index, originalId: task.id })).filter(({ task, originalId }) => {
                const priorityMatch = priorityFilter === 'Semua' || task.priority.id === priorityFilter;
                const isChecked = !!roadmapState[originalId];
                const statusMatch = statusFilter === 'Semua' || (statusFilter === 'Selesai' && isChecked) || (statusFilter === 'Belum Selesai' && !isChecked);
                return priorityMatch && statusMatch;
            });
            if (filteredTasks.length > 0) result[categoryKey] = { ...category, tasks: filteredTasks };
        });
        return result;
    }, [roadmapState, priorityFilter, statusFilter, lang]);
    

    const priorityFilters: { label: string, value: PriorityFilter, color: string }[] = [
        { label: t('Semua'), value: 'Semua', color: 'bg-primary' },
        { label: t('Tinggi'), value: 'Tinggi', color: 'bg-red-500' },
        { label: t('Sedang'), value: 'Sedang', color: 'bg-yellow-500' },
        { label: t('Rendah'), value: 'Rendah', color: 'bg-sky-500' },
    ];
    
    const statusFilters: { label: string, value: StatusFilter, color: string }[] = [
        { label: t('Semua'), value: 'Semua', color: 'bg-primary' },
        { label: t('Selesai'), value: 'Selesai', color: 'bg-green-500' },
        { label: t('Belum Selesai'), value: 'Belum Selesai', color: 'bg-gray-500' },
    ];

    // --- Shalat Tracker Logic ---
    const handleShalatToggle = (shalat: string) => {
        if (!userId) return;
        const currentDayTracker = shalatHistory[today] || {};
        const isCompleting = !currentDayTracker[shalat];
        const newDayTracker = { ...currentDayTracker, [shalat]: isCompleting };
        
        setShalatHistory(prev => ({ ...prev, [today]: newDayTracker }));
        trackEvent('shalat_task_toggled', { shalat, completed: isCompleting });
    };
    
    const isDateFriday = (date: Date) => date.getDay() === 5;
    const todayIsFriday = isDateFriday(new Date(today + 'T00:00:00'));
    
    const shalatWajibList = { subuh: "Subuh", dzuhur: "Dzuhur", jumat: "Jum'at", ashar: "Ashar", maghrib: "Maghrib", isya: "Isya" };
    const shalatSunnahList = { rawatib: "Rawatib", dhuha: "Dhuha", tahajud: "Tahajud", hajat: "Hajat", witir: "Witir", taubat: "Taubat" };
    const shalatRamadhanList = { tarawih: "Tarawih" };

    const calculateWajibProgress = (tracker: Record<string, boolean>, date: Date, currentGender: 'male' | 'female') => {
        const friday = isDateFriday(date);
        const wajibPrayersForProgress = ['subuh', friday && currentGender === 'male' ? 'jumat' : 'dzuhur', 'ashar', 'maghrib', 'isya'];
        const completedWajibCount = wajibPrayersForProgress.filter(p => tracker[p]).length;
        return Math.round((completedWajibCount / wajibPrayersForProgress.length) * 100);
    };
    
    const calculateSunnahProgress = (tracker: Record<string, boolean>) => {
        const sunnahKeys = Object.keys(shalatSunnahList);
        const completedCount = sunnahKeys.filter(key => tracker[key]).length;
        return sunnahKeys.length > 0 ? Math.round((completedCount / sunnahKeys.length) * 100) : 0;
    };

    const shalatWajibProgress = useMemo(() => calculateWajibProgress(shalatTracker, new Date(today + 'T00:00:00'), gender), [shalatTracker, today, gender]);

    const shalatSunnahProgress = useMemo(() => calculateSunnahProgress(shalatTracker), [shalatTracker]);

    const shalatRamadhanProgress = useMemo(() => {
        const ramadhanKeys = Object.keys(shalatRamadhanList);
        const completedCount = ramadhanKeys.filter(key => shalatTracker[key]).length;
        return ramadhanKeys.length > 0 ? Math.round((completedCount / ramadhanKeys.length) * 100) : 0;
    }, [shalatTracker]);
    
    const weeklyProgressData = useMemo(() => {
        const data = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            date.setHours(0,0,0,0);
            const dateKey = formatDateToKey(date); 
            const dayTracker = shalatHistory[dateKey] || {};
            
            const wajibProgress = calculateWajibProgress(dayTracker, date, gender);
            const sunnahProgress = calculateSunnahProgress(dayTracker);
            
            const dayName = date.toLocaleDateString('id-ID', { weekday: 'short' });
            const dateStr = date.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }); // DD/MM/YYYY

            data.push({
                day: `${dayName} (${dateStr})`,
                wajib: wajibProgress,
                sunnah: sunnahProgress,
            });
        }
        return data;
    }, [shalatHistory, gender]);

    // --- Dzikir Checklist Logic ---
    const handleToggleDzikir = (dzikirKey: string) => {
        setDzikirState(prev => {
            const isCompleting = !prev[dzikirKey];
            if (isCompleting) {
                playCompletionSound();
            }
            const newState = { ...prev, [dzikirKey]: !prev[dzikirKey] };
            trackEvent('dzikir_task_toggled', { dzikirKey, completed: newState[dzikirKey] });
            return newState;
        });
    };

    // --- Tasbih Digital Logic & Visuals ---
    const tasbihTargetNum = Number(tasbihTarget) || 33;
    const putaran = tasbihCount === 0 ? 1 : (tasbihTargetNum > 0 ? Math.floor((tasbihCount - 1) / tasbihTargetNum) + 1 : 1);
    
    const size = 192; // w-48
    const outerStrokeWidth = 12;
    const innerStrokeWidth = 12;
    const outerRadius = (size - outerStrokeWidth) / 2;
    const innerRadius = (size - outerStrokeWidth * 2 - 8 - innerStrokeWidth) / 2;
    const outerCircumference = 2 * Math.PI * outerRadius;
    const innerCircumference = 2 * Math.PI * innerRadius;

    const progressInRound = tasbihCount === 0 ? 0 : ((tasbihCount - 1) % tasbihTargetNum) + 1;
    let percentage = tasbihTargetNum > 0 ? (progressInRound / tasbihTargetNum) * 100 : 0;
    if (tasbihCount > 0 && tasbihCount % tasbihTargetNum === 0) {
        percentage = 100;
    }
    
    const forwardOffset = outerCircumference - (percentage / 100) * outerCircumference;
    const backwardOffset = (percentage / 100) * innerCircumference;
    

    return (
        <section id="roadmap" className="animate-fade-in">
            <h2 className="text-3xl font-bold text-white ApplicationTitle">Roadmap Personal</h2>
            <p className="text-center text-gray-400 mb-6 -mt-4">{formattedDate}</p>

             {/* --- KURIKULUM TARBIYAH CARD --- */}
             <Card className="mb-8 bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-600 hover:border-primary transition-colors group cursor-pointer">
                <Link to="/kurikulum-tarbiyah" className="flex items-center justify-between p-2">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-primary/20 rounded-full">
                             <i className="fas fa-graduation-cap text-2xl text-primary group-hover:text-white transition-colors"></i>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">Kurikulum Tarbiyah</h3>
                            <p className="text-sm text-gray-400">Panduan belajar Islam berjenjang (Level 1 - 8)</p>
                        </div>
                    </div>
                    <i className="fas fa-chevron-right text-gray-400 group-hover:text-primary transition-colors"></i>
                </Link>
            </Card>

            {/* --- SHALAT TRACKER SECTION --- */}
            <Card className="mb-8">
                <div className="flex flex-col md:flex-row gap-6 items-center border-b border-slate-700 pb-6 mb-6">
                    <div className="flex-1 w-full">
                        <h3 className="text-xl font-bold mb-2 text-primary">Tracker Shalat Harian</h3>
                        <p className="text-sm text-gray-400 mb-4">Tandai shalat yang telah Anda laksanakan hari ini. Progres dihitung berdasarkan masing-masing kategori.</p>
                        <div className="flex items-center gap-4 bg-slate-700 p-2 rounded-lg">
                            <span className="text-sm font-semibold text-gray-300">Saya adalah:</span>
                            <div className="flex gap-4">
                                <button onClick={() => setGender('male')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${gender === 'male' ? 'bg-blue-600 text-white ring-2 ring-white' : 'bg-slate-600 hover:bg-slate-500'}`}>
                                    Laki-laki
                                </button>
                                <button onClick={() => setGender('female')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${gender === 'female' ? 'bg-pink-600 text-white ring-2 ring-white' : 'bg-slate-600 hover:bg-slate-500'}`}>
                                    Perempuan
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex-shrink-0 flex gap-4">
                        <div className="text-center"><ProgressRing percentage={shalatWajibProgress} size={80} strokeWidth={8} /><p className="text-xs font-semibold mt-1">Wajib</p></div>
                        <div className="text-center"><ProgressRing percentage={shalatSunnahProgress} size={80} strokeWidth={8} /><p className="text-xs font-semibold mt-1">Sunnah</p></div>
                        <div className="text-center">
                            <ProgressRing percentage={isRamadhan ? shalatRamadhanProgress : 0} size={80} strokeWidth={8} />
                            <p className={`text-xs font-semibold mt-1 transition-colors ${!isRamadhan ? 'text-gray-600' : ''}`}>Ramadhan</p>
                        </div>
                    </div>
                </div>
                
                <div className="space-y-6">
                    <div>
                        <h4 className="font-bold text-lg mb-2 text-primary">Shalat Wajib</h4>
                        <p className="text-xs text-gray-500 mb-3">Fondasi amalan seorang Muslim. Menjaganya adalah kunci keberkahan waktu dan ketenangan jiwa.</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                            {Object.entries(shalatWajibList).map(([key, name]) => {
                                if ((key === 'jumat' && (!todayIsFriday || gender === 'female')) || (key === 'dzuhur' && todayIsFriday && gender === 'male')) return null;
                                const isCompleted = !!shalatTracker[key];
                                return (
                                    <button key={key} onClick={() => handleShalatToggle(key)} className={`p-3 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${isCompleted ? 'bg-green-600 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}>
                                        {isCompleted && <i className="fas fa-check"></i>}
                                        {name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-2 text-primary">Shalat Sunnah</h4>
                        <p className="text-xs text-gray-500 mb-3">Penyempurna shalat wajib dan penambah pundi-pundi pahala untuk meraih cinta Allah.</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                            {Object.entries(shalatSunnahList).map(([key, name]) => {
                                const isCompleted = !!shalatTracker[key];
                                return (
                                    <button key={key} onClick={() => handleShalatToggle(key)} className={`p-3 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${isCompleted ? 'bg-sky-600 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}>
                                        {isCompleted && <i className="fas fa-check"></i>}
                                        {name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-2 text-primary">Shalat Sunnah Khusus Ramadhan</h4>
                        <p className="text-xs text-gray-500 mb-3">Amalan istimewa untuk menghidupkan malam-malam bulan suci Ramadhan.</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                            {Object.entries(shalatRamadhanList).map(([key, name]) => {
                                const isCompleted = !!shalatTracker[key];
                                return (
                                    <button
                                        key={key}
                                        onClick={() => handleShalatToggle(key)}
                                        className={`p-3 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${isCompleted ? 'bg-purple-600 text-white' : 'bg-slate-700 hover:bg-slate-600'} disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed`}
                                        disabled={!isRamadhan}
                                        title={!isRamadhan ? "Fitur ini hanya aktif selama bulan Ramadhan" : ""}
                                    >
                                        {isCompleted && <i className="fas fa-check"></i>}
                                        {name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
                
                <div className="mt-8 border-t border-slate-700 pt-6">
                    <h4 className="font-bold text-lg mb-4 text-primary">Progres Shalat Mingguan</h4>
                    <div className="flex justify-between items-end h-40 gap-3 px-2">
                        {weeklyProgressData.map((dayData, index) => (
                             <div key={index} className="flex-1 flex flex-col items-center group relative h-full">
                                <div className="w-full flex-grow flex items-end justify-center gap-1">
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 px-2 py-1 rounded-md shadow-lg w-max">
                                        <span className="text-primary">W: {dayData.wajib}%</span>
                                        <span className="ml-2 text-sky-400">S: {dayData.sunnah}%</span>
                                    </div>
                                    <div className="w-1/2 bg-slate-700 rounded-t-md h-full flex flex-col-reverse">
                                        <div className="bg-primary rounded-t-md transition-all duration-500" style={{ height: `${dayData.wajib}%` }}></div>
                                    </div>
                                    <div className="w-1/2 bg-slate-700 rounded-t-md h-full flex flex-col-reverse">
                                        <div className="bg-sky-500 rounded-t-md transition-all duration-500" style={{ height: `${dayData.sunnah}%` }}></div>
                                    </div>
                                </div>
                                <span className="text-[10px] sm:text-xs mt-2 text-gray-400 font-semibold text-center leading-tight">{dayData.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </Card>

            {/* --- DZIKIR CHECKLIST --- */}
            <Card className="mb-8">
                <h3 className="font-bold text-xl mb-4 text-primary"><i className="fas fa-cloud-sun mr-2"></i>Dzikir Pagi & Sore</h3>
                <div className="space-y-3">
                    {dzikirCategory.prayers.map(doa => {
                        const isChecked = !!dzikirState[doa.title.id];
                        const isOpen = openDzikir === doa.title.id;
                        return (
                            <div key={doa.title.id} className="bg-slate-700 rounded-lg">
                                <div className={`flex items-stretch ${isChecked ? 'bg-slate-700/50' : ''}`}>
                                    <div 
                                        className="flex items-center justify-center p-4 cursor-pointer hover:bg-slate-600 rounded-l-lg"
                                        onClick={() => handleToggleDzikir(doa.title.id)}
                                    >
                                        <div className={`w-6 h-6 rounded-md border-2 ${isChecked ? 'bg-primary border-primary' : 'border-gray-400 hover:border-primary'} flex items-center justify-center transition-colors`}>
                                            {isChecked && <i className="fas fa-check text-white"></i>}
                                        </div>
                                    </div>
                                    <div className="flex-grow flex items-center p-3 border-x border-slate-600">
                                        <p className={`font-semibold ${isChecked ? 'line-through text-gray-500' : 'text-gray-200'}`}>{doa.title[lang]}</p>
                                    </div>
                                    <button onClick={(e) => { e.stopPropagation(); setOpenDzikir(prev => prev === doa.title.id ? null : doa.title.id); }} className="text-gray-400 hover:text-white p-4 hover:bg-slate-600 rounded-r-lg">
                                        <i className={`fas fa-chevron-down transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
                                    </button>
                                </div>
                                {isOpen && (
                                    <div className="p-4 border-t border-slate-600 space-y-3 animate-fade-in">
                                        <p className="font-uthmanic text-2xl text-right text-white">{doa.arabic}</p>
                                        <p className="italic text-sm text-gray-300">{doa.latin}</p>
                                        <p className="text-sm text-gray-400"><strong>{t('artinya')}:</strong> "{doa.translation[lang]}"</p>
                                        <p className="text-xs text-right text-gray-500">{doa.source}</p>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </Card>

            {/* --- PENGHITUNG DZIKIR --- */}
            <Card className="mb-8">
                <h3 className="font-bold text-xl mb-4 text-primary"><i className="fas fa-hand-pointer mr-2"></i>Penghitung Dzikir</h3>
                <div className="flex flex-col items-center">
                    <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                        <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
                            {/* Outer Ring: Forward Progress */}
                            <circle className="text-slate-700" stroke="currentColor" strokeWidth={outerStrokeWidth} fill="transparent" r={outerRadius} cx={size/2} cy={size/2} />
                            <circle className="text-green-500" stroke="currentColor" strokeWidth={outerStrokeWidth} strokeLinecap="round" fill="transparent" r={outerRadius} cx={size/2} cy={size/2} strokeDasharray={outerCircumference} strokeDashoffset={forwardOffset} style={{ transition: 'stroke-dashoffset 0.35s linear' }}/>
                            {/* Inner Ring: Backward Progress */}
                            <circle className="text-slate-700" stroke="currentColor" strokeWidth={innerStrokeWidth} fill="transparent" r={innerRadius} cx={size/2} cy={size/2} />
                            <circle className="text-sky-500" stroke="currentColor" strokeWidth={innerStrokeWidth} strokeLinecap="round" fill="transparent" r={innerRadius} cx={size/2} cy={size/2} strokeDasharray={innerCircumference} strokeDashoffset={backwardOffset} style={{ transition: 'stroke-dashoffset 0.35s linear' }} />
                        </svg>
                        <span className="absolute text-6xl font-bold text-white z-10 tabular-nums">{tasbihCount}</span>
                    </div>
                    <div className="w-full max-w-xs space-y-3">
                        <button onClick={() => {
                            const newCount = tasbihCount + 1;
                            setTasbihCount(newCount);
                            const target = Number(tasbihTarget) || 33;
                            if (target > 0 && newCount > 0 && newCount % target === 0) {
                                playTargetBeepSound();
                            }
                        }} className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-full text-2xl transition-transform transform active:scale-95">
                            +
                        </button>
                        <div className="flex gap-2 items-stretch">
                             <button onClick={() => setTasbihCount(0)} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-lg text-sm">Reset</button>
                             <input type="text" inputMode="numeric" value={tasbihTarget} onChange={handleNumericInput(setTasbihTarget)} className="w-16 text-center bg-slate-700 rounded-lg border border-slate-600 font-bold" />
                             <div className="p-2 bg-slate-700 rounded-lg flex flex-col items-center justify-center text-xs flex-shrink-0 w-16">
                                <span className="font-bold">Putaran</span>
                                <span className="text-lg font-bold text-primary">{putaran}</span>
                             </div>
                             <button onClick={() => setTasbihCount(Number(tasbihTarget))} className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-3 rounded-lg text-sm">Set</button>
                        </div>
                    </div>
                </div>
            </Card>


            {/* --- Ramadhan Tracker Content --- */}
            <h2 className="text-3xl font-bold mb-2 text-white text-center">Roadmap Khusus Ramadhan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 animate-fade-in" key="countdown-view">
                <Card>
                    <h3 className="text-xl font-bold text-center mb-4 text-primary"><i className="fas fa-moon mr-2"></i>Menuju Ramadhan</h3>
                    <div className="flex justify-center space-x-2 sm:space-x-3 text-center tabular-nums">
                        <div><p className="text-3xl sm:text-4xl font-bold">{ramadhanCountdown.days}</p><p className="text-xs text-gray-400">Hari</p></div>
                        <div className="text-3xl sm:text-4xl font-bold">:</div>
                        <div><p className="text-3xl sm:text-4xl font-bold">{String(ramadhanCountdown.hours).padStart(2, '0')}</p><p className="text-xs text-gray-400">Jam</p></div>
                        <div className="text-3xl sm:text-4xl font-bold">:</div>
                        <div><p className="text-3xl sm:text-4xl font-bold">{String(ramadhanCountdown.minutes).padStart(2, '0')}</p><p className="text-xs text-gray-400">Menit</p></div>
                        <div className="text-3xl sm:text-4xl font-bold">:</div>
                        <div><p className="text-3xl sm:text-4xl font-bold">{String(ramadhanCountdown.seconds).padStart(2, '0')}</p><p className="text-xs text-gray-400">Detik</p></div>
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-3">Estimasi 1 Ramadhan {new Date(nextRamadhanDate).getFullYear()}</p>
                </Card>
                <Card>
                    <h3 className="text-xl font-bold text-center mb-4 text-primary"><i className="fas fa-mosque mr-2"></i>Menuju Idul Fitri</h3>
                    <div className="flex justify-center space-x-2 sm:space-x-3 text-center tabular-nums">
                         <div><p className="text-3xl sm:text-4xl font-bold">{idulFitriCountdown.days}</p><p className="text-xs text-gray-400">Hari</p></div>
                        <div className="text-3xl sm:text-4xl font-bold">:</div>
                        <div><p className="text-3xl sm:text-4xl font-bold">{String(idulFitriCountdown.hours).padStart(2, '0')}</p><p className="text-xs text-gray-400">Jam</p></div>
                        <div className="text-3xl sm:text-4xl font-bold">:</div>
                        <div><p className="text-3xl sm:text-4xl font-bold">{String(idulFitriCountdown.minutes).padStart(2, '0')}</p><p className="text-xs text-gray-400">Menit</p></div>
                        <div className="text-3xl sm:text-4xl font-bold">:</div>
                        <div><p className="text-3xl sm:text-4xl font-bold">{String(idulFitriCountdown.seconds).padStart(2, '0')}</p><p className="text-xs text-gray-400">Detik</p></div>
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-3">Estimasi 1 Syawal {new Date(nextIdulFitriDate).getFullYear()}</p>
                </Card>
            </div>

            <div className="animate-fade-in" key="ramadhan-view">
                <Card className="mb-8">
                    <h3 className="text-xl font-bold mb-4 text-primary">Tracker Puasa Ramadhan {isRamadhan && `(Hari ke-${dayOfRamadhan})`}</h3>
                    <div className="w-full bg-slate-700 rounded-full h-2.5 mb-2"><div className="bg-primary h-2.5 rounded-full transition-all duration-500" style={{ width: `${puasaProgress.percentage}%` }}></div></div>
                    <p className="text-xs text-gray-400 text-right">{puasaProgress.completedDays} / {puasaProgress.totalDays} hari</p>
                    <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 mt-4">
                        {Array.from({ length: 30 }, (_, i) => i + 1).map(day => {
                            const dayKey = `day${day}`; const status = puasaTracker[dayKey]; let buttonClass = '';
                            if (status === 'puasa') buttonClass = 'bg-green-600 text-white';
                            else if (status === 'tidak') buttonClass = 'bg-red-600 text-white';
                            else buttonClass = (isRamadhan && day <= dayOfRamadhan) ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-800 text-slate-600 cursor-not-allowed';
                            return (<button key={day} onClick={() => handlePuasaToggle(day)} disabled={!isRamadhan || day > dayOfRamadhan} className={`w-full aspect-square rounded-lg font-bold transition-colors flex flex-col items-center justify-center text-xs ${buttonClass}`} title={!isRamadhan ? "Fitur ini hanya aktif selama bulan Ramadhan" : ""}><span className="text-lg font-bold">{day}</span>{status && <span className="text-[10px] leading-3 capitalize">{status}</span>}</button>);
                        })}
                    </div>
                     <p className="text-xs text-center text-gray-500 mt-4">Tombol akan aktif saat bulan Ramadhan tiba dan sesuai dengan tanggal berjalan. Klik untuk mengubah status (Puasa / Tidak / Kosong).</p>
                </Card>
                <Card className="mb-8">
                    <h3 className="text-xl font-bold mb-4 text-primary">Tracker One Day One Juz</h3>
                    <div className="w-full bg-slate-700 rounded-full h-2.5 mb-2"><div className="bg-primary h-2.5 rounded-full transition-all duration-500" style={{ width: `${juzProgress.percentage}%` }}></div></div>
                    <p className="text-xs text-gray-400 text-right">{juzProgress.completedJuz} / {juzProgress.totalJuz} Juz</p>
                    <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 mt-4">
                        {Array.from({ length: 30 }, (_, i) => i + 1).map(juz => (<button key={juz} onClick={() => handleJuzToggle(juz)} disabled={!isRamadhan} className={`p-2 rounded-lg font-semibold transition-colors text-xs ${juzTracker[`juz${juz}`] ? 'bg-green-600 text-white' : isRamadhan ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`} title={!isRamadhan ? "Fitur ini hanya aktif selama bulan Ramadhan" : ""}>Juz {juz}</button>))}
                    </div>
                    <p className="text-xs text-center text-gray-500 mt-4">Tombol akan aktif saat bulan Ramadhan tiba.</p>
                </Card>
                <Card className="mb-8"><h3 className="text-2xl font-bold mb-4 text-center text-primary">{t('keberkahan_ramadhan')}</h3><div className="space-y-3">
                    <div className="border border-slate-600 rounded-lg"><button onClick={() => handleAccordionToggle('lailatul-qadar')} className="w-full flex justify-between items-center p-3 bg-slate-700 hover:bg-slate-600 rounded-t-lg" aria-expanded={openAccordion === 'lailatul-qadar'}><h4 className="font-semibold text-gray-200"><i className="fas fa-gem mr-3 text-primary"></i>{t('malam_kemuliaan')}</h4><i className={`fas fa-chevron-down transition-transform ${openAccordion === 'lailatul-qadar' ? 'rotate-180' : ''}`}></i></button>{openAccordion === 'lailatul-qadar' && (<div className="p-4 bg-slate-800/50 rounded-b-lg animate-fade-in space-y-3 text-sm text-gray-300"><p>{t('lailatul_qadar_desc')}</p><p><strong>{t('waktu_terjadi')}:</strong> {t('lailatul_qadar_waktu')}</p><p><strong>{t('amalan_dianjurkan')}:</strong> {t('lailatul_qadar_amalan')}</p><blockquote className="border-l-4 border-primary pl-4 italic text-xs mt-2"><p>"{t('dalil_alqadr')}"</p><footer className="text-right text-gray-400">- QS. Al-Qadr: 1-5 -</footer></blockquote></div>)}</div>
                    <div className="border border-slate-600 rounded-lg"><button onClick={() => handleAccordionToggle('10-malam-terakhir')} className="w-full flex justify-between items-center p-3 bg-slate-700 hover:bg-slate-600 rounded-t-lg" aria-expanded={openAccordion === '10-malam-terakhir'}><h4 className="font-semibold text-gray-200"><i className="fas fa-star-and-crescent mr-3 text-primary"></i>{t('keutamaan_10_malam_terakhir')}</h4><i className={`fas fa-chevron-down transition-transform ${openAccordion === '10-malam-terakhir' ? 'rotate-180' : ''}`}></i></button>{openAccordion === '10-malam-terakhir' && (<div className="p-4 bg-slate-800/50 rounded-b-lg animate-fade-in space-y-3 text-sm text-gray-300"><p>{t('keutamaan_10_malam_desc')}</p><p><strong>{t('fokus_utama')}:</strong> {t('fokus_utama_desc')}</p><p><strong>{t('amalan_utama')}:</strong> {t('amalan_utama_desc')}</p><blockquote className="border-l-4 border-primary pl-4 italic text-xs mt-2"><p>"{t('dalil_10_malam_terakhir')}"</p><footer className="text-right text-gray-400">- HR. Bukhari & Muslim -</footer></blockquote></div>)}</div>
                    <div className="border border-slate-600 rounded-lg"><button onClick={() => handleAccordionToggle('amalan-sunnah')} className="w-full flex justify-between items-center p-3 bg-slate-700 hover:bg-slate-600 rounded-t-lg" aria-expanded={openAccordion === 'amalan-sunnah'}><h4 className="font-semibold text-gray-200"><i className="fas fa-clipboard-check mr-3 text-primary"></i>{t('amalan_sunnah_ramadhan')}</h4><i className={`fas fa-chevron-down transition-transform ${openAccordion === 'amalan-sunnah' ? 'rotate-180' : ''}`}></i></button>{openAccordion === 'amalan-sunnah' && (<div className="p-4 bg-slate-800/50 rounded-b-lg animate-fade-in space-y-2 text-sm text-gray-300"><p>{t('sunnah_list_title')}</p><ul className="list-disc list-inside space-y-2 pl-2"><li><strong>{t('sunnah_menyegerakan_buka')}:</strong> {t('sunnah_menyegerakan_buka_desc')}</li><li><strong>{t('sunnah_buka_kurma')}:</strong> {t('sunnah_buka_kurma_desc')}</li><li><strong>{t('sunnah_sahur')}:</strong> {t('sunnah_sahur_desc')}</li><li><strong>{t('sunnah_sedekah')}:</strong> {t('sunnah_sedekah_desc')}</li><li><strong>{t('sunnah_memberi_makan')}:</strong> {t('sunnah_memberi_makan_desc')}</li><li><strong>{t('sunnah_tarawih')}:</strong> {t('sunnah_tarawih_desc')}</li><li><strong>{t('sunnah_tilawah')}:</strong> {t('sunnah_tilawah_desc')}</li></ul></div>)}</div>
                </div></Card>
            </div>

            {/* --- Original Daily Roadmap Content --- */}
            <div className="border-t-2 border-slate-700 my-10"></div>
            <h3 className="text-2xl font-bold mb-6 text-center text-white">Tugas Harian Anda</h3>
            
            <Card className="mb-8">
                <h3 className="font-bold text-lg mb-2 text-primary">Progres Harian Anda</h3>
                <div className="w-full bg-slate-700 rounded-full h-4">
                    <div className="bg-primary h-4 rounded-full flex items-center justify-center text-xs font-bold text-white transition-all duration-500" style={{ width: `${progressPercentage}%` }}>{progressPercentage > 10 && `${Math.round(progressPercentage)}%`}</div>
                </div>
                <p className="text-sm text-gray-400 mt-2 text-center">{completedTasks} {t('dari' as any)} {totalTasks} {t('roadmap_tugas_harian_selesai' as any)}</p>
            </Card>

            <Card className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-200 mb-2">{t('filter_prioritas' as any)}</label><div className="flex space-x-2">{priorityFilters.map(filter => (<button key={filter.value} onClick={() => setPriorityFilter(filter.value)} className={`w-full text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 text-sm ${priorityFilter === filter.value ? `${filter.color} ring-2 ring-offset-2 ring-offset-slate-800 ring-white` : `${filter.color} opacity-60 hover:opacity-100`}`}>{filter.label}</button>))}</div></div>
                    <div><label className="block text-sm font-medium text-gray-200 mb-2">{t('filter_status' as any)}</label><div className="flex space-x-2">{statusFilters.map(filter => (<button key={filter.value} onClick={() => setStatusFilter(filter.value)} className={`w-full text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 text-sm ${statusFilter === filter.value ? `${filter.color} ring-2 ring-offset-2 ring-offset-slate-800 ring-white` : `${filter.color} opacity-60 hover:opacity-100`}`}>{filter.label}</button>))}</div></div>
                </div>
            </Card>

            <div className="space-y-6">
                {Object.keys(filteredRoadmap).length > 0 ? (
                    (Object.keys(filteredRoadmap) as RoadmapCategoryKey[]).map(categoryKey => {
                        const category = filteredRoadmap[categoryKey];
                        const originalCategory = roadmapData[categoryKey];
                        const totalTasksInCategory = originalCategory.tasks.length;
                        const completedTasksInCategory = originalCategory.tasks.filter((task) => !!roadmapState[task.id]).length;
                        const progressPercentageInCategory = totalTasksInCategory > 0 ? (completedTasksInCategory / totalTasksInCategory) * 100 : 0;

                        return (
                            <Card key={categoryKey}>
                                <h3 className="text-xl font-bold mb-4 text-primary"><i className={`${category.icon} mr-3`}></i>{category.title[lang]}</h3>
                                
                                <div className="mb-4">
                                    <div className="w-full bg-slate-700 rounded-full h-2.5">
                                        <div 
                                            className="bg-primary h-2.5 rounded-full transition-all duration-300" 
                                            style={{ width: `${progressPercentageInCategory}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-gray-400 text-right mt-1">{completedTasksInCategory} / {totalTasksInCategory}</p>
                                </div>

                                <div className="space-y-3">
                                {category.tasks.map(({ task, originalId }: { task: any, originalId: string }) => {
                                        const isChecked = !!roadmapState[originalId];
                                        const linkPath = taskLinks[originalId];

                                        return (
                                            <div key={originalId} className="flex items-stretch bg-slate-700 rounded-lg group">
                                                {/* Checkbox area */}
                                                <div
                                                    className="flex items-center justify-center px-4 cursor-pointer hover:bg-slate-600 rounded-l-lg"
                                                    onClick={() => handleToggleTask(originalId)}
                                                    aria-label={`Tandai ${task.name[lang]}`}
                                                >
                                                     <div className={`w-6 h-6 rounded-md border-2 ${isChecked ? 'bg-primary border-primary' : 'border-gray-400 group-hover:border-primary'} flex items-center justify-center transition-colors`}>
                                                        {isChecked && <i className="fas fa-check text-white"></i>}
                                                    </div>
                                                </div>
        
                                                {/* Text/Link area */}
                                                <div className="flex-grow border-l border-slate-600">
                                                {linkPath ? (
                                                    <Link to={linkPath} state={{ from: '/roadmap' }} className="flex justify-between items-center w-full p-3 h-full hover:bg-slate-600 rounded-r-lg">
                                                        <p className={`font-semibold ${isChecked ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                                                            {task.name[lang]}
                                                            <i className="fas fa-book-open text-xs text-gray-500 ml-2 transition-colors group-hover:text-primary"></i>
                                                        </p>
                                                        <div title={`Prioritas: ${task.priority[lang]}`} className={`ml-4 w-3 h-3 rounded-full flex-shrink-0 ${getPriorityClass(task.priority.id)}`}></div>
                                                    </Link>
                                                ) : (
                                                    <div className="flex justify-between items-center w-full p-3 h-full">
                                                        <p className={`font-semibold ${isChecked ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                                                            {task.name[lang]}
                                                        </p>
                                                        <div title={`Prioritas: ${task.priority[lang]}`} className={`ml-4 w-3 h-3 rounded-full flex-shrink-0 ${getPriorityClass(task.priority.id)}`}></div>
                                                    </div>
                                                )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Card>
                        );
                    })
                ) : (
                    <Card className="text-center py-10"><p className="text-gray-400">{t('roadmap_filter_kosong' as any)}</p></Card>
                )}
            </div>
        </section>
    );
};

export default Roadmap;