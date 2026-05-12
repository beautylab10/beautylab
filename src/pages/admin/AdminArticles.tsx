import React, { useState } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { INITIAL_ARTICLES } from '../../data';
import { AdminLayout, AdminPagination } from './AdminComponents';

export default function AdminArticles() {
  const [articles, setArticles] = useState(INITIAL_ARTICLES);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleDelete = (id: number) => {
    if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
      setArticles(prev => prev.filter(a => a.id !== id));
    }
  };

  const paginatedArticles = articles.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <AdminLayout 
      title="Quản lý bài viết" 
      primaryAction={
        <Link to="/admin/article/new" className="bg-text text-white rounded-full px-6 py-2.5 text-[13px] font-bold flex items-center gap-2 hover:bg-rose transition-all shadow-md active:scale-95">
          <Plus size={18} />
          Tạo bài viết
        </Link>
      }
    >
      <div className="flex flex-col gap-6 mb-8">
        {paginatedArticles.map((art, i) => (
          <div key={art.id} className="flex gap-4 items-center group bg-white p-4 rounded-[24px] border border-black/5 shadow-sm hover:shadow-md transition-all">
            <div className="w-[32px] h-[32px] rounded-full bg-text text-white text-[13px] font-bold flex items-center justify-center shadow-md flex-shrink-0">
              {art.id}
            </div>
            <div className="w-[80px] h-[80px] flex-shrink-0 rounded-[16px] overflow-hidden relative shadow-sm border border-black/5">
              <img src={art.img} alt={art.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex-1 min-w-0 pr-4">
              <div className="text-[10px] font-bold text-rose uppercase tracking-widest mb-1">{art.tag}</div>
              <h3 className="font-serif text-[16px] font-bold text-text leading-tight group-hover:text-rose transition-colors line-clamp-2">{art.title}</h3>
              <div className="text-[11px] text-text-mid font-medium mt-1">{art.date}</div>
            </div>
            <div className="flex flex-col gap-2">
              <Link to={`/admin/article/edit/${art.id}`} className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 text-text-mid hover:bg-text hover:text-white transition-all">
                <Edit size={16} />
              </Link>
              <button 
                onClick={() => handleDelete(art.id)}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-rose/5 text-rose hover:bg-rose hover:text-white transition-all"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AdminPagination 
        totalItems={articles.length}
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
