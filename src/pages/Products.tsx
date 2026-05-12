import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useSearchParams } from 'react-router-dom';
import { INITIAL_PRODUCTS } from '../data';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal } from 'lucide-react';

export default function Products() {
  const [searchParams] = useSearchParams();
  const group = searchParams.get('group') || 'all';
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sort, setSort] = useState<'none' | 'asc' | 'desc'>('none');
  const [activePrice, setActivePrice] = useState<string | null>(null);
  
  const catalog = JSON.parse(localStorage.getItem('beaute_catalog') || JSON.stringify(INITIAL_PRODUCTS));
  
  let filtered = group === 'all' 
    ? catalog 
    : catalog.filter((p: any) => p.groups?.includes(group));

  // Sort
  if (sort === 'asc') filtered.sort((a: any, b: any) => a.price - b.price);
  if (sort === 'desc') filtered.sort((a: any, b: any) => b.price - a.price);

  const getTitle = () => {
    switch(group) {
      case 'sale': return 'Sản phẩm Sale';
      case 'bestseller': return 'Mua nhiều nhất';
      case 'lam-sach': return 'Làm sạch da';
      case 'tri-mun': return 'Điều trị mụn';
      case 'tri-nam': return 'Mờ nám & thâm';
      case 'khoe-da': return 'Dưỡng da khỏe';
      case 'obagi': return 'Thương hiệu Obagi';
      case 'la-roche': return 'La Roche-Posay';
      case 'some-by-mi': return 'Some By Mi';
      case 'comfort-zone': return 'Comfort Zone';
      default: return 'Tất cả sản phẩm';
    }
  };

  return (
    <Layout showBack>
      <div className="p-4 flex flex-col gap-4">
        <h1 className="font-serif text-[28px] font-bold text-text">{getTitle()}</h1>

        {/* Filter Bar */}
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-extrabold text-text-mid uppercase tracking-wide">Bộ lọc & Sắp xếp</span>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="bg-rose/10 text-rose rounded-full px-3.5 py-1.5 text-[13px] font-bold flex items-center gap-1.5"
            >
              Lọc <SlidersHorizontal size={14} />
            </button>
          </div>
          
          {isFilterOpen && (
            <div className="mt-4 pt-4 border-t border-rose-dark/10 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div>
                <div className="text-[11px] font-extrabold text-text-light uppercase tracking-wider mb-2.5">Sắp xếp theo giá</div>
                <div className="flex gap-2 flex-wrap">
                  <button 
                    onClick={() => setSort('none')}
                    className={`rounded-full px-4 py-2 text-[13px] font-bold border transition-all ${sort === 'none' ? 'bg-rose text-white border-rose' : 'bg-bg text-text-mid border-rose-dark/20'}`}
                  >Mặc định</button>
                  <button 
                    onClick={() => setSort('asc')}
                    className={`rounded-full px-4 py-2 text-[13px] font-bold border transition-all ${sort === 'asc' ? 'bg-rose text-white border-rose' : 'bg-bg text-text-mid border-rose-dark/20'}`}
                  >Thấp → Cao</button>
                  <button 
                    onClick={() => setSort('desc')}
                    className={`rounded-full px-4 py-2 text-[13px] font-bold border transition-all ${sort === 'desc' ? 'bg-rose text-white border-rose' : 'bg-bg text-text-mid border-rose-dark/20'}`}
                  >Cao → Thấp</button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-[13px] text-text-light font-semibold">
          Hiển thị <span className="text-rose font-extrabold">{filtered.length}</span> sản phẩm
        </div>

        <div className="grid grid-cols-3 gap-3">
          {filtered.map((p: any) => (
            <ProductCard key={p.id} product={p as any} type="category" />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-text-light italic">
            Chưa có sản phẩm nào trong mục này 🌸
          </div>
        )}
      </div>
    </Layout>
  );
}
