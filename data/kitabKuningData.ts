import type { KitabKuningTopic, ContentPage } from '../types';

export const kitabKuningData: KitabKuningTopic[] = [
    {
        id: 'safinatun-najah',
        title: 'Safinatun Najah',
        author: 'Syekh Salim bin Sumair Al-Hadhrami',
        icon: 'fas fa-ship',
        subtitle: 'Dasar-dasar Fiqih Mazhab Syafi\'i tentang Ibadah.',
        pages: [
            {
                title: 'BAB 1: Rukun Islam',
                body: [
                    {
                        type: 'paragraph',
                        text: 'Kitab "Safinatun Najah fi Ushuliddin wal Fiqh" (Perahu Keselamatan dalam Dasar Agama dan Fiqih) adalah sebuah matan (teks dasar) yang sangat ringkas namun padat mengenai fiqih ibadah menurut mazhab Syafi\'i. Ditulis oleh Syekh Salim bin Abdullah bin Sa\'d bin Sumair Al-Hadhrami, kitab ini menjadi pegangan dasar bagi para santri pemula di banyak pondok pesantren di seluruh dunia, terutama di Asia Tenggara. Ia dimulai dengan fondasi paling dasar dari agama, yaitu Rukun Islam.'
                    },
                    {
                        type: 'list',
                        title: 'Rukun Islam ada lima:',
                        items: [
                            { title: "1. Syahadat", points: ["Bersaksi bahwa tidak ada Tuhan yang berhak disembah selain Allah dan bersaksi bahwa Muhammad adalah utusan Allah. Ini adalah pintu gerbang keislaman dan fondasi dari seluruh keyakinan."] },
                            { title: "2. Shalat", points: ["Mendirikan shalat lima waktu sehari semalam. Shalat adalah tiang agama dan sarana utama komunikasi seorang hamba dengan Rabb-nya."] },
                            { title: "3. Zakat", points: ["Menunaikan zakat, yaitu mengeluarkan sebagian harta yang telah mencapai batas tertentu (nisab) untuk diberikan kepada yang berhak. Zakat berfungsi membersihkan harta dan jiwa serta menumbuhkan kepedulian sosial."] },
                            { title: "4. Puasa", points: ["Berpuasa di bulan Ramadhan dengan menahan diri dari makan, minum, dan hal-hal yang membatalkan dari terbit fajar hingga terbenam matahari. Puasa melatih ketakwaan dan empati."] },
                            { title: "5. Haji", points: ["Menunaikan ibadah haji ke Baitullah (Ka'bah) di Makkah bagi mereka yang mampu secara fisik, finansial, dan keamanan. Haji adalah puncak dari perjalanan spiritual seorang Muslim."] }
                        ]
                    }
                ]
            },
            {
                title: 'BAB 2: Rukun Iman',
                body: [
                    {
                        type: 'paragraph',
                        text: 'Setelah pilar-pilar lahiriah (Rukun Islam), penulis beralih ke pilar-pilar batiniah yang menjadi fondasi keyakinan (aqidah) seorang Muslim. Inilah yang disebut Rukun Iman.'
                    },
                     {
                        type: 'list',
                        title: 'Rukun Iman ada enam:',
                        items: [
                            { title: "1. Iman kepada Allah", points: ["Meyakini dengan sepenuh hati akan keberadaan, keesaan, dan kesempurnaan Allah SWT sebagai satu-satunya Pencipta, Pengatur, dan Sesembahan yang hakiki."] },
                            { title: "2. Iman kepada Malaikat", points: ["Meyakini keberadaan malaikat sebagai makhluk gaib yang diciptakan dari cahaya, selalu taat kepada Allah, dan memiliki tugas-tugas tertentu."] },
                            { title: "3. Iman kepada Kitab-kitab", points: ["Meyakini bahwa Allah telah menurunkan kitab-kitab suci kepada para Rasul-Nya sebagai petunjuk, seperti Taurat, Zabur, Injil, dan Al-Qur'an sebagai kitab terakhir dan penyempurna."] },
                            { title: "4. Iman kepada Rasul-rasul", points: ["Meyakini bahwa Allah telah mengutus para rasul untuk menyampaikan risalah-Nya, dimulai dari Nabi Adam hingga Nabi Muhammad SAW sebagai penutup para nabi."] },
                            { title: "5. Iman kepada Hari Akhir", points: ["Meyakini akan adanya hari kiamat, kebangkitan dari kubur, hisab (perhitungan amal), surga, dan neraka sebagai balasan atas perbuatan di dunia."] },
                            { title: "6. Iman kepada Qada dan Qadar", points: ["Meyakini bahwa segala sesuatu yang terjadi di alam semesta ini, baik yang tampak baik maupun buruk, adalah atas ketetapan (qada) dan takdir (qadar) Allah SWT."] }
                        ]
                    }
                ]
            },
            {
                title: 'BAB 3: Makna La Ilaha Illallah',
                body: [
                    {
                        type: 'paragraph',
                        title: 'Makna Kalimat Tauhid',
                        text: 'Kalimat "La ilaha illallah" (لَا إِلَٰهَ إِلَّا اللهُ) adalah jantung dari ajaran Islam dan merupakan esensi dari Rukun Islam yang pertama. Maknanya bukan sekadar "Tidak ada Tuhan selain Allah", tetapi lebih dalam dari itu, yaitu "Tidak ada sesembahan yang berhak disembah di alam wujud ini kecuali Allah". Kalimat ini mengandung dua pilar utama:\n\n1. **An-Nafyu (Penolakan/Negasi):** Bagian "La ilaha" menolak dan mengingkari segala bentuk tuhan, sesembahan, atau apapun yang dipertuhankan selain Allah. Ini mencakup penolakan terhadap berhala, dewa-dewa, hawa nafsu yang diikuti, atau bahkan materi yang dijadikan tujuan hidup.\n\n2. **Al-Itsbat (Penetapan/Afirmasi):** Bagian "illallah" menetapkan bahwa satu-satunya yang benar-benar berhak untuk menerima segala bentuk ibadah (seperti doa, shalat, cinta, takut, dan harap) hanyalah Allah SWT semata. Ini adalah penegasan atas Tauhid Uluhiyah, yaitu mengesakan Allah dalam peribadatan.'
                    }
                ]
            },
             {
                title: 'BAB 4: Tanda-tanda Baligh',
                body: [
                    {
                        type: 'paragraph',
                        text: 'Seseorang dianggap telah mencapai usia baligh (dewasa secara syar\'i) jika telah mengalami salah satu dari tiga tanda berikut. Dengan datangnya salah satu tanda ini, maka ia mulai dibebani kewajiban syariat (taklif) secara penuh, di mana amal baik dan buruknya mulai dicatat.'
                    },
                    {
                        type: 'list',
                        title: 'Tanda-tanda Baligh ada tiga:',
                        items: [
                           "Sempurnanya usia 15 tahun (qamariyah) bagi laki-laki dan perempuan. Ini adalah batas maksimal jika dua tanda lainnya belum muncul.",
                           "Ihtilam (mimpi basah hingga keluar mani) bagi laki-laki dan perempuan, setelah mencapai usia minimal 9 tahun qamariyah.",
                           "Haid (menstruasi) bagi perempuan, setelah mencapai usia minimal 9 tahun qamariyah."
                        ]
                    }
                ]
            },
            {
                title: 'BAB 5: Bersuci dari Najis',
                body: [
                    {
                        type: 'paragraph',
                        title: 'Istinja\' (Bersuci Setelah Buang Air)',
                        text: 'Istinja\' adalah menghilangkan najis yang keluar dari qubul (jalan depan) atau dubur (jalan belakang). Cara yang paling utama adalah dengan menggunakan air hingga bersih. Namun, dalam kondisi tertentu, diperbolehkan menggunakan benda padat yang suci, seperti batu atau tisu. Jika menggunakan batu, maka ada delapan syarat yang harus dipenuhi.'
                    },
                    {
                        type: 'list',
                        title: 'Syarat Cukupnya Istinja\' dengan Batu ada delapan:',
                        items: [
                            "Dengan tiga buah batu (atau satu batu dengan tiga sisi yang berbeda).",
                            "Batunya dapat membersihkan tempat keluarnya najis (bukan benda licin seperti kaca).",
                            "Najisnya belum kering.",
                            "Najisnya tidak berpindah dari tempat asalnya.",
                            "Najisnya tidak tercampur dengan benda lain, meskipun suci (seperti air).",
                            "Najisnya tidak melampaui area shafhah (bagian dalam dubur yang terlipat saat duduk) dan hasyafah (kepala penis).",
                            "Batu yang digunakan harus suci.",
                            "Batu yang digunakan bukanlah sesuatu yang dimuliakan (seperti makanan atau tulang)."
                        ]
                    }
                ]
            },
            {
                title: 'BAB 6: Fardhu Wudhu',
                body: [
                    {
                        type: 'list',
                        title: 'Fardhu (Rukun) Wudhu ada enam:',
                        items: [
                            { title: "1. Niat", points: ["Menyengaja dalam hati untuk melakukan wudhu guna menghilangkan hadats kecil. Niat ini dilakukan bersamaan saat pertama kali air menyentuh bagian dari wajah."] },
                            { title: "2. Membasuh Wajah", points: ["Membasuh seluruh area wajah, yaitu dari tempat tumbuhnya rambut di dahi hingga ke bawah dagu, dan dari telinga kanan hingga telinga kiri."] },
                            { title: "3. Membasuh Kedua Tangan hingga Siku", points: ["Membasuh seluruh tangan, termasuk sela-sela jari, hingga melewati kedua siku."] },
                            { title: "4. Mengusap Sebagian Kepala", points: ["Mengusap (bukan membasuh) sebagian kecil dari kepala. Cukup dengan mengusap beberapa helai rambut yang berada dalam batas area kepala."] },
                            { title: "5. Membasuh Kedua Kaki hingga Mata Kaki", points: ["Membasuh seluruh kaki, termasuk sela-sela jari dan tumit, hingga melewati kedua mata kaki."] },
                            { title: "6. Tertib", points: ["Melakukan semua rukun di atas secara berurutan dari nomor 1 hingga 5. Jika urutannya terbalik, maka wudhunya tidak sah."] }
                        ]
                    }
                ]
            },
            {
                title: 'BAB 7: Air',
                body: [
                    {
                        type: 'paragraph',
                        title: 'Jenis-jenis Air dan Hukumnya',
                        text: 'Air yang dapat digunakan untuk bersuci (wudhu dan mandi) adalah air yang suci dan menyucikan (air mutlak), seperti air hujan, air laut, air sungai, air sumur, air mata air, air salju, dan air embun. Dari segi volume, air terbagi menjadi dua:'
                    },
                    {
                        type: 'list',
                        items: [
                            "Air Sedikit: Air yang volumenya kurang dari dua qullah (sekitar 216 liter). Air ini menjadi najis (mutanajjis) seketika jika kemasukan najis, meskipun sifat air (warna, bau, rasa) tidak berubah.",
                            "Air Banyak: Air yang volumenya mencapai dua qullah atau lebih. Air ini tidak menjadi najis jika kemasukan najis, kecuali jika salah satu dari tiga sifatnya (warna, bau, atau rasa) berubah karena najis tersebut."
                        ]
                    },
                    {
                        type: 'paragraph',
                        text: 'Selain itu, ada air yang suci tapi tidak menyucikan (thahir ghairu muthahhir) seperti air musta\'mal (air yang telah digunakan untuk wudhu/mandi wajib) dan air yang berubah karena tercampur benda suci (seperti air teh). Air ini boleh diminum, tapi tidak sah untuk bersuci.'
                    }
                ]
            },
            {
                title: 'BAB 8: Perkara yang Mewajibkan Mandi',
                body: [
                    {
                        type: 'paragraph',
                        text: 'Mandi wajib (ghusl) adalah mandi untuk menghilangkan hadats besar. Seseorang wajib melakukannya jika mengalami salah satu dari enam perkara berikut:'
                    },
                    {
                        type: 'list',
                        title: 'Hal-hal yang mewajibkan mandi ada enam:',
                        items: [
                            { title: "1. Bersetubuh (Jima')", points: ["Yaitu masuknya hasyafah (kepala penis) ke dalam faraj (kemaluan), meskipun tidak sampai keluar mani."] },
                            { title: "2. Keluarnya Mani (Sperma)", points: ["Baik karena mimpi basah, bersentuhan, atau sebab lainnya, baik pada laki-laki maupun perempuan."] },
                            { title: "3. Haid (Menstruasi)", points: ["Darah yang keluar secara rutin dari rahim wanita sehat yang telah baligh. Setelah darah haid berhenti, ia wajib mandi."] },
                            { title: "4. Nifas", points: ["Darah yang keluar dari rahim wanita setelah melahirkan. Setelah darah nifas berhenti, ia wajib mandi."] },
                            { title: "5. Wiladah (Melahirkan)", points: ["Melahirkan itu sendiri, baik yang keluar berupa bayi maupun hanya segumpal darah, mewajibkan mandi, meskipun tidak disertai darah nifas."] },
                            { title: "6. Meninggal Dunia", points: ["Seorang Muslim yang meninggal dunia wajib dimandikan oleh Muslim yang masih hidup (kecuali mati syahid di medan perang)."] }
                        ]
                    }
                ]
            },
            {
                title: 'BAB 9: Fardhu Mandi',
                body: [
                    {
                        type: 'paragraph',
                        text: 'Mandi wajib memiliki dua rukun yang harus dipenuhi agar sah.'
                    },
                    {
                        type: 'list',
                        title: 'Fardhu (Rukun) Mandi ada dua:',
                        items: [
                            "Niat: Berniat dalam hati untuk menghilangkan hadats besar. Niat ini dilakukan saat pertama kali air menyentuh bagian tubuh.",
                            "Meratakan Air ke Seluruh Tubuh: Memastikan seluruh bagian luar tubuh, termasuk kulit, rambut (dari pangkal hingga ujung), dan lipatan-lipatan kulit yang tersembunyi (seperti ketiak, belakang telinga, lipatan perut), terkena air."
                        ]
                    }
                ]
            },
            {
                title: 'BAB 10: Syarat Wudhu',
                body: [
                    {
                        type: 'list',
                        title: 'Syarat sah wudhu ada sepuluh:',
                        items: [
                            "Islam.", "Tamyiz (dapat membedakan baik dan buruk).", "Suci dari haid dan nifas.",
                            "Tidak ada sesuatu di anggota wudhu yang dapat mengubah sifat air (misalnya sabun saat membasuh).",
                            "Tidak ada sesuatu di anggota wudhu yang menghalangi sampainya air ke kulit (misalnya cat atau lem).",
                            "Mengetahui bahwa wudhu itu fardhu (bukan sekadar kebiasaan).",
                            "Tidak meyakini salah satu fardhunya sebagai sunnah (misalnya menganggap membasuh wajah itu sunnah).",
                            "Airnya suci dan menyucikan (thahur).", "Menghilangkan najis 'ainiyah (yang tampak wujudnya) terlebih dahulu.",
                            "Mengalirnya air ke seluruh anggota wudhu."
                        ]
                    }
                ]
            },
            {
                title: 'BAB 11: Pembatal Wudhu',
                body: [
                    {
                        type: 'list',
                        title: 'Hal-hal yang membatalkan wudhu ada empat:',
                        items: [
                            "Keluarnya sesuatu dari salah satu dari dua jalan (qubul atau dubur), baik itu benda padat, cair, atau gas, kecuali mani.",
                            "Hilangnya akal karena tidur, pingsan, gila, atau mabuk. Dikecualikan tidur dalam posisi duduk yang menetapkan pantatnya di lantai, karena posisi ini mencegah keluarnya sesuatu.",
                            "Bersentuhan kulit antara laki-laki dan perempuan dewasa yang bukan mahram secara langsung (tanpa penghalang). Ini adalah pandangan khas dalam mazhab Syafi'i.",
                            "Menyentuh kemaluan manusia (milik sendiri atau orang lain) atau lubang dubur dengan telapak tangan atau bagian dalam jari-jari."
                        ]
                    }
                ]
            },
            {
                title: 'BAB 12: Larangan bagi Orang Berhadats',
                body: [
                    {
                        type: 'list',
                        items: [
                            "Diharamkan bagi orang yang berhadats kecil (batal wudhu): Shalat, Thawaf, dan Menyentuh serta membawa mushaf Al-Qur'an.",
                            "Diharamkan bagi orang yang junub (berhadats besar): Semua yang diharamkan bagi hadats kecil, ditambah: Membaca Al-Qur'an (dengan niat tilawah), dan Berdiam diri di masjid.",
                            "Diharamkan bagi wanita haid dan nifas: Semua yang diharamkan bagi orang junub, ditambah: Puasa, Talak (dijatuhi talak oleh suami), dan Melintasi masjid jika khawatir mengotori."
                        ]
                    }
                ]
            },
            {
                title: 'BAB 13: Tayamum',
                body: [
                    {
                        type: 'list',
                        title: 'Sebab-sebab Tayamum ada tiga:',
                        items: ["Tidak ada air, baik secara nyata maupun secara syar'i (misalnya air ada tapi sangat jauh).", "Sakit atau luka yang menyebabkan tidak boleh menggunakan air karena akan memperparah kondisi.", "Air yang ada hanya cukup untuk kebutuhan minum makhluk hidup yang dimuliakan (manusia atau hewan)."]
                    },
                    {
                        type: 'list',
                        title: 'Fardhu Tayamum ada empat:',
                        items: ["Niat (untuk diperbolehkan shalat).", "Mengusap wajah.", "Mengusap kedua tangan hingga siku.", "Tertib (berurutan)."]
                    },
                    {
                        type: 'list',
                        title: 'Pembatal Tayamum ada tiga:',
                        items: ["Semua yang membatalkan wudhu.", "Murtad (keluar dari Islam).", "Melihat atau menyangka ada air (jika ia bertayamum karena tidak ada air), kecuali jika ia sudah terlanjur sedang shalat."]
                    }
                ]
            },
            {
                title: 'BAB 14: Najis dan Cara Mensucikannya',
                body: [
                    {
                        type: 'paragraph',
                        text: 'Najis adalah benda kotor yang menghalangi sahnya shalat. Memahami jenis dan cara mensucikannya adalah bagian penting dari thaharah. Najis terbagi menjadi tiga tingkatan:'
                    },
                    {
                        type: 'list',
                        title: 'Jenis-jenis Najis dan Cara Mensucikannya',
                        items: [
                            {
                                title: "Najis Mukhaffafah (Ringan)",
                                points: [
                                    "Definisi: Air kencing bayi laki-laki yang belum makan apapun selain ASI dan usianya belum mencapai 2 tahun.",
                                    "Contoh: Hanya air kencing bayi laki-laki dengan syarat tersebut.",
                                    "Cara Mensucikan: Cukup dengan memercikkan air ke area yang terkena najis hingga merata. Tidak disyaratkan air harus mengalir."
                                ]
                            },
                             {
                                title: "Najis Mutawassithah (Sedang)",
                                points: [
                                    "Definisi: Semua najis selain Mukhaffafah dan Mughallazhah. Ini adalah kategori najis yang paling umum.",
                                    "Contoh: Kotoran manusia/hewan, air kencing (selain bayi laki-laki tadi), darah, nanah, bangkai (selain ikan & belalang), khamr (minuman keras).",
                                    "Terbagi dua: 'Ainiyah (najis yang masih tampak wujud, warna, atau baunya) dan Hukmiyah (najis yang sudah kering dan tidak tampak lagi sifat-sifatnya).",
                                    "Cara Mensucikan: Untuk najis 'ainiyah, hilangkan terlebih dahulu wujud najisnya (ain-nya) hingga sifat-sifatnya (rasa, warna, bau) hilang. Setelah itu, siram dengan air hingga bersih. Untuk najis hukmiyah, cukup dengan mengalirkan air sekali di atas area yang terkena najis."
                                ]
                            },
                            {
                                title: "Najis Mughallazhah (Berat)",
                                points: [
                                    "Definisi: Najis yang berasal dari anjing, babi, dan segala sesuatu yang lahir dari keduanya atau salah satunya.",
                                    "Contoh: Air liur anjing, daging babi, kotorannya, dan seluruh bagian tubuhnya.",
                                    "Cara Mensucikan: Dibasuh sebanyak tujuh kali dengan air mutlak. Salah satu dari tujuh basuhan tersebut wajib dicampur dengan tanah (debu) yang suci hingga merata."
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                title: 'BAB 15: Haid, Nifas, dan Istihadhah',
                body: [
                     {
                        type: 'paragraph',
                        title: 'Definisi dan Batasan Waktu',
                        text: 'Memahami perbedaan antara tiga jenis darah yang keluar dari kemaluan wanita ini sangat penting karena berkaitan dengan sah atau tidaknya ibadah seperti shalat dan puasa.'
                    },
                    {
                        type: 'list',
                        items: [
                            "Haid: Darah yang keluar dari rahim wanita sehat yang telah baligh pada waktu-waktu tertentu. Waktu minimalnya adalah sehari semalam (24 jam), umumnya 6 atau 7 hari, dan maksimalnya 15 hari 15 malam. Darah yang keluar kurang dari 24 jam atau lebih dari 15 hari tidak dianggap haid.",
                            "Nifas: Darah yang keluar setelah melahirkan (wiladah). Waktu minimalnya adalah sekejap (satu tetes), umumnya 40 hari, dan maksimalnya 60 hari.",
                            "Istihadhah: Darah penyakit yang keluar di luar waktu haid dan nifas. Wanita yang mengalami istihadhah tetap wajib shalat dan puasa, namun ia harus bersuci (membersihkan kemaluan, menyumbatnya, lalu berwudhu) setiap kali akan melaksanakan shalat fardhu."
                        ]
                    }
                ]
            },
            {
                title: 'BAB 16: Syarat Sah Shalat',
                body: [
                    {
                        type: 'list',
                        title: 'Syarat Sah Shalat ada delapan:',
                        items: [
                            "Suci dari dua hadats (kecil dengan wudhu, besar dengan mandi).",
                            "Suci dari najis pada pakaian, badan, dan tempat shalat.",
                            "Menutup aurat (laki-laki: antara pusar dan lutut; perempuan: seluruh tubuh kecuali wajah dan telapak tangan).",
                            "Menghadap kiblat (Ka'bah).",
                            "Telah masuk waktu shalat yang telah ditentukan.",
                            "Mengetahui tata cara pelaksanaan shalat yang fardhu.",
                            "Tidak meyakini salah satu rukun shalat sebagai amalan sunnah.",
                            "Menjauhi semua hal yang dapat membatalkan shalat."
                        ]
                    }
                ]
            },
            {
                title: 'BAB 17: Rukun Shalat',
                body: [
                    {
                        type: 'paragraph',
                        title: 'Tuma\'ninah: Jeda dan Ketenangan',
                        text: 'Salah satu rukun shalat yang sering terlewat adalah Tuma\'ninah. Ini berarti berhenti sejenak dalam setiap gerakan (ruku\', i\'tidal, sujud, duduk di antara dua sujud) hingga seluruh anggota badan tenang, kira-kira selama waktu yang cukup untuk mengucapkan "Subhanallah". Melakukan gerakan shalat dengan tergesa-gesa tanpa tuma\'ninah dapat membatalkan shalat.'
                    },
                    {
                        type: 'list',
                        title: 'Rukun Shalat ada tujuh belas:',
                        items: ["Niat", "Berdiri bagi yang mampu", "Takbiratul Ihram", "Membaca Surah Al-Fatihah", "Ruku'", "Tuma\'ninah dalam ruku'", "I'tidal (bangkit dari ruku')", "Tuma\'ninah dalam i\'tidal", "Sujud dua kali", "Tuma\'ninah dalam sujud", "Duduk di antara dua sujud", "Tuma\'ninah dalam duduk di antara dua sujud", "Duduk tasyahud akhir", "Membaca tasyahud akhir", "Membaca shalawat Nabi pada tasyahud akhir", "Mengucapkan salam yang pertama", "Tertib (melakukan semua rukun secara berurutan)."]
                    }
                ]
            },
            {
                title: 'BAB 18: Pembatal Shalat',
                body: [
                    {
                        type: 'list',
                        title: 'Shalat menjadi batal karena empat belas perkara:',
                        items: [
                            "Berhadats (batal wudhu).", "Terkena najis yang tidak dimaafkan.", "Terbukanya aurat jika tidak segera ditutup.", "Mengucapkan dua huruf atau satu huruf yang dapat dipahami dengan sengaja.", "Melakukan hal yang membatalkan puasa dengan sengaja (seperti makan dan minum).", "Makan yang banyak meskipun lupa.", "Bergerak tiga kali berturut-turut (meskipun lupa).", "Melompat.", "Memukul dengan keras.", "Menambah rukun fi\'li (perbuatan) dengan sengaja.", "Mendahului imam dua rukun fi\'li tanpa uzur.", "Terlambat dari imam dua rukun fi\'li tanpa uzur.", "Niat membatalkan shalat.", "Ragu-ragu dalam niat takbiratul ihram."
                        ]
                    }
                ]
            },
             {
                title: 'BAB 19: Shalat Jenazah',
                body: [
                    {
                        type: 'list',
                        title: 'Kewajiban terhadap Jenazah ada empat (Fardhu Kifayah):',
                        items: ["Memandikan.", "Mengkafani.", "Menyalatkan.", "Menguburkan."]
                    },
                    {
                        type: 'list',
                        title: 'Rukun Shalat Jenazah ada tujuh:',
                        items: [
                            "Niat.", "Empat kali takbir.", "Berdiri bagi yang mampu.", "Membaca Al-Fatihah setelah takbir pertama.", "Membaca shalawat Nabi (minimal 'Allahumma shalli 'ala Muhammad') setelah takbir kedua.",
                            "Mendoakan mayit setelah takbir ketiga. (Contoh: 'Allahummaghfirlahu warhamhu...').", "Mengucapkan salam setelah takbir keempat."
                        ]
                    }
                ]
            },
            {
                title: 'BAB 20: Zakat',
                body: [
                    {
                        type: 'paragraph',
                        title: 'Harta yang Wajib Dizakati',
                        text: 'Zakat wajib dikeluarkan untuk harta-harta tertentu jika telah mencapai batas minimal (nisab) dan telah dimiliki selama satu tahun (haul). Harta tersebut adalah: ternak (unta, sapi, kambing), nuqud (emas & perak), hasil pertanian, dan harta perdagangan.'
                    },
                    {
                        type: 'list',
                        title: 'Golongan yang Berhak Menerima Zakat (8 Asnaf)',
                        items: [
                           "Fakir: Orang yang tidak memiliki harta dan pekerjaan sama sekali untuk memenuhi kebutuhan dasarnya.",
                           "Miskin: Orang yang memiliki harta atau pekerjaan, tetapi tidak mencukupi kebutuhan dasarnya.",
                           "Amil: Panitia resmi yang ditunjuk oleh pemerintah untuk mengurus pengumpulan dan pembagian zakat.",
                           "Muallaf: Orang yang baru masuk Islam atau orang yang diharapkan masuk Islam, yang imannya masih perlu dikuatkan.",
                           "Riqab: Budak yang ingin memerdekakan dirinya (saat ini sudah tidak relevan).",
                           "Gharimin: Orang yang terlilit utang untuk memenuhi kebutuhan pokok atau untuk mendamaikan perselisihan.",
                           "Fisabilillah: Orang yang berjuang di jalan Allah (maknanya meluas mencakup dakwah, pendidikan Islam, dll).",
                           "Ibnu Sabil: Musafir (pelancong) yang kehabisan bekal dalam perjalanan yang bukan untuk tujuan maksiat."
                        ]
                    }
                ]
            },
            {
                title: 'BAB 21: Puasa',
                body: [
                    {
                        type: 'list',
                        title: 'Rukun Puasa ada tiga:',
                        items: [
                            "Niat di malam hari (untuk setiap hari puasa fardhu, seperti Ramadhan). Niat ini harus dilakukan antara waktu Maghrib hingga sebelum terbit fajar.",
                            "Menahan diri dari segala yang membatalkan puasa, dari terbit fajar hingga terbenam matahari.",
                            "Orang yang berpuasa itu sendiri."
                        ]
                    },
                    {
                        type: 'list',
                        title: 'Pembatal Puasa ada sepuluh:',
                        items: ["Memasukkan sesuatu ke rongga tubuh (seperti mulut, hidung) dengan sengaja.", "Memasukkan benda ke qubul atau dubur (misalnya untuk pengobatan).", "Muntah dengan sengaja.", "Bersetubuh dengan sengaja.", "Keluarnya mani karena bersentuhan kulit.", "Haid.", "Nifas.", "Gila.", "Murtad.", "Pingsan atau mabuk sepanjang hari."]
                    },
                    {
                        type: 'list',
                        title: 'Udzur yang Membolehkan Tidak Berpuasa',
                        items: [
                            { title: "Wajib Qadha' Saja", points: ["Sakit yang diharapkan sembuh.", "Musafir (dalam perjalanan jauh)."] },
                            { title: "Wajib Fidyah Saja", points: ["Orang tua renta yang sudah tidak mampu berpuasa sama sekali.", "Orang sakit menahun yang tidak ada harapan sembuh."] },
                            { title: "Wajib Qadha' dan Fidyah", points: ["Wanita hamil atau menyusui yang meninggalkan puasa karena khawatir terhadap kondisi anaknya saja (bukan dirinya)."] }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'talimul-mutaallim',
        title: 'Ta\'limul Muta\'allim',
        author: 'Syekh Burhanuddin Al-Zarnuji',
        icon: 'fas fa-user-graduate',
        subtitle: 'Panduan Etika bagi Penuntut Ilmu.',
        pages: [
            {
                title: 'Muqaddimah (Pendahuluan)',
                body: [
                    {
                        type: 'paragraph',
                        text: 'Kitab "Ta\'lim al-Muta\'allim Tariq at-Ta\'allum" (Pengajaran bagi Pelajar tentang Metode Belajar) adalah karya monumental dari Syekh Burhanuddin Al-Zarnuji. Kitab ini secara khusus membahas adab (etika) dan strategi yang harus dimiliki oleh seorang penuntut ilmu (thalibul \'ilmi) agar ilmunya bermanfaat dan diberkahi oleh Allah SWT. Al-Zarnuji mengamati banyak pelajar yang bersungguh-sungguh dalam belajar, menghabiskan waktu yang lama, namun tidak memperoleh manfaat dari ilmunya; mereka tidak bisa mengamalkannya atau menyebarkannya. Beliau menyimpulkan bahwa masalahnya terletak pada kesalahan dalam metode dan pengabaian terhadap adab-adab penting. Kitab ini menjadi pedoman wajib di hampir seluruh pondok pesantren karena mengajarkan bahwa keberkahan (barakah) ilmu tidak hanya bergantung pada kecerdasan, tetapi yang lebih utama adalah pada niat yang lurus, penghormatan kepada guru, kesungguhan, dan akhlak yang mulia.'
                    }
                ]
            },
            {
                title: 'FASAL 1: Hakikat Ilmu dan Fiqih Serta Keutamaannya',
                body: [
                    {
                        type: 'paragraph',
                        text: 'Rasulullah SAW bersabda, "Menuntut ilmu itu wajib bagi setiap Muslim." Namun, para ulama menjelaskan bahwa "ilmu" yang dimaksud dalam hadits ini tidak mencakup semua cabang ilmu. Yang hukumnya fardhu \'ain (wajib bagi setiap individu) adalah mempelajari \'ilmu hal\', yaitu ilmu yang dibutuhkan saat itu juga untuk menjalankan kewajiban agamanya dengan benar. Ibaratnya, saat waktu shalat tiba, maka ilmu tentang tata cara shalat menjadi wajib saat itu juga.'
                    },
                    {
                        type: 'list',
                        title: 'Ilmu yang Wajib Dipelajari (Fardhu \'Ain)',
                        items: [
                            "Ilmu Tauhid: Mengenal Allah SWT dengan sifat-sifat-Nya, meyakini keesaan-Nya. Ini adalah fondasi dari segala ilmu, karena tanpanya, seluruh amalan menjadi sia-sia.",
                            "Ilmu Fiqih Ibadah: Mengetahui tata cara bersuci (thaharah), shalat, puasa, dan zakat (jika sudah wajib). Ini adalah ilmu yang dibutuhkan setiap hari untuk memastikan ibadah kita sah.",
                            "Ilmu Akhlak (Tasawuf): Mengetahui penyakit-penyakih hati yang tercela (seperti sombong, riya, hasad) agar bisa menghindarinya, dan mengetahui sifat-sifat hati yang terpuji (seperti tawakal, sabar, ikhlas) agar bisa menghiasi diri dengannya."
                        ]
                    },
                    {
                        type: 'paragraph',
                        title: 'Keutamaan Ilmu Fiqih',
                        text: 'Ilmu Fiqih (pemahaman mendalam tentang agama) memiliki keutamaan yang sangat besar. Dikatakan bahwa "Satu orang alim (ahli fiqih) yang wara\' (menjaga diri dari syubhat) lebih berat bagi setan daripada seribu ahli ibadah yang bodoh." Mengapa? Karena ahli ibadah yang bodoh mudah ditipu oleh setan dalam ibadahnya, sementara ahli fiqih mampu membedakan mana yang benar dan salah, serta mana yang merupakan tipu daya setan. Ilmu adalah benteng yang melindungi seseorang dari perbuatan yang merusak. Ilmu adalah sarana untuk mencapai ketakwaan, yang dengannya seseorang berhak mendapat kemuliaan sejati di sisi Allah.'
                    }
                ]
            },
            {
                title: 'FASAL 2: Niat dalam Mencari Ilmu',
                body: [
                    {
                        type: 'paragraph',
                        text: 'Niat adalah ruh dari segala amalan. Sebuah amalan yang besar bisa menjadi kecil nilainya karena niat yang salah, dan amalan kecil bisa menjadi sangat besar nilainya karena niat yang lurus. Berdasarkan hadits "Sesungguhnya setiap amalan tergantung pada niatnya," maka seorang pelajar wajib menata dan meluruskan niatnya sebelum, selama, dan sesudah belajar.'
                    },
                    {
                        type: 'list',
                        title: 'Niat yang Benar dalam Menuntut Ilmu',
                        items: [
                            "Mencari ridha Allah SWT semata.",
                            "Mencari kebahagiaan abadi di akhirat.",
                            "Menghilangkan kebodohan dari diri sendiri, lalu dari orang lain.",
                            "Menghidupkan agama dan melestarikan ajaran Islam.",
                            "Mensyukuri nikmat akal dan kesehatan badan yang telah Allah berikan."
                        ]
                    },
                     {
                        type: 'list',
                        title: 'Niat yang Salah (Harus Dihindari)',
                        items: [
                            "Mencari perhatian dan pujian dari manusia.",
                            "Mendapatkan harta, jabatan, atau kemegahan duniawi.",
                            "Mencari kehormatan di hadapan penguasa atau orang lain.",
                            "Ingin mengalahkan teman sejawat atau untuk berdebat kusir demi menunjukkan kehebatan diri."
                        ]
                    },
                    {
                        type: 'paragraph',
                        text: 'Seseorang harus memiliki himmah (cita-cita) yang luhur dalam belajar. Jangan meremehkan ilmu dan jangan merendahkan diri sendiri. Siapa yang bersungguh-sungguh dengan cita-cita tinggi untuk menggapai ilmu, insya Allah ia akan mencapainya. Keberkahan ilmu sangat bergantung pada keikhlasan niat ini.'
                    }
                ]
            },
             {
                title: 'FASAL 3: Memilih Ilmu, Guru, dan Teman',
                body: [
                    {
                        type: 'list',
                        title: 'Memilih Ilmu',
                        items: [
                           "Dahulukan ilmu yang paling dibutuhkan untuk memperbaiki kondisi agama Anda saat ini (ilmu hal), yaitu ilmu tauhid dan fiqih ibadah sehari-hari. Jangan terburu-buru mempelajari ilmu yang belum saatnya.",
                           "Setelah itu, pelajari ilmu-ilmu lain yang bermanfaat untuk masa depan atau yang menjadi fardhu kifayah (kewajiban kolektif seperti kedokteran, perdagangan, dll).",
                           "Hindari perdebatan (jidal) yang tidak dilandasi niat mencari kebenaran, terutama di awal-awal menuntut ilmu, karena itu akan menyia-nyiakan waktu, mengeraskan hati, dan menimbulkan permusuhan."
                        ]
                    },
                    {
                        type: 'list',
                        title: 'Memilih Guru',
                        items: [
                           "Carilah guru yang al-a’lam (paling alim/berilmu dalam bidangnya), al-wara’ (paling menjaga diri dari yang haram/syubhat), dan al-assan (paling tua usianya/paling senior dan matang). Senioritas menunjukkan pengalaman dan keberkahan.",
                           "Bermusyawarahlah dengan orang-orang yang berilmu dan berpengalaman dalam memilih guru, karena musyawarah adalah separuh dari keberhasilan dan menunjukkan kerendahan hati.",
                           "Bersabarlah terhadap seorang guru. Jangan mudah berpindah-pindah guru karena tergiur dengan guru lain. Hal ini akan membuat hatimu goyah, waktumu tersia-siakan, dan tidak ada ilmu yang benar-benar dikuasai. Menetap pada satu guru hingga benar-benar menguasai ilmunya adalah lebih berkah."
                        ]
                    },
                    {
                        type: 'list',
                        title: 'Memilih Teman',
                        items: [
                            "Pilihlah teman yang al-jidd (bersungguh-sungguh dalam belajar), karena semangat itu menular.",
                            "Pilihlah teman yang wara’ (menjaga diri dari maksiat), karena teman yang buruk akan menyeretmu kepada keburukan.",
                            "Pilihlah teman yang memiliki thabi’at yang lurus (jujur dan baik akhlaknya).",
                            "Jauhilah teman yang pemalas, banyak bicara sia-sia, suka merusak, dan suka memfitnah, karena tabiat itu menular seperti penyakit. Dikatakan, 'Tentang seseorang, jangan tanya siapa dia, tapi lihatlah siapa temannya.'"
                        ]
                    }
                ]
            },
             {
                title: 'FASAL 4: Menghormati Ilmu dan Guru',
                body: [
                    {
                        type: 'paragraph',
                        text: 'Ketahuilah, seorang pelajar tidak akan memperoleh ilmu dan tidak akan mendapat manfaat dari ilmunya kecuali dengan mengagungkan (ta\'zhim) ilmu itu sendiri, para ahli ilmu (ulama), dan memuliakan gurunya. Dikatakan, "Seseorang tidak akan sampai (kepada tujuannya) kecuali dengan penghormatan, dan tidak akan jatuh kecuali karena meninggalkan penghormatan."'
                    },
                    {
                        type: 'list',
                        title: 'Bentuk-bentuk Penghormatan (Ta\'zhim)',
                        items: [
                           "Terhadap Ilmu/Kitab: Tidak memegang kitab kecuali dalam keadaan suci, tidak meletakkannya sembarangan di lantai, tidak menjadikan kitab sebagai bantal, tidak melipat halamannya, dan tidak meletakkan benda lain di atas mushaf atau kitab hadits.",
                           "Terhadap Guru: Tidak berjalan di depannya, tidak duduk di tempatnya, tidak memulai pembicaraan kecuali dengan izinnya, tidak banyak bicara di hadapannya, tidak bertanya saat guru sedang lelah, selalu menjaga perasaan guru, dan senantiasa mendoakannya baik di hadapannya maupun di belakangnya. Khalifah Harun Ar-Rasyid bahkan rela memegangi wadah air saat putranya menuangkan air untuk wudhu gurunya, Imam Al-Kisai, sebagai bentuk penghormatan.",
                           "Memuliakan Keluarga Guru: Menghormati putra-putra guru, kerabatnya, dan semua yang berhubungan dengannya juga termasuk bagian dari memuliakan guru itu sendiri."
                        ]
                    }
                ]
            },
            {
                title: 'FASAL 5: Kesungguhan, Kontinuitas, dan Cita-cita Luhur',
                body: [
                    {
                        type: 'paragraph',
                        text: 'Ilmu tidak akan didapat kecuali dengan kesungguhan (al-jidd), ketekunan/kontinuitas (al-muwazhabah), dan cita-cita yang luhur (himmah). Dikatakan, "Barangsiapa bersungguh-sungguh, ia akan menemukan. Dan barangsiapa mengetuk pintu terus-menerus, ia pasti akan masuk." Jalan untuk mendapatkan ilmu adalah dengan kesungguhan dan kesabaran dalam mengulang-ulang pelajaran (takrar).'
                    },
                    {
                        type: 'paragraph',
                        text: 'Seorang pelajar harus "menghidupkan" malam-malamnya dengan belajar dan berdiskusi, karena malam adalah waktu yang tenang dan pikiran lebih jernih. Jangan pernah memutus semangat. Jika merasa lelah atau jenuh, istirahatlah sejenak, lalu kembali belajar dengan semangat baru. Cita-cita yang tinggi akan mendorong seseorang untuk menanggung segala kesulitan dalam menuntut ilmu. Bercita-citalah untuk menjadi alim yang bermanfaat bagi umat, bukan sekadar menjadi terpelajar.'
                    }
                ]
            },
            {
                title: 'FASAL 6: Permulaan, Ukuran, dan Tata Tertib Belajar',
                body: [
                    {
                        type: 'paragraph',
                        text: 'Menurut para ulama, sebaiknya memulai belajar atau mengaji pada hari Rabu. Hal ini didasarkan pada riwayat bahwa Allah SWT menciptakan cahaya pada hari Rabu, dan ilmu adalah cahaya yang menerangi kebodohan. Ukuran pelajaran haruslah bertahap. Mulailah dengan materi yang paling mudah dipahami, lalu tingkatkan sedikit demi sedikit setiap hari. Mengambil pelajaran terlalu banyak dalam satu waktu akan membosankan dan membuat ilmu tidak kokoh.'
                    },
                    {
                        type: 'paragraph',
                        text: 'Mengulang pelajaran (takrar) adalah kunci. Pelajaran kemarin diulang lima kali, pelajaran dua hari yang lalu empat kali, dan seterusnya. Setelah menguasai satu bidang ilmu secara mendasar, barulah pindah ke bidang lain. Mencampuradukkan banyak ilmu di awal tanpa menguasai satupun akan membingungkan dan tidak menghasilkan apa-apa. Lakukan diskusi (mudzakarah) dengan teman yang setara dengan niat mencari kebenaran, bukan untuk pamer.'
                    }
                ]
            },
            {
                title: 'FASAL 7: Tawakal kepada Allah',
                body: [
                    {
                        type: 'paragraph',
                        text: 'Seorang penuntut ilmu wajib bertawakal kepada Allah. Tawakal adalah menyandarkan hati dan menyerahkan hasil sepenuhnya kepada Allah setelah melakukan usaha (ikhtiar) yang maksimal. Ini berbeda dengan tawakul, yaitu pasrah tanpa usaha. Jangan terlalu risau dan menyibukkan hati dengan urusan rezeki, karena Allah telah menjamin rezeki setiap hamba-Nya. Rasulullah SAW bersabda, "Barangsiapa yang tujuan utamanya adalah akhirat, maka Allah akan kumpulkan urusannya, jadikan kekayaan di hatinya, dan dunia akan datang kepadanya dalam keadaan tunduk." Hati yang sibuk memikirkan urusan duniawi akan sulit untuk fokus dalam merenungkan kedalaman ilmu. Sibukkanlah diri dengan belajar dan beribadah, niscaya Allah akan mencukupkan kebutuhanmu dari jalan yang tidak disangka-sangka.'
                    }
                ]
            },
            {
                title: 'FASAL 8: Waktu Belajar yang Efektif',
                body: [
                    {
                        type: 'paragraph',
                        text: 'Seorang pelajar harus memanfaatkan seluruh waktunya untuk belajar, karena umur ini singkat. Jangan sia-siakan waktu malam dan saat-saat sepi. Waktu terbaik untuk belajar dan menghafal adalah waktu sahur (akhir malam) dan waktu pagi hari (setelah Subuh hingga matahari terbit), karena pada saat itu pikiran paling jernih dan suasana paling tenang. Waktu untuk diskusi (mudzakarah) dan penelitian mendalam adalah siang hari. Waktu untuk menulis dan mengulang pelajaran adalah malam hari. Manfaatkan masa muda dan awal-awal kehidupan, karena pada masa itu daya hafal masih kuat dan kesibukan masih sedikit. Waktu yang telah berlalu tidak akan pernah bisa dibeli kembali.'
                    }
                ]
            },
            {
                title: 'FASAL 9: Saling Mengasihi dan Menasihati',
                body: [
                    {
                        type: 'paragraph',
                        text: 'Seorang pelajar harus memiliki sifat penyayang (syafaqah), mudah memberi nasihat, dan tidak boleh hasad (iri hati). Hasad sangat berbahaya karena ia tidak memberikan manfaat apa-apa selain kesedihan dan menyia-nyiakan waktu. Ia membakar kebaikan seperti api membakar kayu bakar. Berilah nasihat kepada teman jika ia melakukan kesalahan, namun lakukan dengan cara sindiran yang lembut dan niat yang tulus untuk memperbaiki, bukan untuk mempermalukannya di depan umum. Diskusi ilmiah (mudzakarah) dan saling bertanya (munazharah) harus dilakukan dengan tenang, adil, dan dengan niat mencari kebenaran (li izharis shawab), bukan untuk pamer atau menjatuhkan lawan (li ta\'jizil khashm).'
                    }
                ]
            },
            {
                title: 'FASAL 10: Mengambil Pelajaran (Istifadah)',
                body: [
                    {
                        type: 'paragraph',
                        text: 'Seorang penuntut ilmu sejati harus memiliki semangat istifadah, yaitu selalu siap untuk mengambil pelajaran dan faedah ilmu di setiap waktu dan dari siapapun. Selalu siapkan pena dan kertas (atau alat catat) untuk mencatat faedah-faedah ilmu berharga yang didengar. Dikatakan, "Ilmu itu adalah binatang buruan, dan tulisan adalah tali pengikatnya." Jangan pernah malu untuk belajar dari orang yang lebih muda usianya atau lebih rendah kedudukannya. Rasulullah SAW bersabda, "Hikmah adalah barang hilang milik orang beriman, di mana pun ia menemukannya, ia lebih berhak untuk mengambilnya." Sikap rendah hati (tawadhu) adalah kunci untuk membuka pintu-pintu ilmu.'
                    }
                ]
            },
            {
                title: 'FASAL 11: Wara\' Saat Menuntut Ilmu',
                body: [
                    {
                        type: 'paragraph',
                        text: 'Wara\' adalah sikap kehati-hatian dalam menjaga diri dari hal-hal yang syubhat (samar hukumnya) dan apalagi yang haram. Sifat wara\' memiliki pengaruh besar terhadap keberkahan dan cahaya ilmu. Ilmu adalah cahaya dari Allah, dan cahaya ini tidak akan diberikan kepada hati yang gemar bermaksiat. Seorang pelajar harus menjaga makanannya agar selalu halal, karena makanan haram akan mengeraskan hati. Selain itu, ia juga dianjurkan untuk tidak terlalu banyak makan (karena menyebabkan banyak tidur dan kebodohan), tidak terlalu banyak tidur (karena menyia-nyiakan umur), dan tidak terlalu banyak bicara dalam hal yang tidak bermanfaat. Menjaga diri dari ghibah (menggunjing), fitnah, dan bergaul dengan orang-orang fasik juga termasuk bagian penting dari wara\'.'
                    }
                ]
            },
            {
                title: 'FASAL 12: Hal yang Menguatkan dan Melemahkan Hafalan',
                body: [
                    {
                        type: 'paragraph',
                        text: 'Dalam tradisi klasik, para ulama sangat memperhatikan faktor-faktor yang dapat mempengaruhi kekuatan memori, baik dari segi spiritual maupun fisik. Ini bukanlah takhayul, melainkan hasil dari pengalaman dan pengamatan mereka.'
                    },
                    {
                        type: 'list',
                        title: 'Faktor-faktor yang Menguatkan Hafalan:',
                        items: ["Kesungguhan dan konsistensi dalam mengulang.", "Mengurangi makan.", "Shalat malam (qiyamul lail), karena saat itu pikiran jernih dan hubungan dengan Allah sangat dekat.", "Membaca Al-Qur\'an (terutama sambil melihat mushaf, karena melatih memori visual).", "Bersiwak, karena membersihkan mulut dan menyegarkan.", "Makan kismis (21 butir setiap pagi) dan madu.", "Bershalawat kepada Nabi SAW.", "Selalu optimis dan berbaik sangka kepada Allah."]
                    },
                    {
                        type: 'list',
                        title: 'Faktor-faktor yang Menyebabkan Lupa (Melemahkan Hafalan):',
                        items: ["Melakukan maksiat.", "Banyaknya dosa dan kegelisahan karena urusan duniawi.", "Makan makanan yang masam (seperti apel masam).", "Membaca tulisan di nisan kuburan (karena mengingatkan pada kefanaan dan dapat melemahkan semangat hidup).", "Melihat orang yang disalib atau dihukum mati.", "Terlalu sering melihat hal-hal yang tidak bermanfaat."]
                    }
                ]
            },
            {
                title: 'FASAL 13: Hal yang Mendatangkan dan Menjauhkan Rezeki',
                body: [
                    {
                        type: 'paragraph',
                        text: 'Seorang penuntut ilmu juga perlu mengetahui sebab-sebab spiritual yang dapat memperlancar atau menghambat rezekinya, agar hatinya tenang dan bisa fokus belajar. Rezeki di sini tidak hanya berarti harta, tetapi juga kesehatan, pemahaman, dan keberkahan waktu.'
                    },
                    {
                        type: 'list',
                        title: 'Amalan yang Dipercaya Mendatangkan Rezeki:',
                        items: ["Bangun pagi-pagi, terutama sebelum Subuh.", "Melaksanakan shalat dengan khusyuk, tuma\'ninah, dan menyempurnakan rukun-rukunnya.", "Membaca Al-Qur\'an secara rutin.", "Mendawamkan (merutinkan) wirid-wirid pagi dan sore.", "Melaksanakan shalat Dhuha.", "Selalu dalam keadaan berwudhu.", "Berbuat baik dan bersedekah kepada sesama makhluk.", "Menjaga silaturahmi.", "Memiliki tulisan (khat) yang bagus dan rapi.", "Jujur dalam berbicara."]
                    },
                    {
                        type: 'list',
                        title: 'Perbuatan yang Dipercaya Menghalangi Rezeki:',
                        items: ["Tidur di waktu Subuh (setelah shalat Subuh hingga terbit matahari), karena itu adalah waktu dibagikannya rezeki.", "Terlalu banyak tidur.", "Menyapu rumah di malam hari (dimaknai sebagai membuang berkah yang turun di malam hari).", "Membiarkan sampah menumpuk di dalam rumah.", "Berjalan di depan orang tua.", "Memanggil orang tua hanya dengan namanya.", "Dusta.", "Meremehkan dosa-dosa kecil.", "Berpura-pura fakir untuk mendapatkan belas kasihan."]
                    }
                ]
            }
        ]
    }
]
