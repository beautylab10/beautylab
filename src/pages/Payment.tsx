import Layout from '../components/Layout';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Copy, CheckCircle2, Phone, Camera, ChevronRight, X } from 'lucide-react';

export default function Payment() {
  const navigate = useNavigate();
  const [payOption, setPayOption] = useState<'full' | 'partial'>('full');
  const [file, setFile] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Đã sao chép: ' + text);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      const reader = new FileReader();
      reader.onload = (ev) => setFile(ev.target?.result as string);
      reader.readAsDataURL(f);
    }
  };

  const handleSubmit = () => {
    if (!file) {
      alert('Vui lòng tải ảnh xác nhận chuyển khoản');
      return;
    }
    setIsSuccess(true);
  };

  const finishOrder = () => {
    localStorage.removeItem('beaute_cart');
    navigate('/');
  };

  return (
    <Layout showBack>
      <div className="p-4 flex flex-col gap-4">
        <h1 className="font-serif text-[30px] font-bold text-text mb-1">Thanh toán</h1>

        {/* Success Modal */}
        {isSuccess && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[200] flex items-center justify-center p-6 text-center">
            <div className="bg-white rounded-[32px] p-8 pb-10 w-full max-w-[340px] shadow-2xl animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4 border border-success/10">
                <CheckCircle2 size={32} className="text-success" />
              </div>
              <h3 className="font-serif text-[24px] font-semibold text-text mb-2">Gửi thành công!</h3>
              <p className="text-[14px] text-text-mid leading-relaxed mb-8">
                Nhân viên Beauté 091.234.5678 sẽ nhắn tin xác nhận trong vòng 24h.
              </p>
              <button 
                onClick={finishOrder}
                className="btn-primary w-full h-12"
              >
                Về trang chủ
              </button>
            </div>
          </div>
        )}

        {/* Warning card */}
        <div className="card bg-[#FFF1F3] border-rose/10 p-5">
           <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm">
              <AlertCircle size={20} className="text-rose" />
           </div>
           <h3 className="font-serif text-[18px] font-semibold text-text mb-1.5">Chúng mình không nhận COD</h3>
           <p className="text-[13px] text-text-mid leading-relaxed">
             Mỹ phẩm dễ hỏng khi vận chuyển nhiều lần nên chúng mình chỉ nhận chuyển khoản trước. Cảm ơn bạn đã thấu hiểu 😊
           </p>
        </div>

        {/* Payment Methods */}
        <div className="card flex flex-col gap-4">
           <div className="flex items-center gap-2.5 mb-1">
              <div className="w-7 h-7 rounded-sm bg-text text-white text-[12px] font-bold flex items-center justify-center shadow-sm">2</div>
              <span className="font-serif text-[20px] font-semibold text-text">Chuyển khoản</span>
           </div>

           <div className="flex flex-col gap-2.5">
              <button 
                onClick={() => setPayOption('full')}
                className={`flex items-center gap-3 p-3.5 rounded-[16px] border transition-all ${payOption === 'full' ? 'border-rose bg-rose/5' : 'border-black/5 bg-white'}`}
              >
                 <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${payOption === 'full' ? 'border-rose' : 'border-black/20'}`}>
                    {payOption === 'full' && <div className="w-2.5 h-2.5 rounded-full bg-rose" />}
                 </div>
                 <div className="text-left">
                    <div className="text-[14px] font-semibold text-text">Toàn bộ số tiền</div>
                    <div className="text-[11px] text-text-light font-medium tracking-wide">Chuyển 100% giá trị đơn hàng</div>
                 </div>
              </button>
              <button 
                onClick={() => setPayOption('partial')}
                className={`flex items-center gap-3 p-3.5 rounded-[16px] border transition-all ${payOption === 'partial' ? 'border-rose bg-rose/5' : 'border-black/5 bg-white'}`}
              >
                 <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${payOption === 'partial' ? 'border-rose' : 'border-black/20'}`}>
                    {payOption === 'partial' && <div className="w-2.5 h-2.5 rounded-full bg-rose" />}
                 </div>
                 <div className="text-left">
                    <div className="text-[14px] font-semibold text-text">Cọc tối thiểu 50.000đ</div>
                    <div className="text-[11px] text-text-light font-medium tracking-wide">Phần còn lại thanh toán khi nhận hàng</div>
                 </div>
              </button>
           </div>

           <div className="h-[1px] bg-gradient-to-r from-transparent via-rose-dark/15 to-transparent my-1" />

           <div className="flex flex-col gap-3 py-1">
              <div className="flex justify-between items-center py-2 border-b border-black/5">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-text-light uppercase tracking-widest">Ngân hàng</span>
                  <span className="text-[15px] font-semibold text-text">Vietcombank</span>
                </div>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-black/5">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-text-light uppercase tracking-widest">Số tài khoản</span>
                  <span className="text-[15px] font-semibold text-text tracking-wide">1234 5678 9012</span>
                </div>
                <button onClick={() => copyToClipboard('123456789012')} className="text-rose text-[12px] font-bold flex items-center gap-1.5 hover:underline">
                   Sao chép <Copy size={12} />
                </button>
              </div>
              <div className="flex justify-between items-center py-2">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-text-light uppercase tracking-widest">Chủ tài khoản</span>
                  <span className="text-[15px] font-bold text-text uppercase">Nguyen Thi Hoa</span>
                </div>
              </div>
           </div>

           <div className="bg-gold/5 border border-gold/10 rounded-[16px] p-4 flex gap-3 mt-1">
              <span className="text-lg">📝</span>
              <div className="text-[13px] text-text-mid leading-relaxed">
                Nội dung CK: <span className="text-text font-bold">số điện thọai của bạn</span><br />
                Ví dụ: <span className="text-text font-bold">0912 345 678</span>
              </div>
           </div>
        </div>

        {/* Contact/Verification */}
        <div className="card">
           <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-rose to-rose-dark text-white text-[13px] font-extrabold flex items-center justify-center shadow-md">3</div>
              <span className="font-serif text-xl font-bold text-text">Xác nhận đơn hàng</span>
           </div>
           
           <div className="bg-bg rounded-[16px] p-4 flex gap-3.5 items-start">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blush to-blush-deep flex items-center justify-center flex-shrink-0">
                 <Phone size={22} className="text-white" />
              </div>
              <div>
                 <div className="text-[13px] font-bold text-text-light">Nhân viên Beauté</div>
                 <div className="text-[18px] font-extrabold text-rose">091.234.5678</div>
                 <div className="text-[12px] text-text-light mt-1.5 leading-relaxed">
                   Sẽ nhắn tin mã vận đơn trong vòng 24h sau khi nhận được chuyển khoản.
                 </div>
              </div>
           </div>
        </div>

        {/* Upload Screenshot */}
        <div className="card">
           <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-rose to-rose-dark text-white text-[13px] font-extrabold flex items-center justify-center shadow-md">4</div>
              <span className="font-serif text-xl font-bold text-text">Tải ảnh giao dịch</span>
           </div>

           <div className={`relative border-2 border-dashed rounded-[20px] p-8 flex flex-col items-center gap-2.5 transition-all text-center ${file ? 'border-rose' : 'border-rose-dark/30'}`}>
              {!file ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-rose/10 flex items-center justify-center text-rose mb-1">
                    <Camera size={26} />
                  </div>
                  <div className="text-[15px] font-bold text-text">Tải ảnh lên</div>
                  <div className="text-[12px] text-text-light leading-relaxed">Chụp màn hình xác nhận chuyển khoản<br/>rồi tải lên tại đây</div>
                </>
              ) : (
                <div className="relative w-full">
                  <img src={file} alt="Receipt" className="w-full rounded-[14px] max-h-[200px] object-cover" />
                  <button 
                    onClick={() => setFile(null)}
                    className="absolute -top-2 -right-2 bg-rose text-white w-7 h-7 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
           </div>
        </div>

        <button 
          onClick={handleSubmit}
          className="w-full bg-gradient-to-br from-rose to-rose-dark text-white rounded-full py-4 text-base font-extrabold shadow-xl shadow-rose/40 active:scale-[0.97] transition-all flex items-center justify-center gap-2.5"
        >
          Hoàn tất đơn hàng
          <ChevronRight size={18} strokeWidth={2.5} />
        </button>
      </div>
    </Layout>
  );
}
