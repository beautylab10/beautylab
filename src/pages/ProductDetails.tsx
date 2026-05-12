import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { INITIAL_PRODUCTS, INITIAL_SKIN_TYPES, INITIAL_SKIN_CONCERNS } from '../data';
import { formatCurrency, formatK } from '../utils';
import { useState, useEffect } from 'react';
import { Heart, ShoppingBag, ChevronRight, Minus, Plus, CheckCircle2, XCircle } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeAcc, setActiveAcc] = useState('info');

  const product = INITIAL_PRODUCTS.find(p => p.id === id);
  const [activeImg, setActiveImg] = useState(product?.img || '');

  useEffect(() => {
    if (product) setActiveImg(product.img);
  }, [id, product]);

  if (!product) {
    return <Layout showBack><div>Sản phẩm không tồn tại</div></Layout>;
  }

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('beaute_cart') || '[]');
    const existing = cart.find((i: any) => i.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ ...product, qty });
    }
    localStorage.setItem('beaute_cart', JSON.stringify(cart));
    navigate('/cart');
  };

  return (
    <Layout showBack>
      <div className="flex flex-col bg-white animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Product Image Hero */}
        <div className="w-full aspect-[16/10] overflow-hidden relative border-b border-black/5 bg-white flex items-center justify-center">
          {product.discount && (
            <div className="absolute top-6 left-6 bg-rose text-white text-[10px] font-bold px-3 py-1 rounded-sm tracking-widest shadow-sm uppercase z-10">
              {product.discount}
            </div>
          )}
          
          {/* Vertical Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="absolute left-4 top-[60%] -translate-y-1/2 z-20 flex flex-col gap-2.5">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(img)}
                  className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all duration-300 shadow-md transform hover:scale-105 active:scale-95 ${
                    activeImg === img ? 'border-rose scale-110 ring-4 ring-rose/10' : 'border-white opacity-80 hover:opacity-100'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`thumb-${idx}`} />
                </button>
              ))}
            </div>
          )}

          <button 
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`absolute top-6 right-6 w-11 h-11 rounded-full flex items-center justify-center transition-all z-10 shadow-md active:scale-95 ${isWishlisted ? 'bg-rose text-white' : 'bg-white/90 backdrop-blur-md text-text'}`}
          >
            <Heart size={22} strokeWidth={1.5} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
          <img src={activeImg} alt={product.name} className="w-full h-full object-cover mix-blend-multiply transition-all duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
        </div>

        {/* Product Info */}
        <div className="p-6 -mt-8 bg-white rounded-t-[32px] relative z-10 shadow-[0_-12px_30px_rgba(0,0,0,0.02)] pb-20">
          <Link 
            to={`/products?group=${product.brand === 'Obagi' ? 'obagi' : product.brand === 'Comfort Zone' ? 'comfort-zone' : product.brand === 'La Roche-Posay' ? 'la-roche' : product.brand === 'Some By Mi' ? 'some-by-mi' : 'all'}`}
            className="text-[10px] font-bold text-rose/80 uppercase tracking-widest mb-2 px-1 hover:underline transition-all block w-fit"
          >
            {product.brand}
          </Link>
          <h1 className="font-serif text-[24px] font-semibold text-text mb-4 leading-tight px-1">{product.name}</h1>
          
          <div className="space-y-6 mb-8 px-1">
            {/* Vấn đề da */}
            {product.skinConcerns && product.skinConcerns.length > 0 && (
              <div>
                <div className="text-[10px] font-bold text-text-light uppercase tracking-widest mb-2 block opacity-60">Vấn đề da</div>
                <div className="flex flex-wrap gap-2">
                  {product.skinConcerns.map(id => {
                    const concern = INITIAL_SKIN_CONCERNS.find(c => c.id === id);
                    return concern ? (
                      <span key={id} className="bg-text text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                        {concern.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            {/* Skin Compatibility */}
            <div className="grid grid-cols-2 gap-6">
              {/* Phù hợp */}
              <div>
                <div className="text-[10px] font-bold text-text-light uppercase tracking-widest mb-2 block opacity-60">Phù hợp với</div>
                <div className="flex flex-col gap-2">
                  {(product.suitableSkinTypes && product.suitableSkinTypes.length > 0) ? (
                    product.suitableSkinTypes.map(id => {
                      const type = INITIAL_SKIN_TYPES.find(t => t.id === id);
                      return type ? (
                        <div key={id} className="flex items-center gap-2 text-success">
                          <CheckCircle2 size={14} />
                          <span className="text-[12px] font-bold">{type.name}</span>
                        </div>
                      ) : null;
                    })
                  ) : (
                    <span className="text-[12px] text-text-mid font-medium italic">Tất cả loại da</span>
                  )}
                </div>
              </div>

              {/* Không phù hợp */}
              <div>
                <div className="text-[10px] font-bold text-text-light uppercase tracking-widest mb-2 block opacity-60">Không dành cho</div>
                <div className="flex flex-col gap-2">
                  {(product.unsuitableSkinTypes && product.unsuitableSkinTypes.length > 0) ? (
                    product.unsuitableSkinTypes.map(id => {
                      const type = INITIAL_SKIN_TYPES.find(t => t.id === id);
                      return type ? (
                        <div key={id} className="flex items-center gap-2 text-rose">
                          <XCircle size={14} />
                          <span className="text-[12px] font-bold">{type.name}</span>
                        </div>
                      ) : null;
                    })
                  ) : (
                    <span className="text-[12px] text-text-mid font-medium italic">Không có</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-baseline gap-3 mt-6 mb-2 px-1">
            <span className="font-serif text-[32px] font-semibold text-text tracking-tight leading-none">{formatCurrency(product.price)}</span>
            {product.oldPrice && (
              <span className="text-base text-text-light/60 line-through font-medium">{formatCurrency(product.oldPrice)}</span>
            )}
            {product.discount && (
              <span className="bg-rose/10 text-rose rounded-full px-3 py-1 text-[10px] font-bold ml-1">-{product.discount}</span>
            )}
          </div>

          <div className="text-[13px] text-text-light font-medium mb-8 px-1 mt-2">
            Dung tích: <span className="text-text font-semibold ml-1">{product.vol || '30ml'}</span>
          </div>

          <div className="flex items-center gap-4 px-1">
            <div className="flex items-center bg-bg rounded-xl border border-black/5 h-12 overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-full flex items-center justify-center text-text-mid active:bg-black/5 transition-colors">
                <Minus size={18} strokeWidth={1.5} />
              </button>
              <span className="min-w-[32px] text-center text-base font-semibold text-text">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-10 h-full flex items-center justify-center text-text-mid active:bg-black/5 transition-colors">
                <Plus size={18} strokeWidth={1.5} />
              </button>
            </div>
            <button 
              onClick={addToCart}
              className="btn-outline flex-1 h-12"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              Thêm vào giỏ
            </button>
          </div>

          <button 
            onClick={addToCart}
            className="btn-primary w-full mt-4 h-14"
          >
            Mua ngay
            <ChevronRight size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Accordions */}
        <div className="bg-white mt-[-16px] rounded-t-[32px] pt-4 pb-12 shadow-[0_-8px_30px_rgba(0,0,0,0.02)] border-t border-black/5">
          <div className="border-b border-black/5 mx-6">
            <div 
              onClick={() => setActiveAcc(activeAcc === 'info' ? '' : 'info')}
              className="flex items-center gap-4 py-5 cursor-pointer active:scale-[0.99] transition-transform"
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-base font-medium transition-all duration-300 ${activeAcc === 'info' ? 'bg-text text-white shadow-md' : 'bg-black/5 text-text-light'}`}>
                {activeAcc === 'info' ? '−' : '+'}
              </div>
              <span className="font-serif text-[18px] font-semibold text-text">Công dụng</span>
            </div>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeAcc === 'info' ? 'max-h-[1000px] opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
              <div className="text-[14px] text-text-mid leading-relaxed space-y-3 font-normal">
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose/50 mt-2 flex-shrink-0" />
                  <p>Làm mờ nám, tàn nhang và đốm thâm sau mụn</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose/50 mt-2 flex-shrink-0" />
                  <p>Sáng đều tone da rõ rệt sau 4–6 tuần sử dụng</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose/50 mt-2 flex-shrink-0" />
                  <p>Bảo vệ da khỏi tác hại của gốc tự do & ô nhiễm</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose/50 mt-2 flex-shrink-0" />
                  <p>Kích thích sản sinh collagen, cải thiện kết cấu da</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-b border-black/5 mx-6">
            <div 
              onClick={() => setActiveAcc(activeAcc === 'usage' ? '' : 'usage')}
              className="flex items-center gap-4 py-5 cursor-pointer active:scale-[0.99] transition-transform"
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-base font-medium transition-all duration-300 ${activeAcc === 'usage' ? 'bg-text text-white shadow-md' : 'bg-black/5 text-text-light'}`}>
                {activeAcc === 'usage' ? '−' : '+'}
              </div>
              <span className="font-serif text-[18px] font-semibold text-text">Hướng dẫn</span>
            </div>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeAcc === 'usage' ? 'max-h-[1000px] opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
              <div className="text-[14px] text-text-mid leading-relaxed flex flex-col gap-4 pl-1">
                <div className="flex gap-4 items-center">
                  <span className="text-[24px] font-serif italic text-text/20">01.</span>
                  <p className="font-normal">Làm sạch da mặt bằng nước tẩy trang và sữa rửa mặt.</p>
                </div>
                <div className="flex gap-4 items-center">
                  <span className="text-[24px] font-serif italic text-text/20">02.</span>
                  <p className="font-normal">Sử dụng toner để cân bằng độ pH cho da.</p>
                </div>
                <div className="flex gap-4 items-center">
                  <span className="text-[24px] font-serif italic text-text/20">03.</span>
                  <p className="font-normal">Thoa một lượng serum nhẹ nhàng lên da mặt.</p>
                </div>
                <div className="flex gap-4 items-center">
                  <span className="text-[24px] font-serif italic text-text/20">04.</span>
                  <p className="font-normal">Sử dụng gel dưỡng hoặc kem dưỡng để khóa ẩm.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
