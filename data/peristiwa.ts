
export interface PeristiwaContent {
    type: 'paragraph' | 'list' | 'sublist';
    title?: string;
    text?: string;
    items?: (string | { title: string; points: string[] })[];
}

export interface PeristiwaTopic {
    id: string;
    title: string;
    icon: string;
    subtitle: string;
    content: PeristiwaContent[];
    dalil?: {
        text: string;
        source: string;
    };
}

export const peristiwaData: PeristiwaTopic[] = [
    {
        id: 'alam-semesta',
        title: 'Penciptaan Alam Semesta',
        icon: 'fas fa-atom',
        subtitle: 'Perjalanan penciptaan kosmos dalam enam periode menurut perspektif Al-Qur\'an dan Sains.',
        content: [
            {
                type: 'paragraph',
                title: 'Pengantar: Sebuah Narasi Agung Melampaui Zaman',
                text: "Kisah penciptaan alam semesta adalah salah satu narasi paling agung dan fundamental yang diungkapkan dalam Al-Qur'an. Ini bukan sekadar cerita pengantar tidur atau mitologi kuno, melainkan sebuah undangan terbuka bagi seluruh umat manusia, khususnya bagi mereka yang berpikir (ulul albab), untuk merenungkan kebesaran, kekuasaan, ilmu, dan hikmah Allah SWT yang tak terbatas. Berbeda dari narasi penciptaan dalam tradisi lain yang seringkali bersifat dongeng, Al-Qur'an menyajikan proses penciptaan ini sebagai serangkaian fakta ilmiah dan spiritual yang sangat presisi dan ringkas. Banyak dari isyarat-isyarat ilmiah ini baru dapat dipahami dan diapresiasi oleh sains modern di abad ke-20 dan ke-21, membuktikan sifat Al-Qur'an sebagai mukjizat yang relevan sepanjang zaman. Proses penciptaan yang berlangsung dalam enam periode (ayyam) ini bukanlah sebuah kebetulan, melainkan demonstrasi dari sebuah desain yang cerdas (intelligent design), keteraturan yang sempurna (sunnatullah), dan tujuan akhir yang luhur di balik eksistensi segala sesuatu, dari partikel terkecil hingga galaksi terbesar."
            },
            {
                type: 'paragraph',
                title: 'Fase Awal: Gumpalan Kosmik (Ratqan) dan Kabut Asap (Dukhan)',
                text: `Salah satu ayat paling menakjubkan yang mengisyaratkan kondisi awal alam semesta adalah Surah Al-Anbiya' ayat 30: "Dan apakah orang-orang kafir tidak mengetahui bahwa langit dan bumi keduanya dahulunya menyatu (ratqan), kemudian Kami pisahkan antara keduanya (fataqnaahumaa)..." Ayat ini, yang diturunkan 14 abad yang lalu, secara luar biasa selaras dengan teori Big Bang dalam kosmologi modern. Teori ini, yang menjadi konsensus ilmiah saat ini, menyatakan bahwa seluruh alam semesta—materi, energi, ruang, dan waktu—berasal dari satu titik tunggal dengan kepadatan dan suhu yang tak terhingga yang disebut singularitas. Titik ini kemudian "meledak" atau lebih tepatnya mengembang dengan sangat cepat, memisahkan materi dan energi yang kemudian mendingin dan membentuk segala sesuatu yang kita lihat hari ini. Istilah Al-Qur'an "ratqan" dapat diartikan sebagai sesuatu yang padu, solid, dan tak terpisahkan, sebuah deskripsi yang sangat cocok untuk kondisi singularitas. Sementara "fataqnaahumaa" (Kami pisahkan keduanya) adalah deskripsi yang sangat akurat untuk proses ekspansi primordial itu sendiri. Setelah 'ledakan' dan pemisahan awal ini, Al-Qur'an menggambarkan fase berikutnya sebagai "dukhan" atau "asap". Dalam Surah Fussilat ayat 11, Allah berfirman: "Kemudian Dia menuju ke langit dan (langit) itu masih merupakan asap (dukhan)..." Ini pun sangat selaras dengan pemahaman ilmiah modern. Setelah Big Bang, alam semesta adalah sebuah kabut panas yang sangat padat, terdiri dari partikel-partikel subatomik seperti kuark, elektron, dan foton. Seiring alam semesta mendingin, partikel-partikel ini kemudian bergabung membentuk atom-atom hidrogen dan helium. Gas hidrogen dan helium inilah yang kemudian berkumpul karena gravitasi, membentuk nebula-nebula raksasa—yang secara visual tampak seperti gumpalan asap kosmik—yang menjadi cikal bakal terbentuknya bintang-bintang dan galaksi-galaksi pertama.`
            },
            {
                type: 'paragraph',
                title: 'Enam Periode Penciptaan (Sittati Ayyam): Sebuah Proses Bertahap',
                text: `Al-Qur'an secara konsisten menyebutkan bahwa proses penciptaan langit dan bumi ini terjadi dalam "sittati ayyam" atau enam periode/masa. Sangat penting untuk memahami bahwa kata "yaum" (jamak: ayyam) dalam konteks ini tidak dapat diartikan sebagai "hari" dalam pengertian 24 jam seperti yang kita kenal. Al-Qur'an sendiri menjelaskan relativitas waktu, di mana satu "hari" di sisi Allah bisa setara dengan seribu tahun (QS. Al-Hajj: 47) atau bahkan lima puluh ribu tahun (QS. Al-Ma'arij: 4) menurut perhitungan manusia. Oleh karena itu, "sittati ayyam" harus dipahami sebagai enam periode, enam fase, atau enam era waktu yang panjang dan durasinya hanya diketahui oleh Allah. Ini mengajarkan sebuah prinsip fundamental: penciptaan adalah sebuah proses yang teratur dan bertahap, bukan kejadian "sim salabim" yang instan. Allah, meskipun Maha Kuasa untuk menciptakan segalanya dalam sekejap, memilih untuk melakukannya secara bertahap untuk mengajarkan kepada manusia tentang pentingnya proses, perencanaan, dan keteraturan. Para ilmuwan modern juga membagi sejarah alam semesta menjadi beberapa era: Era Planck, Era Inflasi, Era Elektrolemah, Era Kuark, Era Hadron, Era Lepton, dan seterusnya, yang menunjukkan adanya tahapan-tahapan yang jelas dalam evolusi kosmos.`
            },
            {
                type: 'paragraph',
                title: 'Mukjizat Ekspansi Alam Semesta yang Tak Terbantahkan',
                text: `Salah satu mukjizat ilmiah Al-Qur'an yang paling sering dikutip dan paling tak terbantahkan adalah isyaratnya tentang alam semesta yang terus mengembang. Dalam Surah Adz-Dzariyat ayat 47, Allah berfirman: "Dan langit itu Kami bangun dengan kekuasaan (Kami) dan sesungguhnya Kami benar-benar meluaskannya (la muusi'uun)." Konsep alam semesta yang statis dan tidak berubah telah mendominasi pemikiran manusia selama ribuan tahun, sejak zaman filsuf Yunani hingga awal abad ke-20. Baru pada tahun 1929, astronom Amerika, Edwin Hubble, melalui pengamatannya terhadap pergeseran merah (redshift) pada spektrum cahaya dari galaksi-galaksi jauh, membuktikan bahwa galaksi-galaksi tersebut bergerak menjauh dari kita, dan semakin jauh galaksi, semakin cepat ia bergerak menjauh. Ini adalah bukti observasional pertama bahwa alam semesta tidak statis, melainkan sedang berekspansi atau mengembang. Fakta bahwa Al-Qur'an, sebuah kitab yang diturunkan di tengah padang pasir kepada seorang Nabi yang ummi (buta huruf) 1400 tahun yang lalu, telah menyatakan dengan sangat jelas bahwa langit (alam semesta) ini "diluaskan" adalah sebuah keajaiban yang melampaui kapasitas pengetahuan manusia pada masa itu.`
            },
            {
                type: 'paragraph',
                title: 'Tujuan Agung di Balik Penciptaan',
                text: `Penciptaan alam semesta yang begitu luas, kompleks, dan teratur ini bukanlah sebuah kebetulan atau tanpa tujuan. Al-Qur'an berkali-kali menegaskan bahwa semua ini tidak diciptakan dengan sia-sia (QS. Ali 'Imran: 191) atau untuk main-main (QS. Al-Anbiya': 16). Sebaliknya, alam semesta diciptakan dengan "al-haqq" (kebenaran), yaitu dengan tujuan yang benar dan penuh hikmah. Tujuan utamanya adalah sebagai tanda (ayat) yang terbentang luas, yang menunjukkan keberadaan, keesaan, kekuasaan, dan ilmu Sang Pencipta. Keteraturan kosmos, hukum-hukum fisika yang presisi (sunnatullah) yang mengatur pergerakan planet, bintang, dan galaksi, serta keindahan ciptaan-Nya adalah bukti nyata bagi orang-orang yang mau berpikir (ulul albab). "Sesungguhnya dalam penciptaan langit dan bumi, dan silih bergantinya malam dan siang terdapat tanda-tanda bagi orang yang berakal." (QS. Ali 'Imran: 190). Tujuan akhir dari penciptaan alam semesta ini adalah untuk menjadi panggung bagi penciptaan makhluk yang paling dimuliakan, yaitu manusia, yang diberi tugas sebagai khalifah untuk beribadah kepada Allah dan memakmurkan bumi. Dengan merenungkan keagungan alam semesta, diharapkan manusia akan sampai pada kesimpulan yang sama dengan Nabi Ibrahim: pengakuan akan adanya Tuhan Yang Maha Cerdas, Maha Kuasa, dan Maha Bijaksana, yang hanya Dia-lah yang pantas untuk disembah.`
            },
        ],
        dalil: {
            text: "Dan apakah orang-orang kafir tidak mengetahui bahwa langit dan bumi keduanya dahulunya menyatu, kemudian Kami pisahkan antara keduanya; dan Kami jadikan segala sesuatu yang hidup berasal dari air; maka mengapa mereka tidak beriman?",
            source: 'QS. Al-Anbiya\': 30'
        }
    },
    {
        id: 'bumi',
        title: 'Penciptaan Bumi & Isinya',
        icon: 'fas fa-globe-asia',
        subtitle: 'Proses pembentukan bumi, gunung, lautan, dan makhluk hidup sebagai hamparan bagi manusia.',
        content: [
            {
                type: 'paragraph',
                title: 'Hamparan Kehidupan yang Disiapkan',
                text: `Setelah memisahkan langit dan bumi dari satu kesatuan kosmik (ratqan), Allah SWT memulai proses penciptaan dan persiapan planet Bumi sebagai sebuah "hamparan" (firasyan) dan "tempat tinggal" (qararan) yang sempurna bagi manusia dan makhluk hidup lainnya. Al-Qur'an tidak menggambarkan Bumi sebagai bola batu yang mati dan terbentuk secara kebetulan, melainkan sebagai sebuah sistem ekologis yang sangat kompleks dan dirancang dengan sangat teliti, penuh dengan sumber daya, keseimbangan yang presisi, dan tanda-tanda kebesaran-Nya yang tak terhitung. Surah An-Naba' ayat 6-7 bertanya secara retoris, "Bukankah Kami telah menjadikan bumi sebagai hamparan, dan gunung-gunung sebagai pasak?" Ayat ini dan banyak ayat lainnya menguraikan bagaimana setiap elemen di Bumi—dari gunung yang menjulang hingga lautan yang dalam, dari siklus air hingga lapisan atmosfer—disiapkan secara khusus untuk menopang kehidupan.`
            },
            {
                type: 'paragraph',
                title: 'Penciptaan Bumi dan Gunung-gunung Sebagai Pasak (Awtad)',
                text: `Al-Qur'an menyebutkan bahwa Bumi diciptakan dalam dua periode (yaumain). Para ilmuwan geologi memperkirakan bahwa planet Bumi terbentuk sekitar 4,5 miliar tahun yang lalu dari piringan akresi materi sisa pembentukan Matahari. Proses pendinginan, pembentukan kerak, dan diferensiasi lapisan-lapisan Bumi (inti, mantel, kerak) memakan waktu yang sangat lama, yang sangat selaras dengan konsep "dua masa" yang disebutkan dalam Al-Qur'an. Setelah kerak bumi terbentuk, Allah menciptakan gunung-gunung (rawasiya) yang memiliki fungsi sangat vital. Al-Qur'an secara konsisten menggambarkan gunung-gunung ini sebagai "pasak" (awtad). Selama berabad-abad, gunung hanya dilihat sebagai tonjolan di permukaan bumi. Namun, sains modern di abad ke-20, melalui studi lempeng tektonik, telah membuktikan bahwa gunung-gunung memang memiliki "akar" (mountain roots) yang menghunjam jauh ke dalam lapisan mantel atas bumi, bisa mencapai kedalaman beberapa kali lipat dari ketinggiannya di permukaan. Akar ini, persis seperti fungsi pasak pada sebuah tenda, berfungsi untuk menstabilkan lempeng-lempeng tektonik, mencegahnya bergeser secara liar, dan mengurangi guncangan gempa bumi. Allah berfirman, "Dan telah Kami jadikan di bumi ini gunung-gunung yang kokoh supaya bumi itu (tidak) goncang bersama mereka..." (QS. Al-Anbiya': 31). Ini adalah sebuah mukjizat ilmiah yang luar biasa.`
            },
            {
                type: 'paragraph',
                title: 'Bumi yang Diberkahi: Atmosfer, Air, dan Kehidupan',
                text: `Setelah pembentukan dasarnya, Allah "memberkahinya" (baaraka fiiha) dan "menentukan kadar makanan" (qaddara fiiha aqwaataha) di dalamnya dalam empat masa. Ini adalah isyarat tentang persiapan ekosistem Bumi yang kompleks untuk menopang kehidupan. Salah satu elemen terpenting adalah penciptaan atmosfer sebagai "atap yang terpelihara" (saqfan mahfuuzha) (QS. Al-Anbiya': 32). Atmosfer tidak hanya menyediakan oksigen untuk bernapas, tetapi juga berfungsi sebagai perisai multi-lapis. Lapisan ozon menyaring radiasi ultraviolet yang mematikan dari matahari, sementara medan magnet bumi (magnetosfer) menangkis badai matahari dan partikel kosmik berbahaya. Atmosfer juga melindungi kita dari jutaan meteor yang jatuh ke Bumi setiap hari, membakarnya habis sebelum mencapai permukaan. Elemen vital lainnya adalah air. Al-Qur'an menyatakan, "...dan Kami jadikan segala sesuatu yang hidup berasal dari air" (QS. Al-Anbiya': 30), sebuah fakta yang menjadi dasar dari ilmu biologi modern. Allah menciptakan siklus hidrologi yang sempurna: air laut yang asin menguap, dimurnikan dari garamnya, membentuk awan, lalu angin membawanya ke daratan yang kering dan menurunkannya sebagai hujan yang tawar untuk "menghidupkan tanah yang mati" (QS. Al-Furqan: 48-49). Air hujan ini kemudian disimpan di dalam bumi sebagai cadangan air tanah yang melimpah.`
            },
            {
                type: 'paragraph',
                title: 'Penciptaan Makhluk Hidup dan Keseimbangannya',
                text: `Dari air inilah kemudian Allah menciptakan aneka ragam makhluk hidup yang berpasang-pasangan, dari tumbuh-tumbuhan hingga hewan-hewan yang melata. Keanekaragaman hayati yang luar biasa ini—jutaan spesies dengan fungsi dan perannya masing-masing dalam ekosistem—adalah bukti nyata dari kekuasaan dan kebijaksanaan Allah. Semua ini disiapkan sebagai sumber daya dan "makanan" bagi penghuni Bumi, terutama manusia. Proses penciptaan yang memakan waktu empat masa ini menunjukkan kompleksitas dan keseimbangan ekosistem yang luar biasa, di mana setiap makhluk saling bergantung dalam sebuah jaring-jaring kehidupan yang rumit. Proses fotosintesis pada tumbuhan yang menghasilkan oksigen, peran serangga dalam penyerbukan, hingga peran dekomposer dalam mengurai materi organik, semuanya adalah bagian dari desain agung yang telah Allah tetapkan.`
            },
            {
                type: 'paragraph',
                title: 'Amanah Kekhalifahan di Muka Bumi',
                text: `Penciptaan Bumi dan segala isinya adalah sebuah mahakarya desain yang luar biasa, di mana setiap elemen, dari skala mikroskopis hingga geologis, diatur dengan presisi yang menakjubkan untuk satu tujuan utama: menyediakan lingkungan yang layak huni bagi manusia. Oleh karena itu, Al-Qur'an terus-menerus mengajak manusia untuk "berjalan di muka bumi dan memperhatikan bagaimana Allah memulai penciptaan-Nya" (QS. Al-Ankabut: 20). Bumi yang subur, lautan yang luas, dan segala sumber daya di dalamnya bukanlah untuk dieksploitasi tanpa batas, melainkan sebuah amanah bagi manusia sebagai khalifah untuk menjaga, melestarikan, dan memanfaatkannya dengan rasa syukur dan tanggung jawab. Merusak keseimbangan alam adalah bentuk pengkhianatan terhadap amanah tersebut. Kisah penciptaan Bumi adalah pengingat konstan bahwa kita adalah tamu di planet yang indah ini, sebuah planet yang telah disiapkan dengan penuh cinta oleh Sang Pencipta bagi kita.`
            }
        ],
        dalil: {
            text: "Dan Dia-lah yang membentangkan bumi dan menjadikan gunung-gunung dan sungai-sungai di atasnya. Dan padanya Dia menjadikan semua buah-buahan berpasang-pasangan; Dia menutupkan malam kepada siang. Sungguh, pada yang demikian itu terdapat tanda-tanda (kebesaran Allah) bagi orang-orang yang berpikir.",
            source: 'QS. Ar-Ra\'d: 3'
        }
    },
    {
        id: 'kiamat',
        title: 'Peristiwa Hari Kiamat',
        icon: 'fas fa-meteor',
        subtitle: 'Tahapan-tahapan dahsyat dari tanda-tanda akhir zaman hingga hari pembalasan.',
        content: [
            {
                type: 'paragraph',
                title: 'Pengantar: Sebuah Keniscayaan Mutlak',
                text: 'Iman kepada Hari Akhir (Yaumul Qiyamah) adalah rukun iman kelima, sebuah pilar fundamental dalam aqidah Islam. Keyakinan akan adanya hari pembalasan adalah konsekuensi logis dari keyakinan akan keadilan Tuhan. Dunia ini adalah ladang ujian, dan akhirat adalah hari panen, di mana setiap jiwa akan menerima balasan yang setimpal atas apa yang telah diusahakannya. Al-Qur\'an menggambarkan peristiwa hari kiamat dengan sangat detail dan gamblang, bukan untuk menimbulkan ketakutan yang melumpuhkan, melainkan untuk membangkitkan kesadaran, meluruskan perspektif hidup, memotivasi amal saleh, dan memberikan harapan bagi orang-orang yang tertindas bahwa keadilan sejati pasti akan datang. Pengetahuan tentang kiamat adalah pengingat bahwa kehidupan dunia ini fana, dan kehidupan yang sebenarnya dan abadi adalah di akhirat kelak.'
            },
            {
                type: 'list',
                title: 'Tanda-tanda Kiamat (Asyrathus Sa\'ah)',
                text: 'Sebelum kiamat besar terjadi, Allah SWT akan menunjukkan tanda-tandanya, yang terbagi menjadi dua kategori:',
                items: [
                    { title: 'Tanda-tanda Kecil (Al-\'Alamat as-Sughra)', points: ["Jumlahnya sangat banyak dan sebagian besar telah atau sedang kita saksikan di zaman ini. Tanda-tanda ini merupakan peringatan awal bahwa dunia sedang menuju akhirnya. Di antaranya adalah: diutusnya Nabi Muhammad SAW (yang merupakan nabi terakhir), terbelahnya bulan, wafatnya Nabi, penaklukan Baitul Maqdis, menyebarnya kebodohan agama, diangkatnya ilmu dengan wafatnya para ulama, merajalelanya perzinaan dan minuman keras, banyaknya pembunuhan, amanah disia-siakan, orang yang tidak kompeten memegang jabatan, seorang budak wanita melahirkan tuannya, orang-orang miskin penggembala kambing berlomba-lomba membangun gedung-gedung pencakar langit, pasar-pasar menjadi berdekatan, dan waktu terasa semakin cepat."] },
                    { title: 'Tanda-tanda Besar (Al-\'Alamat al-Kubra)', points: ["Ini adalah sepuluh tanda besar yang kemunculannya akan terjadi secara berurutan dan dalam waktu yang relatif singkat, menandakan bahwa kiamat sudah di ambang pintu. Jika salah satunya telah muncul, yang lain akan mengikutinya bagaikan butiran tasbih yang putus talinya. Kesepuluh tanda itu adalah: (1) Dukhan (Asap atau kabut tebal yang menyelimuti bumi), (2) Munculnya Dajjal (fitnah terbesar bagi umat manusia), (3) Turunnya Nabi Isa bin Maryam A.S. (yang akan membunuh Dajjal), (4) Keluarnya Ya\'juj dan Ma\'juj (bangsa perusak yang sangat banyak jumlahnya), (5) Munculnya Dabbah (binatang melata dari dalam bumi yang dapat berbicara dan akan menandai orang beriman dan kafir), (6) Terbitnya matahari dari arah barat (saat itu, pintu taubat ditutup), (7), (8), (9) Tiga gerhana besar (pembenaman bumi) di timur, di barat, dan di Jazirah Arab, dan (10) Munculnya api dari Yaman yang akan menggiring manusia ke tempat mereka dikumpulkan (Syam)."] }
                ]
            },
            {
                type: 'list',
                title: 'Tahapan-tahapan Dahsyat Hari Kiamat',
                items: [
                    { title: "Tiupan Sangkakala (An-Nafkhu fish-Shur)", points: ["Atas perintah Allah, Malaikat Israfil meniup sangkakala. Tiupan pertama (Nafkhatul Faza') adalah tiupan yang mengejutkan dan mematikan seluruh makhluk yang bernyawa di langit dan di bumi. Al-Qur'an menggambarkannya sebagai hari di mana gunung-gunung beterbangan seperti kapas, langit terbelah, dan lautan meluap menjadi api. Seluruh tatanan alam semesta hancur total. Setelah periode waktu yang hanya diketahui Allah, Israfil meniup sangkakala untuk kedua kalinya (Nafkhatul Ba'ts), yaitu tiupan kebangkitan. Semua manusia, dari yang pertama hingga yang terakhir, akan bangkit dari kubur mereka dalam keadaan seperti saat mereka dilahirkan."] },
                    { title: "Padang Mahsyar (Yaumul Hashr)", points: ["Setelah dibangkitkan, seluruh manusia akan digiring dan dikumpulkan di sebuah dataran yang sangat luas dan rata bernama Padang Mahsyar. Di sana, matahari didekatkan sejauh satu mil, menyebabkan penderitaan yang luar biasa. Manusia akan tenggelam dalam keringat sesuai dengan tingkat dosa mereka. Mereka berdiri menunggu pengadilan dalam waktu yang sangat lama, sebuah penantian yang penuh ketakutan dan penyesalan. Di saat inilah, sebagian orang yang beriman akan mendapatkan naungan Allah, di antaranya adalah pemimpin yang adil, pemuda yang tumbuh dalam ketaatan, dan orang yang hatinya terpaut pada masjid."] },
                    { title: "Syafaat Terbesar (Asy-Syafa'at al-'Uzma)", points: ["Karena penderitaan yang tak tertahankan, manusia akan mendatangi para nabi (Adam, Nuh, Ibrahim, Musa, Isa) untuk memohon agar mereka meminta kepada Allah untuk segera memulai pengadilan. Namun, semua nabi merasa tidak layak. Akhirnya, mereka semua datang kepada penutup para nabi, Muhammad SAW. Beliau pun bersujud di bawah 'Arsy Allah dan memuji-Nya dengan pujian yang belum pernah diajarkan sebelumnya, hingga Allah berfirman, 'Angkatlah kepalamu, mintalah niscaya akan diberi, dan berilah syafaat niscaya akan diterima.' Inilah Syafaat Terbesar, di mana Allah memulai proses pengadilan atas permohonan Nabi Muhammad."] },
                    { title: "Hisab dan Mizan (Perhitungan dan Timbangan)", points: ["Dimulailah pengadilan (Hisab) yang paling adil dan teliti. Setiap amal, sekecil biji sawi pun, akan diperhitungkan. Mulut akan dikunci, dan anggota tubuh seperti tangan, kaki, dan kulit akan menjadi saksi atas perbuatan mereka di dunia. Setiap orang akan menerima catatan amalnya (kitab); orang beriman akan menerimanya dari sebelah kanan, sebuah pertanda kebahagiaan, sementara orang kafir akan menerimanya dari sebelah kiri atau dari belakang punggungnya, sebuah pertanda kecelakaan. Setelah itu, amal baik dan buruk akan ditimbang dalam Mizan, sebuah timbangan keadilan yang hakiki dan sangat presisi."] },
                    { title: "Ash-Shirath (Jembatan)", points: ["Setelah hisab, semua manusia harus melewati Ash-Shirath, sebuah jembatan yang terbentang di atas jurang Neraka Jahannam. Hadits menggambarkannya lebih tipis dari rambut dan lebih tajam dari pedang. Orang-orang beriman akan melintasinya dengan kecepatan yang bervariasi sesuai dengan tingkat iman dan amal saleh mereka; ada yang secepat kilat, secepat angin, secepat kuda, berlari, berjalan, hingga merangkak. Di sepanjang jembatan, terdapat pengait-pengait yang akan menyambar orang-orang yang diperintahkan untuk disambar. Sementara itu, orang-orang kafir dan munafik akan langsung tergelincir dan jatuh ke dalam neraka."] },
                    { title: "Surga dan Neraka (Tujuan Akhir)", points: ["Setelah melewati Shirath, orang beriman akan sampai pada tujuan akhir mereka: Surga (Jannah), tempat kenikmatan abadi yang tak pernah terbayangkan. Sementara mereka yang jatuh dari Shirath akan masuk ke Neraka (Naar), tempat siksaan abadi bagi orang-orang yang ingkar. Ini adalah akhir dari perjalanan, sebuah pemisahan abadi antara penduduk kebahagiaan dan penduduk penderitaan, sebagai manifestasi dari keadilan dan rahmat Allah SWT."] }
                ]
            }
        ],
        dalil: {
            text: "Dan sungguh, (hari) Kiamat itu pasti datang, tidak ada keraguan padanya; dan sungguh, Allah akan membangkitkan siapa pun yang di dalam kubur.",
            source: 'QS. Al-Hajj: 7'
        }
    },
    {
        id: 'ashabul-kahfi',
        title: 'Kisah Ashabul Kahfi',
        icon: 'fas fa-bed',
        subtitle: 'Keteguhan iman sekelompok pemuda yang melintasi zaman.',
        content: [
            {
                type: 'paragraph',
                title: 'Melarikan Diri Demi Iman: Konteks Penindasan',
                text: "Kisah yang diabadikan dengan indah dalam Surah Al-Kahf ini terjadi di sebuah kota bernama Ephesus (atau Tarsus menurut beberapa riwayat), di bawah pemerintahan seorang kaisar Romawi yang zalim dan penyembah berhala, yang diyakini adalah Kaisar Decius (sekitar 250 M). Di tengah masyarakat yang tenggelam dalam paganisme dan politeisme, di mana menolak menyembah dewa-dewa kaisar dianggap sebagai tindakan subversif yang diancam hukuman mati, hiduplah sekelompok pemuda bangsawan. Mereka adalah para pejabat atau penasihat istana yang, berkat hidayah Allah, secara diam-diam memeluk ajaran tauhid yang lurus (diyakini sisa ajaran Nabi Isa A.S.). Mereka menyembunyikan keimanan mereka, namun hati mereka resah melihat kesyirikan yang merajalela. Ketika praktik pemaksaan penyembahan berhala semakin gencar, mereka tidak lagi mampu menyembunyikan keimanan mereka. Dengan keberanian yang luar biasa, mereka berdiri di hadapan penguasa dan rakyatnya, dan dengan tegas menyatakan: 'Tuhan kami adalah Tuhan langit dan bumi; kami sekali-kali tidak menyeru Tuhan selain Dia.' Deklarasi iman yang terbuka ini adalah sebuah vonis mati bagi diri mereka sendiri. Menghadapi pilihan antara murtad atau dibunuh, mereka memilih jalan ketiga: hijrah. Mereka memutuskan untuk melarikan diri dari gemerlap kota dan kemewahan hidup mereka, menuju sebuah tempat terpencil untuk menyelamatkan aqidah mereka. Mereka berlindung di sebuah gua di gunung, ditemani oleh seekor anjing setia bernama Qithmir. Di dalam kegelapan gua, mereka memanjatkan doa yang tulus dan penuh kepasrahan: 'Wahai Tuhan kami, berikanlah rahmat kepada kami dari sisi-Mu dan sempurnakanlah bagi kami petunjuk yang lurus dalam urusan kami ini.'"
            },
            {
                type: 'paragraph',
                title: 'Tidur Panjang yang Ajaib: Perlindungan Ilahiah',
                text: "Menjawab doa mereka, Allah kemudian 'menutup telinga mereka' (menidurkan mereka) di dalam gua tersebut, sebuah tidur yang sangat nyenyak dan sangat panjang yang berlangsung selama 309 tahun menurut kalender bulan (atau 300 tahun menurut kalender matahari, sebagaimana dijelaskan dalam surah). Ini bukanlah tidur biasa, melainkan sebuah mukjizat agung. Selama periode yang melintasi beberapa generasi itu, Allah menjaga jasad mereka agar tidak rusak atau hancur. Al-Qur'an menggambarkan mekanisme perlindungan ilahiah ini dengan sangat detail dan ilmiah. 'Dan kamu akan melihat matahari ketika terbit, condong dari gua mereka ke sebelah kanan, dan bila matahari terbenam, menjauhi mereka ke sebelah kiri sedang mereka berada dalam tempat yang luas dalam gua itu.' (QS. Al-Kahf: 17). Posisi gua yang menghadap ke utara memastikan sinar matahari langsung tidak pernah mengenai mereka, namun cahayanya tetap masuk untuk menjaga sirkulasi udara dan kelembapan, mencegah pembusukan. 'Dan Kami bolak-balikkan mereka ke kanan dan ke kiri,' (QS. Al-Kahf: 18), sebuah proses yang secara medis penting untuk mencegah luka baring (pressure sores) pada tubuh yang terbaring lama. Sementara itu, anjing mereka 'menjulurkan kedua lengannya di muka pintu gua', seolah-olah berjaga. Keadaan mereka begitu menakjubkan sehingga 'jika kamu menyaksikan mereka, tentulah kamu akan berpaling dari mereka dengan melarikan diri dan tentulah (hati) kamu akan dipenuhi oleh ketakutan terhadap mereka.' Ini menunjukkan bahwa Allah membuat mereka tampak dalam kondisi yang membuat siapapun yang tak sengaja melihat akan merasa takut dan tidak berani mendekat, sebuah bentuk perlindungan tambahan."
            },
            {
                type: 'paragraph',
                title: 'Kebangkitan, Penemuan, dan Hikmah Agung',
                text: "Setelah 309 tahun berlalu, atas kehendak Allah, mereka pun dibangunkan. Mereka saling bertanya, 'Berapa lamakah kamu tinggal (di sini)?' Sebagian menjawab, 'Kita tinggal (di sini) sehari atau setengah hari.' Mereka sama sekali tidak menyadari waktu yang telah berlalu. Merasa lapar, mereka mengutus salah satu dari mereka, Yamlikha, untuk pergi ke kota dengan sangat hati-hati menggunakan uang perak yang mereka bawa, untuk membeli makanan yang halal. Ketika Yamlikha tiba di kota, ia sangat terkejut. Wajah orang-orang, arsitektur bangunan, dan mata uang semuanya telah berubah. Sebaliknya, para pedagang dan penduduk kota pun terkejut melihat uang perak kuno dari zaman Kaisar Decius yang ia gunakan. Kabar ini dengan cepat sampai kepada raja yang berkuasa saat itu, yang ternyata adalah seorang raja yang beriman. Pada masa itu, masyarakat sedang dilanda perdebatan sengit dan keraguan tentang adanya hari kebangkitan setelah kematian. Penemuan para pemuda Ashabul Kahfi yang hidup kembali setelah tertidur selama tiga abad menjadi bukti nyata dan tak terbantahkan di hadapan mata mereka tentang kekuasaan Allah untuk membangkitkan orang mati. Misi mereka telah selesai. Setelah identitas mereka terkonfirmasi, Allah mewafatkan mereka dengan sebenarnya. Kisah ini mengajarkan banyak hikmah: pentingnya menjaga iman meskipun harus mengorbankan segalanya, kekuatan doa dan tawakal, bukti kekuasaan Allah atas ruang dan waktu, dan yang terpenting, penegasan akan keniscayaan hari kebangkitan."
            },
        ],
        dalil: {
            text: "Kami ceritakan kepadamu (Muhammad) kisah mereka dengan sebenarnya. Sesungguhnya mereka adalah pemuda-pemuda yang beriman kepada Tuhan mereka, dan Kami tambahkan petunjuk kepada mereka.",
            source: 'QS. Al-Kahf: 13'
        }
    },
    {
        id: 'dzulqarnain',
        title: 'Kisah Dzulqarnain',
        icon: 'fas fa-dungeon',
        subtitle: 'Perjalanan raja adil pembangun dinding pelindung Ya\'juj dan Ma\'juj.',
        content: [
            {
                type: 'paragraph',
                title: 'Sosok Raja Saleh Pemilik Kekuasaan Agung',
                text: "Di dalam Surah Al-Kahf, Al-Qur'an menyajikan kisah seorang tokoh agung, misterius, dan penuh inspirasi bernama Dzulqarnain. Nama 'Dzulqarnain' secara harfiah berarti 'Pemilik Dua Tanduk', sebuah julukan yang maknanya masih menjadi perdebatan para ahli tafsir—apakah merujuk pada kekuasaannya yang membentang dari timur hingga barat ('dua tanduk' dunia), atau pada hiasan di mahkotanya, atau karena ia hidup melintasi dua generasi. Meskipun identitas historisnya tidak disebutkan secara pasti (beberapa teori mengaitkannya dengan Alexander Agung dari Makedonia atau Cyrus Agung dari Persia), Al-Qur'an lebih fokus pada karakternya. Dzulqarnain bukanlah sekadar penakluk biasa; ia adalah seorang raja yang saleh, adil, dan beriman, yang diberi oleh Allah 'kekuasaan di (muka) bumi, dan Kami telah memberikan kepadanya jalan (untuk mencapai) segala sesuatu' (QS. Al-Kahf: 84). Ini berarti ia tidak hanya memiliki kekuatan militer dan politik, tetapi juga ilmu pengetahuan, teknologi, dan hikmah untuk menyelesaikan berbagai masalah. Kisahnya menyoroti tiga ekspedisi besar yang ia lakukan, bukan untuk menumpuk kekayaan atau memperluas kekuasaan demi kesombongan, melainkan untuk menyebarkan keadilan, menegakkan tauhid, dan melindungi kaum yang lemah."
            },
            {
                type: 'paragraph',
                title: 'Ekspedisi Pertama: Menuju Tempat Terbenamnya Matahari (Barat)',
                text: "Perjalanan pertama Dzulqarnain membawanya ke arah barat, 'hingga apabila dia telah sampai ke tempat terbenam matahari, dia melihat matahari terbenam di dalam laut yang berlumpur hitam (fi 'ainin hami'ah)'. Deskripsi ini bukanlah pernyataan harfiah bahwa matahari tenggelam ke dalam laut, melainkan sebuah penggambaran puitis dari perspektif pengamat di tepi lautan luas (seperti Samudra Atlantik) saat senja, di mana cakrawala tampak seperti air yang gelap. Di sana, ia menemukan suatu kaum. Allah memberinya pilihan: 'Wahai Dzulqarnain, kamu boleh menyiksa atau boleh berbuat kebaikan terhadap mereka.' Ini adalah ujian bagi kekuasaannya. Dzulqarnain menunjukkan kebijaksanaan dan keadilannya yang luar biasa. Ia tidak menghancurkan kaum itu secara membabi buta. Ia menetapkan prinsip keadilan yang jelas: 'Adapun orang yang aniaya, maka kami kelak akan mengazabnya... Adapun orang-orang yang beriman dan beramal saleh, maka baginya pahala yang terbaik sebagai balasan.' Ia menegakkan hukum, menghukum para penindas dan pelaku kejahatan, serta memberi penghargaan dan bimbingan kepada orang-orang baik. Ia membangun tatanan masyarakat yang adil sebelum melanjutkan perjalanannya."
            },
            {
                type: 'paragraph',
                title: 'Ekspedisi Kedua: Menuju Tempat Terbitnya Matahari (Timur)',
                text: "Selanjutnya, Dzulqarnain melakukan perjalanan ke arah timur, 'hingga apabila dia telah sampai ke tempat terbitnya matahari (matli'asy-syams), dia mendapati matahari itu menyinari segolongan umat yang Kami tidak menjadikan bagi mereka sesuatu yang melindunginya dari (cahaya) matahari itu.' Ini adalah gambaran tentang sebuah kaum yang hidup di dataran yang sangat terbuka, mungkin di stepa Asia Tengah atau wilayah gurun, di mana tidak ada pegunungan atau pepohonan tinggi yang memberikan naungan. Mereka hidup dalam kondisi yang sangat primitif. Al-Qur'an tidak merinci interaksi Dzulqarnain dengan mereka, hanya menyatakan 'demikianlah. Dan sesungguhnya ilmu Kami meliputi segala apa yang ada padanya.' Ini mengisyaratkan bahwa Dzulqarnain memahami kondisi mereka dan memperlakukan mereka sesuai dengan kebijaksanaan dan ilmu yang Allah berikan kepadanya, mungkin dengan mengajarkan mereka cara membangun tempat berlindung atau memperbaiki kondisi hidup mereka, sebelum melanjutkan misinya."
            },
            {
                type: 'paragraph',
                title: 'Ekspedisi Ketiga: Membangun Dinding Besi dan Tembaga',
                text: "Ekspedisi ketiga adalah yang paling monumental. Dzulqarnain melakukan perjalanan hingga ia 'sampai di antara dua buah gunung', kemungkinan di wilayah pegunungan Kaukasus. Di sana, ia bertemu dengan suatu kaum yang 'hampir tidak mengerti pembicaraan'. Dengan susah payah, mereka mengadukan sebuah masalah besar: mereka terus-menerus diteror oleh dua suku perusak yang sangat biadab, yaitu Ya'juj dan Ma'juj (Gog dan Magog). Mereka menawarkan upah kepada Dzulqarnain, 'Maka maukah kamu menerima suatu imbalan dari kami, supaya kamu membuat dinding penghalang antara kami dan mereka?' Di sinilah karakter sejati Dzulqarnain bersinar. Ia menolak upah tersebut dengan berkata, 'Apa yang telah dikuasakan oleh Tuhanku kepadaku terhadapnya adalah lebih baik, maka tolonglah aku dengan kekuatan (manusia), agar aku membuatkan dinding antara kamu dan mereka.' Ia tidak memberikan solusi instan, melainkan mengajak kaum tersebut untuk berpartisipasi aktif (empowerment). Dengan kejeniusan teknologinya, ia memerintahkan mereka untuk membawa potongan-potongan besi. Besi itu disusun hingga rata dengan kedua puncak gunung. Kemudian, ia memerintahkan mereka untuk meniup api hingga besi itu menjadi merah membara seperti api. Terakhir, ia meminta tembaga cair untuk dituangkan di atasnya. Hasilnya adalah sebuah dinding penghalang logam raksasa yang sangat kokoh dan licin, yang 'mereka (Ya'juj dan Ma'juj) tidak bisa mendakinya dan mereka tidak bisa (pula) melubanginya.' Setelah menyelesaikan mahakarya ini, Dzulqarnain tidak menjadi sombong. Ia justru berkata, 'Ini adalah rahmat dari Tuhanku.' Ia menyadari bahwa kekuatannya berasal dari Allah dan bahwa dinding itu pun suatu saat akan hancur atas kehendak-Nya menjelang hari kiamat. Kisah Dzulqarnain adalah teladan kepemimpinan ideal: seorang penguasa yang memadukan kekuatan, ilmu, keadilan, dan keimanan yang mendalam untuk membawa kemaslahatan bagi umat manusia."
            }
        ],
        dalil: {
            text: "Dan mereka akan bertanya kepadamu (Muhammad) tentang Dzulqarnain. Katakanlah: 'Aku akan bacakan kepadamu cerita tentangnya.' Sesungguhnya Kami telah memberi kekuasaan kepadanya di (muka) bumi, dan Kami telah memberikan kepadanya jalan (untuk mencapai) segala sesuatu.",
            source: 'QS. Al-Kahf: 83-84'
        }
    },
    {
        id: 'ashabul-ukhdud',
        title: 'Kisah Ashabul Ukhdud',
        icon: 'fas fa-fire-alt',
        subtitle: 'Pengorbanan agung kaum beriman dalam mempertahankan aqidah.',
        content: [
            {
                type: 'paragraph',
                title: 'Pemuda Beriman di Tengah Tiran dan Sihir',
                text: `Kisah Ashabul Ukhdud (Para Pembuat Parit), yang diabadikan dalam Surah Al-Buruj dan diriwayatkan secara lebih rinci dalam hadits riwayat Imam Muslim, adalah salah satu narasi paling kuat tentang pengorbanan dan keteguhan iman dalam sejarah. Kisah ini terjadi di sebuah kerajaan di Yaman, yang diperintah oleh seorang raja kafir yang zalim dan mengaku memiliki sifat ketuhanan. Raja ini memiliki seorang penyihir tua sebagai penasihat utamanya. Ketika sang penyihir merasa ajalnya mendekat, ia meminta raja untuk mencarikan seorang pemuda yang cerdas untuk diwarisi ilmu sihirnya. Terpilihlah seorang pemuda yang brilian. Setiap hari, pemuda ini berjalan dari rumahnya menuju istana untuk belajar dari si penyihir. Namun, di tengah perjalanannya, ia melewati kediaman seorang rahib (ahli ibadah yang lurus imannya). Tertarik dengan ajaran sang rahib, pemuda itu mulai singgah secara diam-diam untuk belajar tentang tauhid, tentang Allah, Tuhan yang sebenarnya. Ia menjadi begitu terpukau dengan ajaran sang rahib sehingga ia sering terlambat sampai ke tempat si penyihir (yang kemudian memukulnya) dan juga terlambat pulang ke rumah (yang membuatnya dimarahi keluarganya).`
            },
            {
                type: 'paragraph',
                title: 'Ujian Kebenaran dan Karamah dari Allah',
                text: `Dalam kebingungannya, ia mengadu kepada sang rahib. Sang rahib menasihatinya untuk mencari bukti kebenaran. Suatu hari, saat dalam perjalanan, seekor binatang buas yang sangat besar menghalangi jalan orang-orang. Ini menjadi momen pembuktian bagi sang pemuda. Ia mengambil sebuah batu dan berdoa, "Ya Allah, jika ajaran sang rahib lebih Engkau cintai daripada ajaran si penyihir, maka bunuhlah binatang ini agar orang-orang bisa lewat." Ia kemudian melemparkan batu itu, dan dengan satu lemparan, binatang buas itu pun mati. Sejak saat itu, keyakinannya menjadi mantap. Ia sadar bahwa ia berada di jalan yang benar. Setelah peristiwa ini, Allah menganugerahinya karamah (kemuliaan): ia mampu menyembuhkan orang yang buta sejak lahir, orang yang berpenyakit kusta, dan berbagai penyakit lainnya, semuanya dengan izin Allah. Ia tidak pernah mengaku bahwa kekuatan itu miliknya, selalu mengatakan, "Yang menyembuhkan adalah Allah." Kabar tentang kemampuannya ini menyebar luas, hingga sampai ke telinga seorang teman dekat raja yang buta. Teman raja itu datang membawa banyak hadiah dan meminta untuk disembuhkan. Sang pemuda berkata, "Aku tidak bisa menyembuhkan siapapun. Hanya Allah yang bisa. Jika engkau beriman kepada Allah, aku akan berdoa, dan Dia akan menyembuhkanmu." Teman raja itu pun beriman, dan seketika penglihatannya pulih.`
            },
            {
                type: 'paragraph',
                title: 'Strategi Dakwah Melalui Pengorbanan',
                text: `Melihat temannya sembuh, raja menjadi murka. Ia menyiksa temannya itu hingga ia membocorkan nama sang pemuda dan sang rahib. Ketiganya ditangkap. Sang rahib dan teman raja disiksa dengan kejam dan dibunuh karena menolak untuk meninggalkan iman mereka. Kini giliran sang pemuda. Raja mencoba berbagai cara untuk membunuhnya. Ia memerintahkan tentaranya untuk membawa pemuda itu ke puncak gunung dan melemparkannya. Namun, saat di puncak, pemuda itu berdoa, dan gunung itu bergetar, menjatuhkan semua tentara, sementara ia selamat. Raja kemudian memerintahkan agar ia dilemparkan ke tengah laut. Lagi-lagi, pemuda itu berdoa, dan kapal itu terbalik, menenggelamkan semua tentara, sementara ia kembali dengan selamat. Putus asa, raja bertanya bagaimana cara membunuhnya. Di sinilah sang pemuda melihat peluang dakwah terbesar. Ia berkata, "Engkau tidak akan bisa membunuhku, kecuali jika engkau melakukan apa yang aku perintahkan." Ia menginstruksikan raja untuk mengumpulkannya di tanah lapang bersama seluruh rakyat, mengikatnya di sebatang pohon, lalu mengambil anak panah dari kantongnya dan memanahnya sambil mengucapkan, "Bismillahi Rabbil ghulam" (Dengan nama Allah, Tuhannya pemuda ini). Raja, yang ingin sekali membunuhnya, mengikuti instruksi itu. Di hadapan ribuan rakyatnya, ia memanah sang pemuda sambil mengucapkan kalimat tersebut. Panah itu tepat mengenai pelipis sang pemuda, dan ia pun wafat. Melihat keajaiban ini—bahwa sang raja sendiri harus mengakui "Tuhan sang pemuda" untuk bisa membunuhnya—seluruh rakyat yang menyaksikan serentak berteriak, "Kami beriman kepada Tuhannya pemuda ini!" Rencana raja untuk memadamkan satu titik cahaya iman justru menyulut api keimanan di seluruh negeri.`
            },
            {
                type: 'paragraph',
                title: 'Parit Api dan Kemenangan Abadi',
                text: `Raja menjadi kalap. Kemarahannya mencapai puncak. Ia memerintahkan untuk menggali parit-parit besar (ukhdud) di setiap persimpangan jalan kota. Parit-parit itu diisi dengan kayu bakar dan dinyalakan hingga menjadi lautan api. Kemudian, ia memberikan ultimatum: siapa pun yang tidak mau kembali kepada agamanya (murtad), akan dilemparkan ke dalam api. Satu per satu, rakyat yang telah beriman itu dihadapkan pada pilihan mengerikan. Namun, dengan keteguhan yang luar biasa, mereka semua memilih untuk mempertahankan aqidah mereka. Mereka berjalan menuju api dengan tenang, bahkan berebut untuk menjadi yang lebih dulu. Pemandangan paling mengharukan adalah ketika seorang ibu yang menggendong bayinya tampak ragu-ragu sejenak. Tiba-tiba, atas izin Allah, bayinya berbicara, "Wahai ibunda, bersabarlah! Sesungguhnya engkau berada di atas kebenaran!" Dengan hati yang mantap, sang ibu pun melompat ke dalam api bersama bayinya. Ribuan orang beriman dibakar hidup-hidup hari itu, sebuah genosida iman yang mengerikan. Allah mengabadikan peristiwa ini dalam Al-Qur'an dengan melaknat para pelakunya: "Celakalah orang-orang yang membuat parit (Ashabul Ukhdud), yang berapi (dinyalakan dengan) kayu bakar...". Meskipun secara fisik mereka musnah, mereka adalah pemenang yang sesungguhnya. Mereka telah menjual kehidupan dunia yang fana untuk membeli surga yang abadi. Kisah mereka adalah pelajaran tertinggi tentang harga sebuah keimanan dan bukti bahwa tirani sekuat apapun tidak akan pernah bisa memadamkan cahaya kebenaran di dalam hati.`
            }
        ],
        dalil: {
            text: "Celakalah orang-orang yang membuat parit (Ashabul Ukhdud), yang berapi (dinyalakan dengan) kayu bakar, ketika mereka duduk di sekitarnya, sedang mereka menyaksikan apa yang mereka perbuat terhadap orang-orang beriman.",
            source: 'QS. Al-Buruj: 4-7'
        }
    }
];
