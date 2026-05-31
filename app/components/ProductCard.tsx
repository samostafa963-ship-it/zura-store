'use client';
import { useState } from 'react';

interface Product {
  _id: string;
  name: string;
  price: number;
  old_price?: number;
  image?: string;
  category?: string;
  unit?: string;
  discount?: number;
}

export default function ProductCard({ product, onAdd }: { product: Product; onAdd: (name: string) => void }) {
  const [fav, setFav] = useState(false);

  return (
    <div style={{background:'#fff',borderRadius:14,border:'1px solid #f0e0ee',cursor:'pointer',transition:'transform .2s,border-color .2s,box-shadow .2s',overflow:'hidden',width:160,flexShrink:0}}
      onMouseEnter={e => {const d = e.currentTarget as HTMLDivElement; d.style.transform='translateY(-3px)'; d.style.borderColor='#E91E8C'; d.style.boxShadow='0 6px 20px rgba(233,30,140,.1)'}}
      onMouseLeave={e => {const d = e.currentTarget as HTMLDivElement; d.style.transform=''; d.style.borderColor='#f0e0ee'; d.style.boxShadow=''}}
    >
      <div style={{height:110,display:'flex',alignItems:'center',justifyContent:'center',background:'#fff0f9',position:'relative',borderRadius:'14px 14px 0 0',overflow:'hidden'}}>
        {product.image && product.image !== 'no_image'
          ? <img src={product.image} alt={product.name} style={{width:'100%',height:'100%',objectFit:'contain',padding:10}} />
          : <span style={{fontSize:44}}>🛍️</span>
        }
        {product.discount && (
          <span style={{position:'absolute',top:8,right:8,background:'#E91E8C',color:'#fff',fontSize:10,fontWeight:700,padding:'2px 6px',borderRadius:20}}>
            -{product.discount}%
          </span>
        )}
        <button onClick={e => {e.stopPropagation(); setFav(!fav)}}
          style={{position:'absolute',top:6,left:6,background:'#fff',border:'none',cursor:'pointer',width:26,height:26,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,color: fav ? '#E91E8C' : '#ddd'}}>
          {fav ? '♥' : '♡'}
        </button>
      </div>

      <div style={{padding:'10px 12px'}}>
        <div style={{background:'#fce8f5',color:'#8a007a',fontSize:10,fontWeight:700,padding:'2px 7px',borderRadius:20,display:'inline-block',marginBottom:4}}>
          {product.category || 'منتج'}
        </div>
        <div style={{fontSize:12,fontWeight:600,color:'#1a1a1a',marginBottom:2,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
          {product.name}
        </div>
        <div style={{fontSize:11,color:'#888',marginBottom:6}}>{product.unit || ''}</div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div>
            {product.old_price && <small style={{fontSize:11,color:'#bbb',textDecoration:'line-through',marginLeft:4}}>{product.old_price} ج</small>}
            <span style={{fontSize:15,fontWeight:700,color:'#E91E8C'}}>{product.price} ج</span>
          </div>
          <button onClick={() => onAdd(product.name)}
            style={{width:28,height:28,background:'#E91E8C',color:'#fff',border:'none',borderRadius:8,fontSize:20,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'inherit',transition:'background .2s'}}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}