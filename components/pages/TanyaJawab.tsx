
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
        answer: { id: "Pilih menu 'Konsultasi'. Anda akan menemukan beberapa mode. Untuk 'Konsultasi Umum', pilih kategori masalah, tuliskan deskripsi masalah Anda, dan AI akan memberikan nasihat berbasis Al-Qur'an dan Hadits. Untuk mode lain, ikuti petunjuk yang ada. Semua riwayat konsultasi disimpan secara lokal di perangkat Anda untuk privasi.", en: "Select the 'Konsultasi' menu. You will find several modes. For 'General Consultation', select the problem category, write your problem description, and the AI will provide advice based on the Qur'an and Hadith. For other modes, follow the instructions provided. All consultation history is stored locally on your device for privacy." }
    },
    {
        id: 2,
        question: { id: "Apa perbedaan mode di Konsultasi AI?", en: "What are the differences between the modes in AI Consultation?" },
        answer: { id: "Setiap mode memiliki fungsi spesifik: \n- **Konsultasi Umum:** Untuk mendapatkan nasihat spiritual dan langkah praktis atas masalah kehidupan. \n- **Refleksi & Tadabbur:** Untuk mendapatkan perenungan dan kisah-kisah Islami yang relevan dengan perasaan atau situasi Anda. \n- **Pencari Dalil:** Untuk mencari dalil Al-Qur'an dan Hadits spesifik tentang suatu topik. \n- **Pengetahuan Umum:** Untuk bertanya tentang berbagai hal terkait keislaman yang jawabannya didukung oleh pencarian web.", en: "Each mode has a specific function: \n- **General Consultation:** To get spiritual advice and practical steps for life problems. \n- **Reflection & Tadabbur:** To get reflections and relevant Islamic stories for your feelings or situation. \n- **Evidence Finder:** To search for specific Qur'anic and Hadith evidence on a topic. \n- **General Knowledge:** To ask about various Islamic topics with answers supported by web search." }
    },
    {
        id: 3,
        question: { id: "Bagaimana cara kerja Tarbiyah Journey?", en: "How does the Tarbiyah Journey work?" },
        answer: { id: "Tarbiyah Journey adalah kurikulum pembelajaran terstruktur. Setiap level berisi beberapa langkah (materi bacaan) yang harus Anda selesaikan. Klik judul materi untuk membacanya, lalu tandai kotak centang di sebelahnya setelah Anda selesai. Progres Anda akan disimpan dan kemajuan level akan terlihat pada bilah progres.", en: "Tarbiyah Journey is a structured learning curriculum. Each level contains several steps (reading materials) that you must complete. Click on the material title to read it, then check the box next to it when you are done. Your progress will be saved, and your level advancement will be shown on the progress bar." }
    },
    {
        id: 4,
        question: { id: "Bagaimana cara menandai progres di Roadmap Personal?", en: "How do I track progress in the Personal Roadmap?" },
        answer: { id: "Pada halaman 'Roadmap Personal', Anda akan melihat daftar tugas harian dalam 6 kategori. Cukup klik pada sebuah tugas (di area teks atau checkbox) untuk menandainya sebagai 'selesai'. Jika tidak sengaja menandainya, Anda bisa mengkliknya lagi setelah konfirmasi. Progres Anda akan disimpan secara otomatis untuk hari itu.", en: "On the 'Personal Roadmap' page, you will see a list of daily tasks in 6 categories. Simply click on a task (on the text or checkbox area) to mark it as 'completed'. If you mark it by mistake, you can click it again after confirmation. Your progress is saved automatically for that day." }
    },
    {
        id: 7,
        question: { id: "Bagaimana cara kerja fitur hafalan (SRS) di Hadits Arbain?", en: "How does the memorization (SRS) feature in Arba'in Hadith work?" },
        answer: { id: "Fitur ini menggunakan metode Spaced Repetition System (SRS) untuk membantu hafalan. Klik 'Mulai Hafalkan' pada sebuah hadits. Aplikasi akan menjadwalkan kapan Anda harus mengulasnya kembali. Saat jadwalnya tiba, Anda akan diminta menilai ingatan Anda ('Ingat' atau 'Lupa'). Jika 'Ingat', jadwal ulasan berikutnya akan lebih lama. Jika 'Lupa', jadwalnya akan lebih cepat. Ini membantu memindahkan hafalan dari memori jangka pendek ke jangka panjang secara efisien.", en: "This feature uses the Spaced Repetition System (SRS) method to aid memorization. Click 'Start Memorizing' on a hadith. The app will schedule when you need to review it. When it's due, you'll be asked to rate your memory ('Remembered' or 'Forgot'). If 'Remembered', the next review will be scheduled further out. If 'Forgot', it will be sooner. This efficiently moves the memorization from short-term to long-term memory." }
    },
    {
        id: 8,
        question: { id: "Apakah perhitungan Zakat dan Waris di aplikasi ini sudah akurat?", en: "Are the Zakat and Inheritance calculations in this app accurate?" },
        answer: { id: "Kalkulator ini menyediakan estimasi dasar berdasarkan kasus umum dalam fiqh. Untuk Zakat, pastikan Anda menyesuaikan harga emas/perak dengan harga pasar saat ini. Untuk Waris, kalkulator ini hanya mencakup ahli waris inti. Untuk kasus yang kompleks (adanya 'aul, radd, kakek, saudara, dll.) atau untuk keputusan hukum final, sangat disarankan untuk berkonsultasi langsung dengan ulama atau ahli faraid yang kompeten.", en: "This calculator provides basic estimations based on common fiqh cases. For Zakat, ensure you adjust the gold/silver prices to current market rates. For Inheritance, this calculator only covers core heirs. For complex cases (involving 'aul, radd, grandfathers, siblings, etc.) or for a final legal decision, it is highly recommended to consult directly with a competent scholar or faraid expert." }
    },
    {
        id: 9,
        question: { id: "Mengapa aplikasi meminta izin Lokasi dan Kamera?", en: "Why does the app ask for Location and Camera permissions?" },
        answer: { id: "Izin Lokasi (Geolocation) digunakan untuk fitur 'Waktu Shalat' dan 'Masjid Terdekat' agar dapat memberikan data yang akurat sesuai posisi Anda. Izin Kamera (Camera) digunakan untuk fitur 'Pindai Komposisi Halal' pada menu 'Panduan Halal', memungkinkan Anda memfoto daftar bahan produk. Aplikasi tidak akan mengaksesnya di luar fitur-fitur tersebut.", en: "Location (Geolocation) permission is used for the 'Prayer Times' and 'Nearby Mosques' features to provide accurate data based on your position. Camera permission is used for the 'Scan Halal Composition' feature in the 'Halal Guide' menu, allowing you to photograph a product's ingredient list. The app will not access them outside of these features." }
    },
    {
        id: 10,
        question: { id: "Apakah data Ramadhan Tracker saya akan hilang setelah Ramadhan berakhir?", en: "Will my Ramadhan Tracker data be lost after Ramadhan ends?" },
        answer: { id: "Tidak. Semua data progres puasa, tilawah, dan ibadah harian Anda selama Ramadhan akan tetap tersimpan di perangkat Anda. Anda dapat melihatnya kembali di tahun-tahun berikutnya melalui menu 'Riwayat' atau 'Laporan Spiritual'.", en: "No. All your fasting, tilawah, and daily worship progress data during Ramadhan will remain stored on your device. You can review it in subsequent years through the 'History' or 'Spiritual Report' menus." }
    },
    {
        id: 11,
        question: { id: "Bisakah saya menambahkan acara pribadi di Kalender?", en: "Can I add personal events to the Calendar?" },
        answer: { id: "Ya. Pada halaman 'Kalender', klik tombol 'Tambah Acara'. Anda bisa memasukkan judul, tanggal, dan jenis acara (Islami atau Nasional). Acara yang Anda buat akan disimpan secara lokal dan ditandai dengan titik di kalender, serta muncul di daftar acara di bawahnya.", en: "Yes. On the 'Calendar' page, click the 'Add Event' button. You can enter a title, date, and event type (Islamic or National). Your created events will be stored locally and marked with a dot on the calendar, and will appear in the event list below it." }
    },
    {
        id: 12,
        question: { id: "Apakah aplikasi ini bisa digunakan secara offline (tanpa internet)?", en: "Can this application be used offline (without internet)?" },
        answer: { id: "Sebagian besar fitur bisa digunakan secara offline, termasuk membaca semua konten (Hadits, Ensiklopedia, dll), Tasbih Digital, Roadmap, dan Jurnal. Fitur yang memerlukan koneksi internet aktif adalah Konsultasi AI, Waktu Shalat, Masjid Terdekat, dan Visualisasi Ayat, karena fitur-fitur tersebut perlu berkomunikasi dengan server eksternal.", en: "Most features can be used offline, including reading all content (Hadith, Encyclopedia, etc.), Digital Tasbih, Roadmap, and Journal. Features that require an active internet connection are AI Consultation, Prayer Times, Nearby Mosques, and Visualize Verse, as these features need to communicate with external servers." }
    },
    {
        id: 13,
        question: { id: "Apakah data saya aman dan privat?", en: "Is my data safe and private?" },
        answer: { id: "Ya, privasi Anda adalah prioritas utama. Semua data personalisasi (riwayat konsultasi, progres, catatan jurnal, ayat favorit, dll) disimpan secara lokal di browser perangkat Anda (menggunakan Local Storage). Data ini TIDAK dikirim atau disimpan di server kami, sehingga hanya Anda yang bisa mengaksesnya.", en: "Yes, your privacy is a top priority. All personalization data (consultation history, progress, journal entries, favorite verses, etc.) is stored locally in your device's browser (using Local Storage). This data is NOT sent to or stored on our servers, so only you can access it." }
    },
    {
        id: 14,
        question: { id: "Apa yang terjadi jika saya menekan 'Hapus Semua Data' di Pengaturan?", en: "What happens if I press 'Clear All Data' in Settings?" },
        answer: { id: "Tindakan ini akan menghapus SEMUA data yang tersimpan secara lokal di perangkat Anda, termasuk riwayat konsultasi, progres Tarbiyah Journey dan Roadmap, catatan jurnal, riwayat kuis, dan profil Anda. Aplikasi akan kembali ke kondisi awal seperti saat pertama kali dibuka. Tindakan ini tidak dapat diurungkan.", en: "This action will delete ALL data stored locally on your device, including consultation history, Tarbiyah Journey and Roadmap progress, journal entries, quiz history, and your profile. The app will return to its initial state as if it were opened for the first time. This action cannot be undone." }
    },
    {
        id: 15,
        question: { id: "Siapa pengembang aplikasi ini dan bagaimana cara menghubunginya?", en: "Who is the developer of this application and how can I contact them?" },
        answer: { id: "Aplikasi ini dikembangkan oleh Rojudin (R_besar.id). Untuk masukan, laporan bug, atau pertanyaan lebih lanjut, Anda bisa mengunjungi halaman 'Tentang Kami' di menu aplikasi. Di sana, Anda akan menemukan tautan ke akun media sosial pengembang.", en: "This application was developed by Rojudin (R_besar.id). For feedback, bug reports, or further questions, you can visit the 'About Us' page in the application menu. There, you will find links to the developer's social media accounts." }
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
