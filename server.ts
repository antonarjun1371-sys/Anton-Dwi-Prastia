import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { initialWeddingData, initialWishes } from './src/data/weddingData';
import { WishMessage, RsvpData, WeddingData } from './src/types';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory data store for live interactive demo
  let currentWeddingData: WeddingData = { ...initialWeddingData };
  let wishesList: WishMessage[] = [...initialWishes];
  let rsvpList: RsvpData[] = [];

  // Lazy Gemini AI initialization
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY environment variable is missing.');
      }
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
    return aiClient;
  }

  // --- API ROUTES ---

  // Get current wedding details
  app.get('/api/wedding', (req, res) => {
    res.json({ success: true, data: currentWeddingData });
  });

  // Update wedding details (for couple admin mode)
  app.post('/api/wedding', (req, res) => {
    if (req.body && typeof req.body === 'object') {
      currentWeddingData = { ...currentWeddingData, ...req.body };
      res.json({ success: true, message: 'Data undangan berhasil diperbarui.', data: currentWeddingData });
    } else {
      res.status(400).json({ error: 'Data tidak valid' });
    }
  });

  // Get all wishes
  app.get('/api/wishes', (req, res) => {
    res.json({ success: true, wishes: wishesList });
  });

  // Post a new wish
  app.post('/api/wishes', (req, res) => {
    const { senderName, relationship, attendance, guestCount, message } = req.body;
    if (!senderName || !message) {
      return res.status(400).json({ error: 'Nama dan ucapan wajib diisi.' });
    }

    const newWish: WishMessage = {
      id: 'wish-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      senderName: senderName.trim(),
      relationship: relationship || 'Tamu Undangan',
      attendance: attendance || 'hadir',
      guestCount: Number(guestCount) || 1,
      message: message.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    wishesList.unshift(newWish);

    // Also add to RSVP list
    const newRsvp: RsvpData = {
      id: 'rsvp-' + Date.now(),
      guestName: senderName.trim(),
      attendance: attendance || 'hadir',
      guestCount: Number(guestCount) || 1,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };
    rsvpList.unshift(newRsvp);

    res.status(201).json({ success: true, wish: newWish });
  });

  // Like a wish
  app.post('/api/wishes/:id/like', (req, res) => {
    const { id } = req.params;
    const wish = wishesList.find((w) => w.id === id);
    if (wish) {
      wish.likes += 1;
      res.json({ success: true, likes: wish.likes });
    } else {
      res.status(404).json({ error: 'Ucapan tidak ditemukan.' });
    }
  });

  // Get RSVPs summary
  app.get('/api/rsvp', (req, res) => {
    const totalHadir = rsvpList
      .filter((r) => r.attendance === 'hadir')
      .reduce((sum, r) => sum + r.guestCount, 0);
    const totalTidakHadir = rsvpList.filter((r) => r.attendance === 'tidak_hadir').length;
    const totalRagu = rsvpList.filter((r) => r.attendance === 'ragu').length;

    res.json({
      success: true,
      summary: {
        totalResponses: rsvpList.length,
        totalGuestsAttending: totalHadir,
        totalNotAttending: totalTidakHadir,
        totalUncertain: totalRagu,
      },
      rsvps: rsvpList,
    });
  });

  // AI Route: Generate Personalized Wedding Wish using Gemini
  app.post('/api/ai/wish', async (req, res) => {
    try {
      const { guestName, relationship, tone, language } = req.body;
      const ai = getGeminiClient();

      const groomName = currentWeddingData.groom.name;
      const brideName = currentWeddingData.bride.name;

      const prompt = `Anda adalah asisten pembuat ucapan pernikahan terbaik. Buatkan ucapan selamat pernikahan yang indah, tulus, hangat, dan berkesan untuk pasangan pengantin ${groomName} & ${brideName}.

Data Tamu:
- Nama Pengirim: ${guestName || 'Tamu Istimewa'}
- Hubungan: ${relationship || 'Sahabat/Keluarga'}
- Tone/Gaya Bahasa: ${tone || 'Islami & Penuh Doa Restu'} (pilihan: Islami, Puitis/Penuh Cinta, Santai & Akrab, Formal/Sopan)
- Bahasa: ${language || 'Indonesia'}

Instruksi:
1. Tulis ucapan dalam 2 hingga 4 kalimat yang menyentuh hati.
2. Sertakan doa untuk keberkahan, kebahagiaan rumah tangga, keharmonisan, dan keturunan yang sholeh/sholehah.
3. Langsung berikan teks ucapannya tanpa embel-embel judul atau tanda petik di luar ucapan.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
      });

      const wishText = response.text ? response.text.trim() : 'Selamat menempuh hidup baru untuk pasangan pengantin!';
      res.json({ success: true, wish: wishText });
    } catch (error: any) {
      console.error('AI Wish error:', error);
      res.status(500).json({
        error: 'Gagal membuat ucapan AI. Silakan coba lagi.',
        details: error.message,
      });
    }
  });

  // AI Route: Generate Couple Romantic Poem / Love Story quote
  app.post('/api/ai/story', async (req, res) => {
    try {
      const { style } = req.body;
      const ai = getGeminiClient();

      const groomName = currentWeddingData.groom.fullName;
      const brideName = currentWeddingData.bride.fullName;

      const prompt = `Buatkan sebuah puisi/pantun/quotes pernikahan yang sangat indah dan puitis untuk pasangan ${groomName} dan ${brideName} yang sedang melangsungkan pernikahan. Style: ${style || 'Puitis Romantis'}. Sertakan doa keabadian cinta. Tulis dengan estetika bahasa Indonesia yang luhur dan manis.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
      });

      res.json({ success: true, result: response.text ? response.text.trim() : '' });
    } catch (error: any) {
      console.error('AI Story error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // --- VITE MIDDLEWARE OR STATIC SERVING ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
