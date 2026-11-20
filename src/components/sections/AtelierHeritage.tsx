import React, { useRef, useEffect } from 'react';
import { MapPin, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AtelierHeritage: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      // Image: clip-path reveal from left
      if (imageRef.current) {
        gsap.set(imageRef.current, {
          clipPath: 'inset(0 100% 0 0)',
          willChange: 'clip-path',
        });
        gsap.to(imageRef.current, {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.25,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          onComplete: () => {
            gsap.set(imageRef.current, { willChange: 'auto' });
          },
        });

        // Subtle camera parallax
        const img = imageRef.current.querySelector('img');
        if (img) {
          gsap.to(img, {
            yPercent: -12,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          });
        }
      }

      // Text elements stagger
      if (textRef.current) {
        const els = textRef.current.querySelectorAll('[data-reveal]');
        gsap.set(els, { opacity: 0, y: 28, willChange: 'transform, opacity' });
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onComplete: () => {
            gsap.set(els, { willChange: 'auto' });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="chuyen-tiem-moc"
      className="w-full bg-ivory py-20 md:py-28 overflow-hidden"
      aria-label="Chuyện tiệm mộc Sáu Thành"
    >
      <div className="max-w-container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Authentic Photography (Âm tường, không gờ khung thô) */}
          <div className="lg:col-span-6 space-y-3">
            <div
              ref={imageRef}
              className="relative aspect-[4/3] overflow-hidden bg-sand/20 rounded-xs shadow-[0_20px_45px_-15px_rgba(100,70,50,0.15)]"
              style={{ clipPath: 'inset(0 0% 0 0)' }}
            >
              <img
                src="/images/woodcraft/3b31d7028ecc0e9257dd5.jpg"
                alt="Đường phố Cộng Hòa Tân Bình trong ánh nắng chiều gần tiệm Đồ Gỗ Sáu Thành"
                className="w-full h-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-walnut/70 px-1 pt-1">
              <span className="font-serif italic text-charcoal">Gắn bó cùng bà con lối xóm Tân Bình, Sài Gòn</span>
              <span className="font-mono text-oak font-medium">36 Cộng Hòa, P. 4, Q. Tân Bình</span>
            </div>
          </div>

          {/* Right Column: Story */}
          <div ref={textRef} className="lg:col-span-6 space-y-6 lg:pl-2">
            <div className="space-y-2">
              <span data-reveal className="text-[11px] font-mono uppercase tracking-[0.2em] text-oak font-semibold block">
                CHUYỆN TIỆM MỘC SÁU THÀNH · NGHỀ GIA TRUYỀN
              </span>
              <h2 data-reveal className="font-serif text-3xl sm:text-5xl text-charcoal tracking-tight font-normal leading-[1.22]">
                Từ Quảng Nam vào Sài Gòn, giữ trọn nghề mộc gia đình.
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-walnut/80 font-sans leading-relaxed">
              <p data-reveal>
                Khởi nguồn từ ông nội <strong>Lưu Văn Sáu</strong> — người thợ mộc từ Quảng Nam vào Sài Gòn lập nghiệp, gây dựng nên tiệm <strong>Đồ Gỗ Sáu Thành</strong> tại số 36 đường Cộng Hòa.
              </p>
              <p data-reveal>
                Tiếp nối tâm huyết của ông, tiệm được truyền lại cho thế hệ tiếp theo: <strong>A. Du</strong> trực tiếp tiếp quản và giữ nghề, cùng sự đồng hành của <strong>C. Thanh</strong> trong từng khâu chăm lo và tư vấn cho bà con.
              </p>
              <p data-reveal>
                Qua hai thế hệ, tiệm vẫn giữ nguyên một nếp làm nghề: gỗ nào nói thật gỗ đó, làm kỹ từng món để khách hàng mua về xài bền đẹp qua năm tháng.
              </p>
            </div>

            {/* 3 Cột mốc gia đình tiệm mộc */}
            <div data-reveal className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-walnut/10">
              <div className="space-y-1">
                <span className="font-mono text-xs font-semibold text-oak block">Thế hệ đầu</span>
                <span className="text-xs text-charcoal font-medium block">Ông Lưu Văn Sáu</span>
                <p className="text-[11px] text-walnut/70 leading-relaxed font-sans">
                  Từ Quảng Nam vào Sài Gòn lập nghiệp, mở ra thương hiệu Sáu Thành.
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-xs font-semibold text-oak block">Tiếp quản</span>
                <span className="text-xs text-charcoal font-medium block">A. Du &amp; C. Thanh</span>
                <p className="text-[11px] text-walnut/70 leading-relaxed font-sans">
                  Kế thừa tiệm mộc gia đình, đồng hành giữ nghề tại 36 Cộng Hòa.
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-xs font-semibold text-oak block">Phương châm</span>
                <span className="text-xs text-charcoal font-medium block">Gỗ Thật · Làm Kỹ</span>
                <p className="text-[11px] text-walnut/70 leading-relaxed font-sans">
                  Đặt chữ tín lên hàng đầu, bền đẹp cùng nhiều thế hệ gia đình.
                </p>
              </div>
            </div>

            {/* Khung ghé tiệm: Tinh giản, âm tường thanh thoát */}
            <div data-reveal className="pt-6 border-t border-walnut/10 space-y-3.5 text-xs sm:text-sm text-charcoal">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-oak shrink-0 mt-0.5" />
                <div>
                  <strong className="font-medium text-charcoal">Địa chỉ tiệm:</strong>
                  <span className="text-walnut/90 block mt-0.5">36 Cộng Hòa, Phường 4, Quận Tân Bình, TP. Hồ Chí Minh</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-oak shrink-0 mt-0.5" />
                <div>
                  <strong className="font-medium text-charcoal">Đón tiếp bà con:</strong>
                  <span className="text-walnut/90 block mt-0.5">Cửa hàng mở cửa cả tuần. Cứ ghé xem gỗ, sờ tận tay thử mặt bàn ghế thoải mái trước khi mua.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
