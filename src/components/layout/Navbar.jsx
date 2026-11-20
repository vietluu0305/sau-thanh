import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import gsap from 'gsap';
const NAV_ITEMS = [
    { label: 'Trang chủ', href: '#trang-chu' },
    { label: 'Mẫu mã', href: '#mau-do-go' },
    { label: 'Chuyện tiệm mộc', href: '#chuyen-tiem-moc' },
    { label: 'Ghé tiệm', href: '#ghe-tiem' },
];
export const Navbar = ({ onContactClick }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('trang-chu');
    const navRef = useRef(null);
    const brandRef = useRef(null);
    const linksRef = useRef(null);
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    // Track active section via IntersectionObserver for smooth active navigation state
    useEffect(() => {
        const sectionIds = NAV_ITEMS.map((item) => item.href.replace('#', ''));
        const observers = [];
        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (!el)
                return;
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(id);
                    }
                });
            }, { rootMargin: '-25% 0px -65% 0px' });
            observer.observe(el);
            observers.push(observer);
        });
        return () => {
            observers.forEach((obs) => obs.disconnect());
        };
    }, []);
    // GSAP header reveal on mount
    useEffect(() => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced)
            return;
        const ctx = gsap.context(() => {
            gsap.fromTo(navRef.current, { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.15 });
            if (linksRef.current) {
                gsap.fromTo(linksRef.current.children, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out', delay: 0.35 });
            }
        }, navRef);
        return () => ctx.revert();
    }, []);
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isMobileMenuOpen]);
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);
    return (<header ref={navRef} className={`sticky top-0 z-40 w-full transition-all duration-400 ease-natural ${isScrolled
            ? 'bg-ivory/95 backdrop-blur-md border-b border-walnut/10 py-3.5 shadow-[0_10px_30px_-10px_rgba(100,70,50,0.06)]'
            : 'bg-ivory/80 backdrop-blur-xs border-b border-transparent py-5 sm:py-6'}`} role="banner">
      <div className="max-w-container mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
        {/* Brand: SÁU THÀNH nổi bật nhất */}
        <a ref={brandRef} href="#trang-chu" className="group inline-flex flex-col text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oak rounded py-0.5" aria-label="Đồ Gỗ Sáu Thành - Trang chủ">
          <span className="font-serif text-2xl sm:text-3xl text-charcoal font-bold tracking-tight leading-none group-hover:text-walnut transition-colors duration-200">
            SÁU THÀNH
          </span>
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-walnut/70 mt-1 font-medium">
            Đồ gỗ tự nhiên · 36 Cộng Hòa
          </span>
        </a>

        {/* Desktop Navigation Links (Flush, không gồ ghề) */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9" aria-label="Điều hướng chính">
          <ul ref={linksRef} className="flex items-center gap-6 lg:gap-8 text-sm font-normal text-charcoal/80">
            {NAV_ITEMS.map((item) => {
            const isActive = item.href === `#${activeSection}`;
            return (<li key={item.href}>
                  <a href={item.href} className={`py-1 transition-colors duration-200 relative group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oak rounded text-xs tracking-wider uppercase font-mono ${isActive
                    ? 'text-charcoal font-semibold'
                    : 'text-charcoal/65 hover:text-charcoal font-normal'}`}>
                    <span>{item.label}</span>
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-oak transition-all duration-300 ease-natural ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}/>
                  </a>
                </li>);
        })}
          </ul>

          <div className="pl-6 border-l border-walnut/15">
            <button type="button" data-magnetic onClick={onContactClick} className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-charcoal px-4 py-2 border border-charcoal/25 rounded-2xs hover:bg-charcoal hover:text-ivory transition-all duration-300 cursor-pointer">
              <Phone className="w-3.5 h-3.5 text-oak"/>
              <span>Hỏi mua &amp; Đặt làm</span>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button type="button" onClick={onContactClick} className="text-xs font-semibold text-charcoal px-3 py-1.5 border border-charcoal/30 rounded-2xs">
            Liên hệ
          </button>
          <button type="button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="w-10 h-10 inline-flex items-center justify-center rounded-full text-charcoal hover:bg-sand/30 focus-visible:outline-2 focus-visible:outline-oak transition-colors" aria-label={isMobileMenuOpen ? 'Đóng menu' : 'Mở menu điều hướng'} aria-expanded={isMobileMenuOpen} aria-controls="mobile-navigation">
            {isMobileMenuOpen ? (<X className="w-5 h-5" aria-hidden="true"/>) : (<Menu className="w-5 h-5" aria-hidden="true"/>)}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div id="mobile-navigation" className={`md:hidden fixed inset-x-0 top-18 bottom-0 bg-ivory border-t border-walnut/10 p-6 flex flex-col justify-between transition-all duration-400 ease-natural overflow-y-auto ${isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-2'}`} aria-hidden={!isMobileMenuOpen}>
        <nav aria-label="Điều hướng di động">
          <ul className="space-y-4 pt-2">
            {NAV_ITEMS.map((item) => (<li key={item.href}>
                <a href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="block text-xl font-serif text-charcoal hover:text-walnut transition-colors py-2 border-b border-walnut/10">
                  {item.label}
                </a>
              </li>))}
          </ul>
        </nav>

        <div className="pt-6 border-t border-walnut/15 space-y-4">
          <div className="space-y-1 text-xs text-walnut/80 font-sans">
            <p className="font-bold text-charcoal font-serif text-lg">ĐỒ GỖ SÁU THÀNH</p>
            <p>Số 36 đường Cộng Hòa, Phường 4, Quận Tân Bình, TP.HCM</p>
            <p className="text-walnut/90 font-mono pt-1">
              Điện thoại / Zalo: 0989.598.434 (A. Du) · 038.722.8744 (C. Thanh)
            </p>
          </div>

          <button type="button" onClick={() => {
            setIsMobileMenuOpen(false);
            onContactClick?.();
        }} className="w-full py-3.5 bg-charcoal text-ivory text-xs font-mono uppercase tracking-widest hover:bg-walnut transition-colors rounded-2xs cursor-pointer shadow-xs">
            Hỏi mua &amp; Đặt đóng theo yêu cầu
          </button>
        </div>
      </div>
    </header>);
};
