

export interface AkhlakTopic {
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

export const akhlakData: AkhlakTopic[] = [
    {
        id: 'pengertian',
        title: 'Pengertian & Kedudukan Akhlak',
        icon: 'fas fa-lightbulb',
        subtitle: 'Memahami esensi, pentingnya, dan posisi akhlak dalam ajaran Islam.',
        content: [
            {
                type: 'paragraph',
                title: 'Definisi, Kedudukan, dan Urgensi Akhlak',
                text: 'Akhlak, secara etimologi berasal dari kata Arab "khuluq" yang berarti budi pekerti, perangai, tabiat, atau karakter. Secara terminologi, Imam Al-Ghazali mendefinisikannya sebagai "sifat yang tertanam dalam jiwa yang darinya muncul perbuatan-perbuatan dengan mudah dan gampang, tanpa memerlukan pemikiran dan pertimbangan." Ini berarti akhlak adalah cerminan spontan dari kondisi batin seseorang. Kedudukan akhlak dalam Islam sangatlah sentral dan fundamental. Ia bukan sekadar pelengkap, melainkan inti dan buah dari seluruh ajaran Islam. Rasulullah SAW bersabda dalam sebuah hadits yang masyhur, "Sesungguhnya aku diutus hanya untuk menyempurnakan kemuliaan akhlak." (HR. Al-Baihaqi). Hadits ini menegaskan bahwa puncak dari risalah kenabian adalah terbentuknya manusia yang berkarakter mulia. Akhlak adalah manifestasi lahiriah dari aqidah (iman) yang benar dan ibadah yang tulus. Iman tanpa akhlak adalah iman yang kering dan rapuh, sementara ibadah tanpa akhlak adalah ritual yang kosong tanpa ruh. Seseorang yang shalatnya benar, misalnya, seharusnya tercermin dalam perilakunya yang mampu mencegah dari perbuatan keji dan mungkar. Oleh karena itu, memperbaiki akhlak adalah sebuah proses penyucian jiwa (tazkiyatun nafs) yang berkelanjutan dan menjadi tujuan utama dari pendidikan (tarbiyah) Islam.'
            },
        ],
        dalil: {
            text: "Dan sesungguhnya engkau (Muhammad) benar-benar berbudi pekerti yang agung.",
            source: 'QS. Al-Qalam: 4'
        }
    },
    {
        id: 'pembagian',
        title: 'Akhlak Mahmudah & Mazmumah',
        icon: 'fas fa-balance-scale',
        subtitle: 'Membedakan antara akhlak terpuji yang harus dihiasi dan akhlak tercela yang harus dijauhi.',
        content: [
            {
                type: 'list',
                title: 'Pembagian Akhlak',
                items: [
                    {
                        title: "Akhlak Mahmudah (Terpuji)",
                        points: ["Yaitu segala sifat, sikap, dan perbuatan baik yang dicintai oleh Allah dan Rasul-Nya, serta selaras dengan fitrah manusia yang lurus. Ini adalah akhlak yang wajib diusahakan oleh setiap Muslim untuk menghiasi dirinya. Contohnya sangat banyak, di antaranya: Jujur (Shiddiq), Amanah (Dapat Dipercaya), Adil, Sabar, Syukur, Tawadhu (Rendah Hati), Pemaaf ('Afw), Kasih Sayang (Rahmah), Ikhlas, Qana'ah (Merasa Cukup), dan Husnuzhan (Berbaik Sangka)."]
                    },
                    {
                        title: "Akhlak Mazmumah (Tercela)",
                        points: ["Yaitu segala sifat, sikap, dan perbuatan buruk yang dibenci oleh Allah dan Rasul-Nya. Ini adalah penyakit-penyakit hati yang harus dideteksi, dijauhi, dan diobati. Contohnya: Dusta (Kadzib), Khianat, Sombong (Kibr), Iri Hati (Hasad), Dengki (Hiqd), Ghibah (Menggunjing), Namimah (Adu Domba), Riya (Pamer dalam Ibadah), Sum'ah (Ingin Didengar Orang Lain), Takabbur (Merasa Lebih Tinggi dari Orang Lain), dan Su'uzhan (Berburuk Sangka)."]
                    }
                ]
            }
        ],
        dalil: {
            text: "Dan janganlah kamu memalingkan mukamu dari manusia (karena sombong) dan janganlah kamu berjalan di muka bumi dengan angkuh. Sesungguhnya Allah tidak menyukai orang-orang yang sombong lagi membanggakan diri.",
            source: 'QS. Luqman: 18'
        }
    },
    {
        id: 'kepada-allah',
        title: 'Akhlak kepada Allah',
        icon: 'fas fa-praying-hands',
        subtitle: 'Membangun hubungan vertikal yang benar dengan Sang Pencipta.',
        content: [
             {
                type: 'list',
                title: 'Membangun Akhlak kepada Allah SWT (Sang Khaliq)',
                items: [
                    "Tauhid: Mengesakan Allah dalam segala bentuk peribadatan (uluhiyah), keyakinan (rububiyah), serta nama dan sifat-Nya (asma wa sifat). Ini adalah puncak dan fondasi dari seluruh akhlak kepada Allah.",
                    "Cinta (Mahabbah): Menjadikan cinta kepada Allah sebagai prioritas tertinggi, di atas cinta kepada diri sendiri, keluarga, harta, dan dunia.",
                    "Takut (Khauf): Memiliki rasa takut akan azab dan murka-Nya, yang berfungsi sebagai rem untuk mencegah diri dari perbuatan maksiat.",
                    "Berharap (Raja'): Selalu optimis dan berharap akan rahmat, ampunan, dan pahala dari-Nya, yang berfungsi sebagai motivator untuk terus berbuat baik.",
                    "Tawakkal: Berserah diri sepenuhnya kepada Allah setelah melakukan usaha (ikhtiar) yang maksimal.",
                    "Syukur: Mengakui dalam hati, mengucapkan dengan lisan, dan menggunakan nikmat-nikmat Allah untuk ketaatan.",
                    "Sabar: Teguh menahan diri dalam tiga kondisi: sabar dalam menjalankan perintah-Nya, sabar dalam menjauhi larangan-Nya, dan sabar dalam menghadapi takdir-Nya yang terasa pahit.",
                    "Taubat: Segera kembali kepada Allah dengan penyesalan, berhenti dari dosa, dan bertekad tidak mengulanginya lagi."
                ]
            }
        ],
        dalil: {
            text: "Dan (ingatlah) ketika Tuhanmu memaklumkan, 'Sesungguhnya jika kamu bersyukur, niscaya Aku akan menambah (nikmat) kepadamu, tetapi jika kamu mengingkari (nikmat-Ku), maka pasti azab-Ku sangat berat.'",
            source: 'QS. Ibrahim: 7'
        }
    },
    {
        id: 'kepada-manusia',
        title: 'Akhlak kepada Sesama Manusia',
        icon: 'fas fa-users',
        subtitle: 'Menjaga hubungan horizontal yang harmonis dalam masyarakat.',
        content: [
            {
                type: 'list',
                title: 'Menjaga Akhlak kepada Sesama Manusia',
                items: [
                    "Kepada Rasulullah SAW: Mencintainya, membenarkan ajarannya, mengikuti sunnahnya, memperbanyak shalawat, dan menghormati para pewarisnya (ulama).",
                    "Kepada Orang Tua: Berbakti (birrul walidain) adalah perintah terbesar setelah tauhid. Ini mencakup berkata-kata yang mulia, tidak membentak, merendahkan diri, mendoakan mereka, dan merawat mereka di usia senja.",
                    "Kepada Guru: Menghormati, memuliakan, dan mendoakannya, karena merekalah perantara sampainya ilmu.",
                    "Kepada Tetangga: Berbuat baik, tidak mengganggu dengan lisan maupun perbuatan, saling memberi hadiah, dan menolong saat mereka membutuhkan.",
                    "Kepada Masyarakat Umum: Menjaga lisan dari ghibah dan fitnah, menepati janji, menyebarkan salam, memiliki rasa empati (peduli), dan bekerja sama dalam kebaikan dan takwa."
                ]
            }
        ],
        dalil: {
            text: "Dan berbuat baiklah kepada dua orang ibu-bapak, karib-kerabat, anak-anak yatim, orang-orang miskin, tetangga yang dekat dan tetangga yang jauh...",
            source: 'QS. An-Nisa: 36'
        }
    },
    {
        id: 'kepada-lingkungan',
        title: 'Akhlak kepada Diri & Lingkungan',
        icon: 'fas fa-leaf',
        subtitle: 'Menjaga amanah atas diri sendiri dan alam semesta.',
        content: [
             {
                type: 'list',
                title: 'Menjaga Akhlak kepada Diri Sendiri',
                items: [
                    "Menjaga Kesucian Diri ('Iffah): Menjaga diri dari perbuatan yang merendahkan martabat, terutama yang berkaitan dengan syahwat.",
                    "Menjaga Waktu: Menyadari bahwa waktu adalah modal terbesar dan menggunakannya untuk hal-hal yang bermanfaat.",
                    "Menjaga Kesehatan: Memperlakukan tubuh sebagai amanah dari Allah dengan memberinya hak-haknya seperti makanan yang halal dan baik, istirahat yang cukup, dan olahraga.",
                    "Mengembangkan Diri: Terus-menerus menuntut ilmu dan meningkatkan keterampilan agar menjadi pribadi yang lebih baik."
                ]
            },
            {
                type: 'list',
                title: 'Menjaga Akhlak kepada Lingkungan (Makhluk Lain)',
                items: [
                    "Manusia adalah khalifah di muka bumi yang bertugas untuk memakmurkan, bukan merusak. Ini mencakup menjaga kebersihan lingkungan, tidak melakukan pencemaran, tidak mengeksploitasi sumber daya alam secara berlebihan, dan berlaku baik kepada binatang (misalnya dengan tidak menyiksanya dan memberinya makan). Rasulullah SAW bersabda bahwa ada seorang wanita yang masuk neraka karena mengurung seekor kucing, dan ada seorang pezina yang diampuni dosanya karena memberi minum seekor anjing yang kehausan. Ini menunjukkan betapa pentingnya akhlak kepada seluruh makhluk."
                ]
            }
        ],
        dalil: {
            text: "Dan janganlah kamu membuat kerusakan di muka bumi, sesudah (Allah) memperbaikinya dan berdoalah kepada-Nya dengan rasa takut (tidak akan diterima) dan harapan (akan dikabulkan). Sesungguhnya rahmat Allah amat dekat kepada orang-orang yang berbuat baik.",
            source: 'QS. Al-A\'raf: 56'
        }
    }
];