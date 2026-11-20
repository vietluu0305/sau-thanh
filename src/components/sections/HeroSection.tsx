import React, { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface HeroSectionProps {
  onExploreProducts?: () => void;
  onOurStoryClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProducts,
  onOurStoryClick,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // 1. Initial State Setup
      if (imageWrapRef.current) {
        const heroImg = imageWrapRef.current.querySelector('img');
        gsap.set(imageWrapRef.current, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          willChange: 'clip-path',
        });
        if (heroImg) {
          gsap.set(heroImg, { scale: 1.12, willChange: 'transform' });
        }

        // Cinematic curtain wipe down + subtle image counter-scale
        tl.to(
          imageWrapRef.current,
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 1.35,
            ease: 'power3.inOut',
          },
          0.1
        );

        if (heroImg) {
          tl.to(
            heroImg,
            {
              scale: 1.0,
              duration: 1.6,
              ease: 'power3.out',
            },
            0.15
          );
        }
      }

      // 2. Staggered Masked Typography (Animorio & Studio-Grade Kinetic Typography)
      if (textBlockRef.current) {
        const lines = textBlockRef.current.querySelectorAll('[data-hero-line]');
        const otherText = textBlockRef.current.querySelectorAll('[data-hero-fade]');

        gsap.set(lines, { yPercent: 115, willChange: 'transform' });
        gsap.set(otherText, { opacity: 0, y: 20, willChange: 'transform, opacity' });

        // Line-by-line reveal with pristine power4.out deceleration
        tl.to(
          lines,
          {
            yPercent: 0,
            duration: 1.1,
            stagger: 0.16,
            ease: 'power4.out',
          },
          0.4
        );

        tl.to(
          otherText,
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: 'power3.out',
          },
          0.7
        );
      }

      // 3. CTA Buttons Stagger
      if (ctaRef.current) {
        const ctaEls = ctaRef.current.querySelectorAll('button');
        gsap.set(ctaEls, { opacity: 0, y: 16 });
        tl.to(
          ctaEls,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
          },
          0.95
        );
      }

      // 4. Caption & Details Placard
      if (captionRef.current) {
        gsap.set(captionRef.current, { opacity: 0, y: 10 });
        tl.to(
          captionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          1.25
        );
      }

      // 5. Subtle Scroll-Driven Camera Parallax for Hero Image
      if (imageWrapRef.current) {
        const heroImg = imageWrapRef.current.querySelector('img');
        if (heroImg) {
          gsap.to(heroImg, {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.2,
            },
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="trang-chu"
      className="relative w-full bg-ivory pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden"
      aria-label="Đồ Gỗ Sáu Thành"
    >
      <div className="max-w-container mx-auto px-4 sm:px-8">
        {/* Editorial Header Block: Flush, tinh tế */}
        <div
          ref={textBlockRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 md:pb-14 border-b border-walnut/10"
        >
          <div className="lg:col-span-8 space-y-3">
            <span
              data-hero-fade
              className="text-[11px] font-mono uppercase tracking-[0.2em] text-oak font-semibold block"
            >
              SÁU THÀNH · 36 CỘNG HÒA
            </span>
            <h1 className="font-serif text-[27px] sm:text-[43px] md:text-[54px] text-charcoal tracking-tight font-normal leading-[1.28]">
              <span className="block overflow-hidden pt-1 pb-1">
                <span data-hero-line className="block transform-gpu">Gỗ thật, làm kỹ,</span>
              </span>
              <span className="block overflow-hidden pt-1 pb-1">
                <span data-hero-line className="block transform-gpu">bền theo năm tháng.</span>
              </span>
            </h1>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <p
              data-hero-fade
              className="text-sm md:text-base text-walnut/80 font-sans leading-relaxed"
            >
              Chuyên bàn ghế, bàn thờ và nội thất gỗ tự nhiên tại Sáu Thành. Có sẵn tại tiệm hoặc đóng theo yêu cầu.
            </p>
            <div ref={ctaRef} className="flex items-center gap-6 pt-1">
              <button
                type="button"
                data-magnetic
                onClick={onExploreProducts}
                className="text-xs uppercase tracking-widest text-charcoal font-semibold inline-flex items-center gap-2 border-b-2 border-charcoal pb-0.5 hover:text-walnut hover:border-walnut transition-colors cursor-pointer"
              >
                <span>Xem mẫu mã</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                data-magnetic
                onClick={onOurStoryClick}
                className="text-xs uppercase tracking-widest text-charcoal/80 font-semibold inline-flex items-center gap-1.5 border-b border-charcoal/30 pb-0.5 hover:text-charcoal hover:border-charcoal transition-colors cursor-pointer"
              >
                <span>Chuyện tiệm mộc</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Large-Scale Authentic Hero Photography: Âm tường, không khung viền thô */}
        <div className="pt-8 md:pt-12">
          <div
            ref={imageWrapRef}
            className="relative w-full overflow-hidden bg-sand/20 rounded-xs shadow-[0_20px_50px_-20px_rgba(100,70,50,0.15)]"
            style={{ clipPath: 'inset(0% 0 0 0)' }}
          >
            <div className="aspect-[16/10] sm:aspect-[21/10] md:aspect-[2.3/1] w-full overflow-hidden">
              <img
                src="/images/woodcraft/36ffc2cc9b021b5c421319.jpg"
                alt="Bộ ghế tựa và đôn mộc tự nhiên trong nắng chiều tại tiệm Đồ Gỗ Sáu Thành số 36 Cộng Hòa"
                className="w-full h-full object-cover object-center"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Chú thích ảnh: Liền lạc thanh thoát */}
            <div
              ref={captionRef}
              className="px-5 py-3.5 bg-ivory/95 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-walnut/80"
            >
              <span className="font-serif italic text-charcoal">
                Góc bàn ghế gỗ tự nhiên đón nắng chiều tại số 36 Cộng Hòa
              </span>
              <span className="font-mono text-[11px] tracking-wider text-oak font-medium">
                Hình chụp thực tế tại tiệm Đồ Gỗ Sáu Thành · Tân Bình, TP.HCM
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
