import React, { useState, useEffect } from 'react';
import { X, Phone, ChevronLeft, ChevronRight } from 'lucide-react';

export interface LightboxItem {
  id: string;
  title: string;
  category?: string;
  categoryLabel?: string;
  description: string;
  dimensions?: string;
  image: string;
  tag: string;
  objectPosition?: string;
}

export interface LightboxModalProps {
  item: LightboxItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  currentIndex?: number;
  totalCount?: number;
  onRequestCustom?: (title: string) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  onClose,
  onPrev,
  onNext,
  currentIndex = 0,
  totalCount = 1,
  onRequestCustom,
}) => {
  const [isClosing, setIsClosing] = useState(false);

  // Smooth close with exit animation lifecycle
  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 220);
  };

  // Keyboard controls: Escape to close, Arrow keys to navigate
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowLeft' && onPrev) {
        onPrev();
      } else if (e.key === 'ArrowRight' && onNext) {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, isClosing, onPrev, onNext]);

  // Lock body scroll when popup is open
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [item]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className={`fixed inset-0 z-50 flex flex-col justify-between p-3 sm:p-6 md:p-8 bg-[#0c0b0a]/95 backdrop-blur-2xl overflow-y-auto select-none ${
        isClosing ? 'animate-backdrop-out' : 'animate-backdrop-in'
      }`}
      onClick={handleClose}
    >
      {/* Vầng sáng ấm radial nhẹ nhàng tôn vinh chất gỗ */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(161,123,85,0.14)_0%,_transparent_75%)]" />

      {/* Thanh trên cùng: Nút đóng âm tường & chỉ số tác phẩm */}
      <div
        className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between py-2 px-1 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-sand/80 font-medium">
            ĐỒ GỖ SÁU THÀNH · 36 CỘNG HÒA
          </span>
          {totalCount > 1 && (
            <>
              <span className="text-sand/30 font-mono">/</span>
              <span className="text-[10px] sm:text-xs font-mono text-sand/60">
                {String(currentIndex + 1).padStart(2, '0')} / {String(totalCount).padStart(2, '0')}
              </span>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={handleClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-ivory/80 hover:text-white border border-white/15 backdrop-blur-md flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg active:scale-95"
          aria-label="Đóng chi tiết"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Không gian trung tâm: Ảnh hiển thị trọn vẹn, không cắt xén, không hở trắng */}
      <div
        className={`relative z-10 my-auto py-2 sm:py-4 flex items-center justify-center w-full max-w-5xl mx-auto ${
          isClosing ? 'animate-fade-out-scale' : 'animate-fade-in-scale'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút lùi tác phẩm (desktop) */}
        {totalCount > 1 && onPrev && (
          <button
            type="button"
            onClick={onPrev}
            className="absolute left-0 sm:-left-4 md:-left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-charcoal/70 hover:bg-charcoal text-ivory/80 hover:text-white border border-white/10 backdrop-blur-md flex items-center justify-center transition-all duration-300 cursor-pointer shadow-xl active:scale-90"
            aria-label="Tác phẩm trước"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Khung ảnh: Tỉ lệ gốc, không gò ép, tôn vinh từng chi tiết chạm khắc */}
        <div className="relative max-h-[56vh] sm:max-h-[62vh] flex items-center justify-center">
          <img
            key={item.id}
            src={item.image}
            alt={item.title}
            className="max-h-[56vh] sm:max-h-[62vh] w-auto max-w-full object-contain rounded-xs shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] border border-white/5 transition-all duration-300"
          />
        </div>

        {/* Nút tiến tác phẩm (desktop) */}
        {totalCount > 1 && onNext && (
          <button
            type="button"
            onClick={onNext}
            className="absolute right-0 sm:-right-4 md:-right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-charcoal/70 hover:bg-charcoal text-ivory/80 hover:text-white border border-white/10 backdrop-blur-md flex items-center justify-center transition-all duration-300 cursor-pointer shadow-xl active:scale-90"
            aria-label="Tác phẩm tiếp theo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Bảng thông tin tác phẩm: Kính khói bán trong suốt âm tường, sang trọng */}
      <div
        className={`relative z-10 w-full max-w-4xl mx-auto bg-[#171513]/85 border border-white/10 rounded-xl p-5 sm:p-7 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-3 sm:space-y-4 shrink-0 ${
          isClosing ? 'animate-fade-out-scale' : 'animate-fade-in-scale'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/10 pb-3">
          <h3 id="lightbox-title" className="font-serif text-2xl sm:text-3xl text-ivory tracking-tight font-normal">
            {item.title}
          </h3>
          <span className="text-[11px] font-mono text-sand/90 font-medium px-3 py-1 bg-white/5 border border-white/10 rounded-full self-start sm:self-auto">
            {item.tag}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-sand/85 leading-relaxed font-sans max-w-3xl">
          {item.description}
        </p>

        <div className="text-xs font-mono text-sand/70 flex items-center gap-2">
          <span className="text-ivory font-semibold">Kích thước:</span>
          <span>Tư vấn</span>
        </div>

        {/* Thanh liên hệ & nút hỏi mua */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/10">
          <div className="text-xs font-mono text-sand/80">
            <span className="text-ivory font-semibold">Tư vấn: </span>
            <span>0989.598.434 (A. Du) · 038.722.8744 (C. Thanh)</span>
          </div>
          <button
            type="button"
            onClick={() => {
              const title = item.title;
              handleClose();
              onRequestCustom?.(title);
            }}
            className="px-6 py-2.5 bg-sand hover:bg-ivory text-charcoal text-xs font-mono uppercase tracking-widest font-semibold transition-all duration-300 rounded-full inline-flex items-center gap-2 cursor-pointer shadow-md hover:shadow-xl active:scale-95"
          >
            <Phone className="w-3.5 h-3.5 text-charcoal" />
            <span>Hỏi mua &amp; Đặt kích thước này</span>
          </button>
        </div>
      </div>
    </div>
  );
};
