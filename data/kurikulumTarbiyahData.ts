
import type { ContentPage } from '../types';

export interface KurikulumSubject {
    id: string;
    category: string;
    description: string;
    color: string;
    content: ContentPage[];
}

export interface KurikulumLevel {
    level: number;
    title: string;
    duration: string;
    subjects: KurikulumSubject[];
}

export const kurikulumTarbiyahData: KurikulumLevel[] = [
    {
        level: 1,
        title: "Level 1: Fondasi Ilmu & Adab",
        duration: "Bulan 1-12",
        subjects: [
            { 
                id: "adab-level-1",
                category: "Adab Penuntut Ilmu", 
                description: "Membentuk wadah ilmu sebelum mengisinya.",
                color: "bg-yellow-600",
                content: [
                    {
                        title: "BAB 1: Urgensi Adab",
                        body: [
                            { type: 'paragraph', text: "Yusuf bin Al Husain berkata: 'Dengan mempelajari adab, maka engkau akan mudah memahami ilmu.' Sebelum kita menyelami lautan ilmu syar'i, kita wajib membersihkan wadahnya terlebih dahulu, yaitu hati dan perilaku kita." },
                            { type: 'list', title: "Mengapa Adab Didahulukan?", items: ["Ilmu adalah cahaya, dan cahaya tidak akan masuk ke hati yang kotor.", "Adab adalah buah dari ilmu; jika pohon tidak berbuah, maka ia kurang bermanfaat.", "Ulama terdahulu mempelajari adab selama 30 tahun sebelum mempelajari ilmu."] }
                        ]
                    },
                    {
                        title: "BAB 2: Ikhlas dalam Menuntut Ilmu",
                        body: [
                            { type: 'paragraph', text: "Niat adalah pondasi. Menuntut ilmu syar'i adalah ibadah yang agung, dan syarat diterimanya ibadah adalah Ikhlas. Jangan menuntut ilmu untuk debat, sombong, atau mencari dunia." },
                            { type: 'list', title: "Tanda-tanda Ikhlas", items: ["Beramal dengan ilmunya.", "Tidak suka dipuji.", "Takut ilmunya menjadi bumerang di akhirat.", "Semakin berilmu semakin tawadhu (rendah hati)."] }
                        ]
                    },
                    {
                        title: "BAB 3: Memuliakan Guru & Ilmu",
                        body: [
                            { type: 'paragraph', text: "Ilmu tidak akan didapat kecuali dengan kerendahan hati di hadapan ahlinya. Seorang murid harus memuliakan gurunya karena Allah." },
                            { type: 'list', title: "Bentuk Penghormatan", items: ["Tidak memotong pembicaraan guru.", "Mendoakan guru.", "Bersabar atas kekerasan/kesalahan guru.", "Tidak membawa kitab setinggi/sejajar dengan kaki."] }
                        ]
                    }
                ]
            },
            { 
                id: "tauhid-level-1",
                category: "Tauhid Dasar", 
                description: "Mengenal Allah, Rasul, dan Agama Islam (Ushul Tsalatsah).",
                color: "bg-red-600",
                content: [
                    {
                        title: "BAB 1: Mengenal Allah (Ma'rifatullah)",
                        body: [
                            { type: 'paragraph', text: "Landasan pertama yang wajib diketahui setiap manusia adalah mengenal Rabb-nya. Allah adalah Tuhan yang memelihara kita dan seluruh alam semesta dengan nikmat-Nya." },
                            { type: 'list', title: "Bukti Keberadaan Allah", items: ["Adanya alam semesta (makhluk) menunjukkan adanya Pencipta (Khaliq).", "Fitrah manusia yang selalu mencari kekuatan yang lebih tinggi.", "Mukjizat para Nabi dan Rasul."] }
                        ]
                    },
                    {
                        title: "BAB 2: Mengenal Agama Islam (Ma'rifatu Dinil Islam)",
                        body: [
                            { type: 'paragraph', text: "Islam adalah berserah diri kepada Allah dengan mentauhidkan-Nya, tunduk kepada-Nya dengan ketaatan, dan berlepas diri dari kesyirikan." },
                            { type: 'list', title: "Tingkatan Agama", items: ["Islam (Amalan Lahiriah)", "Iman (Keyakinan Batin)", "Ihsan (Kualitas Ibadah/Merasa diawasi Allah)"] }
                        ]
                    },
                    {
                        title: "BAB 3: Mengenal Nabi Muhammad SAW",
                        body: [
                            { type: 'paragraph', text: "Mengenal nasab, kehidupan, dan misi beliau. Beliau adalah Muhammad bin Abdullah bin Abdul Muthalib bin Hasyim, dari suku Quraisy." },
                            { type: 'paragraph', text: "Mengenal beliau berarti mencintai beliau, menaati perintahnya, membenarkan beritanya, dan menjauhi larangannya." }
                        ]
                    }
                ]
            },
            { 
                id: "tajwid-level-1",
                category: "Tajwid Dasar", 
                description: "Hukum Nun Sukun, Mim Sukun, dan Qalqalah.",
                color: "bg-green-600",
                content: [
                    {
                        title: "BAB 1: Makharijul Huruf",
                        body: [
                            { type: 'paragraph', text: "Kunci membaca Al-Qur'an adalah ketepatan makhraj (tempat keluar huruf). Ada 5 rongga utama: Al-Jauf (Rongga mulut), Al-Halq (Tenggorokan), Al-Lisan (Lidah), Asy-Syafatain (Bibir), dan Al-Khaisyum (Hidung)." }
                        ]
                    },
                    {
                        title: "BAB 2: Hukum Nun Sukun & Tanwin",
                        body: [
                            { type: 'list', title: "Empat Hukum Utama", items: [
                                { title: "Izhar Halqi", points: ["Jelas. Huruf: ء هـ ع ح غ خ"] },
                                { title: "Idgham", points: ["Melebur. Bighunnah (dengan dengung): ي ن م و. Bilaghunnah (tanpa dengung): l r"] },
                                { title: "Iqlab", points: ["Mengganti bunyi N menjadi M. Huruf: ب"] },
                                { title: "Ikhfa Haqiqi", points: ["Samar. Huruf: sisa 15 huruf lainnya."] }
                            ]}
                        ]
                    },
                    {
                        title: "BAB 3: Hukum Mim Sukun",
                        body: [
                             { type: 'list', title: "Tiga Hukum Mim Mati", items: [
                                { title: "Ikhfa Syafawi", points: ["Mim bertemu Ba (ب). Dibaca samar di bibir dengan dengung."] },
                                { title: "Idgham Mimi", points: ["Mim bertemu Mim (م). Dibaca melebur dengan dengung."] },
                                { title: "Izhar Syafawi", points: ["Mim bertemu selain Mim dan Ba. Dibaca jelas di bibir tanpa dengung."] }
                            ]}
                        ]
                    }
                ]
            },
            { 
                id: "fiqh-level-1",
                category: "Fiqh Ibadah (Thaharah & Shalat)", 
                description: "Panduan bersuci dan shalat yang sah.",
                color: "bg-blue-600",
                content: [
                    {
                        title: "BAB 1: Thaharah (Bersuci)",
                        body: [
                            { type: 'paragraph', text: "Shalat tidak sah tanpa bersuci. Thaharah mencakup wudhu, mandi wajib, dan tayamum." },
                            { type: 'list', title: "Pembatal Wudhu", items: ["Keluar sesuatu dari qubul/dubur.", "Hilang akal (tidur/gila).", "Bersentuhan kulit lawan jenis (menurut Syafi'i).", "Menyentuh kemaluan dengan telapak tangan."] }
                        ]
                    },
                    {
                        title: "BAB 2: Rukun Shalat",
                        body: [
                             { type: 'paragraph', text: "Rukun adalah bagian dari shalat yang jika ditinggalkan maka shalat tidak sah." },
                             { type: 'list', title: "Rukun Shalat (Syafi'i)", items: ["Niat", "Takbiratul Ihram", "Berdiri (bagi yang mampu)", "Al-Fatihah", "Ruku'", "I'tidal", "Sujud 2x", "Duduk di antara dua sujud", "Duduk Tasyahud Akhir", "Membaca Tasyahud Akhir", "Shalawat Nabi", "Salam", "Tertib"] }
                        ]
                    }
                ]
            }
        ]
    },
    {
        level: 2,
        title: "Level 2: Pemantapan Aqidah & Ibadah",
        duration: "Bulan 13-24",
        subjects: [
            { 
                id: "tauhid-level-2",
                category: "Tauhid Lanjutan", 
                description: "Syarat La ilaha illallah & Pembatal Keislaman.",
                color: "bg-red-600",
                content: [
                    {
                        title: "BAB 1: Syarat La ilaha illallah",
                        body: [
                            { type: 'paragraph', text: "Kunci surga adalah kalimat tauhid, namun kunci hanya berfungsi jika geriginya lengkap. Gerigi itu adalah syarat-syaratnya." },
                            { type: 'list', title: "7 Syarat Kalimat Tauhid", items: ["Al-Ilmu (Mengetahui maknanya)", "Al-Yaqin (Yakin, tidak ragu)", "Al-Ikhlas (Murni)", "As-Shidqu (Jujur)", "Al-Mahabbah (Cinta)", "Al-Inqiyad (Tunduk/Patuh)", "Al-Qabul (Menerima konsekuensinya)"] }
                        ]
                    },
                    {
                        title: "BAB 2: Pembatal Keislaman (Nawaqidul Islam)",
                        body: [
                            { type: 'paragraph', text: "Mengetahui hal yang membatalkan Islam penting agar kita tidak terjerumus ke dalamnya." },
                            { type: 'list', items: ["Syirik besar dalam ibadah.", "Membuat perantara antara diri dan Allah.", "Tidak mengkafirkan orang musyrik.", "Meyakini ada petunjuk yang lebih sempurna dari Nabi.", "Membenci ajaran Rasulullah.", "Melakukan sihir.", "Membantu orang kafir memerangi Muslim.", "Meyakini bolehnya keluar dari syariat Nabi Muhammad.", "Berpaling dari agama Allah (tidak mau belajar)."] }
                        ]
                    }
                ] 
            },
            { 
                id: "fiqh-level-2", 
                category: "Fiqh Ibadah (Zakat & Puasa)", 
                description: "Memahami kewajiban harta dan shaum.", 
                color: "bg-blue-600", 
                content: [
                    {
                        title: "BAB 1: Fiqh Zakat",
                        body: [
                            { type: 'list', title: "Jenis Zakat", items: ["Zakat Fitrah: Wajib bagi setiap jiwa muslim di bulan Ramadhan.", "Zakat Mal: Wajib atas harta (Emas, Perak, Perdagangan, Pertanian, Ternak) jika sampai nisab dan haul."] }
                        ]
                    },
                    {
                        title: "BAB 2: Fiqh Puasa",
                        body: [
                            { type: 'list', title: "Rukun Puasa", items: ["Niat (dilakukan di malam hari untuk puasa wajib).", "Menahan diri dari pembatal puasa (makan, minum, jima') dari terbit fajar hingga terbenam matahari."] },
                            { type: 'list', title: "Yang Membatalkan Puasa", items: ["Makan/minum dengan sengaja.", "Muntah dengan sengaja.", "Jima' (hubungan suami istri) di siang hari.", "Haid dan Nifas.", "Gila/Murtad."] }
                        ]
                    }
                ] 
            },
            {
                id: "hadits-level-2",
                category: "Hadits Arbain (1-10)",
                description: "Menghafal dan memahami 10 hadits pokok.",
                color: "bg-orange-600",
                content: [
                    {
                        title: "Hadits 1: Innamal A'malu bin Niyat",
                        body: [{ type: 'paragraph', text: "Hadits ini adalah timbangan amal batin. Setiap amal tergantung niatnya." }]
                    },
                    {
                        title: "Hadits 2: Iman, Islam, Ihsan",
                        body: [{ type: 'paragraph', text: "Dikenal sebagai Hadits Jibril, yang merangkum seluruh struktur agama Islam." }]
                    }
                    // Content continues...
                ]
            }
        ]
    },
    {
        level: 3,
        title: "Level 3: Pendalaman & Sejarah",
        duration: "Bulan 25-36",
        subjects: [
            { 
                id: "fiqh-level-3", 
                category: "Fiqh Haji & Umrah", 
                description: "Tata cara manasik haji dan umrah.", 
                color: "bg-blue-600", 
                content: [
                    { title: "Rukun Umrah", body: [{ type: 'list', items: ["Ihram", "Tawaf", "Sa'i", "Tahallul", "Tertib"] }] },
                    { title: "Rukun Haji", body: [{ type: 'list', items: ["Ihram", "Wukuf di Arafah", "Tawaf Ifadhah", "Sa'i", "Tahallul", "Tertib"] }] }
                ] 
            },
            { 
                id: "tafsir-level-3", 
                category: "Tafsir Juz 30 (An-Naba - At-Thariq)", 
                description: "Tadabbur makna ayat-ayat pendek.", 
                color: "bg-emerald-600", 
                content: [
                    { title: "QS. An-Naba'", body: [{ type: 'paragraph', text: "Berita besar tentang hari kiamat dan kebangkitan." }] }
                ] 
            },
            { 
                id: "siroh-level-3", 
                category: "Sirah Nabawiyah (Makkah)", 
                description: "Kelahiran hingga Hijrah.", 
                color: "bg-amber-700", 
                content: [
                    { title: "Fase Makkah", body: [{ type: 'list', items: ["Kelahiran Nabi & Tahun Gajah", "Masa menyusui di Bani Sa'd", "Pernikahan dengan Khadijah", "Turunnya Wahyu Pertama", "Dakwah Sembunyi-sembunyi & Terang-terangan", "Tahun Kesedihan & Isra Mi'raj"] }] }
                ] 
            }
        ]
    },
    {
        level: 4,
        title: "Level 4: Muamalah & Akhlak Sosial",
        duration: "Bulan 37-48",
        subjects: [
            { 
                id: "fiqh-muamalah-1", 
                category: "Fiqh Muamalah Dasar", 
                description: "Jual beli, Riba, dan Akad.", 
                color: "bg-blue-600", 
                content: [
                    { title: "Riba", body: [{ type: 'paragraph', text: "Haramnya riba dan jenis-jenisnya (Riba Fadhl & Riba Nasi'ah)." }] },
                    { title: "Gharar", body: [{ type: 'paragraph', text: "Larangan transaksi yang mengandung ketidakjelasan." }] }
                ] 
            },
            { 
                id: "akhlak-sosial", 
                category: "Adab Bermasyarakat", 
                description: "Hak tetangga, tamu, dan ukhuwah.", 
                color: "bg-purple-600", 
                content: [
                    { title: "Hak Tetangga", body: [{ type: 'list', items: ["Tidak menyakiti tetangga", "Berbuat baik dan berbagi makanan", "Bersabar atas gangguan tetangga"] }] }
                ] 
            }
        ]
    },
    {
        level: 5,
        title: "Level 5: Keluarga & Waris",
        duration: "Bulan 49-60",
        subjects: [
            { 
                id: "munakahat", 
                category: "Fiqh Munakahat (Nikah)", 
                description: "Hukum pernikahan, talak, dan rujuk.", 
                color: "bg-pink-600", 
                content: [
                    { title: "Rukun Nikah", body: [{ type: 'list', items: ["Mempelai Pria", "Mempelai Wanita", "Wali", "Dua Saksi", "Ijab Qabul"] }] }
                ] 
            },
            { 
                id: "faraid", 
                category: "Ilmu Faraid (Waris)", 
                description: "Dasar-dasar pembagian harta warisan.", 
                color: "bg-slate-600", 
                content: [
                    { title: "Ahli Waris", body: [{ type: 'paragraph', text: "Mengenal Ashabul Furudh (yang punya bagian pasti) dan 'Ashabah (sisa)." }] }
                ] 
            }
        ]
    },
    {
        level: 6,
        title: "Level 6: Metodologi Hukum (Ushul)",
        duration: "Bulan 61-72",
        subjects: [
            { 
                id: "ushul-fiqh", 
                category: "Ushul Fiqh Dasar", 
                description: "Mengenal sumber hukum Islam.", 
                color: "bg-indigo-600", 
                content: [
                    { title: "Sumber Hukum", body: [{ type: 'list', items: ["Al-Qur'an", "As-Sunnah", "Ijma' (Konsensus)", "Qiyas (Analogi)"] }] }
                ] 
            },
            { 
                id: "mustalah-hadits", 
                category: "Mustalahul Hadits", 
                description: "Ilmu klasifikasi hadits (Sahih, Dhaif, dll).", 
                color: "bg-orange-600", 
                content: [
                    { title: "Klasifikasi Hadits", body: [{ type: 'list', items: ["Sahih: Syarat-syaratnya.", "Hasan: Di bawah sahih.", "Dhaif: Lemah dan tidak bisa jadi hujjah hukum."] }] }
                ] 
            }
        ]
    },
    {
        level: 7,
        title: "Level 7: Sejarah Peradaban",
        duration: "Bulan 73-84",
        subjects: [
            { 
                id: "khulafaur-rasyidin", 
                category: "Sejarah Khulafaur Rasyidin", 
                description: "Masa pemerintahan 4 Khalifah utama.", 
                color: "bg-amber-700", 
                content: [
                    { title: "Abu Bakar", body: [{ type: 'paragraph', text: "Perang Riddah dan Pengumpulan Al-Qur'an." }] },
                    { title: "Umar bin Khattab", body: [{ type: 'paragraph', text: "Ekspansi Islam (Futuhat) dan Administrasi Negara." }] }
                ] 
            },
             { 
                id: "dinasti-islam", 
                category: "Sejarah Dinasti Islam", 
                description: "Umayyah, Abbasiyah, Utsmaniyah.", 
                color: "bg-yellow-700", 
                content: [
                    { title: "Zaman Keemasan", body: [{ type: 'paragraph', text: "Perkembangan ilmu pengetahuan di Baghdad dan Andalusia." }] }
                ] 
            }
        ]
    },
    {
        level: 8,
        title: "Level 8: Kontemporer & Tazkiyah",
        duration: "Bulan 85-96",
        subjects: [
            { 
                id: "fiqh-kontemporer", 
                category: "Fiqh Kontemporer", 
                description: "Isu-isu modern (Bayi Tabung, Bank Syariah, dll).", 
                color: "bg-blue-800", 
                content: [
                    { title: "Medis Modern", body: [{ type: 'paragraph', text: "Hukum transplantasi organ, bayi tabung, dan kloning." }] }
                ] 
            },
            { 
                id: "tazkiyatun-nafs", 
                category: "Tazkiyatun Nafs (Penyucian Jiwa)", 
                description: "Menuju Ma'rifatullah dan Ihsan.", 
                color: "bg-teal-700", 
                content: [
                    { title: "Penyakit Hati", body: [{ type: 'list', items: ["Ujub (Bangga Diri)", "Kibr (Sombong)", "Riya'", "Hasad"] }] },
                    { title: "Obat Hati", body: [{ type: 'list', items: ["Dzikir", "Muhasabah", "Mujahadah"] }] }
                ] 
            }
        ]
    }
];
