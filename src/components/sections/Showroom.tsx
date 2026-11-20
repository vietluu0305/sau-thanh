import React, { useRef, useEffect } from 'react';
import { MapPin, Phone, Clock, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ShowroomProps {
  onContactClick?: () => void;
}

export const Showroom: React.FC<ShowroomProps> = ({ onContactClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        const els = headerRef.current.querySelectorAll('[data-reveal]');
        gsap.set(els, { opacity: 0, y: 30, willChange: 'transform, opacity' });
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ghe-tiem"
      className="w-full bg-sand/15 py-20 md:py-28 overflow-hidden"
      aria-label="Tiệm Đồ Gỗ Sáu Thành 36 Cộng Hòa"
    >
      <div className="max-w-container mx-auto px-4 sm:px-8 space-y-12">
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-walnut/10">
          <div className="space-y-2">
            <span data-reveal className="text-[11px] font-mono uppercase tracking-[0.2em] text-oak font-semibold block">
              ĐẾN XEM TRỰC TIẾP · SÀI GÒN
            </span>
            <h2 data-reveal className="font-serif text-3xl sm:text-5xl text-charcoal tracking-tight font-normal">
              Ghé tiệm Đồ Gỗ Sáu Thành.
            </h2>
          </div>
          <p data-reveal className="text-xs sm:text-sm text-walnut/80 max-w-md font-sans leading-relaxed">
            Bà con cứ ghé tiệm ngắm nghía, sờ tận tay thớ gỗ xem độ mịn màng và chắc chắn. Sáu Thành lúc nào cũng sẵn lòng đón tiếp và báo giá rõ ràng.
          </p>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Showroom Photo: Âm tường, tràn mép tự nhiên */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] h-full overflow-hidden bg-sand/20 rounded-xs shadow-[0_20px_45px_-15px_rgba(100,70,50,0.15)] group">
              <img
                src="/images/woodcraft/fa2b631c3ad2ba8ce3c324.jpg"
                alt="Không gian trưng bày đồ gỗ tự nhiên tại tiệm Đồ Gỗ Sáu Thành 36 Cộng Hòa"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 bg-ivory/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-mono text-charcoal font-medium border border-walnut/10 shadow-sm">
                Số 36 đường Cộng Hòa, P. 4, Q. Tân Bình, TP.HCM
              </div>
            </div>
          </div>

          {/* Showroom Details Box: Liền khối, không viền hộp thô */}
          <div className="lg:col-span-5 bg-ivory p-6 sm:p-8 rounded-xs flex flex-col justify-between space-y-6 shadow-[0_20px_45px_-15px_rgba(100,70,50,0.12)]">
            <div className="space-y-5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-oak font-semibold block">
                ĐỊA CHỈ &amp; SỐ ĐIỆN THOẠI CỦA TIỆM
              </span>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-oak shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-charcoal block font-medium">Địa chỉ tiệm:</strong>
                    <span className="text-walnut/90 leading-relaxed block mt-0.5">
                      Số 36 đường Cộng Hòa, Phường 4, Quận Tân Bình, TP. Hồ Chí Minh
                    </span>
                    <span className="text-[11px] text-walnut/70 block mt-0.5">
                      (Nằm ngay mặt tiền đường Cộng Hòa, gần đoạn Lăng Cha Cả, chỗ đậu xe máy và xe tải rộng rãi)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-oak shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-charcoal block font-medium">Số điện thoại / Zalo:</strong>
                    <div className="font-mono text-charcoal font-bold mt-1 text-sm space-y-1">
                      <p>0989.598.434 <span className="text-xs font-normal text-walnut font-sans">(A. Du - Tư vấn đóng đồ &amp; kỹ thuật mộc)</span></p>
                      <p>038.722.8744 <span className="text-xs font-normal text-walnut font-sans">(C. Thanh - Báo giá hàng có sẵn &amp; giao hàng)</span></p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-oak shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-charcoal block font-medium">Giờ mở cửa:</strong>
                    <span className="text-walnut/90 block mt-0.5">
                      8:00 sáng đến 20:30 tối (Mở tất cả các ngày trong tuần, kể cả Thứ 7 và Chủ Nhật)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-walnut/10 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={onContactClick}
                className="w-full sm:w-auto flex-1 py-3 px-5 bg-charcoal text-ivory text-xs font-mono uppercase tracking-widest hover:bg-walnut transition-all duration-300 rounded-2xs inline-flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-sand" />
                <span>Liên hệ trước khi qua</span>
              </button>
              <a
                href="https://maps.app.goo.gl/EqMa8XGZN9zgJs7H9"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-3 px-5 border border-charcoal/20 text-charcoal hover:bg-sand/30 text-xs font-mono uppercase tracking-widest transition-all duration-300 rounded-2xs inline-flex items-center justify-center gap-1.5"
              >
                <span>Xem bản đồ</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
