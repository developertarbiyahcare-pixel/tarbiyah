
export interface Perawi {
  name: string;
  life: string;
  bio: string;
}

export const perawiData: Record<string, Perawi> = {
  // Sahabat (Primary Narrators)
  umar_khattab: { name: "Umar bin Khattab", life: "Wafat 23 H / 644 M", bio: "Sahabat Nabi, Khalifah kedua, bergelar 'Al-Faruq'. Salah satu dari sepuluh sahabat yang dijamin masuk surga. Kredibilitasnya sebagai perawi tidak diragukan." },
  abdullah_umar: { name: "Abdullah bin Umar", life: "Wafat 73 H / 693 M", bio: "Sahabat Nabi dan putra Umar bin Khattab. Salah satu dari sahabat yang paling banyak meriwayatkan hadits (al-muktsirun) dan sangat teliti dalam meneladani sunnah." },
  abdullah_masud: { name: "Abdullah bin Mas'ud", life: "Wafat 32 H / 653 M", bio: "Sahabat Nabi, termasuk Assabiqunal Awwalun. Dikenal sebagai ahli fiqh dan Al-Qur'an di kalangan sahabat." },
  aisyah: { name: "Aisyah binti Abu Bakar", life: "Wafat 58 H / 678 M", bio: "Ummul Mukminin, istri Nabi SAW. Salah satu perawi hadits terbanyak, dikenal karena kecerdasan dan pemahamannya yang mendalam tentang agama." },
  numan_basyir: { name: "An-Nu'man bin Basyir", life: "Wafat 64 H / 684 M", bio: "Sahabat Anshar. Bayi pertama yang lahir di kalangan Anshar setelah hijrah." },
  tamim_dari: { name: "Tamim ad-Dari", life: "Wafat 40 H / 661 M", bio: "Sahabat Nabi yang berasal dari Palestina. Terkenal dengan haditsnya tentang 'Agama adalah Nasihat'." },
  abu_hurairah: { name: "Abu Hurairah (Abdurrahman bin Shakhr Ad-Dausi)", life: "Wafat 59 H / 679 M", bio: "Sahabat Nabi yang paling banyak meriwayatkan hadits. Dikenal karena kekuatan hafalannya dan kedekatannya dengan Nabi SAW." },
  hasan_ali: { name: "Al-Hasan bin Ali bin Abi Thalib", life: "3 - 50 H / 624 - 670 M", bio: "Cucu kesayangan Nabi Muhammad SAW dari putrinya, Fatimah. Seorang sahabat yang mulia." },
  anas_malik: { name: "Anas bin Malik", life: "Wafat 93 H / 712 M", bio: "Sahabat Anshar yang menjadi pelayan pribadi Nabi Muhammad SAW selama 10 tahun di Madinah. Termasuk sahabat yang paling banyak meriwayatkan hadits." },
  syaddad_aus: { name: "Syaddad bin Aus", life: "Wafat 58 H / 678 M", bio: "Sahabat Anshar yang dikenal karena ilmu dan kebijaksanaannya." },
  abu_dzar: { name: "Abu Dzar Al-Ghifari (Jundub bin Junadah)", life: "Wafat 32 H / 653 M", bio: "Sahabat Nabi yang termasuk paling awal masuk Islam. Terkenal dengan kezuhudan dan ketegasannya dalam kebenaran." },
  muadz_jabal: { name: "Mu'adz bin Jabal", life: "Wafat 18 H / 639 M", bio: "Sahabat Anshar yang disebut Nabi sebagai orang yang paling tahu tentang halal dan haram." },
  abdullah_abbas: { name: "Abdullah bin Abbas", life: "Wafat 68 H / 687 M", bio: "Sepupu Nabi SAW, didoakan khusus oleh Nabi untuk pemahaman agama. Bergelar 'Turjumanul Qur'an' (Penerjemah Al-Qur'an)." },
  uqbah_amr: { name: "'Uqbah bin 'Amr Al-Anshari Al-Badri", life: "Wafat 40 H / 660 M", bio: "Sahabat Anshar yang ikut serta dalam Perang Badar (Al-Badri), menunjukkan statusnya yang mulia." },
  sufyan_abdullah: { name: "Sufyan bin Abdullah ats-Tsaqafi", life: "Tidak diketahui", bio: "Sahabat Nabi yang meminta nasihat ringkas namun padat dari Rasulullah SAW." },
  jabir_abdullah: { name: "Jabir bin Abdullah Al-Anshari", life: "Wafat 78 H / 697 M", bio: "Sahabat Anshar yang banyak meriwayatkan hadits, terutama tentang haji dan fiqh." },
  harits_asyari: { name: "Abu Malik Al-Harits bin 'Ashim Al-Asy'ari", life: "Wafat 18 H / 639 M", bio: "Sahabat Nabi yang wafat dalam wabah 'Amwas di Syam." },
  nawwas_saman: { name: "An-Nawwas bin Sam'an Al-Anshari", life: "Tidak diketahui", bio: "Sahabat Nabi dari Anshar." },
  irbadh_sariyah: { name: "Al-'Irbadh bin Sariyah", life: "Wafat 75 H", bio: "Sahabat Nabi yang terkenal dengan haditsnya tentang wasiat perpisahan Rasulullah SAW." },
  tsalabah_khusyani: { name: "Abu Tsa'labah Al-Khusyani", life: "Wafat 75 H", bio: "Sahabat Nabi." },
  sahl_saad: { name: "Sahl bin Sa'd As-Sa'idi", life: "Wafat 91 H / 710 M", bio: "Sahabat Anshar, salah satu sahabat yang wafat paling akhir di Madinah." },
  abu_said_khudri: { name: "Abu Sa'id Al-Khudri (Sa'd bin Malik)", life: "Wafat 74 H / 693 M", bio: "Sahabat Anshar, termasuk salah satu sahabat yang paling banyak meriwayatkan hadits." },
  abdullah_amr_ash: { name: "Abdullah bin 'Amr bin Al-'Ash", life: "Wafat 65 H / 684 M", bio: "Sahabat yang terkenal karena catatannya 'Ash-Shahifah Ash-Shadiqah', kumpulan hadits yang ia tulis langsung dari Nabi." },

  // Muhaddithun (Compilers)
  bukhari: { name: "Imam Bukhari", life: "194-256 H / 810-870 M", bio: "Gelar: Amirul Mukminin fil Hadits. Penyusun kitab 'Shahih Bukhari', yang dianggap umat Islam sebagai kitab paling shahih setelah Al-Qur'an." },
  muslim: { name: "Imam Muslim", life: "206-261 H / 821-875 M", bio: "Murid Imam Bukhari. Penyusun 'Shahih Muslim', kitab paling shahih kedua setelah Shahih Bukhari. Keduanya disebut 'Ash-Shahihain'." },
  tirmidzi: { name: "Imam Tirmidzi", life: "209-279 H / 824-892 M", bio: "Imam Hadits, murid Imam Bukhari. Karyanya 'Sunan at-Tirmidzi' termasuk Kutubus Sittah. Ia yang mempopulerkan klasifikasi hadits Hasan." },
  nasai: { name: "Imam An-Nasa'i", life: "215-303 H / 830-915 M", bio: "Imam Hadits dari Nasa', Khurasan. Karyanya 'Sunan An-Nasa'i' (Al-Mujtaba) terkenal karena syarat perawinya yang sangat ketat setelah Bukhari dan Muslim." },
  abu_dawud: { name: "Imam Abu Dawud", life: "202-275 H / 817-889 M", bio: "Imam Hadits dari Sijistan. Karyanya 'Sunan Abu Dawud' adalah salah satu dari Kutubus Sittah, fokus pada hadits-hadits hukum (fiqh)." },
  ibnu_majah: { name: "Imam Ibnu Majah", life: "209-273 H / 824-887 M", bio: "Imam Hadits dari Qazwin. Karyanya 'Sunan Ibnu Majah' melengkapi Kutubus Sittah (Enam Kitab Hadits Utama)." },
  daraquthni: { name: "Imam Ad-Daraquthni", life: "306-385 H / 918-995 M", bio: "Imam Hadits dari Baghdad. Sangat ahli dalam 'Ilal al-Hadits (ilmu tentang cacat-cacat tersembunyi pada hadits)." },
  baihaqi: { name: "Imam Al-Baihaqi", life: "384-458 H / 994-1066 M", bio: "Imam Hadits besar pengikut mazhab Syafi'i. Karyanya yang terkenal adalah 'As-Sunan al-Kubra'." },
  kitab_hujjah: { name: "Kitab Al-Hujjah", life: "Karya Abu al-Qasim al-Isbahani", bio: "Sebuah kitab yang menjadi rujukan Imam An-Nawawi untuk hadits ke-41. Penulisnya adalah seorang ulama hadits dari Isfahan." },
};
