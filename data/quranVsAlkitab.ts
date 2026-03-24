export interface QuranVsAlkitabTopic {
    id: string;
    title: string;
    icon: string;
    subtitle: string;
    content: {
        type: 'list' | 'paragraph';
        title?: string;
        items?: (string | { title: string; points: string[] })[];
        text?: string;
    }[];
    dalil?: {
        text: string;
        source: string;
    };
}

export const quranVsAlkitabData: QuranVsAlkitabTopic[] = [
    {
        id: 'pengantar',
        title: 'Pengantar Perbandingan',
        icon: 'fas fa-book-open',
        subtitle: 'Memahami posisi Al-Qur\'an sebagai pembenar dan penyempurna kitab-kitab sebelumnya.',
        content: [
             {
                type: 'paragraph',
                title: 'Akar yang Sama, Wahyu yang Final dan Terjaga',
                text: `Dalam kerangka teologi Islam, perbandingan antara Al-Qur'an dan Alkitab (yang terdiri dari Perjanjian Lama/Taurat dan Zabur, serta Perjanjian Baru/Injil) bukanlah sebuah upaya untuk mencari konflik, melainkan sebuah proses penegasan dan klarifikasi. Islam mengakui dan mewajibkan umatnya untuk beriman kepada kitab-kitab suci yang diturunkan oleh Allah SWT sebelum Al-Qur'an. Ini adalah bagian tak terpisahkan dari Rukun Iman. Al-Qur'an menyatakan dirinya sebagai wahyu yang datang untuk membenarkan (mushaddiq) prinsip-prinsip tauhid yang fundamental dalam kitab-kitab sebelumnya.

Namun, posisi Al-Qur'an tidak berhenti sebagai pembenar. Ia juga berfungsi sebagai 'muhaimin', yang berarti 'batu ujian', 'korektor', atau 'penjaga'. Konsep 'muhaimin' ini menyiratkan bahwa Al-Qur'an adalah standar final yang digunakan untuk mengukur, memvalidasi, dan mengoreksi isi dari kitab-kitab sebelumnya. Perspektif Islam meyakini bahwa seiring berjalannya waktu, teks-teks asli dari Taurat dan Injil telah mengalami 'tahrif'—sebuah istilah yang mencakup perubahan, distorsi, penambahan, pengurangan, atau salah tafsir yang dilakukan oleh tangan manusia. Perubahan ini bisa terjadi karena berbagai faktor, baik yang tidak disengaja (kesalahan penyalinan) maupun yang disengaja (kepentingan teologis atau politik).

Oleh karena itu, kajian perbandingan ini dilakukan dari perspektif Islam untuk:
1. Menunjukkan kesinambungan pesan tauhid yang dibawa oleh semua nabi.
2. Mengidentifikasi area-area di mana Al-Qur'an datang untuk mengoreksi dan meluruskan kembali ajaran-ajaran yang diyakini telah berubah dalam Alkitab.
3. Menegaskan klaim Al-Qur'an sebagai satu-satunya kitab suci yang teksnya terjaga secara sempurna (mutawatir) dalam bahasa aslinya, sesuai dengan janji Allah SWT.

Kajian ini akan dilakukan dengan pendekatan yang sistematis, membandingkan kedua kitab dari berbagai aspek—sejarah tekstual, konsep teologis, penggambaran para nabi, konsistensi internal, keselarasan dengan sains, hingga hukum dan etika—dengan tujuan untuk memberikan pemahaman yang jelas tentang perbedaan dan keunikan masing-masing, serta meneguhkan posisi Al-Qur'an sebagai wahyu ilahi yang final dan terpelihara.`
            },
        ],
        dalil: {
            text: "Dan Kami telah turunkan kepadamu Al-Qur'an dengan membawa kebenaran, membenarkan apa yang sebelumnya, yaitu kitab-kitab (yang diturunkan sebelumnya) dan batu ujian terhadap kitab-kitab yang lain itu...",
            source: 'QS. Al-Ma\'idah: 48'
        }
    },
    {
        id: 'sejarah-teks',
        title: 'Sejarah Teks & Kompilasi',
        icon: 'fas fa-scroll',
        subtitle: 'Perbandingan proses kodifikasi, transmisi, dan keaslian teks Al-Qur\'an dan Alkitab.',
        content: [
            {
                type: 'paragraph',
                title: 'Pendahuluan: Fondasi Klaim Keaslian',
                text: 'Salah satu perbedaan paling fundamental dan krusial antara Al-Qur\'an dan Alkitab terletak pada sejarah tekstualnya: bagaimana wahyu itu dicatat, dihafal, dikumpulkan, dan ditransmisikan dari generasi ke generasi. Proses ini sangat menentukan tingkat otentisitas dan klaim sebuah kitab suci sebagai firman Tuhan yang asli dan tidak berubah. Dalam hal ini, Al-Qur\'an dan Alkitab menunjukkan dua lintasan sejarah yang sangat berbeda.'
            },
            {
                type: 'list',
                title: 'Al-Qur\'an: Proses Penjagaan Ganda yang Sistematis',
                items: [
                    {
                        title: 'Pencatatan & Hafalan di Masa Nabi (Transmisi Paralel)',
                        points: [
                            "Setiap kali wahyu turun, Nabi Muhammad SAW segera menyampaikannya kepada para sahabat. Beliau juga langsung menghafalkannya. Proses hafalan ini tidak hanya dilakukan oleh Nabi, tetapi juga oleh ratusan, bahkan ribuan sahabat. Ini menciptakan sebuah tradisi transmisi lisan yang massal dan berkelanjutan (mutawatir), di mana mustahil bagi sejumlah besar orang dari berbagai latar belakang untuk bersekongkol melakukan kesalahan yang sama.",
                            "Secara paralel dengan hafalan, Nabi menunjuk para juru tulis wahyu (kuttabul wahy) seperti Zaid bin Tsabit, Ali bin Abi Thalib, dan lainnya, untuk segera menuliskannya di media yang tersedia (pelepah kurma, tulang, batu pipih). Nabi sendiri yang akan menginstruksikan di surah dan ayat mana tulisan itu harus diletakkan.",
                            "Setiap tahun di bulan Ramadhan, Nabi akan mengulang (muraja'ah) seluruh hafalan Al-Qur'an bersama Malaikat Jibril. Pada tahun terakhir hidupnya, beliau mengulangnya dua kali. Proses verifikasi ganda ini—hafalan massal dan pencatatan primer yang diawasi langsung oleh penerima wahyu—memastikan tidak ada perubahan atau kehilangan."
                        ]
                    },
                    {
                        title: 'Kompilasi Primer (Masa Abu Bakar)',
                        points: [
                            "Setelah banyak sahabat penghafal (huffaz) gugur dalam Perang Yamamah, Umar bin Khattab khawatir akan hilangnya Al-Qur'an. Ia mengusulkan kepada Khalifah Abu Bakar untuk mengumpulkannya dalam satu mushaf.",
                            "Abu Bakar menugaskan Zaid bin Tsabit, yang merupakan juru tulis utama dan salah satu penghafal terbaik. Zaid melakukan proses verifikasi yang sangat ketat: ia tidak menerima tulisan ayat pun kecuali jika ada dua saksi adil yang menyaksikan tulisan itu ditulis di hadapan Nabi, dan tulisan itu harus cocok dengan hafalan para sahabat senior. Ini adalah proses kompilasi yang sangat ilmiah dan hati-hati.",
                            "Hasilnya adalah sebuah mushaf induk yang lengkap, yang disimpan oleh Abu Bakar, kemudian Umar, dan terakhir oleh putrinya, Hafsah. Ini terjadi hanya sekitar dua tahun setelah wafatnya Nabi."
                        ]
                    },
                    {
                        title: 'Standardisasi Global (Masa Utsman)',
                        points: [
                            "Ketika Islam meluas ke wilayah non-Arab, muncul perbedaan dialek dalam membaca Al-Qur'an yang berpotensi menimbulkan perpecahan. Menyadari bahaya ini, Khalifah Utsman bin Affan membentuk sebuah panitia untuk menyalin ulang mushaf induk yang disimpan Hafsah ke dalam beberapa naskah standar dengan menggunakan dialek suku Quraisy (dialek di mana Al-Qur'an pertama kali diturunkan).",
                            "Mushaf standar ini, yang dikenal sebagai Mushaf Utsmani, kemudian digandakan dan dikirim ke pusat-pusat peradaban Islam seperti Makkah, Kufah, Basra, dan Damaskus. Semua naskah personal lainnya diperintahkan untuk dimusnahkan demi menjaga kesatuan teks. Tindakan ini memastikan bahwa seluruh dunia Islam, dari dulu hingga sekarang, membaca teks Al-Qur'an yang identik."
                        ]
                    }
                ]
            },
            {
                type: 'list',
                title: 'Alkitab: Sejarah Kompilasi yang Kompleks dan Berlapis',
                items: [
                    {
                        title: 'Penulis Anonim dan Rentang Waktu yang Panjang',
                        points: [
                            "Alkitab bukanlah satu buku, melainkan sebuah perpustakaan yang terdiri dari puluhan kitab (66 untuk kanon Protestan, 73 untuk Katolik) yang ditulis oleh banyak penulis berbeda, dalam rentang waktu lebih dari 1000 tahun.",
                            "Banyak dari kitab-kitab ini, terutama dalam Perjanjian Lama, ditulis oleh penulis yang tidak diketahui (anonim).",
                            "Injil (Perjanjian Baru) tidak ditulis oleh Yesus (Nabi Isa) sendiri, melainkan merupakan biografi teologis yang ditulis oleh para pengikutnya atau murid dari pengikutnya, puluhan tahun setelah Yesus diangkat ke langit. Injil Markus diperkirakan ditulis sekitar tahun 65-70 M, Matius dan Lukas sekitar 80-90 M, dan Yohanes sekitar 90-100 M. Adanya jeda waktu yang panjang ini membuka kemungkinan adanya perubahan dalam transmisi lisan."
                        ]
                    },
                    {
                        title: 'Proses Kanonisasi yang Selektif',
                        points: [
                            "Tidak semua tulisan Kristen awal dianggap sebagai kitab suci. Selama berabad-abad pertama, banyak sekali 'injil' dan 'surat' yang beredar di kalangan komunitas Kristen (misalnya, Injil Thomas, Injil Petrus, Surat Barnabas).",
                            "Daftar kitab-kitab yang dianggap 'terilhamkan' (kanon) baru ditetapkan secara resmi melalui serangkaian konsili gereja yang berlangsung berabad-abad setelah Yesus. Misalnya, Konsili Hippo (393 M) dan Kartago (397 M) adalah beberapa konsili penting yang menetapkan kanon Perjanjian Baru yang dikenal saat ini. Ini berarti proses penentuan kitab mana yang 'firman Tuhan' adalah sebuah keputusan komite gerejawi yang terjadi ratusan tahun setelah penulisannya."
                        ]
                    },
                    {
                        title: 'Ketiadaan Naskah Asli dan Varian Tekstual',
                        points: [
                            "Tidak ada satu pun naskah asli (autograf) dari semua kitab dalam Alkitab yang masih ada hingga kini. Yang ada hanyalah ribuan salinan manuskrip kuno yang dibuat oleh para penyalin.",
                            "Para sarjana kritik tekstual Alkitab (termasuk dari kalangan Kristen sendiri, seperti Bruce Metzger dan Bart Ehrman) mengakui bahwa tidak ada dua manuskrip Perjanjian Baru pun yang identik. Diperkirakan terdapat antara 200.000 hingga 400.000 perbedaan (varian tekstual) di antara manuskrip-manuskrip ini.",
                            "Meskipun banyak varian ini bersifat minor (salah eja, urutan kata), ada pula yang bersifat signifikan dan mengubah makna teologis. Contoh terkenal termasuk 'Comma Johanneum' (1 Yohanes 5:7-8) yang berisi doktrin Trinitas, yang diakui oleh mayoritas sarjana modern sebagai tambahan yang tidak ada dalam manuskrip-manuskrip paling awal. Contoh lain adalah akhir dari Injil Markus (Markus 16:9-20) yang juga tidak ditemukan dalam naskah-naskah tertua dan terbaik."
                        ]
                    }
                ]
            },
        ],
        dalil: {
            text: "'Sesungguhnya Kamilah yang menurunkan Al-Qur'an, dan sesungguhnya Kami benar-benar memeliharanya.'",
            source: 'QS. Al-Hijr: 9'
        }
    },
    {
        id: 'konsep-ketuhanan',
        title: 'Konsep Ketuhanan',
        icon: 'fas fa-star-and-crescent',
        subtitle: 'Perbedaan paling fundamental: Tauhid murni versus doktrin Trinitas.',
        content: [
            {
                type: 'paragraph',
                title: 'Pendahuluan: Jantung Perbedaan Teologis',
                text: 'Perbedaan paling fundamental dan tidak dapat dinegosiasikan antara Islam dan Kristen terletak pada konsep ketuhanan. Ini bukanlah perbedaan semantik atau perbedaan kecil dalam atribut, melainkan perbedaan yang mendasar tentang siapa dan apa itu Tuhan. Islam berdiri di atas fondasi monoteisme absolut (Tauhid), sementara Kekristenan (arus utama) dibangun di atas doktrin Trinitas.'
            },
            {
                type: 'list',
                items: [
                    {
                        title: 'Islam: Tauhid yang Murni dan Tak Terbagi (Monoteisme Absolut)',
                        points: [
                            "Inti dari seluruh ajaran Islam, dari Nabi Adam hingga Nabi Muhammad, adalah Tauhid—keyakinan akan keesaan mutlak Allah SWT. Konsep ini dirangkum dengan sempurna dalam Surah Al-Ikhlas, yang dianggap sebagai sepertiga Al-Qur'an karena keagungan maknanya.",
                            "Dalil Utama: 'Katakanlah (Muhammad), Dialah Allah, Yang Maha Esa (Ahad). Allah tempat meminta segala sesuatu (As-Shamad). (Allah) tidak beranak dan tidak pula diperanakkan. Dan tidak ada sesuatu yang setara (kufuwan) dengan Dia.' (QS. Al-Ikhlas: 1-4).",
                            "Penjelasan: Tauhid dalam Islam bersifat absolut dan tanpa kompromi. Allah adalah satu dalam Dzat-Nya, Sifat-Nya, dan Perbuatan-Nya. Dia tidak terdiri dari bagian-bagian, tidak memiliki partner, dan tidak berbagi sifat ketuhanan-Nya dengan siapapun. Dia adalah Sang Pencipta, sementara segala sesuatu selain-Nya adalah ciptaan (makhluk). Hubungan antara Pencipta dan ciptaan adalah hubungan penyembahan ('ibadah), bukan hubungan kekeluargaan (ayah-anak).",
                            "Konsekuensi: Karena keesaan-Nya yang absolut, maka hanya Allah yang berhak menerima segala bentuk ibadah—doa, cinta, takut, harap, tawakal, dan kurban. Menujukan sedikit pun dari ibadah ini kepada selain Allah (apakah itu nabi, malaikat, orang suci, atau benda mati) dianggap sebagai dosa terbesar yang tidak terampuni jika dibawa mati, yaitu syirik."
                        ]
                    },
                    {
                        title: 'Kristen: Doktrin Trinitas (Tuhan Tritunggal)',
                        points: [
                            "Mayoritas denominasi Kristen (Katolik, Protestan, Ortodoks) menganut doktrin Trinitas. Doktrin ini menyatakan bahwa Tuhan adalah satu dalam esensi (hakikat), namun ada dalam tiga pribadi (persona) yang setara dan abadi: Bapa, Putra (Yesus Kristus), dan Roh Kudus. Ketiganya bukanlah tiga tuhan, melainkan satu Tuhan. Doktrin ini sering diringkas sebagai 'satu Tuhan dalam tiga pribadi'.",
                            "Sejarah Perkembangan: Penting untuk dicatat bahwa kata 'Trinitas' tidak pernah ditemukan di dalam Alkitab. Doktrin ini tidak diajarkan secara eksplisit oleh Yesus, melainkan dirumuskan secara bertahap selama beberapa abad melalui perdebatan teologis yang sengit untuk memahami hubungan antara Yesus dan Tuhan Bapa. Rumusan formalnya baru ditetapkan secara resmi dalam Konsili Nicea pada tahun 325 M dan disempurnakan dalam Konsili Konstantinopel pada tahun 381 M, sebagai respons terhadap ajaran-ajaran yang dianggap sesat (seperti Arianisme, yang menyatakan Yesus adalah makhluk ciptaan).",
                            "Perspektif Islam terhadap Trinitas: Al-Qur'an dengan sangat tegas dan berulang kali menolak konsep Trinitas dan deifikasi Yesus. Dari sudut pandang Islam, doktrin ini adalah bentuk penyimpangan dari ajaran monoteisme murni yang dibawa oleh semua nabi, termasuk Nabi Isa (Yesus) sendiri. Islam memandang Trinitas sebagai bentuk ghuluw (sikap berlebih-lebihan) dalam menghormati seorang nabi hingga mengangkatnya ke status ketuhanan.",
                            "Dalil Penolakan Qur'an: 'Wahai Ahli Kitab! Janganlah kamu melampaui batas dalam agamamu, dan janganlah kamu mengatakan terhadap Allah kecuali yang benar. Sesungguhnya Al-Masih, Isa putra Maryam itu, adalah utusan Allah dan (yang diciptakan dengan) kalimat-Nya yang disampaikan-Nya kepada Maryam, dan (dengan tiupan) roh dari-Nya. Maka berimanlah kamu kepada Allah dan rasul-rasul-Nya dan janganlah kamu mengatakan, '(Tuhan itu) tiga,' berhentilah! (Itu) lebih baik bagimu. Sesungguhnya Allah Tuhan Yang Maha Esa, Mahasuci Dia dari (anggapan) mempunyai anak...' (QS. An-Nisa: 171)."
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'status-para-nabi',
        title: 'Status Para Nabi',
        icon: 'fas fa-user-check',
        subtitle: 'Perbedaan pandangan terhadap Nabi Isa (Yesus) dan nabi-nabi lainnya.',
        content: [
            {
                type: 'paragraph',
                title: 'Pendahuluan: Teladan Umat Manusia',
                text: 'Para nabi dan rasul adalah manusia-manusia pilihan yang diutus oleh Allah untuk membawa petunjuk. Baik Islam maupun Kristen-Yahudi menghormati banyak figur nabi yang sama. Namun, terdapat perbedaan yang sangat signifikan dalam cara kedua tradisi ini memandang status, sifat, dan penggambaran para utusan Tuhan tersebut.'
            },
            {
                type: 'list',
                title: 'Perbandingan Status Nabi Isa (Yesus)',
                items: [
                    {
                        title: 'Islam: Nabi Isa sebagai Rasul Ulul Azmi, Hamba Allah',
                        points: [
                            "Nabi Isa 'alaihissalam menempati posisi yang sangat mulia dan istimewa dalam Islam. Beliau adalah salah satu dari lima Rasul Ulul Azmi (rasul dengan keteguhan luar biasa).",
                            "Kelahirannya adalah mukjizat agung, diciptakan dari seorang perawan suci Maryam tanpa seorang ayah, sebagai tanda kekuasaan Allah (seperti penciptaan Adam tanpa ayah dan ibu).",
                            "Beliau adalah Al-Masih (Messiah), Kalimatullah (Firman dari Allah), dan Ruhun minhu (Ruh dari-Nya).",
                            "Beliau diberi Kitab Injil dan dianugerahi berbagai mukjizat (menghidupkan orang mati, menyembuhkan orang buta, dll) atas izin Allah, bukan karena kekuatan dirinya sendiri.",
                            "Namun, setinggi apapun kemuliaannya, beliau tetaplah seorang hamba dan utusan Allah ('abdullah wa rasuluh). Ia makan, minum, tidur, dan berdoa kepada satu-satunya Tuhan, yaitu Allah. Statusnya sebagai manusia dan hamba ini bahkan ditegaskan sendiri oleh Nabi Isa saat masih bayi (QS. Maryam: 30) dan akan ditegaskan kembali di hari kiamat (QS. Al-Ma'idah: 116-117)."
                        ]
                    },
                    {
                        title: 'Kristen: Yesus sebagai Putra Tuhan, Juru Selamat, dan Tuhan itu Sendiri',
                        points: [
                            "Kekristenan menempatkan Yesus sebagai figur sentral yang unik dan lebih dari sekadar nabi. Beliau adalah pribadi kedua dari Trinitas, yaitu Putra Tuhan, yang bersifat ilahi dan telah ada sejak kekal bersama Bapa.",
                            "Doktrin Inkarnasi menyatakan bahwa Putra Tuhan ini mengambil wujud manusia, lahir ke dunia untuk menjadi Juru Selamat.",
                            "Doktrin Penebusan Dosa menyatakan bahwa tujuan utama kedatangannya adalah untuk mati di kayu salib sebagai kurban penebusan dosa warisan yang diwariskan dari Adam kepada seluruh umat manusia. Setelah kematiannya, ia bangkit kembali pada hari ketiga, mengalahkan maut.",
                            "Perspektif Islam Terhadap Penyaliban: Al-Qur'an secara eksplisit menolak narasi penyaliban ini. Islam mengajarkan bahwa setiap jiwa bertanggung jawab atas dosanya sendiri (QS. An-Najm: 38-39), sehingga konsep dosa warisan dan penebusan tidak ada. Al-Qur'an menyatakan bahwa Nabi Isa tidak dibunuh atau disalib, melainkan diselamatkan oleh Allah dan diangkat ke langit dalam keadaan hidup.",
                            "Dalil Penolakan Penyaliban: '...dan karena ucapan mereka: 'Sesungguhnya kami telah membunuh Al-Masih, Isa putra Maryam, Rasul Allah', padahal mereka tidak membunuhnya dan tidak (pula) menyalibnya, tetapi (yang mereka bunuh ialah) orang yang diserupakan dengan Isa bagi mereka... mereka tidak (pula) yakin bahwa yang mereka bunuh itu adalah Isa. Tetapi (yang sebenarnya), Allah telah mengangkat Isa kepada-Nya.' (QS. An-Nisa: 157-158)."
                        ]
                    }
                ]
            },
            {
                type: 'list',
                title: 'Perbandingan Penggambaran Nabi Lainnya: Konsep Keterjagaan vs. Dosa Besar',
                 items: [
                    {
                        title: "Islam: Doktrin 'Ismah al-Anbiya' (Keterjagaan Para Nabi)",
                        points: [
                           "Islam meyakini doktrin 'Ismah, yaitu bahwa Allah menjaga (ma'shum) para nabi dan rasul-Nya dari melakukan dosa-dosa besar, dari melakukan hal-hal yang akan merendahkan martabat mereka, dan terutama dari kesalahan fatal dalam menyampaikan wahyu. Mereka mungkin melakukan kesalahan kecil (kekhilafan) yang bersifat manusiawi, namun mereka akan langsung ditegur oleh Allah dan segera bertaubat. Ini penting karena mereka adalah teladan moral tertinggi (uswatun hasanah) bagi umatnya. Bagaimana mungkin seorang utusan Tuhan yang mengajak kepada kebaikan justru melakukan perbuatan keji?"
                        ]
                    },
                    {
                        title: "Alkitab (Perjanjian Lama): Penggambaran Para Nabi Melakukan Dosa Besar",
                        points: [
                            "Berbeda secara drastis, Perjanjian Lama menggambarkan beberapa figur nabi besar melakukan dosa-dosa yang sangat serius, yang dalam Islam dianggap mustahil dilakukan oleh seorang nabi.",
                            "Nabi Nuh (Noah): Diceritakan mabuk anggur hingga telanjang di dalam kemahnya, dan kemudian dilihat oleh putranya (Kejadian 9:20-23).",
                            "Nabi Lut (Lot): Diceritakan mabuk dan melakukan hubungan inses (zina) dengan kedua putrinya sendiri di sebuah gua (Kejadian 19:30-38).",
                            "Nabi Daud (David): Diceritakan berzina dengan Batsyeba, istri dari perwiranya, Uria. Setelah Batsyeba hamil, Daud merencanakan agar Uria terbunuh di medan perang untuk menutupi perbuatannya (2 Samuel 11).",
                            "Nabi Sulaiman (Solomon): Diceritakan bahwa pada masa tuanya, istri-istri asingnya 'mencondongkan hatinya kepada allah-allah lain', dan ia mendirikan bukit-bukit pengorbanan untuk dewa-dewa sesembahan istri-istrinya, sebuah tindakan syirik (1 Raja-raja 11:1-8).",
                            "Perspektif Islam: Penggambaran seperti ini dianggap tidak sesuai dengan kemuliaan dan martabat seorang utusan Tuhan. Islam menghormati semua nabi ini sebagai hamba-hamba Allah yang mulia dan terjaga. Dari sudut pandang Islam, keberadaan narasi-narasi seperti ini di dalam Alkitab adalah salah satu bukti terkuat telah terjadinya tahrif (perubahan) pada teks, di mana narasi-narasi yang tidak pantas ini dimasukkan oleh tangan-tangan manusia di kemudian hari."
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'timeline-nabi',
        title: 'Timeline Kehidupan',
        icon: 'fas fa-stream',
        subtitle: 'Perbandingan kronologis kehidupan dua tokoh sentral dalam Islam dan Kristen.',
        content: [
            {
                type: 'paragraph',
                title: 'Pendahuluan: Dua Tokoh Sentral, Dua Narasi',
                text: 'Kajian ini membandingkan linimasa kehidupan Nabi Muhammad SAW dan Yesus Kristus (Nabi Isa A.S.) berdasarkan sumber-sumber historis dan teologis dari masing-masing tradisi. Tujuannya adalah untuk memberikan gambaran yang jelas dan sistematis tentang perjalanan hidup keduanya, menyoroti persamaan dan perbedaan dalam narasi mereka.'
            },
            {
                type: 'list',
                title: 'Tahap 1: Kelahiran & Masa Kecil',
                items: [
                    {
                        title: "Yesus Kristus (Nabi Isa A.S.)",
                        points: [
                            "Lahir: Diperkirakan sekitar 6-4 SM di Betlehem, Yudea.",
                            "Perspektif Kristen: Lahir dari Perawan Maria, dikandung oleh Roh Kudus. Kelahirannya ditandai dengan kedatangan para gembala dan orang-orang Majus dari Timur. (Injil Matius & Lukas).",
                            "Perspektif Islam: Lahir secara mukjizat dari perawan suci Maryam tanpa seorang ayah, sebagai tanda kekuasaan Allah. Mampu berbicara saat masih bayi untuk membela kesucian ibunya. (QS. Maryam: 27-33).",
                            "Masa Kecil: Relatif sedikit yang diketahui. Alkitab mencatat kunjungannya ke Bait Allah di Yerusalem pada usia 12 tahun (Lukas 2:41-52)."
                        ]
                    },
                    {
                        title: "Nabi Muhammad SAW",
                        points: [
                            "Lahir: Sekitar 570 M (dikenal sebagai Tahun Gajah) di Makkah.",
                            "Kondisi: Lahir dalam keadaan yatim, ayahnya (Abdullah) wafat sebelum kelahirannya.",
                            "Masa Kecil: Disusui dan diasuh di pedalaman oleh Halimah as-Sa'diyah. Ibunya (Aminah) wafat saat ia berusia 6 tahun. Diasuh oleh kakeknya (Abdul Muthalib), lalu pamannya (Abu Thalib). Mengalami peristiwa 'pembelahan dada'. Dikenal luas dengan gelar Al-Amin (Yang Terpercaya)."
                        ]
                    }
                ]
            },
            {
                type: 'list',
                title: 'Tahap 2: Permulaan Misi Kenabian / Pelayanan Publik',
                items: [
                    {
                        title: "Yesus Kristus (Nabi Isa A.S.)",
                        points: [
                            "Mulai Misi: Sekitar usia 30 tahun (sekitar 27-29 M).",
                            "Peristiwa Kunci: Dibaptis oleh Yohanes Pembaptis (Nabi Yahya A.S.) di Sungai Yordan.",
                            "Tujuan Misi: Berdakwah kepada Bani Israil untuk meluruskan ajaran Taurat, menyembuhkan orang sakit, dan mengabarkan Kerajaan Allah (menurut Kristen) / menegaskan Tauhid (menurut Islam). Misi berlangsung singkat, sekitar 3 tahun."
                        ]
                    },
                    {
                        title: "Nabi Muhammad SAW",
                        points: [
                            "Mulai Misi: Menerima wahyu pertama pada usia 40 tahun (sekitar 610 M) di Gua Hira.",
                            "Peristiwa Kunci: Diangkat menjadi Nabi dan Rasul, diperintahkan untuk menyampaikan risalah Al-Qur'an.",
                            "Tujuan Misi: Berdakwah kepada seluruh umat manusia, menyempurnakan ajaran nabi-nabi sebelumnya, dan mengeluarkan manusia dari kegelapan syirik menuju cahaya tauhid. Misi berlangsung selama 23 tahun."
                        ]
                    }
                ]
            },
            {
                type: 'list',
                title: 'Tahap 3: Akhir Kehidupan di Dunia',
                items: [
                    {
                        title: "Yesus Kristus (Nabi Isa A.S.)",
                        points: [
                            "Waktu: Diperkirakan sekitar 30-33 M, pada usia sekitar 33-36 tahun.",
                            "Perspektif Kristen (Penyaliban & Kebangkitan): Ditangkap, diadili oleh Pontius Pilatus, dan disalibkan di Yerusalem sebagai kurban penebusan dosa umat manusia. Wafat di kayu salib, dimakamkan, bangkit pada hari ketiga, menampakkan diri kepada murid-muridnya selama 40 hari, lalu naik ke surga.",
                            "Perspektif Islam (Pengangkatan): Tidak dibunuh dan tidak disalib. Ketika kaum Yahudi berkonspirasi untuk membunuhnya, Allah SWT menyelamatkannya dengan mengangkatnya (baik ruh maupun jasadnya) ke langit dalam keadaan hidup. Orang lain (diyakini Yudas Iskariot) diserupakan wajahnya seperti Isa dan dialah yang ditangkap dan disalib. Nabi Isa akan turun kembali ke bumi di akhir zaman."
                        ]
                    },
                    {
                        title: "Nabi Muhammad SAW",
                        points: [
                            "Waktu: Wafat pada 8 Juni 632 M (12 Rabiul Awal 11 H) di Madinah, pada usia 63 tahun.",
                            "Sebab: Jatuh sakit (demam) selama beberapa hari setelah melaksanakan Haji Wada' (Haji Perpisahan).",
                            "Peristiwa Akhir: Beliau wafat di kamar dan di pangkuan istrinya, Aisyah RA. Dimakamkan di tempat beliau wafat, yang kini berada di dalam kompleks Masjid Nabawi. Kepemimpinan umat dilanjutkan oleh sistem Khilafah, dimulai dengan Abu Bakar Ash-Shiddiq."
                        ]
                    }
                ]
            },
        ],
        dalil: {
            text: "(Ingatlah), ketika Allah berfirman: 'Hai Isa, sesungguhnya Aku akan menyampaikan kamu kepada akhir ajalmu dan mengangkat kamu kepada-Ku serta membersihkan kamu dari orang-orang yang kafir...'",
            source: 'QS. Ali \'Imran: 55'
        }
    },
    {
        id: 'konsistensi-ilmiah',
        title: 'Konsistensi Ilmiah',
        icon: 'fas fa-atom',
        subtitle: 'Analisis perbandingan isyarat-isyarat fenomena alam dalam kedua kitab.',
        content: [
            {
                type: 'paragraph',
                title: 'Pendahuluan: Wahyu dan Alam Semesta',
                text: "Al-Qur'an bukanlah buku teks sains, melainkan kitab petunjuk (hidayah) bagi umat manusia. Namun, karena ia berasal dari Pencipta alam semesta itu sendiri, maka mustahil isinya bertentangan dengan 'ayat-ayat' Allah yang terbentang di alam (ayat kauniyah). Di dalam Al-Qur'an, terdapat banyak sekali isyarat ilmiah mengenai berbagai fenomena alam yang secara menakjubkan selaras dengan penemuan sains modern. Keselarasan ini, yang diungkapkan 1400 tahun lalu, menjadi salah satu bukti kemukjizatan (i'jaz 'ilmi) Al-Qur'an. Perbandingan dengan narasi Alkitab dalam hal ini menunjukkan perbedaan pendekatan yang signifikan."
            },
            {
                type: 'list',
                title: 'Perbandingan dalam Berbagai Bidang Sains',
                items: [
                    {
                        title: 'Kosmologi (Penciptaan Alam Semesta)',
                        points: [
                            "Al-Qur'an: Menyatakan bahwa 'langit dan bumi keduanya dahulunya menyatu (ratqan), kemudian Kami pisahkan antara keduanya' (QS. Al-Anbiya: 30), sebuah deskripsi yang sangat paralel dengan teori Big Bang yang menyatakan alam semesta berasal dari satu titik singularitas. Al-Qur'an juga menyebutkan fase awal alam semesta sebagai 'asap' atau 'dukhan' (QS. Fussilat: 11), yang cocok dengan deskripsi kabut plasma primordial panas setelah Big Bang. Yang paling fenomenal, Al-Qur'an secara eksplisit menyatakan bahwa alam semesta terus 'meluas' ('la muusi\'uun' dalam QS. Adz-Dzariyat: 47), sebuah fakta yang baru ditemukan oleh Edwin Hubble pada abad ke-20.",
                            "Alkitab: Kitab Kejadian 1 mendeskripsikan penciptaan dalam enam 'hari'. Jika dipahami secara literal, urutan ini menimbulkan beberapa pertanyaan dari sudut pandang ilmiah. Misalnya, 'terang' (siang) dan 'gelap' (malam) diciptakan pada hari pertama, sementara sumber cahaya (matahari, bulan, bintang) baru diciptakan pada hari keempat. Tumbuhan diciptakan pada hari ketiga, sebelum adanya matahari. Alkitab juga menggambarkan adanya 'cakrawala' (firmament) yang memisahkan 'air yang di atas' dari 'air yang di bawah', yang sering ditafsirkan sebagai sebuah kubah padat di langit, sebuah model kosmologi kuno yang sudah tidak dianut sains modern."
                        ]
                    },
                    {
                        title: 'Embriologi (Penciptaan Manusia)',
                        points: [
                            "Al-Qur'an: Memberikan deskripsi tahapan perkembangan embrio yang sangat detail dan akurat dalam QS. Al-Mu'minun: 12-14. Tahapannya adalah: 'nutfah' (setetes cairan), kemudian menjadi ''alaqah' (sesuatu yang menempel seperti lintah atau segumpal darah), kemudian menjadi 'mudhghah' (segumpal daging seperti telah dikunyah), lalu dibentuk tulang, dan tulang itu dibungkus dengan daging. Istilah ''alaqah' sangat menakjubkan karena secara visual, embrio pada fase awal memang tampak seperti lintah dan 'menempel' pada dinding rahim. Deskripsi ini baru dapat diverifikasi dengan mikroskop ribuan tahun kemudian.",
                            "Alkitab: Mazmur 139:13-16 menggambarkan Tuhan 'menenun' manusia di dalam kandungan, sebuah metafora yang indah. Namun, tidak ada deskripsi tahapan biologis yang terperinci seperti yang ditemukan dalam Al-Qur'an. Kitab Ayub 10:10-11 juga menyebutkan proses 'dituangkan seperti susu' dan 'dibentuk seperti keju', sebuah gambaran puitis tentang pembentukan janin."
                        ]
                    },
                    {
                        title: 'Geologi (Fungsi Gunung)',
                        points: [
                            "Al-Qur'an: Secara konsisten menggambarkan gunung sebagai 'pasak' (awtad) (QS. An-Naba: 7) dan menyatakan fungsinya adalah agar 'bumi tidak berguncang' bersama manusia (QS. Al-Anbiya: 31). Ilmu geologi modern, dengan teori lempeng tektonik, telah membuktikan bahwa gunung memang memiliki 'akar' (mountain roots) yang menghunjam jauh ke dalam mantel bumi, yang berfungsi menstabilkan lempeng-lempeng tektonik, persis seperti fungsi pasak pada sebuah tenda.",
                            "Alkitab: Gunung umumnya disebut sebagai fitur geografis yang tinggi, tempat-tempat suci untuk bertemu Tuhan (seperti Gunung Sinai), atau sebagai simbol kekuatan dan keabadian, tanpa ada penjelasan mengenai fungsi geologisnya untuk menstabilkan bumi."
                        ]
                    },
                    {
                        title: 'Oceanografi (Pertemuan Dua Lautan)',
                        points: [
                            "Al-Qur'an: Mendeskripsikan fenomena 'pertemuan dua lautan' (air tawar dan air asin) yang 'di antara keduanya ada batas (barzakh) yang tidak dilampaui oleh masing-masing' (QS. Ar-Rahman: 19-20). Ilmu oseanografi modern telah menemukan fenomena halocline di muara-muara sungai, di mana air tawar dan air asin bertemu tetapi tidak langsung bercampur karena perbedaan massa jenis, salinitas, dan suhu, menciptakan sebuah 'dinding' tak terlihat.",
                            "Alkitab: Tidak terdapat deskripsi fenomena oseanografi spesifik seperti ini."
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'konsistensi-internal',
        title: 'Konsistensi Internal & Nubuat',
        icon: 'fas fa-link',
        subtitle: 'Kajian mengenai keharmonisan internal teks dan pemenuhan nubuat (ramalan).',
        content: [
            {
                type: 'list',
                title: 'Konsistensi Internal Teks',
                items: [
                     {
                        title: "Al-Qur'an: Tantangan untuk Menemukan Kontradiksi",
                        points: [
                            "Al-Qur'an sendiri secara unik menantang para pengkritiknya untuk menemukan pertentangan di dalamnya, sebagai bukti bahwa ia berasal dari Allah: 'Maka tidakkah mereka menghayati (mengkaji) Al-Qur'an? Sekiranya (Al-Qur'an) itu bukan dari sisi Allah, pastilah mereka menemukan pertentangan yang banyak di dalamnya.' (QS. An-Nisa: 82).",
                            "Meskipun diturunkan secara berangsur-angsur selama 23 tahun dalam berbagai konteks sosial, politik, dan spiritual yang berbeda, Al-Qur'an menunjukkan keharmonisan internal yang luar biasa. Ajarannya konsisten dari awal hingga akhir, ceritanya saling melengkapi, dan hukum-hukumnya membentuk sebuah sistem yang koheren. Apa yang mungkin tampak sebagai 'kontradiksi' oleh sebagian kritikus seringkali dapat dijelaskan melalui ilmu-ilmu Al-Qur'an seperti 'Nasikh wa Mansukh' (ayat yang menghapus dan dihapus), yang menunjukkan adanya pentahapan hukum, bukan kontradiksi."
                        ]
                    },
                     {
                        title: "Alkitab: Tantangan Kritik Tekstual",
                        points: [
                            "Banyak sarjana Alkitab (termasuk dari kalangan Kristen liberal) mengakui adanya kesulitan dan apa yang tampak sebagai kontradiksi atau perbedaan narasi di dalam Alkitab. Ini dianggap wajar mengingat sifatnya sebagai kompilasi dari banyak penulis yang berbeda dari zaman yang berbeda dengan agenda teologis yang berbeda pula.",
                            "Contoh yang sering diperdebatkan:",
                            " - **Dua Kisah Penciptaan:** Kejadian 1 dan Kejadian 2 menyajikan dua narasi penciptaan yang berbeda dalam urutan dan gayanya.",
                            " - **Silsilah Yesus:** Injil Matius dan Injil Lukas memberikan dua silsilah yang sangat berbeda untuk Yesus dari Daud hingga Yusuf.",
                            " - **Kematian Yudas:** Matius 27:5 mengatakan Yudas 'menggantung diri', sementara Kisah Para Rasul 1:18 mengatakan ia 'jatuh tertelungkup, perutnya terbelah sehingga semua isi perutnya tertumpah keluar'.",
                            " - **Perkataan Terakhir Yesus di Kayu Salib:** Setiap Injil (Matius, Markus, Lukas, Yohanes) mencatat perkataan terakhir yang berbeda-beda.",
                            "Dari perspektif Islam, adanya inkonsistensi ini adalah salah satu indikasi dari 'tahrif' atau campur tangan manusia dalam proses transmisi teks."
                        ]
                    }
                ]
            },
            {
                type: 'list',
                title: 'Nubuat tentang Nabi Muhammad SAW dalam Alkitab (Perspektif Islam)',
                items: [
                    {
                        title: "Dasar Keyakinan Islam",
                        points: [
                            "Islam meyakini bahwa kedatangan Nabi Muhammad SAW, sebagai nabi terakhir, telah dinubuatkan (diramalkan) dalam kitab-kitab suci sebelumnya, termasuk Taurat dan Injil, dalam versi aslinya yang belum diubah.",
                            "Dalil Qur'an: '(Yaitu) orang-orang yang mengikuti Rasul, Nabi yang ummi (tidak bisa baca tulis) yang (namanya) mereka dapati tertulis di dalam Taurat dan Injil yang ada di sisi mereka...' (QS. Al-A'raf: 157)."
                        ]
                    },
                    {
                        title: "Contoh Ayat-ayat yang Dipercaya sebagai Nubuat",
                        points: [
                            "**Ulangan 18:18 (Perjanjian Lama/Taurat):** Tuhan berfirman kepada Musa, 'seorang nabi akan Kubangkitkan bagi mereka dari antara saudara mereka, seperti engkau ini; Aku akan menaruh firman-Ku dalam mulutnya, dan ia akan mengatakan kepada mereka segala yang Kuperintahkan kepadanya.'",
                            "   - **Penafsiran Islam:** 'Saudara mereka' merujuk pada Bani Ismail (bangsa Arab), yang merupakan 'saudara' dari Bani Israil (keturunan Ya'qub/Israil, saudara Ismail). Nabi Muhammad adalah keturunan Ismail. 'Seperti engkau ini' merujuk pada kesamaan antara Musa dan Muhammad: keduanya membawa syariat hukum yang baru, keduanya adalah pemimpin politik dan militer, keduanya menikah dan wafat secara wajar (berbeda dengan Yesus menurut Kristen). 'Menaruh firman-Ku dalam mulutnya' merujuk pada kondisi Nabi Muhammad yang ummi (buta huruf), di mana beliau hanya mengucapkan wahyu yang 'ditaruh' di mulutnya oleh Jibril.",
                            "**Kidung Agung 5:16 (Perjanjian Lama):** '...kollo machamadim, zeh dodi, vezeh re'i...'",
                            "   - **Penafsiran Islam:** Ayat ini dalam bahasa Ibrani asli memuat kata 'machamadim' (מַחֲמַדִּים). Kata 'machamad' berarti 'yang terkasih', 'yang terpuji', atau 'yang diinginkan'. Akhiran '-im' adalah bentuk jamak dalam Ibrani yang sering digunakan untuk penghormatan (pluralis majestatis), seperti kata 'Elohim' untuk Tuhan. Umat Muslim memandang ini sebagai penyebutan nama 'Muhammad' secara eksplisit dengan penuh penghormatan.",
                            "**Yohanes 14:16, 15:26, 16:7 (Perjanjian Baru/Injil):** Yesus berkata, 'Aku akan minta kepada Bapa, dan Ia akan memberikan kepadamu seorang Penolong yang lain, supaya Ia menyertai kamu selama-lamanya.'",
                            "   - **Penafsiran Islam:** Kata 'Penolong' dalam bahasa Yunani asli adalah 'Parakletos' (Paraclete). Kata ini dapat berarti 'Penghibur', 'Pembela', atau 'Yang Dipanggil ke Sisi Seseorang'. Para sarjana Muslim berpendapat bahwa kata ini adalah terjemahan dari kata Aramaik (bahasa Yesus) 'Mawhamana' atau 'Munhamanna', yang berarti 'Yang Terpuji', yang merupakan arti dari nama 'Ahmad'—salah satu nama Nabi Muhammad yang juga disebutkan dalam Al-Qur'an (QS. Ash-Shaff: 6). Dengan demikian, Yesus menubuatkan kedatangan seorang nabi setelahnya yang bernama Ahmad/Muhammad."
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'hukum-etika',
        title: 'Hukum & Etika',
        icon: 'fas fa-gavel',
        subtitle: 'Perbandingan dalam hukum makanan, pidana, dan sosial.',
        content: [
            {
                type: 'paragraph',
                title: 'Pendahuluan: Pedoman Hidup',
                text: 'Hukum dan etika adalah aspek praktis dari sebuah agama yang mengatur bagaimana seorang penganut harus menjalani hidupnya. Perbandingan antara syariat Islam dan hukum-hukum dalam Alkitab menunjukkan adanya kesinambungan, tetapi juga perubahan dan penyempurnaan yang signifikan.'
            },
            {
                type: 'list',
                title: 'Perbandingan dalam Berbagai Aspek Hukum',
                items: [
                    {
                        title: 'Hukum Makanan (Dietary Laws)',
                        points: [
                            "Islam: Memiliki aturan diet yang jelas yang disebut halal dan haram. Makanan yang diharamkan secara mutlak mencakup babi, darah, bangkai (hewan yang mati tidak disembelih secara syar'i), dan khamr (segala sesuatu yang memabukkan, termasuk alkohol). Hewan halal harus disembelih dengan menyebut nama Allah.",
                            "Alkitab (Perjanjian Lama): Hukum Taurat (Imamat 11) memuat aturan makanan yang sangat ketat yang dikenal sebagai Kashrut (Kosher) dalam Yudaisme. Aturan ini juga melarang babi, hewan tanpa kuku terbelah, dan makhluk laut tanpa sisik atau sirip.",
                            "Alkitab (Perjanjian Baru): Mayoritas aliran Kristen modern meyakini bahwa hukum makanan Perjanjian Lama telah dihapuskan. Ini didasarkan pada ajaran Paulus (misalnya, Roma 14:14, 'Aku tahu dan yakin dalam Tuhan Yesus, bahwa tidak ada sesuatu yang najis dari dirinya sendiri') dan penglihatan Petrus (Kisah Para Rasul 10). Prinsip utamanya adalah 'Bukan yang masuk ke dalam mulut yang menajiskan orang, melainkan yang keluar dari mulut' (Matius 15:11). Islam memandang penghapusan larangan yang jelas (seperti babi) ini sebagai salah satu bentuk perubahan (tahrif) terhadap ajaran asli."
                        ]
                    },
                    {
                        title: 'Alkohol (Khamr)',
                        points: [
                            "Islam: Melarang khamr (segala yang memabukkan) secara total dan tanpa kecuali, baik sedikit maupun banyak, dan menganggapnya sebagai 'induk dari segala kejahatan' (ummul khabaits).",
                            "Alkitab: Memiliki pandangan yang ambigu. Di satu sisi, Perjanjian Lama memperingatkan bahaya mabuk (Amsal 20:1). Di sisi lain, anggur (wine) adalah bagian integral dari banyak ritual keagamaan (Perjamuan Kudus) dan sering disebut dalam konteks positif. Yesus sendiri, dalam mukjizat pertamanya, mengubah air menjadi anggur berkualitas tinggi (Yohanes 2)."
                        ]
                    },
                    {
                        title: 'Hukum Pidana (Criminal Law)',
                        points: [
                            "Islam: Memiliki sistem hukum pidana yang terstruktur (Hudud, Qisas, Ta'zir) yang bertujuan untuk keadilan retributif dan efek jera demi menjaga kemaslahatan masyarakat (Maqashid Syariah).",
                            "Alkitab (Perjanjian Lama): Menetapkan hukum pembalasan setimpal, 'mata ganti mata, gigi ganti gigi' (Lex Talionis), seperti dalam Keluaran 21:24.",
                            "Alkitab (Perjanjian Baru): Yesus, dalam Khotbah di Bukit, mengajarkan etika yang lebih tinggi yang melampaui hukum pembalasan, yaitu etika pengampunan dan kasih. 'Janganlah kamu melawan orang yang berbuat jahat kepadamu, melainkan siapa pun yang menampar pipi kananmu, berilah juga kepadanya pipi kirimu' (Matius 5:39). Pandangan Kristen umumnya melihat ini sebagai penyempurnaan spiritual atas hukum Taurat."
                        ]
                    },
                    {
                        title: 'Hukum Keluarga (Pernikahan & Perceraian)',
                        points: [
                            "Islam: Mengatur pernikahan, talak (perceraian), dan waris secara sangat rinci. Poligami diizinkan dengan syarat-syarat yang sangat ketat, terutama kemampuan untuk berbuat adil, dan dibatasi maksimal empat istri. Perceraian, meskipun dibenci, diizinkan sebagai solusi terakhir jika keharmonisan tidak dapat dicapai.",
                            "Alkitab: Perjanjian Lama mencatat praktik poligami oleh banyak nabi dan raja (misalnya Abraham, Yakub, Daud, Sulaiman) tanpa ada batasan jumlah yang jelas. Perjanjian Baru umumnya menganjurkan monogami, meskipun tidak ada larangan eksplisit terhadap poligami. Mengenai perceraian, Yesus mengambil sikap yang sangat keras, menyatakan bahwa siapa pun yang menceraikan istrinya (kecuali karena perzinaan) dan menikah lagi, ia berbuat zina (Matius 19:9)."
                        ]
                    },
                     {
                        title: 'Bunga Uang (Riba)',
                        points: [
                            "Islam: Melarang segala bentuk riba (bunga atau tambahan atas pinjaman) secara mutlak, baik kepada sesama Muslim maupun non-Muslim, dan menganggapnya sebagai salah satu dosa besar yang diperangi oleh Allah dan Rasul-Nya.",
                            "Alkitab: Perjanjian Lama juga melarang pengambilan bunga (interest), tetapi larangan ini sering ditafsirkan hanya berlaku untuk pinjaman kepada 'saudara' (sesama Israel), bukan kepada 'orang asing' (Ulangan 23:19-20). Perjanjian Baru tidak membahas bunga secara ekstensif, namun menekankan pada prinsip kemurahan hati dan memberi pinjaman tanpa mengharapkan imbalan (Lukas 6:35)."
                        ]
                    }
                ]
            }
        ]
    }
]
