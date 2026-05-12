import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Minus, Image as ImageIcon, Bold, Italic, Type, Save, X, ChevronDown, Check } from 'lucide-react';
import { INITIAL_ARTICLES, INITIAL_AUTHORS, INITIAL_SKIN_CONCERNS } from '../../data';
import Layout from '../../components/Layout';

export default function AdminArticleForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('Skincare');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [isAuthorOpen, setIsAuthorOpen] = useState(false);
  const [isConcernOpen, setIsConcernOpen] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const art = INITIAL_ARTICLES.find(a => a.id === Number(id));
      if (art) {
        setTitle(art.title);
        setTag(art.tag);
        setExcerpt(art.excerpt);
        setContent(art.content || '');
        setAuthorId(art.authorId || '');
        setSelectedConcerns(art.skinConcerns || []);
        setImages(art.images || [art.img]);
      }
    }
  }, [id, isEdit]);

  const handleAddImage = () => {
    // Simulated image upload
    const dummyImg = 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=400&auto=format&fit=crop';
    setImages(prev => [...prev, dummyImg]);
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const toggleConcern = (concernId: string) => {
    setSelectedConcerns(prev => 
      prev.includes(concernId) 
        ? prev.filter(id => id !== concernId) 
        : [...prev, concernId]
    );
  };

  const handleSave = () => {
    alert('Bài viết đã được lưu! (Simulated)');
    navigate('/admin/articles');
  };

  const insertTag = (tag: string) => {
    const textarea = document.getElementById('content-area') as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
    const selected = text.substring(start, end);
    const newText = `${before}<${tag}>${selected}</${tag}>${after}`;
    setContent(newText);
  };

  return (
    <Layout showBack>
      <div className="flex flex-col px-5 py-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-[28px] font-bold text-text">{isEdit ? 'Sửa bài viết' : 'Tạo bài viết mới'}</h1>
          <button onClick={() => navigate('/admin/articles')} className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 text-text-mid">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-text ml-1">Tiêu đề bài viết</label>
            <input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề..."
              className="bg-white border border-black/10 rounded-[16px] px-5 py-4 text-[15px] font-medium focus:outline-none focus:ring-2 focus:ring-rose/20 transition-all font-serif italic text-lg"
            />
          </div>

          {/* Excerpt */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-text ml-1">Tóm tắt ngắn</label>
            <textarea 
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Mô tả ngắn gọn về bài viết..."
              rows={3}
              className="bg-white border border-black/10 rounded-[16px] px-5 py-4 text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-rose/20 transition-all resize-none"
            />
          </div>

          {/* Editor Controls */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-text ml-1">Nội dung chi tiết</label>
            <div className="bg-bg-light border border-black/10 rounded-[24px] overflow-hidden">
              <div className="flex items-center gap-1 p-2 bg-white/50 border-b border-black/5 overflow-x-auto no-scrollbar">
                <button onClick={() => insertTag('b')} className="p-2.5 rounded-lg hover:bg-black/5 text-text-mid flex items-center gap-1.5 transition-all active:scale-95">
                  <Bold size={16} /> <span className="text-[11px] font-bold uppercase tracking-wider">Đậm</span>
                </button>
                <button onClick={() => insertTag('i')} className="p-2.5 rounded-lg hover:bg-black/5 text-text-mid flex items-center gap-1.5 transition-all active:scale-95">
                  <Italic size={16} /> <span className="text-[11px] font-bold uppercase tracking-wider">Nghiêng</span>
                </button>
                <button onClick={() => insertTag('h2')} className="p-2.5 rounded-lg hover:bg-black/5 text-text-mid flex items-center gap-1.5 transition-all active:scale-95">
                  <Type size={16} /> <span className="text-[11px] font-bold uppercase tracking-wider">Phông chữ</span>
                </button>
                <div className="w-px h-6 bg-black/5 mx-1" />
                <button className="p-2.5 rounded-lg hover:bg-black/5 text-text-mid flex items-center gap-1.5 transition-all active:scale-95">
                  <ImageIcon size={16} /> <span className="text-[11px] font-bold uppercase tracking-wider">Cỡ chữ</span>
                </button>
              </div>
              <textarea 
                id="content-area"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Viết nội dung bài viết ở đây... (Hỗ trợ HTML tags cơ bản)"
                rows={12}
                className="w-full bg-transparent p-5 text-[15px] font-medium focus:outline-none transition-all resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-text ml-1">Hình ảnh bài viết</label>
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <div key={idx} className="aspect-square rounded-[16px] bg-white border border-black/5 relative group shadow-sm overflow-hidden">
                  <img src={img} alt={`upload-${idx}`} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  <button 
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-rose text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <Minus size={14} />
                  </button>
                </div>
              ))}
              <button 
                onClick={handleAddImage}
                className="aspect-square rounded-[16px] border-2 border-dashed border-black/10 flex flex-col items-center justify-center gap-2 text-text-light hover:border-rose hover:text-rose hover:bg-rose/5 transition-all group"
              >
                <Plus size={24} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Thêm ảnh</span>
              </button>
            </div>
          </div>

          {/* Author Selection */}
          <div className="flex flex-col gap-2 relative">
            <label className="text-[13px] font-bold text-text ml-1">Người viết bài</label>
            <button 
              onClick={() => setIsAuthorOpen(!isAuthorOpen)}
              className="flex items-center justify-between bg-white border border-black/10 rounded-[16px] px-5 py-4 text-[14px] font-bold text-text-mid hover:border-black/20 transition-all"
            >
              <span>{authorId ? INITIAL_AUTHORS.find(a => a.id === authorId)?.name : 'Chọn người viết...'}</span>
              <ChevronDown size={18} className={`transition-transform duration-300 ${isAuthorOpen ? 'rotate-180' : ''}`} />
            </button>
            {isAuthorOpen && (
              <div className="absolute bottom-[calc(100%+8px)] left-0 right-0 bg-white border border-black/5 rounded-[24px] shadow-xl z-30 p-2 animate-in fade-in zoom-in-95 duration-200">
                {INITIAL_AUTHORS.map(author => (
                  <button
                    key={author.id}
                    onClick={() => {
                      setAuthorId(author.id);
                      setIsAuthorOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-4 rounded-[16px] transition-all hover:bg-black/5 ${authorId === author.id ? 'bg-rose/5 text-rose' : 'text-text-mid'}`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={author.avatar} alt={author.name} className="w-8 h-8 rounded-full shadow-sm" />
                      <span className="text-[14px] font-bold">{author.name}</span>
                    </div>
                    {authorId === author.id && <Check size={16} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Skin Concern Selection */}
          <div className="flex flex-col gap-2 relative">
            <label className="text-[13px] font-bold text-text ml-1">Vấn đề da được nhắc đến</label>
            <button 
              onClick={() => setIsConcernOpen(!isConcernOpen)}
              className="flex items-center justify-between bg-white border border-black/10 rounded-[16px] px-5 py-4 text-[14px] font-bold text-text-mid hover:border-black/20 transition-all"
            >
              <div className="flex flex-wrap gap-1 flex-1 pr-2">
                {selectedConcerns.length > 0 ? (
                  selectedConcerns.map(id => (
                    <span key={id} className="bg-rose text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      {INITIAL_SKIN_CONCERNS.find(c => c.id === id)?.name}
                    </span>
                  ))
                ) : (
                  <span>Chọn vấn đề da...</span>
                )}
              </div>
              <ChevronDown size={18} className={`transition-transform duration-300 ${isConcernOpen ? 'rotate-180' : ''}`} />
            </button>
            {isConcernOpen && (
              <div className="absolute bottom-[calc(100%+8px)] left-0 right-0 bg-white border border-black/5 rounded-[24px] shadow-xl z-30 p-2 animate-in fade-in zoom-in-95 duration-200">
                {INITIAL_SKIN_CONCERNS.map(concern => (
                  <button
                    key={concern.id}
                    onClick={() => toggleConcern(concern.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-[16px] transition-all hover:bg-black/5 ${selectedConcerns.includes(concern.id) ? 'bg-rose/5 text-rose' : 'text-text-mid'}`}
                  >
                    <span className="text-[14px] font-bold">{concern.name}</span>
                    {selectedConcerns.includes(concern.id) && <Check size={16} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="fixed bottom-0 left-0 right-0 p-5 bg-white/80 backdrop-blur-md border-t border-black/5 z-40">
          <div className="max-w-xl mx-auto flex gap-4">
            <button 
              onClick={() => navigate('/admin/articles')}
              className="flex-1 bg-black/5 text-text-mid rounded-full py-4 text-[14px] font-bold hover:bg-black/10 active:scale-95 transition-all"
            >
              Hủy
            </button>
            <button 
              onClick={handleSave}
              className="flex-[2] bg-text text-white rounded-full py-4 text-[14px] font-bold flex items-center justify-center gap-2 hover:bg-rose shadow-lg active:scale-95 transition-all"
            >
              <Save size={18} />
              Lưu bài viết
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
