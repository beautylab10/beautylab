import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Shipping() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    ward: '',
    address: ''
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('beaute_shipping_address') || 'null');
    if (saved) setFormData(saved);
  }, []);

  const validate = () => {
    const newErrors: Record<string, boolean> = {};
    if (formData.name.trim().length < 2) newErrors.name = true;
    if (!/^[0-9]{9,11}$/.test(formData.phone.replace(/[\s.]/g, ''))) newErrors.phone = true;
    if (!formData.city) newErrors.city = true;
    if (formData.ward.trim().length < 2) newErrors.ward = true;
    if (formData.address.trim().length < 5) newErrors.address = true;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    localStorage.setItem('beaute_shipping_address', JSON.stringify({ ...formData, savedAt: Date.now() }));
    navigate('/payment');
  };

  const cities = ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng', 'An Giang', 'Bình Dương', 'Đồng Nai'];

  return (
    <Layout showBack>
      <div className="p-4 flex flex-col gap-4">
        <h1 className="font-serif text-[30px] font-bold text-text mb-1">Địa chỉ nhận hàng</h1>

        {/* Progress */}
        <div className="card p-5 shadow-sm">
          <div className="flex items-center">
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold bg-rose text-white shadow-sm">✓</div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-text">Giỏ hàng</span>
            </div>
            <div className="flex-1 h-[1px] bg-black/5 mx-2 -mt-6" />
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold border border-rose text-rose shadow-sm">2</div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-rose">Địa chỉ</span>
            </div>
            <div className="flex-1 h-[1px] bg-black/5 mx-2 -mt-6" />
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold bg-black/5 text-text-light">3</div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-text-light opacity-50">Thanh toán</span>
            </div>
          </div>
        </div>

        <div className="card flex flex-col gap-6">
          <h2 className="font-serif text-[20px] font-semibold text-text mb-1">Thông tin giao hàng</h2>
          
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-text-light uppercase tracking-widest ml-1">Họ tên <span className="text-rose">*</span></label>
              <input 
                className={`w-full bg-bg border rounded-2xl p-4 text-[15px] font-medium outline-none transition-all ${errors.name ? 'border-rose bg-rose/5' : 'border-black/5 focus:border-rose focus:bg-white'}`}
                placeholder="Nguyễn Thị Lan"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-text-light uppercase tracking-widest ml-1">Số điện thoại <span className="text-rose">*</span></label>
              <input 
                className={`w-full bg-bg border rounded-2xl p-4 text-[15px] font-medium outline-none transition-all ${errors.phone ? 'border-rose bg-rose/5' : 'border-black/5 focus:border-rose focus:bg-white'}`}
                placeholder="091x xxx xxx"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-text-light uppercase tracking-widest ml-1">Thành phố / Tỉnh <span className="text-rose">*</span></label>
              <select 
                className={`w-full bg-bg border rounded-2xl p-4 text-[15px] font-medium outline-none appearance-none transition-all ${errors.city ? 'border-rose bg-rose/5' : 'border-black/5 focus:border-rose focus:bg-white'}`}
                style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23A39699' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center'}}
                value={formData.city}
                onChange={e => setFormData({...formData, city: e.target.value})}
              >
                <option value="" disabled>Chọn thành phố</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-text-light uppercase tracking-widest ml-1">Địa chỉ cụ thể <span className="text-rose">*</span></label>
              <textarea 
                className={`w-full bg-bg border rounded-2xl p-4 text-[15px] font-medium outline-none transition-all min-h-[100px] ${errors.address ? 'border-rose bg-rose/5' : 'border-black/5 focus:border-rose focus:bg-white'}`}
                placeholder="Số nhà, tên đường, phường/xã..."
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
              />
            </div>
          </div>
        </div>

        <button 
          onClick={handleSubmit}
          className="btn-primary w-full h-15 mt-2"
        >
          Tiếp tục thanh toán
          <ChevronRight size={18} strokeWidth={2} />
        </button>
      </div>
    </Layout>
  );
}
