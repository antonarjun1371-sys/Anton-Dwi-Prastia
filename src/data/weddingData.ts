import { WeddingData, WishMessage } from '../types';

const heroCoupleImg = '/src/assets/images/wedding_hero_red_background_1786025860596.jpg';
const groomImg = '/src/assets/images/groom_portrait_1786022950342.jpg';
const brideImg = '/src/assets/images/bride_portrait_1786022966434.jpg';

export const initialWeddingData: WeddingData = {
  groom: {
    name: 'Anton',
    fullName: 'Anton Dwi Prastia',
    childNumber: 'Putra Pertama dari',
    fatherName: 'Bpk. Roni Sudarmanto',
    motherName: 'Ibu Ike Irawati',
    instagram: '@antondwiprastia',
    photoUrl: groomImg,
    quote: 'Mencintai bukan tentang menemukan seseorang yang sempurna, tetapi melihat ketidaksempurnaan menjadi sempurna bersama.'
  },
  bride: {
    name: 'Sri',
    fullName: 'Sri Yatin',
    childNumber: 'Putri Ketiga dari',
    fatherName: 'Bpk. Achmad',
    motherName: 'Ibu Rohaya',
    instagram: '@sriyatin',
    photoUrl: brideImg,
    quote: 'Di antara sejuta bintang di langit, takdir mempertemukan kita untuk melangkah bersama menggapai ridho-Nya.'
  },
  weddingDateIso: '2026-09-10T07:00:00+07:00',
  akad: {
    title: 'Akad Nikah',
    date: '2026-09-10',
    dateFormatted: 'Kamis, 10 September 2026',
    time: 'Pukul 07.00 WIB s.d Selesai',
    venueName: 'Lokasi Acara Pernikahan',
    address: 'Kediaman Mempelai (Koordinat: -7.804230, 113.213218)',
    googleMapsUrl: 'https://maps.google.com/?q=-7.804230,113.213218',
    embedMapUrl: 'https://maps.google.com/maps?q=-7.804230,113.213218&z=17&output=embed',
    calendarLink: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Akad+Nikah+Anton+%26+Sri&dates=20260910T000000Z/20260910T030000Z&details=Pernikahan+Anton+Dwi+Prastia+%26+Sri+Yatin&location=-7.804230,113.213218'
  },
  resepsi: {
    title: 'Resepsi Pernikahan',
    date: '2026-09-10',
    dateFormatted: 'Kamis, 10 September 2026',
    time: 'Pukul 14.00 - 17.00 WIB',
    venueName: 'Lokasi Acara Pernikahan',
    address: 'Kediaman Mempelai (Koordinat: -7.804230, 113.213218)',
    googleMapsUrl: 'https://maps.google.com/?q=-7.804230,113.213218',
    embedMapUrl: 'https://maps.google.com/maps?q=-7.804230,113.213218&z=17&output=embed',
    calendarLink: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Resepsi+Pernikahan+Anton+%26+Sri&dates=20260910T070000Z/20260910T100000Z&details=Resepsi+Pernikahan+Anton+Dwi+Prastia+%26+Sri+Yatin&location=-7.804230,113.213218'
  },
  stories: [
    {
      id: '1',
      year: '2021',
      title: 'Awal Pertemuan',
      description: 'Takdir mempertemukan kami pertama kali. Komunikasi dan silaturahmi yang hangat perlahan menumbuhkan benih-benih kasih sayang.',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: '2',
      year: '2023',
      title: 'Komitmen Bersama',
      description: 'Setelah saling mengenal dan silaturahmi antar keluarga, kami berkomitmen untuk melangkah ke jenjang yang lebih serius.',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: '3',
      year: '2025',
      title: 'Hari Lamaran',
      description: 'Di hadapan kedua keluarga besar yang penuh kehangatan dan doa restu, kami mengikat janji suci lamaran sebagai persiapan menuju pernikahan.',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: '4',
      year: '2026',
      title: 'Hari Bahagia',
      description: 'Insya Allah, ikatan suci pernikahan kami Anton & Sri akan dilaksanakan. Kami memohon doa restu dari Bapak/Ibu/Saudara/i sekalian.',
      image: heroCoupleImg
    }
  ],
  bankAccounts: [
    {
      id: 'bca',
      bankName: 'Bank BCA',
      accountNumber: '8830129481',
      accountHolder: 'Anton Dwi Prastia',
      bankLogo: 'BCA'
    },
    {
      id: 'mandiri',
      bankName: 'Bank Mandiri',
      accountNumber: '1270009841234',
      accountHolder: 'Sri Yatin',
      bankLogo: 'MANDIRI'
    }
  ],
  physicalAddress: {
    recipientName: 'Anton & Sri',
    phoneNumber: '0812-3456-7890',
    fullAddress: 'Lokasi Acara Pernikahan (Koordinat: -7.804230, 113.213218)',
    cityProvince: 'Jawa Timur'
  },
  gallery: [
    {
      id: 'g1',
      url: heroCoupleImg,
      caption: 'Prewedding Portrait'
    },
    {
      id: 'g2',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
      caption: 'Moment of Love'
    },
    {
      id: 'g3',
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop',
      caption: 'The Promise'
    },
    {
      id: 'g4',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop',
      caption: 'Joy & Laughter'
    },
    {
      id: 'g5',
      url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop',
      caption: 'Forever Together'
    },
    {
      id: 'g6',
      url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop',
      caption: 'Warm Sunset Memories'
    }
  ],
  dressCode: {
    primaryColor: 'Champagne Gold & Sage Green',
    secondaryColor: 'Ivory White',
    description: 'Kami menyarankan para tamu mengenakan pakaian bernuansa Formal / Batik Modern dengan palet warna Champagne, Sage Green, atau Neutral Cream.',
    paletteHexes: ['#D4AF37', '#8FBC8F', '#F5F5DC', '#2F4F4F', '#C0C0C0']
  },
  audioTracks: [
    {
      title: 'Beautiful In White (Instrumental Piano)',
      artist: 'Romantic Piano Wedding',
      url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=wedding-piano-112199.mp3'
    },
    {
      title: 'A Thousand Years (Acoustic Guitar)',
      artist: 'Acoustic Wedding Serenade',
      url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8230232.mp3?filename=romantic-guitars-10543.mp3'
    },
    {
      title: 'Janji Suci (Instrumental Soft Strings)',
      artist: 'Indonesian Wedding Classics',
      url: 'https://cdn.pixabay.com/download/audio/2021/08/09/audio_276a08608e.mp3?filename=romantic-inspiration-10874.mp3'
    }
  ]
};

export const initialWishes: WishMessage[] = [
  {
    id: 'w1',
    senderName: 'Dhimas & Amanda',
    relationship: 'Sahabat Kuliah',
    attendance: 'hadir',
    guestCount: 2,
    message: 'Selamat untuk Anton dan Sri! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Bahagia selamanya sampai kakek nenek!',
    createdAt: '2026-08-01T10:15:00Z',
    likes: 8
  },
  {
    id: 'w2',
    senderName: 'Bapak & Ibu Hendra',
    relationship: 'Keluarga Besar',
    attendance: 'hadir',
    guestCount: 2,
    message: 'Barakallahu lakuma wa baraka alaikuma wa jamaa bainakuma fii khair. Selamat menempuh hidup baru anak-anakku tersayang.',
    createdAt: '2026-08-02T14:30:00Z',
    likes: 12
  },
  {
    id: 'w3',
    senderName: 'Rian Prasetya',
    relationship: 'Rekan Kerja',
    attendance: 'hadir',
    guestCount: 1,
    message: 'Lancar sampai hari H mas Anton! Mba Sri sosok luar biasa, kalian berdua sangat serasi. Ditunggu pestanya!',
    createdAt: '2026-08-04T08:20:00Z',
    likes: 5
  }
];

