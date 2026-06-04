'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../components/Navbar';

const API = process.env.NEXT_PUBLIC_API_URL || '';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [qty, setQty] = useState(1);
  const [fav, setFav] = useState(false);
  const [activeTab, setActiveTab] = useState('desc');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/products/${id}`)
      .then(r => r.json())
      .then(d => { setProduct(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <>
      <Navbar />
      <div style={{padding:60,textAlign:'center',color:'#E91E8C',fontSize:16}}>
        جاري التحميل...
      </div>
    </>
  );

  if (!product) return (
    <>
      <Navbar />
      <div style={{padding:60,textAlign:'center',fontSize:16}}>المنتج غير موجود</div>
    </>
  );

  return (
    <>
      <Navbar />
      <div style={{background:'#f5f5f5',minHeight:'100vh',padding:'20px 24px',direction:'rtl'}}>

        <div style={{fontSize:13,color:'#888',marginBottom:20,display:'flex',alignItems:'center',gap:6}}>
          <a href="/" style={{color:'#E91E8C',textDecoration:'none'}}>الرئيسية</a>
          <span>›</span>
          <span>{product.name}</span>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24,marginBottom:24}}>

          <div style={{background:'#fff',borderRadius:16,border:'1px solid #f0e0ee',display:'flex',alignItems:'center',justifyContent:'center',minHeight:360,position:'relative'}}>
            {product.image && product.image !== 'no_image'
              ? <img src={product.image} alt={product.name} style={{width:'100%',height:'100%',objectFit:'contain',padding:24}} />
              : <span style={{fontSize:100}}>🛍️</span>}
            <button onClick={() => setFav(!fav)}
              style={{position:'absolute',top:16,left:16,background:'#fff',border:'1px solid #f0e0ee',cursor:'pointer',width:36,height:36,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,color:fav?'#E91E8C':'#ddd'}}>
              {fav ? '♥' : '♡'}
            </button>
          </div>

          <div style={{background:'#fff',borderRadius:16,border:'1px solid #f0e0ee',padding:24}}>
            <div style={{background:'#fce8f5',color:'#8a007a',fontSize:11,fontWeight:700,padding:'3px 10px',borderRadius:20,display:'inline-block',marginBottom:10}}>
              {product.sub_category || product.category_key || 'منتج'}
            </div>
            <h1 style={{fontSize:20,fontWeight:900,color:'#1a1a1a',marginBottom:16,lineHeight:1.4}}>{product.name}</h1>

            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
              <span style={{fontSize:28,fontWeight:900,color:'#E91E8C'}}>{product.price} ج</span>
            </div>

            <div style={{borderTop:'1px solid #f0e0ee',paddingTop:16,marginBottom:20}}>
              <div style={{display:'flex',alignItems:'center',gap:8,fontSize:13}}>
                <span style={{color:'#888'}}>الحالة:</span>
                <span style={{color:'#10b981',fontWeight:600}}>✓ متوفر</span>
              </div>
            </div>

            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
              <div style={{display:'flex',alignItems:'center',border:'1px solid #f0e0ee',borderRadius:10,overflow:'hidden'}}>
                <button onClick={() => setQty(q => Math.max(1,q-1))}
                  style={{width:36,height:44,background:'#f5f5f5',border:'none',cursor:'pointer',fontSize:20,display:'flex',alignItems:'center',justifyContent:'center'}}>-</button>
                <span style={{width:44,textAlign:'center',fontSize:15,fontWeight:700}}>{qty}</span>
                <button onClick={() => setQty(q => q+1)}
                  style={{width:36,height:44,background:'#E91E8C',border:'none',cursor:'pointer',fontSize:20,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center'}}>+</button>
              </div>
              <button style={{flex:1,background:'#E91E8C',color:'#fff',border:'none',padding:13,borderRadius:10,fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}>
                🛒 أضف للسلة — {product.price * qty} ج
              </button>
            </div>

            <button style={{width:'100%',background:'#fff',color:'#E91E8C',border:'2px solid #E91E8C',padding:11,borderRadius:10,fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}>
              ⚡ اشتري الآن
            </button>
          </div>
        </div>
      </div>
    </>
  );
}