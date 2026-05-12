import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { INITIAL_ARTICLES } from '../data';

export default function Articles() {
  return (
    <Layout showBack>
      <div className="p-4 flex flex-col gap-5">
        <h1 className="font-serif text-[32px] font-bold text-text mb-1 px-1">Bài viết chia sẻ</h1>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {['Tất cả', 'Skincare', 'Tư vấn', 'Review', 'Hướng dẫn'].map((cat, i) => (
            <button
              key={cat}
              className={`flex-shrink-0 border rounded-full px-5 py-2 text-[13px] font-medium transition-all whitespace-nowrap
                ${i === 0 ? 'bg-text border-text text-white shadow-md' : 'bg-white border-black/5 text-text-mid'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-6 mt-2">
          {INITIAL_ARTICLES.map((art, i) => (
            <Link 
              key={art.id} 
              to={`/article/${art.id}`}
              className="flex gap-4 items-center group"
            >
              <div className="w-[32px] h-[32px] rounded-full bg-text text-white text-[13px] font-bold flex items-center justify-center shadow-md flex-shrink-0 self-center">
                {i + 1}
              </div>
              <div className="w-[100px] h-[100px] flex-shrink-0 rounded-[16px] overflow-hidden relative shadow-sm border border-black/5">
                <img src={art.img} alt={art.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-serif text-[17px] font-semibold text-text leading-snug group-active:text-rose transition-colors line-clamp-2">
                  {art.title}
                </div>
                <div className="text-[12px] text-text-light mt-1.5 leading-relaxed line-clamp-2">
                  {art.excerpt}
                </div>
                <div className="text-[10px] text-text-light/60 font-medium uppercase tracking-widest mt-2">{art.date}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
