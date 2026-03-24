
export interface EnsiklopediaTopic {
    id: string;
    title: string;
    icon: string;
    subtitle: string;
    content: {
        type: 'list' | 'paragraph' | 'sublist';
        title?: string;
        items?: (string | { title: string; points: string[] })[];
        text?: string;
    }[];
    dalil?: {
        text: string;
        source: string;
    };
}

export const ensiklopediaData: EnsiklopediaTopic[] = [
    {
        id: 'akhlak',
        title: 'Akhlak (Etika Islam)',
        icon: 'fas fa-heart',
        subtitle: 'Membentuk karakter mulia berdasarkan teladan Rasulullah SAW.',
        content: [
            {
                type: 'paragraph',
                title: 'Definisi, Kedudukan, dan Urgensi Akhlak',
                text: 'Akhlak, secara etimologi berasal dari kata Arab "khuluq" yang berarti budi pekerti, perangai, tabiat, atau karakter. Secara terminologi, Imam Al-Ghazali mendefinisikannya sebagai "sifat yang tertanam dalam jiwa yang darinya muncul perbuatan-perbuatan dengan mudah dan gampang, tanpa memerlukan pemikiran dan pertimbangan." Ini berarti akhlak adalah cerminan spontan dari kondisi batin seseorang. Kedudukan akhlak dalam Islam sangatlah sentral dan fundamental. Ia bukan sekadar pelengkap, melainkan inti dan buah dari seluruh ajaran Islam. Rasulullah SAW bersabda dalam sebuah hadits yang masyhur, "Sesungguhnya aku diutus hanya untuk menyempurnakan kemuliaan akhlak." (HR. Al-Baihaqi). Hadits ini menegaskan bahwa puncak dari risalah kenabian adalah terbentuknya manusia yang berkarakter mulia. Akhlak adalah manifestasi lahiriah dari aqidah (iman) yang benar dan ibadah yang tulus. Iman tanpa akhlak adalah iman yang kering dan rapuh, sementara ibadah tanpa akhlak adalah ritual yang kosong tanpa ruh. Seseorang yang shalatnya benar, misalnya, seharusnya tercermin dalam perilakunya yang mampu mencegah dari perbuatan keji dan mungkar. Oleh karena itu, memperbaiki akhlak adalah sebuah proses penyucian jiwa (tazkiyatun nafs) yang berkelanjutan dan menjadi tujuan utama dari pendidikan (tarbiyah) Islam.'
            },
            {
                type: 'list',
                title: 'Pembagian Akhlak',
                items: [
                    {
                        title: "Akhlak Mahmudah (Terpuji)",
                        points: ["Yaitu segala sifat, sikap, dan perbuatan baik yang dicintai oleh Allah dan Rasul-Nya, serta selaras dengan fitrah manusia yang lurus. Ini adalah akhlak yang wajib diusahakan oleh setiap Muslim untuk menghiasi dirinya. Contohnya sangat banyak, di antaranya: Jujur (Shiddiq), Amanah (Dapat Dipercaya), Adil, Sabar, Syukur, Tawadhu (Rendah Hati), Pemaaf (\'Afw), Kasih Sayang (Rahmah), Ikhlas, Qana\'ah (Merasa Cukup), dan Husnuzhan (Berbaik Sangka)."]
                    },
                    {
                        title: "Akhlak Mazmumah (Tercela)",
                        points: ["Yaitu segala sifat, sikap, dan perbuatan buruk yang dibenci oleh Allah dan Rasul-Nya. Ini adalah penyakit-penyakit hati yang harus dideteksi, dijauhi, dan diobati. Contohnya: Dusta (Kadzib), Khianat, Sombong (Kibr), Iri Hati (Hasad), Dengki (Hiqd), Ghibah (Menggunjing), Namimah (Adu Domba), Riya (Pamer dalam Ibadah), Sum\'ah (Ingin Didengar Orang Lain), Takabbur (Merasa Lebih Tinggi dari Orang Lain), dan Su\'uzhan (Berburuk Sangka)."]
                    }
                ]
            },
            {
                type: 'list',
                title: 'Ruang Lingkup Akhlak yang Komprehensif',
                text: 'Islam memandang akhlak sebagai sesuatu yang mencakup seluruh aspek kehidupan, tidak hanya terbatas pada hubungan antarmanusia. Ruang lingkupnya terbagi menjadi:',
                items: [
                    {
                        title: '1. Akhlak kepada Allah SWT (Sang Khaliq)',
                        points: [
                            "Tauhid: Mengesakan Allah dalam segala bentuk peribadatan (uluhiyah), keyakinan (rububiyah), serta nama dan sifat-Nya (asma wa sifat). Ini adalah puncak dan fondasi dari seluruh akhlak kepada Allah.",
                            "Cinta (Mahabbah): Menjadikan cinta kepada Allah sebagai prioritas tertinggi, di atas cinta kepada diri sendiri, keluarga, harta, dan dunia.",
                            "Takut (Khauf): Memiliki rasa takut akan azab dan murka-Nya, yang berfungsi sebagai rem untuk mencegah diri dari perbuatan maksiat.",
                            "Berharap (Raja'): Selalu optimis dan berharap akan rahmat, ampunan, dan pahala dari-Nya, yang berfungsi sebagai motivator untuk terus berbuat baik.",
                            "Tawakkal: Berserah diri sepenuhnya kepada Allah setelah melakukan usaha (ikhtiar) yang maksimal.",
                            "Syukur: Mengakui dalam hati, mengucapkan dengan lisan, dan menggunakan nikmat-nikmat Allah untuk ketaatan.",
                            "Sabar: Teguh menahan diri dalam tiga kondisi: sabar dalam menjalankan perintah-Nya, sabar dalam menjauhi larangan-Nya, dan sabar dalam menghadapi takdir-Nya yang terasa pahit.",
                            "Taubat: Segera kembali kepada Allah dengan penyesalan, berhenti dari dosa, dan bertekad tidak mengulanginya lagi."
                        ]
                    },
                    {
                        title: '2. Akhlak kepada Sesama Manusia',
                        points: [
                            "Kepada Rasulullah SAW: Mencintainya, membenarkan ajarannya, mengikuti sunnahnya, memperbanyak shalawat, dan menghormati para pewarisnya (ulama).",
                            "Kepada Orang Tua: Berbakti (birrul walidain) adalah perintah terbesar setelah tauhid. Ini mencakup berkata-kata yang mulia, tidak membentak, merendahkan diri, mendoakan mereka, dan merawat mereka di usia senja.",
                            "Kepada Guru: Menghormati, memuliakan, dan mendoakannya, karena merekalah perantara sampainya ilmu.",
                            "Kepada Tetangga: Berbuat baik, tidak mengganggu dengan lisan maupun perbuatan, saling memberi hadiah, dan menolong saat mereka membutuhkan.",
                            "Kepada Masyarakat Umum: Menjaga lisan dari ghibah dan fitnah, menepati janji, menyebarkan salam, memiliki rasa empati (peduli), dan bekerja sama dalam kebaikan dan takwa."
                        ]
                    },
                    {
                        title: '3. Akhlak kepada Diri Sendiri',
                        points: [
                            "Menjaga Kesucian Diri (\'Iffah): Menjaga diri dari perbuatan yang merendahkan martabat, terutama yang berkaitan dengan syahwat.",
                            "Menjaga Waktu: Menyadari bahwa waktu adalah modal terbesar dan menggunakannya untuk hal-hal yang bermanfaat.",
                            "Menjaga Kesehatan: Memperlakukan tubuh sebagai amanah dari Allah dengan memberinya hak-haknya seperti makanan yang halal dan baik, istirahat yang cukup, dan olahraga.",
                            "Mengembangkan Diri: Terus-menerus menuntut ilmu dan meningkatkan keterampilan agar menjadi pribadi yang lebih baik."
                        ]
                    },
                    {
                        title: '4. Akhlak kepada Lingkungan (Makhluk Lain)',
                        points: [
                            "Manusia adalah khalifah di muka bumi yang bertugas untuk memakmurkan, bukan merusak. Ini mencakup menjaga kebersihan lingkungan, tidak melakukan pencemaran, tidak mengeksploitasi sumber daya alam secara berlebihan, dan berlaku baik kepada binatang (misalnya dengan tidak menyiksanya dan memberinya makan). Rasulullah SAW bersabda bahwa ada seorang wanita yang masuk neraka karena mengurung seekor kucing, dan ada seorang pezina yang diampuni dosanya karena memberi minum seekor anjing yang kehausan. Ini menunjukkan betapa pentingnya akhlak kepada seluruh makhluk."
                        ]
                    }
                ]
            }
        ],
        dalil: {
            text: "Dan sesungguhnya engkau (Muhammad) benar-benar berbudi pekerti yang agung.",
            source: 'QS. Al-Qalam: 4'
        }
    },
    {
        id: 'ulumul-quran',
        title: 'Ulumul Qur\'an',
        icon: 'fas fa-book-quran',
        subtitle: 'Studi komprehensif tentang ilmu-ilmu yang berkaitan dengan Al-Qur\'an.',
        content: [
            {
                type: 'paragraph',
                title: 'Definisi dan Ruang Lingkup Ulumul Qur\'an',
                text: 'Ulumul Qur\'an secara harfiah berarti "ilmu-ilmu Al-Qur\'an". Ini adalah sebuah disiplin ilmu yang sangat luas dan komprehensif, mencakup berbagai cabang studi yang berkaitan dengan Al-Qur\'an sebagai kitab suci. Tujuannya adalah untuk memahami Al-Qur\'an secara mendalam dari berbagai sisinya, mulai dari sejarah turunnya, proses pengumpulan dan penulisannya, metode dan kaidah membacanya, seluk-beluk gaya bahasanya, cara menafsirkannya, hingga aspek-aspek kemukjizatannya yang tak tertandingi. Mempelajari Ulumul Qur\'an ibarat memiliki peta dan kompas yang lengkap sebelum memulai perjalanan mengarungi samudra Al-Qur\'an yang tak bertepi. Tanpa ilmu-ilmu ini, seseorang akan mudah tersesat dalam memahami firman Allah, salah dalam menafsirkan, dan keliru dalam mengambil kesimpulan hukum. Ruang lingkupnya sangat luas, mencakup puluhan cabang ilmu yang telah dirumuskan oleh para ulama sejak berabad-abad yang lalu.'
            },
            {
                type: 'paragraph',
                title: 'Sejarah Pengumpulan dan Kodifikasi Al-Qur\'an (Jam\'ul Qur\'an)',
                text: 'Proses pengumpulan Al-Qur\'an adalah salah satu bukti terbesar dari janji Allah untuk menjaga firman-Nya. Proses ini terjadi dalam tiga fase utama. Fase pertama adalah pada masa Nabi Muhammad SAW. Setiap kali wahyu turun, Nabi langsung menghafalkannya dan menyampaikannya kepada para sahabat. Beliau juga menunjuk para juru tulis wahyu (kuttabul wahy) untuk menuliskannya di media yang tersedia saat itu seperti pelepah kurma, tulang, batu tipis, dan kulit. Namun, tulisan-tulisan ini masih tersebar dan belum terkumpul dalam satu buku. Fase kedua terjadi pada masa kekhalifahan Abu Bakar Ash-Shiddiq. Setelah banyak sahabat penghafal Al-Qur\'an (huffaz) gugur dalam Perang Yamamah, Umar bin Khattab mengusulkan agar Al-Qur\'an dikumpulkan. Abu Bakar kemudian menugaskan Zaid bin Tsabit, juru tulis wahyu utama Nabi, untuk memimpin proyek ini. Dengan sangat teliti, Zaid mengumpulkan semua tulisan dan memverifikasinya dengan hafalan para sahabat. Hasilnya adalah satu mushaf induk yang disimpan oleh Abu Bakar. Fase ketiga, yang merupakan fase standardisasi, terjadi pada masa Khalifah Utsman bin Affan. Ketika Islam meluas dan muncul perbedaan dalam cara membaca (qira\'at), Utsman membentuk panitia yang kembali dipimpin oleh Zaid bin Tsabit untuk menyalin ulang mushaf induk tersebut ke dalam beberapa naskah standar dengan menggunakan dialek Quraisy. Salinan inilah yang dikenal sebagai Mushaf Utsmani dan menjadi rujukan umat Islam di seluruh dunia hingga hari ini.'
            },
            {
                type: 'list',
                title: 'Cabang-cabang Utama Ulumul Qur\'an',
                items: [
                    {
                        title: 'Ilmu Asbabun Nuzul (Sebab-sebab Turunnya Ayat)',
                        points: ["Mempelajari konteks, peristiwa, atau pertanyaan yang melatarbelakangi turunnya suatu ayat atau surah. Pengetahuan ini krusial untuk menafsirkan ayat dengan benar dan menghindari pemahaman yang terpotong dari konteksnya. Contoh: Ayat tentang tuduhan zina (qadzaf) turun berkaitan dengan fitnah yang menimpa Ummul Mukminin Aisyah RA (haditsul ifk)."]
                    },
                    {
                        title: 'Ilmu Makkiyah dan Madaniyah',
                        points: ["Mengkaji perbedaan karakteristik antara ayat/surah yang turun sebelum hijrah (Makkiyah) dan setelah hijrah (Madaniyah). Surah Makkiyah umumnya pendek-pendek, bahasanya kuat, dan berfokus pada pilar-pilar aqidah (tauhid, kenabian, hari akhir). Surah Madaniyah umumnya lebih panjang, dan lebih banyak berisi tentang hukum-hukum syariat (ibadah dan muamalah) serta tatanan masyarakat."]
                    },
                    {
                        title: 'Ilmu Nasikh dan Mansukh (Yang Menghapus dan Dihapus)',
                        points: ["Mempelajari ayat-ayat yang hukumnya telah menghapus (nasikh) hukum dari ayat yang turun sebelumnya (mansukh). Ini menunjukkan adanya pentahapan (tadrij) dalam penetapan hukum Islam. Contoh: Perintah awal untuk tidak lari dari musuh dengan perbandingan 1:10 (QS. Al-Anfal: 65) di-nasakh (dihapus/diringankan) menjadi 1:2 (QS. Al-Anfal: 66)."]
                    },
                    {
                        title: 'Ilmu Tajwid dan Qira\'at',
                        points: ["Tajwid adalah ilmu tentang tata cara melafalkan huruf-huruf Al-Qur\'an dari makhraj-nya dengan memberikan semua sifatnya. Qira\'at adalah ilmu tentang berbagai macam variasi bacaan Al-Qur\'an yang otentik dan bersambung sanadnya hingga Rasulullah SAW. Terdapat tujuh atau sepuluh qira\'at yang mutawatir."]
                    },
                    {
                        title: 'Ilmu Tafsir dan Ta\'wil',
                        points: ["Tafsir adalah ilmu untuk menjelaskan makna dan kandungan ayat-ayat Al-Qur\'an. Metode utamanya adalah Tafsir bil-Ma\'tsur (menafsirkan ayat dengan ayat lain, hadits, atau perkataan sahabat) dan Tafsir bir-Ra\'yi (menafsirkan dengan ijtihad yang berlandaskan kaidah bahasa Arab dan ilmu-ilmu syar\'i). Ta\'wil adalah penafsiran yang lebih mendalam untuk mengungkap makna batin yang tidak bertentangan dengan makna lahiriah."]
                    },
                    {
                        title: 'Ilmu I\'jazul Qur\'an (Kemukjizatan Al-Qur\'an)',
                        points: ["Mempelajari aspek-aspek kemukjizatan Al-Qur\'an yang membuktikan bahwa ia adalah firman Allah. I\'jaz ini mencakup berbagai sisi: I\'jaz Balaghi (keindahan dan ketinggian sastranya yang tak tertandingi), I\'jaz Tasyri\'i (kesempurnaan dan keadilan syariatnya), I\'jaz \'Ilmi (isyarat-isyarat ilmiah yang baru terbukti oleh sains modern), dan I\'jaz Ghaibi (berita-berita tentang masa lalu dan masa depan yang akurat)."]
                    },
                     {
                        title: 'Ilmu Gharib al-Qur\'an',
                        points: ["Membahas makna dari kata-kata dalam Al-Qur\'an yang jarang digunakan atau sulit dipahami oleh masyarakat umum Arab pada masa setelah Nabi. Ilmu ini penting untuk menghindari salah pengertian terhadap kosakata Al-Qur\'an."]
                    },
                    {
                        title: 'Ilmu Munasabah al-Ayat wa as-Suwar',
                        points: ["Mempelajari hubungan dan keserasian antara satu ayat dengan ayat berikutnya, atau antara satu surah dengan surah sebelum dan sesudahnya. Ilmu ini menyingkap keindahan tatanan Al-Qur\'an yang sangat sistematis dan menunjukkan bahwa susunannya bersifat tauqifi (berdasarkan petunjuk dari Allah)."]
                    }
                ]
            }
        ],
        dalil: {
            text: "Ini adalah sebuah Kitab yang Kami turunkan kepadamu penuh dengan berkah supaya mereka memperhatikan ayat-ayatnya dan supaya mendapat pelajaran orang-orang yang mempunyai pikiran.",
            source: 'QS. Shad: 29'
        }
    },
    {
        id: 'ulumul-hadits',
        title: 'Ulumul Hadits',
        icon: 'fas fa-book',
        subtitle: 'Metodologi kritik dan klasifikasi hadits sebagai sumber hukum kedua.',
        content: [
            {
                type: 'paragraph',
                title: 'Definisi dan Urgensi Ulumul Hadits',
                text: 'Ulumul Hadits (Ilmu-ilmu Hadits), juga dikenal sebagai Musthalah al-Hadits, adalah sebuah disiplin ilmu yang sangat fundamental dalam studi Islam. Ia berfungsi sebagai seperangkat alat dan kaidah untuk mengkaji dan menganalisis sebuah hadits (riwayat dari Nabi Muhammad SAW) dari dua sisi utamanya: sanad (rantai perawi) dan matan (isi berita). Tujuan utama ilmu ini adalah untuk membedakan antara hadits yang dapat diterima (maqbul) sebagai hujjah (argumen) syar\'i dan hadits yang harus ditolak (mardud). Ilmu ini dikembangkan oleh para ulama muhadditsin dengan tingkat ketelitian dan objektivitas yang luar biasa untuk menjaga kemurnian As-Sunnah, sumber hukum Islam kedua setelah Al-Qur\'an, dari segala bentuk pemalsuan, kesalahan, dan kebohongan. Tanpa Ulumul Hadits, umat Islam tidak akan mampu memverifikasi keaslian ajaran agamanya yang bersumber dari Nabinya, menjadikannya salah satu pencapaian intelektual terbesar dalam peradaban Islam.'
            },
            {
                type: 'list',
                title: 'Dua Komponen Utama Hadits: Sanad dan Matan',
                items: [
                    "Sanad: Secara bahasa berarti 'sandaran'. Secara istilah, sanad adalah silsilah atau rantai para perawi (periwayat) yang menyampaikan hadits, mulai dari orang yang mencatatnya dalam sebuah kitab (misalnya Imam Bukhari) hingga sampai kepada sumber aslinya, yaitu Rasulullah SAW. Contoh: 'Imam Bukhari berkata, telah menceritakan kepada kami Abdullah bin Yusuf, ia berkata, telah mengabarkan kepada kami Malik, dari Nafi\', dari Abdullah bin Umar, bahwa Rasulullah SAW bersabda...' Rangkaian nama-nama inilah yang disebut sanad. Kesehatan sebuah sanad adalah syarat utama keshahihan sebuah hadits.",
                    "Matan: Secara bahasa berarti 'punggung jalan' atau 'tanah yang keras dan tinggi'. Secara istilah, matan adalah isi, redaksi, atau teks dari hadits itu sendiri, yaitu perkataan, perbuatan, atau ketetapan Nabi yang diriwayatkan setelah rangkaian sanad disebutkan."
                ]
            },
            {
                type: 'paragraph',
                title: 'Ilmu Kritik Hadits: Jarh wa Ta\'dil',
                text: 'Tulang punggung dari Ulumul Hadits adalah Ilmu Rijal yang di dalamnya terdapat Al-Jarh wa at-Ta\'dil (Kritik dan Pujian). Ini adalah ilmu yang secara khusus meneliti biografi dan kredibilitas setiap perawi hadits yang jumlahnya mencapai ratusan ribu. Para ulama muhadditsin menyusun kamus-kamus biografi yang sangat tebal untuk mencatat data setiap perawi, termasuk nama lengkap, tahun lahir dan wafat, guru-guru, murid-murid, dan yang terpenting, penilaian dari para kritikus hadits terhadapnya. Penilaian ini didasarkan pada dua kriteria utama: (1) Al-\'Adalah (Keadilan/Integritas Moral), yaitu seorang perawi harus Muslim, baligh, berakal sehat, tidak pernah melakukan dosa besar, dan tidak terus-menerus melakukan dosa kecil. (2) Adh-Dhabt (Kekuatan Hafalan/Akurasi), yaitu seorang perawi harus memiliki ingatan yang kuat dan akurat, baik hafalan di dalam dada (dhabt shadr) maupun dalam catatan tulisannya (dhabt kitab). Perawi yang memenuhi kedua syarat ini disebut Tsiqah (terpercaya). Sebaliknya, perawi yang dinilai cacat dalam salah satu atau kedua aspek ini akan di-jarh (dikritik) dengan berbagai tingkatan, dari yang ringan (misal: \'hafalannya lemah\') hingga yang paling berat (misal: \'ia seorang pendusta/kadzdzab\').'
            },
            {
                type: 'list',
                title: 'Klasifikasi Hadits Berdasarkan Kualitas',
                text: 'Berdasarkan hasil analisis sanad dan matan, hadits diklasifikasikan ke dalam beberapa tingkatan kualitas:',
                items: [
                    {
                        title: "Sahih (Otentik)",
                        points: ["Ini adalah tingkatan hadits tertinggi yang dapat diterima sebagai hujjah. Sebuah hadits dinilai sahih jika memenuhi lima syarat ketat: (1) Sanad-nya bersambung (muttasil) dari awal hingga akhir. (2) Seluruh perawinya bersifat 'adil. (3) Seluruh perawinya bersifat dhabit (sempurna hafalannya). (4) Matan-nya tidak syadz (janggal atau bertentangan dengan riwayat lain yang lebih kuat). (5) Matan-nya tidak memiliki 'illat (cacat tersembunyi yang hanya diketahui oleh ahli hadits)."]
                    },
                    {
                        title: "Hasan (Baik)",
                        points: ["Memenuhi semua syarat hadits sahih, kecuali pada syarat ketiga (kedhabitan perawi) yang sedikit kurang sempurna. Artinya, ada salah satu perawinya yang hafalannya bagus namun tidak mencapai tingkat perawi hadits sahih. Hadits Hasan tetap dapat diterima sebagai hujjah."]
                    },
                    {
                        title: "Dha\'if (Lemah)",
                        points: ["Hadits yang tidak memenuhi salah satu atau lebih syarat hadits sahih atau hasan. Penyebab kelemahannya sangat beragam, bisa karena sanadnya terputus (seperti hadits Mursal atau Munqathi'), atau karena ada perawi yang dinilai lemah hafalannya, atau bahkan perawi yang tidak dikenal (majhul). Hadits dha'if tidak boleh digunakan sebagai landasan hukum (akidah dan fiqh), meskipun sebagian ulama membolehkannya untuk fadhailul a'mal (mendorong amal kebaikan) dengan syarat-syarat yang ketat."]
                    },
                    {
                        title: "Maudhu\' (Palsu)",
                        points: ["Ini bukanlah hadits, melainkan perkataan yang dibuat-buat dan secara dusta disandarkan kepada Nabi Muhammad SAW. Meriwayatkannya tanpa menjelaskan kepalsuannya adalah haram dan termasuk dosa besar. Para ulama telah menyusun kitab-kitab khusus yang mengumpulkan hadits-hadits palsu untuk memperingatkan umat."]
                    }
                ]
            },
            {
                type: 'list',
                title: 'Klasifikasi Hadits Berdasarkan Kuantitas Perawi',
                items: [
                    "Mutawatir: Diriwayatkan oleh sejumlah besar perawi di setiap tingkatan sanad (sahabat, tabi'in, dst.), yang secara akal mustahil mereka semua bersepakat untuk berdusta. Hadits mutawatir memberikan faedah ilmu yang yakin (pasti) dan wajib diimani.",
                    "Ahad: Hadits yang tidak mencapai derajat mutawatir. Mayoritas hadits termasuk dalam kategori ini. Hadits Ahad terbagi lagi menjadi Masyhur (diriwayatkan oleh tiga perawi atau lebih di setiap tingkatan), 'Aziz (diriwayatkan oleh dua perawi), dan Gharib (hanya diriwayatkan oleh satu perawi)."
                ]
            }
        ],
         dalil: {
            text: "...Apa yang diberikan Rasul kepadamu, maka terimalah. Dan apa yang dilarangnya bagimu, maka tinggalkanlah...",
            source: 'QS. Al-Hasyr: 7'
        }
    },
    {
        id: 'fiqh-munakahat',
        title: 'Fiqh Munakahat (Hukum Pernikahan)',
        icon: 'fas fa-ring',
        subtitle: 'Panduan lengkap hukum pernikahan dalam Islam, dari khitbah hingga talak.',
        content: [
            {
                type: 'paragraph',
                title: 'Definisi, Tujuan, dan Hukum Pernikahan',
                text: 'Fiqh Munakahat adalah cabang ilmu fiqh yang membahas secara terperinci segala sesuatu yang berkaitan dengan pernikahan (nikah) dan kehidupan rumah tangga. Pernikahan dalam Islam bukanlah sekadar ikatan sipil atau pemenuhan kebutuhan biologis, melainkan sebuah ibadah yang agung dan mitsaqan ghalizha (perjanjian yang sangat kuat). Tujuannya adalah untuk: (1) Memenuhi perintah Allah dan Rasul-Nya. (2) Membentengi diri dari perbuatan zina. (3) Melestarikan keturunan manusia secara terhormat. (4) Membangun sakinah (ketenangan), mawaddah (cinta), dan rahmah (kasih sayang). (5) Membentuk fondasi masyarakat Islam yang sehat. Hukum asal menikah adalah sunnah mu\'akkadah (sangat dianjurkan). Namun, hukumnya bisa menjadi wajib bagi orang yang mampu dan khawatir terjerumus ke dalam zina jika tidak menikah. Bisa juga menjadi haram jika seseorang tahu bahwa ia tidak akan mampu memenuhi hak dan kewajiban dalam pernikahan dan justru akan menzalimi pasangannya.'
            },
            {
                type: 'list',
                title: 'Tahapan Pra-Nikah: Khitbah (Peminangan)',
                items: [
                    { title: 'Definisi', points: ["Khitbah adalah permintaan atau lamaran dari seorang laki-laki kepada seorang perempuan untuk menikahinya. Ini adalah gerbang awal menuju pernikahan."] },
                    { title: 'Hukum dan Etika', points: [
                        "Dilarang mengkhitbah wanita yang sudah dikhitbah oleh laki-laki lain dan lamarannya telah diterima, kecuali jika lamaran pertama telah dibatalkan.",
                        "Calon suami diperbolehkan untuk melihat (nazhar) calon istrinya pada bagian-bagian yang biasa terlihat (wajah dan telapak tangan) untuk memantapkan hati, dengan didampingi mahram.",
                        "Selama masa khitbah, keduanya tetap berstatus sebagai orang asing (ajnabi), sehingga larangan-larangan pergaulan seperti berkhalwat (berduaan) dan bersentuhan tetap berlaku."
                    ]}
                ]
            },
            {
                type: 'list',
                title: 'Rukun dan Syarat Sah Nikah',
                text: 'Sebuah pernikahan dianggap sah jika memenuhi lima rukun berikut:',
                items: [
                    "Adanya Calon Mempelai Laki-laki (Zauj): Syaratnya: Muslim, bukan mahram bagi calon istri, dan tidak sedang dalam ihram haji/umrah.",
                    "Adanya Calon Mempelai Perempuan (Zaujah): Syaratnya: Muslimah (atau Ahli Kitab menurut sebagian pendapat), bukan mahram bagi calon suami, tidak sedang dalam masa \'iddah, dan tidak sedang dalam ihram.",
                    "Adanya Wali: Wali adalah pihak laki-laki dari keluarga perempuan yang berhak menikahkannya. Menurut mayoritas ulama (jumhur), pernikahan tanpa wali adalah tidak sah. Urutan wali adalah: Ayah, Kakek dari pihak ayah, Saudara laki-laki kandung, dst.",
                    "Adanya Dua Orang Saksi: Syaratnya: Dua orang laki-laki Muslim, adil, baligh, berakal, dan dapat mendengar serta melihat.",
                    "Adanya Shighat (Ijab dan Qabul): Ijab adalah ucapan penyerahan dari pihak wali (misal: 'Saya nikahkan engkau...'). Qabul adalah ucapan penerimaan dari pihak mempelai laki-laki (misal: 'Saya terima nikahnya...'). Keduanya harus diucapkan dalam satu majelis, jelas, dan bersambung."
                ]
            },
            {
                type: 'list',
                title: 'Mahar (Mas Kawin)',
                items: [
                    { title: 'Definisi dan Hukum', points: ["Mahar adalah pemberian wajib dari calon suami kepada calon istri sebagai simbol kesungguhan dan penghormatan. Hukumnya adalah wajib.", "Tidak ada batasan minimal atau maksimal untuk mahar, namun yang terbaik adalah yang paling mudah dan tidak memberatkan, sesuai dengan kemampuan suami."] }
                ]
            },
            {
                type: 'list',
                title: 'Hak dan Kewajiban dalam Rumah Tangga',
                items: [
                    { title: 'Kewajiban Suami', points: ["Memberi nafkah (sandang, pangan, papan) sesuai kemampuannya.", "Menggauli istri dengan cara yang ma'ruf (baik).", "Memberikan bimbingan dan pendidikan agama.", "Menjaga kehormatan dan rahasia istri."] },
                    { title: 'Kewajiban Istri', points: ["Taat kepada suami dalam hal-hal yang tidak bertentangan dengan syariat.", "Menjaga kehormatan diri dan harta suami.", "Mengatur rumah tangga dan mendidik anak-anak.", "Tidak mengizinkan orang lain masuk ke rumah tanpa izin suami."] },
                    { title: 'Hak Bersama', points: ["Saling menikmati hubungan biologis secara halal.", "Saling mewarisi jika salah satunya meninggal dunia.", "Menetapkan nasab anak yang lahir dari pernikahan tersebut."] }
                ]
            },
            {
                type: 'list',
                title: 'Pemutusan Ikatan Pernikahan',
                items: [
                    { title: 'Thalaq (Talak/Cerai)', points: ["Talak adalah hak suami untuk memutuskan ikatan pernikahan. Ada Talak Raj'i (bisa rujuk kembali selama masa 'iddah tanpa akad baru) dan Talak Ba'in (tidak bisa rujuk kecuali dengan akad nikah baru)."] },
                    { title: 'Khulu\' (Gugat Cerai)', points: ["Adalah permintaan cerai dari pihak istri dengan memberikan tebusan ('iwadh) kepada suami."] },
                    { title: 'Fasakh', points: ["Pembatalan pernikahan oleh hakim karena adanya sebab-sebab tertentu, seperti suami tidak mampu memberi nafkah, adanya cacat pada salah satu pihak, atau suami menghilang tanpa kabar."] },
                    { title: 'Kematian', points: ["Pernikahan otomatis berakhir jika salah satu pasangan meninggal dunia."] }
                ]
            }
        ]
    },
    {
        id: 'fiqh-muamalah',
        title: 'Fiqh Muamalah',
        icon: 'fas fa-handshake',
        subtitle: 'Prinsip dan aturan interaksi ekonomi dan sosial dalam syariat.',
        content: [
            {
                type: 'paragraph',
                title: 'Prinsip Dasar dan Kaidah Fiqh Muamalah',
                text: 'Fiqh Muamalah mengatur hubungan antar manusia dalam urusan duniawi, terutama ekonomi. Berbeda dengan ibadah yang prinsipnya adalah "semua dilarang kecuali yang diperintahkan", prinsip dasar muamalah adalah "semua diperbolehkan (mubah) kecuali ada dalil yang melarangnya". Ini memberikan fleksibilitas luas bagi umat Islam untuk berinovasi dalam transaksi selama tidak melanggar larangan-larangan syariat.'
            },
            {
                type: 'list',
                title: 'Tiga Larangan Utama dalam Muamalah',
                items: [
                    { title: '1. Riba', points: ["Setiap tambahan pada pokok pinjaman (riba al-qardh) atau penukaran barang sejenis dengan takaran berbeda (riba al-fadhl) yang disyaratkan di awal. Riba adalah dosa besar karena bersifat eksploitatif."] },
                    { title: '2. Gharar (Ketidakjelasan)', points: ["Transaksi yang mengandung ketidakpastian atau spekulasi yang berlebihan pada salah satu unsurnya (objek, harga, waktu penyerahan). Contoh: menjual ikan yang masih di dalam laut."] },
                    { title: '3. Maysir (Perjudian)', points: ["Setiap transaksi yang bersifat untung-untungan, di mana satu pihak untung di atas kerugian pihak lain tanpa adanya pertukaran atau usaha yang sepadan."] },
                ]
            },
            {
                type: 'list',
                title: 'Bentuk-bentuk Akad (Kontrak) Dasar',
                items: [
                    {
                        title: 'Jual Beli (Al-Bai\')',
                        points: [
                            "Definisi: Pertukaran harta dengan harta berdasarkan keridhaan kedua belah pihak.",
                            "Rukun: Penjual & Pembeli (Aqidain), Barang & Harga (Ma\'qud Alaih), dan Ijab Qabul (serah terima).",
                            "Syarat Barang: Suci, bermanfaat, milik penjual, bisa diserahterimakan, dan jelas spesifikasinya."
                        ]
                    },
                    {
                        title: 'Utang Piutang (Al-Qardh)',
                        points: [
                            "Definisi: Pinjaman yang diberikan dengan tujuan menolong, di mana peminjam wajib mengembalikan sejumlah yang sama tanpa tambahan.",
                            "Prinsip: Bersifat sosial (tabarru'), bukan komersial. Meminta tambahan adalah riba."
                        ]
                    },
                    {
                        title: 'Sewa Menyewa (Ijarah)',
                        points: [
                            "Definisi: Akad pemindahan hak guna (manfaat) atas suatu barang atau jasa dalam waktu tertentu dengan pembayaran upah sewa, tanpa diikuti pemindahan kepemilikan.",
                            "Contoh: Sewa rumah, sewa kendaraan, upah pekerja."
                        ]
                    },
                     {
                        title: 'Investasi & Kerjasama Syariah',
                        points: [
                            "Mudharabah (Bagi Hasil): Kerjasama antara pemilik modal (shahibul mal) dan pengelola usaha (mudharib). Keuntungan dibagi sesuai nisbah yang disepakati, kerugian finansial ditanggung pemilik modal.",
                            "Musyarakah (Kemitraan): Kerjasama di mana dua pihak atau lebih menyertakan modal untuk sebuah usaha. Keuntungan dan kerugian dibagi sesuai porsi modal atau kesepakatan."
                        ]
                    },
                    {
                        title: 'Akad Titipan dan Jaminan',
                        points: [
                            "Wadi'ah (Titipan): Akad penitipan barang dari satu pihak ke pihak lain untuk dijaga keamanannya.",
                            "Rahn (Gadai): Menjadikan suatu barang yang memiliki nilai ekonomis sebagai jaminan atas utang.",
                            "Kafalah (Penjaminan): Jaminan yang diberikan oleh satu pihak kepada pihak ketiga untuk memenuhi kewajiban pihak kedua."
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'madzhab',
        title: 'Mazhab Fiqih (Aliran Hukum Islam)',
        icon: 'fas fa-code-branch',
        subtitle: 'Mengenal empat mazhab utama dalam fiqh Ahlus Sunnah wal Jama\'ah dan persebarannya.',
        content: [
            {
                type: 'paragraph',
                title: 'Apa itu Mazhab?',
                text: 'Mazhab secara harfiah berarti "jalan yang dilalui". Dalam istilah fiqh, mazhab adalah sebuah metodologi (manhaj) yang dirumuskan oleh seorang Imam Mujtahid untuk menggali (istinbath) hukum-hukum syariat dari dalil-dalilnya yang terperinci (Al-Qur\'an dan Sunnah). Mazhab bukanlah agama baru, melainkan "sekolah pemikiran" dalam memahami hukum Islam. Adanya perbedaan pendapat (ikhtilaf) di antara mazhab adalah sebuah rahmat dan menunjukkan kekayaan intelektual dalam Islam, selama semuanya bersumber dari dalil yang mu\'tabar (diakui). Bagi Ahlus Sunnah wal Jama\'ah, terdapat empat mazhab utama yang diakui dan diikuti oleh mayoritas umat Islam di seluruh dunia.'
            },
            {
                type: 'list',
                title: 'Empat Mazhab Utama',
                items: [
                    {
                        title: "1. Mazhab Hanafi",
                        points: [
                            "Pendiri: Imam Abu Hanifah (Nu'man bin Tsabit) di Kufah, Irak.",
                            "Karakteristik: Mazhab tertua dan paling terkenal dengan penggunaan penalaran rasional (ra'yu), qiyas (analogi), dan istihsan (memilih yang terbaik untuk kemaslahatan) secara luas. Mazhab ini sangat detail dalam kasus-kasus hipotetis (fiqh taqdiri).",
                            "Persebaran Utama: Turki, wilayah Balkan (Bosnia, Albania), Asia Tengah (Uzbekistan, Kazakhstan), Kaukasus, Afghanistan, Pakistan, India, dan Bangladesh."
                        ]
                    },
                    {
                        title: "2. Mazhab Maliki",
                        points: [
                            "Pendiri: Imam Malik bin Anas di Madinah.",
                            "Karakteristik: Sangat menekankan pada hadits dan, yang paling unik, 'Amal Ahlul Madinah (praktik penduduk Madinah) sebagai sumber hukum yang kuat karena dianggap sebagai cerminan Sunnah yang hidup dan diwariskan secara massal.",
                            "Persebaran Utama: Afrika Utara (Maroko, Aljazair, Tunisia, Libya), Afrika Barat (Nigeria, Senegal, Mali, Mauritania), Sudan, dan beberapa wilayah di Teluk Persia seperti Bahrain dan Kuwait."
                        ]
                    },
                    {
                        title: "3. Mazhab Syafi'i",
                        points: [
                            "Pendiri: Imam Asy-Syafi'i (Muhammad bin Idris asy-Syafi'i).",
                            "Karakteristik: Dianggap sebagai sintesis antara mazhab Hanafi (Ahlur Ra'yi) dan Maliki (Ahlul Hadits). Imam Syafi'i adalah arsitek dari ilmu Ushul Fiqh yang merumuskan hierarki sumber hukum secara sistematis (Qur'an, Sunnah, Ijma', Qiyas).",
                            "Persebaran Utama: Indonesia, Malaysia, Brunei, Mesir, Yaman, Suriah, Palestina, Yordania, Somalia, dan komunitas Kurdi."
                        ]
                    },
                    {
                        title: "4. Mazhab Hanbali",
                        points: [
                            "Pendiri: Imam Ahmad bin Hanbal di Baghdad, Irak.",
                            "Karakteristik: Mazhab yang paling konservatif dan tekstualis, sangat ketat berpegang pada nash (Al-Qur'an dan Hadits) dan fatwa sahabat. Sangat membatasi penggunaan qiyas dan ra'yu.",
                            "Persebaran Utama: Arab Saudi (menjadi mazhab resmi negara), Qatar, dan beberapa wilayah di Uni Emirat Arab."
                        ]
                    }
                ]
            }
        ],
        dalil: {
            text: "...maka bertanyalah kepada orang yang mempunyai pengetahuan jika kamu tidak mengetahui.",
            source: 'QS. An-Nahl: 43'
        }
    }
];
