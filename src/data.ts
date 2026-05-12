import { Product, Article, Author, SkinConcern, SkinType } from './types';

export const INITIAL_AUTHORS: Author[] = [
  { id: 'auth-1', name: 'Dr. Mai Phương', avatar: 'https://i.pravatar.cc/150?u=auth1', bio: 'Chuyên gia da liễu với 10 năm kinh nghiệm.' },
  { id: 'auth-2', name: 'Beauty Blogger Hana', avatar: 'https://i.pravatar.cc/150?u=auth2', bio: 'Yêu thích nghiên cứu thành phần mỹ phẩm.' },
];

export const INITIAL_SKIN_CONCERNS: SkinConcern[] = [
  { id: 'tri-mun', name: 'Trị mụn', description: 'Giải pháp cho làn da dầu mụn.' },
  { id: 'tri-nam', name: 'Trị nám', description: 'Cải thiện sắc tố da, mờ thâm nám.' },
  { id: 'lam-sach', name: 'Làm sạch', description: 'Loại bỏ bụi bẩn, bã nhờn hiệu quả.' },
  { id: 'khoe-da', name: 'Khỏe da', description: 'Phục hồi và cấp ẩm cho da khỏe mạnh.' },
];

export const INITIAL_SKIN_TYPES: SkinType[] = [
  { id: 'da-dau', name: 'Da dầu', description: 'Da thường xuyên đổ dầu, lỗ chân lông to.' },
  { id: 'da-kho', name: 'Da khô', description: 'Da thiếu độ ẩm, hay bong tróc.' },
  { id: 'da-hon-hop', name: 'Da hỗn hợp', description: 'Dầu vùng chữ T và khô hai bên má.' },
  { id: 'da-nhay-cam', name: 'Da nhạy cảm', description: 'Dễ châm chích, mẩn đỏ khi dùng mỹ phẩm.' },
];

export const INITIAL_ARTICLES: Article[] = [
  { 
    id: 1, 
    cat: 'skincare', 
    tag: 'Skincare', 
    title: 'Chống nắng nội sinh — bí quyết da trắng sáng bền lâu', 
    date: '08.05.2026',
    img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=500&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=400&auto=format&fit=crop'
    ],
    excerpt: 'Bảo vệ làn da tối ưu từ sâu bên trong với công thức tiên tiến...',
    content: '<p>Đây là nội dung bài viết về <strong>chống nắng nội sinh</strong>. Việc bảo vệ da từ bên trong giúp duy trì độ đàn hồi và ngăn ngừa lão hóa sớm.</p>',
    authorId: 'auth-1',
    skinConcerns: ['khoe-da', 'tri-mun']
  },
  { 
    id: 2, 
    cat: 'chuyen-gia', 
    tag: 'Chuyên gia', 
    title: 'Retinol — vũ khí bí mật chống lão hóa hiệu quả nhất', 
    date: '05.05.2026',
    img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=500&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=500&auto=format&fit=crop'
    ],
    excerpt: 'Tại sao Retinol là thành phần không thể thiếu trong chu trình dưỡng da...' 
  },
  { 
    id: 3, 
    cat: 'huong-dan', 
    tag: 'Hướng dẫn', 
    title: 'Layering skincare đúng cách cho da hỗn hợp', 
    date: '02.05.2026',
    img: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?q=80&w=500&auto=format&fit=crop',
    excerpt: 'Thứ tự dưỡng da chuẩn để đạt hiệu quả tối đa từ từng sản phẩm...' 
  },
  { id: 4, cat: 'skincare', tag: 'Skincare', title: 'Vitamin C và cách chọn serum phù hợp với từng loại da', date: '28.04.2026', img: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=400&auto=format&fit=crop', excerpt: 'Chọn Vitamin C đúng nồng độ giúp sáng da và giảm thâm hiệu quả...' },
  { id: 5, cat: 'review', tag: 'Review', title: 'Đánh giá chi tiết Obagi-C Fx C-Clarifying Serum sau 8 tuần', date: '22.04.2026', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=400&auto=format&fit=crop', excerpt: 'Review trải nghiệm thực tế: kết cấu, độ kích ứng và hiệu quả...' },
  { id: 6, cat: 'chuyen-gia', tag: 'Chuyên gia', title: 'AHA, BHA, PHA — Khác nhau như thế nào và dùng ra sao?', date: '18.04.2026', img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=400&auto=format&fit=crop', excerpt: 'Tổng hợp nhanh: công dụng, cách dùng và lưu ý với acid...' },
];

const OBAGI_C = 'https://www.obagi.com/cdn/shop/files/Obagi-C_Fx_C-Clarifying_Serum_PDPhero_1260x1260_72dpi_1.webp?v=1762198130&width=400';
const OBAGI_HYDRO = 'https://www.obagi.com/cdn/shop/files/Daily_Hydro-Drops_PDPhero_1260x1260_72dpi.webp?v=1747944052&width=400';
const OBAGI_NU = 'https://www.obagi.com/cdn/shop/files/Nu-Derm_Foaming_Gel_PDPhero_1260x1260_72dpi.webp?v=1749503474&width=400';
const SOME_BY_1 = 'https://www.cratejoy.com/cdn/shop/files/eOTTXEVOQ3me9GWWRj8v.jpg?v=1723594457';
const SOME_BY_2 = 'https://www.cratejoy.com/cdn/shop/files/oRoxGBbMRAmZsO1Hq8bQ.jpg?v=1723594457';

export const INITIAL_PRODUCTS: Product[] = [
  // Sale
  { 
    id: 'sm-ha', 
    name: 'Sữa rửa mặt HA', 
    price: 120000, 
    oldPrice: 250000, 
    discount: '-52%', 
    img: OBAGI_NU, 
    images: [OBAGI_NU, OBAGI_HYDRO, OBAGI_C, SOME_BY_1],
    brand: 'Obagi', 
    groups: ['sale', 'lam-sach'], 
    type: 'cleanse',
    suitableSkinTypes: ['da-dau', 'da-hon-hop'],
    unsuitableSkinTypes: ['da-kho'],
    skinConcerns: ['lam-sach', 'tri-mun']
  },
  { 
    id: 'dt-silk', 
    name: 'Dầu tẩy trang Silk', 
    price: 299000, 
    oldPrice: 550000, 
    discount: '-46%', 
    img: OBAGI_HYDRO, 
    images: [OBAGI_HYDRO, OBAGI_NU, OBAGI_C],
    brand: 'Obagi', 
    groups: ['sale', 'lam-sach'], 
    type: 'cleanse',
    suitableSkinTypes: ['da-kho', 'da-nhay-cam'],
    unsuitableSkinTypes: ['da-dau'],
    skinConcerns: ['lam-sach', 'khoe-da']
  },
  { id: 'gel-rose', name: 'Gel rửa mặt Rose', price: 180000, oldPrice: 320000, discount: '-44%', img: OBAGI_C, brand: 'Obagi', groups: ['sale', 'lam-sach'], type: 'cleanse', soldOut: true },
  { id: 'toner-ha', name: 'Toner HA Pro', price: 210000, oldPrice: 380000, discount: '-45%', img: SOME_BY_1, brand: 'Some By Mi', groups: ['sale', 'lam-sach'], type: 'cleanse' },
  { id: 'moist', name: 'Kem dưỡng ẩm', price: 345000, oldPrice: 620000, discount: '-44%', img: OBAGI_C, brand: 'Obagi', groups: ['sale', 'khoe-da'], type: 'moisturize' },
  { id: 'serum-ret', name: 'Serum Retinol', price: 420000, oldPrice: 780000, discount: '-46%', img: OBAGI_HYDRO, brand: 'Obagi', groups: ['sale', 'tri-mun'], type: 'serum' },
  
  // Best Seller
  { id: 'obagi-c-fx', name: 'Obagi-C Fx Serum', price: 1250000, img: OBAGI_C, brand: 'Obagi', groups: ['bestseller', 'tri-nam'], type: 'serum' },
  { id: 'some-toner', name: 'Some By Mi Toner', price: 420000, img: SOME_BY_1, brand: 'Some By Mi', groups: ['bestseller', 'tri-mun'], type: 'cleanse' },
  { id: 'obagi-hydro', name: 'Obagi Daily Hydro', price: 1450000, img: OBAGI_HYDRO, brand: 'Obagi', groups: ['bestseller', 'khoe-da'], type: 'moisturize' },
  { id: 'obagi-nu-gel', name: 'Obagi Nu-Derm Gel', price: 1100000, img: OBAGI_NU, brand: 'Obagi', groups: ['bestseller', 'lam-sach'], type: 'cleanse' },
  { id: 'some-aha', name: 'Some By Mi AHA', price: 380000, img: SOME_BY_2, brand: 'Some By Mi', groups: ['bestseller', 'tri-mun'], type: 'exfo' },
  { id: 'comfort-hydra', name: 'Hydramemory Cream', price: 1350000, img: OBAGI_HYDRO, brand: 'Comfort Zone', groups: ['bestseller', 'khoe-da'], type: 'moisturize' },
  
  // Cleanse (Lam sach)
  { id: 'la-roche-mous', name: 'Gel rửa mặt Effaclar', price: 380000, img: OBAGI_NU, brand: 'La Roche-Posay', groups: ['lam-sach', 'la-roche'], type: 'cleanse' },
  { id: 'obagi-nu-cleanser', name: 'Gentle Cleanser', price: 1100000, img: OBAGI_NU, brand: 'Obagi', groups: ['lam-sach', 'obagi'], type: 'cleanse' },
  
  // Tri Mun
  { id: 'la-roche-duo', name: 'Effaclar Duo+', price: 680000, img: OBAGI_C, brand: 'La Roche-Posay', groups: ['tri-mun', 'la-roche'], type: 'serum' },
  { id: 'some-30day', name: 'AHA-BHA-PHA 30 Days', price: 450000, img: SOME_BY_2, brand: 'Some By Mi', groups: ['tri-mun', 'some-by-mi'], type: 'serum' },
  { id: 'comfort-active', name: 'Active Pureness Gel', price: 1200000, img: OBAGI_NU, brand: 'Comfort Zone', groups: ['tri-mun', 'comfort-zone'], type: 'cleanse' },
  
  // Tri Nam
  { id: 'obagi-c-serum', name: 'Obagi-C Professional-C', price: 2150000, img: OBAGI_C, brand: 'Obagi', groups: ['tri-nam', 'obagi'], type: 'serum' },
  { id: 'la-roche-b3', name: 'Retinol B3 Serum', price: 1050000, img: OBAGI_HYDRO, brand: 'La Roche-Posay', groups: ['tri-nam', 'la-roche'], type: 'serum' },
  
  // Khoe Da
  { id: 'la-roche-b5', name: 'Hyalu B5 Serum', price: 920000, img: OBAGI_HYDRO, brand: 'La Roche-Posay', groups: ['khoe-da', 'la-roche'], type: 'serum' },
  { id: 'comfort-regimen', name: 'Skin Regimen 1.0', price: 1650000, img: OBAGI_HYDRO, brand: 'Comfort Zone', groups: ['khoe-da', 'comfort-zone'], type: 'moisturize' },
  { id: 'obagi-daily', name: 'Daily Hydro-Drops', price: 1450000, img: OBAGI_HYDRO, brand: 'Obagi', groups: ['khoe-da', 'obagi'], type: 'serum' },

  // Comfort Zone Brand
  { id: 'comfort-sublime', name: 'Sublime Skin Serum', price: 2650000, img: OBAGI_C, brand: 'Comfort Zone', groups: ['comfort-zone'], type: 'serum' },
  { id: 'comfort-essential', name: 'Essential Milk', price: 850000, img: OBAGI_NU, brand: 'Comfort Zone', groups: ['comfort-zone'], type: 'cleanse' },
];
