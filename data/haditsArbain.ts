
export interface Hadith {
  id: number;
  title: string;
  arabic: string;
  latin: string;
  translation: string;
  primaryNarrator: string;
  compilers: string[];
}

export const haditsArbainData: Hadith[] = [
  {
    id: 1,
    title: 'Niat dan Ikhlas',
    arabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى اللهِ وَرَسُوْلِهِ فَهِجْرَتُهُ إِلَى اللهِ وَرَسُوْلِهِ، وَمَنْ كَانَتْ هِجْرَتُهُ لِدُنْيَا يُصِيْبُهَا أَوِ امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ.',
    latin: "Innamal a'malu binniyat, wa innama likullimri'in ma nawa, faman kanat hijratuhu ilallahi wa rasulihi fahijratuhu ilallahi wa rasulihi, wa man kanat hijratuhu lidunya yusibuha awimra'atin yankihuha fahijratuhu ila ma hajara ilaih.",
    translation: 'Sesungguhnya setiap amalan tergantung pada niatnya. Dan sesungguhnya setiap orang akan mendapatkan apa yang ia niatkan. Barangsiapa yang hijrahnya karena Allah dan Rasul-Nya, maka hijrahnya kepada Allah dan Rasul-Nya. Dan barangsiapa yang hijrahnya karena dunia yang ingin diraihnya atau karena wanita yang ingin dinikahinya, maka hijrahnya kepada apa yang ia tuju.',
    primaryNarrator: 'umar_khattab',
    compilers: ['bukhari', 'muslim']
  },
  {
    id: 2,
    title: 'Iman, Islam, dan Ihsan',
    arabic: 'بَيْنَمَا نَحْنُ جُلُوْسٌ عِنْدَ رَسُوْلِ اللهِ صلى الله عليه وسلم ذَاتَ يَوْمٍ إِذْ طَلَعَ عَلَيْنَا رَجُلٌ شَدِيْدُ بَيَاضِ الثِّيَابِ شَدِيْدُ سَوَادِ الشَّعْرِ، لاَ يُرَى عَلَيْهِ أَثَرُ السَّفَرِ وَلاَ يَعْرِفُهُ مِنَّا أَحَدٌ، حَتَّى جَلَسَ إِلَى النَّبِيِّ صلى الله عليه وسلم فَأَسْنَدَ رُكْبَتَيْهِ إِلَى رُكْبَتَيْهِ وَوَضَعَ كَفَّيْهِ عَلَى فَخِذَيْهِ، وَقَالَ: يَا مُحَمَّدُ، أَخْبِرْنِيْ عَنِ الإِسْلاَمِ، فَقَالَ رَسُوْلُ اللهِ صلى الله عليه وسلم: اَلإِسْلاَمُ أَنْ تَشْهَدَ أَنْ لاَ إِلَهَ إِلاَّ اللهُ وَأَنَّ مُحَمَّدًا رَسُوْلُ اللهِ، وَتُقِيْمَ الصَّلاَةَ، وَتُؤْتِيَ الزَّكَاةَ، وَتَصُوْمَ رَمَضَانَ، وَتَحُجَّ الْبَيْتَ إِنِ اسْتَطَعْتَ إِلَيْهِ سَبِيْلاً، قَالَ: صَدَقْتَ، فَعَجِبْنَا لَهُ يَسْأَلُهُ وَيُصَدِّقُهُ، قَالَ: فَأَخْبِرْنِيْ عَنِ الإِيْمَانِ، قَالَ: أَنْ تُؤْمِنَ بِاللهِ، وَمَلاَئِكَتِهِ، وَكُتُبِهِ، وَرُسُلِهِ، وَالْيَوْمِ الآخِرِ، وَتُؤْمِنَ بِالْقَدَرِ خَيْرِهِ وَشَرِّهِ، قَالَ: صَدَقْتَ، قَالَ: فَأَخْبِرْنِيْ عَنِ الإِحْسَانِ، قَالَ: أَنْ تَعْبُدَ اللهَ كَأَنَّكَ تَرَاهُ فَإِنْ لَمْ تَكُنْ تَرَاهُ فَإِنَّهُ يَرَاكَ...',
    latin: "Bainama nahnu julusun 'inda Rasulillahi shallallahu 'alaihi wa sallam dzata yaumin idz thala'a 'alaina rajulun syadidu bayadits tsiyab syadidu sawadis sya'r, la yura 'alaihi atsarus safar wa la ya'rifuhu minna ahad, hatta jalasa ilan nabiyyi shallallahu 'alaihi wa sallam fa'asnada rukbataihi ila rukbataihi wa wadha'a kaffaihi 'ala fakhidzaihi, wa qala: Ya Muhammad, akhbirni 'anil Islam...",
    translation: 'Ketika kami sedang duduk di sisi Rasulullah SAW pada suatu hari, tiba-tiba muncul seorang laki-laki yang pakaiannya sangat putih, rambutnya sangat hitam, tidak terlihat padanya bekas-bekas perjalanan dan tidak ada seorang pun dari kami yang mengenalnya. Hingga ia duduk di hadapan Nabi SAW lalu menyandarkan lututnya pada lutut Nabi SAW dan meletakkan kedua telapak tangannya di atas kedua pahanya, kemudian berkata: "Wahai Muhammad, beritahukan kepadaku tentang Islam." Maka Rasulullah SAW bersabda: "Islam adalah engkau bersaksi bahwa tidak ada Tuhan selain Allah dan bahwa Muhammad adalah utusan Allah, engkau mendirikan shalat, menunaikan zakat, berpuasa di bulan Ramadhan, dan menunaikan haji ke Baitullah jika engkau mampu." Ia berkata: "Engkau benar." Kami pun heran, ia bertanya lalu ia membenarkannya. Ia bertanya lagi: "Beritahukan kepadaku tentang Iman." Beliau menjawab: "Engkau beriman kepada Allah, malaikat-malaikat-Nya, kitab-kitab-Nya, rasul-rasul-Nya, hari akhir, dan engkau beriman kepada takdir yang baik maupun yang buruk." Ia berkata: "Engkau benar." Ia bertanya lagi: "Beritahukan kepadaku tentang Ihsan." Beliau menjawab: "Engkau beribadah kepada Allah seakan-akan engkau melihat-Nya, maka jika engkau tidak melihat-Nya, sesungguhnya Dia melihatmu."...',
    primaryNarrator: 'umar_khattab',
    compilers: ['muslim']
  },
  {
    id: 3,
    title: 'Rukun Islam',
    arabic: 'بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لاَ إِلَهَ إِلاَّ اللهُ وَأَنَّ مُحَمَّدًا رَسُوْلُ اللهِ، وَإِقَامِ الصَّلاَةِ، وَإِيْتَاءِ الزَّكَاةِ، وَحَجِّ الْبَيْتِ، وَصَوْمِ رَمَضَانَ.',
    latin: "Buniyal Islamu 'ala khamsin: syahadati an la ilaha illallah wa anna Muhammadan rasulullah, wa iqamis shalah, wa ita'iz zakah, wa hajjil bait, wa saumi ramadhan.",
    translation: 'Islam dibangun di atas lima perkara: bersaksi bahwa tidak ada Tuhan selain Allah dan bahwa Muhammad adalah utusan Allah, mendirikan shalat, menunaikan zakat, haji ke Baitullah, dan puasa Ramadhan.',
    primaryNarrator: 'abdullah_umar',
    compilers: ['bukhari', 'muslim']
  },
  {
    id: 4,
    title: 'Takdir Manusia',
    arabic: 'إِنَّ أَحَدَكُمْ يُجْمَعُ خَلْقُهُ فِيْ بَطْنِ أُمِّهِ أَرْبَعِيْنَ يَوْمًا نُطْفَةً، ثُمَّ يَكُوْنُ عَلَقَةً مِثْلَ ذَلِكَ، ثُمَّ يَكُوْنُ مُضْغَةً مِثْلَ ذَلِكَ، ثُمَّ يُرْسَلُ إِلَيْهِ الْمَلَكُ فَيَنْفُخُ فِيْهِ الرُّوْحَ، وَيُؤْمَرُ بِأَرْبَعِ كَلِمَاتٍ: بِكَتْبِ رِزْقِهِ، وَأَجَلِهِ، وَعَمَلِهِ، وَشَقِيٌّ أَوْ سَعِيْدٌ...',
    latin: "Inna ahadakum yujma'u khalquhu fi bathni ummihi arba'ina yauman nuthfah, tsumma yakunu 'alaqatan mitsla dzalik, tsumma yakunu mudhghatan mitsla dzalik, tsumma yursalu ilaihil malaku fayanfukhu fihir ruh, wa yu'maru bi'arba'i kalimatin: bikatbi rizqihi, wa ajalihi, wa 'amalihi, wa syaqiyyun aw sa'id...",
    translation: 'Sesungguhnya setiap orang di antara kalian dikumpulkan penciptaannya di dalam perut ibunya selama empat puluh hari berupa nutfah (sperma), kemudian menjadi ‘alaqah (segumpal darah) selama itu pula, kemudian menjadi mudhghah (segumpal daging) selama itu pula. Kemudian diutuslah kepadanya seorang malaikat, lalu ia meniupkan ruh kepadanya dan diperintahkan untuk menuliskan empat kalimat: rezekinya, ajalnya, amalnya, dan celaka atau bahagianya...',
    primaryNarrator: 'abdullah_masud',
    compilers: ['bukhari', 'muslim']
  },
  {
    id: 5,
    title: 'Larangan Mengada-ada dalam Agama',
    arabic: 'مَنْ أَحْدَثَ فِيْ أَمْرِنَا هَذَا مَا لَيْسَ مِنْهُ فَهُوَ رَدٌّ.',
    latin: "Man ahdatsa fi amrina hadza ma laisa minhu fahuwa raddun.",
    translation: 'Barangsiapa mengada-adakan dalam urusan (agama) kami ini yang bukan bagian darinya, maka ia tertolak.',
    primaryNarrator: 'aisyah',
    compilers: ['bukhari', 'muslim']
  },
  {
    id: 6,
    title: 'Halal dan Haram yang Jelas',
    arabic: 'إِنَّ الْحَلاَلَ بَيِّنٌ، وَإِنَّ الْحَرَامَ بَيِّنٌ، وَبَيْنَهُمَا أُمُوْرٌ مُشْتَبِهَاتٌ لاَ يَعْلَمُهُنَّ كَثِيْرٌ مِنَ النَّاسِ، فَمَنِ اتَّقَى الشُّبُهَاتِ فَقَدِ اسْتَبْرَأَ لِدِيْنِهِ وَعِرْضِهِ...',
    latin: "Innal halala bayyinun, wa innal harama bayyinun, wa bainahuma umurum musytabihatul la ya'lamuhunna katsirum minan nas, famanittaqasy syubuhati faqadistabra'a lidinihi wa 'irdhihi...",
    translation: 'Sesungguhnya yang halal itu jelas dan yang haram itu jelas, dan di antara keduanya terdapat perkara-perkara yang syubhat (samar-samar) yang tidak diketahui oleh banyak orang. Maka barangsiapa yang menjauhi perkara-perkara syubhat, berarti ia telah membersihkan agama dan kehormatannya...',
    primaryNarrator: 'numan_basyir',
    compilers: ['bukhari', 'muslim']
  },
  {
    id: 7,
    title: 'Agama adalah Nasihat',
    arabic: 'الدِّيْنُ النَّصِيْحَةُ. قُلْنَا: لِمَنْ؟ قَالَ: لِلَّهِ، وَلِكِتَابِهِ، وَلِرَسُوْلِهِ، وَلأَئِمَّةِ الْمُسْلِمِيْنَ، وَعَامَّتِهِمْ.',
    latin: "Ad-dinun nasihah. Qulna: liman? Qala: lillahi, wa likitabihi, wa lirasulihi, wa li'a'immatil muslimin, wa 'ammatihim.",
    translation: 'Agama adalah nasihat. Kami bertanya: "Untuk siapa?" Beliau menjawab: "Untuk Allah, kitab-Nya, Rasul-Nya, para pemimpin kaum muslimin, dan untuk kaum awam mereka."',
    primaryNarrator: 'tamim_dari',
    compilers: ['muslim']
  },
  {
    id: 8,
    title: 'Kehormatan Muslim',
    arabic: 'أُمِرْتُ أَنْ أُقَاتِلَ النَّاسَ حَتَّى يَشْهَدُوا أَنْ لاَ إِلَهَ إِلاَّ اللهُ وَأَنَّ مُحَمَّدًا رَسُوْلُ اللهِ، وَيُقِيْمُوا الصَّلاَةَ، وَيُؤْتُوا الزَّكَاةَ، فَإِذَا فَعَلُوا ذَلِكَ عَصَمُوا مِنِّيْ دِمَاءَهُمْ وَأَمْوَالَهُمْ إِلاَّ بِحَقِّ الإِسْلاَمِ، وَحِسَابُهُمْ عَلَى اللهِ تَعَالَى.',
    latin: "Umirtu an uqatilan nasa hatta yasyhadu an la ilaha illallah wa anna Muhammadan rasulullah, wa yuqimus shalah, wa yu'tuz zakah, fa'idza fa'alu dzalika 'ashamu minni dima'ahum wa amwalahum illa bihaqqil Islam, wa hisabuhum 'alallahi ta'ala.",
    translation: 'Aku diperintahkan untuk memerangi manusia hingga mereka bersaksi bahwa tidak ada Tuhan selain Allah dan bahwa Muhammad adalah utusan Allah, mendirikan shalat, dan menunaikan zakat. Jika mereka melakukan itu, maka mereka telah melindungi darah dan harta mereka dariku, kecuali dengan hak Islam, dan hisab mereka ada pada Allah Ta\'ala.',
    primaryNarrator: 'abdullah_umar',
    compilers: ['bukhari', 'muslim']
  },
  {
    id: 9,
    title: 'Melaksanakan Perintah Sesuai Kemampuan',
    arabic: 'مَا نَهَيْتُكُمْ عَنْهُ فَاجْتَنِبُوْهُ، وَمَا أَمَرْتُكُمْ بِهِ فَأْتُوا مِنْهُ مَا اسْتَطَعْتُمْ...',
    latin: "Ma nahaitukum 'anhu fajtanibuhu, wa ma amartukum bihi fa'tu minhu mastatha'tum...",
    translation: 'Apa yang aku larang kalian darinya, maka jauhilah. Dan apa yang aku perintahkan kepada kalian, maka kerjakanlah semampu kalian...',
    primaryNarrator: 'abu_hurairah',
    compilers: ['bukhari', 'muslim']
  },
  {
    id: 10,
    title: 'Makan dari yang Baik',
    arabic: 'إِنَّ اللهَ تَعَالَى طَيِّبٌ لاَ يَقْبَلُ إِلاَّ طَيِّبًا...',
    latin: "Innallaha ta'ala thayyibun la yaqbalu illa thayyiban...",
    translation: 'Sesungguhnya Allah Ta\'ala itu baik dan tidak menerima kecuali yang baik...',
    primaryNarrator: 'abu_hurairah',
    compilers: ['muslim']
  },
  {
    id: 11,
    title: 'Tinggalkan Keraguan',
    arabic: 'دَعْ مَا يَرِيْبُكَ إِلَى مَا لاَ يَرِيْبُكَ.',
    latin: "Da' ma yaribuka ila ma la yaribuka.",
    translation: 'Tinggalkanlah apa yang meragukanmu kepada apa yang tidak meragukanmu.',
    primaryNarrator: 'hasan_ali',
    compilers: ['tirmidzi', 'nasai']
  },
  {
    id: 12,
    title: 'Meninggalkan yang Tidak Bermanfaat',
    arabic: 'مِنْ حُسْنِ إِسْلاَمِ الْمَرْءِ تَرْكُهُ مَا لاَ يَعْنِيْهِ.',
    latin: "Min husni islamil mar'i tarkuhu ma la ya'nih.",
    translation: 'Di antara baiknya keislaman seseorang adalah meninggalkan apa yang tidak bermanfaat baginya.',
    primaryNarrator: 'abu_hurairah',
    compilers: ['tirmidzi']
  },
  {
    id: 13,
    title: 'Mencintai Kebaikan untuk Saudaranya',
    arabic: 'لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيْهِ مَا يُحِبُّ لِنَفْسِهِ.',
    latin: "La yu'minu ahadukum hatta yuhibba li'akhihi ma yuhibbu linafsih.",
    translation: 'Tidaklah beriman salah seorang di antara kalian hingga ia mencintai untuk saudaranya apa yang ia cintai untuk dirinya sendiri.',
    primaryNarrator: 'anas_malik',
    compilers: ['bukhari', 'muslim']
  },
  {
    id: 14,
    title: 'Hukuman dalam Islam',
    arabic: 'لاَ يَحِلُّ دَمُ امْرِئٍ مُسْلِمٍ إِلاَّ بِإِحْدَى ثَلاَثٍ: الثَّيِّبُ الزَّانِي، وَالنَّفْسُ بِالنَّفْسِ، وَالتَّارِكُ لِدِيْنِهِ الْمُفَارِقُ لِلْجَمَاعَةِ.',
    latin: "La yahillu damumri'in muslimin illa bi'ihda tsalats: ats-tsayyibuz zani, wan nafsu bin nafs, wat tariku lidinihil mufariqu liljama'ah.",
    translation: 'Tidak halal darah seorang muslim kecuali karena salah satu dari tiga sebab: orang yang sudah menikah yang berzina, jiwa dengan jiwa (qisas), dan orang yang meninggalkan agamanya lagi memisahkan diri dari jamaah.',
    primaryNarrator: 'abdullah_masud',
    compilers: ['bukhari', 'muslim']
  },
  {
    id: 15,
    title: 'Berkata Baik atau Diam',
    arabic: 'مَنْ كَانَ يُؤْمِنُ بِاللهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ...',
    latin: "Man kana yu'minu billahi wal yaumil akhiri falyaqul khairan aw liyashmut...",
    translation: 'Barangsiapa beriman kepada Allah dan hari akhir, hendaklah ia berkata yang baik atau diam...',
    primaryNarrator: 'abu_hurairah',
    compilers: ['bukhari', 'muslim']
  },
  {
    id: 16,
    title: 'Jangan Marah',
    arabic: 'لاَ تَغْضَبْ. فَرَدَّدَ مِرَارًا، قَالَ: لاَ تَغْضَبْ.',
    latin: "La taghdhab. Faraddada miraran, qala: la taghdhab.",
    translation: 'Seorang laki-laki berkata kepada Nabi SAW: "Berilah aku wasiat." Beliau bersabda: "Jangan marah." Laki-laki itu mengulanginya beberapa kali, dan beliau tetap bersabda: "Jangan marah."',
    primaryNarrator: 'abu_hurairah',
    compilers: ['bukhari']
  },
  {
    id: 17,
    title: 'Berbuat Baik dalam Segala Hal',
    arabic: 'إِنَّ اللهَ كَتَبَ الإِحْسَانَ عَلَى كُلِّ شَيْءٍ...',
    latin: "Innallaha katabal ihsana 'ala kulli syai'in...",
    translation: 'Sesungguhnya Allah telah menetapkan perbuatan baik (ihsan) atas segala sesuatu...',
    primaryNarrator: 'syaddad_aus',
    compilers: ['muslim']
  },
  {
    id: 18,
    title: 'Takwa dan Akhlak Mulia',
    arabic: 'اتَّقِ اللهَ حَيْثُمَا كُنْتَ، وَأَتْبِعِ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا، وَخَالِقِ النَّاسَ بِخُلُقٍ حَسَنٍ.',
    latin: "Ittaqillaha haitsuma kunta, wa atbi'is sayyi'atal hasanata tamhuha, wa khaliqin nasa bikhuluqin hasan.",
    translation: 'Bertakwalah kepada Allah di mana pun engkau berada, iringilah perbuatan buruk dengan perbuatan baik niscaya ia akan menghapusnya, dan bergaullah dengan manusia dengan akhlak yang baik.',
    primaryNarrator: 'abu_dzar',
    compilers: ['tirmidzi']
  },
  {
    id: 19,
    title: 'Pertolongan Allah',
    arabic: 'يَا غُلاَمُ، إِنِّيْ أُعَلِّمُكَ كَلِمَاتٍ: احْفَظِ اللهَ يَحْفَظْكَ، احْفَظِ اللهَ تَجِدْهُ تُجَاهَكَ، إِذَا سَأَلْتَ فَاسْأَلِ اللهَ، وَإِذَا اسْتَعَنْتَ فَاسْتَعِنْ بِاللهِ...',
    latin: "Ya ghulam, inni u'allimuka kalimatin: ihfadzillaha yahfadzk, ihfadzillaha tajidhu tujahak, idza sa'alta fas'alillah, wa idzasta'anta fasta'in billah...",
    translation: 'Wahai anak muda, aku akan mengajarkanmu beberapa kalimat: "Jagalah Allah, niscaya Dia akan menjagamu. Jagalah Allah, niscaya engkau akan mendapati-Nya di hadapanmu. Jika engkau meminta, mintalah kepada Allah. Jika engkau memohon pertolongan, mohonlah pertolongan kepada Allah..."',
    primaryNarrator: 'abdullah_abbas',
    compilers: ['tirmidzi']
  },
  {
    id: 20,
    title: 'Malu adalah Bagian dari Iman',
    arabic: 'إِنَّ مِمَّا أَدْرَكَ النَّاسُ مِنْ كَلاَمِ النُّبُوَّةِ الأُوْلَى: إِذَا لَمْ تَسْتَحِ فَاصْنَعْ مَا شِئْتَ.',
    latin: "Inna mimma adrakan nasu min kalamin nubuwwatil ula: idza lam tastahi fashna' ma syi'ta.",
    translation: 'Sesungguhnya di antara yang didapati manusia dari perkataan kenabian yang pertama adalah: "Jika engkau tidak malu, maka berbuatlah sesukamu."',
    primaryNarrator: 'uqbah_amr',
    compilers: ['bukhari']
  },
  {
    id: 21,
    title: 'Istiqamah',
    arabic: 'قُلْ آمَنْتُ بِاللهِ، ثُمَّ اسْتَقِمْ.',
    latin: "Qul amantu billahi, tsummas taqim.",
    translation: 'Aku bertanya: "Wahai Rasulullah, katakan kepadaku suatu perkataan dalam Islam yang aku tidak akan bertanya kepada seorang pun selainmu." Beliau menjawab: "Katakanlah: Aku beriman kepada Allah, kemudian istiqamahlah."',
    primaryNarrator: 'sufyan_abdullah',
    compilers: ['muslim']
  },
  {
    id: 22,
    title: 'Jalan Menuju Surga',
    arabic: 'أَرَأَيْتَ إِذَا صَلَّيْتُ الصَّلَوَاتِ الْمَكْتُوْبَاتِ، وَصُمْتُ رَمَضَانَ، وَأَحْلَلْتُ الْحَلاَلَ، وَحَرَّمْتُ الْحَرَامَ، وَلَمْ أَزِدْ عَلَى ذَلِكَ شَيْئًا، أَأَدْخُلُ الْجَنَّةَ؟ قَالَ: نَعَمْ.',
    latin: "A'ra'aita idza shallaitus shalawatil maktubat, wa shumtu ramadhan, wa ahlaltul halal, wa harramtul haram, wa lam azid 'ala dzalika syai'an, a'adkhulul jannah? Qala: na'am.",
    translation: 'Seorang laki-laki bertanya kepada Rasulullah SAW: "Bagaimana pendapatmu jika aku melaksanakan shalat-shalat wajib, berpuasa Ramadhan, menghalalkan yang halal, mengharamkan yang haram, dan tidak menambah sedikit pun dari itu, apakah aku akan masuk surga?" Beliau menjawab: "Ya."',
    primaryNarrator: 'jabir_abdullah',
    compilers: ['muslim']
  },
  {
    id: 23,
    title: 'Amalan Penghapus Dosa',
    arabic: 'الطُّهُوْرُ شَطْرُ الإِيْمَانِ، وَالْحَمْدُ لِلَّهِ تَمْلأُ الْمِيْزَانَ، وَسُبْحَانَ اللهِ وَالْحَمْدُ لِلَّهِ تَمْلآنِ -أَوْ تَمْلأُ- مَا بَيْنَ السَّمَاءِ وَالأَرْضِ، وَالصَّلاَةُ نُوْرٌ، وَالصَّدَقَةُ بُرْهَانٌ، وَالصَّبْرُ ضِيَاءٌ، وَالْقُرْآنُ حُجَّةٌ لَكَ أَوْ عَلَيْكَ...',
    latin: "At-thuhuru syathrul iman, walhamdulillahi tamla'ul mizan, wa subhanallahi walhamdulillahi tamla'ani -aw tamla'u- ma bainas sama'i wal ardh, was shalatu nurun, was shadaqatu burhanun, was shabru dhiya'un, wal qur'anu hujjatul laka aw 'alaik...",
    translation: 'Bersuci adalah sebagian dari iman, ucapan Alhamdulillah memenuhi timbangan, ucapan Subhanallah dan Alhamdulillah keduanya memenuhi ruangan antara langit dan bumi, shalat adalah cahaya, sedekah adalah bukti, sabar adalah sinar, dan Al-Qur\'an adalah hujjah yang membelamu atau menuntutmu...',
    primaryNarrator: 'harits_asyari',
    compilers: ['muslim']
  },
  {
    id: 24,
    title: 'Larangan Berbuat Zalim',
    arabic: 'يَا عِبَادِيْ، إِنِّيْ حَرَّمْتُ الظُّلْمَ عَلَى نَفْسِيْ، وَجَعَلْتُهُ بَيْنَكُمْ مُحَرَّمًا فَلاَ تَظَالَمُوا...',
    latin: "Ya 'ibadi, inni harramtuz zhulma 'ala nafsi, wa ja'altuhu bainakum muharraman fala tazhalamu...",
    translation: 'Allah Ta\'ala berfirman (dalam hadits qudsi): "Wahai hamba-Ku, sesungguhnya Aku telah mengharamkan kezaliman atas diri-Ku, dan Aku telah menjadikannya haram di antara kalian, maka janganlah kalian saling berbuat zalim..."',
    primaryNarrator: 'abu_dzar',
    compilers: ['muslim']
  },
  {
    id: 25,
    title: 'Keutamaan Sedekah',
    arabic: '...مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ، وَمَا زَادَ اللهُ عَبْدًا بِعَفْوٍ إِلاَّ عِزًّا، وَمَا تَوَاضَعَ أَحَدٌ لِلَّهِ إِلاَّ رَفَعَهُ اللهُ.',
    latin: "...Ma naqashat shadaqatun min malin, wa ma zadallahu 'abdan bi'afwin illa 'izzan, wa ma tawadha'a ahadun lillahi illa rafa'ahullah.",
    translation: '...Sedekah tidak akan mengurangi harta, Allah tidak akan menambah seorang hamba yang pemaaf kecuali kemuliaan, dan tidaklah seseorang bersikap tawadhu (rendah hati) karena Allah melainkan Allah akan mengangkatnya.',
    primaryNarrator: 'abu_dzar',
    compilers: ['muslim']
  },
  {
    id: 26,
    title: 'Setiap Kebaikan adalah Sedekah',
    arabic: 'كُلُّ سُلاَمَى مِنَ النَّاسِ عَلَيْهِ صَدَقَةٌ، كُلَّ يَوْمٍ تَطْلُعُ فِيْهِ الشَّمْسُ: تَعْدِلُ بَيْنَ اثْنَيْنِ صَدَقَةٌ، وَتُعِيْنُ الرَّجُلَ فِيْ دَابَّتِهِ فَتَحْمِلُهُ عَلَيْهَا أَوْ تَرْفَعُ لَهُ عَلَيْهَا مَتَاعَهُ صَدَقَةٌ، وَالْكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ، وَبِكُلِّ خُطْوَةٍ تَمْشِيْهَا إِلَى الصَّلاَةِ صَدَقَةٌ، وَتُمِيْطُ الأَذَى عَنِ الطَّرِيْقِ صَدَقَةٌ.',
    latin: "Kullu sulama minan nasi 'alaihi shadaqah, kulla yaumin tathlu'u fihis syamsu: ta'dilu bainatsnaini shadaqah, wa tu'inur rajula fi dabbatihi fatahmiluhu 'alaiha aw tarfa'u lahu 'alaiha mata'ahu shadaqah, wal kalimatut thayyibatu shadaqah, wa bikulli khuthwatin tamsyiha ilas shalati shadaqah, wa tumithul adza 'anith thariqi shadaqah.",
    translation: 'Setiap ruas tulang dari manusia wajib disedekahi setiap hari di mana matahari terbit: engkau berbuat adil di antara dua orang adalah sedekah, engkau menolong seseorang pada kendaraannya lalu engkau bantu ia naik ke atasnya atau engkau angkatkan barangnya ke atasnya adalah sedekah, perkataan yang baik adalah sedekah, setiap langkah yang engkau ayunkan menuju shalat adalah sedekah, dan menyingkirkan gangguan dari jalan adalah sedekah.',
    primaryNarrator: 'abu_hurairah',
    compilers: ['bukhari', 'muslim']
  },
  {
    id: 27,
    title: 'Kebaikan dan Dosa',
    arabic: 'الْبِرُّ حُسْنُ الْخُلُقِ، وَالإِثْمُ مَا حَاكَ فِيْ صَدْرِكَ وَكَرِهْتَ أَنْ يَطَّلِعَ عَلَيْهِ النَّاسُ.',
    latin: "Al-birru husnul khuluq, wal itsmu ma haka fi shadrika wa karihta an yattali'a 'alaihin nas.",
    translation: 'Kebaikan adalah akhlak yang baik, dan dosa adalah apa yang terasa mengganjal di dadamu dan engkau benci jika orang lain mengetahuinya.',
    primaryNarrator: 'nawwas_saman',
    compilers: ['muslim']
  },
  {
    id: 28,
    title: 'Wasiat Takwa',
    arabic: 'أُوْصِيْكُمْ بِتَقْوَى اللهِ، وَالسَّمْعِ وَالطَّاعَةِ وَإِنْ تَأَمَّرَ عَلَيْكُمْ عَبْدٌ...',
    latin: "Usikum bitaqwallahi, was sam'i wat tha'ati wa in ta'ammara 'alaikum 'abdun...",
    translation: 'Aku wasiatkan kepada kalian untuk bertakwa kepada Allah, mendengar dan taat (kepada pemimpin) meskipun yang memimpin kalian adalah seorang budak...',
    primaryNarrator: 'irbadh_sariyah',
    compilers: ['abu_dawud', 'tirmidzi']
  },
  {
    id: 29,
    title: 'Pintu-pintu Kebaikan',
    arabic: '...أَلاَ أَدُلُّكَ عَلَى أَبْوَابِ الْخَيْرِ؟ الصَّوْمُ جُنَّةٌ، وَالصَّدَقَةُ تُطْفِئُ الْخَطِيْئَةَ كَمَا يُطْفِئُ الْمَاءُ النَّارَ، وَصَلاَةُ الرَّجُلِ فِيْ جَوْفِ اللَّيْلِ...',
    latin: "...Ala adulluka 'ala abwabil khair? As-shaumu junnah, was shadaqatu tuthfi'ul khathi'ata kama yuthfi'ul ma'un nar, wa shalatur rajuli fi jaufil lail...",
    translation: '...Maukah aku tunjukkan kepadamu pintu-pintu kebaikan? Puasa adalah perisai, sedekah dapat memadamkan kesalahan sebagaimana air memadamkan api, dan shalat seseorang di tengah malam...',
    primaryNarrator: 'muadz_jabal',
    compilers: ['tirmidzi']
  },
  {
    id: 30,
    title: 'Batasan-batasan Allah',
    arabic: 'إِنَّ اللهَ فَرَضَ فَرَائِضَ فَلاَ تُضَيِّعُوْهَا، وَحَدَّ حُدُوْدًا فَلاَ تَعْتَدُوْهَا، وَحَرَّمَ أَشْيَاءَ فَلاَ تَنْتَهِكُوْهَا، وَسَكَتَ عَنْ أَشْيَاءَ رَحْمَةً لَكُمْ غَيْرَ نِسْيَانٍ فَلاَ تَبْحَثُوا عَنْهَا.',
    latin: "Innallaha faradha fara'idha fala tudhayyi'uha, wa hadda hududan fala ta'taduha, wa harrama asyya'a fala tantahikuha, wa sakata 'an asyya'a rahmatan lakum ghaira nisyanin fala tabhatsu 'anha.",
    translation: 'Sesungguhnya Allah telah mewajibkan beberapa kewajiban, maka janganlah kalian menyia-nyiakannya. Dia telah menetapkan batasan-batasan, maka janganlah kalian melampauinya. Dia telah mengharamkan beberapa hal, maka janganlah kalian melanggarnya. Dan Dia mendiamkan beberapa hal sebagai rahmat bagi kalian, bukan karena lupa, maka janganlah kalian membahasnya.',
    primaryNarrator: 'tsalabah_khusyani',
    compilers: ['daraquthni']
  },
  {
    id: 31,
    title: 'Zuhud di Dunia',
    arabic: 'ازْهَدْ فِي الدُّنْيَا يُحِبَّكَ اللهُ، وَازْهَدْ فِيْمَا عِنْدَ النَّاسِ يُحِبَّكَ النَّاسُ.',
    latin: "Izhhad fid dunya yuhibbakallah, wazhhad fima 'indan nasi yuhibbakannas.",
    translation: 'Zuhudlah di dunia, niscaya Allah akan mencintaimu. Dan zuhudlah terhadap apa yang ada di tangan manusia, niscaya manusia akan mencintaimu.',
    primaryNarrator: 'sahl_saad',
    compilers: ['ibnu_majah']
  },
  {
    id: 32,
    title: 'Tidak Membahayakan Diri dan Orang Lain',
    arabic: 'لاَ ضَرَرَ وَلاَ ضِرَارَ.',
    latin: "La dharara wa la dhirar.",
    translation: 'Tidak boleh membahayakan diri sendiri dan tidak boleh membahayakan orang lain.',
    primaryNarrator: 'abu_said_khudri',
    compilers: ['ibnu_majah', 'daraquthni']
  },
  {
    id: 33,
    title: 'Bukti dan Sumpah',
    arabic: 'لَوْ يُعْطَى النَّاسُ بِدَعْوَاهُمْ لاَدَّعَى رِجَالٌ أَمْوَالَ قَوْمٍ وَدِمَاءَهُمْ، لَكِنِ الْبَيِّنَةُ عَلَى الْمُدَّعِيْ، وَالْيَمِيْنُ عَلَى مَنْ أَنْكَرَ.',
    latin: "Law yu'than nasu bida'wahum ladd'a rijalun amwala qaumin wa dima'ahum, lakinnil bayyinatu 'alal mudda'i, wal yaminu 'ala man ankara.",
    translation: 'Seandainya manusia diberi (kemenangan) berdasarkan pengakuan mereka, niscaya orang-orang akan mengklaim harta dan darah suatu kaum. Akan tetapi, bukti wajib bagi penuduh, dan sumpah wajib bagi yang mengingkari.',
    primaryNarrator: 'abdullah_abbas',
    compilers: ['baihaqi']
  },
  {
    id: 34,
    title: 'Mengubah Kemungkaran',
    arabic: 'مَنْ رَأَى مِنْكُمْ مُنْكَرًا فَلْيُغَيِّرْهُ بِيَدِهِ، فَإِنْ لَمْ يَسْتَطِعْ فَبِلِسَانِهِ، فَإِنْ لَمْ يَسْتَطِعْ فَبِقَلْبِهِ، وَذَلِكَ أَضْعَفُ الإِيْمَانِ.',
    latin: "Man ra'a minkum munkaran falyughayyirhu biyadih, fa'in lam yastathi' fabilisanihi, fa'in lam yastathi' fabiqalbihi, wa dzalika adh'aful iman.",
    translation: 'Barangsiapa di antara kalian melihat suatu kemungkaran, hendaklah ia mengubahnya dengan tangannya. Jika ia tidak mampu, maka dengan lisannya. Jika ia tidak mampu, maka dengan hatinya, dan itulah selemah-lemahnya iman.',
    primaryNarrator: 'abu_said_khudri',
    compilers: ['muslim']
  },
  {
    id: 35,
    title: 'Persaudaraan Muslim',
    arabic: 'لاَ تَحَاسَدُوا، وَلاَ تَنَاجَشُوا، وَلاَ تَبَاغَضُوا، وَلاَ تَدَابَرُوا، وَلاَ يَبِعْ بَعْضُكُمْ عَلَى بَيْعِ بَعْضٍ، وَكُوْنُوا عِبَادَ اللهِ إِخْوَانًا. الْمُسْلِمُ أَخُو الْمُسْلِمِ، لاَ يَظْلِمُهُ، وَلاَ يَخْذُلُهُ، وَلاَ يَحْقِرُهُ...',
    latin: "La tahasadu, wa la tanajasyu, wa la tabaghadhu, wa la tadabaru, wa la yabi' ba'dhukum 'ala bai'i ba'dhin, wa kunu 'ibadallahi ikhwana. Al-muslimu akhul muslim, la yazhlimuhu, wa la yakhdzuluhu, wa la yahqiruhu...",
    translation: 'Janganlah kalian saling hasad, jangan saling menaikkan penawaran (untuk menipu), jangan saling membenci, jangan saling membelakangi, dan janganlah sebagian kalian menjual di atas penjualan sebagian yang lain. Jadilah kalian hamba-hamba Allah yang bersaudara. Seorang muslim adalah saudara bagi muslim lainnya, ia tidak menzaliminya, tidak membiarkannya (dalam kesulitan), dan tidak merendahkannya...',
    primaryNarrator: 'abu_hurairah',
    compilers: ['muslim']
  },
  {
    id: 36,
    title: 'Menolong Kesulitan Sesama',
    arabic: 'مَنْ نَفَّسَ عَنْ مُؤْمِنٍ كُرْبَةً مِنْ كُرَبِ الدُّنْيَا نَفَّسَ اللهُ عَنْهُ كُرْبَةً مِنْ كُرَبِ يَوْمِ الْقِيَامَةِ...',
    latin: "Man naffasa 'an mu'minin kurbatan min kurabid dunya naffasallahu 'anhu kurbatan min kurabi yaumil qiyamah...",
    translation: 'Barangsiapa melepaskan dari seorang mukmin satu kesulitan dari kesulitan-kesulitan dunia, niscaya Allah akan melepaskan darinya satu kesulitan dari kesulitan-kesulitan hari kiamat...',
    primaryNarrator: 'abu_hurairah',
    compilers: ['muslim']
  },
  {
    id: 37,
    title: 'Pahala Kebaikan dan Keburukan',
    arabic: 'إِنَّ اللهَ كَتَبَ الْحَسَنَاتِ وَالسَّيِّئَاتِ ثُمَّ بَيَّنَ ذَلِكَ، فَمَنْ هَمَّ بِحَسَنَةٍ فَلَمْ يَعْمَلْهَا كَتَبَهَا اللهُ عِنْدَهُ حَسَنَةً كَامِلَةً، فَإِنْ هُوَ هَمَّ بِهَا فَعَمِلَهَا كَتَبَهَا اللهُ عَشْرَ حَسَنَاتٍ إِلَى سَبْعِمِائَةِ ضِعْفٍ إِلَى أَضْعَافٍ كَثِيْرَةٍ...',
    latin: "Innallaha katabal hasanati was sayyi'ati tsumma bayyana dzalik, faman hamma bihasanatin falam ya'malha katabahallahu 'indahu hasanatan kamilah, fa'in huwa hamma biha fa'amilaha katabahallahu 'asyra hasanatin ila sab'imi'ati dhi'fin ila adh'afin katsirah...",
    translation: 'Sesungguhnya Allah telah mencatat kebaikan-kebaikan dan keburukan-keburukan, kemudian Dia menjelaskannya. Barangsiapa berniat melakukan suatu kebaikan lalu ia tidak mengerjakannya, Allah mencatat di sisi-Nya sebagai satu kebaikan yang sempurna. Jika ia berniat lalu mengerjakannya, Allah mencatatnya sebagai sepuluh kebaikan hingga tujuh ratus kali lipat hingga kelipatan yang banyak...',
    primaryNarrator: 'abdullah_abbas',
    compilers: ['bukhari', 'muslim']
  },
  {
    id: 38,
    title: 'Menjadi Wali Allah',
    arabic: 'إِنَّ اللهَ تَعَالَى قَالَ: مَنْ عَادَى لِيْ وَلِيًّا فَقَدْ آذَنْتُهُ بِالْحَرْبِ...',
    latin: "Innallaha ta'ala qala: man 'ada li waliyyan faqad adzantuhu bil harb...",
    translation: 'Sesungguhnya Allah Ta\'ala berfirman (dalam hadits qudsi): "Barangsiapa memusuhi wali-Ku, maka Aku telah mengumumkan perang terhadapnya..."',
    primaryNarrator: 'abu_hurairah',
    compilers: ['bukhari']
  },
  {
    id: 39,
    title: 'Kesalahan yang Dimaafkan',
    arabic: 'إِنَّ اللهَ تَجَاوَزَ لِيْ عَنْ أُمَّتِيْ: الْخَطَأَ، وَالنِّسْيَانَ، وَمَا اسْتُكْرِهُوا عَلَيْهِ.',
    latin: "Innallaha tajawaza li 'an ummati: al-khatha'a, wan nisyana, wa mastukrihu 'alaih.",
    translation: 'Sesungguhnya Allah memaafkan dari umatku: kesalahan (yang tidak disengaja), lupa, dan apa yang dipaksakan kepada mereka.',
    primaryNarrator: 'abdullah_abbas',
    compilers: ['ibnu_majah', 'baihaqi']
  },
  {
    id: 40,
    title: 'Hidup Bagaikan Pengembara',
    arabic: 'كُنْ فِي الدُّنْيَا كَأَنَّكَ غَرِيْبٌ أَوْ عَابِرُ سَبِيْلٍ.',
    latin: "Kun fid dunya ka'annaka gharibun aw 'abiru sabil.",
    translation: 'Jadilah engkau di dunia seakan-akan engkau adalah orang asing atau seorang pengembara.',
    primaryNarrator: 'abdullah_umar',
    compilers: ['bukhari']
  },
  {
    id: 41,
    title: 'Mengikuti Sunnah',
    arabic: 'لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يَكُوْنَ هَوَاهُ تَبَعًا لِمَا جِئْتُ بِهِ.',
    latin: "La yu'minu ahadukum hatta yakuna hawahu taba'an lima ji'tu bih.",
    translation: 'Tidaklah beriman salah seorang di antara kalian hingga hawa nafsunya mengikuti apa yang aku bawa (ajaran Islam).',
    primaryNarrator: 'abdullah_amr_ash',
    compilers: ['kitab_hujjah']
  },
  {
    id: 42,
    title: 'Luasnya Ampunan Allah',
    arabic: '...يَا ابْنَ آدَمَ، إِنَّكَ لَوْ أَتَيْتَنِيْ بِقُرَابِ الأَرْضِ خَطَايَا ثُمَّ لَقِيْتَنِيْ لاَ تُشْرِكُ بِيْ شَيْئًا لأَتَيْتُكَ بِقُرَابِهَا مَغْفِرَةً.',
    latin: "...Yabna Adam, innaka law ataitani biqurabil ardhi khathaya tsumma laqitani la tusyriku bi syai'an la'ataituka biqurabiha maghfirah.",
    translation: 'Allah Ta\'ala berfirman (dalam hadits qudsi): "...Wahai anak Adam, seandainya engkau datang kepada-Ku dengan dosa sepenuh bumi, kemudian engkau bertemu dengan-Ku dalam keadaan tidak menyekutukan-Ku dengan sesuatu pun, niscaya Aku akan datang kepadamu dengan ampunan sepenuh itu pula."',
    primaryNarrator: 'anas_malik',
    compilers: ['tirmidzi']
  }
];
