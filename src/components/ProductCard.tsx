import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { formatK } from '../utils';
import { INITIAL_SKIN_CONCERNS } from '../data';

interface ProductCardProps {
  product: Product;
  type?: 'flash' | 'simple' | 'category';
}

export default function ProductCard({ product, type = 'simple' }: ProductCardProps) {
  const isFlash = type === 'flash';
  const isCategory = type === 'category';

  return (
    <Link 
      to={`/product/${product.id}`} 
      className={`flex flex-col group ${isFlash && product.soldOut ? 'opacity-60' : ''} transition-all duration-300`}
    >
      <div className={`
        rounded-[16px] aspect-square overflow-hidden relative flex items-center justify-center p-0 transition-all duration-300 group-active:scale-[0.96]
      `}>
        <img 
          src={product.img} 
          alt={product.name} 
          className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
        />
        {product.discount && (
          <div className="absolute top-2 left-2 bg-rose text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm shadow-sm uppercase tracking-wider">
            {product.discount}
          </div>
        )}
      </div>

      {/* Skin Concerns Tags */}
      {product.skinConcerns && product.skinConcerns.length > 0 && (
        <div className="mt-2 flex flex-wrap justify-center gap-1 px-1">
          {product.skinConcerns.slice(0, 2).map(id => {
            const concern = INITIAL_SKIN_CONCERNS.find(c => c.id === id);
            return concern ? (
              <span key={id} className="text-[8px] font-bold text-text-light uppercase tracking-tighter bg-black/5 px-1.5 py-0.5 rounded">
                {concern.name}
              </span>
            ) : null;
          })}
        </div>
      )}
      
      <div className={`
        mt-3 text-center text-text font-medium leading-tight line-clamp-2 px-1
        ${isFlash ? 'text-[11px]' : 'text-[13px]'}
        ${isCategory ? 'text-[12px]' : ''}
      `}>
        {product.name}
      </div>
      
      <div className="mt-1 flex items-center justify-center gap-1.5 flex-wrap">
        <span className={`
          font-semibold text-center
          ${isFlash ? 'text-[14px] text-text' : 'text-[14px] text-rose-dark'}
          ${isCategory ? 'text-[13px]' : ''}
        `}>
          {formatK(product.price)}
        </span>
        {isFlash && product.oldPrice && (
          <span className="text-[10px] text-text-light line-through font-medium">
            {formatK(product.oldPrice)}
          </span>
        )}
      </div>
      
      {isFlash && product.soldOut && (
        <div className="mt-2 bg-black/5 text-text-mid border border-black/10 rounded-sm text-[9px] font-bold py-1 text-center tracking-widest uppercase">
          Hết hàng
        </div>
      )}
    </Link>
  );
}
