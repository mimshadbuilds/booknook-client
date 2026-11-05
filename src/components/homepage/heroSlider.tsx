"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slides = [
    {
        eyebrow: "A COMMUNITY OF READERS",
        title: "Every book has a story. Every reader has a place.",
        description:
            "Discover new stories, share the books you love, and find your next favorite read at BookNook.",
        image: "/Images/slide-2.avif",
        position: "object-center",
    },
    {
        eyebrow: "DISCOVER SOMETHING NEW",
        title: "A little curiosity can take you anywhere.",
        description:
            "Explore a growing collection of books across genres, ideas, and worlds.",
        image: "/Images/slide-1.avif",
        position: "object-center",
    },
    {
        eyebrow: "READ. SHARE. REPEAT.",
        title: "Good books are even better when shared.",
        description:
            "Add a book to the community shelf and help another reader find their next adventure.",
        image: "/Images/slide-3.avif",
        position: "object-center",
    },
];

export function HeroSlider() {
    return (
        <section className="relative overflow-hidden bg-[#172d24]">
            <Swiper
                modules={[Autoplay, EffectFade, Pagination]}
                effect="fade"
                loop
                autoplay={{ delay: 5500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="booknook-hero">
                {slides.map((slide) => (
                    <SwiperSlide key={slide.title}>
                        <div className="relative min-h-[520px] md:min-h-[590px]">
                            <Image
                                src={slide.image}
                                alt=""
                                fill
                                priority
                                sizes="100vw"
                                className={`object-cover ${slide.position}`}
                            />
                            <div className="absolute inset-0 bg-linear-to-r from-[#14271f]/95 via-[#14271f]/75 to-[#14271f]/20" />

                            <div className="relative mx-auto flex min-h-[520px] max-w-[1320px] items-center px-5 py-20 md:min-h-[590px] md:px-10 lg:px-12">
                                <div className="max-w-2xl">
                                    <p className="mb-5 flex items-center gap-2 text-xs font-bold tracking-[0.22em] text-[#e5a184]">
                                        <BookOpen className="size-4" />
                                        {slide.eyebrow}
                                    </p>
                                    <h1 className="font-heading text-4xl font-semibold leading-[1.15] tracking-tight text-[#fbf9f3] sm:text-5xl md:text-6xl">
                                        {slide.title}
                                    </h1>
                                    <p className="mt-6 max-w-xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
                                        {slide.description}
                                    </p>
                                    <Link href="/books"
                                        className="mt-9 inline-flex items-center gap-3 rounded-lg bg-[#dce8df] px-6 py-3.5 text-sm font-bold text-[#234b3c] transition hover:bg-white">
                                        Browse Books
                                        <ArrowRight className="size-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}