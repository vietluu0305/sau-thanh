import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ZoomIn } from 'lucide-react';
import { LightboxModal } from '../interactive/LightboxModal';
import { WORKS, WorkItem } from '../../data/works';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type { WorkItem };
export { WORKS };

export interface SelectedWorksProps {
  onCustomRequest?: (workTitle?: string) => void;
}

export const SelectedWorks: React.FC<SelectedWorksProps> = ({ onCustomRequest }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<WorkItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', label: 'Tất cả' },
    { id: 'living', label: 'Bàn ghế' },
    { id: 'altar', label: 'Bàn thờ' },
    { id: 'sculpture', label: 'Tượng mỹ nghệ' },
    { id: 'frames', label: 'Đôn & Khung' },
  ];

  const filteredWorks = activeCategory === 'all'
    ? WORKS
    : WORKS.filter(w => w.categoryKey === activeCategory);

  const currentIndex = selectedPhoto
    ? filteredWorks.findIndex((w) => w.id === selectedPhoto.id)
    : -1;

  const handlePrevPhoto = () => {
    if (filteredWorks.length <= 1) return;
    const prevIdx = currentIndex <= 0 ? filteredWorks.length - 1 : currentIndex - 1;
    setSelectedPhoto(filteredWorks[prevIdx]);
  };

  const handleNextPhoto = () => {
    if (filteredWorks.length <= 1) return;
    const nextIdx = currentIndex >= filteredWorks.length - 1 ? 0 : currentIndex + 1;
    setSelectedPhoto(filteredWorks[nextIdx]);
  };

  // GSAP animation when category changes
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('article');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.07,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
        }
      );
    }
  }, [activeCategory]);

  return (
    <section
      ref={sectionRef}
      id="mau-do-go"
      className="w-full bg-ivory py-20 md:py-28 overflow-hidden"
      aria-label="Các mẫu đồ gỗ tại tiệm Sáu Thành"
    >
      <div className="max-w-container mx-auto px-4 sm:px-8 space-y-12">
        {/* Editorial Section Header: Tinh tế, không gò bó khung */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-oak font-semibold block">
              ĐỒ GỖ SÁU THÀNH · 36 CỘNG HÒA
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-charcoal tracking-tight font-normal leading-[1.15]">
              Mộc mạc, bền bỉ theo năm tháng.
            </h2>
            <p className="text-xs sm:text-sm text-walnut/75 font-sans max-w-lg leading-relaxed">
              Mỗi tác phẩm là sự kết tinh của thớ gỗ tự nhiên và nét đục mộng thủ công. Chạm nhẹ vào bất kỳ hình ảnh nào để chiêm ngưỡng cận cảnh.
            </p>
          </div>

          {/* Architectural Flush Tab Filter (Âm tường, không gờ khung thô kệch) */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 max-w-full scrollbar-none self-start md:self-end">
            {categories.map((c) => {
              const isActive = activeCategory === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  data-magnetic
                  onClick={() => setActiveCategory(c.id)}
                  className={`text-xs px-3.5 py-1.5 transition-all duration-300 whitespace-nowrap shrink-0 relative select-none cursor-pointer rounded-full ${
                    isActive
                      ? 'text-charcoal font-semibold bg-sand/35'
                      : 'text-charcoal/60 hover:text-charcoal hover:bg-sand/15 font-normal'
                  }`}
                >
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Architectural Grid: Flush, Không bị giam trong khung viền thô */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14 sm:gap-y-16"
        >
          {filteredWorks.map((work) => (
            <article
              key={work.id}
              data-cursor="Chi tiết"
              className="group cursor-pointer select-none"
              onClick={() => setSelectedPhoto(work)}
            >
              {/* Image Canvas: Âm tường, tràn mép tự nhiên, hover mềm mại */}
              <div className="aspect-[16/11] overflow-hidden bg-sand/20 rounded-xs relative group transition-all duration-700 ease-natural group-hover:shadow-[0_20px_45px_-15px_rgba(100,70,50,0.18)]">
                <img
                  src={work.image}
                  alt={work.title}
                  className={`w-full h-full object-cover transform transition-transform duration-700 ease-natural group-hover:scale-[1.03] ${
                    work.objectPosition || 'object-center'
                  }`}
                  loading="lazy"
                  decoding="async"
                />

                {/* Subtle Provenance Pill (Nhẹ nhàng, chỉ xuất hiện tế nhị) */}
                <div className="absolute top-4 left-4 bg-ivory/90 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-charcoal/90 px-3 py-1 rounded-full opacity-85 group-hover:opacity-100 transition-opacity">
                  {work.tag}
                </div>

                {/* Hover Reveal: Giống như cánh cửa ẩn khi động vào mới xuất hiện */}
                <div className="absolute inset-0 bg-charcoal/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center pointer-events-none">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ivory/95 text-charcoal text-xs font-medium shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform duration-400">
                    <ZoomIn className="w-3.5 h-3.5 text-oak" />
                    <span>Xem cận cảnh tác phẩm</span>
                  </span>
                </div>
              </div>

              {/* Minimalist Placard Information */}
              <div className="space-y-1.5 pt-4">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-oak font-medium">
                    {work.categoryLabel}
                  </span>
                  <span className="text-xs font-sans text-walnut/50 group-hover:text-charcoal transition-colors inline-flex items-center gap-1">
                    Chi tiết <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-charcoal tracking-tight group-hover:text-walnut transition-colors font-normal">
                  {work.title}
                </h3>
                <p className="text-xs sm:text-sm text-walnut/80 font-sans leading-relaxed line-clamp-2">
                  {work.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Flush Architectural Dialogue: Cần đóng đồ gỗ riêng */}
        <div className="mt-8 py-10 px-6 sm:px-10 bg-sand/15 rounded-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-oak block font-semibold">
              ĐẶT ĐÓNG THEO SỐ ĐO RIÊNG
            </span>
            <h4 className="font-serif text-2xl text-charcoal tracking-tight font-normal">
              Bạn có không gian cần thiết kế mộc vừa vặn?
            </h4>
            <p className="text-xs sm:text-sm text-walnut/80 leading-relaxed font-sans">
              Bà con chỉ cần gửi kích thước hoặc hình chụp góc nhà, thợ Sáu Thành sẽ tư vấn thế mộng và chất gỗ chuẩn phong thủy nhất.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onCustomRequest?.()}
            className="px-6 py-3 bg-charcoal text-ivory text-xs font-mono uppercase tracking-widest hover:bg-walnut transition-all duration-300 rounded-2xs shrink-0 self-start md:self-auto cursor-pointer"
          >
            Sáu Thành tư vấn
          </button>
        </div>
      </div>

      {/* =========================================================================
          ARCHITECTURAL LIGHTBOX MODAL (MUSEUM EXHIBITION GRADE)
          - Dùng chung LightboxModal thống nhất: không cắt ảnh, không hở trắng
          ========================================================================= */}
      <LightboxModal
        item={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onPrev={handlePrevPhoto}
        onNext={handleNextPhoto}
        currentIndex={currentIndex >= 0 ? currentIndex : 0}
        totalCount={filteredWorks.length}
        onRequestCustom={(title) => onCustomRequest?.(title)}
      />
    </section>
  );
};
