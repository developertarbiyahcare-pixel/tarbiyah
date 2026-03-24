
export interface PedomanContent {
    type: 'paragraph' | 'list' | 'table' | 'sublist' | 'collapsible' | 'tabContent' | 'intro' | 'wajib' | 'sunnah' | 'jamak-qashar';
    title?: string;
    text?: string;
    items?: (string | { title: string; points: string[] } | any)[]; // Allow any for complex shalat objects
    table?: {
        headers: string[];
        rows: string[][];
    };
    tabTitle?: string;
    shalatList?: any[];
}

export interface PedomanTopic {
    id: string;
    title: string;
    icon: string;
    subtitle: string;
    content: PedomanContent[]; 
    dalil?: {
        text: string;
        source: string;
    };
}

// FIX: Define base data first to avoid self-referencing during initialization.
export const basePedomanData: PedomanTopic[] = [
    {
        id: 'bersuci',
        title: 'Pedoman Bersuci (Thaharah)',
        icon: 'fas fa-hands-wash',
        subtitle: 'Panduan lengkap wudhu, tayamum, dan mandi wajib sesuai sunnah.',
        content: [
            {
                type: 'paragraph',
                title: 'Pengertian Thaharah',
                text: 'Thaharah secara bahasa berarti kebersihan dan kesucian. Secara istilah, thaharah adalah menghilangkan hadats atau najis yang menghalangi sahnya ibadah, dengan menggunakan air atau tanah yang suci.'
            },
            {
                type: 'list',
                title: 'Tata Cara Wudhu',
                items: [
                    "Niat dalam hati untuk berwudhu.",
                    "Membaca 'Bismillah'.",
                    "Membasuh kedua telapak tangan sebanyak 3 kali.",
                    "Berkumur-kumur sebanyak 3 kali.",
                    "Memasukkan air ke hidung (istinsyaq) lalu mengeluarkannya (istinsyar) sebanyak 3 kali.",
                    "Membasuh seluruh wajah dari ujung dahi hingga dagu, dan dari telinga kanan ke telinga kiri sebanyak 3 kali.",
                    "Membasuh tangan kanan hingga siku sebanyak 3 kali, kemudian tangan kiri hingga siku sebanyak 3 kali.",
                    "Mengusap sebagian atau seluruh kepala sebanyak 1 kali.",
                    "Mengusap kedua telinga (bagian luar dan dalam) sebanyak 1 kali.",
                    "Membasuh kaki kanan hingga mata kaki sebanyak 3 kali, kemudian kaki kiri hingga mata kaki sebanyak 3 kali.",
                    "Tertib (melakukan secara berurutan).",
                    "Membaca doa setelah wudhu."
                ]
            },
            {
                type: 'paragraph',
                title: 'Kapan Tayamum Diperbolehkan?',
                text: 'Tayamum adalah rukhsah (keringanan) dari Allah sebagai pengganti wudhu atau mandi wajib dalam kondisi tertentu. Kondisi tersebut antara lain:\n1. Tidak ditemukan air setelah berusaha mencarinya.\n2. Ada halangan untuk menggunakan air, seperti sakit parah yang akan bertambah buruk jika terkena air (atas anjuran dokter).\n3. Jumlah air yang ada sangat terbatas dan hanya cukup untuk menyambung hidup (minum).\n4. Berada di dekat air, namun ada bahaya yang mengancam jiwa jika mendekatinya (misal: binatang buas atau musuh).'
            },
            {
                type: 'list',
                title: 'Tata Cara Tayamum Sesuai Sunnah',
                items: [
                    "Niat dalam hati untuk bertayamum guna diperbolehkan shalat.",
                    "Membaca 'Bismillah'.",
                    "Menepukkan kedua telapak tangan ke permukaan yang suci dan berdebu (seperti tanah, dinding, atau pasir) sebanyak SATU KALI.",
                    "Meniup kedua telapak tangan untuk menipiskan debu yang menempel.",
                    "Mengusap seluruh wajah dengan kedua telapak tangan sebanyak satu kali usapan.",
                    "Mengusap punggung telapak tangan kanan dengan menggunakan telapak tangan kiri, kemudian mengusap punggung telapak tangan kiri dengan menggunakan telapak tangan kanan."
                ]
            }
        ],
        dalil: {
            text: '...Dan jika kamu sakit atau dalam perjalanan atau kembali dari tempat buang air (kakus) atau menyentuh perempuan, lalu kamu tidak memperoleh air, maka bertayamumlah dengan tanah yang baik (bersih); sapulah mukamu dan tanganmu dengan tanah itu...',
            source: 'QS. Al-Maidah: 6'
        }
    },
    {
        id: 'shalat',
        title: 'Pedoman Shalat',
        icon: 'fas fa-person-praying',
        subtitle: 'Panduan lengkap shalat fardhu, sunnah, serta keringanan dalam perjalanan.',
        content: [
            {
                type: 'intro',
                title: 'Dasar-Dasar Shalat',
                items: [
                    {
                        title: 'Pengertian dan Kedudukan Shalat',
                        type: 'paragraph', // Explicit type
                        text: 'Shalat adalah tiang agama dan merupakan ibadah terpenting kedua setelah syahadat. Ia adalah sarana komunikasi langsung antara seorang hamba dengan Tuhannya. Menjaga shalat lima waktu adalah kewajiban mutlak bagi setiap Muslim.'
                    },
                    {
                        title: 'Syarat Sah Shalat',
                        type: 'list', // Explicit type
                        items: [
                            "Islam.",
                            "Baligh dan Berakal.",
                            "Suci dari hadats besar dan kecil.",
                            "Suci badan, pakaian, dan tempat shalat dari najis.",
                            "Mengetahui masuknya waktu shalat.",
                            "Menghadap kiblat.",
                            "Menutup aurat."
                        ]
                    },
                    {
                        title: 'Rukun Shalat',
                        type: 'list', // Explicit type
                        items: [
                            "Niat.",
                            "Berdiri bagi yang mampu.",
                            "Takbiratul Ihram.",
                            "Membaca Surah Al-Fatihah.",
                            "Ruku dengan tuma\'ninah.",
                            "I\'tidal setelah ruku dengan tuma\'ninah.",
                            "Sujud dua kali dengan tuma\'ninah.",
                            "Duduk di antara dua sujud dengan tuma\'ninah.",
                            "Duduk tasyahud akhir.",
                            "Membaca tasyahud akhir.",
                            "Membaca shalawat Nabi pada tasyahud akhir.",
                            "Mengucapkan salam yang pertama.",
                            "Tertib (melakukan rukun secara berurutan)."
                        ]
                    }
                ] as any // Casting to avoid complex nested typing issues for 'intro' content structure
            },
            {
                type: 'wajib',
                title: 'Shalat Fardhu',
                items: [
                    { id: 'shalat-subuh', name: 'Subuh', rakaat: '2 Rakaat', waktu: 'Dari terbit fajar shadiq hingga terbit matahari.', niat: { arabic: "أُصَلِّى فَرْضَ الصُّبْح رَكَعتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً (مَأْمُوْمًا/إِمَامًا) لِلهِ تَعَالَى", latin: "Ushalli fardhash shubhi rak'ataini mustaqbilal qiblati adaa'an (ma'muman/imaman) lillaahi ta'aalaa.", translation: "Aku niat shalat fardhu Subuh dua rakaat, menghadap kiblat, saat ini, (sebagai makmum/imam) karena Allah ta'ala." }, tataCara: 'Tata cara shalat Subuh sama seperti shalat 2 rakaat lainnya, namun pada rakaat kedua setelah i\'tidal disunnahkan membaca Doa Qunut.', doaQunut: { arabic: "اَللّهُمَّ اهْدِنِيْ فِيْمَنْ هَدَيْتَ، وَعَافِنِيْ فِيْمَنْ عَافَيْتَ، وَتَوَلَّنِيْ فِيْمَنْ تَوَلَّيْتَ، وَبَارِكْ لِيْ فِيْمَا أَعْطَيْتَ، وَقِنِيْ شَرَّمَا قَضَيْتَ، فَاِ نَّكَ تَقْضِيْ وَلاَ يُقْضَى عَلَيْكَ، وَاِ نَّهُ لاَ يَذِلُّ مَنْ وَالَيْتَ، وَلاَ يَعِزُّ مَنْ عَادَيْتَ، تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ، فَلَكَ الْحَمْدُ عَلَى مَا قَضَيْتَ، أَسْتَغْفِرُكَ وَأَتُوْبُ اِلَيْكَ، وَصَلَّى اللهُ عَلَى سَيِّدَنَا مُحَمَّدٍ النَّبِيِّ اْلأُمِّيِّ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلَّمَ", latin: "Allahummahdinii fiiman hadaiit, wa'aafinii fiiman 'aafaiit, wa tawallanii fiiman tawallaiit, wa baarik lii fiimaa a'thaiit, wa qinii syarra maa qadhaiit, fa innaka taqdhii wa laa yuqdhaa 'alaiik, wa innahu laa yadzillu man waalaiit, wa laa ya'izzu man 'aadaiit, tabaarakta rabbanaa wa ta'aalait, fa lakal hamdu a'laa maa qadhaiit, astaghfiruka wa atuubu ilaik, wa shallallahu 'alaa sayyidinaa muhammadin nabiyyil ummiyyi wa 'alaa aalihi wa shahbihi wa sallam.", translation: "Ya Allah, berilah aku petunjuk seperti orang-orang yang telah Engkau beri petunjuk. Berilah aku kesehatan seperti orang yang telah Engkau beri kesehatan. Pimpinlah aku bersama-sama orang-orang yang telah Engkau pimpin. Berilah berkah pada segala apa yang telah Engkau purniakan kepadaku. Dan peliharalah aku dari kejahatan yang Engkau pastikan. Karena sesungguhnya Engkaulah yang menentukan dan tidak ada yang menghukum (menentukan) atas Engkau. Sesungguhnya tidaklah akan hina orang-orang yang telah Engkau beri kekuasaan. Dan tidaklah akan mulia orang yang Engkau musuhi. Maha Berkahlah Engkau dan Maha Luhurlah Engkau. Segala puji bagi-Mu atas yang telah Engkau pastikan. Aku mohon ampun dan tobat kepada Engkau. Semoga Allah memberi rahmat dan kesejahteraan kepada junjungan kami Nabi Muhammad, keluarga dan para sahabatnya." } },
                    { id: 'shalat-dzuhur', name: 'Dzuhur', rakaat: '4 Rakaat', waktu: 'Dari tergelincirnya matahari hingga bayangan benda sama panjang dengan bendanya.', niat: { arabic: "أُصَلِّى فَرْضَ الظُّهْرِ أَرْبَعَ رَكَعاَتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً (مَأْمُوْمًا/إِمَامًا) لِلهِ تَعَالَى", latin: "Ushalli fardhadz dzuhri arba'a raka'aatin mustaqbilal qiblati adaa'an (ma'muman/imaman) lillaahi ta'aalaa.", translation: "Aku niat shalat fardhu Dzuhur empat rakaat, menghadap kiblat, saat ini, (sebagai makmum/imam) karena Allah ta'ala." }, tataCara: 'Dilaksanakan sebanyak 4 rakaat dengan dua kali tasyahud (tasyahud awal pada rakaat kedua dan tasyahud akhir pada rakaat keempat).' },
                    { id: 'shalat-ashar', name: 'Ashar', rakaat: '4 Rakaat', waktu: 'Dari bayangan benda melebihi panjang bendanya hingga terbenamnya matahari.', niat: { arabic: "أُصَلِّى فَرْضَ العَصْرِ أَرْبَعَ رَكَعاَتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً (مَأْمُوْمًا/إِمَامًا) لِلهِ تَعَالَى", latin: "Ushalli fardhal 'ashri arba'a raka'aatin mustaqbilal qiblati adaa'an (ma'muman/imaman) lillaahi ta'aalaa.", translation: "Aku niat shalat fardhu Ashar empat rakaat, menghadap kiblat, saat ini, (sebagai makmum/imam) karena Allah ta'ala." }, tataCara: 'Dilaksanakan sebanyak 4 rakaat dengan dua kali tasyahud (tasyahud awal pada rakaat kedua dan tasyahud akhir pada rakaat keempat).' },
                    { id: 'shalat-maghrib', name: 'Maghrib', rakaat: '3 Rakaat', waktu: 'Dari terbenamnya matahari hingga hilangnya mega merah di ufuk barat.', niat: { arabic: "أُصَلِّى فَرْضَ المَغْرِبِ ثَلاَثَ رَكَعاَتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً (مَأْمُوْمًا/إِمَامًا) لِلهِ تَعَالَى", latin: "Ushalli fardhal maghribi tsalaatsa raka'aatin mustaqbilal qiblati adaa'an (ma'muman/imaman) lillaahi ta'aalaa.", translation: "Aku niat shalat fardhu Maghrib tiga rakaat, menghadap kiblat, saat ini, (sebagai makmum/imam) karena Allah ta'ala." }, tataCara: 'Dilaksanakan sebanyak 3 rakaat dengan dua kali tasyahud (tasyahud awal pada rakaat kedua dan tasyahud akhir pada rakaat ketiga).' },
                    { id: 'shalat-isya', name: 'Isya', rakaat: '4 Rakaat', waktu: 'Dari hilangnya mega merah hingga terbit fajar shadiq.', niat: { arabic: "أُصَلِّى فَرْضَ العِشَاء أَرْبَعَ رَكَعاَتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً (مَأْمُوْمًا/إِمَامًا) لِلهِ تَعَالَى", latin: "Ushalli fardhal 'isyaa-i arba'a raka'aatin mustaqbilal qiblati adaa'an (ma'muman/imaman) lillaahi ta'aalaa.", translation: "Aku niat shalat fardhu Isya empat rakaat, menghadap kiblat, saat ini, (sebagai makmum/imam) karena Allah ta'ala." }, tataCara: 'Dilaksanakan sebanyak 4 rakaat dengan dua kali tasyahud (tasyahud awal pada rakaat kedua dan tasyahud akhir pada rakaat keempat).' },
                    { id: 'shalat-jumat', name: 'Jumat', rakaat: '2 Rakaat', waktu: 'Dilaksanakan pada waktu Dzuhur di hari Jumat.', niat: { arabic: "أُصَلِّى فَرْضَ الجُمْعَةِ رَكَعتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً مَأْمُوْمًا لِلهِ تَعَالَى", latin: "Ushalli fardhal jum'ati rak'ataini mustaqbilal qiblati adaa'an ma'muman lillaahi ta'aalaa.", translation: "Aku niat shalat fardhu Jumat dua rakaat, menghadap kiblat, saat ini, sebagai makmum karena Allah ta'ala." }, tataCara: 'Wajib bagi laki-laki, dilaksanakan secara berjamaah di masjid dan didahului oleh dua khutbah. Menggantikan shalat Dzuhur.' },
                ]
            },
            {
                type: 'sunnah',
                title: 'Shalat Sunnah',
                items: [
                    { id: 'shalat-rawatib', name: 'Rawatib', description: 'Shalat sunnah yang mengiringi shalat fardhu lima waktu, baik sebelum (qabliyah) maupun sesudah (ba\'diyah).', keutamaan: 'Rawatib Mu\'akkadah (sangat dianjurkan): 2 rakaat sebelum Subuh (lebih baik dari dunia & isinya), 4 rakaat sebelum Dzuhur, 2 rakaat sesudah Dzuhur, 2 rakaat sesudah Maghrib, 2 rakaat sesudah Isya.' },
                    { id: 'shalat-tahajud', name: 'Tahajud', description: 'Shalat sunnah yang dikerjakan di malam hari setelah tidur, terutama di sepertiga malam terakhir.', keutamaan: 'Merupakan shalat sunnah yang paling utama setelah shalat fardhu. Waktu mustajab untuk berdoa dan mendekatkan diri kepada Allah.' },
                    { id: 'shalat-dhuha', name: 'Dhuha', description: 'Shalat sunnah yang dikerjakan pada waktu pagi, setelah matahari terbit setinggi tombak hingga menjelang waktu Dzuhur.', keutamaan: 'Membuka pintu rezeki, menggantikan sedekah seluruh persendian tubuh, dan sebagai wasiat dari Rasulullah SAW.' },
                    { id: 'shalat-witir', name: 'Witir', description: 'Shalat sunnah dengan jumlah rakaat ganjil (minimal 1, umumnya 3) yang dikerjakan sebagai penutup shalat malam.', keutamaan: 'Sangat dianjurkan oleh Rasulullah SAW, bahkan beliau tidak pernah meninggalkannya baik saat mukim maupun safar.' },
                    { id: 'shalat-tarawih', name: 'Tarawih', description: 'Shalat sunnah khusus yang dilakukan pada malam hari di bulan Ramadhan.', keutamaan: 'Barangsiapa yang shalat malam di bulan Ramadhan karena iman dan mengharap pahala, akan diampuni dosa-dosanya yang telah lalu.' },
                    { id: 'shalat-id', name: 'Idul Fitri & Adha', description: 'Dua shalat sunnah mu\'akkadah yang dilaksanakan pada hari raya. Dilakukan sebanyak 2 rakaat secara berjamaah di lapangan atau masjid, dengan takbir tambahan (7 kali di rakaat pertama, 5 kali di rakaat kedua).', keutamaan: 'Merupakan syiar besar agama Islam dan momen kebersamaan umat.' },
                    { id: 'shalat-tahiyatul-masjid', name: 'Tahiyatul Masjid', description: 'Shalat sunnah 2 rakaat yang dikerjakan sebagai penghormatan kepada masjid, dilakukan sebelum duduk saat memasuki masjid.', keutamaan: 'Bentuk adab dan pemuliaan terhadap rumah Allah.' },
                    { id: 'shalat-istikharah', name: 'Istikharah', description: 'Shalat sunnah 2 rakaat yang dilakukan untuk memohon petunjuk kepada Allah dalam menentukan pilihan di antara beberapa urusan yang mubah.', keutamaan: 'Menyerahkan pilihan terbaik kepada Allah Yang Maha Mengetahui.' },
                    { id: 'shalat-taubat', name: 'Taubat', description: 'Shalat sunnah 2 rakaat yang dilakukan setelah seseorang melakukan perbuatan dosa dan berniat untuk bertaubat dengan sungguh-sungguh.', keutamaan: 'Salah satu cara untuk menyempurnakan taubat dan meraih ampunan Allah.' },
                    { id: 'shalat-hajat', name: 'Hajat', description: 'Shalat sunnah yang dilakukan ketika seseorang memiliki keinginan atau kebutuhan khusus yang ingin disampaikan kepada Allah.', keutamaan: 'Menunjukkan ketergantungan seorang hamba kepada Rabb-nya dalam segala urusan.' },
                ]
            },
            {
                type: 'jamak-qashar',
                title: 'Jamak & Qashar',
                items: [
                    {
                        type: 'paragraph',
                        title: 'Pengertian Jamak & Qashar',
                        text: 'Jamak dan Qashar adalah rukhsah (keringanan) yang diberikan Allah SWT bagi seorang musafir (orang yang sedang dalam perjalanan jauh) dalam melaksanakan shalat fardhu.'
                    },
                    {
                        type: 'list',
                        title: 'Shalat Jamak (Menggabungkan)',
                        items: [
                            "Definisi: Menggabungkan dua shalat fardhu dan mengerjakannya dalam salah satu waktu shalat tersebut.",
                            "Pasangan Shalat: Shalat yang bisa dijamak adalah Dzuhur dengan Ashar, dan Maghrib dengan Isya. Shalat Subuh tidak bisa dijamak.",
                            { 
                                title: 'Jenis Jamak:', 
                                points: [
                                    "Jamak Taqdim: Menggabungkan dua shalat di waktu shalat yang pertama. Contoh: Mengerjakan shalat Ashar di waktu Dzuhur setelah selesai shalat Dzuhur.",
                                    "Jamak Takhir: Menggabungkan dua shalat di waktu shalat yang kedua. Contoh: Mengerjakan shalat Dzuhur di waktu Ashar sebelum memulai shalat Ashar."
                                ] 
                            }
                        ]
                    },
                    {
                        type: 'list',
                        title: 'Shalat Qashar (Meringkas)',
                        items: [
                            "Definisi: Meringkas jumlah rakaat shalat fardhu yang aslinya 4 rakaat menjadi 2 rakaat.",
                            "Shalat yang Bisa diqashar: Dzuhur, Ashar, dan Isya. Shalat Maghrib dan Subuh tidak bisa diqashar."
                        ]
                    },
                    {
                        type: 'paragraph',
                        title: 'Jamak & Qashar Sekaligus',
                        text: 'Seorang musafir boleh menggabungkan kedua keringanan ini. Contoh: Mengerjakan shalat Dzuhur 2 rakaat dan Ashar 2 rakaat, yang dilaksanakan di waktu Dzuhur (Jamak Taqdim Qashar).'
                    },
                    {
                        type: 'list',
                        title: 'Syarat Diperbolehkannya Jamak & Qashar',
                        items: [
                            "Status sebagai Musafir: Perjalanan yang ditempuh adalah perjalanan jauh. Mayoritas ulama menetapkan jarak minimal sekitar 85-90 km.",
                            "Tujuan Perjalanan: Perjalanan yang dilakukan bukanlah untuk tujuan maksiat.",
                            "Niat: Berniat untuk menjamak atau mengqashar shalat pada saat takbiratul ihram shalat yang pertama.",
                            "Tidak Bermakmum pada Imam yang Sempurna: Saat mengqashar, tidak boleh bermakmum kepada imam yang shalatnya sempurna (tidak diqashar)."
                        ]
                    }
                ]
            }
        ],
        dalil: {
            text: '...dan dirikanlah shalat. Sesungguhnya shalat itu adalah kewajiban yang ditentukan waktunya atas orang-orang yang beriman.',
            source: 'QS. An-Nisa: 103'
        }
    },
    // ... rest of the basePedomanData ...
];

// FIX: Generate dynamic topics after the base data is fully defined.
const shalatTopic = basePedomanData.find(t => t.id === 'shalat');
if (!shalatTopic) throw new Error("Shalat topic is missing from basePedomanData");

const shalatWajibItems = shalatTopic.content.find((c: any) => c.type === 'wajib').items;
const generatedShalatWajibTopics = shalatWajibItems.map((shalat: any) => {
    const content: PedomanContent[] = [
        { type: 'paragraph', title: 'Waktu Pelaksanaan', text: shalat.waktu },
        { type: 'collapsible', title: 'Niat Shalat', items: [
            { title: 'Arab', points: [shalat.niat.arabic] },
            { title: 'Latin', points: [shalat.niat.latin] },
            { title: 'Artinya', points: [shalat.niat.translation] },
        ]},
        { type: 'paragraph', title: 'Tata Cara & Keterangan', text: shalat.tataCara }
    ];

    if (shalat.doaQunut) {
        content.push({
            type: 'collapsible',
            title: 'Do\'a Qunut',
            items: [
                { title: 'Arab', points: [shalat.doaQunut.arabic] },
                { title: 'Latin', points: [shalat.doaQunut.latin] },
                { title: 'Artinya', points: [shalat.doaQunut.translation] },
            ]
        });
    }

    return {
        id: shalat.id,
        title: `Shalat ${shalat.name}`,
        icon: 'fas fa-person-praying',
        subtitle: `Panduan Shalat Fardhu ${shalat.name} (${shalat.rakaat})`,
        content: content
    };
});

const shalatSunnahItems = shalatTopic.content.find((c: any) => c.type === 'sunnah').items;
const generatedShalatSunnahTopics = shalatSunnahItems.map((shalat: any) => {
    const content: PedomanContent[] = [
        { type: 'paragraph', title: 'Deskripsi', text: shalat.description },
        { type: 'paragraph', title: 'Keutamaan', text: shalat.keutamaan }
    ];
    return {
        id: shalat.id,
        title: `Shalat ${shalat.name}`,
        icon: 'fas fa-person-praying',
        subtitle: `Panduan Shalat Sunnah ${shalat.name}`,
        content: content
    };
});

// FIX: Export the final combined data.
export const pedomanData: PedomanTopic[] = [
    ...basePedomanData,
    ...generatedShalatWajibTopics,
    ...generatedShalatSunnahTopics,
];
