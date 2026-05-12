import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { INITIAL_PRODUCTS, INITIAL_ARTICLES, INITIAL_AUTHORS } from '../data';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { Search, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const [activeCat, setActiveCat] = useState('lam-sach');
  const [activeBrand, setActiveBrand] = useState('obagi');
  const [catPage, setCatPage] = useState(1);
  const [brandPage, setBrandPage] = useState(1);
  const [salePage, setSalePage] = useState(1);
  const [bestPage, setBestPage] = useState(1);
  const [articlePage, setArticlePage] = useState(1);
  const itemsPerPage = 3;

  const saleProducts = INITIAL_PRODUCTS.filter(p => p.groups?.includes('sale'));
  const bestSellers = INITIAL_PRODUCTS.filter(p => p.groups?.includes('bestseller'));
  
  const categoryProducts = INITIAL_PRODUCTS.filter(p => p.groups?.includes(activeCat));
  const brandProducts = INITIAL_PRODUCTS.filter(p => p.groups?.includes(activeBrand));

  const catTotalPages = Math.ceil(categoryProducts.length / itemsPerPage);
  const brandTotalPages = Math.ceil(brandProducts.length / itemsPerPage);
  const saleTotalPages = Math.ceil(saleProducts.length / itemsPerPage);
  const bestTotalPages = Math.ceil(bestSellers.length / itemsPerPage);
  const articleTotalPages = Math.ceil(INITIAL_ARTICLES.length / itemsPerPage);

  const paginate = (items: any[], page: number) => {
    return items.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  };

  return (
    <Layout>
      {/* Search Bar */}
      <div className="px-5 py-3 pb-2 pt-5">
        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-light transition-colors group-focus-within:text-text" size={18} />
          <input 
            type="text" 
            placeholder="Tìm tên sản phẩm hoặc thương hiệu..."
            className="w-full bg-white border border-black/5 rounded-2xl p-[14px_20px_14px_50px] text-[14px] font-medium text-text outline-none shadow-sm focus:border-rose/50 focus:shadow-md transition-all placeholder:text-text-light/60"
          />
        </div>
      </div>

      {/* Skin Filter Button */}
      <div className="px-5 py-3">
        <button className="w-full bg-gradient-to-r from-rose to-rose-dark text-white rounded-2xl p-4 text-[14px] font-medium flex items-center justify-center gap-3 shadow-md hover:opacity-90 active:scale-[0.98] transition-all tracking-wide">
          <Search size={18} strokeWidth={2} />
          Lọc theo tình trạng da
        </button>
      </div>

      {/* Flash Sale */}
      <section id="flash-sale" className="px-5 py-4 pb-8">
        <div className="bg-blush/30 rounded-[24px] p-6 border border-rose/10">
          <div className="flex items-center justify-between mb-5 px-1">
            <div className="flex items-center gap-2">
              <span className="font-serif text-[24px] font-semibold text-text tracking-tight">Đang Ưu Đãi</span>
              <div className="bg-gradient-to-r from-rose to-rose-dark text-white text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest shadow-sm">Sale</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {paginate(saleProducts, salePage).map((p) => (
              <ProductCard key={p.id} product={p as any} type="flash" />
            ))}
          </div>
          <div className="flex flex-col items-center gap-4 mt-8">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setSalePage(Math.max(1, salePage - 1))}
                disabled={salePage === 1}
                className="w-9 h-9 rounded-full flex items-center justify-center border border-black/5 text-text-light disabled:opacity-30"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: saleTotalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setSalePage(page)}
                  className={`w-9 h-9 rounded-full text-[13px] font-bold transition-all ${salePage === page ? 'bg-text text-white shadow-md' : 'bg-white border border-black/5 text-text-light hover:border-black/20'}`}
                >
                  {page}
                </button>
              ))}
              <button 
                onClick={() => setSalePage(Math.min(saleTotalPages, salePage + 1))}
                disabled={salePage === saleTotalPages}
                className="w-9 h-9 rounded-full flex items-center justify-center border border-black/5 text-text-light disabled:opacity-30"
              >
                <ChevronRight size={16} />
              </button>
            </div>
            <Link to="/products?group=sale" className="bg-text text-white rounded-full px-8 py-2.5 text-[13px] font-bold hover:bg-rose active:scale-95 transition-all shadow-md">
              Xem tất cả ưu đãi
            </Link>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-rose/10 to-transparent mx-8 mb-6" />

      {/* Best Sellers */}
      <section id="best-seller" className="px-5 py-4 pb-8">
        <div className="flex items-center justify-between mb-5 px-1">
          <h2 className="sec-title">Bán Chạy Nhất</h2>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {paginate(bestSellers, bestPage).map((p) => (
            <ProductCard key={p.id} product={p as any} />
          ))}
        </div>
        <div className="flex flex-col items-center gap-4 mt-8">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setBestPage(Math.max(1, bestPage - 1))}
              disabled={bestPage === 1}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-black/5 text-text-light disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: bestTotalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setBestPage(page)}
                className={`w-9 h-9 rounded-full text-[13px] font-bold transition-all ${bestPage === page ? 'bg-text text-white shadow-md' : 'bg-white border border-black/5 text-text-light hover:border-black/20'}`}
              >
                {page}
              </button>
            ))}
            <button 
              onClick={() => setBestPage(Math.min(bestTotalPages, bestPage + 1))}
              disabled={bestPage === bestTotalPages}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-black/5 text-text-light disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <Link to="/products?group=bestseller" className="bg-text text-white rounded-full px-8 py-2.5 text-[13px] font-bold hover:bg-rose active:scale-95 transition-all shadow-md">
            Xem tất cả bán chạy
          </Link>
        </div>
      </section>

      {/* Separator */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-rose/10 to-transparent mx-8 mb-6" />

      {/* Categories */}
      <section id="category-section" className="px-5 py-4 pb-8">
        <div className="flex items-center justify-between mb-5 px-1">
          <h2 className="sec-title">Vấn đề da</h2>
        </div>
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar mb-5 px-1">
          {['lam-sach', 'tri-mun', 'tri-nam', 'khoe-da'].map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCat(cat); setCatPage(1); }}
              className={`flex-shrink-0 border rounded-full px-5 py-2 text-[13px] font-medium transition-all duration-300 whitespace-nowrap
                ${activeCat === cat ? 'bg-gradient-to-r from-rose to-rose-dark border-transparent text-white shadow-md' : 'bg-white border-rose/20 text-text-mid hover:border-rose/40'}
              `}
            >
              {cat === 'lam-sach' && 'Làm sạch'}
              {cat === 'tri-mun' && 'Trị mụn'}
              {cat === 'tri-nam' && 'Trị nám & thâm'}
              {cat === 'khoe-da' && 'Dưỡng da'}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {paginate(categoryProducts, catPage).map((p) => (
            <ProductCard key={p.id} product={p as any} type="category" />
          ))}
        </div>
        <div className="flex flex-col items-center gap-4 mt-8">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCatPage(Math.max(1, catPage - 1))}
              disabled={catPage === 1}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-black/5 text-text-light disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: catTotalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCatPage(page)}
                className={`w-9 h-9 rounded-full text-[13px] font-bold transition-all ${catPage === page ? 'bg-text text-white shadow-md' : 'bg-white border border-black/5 text-text-light hover:border-black/20'}`}
              >
                {page}
              </button>
            ))}
            <button 
              onClick={() => setCatPage(Math.min(catTotalPages, catPage + 1))}
              disabled={catPage === catTotalPages}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-black/5 text-text-light disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <Link to={`/products?group=${activeCat}`} className="bg-text text-white rounded-full px-8 py-2.5 text-[13px] font-bold hover:bg-rose active:scale-95 transition-all shadow-md">
            Xem tất cả {activeCat === 'lam-sach' ? 'Làm sạch' : activeCat === 'tri-mun' ? 'Trị mụn' : activeCat === 'tri-nam' ? 'Trị nám' : 'Dưỡng da'}
          </Link>
        </div>
      </section>

      {/* Separator */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-black/5 to-transparent mx-8 mb-6" />

      {/* Brands */}
      <section id="brand-section" className="px-5 py-4 pb-10">
        <div className="flex items-center justify-between mb-5 px-1">
          <h2 className="sec-title">Thương Hiệu</h2>
        </div>
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar mb-5 px-1">
          {['obagi', 'comfort-zone', 'la-roche', 'some-by-mi'].map(brand => (
            <button
              key={brand}
              onClick={() => { setActiveBrand(brand); setBrandPage(1); }}
              className={`flex-shrink-0 border rounded-full px-5 py-2 text-[13px] font-medium transition-all duration-300 whitespace-nowrap
                ${activeBrand === brand ? 'bg-gradient-to-r from-rose to-rose-dark border-transparent text-white shadow-md' : 'bg-white border-rose/20 text-text-mid hover:border-rose/40'}
              `}
            >
              {brand === 'obagi' && 'Obagi'}
              {brand === 'comfort-zone' && 'Comfort Zone'}
              {brand === 'la-roche' && 'La Roche-Posay'}
              {brand === 'some-by-mi' && 'Some By Mi'}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {paginate(brandProducts, brandPage).map((p) => (
            <ProductCard key={p.id} product={p as any} type="category" />
          ))}
        </div>
        <div className="flex flex-col items-center gap-4 mt-8">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setBrandPage(Math.max(1, brandPage - 1))}
              disabled={brandPage === 1}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-black/5 text-text-light disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: brandTotalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setBrandPage(page)}
                className={`w-9 h-9 rounded-full text-[13px] font-bold transition-all ${brandPage === page ? 'bg-text text-white shadow-md' : 'bg-white border border-black/5 text-text-light hover:border-black/20'}`}
              >
                {page}
              </button>
            ))}
            <button 
              onClick={() => setBrandPage(Math.min(brandTotalPages, brandPage + 1))}
              disabled={brandPage === brandTotalPages}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-black/5 text-text-light disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <Link to={`/products?group=${activeBrand}`} className="bg-text text-white rounded-full px-8 py-2.5 text-[13px] font-bold hover:bg-rose active:scale-95 transition-all shadow-md">
            Xem tất cả {activeBrand === 'obagi' ? 'Obagi' : activeBrand === 'comfort-zone' ? 'Comfort Zone' : activeBrand === 'la-roche' ? 'La Roche' : 'Some By Mi'}
          </Link>
        </div>
      </section>

      {/* Articles */}
      <section id="articles" className="bg-white rounded-t-[32px] p-[32px_20px_40px] mt-2 shadow-[0_-8px_30px_rgba(0,0,0,0.02)] border-t border-black/5">
        <div className="flex items-center justify-between mb-6 px-1">
          <h2 className="sec-title">Bài Chia Sẻ</h2>
        </div>
        <div className="flex flex-col gap-6">
          {paginate(INITIAL_ARTICLES, articlePage).map((art, i) => (
            <Link key={art.id} to={`/article/${art.id}`} className="flex gap-4 items-center group">
              <div className="w-[32px] h-[32px] rounded-full bg-text text-white text-[13px] font-bold flex items-center justify-center shadow-md flex-shrink-0 self-center">
                {(articlePage - 1) * itemsPerPage + i + 1}
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <div className="w-[100px] h-[100px] rounded-[16px] overflow-hidden relative shadow-sm border border-black/5">
                  <img src={art.img} alt={art.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                {art.authorId && (
                  <div className="w-[100px] bg-rose/5 border border-rose/10 py-1 rounded-lg text-center">
                    <span className="text-[9px] font-bold text-rose truncate px-1 block">
                      {INITIAL_AUTHORS.find(a => a.id === art.authorId)?.name || 'Admin'}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-serif text-[17px] font-semibold text-text leading-snug group-hover:text-rose transition-colors line-clamp-2">
                  {art.title}
                </div>
                <div className="text-[12px] text-text-light mt-1.5 leading-relaxed line-clamp-2">
                  {art.excerpt}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex flex-col items-center gap-4 mt-10">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setArticlePage(Math.max(1, articlePage - 1))}
              disabled={articlePage === 1}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-black/5 text-text-light disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: articleTotalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setArticlePage(page)}
                className={`w-9 h-9 rounded-full text-[13px] font-bold transition-all ${articlePage === page ? 'bg-text text-white shadow-md' : 'bg-white border border-black/5 text-text-light hover:border-black/20'}`}
              >
                {page}
              </button>
            ))}
            <button 
              onClick={() => setArticlePage(Math.min(articleTotalPages, articlePage + 1))}
              disabled={articlePage === articleTotalPages}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-black/5 text-text-light disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <Link to="/articles" className="bg-text text-white rounded-full px-8 py-2.5 text-[13px] font-bold hover:bg-rose active:scale-95 transition-all shadow-md">
            Xem tất cả bài viết
          </Link>
        </div>
      </section>
    </Layout>
  );
}
