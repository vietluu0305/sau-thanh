export interface WorkItem {
  id: string;
  categoryKey: string;
  categoryLabel: string;
  title: string;
  description: string;
  dimensions?: string;
  image: string;
  tag: string;
  objectPosition?: string;
}

export const WORKS: WorkItem[] = [
  {
    id: 'living-armchair-set',
    categoryKey: 'living',
    categoryLabel: 'Bàn ghế phòng khách',
    title: 'Bộ Ghế Tựa Tay Tròn & Bàn Trà',
    description: 'Đóng từ gỗ tự nhiên, thợ ghép mộng chắc chắn, tay vịn uốn lượn êm tay, bàn trà có ngăn kéo gọn gàng để cất ấm chén hay đồ lặt vặt.',
    dimensions: 'Kích thước chuẩn hoặc đóng theo diện tích phòng khách nhà bạn',
    image: '/images/woodcraft/11058a32d3fc53a20aed26.jpg',
    tag: 'Có sẵn & Nhận đóng',
    objectPosition: 'object-center',
  },
  {
    id: 'living-sunlight-chairs',
    categoryKey: 'living',
    categoryLabel: 'Bàn ghế phòng khách',
    title: 'Cặp Ghế Tựa Song Gỗ & Đôn Trà Nhỏ',
    description: 'Kiểu mộc mạc truyền thống, lưng tựa song thoáng mát, ngồi lâu không mỏi lưng, mặt gỗ chà láng bóng tự nhiên đón nắng chiều.',
    dimensions: 'Gỗ tự nhiên sấy khô, không sợ nứt nẻ cong vênh',
    image: '/images/woodcraft/36ffc2cc9b021b5c421319.jpg',
    tag: 'Hàng làm sẵn',
    objectPosition: 'object-center',
  },
  {
    id: 'altar-master-set',
    categoryKey: 'altar',
    categoryLabel: 'Bàn thờ & đồ thờ',
    title: 'Bàn Thờ Nhị Cấp & Đôn Gỗ Liền Khối',
    description: 'Chuyên đóng bàn thờ gia tiên và bàn ông địa bằng mộng gỗ truyền thống Sáu Thành, đường nét chạm trổ chừng mực, gỗ tuyển chọn vân đẹp trang nghiêm.',
    dimensions: 'Đủ kích thước theo cung số đỏ thước Lỗ Ban phong thủy',
    image: '/images/woodcraft/dd2337106edeee80b7cf1.jpg',
    tag: 'Đồ gỗ Sáu Thành 36',
    objectPosition: 'object-center',
  },
  {
    id: 'altar-sanctuary-table',
    categoryKey: 'altar',
    categoryLabel: 'Bàn thờ & đồ thờ',
    title: 'Bàn Thờ Gia Tiên & Cặp Đôn Gỗ Tiện',
    description: 'Bàn thờ gỗ tự nhiên chạm hoa văn truyền thống, kèm cặp chân nến tiện tròn và bài vị gia tiên sơn son thếp vàng trang trọng.',
    dimensions: 'Có sẵn tại tiệm 36 Cộng Hòa',
    image: '/images/woodcraft/3520c7139edd1e8347cc15.jpg',
    tag: 'Có sẵn tại tiệm',
    objectPosition: 'object-center',
  },
  {
    id: 'carved-statues-altar',
    categoryKey: 'sculpture',
    categoryLabel: 'Tượng gỗ mỹ nghệ',
    title: 'Tượng Gỗ & Đôn Hoa Sen Đục Tay',
    description: 'Tượng Phật, Di Lặc và chân đôn hoa sen đục đẽo tỉ mỉ, bề mặt gỗ để mộc tự nhiên mang lại cảm giác bình yên trong nhà.',
    dimensions: 'Gỗ tự nhiên nguyên khối · Đục tay thủ công',
    image: '/images/woodcraft/d3203c1365dde583bccc9.jpg',
    tag: 'Đục tay thủ công',
    objectPosition: 'object-top', // Tránh cắt đỉnh đầu tượng Phật
  },
  {
    id: 'carved-monk-macro',
    categoryKey: 'sculpture',
    categoryLabel: 'Tượng gỗ mỹ nghệ',
    title: 'Tượng Phật Thiền Định & Vân Gỗ Tự Nhiên',
    description: 'Cận cảnh thớ vân gỗ tự nhiên uốn lượn sống động, đường nếp áo đục mềm mại, gương mặt an lành thanh thoát.',
    dimensions: 'Gỗ tự nhiên nguyên khối chọn lọc',
    image: '/images/woodcraft/ca1b32316bffeba1b2ee6.jpg',
    tag: 'Đồ mộc gia truyền',
    objectPosition: 'object-center',
  },
  {
    id: 'pedestals-frames-huong',
    categoryKey: 'frames',
    categoryLabel: 'Đôn gỗ & khung hình',
    title: 'Khung Hình Gỗ Hương & Đôn Chạm Triện',
    description: 'Đôn gỗ kê chậu cây, bình gốm hay tượng nhỏ, kèm khung hình thờ bằng gỗ hương tự nhiên bền bỉ qua năm tháng.',
    dimensions: 'Khung hình: 20x25, 20x30, 30x20 · Đôn có nhiều cỡ',
    image: '/images/woodcraft/72238509dcc75c9905d64.jpg',
    tag: 'Gỗ hương tự nhiên',
    objectPosition: 'object-center',
  },
  {
    id: 'carved-gold-plaque',
    categoryKey: 'frames',
    categoryLabel: 'Đôn gỗ & khung hình',
    title: 'Hoành Phi & Bài Vị Cửu Huyền Thất Tổ',
    description: 'Bức hoành phi chạm nổi dát chữ vàng cùng cặp bài vị thờ cúng tổ tiên làm đúng theo lối mộc mỹ nghệ truyền thống.',
    dimensions: 'Đóng theo số đo phòng thờ của từng gia đình',
    image: '/images/woodcraft/abf258c1010f8151d81e17.jpg',
    tag: 'Đồ thờ cúng gia tiên',
    objectPosition: 'object-center',
  },
];
