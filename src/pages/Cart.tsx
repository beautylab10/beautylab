import Layout from '../components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { formatCurrency } from '../utils';
import { Minus, Plus, X, ChevronRight, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('beaute_cart') || '[]');
    setCart(savedCart);
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('beaute_cart', JSON.stringify(newCart));
  };

  const updateQty = (id: string, delta: number) => {
    const newCart = cart.map(item => {
      if (item.id === id) {
        return { ...item, qty: Math.max(1, item.qty + delta) };
      }
      return item;
    });
    saveCart(newCart);
  };

  const removeItem = (id: string) => {
    saveCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = subtotal >= 300000 ? 0 : 30000;
  const total = subtotal - discount + shipping;

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'BEAUTE10') {
      setDiscount(Math.round(subtotal * 0.1));
    } else {
      setDiscount(0);
      alert('Mã không hợp lệ');
    }
  };

  if (cart.length === 0) {
    return (
      <Layout showBack>
        <div className="p-10 flex flex-col items-center text-center gap-4">
          <div className="w-[72px] h-[72px] rounded-full bg-rose/10 flex items-center justify-center text-rose">
            <ShoppingBag size={32} strokeWidth={1.5} />
          </div>
          <h2 className="font-serif text-[22px] font-bold text-text">Giỏ hàng trống</h2>
          <p className="text-sm text-text-light leading-relaxed">Bạn chưa có sản phẩm nào.<br />Khám phá ngay nhé!</p>
          <Link to="/" className="btn-primary py-3.5 px-7 mt-2">
            Khám phá ngay
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showBack>
      <div className="p-4 flex flex-col gap-5 pb-12 animate-in fade-in duration-500">
        <h1 className="font-serif text-[32px] font-bold text-text mb-1 px-1">Giỏ hàng</h1>

        {/* Progress */}
        <div className="card p-5 shadow-sm">
          <div className="flex items-center">
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-medium bg-rose text-white shadow-md">1</div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-text">Giỏ hàng</span>
            </div>
            <div className="flex-1 h-[1px] bg-black/5 mx-2 -mt-6" />
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-medium bg-black/5 text-text-light border border-black/5 opacity-60">2</div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-text-light opacity-60">Địa chỉ</span>
            </div>
            <div className="flex-1 h-[1px] bg-black/5 mx-2 -mt-6" />
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-medium bg-black/5 text-text-light border border-black/5 opacity-60">3</div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-text-light opacity-60">Thanh toán</span>
            </div>
          </div>
        </div>

        {/* Item List */}
        <div className="flex flex-col gap-4">
          {cart.map(item => (
            <div key={item.id} className="bg-white rounded-[16px] p-4 flex gap-4 border border-black/5 shadow-sm group relative overflow-hidden">
              <div className="w-22 h-22 rounded-[12px] bg-bg/50 p-2 flex items-center justify-center border border-black/5 flex-shrink-0">
                <img src={item.img} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <div className="flex-1 min-w-0 pr-6">
                <div className="text-[10px] font-bold text-text-light uppercase tracking-widest mb-1">{item.brand}</div>
                <div className="text-[14px] font-medium text-text leading-tight mb-3 line-clamp-2">{item.name}</div>
                <div className="flex items-center justify-between">
                  <div className="font-serif text-[16px] font-semibold text-text">{formatCurrency(item.price * item.qty)}</div>
                  <div className="flex items-center bg-bg rounded-lg border border-black/5 h-9 overflow-hidden">
                    <button onClick={() => updateQty(item.id, -1)} className="w-9 h-full flex items-center justify-center text-text-mid active:bg-black/5">
                      <Minus size={14} strokeWidth={2} />
                    </button>
                    <span className="min-w-[28px] text-center text-xs font-semibold text-text">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="w-9 h-full flex items-center justify-center text-text-mid active:bg-black/5">
                      <Plus size={14} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => removeItem(item.id)}
                className="absolute top-4 right-4 text-text-light hover:text-rose transition-colors p-1"
                aria-label="Remove item"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>
          ))}
        </div>

        {/* Promo */}
        <div className="card shadow-sm p-4">
          <div className="flex gap-2.5">
            <input 
              type="text" 
              placeholder="Mã ưu đãi (BEAUTE10)"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 bg-bg border border-black/5 rounded-xl p-3.5 text-sm font-medium text-text outline-none focus:border-black/20 transition-all placeholder:text-text-light/50"
            />
            <button 
              onClick={applyPromo}
              className="bg-gradient-to-r from-rose to-rose-dark text-white rounded-xl px-6 py-3.5 text-sm font-medium shadow-sm hover:opacity-90 active:scale-95 transition-all"
            >
              Dùng
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="card shadow-sm p-6 flex flex-col gap-4">
          <h2 className="font-serif text-[18px] font-semibold text-text px-1">Đơn hàng của bạn</h2>
          <div className="space-y-4 px-1">
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-text-light font-medium">Tạm tính</span>
              <span className="font-semibold text-text-mid">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-text-light font-medium">Phí ship</span>
              <span className="font-semibold text-success">{shipping === 0 ? 'MIỄN PHÍ' : formatCurrency(shipping)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between items-center text-[13px] text-rose">
                <span className="font-semibold">Ưu đãi giảm</span>
                <span className="font-semibold">-{formatCurrency(discount)}</span>
              </div>
            )}
            <div className="h-[1px] bg-black/5 my-2" />
            <div className="flex justify-between items-center py-2">
              <span className="text-[15px] font-semibold text-text">Thành tiền</span>
              <span className="font-serif text-[24px] font-semibold text-text leading-none">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => navigate('/shipping')}
          className="btn-primary w-full h-14 mt-2 shadow-xl shadow-black/5"
        >
          Tiếp tục đặt hàng
          <ChevronRight size={18} strokeWidth={2} />
        </button>
      </div>
    </Layout>
  );
}
