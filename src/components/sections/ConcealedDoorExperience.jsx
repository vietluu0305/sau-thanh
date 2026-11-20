import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export const ConcealedDoorExperience = () => {
    const containerRef = useRef(null);
    const leftDoorRef = useRef(null);
    const rightDoorRef = useRef(null);
    const sceneRef = useRef(null);
    const heroImageRef = useRef(null);
    const bgImageRef = useRef(null);
    const titleWatermarkRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced)
            return;
        const container = containerRef.current;
        if (!container)
            return;
        const ctx = gsap.context(() => {
            // Main Scrubbed Pin Timeline: Mở cửa dứt khoát, không giữ chân cuộn chuột quá lâu
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: 'top top',
                    end: '+=100%',
                    pin: true,
                    scrub: 0.6,
                },
            });
            // 1. Initial State
            gsap.set(leftDoorRef.current, { xPercent: 0 });
            gsap.set(rightDoorRef.current, { xPercent: 0 });
            gsap.set(heroImageRef.current, { scale: 0.85, yPercent: 12, opacity: 0.8 });
            gsap.set(bgImageRef.current, { scale: 1.25, opacity: 0.4 });
            gsap.set(titleWatermarkRef.current, { scale: 0.7, opacity: 0 });
            // 2. Step 1: Doors start parting smoothly like a flush architectural jib door
            tl.to(leftDoorRef.current, { xPercent: -101, ease: 'power2.inOut', duration: 1.4 }, 0.1)
                .to(rightDoorRef.current, { xPercent: 101, ease: 'power2.inOut', duration: 1.4 }, 0.1)
                // 3. Step 2: Background light drifts in, core hero furniture floats forward in 3D perspective
                .to(bgImageRef.current, { scale: 1.0, opacity: 0.65, ease: 'none', duration: 1.8 }, 0.2)
                .to(heroImageRef.current, { scale: 1.05, yPercent: -4, opacity: 1, ease: 'power2.out', duration: 1.6 }, 0.3)
                // 4. Step 3: Giant brand watermark emerges in deep background
                .to(titleWatermarkRef.current, { scale: 1.1, opacity: 0.12, letterSpacing: '0.25em', ease: 'power2.out', duration: 1.5 }, 0.4);
        }, container);
        return () => ctx.revert();
    }, []);
    // Subtle interactive 3D mouse parallax
    const handleMouseMove = (e) => {
        if (!sceneRef.current)
            return;
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth - 0.5) * 18;
        const y = (clientY / innerHeight - 0.5) * 18;
        setMousePos({ x, y });
    };
    return (<section ref={containerRef} className="relative w-full h-screen bg-charcoal text-ivory overflow-hidden select-none" onMouseMove={handleMouseMove} aria-label="Trải nghiệm cánh cửa mộng gỗ ẩn mình Sáu Thành">
      {/* =========================================================================
            THE DEEP SANCTUARY (BACKGROUND & 3D PARALLAX DEPTH)
            ========================================================================= */}
      <div ref={sceneRef} className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center pointer-events-none" style={{
            transform: `perspective(1000px) rotateY(${mousePos.x * 0.4}deg) rotateX(${-mousePos.y * 0.4}deg)`,
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
        {/* Deep Atmosphere: Nắng chiều xuyên qua song cửa tiệm mộc */}
        <div className="absolute inset-0 w-full h-full">
          <img ref={bgImageRef} src="/images/woodcraft/593aaf09f6c776992fd623.jpg" alt="Nắng chiều chiếu nghiêng qua xưởng mộc Sáu Thành" className="w-full h-full object-cover object-center filter blur-[1px]"/>
          {/* Subtle Golden Warm Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/70"/>
          <div className="absolute inset-0 bg-radial from-transparent via-charcoal/30 to-charcoal/90"/>
        </div>

        {/* Giant Cormorant Typography Watermark: "SÁU THÀNH" */}
        <div ref={titleWatermarkRef} className="absolute inset-0 flex items-center justify-center text-center pointer-events-none z-10">
          <span className="font-serif text-[18vw] font-bold text-sand/15 uppercase tracking-[0.15em] whitespace-nowrap leading-none select-none">
            SÁU THÀNH
          </span>
        </div>

        {/* Centerpiece Hero Craft Piece: Chiếc ghế tựa mộc đón nắng trọn vẹn */}
        <div className="relative z-20 w-[85vw] max-w-2xl sm:max-w-3xl aspect-[16/11] overflow-hidden rounded-xs shadow-[0_30px_100px_rgba(0,0,0,0.7)] pointer-events-auto" style={{
            transform: `translate3d(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px, 0)`,
            transition: 'transform 0.3s ease-out',
        }}>
          <img ref={heroImageRef} src="/images/woodcraft/36ffc2cc9b021b5c421319.jpg" alt="Bộ ghế gỗ tự nhiên đón ánh hoàng hôn tại 36 Cộng Hòa" className="w-full h-full object-cover object-center"/>

          {/* Shimmer Light Reflection on Wood */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-sand/10 to-transparent pointer-events-none"/>

          {/* Micro Placard Caption inside the image */}
          <div className="absolute bottom-4 left-4 bg-charcoal/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-mono text-sand font-medium">
            Tác phẩm mộc tự nhiên · 36 Cộng Hòa, Tân Bình
          </div>
        </div>
      </div>

      {/* =========================================================================
            THE CONCEALED ARCHITECTURAL JIB DOORS (CÁNH CỬA ÂM TƯỜNG)
            - Phẳng hoàn toàn, chia đôi bằng đường chỉ khe hairline
            - Khi người dùng cuộn chuột, 2 cánh cửa lùa nhẹ sang 2 bên
            ========================================================================= */}
      {/* Left Door */}
      <div ref={leftDoorRef} className="absolute top-0 left-0 w-1/2 h-full bg-ivory text-charcoal z-40 flex items-center justify-end pr-6 sm:pr-12 shadow-[15px_0_40px_rgba(0,0,0,0.18)]" style={{ willChange: 'transform' }}>
        <div className="text-right space-y-2 max-w-sm sm:max-w-md">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-oak font-semibold block">
            CÁNH CỬA GIẤU KHUÂN · 36 CỘNG HÒA
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-tight text-charcoal font-normal leading-[1.12]">
            Chạm vào<br />thớ gỗ thật,
          </h2>
        </div>
      </div>

      {/* Right Door */}
      <div ref={rightDoorRef} className="absolute top-0 right-0 w-1/2 h-full bg-ivory text-charcoal z-40 flex items-center justify-start pl-6 sm:pl-12 shadow-[-15px_0_40px_rgba(0,0,0,0.18)]" style={{ willChange: 'transform' }}>
        <div className="text-left space-y-2 max-w-sm sm:max-w-md">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-walnut/60 font-semibold block">
            HƠN 10 NĂM LÀM NGHỀ TẠI SÀI GÒN
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-tight text-charcoal font-normal leading-[1.12]">
            mở ra linh hồn<br />tác phẩm.
          </h2>
        </div>
      </div>
    </section>);
};
