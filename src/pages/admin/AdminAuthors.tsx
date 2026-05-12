import React, { useState } from 'react';
import { Plus, Trash2, Edit, Save, X, User } from 'lucide-react';
import { INITIAL_AUTHORS } from '../../data';
import { AdminLayout, AdminPagination } from './AdminComponents';

export default function AdminAuthors() {
  const [authors, setAuthors] = useState(INITIAL_AUTHORS);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newBio, setNewBio] = useState('');
  
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleAdd = () => {
    if (!newName) return;
    const newAuthor = {
      id: `auth-${Date.now()}`,
      name: newName,
      avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
      bio: newBio
    };
    setAuthors([newAuthor, ...authors]);
    setNewName('');
    setNewBio('');
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc muốn xóa người viết này?')) {
      setAuthors(prev => prev.filter(a => a.id !== id));
    }
  };

  const paginatedAuthors = authors.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <AdminLayout 
      title="Người viết bài" 
      primaryAction={
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-text text-white rounded-full px-6 py-2.5 text-[13px] font-bold flex items-center gap-2 hover:bg-rose transition-all shadow-md active:scale-95"
        >
          <Plus size={18} />
          Tạo người viết
        </button>
      }
    >
      {/* Create Form */}
      {isAdding && (
        <div className="bg-white p-6 rounded-[32px] border border-black/5 shadow-xl mb-8 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[17px] font-bold text-text">Thông tin người viết mới</h2>
            <button onClick={() => setIsAdding(false)} className="text-text-light hover:text-text">
              <X size={20} />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-text-light ml-1 uppercase tracking-widest">Họ và tên</label>
              <input 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Nhập tên người viết..."
                className="bg-bg-light border border-black/5 rounded-[16px] px-5 py-4 text-[14px] font-bold focus:outline-none focus:ring-2 focus:ring-rose/20 transition-all shadow-inner"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold text-text-light ml-1 uppercase tracking-widest">Tiểu sử (Bio)</label>
              <textarea 
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
                placeholder="Mô tả giới thiệu ngắn..."
                rows={3}
                className="bg-bg-light border border-black/5 rounded-[16px] px-5 py-4 text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-rose/20 transition-all shadow-inner resize-none"
              />
            </div>
            <button 
              onClick={handleAdd}
              disabled={!newName}
              className="w-full bg-text text-white rounded-full py-4 text-[14px] font-bold mt-2 shadow-lg hover:bg-rose transition-all active:scale-95 disabled:opacity-30 flex items-center justify-center gap-2"
            >
              <Save size={18} />
              Lưu người viết
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="flex flex-col gap-4 mb-8">
        {paginatedAuthors.map((author) => (
          <div key={author.id} className="flex gap-4 items-center bg-white p-4 rounded-[24px] border border-black/5 shadow-sm hover:shadow-md transition-all group">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-bg-light flex-shrink-0 shadow-sm ring-2 ring-white">
              <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[15px] font-bold text-text group-hover:text-rose transition-colors">{author.name}</h3>
              <p className="text-[12px] text-text-mid font-medium line-clamp-1 mt-0.5">{author.bio}</p>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 text-text-mid hover:bg-text hover:text-white transition-all shadow-sm">
                <Edit size={16} />
              </button>
              <button 
                onClick={() => handleDelete(author.id)}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-rose/5 text-rose hover:bg-rose hover:text-white transition-all shadow-sm"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {authors.length === 0 && (
          <div className="py-20 flex flex-col items-center gap-4 text-text-light opacity-50">
            <User size={48} strokeWidth={1} />
            <p className="font-bold text-[13px] uppercase tracking-[2px]">Chưa có người viết nào</p>
          </div>
        )}
      </div>

      <AdminPagination 
        totalItems={authors.length}
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
