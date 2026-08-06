export interface BrideGroomInfo {
  name: string;
  fullName: string;
  childNumber: string;
  fatherName: string;
  motherName: string;
  instagram: string;
  photoUrl: string;
  quote?: string;
}

export interface EventDetail {
  title: string;
  date: string; // e.g. "2026-10-24"
  dateFormatted: string; // e.g. "Sabtu, 24 Oktober 2026"
  time: string; // e.g. "08:00 - 10:00 WIB"
  venueName: string;
  address: string;
  googleMapsUrl: string;
  embedMapUrl: string;
  calendarLink: string;
}

export interface LoveStoryItem {
  id: string;
  year: string;
  title: string;
  description: string;
  image?: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  bankLogo?: string;
}

export interface PhysicalGiftAddress {
  recipientName: string;
  phoneNumber: string;
  fullAddress: string;
  cityProvince: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption?: string;
  type?: 'image' | 'video';
}

export interface WishMessage {
  id: string;
  senderName: string;
  relationship: string; // e.g. "Sahabat SMA", "Rekan Kerja", "Keluarga"
  attendance: 'hadir' | 'tidak_hadir' | 'ragu';
  guestCount: number;
  message: string;
  createdAt: string;
  likes: number;
}

export interface RsvpData {
  id: string;
  guestName: string;
  phone?: string;
  attendance: 'hadir' | 'tidak_hadir' | 'ragu';
  guestCount: number;
  message?: string;
  createdAt: string;
}

export interface WeddingData {
  groom: BrideGroomInfo;
  bride: BrideGroomInfo;
  weddingDateIso: string; // "2026-10-24T08:00:00"
  akad: EventDetail;
  resepsi: EventDetail;
  stories: LoveStoryItem[];
  bankAccounts: BankAccount[];
  physicalAddress: PhysicalGiftAddress;
  gallery: GalleryItem[];
  dressCode: {
    primaryColor: string;
    secondaryColor: string;
    description: string;
    paletteHexes: string[];
  };
  audioTracks: {
    title: string;
    artist: string;
    url: string;
  }[];
  themeSettings?: {
    scriptFont?: string;
    serifFont?: string;
    heroPhotoUrl?: string;
  };
}
