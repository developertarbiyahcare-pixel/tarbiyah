
export interface FaktaIlmiahTopic {
  id: string;
  title: string;
  icon: string;
  faktaIlmiah: (string | { title: string; points: string[] })[];
  perspektifIslam: string;
}

export const faktaIlmiahData: FaktaIlmiahTopic[] = [
  {
    id: "puasa",
    title: "1. Puasa (Shaum) — Keseimbangan Metabolik, Seluler, dan Spiritual",
    icon: "fas fa-moon",
    faktaIlmiah: [
      {
        title: "Autophagy (Detoksifikasi Seluler)",
        points: [
          "Puasa, terutama puasa intermiten seperti dalam Islam, memicu proses yang disebut autophagy. Ini adalah mekanisme 'pembersihan' di mana sel-sel tubuh mendaur ulang komponen-komponennya yang rusak.",
          "Penelitian oleh Yoshinori Ohsumi, peraih Nobel Kedokteran 2016, membuktikan bahwa autophagy sangat penting untuk mencegah penumpukan protein beracun yang dapat menyebabkan penyakit neurodegeneratif seperti Alzheimer dan Parkinson."
        ]
      },
      {
        title: "Regulasi Hormon & Metabolisme",
        points: [
          "Puasa secara dramatis meningkatkan sensitivitas insulin, yang sangat penting untuk mencegah diabetes tipe 2. Menurut studi di jurnal 'Cell Metabolism', puasa membantu sel merespons insulin dengan lebih baik.",
          "Puasa juga meningkatkan kadar Human Growth Hormone (HGH), hormon yang penting untuk pembakaran lemak, pertumbuhan otot, dan perbaikan sel."
        ]
      },
      {
        title: "Kesehatan Otak (Neuroprotection)",
        points: [
          "Penelitian oleh Dr. Mark Mattson dari Johns Hopkins University menunjukkan puasa meningkatkan produksi BDNF (Brain-Derived Neurotrophic Factor), sebuah protein yang berfungsi sebagai 'pupuk' bagi sel-sel otak, meningkatkan neurogenesis (pertumbuhan sel otak baru), memori, dan mood."
        ]
      }
    ],
    perspektifIslam: "Islam menekankan puasa bukan hanya sebagai detoksifikasi fisik, tetapi juga sebagai detoksifikasi spiritual dan etika. Ia melatih kesabaran, empati terhadap kaum miskin, pengendalian diri (menjaga lisan, pandangan, emosi), dan meningkatkan ketakwaan. Secara psikologis, ini adalah latihan intensif dalam 'emotional regulation' (pengaturan emosi) dan 'impulse control' (pengendalian impuls)."
  },
  {
    id: "zakat",
    title: "2. Zakat & Sedekah — Kesehatan Mental, Sosial, dan Hormonal",
    icon: "fas fa-hand-holding-heart",
    faktaIlmiah: [
      {
        title: "Neurobiologi Altruisme ('Helper's High')",
        points: [
          "Studi pencitraan otak (fMRI) menunjukkan bahwa tindakan memberi atau beramal secara tulus mengaktifkan pusat penghargaan (reward centers) di otak, seperti ventral striatum, yang melepaskan hormon 'bahagia' seperti dopamin dan oksitosin. Fenomena ini sering disebut 'Helper's High'."
        ]
      },
      {
        title: "Pengurangan Stres & Peningkatan Umur Panjang",
        points: [
          "Penelitian di bidang psikoneuroimunologi, seperti yang dirangkum oleh Dr. Stephen G. Post, menunjukkan bahwa orang yang rutin melakukan aktivitas altruistik memiliki tingkat hormon stres (kortisol) yang lebih rendah dan sistem imun yang lebih kuat.",
          "Studi longitudinal, termasuk Harvard Study of Adult Development, menemukan bahwa hubungan sosial yang kuat dan kemurahan hati adalah prediktor umur panjang yang lebih kuat daripada faktor genetik."
        ]
      },
      {
        title: "Perubahan Fokus Kognitif",
        points: [
          "Memberi membantu individu melakukan 'cognitive reframing' (pembingkaian ulang kognitif). Ini mengalihkan fokus dari masalah pribadi (self-focus) ke kebutuhan orang lain (other-focus), yang terbukti secara klinis dapat mengurangi gejala depresi dan kecemasan."
        ]
      }
    ],
    perspektifIslam: "Zakat secara harfiah berarti 'penyucian'. Ia tidak hanya menyucikan harta, tetapi juga menyucikan hati dari penyakit kikir, egoisme, dan cinta dunia yang berlebihan. Secara sosial, zakat adalah instrumen keadilan ekonomi yang menciptakan jaring pengaman sosial, mengurangi kesenjangan, dan membangun masyarakat yang stabil. Stabilitas sosial adalah salah satu pilar utama kesehatan masyarakat (public health)."
  },
  {
    id: "quran",
    title: "3. Membaca Al-Qur’an — Ketenangan Saraf, Fokus, dan Arsitektur Otak",
    icon: "fas fa-book-quran",
    faktaIlmiah: [
      {
        title: "Sinkronisasi Gelombang Otak (Brainwave Entrainment)",
        points: [
          "Bacaan Al-Qur'an yang tartil (lambat dan ritmis) memiliki efek menenangkan yang terukur. Studi menggunakan EEG (Electroencephalography) menunjukkan bahwa mendengarkan atau membaca Al-Qur'an secara khusyuk dapat meningkatkan produksi gelombang otak Alfa dan Theta. Gelombang ini identik dengan kondisi relaksasi mendalam, meditasi, dan peningkatan kreativitas."
        ]
      },
      {
        title: "Stimulasi Saraf Vagus",
        points: [
          "Proses melantunkan bacaan (chanting) yang melibatkan getaran vokal dan pernapasan dalam, seperti saat membaca Al-Qur'an, dapat menstimulasi saraf vagus. Saraf ini adalah komponen utama dari sistem saraf parasimpatis ('rest and digest'). Stimulasi saraf vagus terbukti secara klinis dapat menurunkan detak jantung, tekanan darah, dan mengurangi kecemasan."
        ]
      },
      {
        title: "Peningkatan Neuroplastisitas",
        points: [
          "Proses menghafal dan membaca Al-Qur'an adalah latihan kognitif yang sangat kompleks. Ia melibatkan aktivasi simultan pada area visual (melihat teks), auditori (mendengar bacaan), motorik vokal (melafalkan), dan memori. Aktivitas multi-sistem ini meningkatkan konektivitas saraf dan neuroplastisitas, yang dapat meningkatkan kemampuan fokus jangka panjang dan menjaga kesehatan otak seiring bertambahnya usia."
        ]
      }
    ],
    perspektifIslam: "Al-Qur'an menyebut dirinya sebagai 'Syifa' (penyembuh) bagi apa yang ada di dalam dada (penyakit hati) dan 'Rahmah' (kasih sayang). Interaksi dengan Al-Qur'an bukan sekadar aktivitas kognitif, melainkan sebuah dialog spiritual yang menghidupkan dan menenangkan hati (qalb), yang dalam Islam dianggap sebagai pusat dari kesadaran dan keimanan."
  },
  {
    id: "shalat",
    title: "4. Shalat — Terapi Fisik, Mental, dan Spiritual yang Terstruktur",
    icon: "fas fa-person-praying",
    faktaIlmiah: [
        {
            title: "Takbiratul Ihram & Berdiri (Qiyam)",
            points: ["Gerakan mengangkat tangan membuka rongga dada dan melancarkan aliran oksigen. Berdiri tegak dengan pandangan fokus ke tempat sujud melatih postur dan konsentrasi, mirip dengan teknik 'mindfulness' yang berpusat pada satu titik."]
        },
        {
            title: "Ruku'",
            points: ["Peregangan dinamis yang sempurna untuk otot punggung bawah (erector spinae), paha belakang (hamstring), dan betis. Menurut penelitian di bidang biomekanik, posisi ruku' yang benar membantu menjaga fleksibilitas tulang belakang, mengurangi tekanan pada diskus intervertebralis, dan dapat mencegah nyeri punggung bawah kronis."]
        },
        {
            title: "Sujud",
            points: [
                "Secara fisiologis, ini adalah satu-satunya posisi di mana kepala berada lebih rendah dari jantung, yang secara signifikan meningkatkan aliran darah yang kaya oksigen ke otak. Beberapa studi neurosains ('neurotheology') mengemukakan bahwa peningkatan aliran darah ini dapat menstimulasi lobus frontal, yang bertanggung jawab atas fungsi eksekutif seperti perencanaan, fokus, dan regulasi emosi.",
                "Secara psikologis, sujud adalah postur penyerahan diri total. Penelitian 'embodied cognition' menunjukkan bahwa postur tubuh dapat mempengaruhi emosi. Posisi sujud secara intuitif memicu 'emotional grounding' (penstabilan emosi), menurunkan ego, dan menumbuhkan rasa kerendahan hati."
            ]
        },
        {
            title: "Duduk di Antara Dua Sujud & Tasyahud",
            points: ["Posisi duduk 'iftirasy' dan 'tawarruk' berfungsi sebagai peregangan untuk otot paha bagian dalam, pergelangan kaki, dan jari-jari kaki. Ini membantu menjaga mobilitas dan fleksibilitas sendi panggul, lutut, dan pergelangan kaki."]
        },
        {
            title: "Salam",
            points: ["Gerakan menoleh ke kanan dan kiri secara maksimal hingga melihat bahu adalah peregangan lembut untuk otot leher (sternocleidomastoid dan trapezius). Gerakan ini dapat membantu melepaskan ketegangan yang terakumulasi di area leher dan bahu akibat stres atau postur yang buruk."]
        }
    ],
    perspektifIslam: "Shalat adalah mi’raj (kenaikan spiritual) bagi seorang mukmin. Ia adalah jeda terstruktur yang memutus siklus stres harian sebanyak lima kali. Setiap gerakan memiliki makna simbolis penyerahan diri, dan kesadaran penuh (khusyuk) selama shalat adalah bentuk 'mindfulness meditation' tertinggi yang menenangkan jiwa dan melatih fokus."
  },
  {
    id: "dzikir",
    title: "5. Dzikir — Regulasi Napas, Gelombang Otak, dan Terapi Makna",
    icon: "fas fa-pray",
    faktaIlmiah: [
        {
            title: "Efek Relaksasi Respons (Relaxation Response)",
            points: [
                "Dipopulerkan oleh Dr. Herbert Benson dari Harvard Medical School, 'Relaxation Response' adalah kondisi fisiologis dari istirahat mendalam yang merupakan kebalikan dari respons 'fight-or-flight'. Dzikir yang berulang dan ritmis, dengan fokus pada satu frasa, adalah salah satu pemicu paling efektif untuk respons ini, yang terbukti menurunkan metabolisme, detak jantung, dan tekanan darah."
            ]
        },
        {
            title: "Peningkatan Variabilitas Detak Jantung (HRV)",
            points: [
                "Studi di bidang kardiologi menunjukkan bahwa praktik meditasi berbasis pengulangan (seperti dzikir) dapat meningkatkan Heart Rate Variability (HRV). HRV yang tinggi adalah indikator kunci dari kesehatan sistem saraf otonom, resiliensi terhadap stres, dan ketenangan mental."
            ]
        }
    ],
    perspektifIslam: "Dzikir adalah 'makanan' dan 'pemoles' bagi hati. Rasulullah ﷺ bersabda, 'Perumpamaan orang yang berdzikir kepada Tuhannya dan yang tidak, adalah seperti orang yang hidup dan orang yang mati.' Secara spiritual, dzikir membersihkan hati dari 'karat' dosa dan kelalaian, membuatnya lebih peka terhadap cahaya petunjuk."
  },
  {
    id: "wudhu",
    title: "6. Wudhu — Higienitas, Hidroterapi, dan Stimulasi Saraf",
    icon: "fas fa-hands-wash",
    faktaIlmiah: [
      {
        title: "Manfaat Higienis",
        points: ["Wudhu secara efektif membersihkan area-area tubuh (tangan, mulut, hidung, wajah, kaki) yang paling sering terpapar kuman, polusi, dan bakteri. Menurut Pusat Pengendalian dan Pencegahan Penyakit (CDC), mencuci tangan dengan air adalah salah satu cara paling efektif untuk mencegah penyebaran infeksi."]
      },
      {
        title: "Efek Hidroterapi & Stimulasi Saraf",
        points: [
          "Membasuh wajah, lengan, dan kaki dengan air (terutama air dingin) bekerja seperti bentuk ringan dari 'cold water therapy'. Ini dapat menstimulasi reseptor saraf di kulit yang mengirimkan impuls ke otak, meningkatkan kewaspadaan (alertness), dan melepaskan endorfin.",
          "Beberapa peneliti, seperti Dr. Magomed Magomedov, berteori bahwa area-area wudhu tumpang tindih dengan titik-titik akupunktur atau Biological Active Spots (BAS) yang dapat menstimulasi dan menyeimbangkan sistem saraf."
        ]
      }
    ],
    perspektifIslam: "Wudhu adalah 'cahaya' dan 'senjata' seorang mukmin. Ia bukan sekadar pembersihan fisik, tetapi juga penyucian batin. Rasulullah ﷺ bersabda bahwa ketika seorang hamba berwudhu, dosa-dosa kecilnya akan berguguran bersamaan dengan tetesan air wudhu. Di hari kiamat, umatnya akan dikenali dari cahaya yang memancar dari bekas anggota wudhunya."
  },
  {
    id: "tahajud",
    title: "7. Shalat Tahajud — Regulasi Hormon, Resiliensi Emosi, & Fisiologi Tidur",
    icon: "fas fa-moon",
    faktaIlmiah: [
      {
        title: "Pengaruh pada Hormon Stres dan Kebahagiaan",
        points: [
          "Bangun di sepertiga malam terakhir, saat kondisi lingkungan sangat sunyi dan tenang, lalu melakukan aktivitas meditatif seperti shalat, terbukti dapat menurunkan kadar hormon stres (kortisol) secara signifikan. Sebaliknya, kondisi ini dapat meningkatkan produksi neurotransmitter 'rasa-nyaman' seperti serotonin dan endorfin.",
        ]
      },
      {
        title: "Peningkatan Ketahanan Mental (Resilience)",
        points: [
          "Penelitian di bidang psikologi positif menunjukkan bahwa individu yang memiliki rutinitas spiritual atau reflektif di waktu sunyi (pagi atau malam) cenderung memiliki ketahanan emosional yang lebih tinggi dan kemampuan 'problem-solving' yang lebih jernih. Momen ini memberikan jeda bagi otak dari 'kebisingan' informasi harian."
        ]
      }
    ],
    perspektifIslam: "Allah memuji orang-orang yang 'lambung mereka jauh dari tempat tidurnya' untuk berdoa kepada-Nya (QS. As-Sajdah: 16). Tahajud adalah waktu 'prime time' spiritual, di mana Allah 'turun' ke langit dunia dan bertanya, 'Siapa yang berdoa kepada-Ku, akan Aku kabulkan.' Ini adalah momen koneksi paling intim antara seorang hamba dengan Rabb-nya, sarana penguatan ruhani yang paling mendalam."
  },
  {
    id: "doa",
    title: "8. Doa — Terapi Harapan, Pengurangan Kecemasan, dan Efek Plasebo Positif",
    icon: "fas fa-praying-hands",
    faktaIlmiah: [
      {
        title: "Psikologi Harapan",
        points: ["Berdoa secara aktif menumbuhkan 'sense of hope' (rasa harapan). Penelitian oleh psikolog seperti Dr. Jerome Frank menunjukkan bahwa harapan adalah komponen krusial dalam semua bentuk penyembuhan. Harapan dapat memicu pelepasan neurokimia positif dan bahkan memperkuat sistem imun."]
      },
      {
        title: "Cognitive Reframing & Pengurangan Kecemasan",
        points: ["Doa adalah bentuk 'cognitive reframing' yang kuat. Ia mengubah persepsi terhadap masalah dari 'beban yang tak tertanggungkan' menjadi 'ujian yang memiliki makna dan solusi dari kekuatan yang lebih tinggi'. Proses menyerahkan masalah kepada Tuhan ini terbukti secara klinis dapat mengurangi kecemasan eksistensial dan 'locus of control' internal yang berlebihan."]
      }
    ],
    perspektifIslam: "Doa adalah 'senjata' orang beriman dan 'otak' dari ibadah. Dalam Islam, doa bukan sekadar daftar permintaan, tetapi sebuah pengakuan akan kelemahan diri dan kemahakuasaan Allah. Ini adalah bentuk koneksi batin yang menguatkan ketergantungan (tawakal) kepada Allah, yang merupakan puncak dari ketenangan jiwa."
  },
  {
    id: "silaturahmi",
    title: "9. Silaturahmi — Koneksi Sosial, Kesehatan Emosi, dan Umur Panjang",
    icon: "fas fa-users",
    faktaIlmiah: [
      {
        title: "Prediktor Utama Umur Panjang",
        points: [
          "Studi paling komprehensif tentang kebahagiaan dan kesehatan, 'The Harvard Study of Adult Development', yang berjalan selama lebih dari 80 tahun, menyimpulkan bahwa prediktor terbesar dari kesehatan dan umur panjang bukanlah kolesterol atau kekayaan, melainkan kualitas hubungan sosial yang hangat.",
          "Penelitian oleh Julianne Holt-Lunstad menunjukkan bahwa isolasi sosial (kesepian) memiliki dampak negatif pada mortalitas yang setara dengan merokok 15 batang sehari."
        ]
      },
      {
        title: "Regulasi Stres dan Hormon",
        points: ["Interaksi sosial yang positif, seperti bersilaturahmi, dapat melepaskan hormon oksitosin ('hormon cinta') yang berfungsi sebagai 'penyangga' terhadap efek hormon stres kortisol, serta meningkatkan perasaan percaya dan keterikatan."]
      }
    ],
    perspektifIslam: "Rasulullah ﷺ bersabda, 'Barangsiapa yang ingin dilapangkan rezekinya dan dipanjangkan umurnya, maka hendaklah ia menyambung tali silaturahmi.' (HR. Bukhari & Muslim). Pernyataan ini, 1400 tahun yang lalu, secara menakjubkan telah selaras dengan temuan-temuan sains sosial modern tentang hubungan antara koneksi sosial yang kuat dengan kesejahteraan dan umur panjang."
  },
  {
    id: "haji",
    title: "10. Haji & Umrah — Ketahanan Fisik, Spiritualitas Puncak, dan Kesehatan Emosi",
    icon: "fas fa-kaaba",
    faktaIlmiah: [
      {
        title: "Manfaat Kardiovaskular",
        points: ["Rangkaian ibadah haji, terutama tawaf (berjalan mengelilingi Ka'bah 7 kali) dan sa'i (berjalan/berlari kecil antara Shafa dan Marwah 7 kali), serta berjalan kaki di antara tempat-tempat suci di Mina, Arafah, dan Muzdalifah, merupakan latihan fisik intensitas sedang hingga tinggi yang sangat bermanfaat untuk kesehatan jantung dan sistem kardiorespirasi."]
      },
      {
        title: "Pengalaman Puncak (Peak Experience) & Makna Hidup",
        points: ["Menurut psikolog Abraham Maslow, 'peak experience' adalah momen transendensi yang mendalam yang dapat memberikan makna dan tujuan baru dalam hidup. Ibadah haji, dengan ritualnya yang agung dan suasana spiritual yang intens, seringkali menjadi 'peak experience' bagi banyak jamaah, yang terbukti dapat mengurangi stres eksistensial dan meningkatkan kepuasan hidup secara signifikan setelah kembali."]
      }
    ],
    perspektifIslam: "Haji adalah puncak perjalanan spiritual, sebuah simulasi dari Padang Mahsyar di mana semua manusia dari berbagai bangsa dan status sosial menjadi setara di hadapan Allah, hanya dibalut kain ihram putih. Ia adalah ibadah yang menghapus dosa, membebaskan jiwa dari kesombongan, dan mengukuhkan persaudaraan universal umat Islam."
  },
  {
    id: "muhasabah",
    title: "11. Muhasabah (Refleksi Diri) — Kesehatan Mental dan Pembentukan Karakter",
    icon: "fas fa-brain",
    faktaIlmiah: [
      {
        title: "Expressive Writing dan Sistem Imun",
        points: ["Penelitian pionir oleh Dr. James W. Pennebaker dari University of Texas menunjukkan bahwa menulis jurnal secara teratur tentang pikiran dan perasaan terdalam (expressive writing) memiliki manfaat kesehatan yang terukur. Praktik ini terbukti dapat mengurangi gejala depresi, menurunkan tingkat kecemasan, dan bahkan meningkatkan fungsi sistem imun (diukur dari peningkatan sel T-limfosit)."]
      },
      {
        title: "Peningkatan Kontrol Emosi",
        points: ["Praktik refleksi diri dan introspeksi harian terbukti dapat meningkatkan aktivitas di korteks prefrontal, bagian otak yang bertanggung jawab untuk regulasi emosi, pengambilan keputusan yang rasional, dan kontrol impuls. Ini adalah dasar dari banyak teknik dalam terapi kognitif-perilaku (CBT)."]
      }
    ],
    perspektifIslam: "Umar bin Khattab R.A. berkata, 'Hisablah (introspeksilah) dirimu sebelum kamu dihisab (di hari kiamat).' Muhasabah adalah praktik inti dalam tazkiyatun nafs (penyucian jiwa). Ia mengarahkan jiwa untuk selalu waspada, mengenali kekurangan diri, mensyukuri nikmat, dan segera bertaubat dari kesalahan, yang pada akhirnya akan memperkuat ketenangan hati (nafs al-muthmainnah)."
  },
  {
    id: "ilmu",
    title: "12. Ilmu (Menuntut Ilmu) — Neuroplastisitas dan Cadangan Kognitif",
    icon: "fas fa-book-reader",
    faktaIlmiah: [
      {
        title: "Peningkatan Neuroplastisitas dan Cadangan Kognitif",
        points: [
          "Aktivitas belajar secara aktif, seperti membaca, mempelajari bahasa baru, atau memecahkan masalah, terbukti secara ilmiah dapat meningkatkan neuroplastisitas—kemampuan otak untuk membentuk dan mengatur ulang koneksi sinaptik. Hal ini membangun apa yang disebut 'cognitive reserve' (cadangan kognitif).",
          "Studi di bidang neurologi menunjukkan bahwa individu dengan cadangan kognitif yang lebih tinggi cenderung lebih tahan terhadap kerusakan otak dan dapat menunda timbulnya gejala penyakit neurodegeneratif seperti Alzheimer."
        ]
      }
    ],
    perspektifIslam: "Menuntut ilmu adalah ibadah yang diperintahkan dari buaian hingga liang lahat. Rasulullah ﷺ bersabda, 'Barangsiapa menempuh jalan untuk mencari ilmu, maka Allah akan memudahkan baginya jalan menuju surga.' Dalam Islam, ilmu bukan hanya untuk pengetahuan, tetapi untuk melahirkan 'khasyyah' (rasa takut yang dilandasi pengagungan kepada Allah) dan hikmah, yang pada gilirannya akan menenangkan hati."
  },
];
