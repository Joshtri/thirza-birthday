"use client";

import { useState, useEffect, useRef } from "react";
import {
  Heart,
  Gift,
  MapPin,
  Calendar,
  Sparkles,
  Play,
  Pause,
  Volume2,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
} from "lucide-react";
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

  // Music player states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isLoading, setIsLoading] = useState(true);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  const playerRef = useRef(null);
  const intervalRef = useRef(null);

  // Refs for GSAP animations
  const headerRef = useRef(null);
  const countdownRef = useRef(null);
  const bearCardRef = useRef(null);
  const dimsumCardRef = useRef(null);
  const sushiCardRef = useRef(null);
  const cheeseCardRef = useRef(null);
  const saladCardRef = useRef(null);
  const locationCardRef = useRef(null);
  const wishesCardRef = useRef(null);
  const heartsRef = useRef(null);
  const musicPlayerRef = useRef(null);

  // YouTube Player Setup
  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("youtube-player", {
        height: "0",
        width: "0",
        videoId: "VuNIsY6JdUw", // You Belong With Me - Taylor Swift
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
        },
        events: {
          onReady: (event) => {
            setIsLoading(false);
            setDuration(event.target.getDuration());
            event.target.setVolume(volume);
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              startTimeUpdate();
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
              stopTimeUpdate();
            } else if (event.data === window.YT.PlayerState.ENDED) {
              setIsPlaying(false);
              stopTimeUpdate();
              if (isRepeat) {
                playerRef.current.seekTo(0);
                playerRef.current.playVideo();
              }
            }
          },
        },
      });
    };

    return () => {
      stopTimeUpdate();
    };
  }, []);

  const startTimeUpdate = () => {
    intervalRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 1000);
  };

  const stopTimeUpdate = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const togglePlay = () => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleSeek = (e) => {
    if (!playerRef.current) return;

    const newTime = (Number.parseFloat(e.target.value) / 100) * duration;
    playerRef.current.seekTo(newTime);
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    if (!playerRef.current) return;

    const newVolume = Number.parseFloat(e.target.value);
    playerRef.current.setVolume(newVolume);
    setVolume(newVolume);
  };

  const skipBackward = () => {
    if (!playerRef.current) return;
    const newTime = Math.max(0, currentTime - 10);
    playerRef.current.seekTo(newTime);
  };

  const skipForward = () => {
    if (!playerRef.current) return;
    const newTime = Math.min(duration, currentTime + 10);
    playerRef.current.seekTo(newTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

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

    // Music player animation
    gsap.fromTo(
      musicPlayerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: musicPlayerRef.current,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play none none reverse",
        },
      }
    );

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

    // Food cards animations with stagger
    const foodCards = [
      bearCardRef.current,
      dimsumCardRef.current,
      sushiCardRef.current,
      cheeseCardRef.current,
      saladCardRef.current,
    ];

    foodCards.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, rotation: index % 2 === 0 ? -5 : 5 },
          {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

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
    if (showSurprise) {
      // Close animation before hiding
      gsap
        .timeline()
        .to(".secret-message", { opacity: 0, y: 20, duration: 0.3 })
        .to(".gift-contents", { opacity: 0, y: 0, scale: 0.8, duration: 0.5 })
        .to(".mystery-sparkles", { opacity: 0, scale: 0.8, duration: 0.3 })
        .to(".gift-box-lid", {
          rotationX: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          onComplete: () => setShowSurprise(false),
        });
    } else {
      setShowSurprise(true);
    }
  };

  // Add this useEffect for surprise animations
  useEffect(() => {
    if (showSurprise) {
      // Ensure elements are rendered before animating
      const timer = setTimeout(() => {
        // Set initial states for animation elements
        gsap.set(".gift-box-lid", { rotationX: 0 });
        gsap.set(".gift-contents", { opacity: 0, y: 0, scale: 0.8 });
        gsap.set(".mystery-sparkles", { opacity: 0, scale: 0.8 });
        gsap.set(".secret-message", { opacity: 0, y: 20 });

        // Start the opening animation
        gsap
          .timeline()
          .to(".gift-box-lid", {
            rotationX: -180,
            transformOrigin: "bottom",
            duration: 1,
            ease: "back.out(1.7)",
          })
          .to(
            ".gift-contents",
            {
              opacity: 1,
              y: -20,
              scale: 1,
              duration: 0.8,
              ease: "bounce.out",
            },
            "-=0.5"
          )
          .to(
            ".mystery-sparkles",
            {
              opacity: 1,
              scale: 1.2,
              rotation: 360,
              duration: 2,
              stagger: 0.1,
              ease: "power2.out",
            },
            "-=0.8"
          )
          .to(
            ".secret-message",
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "back.out(1.7)",
            },
            "-=0.3"
          );
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [showSurprise]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-x-hidden">
      {/* Floating Hearts Animation */}
      <div
        ref={heartsRef}
        className="fixed inset-0 pointer-events-none overflow-hidden"
      >
        {[...Array(15)].map((_, i) => (
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

      {/* Enhanced Taylor Swift Music Player */}
      <div
        ref={musicPlayerRef}
        className="relative z-10 max-w-4xl mx-auto px-4 mb-8"
      >
        <Card className="bg-gradient-to-r from-purple-100 via-pink-100 to-rose-100 border-purple-200 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
          <CardContent className="p-6">
            {/* YouTube Player (Hidden) */}
            <div id="youtube-player" className="hidden"></div>

            {/* Album Art & Song Info */}
            <div className="flex items-center gap-6 mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                  <div className="text-3xl">🎵</div>
                </div>
                {isPlaying && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg blur opacity-75 animate-pulse"></div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-purple-800 mb-1">
                  You Belong With Me
                </h3>
                <p className="text-purple-600 text-lg">Taylor Swift</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full">
                    Country Pop
                  </span>
                  <span className="text-xs bg-pink-200 text-pink-800 px-2 py-1 rounded-full">
                    2008
                  </span>
                  <span className="text-xs bg-rose-200 text-rose-800 px-2 py-1 rounded-full">
                    Fearless
                  </span>
                </div>
              </div>
              {isLoading && (
                <div className="flex items-center gap-2 text-purple-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                  <span className="text-sm">Loading...</span>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2 mb-6">
              <input
                type="range"
                min="0"
                max="100"
                value={duration ? (currentTime / duration) * 100 : 0}
                onChange={handleSeek}
                disabled={isLoading}
                className="w-full h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${
                    duration ? (currentTime / duration) * 100 : 0
                  }%, #e9d5ff ${
                    duration ? (currentTime / duration) * 100 : 0
                  }%, #e9d5ff 100%)`,
                }}
              />
              <div className="flex justify-between text-sm text-purple-600">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full w-12 h-12 p-0 border-purple-300 hover:bg-purple-100 transition-all duration-200"
                onClick={() => setIsShuffle(!isShuffle)}
                disabled={isLoading}
              >
                <Shuffle
                  size={16}
                  className={`${
                    isShuffle ? "text-purple-800" : "text-purple-600"
                  }`}
                />
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="rounded-full w-12 h-12 p-0 border-purple-300 hover:bg-purple-100 transition-all duration-200"
                onClick={skipBackward}
                disabled={isLoading}
              >
                <SkipBack size={18} className="text-purple-600" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="rounded-full w-16 h-16 p-0 border-purple-300 hover:bg-purple-100 transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={togglePlay}
                disabled={isLoading}
              >
                {isPlaying ? (
                  <Pause size={24} className="text-purple-600" />
                ) : (
                  <Play size={24} className="text-purple-600 ml-1" />
                )}
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="rounded-full w-12 h-12 p-0 border-purple-300 hover:bg-purple-100 transition-all duration-200"
                onClick={skipForward}
                disabled={isLoading}
              >
                <SkipForward size={18} className="text-purple-600" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="rounded-full w-12 h-12 p-0 border-purple-300 hover:bg-purple-100 transition-all duration-200"
                onClick={() => setIsRepeat(!isRepeat)}
                disabled={isLoading}
              >
                <Repeat
                  size={16}
                  className={`${
                    isRepeat ? "text-purple-800" : "text-purple-600"
                  }`}
                />
              </Button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3 mb-6">
              <Volume2 size={18} className="text-purple-600" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                disabled={isLoading}
                className="flex-1 h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${volume}%, #e9d5ff ${volume}%, #e9d5ff 100%)`,
                }}
              />
              <span className="text-sm text-purple-600 w-8">
                {Math.round(volume)}%
              </span>
            </div>

            {/* Song Quote & Lyrics Preview */}
            <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-purple-200">
              <p className="text-sm text-purple-700 italic mb-3">
                "Lagu ini mengingatkan kita bahwa kadang orang yang tepat sudah
                ada di depan mata kita! 💕"
              </p>
            </div>

            {/* Music Visualizer Effect */}
            {isPlaying && (
              <div className="flex justify-center items-end gap-1 mt-4 h-8">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-t from-purple-400 to-pink-400 rounded-full animate-pulse"
                    style={{
                      width: "3px",
                      height: `${Math.random() * 100 + 20}%`,
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: `${0.5 + Math.random() * 0.5}s`,
                    }}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

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

        {/* Food Favorites Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center text-amber-800 mb-8">
            Makanan Favorit Thirza 🍽️
          </h2>

          {/* First Row - Bear & Dimsum */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card
              ref={bearCardRef}
              className="bg-gradient-to-br from-amber-100 to-orange-100 backdrop-blur-sm border-amber-200 shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4 hover:scale-110 transition-transform duration-300 cursor-pointer animate-bounce">
                  🐻
                </div>
                <h3 className="text-2xl font-bold text-amber-800 mb-4">
                  Pelukan Beruang Untukmu!
                </h3>
                <p className="text-amber-700 leading-relaxed">
                  Buat yang suka beruang yang temenin terus di kamar, klo bisa
                  hidup dia bisa bilang HBD kak tica wkwkkw
                </p>
              </CardContent>
            </Card>

            <Card
              ref={dimsumCardRef}
              className="bg-gradient-to-br from-yellow-100 to-amber-100 backdrop-blur-sm border-amber-200 shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4 hover:scale-110 transition-transform duration-300 cursor-pointer">
                  🥟
                </div>
                <h3 className="text-2xl font-bold text-amber-800 mb-4">
                  Kelezatan Dimsum
                </h3>
                <p className="text-amber-700 leading-relaxed">
                  saking sukanya sama dimsum, sampai mau kue ultah pake dimsum
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Second Row - Sushi, Cheese, Salad */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card
              ref={sushiCardRef}
              className="bg-gradient-to-br from-green-100 to-emerald-100 backdrop-blur-sm border-green-200 shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-4 hover:scale-110 transition-transform duration-300 cursor-pointer">
                  🍣
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-3">Sushi</h3>
                <p className="text-green-700 text-sm leading-relaxed">
                  IKAN Kok makan mentah, digoreng dong smpe kering
                </p>
              </CardContent>
            </Card>

            <Card
              ref={cheeseCardRef}
              className="bg-gradient-to-br from-yellow-100 to-orange-100 backdrop-blur-sm border-yellow-200 shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-4 hover:scale-110 transition-transform duration-300 cursor-pointer">
                  🧀
                </div>
                <h3 className="text-xl font-bold text-yellow-800 mb-3">
                  Keju Lezat
                </h3>
                <p className="text-yellow-700 text-sm leading-relaxed">
                  kesukaannya sama kek jerry, sama-sama suka keju hehe 🧀
                </p>
              </CardContent>
            </Card>

            <Card
              ref={saladCardRef}
              className="bg-gradient-to-br from-lime-100 to-green-100 backdrop-blur-sm border-lime-200 shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-4 hover:scale-110 transition-transform duration-300 cursor-pointer">
                  🥗
                </div>
                <h3 className="text-xl font-bold text-lime-800 mb-3">
                  Salad Sehat
                </h3>
                <p className="text-lime-700 text-sm leading-relaxed">
                  kiraian salad yg sayur, trnyata salad buah (tapi gk ada emoji
                  salad buah) 🌱
                </p>
              </CardContent>
            </Card>
          </div>
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
                  meskipun kadonya jauh, tapi pasti akan sampai ke. mungkin
                  tidak sebagus itu, tapi setidaknya bisa kasi kwkkw. sebisanya
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Gift className="text-amber-600" size={24} />
                  <h3 className="text-2xl font-bold text-amber-800">Hadiah</h3>
                </div>
                <p className="text-amber-700 mb-4">coba cek</p>
                <Button
                  onClick={handleSurpriseClick}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  {showSurprise ? "Sembunyikan Kejutan" : "Buka Kejutan"} ✨
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Animated Gift Box Surprise */}
        {showSurprise && (
          <Card className="surprise-card mb-8 bg-gradient-to-r from-purple-100 via-pink-100 to-rose-100 border-purple-200 shadow-lg overflow-hidden">
            <CardContent className="p-8 text-center relative">
              {/* Mystery Sparkles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="mystery-sparkles absolute opacity-0"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                  >
                    <Sparkles
                      className="text-purple-400"
                      size={12 + Math.random() * 8}
                    />
                  </div>
                ))}
              </div>

              {/* 3D Gift Box */}
              <div
                className="relative mx-auto w-32 h-32 mb-6"
                style={{ perspective: "200px" }}
              >
                {/* Gift Box Base */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 rounded-lg shadow-lg transform-gpu">
                  <div className="absolute inset-2 bg-gradient-to-br from-red-300 to-red-500 rounded"></div>
                </div>

                {/* Gift Box Ribbon Vertical */}
                <div className="absolute left-1/2 top-0 w-4 h-full bg-gradient-to-b from-yellow-300 to-yellow-500 transform -translate-x-1/2 shadow-md"></div>

                {/* Gift Box Ribbon Horizontal */}
                <div className="absolute top-1/2 left-0 w-full h-4 bg-gradient-to-r from-yellow-300 to-yellow-500 transform -translate-y-1/2 shadow-md"></div>

                {/* Gift Box Lid */}
                <div className="gift-box-lid absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 rounded-lg shadow-xl transform-gpu origin-bottom">
                  <div className="absolute inset-2 bg-gradient-to-br from-red-400 to-red-600 rounded"></div>
                  {/* Bow on top */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
                    <div className="absolute top-1 left-1 w-4 h-2 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full"></div>
                  </div>
                </div>

                {/* Gift Contents (Hidden initially) */}
                <div className="gift-contents absolute inset-0 opacity-0 scale-75 transform-gpu">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl animate-pulse">🎁</div>
                  </div>
                  {/* Magical glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-lg animate-pulse"></div>
                </div>
              </div>

              {/* Secret Message */}
              <div className="secret-message opacity-0 transform translate-y-5">
                <h3 className="text-2xl font-bold text-purple-800 mb-4 flex items-center justify-center gap-2">
                  <span>🤫</span> Rahasia Kecil <span>🤫</span>
                </h3>

                {/* Mystery Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-6">
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-purple-200 hover:scale-105 transition-transform duration-300">
                    <div className="text-2xl mb-2">🗝️</div>
                    <p className="text-sm text-purple-700 font-medium">
                      Ada sesuatu yang spesial menunggumu...
                    </p>
                  </div>

                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-pink-200 hover:scale-105 transition-transform duration-300">
                    <div className="text-2xl mb-2">📍</div>
                    <p className="text-sm text-pink-700 font-medium">
                      Lokasi: Jakarta Utara (petunjuk akan menyusul)
                    </p>
                  </div>
                </div>

                {/* Encrypted Message Effect */}
                <div className="bg-black/80 rounded-lg p-4 font-mono text-green-400 text-sm mb-4 max-w-md mx-auto">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>DECRYPTING MESSAGE...</span>
                  </div>
                  <div className="text-xs opacity-80">
                    {"> "}BIRTHDAY_SURPRISE.exe loading...
                    <br />
                    {"> "}STATUS: READY FOR DELIVERY
                    <br />
                    {"> "}RECIPIENT: THIRZA ✓<br />
                    {"> "}SENDER: KAK ✓<br />
                    {"> "}LOCATION: JAKARTA_UTARA ✓
                  </div>
                </div>

                <p className="text-purple-600 text-sm italic">
                  "Beberapa kejutan terbaik datang dalam paket kecil... dan
                  beberapa lainnya butuh sedikit perjalanan untuk menemukannya!
                  😉"
                </p>
              </div>
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
              Doa Ulang Tahun
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
                  Semoga ulang tahun tiap tahun selalu dirayain, gk hrus heboh.
                  tpi intinya adalah niatnya.
                </p>
              </div>
              <div className="p-4 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl mb-2 hover:scale-110 transition-transform duration-300">
                  💖
                </div>
                <p className="text-amber-700">
                  Semoga dapat yg bisa mengerti dan sekonek dan nyambung mulu
                  dan bisa redain ego sama-sama
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
