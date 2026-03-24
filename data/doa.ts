export interface Doa {
  title: { id: string; en: string };
  arabic: string;
  latin: string;
  translation: { id: string; en: string };
  source: string;
}

export interface DoaCategory {
  category: { id: string; en: string };
  icon: string;
  prayers: Doa[];
}

export const doaData: DoaCategory[] = [
  {
    category: { id: "Dzikir Pagi & Sore", en: "Morning & Evening Remembrances" },
    icon: "fas fa-cloud-sun",
    prayers: [
      {
        title: { id: "Dzikir Pembuka Pagi", en: "Morning Opening Remembrance" },
        arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرُ.",
        latin: "Ash-bahnaa wa ash-bahal mulku lillah walhamdulillah, laa ilaha illallah wahdahu laa syarika lah, lahul mulku walahul hamdu wa huwa ‘ala kulli syai-in qodir.",
        translation: {
          id: "Kami telah memasuki waktu pagi dan kerajaan hanya milik Allah, segala puji bagi Allah. Tidak ada Tuhan (yang berhak disembah) kecuali Allah semata, tiada sekutu bagi-Nya. Milik-Nya lah kerajaan dan bagi-Nya pujian. Dia-lah Yang Mahakuasa atas segala sesuatu.",
          en: "We have entered the morning and at this very time all sovereignty belongs to Allah, and all praise is for Allah. There is no god but Allah, alone, without any partner. To Him belongs the sovereignty and to Him belongs the praise, and He is powerful over all things."
        },
        source: "HR. Muslim no. 2723"
      },
      {
        title: { id: "Dzikir Pembuka Sore", en: "Evening Opening Remembrance" },
        arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ للهِ، وَالْحَمْدُ للهِ، لَا إِلَهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.",
        latin: "Amsaynaa wa amsal mulku lillah walhamdulillah, laa ilaha illallah wahdahu laa syarika lah, lahul mulku walahul hamdu wa huwa ‘ala kulli syai-in qodir.",
        translation: {
          id: "Kami telah memasuki waktu sore dan kerajaan hanya milik Allah, segala puji bagi Allah. Tidak ada Tuhan (yang berhak disembah) kecuali Allah semata, tiada sekutu bagi-Nya. Milik-Nya lah kerajaan dan bagi-Nya pujian. Dia-lah Yang Mahakuasa atas segala sesuatu.",
          en: "We have entered the evening and at this very time all sovereignty belongs to Allah, and all praise is for Allah. There is no god but Allah, alone, without any partner. To Him belongs the sovereignty and to Him belongs the praise, and He is powerful over all things."
        },
        source: "HR. Muslim no. 2723"
      },
      {
        title: { id: "Sayyidul Istighfar (Raja Istighfar)", en: "The Master of Seeking Forgiveness" },
        arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
        latin: "Allahumma anta rabbii laa ilaaha illaa anta, khalaqtanii wa ana 'abduka, wa ana 'alaa 'ahdika wa wa'dika mas tatho'tu, a'uudzu bika min syarri maa shona'tu, abuu-u laka bini'matika 'alayya, wa abuu-u bi dzanbii, faghfir lii, fa innahu laa yaghfirudz dzunuuba illaa anta.",
        translation: {
          id: "Ya Allah, Engkau adalah Tuhanku, tidak ada Tuhan selain Engkau. Engkau telah menciptakanku dan aku adalah hamba-Mu. Aku berada di atas janji-Mu dan ikrar-Mu semampuku. Aku berlindung kepada-Mu dari kejahatan perbuatanku. Aku mengakui nikmat-Mu kepadaku dan aku mengakui dosaku, maka ampunilah aku. Sungguh, tidak ada yang dapat mengampuni dosa selain Engkau.",
          en: "O Allah, You are my Lord, there is no god but You. You created me and I am Your slave. I am upon Your covenant and Your promise as much as I am able. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me, and I acknowledge my sin, so forgive me, for verily no one forgives sins but You."
        },
        source: "HR. Bukhari no. 6306"
      },
      {
        title: { id: "Doa Memohon Perlindungan (3x)", en: "Seeking Protection (3x)" },
        arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
        latin: "Bismillahilladzi laa yadhurru ma'asmihi syai'un fil ardhi wa laa fis samaa'i wa huwas samii'ul 'aliim.",
        translation: { id: "Dengan nama Allah yang dengan nama-Nya tidak ada sesuatu pun yang dapat membahayakan di bumi maupun di langit, dan Dia-lah Yang Maha Mendengar lagi Maha Mengetahui.", en: "In the name of Allah with whose name nothing can harm on earth or in heaven, and He is the All-Hearing, All-Knowing." },
        source: "HR. Abu Dawud, Tirmidzi"
      },
      {
        title: { id: "Doa Memohon Keselamatan ('Afiyah)", en: "Asking for Well-being ('Afiyah)" },
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي...",
        latin: "Allahumma inni as'alukal-'afiyah fid-dunya wal-akhirah. Allahumma inni as'alukal-'afwa wal-'afiyah fi dini wa dunyaya wa ahli wa mali...",
        translation: { id: "Ya Allah, sesungguhnya aku memohon kepada-Mu 'afiyah (keselamatan) di dunia dan di akhirat. Ya Allah, sesungguhnya aku memohon kepada-Mu ampunan dan 'afiyah dalam agamaku, duniaku, keluargaku, dan hartaku...", en: "O Allah, I ask You for well-being in this world and in the Hereafter. O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family and my wealth..." },
        source: "HR. Abu Dawud"
      },
      {
        title: { id: "Doa Pengakuan Nikmat", en: "Acknowledging Blessings" },
        arabic: "اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ",
        latin: "Allahumma ma ashbaha bi min ni’mah aw bi-ahadin min kholqik, fa minka wahdaka laa syariika lak, fa lakal hamdu wa lakasy syukr.",
        translation: { id: "Ya Allah, nikmat apapun yang ada padaku di pagi ini atau pada salah seorang dari makhluk-Mu, maka itu semua dari-Mu semata, tiada sekutu bagi-Mu. Maka bagi-Mu segala puji dan bagi-Mu segala syukur.", en: "O Allah, whatever blessing I or any of Your creation have risen upon, is from You alone, without partner, so for You is all praise and unto You all gratitude." },
        source: "HR. Abu Dawud"
      },
      {
        title: { id: "Dzikir Tasbih (100x)", en: "Dhikr of Tasbih (100x)" },
        arabic: "سُبْحَانَ اللهِ وَبِحَمْدِهِ",
        latin: "Subhanallahi wa bihamdih.",
        translation: { id: "Maha Suci Allah, aku memuji-Nya.", en: "Glory is to Allah and praise is to Him." },
        source: "HR. Muslim no. 2692"
      },
      {
        title: { id: "Doa Berlindung dari Kesusahan", en: "Seeking Refuge from Hardship" },
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
        latin: "Allahumma inni a'udzu bika minal hammi wal hazan, wa a'udzu bika minal 'ajzi wal kasal, wa a'udzu bika minal jubni wal bukhl, wa a'udzu bika min ghalabatid dayni wa qahrir rijal.",
        translation: { id: "Ya Allah, aku berlindung kepada-Mu dari kegelisahan dan kesedihan, dari kelemahan dan kemalasan, dari sifat pengecut dan kikir, dan dari lilitan utang dan penindasan orang.", en: "O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice, the burden of debts and from being overpowered by men." },
        source: "HR. Bukhari no. 6369"
      },
      {
        title: { id: "Doa Memohon Kesehatan (3x)", en: "Asking for Health (3x)" },
        arabic: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ",
        latin: "Allahumma 'afini fi badani, Allahumma 'afini fi sam'i, Allahumma 'afini fi bashari, la ilaha illa anta.",
        translation: { id: "Ya Allah, sehatkanlah badanku. Ya Allah, sehatkanlah pendengaranku. Ya Allah, sehatkanlah penglihatanku. Tidak ada Tuhan selain Engkau.", en: "O Allah, make my body healthy. O Allah, make my hearing healthy. O Allah, make my sight healthy. There is no god but You." },
        source: "HR. Abu Dawud"
      },
      {
        title: { id: "Ayat Kursi", en: "Verse of the Throne (Ayat Al-Kursi)" },
        arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ...",
        latin: "Allahu la ilaha illa huwal hayyul qayyum, laa ta'khudzuhu sinatuw wala naum, lahu ma fis samawati wa ma fil ardh...",
        translation: { id: "Allah, tidak ada Tuhan (yang berhak disembah) melainkan Dia Yang Hidup kekal lagi terus menerus mengurus (makhluk-Nya); tidak mengantuk dan tidak tidur. Kepunyaan-Nya apa yang di langit dan di bumi...", en: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth..." },
        source: "QS. Al-Baqarah: 255"
      },
    ]
  },
  {
    category: { id: "Aktivitas Sehari-hari", en: "Daily Activities" },
    icon: "fas fa-walking",
    prayers: [
      {
        title: { id: "Doa Sebelum Tidur", en: "Before Sleeping" },
        arabic: "بِاسْمِكَ اللَّهُمَّ أَحْيَا وَأَمُوتُ",
        latin: "Bismika Allahumma ahya wa amut.",
        translation: { id: "Dengan nama-Mu, ya Allah, aku hidup dan aku mati.", en: "In Your name, O Allah, I live and I die." },
        source: "HR. Bukhari no. 6324"
      },
      {
        title: { id: "Doa Bangun Tidur", en: "Waking Up" },
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
        latin: "Alhamdulillahilladzi ahyana ba'da ma amatana wa ilaihin nusyur.",
        translation: { id: "Segala puji bagi Allah, yang telah menghidupkan kami setelah mematikan kami, dan kepada-Nya lah kami kembali.", en: "All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection." },
        source: "HR. Bukhari no. 6324"
      },
      {
        title: { id: "Doa Sebelum Makan", en: "Before Eating" },
        arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
        latin: "Allahumma baarik lanaa fiimaa rozaqtanaa wa qinaa 'adzaaban naar.",
        translation: { id: "Ya Allah, berkahilah kami dalam rezeki yang telah Engkau berikan kepada kami dan peliharalah kami dari siksa api neraka.", en: "O Allah, bless us in what You have provided for us and protect us from the punishment of the Hellfire." },
        source: "HR. Ibnu as-Sunni"
      },
      {
        title: { id: "Doa Sesudah Makan", en: "After Eating" },
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
        latin: "Alhamdulillahilladzi ath'amanaa wa saqoonaa wa ja'alanaa minal muslimiin.",
        translation: { id: "Segala puji bagi Allah yang telah memberi kami makan dan minum, serta menjadikan kami seorang muslim.", en: "All praise is for Allah who has fed us and given us drink, and made us Muslims." },
        source: "HR. Abu Dawud, Tirmidzi"
      },
      {
        title: { id: "Doa Memakai Pakaian", en: "When Wearing a Garment" },
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
        latin: "Alhamdulillahilladzi kasaani hadzaa wa rozaqoniihi min ghoiri hawlin minni wa laa quwwatin.",
        translation: { id: "Segala puji bagi Allah yang telah memberiku pakaian ini dan menganugerahkannya kepadaku tanpa daya dan kekuatan dariku.", en: "All praise is for Allah who has clothed me with this and provided it for me without any might or power from myself." },
        source: "HR. Abu Dawud"
      },
      {
        title: { id: "Doa Masuk WC", en: "Entering the Toilet" },
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
        latin: "Allahumma inni a'udzu bika minal khubutsi wal khaba'its.",
        translation: { id: "Ya Allah, aku berlindung kepada-Mu dari setan laki-laki dan setan perempuan.", en: "O Allah, I seek refuge in You from the male and female devils." },
        source: "HR. Bukhari dan Muslim"
      },
      {
        title: { id: "Doa Keluar WC", en: "Exiting the Toilet" },
        arabic: "غُفْرَانَكَ",
        latin: "Ghufronaka.",
        translation: { id: "Aku memohon ampunan-Mu.", en: "I seek Your forgiveness." },
        source: "HR. Tirmidzi, Abu Dawud"
      },
      {
        title: { id: "Doa Ketika Turun Hujan", en: "When it Rains" },
        arabic: "اللَّهُمَّ صَيِّباً نَافِعاً",
        latin: "Allahumma shoyyiban naafi'an.",
        translation: { id: "Ya Allah, turunkanlah hujan yang bermanfaat.", en: "O Allah, let it be a beneficial rain." },
        source: "HR. Bukhari"
      }
    ]
  },
  {
    category: { id: "Rumah & Keluarga", en: "Home & Family" },
    icon: "fas fa-home",
    prayers: [
      {
        title: { id: "Doa Untuk Kedua Orang Tua", en: "For Both Parents" },
        arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
        latin: "Rabbighfir lii wa liwaalidayya warhamhumaa kamaa robbayaanii shoghiiroo.",
        translation: { id: "Ya Tuhanku, ampunilah aku dan kedua orang tuaku, dan sayangilah mereka sebagaimana mereka telah mendidikku di waktu kecil.", en: "My Lord, forgive me and my parents, and have mercy upon them as they brought me up [when I was] small." },
        source: "QS. Al-Isra': 24 (Modifikasi)"
      },
      {
        title: { id: "Doa Kebaikan Dunia Akhirat", en: "For Goodness in This World & Hereafter" },
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        latin: "Rabbana aatina fid-dunya hasanah wa fil-akhirati hasanah wa qina 'adzaaban-nar.",
        translation: { id: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka.", en: "Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire." },
        source: "QS. Al-Baqarah: 201"
      },
      {
        title: { id: "Doa Masuk Rumah", en: "Entering The House" },
        arabic: "بِسْمِ اللهِ وَلَجْنَا، وَبِسْمِ اللهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا",
        latin: "Bismillahi walajnaa, wa bismillahi kharajnaa, wa'ala rabbina tawakkalnaa.",
        translation: { id: "Dengan nama Allah kami masuk, dengan nama Allah kami keluar, dan hanya kepada Tuhan kami, kami bertawakkal.", en: "In the name of Allah we enter, and in the name of Allah we leave, and upon our Lord we rely." },
        source: "HR. Abu Dawud"
      },
      {
        title: { id: "Doa Keluar Rumah", en: "Exiting The House" },
        arabic: "بِسْمِ اللهِ، تَوَكَّلْتُ عَلَى اللهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ",
        latin: "Bismillahi, tawakkaltu 'alallah, laa haula wa laa quwwata illa billah.",
        translation: { id: "Dengan nama Allah, aku bertawakkal kepada Allah. Tiada daya dan kekuatan kecuali dengan Allah.", en: "In the name of Allah, I have placed my trust in Allah, there is no might and no power except with Allah." },
        source: "HR. Abu Dawud, Tirmidzi"
      },
      {
        title: { id: "Doa Saat Bercermin", en: "When Looking in the Mirror" },
        arabic: "اللَّهُمَّ كَمَا حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي",
        latin: "Allahumma kamaa hassanta khalqii fahassin khuluqii.",
        translation: { id: "Ya Allah, sebagaimana Engkau telah memperindah rupaku, maka perindahlah pula akhlakku.", en: "O Allah, as You have beautified my physical form, so beautify my character." },
        source: "HR. Ahmad"
      },
      {
        title: { id: "Doa Memohon Keturunan yang Baik", en: "Asking for Good Offspring" },
        arabic: "رَبِّ هَبْ لِي مِنَ الصَّالِحِينَ",
        latin: "Rabbi hab lii minash-shoolihin.",
        translation: { id: "Ya Tuhanku, anugerahkanlah kepadaku (seorang anak) yang termasuk orang-orang yang saleh.", en: "My Lord, grant me [a child] from among the righteous." },
        source: "QS. Ash-Shaffat: 100"
      },
      {
        title: { id: "Doa Perlindungan untuk Keluarga", en: "Seeking Protection for the Family" },
        arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
        latin: "A'uudzu bi kalimaatillahit-taammaati min syarri maa kholaq.",
        translation: { id: "Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan makhluk-Nya.", en: "I seek refuge in the perfect words of Allah from the evil of that which He has created." },
        source: "HR. Muslim"
      },
      {
        title: { id: "Doa Pasangan Penyejuk Hati", en: "For a Comforting Family" },
        arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
        latin: "Rabbanaa hab lanaa min azwaajinaa wa dzurriyyaatinaa qurrota a'yun, waj'alnaa lil muttaqiina imaamaa.",
        translation: { id: "Ya Tuhan kami, anugerahkanlah kepada kami pasangan kami dan keturunan kami sebagai penyenang hati (kami), dan jadikanlah kami pemimpin bagi orang-orang yang bertakwa.", en: "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us a leader for the righteous." },
        source: "QS. Al-Furqan: 74"
      }
    ]
  },
  {
    category: { id: "Ilmu & Pekerjaan", en: "Knowledge & Work" },
    icon: "fas fa-briefcase",
    prayers: [
      {
        title: { id: "Doa Sebelum Belajar", en: "Before Studying" },
        arabic: "رَبِّ زِدْنِي عِلْمًا، وَارْزُقْنِيْ فَهْمًا",
        latin: "Rabbi zidnii 'ilman, warzuqnii fahman.",
        translation: { id: "Ya Tuhanku, tambahkanlah aku ilmu dan berikanlah aku pemahaman yang baik.", en: "My Lord, increase me in knowledge and grant me understanding." },
        source: "Populer (dari QS. Taha: 114)"
      },
      {
        title: { id: "Doa Memohon Ilmu Bermanfaat", en: "Seeking Beneficial Knowledge" },
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا",
        latin: "Allahumma innii as-aluka 'ilman naafi'an, wa rizqon thoyyiban, wa 'amalan mutaqobbalan.",
        translation: { id: "Ya Allah, aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang baik, dan amalan yang diterima.", en: "O Allah, I ask You for knowledge that is of benefit, a good provision, and deeds that will be accepted." },
        source: "HR. Ibnu Majah"
      },
      {
        title: { id: "Doa Dimudahkan Urusan", en: "For Ease in Affairs" },
        arabic: "رَبِّ اشْرَحْ لِي صَدْرِي، وَيَسِّرْ لِي أَمْرِي، وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي، يَفْقَهُوا قَوْلِي",
        latin: "Rabbisyrah lii shodrii, wa yassir lii amrii, wahlul 'uqdatam mil lisaanii, yafqohuu qoulii.",
        translation: { id: "Ya Tuhanku, lapangkanlah dadaku, mudahkanlah untukku urusanku, dan lepaskanlah kekakuan dari lidahku, agar mereka mengerti perkataanku.", en: "My Lord, expand for me my breast [with assurance], and ease for me my task, and untie the knot from my tongue, that they may understand my speech." },
        source: "QS. Taha: 25-28"
      },
      {
        title: { id: "Doa Agar Diberi Petunjuk", en: "Asking for Guidance" },
        arabic: "اللَّهُمَّ أَرِنَا الْحَقَّ حَقًّا وَارْزُقْنَا اتِّبَاعَهُ، وَأَرِنَا الْبَاطِلَ بَاطِلًا وَارْزُقْنَا اجْتِنَابَهُ",
        latin: "Allahumma arinal-haqqo haqqon warzuqnat-tibaa'ah, wa arinal-baathila baathilan warzuqnaj-tinaabah.",
        translation: { id: "Ya Allah, tunjukkanlah kepada kami yang benar itu benar dan berilah kami kemampuan untuk mengikutinya, dan tunjukkanlah kepada kami yang batil itu batil dan berilah kami kemampuan untuk menjauhinya.", en: "O Allah, show us the truth as truth and grant us the ability to follow it, and show us falsehood as falsehood and grant us the ability to avoid it." },
        source: "Doa Umar bin Khattab"
      },
      {
        title: { id: "Doa Memohon Rezeki Halal", en: "Seeking Halal Provision" },
        arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
        latin: "Allahummak-finii bi halaalika 'an haroomik, wa agh-ninii bi fadhlika 'amman siwaak.",
        translation: { id: "Ya Allah, cukupkanlah aku dengan yang halal dan jauhkanlah aku dari yang haram, dan kayakanlah aku dengan karunia-Mu dari bergantung pada selain-Mu.", en: "O Allah, suffice me with what You have made lawful and keep me away from what You have made unlawful, and enrich me by Your grace so that I have no need of anyone but You." },
        source: "HR. Tirmidzi"
      },
       {
        title: { id: "Doa Sesudah Belajar", en: "After Studying" },
        arabic: "اللَّهُمَّ إِنِّي أَسْتَوْدِعُكَ مَا عَلَّمْتَنِيهِ، فَارْدُدْهُ إِلَيَّ عِنْدَ حَاجَتِي إِلَيْهِ، وَلَا تُنْسِنِيهِ يَا رَبَّ الْعَالَمِينَ",
        latin: "Allahumma inni astaudi’uka ma ‘allamtaniihi, fardud-hu ilayya ‘inda haajati ilaihi, wa laa tunsiniihi yaa robbal ‘aalamiin.",
        translation: { id: "Ya Allah, sesungguhnya aku titipkan kepada-Mu apa yang telah Engkau ajarkan kepadaku, maka kembalikanlah ia kepadaku ketika aku membutuhkannya. Dan janganlah Engkau buat aku lupa padanya, wahai Tuhan semesta alam.", en: "O Allah, I entrust to You what You have taught me, so return it to me when I am in need of it, and do not make me forget it, O Lord of the worlds." },
        source: "Doa Populer"
      },
      {
        title: { id: "Doa Berlindung dari Ilmu yang Tak Bermanfaat", en: "Seeking Refuge from Useless Knowledge" },
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عِلْمٍ لَا يَنْفَعُ، وَمِنْ قَلْبٍ لَا يَخْشَعُ، وَمِنْ نَفْسٍ لَا تَشْبَعُ، وَمِنْ دَعْوَةٍ لَا يُسْتَجَابُ لَهَا",
        latin: "Allahumma inni a'udzu bika min 'ilmin laa yanfa', wa min qalbin laa yakhsya', wa min nafsin laa tasyba', wa min da'watin laa yustajaabu lahaa.",
        translation: { id: "Ya Allah, aku berlindung kepada-Mu dari ilmu yang tidak bermanfaat, dari hati yang tidak khusyuk, dari jiwa yang tidak pernah puas, dan dari doa yang tidak dikabulkan.", en: "O Allah, I seek refuge in You from knowledge which does not benefit, from a heart that does not humble itself, from a soul that is not satisfied, and from a supplication that is not answered." },
        source: "HR. Muslim"
      }
    ]
  },
  {
    category: { id: "Kesehatan & Keselamatan", en: "Health & Safety" },
    icon: "fas fa-heartbeat",
    prayers: [
      {
        title: { id: "Doa Saat Sakit", en: "When Ill" },
        arabic: "اللَّهُمَّ رَبَّ النَّاسِ، أَذْهِبِ الْبَأْسَ، اشْفِ أَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا",
        latin: "Allahumma rabban-nas, adzhibil-ba's, isyfi antasy-syafi, laa syifa-a illa syifa-uk, syifa-an laa yughadiru saqaman.",
        translation: { id: "Ya Allah, Tuhan manusia, hilangkanlah penyakit ini, sembuhkanlah, Engkaulah Yang Maha Penyembuh, tidak ada kesembuhan kecuali kesembuhan dari-Mu, kesembuhan yang tidak meninggalkan penyakit.", en: "O Allah, Lord of mankind, remove the harm, heal, for You are the Healer. There is no healing except Your healing, a healing that leaves no illness behind." },
        source: "HR. Bukhari"
      },
      {
        title: { id: "Doa Menjenguk Orang Sakit", en: "Visiting The Sick" },
        arabic: "أَسْأَلُ اللَّهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ",
        latin: "As'alullahal-'azhiim, rabbal-'arsyil-'azhiim, an yasyfiyak.",
        translation: { id: "Aku memohon kepada Allah yang Maha Agung, Tuhan 'Arsy yang Agung, semoga Dia menyembuhkanmu. (Dibaca 7x)", en: "I ask Allah the Great, Lord of the Great Throne, to heal you. (Recited 7 times)" },
        source: "HR. Abu Dawud, Tirmidzi"
      },
      {
        title: { id: "Doa Saat Tertimpa Musibah", en: "When Afflicted with a Calamity" },
        arabic: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ، اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي، وَأَخْلِفْ لِي خَيْرًا مِنْهَا",
        latin: "Inna lillahi wa inna ilaihi raji'un. Allahumma'jurni fii mushibati, wa akhlif lii khairan minha.",
        translation: { id: "Sesungguhnya kami milik Allah dan kepada-Nya lah kami kembali. Ya Allah, berilah aku pahala dalam musibahku ini dan gantilah untukku dengan yang lebih baik darinya.", en: "Indeed, we belong to Allah, and indeed to Him we will return. O Allah, reward me in my affliction and replace it for me with something better." },
        source: "HR. Muslim"
      },
      {
        title: { id: "Doa Mohon Keselamatan", en: "Asking for Well-being" },
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ",
        latin: "Allahumma inni as'alukal-'afiyah fid-dunya wal-akhirah.",
        translation: { id: "Ya Allah, sesungguhnya aku memohon kepada-Mu 'afiyah (keselamatan dan kesejahteraan) di dunia dan di akhirat.", en: "O Allah, I ask You for well-being in this world and in the Hereafter." },
        source: "HR. Abu Dawud"
      },
      {
        title: { id: "Doa Ketika Mendengar Petir", en: "When Hearing Thunder" },
        arabic: "سُبْحَانَ الَّذِي يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلَائِكَةُ مِنْ خِيفَتِهِ",
        latin: "Subhanalladzi yusabbihur ro'du bihamdihi wal mala-ikatu min khiifatih.",
        translation: { id: "Maha Suci Allah yang petir bertasbih dengan memuji-Nya, dan begitu juga para malaikat, karena takut kepada-Nya.", en: "Glory is to Him whom the thunder glorifies with His praise, and the angels, out of fear of Him." },
        source: "Al-Muwatha'"
      },
      {
        title: { id: "Doa Berlindung dari Penyakit Buruk", en: "Seeking Refuge from Bad Diseases" },
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْبَرَصِ، وَالْجُنُونِ، وَالْجُذَامِ، وَمِنْ سَيِّئِ الأَسْقَامِ",
        latin: "Allahumma inni a'udzu bika minal barash, wal junuun, wal judzaam, wa min sayyi'il asqoom.",
        translation: { id: "Ya Allah, aku berlindung kepada-Mu dari penyakit belang, gila, kusta, dan dari penyakit-penyakit yang buruk lainnya.", en: "O Allah, I seek refuge in You from leprosy, madness, elephantiasis, and from all bad diseases." },
        source: "HR. Abu Dawud"
      },
       {
        title: { id: "Doa Ketika Marah", en: "When Angry" },
        arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
        latin: "A'uudzu billaahi minasy-syaithoonir-rojiim.",
        translation: { id: "Aku berlindung kepada Allah dari setan yang terkutuk.", en: "I seek refuge in Allah from the accursed devil." },
        source: "HR. Bukhari dan Muslim"
      }
    ]
  },
  {
    category: { id: "Perjalanan", en: "Travel" },
    icon: "fas fa-plane",
    prayers: [
      {
        title: { id: "Doa Naik Kendaraan", en: "When Mounting a Vehicle" },
        arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
        latin: "Subhanalladzi sakhkhara lana hadza wa ma kunna lahu muqrinin, wa inna ila rabbina lamunqalibun.",
        translation: { id: "Maha Suci Tuhan yang telah menundukkan semua ini bagi kami padahal kami sebelumnya tidak mampu menguasainya, dan sesungguhnya kami akan kembali kepada Tuhan kami.", en: "Glory is to Him Who has subjected this to us, and we could never have it (by our own efforts). And verily, to Our Lord we are to return." },
        source: "QS. Az-Zukhruf: 13-14"
      },
      {
        title: { id: "Doa Saat Bepergian (Safar)", en: "Prayer of the Traveler" },
        arabic: "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى...",
        latin: "Allahumma inna nas'aluka fi safarina hadzal-birra wat-taqwa, wa minal-'amali ma tardha...",
        translation: { id: "Ya Allah, kami memohon kepada-Mu dalam perjalanan kami ini kebaikan dan ketakwaan, dan dari amalan yang Engkau ridhai...", en: "O Allah, we ask You on this journey of ours for righteousness and piety, and for works that are pleasing to You..." },
        source: "HR. Muslim"
      },
      {
        title: { id: "Doa Saat Tiba di Suatu Tempat", en: "When Arriving at a Destination" },
        arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
        latin: "A'udzu bikalimatillahit-tammati min syarri ma khalaq.",
        translation: { id: "Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan makhluk-Nya.", en: "I seek refuge in the perfect words of Allah from the evil of that which He has created." },
        source: "HR. Muslim"
      },
      {
        title: { id: "Doa Musafir untuk yang Ditinggal", en: "Traveler's Prayer for Residents" },
        arabic: "أَسْتَوْدِعُكُمُ اللَّهَ الَّذِي لَا تَضِيعُ وَدَائِعُهُ",
        latin: "Astawdi'ukumullahalladzi laa tadhi'u wa daa'i'uhu.",
        translation: { id: "Aku menitipkan kalian kepada Allah yang tidak akan hilang titipan-Nya.", en: "I place you in the trust of Allah, whose trusts are never lost." },
        source: "HR. Ahmad, Ibnu Majah"
      },
      {
        title: { id: "Doa Orang yang Ditinggal untuk Musafir", en: "Resident's Prayer for the Traveler" },
        arabic: "أَسْتَوْدِعُ اللَّهَ دِينَكَ، وَأَمَانَتَكَ، وَخَوَاتِيمَ عَمَلِكَ",
        latin: "Astawdi'ullaha diinak, wa amanatak, wa khawatima 'amalik.",
        translation: { id: "Aku menitipkan agamamu, amanahmu, dan akhir dari amalanmu kepada Allah.", en: "I place your religion, your trusts, and the seal of your deeds in the trust of Allah." },
        source: "HR. Abu Dawud, Tirmidzi"
      },
      {
        title: { id: "Doa Saat Kembali dari Perjalanan", en: "When Returning from a Journey" },
        arabic: "آيِبُونَ، تَائِبُونَ، عَابِدُونَ، لِرَبِّنَا حَامِدُونَ",
        latin: "Aayibuun, taa-ibuun, 'aabiduun, lirobbinaa haamiduun.",
        translation: { id: "Kami kembali, kami bertaubat, kami beribadah, dan kepada Tuhan kami, kami memuji.", en: "We are returning, repenting, worshipping, and to our Lord we are praising." },
        source: "HR. Muslim"
      },
      {
        title: { id: "Doa Saat Singgah di Suatu Tempat", en: "When Stopping at a Place" },
        arabic: "رَبِّ أَنْزِلْنِي مُنْزَلًا مُبَارَكًا وَأَنْتَ خَيْرُ الْمُنْزِلِينَ",
        latin: "Rabbi anzilnii munzalan mubaarokan wa anta khoirul munziliin.",
        translation: { id: "Ya Tuhanku, tempatkanlah aku pada tempat yang diberkahi, dan Engkau adalah sebaik-baik Yang memberi tempat.", en: "My Lord, cause me to land at a blessed landing place, and You are the best to accommodate [us]." },
        source: "QS. Al-Mu'minun: 29"
      }
    ]
  },
  {
    category: { id: "Lain-Lain", en: "Miscellaneous" },
    icon: "fas fa-asterisk",
    prayers: [
      {
        title: { id: "Doa Ketika Lupa", en: "Prayer When Forgetting" },
        arabic: "سُبْحَانَ الَّذِي لَا يَنَامُ وَلَا يَنْسَى",
        latin: "Subhanalladzi laa yanaamu wa laa yansaa.",
        translation: {
          id: "Maha Suci Dzat yang tidak pernah tidur dan tidak pernah lupa.",
          en: "Glory be to Him Who neither sleeps nor forgets."
        },
        source: "Doa Populer"
      },
      {
        title: { id: "Doa Berlindung dari Sifat Malas", en: "Seeking Refuge from Laziness" },
        arabic: "اللَّهُمَّ إِنِّى أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ",
        latin: "Allahumma inni a'udzu bika minal 'ajzi wal kasal.",
        translation: {
          id: "Ya Allah, aku berlindung kepada-Mu dari kelemahan dan kemalasan.",
          en: "O Allah, I seek refuge in You from inability and laziness."
        },
        source: "HR. Bukhari no. 6367"
      },
       {
        title: { id: "Doa Ketika Melihat Sesuatu yang Disukai", en: "Prayer Upon Seeing Something Pleasing" },
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ",
        latin: "Alhamdulillahilladzi bini'matihi tatimmus sholihat.",
        translation: {
          id: "Segala puji bagi Allah yang dengan nikmat-Nya segala kebaikan menjadi sempurna.",
          en: "All praise is for Allah by whose favor good deeds are completed."
        },
        source: "HR. Ibnu Majah"
      },
    ]
  }
]
