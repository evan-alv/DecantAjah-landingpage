import image_logo_2 from "@/imports/logo.jpg";
import imgCarousel from "@/imports/carousel_container.png";
import imgBlooming from "@/imports/blooming_v2.png";
import imgRomantic from "@/imports/romantic_v2.png";
import imgFerry from "@/imports/ferry_v2.png";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Instagram,
  Star,
  Menu,
  X,
  ArrowRight,
  LogOut,
  User,
  Pencil,
  ShieldCheck,
  KeyRound,
  Settings,
  Check,
  Ban
} from "lucide-react";

const carouselImages = [imgCarousel, imgBlooming, imgRomantic, imgFerry];

const defaultSiteData = {
  credentials: { username: "evann", password: "zxlaaa" },
  promoText: "✨ PROMO SPESIAL: Gratis Ongkir Seluruh Indonesia Khusus Transaksi Hari Ini! ✨",
  heroHeadline: "Only Serve Our Best For You",
  heroSubtitle: "Koleksi decant parfum original pilihan dengan racikan sempurna. Praktis, elegan, dan terjangkau.",
  products: [
    { id: 1, name: "Blooming Banquet", image: imgBlooming, price: "Rp 25.000", description: "Perpaduan aroma floral mewah dan elegan. Diracik murni tanpa alkohol tambahan, sangat cocok untuk menghadiri acara formal atau pemaikaian harian." },
    { id: 2, name: "Romantic Wish", image: imgRomantic, price: "Rp 25.000", description: "Kombinasi aroma buah manis yang segar dan ceria. Memberikan kesan romantis yang memikat dan membangkitkan rasa percaya diri sepanjang hari." },
    { id: 3, name: "Ferry Light Ice", image: imgFerry, price: "Rp 25.000", description: "Sensasi aroma cool, fresh, dan aquatic yang maskulin sekaligus unisex. Memberikan kesegaran maksimal untuk aktivitas luar ruangan." },
  ],
  usps: [
    { id: 1, title: "100% Original", desc: "Jaminan kualitas cairan murni diekstrak langsung dari botol resmi tanpa oplosan." },
    { id: 2, title: "Higienis & Steril", desc: "Proses pemindahan menggunakan syringe steril khusus demi menjaga keutuhan aroma parfum." },
    { id: 3, title: "Botol Kaca Premium", desc: "Menggunakan botol spray kaca tebal yang aman, elegan, serta sangat travel-friendly." },
    { id: 4, title: "Harga Bersahabat", desc: "Nikmati kemewahan aroma brand dunia dengan penyesuaian budget kantong mahasiswa." }
  ],
  testimonials: [
    { id: 1, name: "Go Youn Jung", role: "Perfume Enthusiast", text: "Adminnya ramah pas konsultasi, direkomendasiin Romantic Wish dan beneran cocok banget sama selera aku.", avatar: "https://asset.tabloidbintang.com/img/1747632657_602bc21057868d86e38b.jpeg" },
    { id: 2, name: "Rose", role: "Verified Buyer", text: "Packaging rapi banget, botol decant-nya tebal dan spray-nya menyebar halus. Wanginya tahan lama seharian di kampus!", avatar: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Blackpink_Ros%C3%A9_Rimowa_2.jpg" },
    { id: 3, name: "Reemar", role: "Loyal Customer", text: "Harga sangat bersahabat buat kantong mahasiswa, tapi kualitas pelayanannya kayak beli di toko mahal. Mantap Decant Ajah!", avatar: "https://i.pinimg.com/originals/e9/60/18/e96018d01ebe832522166c9f74984a88.jpg" }
  ],
  faqs: [
    { id: 1, q: "Apakah kualitas aromanya berubah karena dipindahkan?", a: "Tidak sama sekali. Kami menjaga kemurnian cairan dengan teknik pemindahan steril langsung dari botol utama tanpa campuran air maupun alkohol pelarut." },
    { id: 2, q: "Bagaimana dengan ketahanan daya sebar parfum?", a: "Daya tahan dan proyeksi aroma 100% identik dengan botol bawaan aslinya, umumnya mampu bertahan antara 6 hingga 9 jam tergantung jenis varian." },
    { id: 3, q: "⚠️ Jaminan Pengiriman & Garansi Ganti Baru", a: "Kami berkomitmen memberikan keamanan penuh. Apabila produk botol kaca pecah atau bocor selama proses pengiriman kurir, kami berikan garansi ganti baru gratis. Syaratnya cukup lampirkan video unboxing paket tanpa jeda." }
  ]
};

export default function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState("00:00:00");
  
  // Admin States
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  // Editor States for Confirmation
  const [isEditing, setIsEditing] = useState(false);
  const [draftData, setDraftData] = useState<any>(null);

  const [siteData, setSiteData] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("decant_site_data_v5");
      return saved ? JSON.parse(saved) : defaultSiteData;
    }
    return defaultSiteData;
  });

  // LOGIKA COUNTDOWN TIMER YANG RISET TIAP JAM 12 MALAM
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const nextMidnight = new Date();
      nextMidnight.setHours(24, 0, 0, 0); // Riset tepat jam 00:00:00 malam
      
      const diff = nextMidnight.getTime() - now.getTime();
      
      if (diff <= 0) {
        return "00:00:00";
      }

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const format = (num: number) => num.toString().padStart(2, "0");
      return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
    };

    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput === siteData.credentials.username && passwordInput === siteData.credentials.password) {
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setUsernameInput("");
      setPasswordInput("");
      setLoginError("");
    } else {
      setLoginError("Kredensial tidak cocok. Silakan coba lagi.");
    }
  };

  const handleUpdateCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSettingsModal(false);
    alert("Kredensial berhasil diperbarui!");
  };

  const enterEditMode = () => {
    setDraftData(JSON.parse(JSON.stringify(siteData)));
    setIsEditing(true);
  };

  const saveChanges = () => {
    setSiteData(draftData);
    localStorage.setItem("decant_site_data_v5", JSON.stringify(draftData));
    setIsEditing(false);
  };

  const cancelChanges = () => {
    setDraftData(null);
    setIsEditing(false);
  };

  const updateDraftField = (field: string, value: string) => {
    setDraftData((prev: any) => ({ ...prev, [field]: value }));
  };

  const updateDraftArray = (arrayName: string, id: number, field: string, value: string) => {
    setDraftData((prev: any) => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item: any) => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const displayData = isEditing ? draftData : siteData;

  return (
    <div className="min-h-screen relative bg-background text-foreground overflow-x-hidden selection:bg-primary/20">
      
      {/* BANNER PROMO (MARQUEE BERJALAN + COUNTDOWN TIMER DINAMIS) */}
      {displayData.promoText && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-[#8B1E2F] text-white text-xs sm:text-sm font-semibold py-2 text-center tracking-wide shadow-md font-sans px-4 overflow-hidden h-[36px] flex items-center">
          {isEditing ? (
            <div className="w-full max-w-4xl mx-auto flex items-center gap-2">
              <Pencil size={14} className="opacity-70 flex-shrink-0" />
              <input 
                value={displayData.promoText}
                onChange={(e) => updateDraftField('promoText', e.target.value)}
                className="w-full bg-transparent border-b border-white/30 outline-none text-center focus:border-white transition-colors px-2 py-1"
              />
            </div>
          ) : (
            <div className="whitespace-nowrap animate-[marquee_25s_linear_infinite] inline-block w-full">
               <span className="mx-6 inline-flex items-center gap-2.5">
                 {displayData.promoText} <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-yellow-300 font-mono font-bold tracking-normal shadow-inner">⏳ Sisa Waktu Promo: {timeLeft}</span>
               </span>
               <span className="mx-6 inline-flex items-center gap-2.5">
                 {displayData.promoText} <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-yellow-300 font-mono font-bold tracking-normal shadow-inner">⏳ Sisa Waktu Promo: {timeLeft}</span>
               </span>
               <span className="mx-6 inline-flex items-center gap-2.5">
                 {displayData.promoText} <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-yellow-300 font-mono font-bold tracking-normal shadow-inner">⏳ Sisa Waktu Promo: {timeLeft}</span>
               </span>
            </div>
          )}
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}} />

      {/* MODAL PENGATURAN AKUN */}
      <AnimatePresence>
        {showSettingsModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full relative">
              <button onClick={() => setShowSettingsModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"><X size={20} /></button>
              <h3 className="text-xl font-bold text-gray-800 mb-2 font-serif flex items-center gap-2"><Settings size={20} className="text-primary"/> Pengaturan Akun</h3>
              <p className="text-xs text-gray-500 mb-6">Ubah username dan password admin Anda.</p>
              <form onSubmit={handleUpdateCredentials} className="space-y-4 font-sans">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Username Baru</label>
                  <input type="text" value={siteData.credentials.username} onChange={(e) => setSiteData({ ...siteData, credentials: { ...siteData.credentials, username: e.target.value } })} className="w-full mt-1 p-3 border border-gray-200 rounded-xl focus:ring-1 focus:ring-primary outline-none text-gray-800" required />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Password Baru</label>
                  <input type="text" value={siteData.credentials.password} onChange={(e) => setSiteData({ ...siteData, credentials: { ...siteData.credentials, password: e.target.value } })} className="w-full mt-1 p-3 border border-gray-200 rounded-xl focus:ring-1 focus:ring-primary outline-none text-gray-800" required />
                </div>
                <button type="submit" className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors">Simpan Perubahan</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL LOGIN ADMIN */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-8 max-w-sm w-full relative border border-white/20">
              <button onClick={() => setShowLoginModal(false)} className="absolute top-5 right-5 text-gray-500 hover:text-gray-900 transition-colors bg-gray-100 rounded-full p-1"><X size={20} /></button>
              <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg"><ShieldCheck size={32} /></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1 font-sans tracking-tight">Portal Admin</h3>
              <p className="text-sm text-gray-500 mb-8 font-medium">Verifikasi identitas Anda untuk mengedit situs.</p>
              <form onSubmit={handleLogin} className="space-y-4 font-sans">
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Username" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} className="w-full py-3.5 pl-12 pr-4 border-none bg-gray-100 rounded-xl focus:ring-2 focus:ring-gray-900 outline-none transition-all text-gray-800 font-medium" />
                </div>
                <div className="relative">
                  <KeyRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="password" placeholder="Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full py-3.5 pl-12 pr-4 border-none bg-gray-100 rounded-xl focus:ring-2 focus:ring-gray-900 outline-none transition-all text-gray-800 font-medium" />
                </div>
                {loginError && <p className="text-red-500 text-xs font-semibold pl-1 animate-pulse">{loginError}</p>}
                <button type="submit" className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors shadow-md mt-4 flex items-center justify-center gap-2"><ShieldCheck size={18} /> Otorisasi Akses</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* HEADER & NAVIGASI (LAYOUT 3 KOLOM AGAR MENU PRESI DI TENGAH) */}
      <header className={`fixed ${displayData.promoText ? 'top-[36px]' : 'top-0'} left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border py-3 shadow-sm" : "bg-transparent py-5"}`}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Kiri: Logo */}
          <div className="flex-1 flex items-center justify-start">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollTo("home")}>
              <img src={image_logo_2} alt="Logo" className="h-10 w-auto object-contain rounded-md shadow-sm" />
            </div>
          </div>

          {/* Tengah: Navigasi Menu */}
          <nav className="hidden md:flex flex-1 items-center justify-center space-x-6 lg:space-x-8">
            <button onClick={() => scrollTo("home")} className="text-sm font-medium hover:text-primary transition-colors">Home</button>
            <button onClick={() => scrollTo("keunggulan")} className="text-sm font-medium hover:text-primary transition-colors">Keunggulan</button>
            <button onClick={() => scrollTo("gallery")} className="text-sm font-medium hover:text-primary transition-colors">Gallery</button>
            <button onClick={() => scrollTo("testimoni")} className="text-sm font-medium hover:text-primary transition-colors">Testimoni</button>
            <button onClick={() => scrollTo("faq")} className="text-sm font-medium hover:text-primary transition-colors">FAQ</button>
          </nav>
            
          {/* Kanan: Tombol Contact + Admin Portal */}
          <div className="flex-1 flex items-center justify-end gap-3">
            {/* Tombol Contact Yang Dikembalikan */}
            <div className="hidden md:block">
              <a
                href="https://ig.me/m/decant.ajah"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-full hover:bg-[#7a1c2a] transition-all shadow-sm block text-center"
              >
                Contact
              </a>
            </div>

            {/* Panel Kontrol Admin */}
            <div className="flex items-center gap-2">
              {!isLoggedIn ? (
                <button onClick={() => setShowLoginModal(true)} className="flex items-center gap-1.5 px-3.5 py-2 bg-transparent text-foreground rounded-full hover:bg-muted transition-all text-xs font-semibold border border-border shadow-sm">
                  <User size={14} /> Admin
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-muted/60 p-1 rounded-full border border-border">
                  <button onClick={() => setShowSettingsModal(true)} className="p-1.5 text-primary hover:bg-primary/10 rounded-full transition-colors" title="Pengaturan Akun">
                    <Settings size={16} />
                  </button>
                  
                  {isEditing ? (
                    <div className="flex items-center gap-1">
                      <button onClick={saveChanges} className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all text-xs font-bold shadow-sm">
                        <Check size={12} /> Simpan
                      </button>
                      <button onClick={cancelChanges} className="flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-all text-xs font-bold shadow-sm">
                        <Ban size={12} /> Batal
                      </button>
                    </div>
                  ) : (
                    <button onClick={enterEditMode} className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold hover:bg-primary/20 transition-all">
                      <Pencil size={12}/> Edit
                    </button>
                  )}

                  <button onClick={() => { setIsLoggedIn(false); setIsEditing(false); }} className="flex items-center gap-1 p-1.5 text-red-500 hover:bg-red-50 rounded-full transition-colors" title="Keluar">
                    <LogOut size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <button className="md:hidden p-2 text-foreground relative z-[60]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Fix */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg py-4 px-6 flex flex-col space-y-4 md:hidden z-50">
              <button onClick={() => scrollTo("home")} className="text-left py-2 font-medium hover:text-primary">Home</button>
              <button onClick={() => scrollTo("keunggulan")} className="text-left py-2 font-medium hover:text-primary">Keunggulan</button>
              <button onClick={() => scrollTo("gallery")} className="text-left py-2 font-medium hover:text-primary">Gallery</button>
              <button onClick={() => scrollTo("testimoni")} className="text-left py-2 font-medium hover:text-primary">Testimoni</button>
              <button onClick={() => scrollTo("faq")} className="text-left py-2 font-medium hover:text-primary">FAQ</button>
              
              <div className="border-t border-border pt-4 flex flex-col space-y-3">
                {!isLoggedIn ? (
                  <button onClick={() => { setShowLoginModal(true); setMobileMenuOpen(false); }} className="text-left py-2 font-bold text-gray-500 hover:text-primary flex items-center gap-2"><User size={16} /> Admin Login</button>
                ) : (
                  <>
                    <button onClick={() => { setShowSettingsModal(true); setMobileMenuOpen(false); }} className="text-left py-2 font-medium text-primary flex items-center gap-2"><Settings size={16}/> Pengaturan Akun</button>
                    {isEditing ? (
                       <button onClick={saveChanges} className="text-left py-2 font-bold text-green-500 flex items-center gap-2"><Check size={16}/> Simpan Perubahan</button>
                    ) : (
                       <button onClick={enterEditMode} className="text-left py-2 font-bold text-primary flex items-center gap-2"><Pencil size={16}/> Masuk Mode Edit</button>
                    )}
                    <button onClick={() => { setIsLoggedIn(false); setIsEditing(false); setMobileMenuOpen(false); }} className="text-left py-2 font-bold text-red-500 flex items-center gap-2"><LogOut size={16}/> Keluar Admin</button>
                  </>
                )}
                <a href="https://ig.me/m/decant.ajah" target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-primary text-primary-foreground text-sm rounded-md block text-center font-sans font-semibold">
                  Contact
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-muted/30">
        <div className="absolute inset-0 w-full h-full z-0">
          <AnimatePresence mode="popLayout">
            <motion.img key={currentImageIndex} src={carouselImages[currentImageIndex]} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, ease: "easeInOut" }} className="absolute inset-0 w-full h-full object-cover object-center" alt="Premium Perfume" />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/60"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center mt-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="max-w-4xl backdrop-blur-[2px] bg-background/40 p-8 md:p-12 rounded-3xl border border-white/20 shadow-2xl w-full relative">
            <div className="mb-6 relative group w-full">
              {isEditing && <Pencil size={18} className="absolute -top-4 right-0 text-primary opacity-50" />}
              {isEditing ? (
                <textarea value={displayData.heroHeadline} onChange={(e) => updateDraftField('heroHeadline', e.target.value)} className="w-full bg-transparent border border-dashed border-gray-400 hover:border-primary focus:border-primary outline-none text-center resize-none font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-tight drop-shadow-sm rounded-lg p-2" rows={2} />
              ) : (
                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-tight drop-shadow-sm whitespace-pre-line">{displayData.heroHeadline}</h1>
              )}
            </div>

            <div className="mb-10 max-w-3xl mx-auto relative group">
              {isEditing && <Pencil size={16} className="absolute -top-2 right-0 text-primary opacity-50" />}
              {isEditing ? (
                <textarea value={displayData.heroSubtitle} onChange={(e) => updateDraftField('heroSubtitle', e.target.value)} className="w-full bg-transparent border border-dashed border-gray-400 hover:border-primary focus:border-primary outline-none text-center resize-none text-lg md:text-xl text-foreground/90 font-medium leading-relaxed rounded-lg p-2" rows={3} />
              ) : (
                <p className="text-lg md:text-xl text-foreground/90 font-medium leading-relaxed whitespace-pre-line">{displayData.heroSubtitle}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => scrollTo("gallery")} className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold shadow-[0_4px_20px_rgba(140,33,49,0.3)] hover:bg-[#7a1c2a] transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                Daftar Menu (Katalog) <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* USP Section */}
      <section id="keunggulan" className="py-24 bg-accent/30 border-b border-border/50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-secondary font-semibold tracking-wider uppercase text-sm mb-2 block">Mengapa Memilih Kami?</span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">Keunggulan Bisnis</h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 font-sans">
            {displayData.usps.map((usp: any, index: number) => (
              <motion.div key={usp.id} whileHover={{ y: -5 }} className="bg-card p-8 rounded-2xl border border-secondary/20 shadow-sm text-center relative group">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  {index === 0 && <Star size={24} fill="currentColor" />}
                  {index === 1 && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>}
                  {index === 2 && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path></svg>}
                  {index === 3 && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>}
                </div>
                {isEditing && <Pencil size={14} className="absolute top-4 right-4 text-primary opacity-30" />}
                {isEditing ? (
                  <>
                    <input value={usp.title} onChange={(e) => updateDraftArray('usps', usp.id, 'title', e.target.value)} className="w-full text-center bg-transparent font-semibold text-lg border-b border-dashed border-gray-400 focus:border-primary outline-none mb-3 py-1 text-foreground" />
                    <textarea value={usp.desc} onChange={(e) => updateDraftArray('usps', usp.id, 'desc', e.target.value)} className="w-full text-center bg-transparent text-sm text-muted-foreground border border-dashed border-gray-400 focus:border-primary outline-none resize-none h-20 p-1" />
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-foreground mb-3">{usp.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{usp.desc}</p>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-secondary font-semibold tracking-wider uppercase text-sm mb-2 block">Our Collection</span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground">Our Gallery</h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {displayData.products.map((product: any, index: number) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: index * 0.2 }} className="group relative bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden bg-muted/30 p-6 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <img src={product.id === 1 ? imgBlooming : product.id === 2 ? imgRomantic : imgFerry} alt={product.name} className="w-full h-full object-contain filter drop-shadow-lg group-hover:scale-110 transition-transform duration-700 ease-out" />
                </div>
                <div className="p-8 flex flex-col flex-grow relative">
                  <div className="relative group w-full mb-1 mt-2">
                    {isEditing ? (
                      <>
                        <Pencil size={14} className="absolute -top-4 right-0 text-primary opacity-50" />
                        <input value={product.name} onChange={(e) => updateDraftArray('products', product.id, 'name', e.target.value)} className="w-full bg-transparent border-b border-dashed border-gray-400 focus:border-primary outline-none text-center font-serif text-2xl font-semibold text-primary py-1" />
                      </>
                    ) : (
                      <h3 className="font-serif text-2xl font-semibold group-hover:text-primary transition-colors text-center">{product.name}</h3>
                    )}
                  </div>
                  <div className="flex flex-col items-center justify-center mb-4 relative group w-full">
                    <span className="text-xs text-muted-foreground line-through decoration-[#8B1E2F]/60 decoration-2 font-medium mb-0.5">Rp 75.000</span>
                    {isEditing ? (
                      <div className="flex items-center justify-center w-full relative">
                        <Pencil size={14} className="absolute -top-2 right-0 text-primary opacity-50" />
                        <input value={product.price} onChange={(e) => updateDraftArray('products', product.id, 'price', e.target.value)} className="w-1/2 bg-transparent border-b border-dashed border-gray-400 focus:border-primary outline-none text-center text-[#8B1E2F] font-bold text-xl py-1" />
                        <span className="text-xs text-muted-foreground font-normal ml-1">/ 5ml</span>
                      </div>
                    ) : (
                      <p className="text-[#8B1E2F] font-bold text-xl">{product.price} <span className="text-xs text-muted-foreground font-normal">/ 5ml</span></p>
                    )}
                  </div>
                  <div className="relative group w-full flex-grow mb-8">
                    {isEditing && <Pencil size={14} className="absolute -top-4 right-0 text-primary opacity-50" />}
                    {isEditing ? (
                      <textarea value={product.description} onChange={(e) => updateDraftArray('products', product.id, 'description', e.target.value)} className="w-full h-full min-h-[100px] bg-transparent border border-dashed border-gray-400 focus:border-primary outline-none text-center text-muted-foreground text-sm leading-relaxed rounded-lg p-2 resize-none" />
                    ) : (
                      <p className="text-muted-foreground text-sm leading-relaxed text-center">{product.description}</p>
                    )}
                  </div>
                  <a href="https://ig.me/m/decant.ajah" target="_blank" rel="noopener noreferrer" className="w-full py-3.5 px-6 rounded-xl bg-accent text-foreground font-semibold border border-transparent group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_20px_rgba(140,33,49,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 mt-auto">
                    Beli Sekarang <ArrowRight size={18} className="group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimoni" className="py-24 bg-accent/50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-secondary font-semibold tracking-wider uppercase text-sm mb-2 block">Reviews</span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground">Apa Kata Mereka?</h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayData.testimonials.map((testi: any, index: number) => (
              <motion.div key={testi.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.15 }} className="bg-card p-8 rounded-2xl border border-border shadow-sm relative group flex flex-col">
                {isEditing && <Pencil size={14} className="absolute top-4 right-4 text-primary opacity-30" />}
                <div className="flex gap-1 mb-6 text-secondary">
                  {[...Array(5)].map((_, i) => (<Star key={i} size={18} fill="currentColor" stroke="none" />))}
                </div>
                {isEditing ? (
                  <>
                    <textarea value={testi.text} onChange={(e) => updateDraftArray('testimonials', testi.id, 'text', e.target.value)} className="w-full text-foreground/80 italic text-sm mb-8 bg-transparent border border-dashed border-gray-400 focus:border-primary outline-none h-24 p-1 resize-none flex-grow" />
                    <div className="flex items-center gap-4 mt-auto">
                      <img src={testi.avatar} alt="avatar" className="w-12 h-12 rounded-full object-cover border-2 border-accent" />
                      <div className="w-full">
                        <input value={testi.name} onChange={(e) => updateDraftArray('testimonials', testi.id, 'name', e.target.value)} className="font-semibold text-foreground w-full bg-transparent border-b border-dashed border-gray-400 focus:border-primary outline-none mb-1 py-0.5" />
                        <input value={testi.role} onChange={(e) => updateDraftArray('testimonials', testi.id, 'role', e.target.value)} className="text-xs text-muted-foreground w-full bg-transparent border-b border-dashed border-gray-400 focus:border-primary outline-none py-0.5" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-foreground/80 leading-relaxed mb-8 italic flex-grow">"{testi.text}"</p>
                    <div className="flex items-center gap-4 mt-auto">
                      <img src={testi.avatar} alt={testi.name} className="w-12 h-12 rounded-full object-cover border-2 border-accent" />
                      <div>
                        <h4 className="font-semibold text-foreground">{testi.name}</h4>
                        <p className="text-xs text-muted-foreground">{testi.role}</p>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-background border-t border-border/50">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-secondary font-semibold tracking-wider uppercase text-sm mb-2 block">Pertanyaan Umum</span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">Frequently Asked Questions (FAQ)</h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="space-y-6 font-sans w-full">
            {displayData.faqs.map((faq: any, index: number) => (
              <motion.div key={faq.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className={`bg-card p-6 rounded-2xl border shadow-sm relative group w-full ${index === 2 ? 'border-l-4 border-l-primary' : 'border-border'}`}>
                {isEditing && <Pencil size={14} className="absolute top-4 right-4 text-primary opacity-30" />}
                {isEditing ? (
                  <div className="w-full flex flex-col">
                    <input value={faq.q} onChange={(e) => updateDraftArray('faqs', faq.id, 'q', e.target.value)} className="w-full font-semibold text-foreground bg-transparent border-b border-dashed border-gray-400 focus:border-primary outline-none mb-3 py-1" />
                    <textarea value={faq.a} onChange={(e) => updateDraftArray('faqs', faq.id, 'a', e.target.value)} className="w-full text-sm text-muted-foreground bg-transparent border border-dashed border-gray-400 focus:border-primary outline-none h-20 p-2 resize-none" />
                  </div>
                ) : (
                  <>
                    <h4 className="font-semibold text-foreground mb-2">{faq.q}</h4>
                    <p className="text-muted-foreground text-sm">{faq.a}</p>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-border/50 text-center">
        <div className="container mx-auto px-6 max-w-md mb-8 text-sm text-muted-foreground">
          <p className="font-semibold mb-3 uppercase tracking-wider text-xs text-foreground/70">Pengembang Decant Ajah</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-left border border-border rounded-2xl p-4 bg-card/50 shadow-sm font-sans text-xs md:text-sm">
            <span className="font-medium">Muhammad Evan Alviansyah</span>
            <span className="font-mono text-right">23.11.5844</span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm font-medium">Decant Ajah © 2026</p>
      </footer>

      {/* Floating CTA */}
      <motion.a href="https://ig.me/m/decant.ajah" target="_blank" rel="noopener noreferrer" initial={{ y: 100, opacity: 0, x: "-50%" }} animate={{ y: [0, -10, 0], opacity: 1, x: "-50%" }} transition={{ y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.5, delay: 1 } }} className="fixed bottom-8 left-1/2 z-50 px-8 py-4 bg-secondary text-secondary-foreground font-bold rounded-full shadow-[0_8px_30px_rgba(212,175,55,0.5)] flex items-center gap-3 hover:bg-[#c29f32] transition-colors font-sans text-base">
        <div className="absolute inset-0 rounded-full border-2 border-secondary animate-ping opacity-30" style={{ animationDuration: "3s" }}></div>
        <span className="relative z-10">Beli Sekarang</span>
        <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
      </motion.a>
    </div>
  );
}