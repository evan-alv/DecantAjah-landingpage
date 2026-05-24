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
} from "lucide-react";

const carouselImages = [
  imgCarousel,
  imgBlooming,
  imgRomantic,
  imgFerry,
];

const products = [
  {
    id: 1,
    name: "Blooming Banquet",
    image: imgBlooming,
    price: "Rp 25.000",
    description:
      "Perpaduan aroma floral mewah dan elegan. Diracik murni tanpa alkohol tambahan, sangat cocok untuk menghadiri acara formal atau pemaikaian harian.",
  },
  {
    id: 2,
    name: "Romantic Wish",
    image: imgRomantic,
    price: "Rp 25.000",
    description:
      "Kombinasi aroma buah manis yang segar dan ceria. Memberikan kesan romantis yang memikat dan membangkitkan rasa percaya diri sepanjang hari.",
  },
  {
    id: 3,
    name: "Ferry Light Ice",
    image: imgFerry,
    price: "Rp 25.000",
    description:
      "Sensasi aroma cool, fresh, dan aquatic yang maskulin sekaligus unisex. Memberikan kesegaran maksimal untuk aktivitas luar ruangan.",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Go Youn Jung",
    role: "Perfume Enthusiast",
    text: "Adminnya ramah pas konsultasi, direkomendasiin Romantic Wish dan beneran cocok banget sama selera aku.",
    avatar:
      "https://asset.tabloidbintang.com/img/1747632657_602bc21057868d86e38b.jpeg",
  },
  {
    id: 2,
    name: "Rose",
    role: "Verified Buyer",
    text: "Packaging rapi banget, botol decant-nya tebal dan spray-nya menyebar halus. Wanginya tahan lama seharian di kampus!",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/a/a2/Blackpink_Ros%C3%A9_Rimowa_2.jpg",
  },
  {
    id: 3,
    name: "Reemar",
    role: "Loyal Customer",
    text: "Harga sangat bersahabat buat kantong mahasiswa, tapi kualitas pelayanannya kayak beli di toko mahal. Mantap Decant Ajah!",
    avatar:
      "https://i.pinimg.com/originals/e9/60/18/e96018d01ebe832522166c9f74984a88.jpg",
  },
];

export default function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prev) => (prev + 1) % carouselImages.length,
      );
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

  return (
    <div className="min-h-screen relative bg-background text-foreground overflow-x-hidden selection:bg-primary/20">
      {/* BANNER PROMO GRATIS ONGKIR MENGAMBANG DI ATAS */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-[#8B1E2F] text-white text-xs sm:text-sm font-semibold py-2 text-center tracking-wide shadow-md">
        ✨ PROMO SPESIAL: Gratis Ongkir Seluruh Indonesia Khusus
        Transaksi Hari Ini! ✨
      </div>

      {/* Sticky Navigation (Diturunin dikit biar gak ketimpa banner) */}
      <header
        className={`fixed top-[36px] left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border py-3 shadow-sm"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => scrollTo("home")}
          >
            <img
              src={image_logo_2}
              alt="Decant Ajah"
              className="h-10 w-auto object-contain rounded-md shadow-sm"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollTo("home")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo("gallery")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollTo("testimoni")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Testimoni
            </button>
            <button
              onClick={() => scrollTo("faq")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              FAQ
            </button>
          </nav>

          <div className="hidden md:block">
            <a
              href="https://ig.me/m/decant.ajah"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-primary text-primary-foreground text-sm rounded-full block text-center"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg py-4 px-6 flex flex-col space-y-4 md:hidden"
            >
              <button
                onClick={() => scrollTo("home")}
                className="text-left py-2 font-medium hover:text-primary"
              >
                Home
              </button>
              <button
                onClick={() => scrollTo("gallery")}
                className="text-left py-2 font-medium hover:text-primary"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollTo("testimoni")}
                className="text-left py-2 font-medium hover:text-primary"
              >
                Testimoni
              </button>
              <button
                onClick={() => scrollTo("faq")}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                FAQ
              </button>
              <a
                href="https://ig.me/m/decant.ajah"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-2 py-3 bg-primary text-primary-foreground text-sm rounded-md block text-center"
              >
                Contact
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-muted/30"
      >
        <div className="absolute inset-0 w-full h-full z-0">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentImageIndex}
              src={carouselImages[currentImageIndex]}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover object-center"
              alt="Premium Perfume"
            />
          </AnimatePresence>
          {/* Subtle overlay to ensure text readability without obscuring image focus */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/60"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(252,251,248,0.5)_0%,transparent_100%)]"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl backdrop-blur-[2px] bg-background/40 p-8 md:p-12 rounded-3xl border border-white/20 shadow-2xl"
          >
            {/* Subtle shiny overlay on the card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-6 leading-tight drop-shadow-sm">
              Only Serve{" "}
              <span className="text-primary italic relative inline-block">
                Our Best
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-secondary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8 }}
                ></motion.span>
              </span>{" "}
              For You
            </h1>
            <p className="text-lg md:text-xl text-foreground/90 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
              Koleksi decant parfum original pilihan dengan
              racikan sempurna. Praktis, elegan, dan terjangkau.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => scrollTo("gallery")}
                className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold shadow-[0_4px_20px_rgba(140,33,49,0.3)] hover:bg-[#7a1c2a] hover:shadow-[0_8px_30px_rgba(140,33,49,0.5)] transition-all hover:-translate-y-1 flex items-center justify-center gap-2 group/btn"
              >
                Daftar Menu (Katalog)
                <ArrowRight
                  size={18}
                  className="group-hover/btn:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Unique Selling Proposition (USP) Section */}
      <section
        id="keunggulan"
        className="py-24 bg-accent/30 border-b border-border/50"
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-secondary font-semibold tracking-wider uppercase text-sm mb-2 block">
              Mengapa Memilih Kami?
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
              Keunggulan Decant Ajah
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 font-sans">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-card p-8 rounded-2xl border border-secondary/20 shadow-sm text-center hover:shadow-[0_10px_40px_rgba(212,175,55,0.1)] transition-all"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                <Star size={24} fill="currentColor" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                100% Original
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Jaminan kualitas cairan murni diekstrak langsung
                dari botol resmi tanpa oplosan.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-card p-8 rounded-2xl border border-secondary/20 shadow-sm text-center hover:shadow-[0_10px_40px_rgba(212,175,55,0.1)] transition-all"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Higienis & Steril
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Proses pemindahan menggunakan syringe steril
                khusus demi menjaga keutuhan aroma parfum.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-card p-8 rounded-2xl border border-secondary/20 shadow-sm text-center hover:shadow-[0_10px_40px_rgba(212,175,55,0.1)] transition-all"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Botol Kaca Premium
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Menggunakan botol spray kaca tebal yang aman,
                elegan, serta sangat travel-friendly.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-card p-8 rounded-2xl border border-secondary/20 shadow-sm text-center hover:shadow-[0_10px_40px_rgba(212,175,55,0.1)] transition-all"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v20"></path>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Harga Bersahabat
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Nikmati kemewahan aroma brand dunia dengan
                penyesuaian budget kantong mahasiswa.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Product Gallery */}
      <section id="gallery" className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-secondary font-semibold tracking-wider uppercase text-sm mb-2 block">
              Our Collection
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground">
              Our Gallery
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                }}
                className="group relative bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-muted/30 p-6 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <img
                    src={
                      product.id === 1
                        ? imgBlooming
                        : product.id === 2
                          ? imgRomantic
                          : imgFerry
                    }
                    alt={product.name}
                    className="w-full h-full object-contain filter drop-shadow-lg group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-secondary rounded-b-full opacity-50 group-hover:w-24 group-hover:opacity-100 transition-all duration-500"></div>
                  <h3 className="font-serif text-2xl font-semibold mb-1 group-hover:text-primary transition-colors text-center mt-2">
                    {product.name}
                  </h3>

                  {/* HARGA CORET & HARGA DISKON */}
                  <div className="flex flex-col items-center justify-center mb-4">
                    <span className="text-xs text-muted-foreground line-through decoration-[#8B1E2F]/60 decoration-2 font-medium mb-0.5">
                      Rp 75.000
                    </span>
                    <p className="text-[#8B1E2F] font-bold text-xl">
                      {product.price}{" "}
                      <span className="text-xs text-muted-foreground font-normal">
                        / 5ml
                      </span>
                    </p>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow text-center">
                    {product.description}
                  </p>
                  <button className="w-full py-3.5 px-6 rounded-xl bg-accent text-foreground font-semibold border border-transparent group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_20px_rgba(140,33,49,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">
                      Beli Sekarang{" "}
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out"></div>
                  </button>
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
            <span className="text-secondary font-semibold tracking-wider uppercase text-sm mb-2 block">
              Reviews
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground">
              Apa Kata Mereka?
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-1 mb-6 text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill="currentColor"
                      stroke="none"
                    />
                  ))}
                </div>
                <p className="text-foreground/80 leading-relaxed mb-8 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-accent"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="py-24 bg-background border-t border-border/50"
      >
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-secondary font-semibold tracking-wider uppercase text-sm mb-2 block">
              Pertanyaan Umum
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="space-y-6 font-sans">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:border-primary/30 transition-colors"
            >
              <h4 className="font-semibold text-foreground mb-2">
                Apakah kualitas aromanya berubah karena
                dipindahkan?
              </h4>
              <p className="text-muted-foreground text-sm">
                Tidak sama sekali. Kami menjaga kemurnian cairan
                dengan teknik pemindahan steril langsung dari
                botol utama tanpa campuran air maupun alkohol
                pelarut.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:border-primary/30 transition-colors"
            >
              <h4 className="font-semibold text-foreground mb-2">
                Bagaimana dengan ketahanan daya sebar parfum?
              </h4>
              <p className="text-muted-foreground text-sm">
                Daya tahan dan proyeksi aroma 100% identik
                dengan botol bawaan aslinya, umumnya mampu
                bertahan antara 6 hingga 9 jam tergantung jenis
                varian.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card p-6 rounded-2xl border border-border shadow-sm border-l-4 border-l-primary hover:border-primary/30 transition-colors"
            >
              <h4 className="font-semibold text-foreground mb-2">
                ⚠️ Jaminan Pengiriman & Garansi Ganti Baru
              </h4>
              <p className="text-muted-foreground text-sm">
                Kami berkomitmen memberikan keamanan penuh.
                Apabila produk botol kaca pecah atau bocor
                selama proses pengiriman kurir, kami berikan
                garansi ganti baru gratis. Syaratnya cukup
                lampirkan video unboxing paket tanpa jeda.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Connections */}
      <section className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-12">
            Connect With Us
          </h2>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 max-w-2xl mx-auto">
            <a
              href="https://instagram.com/decant.ajah"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-1/2 flex items-center justify-center gap-4 bg-card hover:bg-muted p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                <Instagram size={24} />
              </div>
              <div className="text-left">
                <span className="block text-sm text-muted-foreground font-medium mb-1">
                  Follow Instagram
                </span>
                <span className="block font-semibold text-foreground group-hover:text-primary transition-colors">
                  @decant.ajah
                </span>
              </div>
            </a>

            {/* Adding a placeholder for another social/contact as per "two large... card buttons" request, though only IG was specified */}
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-1/2 flex items-center justify-center gap-4 bg-card hover:bg-muted p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="text-left">
                <span className="block text-sm text-muted-foreground font-medium mb-1">
                  Chat With Us
                </span>
                <span className="block font-semibold text-foreground group-hover:text-primary transition-colors">
                  WhatsApp
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-border/50 text-center">
        <div className="container mx-auto px-6 max-w-md mb-8 text-sm text-muted-foreground">
          <p className="font-semibold mb-3 uppercase tracking-wider text-xs text-foreground/70">
            Pengembang Decant Ajah
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-left border border-border rounded-2xl p-4 bg-card/50 shadow-sm font-sans text-xs md:text-sm">
            <span className="font-medium">
              Muhammad Evan Alviansyah
            </span>
            <span className="font-mono text-right">
              23.11.5844
            </span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm font-medium">
          Decant Ajah © 2026
        </p>
      </footer>

      {/* Permanent Floating CTA */}
      <motion.button
        onClick={() => scrollTo("gallery")}
        initial={{ y: 100, opacity: 0, x: "-50%" }}
        animate={{
          y: [0, -10, 0],
          opacity: 1,
          x: "-50%",
        }}
        transition={{
          y: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
          opacity: {
            duration: 0.5,
            delay: 1,
          },
        }}
        className="fixed bottom-8 left-1/2 z-50 px-8 py-4 bg-secondary text-secondary-foreground font-bold rounded-full shadow-[0_8px_30px_rgba(212,175,55,0.5)] flex items-center gap-3 hover:bg-[#c29f32] transition-colors group"
      >
        <div
          className="absolute inset-0 rounded-full border-2 border-secondary animate-ping opacity-30"
          style={{ animationDuration: "3s" }}
        ></div>
        <span className="relative z-10">Beli Sekarang</span>
        <ArrowRight
          size={20}
          className="relative z-10 group-hover:translate-x-1 transition-transform"
        />
      </motion.button>
    </div>
  );
}