"use client";

import Link from "next/link";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y, Pagination, Navigation, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ArrowDownRight, ArrowLeft, ArrowRight, BookOpen, MapPin } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const slides = [
  {
    eyebrow: "A neighborhood lending commons",
    title: "Rediscover the magic of tangible stories.",
    description: "Thousands of neighborhood books, shared freely from one reader to the next. No late fees—just neighborly trust and stories worth passing on.",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1800&q=85",
    alt: "Warm library shelves filled with books",
  },
  {
    eyebrow: "Good stories travel",
    title: "A shared shelf makes a richer neighborhood.",
    description: "Find your next favorite, borrow it nearby, and help a good book find its next home.",
    image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1800&q=85",
    alt: "A quiet reading nook with books",
  },
  {
    eyebrow: "Read, return, repeat",
    title: "Let the next chapter find you.",
    description: "Explore thoughtfully collected titles across fiction, science, history, and children's reading.",
    image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=1800&q=85",
    alt: "Open book in warm natural light",
  },
];
const Banner = () => {
const swiperRef = useRef<SwiperType | null>(null);

    return (
        <section className="px-4 pb-12 pt-5 md:px-6 md:pb-16 lg:px-12">
            <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-2xl bg-[#234b3c]">
                <Swiper
                modules={[Autoplay, A11y, Pagination, Navigation, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                loop
                pagination={{ clickable: true, el: ".booknook-hero-pagination" }}
                onSwiper={(swiper) => { swiperRef.current = swiper; }}
                className="booknook-hero-swiper">
                {slides.map((slide, i) => (
                    <SwiperSlide key={slide.title}>
                    <div className="relative min-h-[570px] md:min-h-[560px] lg:min-h-[600px]">
                        <img src={slide.image} alt={slide.alt} className="absolute inset-0 size-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#122b22]/95 via-[#18392d]/80 to-[#18392d]/20" />
                        <div className="relative z-10 flex min-h-[570px] items-center px-6 py-14 md:min-h-[560px] md:px-12 lg:min-h-[600px] lg:px-20">
                        <div className="max-w-2xl text-white">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur-sm"><BookOpen className="size-4" /> {slide.eyebrow}</div>
                            <h1 className="max-w-2xl font-[Literata] text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">{slide.title}</h1>
                            <p className="mt-6 max-w-xl text-base leading-7 text-white/85 md:text-lg md:leading-8">{slide.description}</p>
                            <div className="mt-8 flex flex-wrap items-center gap-3">
                            <Link href="/books" className="inline-flex h-12 items-center rounded-lg bg-[#fbf9f3] px-6 font-semibold text-[#234b3c] transition-colors hover:bg-white">Browse Books <ArrowDownRight className="ml-2 size-4" /></Link>
                            <Link href="/books" className="inline-flex h-12 items-center rounded-lg border border-white/40 bg-white/5 px-5 text-white transition-colors hover:bg-white/15 hover:text-white"><MapPin className="mr-2 size-4" /> Explore the shelves</Link>
                            </div>
                        </div>
                        </div>
                    </div>
                    </SwiperSlide>
                ))}
                </Swiper>
                <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3 md:left-12 lg:left-20">
                <button aria-label="Previous slide" onClick={() => swiperRef.current?.slidePrev()} className="grid size-10 place-items-center rounded-lg border border-white/35 bg-black/10 text-white transition hover:bg-white/15"><ArrowLeft size={18} /></button>
                <div className="booknook-hero-pagination flex items-center gap-1" />
                <button aria-label="Next slide" onClick={() => swiperRef.current?.slideNext()} className="grid size-10 place-items-center rounded-lg border border-white/35 bg-black/10 text-white transition hover:bg-white/15"><ArrowRight size={18} /></button>
                <span className="ml-2 hidden text-xs font-semibold tracking-widest text-white/70 sm:inline">0{indexSafe(slides.length)} STORIES</span>
                </div>
            </div>
            <div className="mx-auto mt-5 flex max-w-[1320px] items-center justify-between gap-4 text-xs text-[#69736d]">
                <span>Independent reading. Shared generously.</span><span className="hidden sm:inline">A little more story, a little closer to home.</span>
            </div>
        </section>
    );
};

export default Banner;

function indexSafe(count: number) {
    return count;
}