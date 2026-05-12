import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Minus, Trash2, Edit, Save, X, Type, Bold, Italic } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (num: number) => void;
}

export const AdminPagination: React.FC<PaginationProps> = ({ 
  totalItems, 
  itemsPerPage, 
  currentPage, 
  onPageChange, 
  onItemsPerPageChange 
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  return (
    <div className="flex items-center justify-between gap-4 py-6 border-t border-black/5 mt-auto">
      <div className="flex items-center gap-2">
        <span className="text-[13px] text-text-mid">Hiện</span>
        <select 
          value={itemsPerPage} 
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="bg-white border border-black/10 rounded-lg px-2 py-1 text-[13px] font-bold focus:outline-none focus:ring-2 focus:ring-rose/20 transition-all"
        >
          {[5, 10, 20, 50].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
        <span className="text-[13px] text-text-mid">trang</span>
      </div>
      
      <div className="flex items-center gap-1.5">
        <button 
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="w-9 h-9 rounded-full flex items-center justify-center border border-black/5 text-text-light disabled:opacity-30 hover:bg-black/5 transition-all"
        >
          <ChevronLeft size={16} />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-9 h-9 rounded-full text-[13px] font-bold transition-all ${
              currentPage === p 
                ? 'bg-text text-white shadow-md' 
                : 'text-text-mid hover:bg-black/5'
            }`}
          >
            {p}
          </button>
        ))}
        <button 
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="w-9 h-9 rounded-full flex items-center justify-center border border-black/5 text-text-light disabled:opacity-30 hover:bg-black/5 transition-all"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export const AdminLayout: React.FC<{ title: string; children: React.ReactNode; primaryAction?: React.ReactNode }> = ({ title, children, primaryAction }) => {
  return (
    <Layout showBack>
      <div className="flex flex-col min-h-[calc(100vh-80px)] px-5 py-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-[28px] font-bold text-text">{title}</h1>
          {primaryAction}
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar mb-8 pb-1">
          <Link to="/admin/articles" className="flex-shrink-0 px-5 py-2.5 rounded-full text-[13px] font-bold transition-all border border-black/5 bg-white text-text-mid hover:border-black/20">Bài chia sẻ</Link>
          <Link to="/admin/authors" className="flex-shrink-0 px-5 py-2.5 rounded-full text-[13px] font-bold transition-all border border-black/5 bg-white text-text-mid hover:border-black/20">Người viết bài</Link>
          <Link to="/admin/concerns" className="flex-shrink-0 px-5 py-2.5 rounded-full text-[13px] font-bold transition-all border border-black/5 bg-white text-text-mid hover:border-black/20">Vấn đề da</Link>
          <Link to="/admin/skin-types" className="flex-shrink-0 px-5 py-2.5 rounded-full text-[13px] font-bold transition-all border border-black/5 bg-white text-text-mid hover:border-black/20">Loại da</Link>
        </div>
        {children}
      </div>
    </Layout>
  );
};
