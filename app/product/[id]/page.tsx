'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
const API = process.env.NEXT_PUBLIC_API_URL || '';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [fav, setFav] = useState(false);
  const [activeTab, setActiveTab] = useState('desc');
  const [toast, setToast] = useState('');

  useEffect(() => {
    fetch(`${API}/api/products/${id}`)
      .then(r => r.json())
      .then(data => { setProduct(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((i: any) => i._id === product._id);
    if (existing) existing.quantity += qty;
    else cart.push({ ...product, quantity: qty });
    localStorage.setItem('cart', JSON.stringify(cart));
    setToast(`✅ تمت الإضافة: ${product.name}`);
    setTimeout(() => setToast(''), 2500);
  };

  if (loading) return (
    <>
      <Navbar />
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'60vh',gap:10,color:'#888'}}>
        <div style={{width:24,height:24,border:'3px solid #fce8f5',borderTopColor:'#E91E8C',borderRadius:'50%',animation:'spin .8s linear infinite'}} />
        جاري التحميل...
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </>
  );

  if (!product) return (
    <>
      <Navbar />
      <div style={{textAlign:'center',padding:60,color:'#888'}}>
        <div style={{fontSize:48,marginBottom:12}}>😕</div>
        <div style={{fontSize:16,fontWeight:700}}>المنتج غير موجود</div>
        <a href="/" style={{color:'#E91E8C',fontSize:13,marginTop:8,display:'block'}}>العودة للرئيسية</a>
      </div>
    </>
  );

  return (
    <>
      <Navbar />
      <div style={{background:'#f5f5f5',minHeight:'100vh',padding:'20px 24px',direction:'rtl'}}>

        {/* Breadcrumb */}
        <div style={{fontSize:13,color:'#888',marginBottom:20,display:'flex',alignItems:'center',gap:6}}>
          <a href="/" style={{color:'#E91E8C',textDecoration:'none'}}>الرئيسية</a>
          <span>›</span>
          <span>{product.name}</span>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24,marginBottom:24}}>

          {/* Image */}
          <div style={{background:'#fff',borderRadius:16,border:'1px solid #f0e0ee',display:'flex',alignItems:'center',justifyContent:'center',minHeight:360,position:'relative',overflow:'hidden'}}>
            {product.image && product.image !== 'no_image'
              ? <img src={product.image} alt={product.name} style={{width:'80%',height:'80%',objectFit:'contain'}} />
              : <span style={{fontSize:120}}>🛍️</span>}
            <button onClick={() => setFav(!fav)}
              style={{position:'absolute',top:16,left:16,background:'#fff',border:'1px solid #f0e0ee',cursor:'pointer',width:36,height:36,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,color: fav ? '#E91E8C' : '#ddd'}}>
              {fav ? '♥' : '♡'}
            </button>
          </div>

          {/* Info */}
          <div style={{background:'#fff',borderRadius:16,border:'1px solid #f0e0ee',padding:24}}>
            <div style={{background:'#fce8f5',color:'#8a007a',fontSize:11,fontWeight:700,padding:'3px 10px',borderRadius:20,display:'inline-block',marginBottom:10}}>
              {product.sub_category || 'منتج'}
            </div>
            <h1 style={{fontSize:20,fontWeight:900,color:'#1a1a1a',marginBottom:12,lineHeight:1.4}}>{product.name}</h1>

            {/* Price */}
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
              <span style={{fontSize:28,fontWeight:900,color:'#E91E8C'}}>{product.price} ج</span>
              {product.old_price && <span style={{fontSize:16,color:'#bbb',textDecoration:'line-through'}}>{product.old_price} ج</span>}
            </div>

            <div style={{borderTop:'1px solid #f0e0ee',paddingTop:16,marginBottom:20}}>
              {product.unit && (
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8,fontSize:13}}>
                  <span style={{color:'#888'}}>الوحدة:</span>
                  <span style={{fontWeight:600}}>{product.unit}</span>
                </div>
              )}
              <div style={{display:'flex',alignItems:'center',gap:8,fontSize:13}}>
                <span style={{color:'#888'}}>الحالة:</span>
                <span style={{color:'#10b981',fontWeight:600}}>✓ متوفر</span>
              </div>
            </div>

            {/* Qty */}
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
              <div style={{display:'flex',alignItems:'center',border:'1px solid #f0e0ee',borderRadius:10,overflow:'hidden'}}>
                <button onClick={() => setQty(q => Math.max(1,q-1))}
                  style={{width:36,height:44,background:'#f5f5f5',border:'none',cursor:'pointer',fontSize:20,display:'flex',alignItems:'center',justifyContent:'center'}}>-</button>
                <span style={{width:44,textAlign:'center',fontSize:15,fontWeight:700}}>{qty}</span>
                <button onClick={() => setQty(q => q+1)}
                  style={{width:36,height:44,background:'#E91E8C',border:'none',cursor:'pointer',fontSize:20,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center'}}>+</button>
              </div>
              <button onClick={addToCart}
                style={{flex:1,background:'#E91E8C',color:'#fff',border:'none',padding:'13px',borderRadius:10,fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}>
                🛒 أضف للسلة — {product.price * qty} ج
              </button>
            </div>

            <button onClick={() => window.location.href='/cart'}
              style={{width:'100%',background:'#fff',color:'#E91E8C',border:'2px solid #E91E8C',padding:'11px',borderRadius:10,fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}>
              ⚡ اشتري الآن
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{background:'#fff',borderRadius:16,border:'1px solid #f0e0ee',overflow:'hidden'}}>
          <div style={{display:'flex',borderBottom:'1px solid #f0e0ee'}}>
            {[{id:'desc',label:'الوصف'},{id:'reviews',label:'التقييمات'}].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{padding:'14px 24px',border:'none',background:'transparent',cursor:'pointer',fontSize:14,fontWeight:600,color: activeTab===tab.id ? '#E91E8C' : '#888',borderBottom: activeTab===tab.id ? '2px solid #E91E8C' : '2px solid transparent',fontFamily:'inherit'}}>
                {tab.label}
              </button>
            ))}
          </div>
          <div style={{padding:24}}>
            {activeTab === 'desc' ? (
              <p style={{fontSize:14,color:'#555',lineHeight:1.8}}>{product.description || `${product.name} — منتج عالي الجودة متوفر في متجر زورا.`}</p>
            ) : (
              <div style={{textAlign:'center',padding:24,color:'#888'}}>
                <div style={{fontSize:32,marginBottom:8}}>⭐</div>
                <div style={{fontSize:14,fontWeight:600}}>لا توجد تقييمات بعد</div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Toast */}
      {toast && (
        <div style={{position:'fixed',bottom:24,left:'50%',transform:'translateX(-50%)',background:'#E91E8C',color:'#fff',padding:'12px 24px',borderRadius:24,fontSize:13,fontWeight:700,zIndex:9999,whiteSpace:'nowrap',boxShadow:'0 4px 20px rgba(233,30,140,.3)'}}>
          {toast}
        </div>
      )}
    </>
  );
}