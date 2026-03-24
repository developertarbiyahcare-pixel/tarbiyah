export interface HukumSyariahContent {
    type: 'paragraph' | 'list' | 'table';
    title?: string;
    text?: string;
    items?: (string | { title: string; points: string[] })[];
    table?: {
        headers: string[];
        rows: string[][];
    };
}

export interface HukumSyariahTopic {
    id: string;
    title: string;
    icon: string;
    subtitle: string;
    content: HukumSyariahContent[];
    dalil?: {
        text: string;
        source: string;
    };
}

export const hukumSyariahData: HukumSyariahTopic[] = [
    {
        id: 'sumber-hukum',
        title: 'Sumber-Sumber Hukum Islam',
        icon: 'fas fa-layer-group',
        subtitle: 'Mengenal empat sumber hukum utama: Al-Qur\'an, Sunnah, Ijma\', dan Qiyas.',
        content: [
            {
                type: 'paragraph',
                title: 'Pengantar: Fondasi Syariat Islam',
                text: `Hukum Islam, atau Syariat Islam, adalah sebuah sistem hukum yang komprehensif dan terstruktur dengan rapi, yang bersumber dari wahyu ilahi dan ijtihad para ulama. Untuk memahami bagaimana hukum-hukum ini dirumuskan, sangat penting untuk mengenal hierarki sumber-sumbernya (mashadir al-ahkam). Para ulama Ahlus Sunnah wal Jama'ah telah menyepakati empat sumber hukum utama yang menjadi fondasi bagi seluruh bangunan fiqh (yurisprudensi Islam). Keempat sumber ini adalah Al-Qur'an, As-Sunnah, Ijma' (konsensus ulama), dan Qiyas (analogi). Dua sumber pertama (Al-Qur'an dan Sunnah) adalah sumber primer yang bersifat naqli (berdasarkan teks wahyu), sementara dua sumber berikutnya (Ijma' dan Qiyas) adalah sumber sekunder yang bersifat 'aqli (berdasarkan penalaran rasional yang terikat oleh wahyu). Selain itu, terdapat pula sumber-sumber hukum turunan (mashadir at-taba'iyyah) yang digunakan oleh para ulama mazhab dalam kondisi tertentu, seperti Istihsan, Maslahah Mursalah, dan 'Urf. Memahami tatanan sumber hukum ini adalah kunci untuk mengapresiasi kedalaman, fleksibilitas, dan otoritas dari Syariat Islam.`
            },
            {
                type: 'list',
                title: '1. Al-Qur\'an: Sumber Utama dan Absolut',
                items: [
                    { title: 'Definisi dan Kedudukan', points: ["Al-Qur'an adalah kalamullah (firman Allah) yang diturunkan kepada Nabi Muhammad SAW melalui perantara Malaikat Jibril, yang membacanya bernilai ibadah. Sebagai firman langsung dari Allah, Al-Qur'an menempati posisi tertinggi dalam hierarki sumber hukum. Ia adalah konstitusi dasar bagi umat Islam, bersifat qath'i ats-tsubut (pasti otentik dan tidak ada keraguan sedikit pun akan keasliannya). Semua sumber hukum lain harus bersandar dan tidak boleh bertentangan dengannya."] },
                    { title: 'Kandungan Hukum', points: ["Ayat-ayat hukum dalam Al-Qur'an (ayatul ahkam) mencakup berbagai aspek kehidupan. Ada yang bersifat global (mujmal), seperti perintah shalat dan zakat yang rinciannya dijelaskan oleh Sunnah. Ada pula yang bersifat terperinci (mufashshal), seperti hukum waris, hukum hudud (pidana), dan hukum pernikahan. Kandungan hukumnya meliputi: (a) Aqidah: Keyakinan dasar tentang Allah, malaikat, kitab, rasul, hari akhir, dan takdir. (b) Akhlak: Prinsip-prinsip moral dan etika. (c) Amaliyah: Hukum-hukum praktis yang terbagi menjadi Ibadah (hubungan manusia dengan Allah) dan Muamalah (hubungan manusia dengan sesama)."] },
                ]
            },
            {
                type: 'list',
                title: '2. As-Sunnah: Penjelas dan Pelengkap Al-Qur\'an',
                items: [
                    { title: 'Definisi dan Otoritas', points: ["As-Sunnah (atau Hadits) adalah segala sesuatu yang disandarkan kepada Nabi Muhammad SAW, baik berupa perkataan (qauliyah), perbuatan (fi'liyah), maupun ketetapan atau persetujuan diam (taqririyah). Otoritas Sunnah sebagai sumber hukum kedua setelah Al-Qur'an didasarkan pada banyak ayat Al-Qur'an itu sendiri, seperti, 'Apa yang diberikan Rasul kepadamu, maka terimalah. Dan apa yang dilarangnya bagimu, maka tinggalkanlah.' (QS. Al-Hasyr: 7). Mentaati Rasul adalah bentuk ketaatan kepada Allah."] },
                    { title: 'Fungsi Sunnah terhadap Al-Qur\'an', points: ["Bayan at-Ta'kid: Menguatkan dan menegaskan kembali hukum yang sudah ada dalam Al-Qur'an. Contoh: Hadits tentang kewajiban shalat menguatkan ayat tentang shalat.", "Bayan at-Tafsir: Memberikan rincian dan penjelasan terhadap ayat-ayat Al-Qur'an yang bersifat global. Ini adalah fungsi terpenting. Contoh: Al-Qur'an memerintahkan shalat, sedangkan hadits menjelaskan jumlah rakaat, waktu, dan tata caranya.", "Bayan at-Tasyri': Menetapkan hukum baru yang tidak disebutkan secara eksplisit dalam Al-Qur'an, namun tetap sejalan dengan prinsip-prinsipnya. Contoh: Hadits tentang haramnya memakai emas dan sutra bagi laki-laki."] },
                ]
            },
            {
                type: 'list',
                title: '3. Ijma\' (Konsensus Ulama)',
                items: [
                    { title: 'Definisi dan Landasan', points: ["Ijma' adalah kesepakatan seluruh ulama mujtahid dari umat Islam pada suatu masa setelah wafatnya Nabi SAW atas suatu hukum syariat. Landasan otoritasnya adalah hadits Nabi, 'Umatku tidak akan bersepakat dalam kesesatan.' Ijma' berfungsi untuk memberikan kepastian hukum pada masalah-masalah yang tidak dijelaskan secara eksplisit dalam nash (Al-Qur'an dan Sunnah)."] },
                    { title: 'Jenis-jenis Ijma\'', points: ["Ijma' Sarih (Jelas): Ketika setiap mujtahid secara eksplisit menyatakan pendapatnya yang sama mengenai suatu hukum.", "Ijma' Sukuti (Diam): Ketika sebagian mujtahid mengemukakan pendapat tentang suatu hukum, dan pendapat tersebut tersebar luas di kalangan mujtahid lain tanpa ada seorang pun yang menyanggahnya. Status Ijma' Sukuti sebagai hujjah masih diperdebatkan, namun mayoritas ulama menerimanya."] },
                    { title: 'Contoh Ijma\'', points: ["Kesepakatan para sahabat untuk mengangkat Abu Bakar Ash-Shiddiq sebagai khalifah pertama.", "Kesepakatan untuk mengumpulkan Al-Qur'an dalam satu mushaf.", "Kesepakatan bahwa cucu laki-laki mendapatkan bagian warisan jika anak laki-laki (ayahnya) telah meninggal lebih dulu."] }
                ]
            },
            {
                type: 'list',
                title: '4. Qiyas (Analogi)',
                items: [
                    { title: 'Definisi dan Peran', points: ["Qiyas adalah menetapkan hukum suatu perkara baru yang belum ada nash-nya dengan cara membandingkannya dengan perkara lain yang sudah ada hukumnya berdasarkan nash, karena adanya persamaan 'illat (alasan atau sebab hukum). Qiyas adalah metode ijtihad yang paling penting dan paling sering digunakan untuk menjawab permasalahan kontemporer."] },
                    { title: 'Rukun-rukun Qiyas', points: [
                        "Al-Ashl (Pokok): Kasus yang hukumnya sudah ada dalam nash. Contoh: Khamr (arak).",
                        "Al-Far'u (Cabang): Kasus baru yang ingin dicari hukumnya. Contoh: Narkotika.",
                        "Hukm al-Ashl (Hukum Pokok): Hukum dari kasus pokok yang disebutkan dalam nash. Contoh: Haramnya meminum khamr.",
                        "Al-'Illat (Sebab Hukum): Sifat atau sebab yang menjadi dasar ditetapkannya hukum pada kasus pokok, dan sifat ini juga ada pada kasus cabang. Contoh: Sifat 'memabukkan' (iskar) pada khamr."
                    ] },
                    { title: 'Contoh Penerapan Qiyas', points: ["Dalam Al-Qur'an, hukum khamr adalah haram karena 'illat-nya adalah memabukkan. Narkotika (sebagai kasus baru/far'u) tidak disebutkan dalam nash. Namun, karena narkotika juga memiliki 'illat yang sama, yaitu 'memabukkan' dan menghilangkan kesadaran, maka hukumnya di-qiyas-kan dengan khamr, sehingga menjadi haram."] }
                ]
            },
        ]
    },
    {
        id: 'maqashid-syariah',
        title: 'Maqashid Asy-Syari\'ah',
        icon: 'fas fa-bullseye',
        subtitle: 'Tujuan-tujuan luhur di balik penetapan hukum Islam untuk kemaslahatan manusia.',
        content: [
            {
                type: 'paragraph',
                title: 'Pengantar: Filsafat di Balik Hukum Islam',
                text: `Maqashid Asy-Syari'ah secara harfiah berarti "tujuan-tujuan (ditetapkannya) syariat". Ini adalah sebuah disiplin ilmu fundamental yang mengkaji hikmah, tujuan, dan sasaran luhur di balik setiap hukum yang Allah tetapkan. Memahami Maqashid Syari'ah memungkinkan kita untuk melihat bahwa hukum Islam bukanlah serangkaian aturan yang kaku, arbitrer, dan tanpa makna, melainkan sebuah sistem yang dirancang dengan sangat bijaksana untuk mewujudkan kemaslahatan (jalb al-mashalih) dan menolak kemudharatan (dar' al-mafasid) bagi umat manusia di dunia dan di akhirat. Konsep ini dirumuskan secara sistematis oleh para ulama besar seperti Imam Al-Juwayni dan muridnya, Al-Ghazali, kemudian disempurnakan secara brilian oleh Imam Asy-Syatibi dalam karyanya "Al-Muwafaqat". Beliau menyimpulkan bahwa tujuan utama syariat adalah untuk memelihara lima hal pokok dalam kehidupan manusia, yang dikenal sebagai Ad-Dharuriyyat al-Khamsah (Lima Kemaslahatan Primer).`
            },
            {
                type: 'list',
                title: 'Lima Tujuan Pokok Syariat (Ad-Dharuriyyat al-Khamsah)',
                items: [
                    {
                        title: '1. Hifdz ad-Din (Menjaga Agama)',
                        points: ["Ini adalah tujuan tertinggi dan paling utama. Agama (Islam) adalah pedoman hidup yang menghubungkan manusia dengan Penciptanya dan memberikan kerangka moral bagi kehidupan. Syariat menjaga agama melalui dua cara:",
                                "Dari Sisi Wujud (Eksistensi): Dengan memerintahkan pilar-pilar dasar seperti Rukun Iman dan Rukun Islam (syahadat, shalat, zakat, puasa, haji). Perintah untuk berdakwah dan berjihad juga termasuk dalam upaya menjaga eksistensi agama.",
                                "Dari Sisi 'Adam (Peniadaan Ancaman): Dengan menetapkan hukuman bagi perbuatan yang dapat merusak kemurnian agama, seperti hukuman bagi orang murtad (apostasi), memerangi bid'ah, dan melarang praktik-praktik syirik. Tujuannya adalah untuk menjaga agar pondasi aqidah umat tetap kokoh dan murni."]
                    },
                    {
                        title: '2. Hifdz an-Nafs (Menjaga Jiwa)',
                        points: ["Kehidupan adalah anugerah terbesar kedua setelah iman. Islam sangat menghargai dan melindungi hak untuk hidup. Syariat menjaga jiwa melalui dua cara:",
                                "Dari Sisi Wujud: Dengan mensyariatkan pernikahan untuk regenerasi, serta perintah untuk makan, minum, dan mencari pengobatan untuk mempertahankan kehidupan.",
                                "Dari Sisi 'Adam: Dengan menetapkan larangan keras terhadap pembunuhan dan bunuh diri. Allah menetapkan hukuman qisas (balasan setimpal) bagi pembunuh sebagai bentuk keadilan dan efek jera yang sangat kuat untuk mencegah pertumpahan darah. 'Dan dalam qisas itu ada (jaminan) kehidupan bagimu, wahai orang-orang yang berakal.' (QS. Al-Baqarah: 179)."]
                    },
                    {
                        title: '3. Hifdz al-\'Aql (Menjaga Akal)',
                        points: ["Akal adalah anugerah yang membedakan manusia dari makhluk lain dan menjadi dasar bagi pembebanan hukum (taklif). Syariat menjaga akal melalui dua cara:",
                                "Dari Sisi Wujud: Dengan memerintahkan manusia untuk mencari ilmu (thalabul 'ilmi), berpikir (tafakkur), dan merenungkan (tadabbur) ayat-ayat Allah di alam semesta dan dalam Al-Qur'an. Islam adalah agama yang sangat rasional dan mendorong pengembangan intelektual.",
                                "Dari Sisi 'Adam: Dengan menetapkan larangan keras terhadap segala sesuatu yang dapat merusak atau melemahkan fungsi akal, terutama khamr (minuman keras) dan narkotika. Hukuman hadd bagi peminum khamr ditetapkan untuk memberikan efek jera dan melindungi kesehatan mental masyarakat."]
                    },
                    {
                        title: '4. Hifdz an-Nasl (Menjaga Keturunan)',
                        points: ["Keturunan yang jelas dan keluarga yang sah adalah fondasi dari masyarakat yang sehat. Syariat menjaga keturunan melalui dua cara:",
                                "Dari Sisi Wujud: Dengan mensyariatkan dan menganjurkan pernikahan sebagai satu-satunya lembaga yang sah untuk hubungan seksual dan prokreasi. Islam memberikan panduan lengkap tentang hak dan kewajiban suami-istri serta pendidikan anak.",
                                "Dari Sisi 'Adam: Dengan menetapkan larangan keras terhadap perzinaan dan segala bentuk pergaulan bebas yang mengarah kepadanya. Hukuman hadd bagi pezina (cambuk atau rajam) dan hukuman bagi penuduh zina tanpa bukti (qadzaf) ditetapkan untuk menjaga kehormatan, kesucian, dan kejelasan garis keturunan (nasab)."]
                    },
                    {
                        title: '5. Hifdz al-Mal (Menjaga Harta)',
                        points: ["Harta adalah sarana penopang kehidupan yang penting. Islam mengakui hak kepemilikan pribadi namun menekankan bahwa harta harus diperoleh dan digunakan dengan cara yang benar. Syariat menjaga harta melalui dua cara:",
                                "Dari Sisi Wujud: Dengan mendorong manusia untuk bekerja, berdagang, dan melakukan transaksi ekonomi yang sah (jual beli, sewa, kerjasama). Islam memberikan aturan yang jelas dalam fiqh muamalah untuk memastikan keadilan.",
                                "Dari Sisi 'Adam: Dengan menetapkan larangan keras terhadap cara-cara memperoleh harta secara batil, seperti mencuri, merampok, korupsi, menipu, dan melakukan transaksi riba (bunga) serta gharar (spekulasi). Hukuman hadd potong tangan bagi pencuri (dengan syarat yang sangat ketat) ditetapkan untuk melindungi hak milik dan keamanan ekonomi masyarakat."]
                    }
                ]
            },
        ]
    },
    {
        id: 'klasifikasi-hukum',
        title: 'Klasifikasi Hukum Islam',
        icon: 'fas fa-clipboard-list',
        subtitle: 'Memahami lima kategori hukum perbuatan: Wajib, Sunnah, Mubah, Makruh, dan Haram.',
        content: [
            {
                type: 'paragraph',
                title: 'Pengantar: Al-Ahkam Al-Khamsah',
                text: `Dalam fiqh Islam, setiap perbuatan seorang mukallaf (Muslim dewasa yang berakal sehat) tidak pernah lepas dari penilaian hukum. Para ulama ushul fiqh telah mengklasifikasikan status hukum dari setiap perbuatan ke dalam lima kategori utama, yang dikenal sebagai Al-Ahkam Al-Khamsah (Lima Hukum). Kelima kategori ini adalah Wajib, Mandub (Sunnah), Mubah, Makruh, dan Haram. Klasifikasi ini memberikan panduan yang sangat jelas bagi seorang Muslim untuk menavigasi kehidupannya, membedakan antara apa yang menjadi prioritas, apa yang dianjurkan, apa yang netral, apa yang sebaiknya dihindari, dan apa yang mutlak harus dijauhi. Memahami spektrum hukum ini adalah kunci untuk mencapai ketaatan yang seimbang dan optimal kepada Allah SWT.`
            },
            {
                type: 'list',
                title: '1. Wajib (Fardhu)',
                items: [
                    { title: 'Definisi', points: ["Wajib adalah suatu perintah yang harus dilaksanakan, yang didasarkan pada dalil yang qath'i (pasti dan tegas). Orang yang mengerjakannya akan mendapatkan pahala, dan orang yang meninggalkannya dengan sengaja tanpa uzur syar'i akan mendapatkan dosa."] },
                    { title: 'Pembagian Wajib', points: [
                        "Wajib 'Ain (Fardhu 'Ain): Kewajiban yang dibebankan kepada setiap individu Muslim yang telah memenuhi syarat. Kewajiban ini tidak bisa diwakilkan. Contoh: Shalat lima waktu, puasa Ramadhan, membayar zakat fitrah.",
                        "Wajib Kifayah (Fardhu Kifayah): Kewajiban yang dibebankan kepada komunitas Muslim secara kolektif. Jika sebagian dari mereka telah melaksanakannya sehingga tujuan dari kewajiban itu terpenuhi, maka gugurlah kewajiban (dan dosa) dari yang lainnya. Namun, jika tidak ada seorang pun yang melaksanakannya, maka seluruh komunitas di wilayah tersebut akan berdosa. Contoh: Mengurus jenazah (memandikan, mengkafani, menyalatkan, menguburkan), menuntut ilmu-ilmu spesialis yang dibutuhkan umat (seperti kedokteran atau teknik), amar ma'ruf nahi munkar."
                    ] },
                ]
            },
            {
                type: 'list',
                title: '2. Mandub (Sunnah/Mustahab)',
                items: [
                    { title: 'Definisi', points: ["Mandub (dianjurkan) adalah suatu perintah yang tidak bersifat mengikat. Orang yang mengerjakannya akan mendapatkan pahala, namun orang yang meninggalkannya tidak akan mendapatkan dosa. Amalan sunnah berfungsi sebagai penyempurna amalan wajib dan sebagai cara untuk meraih kecintaan Allah."] },
                    { title: 'Tingkatan Sunnah', points: [
                        "Sunnah Mu'akkadah (Sangat Dianjurkan): Amalan yang selalu atau hampir selalu dilakukan oleh Nabi Muhammad SAW dan jarang sekali ditinggalkannya. Meninggalkannya tanpa uzur dianggap tercela. Contoh: Shalat rawatib sebelum Subuh dan sesudah Dzuhur, Maghrib, Isya; shalat Idul Fitri dan Idul Adha; shalat tarawih.",
                        "Sunnah Ghairu Mu'akkadah (Dianjurkan): Amalan yang pernah dilakukan oleh Nabi Muhammad SAW, namun terkadang beliau juga meninggalkannya. Contoh: Shalat rawatib sebelum Ashar dan Isya; puasa Senin-Kamis; sedekah."
                    ] },
                ]
            },
            {
                type: 'list',
                title: '3. Mubah (Jaiz/Boleh)',
                items: [
                    { title: 'Definisi', points: ["Mubah adalah sesuatu yang hukum asalnya diperbolehkan oleh syariat. Tidak ada pahala bagi yang mengerjakannya dan tidak ada dosa bagi yang meninggalkannya. Ini adalah area netral yang memberikan keleluasaan bagi manusia."] },
                    { title: 'Catatan Penting', points: ["Meskipun asalnya netral, perbuatan mubah bisa bernilai pahala atau dosa tergantung pada niat yang menyertainya. Contoh: Makan adalah mubah. Jika makan dengan niat agar kuat beribadah, maka makannya menjadi berpahala. Sebaliknya, jika makan dengan niat untuk bermaksiat, maka makannya menjadi berdosa. Prinsip 'Al-Umuru bi Maqashidiha' (Segala urusan tergantung pada tujuannya) sangat berlaku di sini."] },
                    { title: 'Contoh Mubah', points: ["Makan, minum, tidur, bekerja, memilih jenis pakaian atau kendaraan (selama halal dan menutup aurat), rekreasi, dan berbagai aktivitas duniawi lainnya yang tidak ada dalil khusus yang memerintah atau melarangnya."] }
                ]
            },
            {
                type: 'list',
                title: '4. Makruh (Dibenci/Dianjurkan Ditinggalkan)',
                items: [
                    { title: 'Definisi', points: ["Makruh adalah suatu larangan yang tidak bersifat mengikat. Orang yang meninggalkannya karena Allah akan mendapatkan pahala, namun orang yang mengerjakannya tidak sampai berdosa, meskipun perbuatan itu dibenci oleh Allah."] },
                     { title: 'Pembagian Makruh', points: [
                        "Makruh Tanzihi: Lebih dekat kepada mubah (halal), namun lebih baik ditinggalkan. Contoh: Makan sambil berdiri, meniup makanan panas, berbicara saat di kamar mandi.",
                        "Makruh Tahrimi: Lebih dekat kepada haram, didasarkan pada dalil yang masih zhanni (tidak tegas). Sebagian ulama (terutama mazhab Hanafi) menganggapnya sebagai dosa kecil. Contoh: Memakai emas dalam jumlah kecil bagi laki-laki (selain cincin), merokok (menurut sebagian ulama)."
                     ]}
                ]
            },
            {
                type: 'list',
                title: '5. Haram (Muharram/Dilarang)',
                items: [
                    { title: 'Definisi', points: ["Haram adalah larangan yang bersifat pasti dan mengikat, yang didasarkan pada dalil yang qath'i (pasti dan tegas). Orang yang mengerjakannya akan mendapatkan dosa besar, dan orang yang meninggalkannya karena ketaatan kepada Allah akan mendapatkan pahala."] },
                    { title: 'Pembagian Haram', points: [
                        "Haram li-Dzatihi (Haram karena zatnya sendiri): Sesuatu yang sejak awal sudah diharamkan karena esensinya yang buruk. Contoh: Berzina, mencuri, meminum khamr, memakan daging babi, membunuh.",
                        "Haram li-Ghairihi (Haram karena faktor eksternal): Sesuatu yang hukum asalnya adalah mubah, namun menjadi haram karena ada faktor luar yang menyertainya. Contoh: Jual beli (asalnya mubah) menjadi haram jika dilakukan saat azan Jumat bagi laki-laki. Memberi hadiah (asalnya mubah) menjadi haram jika tujuannya adalah untuk menyuap (risywah)."
                    ] },
                ]
            }
        ]
    },
    {
        id: 'fiqh-jinayat',
        title: 'Fiqh Jinayat (Hukum Pidana)',
        icon: 'fas fa-gavel',
        subtitle: 'Pengantar prinsip-prinsip keadilan dan hukuman dalam syariat Islam.',
        content: [
            {
                type: 'paragraph',
                title: 'Pengantar dan Filosofi Fiqh Jinayat',
                text: `Fiqh Jinayat adalah cabang dari fiqh Islam yang secara khusus membahas tentang tindak pidana (jarimah) dan sanksi hukumannya ('uqubah). Tujuan utama dari hukum pidana Islam bukanlah semata-mata untuk menghukum, melainkan untuk mencapai tujuan-tujuan yang lebih luhur (Maqashid Syari'ah), yaitu: melindungi agama, jiwa, akal, keturunan, dan harta (Ad-Dharuriyyat al-Khamsah). Filosofinya berpusat pada tiga aspek: (1) Pencegahan (Zajr/Deterrence), di mana ancaman hukuman yang berat diharapkan dapat mencegah orang lain melakukan kejahatan serupa. (2) Pembalasan (Jaza'/Retribution), sebagai bentuk keadilan bagi korban dan masyarakat. (3) Perbaikan (Ishlah/Rehabilitation), di mana hukuman juga bertujuan untuk menyadarkan pelaku dan membersihkannya dari dosa. Salah satu prinsip fundamental dalam Fiqh Jinayat adalah "Idra'ul hudud bisy-syubuhat" (Hukuman hudud harus ditolak jika masih ada keraguan), yang menunjukkan betapa tingginya standar pembuktian yang disyaratkan dan betapa Islam sangat berhati-hati dalam menjatuhkan hukuman.`
            },
            {
                type: 'list',
                title: 'Klasifikasi Tindak Pidana dan Hukumannya',
                text: 'Dalam Fiqh Jinayat, hukuman diklasifikasikan menjadi tiga kategori utama berdasarkan jenis kejahatan dan sumber penetapan hukumannya.',
                items: [
                    {
                        title: '1. Jarimah Hudud (Kejahatan dengan Hukuman Tertentu)',
                        points: [
                            "Definisi: Hudud adalah hukuman yang jenis dan kadarnya telah ditetapkan secara pasti dalam Al-Qur'an atau Hadits Mutawatir. Hukuman ini dianggap sebagai hak Allah, sehingga tidak ada ruang bagi hakim, penguasa, atau bahkan korban untuk memberikan pengampunan atau mengubahnya setelah kasusnya sampai ke pengadilan dan terbukti tanpa keraguan sedikit pun.",
                            "Standar Pembuktian: Standar pembuktian untuk hudud sangatlah tinggi dan sulit dipenuhi, seringkali membutuhkan empat orang saksi mata yang adil yang melihat langsung perbuatan tersebut (untuk zina) atau pengakuan (iqrar) dari pelaku tanpa paksaan.",
                            "Jenis-Jenis Kejahatan Hudud:",
                            "  - Zina (Hubungan seksual di luar nikah): Hukumannya adalah cambuk 100 kali bagi yang belum menikah (ghairu muhshan) dan rajam bagi yang sudah atau pernah menikah (muhshan).",
                            "  - Qadzaf (Menuduh orang baik berzina tanpa bukti): Hukumannya adalah cambuk 80 kali.",
                            "  - Sariqah (Pencurian): Hukumannya adalah potong tangan, dengan syarat-syarat yang sangat ketat seperti barang yang dicuri mencapai nisab (batas nilai minimum), diambil dari tempat penyimpanan yang layak, dan tidak dalam kondisi kelaparan yang ekstrem.",
                            "  - Hirabah (Perampokan/Makar): Hukuman bervariasi tergantung tingkat kejahatan, mulai dari potong tangan dan kaki secara bersilang, dibunuh, hingga disalib.",
                            "  - Syurb al-Khamr (Meminum minuman keras): Hukumannya adalah cambuk, umumnya 40 atau 80 kali.",
                            "  - Riddah (Murtad): Hukuman mati, setelah melalui proses untuk diminta bertaubat."
                        ]
                    },
                    {
                        title: '2. Jarimah Qisas dan Diyat (Kejahatan Terhadap Jiwa dan Anggota Badan)',
                        points: [
                            "Definisi: Qisas adalah hukuman balasan yang setimpal atas kejahatan pembunuhan atau penganiayaan fisik. Ini dianggap sebagai hak individu (hak adami), yaitu hak korban atau keluarganya. Prinsipnya adalah 'jiwa dibalas jiwa, mata dibalas mata, hidung dibalas hidung...' (QS. Al-Maidah: 45).",
                            "Peran Keluarga Korban: Keluarga korban memiliki tiga pilihan: (a) Menuntut pelaksanaan qisas. (b) Memaafkan pelaku sepenuhnya. (c) Memaafkan pelaku dari qisas namun menuntut Diyat (uang tebusan atau 'blood money') sebagai kompensasi. Al-Qur'an sangat menganjurkan pilihan untuk memaafkan.",
                            "Diyat: Diyat adalah kompensasi finansial yang dibayarkan kepada keluarga korban sebagai pengganti qisas. Jumlahnya telah ditentukan oleh syariat. Untuk pembunuhan, diyat-nya adalah 100 ekor unta (atau nilainya dalam mata uang). Untuk luka atau cacat, diyat-nya bervariasi sesuai dengan tingkat keparahan."
                        ]
                    },
                    {
                        title: '3. Jarimah Ta\'zir (Kejahatan dengan Hukuman Diskresioner)',
                        points: [
                            "Definisi: Ta'zir adalah hukuman untuk semua tindak pidana yang tidak termasuk dalam kategori hudud atau qisas. Jenis dan kadar hukumannya tidak ditetapkan secara spesifik oleh nash, melainkan diserahkan sepenuhnya kepada kebijakan dan ijtihad hakim atau penguasa (ulil amri). Ini adalah kategori hukuman yang paling luas dan fleksibel dalam hukum Islam.",
                            "Tujuan Ta'zir: Tujuannya adalah untuk memberikan pelajaran kepada pelaku dan mencegahnya mengulangi perbuatannya, serta untuk menjaga ketertiban umum. Hukuman harus sepadan dengan tingkat kejahatan dan kondisi pelaku.",
                            "Bentuk Hukuman Ta'zir: Sanksinya sangat beragam, mulai dari yang paling ringan hingga yang paling berat. Contohnya: nasihat, teguran keras, pengumuman di depan publik, denda finansial, cambuk (dengan jumlah di bawah standar hudud), pengasingan, hingga hukuman penjara atau bahkan hukuman mati untuk kejahatan yang sangat berat dan merusak masyarakat (misalnya: pengedaran narkoba, spionase, korupsi besar-besaran) jika dianggap perlu oleh penguasa demi kemaslahatan umum."
                        ]
                    }
                ]
            },
        ]
    }
];
