export interface PsikologiTopic {
    id: string;
    title: string;
    icon: string;
    subtitle: string;
    content: any[]; // Using any to match other data files
    dalil?: {
        text: string;
        source: string;
    };
}

export const psikologiData: PsikologiTopic[] = [
    {
        id: 'pengantar',
        title: 'Pengantar: Dua Lensa Memandang Jiwa',
        icon: 'fas fa-eye',
        subtitle: 'Memahami perbedaan fundamental antara Psikologi Barat modern dan Psikologi Islam.',
        content: [
            {
                type: 'paragraph',
                title: 'Dua Paradigma Memahami Manusia',
                text: 'Psikologi, sebagai ilmu yang mempelajari jiwa (psyche) dan perilaku manusia, telah berkembang pesat dalam satu abad terakhir, terutama di Barat. Psikologi Barat modern, yang berakar pada tradisi empirisme dan humanisme, menawarkan wawasan mendalam tentang proses kognitif, emosional, dan perilaku manusia. Di sisi lain, Islam, sebagai jalan hidup yang komprehensif (syumul), telah memiliki kerangka kerja yang kaya untuk memahami jiwa manusia selama lebih dari 1400 tahun, yang bersumber dari Al-Qur\'an dan Sunnah. Kajian ini bertujuan untuk membandingkan kedua pendekatan ini, bukan untuk meniadakan salah satunya, melainkan untuk memahami perbedaan fundamental dalam landasan filosofis, tujuan, dan metodologi mereka, serta melihat potensi integrasi di antara keduanya.'
            },
            {
                type: 'list',
                title: 'Perbedaan Landasan Filosofis',
                items: [
                    {
                        title: "Psikologi Barat Modern",
                        points: ["Antroposentris: Berpusat pada manusia. Manusia adalah ukuran dari segala sesuatu. Kebahagiaan dan pemenuhan diri (self-actualization) adalah tujuan tertinggi, seringkali dalam konteks duniawi.", "Empiris & Positivistik: Pengetahuan yang valid adalah yang dapat diobservasi, diukur, dan diuji secara empiris. Aspek-aspek spiritual atau metafisik seringkali dikesampingkan atau dianggap di luar jangkauan sains.", "Sekuler: Memisahkan secara tegas antara ilmu pengetahuan dan agama. Jiwa (psyche) dipahami sebagai fungsi dari otak dan proses biologis, tanpa dimensi ruhani yang transenden."]
                    },
                    {
                        title: "Psikologi Islam",
                        points: ["Teosentris: Berpusat pada Tuhan (Allah SWT). Manusia adalah ciptaan, hamba ('abd), dan khalifah yang memiliki tujuan hidup untuk beribadah dan mencari ridha Allah.", "Wahyu & Akal: Sumber pengetahuan utama adalah wahyu (Al-Qur'an dan Sunnah), yang kemudian didukung dan dijelajahi oleh akal, observasi, dan pengalaman. Aspek ghaib (ruh, qalb) adalah komponen sentral yang tidak dapat diabaikan.", "Holistik & Spiritual: Tidak memisahkan antara dimensi fisik, psikis, dan spiritual. Kesehatan mental sejati (afiyah) tidak dapat dicapai tanpa kesehatan spiritual."]
                    }
                ]
            }
        ],
        dalil: {
            text: "Dan pada dirimu sendiri. Maka apakah kamu tidak memperhatikan?",
            source: 'QS. Adz-Dzariyat: 21'
        }
    },
    {
        id: 'struktur-jiwa',
        title: 'Struktur Jiwa Manusia',
        icon: 'fas fa-puzzle-piece',
        subtitle: 'Perbandingan konsep "Self" dalam Psikologi Barat dengan Ruh, Nafs, Qalb, dan Aql dalam Islam.',
        content: [
            {
                type: 'paragraph',
                title: 'Membedah Entitas Manusia',
                text: 'Bagaimana kita mendefinisikan "diri" atau "jiwa" adalah titik perbedaan yang paling mendasar antara kedua pendekatan.'
            },
            {
                type: 'list',
                title: 'Konsep dalam Psikologi Barat',
                items: [
                    "Mind (Pikiran): Fokus utama, mencakup proses kognitif seperti berpikir, mengingat, dan memecahkan masalah. Sering dianggap sebagai produk dari aktivitas otak.",
                    "Self (Diri): Konsep diri yang dibangun melalui pengalaman, interaksi sosial, dan persepsi. Tokoh seperti Freud membaginya menjadi Id, Ego, dan Superego.",
                    "Consciousness (Kesadaran): Keadaan sadar dan waspada terhadap lingkungan dan diri sendiri.",
                    "Behavior (Perilaku): Tindakan yang dapat diamati dan diukur, sering dianggap sebagai respons terhadap stimulus eksternal (Behaviorisme) atau hasil dari proses internal (Kognitivisme)."
                ]
            },
            {
                type: 'list',
                title: 'Konsep dalam Psikologi Islam',
                text: 'Islam menyajikan struktur jiwa yang lebih kompleks dan berlapis, yang tidak dapat dipisahkan dari dimensi spiritualnya:',
                items: [
                    {
                        title: "Ar-Ruh (Ruh)",
                        points: ["Esensi ilahiah yang ditiupkan oleh Allah ke dalam jasad manusia. Ia adalah sumber kehidupan, kesadaran, dan koneksi transendental manusia dengan Tuhannya. Hakikat ruh adalah urusan Allah yang misterius."]
                    },
                    {
                        title: "An-Nafs (Nafsu/Jiwa)",
                        points: ["Pusat dari ego, keinginan, dan hawa nafsu. Nafs bukanlah sesuatu yang inherently jahat, melainkan sebuah potensi yang harus dikelola dan disucikan. Al-Qur'an menyebutkan tiga tingkatan Nafs:", "- Nafs al-Ammarah bis-Su' (Nafsu yang selalu menyuruh kepada kejahatan).", "- Nafs al-Lawwamah (Nafsu yang mencela diri sendiri ketika berbuat salah).", "- Nafs al-Muthmainnah (Jiwa yang tenang dan tenteram)."]
                    },
                    {
                        title: "Al-Qalb (Hati)",
                        points: ["Bukan sekadar organ fisik, melainkan pusat dari pemahaman spiritual, intuisi, dan keimanan. Rasulullah bersabda, '...di dalam jasad ada segumpal daging. Jika ia baik, maka baiklah seluruh jasad. Jika ia rusak, maka rusaklah seluruh jasad. Ketahuilah, ia adalah al-qalb (hati).' Hati bisa menjadi sehat dengan iman dan dzikir, atau sakit dengan syahwat dan syubhat."]
                    },
                    {
                        title: "Al-'Aql (Akal/Intelek)",
                        points: ["Alat untuk berpikir, memahami, dan membedakan antara yang benar dan yang salah. Dalam Islam, akal bukanlah sumber kebenaran tertinggi, melainkan alat untuk memahami kebenaran yang datang dari wahyu. Akal yang sehat akan selalu tunduk pada petunjuk wahyu."]
                    }
                ]
            }
        ],
        dalil: {
            text: "Maka apakah mereka tidak berjalan di muka bumi, lalu mereka mempunyai hati yang dengan itu mereka dapat memahami atau mempunyai telinga yang dengan itu mereka dapat mendengar? Karena sesungguhnya bukanlah mata itu yang buta, tetapi yang buta, ialah hati yang di dalam dada.",
            source: 'QS. Al-Hajj: 46'
        }
    },
    {
        id: 'kesehatan-mental',
        title: 'Konsep Kesehatan Mental',
        icon: 'fas fa-spa',
        subtitle: 'Perbedaan tujuan: Self-Actualization vs Tazkiyatun Nafs (Penyucian Jiwa).',
        content: [
            {
                type: 'paragraph',
                title: 'Tujuan Akhir dari Kesejahteraan Jiwa',
                text: 'Tujuan dari intervensi psikologis sangat ditentukan oleh definisi \'sehat mental\'. Di sini, kedua paradigma menunjukkan perbedaan tujuan akhir yang jelas.'
            },
            {
                type: 'list',
                items: [
                    {
                        title: "Psikologi Barat: Self-Actualization & Well-being",
                        points: [
                            "Tujuan utamanya adalah mencapai aktualisasi diri (menurut Maslow), yaitu merealisasikan potensi penuh individu untuk menjadi versi terbaik dari dirinya sendiri.",
                            "Fokus pada pengurangan gejala-gejala patologis (seperti depresi, kecemasan), peningkatan kebahagiaan subjektif (subjective well-being), dan kemampuan untuk berfungsi secara efektif dalam masyarakat (bekerja, menjalin hubungan).",
                            "Kesehatan mental seringkali diukur dari kemampuan adaptasi, resiliensi, dan kepuasan hidup dalam konteks duniawi."
                        ]
                    },
                    {
                        title: "Psikologi Islam: Tazkiyatun Nafs & Falah",
                        points: [
                            "Tujuan utamanya adalah Tazkiyatun Nafs (penyucian jiwa), yaitu membersihkan hati dari penyakit-penyakit spiritual (sombong, iri, riya') dan menghiasinya dengan sifat-sifat terpuji (ikhlas, sabar, syukur) untuk mencapai kedekatan dengan Allah.",
                            "Kesehatan mental sejati adalah Al-'Afiyah (kesejahteraan lahir dan batin) dan An-Nafs al-Muthmainnah (jiwa yang tenang), yang hanya dapat dicapai melalui iman dan dzikrullah (mengingat Allah).",
                            "Tujuan akhirnya bukanlah kebahagiaan duniawi semata, melainkan Falah, yaitu keberuntungan dan kesuksesan yang hakiki di dunia dan di akhirat. Ujian dan kesulitan hidup tidak dilihat sebagai halangan bagi kesehatan mental, melainkan sebagai sarana tarbiyah (pendidikan) dari Allah untuk meningkatkan derajat dan membersihkan dosa, jika dihadapi dengan sabar dan ridha."
                        ]
                    }
                ]
            }
        ],
        dalil: {
            text: "Sungguh beruntung orang yang menyucikannya (jiwa itu), dan sungguh rugi orang yang mengotorinya.",
            source: 'QS. Asy-Syams: 9-10'
        }
    },
    {
        id: 'pendekatan-terapi',
        title: 'Pendekatan Terapeutik',
        icon: 'fas fa-hand-holding-heart',
        subtitle: 'Membandingkan metode penyembuhan jiwa dalam kedua tradisi.',
        content: [
            {
                type: 'paragraph',
                title: 'Alat dan Metode untuk Penyembuhan',
                text: 'Perbedaan dalam diagnosis masalah kejiwaan tentu akan menghasilkan perbedaan dalam metode penyembuhannya.'
            },
            {
                type: 'list',
                items: [
                    {
                        title: "Psikologi Barat",
                        points: [
                            "Beragam aliran terapi: Psikoanalisis (menggali alam bawah sadar), Behaviorisme (mengubah perilaku melalui pengkondisian), Kognitif-Behavioral Therapy/CBT (mengubah pola pikir dan perilaku negatif), Terapi Humanistik (berfokus pada potensi individu).",
                            "Teknik umum: Dialog terapeutik ('talk therapy'), restrukturisasi kognitif, latihan relaksasi, desensitisasi, dan dalam psikiatri, penggunaan obat-obatan farmakologis."
                        ]
                    },
                    {
                        title: "Psikologi Islam",
                        points: [
                            "Berpusat pada Ibadah: Metode penyembuhan utama adalah ibadah-ibadah yang telah disyariatkan, yang memiliki dampak psikologis yang mendalam.",
                            "Shalat: Sebagai sarana komunikasi langsung dengan Allah, memberikan ketenangan dan mencegah perbuatan keji.",
                            "Dzikir & Doa: Mengingat dan memanggil Allah secara terus-menerus adalah 'obat' utama untuk hati yang gelisah. '...Ingatlah, hanya dengan mengingat Allah-lah hati menjadi tenteram.' (QS. Ar-Ra'd: 28).",
                            "Tilawah Al-Qur'an: Membaca dan merenungkan Al-Qur'an sebagai 'syifa' (penyembuh) bagi penyakit-penyakit yang ada di dalam dada.",
                            "Sabar & Syukur: Mengubah cara pandang terhadap musibah (sebagai ujian) dan nikmat (sebagai karunia) menjadi alat terapi yang sangat kuat.",
                            "Tawakkal & Ridha: Berserah diri dan menerima ketetapan Allah setelah berusaha, yang dapat menghilangkan kecemasan dan kekhawatiran berlebih.",
                            "Taubat: Proses mengakui kesalahan, menyesal, dan kembali kepada Allah yang memberikan efek katarsis (pembersihan) dan optimisme.",
                            "Puasa: Melatih pengendalian diri (nafs) dan meningkatkan empati."
                        ]
                    }
                ]
            },
            {
                type: 'paragraph',
                title: 'Potensi Integrasi',
                text: 'Psikologi Islam tidak menafikan manfaat dari beberapa teknik Psikologi Barat, terutama dalam mendiagnosis gangguan klinis dan menggunakan teknik seperti restrukturisasi kognitif. Namun, Psikologi Islam membingkai semua itu dalam kerangka tauhid. Integrasi yang ideal adalah menggunakan teknik-teknik yang tidak bertentangan dengan syariat sebagai alat bantu, sementara fondasi dan tujuan akhir dari terapi tetaplah untuk mengembalikan jiwa kepada fitrahnya yang hanif dan mendekatkannya kepada Allah SWT.'
            }
        ],
        dalil: {
            text: "...(Yaitu) orang-orang yang beriman dan hati mereka menjadi tenteram dengan mengingat Allah. Ingatlah, hanya dengan mengingat Allah-lah hati menjadi tenteram.",
            source: 'QS. Ar-Ra\'d: 28'
        }
    }
];
