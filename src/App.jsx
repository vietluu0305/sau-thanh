import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { ConcealedDoorExperience } from './components/sections/ConcealedDoorExperience';
import { SelectedWorks } from './components/sections/SelectedWorks';
import { WORKS } from './data/works';
import { AtelierHeritage } from './components/sections/AtelierHeritage';
import { Showroom } from './components/sections/Showroom';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/interactive/CustomCursor';
import { LightboxModal } from './components/interactive/LightboxModal';
import { X, MapPin, Phone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export default function App() {
    const [isConsultationOpen, setIsConsultationOpen] = useState(false);
    const [isConsultationClosing, setIsConsultationClosing] = useState(false);
    const [consultationSubject, setConsultationSubject] = useState(null);
    const [lightboxItem, setLightboxItem] = useState(null);
    const currentLightboxIndex = lightboxItem
        ? WORKS.findIndex((w) => w.id === lightboxItem.id || w.title === lightboxItem.title)
        : -1;
    const handlePrevLightbox = () => {
        if (WORKS.length <= 1)
            return;
        const prevIdx = currentLightboxIndex <= 0 ? WORKS.length - 1 : currentLightboxIndex - 1;
        setLightboxItem(WORKS[prevIdx]);
    };
    const handleNextLightbox = () => {
        if (WORKS.length <= 1)
            return;
        const nextIdx = currentLightboxIndex >= WORKS.length - 1 ? 0 : currentLightboxIndex + 1;
        setLightboxItem(WORKS[nextIdx]);
    };
    const handleOpenConsultation = (subject) => {
        setConsultationSubject(subject || null);
        setIsConsultationOpen(true);
        setIsConsultationClosing(false);
    };
    const handleCloseConsultation = () => {
        if (isConsultationClosing || !isConsultationOpen)
            return;
        setIsConsultationClosing(true);
        setTimeout(() => {
            setIsConsultationOpen(false);
            setIsConsultationClosing(false);
            setConsultationSubject(null);
        }, 220);
    };
    const handleScrollToCollection = () => {
        const el = document.getElementById('mau-do-go');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const handleScrollToStory = () => {
        const el = document.getElementById('chuyen-tiem-moc');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };
    // Close consultation modal on Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isConsultationOpen) {
                handleCloseConsultation();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isConsultationOpen, isConsultationClosing]);
    // Lock body scroll when consultation modal is open
    useEffect(() => {
        if (isConsultationOpen) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isConsultationOpen]);
    return (<div className="min-h-screen flex flex-col bg-ivory text-charcoal font-sans selection:bg-sand selection:text-charcoal w-full max-w-full overflow-x-hidden">
      {/* Animorio-Grade Magnetic Ambient Cursor */}
      <CustomCursor />

      {/* Thanh tiến trình cuộn trang màu gỗ ấm áp */}
      <div id="scroll-progress" aria-hidden="true"/>

      {/* 1. Thanh điều hướng: ĐỒ GỖ SÁU THÀNH nổi bật */}
      <Navbar onContactClick={() => handleOpenConsultation()}/>

      <main className="flex-1">
        {/* 2. Phần đầu trang: Gỗ thật, làm kỹ, xài bền đời này qua đời khác */}
        <HeroSection onExploreProducts={handleScrollToCollection} onOurStoryClick={handleScrollToStory}/>

        {/* 3. SIÊU TRẢI NGHIỆM ĐIỆN ẢNH: Cánh cửa giấu khuôn âm tường mở ra không gian 3D Parallax */}
        <ConcealedDoorExperience />

        {/* 4. Các mẫu đồ gỗ làm sẵn tại tiệm */}
        <SelectedWorks onCustomRequest={(title) => handleOpenConsultation(title)}/>

        {/* 5. Chuyện tiệm mộc hơn 10 năm ở số 36 đường Cộng Hòa */}
        <AtelierHeritage />

        {/* 6. Ghé tiệm 36 Cộng Hòa, Tân Bình */}
        <Showroom onContactClick={() => handleOpenConsultation('Ghé tiệm xem đồ gỗ')}/>
      </main>

      {/* 9. Chân trang: Đầy đủ địa chỉ, số điện thoại tiệm */}
      <Footer />

      {/* Bảng liên hệ hỏi mua & đặt đóng (Chuẩn âm tường, đóng mở siêu mượt) */}
      {isConsultationOpen && (<div role="dialog" aria-modal="true" aria-labelledby="consultation-preview-title" className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/85 backdrop-blur-xl ${isConsultationClosing ? 'animate-backdrop-out' : 'animate-backdrop-in'}`} onClick={handleCloseConsultation}>
          <div className={`bg-ivory rounded-xs max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-[0_30px_90px_rgba(0,0,0,0.45)] max-h-[90vh] overflow-y-auto ${isConsultationClosing ? 'animate-fade-out-scale' : 'animate-fade-in-scale'}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4 border-b border-walnut/10 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-oak font-semibold block">
                  ĐỒ GỖ SÁU THÀNH · 36 CỘNG HÒA
                </span>
                <h3 id="consultation-preview-title" className="font-serif text-2xl text-charcoal tracking-tight mt-1 font-normal">
                  Hỏi Mua &amp; Đặt Đóng Đồ Gỗ
                </h3>
              </div>
              <button type="button" onClick={handleCloseConsultation} className="w-8 h-8 rounded-full bg-sand/30 hover:bg-charcoal hover:text-ivory text-charcoal flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0" aria-label="Đóng bảng liên hệ">
                <X className="w-4 h-4"/>
              </button>
            </div>

            {consultationSubject && (<div className="p-3.5 bg-sand/25 text-xs text-charcoal rounded-xs">
                <span className="text-walnut/70 font-medium">Món đồ bạn đang quan tâm: </span>
                <strong className="text-charcoal font-serif text-sm block mt-0.5">{consultationSubject}</strong>
              </div>)}

            <p className="text-xs sm:text-sm text-walnut/85 leading-relaxed font-sans">
              Bà con cô bác có thể ghé trực tiếp tiệm tại số 36 Cộng Hòa để sờ tận tay thử thớ gỗ và xem hàng có sẵn, hoặc gọi điện / nhắn Zalo để trao đổi kích thước muốn đóng riêng.
            </p>

            <div className="p-5 bg-sand/15 space-y-3 text-xs sm:text-sm rounded-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-oak shrink-0 mt-0.5"/>
                <div>
                  <strong className="text-charcoal font-medium">Địa chỉ tiệm:</strong>{' '}
                  <span className="text-walnut block mt-0.5">Số 36 đường Cộng Hòa, Phường 4, Quận Tân Bình, TP. Hồ Chí Minh</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <Phone className="w-4 h-4 text-oak shrink-0 mt-0.5"/>
                <div>
                  <strong className="text-charcoal font-medium">Điện thoại / Zalo:</strong>{' '}
                  <span className="font-mono text-charcoal font-bold block mt-0.5 text-sm">
                    0989.598.434 (A. Du) · 038.722.8744 (C. Thanh)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button type="button" onClick={handleCloseConsultation} className="px-5 py-2.5 bg-charcoal text-ivory text-xs font-mono uppercase tracking-widest hover:bg-walnut transition-all duration-300 rounded-2xs cursor-pointer shadow-xs">
                Đóng lại
              </button>
            </div>
          </div>
        </div>)}

      {/* Lightbox Modal phóng to tác phẩm (Museum Exhibition Stage) */}
      <LightboxModal item={lightboxItem} onClose={() => setLightboxItem(null)} onPrev={handlePrevLightbox} onNext={handleNextLightbox} currentIndex={currentLightboxIndex >= 0 ? currentLightboxIndex : 0} totalCount={WORKS.length} onRequestCustom={(title) => {
            setLightboxItem(null);
            handleOpenConsultation(`Hỏi mua tác phẩm: ${title}`);
        }}/>
    </div>);
}
