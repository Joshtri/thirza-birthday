"use client";

import { useState, useEffect, useRef } from "react";
import { Heart, Gift, MapPin, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ThirzaBirthdayPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [showSurprise, setShowSurprise] = useState(false);

  // Refs for GSAP animations
  const headerRef = useRef(null);
  const countdownRef = useRef(null);
  const bearCardRef = useRef(null);
  const dimsumCardRef = useRef(null);
  const locationCardRef = useRef(null);
  const wishesCardRef = useRef(null);
  const heartsRef = useRef(null);

  useEffect(() => {
    const targetDate = new Date("2025-06-06T00:00:00");

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Initial animations
    const tl = gsap.timeline();

    // Header animation
    tl.fromTo(
      headerRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "bounce.out" }
    );

    // Floating hearts animation
    gsap.to(".floating-heart", {
      y: -20,
      rotation: 360,
      duration: 3,
      repeat: -1,
      yoyo: true,
      stagger: 0.5,
      ease: "power2.inOut",
    });

    // Sparkle animation
    gsap.to(".sparkle", {
      scale: 1.2,
      rotation: 180,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    // Scroll triggered animations
    gsap.fromTo(
      countdownRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: countdownRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      bearCardRef.current,
      { opacity: 0, x: -100, rotation: -10 },
      {
        opacity: 1,
        x: 0,
        rotation: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: bearCardRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      dimsumCardRef.current,
      { opacity: 0, x: 100, rotation: 10 },
      {
        opacity: 1,
        x: 0,
        rotation: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: dimsumCardRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      locationCardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: locationCardRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      wishesCardRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: wishesCardRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleSurpriseClick = () => {
    setShowSurprise(!showSurprise);

    if (!showSurprise) {
      gsap.fromTo(
        ".surprise-card",
        { opacity: 0, scale: 0.8, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-x-hidden">
      {/* Floating Hearts Animation */}
      <div
        ref={heartsRef}
        className="fixed inset-0 pointer-events-none overflow-hidden"
      >
        {[...Array(8)].map((_, i) => (
          <Heart
            key={i}
            className="floating-heart absolute text-rose-300 opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            size={16 + Math.random() * 12}
          />
        ))}
      </div>

      {/* Header */}
      <header ref={headerRef} className="relative z-10 text-center py-12 px-4">
        <div className="inline-flex items-center gap-2 mb-4">
          <Sparkles className="sparkle text-amber-600" size={24} />
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-700 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
            Selamat Ulang Tahun Thirza!
          </h1>
          <Sparkles className="sparkle text-amber-600" size={24} />
        </div>
        <p className="text-lg md:text-xl text-amber-800 font-medium">
          Orang yang suka senyum yang suka beruang dan dimsum 🐻🥟
        </p>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 pb-12">
        {/* Birthday Countdown */}
        <Card
          ref={countdownRef}
          className="mb-8 bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Calendar className="text-amber-600" size={24} />
              <h2 className="text-2xl font-bold text-amber-800">
                Hitung Mundur Hari Istimewamu
              </h2>
            </div>
            <div className="text-3xl font-bold text-amber-700 mb-4">
              6 Juni 2025
            </div>
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
              {Object.entries(timeLeft).map(([unit, value], index) => (
                <div
                  key={unit}
                  className="bg-amber-100 rounded-lg p-4 hover:bg-amber-200 transition-colors duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-2xl font-bold text-amber-800">
                    {value}
                  </div>
                  <div className="text-sm text-amber-600 capitalize">
                    {unit === "days"
                      ? "Hari"
                      : unit === "hours"
                      ? "Jam"
                      : unit === "minutes"
                      ? "Menit"
                      : "Detik"}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bear & Dimsum Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card
            ref={bearCardRef}
            className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4 hover:scale-110 transition-transform duration-300 cursor-pointer">
                🐻
              </div>
              <h3 className="text-2xl font-bold text-amber-800 mb-4">
                Pelukan Beruang Untukmu!
              </h3>
              <p className="text-amber-700 leading-relaxed">
                Seperti beruang favoritmu, kamu membawa kehangatan dan
                kenyamanan untuk semua orang di sekitarmu. Jiwa lembutmu dan
                hati yang peduli membuatmu sangat menggemaskan! 🤗
              </p>
            </CardContent>
          </Card>

          <Card
            ref={dimsumCardRef}
            className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4 hover:scale-110 transition-transform duration-300 cursor-pointer">
                🥟
              </div>
              <h3 className="text-2xl font-bold text-amber-800 mb-4">
                Kelezatan Dimsum
              </h3>
              <p className="text-amber-700 leading-relaxed">
                Kecintaanmu pada dimsum menunjukkan apresiasi terhadap
                kesenangan kecil dalam hidup. Semoga ulang tahunmu dipenuhi
                kebahagiaan seperti pesta dimsum favoritmu! 🍽️
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Location & Gift Section */}
        <Card
          ref={locationCardRef}
          className="mb-8 bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <MapPin className="text-amber-600" size={24} />
                  <h3 className="text-2xl font-bold text-amber-800">
                    Jakarta Utara
                  </h3>
                </div>
                <p className="text-amber-700">
                  Meskipun kamu di Jakarta Utara, pikiran dan doa terbaikku
                  bersamamu! Jarak tidak berarti apa-apa ketika seseorang
                  berarti segalanya.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Gift className="text-amber-600" size={24} />
                  <h3 className="text-2xl font-bold text-amber-800">
                    Hadiah Spesial
                  </h3>
                </div>
                <p className="text-amber-700 mb-4">
                  Aku punya sesuatu yang spesial menunggumu! Tidak sabar melihat
                  senyummu saat menerimanya. 🎁
                </p>
                <Button
                  onClick={handleSurpriseClick}
                  className="bg-amber-600 hover:bg-amber-700 text-white hover:scale-105 transition-all duration-300"
                >
                  {showSurprise ? "Sembunyikan Kejutan" : "Buka Kejutan"} ✨
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Surprise Message */}
        {showSurprise && (
          <Card className="surprise-card mb-8 bg-gradient-to-r from-rose-100 to-pink-100 border-rose-200 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-4">💕</div>
              <h3 className="text-2xl font-bold text-rose-800 mb-4">
                Pesan dari Hati
              </h3>
              <p className="text-rose-700 text-lg leading-relaxed max-w-2xl mx-auto">
                Thirza tersayang, kamu bukan hanya sahabat terdekatku, tapi
                seseorang yang sangat istimewa bagiku. Kebaikanmu, tawamu, dan
                cara kamu menerangi setiap ruangan yang kamu masuki membuat
                duniaku lebih cerah. Di hari ulang tahunmu, aku ingin kamu tahu
                betapa berartinya kamu bagiku. Ini untuk tahun lain kehadiranmu
                yang luar biasa di dunia ini! 🌟
              </p>
            </CardContent>
          </Card>
        )}

        {/* Birthday Wishes */}
        <Card
          ref={wishesCardRef}
          className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <CardContent className="p-8 text-center">
            <h3 className="text-3xl font-bold text-amber-800 mb-6">
              Doa Ulang Tahun Untukmu
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl mb-2 hover:scale-110 transition-transform duration-300">
                  🌟
                </div>
                <p className="text-amber-700">
                  Semoga semua impianmu menjadi kenyataan tahun ini!
                </p>
              </div>
              <div className="p-4 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl mb-2 hover:scale-110 transition-transform duration-300">
                  🎂
                </div>
                <p className="text-amber-700">
                  Semoga ulang tahunmu menjadi yang termanis!
                </p>
              </div>
              <div className="p-4 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl mb-2 hover:scale-110 transition-transform duration-300">
                  💖
                </div>
                <p className="text-amber-700">
                  Kamu pantas mendapat semua kebahagiaan di dunia!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 px-4">
        <p className="text-amber-600 font-medium">
          Dibuat dengan 💝 untuk orang paling luar biasa yang aku kenal
        </p>
      </footer>
    </div>
  );
}
