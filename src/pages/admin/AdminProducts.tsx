import React, { useState } from 'react';
import { 
  Plus, Trash2, Edit, Save, X, Package, Tag, Building2, 
  ChevronDown, ChevronUp, Search, Info 
} from 'lucide-react';
import { INITIAL_PRODUCTS } from '../../data';
import { AdminLayout, AdminPagination } from './AdminComponents';
import { Product } from '../../types';

export default function AdminProducts() {
  const [tab, setTab] = useState(0); // 0: Brands, 1: Categories, 2: Products
  
  // States for all data
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  
  // Derived data for brands and categories (simplified)
  const [brands, setBrands] = useState<{id: string, name: string}[]>(() => {
    const unique = Array.from(new Set(INITIAL_PRODUCTS.map(p => p.brand)));
    return unique.map((name, i) => ({ id: `brand-${i}`, name }));
  });
  
  const [categories, setCategories] = useState<{id: string, name: string}[]>(() => {
    const unique = Array.from(new Set(INITIAL_PRODUCTS.map(p => p.type).filter(Boolean)));
    return unique.map((name, i) => ({ id: `cat-${i}`, name: name as string }));
  });

  const [confirmConfig, setConfirmConfig] = useState<{message: string, action: () => void} | null>(null);

  return (
    <AdminLayout title="Quản lý kho hàng">
      <div className="flex flex-col h-full overflow-hidden">
        <div className="bg-white px-6 py-3 border border-black/5 rounded-2xl mb-6 shrink-0 shadow-sm">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button 
              onClick={() => setTab(0)}
              className={`text-[11px] font-black px-4 py-2 rounded-xl transition-all whitespace-nowrap uppercase tracking-wider shadow-sm ${
                tab === 0 ? "bg-amber-500 text-white" : "bg-white text-slate-500 border border-black/5"
              }`}
            >
              1. Hãng SX
            </button>
            <button 
              onClick={() => setTab(1)}
              className={`text-[11px] font-black px-4 py-2 rounded-xl transition-all whitespace-nowrap uppercase tracking-wider shadow-sm ${
                tab === 1 ? "bg-amber-500 text-white" : "bg-white text-slate-500 border border-black/5"
              }`}
            >
              2. Phân loại
            </button>
            <button 
              onClick={() => setTab(2)}
              className={`text-[11px] font-black px-4 py-2 rounded-xl transition-all whitespace-nowrap uppercase tracking-wider shadow-sm ${
                tab === 2 ? "bg-amber-500 text-white" : "bg-white text-slate-500 border border-black/5"
              }`}
            >
              3. Sản phẩm
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {tab === 0 && <BrandsManager brands={brands} onUpdateBrands={setBrands} setConfirmConfig={setConfirmConfig} />}
          {tab === 1 && <CategoriesManager categories={categories} onUpdateCategories={setCategories} setConfirmConfig={setConfirmConfig} />}
          {tab === 2 && <ProductsManager products={products} brands={brands} categories={categories} onUpdateProducts={setProducts} setConfirmConfig={setConfirmConfig} />}
        </div>

        {confirmConfig && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-[24px] p-6 w-full max-w-sm shadow-2xl">
              <div className="flex flex-col items-center justify-center text-center">
                <h3 className="text-xl font-bold text-slate-800 mb-2">Xác nhận</h3>
                <p className="text-slate-500 mb-6">{confirmConfig.message}</p>
                <div className="flex w-full gap-3">
                  <button onClick={() => setConfirmConfig(null)} className="flex-1 py-3.5 font-bold text-slate-500 bg-slate-100 rounded-xl">Hủy</button>
                  <button onClick={() => { confirmConfig.action(); setConfirmConfig(null); }} className="flex-1 py-3.5 font-bold text-white bg-amber-500 rounded-xl shadow-lg">Đồng ý</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

function BrandsManager({ brands, onUpdateBrands, setConfirmConfig }: any) {
  const [newName, setNewName] = useState('');
  const [editingId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleAdd = () => {
    if (!newName.trim()) return;
    const newBrand = { id: `brand-${Date.now()}`, name: newName.trim() };
    onUpdateBrands([...brands, newBrand]);
    setNewName('');
  };

  const handleUpdate = (id: string) => {
    if (!editName.trim()) return;
    onUpdateBrands(brands.map((b: any) => b.id === id ? { ...b, name: editName.trim() } : b));
    setEditId(null);
  };

  const handleDelete = (id: string) => {
    setConfirmConfig({
      message: "Bạn có chắc chắn muốn xóa hãng này?",
      action: () => onUpdateBrands(brands.filter((b: any) => b.id !== id))
    });
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white p-4 rounded-3xl border border-black/5 shadow-sm">
        <input 
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nhập tên hãng mới..."
          className="flex-1 min-w-0 bg-slate-50 rounded-xl px-4 py-3 text-sm font-bold outline-none border-2 border-transparent focus:border-amber-300 transition-colors"
        />
        <button onClick={handleAdd} className="bg-amber-500 text-white px-6 py-3 rounded-xl font-bold active:scale-95 shadow-lg shadow-amber-200">Tạo</button>
      </div>
      
      <div className="bg-white rounded-3xl overflow-hidden border border-black/5 flex flex-col flex-1 shadow-sm">
        <div className="flex px-4 py-3 bg-slate-50 border-b border-black/5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <div className="w-12 text-center">STT</div>
          <div className="flex-1 px-4">Tên hãng</div>
          <div className="w-24 text-right">Thao tác</div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {brands.map((brand: any, i: number) => (
            <div key={brand.id} className="flex items-center px-2 py-2 hover:bg-slate-50 rounded-2xl transition-colors group">
              <div className="w-12 text-center text-xs font-bold text-slate-400">{i + 1}</div>
              <div className="flex-1 px-4">
                {editingId === brand.id ? (
                  <input 
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    autoFocus
                    className="w-full bg-white border-b-2 border-amber-500 px-2 py-1 outline-none text-sm font-bold"
                  />
                ) : (
                  <span className="text-sm font-bold text-slate-700">{brand.name}</span>
                )}
              </div>
              <div className="w-24 flex items-center justify-end gap-1">
                {editingId === brand.id ? (
                  <button onClick={() => handleUpdate(brand.id)} className="p-2 text-white bg-amber-500 rounded-lg"><Save size={14} /></button>
                ) : (
                  <button onClick={() => { setEditId(brand.id); setEditName(brand.name); }} className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg group-hover:opacity-100 opacity-0 transition-opacity"><Edit size={14} /></button>
                )}
                <button onClick={() => handleDelete(brand.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg group-hover:opacity-100 opacity-0 transition-opacity"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CategoriesManager({ categories, onUpdateCategories, setConfirmConfig }: any) {
  const [newName, setNewName] = useState('');
  const [editingId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleAdd = () => {
    if (!newName.trim()) return;
    const newCat = { id: `cat-${Date.now()}`, name: newName.trim() };
    onUpdateCategories([...categories, newCat]);
    setNewName('');
  };

  const handleUpdate = (id: string) => {
    if (!editName.trim()) return;
    onUpdateCategories(categories.map((c: any) => c.id === id ? { ...c, name: editName.trim() } : c));
    setEditId(null);
  };

  const handleDelete = (id: string) => {
    setConfirmConfig({
      message: "Bạn có chắc chắn muốn xóa phân loại này?",
      action: () => onUpdateCategories(categories.filter((c: any) => c.id !== id))
    });
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white p-4 rounded-3xl border border-black/5 shadow-sm">
        <input 
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nhập tên loại sản phẩm mới..."
          className="flex-1 min-w-0 bg-slate-50 rounded-xl px-4 py-3 text-sm font-bold outline-none border-2 border-transparent focus:border-amber-300 transition-colors"
        />
        <button onClick={handleAdd} className="bg-amber-500 text-white px-6 py-3 rounded-xl font-bold active:scale-95 shadow-lg shadow-amber-200">Tạo</button>
      </div>
      
      <div className="bg-white rounded-3xl overflow-hidden border border-black/5 flex flex-col flex-1 shadow-sm">
        <div className="flex px-4 py-3 bg-slate-50 border-b border-black/5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <div className="w-12 text-center">STT</div>
          <div className="flex-1 px-4">Tên loại</div>
          <div className="w-24 text-right">Thao tác</div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {categories.map((cat: any, i: number) => (
            <div key={cat.id} className="flex items-center px-2 py-2 hover:bg-slate-50 rounded-2xl transition-colors group">
              <div className="w-12 text-center text-xs font-bold text-slate-400">{i + 1}</div>
              <div className="flex-1 px-4">
                {editingId === cat.id ? (
                  <input 
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    autoFocus
                    className="w-full bg-white border-b-2 border-amber-500 px-2 py-1 outline-none text-sm font-bold"
                  />
                ) : (
                  <span className="text-sm font-bold text-slate-700">{cat.name}</span>
                )}
              </div>
              <div className="w-24 flex items-center justify-end gap-1">
                {editingId === cat.id ? (
                  <button onClick={() => handleUpdate(cat.id)} className="p-2 text-white bg-amber-500 rounded-lg"><Save size={14} /></button>
                ) : (
                  <button onClick={() => { setEditId(cat.id); setEditName(cat.name); }} className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg group-hover:opacity-100 opacity-0 transition-opacity"><Edit size={14} /></button>
                )}
                <button onClick={() => handleDelete(cat.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg group-hover:opacity-100 opacity-0 transition-opacity"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductsManager({ products, brands, categories, onUpdateProducts, setConfirmConfig }: any) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [brandId, setBrandId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('0');
  
  const [details, setDetails] = useState({
    importPrice: '',
    sellingPrice: '',
    costPrice: '',
    weight: '',
    usage: '',
    description: '',
    strength: '',
    daysToUse: ''
  });

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleSave = () => {
    if (!name || !brandId || !categoryId) return;
    
    const brand = brands.find((b: any) => b.id === brandId)?.name || '';
    const type = categories.find((c: any) => c.id === categoryId)?.name || '';

    const newProductData: Partial<Product> = {
      name,
      brand,
      type,
      price: Number(price),
      details: {
        importPrice: details.importPrice ? Number(details.importPrice) : undefined,
        sellingPrice: details.sellingPrice ? Number(details.sellingPrice) : undefined,
        costPrice: details.costPrice ? Number(details.costPrice) : undefined,
        weight: details.weight || undefined,
        usage: details.usage || undefined,
        description: details.description || undefined,
        strength: details.strength || undefined,
        daysToUse: details.daysToUse ? Number(details.daysToUse) : undefined,
      }
    };

    if (editingId) {
      onUpdateProducts(products.map((p: any) => p.id === editingId ? { ...p, ...newProductData } : p));
    } else {
      onUpdateProducts([{ 
        id: `prod-${Date.now()}`, 
        img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=200&auto=format&fit=crop',
        ...newProductData 
      } as Product, ...products]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setBrandId('');
    setCategoryId('');
    setPrice('0');
    setDetails({
      importPrice: '',
      sellingPrice: '',
      costPrice: '',
      weight: '',
      usage: '',
      description: '',
      strength: '',
      daysToUse: ''
    });
    setEditId(null);
    setIsAdding(false);
  };

  const startEdit = (p: Product) => {
    setName(p.name);
    const b = brands.find((brand: any) => brand.name === p.brand);
    setBrandId(b ? b.id : '');
    const c = categories.find((cat: any) => cat.name === p.type);
    setCategoryId(c ? c.id : '');
    setPrice(p.price.toString());
    
    if (p.details) {
      setDetails({
        importPrice: p.details.importPrice?.toString() || '',
        sellingPrice: p.details.sellingPrice?.toString() || '',
        costPrice: p.details.costPrice?.toString() || '',
        weight: p.details.weight || '',
        usage: p.details.usage || '',
        description: p.details.description || '',
        strength: p.details.strength || '',
        daysToUse: p.details.daysToUse?.toString() || ''
      });
    }
    
    setEditId(p.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    setConfirmConfig({
      message: "Bạn có chắc chắn muốn xóa sản phẩm này?",
      action: () => onUpdateProducts(products.filter((p: any) => p.id !== id))
    });
  };

  const currentProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Form */}
      {isAdding ? (
        <div className="bg-white p-6 rounded-[32px] border border-black/5 shadow-xl mb-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[17px] font-bold text-text">{editingId ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}</h2>
            <button onClick={resetForm} className="text-text-light hover:text-text"><X size={20} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black uppercase text-slate-400 ml-1">Tên sản phẩm</label>
              <input value={name} onChange={e => setName(e.target.value)} className="bg-slate-50 border border-black/5 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-amber-300" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black uppercase text-slate-400 ml-1">Hãng</label>
              <select value={brandId} onChange={e => setBrandId(e.target.value)} className="bg-slate-50 border border-black/5 rounded-xl px-4 py-3 text-sm font-bold outline-none">
                <option value="">-- Chọn hãng --</option>
                {brands.map((b: any) => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black uppercase text-slate-400 ml-1">Loại</label>
              <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="bg-slate-50 border border-black/5 rounded-xl px-4 py-3 text-sm font-bold outline-none">
                <option value="">-- Chọn loại --</option>
                {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-black/5">
             <h3 className="text-xs font-black text-amber-500 uppercase mb-4">Chi tiết kỹ thuật</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Giá nhập", key: "importPrice", type: "number" },
                  { label: "Giá bán", key: "sellingPrice", type: "number" },
                  { label: "Giá vốn", key: "costPrice", type: "number" },
                  { label: "Trọng lượng", key: "weight", type: "text" },
                  { label: "Độ mạnh", key: "strength", type: "text" },
                  { label: "Số ngày dùng", key: "daysToUse", type: "number" }
                ].map(field => (
                  <div key={field.key} className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-1">{field.label}</label>
                    <input 
                      type={field.type}
                      value={(details as any)[field.key]} 
                      onChange={e => setDetails({ ...details, [field.key]: e.target.value })} 
                      className="bg-slate-50 border border-black/5 rounded-xl px-4 py-2.5 text-xs font-bold outline-none"
                    />
                  </div>
                ))}
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Công dụng</label>
                  <textarea value={details.usage} onChange={e => setDetails({ ...details, usage: e.target.value })} rows={2} className="bg-slate-50 border border-black/5 rounded-xl px-4 py-2.5 text-xs font-medium outline-none resize-none" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Mô tả</label>
                  <textarea value={details.description} onChange={e => setDetails({ ...details, description: e.target.value })} rows={2} className="bg-slate-50 border border-black/5 rounded-xl px-4 py-2.5 text-xs font-medium outline-none resize-none" />
                </div>
             </div>
          </div>

          <div className="mt-8 flex gap-3">
             <button onClick={resetForm} className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black text-sm active:scale-95">HỦY</button>
             <button onClick={handleSave} className="flex-1 py-4 bg-amber-500 text-white rounded-2xl font-black text-sm shadow-xl active:scale-95">LƯU SẢN PHẨM</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsAdding(true)} className="bg-amber-500 text-white py-4 rounded-[24px] font-black text-sm shadow-xl shadow-amber-200 active:scale-95 flex items-center justify-center gap-2">
          <Plus size={20} strokeWidth={3} /> THÊM SẢN PHẨM MỚI
        </button>
      )}

      {/* List */}
      <div className="bg-white rounded-3xl overflow-hidden border border-black/5 flex flex-col flex-1 shadow-sm">
        <div className="hidden md:flex px-6 py-4 bg-slate-50 border-b border-black/5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <div className="w-10 text-center">STT</div>
          <div className="flex-1 px-4">Tên sản phẩm</div>
          <div className="w-32">Hãng</div>
          <div className="w-32">Loại</div>
          <div className="w-24 text-right">Thao tác</div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {currentProducts.map((p, i) => (
            <div key={p.id} className="bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm hover:border-amber-200 transition-colors">
              <div className="flex items-center p-4">
                <div className="hidden md:block w-10 text-center text-xs font-bold text-slate-400">{ (page - 1) * itemsPerPage + i + 1 }</div>
                <div className="flex-1 flex items-center gap-4 px-4 min-w-0">
                   <div className="w-12 h-12 rounded-xl bg-slate-50 overflow-hidden shrink-0 border border-black/5">
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                   </div>
                   <div className="min-w-0">
                      <h4 className="font-bold text-sm text-slate-700 truncate">{p.name}</h4>
                      <p className="text-xs font-black text-rose-500 mt-0.5">{p.price.toLocaleString()}đ</p>
                   </div>
                </div>
                <div className="hidden md:block w-32">
                   <span className="inline-flex px-2.5 py-1 rounded-lg bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-tight">{p.brand}</span>
                </div>
                <div className="hidden md:block w-32">
                   <span className="text-[11px] font-bold text-slate-400 uppercase">{p.type}</span>
                </div>
                <div className="w-24 flex items-center justify-end gap-1">
                   <button onClick={() => setExpandedId(expandedId === p.id ? null : p.id)} className="p-2 text-slate-400 hover:text-amber-500"><Info size={16} /></button>
                   <button onClick={() => startEdit(p)} className="p-2 text-slate-400 hover:text-indigo-500"><Edit size={16} /></button>
                   <button onClick={() => handleDelete(p.id)} className="p-2 text-slate-400 hover:text-rose-500"><Trash2 size={16} /></button>
                </div>
              </div>
              {expandedId === p.id && (
                <div className="px-10 pb-6 pt-2 border-t border-slate-50 animate-in slide-in-from-top-2">
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <DetailRow label="Giá nhập" value={p.details?.importPrice?.toLocaleString() + 'đ'} />
                      <DetailRow label="Giá bán" value={p.details?.sellingPrice?.toLocaleString() + 'đ'} />
                      <DetailRow label="Giá vốn" value={p.details?.costPrice?.toLocaleString() + 'đ'} />
                      <DetailRow label="Trọng lượng" value={p.details?.weight} />
                      <DetailRow label="Độ mạnh" value={p.details?.strength} />
                      <DetailRow label="Số ngày dùng" value={p.details?.daysToUse + ' ngày'} />
                      <div className="col-span-2 space-y-1">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Công dụng:</span>
                        <p className="text-xs font-medium text-slate-600 italic leading-relaxed">{p.details?.usage || 'Chưa có thông tin'}</p>
                      </div>
                   </div>
                </div>
              )}
            </div>
          ))}
          {products.length === 0 && <div className="py-20 text-center italic text-slate-400">Chưa có sản phẩm nào</div>}
        </div>
        <AdminPagination 
          totalItems={products.length}
          itemsPerPage={itemsPerPage}
          currentPage={page}
          onPageChange={setPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string, value?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}:</span>
      <span className="text-[11px] font-bold text-slate-700">{value || '-'}</span>
    </div>
  );
}
