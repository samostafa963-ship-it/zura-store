'use client';
import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function ProductPage() {
  const [qty, setQty] = useState(1);
  const [fav, setFav] = useState(false);
  const [activeTab, setActiveTab] = useState('desc');

  const product = {
    name: 'زيت دوار الشمس عافية 1.5 لتر',
    price: 85,
    old_price: 99,
    discount: 14,
    category: 'زيوت وسمن',
    unit: '1.5 لتر',
    rating: 4.8,
    reviews: 124,
    image: '🛢️',
    description: 'زيت دوار الشمس عافية من أفضل الزيوت النباتية المستخدمة في الطهي. غني بفيتامين E ومنخفض في الدهون المشبعة.',
    tags: ['زيوت', 'طهي', 'عافية'],
  };

  return (
    <>
      <Navbar />
      <div style={{background:'#f5f5f5',minHeight:'100vh',padding:'20px 24px',direction:'rtl'}}>

        {/* Breadcrumb */}
        <div style={{fontSize:13,color:'#888',marginBottom:20,display:'flex',alignItems:'center',gap:6}}>
          <a href="/" style={{color:'#E91E8C',textDecoration:'none'}}>الرئيسية</a>
          <span>›</span>
          <span style={{color:'#E91E8C',cursor:'pointer'}}>{product.category}</span>
          <span>›</span>
          <span>{product.name}</span>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24,marginBottom:24}}>

          {/* Image */}
          <div style={{background:'#fff',borderRadius:16,border:'1px solid #f0e0ee',display:'flex',alignItems:'center',justifyContent:'center',minHeight:360,position:'relative'}}>
            <span style={{fontSize:140}}>{product.image}</span>
            {product.discount && (
              <span style={{position:'absolute',top:16,right:16,background:'#E91E8C',color:'#fff',fontSize:12,fontWeight:700,padding:'4px 10px',borderRadius:20}}>
                -{product.discount}%
              </span>
            )}
            <button onClick={() => setFav(!fav)}
              style={{position:'absolute',top:16,left:16,background:'#fff',border:'1px solid #f0e0ee',cursor:'pointer',width:36,height:36,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,color: fav ? '#E91E8C' : '#ddd',boxShadow:'0 2px 8px rgba(0,0,0,.08)'}}>
              {fav ? '♥' : '♡'}
            </button>
          </div>

          {/* Info */}
          <div style={{background:'#fff',borderRadius:16,border:'1px solid #f0e0ee',padding:24}}>
            <div style={{background:'#fce8f5',color:'#8a007a',fontSize:11,fontWeight:700,padding:'3px 10px',borderRadius:20,display:'inline-block',marginBottom:10}}>
              {product.category}
            </div>
            <h1 style={{fontSize:20,fontWeight:900,color:'#1a1a1a',marginBottom:8,lineHeight:1.4}}>{product.name}</h1>
            
            {/* Rating */}
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:16}}>
              <div style={{color:'#FFB300',fontSize:14}}>{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5-Math.floor(product.rating))}</div>
              <span style={{fontSize:13,fontWeight:700,color:'#1a1a1a'}}>{product.rating}</span>
              <span style={{fontSize:12,color:'#888'}}>({product.reviews} تقييم)</span>
            </div>

            {/* Price */}
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
              <span style={{fontSize:28,fontWeight:900,color:'#E91E8C'}}>{product.price} ج</span>
              {product.old_price && <span style={{fontSize:16,color:'#bbb',textDecoration:'line-through'}}>{product.old_price} ج</span>}
              {product.discount && <span style={{background:'#fce8f5',color:'#E91E8C',fontSize:12,fontWeight:700,padding:'3px 8px',borderRadius:20}}>وفّر {product.old_price! - product.price} ج</span>}
            </div>

            <div style={{borderTop:'1px solid #f0e0ee',paddingTop:16,marginBottom:20}}>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8,fontSize:13}}>
                <span style={{color:'#888'}}>الوحدة:</span>
                <span style={{fontWeight:600}}>{product.unit}</span>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:8,fontSize:13}}>
                <span style={{color:'#888'}}>الحالة:</span>
                <span style={{color:'#10b981',fontWeight:600}}>✓ متوفر</span>
              </div>
            </div>

            {/* Qty & Add */}
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
              <div style={{display:'flex',alignItems:'center',gap:0,border:'1px solid #f0e0ee',borderRadius:10,overflow:'hidden'}}>
                <button onClick={() => setQty(q => Math.max(1, q-1))}
                  style={{width:36,height:44,background:'#f5f5f5',border:'none',cursor:'pointer',fontSize:20,display:'flex',alignItems:'center',justifyContent:'center'}}>-</button>
                <span style={{width:44,textAlign:'center',fontSize:15,fontWeight:700}}>{qty}</span>
                <button onClick={() => setQty(q => q+1)}
                  style={{width:36,height:44,background:'#E91E8C',border:'none',cursor:'pointer',fontSize:20,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center'}}>+</button>
              </div>
              <button style={{flex:1,background:'#E91E8C',color:'#fff',border:'none',padding:'13px',borderRadius:10,fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}>
                🛒 أضف للسلة — {product.price * qty} ج
              </button>
            </div>

            <button style={{width:'100%',background:'#fff',color:'#E91E8C',border:'2px solid #E91E8C',padding:'11px',borderRadius:10,fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}>
              ⚡ اشتري الآن
            </button>

            {/* Tags */}
            <div style={{marginTop:16,display:'flex',gap:6,flexWrap:'wrap'}}>
              {product.tags.map(t => (
                <span key={t} style={{background:'#f5f5f5',color:'#888',fontSize:11,padding:'3px 10px',borderRadius:20}}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{background:'#fff',borderRadius:16,border:'1px solid #f0e0ee',overflow:'hidden'}}>
          <div style={{display:'flex',borderBottom:'1px solid #f0e0ee'}}>
            {[{id:'desc',label:'الوصف'},{id:'reviews',label:'التقييمات (124)'}].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{padding:'14px 24px',border:'none',background:'transparent',cursor:'pointer',fontSize:14,fontWeight:600,color: activeTab===tab.id ? '#E91E8C' : '#888',borderBottom: activeTab===tab.id ? '2px solid #E91E8C' : '2px solid transparent',fontFamily:'inherit'}}>
                {tab.label}
              </button>
            ))}
          </div>
          <div style={{padding:24}}>
            {activeTab === 'desc' ? (
              <p style={{fontSize:14,color:'#555',lineHeight:1.8}}>{product.description}</p>
            ) : (
              <div style={{display:'flex',flexDirection:'column',gap:16}}>
                {[{name:'أحمد محمد',rating:5,comment:'منتج ممتاز وجودة عالية',date:'منذ 3 أيام'},
                  {name:'سارة علي',rating:4,comment:'كويس جداً وسعره مناسب',date:'منذ أسبوع'}].map((r,i) => (
                  <div key={i} style={{padding:16,background:'#f9f9f9',borderRadius:10}}>
                    <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
                      <div style={{width:36,height:36,borderRadius:'50%',background:'#fce8f5',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:700,color:'#E91E8C'}}>{r.name[0]}</div>
                      <div>
                        <div style={{fontSize:13,fontWeight:700}}>{r.name}</div>
                        <div style={{fontSize:11,color:'#FFB300'}}>{'★'.repeat(r.rating)}</div>
                      </div>
                      <span style={{marginRight:'auto',fontSize:11,color:'#888'}}>{r.date}</span>
                    </div>
                    <p style={{fontSize:13,color:'#555',margin:0}}>{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </>
  );
}