import React from 'react';
import { MapPin, Phone, Clock, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-charcoal text-ivory pt-16 pb-12 border-t border-walnut/30" role="contentinfo">
      <div className="max-w-container mx-auto px-4 sm:px-8 space-y-12">
        {/* Main Footer Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-10 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="space-y-1">
              <span className="font-serif text-3xl font-bold tracking-tight text-ivory block">
                ĐỒ GỖ SÁU THÀNH
              </span>
              <p className="text-xs font-mono text-sand/80 uppercase tracking-wider">
                Mộc gia truyền · 36 Cộng Hòa · Hơn 10 năm kinh nghiệm
              </p>
            </div>
            <p className="text-sm text-sand/70 font-sans leading-relaxed max-w-sm">
              Tiệm mộc gia đình chuyên đóng bàn ghế phòng khách, bàn thờ gia tiên, tượng gỗ mỹ nghệ và nhận đóng theo kích thước yêu cầu của bà con. Gỗ già sấy kỹ, mộng khít chắc bền.
            </p>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-sand font-semibold">
              Địa Chỉ &amp; Giờ Mở Cửa
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-sand/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-oak shrink-0 mt-0.5" />
                <span>36 Cộng Hòa, Phường 4, Quận Tân Bình, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-oak shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-ivory font-bold block">
                    0989.598.434 (A. Du) · 038.722.8744 (C. Thanh)
                  </span>
                  <span className="text-[11px] text-sand/60">Bà con gọi điện hoặc kết bạn Zalo gửi hình tư vấn nhanh</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-oak shrink-0 mt-0.5" />
                <span>Mở cửa từ 8:00 đến 20:30 tất cả các ngày trong tuần</span>
              </li>
            </ul>
          </div>

          {/* Quick Nav & Back to Top */}
          <div className="md:col-span-3 space-y-3 md:text-right flex flex-col md:items-end justify-between h-full">
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-sand font-semibold">
                Đường dẫn nhanh
              </h4>
              <ul className="space-y-1.5 text-xs text-sand/80">
                <li>
                  <a href="#trang-chu" className="hover:text-white transition-colors">
                    Trang chủ
                  </a>
                </li>
                <li>
                  <a href="#mau-do-go" className="hover:text-white transition-colors">
                    Các mẫu đồ gỗ
                  </a>
                </li>
                <li>
                  <a href="#chuyen-tiem-moc" className="hover:text-white transition-colors">
                    Chuyện tiệm mộc
                  </a>
                </li>
                <li>
                  <a href="#ghe-tiem" className="hover:text-white transition-colors">
                    Ghé tiệm 36 Cộng Hòa
                  </a>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={handleScrollToTop}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-sand/80 hover:text-white transition-colors pt-4 md:pt-0"
              aria-label="Cuộn lên đầu trang"
            >
              <span>Lên đầu trang</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sand/60 font-mono">
          <p>© {new Date().getFullYear()} Đồ Gỗ Sáu Thành · 36 Cộng Hòa, Tân Bình, TP.HCM</p>
          <p>Nghề mộc gia truyền · Uy tín tạo nên thương hiệu</p>
        </div>
      </div>
    </footer>
  );
};
