export interface QuranScienceContent {
    type: 'paragraph' | 'list' | 'sublist' | 'table';
    title?: string;
    text?: string;
    items?: (string | { title: string; points: string[] })[];
}

export interface QuranScienceTopic {
    id: string;
    title: string;
    icon: string;
    content: QuranScienceContent[];
}

export const quranScienceData: QuranScienceTopic[] = [
    {
        id: 'tajwid',
        title: 'Ilmu Tajwid Lengkap',
        icon: 'fas fa-spell-check',
        content: [
            {
                type: 'paragraph',
                title: 'Pengertian dan Tujuan Tajwid',
                text: 'Tajwid secara bahasa berarti "memperindah sesuatu". Secara istilah, tajwid adalah ilmu tentang tata cara membaca Al-Qur\'an dengan baik dan benar, yaitu dengan mengeluarkan setiap huruf dari tempat keluarnya (makhraj) dan memberikan hak-haknya (sifat-sifatnya). Tujuannya adalah untuk menjaga kemurnian bacaan Al-Qur\'an sebagaimana ia diturunkan kepada Nabi Muhammad SAW, serta untuk menghindari kesalahan makna akibat pelafalan yang salah.'
            },
            {
                type: 'list',
                title: 'Makharijul Huruf (Tempat Keluar Huruf)',
                items: [
                    "Al-Jauf (Rongga Mulut): Tempat keluar huruf mad ( ا , وْ , يْ ).",
                    "Al-Halq (Tenggorokan): Terbagi tiga bagian. Tenggorokan bawah (ء, هـ), tengah (ع, ح), dan atas (غ, خ).",
                    "Al-Lisan (Lidah): Tempat keluar mayoritas huruf, seperti ق, ك, ش, ج, ي, ض, ل, ن, ر, ت, د, ط, س, ز, ص, ث, ذ, ظ.",
                    "Asy-Syafatain (Dua Bibir): Tempat keluar huruf ف, و, ب, م.",
                    "Al-Khaisyum (Rongga Hidung): Tempat keluar sifat ghunnah (dengung)."
                ]
            },
            {
                type: 'list',
                title: 'Hukum Nun Sukun (نْ) dan Tanwin (ــًــٍــٌ)',
                items: [
                    { title: '1. Izhar Halqi (Jelas)', points: ["Terjadi jika nun sukun/tanwin bertemu dengan salah satu dari 6 huruf halq (tenggorokan): ء, هـ, ع, ح, غ, خ.", "Cara membacanya adalah jelas dan terang tanpa berdengung."] },
                    { title: '2. Idgham (Melebur)', points: ["Terbagi menjadi dua:", "- Idgham Bighunnah (dengan dengung): Jika bertemu huruf ي, ن, م, و. Cara membacanya adalah meleburkan suara nun sukun/tanwin ke huruf berikutnya sambil didengungkan selama 2 harakat.", "- Idgham Bilaghunnah (tanpa dengung): Jika bertemu huruf ل, ر. Cara membacanya adalah meleburkan suara nun sukun/tanwin ke huruf berikutnya tanpa didengungkan."] },
                    { title: '3. Iqlab (Mengganti)', points: ["Terjadi jika nun sukun/tanwin bertemu dengan huruf ب.", "Cara membacanya adalah mengganti suara nun sukun/tanwin menjadi suara mim (م) yang disamarkan sambil didengungkan."] },
                    { title: '4. Ikhfa\' Haqiqi (Samar)', points: ["Terjadi jika nun sukun/tanwin bertemu dengan salah satu dari 15 huruf sisa: ت, ث, ج, د, ذ, ز, س, ش, ص, ض, ط, ظ, ف, ق, ك.", "Cara membacanya adalah menyamarkan suara nun sukun/tanwin antara izhar dan idgham, dengan dengung yang dipersiapkan ke makhraj huruf berikutnya."] },
                ]
            },
            {
                type: 'list',
                title: 'Hukum Mim Sukun (مْ)',
                items: [
                    { title: '1. Ikhfa\' Syafawi (Samar Bibir)', points: ["Terjadi jika mim sukun bertemu dengan huruf ب.", "Cara membacanya adalah menyamarkan suara mim sukun di bibir sambil didengungkan."] },
                    { title: '2. Idgham Mimi/Mutamatsilain (Melebur Serupa)', points: ["Terjadi jika mim sukun bertemu dengan huruf م.", "Cara membacanya adalah meleburkan suara mim sukun ke huruf mim berikutnya sambil didengungkan dengan sempurna."] },
                    { title: '3. Izhar Syafawi (Jelas Bibir)', points: ["Terjadi jika mim sukun bertemu dengan huruf selain ب dan م.", "Cara membacanya adalah jelas di bibir tanpa dengung, dengan hati-hati agar tidak memantul."] },
                ]
            },
            {
                type: 'list',
                title: 'Hukum Mad (Bacaan Panjang)',
                items: [
                   { title: '1. Mad Asli / Thabi\'i (Pokok)', points: ["Panjangnya 2 harakat. Terjadi jika fathah diikuti alif (ا), kasrah diikuti ya sukun (يْ), atau dhammah diikuti wau sukun (وْ). Ini adalah dasar dari semua mad."] },
                   { title: '2. Mad Far\'i (Cabang)', points: [
                       "Mad Wajib Muttashil: Mad thabi'i bertemu hamzah (ء) dalam satu kata. Panjang 4 atau 5 harakat.",
                       "Mad Jaiz Munfashil: Mad thabi'i bertemu hamzah (ء) di lain kata. Panjang 2, 4, atau 5 harakat.",
                       "Mad 'Aridh Lissukun: Mad thabi'i bertemu huruf hidup yang diwaqafkan (diberhentikan). Panjang 2, 4, atau 6 harakat.",
                       "Mad Lazim: Mad bertemu sukun asli atau tasydid. Panjangnya wajib 6 harakat. Terbagi lagi menjadi Mad Lazim Kilmi (dalam kata) dan Harfi (dalam huruf di awal surah), yang masing-masing bisa Mutsaqqal (berat/bertasydid) atau Mukhaffaf (ringan/sukun).",
                       "Mad Lin: Wau sukun (وْ) atau Ya sukun (يْ) yang didahului fathah dan bertemu huruf hidup yang diwaqafkan. Panjang 2, 4, atau 6 harakat.",
                       "Mad Badal, Mad 'Iwadh, dan lainnya."
                   ]}
                ]
            },
            {
                type: 'list',
                title: 'Hukum Tambahan Penting',
                items: [
                    { title: 'Qalqalah (Pantulan)', points: ["Terjadi pada 5 huruf: ق, ط, ب, ج, د (diakronimkan: Quthbu Jadin) saat sukun. Terbagi dua:", "- Qalqalah Sughra (kecil): Jika hurufnya di tengah kata. Pantulannya ringan.", "- Qalqalah Kubra (besar): Jika hurufnya di akhir kata dan diwaqafkan. Pantulannya kuat."] },
                    { title: 'Hukum Lam (ل) dan Ra\' (ر)', points: ["Lam (ل) pada lafaz Allah (الله) dibaca tebal (tafkhim) jika didahului fathah atau dhammah, dan tipis (tarqiq) jika didahului kasrah.", "Ra\' (ر) dibaca tebal (tafkhim) jika berharakat fathah/dhammah, atau sukun didahului fathah/dhammah. Dibaca tipis (tarqiq) jika berharakat kasrah, atau sukun didahului kasrah."] },
                    { title: 'Ghunnah (Dengung)', points: ["Setiap huruf Nun (نّ) dan Mim (مّ) yang bertasydid wajib dibaca dengan dengung yang ditahan selama 2 harakat."] },
                ]
            },
        ]
    },
    {
        id: 'tahfidz',
        title: 'Tahfidz Al-Qur\'an',
        icon: 'fas fa-brain',
        content: [
            {
                type: 'paragraph',
                title: 'Sebuah Perjalanan Spiritual',
                text: 'Menghafal Al-Qur\'an (Tahfidz) adalah salah satu ibadah paling mulia dan merupakan perjalanan spiritual yang mendalam. Ini bukan sekadar latihan memori, melainkan proses menyatukan firman Allah ke dalam hati, jiwa, dan kehidupan seorang Muslim. Proses ini membutuhkan niat yang lurus, disiplin baja, kesabaran tak terbatas, dan metode yang sistematis.'
            },
            {
                type: 'list',
                title: 'Fase 1: Persiapan (Al-I\'dad)',
                items: [
                    "Tazkiyatun Niyyah (Penyucian Niat): Luruskan niat bahwa menghafal adalah semata-mata untuk mencari ridha Allah, bukan untuk pujian, gelar, atau tujuan duniawi. Perbarui niat ini setiap saat.",
                    "At-Taubah wal Istighfar (Taubat dan Mohon Ampun): Hati yang bersih ibarat wadah yang siap diisi. Jauhi maksiat karena ia dapat menggelapkan hati dan mempersulit hafalan. Perbanyak istighfar.",
                    "Tahsinul Qira\'ah (Perbaikan Bacaan): Ini adalah FONDASI. Sebelum menghafal, pastikan bacaan Anda sudah benar sesuai kaidah tajwid. Bergurulah (talaqqi) kepada seorang guru yang kompeten hingga bacaan Anda fasih.",
                    "Memilih Waktu & Tempat Ideal: Waktu emas untuk menghafal adalah saat pikiran paling jernih, seperti sepertiga malam terakhir atau setelah shalat Subuh. Pilih tempat yang tenang, rapi, dan bebas dari segala bentuk gangguan (termasuk gawai).",
                    "Komitmen pada Satu Mushaf: Gunakan satu jenis cetakan mushaf (misal: Mushaf Madinah Rasm Utsmani). Jangan berganti-ganti. Ini akan membantu memori visual Anda merekam tata letak ayat, halaman, dan posisi ayat, yang sangat membantu dalam proses muraja\'ah.",
                    "Doa dan Tawakkal: Minta kepada Allah agar dimudahkan dalam menghafal, memahami, dan mengamalkan Al-Qur'an. Setelah berusaha, serahkan hasilnya kepada Allah.",
                ]
            },
            {
                type: 'list',
                title: 'Fase 2: Proses Menghafal (At-Tahfidz)',
                items: [
                    { title: 'Metode Per Ayat (Ayat by Ayat)', points: ["Baca satu ayat dengan melihat mushaf 10-20 kali sambil memahami maknanya hingga lancar.", "Tutup mushaf dan ulangi ayat tersebut dari hafalan hingga benar-benar lancar tanpa kesalahan.", "Lanjutkan ke ayat berikutnya dengan cara yang sama.", "Setelah hafal ayat kedua, gabungkan dengan ayat pertama dan ulangi keduanya dari hafalan.", "Lakukan terus menerus, seperti membangun rantai. Metode ini sangat kokoh dan cocok untuk pemula."] },
                    { title: 'Metode Per Halaman (Shofhah)', points: ["Bagi halaman menjadi 3 atau 4 bagian (berdasarkan paragraf atau akhir ayat).", "Hafalkan bagian pertama menggunakan metode per ayat.", "Setelah bagian pertama mutqin (kokoh), lanjutkan ke bagian kedua.", "Setelah bagian kedua mutqin, gabungkan (muraja'ah) dari awal bagian pertama hingga akhir bagian kedua.", "Terus lakukan hingga satu halaman utuh terhafal dengan lancar."] },
                    { title: 'Metode Mendengar & Meniru (Sima\'i)', points: ["Dengarkan bacaan murattal dari seorang qari favorit (yang bacaannya standar dan tidak terlalu cepat, misal Syekh Al-Husary) untuk satu halaman secara berulang-ulang.", "Ikuti bacaan sang qari sambil melihat mushaf, lalu tanpa melihat.", "Metode ini sangat efektif untuk memperbaiki tajwid, lagu, dan melancarkan hafalan yang sudah ada."] },
                    { title: 'Metode Menulis (Kitabah)', points: ["Setelah menghafal satu halaman, coba tuliskan seluruh ayat di halaman tersebut dari ingatan. Metode ini sangat kuat dalam mengikat hafalan karena melibatkan memori motorik dan visual."] },
                ]
            },
             {
                type: 'list',
                title: 'Fase 3: Menjaga Hafalan (Al-Muraja\'ah)',
                items: [
                   "Prinsip Emas: \"Menjaga hafalan lebih sulit daripada menghafal baru.\" Muraja'ah adalah nyawa dari tahfidz.",
                   "Muraja\'ah Harian (Wirid Yaumi): Ini WAJIB. Hafalan yang tidak diulang dalam sehari ibarat tanaman yang tidak disiram. Alokasikan porsi muraja'ah lebih banyak daripada hafalan baru. Contoh: 1 jam muraja'ah, 30 menit hafalan baru.",
                   "Skema Muraja\'ah:",
                   "  - Hafalan Baru (< 5 Juz): Ulangi semua hafalan yang ada setiap hari.",
                   "  - Hafalan Pertengahan (5-15 Juz): Bagi hafalan menjadi beberapa bagian. Misal, setiap hari mengulang 1-2 juz.",
                   "  - Hafalan Lanjutan (> 15 Juz): Gunakan metode Fami bi Syauqin ( mulutku dalam kerinduan). Bagi 30 juz menjadi 7 bagian. Hari 1 (juz 1-4), Hari 2 (juz 5-9), dst, sehingga dalam seminggu khatam muraja'ah 30 juz.",
                   "Gunakan dalam Shalat: Ini adalah cara paling mutqin (kokoh) untuk menjaga hafalan. Baca hafalan Anda saat shalat sunnah (Tahajjud, Dhuha, Rawatib). Ini 'memaksa' otak untuk mengingat dalam kondisi paling khusyuk.",
                   "Saling Menyimak (Tasmi'): Cari teman atau guru untuk menyimak hafalan Anda secara rutin. Mereka akan menemukan kesalahan (bacaan, harakat, atau urutan ayat) yang tidak Anda sadari.",
                   "Mengikat Ayat Mirip (Mutasyabihat): Ini adalah tantangan terbesar. Buat buku catatan khusus untuk mengumpulkan, membandingkan, dan menandai ayat-ayat yang redaksinya mirip di surah yang berbeda. Memahami konteks surah sangat membantu membedakannya.",
                ]
            },
        ]
    },
    {
        id: 'keutamaan',
        title: 'Keutamaan & Adab Al-Qur\'an',
        icon: 'fas fa-gem',
        content: [
             {
                type: 'list',
                title: 'Keutamaan Membaca & Menghafal Al-Qur\'an',
                items: [
                   "Sebaik-baik Manusia: \"Sebaik-baik kalian adalah orang yang belajar Al-Qur’an dan mengajarkannya.\" (HR. Bukhari).",
                   "Pahala Berlipat Ganda: \"Barangsiapa yang membaca satu huruf dari Kitabullah, maka baginya satu kebaikan. Dan satu kebaikan akan dilipatgandakan menjadi sepuluh kebaikan.\" (HR. Tirmidzi).",
                   "Memberi Syafaat di Hari Kiamat: \"Bacalah Al-Qur’an, karena sesungguhnya ia akan datang pada hari kiamat sebagai pemberi syafaat bagi para pembacanya.\" (HR. Muslim).",
                   "Mengangkat Derajat di Surga: Akan dikatakan kepada penghafal Al-Qur'an: 'Bacalah, naiklah, dan tartilkanlah sebagaimana engkau mentartilkannya di dunia. Sesungguhnya kedudukanmu di akhir ayat yang engkau baca.' (HR. Abu Dawud & Tirmidzi).",
                   "Mahkota Kehormatan untuk Orang Tua: Para penghafal Al-Qur'an akan membuat orang tuanya dipakaikan mahkota kehormatan di hari kiamat yang cahayanya lebih indah dari cahaya matahari di dunia. (HR. Abu Dawud).",
                   "Menjadi Keluarga Allah (Ahlullah): \"Sesungguhnya Allah mempunyai keluarga di antara manusia.\" Para sahabat bertanya, 'Siapakah mereka, ya Rasulullah?' Beliau menjawab, 'Mereka adalah Ahlul Qur’an (orang yang menyibukkan diri dengan Al-Qur’an), mereka adalah keluarga Allah dan orang-orang pilihan-Nya.' (HR. Ibnu Majah).",
                   "Obat dan Rahmat: \"Dan Kami turunkan dari Al-Qur'an (sesuatu) yang menjadi penawar (obat) dan rahmat bagi orang yang beriman.\" (QS. Al-Isra\': 82).",
                ]
            },
            {
                type: 'list',
                title: 'Adab Lahiriah (Fisik)',
                items: [
                    "Bersuci: Dianjurkan dalam keadaan suci dari hadats (berwudhu) sebelum menyentuh dan membaca mushaf.",
                    "Tempat yang Layak: Membaca di tempat yang bersih dan suci, seperti masjid atau ruangan yang tenang.",
                    "Menghadap Kiblat: Disunnahkan untuk menghadap kiblat karena itu adalah arah termulia.",
                    "Memulai dengan Ta\'awudz dan Basmalah: Membaca \"A\'udzu billahi minasy syaithanir rajim\" untuk berlindung dari setan, dan \"Bismillahirrahmanirrahim\" di awal setiap surah (kecuali At-Taubah).",
                    "Membaca dengan Tartil: Membaca dengan perlahan, jelas, dan sesuai kaidah tajwid, bukan dengan tergesa-gesa.",
                    "Memperindah Suara: Membaca dengan suara yang merdu dan khusyuk, namun tanpa berlebihan (takalluf) atau riya'.",
                    "Sujud Tilawah: Melakukan sujud ketika melewati ayat-ayat sajdah sebagai bentuk ketundukan.",
                    "Berhenti di Tempat yang Tepat (Waqaf): Memperhatikan tanda-tanda waqaf untuk menjaga kesempurnaan makna.",
                ]
            },
             {
                type: 'list',
                title: 'Adab Batiniah (Hati)',
                items: [
                    "Menghadirkan Hati (Hudhurul Qalb): Fokuskan pikiran dan hati sepenuhnya pada bacaan, singkirkan pikiran-pikiran duniawi.",
                    "Mengagungkan Kalamullah: Menyadari bahwa yang sedang dibaca adalah firman Rabb semesta alam, bukan perkataan manusia.",
                    "Tadabbur (Merenungkan Makna): Berusaha untuk memahami dan merenungkan makna dari setiap ayat yang dibaca. Ini adalah tujuan utama dari membaca Al-Qur'an.",
                    "Khusyuk dan Terpengaruh: Hati menjadi tunduk dan jiwa terpengaruh oleh bacaan. Menangis karena takut kepada azab-Nya atau karena rindu akan rahmat-Nya adalah puncak kekhusyukan.",
                    "Merasa Tersapa: Merasa bahwa setiap perintah, larangan, dan janji dalam Al-Qur'an ditujukan langsung kepada diri kita.",
                    "Berlepas dari Penghalang Pemahaman: Menjauhkan diri dari sifat sombong, takabbur, dan terlalu mengikuti hawa nafsu yang dapat menghalangi pemahaman terhadap Al-Qur'an.",
                ]
            }
        ]
    },
    {
        id: 'fakta',
        title: 'Mukjizat Al-Qur\'an',
        icon: 'fas fa-lightbulb',
        content: [
            {
                type: 'paragraph',
                title: 'Statistik Dasar',
                text: 'Al-Qur\'an terdiri dari 114 Surah, 30 Juz, dan 6.236 ayat (menurut riwayat Hafs). Kata "Al-Qur\'an" sendiri disebutkan sebanyak 70 kali. Surah terpanjang adalah Al-Baqarah (286 ayat) dan surah terpendek adalah Al-Kautsar (3 ayat). Ayat terpanjang adalah Ayat Utang (Al-Baqarah: 282).'
            },
            {
                type: 'list',
                title: 'Keseimbangan Matematika yang Menakjubkan',
                items: [
                    "Dunia (115 kali) vs Akhirat (115 kali)",
                    "Malaikat (88 kali) vs Setan (88 kali)",
                    "Kehidupan (145 kali) vs Kematian (145 kali)",
                    "Manfaat (50 kali) vs Kerusakan (50 kali)",
                    "Panas (40 kali) vs Dingin (40 kali)",
                    "Kekafiran (17 kali) vs Iman (17 kali)",
                    "Laki-laki (24 kali) vs Perempuan (24 kali)",
                    "Bulan (Syahr) disebutkan 12 kali dalam bentuk tunggal.",
                    "Hari (Yaum) disebutkan 365 kali dalam bentuk tunggal.",
                ]
            },
            {
                type: 'list',
                title: 'Mukjizat Ilmiah',
                items: [
                    { title: 'Astronomi', points: ["Ekspansi Alam Semesta: QS. Adz-Dzariyat: 47 menyebutkan \"Dan langit itu Kami bangun... dan sesungguhnya Kami benar-benar meluaskannya,\" yang sesuai dengan penemuan alam semesta yang mengembang oleh Edwin Hubble.", "Teori Big Bang: QS. Al-Anbiya\': 30 menyatakan langit dan bumi tadinya adalah satu kesatuan (ratqan) yang kemudian dipisahkan, mirip dengan konsep singularitas dalam teori Big Bang.", "Orbit Benda Langit: QS. Al-Anbiya\': 33 menyatakan bahwa matahari dan bulan masing-masing beredar pada garis edarnya (falakin yasbahun), membantah pandangan kuno bahwa benda langit diam."] },
                    { title: 'Embriologi', points: ["Tahapan Penciptaan Manusia dalam QS. Al-Mu'minun: 12-14 (nutfah, 'alaqah, mudghah) secara akurat mendeskripsikan tahapan perkembangan embrio yang baru dapat diobservasi dengan teknologi modern. Istilah 'alaqah (segumpal darah/sesuatu yang menempel) sangat cocok dengan deskripsi embrio yang menempel di dinding rahim."] },
                    { title: 'Geologi', points: ["Fungsi Gunung sebagai Pasak: QS. An-Naba\': 7 menyebut gunung sebagai \"pasak\" (awtad). Geologi modern menemukan bahwa gunung memiliki akar yang menghunjam ke dalam bumi, yang berfungsi menstabilkan kerak bumi."] },
                    { title: 'Hidrologi', points: ["Siklus Air: Al-Qur'an dalam banyak ayat (misal: QS. Az-Zumar: 21) secara akurat mendeskripsikan siklus air: penguapan dari laut, pembentukan awan, turunnya hujan, dan air yang meresap ke dalam bumi menjadi mata air."] },
                ]
            },
             {
                type: 'list',
                title: 'Fakta Unik Lainnya',
                items: [
                    "Satu-satunya surah yang tidak diawali dengan Basmalah adalah Surah At-Taubah.",
                    "Surah An-Naml memiliki dua Basmalah (satu di awal, satu dalam kutipan surat Nabi Sulaiman kepada Ratu Balqis).",
                    "Nama Nabi Muhammad SAW disebutkan 4 kali, sedangkan nama Nabi Isa AS disebutkan 25 kali dan Nabi Musa AS (yang paling banyak) disebutkan 136 kali.",
                    "Satu-satunya nama sahabat yang disebutkan secara eksplisit adalah Zaid bin Haritsah (QS. Al-Ahzab: 37).",
                    "Satu-satunya nama wanita (selain gelar seperti Istri Fir'aun) yang disebutkan adalah Maryam binti Imran, bahkan nama beliau menjadi nama salah satu surah (Surah Maryam).",
                    "'Jantung' Al-Qur'an adalah Surah Yasin.",
                    "Wahyu terakhir yang turun adalah Surah Al-Maidah ayat 3: \"...Pada hari ini telah Aku sempurnakan agamamu untukmu, dan telah Aku cukupkan nikmat-Ku bagimu, dan telah Aku ridhai Islam sebagai agamamu.\"",
                ]
            }
        ]
    }
];