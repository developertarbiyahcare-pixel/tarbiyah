
export interface TauhidTopic {
    id: string;
    title: string;
    icon: string;
    subtitle: string;
    content: {
        type: 'list' | 'paragraph' | 'table';
        title?: string;
        items?: string[];
        text?: string;
        table?: {
            headers: string[];
            rows: string[][];
        };
    }[];
    dalil: {
        text: string;
        source: string;
    };
}

export const tauhidData: TauhidTopic[] = [
    {
        id: 'iman',
        title: 'Rukun Iman',
        icon: 'fas fa-shield-heart',
        subtitle: 'Enam pilar keyakinan yang menjadi fondasi aqidah seorang Muslim.',
        content: [
            {
                type: 'paragraph',
                text: 'Rukun Iman adalah enam perkara pokok dalam aqidah Islam yang wajib diimani oleh setiap Muslim. Keimanan terhadap keenam rukun ini merupakan dasar dari seluruh amal dan ibadah.'
            },
            {
                type: 'list',
                title: 'Keenam Rukun Iman adalah:',
                items: [
                    "Iman kepada Allah: Meyakini keberadaan Allah, keesaan-Nya (Tauhid), sifat-sifat kesempurnaan-Nya, serta meyakini bahwa hanya Dia yang berhak disembah.",
                    "Iman kepada Malaikat-Malaikat Allah: Meyakini keberadaan malaikat sebagai makhluk gaib yang diciptakan dari cahaya, selalu taat kepada Allah, dan memiliki tugas-tugas tertentu.",
                    "Iman kepada Kitab-Kitab Allah: Meyakini bahwa Allah telah menurunkan kitab-kitab suci kepada para Rasul-Nya sebagai petunjuk bagi umat manusia, seperti Taurat, Zabur, Injil, dan Al-Qur'an sebagai kitab terakhir dan penyempurna.",
                    "Iman kepada Rasul-Rasul Allah: Meyakini bahwa Allah telah mengutus para rasul untuk menyampaikan risalah-Nya, dimulai dari Nabi Adam hingga Nabi Muhammad SAW sebagai penutup para nabi.",
                    "Iman kepada Hari Akhir (Kiamat): Meyakini akan adanya hari kiamat, kebangkitan dari kubur, hisab (perhitungan amal), surga, dan neraka.",
                    "Iman kepada Qada dan Qadar: Meyakini bahwa segala sesuatu yang terjadi di alam semesta ini adalah atas ketetapan dan takdir Allah, baik yang tampak baik maupun buruk bagi manusia."
                ]
            }
        ],
        dalil: {
            text: '"...Akan tetapi sesungguhnya kebajikan itu ialah beriman kepada Allah, hari kemudian, malaikat-malaikat, kitab-kitab, nabi-nabi..."',
            source: 'QS. Al-Baqarah: 177'
        }
    },
    {
        id: 'islam',
        title: 'Rukun Islam',
        icon: 'fas fa-kaaba',
        subtitle: 'Lima pilar amalan lahiriah yang menjadi penopang bangunan keislaman seseorang.',
        content: [
            {
                type: 'paragraph',
                text: 'Rukun Islam adalah lima tindakan atau amalan dasar dalam Islam, yang dianggap sebagai fondasi wajib bagi orang-orang beriman. Kelima rukun ini merupakan bukti ketundukan dan ketaatan seorang hamba kepada Allah secara fisik.'
            },
            {
                type: 'list',
                title: 'Kelima Rukun Islam adalah:',
                items: [
                    "Mengucapkan Dua Kalimat Syahadat: Bersaksi bahwa tidak ada Tuhan selain Allah, dan bersaksi bahwa Muhammad adalah utusan Allah. Ini adalah pintu gerbang masuk ke dalam Islam.",
                    "Mendirikan Shalat: Menunaikan shalat lima waktu sehari semalam. Shalat adalah tiang agama dan sarana komunikasi langsung antara hamba dengan Rabb-nya.",
                    "Menunaikan Zakat: Mengeluarkan sebagian harta yang telah mencapai nisab (batas minimum) dan haul (satu tahun kepemilikan) untuk diberikan kepada yang berhak menerimanya.",
                    "Berpuasa di Bulan Ramadhan: Menahan diri dari makan, minum, dan hal-hal yang membatalkan puasa dari terbit fajar hingga terbenam matahari selama bulan Ramadhan.",
                    "Menunaikan Ibadah Haji ke Baitullah: Melaksanakan ibadah haji ke Makkah bagi mereka yang mampu secara fisik, finansial, dan keamanan."
                ]
            }
        ],
        dalil: {
            text: '"Islam dibangun di atas lima perkara: bersaksi bahwa tidak ada Tuhan selain Allah dan bahwa Muhammad adalah utusan Allah, mendirikan shalat, menunaikan zakat, haji ke Baitullah, dan puasa Ramadhan."',
            source: 'HR. Bukhari dan Muslim'
        }
    },
    {
        id: 'syahadat',
        title: 'Dua Kalimat Syahadat',
        icon: 'fas fa-file-contract',
        subtitle: 'Pilar Utama Keislaman',
        content: [
            {
                type: 'paragraph',
                text: "Dua Kalimat Syahadat adalah pintu gerbang menuju Islam dan fondasi dari seluruh bangunan aqidah. Kalimat ini terdiri dari dua persaksian yang tak terpisahkan.\n\n**Persaksian Pertama: *'Asyhadu an la ilaha illallah'* (Aku bersaksi bahwa tidak ada Tuhan selain Allah).** Ini adalah Syahadat Tauhid, sebuah ikrar yang mengandung penolakan (nafi) dan penetapan (itsbat). Bagian *'La ilaha'* menolak segala bentuk sesembahan, tuhan-tuhan palsu, dan segala sesuatu yang dipertuhankan selain Allah, baik itu berhala, hawa nafsu, maupun materi. Bagian *'illallah'* menetapkan bahwa satu-satunya yang berhak disembah dengan segala bentuk ibadah (doa, cinta, takut, harap, tawakal) hanyalah Allah SWT semata. Ini adalah esensi dari tauhid uluhiyah, yaitu mengesakan Allah dalam peribadatan.\n\n**Persaksian Kedua: *'Wa asyhadu anna Muhammadan Rasulullah'* (Dan aku bersaksi bahwa Muhammad adalah utusan Allah).** Ini adalah Syahadat Rasul, pengakuan bahwa Nabi Muhammad SAW adalah hamba dan utusan-Nya yang membawa risalah terakhir. Konsekuensi dari persaksian ini adalah: membenarkan semua berita yang beliau sampaikan, mentaati semua perintahnya, menjauhi semua larangannya, dan beribadah kepada Allah hanya sesuai dengan syariat yang beliau ajarkan. Syahadat ini memastikan bahwa cara kita beribadah kepada Allah adalah benar dan sesuai dengan apa yang Allah ridhai.\n\nMengucapkan kedua kalimat ini dengan penuh keyakinan, pemahaman, dan keikhlasan adalah syarat mutlak bagi seseorang untuk menjadi seorang Muslim. Ia adalah ikrar yang memisahkan antara keimanan dan kekufuran, serta janji setia seorang hamba kepada Rabb-nya dan Rasul-Nya."
            }
        ],
        dalil: {
            text: '"Tidaklah pantas bagi Nabi dan orang-orang yang beriman memohonkan ampunan (kepada Allah) bagi orang-orang musyrik, sekalipun orang-orang itu kaum kerabat(nya), setelah jelas bagi mereka, bahwa orang-orang musyrik itu adalah penghuni neraka Jahanam."',
            source: 'QS. At-Taubah: 113'
        }
    },
    {
        id: 'sifat',
        title: 'Sifat Wajib bagi Allah',
        icon: 'fas fa-infinity',
        subtitle: 'Sifat-sifat kesempurnaan yang wajib ada pada Dzat Allah SWT.',
        content: [
            {
                type: 'paragraph',
                text: 'Mengenal sifat-sifat Allah adalah bagian penting dari Tauhid. Sifat Wajib adalah sifat-sifat yang pasti dimiliki oleh Allah, yang menunjukkan kesempurnaan-Nya. Para ulama merumuskan 20 sifat wajib yang perlu diketahui oleh setiap Muslim.'
            },
            {
                type: 'list',
                title: '20 Sifat Wajib bagi Allah:',
                items: [
                    "Wujud (Ada)", "Qidam (Terdahulu)", "Baqa' (Kekal)", "Mukhalafatu lil Hawaditsi (Berbeda dengan Makhluk)", "Qiyamuhu bi Nafsihi (Berdiri Sendiri)",
                    "Wahdaniyah (Esa/Tunggal)", "Qudrat (Berkuasa)", "Iradat (Berkehendak)", "Ilmu (Mengetahui)", "Hayat (Hidup)",
                    "Sama' (Mendengar)", "Bashar (Melihat)", "Kalam (Berfirman)", "Kaunuhu Qadiran (Keadaan-Nya yang Berkuasa)", "Kaunuhu Muridan (Keadaan-Nya yang Berkehendak)",
                    "Kaunuhu 'Aliman (Keadaan-Nya yang Mengetahui)", "Kaunuhu Hayyan (Keadaan-Nya yang Hidup)", "Kaunuhu Sami'an (Keadaan-Nya yang Mendengar)", "Kaunuhu Bashiran (Keadaan-Nya yang Melihat)", "Kaunuhu Mutakalliman (Keadaan-Nya yang Berfirman)"
                ]
            }
        ],
        dalil: {
            text: '"Dialah Allah, tidak ada Tuhan selain Dia. Yang Mengetahui yang gaib dan yang nyata, Dialah Yang Maha Pengasih, Maha Penyayang... Dialah Allah, tidak ada Tuhan selain Dia. Maha Suci Allah dari apa yang mereka persekutukan."',
            source: 'QS. Al-Hasyr: 22-23'
        }
    },
    {
        id: 'mustahil',
        title: 'Sifat Mustahil bagi Allah',
        icon: 'fas fa-ban',
        subtitle: 'Sifat-sifat yang mustahil (tidak mungkin) ada pada Dzat Allah SWT.',
        content: [
            {
                type: 'paragraph',
                text: 'Sifat Mustahil adalah kebalikan dari Sifat Wajib. Sifat-sifat ini tidak mungkin ada pada Dzat Allah SWT yang Maha Sempurna. Mengetahui sifat mustahil sama pentingnya dengan mengetahui sifat wajib untuk memurnikan tauhid dan menyucikan keyakinan kita tentang Allah dari segala bentuk kekurangan.'
            },
            {
                type: 'list',
                title: '20 Sifat Mustahil bagi Allah:',
                items: [
                    "'Adam (Tiada) - Lawan dari Wujud",
                    "'Huduts (Baru/Ada yang mendahului) - Lawan dari Qidam",
                    "'Fana (Musnah/Binasa) - Lawan dari Baqa'",
                    "'Mumatsalatu lil Hawaditsi (Menyerupai Makhluk) - Lawan dari Mukhalafatu lil Hawaditsi",
                    "'Ihtiyaju li Ghairihi (Membutuhkan yang lain) - Lawan dari Qiyamuhu bi Nafsihi",
                    "'Ta'addud (Berbilang/Lebih dari satu) - Lawan dari Wahdaniyah",
                    "'Ajzun (Lemah) - Lawan dari Qudrat",
                    "'Karahah (Terpaksa) - Lawan dari Iradat",
                    "'Jahlun (Bodoh) - Lawan dari Ilmu",
                    "'Mautun (Mati) - Lawan dari Hayat",
                    "'Shamamun (Tuli) - Lawan dari Sama'",
                    "'Umyun (Buta) - Lawan dari Bashar",
                    "'Bukmun (Bisu) - Lawan dari Kalam",
                    "Kaunuhu 'Ajizan (Keadaan-Nya yang Lemah)",
                    "Kaunuhu Karihan (Keadaan-Nya yang Terpaksa)",
                    "Kaunuhu Jahilan (Keadaan-Nya yang Bodoh)",
                    "Kaunuhu Mayyitan (Keadaan-Nya yang Mati)",
                    "Kaunuhu Ashamma (Keadaan-Nya yang Tuli)",
                    "Kaunuhu A'ma (Keadaan-Nya yang Buta)",
                    "Kaunuhu Abkama (Keadaan-Nya yang Bisu)"
                ]
            }
        ],
        dalil: {
            text: '"Katakanlah: Dialah Allah, Yang Maha Esa. Allah adalah Tuhan yang bergantung kepada-Nya segala sesuatu. Dia tiada beranak dan tidak pula diperanakkan, dan tidak ada seorangpun yang setara dengan Dia."',
            source: 'QS. Al-Ikhlas: 1-4'
        }
    },
    {
        id: 'malaikat',
        title: '10 Malaikat & Tugasnya',
        icon: 'fas fa-feather-alt',
        subtitle: 'Mengenal sepuluh malaikat utama yang wajib diimani dalam Islam.',
        content: [
            {
                type: 'paragraph',
                text: 'Iman kepada Malaikat adalah rukun iman kedua. Malaikat adalah makhluk gaib yang diciptakan Allah dari cahaya, selalu patuh dan tidak pernah durhaka kepada perintah-Nya. Ada banyak sekali malaikat, namun ada sepuluh malaikat utama yang wajib kita ketahui nama dan tugasnya.'
            },
            {
                type: 'list',
                title: 'Daftar 10 Malaikat dan Tugasnya:',
                items: [
                    'Jibril: Menyampaikan wahyu Allah kepada para Nabi dan Rasul.',
                    'Mikail: Mengatur urusan makhluk, seperti menurunkan hujan, angin, dan membagikan rezeki.',
                    'Israfil: Meniup sangkakala pada hari kiamat.',
                    'Izrail: Mencabut nyawa seluruh makhluk hidup.',
                    'Munkar: Bertanya kepada manusia di dalam kubur tentang amal perbuatannya.',
                    'Nakir: Bertanya kepada manusia di dalam kubur bersama Malaikat Munkar.',
                    'Raqib: Mencatat segala amal baik manusia.',
                    'Atid: Mencatat segala amal buruk manusia.',
                    'Malik: Menjaga pintu Neraka.',
                    'Ridwan: Menjaga pintu Surga.'
                ]
            }
        ],
        dalil: {
            text: 'Barang siapa yang menjadi musuh Allah, malaikat-malaikat-Nya, rasul-rasul-Nya, Jibril dan Mikail, maka sesungguhnya Allah adalah musuh orang-orang kafir.',
            source: 'QS. Al-Baqarah: 98'
        }
    },
    {
        id: 'surga',
        title: 'Nama-nama Surga',
        icon: 'fas fa-door-open',
        subtitle: 'Gambaran tempat kenikmatan abadi bagi orang-orang beriman.',
        content: [
            {
                type: 'paragraph',
                text: 'Surga (Jannah) adalah tempat balasan yang penuh dengan kenikmatan abadi yang Allah janjikan bagi hamba-hamba-Nya yang beriman dan beramal saleh. Al-Qur\'an dan Hadits menyebutkan beberapa nama atau tingkatan surga, masing-masing dengan keistimewaannya.'
            },
            {
                type: 'list',
                title: 'Beberapa Nama Surga dalam Al-Qur\'an:',
                items: [
                    'Surga Firdaus: Tingkatan surga yang paling tinggi, diperuntukkan bagi orang yang khusyuk dalam shalatnya, menunaikan zakat, dan menjaga kehormatannya.',
                    'Surga \'Adn: Tempat tinggal yang kekal, diperuntukkan bagi orang yang bertakwa, sabar, dan berinfak.',
                    'Surga Na\'im: Surga yang penuh dengan kenikmatan, bagi orang-orang yang beriman dan mengerjakan amal saleh.',
                    'Surga Ma\'wa: Tempat kembali dan berlindung, bagi orang yang beriman dan takut kepada kebesaran Allah.',
                    'Darussalam: Rumah yang penuh kedamaian dan keselamatan.',
                    'Darul Muqamah: Tempat tinggal yang tidak ada rasa lelah dan lesu di dalamnya.',
                    'Al-Maqamul Amin: Tempat yang aman dan sentosa.',
                    'Darul Khuldi: Surga yang kekal abadi.'
                ]
            }
        ],
        dalil: {
            text: 'Sesungguhnya orang-orang yang beriman dan beramal saleh, bagi mereka adalah surga Firdaus menjadi tempat tinggal.',
            source: 'QS. Al-Kahf: 107'
        }
    },
    {
        id: 'neraka',
        title: 'Nama-nama Neraka',
        icon: 'fas fa-fire',
        subtitle: 'Gambaran tempat siksaan abadi bagi orang-orang kafir dan durhaka.',
        content: [
            {
                type: 'paragraph',
                text: 'Neraka (Naar) adalah tempat balasan yang penuh dengan siksaan pedih yang Allah siapkan bagi mereka yang ingkar dan durhaka kepada-Nya. Sebagaimana surga, neraka juga memiliki beberapa nama atau tingkatan yang menunjukkan dahsyatnya siksaan di dalamnya.'
            },
            {
                type: 'list',
                title: 'Beberapa Nama Neraka dalam Al-Qur\'an:',
                items: [
                    'Neraka Jahannam: Nama neraka yang paling umum disebut, memiliki bahan bakar dari manusia dan batu.',
                    'Neraka Lazha: Api yang bergejolak dan mampu mengelupaskan kulit kepala.',
                    'Neraka Huthamah: Api yang dinyalakan oleh Allah yang dapat membakar hingga ke hati.',
                    'Neraka Sa\'ir: Api yang menyala-nyala, disediakan untuk orang yang memakan harta anak yatim.',
                    'Neraka Saqar: Neraka yang menghanguskan kulit manusia, dijaga oleh 19 malaikat.',
                    'Neraka Jahim: Tempat bagi orang-orang yang sesat dan mendustakan hari pembalasan.',
                    'Neraka Hawiyah: Tingkatan neraka yang paling bawah dan paling dahsyat siksanya, diperuntukkan bagi orang-orang munafik.'
                ]
            }
        ],
        dalil: {
            text: 'Dan sesungguhnya Jahannam itu benar-benar tempat yang telah diancamkan kepada mereka (pengikut-pengikut syaitan) semuanya.',
            source: 'QS. Al-Hijr: 43'
        }
    }
];
