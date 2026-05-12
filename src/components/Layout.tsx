import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Zap, ShoppingBag, User, Menu, Search, ChevronLeft } from 'lucide-react';
import { ReactNode, useState, useEffect } from 'react';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
}

export default function Layout({ children, title, showBack }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('beaute_cart') || '[]');
    setCartCount(cart.reduce((acc: number, item: any) => acc + item.qty, 0));
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col items-center pb-24 bg-bg font-sans overflow-x-hidden selection:bg-rose/20">
      {/* Header */}
      <header className="sticky top-0 w-full max-w-[900px] z-[100] bg-bg/90 backdrop-blur-xl border-b border-black/5 p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          {showBack ? (
            <button 
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/50 text-text transition-all active:scale-90 shadow-sm border border-black/5"
            >
              <ChevronLeft size={22} strokeWidth={2} />
            </button>
          ) : (
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-full text-text-mid hover:text-text transition-all active:scale-90"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          )}
        </div>

        <Link to="/" className="header-logo translate-x-3">Beauté.</Link>

        <div className="flex items-center gap-3">
          {!showBack && (
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/50 text-text transition-all active:scale-90 shadow-sm border border-black/5">
              <Search size={18} strokeWidth={2} />
            </button>
          )}
          <Link 
            to="/cart" 
            className="relative bg-gradient-to-r from-rose to-rose-dark text-white rounded-2xl h-10 px-4 flex items-center gap-2 shadow-md hover:opacity-90 active:scale-95 transition-all"
          >
            <ShoppingBag size={18} strokeWidth={2} />
            <span className="hidden sm:inline font-medium text-sm">Giỏ hàng</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border border-white shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Side Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-text/30 backdrop-blur-[2px] z-[150] transition-opacity animate-in fade-in duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Side Menu */}
      <aside 
        className={`fixed top-0 left-0 h-full w-[85vw] max-w-[320px] bg-white z-[200] transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-2xl ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 flex items-center justify-between border-b border-black/5">
          <span className="font-serif text-[24px] font-semibold text-text">Beauté.</span>
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 text-text"
          >
            <ChevronLeft size={20} strokeWidth={2} />
          </button>
        </div>
        <nav className="p-6 flex flex-col gap-2">
          <Link to="/products?group=sale" className="flex items-center justify-between text-sm font-medium text-text-mid py-4 px-4 rounded-2xl hover:bg-black/5 transition-colors">
            1. Đang ưu đãi <span className="bg-gradient-to-r from-rose to-rose-dark text-white text-[9px] font-bold py-0.5 px-2.5 rounded-sm shadow-sm">Sale</span>
          </Link>
          <Link to="/products?group=bestseller" className="flex items-center text-sm font-medium text-text-mid py-4 px-4 rounded-2xl hover:bg-black/5 transition-colors">
            2. Bán chạy nhất
          </Link>
          <div className="mt-2">
            <Link to="/products" className="flex items-center text-sm font-medium text-text-mid py-4 px-4 rounded-2xl hover:bg-black/5 transition-colors">
              3. Vấn đề da
            </Link>
            <div className="flex flex-col gap-1 pl-4">
              <Link to="/products?group=lam-sach" className="py-2.5 px-4 text-[13px] text-text-mid font-medium flex items-center gap-3 hover:text-text transition-colors">
                - Làm sạch
              </Link>
              <Link to="/products?group=tri-mun" className="py-2.5 px-4 text-[13px] text-text-mid font-medium flex items-center gap-3 hover:text-text transition-colors">
                - Trị mụn
              </Link>
              <Link to="/products?group=tri-nam" className="py-2.5 px-4 text-[13px] text-text-mid font-medium flex items-center gap-3 hover:text-text transition-colors">
                - Trị nám/thâm
              </Link>
              <Link to="/products?group=khoe-da" className="py-2.5 px-4 text-[13px] text-text-mid font-medium flex items-center gap-3 hover:text-text transition-colors">
                - Dưỡng da
              </Link>
            </div>
          </div>
          <Link to="/articles" className="mt-2 flex items-center text-sm font-medium text-text-mid py-4 px-4 rounded-2xl hover:bg-black/5 transition-colors">
            4. Bài chia sẻ
          </Link>
          <div className="mt-6 pt-6 border-t border-black/5">
            <Link to="/admin/articles" className="flex items-center gap-3 text-sm font-bold text-rose py-4 px-4 rounded-2xl hover:bg-rose/5 transition-all">
              <div className="w-8 h-8 rounded-xl bg-rose/10 flex items-center justify-center text-rose shadow-inner">
                <User size={16} strokeWidth={2.5} />
              </div>
              Quản trị (Admin)
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="w-full max-w-[900px] flex flex-col flex-1">
        {children}
      </main>

      {/* Footer / MoIT Info */}
      <footer className="w-full max-w-[900px] bg-white border-t border-black/5 p-8 mt-12 mb-16 flex flex-col items-center text-center gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="font-serif text-[24px] font-semibold text-text uppercase tracking-widest">Beauté.</h3>
          <p className="text-[12px] text-text-light font-medium uppercase tracking-[3px]">Beauty Lab Vietnam</p>
        </div>
        
        <div className="flex flex-col gap-3 text-[13px] text-text-mid font-medium max-w-[400px]">
          <p>Địa chỉ: 123 Đường Láng, Phường Láng Hạ, Quận Đống Đa, Hà Nội</p>
          <div className="flex items-center justify-center gap-4">
             <a href="tel:0987654321" className="text-text hover:text-rose transition-colors">Hotline: 0987.654.321</a>
             <span className="w-px h-3 bg-black/10" />
             <a href="mailto:beautylabvn@gmail.com" className="text-text hover:text-rose transition-colors">beautylabvn@gmail.com</a>
          </div>
          <p>Mã số thuế: 0123456789 - Cấp bởi Sở KH&ĐT TP. Hà Nội</p>
        </div>

        <div className="pt-4 flex flex-col items-center gap-4">
          <a href="http://online.gov.vn/" target="_blank" rel="noopener noreferrer" className="block w-[160px] opacity-80 hover:opacity-100 transition-opacity">
            <img 
              src="https://chinhphu.vn/images/da-thong-bao-bo-cong-thuong.png" 
              alt="Đã thông báo Bộ Công Thương" 
              className="w-full h-auto"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.dmca.com/Badges/dmca_protected_sml_120n.png?ID=ed1a7d65-4f3b-4860-9b34-8c0c29f64988';
              }}
            />
          </a>
          <p className="text-[10px] text-text-light/50 font-bold uppercase tracking-widest">© 2026 Beauté. All rights reserved.</p>
        </div>
      </footer>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-[900px] mx-auto bg-white border-t border-black/5 pb-[env(safe-area-inset-bottom)] pt-1 flex justify-around items-center z-[100] shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        <Link to="/" className={`nav-btn px-4 py-3 ${location.pathname === '/' ? 'active' : ''}`}>
          <Home size={22} strokeWidth={location.pathname === '/' ? 2.5 : 1.5} />
          <span className="text-[9px] font-bold uppercase tracking-widest mt-1">Trang chủ</span>
        </Link>
        <Link to="/products?group=sale" className={`nav-btn px-4 py-3 ${location.pathname === '/products' && location.search.includes('sale') ? 'active' : ''}`}>
          <Zap size={22} strokeWidth={location.search.includes('sale') ? 2.5 : 1.5} />
          <span className="text-[9px] font-bold uppercase tracking-widest mt-1">Ưu đãi</span>
        </Link>
        <Link to="/cart" className={`nav-btn px-4 py-3 ${location.pathname === '/cart' ? 'active' : ''}`}>
          <div className="relative">
            <ShoppingBag size={22} strokeWidth={location.pathname === '/cart' ? 2.5 : 1.5} />
            {cartCount > 0 && <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose rounded-full border-2 border-white shadow-sm" />}
          </div>
          <span className="text-[9px] font-bold uppercase tracking-widest mt-1">Giỏ hàng</span>
        </Link>
        <Link to="/account" className={`nav-btn px-4 py-3 ${location.pathname === '/account' ? 'active' : ''}`}>
          <User size={22} strokeWidth={location.pathname === '/account' ? 2.5 : 1.5} />
          <span className="text-[9px] font-bold uppercase tracking-widest mt-1">Tài khoản</span>
        </Link>
      </nav>
    </div>
  );
}
