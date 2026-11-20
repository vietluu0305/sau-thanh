import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
export const CustomCursor = () => {
    const cursorDotRef = useRef(null);
    const cursorRingRef = useRef(null);
    const [cursorText, setCursorText] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        // Only enable custom cursor on non-touch desktop devices with fine pointer
        const isTouch = window.matchMedia('(pointer: coarse)').matches;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isTouch || reduced)
            return;
        const dot = cursorDotRef.current;
        const ring = cursorRingRef.current;
        if (!dot || !ring)
            return;
        // Quick to position setters for 60fps+ lag-free cursor tracking
        const setDotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power2.out' });
        const setDotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power2.out' });
        const setRingX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
        const setRingY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });
        const handleMouseMove = (e) => {
            if (!isVisible)
                setIsVisible(true);
            const { clientX, clientY } = e;
            setDotX(clientX);
            setDotY(clientY);
            setRingX(clientX);
            setRingY(clientY);
        };
        const handleMouseLeave = () => {
            setIsVisible(false);
        };
        // Magnetic interaction listeners for elements with data-cursor or interactive tags
        const handleElementHover = (e) => {
            const target = e.target.closest('[data-cursor], button, a, article');
            if (target) {
                setIsHovered(true);
                const text = target.getAttribute('data-cursor');
                if (text) {
                    setCursorText(text);
                }
                else if (target.tagName.toLowerCase() === 'article') {
                    setCursorText('Xem');
                }
                else {
                    setCursorText('');
                }
                // Magnetic pull on buttons if marked
                if (target.hasAttribute('data-magnetic')) {
                    const rect = target.getBoundingClientRect();
                    const relX = e.clientX - (rect.left + rect.width / 2);
                    const relY = e.clientY - (rect.top + rect.height / 2);
                    gsap.to(target, {
                        x: relX * 0.28,
                        y: relY * 0.28,
                        duration: 0.3,
                        ease: 'power2.out',
                    });
                }
            }
            else {
                setIsHovered(false);
                setCursorText('');
            }
        };
        const handleElementLeave = (e) => {
            const target = e.target.closest('[data-magnetic]');
            if (target) {
                gsap.to(target, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.4)',
                });
            }
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseover', handleElementHover, { passive: true });
        document.addEventListener('mouseout', handleElementLeave, { passive: true });
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseover', handleElementHover);
            document.removeEventListener('mouseout', handleElementLeave);
        };
    }, [isVisible]);
    return (<>
      {/* Tiny central pinpoint */}
      <div ref={cursorDotRef} className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-oak pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} ${isHovered && cursorText ? 'scale-0' : 'scale-100'}`}/>

      {/* Smooth trailing magnetic ring / badge */}
      <div ref={cursorRingRef} className={`fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 ease-natural ${isVisible ? 'opacity-100' : 'opacity-0'} ${cursorText
            ? 'w-16 h-16 rounded-full bg-charcoal/90 text-ivory backdrop-blur-md shadow-xl scale-100 text-[11px] font-mono tracking-wider uppercase'
            : isHovered
                ? 'w-12 h-12 rounded-full border border-oak/60 bg-oak/10 scale-100'
                : 'w-8 h-8 rounded-full border border-walnut/30 bg-transparent scale-100'}`}>
        {cursorText && <span className="animate-fade-in-scale">{cursorText}</span>}
      </div>
    </>);
};
