import React, { useState } from 'react';
import { Plus, Trash2, Edit, Save, X, Fingerprint } from 'lucide-react';
import { INITIAL_SKIN_TYPES } from '../../data';
import { AdminLayout, AdminPagination } from './AdminComponents';

export default function AdminSkinTypes() {
  const [skinTypes, setSkinTypes] = useState(INITIAL_SKIN_TYPES);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleAdd = () => {
    if (!newName) return;
    const newType = {
      id: `type-${Date.now()}`,
      name: newName,
      description: newDesc
    };
    setSkinTypes([newType, ...skinTypes]);
    setNewName('');
    setNewDesc('');
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc muốn xóa loại da này?')) {
      setSkinTypes(prev => prev.filter(t => t.id !== id));
    }
  };

  const paginatedTypes = skinTypes.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <AdminLayout 
      title="Quản lý loại da" 
      primaryAction={
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-text text-white rounded-full px-6 py-2.5 text-[13px] font-bold flex items-center gap-2 hover:bg-rose transition-all shadow-md active:scale-95"
        >
          <Plus size={18} />
          Tạo loại da
        </button>
      }
    >
      {/* Create Form */}
      {isAdding && (
        <div className="bg-white p-6 rounded-[32px] border border-black/5 shadow-xl mb-8 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[17px] font-bold text-text">Thông tin loại da mới</h2>
            <button onClick={() => setIsAdding(false)} className="text-text-light hover:text-text">
              <X size={20} />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-text-light ml-1 uppercase tracking-widest">Tên loại da</label>
              <input 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Ví dụ: Da dầu, Da khô..."
                className="bg-bg-light border border-black/5 rounded-[16px] px-5 py-4 text-[14px] font-bold focus:outline-none focus:ring-2 focus:ring-rose/20 transition-all shadow-inner"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-text-light ml-1 uppercase tracking-widest">Mô tả đặc điểm</label>
              <input 
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Ví dụ: Da thường xuyên bóng dầu vùng chữ T..."
                className="bg-bg-light border border-black/5 rounded-[16px] px-5 py-4 text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-rose/20 transition-all shadow-inner"
              />
            </div>
            <button 
              onClick={handleAdd}
              disabled={!newName}
              className="w-full bg-text text-white rounded-full py-4 text-[14px] font-bold mt-2 shadow-lg hover:bg-rose transition-all active:scale-95 disabled:opacity-30 flex items-center justify-center gap-2"
            >
              <Save size={18} />
              Lưu loại da
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="flex flex-col gap-4 mb-8">
        {paginatedTypes.map((type) => (
          <div key={type.id} className="flex gap-4 items-center bg-white p-5 rounded-[24px] border border-black/5 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-text/5 text-text flex items-center justify-center flex-shrink-0 shadow-inner">
              <Fingerprint size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[15px] font-bold text-text group-hover:text-rose transition-colors">{type.name}</h3>
              <p className="text-[12px] text-text-mid font-medium line-clamp-1 mt-0.5">{type.description}</p>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 text-text-mid hover:bg-text hover:text-white transition-all shadow-sm">
                <Edit size={16} />
              </button>
              <button 
                onClick={() => handleDelete(type.id)}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-rose/5 text-rose hover:bg-rose hover:text-white transition-all shadow-sm"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AdminPagination 
        totalItems={skinTypes.length}
        itemsPerPage={itemsPerPage}
        currentPage={page}
        onPageChange={setPage}
        onItemsPerPageChange={(n) => {
          setItemsPerPage(n);
          setPage(1);
        }}
      />
    </AdminLayout>
  );
}
