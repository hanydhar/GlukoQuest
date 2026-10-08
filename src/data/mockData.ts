export interface QuizQuestion {
  id: number;
  question: string;
  topic: string;
  sessionNumber: number; // 1 - 4
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizTopic {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  sessions: {
    number: number;
    title: string;
    description: string;
  }[];
}

export const QUIZ_TOPICS: QuizTopic[] = [
  {
    id: 'gizi',
    title: 'Gizi & Nutrisi Seimbang',
    subtitle: 'Batas Gula & Isi Piringku',
    icon: 'fa-basket-shopping',
    sessions: [
      { number: 1, title: 'Sesi 1: Batas Gula Harian', description: 'Pedoman Kemenkes RI & batas 4 sdm gula/hari.' },
      { number: 2, title: 'Sesi 2: Gula Tersembunyi', description: 'Kandungan gula pada boba, teh kemasan & soda.' },
      { number: 3, title: 'Sesi 3: Pedoman Isi Piringku', description: 'Porsi 50% sayur & buah pengontrol gula darah.' },
      { number: 4, title: 'Sesi 4: Camilan Sehat Sekolah', description: 'Memilih jajanan rendah indeks glikemik.' },
    ],
  },
  {
    id: 'aktivitas',
    title: 'Aktivitas Fisik & Kebugaran',
    subtitle: 'Target 3.000 Langkah',
    icon: 'fa-person-running',
    sessions: [
      { number: 1, title: 'Sesi 1: Manfaat Jalan Kaki', description: 'Bagaimana otot menyerap glukosa darah mandiri.' },
      { number: 2, title: 'Sesi 2: Sensitivitas Insulin', description: 'Mengapa bergerak mencegah resistensi insulin.' },
      { number: 3, title: 'Sesi 3: Move More di Sekolah', description: 'Tips mencapai 3.000 langkah di jam istirahat.' },
      { number: 4, title: 'Sesi 4: Bahaya Sedenter (Mager)', description: 'Dampak duduk berjam-jam pada lonjakan glukosa.' },
    ],
  },
  {
    id: 'sedentari',
    title: 'Gaya Hidup & Mitigasi Sedentari',
    subtitle: 'Bahaya Duduk Lama & Screen Time',
    icon: 'fa-couch',
    sessions: [
      { number: 1, title: 'Sesi 1: Bahaya Duduk Terlalu Lama', description: 'Dampak perilaku sedenter & penurunan pembersihan glukosa oleh otot.' },
      { number: 2, title: 'Sesi 2: Screen Time & Main Gawai', description: 'Bahaya main gawai berjam-jam tanpa jeda gerak terhadap resistensi insulin.' },
      { number: 3, title: 'Sesi 3: Keajaiban Jalan Kaki Ringan', description: 'Bagaimana berjalan kaki 10-15 menit merangsang transporter GLUT-4 penyerap gula darah.' },
      { number: 4, title: 'Sesi 4: Tips Movement Break di Sekolah', description: 'Strategi praktis interupsi duduk tiap 45 menit belajar di kelas SMPN 1.' },
    ],
  },
  {
    id: 'p3k',
    title: 'Pertolongan Pertama Dasar',
    subtitle: 'Gejala Hipoglikemia & Pencegahan',
    icon: 'fa-kit-medical',
    sessions: [
      { number: 1, title: 'Sesi 1: Tanda Awal Pradiabetes', description: 'Mengenali gejala 3P (sering haus, lapar, lelah).' },
      { number: 2, title: 'Sesi 2: Mengenal Hipoglikemia', description: 'Gejala gemetar, keringat dingin, & pertolongan UKS.' },
      { number: 3, title: 'Sesi 3: Cek Kesehatan Remaja', description: 'Pentingnya skrining IMT dan tekanan darah di UKS.' },
      { number: 4, title: 'Sesi 4: Rencana Aksi Sehat', description: 'Membangun komitmen hidup sehat jangka panjang.' },
    ],
  },
];

// Bank Soal: 4 Topik x 4 Sesi x 5 Soal = total pertanyaan terstruktur
export const SESSION_QUESTIONS_DATABASE: Record<string, Record<number, QuizQuestion[]>> = {
  gizi: {
    1: [
      {
        id: 101,
        topic: 'Gizi & Nutrisi Seimbang',
        sessionNumber: 1,
        question: 'Berapa batas maksimal asupan gula harian yang dianjurkan Kemenkes RI untuk remaja?',
        options: ['4 sendok makan (50 gram)', '10 sendok makan (120 gram)', 'Bebas asal banyak minum air', '1 sendok teh saja (5 gram)'],
        correctIndex: 0,
        explanation: 'Kemenkes menganjurkan batas gula maksimal 4 sendok makan (50 gram) per orang per hari untuk mencegah diabetes.',
      },
      {
        id: 102,
        topic: 'Gizi & Nutrisi Seimbang',
        sessionNumber: 1,
        question: 'Apa akibat jika remaja rutin mengonsumsi gula melebihi batas 50 gram per hari?',
        options: ['Pankreas bekerja ekstra & memicu resistensi insulin', 'Tulang tumbuh lebih cepat', 'Kadar hemoglobin meningkat', 'Jarang merasa haus'],
        correctIndex: 0,
        explanation: 'Konsumsi gula berlebih membebani pankreas dan memicu resistensi insulin, awal mula pradiabetes.',
      },
      {
        id: 103,
        topic: 'Gizi & Nutrisi Seimbang',
        sessionNumber: 1,
        question: 'Gula alami yang sehat untuk remaja dapat diperoleh dari:',
        options: ['Buah-buahan segar utuh berserat', 'Permen manis berwarna-warni', 'Sirup kental manis', 'Minuman berkarbonasi'],
        correctIndex: 0,
        explanation: 'Buah utuh mengandung fruktosa alami yang dilengkapi serat pangan, memperlambat penyerapan gula.',
      },
      {
        id: 104,
        topic: 'Gizi & Nutrisi Seimbang',
        sessionNumber: 1,
        question: 'Mengapa membaca label informasi nilai gizi pada kemasan makanan penting?',
        options: ['Untuk mengetahui jumlah gula total per sajian', 'Hanya untuk melihat tanggal cetak bungkus', 'Supaya tahu warna pewarna makanan', 'Tidak ada manfaatnya'],
        correctIndex: 0,
        explanation: 'Membaca label gizi membantu remaja memantau asupan gula dan kalori tersembunyi.',
      },
      {
        id: 105,
        topic: 'Gizi & Nutrisi Seimbang',
        sessionNumber: 1,
        question: 'Istilah apa yang sering digunakan untuk gula tersembunyi pada komposisi makanan?',
        options: ['Sukrosa, fruktosa, sirup jagung tinggi fruktosa (HFCS)', 'Sodium klorida', 'Kalsium karbonat', 'Zat besi'],
        correctIndex: 0,
        explanation: 'Sukrosa, sirup jagung (HFCS), dekstrosa, dan maltosa adalah berbagai nama lain dari gula tambahan.',
      },
    ],
    2: [
      {
        id: 106,
        topic: 'Gizi & Nutrisi Seimbang',
        sessionNumber: 2,
        question: 'Satu cup minuman boba manis kekinian rata-rata mengandung berapa sendok makan gula?',
        options: ['8 - 12 sendok makan (melampaui jatah 1 hari!)', '1 - 2 sendok makan', '0 gram gula', 'Setengah sendok teh'],
        correctIndex: 0,
        explanation: 'Satu porsi boba manis dapat mengandung hingga 50-60 gram gula, langsung melebihi batas harian.',
      },
      {
        id: 107,
        topic: 'Gizi & Nutrisi Seimbang',
        sessionNumber: 2,
        question: 'Minuman teh kemasan botol 350 ml seringkali mengandung sekitar 25-30 gram gula, artinya setara dengan:',
        options: ['Separuh lebih jatah gula maksimal harian', 'Bebas kalori sama sekali', 'Cukup untuk kebutuhan 1 minggu', 'Kandungan serat murni'],
        correctIndex: 0,
        explanation: 'Hanya dengan 1 botol teh kemasan, lebih dari 50% jatah gula harian remaja sudah langsung terpakai.',
      },
      {
        id: 108,
        topic: 'Gizi & Nutrisi Seimbang',
        sessionNumber: 2,
        question: 'Apa alternatif minuman pelepas dahaga terbaik yang 0 gram gula?',
        options: ['Air putih dingin atau infused water buah segar', 'Soda berperisa jeruk', 'Minuman berenergi tinggi gula', 'Kopi instan sachet manis'],
        correctIndex: 0,
        explanation: 'Air putih adalah hidrasi terbaik yang menjaga ginjal dan kadar glukosa darah tetap stabil.',
      },
      {
        id: 109,
        topic: 'Gizi & Nutrisi Seimbang',
        sessionNumber: 2,
        question: 'Kapan saat terbaik mengurangi pemesanan kadar gula pada minuman kekinian (*less sugar*)?',
        options: ['Setiap kali memesan minuman manis', 'Hanya saat sedang sakit', 'Tidak perlu dikurangi', 'Hanya di hari libur'],
        correctIndex: 0,
        explanation: 'Memilih opsi less sugar (25% atau 0%) adalah kebiasaan bijak untuk melindungi metabolisme tubuh.',
      },
      {
        id: 110,
        topic: 'Gizi & Nutrisi Seimbang',
        sessionNumber: 2,
        question: 'Apa bahaya minuman manis dalam bentuk cair dibanding makanan padat?',
        options: ['Cepat diserap lambung dan memicu lonjakan insulin mendadak', 'Membuat gigi cepat tanggal dalam 1 jam', 'Tidak mengandung cairan', 'Membuat tubuh kekurangan kalori'],
        correctIndex: 0,
        explanation: 'Gula cair tidak memicu rasa kenyang yang lama namun menyerap sangat cepat ke aliran darah.',
      },
    ],
    3: [
      {
        id: 111,
        topic: 'Gizi & Nutrisi Seimbang',
        sessionNumber: 3,
        question: 'Menurut panduan "Isi Piringku", porsi makanan yang dianjurkan terdiri dari separuh (50%):',
        options: ['Sayuran dan aneka buah-buahan berserat', 'Nasi putih dan gorengan', 'Mi instan dan kerupuk', 'Daging berlemak saja'],
        correctIndex: 0,
        explanation: '50% piring diisi sayur dan buah yang kaya serat, vitamin, dan mineral pelindung sel.',
      },
      {
        id: 112,
        topic: 'Gizi & Nutrisi Seimbang',
        sessionNumber: 3,
        question: 'Peran utama serat dari sayur dan buah dalam piring makan adalah:',
        options: ['Memperlambat penyerapan karbohidrat sehingga gula darah tidak melonjak', 'Menghilangkan vitamin', 'Membuat makanan terasa pahit', 'Menggantikan fungsi air putih'],
        correctIndex: 0,
        explanation: 'Serat larut air membentuk gel pelindung yang memperlambat laju masuknya glukosa ke pembuluh darah.',
      },
      {
        id: 113,
        topic: 'Gizi & Nutrisi Seimbang',
        sessionNumber: 3,
        question: 'Contoh sumber karbohidrat kompleks kaya serat yang baik untuk makan siang adalah:',
        options: ['Beras merah, ubi kukus, atau jagung rebus', 'Kue kering manis', 'Roti tawar putih bergula', 'Gorengan tepung'],
        correctIndex: 0,
        explanation: 'Karbohidrat kompleks melepaskan glukosa secara perlahan dan memberi energi tahan lama.',
      },
      {
        id: 114,
        topic: 'Gizi & Nutrisi Seimbang',
        sessionNumber: 3,
        question: 'Sumber lauk protein nabati yang sangat baik di kantin sekolah untuk menjaga gula darah adalah:',
        options: ['Tempe dan tahu bacem/kukus', 'Sosis instan manis', 'Nugget ayam tinggi tepung', 'Kulit ayam goreng tepung'],
        correctIndex: 0,
        explanation: 'Tempe dan tahu mengandung isoflavon dan protein nabati tinggi yang membantu regulasi insulin.',
      },
      {
        id: 115,
        topic: 'Gizi & Nutrisi Seimbang',
        sessionNumber: 3,
        question: 'Urutan makan yang terbukti membantu mengontrol respon gula darah adalah:',
        options: ['Makan sayur/serat terlebih dahulu, lalu protein, kemudian karbohidrat', 'Makan makanan manis dulu', 'Langsung habiskan nasi tanpa sayur', 'Minum soda sebelum makan'],
        correctIndex: 0,
        explanation: 'Mendahulukan serat sayur membuat penyerapan karbohidrat lebih bertahap dan teratur.',
      },
    ],
    4: [
      {
        id: 116,
        topic: 'Gizi & Nutrisi Seimbang',
        sessionNumber: 4,
        question: 'Camilan kantin sekolah mana yang paling aman untuk mencegah risiko pradiabetes?',
        options: ['Buah potong segar tanpa saus sirup', 'Cireng bumbu manis gurih', 'Donat berlapis gula tebal', 'Es sirup kental'],
        correctIndex: 0,
        explanation: 'Buah potong adalah jajanan segar tinggi serat, antioksidan, dan indeks glikemik rendah.',
      },
      {
        id: 117,
        topic: 'Gizi & Nutrisi Seimbang',
        sessionNumber: 4,
        question: 'Apa keunggulan kacang rebus (seperti kacang tanah/kedelai) sebagai camilan sehat?',
        options: ['Mengandung lemak baik dan protein yang bikin kenyang stabil', 'Tinggi kandungan gula pasir', 'Menyebabkan kantuk di kelas', 'Mengandung sirup fruktosa'],
        correctIndex: 0,
        explanation: 'Kacang-kacangan kaya protein dan serat yang menjaga rasa kenyang tanpa memicu lonjakan glukosa.',
      },
      {
        id: 118,
        topic: 'Gizi & Nutrisi Seimbang',
        sessionNumber: 4,
        question: 'Bagaimana cara cerdas memilih jajanan di kantin sekolah SMP?',
        options: ['Pilih stand yang masuk whitelist UKS dengan menu bergizi', 'Pilih jajanan yang warnanya paling mencolok bergula', 'Hanya beli makanan yang digoreng berulang kali', 'Tidak pernah minum air putih'],
        correctIndex: 0,
        explanation: 'Memilih stand kantin sehat binaan UKS menjamin higienitas dan kandungan nutrisi seimbang.',
      },
      {
        id: 119,
        topic: 'Gizi & Nutrisi Seimbang',
        sessionNumber: 4,
        question: 'Berapa gelas air putih yang dianjurkan diminum saat jam sekolah berlangsung?',
        options: ['Minimal 4-6 gelas (1 - 1.5 Liter)', 'Cukup 1 teguk saja', 'Tidak perlu minum sama sekali', 'Diganti 3 botol minuman manis'],
        correctIndex: 0,
        explanation: 'Hidrasi cukup menjaga volume darah dan konsentrasi belajar tetap prima sepanjang hari.',
      },
      {
        id: 120,
        topic: 'Gizi & Nutrisi Seimbang',
        sessionNumber: 4,
        question: 'Apa dampak positif mengganti jajan gorengan manis dengan buah segar selama 1 bulan?',
        options: ['Tubuh lebih berenergi, risiko resistensi insulin menurun drastis', 'Berat badan naik tak terkendali', 'Sering mengantuk', 'Tekanan darah melonjak'],
        correctIndex: 0,
        explanation: 'Mengurangi konsumsi gula dan minyak jenuh meningkatkan sensitivitas insulin dan kesehatan pembuluh darah.',
      },
    ],
  },
  sedentari: {
    1: [
      {
        id: 301,
        topic: 'Gaya Hidup & Mitigasi Sedentari',
        sessionNumber: 1,
        question: 'Apa bahaya utama duduk diam lebih dari 2 jam berturut-turut bagi pengaturan gula darah remaja?',
        options: [
          'Enzim pembakar lemak dan penyerapan glukosa oleh otot menurun drastis sehingga gula menumpuk di darah',
          'Tulang kaki memanjang otomatis',
          'Darah menjadi lebih encer dan bersih',
          'Tidak ada dampak metabolisme sama sekali',
        ],
        correctIndex: 0,
        explanation: 'Saat duduk diam lama, kontraksi otot terhenti sehingga glukosa darah lambat dibersihkan dan membebani kerja pankreas.',
      },
      {
        id: 302,
        topic: 'Gaya Hidup & Mitigasi Sedentari',
        sessionNumber: 1,
        question: 'Mengapa otot betis dan paha disebut sebagai "spons glukosa" tubuh kita saat bergerak?',
        options: [
          'Saat berkontraksi, otot menyerap hingga 75% glukosa darah tanpa bergantung penuh pada insulin',
          'Karena otot menyimpan air garam dan vitamin',
          'Supaya kita tidak perlu mengonsumsi makanan bergizi',
          'Karena otot memproduksi hormon insulin cadangan',
        ],
        correctIndex: 0,
        explanation: 'Aktivitas fisik mengaktifkan jalur GLUT-4 pada otot yang menyerap glukosa langsung dari aliran darah.',
      },
      {
        id: 303,
        topic: 'Gaya Hidup & Mitigasi Sedentari',
        sessionNumber: 1,
        question: 'Istilah medis untuk kebiasaan menghabiskan sebagian besar waktu harian dengan duduk dan minim gerak adalah:',
        options: [
          'Perilaku Sedenter (Sedentary Behavior)',
          'Gaya hidup aktif aerobik',
          'Pola makan ketogenik',
          'Sindrom metabolisme atletik',
        ],
        correctIndex: 0,
        explanation: 'Perilaku sedenter adalah faktor risiko independen utama pradiabetes dan penyakit kardiovaskular pada usia muda.',
      },
      {
        id: 304,
        topic: 'Gaya Hidup & Mitigasi Sedentari',
        sessionNumber: 1,
        question: 'Berapa durasi maksimal disarankan duduk terus-menerus sebelum melakukan jeda berdiri atau berjalan ringan?',
        options: [
          'Maksimal 30–60 menit sekali, lalu berdiri atau jalan 2-3 menit',
          '6 jam nonstop tanpa berdiri',
          '24 jam penuh selama tidak lapar',
          'Bebas selama kursi terasa empuk',
        ],
        correctIndex: 0,
        explanation: 'Jeda berdiri setiap 30–60 menit efektif mengaktifkan kembali sirkulasi darah dan pembersihan glukosa otot.',
      },
      {
        id: 305,
        topic: 'Gaya Hidup & Mitigasi Sedentari',
        sessionNumber: 1,
        question: 'Apa dampak mager duduk seharian selama liburan sekolah terhadap kerja hormon insulin?',
        options: [
          'Sensitivitas reseptor insulin merosot (resistensi insulin meningkat), memicu pradiabetes',
          'Pankreas menjadi lebih kuat dan sehat',
          'Kadar gula darah otomatis stabil sempurna',
          'Produksi sel darah putih berlipat ganda',
        ],
        correctIndex: 0,
        explanation: 'Kurang gerak menyebabkan sel tubuh kurang responsif terhadap insulin, sehingga gula darah mudah melonjak.',
      },
    ],
    2: [
      {
        id: 306,
        topic: 'Gaya Hidup & Mitigasi Sedentari',
        sessionNumber: 2,
        question: 'Apa dampak buruk bermain gawai (game/sosmed) lebih dari 3–4 jam sehari sambil rebahan tanpa gerak?',
        options: [
          'Pembakaran kalori sangat rendah dan memperparah risiko penumpukan glukosa pasca makan',
          'Meningkatkan daya tahan paru-paru',
          'Mempercepat pembuangan racun tubuh',
          'Menghilangkan kebutuhan jalan kaki harian',
        ],
        correctIndex: 0,
        explanation: 'Screen time tinggi tanpa jeda gerak berkorelasi kuat dengan obesitas sentral dan resistensi insulin remaja.',
      },
      {
        id: 307,
        topic: 'Gaya Hidup & Mitigasi Sedentari',
        sessionNumber: 2,
        question: 'Mengapa bermain gawai terlalu lama sering memicu kebiasaan "mindless eating" (makan tanpa sadar)?',
        options: [
          'Otak terdistraksi layar sehingga tidak mengenali sinyal kenyang dan terus mengonsumsi camilan manis',
          'Karena gelombang layar memancarkan rasa lapar palsu',
          'Supaya jari tangan tidak terasa lelah mengetik',
          'Karena mata membakar glukosa 10x lebih banyak',
        ],
        correctIndex: 0,
        explanation: 'Fokus pada layar membuat kita tidak sadar telah menghabiskan camilan tinggi gula dan kalori dalam jumlah berlebih.',
      },
      {
        id: 308,
        topic: 'Gaya Hidup & Mitigasi Sedentari',
        sessionNumber: 2,
        question: 'Berapa batas waktu bermain gawai rekreasional (di luar jam belajar) yang dianjurkan per hari untuk remaja?',
        options: [
          'Maksimal 1–2 jam per hari diimbangi aktivitas fisik aktif',
          '10 jam nonstop tanpa batas',
          'Bebas dari pagi sampai larut malam',
          'Hanya boleh 1 menit per minggu',
        ],
        correctIndex: 0,
        explanation: 'Pedoman kesehatan anak & remaja menyarankan membatasi screen time hiburan maksimal 2 jam per hari.',
      },
      {
        id: 309,
        topic: 'Gaya Hidup & Mitigasi Sedentari',
        sessionNumber: 2,
        question: 'Bagaimana paparan cahaya biru gawai hingga larut malam memengaruhi risiko diabetes pada remaja?',
        options: [
          'Merusak kualitas tidur, memicu lonjakan hormon stres kortisol yang menaikkan gula darah puasa',
          'Membuat insulin bekerja dua kali lebih cepat',
          'Menurunkan tekanan darah ke tingkat ideal',
          'Membersihkan lemak hati saat tertidur',
        ],
        correctIndex: 0,
        explanation: 'Kurang tidur akibat begadang bermain gawai meningkatkan resistensi insulin akut keesokan harinya.',
      },
      {
        id: 310,
        topic: 'Gaya Hidup & Mitigasi Sedentari',
        sessionNumber: 2,
        question: 'Tindakan mitigasi terbaik saat sedang asyik bermain game di rumah setiap 45 menit adalah:',
        options: [
          'Pause game, berdiri minum segelas air putih, dan lakukan jalan ringan 2-3 menit',
          'Mengambil sebotol minuman soda manis dingin',
          'Berbaring tengkurap tanpa berpindah tempat',
          'Melanjutkan game hingga 5 jam berikutnya',
        ],
        correctIndex: 0,
        explanation: 'Jeda gerak singkat menyegarkan kembali sirkulasi darah dan mencegah metabolisme masuk ke mode sedenter pasif.',
      },
    ],
    3: [
      {
        id: 311,
        topic: 'Gaya Hidup & Mitigasi Sedentari',
        sessionNumber: 3,
        question: 'Bagaimana aktivitas jalan kaki ringan (Move More) membantu sel tubuh menyerap gula darah?',
        options: [
          'Kontraksi otot membuka jalur transporter GLUT-4 sehingga glukosa diserap langsung tanpa membebani insulin',
          'Memaksa pankreas mengeluarkan semua cadangan enzim',
          'Mengubah glukosa darah menjadi udara pernapasan',
          'Membekukan gula berlebih di dinding lambung',
        ],
        correctIndex: 0,
        explanation: 'Jalan kaki mengaktifkan translokasi transporter GLUT-4 ke membran sel otot secara mandiri dari insulin.',
      },
      {
        id: 312,
        topic: 'Gaya Hidup & Mitigasi Sedentari',
        sessionNumber: 3,
        question: 'Kapan waktu paling efektif berjalan santai 10-15 menit untuk meredam lonjakan gula darah (glukosa spike)?',
        options: [
          '15-30 menit setelah selesai makan siang atau makan malam',
          'Tepat saat sedang tidur larut malam',
          'Hanya setahun sekali saat perlombaan olahraga',
          'Saat perut sedang kosong selama 24 jam',
        ],
        correctIndex: 0,
        explanation: 'Jalan kaki singkat setelah makan langsung memotong puncak lonjakan glukosa darah pascapranadial.',
      },
      {
        id: 313,
        topic: 'Gaya Hidup & Mitigasi Sedentari',
        sessionNumber: 3,
        question: 'Mengapa target harian 3.000 langkah di GlukoQuest sangat berdampak bagi remaja SMPN 1?',
        options: [
          'Membantu keluar dari zona sedenter dan menjaga sensitivitas insulin harian tetap optimal',
          'Hanya untuk pamer peringkat di media sosial',
          'Supaya sepatu sekolah cepat aus',
          'Tidak memiliki manfaat kesehatan yang terbukti',
        ],
        correctIndex: 0,
        explanation: '3.000 langkah harian adalah fondasi praktis agar remaja tidak terperangkap dalam gaya hidup sedenter berisiko tinggi.',
      },
      {
        id: 314,
        topic: 'Gaya Hidup & Mitigasi Sedentari',
        sessionNumber: 3,
        question: 'Berapa persen rata-rata penurunan lonjakan gula darah setelah makan jika kita berjalan kaki santai 15 menit?',
        options: [
          'Menurun sekitar 20% hingga 30% dibanding hanya duduk diam',
          'Meningkat 100% lebih tinggi',
          'Tidak ada perubahan sama sekali',
          'Turun drastis hingga 0 mg/dL',
        ],
        correctIndex: 0,
        explanation: 'Penelitian metabolisme menunjukkan jalan santai pascamakan memangkas lonjakan gula darah hingga 20-30%.',
      },
      {
        id: 315,
        topic: 'Gaya Hidup & Mitigasi Sedentari',
        sessionNumber: 3,
        question: 'Jalan kaki konsisten setiap hari dapat menurunkan risiko pradiabetes berkembang menjadi diabetes tipe 2 hingga:',
        options: [
          'Hingga 50% lebih rendah dibanding gaya hidup malas bergerak',
          'Hanya 1% saja',
          'Tidak berpengaruh sama sekali',
          'Meningkatkan risiko sebesar 10%',
        ],
        correctIndex: 0,
        explanation: 'Aktivitas fisik teratur adalah pilar paling efektif dalam pencegahan diabetes tipe 2 pada anak dan remaja.',
      },
    ],
    4: [
      {
        id: 316,
        topic: 'Gaya Hidup & Mitigasi Sedentari',
        sessionNumber: 4,
        question: 'Apa yang dimaksud dengan "Movement Break" (jeda gerak aktif) di sekolah?',
        options: [
          'Menginterupsi duduk lama setiap 45-60 menit dengan berdiri, peregangan, atau jalan santai 1-2 menit',
          'Tidur telentang di lantai ruang kelas',
          'Berlari kencang keluar gerbang sekolah',
          'Meninggalkan kelas tanpa izin guru',
        ],
        correctIndex: 0,
        explanation: 'Movement break menjaga fokus belajar otak sekaligus menjaga laju metabolisme glukosa tetap aktif.',
      },
      {
        id: 317,
        topic: 'Gaya Hidup & Mitigasi Sedentari',
        sessionNumber: 4,
        question: 'Contoh praktis menambah langkah kaki di lingkungan SMPN 1 tanpa mengganggu jam pelajaran adalah:',
        options: [
          'Berjalan ke kantin sehat, memilih tangga, dan jalan keliling taman saat jam istirahat',
          'Duduk terus di bangku kelas dari bel masuk sampai bel pulang',
          'Meminta teman membelikan jajanan ke meja kelas',
          'Menghindari bergerak agar hemat energi',
        ],
        correctIndex: 0,
        explanation: 'Mencicil langkah saat jam istirahat dan pergantian kelas memudahkan pencapaian target 3.000 langkah harian.',
      },
      {
        id: 318,
        topic: 'Gaya Hidup & Mitigasi Sedentari',
        sessionNumber: 4,
        question: 'Bagaimana teman sebaya dapat saling memotivasi melawan budaya mager di sekolah?',
        options: [
          'Mengajak jalan santai bersama saat istirahat dan saling cek progres langkah di GlukoQuest',
          'Duduk bergerombol bermain game online berjam-jam',
          'Saling mentraktir minuman boba berpemanis buatan',
          'Menyuruh teman tidak usah ikut pelajaran olahraga',
        ],
        correctIndex: 0,
        explanation: 'Dukungan teman sebaya (peer support) menciptakan kebiasaan aktif yang menyenangkan dan berkelanjutan.',
      },
      {
        id: 319,
        topic: 'Gaya Hidup & Mitigasi Sedentari',
        sessionNumber: 4,
        question: 'Berdiri saat berdiskusi atau berjalan saat membaca catatan selama 10 menit membakar kalori dan merangsang sirkulasi:',
        options: [
          '30% hingga 50% lebih banyak dibanding duduk merosot pasif di kursi',
          'Sama persis seperti tidur malam',
          'Lebih sedikit dari duduk diam',
          'Tidak memiliki pengaruh apapun',
        ],
        correctIndex: 0,
        explanation: 'Kebiasaan aktif berdiri membakar lebih banyak energi dan menjaga sensitivitas insulin sel tetap tinggi.',
      },
      {
        id: 320,
        topic: 'Gaya Hidup & Mitigasi Sedentari',
        sessionNumber: 4,
        question: 'Apa prinsip utama mitigasi sedentari dalam program GlukoQuest untuk remaja?',
        options: [
          '"Move More, Sit Less! Langkah kaki aktif setiap hari adalah pelindung terbaik dari risiko diabetes!"',
          '"Duduk sebanyak mungkin selagi masih muda"',
          '"Cukup rebahan tanpa perlu bergerak"',
          '"Kesehatan tidak ditentukan oleh gaya hidup"',
        ],
        correctIndex: 0,
        explanation: 'Prinsip Move More, Sit Less adalah pesan kunci kesehatan pencegahan diabetes bagi generasi muda.',
      },
    ],
  },
};

// Fallback generator for topics 2, 3, 4 so every session has 5 rich, valid questions
export function getQuestionsForSession(topicId: string, sessionNum: number): QuizQuestion[] {
  if (SESSION_QUESTIONS_DATABASE[topicId] && SESSION_QUESTIONS_DATABASE[topicId][sessionNum]) {
    return SESSION_QUESTIONS_DATABASE[topicId][sessionNum];
  }

  // Dynamic fallback questions for topics 2, 3, 4 ensuring 5 questions per session
  const topicObj = QUIZ_TOPICS.find((t) => t.id === topicId) || QUIZ_TOPICS[0];
  return [
    {
      id: sessionNum * 10 + 1,
      topic: topicObj.title,
      sessionNumber: sessionNum,
      question: `Pada ${topicObj.title} (Sesi ${sessionNum}), mengapa aktif bergerak setiap hari sangat bermanfaat bagi sel tubuh remaja?`,
      options: [
        'Otot yang berkontraksi menyerap glukosa darah langsung tanpa membebani hormon insulin',
        'Hanya untuk membakar lemak di pipi',
        'Supaya cepat tertidur di jam kelas',
        'Tidak ada hubungannya dengan kadar gula darah',
      ],
      correctIndex: 0,
      explanation: 'Gerak aktif mengaktifkan transporter GLUT-4 pada membran otot untuk memasukkan glukosa dari darah ke sel.',
    },
    {
      id: sessionNum * 10 + 2,
      topic: topicObj.title,
      sessionNumber: sessionNum,
      question: 'Berapa target langkah harian minimal yang disarankan dalam program GlukoQuest untuk menjaga kebugaran?',
      options: ['3.000 langkah per hari', '100 langkah saja', '50.000 langkah tanpa istirahat', 'Cukup tidur seharian'],
      correctIndex: 0,
      explanation: 'Target 3.000 langkah harian membantu remaja keluar dari gaya hidup sedenter (mager).',
    },
    {
      id: sessionNum * 10 + 3,
      topic: topicObj.title,
      sessionNumber: sessionNum,
      question: 'Apa bahaya gaya hidup malas bergerak (sedenter) terhadap risiko pradiabetes pada usia sekolah?',
      options: [
        'Sensitivitas reseptor insulin menurun sehingga glukosa menumpuk di aliran darah',
        'Kekuatan otot meningkat otomatis',
        'Jantung berdetak lebih efisien',
        'Tekanan darah turun drastis',
      ],
      correctIndex: 0,
      explanation: 'Kurang gerak adalah pemicu utama resistensi insulin pada remaja generasi digital.',
    },
    {
      id: sessionNum * 10 + 4,
      topic: topicObj.title,
      sessionNumber: sessionNum,
      question: 'Kapan waktu yang paling praktis untuk mencicil langkah kaki saat jam sekolah di SMPN 1?',
      options: [
        'Saat jam istirahat sekolah, berjalan menuju kantin sehat dan perpustakaan',
        'Hanya saat tidur malam',
        'Saat duduk di depan komputer selama 6 jam',
        'Tidak perlu jalan kaki sama sekali',
      ],
      correctIndex: 0,
      explanation: 'Memanfaatkan jam istirahat untuk berjalan santai di koridor atau lapangan sangat efektif mencapai 3.000 langkah.',
    },
    {
      id: sessionNum * 10 + 5,
      topic: topicObj.title,
      sessionNumber: sessionNum,
      question: 'Bagaimana keterkaitan antara tidur cukup (7-8 jam) dan pencegahan diabetes pada remaja?',
      options: [
        'Tidur teratur menjaga hormon pengatur lapar (leptin & ghrelin) serta sensitivitas insulin stabil',
        'Tidur lama membuat gula darah habis total',
        'Tidur tidak mempengaruhi metabolisme glukosa',
        'Hanya berguna untuk pertumbuhan kuku',
      ],
      correctIndex: 0,
      explanation: 'Kurang tidur memicu lonjakan hormon stres kortisol yang langsung menurunkan efektivitas hormon insulin.',
    },
  ];
}

export interface SchoolRankUser {
  rank: number;
  name: string;
  points: number;
  avatar: string;
  class: string;
  isCurrentUser?: boolean;
}

export const SCHOOL_LEADERBOARD: SchoolRankUser[] = [
  { rank: 1, name: 'Budi Santoso', points: 450, avatar: '👦', class: '8-B', isCurrentUser: true },
  { rank: 2, name: 'Anisa Maharani', points: 410, avatar: '👩‍🎓', class: '8-A' },
  { rank: 3, name: 'Rizky Pratama', points: 380, avatar: '🏃‍♂️', class: '7-C' },
  { rank: 4, name: 'Siti Rahmawati', points: 320, avatar: '🧗‍♀️', class: '9-A' },
  { rank: 5, name: 'Dimas Aditya', points: 280, avatar: '🚴‍♂️', class: '8-C' },
  { rank: 6, name: 'Farah Nadia', points: 230, avatar: '🧕', class: '7-B' },
];

export interface CanteenVoucher {
  id: string;
  title: string;
  standName: string;
  pointsCost: number; // Minimal 200 Pts
  nominalRupiah: string;
  description: string;
  icon: string;
  calories: string;
  isHealthyHighlight: boolean;
}

export const CANTEEN_VOUCHERS: CanteenVoucher[] = [
  {
    id: 'v-1',
    title: 'E-Voucher Makan Siang Sehat (Rp5.000)',
    standName: 'Kantin Bu Sri (Stand 3 Whitelist UKS)',
    pointsCost: 200,
    nominalRupiah: 'Rp5.000',
    description: 'Dapat ditukarkan dengan Bento Nasi Merah + Ayam Panggang Serat & Rebusan Brokoli.',
    icon: '🍱',
    calories: 'Tinggi Serat · Bebas Gula Tambahan',
    isHealthyHighlight: true,
  },
  {
    id: 'v-2',
    title: 'E-Voucher Buah & Salad Segar (Rp5.000)',
    standName: 'Kantin Bu Dewi (Stand 1 Whitelist UKS)',
    pointsCost: 200,
    nominalRupiah: 'Rp5.000',
    description: 'Mangkuk potong semangka, melon, apel, dan yogurt plain kaya probiotik.',
    icon: '🥗',
    calories: 'Kaya Antioksidan · Indeks Glikemik Rendah',
    isHealthyHighlight: true,
  },
  {
    id: 'v-3',
    title: 'E-Voucher Sup Hangat & Minuman Sehat (Rp5.000)',
    standName: 'Kedai Sehat SMPN 1 (Stand UKS)',
    pointsCost: 200,
    nominalRupiah: 'Rp5.000',
    description: 'Pilihan Sop Ayam Bening Sayuran Kampung atau Susu Kedelai Murni Dingin Tanpa Sirup.',
    icon: '🍲',
    calories: 'Rendah Natrium · 0% Gula Rafinasi',
    isHealthyHighlight: true,
  },
];
