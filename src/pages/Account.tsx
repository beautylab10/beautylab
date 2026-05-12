import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import { LogOut, Key, Target, Award, Package, Star, Heart } from 'lucide-react';

export default function Account() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditingSkin, setIsEditingSkin] = useState(false);
  const [skinIssues, setSkinIssues] = useState<string[]>(['Mụn']);
  
  const allIssues = ['Mụn', 'Nám/Tàn nhang', 'Thâm', 'Lão hóa', 'Nhạy cảm', 'Sẹo', 'Lỗ chân lông'];

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('beaute_loggedin') === '1');
    const savedSkin = JSON.parse(localStorage.getItem('beaute_skin') || '["Mụn"]');
    setSkinIssues(savedSkin);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('beaute_loggedin', '1');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('beaute_loggedin');
    setIsLoggedIn(false);
  };

  const toggleSkinTag = (tag: string) => {
    if (skinIssues.includes(tag)) {
      setSkinIssues(skinIssues.filter(t => t !== tag));
    } else {
      setSkinIssues([...skinIssues, tag]);
    }
  };

  const saveSkin = () => {
    localStorage.setItem('beaute_skin', JSON.stringify(skinIssues));
    setIsEditingSkin(false);
  };

  return (
    <Layout showBack>
      <div className="p-4 flex flex-col gap-6 animate-in fade-in duration-500 pb-12">
        <h1 className="font-serif text-[32px] font-bold text-text mb-1 px-1">Tài khoản</h1>

        {!isLoggedIn ? (
          <div className="card shadow-md p-8">
            <h2 className="font-serif text-[24px] font-bold text-text mb-6">Chào mừng bạn!</h2>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-text-light uppercase tracking-widest ml-1">Số điện thoại / Email</label>
                <input className="w-full bg-bg border border-black/5 rounded-2xl p-4 text-[15px] font-medium outline-none focus:border-rose/30 transition-all" placeholder="091x xxx xxx" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-text-light uppercase tracking-widest ml-1">Mật khẩu</label>
                <input className="w-full bg-bg border border-black/5 rounded-2xl p-4 text-[15px] font-medium outline-none focus:border-rose/30 transition-all" type="password" placeholder="••••••••" />
              </div>
              <button 
                onClick={handleLogin}
                className="btn-primary w-full h-15 mt-2"
              >
                Đăng nhập ngay
              </button>
              <div className="text-[14px] text-text-light font-bold text-center mt-4">
                Chưa có tài khoản? <span className="text-rose underline underline-offset-4 cursor-pointer">Bắt đầu ngay</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* User Info */}
            <div className="card shadow-sm p-6">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-[28px] bg-gradient-to-br from-rose to-rose-dark flex items-center justify-center font-serif text-[32px] font-bold text-white shadow-lg shadow-rose/20">
                  N
                </div>
                <div>
                  <div className="font-serif text-[24px] font-bold text-text leading-tight">Nguyễn Thị Lan</div>
                  <div className="text-[12px] text-text-light font-bold mt-1 opacity-70 tracking-wide">Thành viên từ 01.2025</div>
                </div>
              </div>
            </div>

            {/* Loyalty */}
            <div className="bg-gradient-to-br from-gold to-[#D4B589] rounded-[32px] p-6 flex flex-col gap-6 shadow-xl shadow-gold/20 relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-700" />
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <div className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1">Cấp độ</div>
                  <div className="font-serif text-[28px] font-bold text-white leading-none">Diamond Member ✦</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-[24px] shadow-inner">
                  👑
                </div>
              </div>
              <div className="flex items-center justify-between relative z-10 pt-2">
                 <div className="flex flex-col">
                    <div className="text-[10px] text-white/70 font-bold uppercase tracking-widest mb-1">Số dư điểm</div>
                    <div className="font-serif text-[24px] font-bold text-white">2.500.000đ</div>
                 </div>
                 <button className="bg-white/90 backdrop-blur-sm text-gold rounded-xl px-4 py-2.5 text-[12px] font-bold shadow-md hover:bg-white transition-colors">
                    Đổi quà
                 </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-[24px] p-5 text-center border border-black/5 shadow-sm">
                <div className="font-serif text-[24px] font-semibold text-rose leading-none mb-1">12</div>
                <div className="text-[10px] text-text-light font-bold uppercase tracking-widest">Đơn hàng</div>
              </div>
              <div className="bg-white rounded-[24px] p-5 text-center border border-black/5 shadow-sm">
                <div className="font-serif text-[24px] font-semibold text-rose leading-none mb-1">4.9★</div>
                <div className="text-[10px] text-text-light font-bold uppercase tracking-widest">Đánh giá</div>
              </div>
              <div className="bg-white rounded-[24px] p-5 text-center border border-black/5 shadow-sm">
                <div className="font-serif text-[24px] font-semibold text-rose leading-none mb-1">8</div>
                <div className="text-[10px] text-text-light font-bold uppercase tracking-widest">Hot items</div>
              </div>
            </div>

            {/* Skin Issues */}
            <div className="card shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif text-[20px] font-bold text-text">Tình trạng da</h2>
                <button 
                  onClick={() => setIsEditingSkin(!isEditingSkin)}
                  className="bg-black/5 text-text-mid px-4 py-2 rounded-xl text-[12px] font-bold transition-all hover:bg-black/10 active:scale-95"
                >
                  {isEditingSkin ? 'HUỶ' : 'CHỈNH SỬA'}
                </button>
              </div>
              {isEditingSkin && <div className="text-[11px] text-text-light mb-4 font-medium tracking-wide">Chọn các vấn đề bạn đang quan tâm</div>}
              <div className="flex flex-wrap gap-2">
                {(isEditingSkin ? allIssues : skinIssues).map(tag => (
                  <button 
                    key={tag}
                    disabled={!isEditingSkin}
                    onClick={() => isEditingSkin && toggleSkinTag(tag)}
                    className={`rounded-full py-2 px-6 text-[13px] font-medium transition-all duration-300 border shadow-sm
                      ${skinIssues.includes(tag) ? 'bg-text border-text text-white shadow-md' : 'bg-white border-black/5 text-text-mid hover:border-black/10'}
                    `}
                  >
                    {tag} {isEditingSkin && skinIssues.includes(tag) && <span className="ml-1 opacity-70">✓</span>}
                  </button>
                ))}
              </div>
              {isEditingSkin && (
                <button 
                  onClick={saveSkin}
                  className="btn-primary w-full mt-6 h-12 text-[14px]"
                >
                  Lưu hồ sơ da
                </button>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-2">
              <button className="btn-outline w-full h-14 bg-white! border-rose/10!">
                <Key size={18} strokeWidth={2.5} /> Đổi mật khẩu bảo mật
              </button>
              <button 
                onClick={handleLogout}
                className="btn-outline w-full h-14 border-rose/10! text-rose-dark shadow-sm!"
              >
                <LogOut size={18} strokeWidth={2.5} /> Đăng xuất tài khoản
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
