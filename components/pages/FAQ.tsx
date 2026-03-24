
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';

interface FaqItem {
  id: number;
  question: { id: string; en: string };
  answer: { id: string; en: string };
}

const faqData: FaqItem[] = [
    {
        id: 1,
        question: { id: "Bagaimana cara menggunakan Konsultasi AI?", en: "How do I use the AI Consultation feature?" },
        answer: { id: "Pilih menu 'Konsultasi AI'. Anda bisa memilih mode 'Konsultasi Umum' atau 'Pencari Dalil'. Untuk konsultasi umum, pilih kategori masalah yang paling sesuai, lalu tuliskan deskripsi masalah Anda. AI akan memberikan nasihat berbasis Al-Qur'an, Hadits, doa, dan langkah praktis. Semua riwayat konsultasi disimpan secara lokal di perangkat Anda untuk privasi.", en: "Select the 'AI Consultation' menu. You can choose 'General Consultation' or 'Evidence Finder' mode. For general consultation, select the most relevant problem category, then write your problem description. The AI will provide advice based on the Qur'an, Hadith, prayers, and practical steps. All consultation history is stored locally on your device for privacy." }
    },
    {
        id: 2,
        question: { id: "Bagaimana cara menandai progres di Roadmap Personal?", en: "How do I track progress in the Personal Roadmap?" },
        answer: { id: "Pada halaman 'Roadmap Personal', Anda akan melihat daftar aktivitas dengan kotak centang (checkbox) di sebelahnya. Cukup klik kotak tersebut untuk menandai sebuah tugas sebagai 'selesai'. Progres Anda akan disimpan secara otomatis di perangkat Anda.", en: "On the 'Personal Roadmap' page, you will see a list of activities with checkboxes next to them. Simply click the box to mark a task as 'completed'. Your progress is saved automatically on your device." }
    },
    {
        id: 3,
        question: { id: "Bagaimana cara menyimpan progres bacaan di Mushaf Al-Qur'an?", en: "How is my reading progress saved in the Mushaf Al-Qur'an?" },
        answer: { id: "Aplikasi ini secara otomatis menyimpan surah terakhir yang Anda buka. Saat Anda kembali ke Beranda, akan muncul kartu 'Terakhir Dibaca' yang memungkinkan Anda melanjutkan bacaan dengan mudah. Fitur penanda ayat spesifik akan dikembangkan di versi mendatang.", en: "The application automatically saves the last surah you opened. When you return to the Home page, a 'Last Read' card will appear, allowing you to easily continue your reading. A specific verse bookmarking feature will be developed in a future version." }
    },
    {
        id: 4,
        question: { id: "Apakah data saya aman dan privat?", en: "Is my data safe and private?" },
        answer: { id: "Ya, privasi Anda adalah prioritas kami. Semua data personalisasi seperti riwayat konsultasi, progres Roadmap, ayat favorit, dan riwayat pertanyaan disimpan secara lokal di browser atau perangkat Anda (menggunakan Local Storage). Data ini tidak dikirim atau disimpan di server kami.", en: "Yes, your privacy is our priority. All personalization data such as consultation history, Roadmap progress, favorite verses, and question history are stored locally in your browser or on your device (using Local Storage). This data is not sent to or stored on our servers." }
    },
    {
        id: 5,
        question: { id: "Kapan saja tayamum diperbolehkan untuk dilakukan?", en: "When is performing Tayammum permissible?" },
        answer: { id: "Tayamum adalah keringanan (rukhsah) sebagai pengganti wudhu atau mandi wajib. Tayamum diperbolehkan dalam beberapa kondisi, di antaranya: 1. Tidak ditemukan air setelah berusaha mencarinya. 2. Ada halangan menggunakan air, seperti sakit parah yang akan bertambah buruk jika terkena air (atas anjuran dokter). 3. Jumlah air sangat terbatas dan hanya cukup untuk minum. 4. Ada bahaya yang mengancam jika mendekati sumber air (misalnya, ada binatang buas).", en: "Tayammum is a concession (rukhsah) as a substitute for wudu or ghusl. Tayammum is permitted under several conditions, including: 1. Water cannot be found after searching for it. 2. There is an obstacle to using water, such as a severe illness that would worsen with water exposure (based on a doctor's recommendation). 3. The amount of water is very limited and only sufficient for drinking. 4. There is a danger that threatens one's life when approaching a water source (e.g., a wild animal)." }
    }
];


const FAQ: React.FC = () => {
    const { t, lang } = useLanguage();
    const [openFaqId, setOpenFaqId] = useState<number | null>(null);

    const toggleFaq = (id: number) => {
        setOpenFaqId(openFaqId === id ? null : id);
    };

    return (
        <section id="faq" className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-white">{t('faq_title_page' as any)}</h2>

            <Card>
                <p className="mb-6 text-gray-300">
                    {t('faq_desc' as any)}
                </p>
                <div className="space-y-4">
                    {faqData.map((faq) => (
                        <div key={faq.id} className="bg-gray-700 dark:bg-gray-900 rounded-lg overflow-hidden">
                            <button
                                onClick={() => toggleFaq(faq.id)}
                                className="w-full flex justify-between items-center text-left p-4"
                                aria-expanded={openFaqId === faq.id}
                            >
                                <h3 className="font-semibold text-gray-100">{faq.question[lang]}</h3>
                                <i className={`fas fa-chevron-down transition-transform duration-300 ${openFaqId === faq.id ? 'rotate-180' : ''}`}></i>
                            </button>
                            {openFaqId === faq.id && (
                                <div className="p-4 border-t border-gray-600 dark:border-gray-800 animate-fade-in">
                                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{faq.answer[lang]}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Card>
        </section>
    );
};

export default FAQ;
