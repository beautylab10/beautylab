import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { INITIAL_ARTICLES, INITIAL_SKIN_CONCERNS } from '../data';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export default function ArticleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = INITIAL_ARTICLES.find(a => a.id === Number(id));
  const [activeImg, setActiveImg] = useState(article?.img || '');

  useEffect(() => {
    if (article) setActiveImg(article.img);
  }, [id, article]);

  if (!article) {
    return <Layout showBack><div>Bài viết không tồn tại</div></Layout>;
  }

  return (
    <Layout showBack>
      <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
        {/* Header Content */}
        <div className="p-6 pb-2">
          {/* Tag and Date */}
          <div className="text-[11px] text-text-mid font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="text-rose">{article.tag}</span>
            <span className="w-1 h-1 rounded-full bg-black/10" />
            <span className="text-text-light/60">{article.date}</span>
          </div>

          {/* Skin Concerns */}
          {article.skinConcerns && article.skinConcerns.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {article.skinConcerns.map(id => {
                const concern = INITIAL_SKIN_CONCERNS.find(c => c.id === id);
                return concern ? (
                  <span key={id} className="text-[10px] font-bold text-text-light uppercase tracking-widest bg-black/5 px-2 py-0.5 rounded shadow-sm">
                    {concern.name}
                  </span>
                ) : null;
              })}
            </div>
          )}

          <h1 className="font-serif text-[32px] font-semibold text-text leading-[1.2] mb-4">{article.title}</h1>
        </div>

        <div className="w-full aspect-[16/10] overflow-hidden relative border-b border-black/5 flex items-center justify-center">
          {/* Vertical Thumbnails */}
          {article.images && article.images.length > 1 && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
              {article.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(img)}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 shadow-lg ${
                    activeImg === img ? 'border-rose scale-110' : 'border-white/50 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`thumb-${idx}`} />
                </button>
              ))}
            </div>
          )}

          <img src={activeImg} alt={article.title} className="w-full h-full object-cover transition-all duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>

        <div className="p-6 bg-white relative z-10">
          <div className="prose prose-sm max-w-none text-text-mid leading-relaxed">
            <p className="text-[16px] font-medium text-text mb-6 leading-relaxed italic border-l-2 border-rose pl-4 py-1">
              "{article.excerpt}"
            </p>
            
            <h2 className="font-serif text-[20px] font-semibold text-text mt-8 mb-4">Nội dung chia sẻ</h2>
            <p className="mb-4 font-normal">Skincare không chỉ là bôi kem, mà là một hành trình thấu hiểu làn da của mình. Mỗi loại da sẽ có phản ứng khác nhau với các hoạt chất điều trị.</p>
            <ul className="space-y-4 mb-8">
              <li className="flex gap-4">
                <span className="text-rose text-lg leading-none">✦</span>
                <p className="font-normal">Lắng nghe làn da: Đừng vội vàng bôi quá nhiều lớp.</p>
              </li>
              <li className="flex gap-4">
                <span className="text-rose text-lg leading-none">✦</span>
                <p className="font-normal">Kiên trì: Cốt lõi của thành công là sự đều đặn.</p>
              </li>
              <li className="flex gap-4">
                <span className="text-rose text-lg leading-none">✦</span>
                <p className="font-normal">Chọn lọc: Chỉ dùng những gì da thực sự cần.</p>
              </li>
            </ul>

            <div className="bg-bg rounded-[24px] p-6 border border-black/5 mt-10">
              <h2 className="font-serif text-[18px] font-semibold text-text mb-3">Lời khuyên từ Beauté</h2>
              <p className="text-text-mid font-medium leading-relaxed italic">
                Nếu bạn còn phân vân về cách layer sản phẩm, hãy nhắn tin ngay cho Beauté để được tư vấn lộ trình cá nhân hóa nhé! 🌸
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
