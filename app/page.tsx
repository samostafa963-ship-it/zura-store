'use client';
import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Features from './components/Features';
import ProductCard from './components/ProductCard';
import Toast from './components/Toast';

const API = process.env.NEXT_PUBLIC_API_URL || '';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');
  const [cart, setCart] = useState(0);

  const loadProducts = useCallback(async (category = '', q = '') => {
    setLoading(true);
    try {
      let url = `${API}/api/products?limit=20`;
      if (category) url += `&category=${encodeURIComponent(category)}`;
      if (q) url += `&q=${encodeURIComponent(q)}`;
      const res = await fetch(url);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  const addToCart = (name: string) => {
    setCart(c => c + 1);
    setToast(`✅ تمت الإضافة: ${name}`);
  };

  return (
    <>
      <Navbar />
      <Hero />
      <Categories onSelect={cat => loadProducts(cat)} />
      <Features />

      <div style={{padding:'20px 24px',background:'#f5f5f5'}}>

        {/* Popular */}
        <div style={{marginBottom:28}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
            <div style={{display:'flex',alignItems:'center',gap:8,fontSize:16,fontWeight:700}}>
              <span style={{width:3,height:18,background:'#E91E8C',borderRadius:2,display:'inline-block'}} />
              الأكثر طلباً
            </div>
            <a style={{fontSize:12,color:'#E91E8C',fontWeight:600,cursor:'pointer'}}>عرض الكل ›</a>
          </div>
          <div style={{display:'flex',gap:12,overflowX:'auto',paddingBottom:6}}>
            {loading ? (
              <div style={{display:'flex',alignItems:'center',gap:10,padding:32,color:'#bbb',fontSize:13}}>
                <div style={{width:22,height:22,border:'2.5px solid #f0c8e8',borderTopColor:'#E91E8C',borderRadius:'50%',animation:'spin .8s linear infinite'}} />
                جاري التحميل...
                <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
              </div>
            ) : products.slice(0, 10).map(p => (
              <ProductCard key={p._id} product={p} onAdd={addToCart} />
            ))}
          </div>
        </div>

        {/* Promo Banners */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:14,marginBottom:28}}>
          {[
            { bg:'linear-gradient(120deg,#1a1a2e,#0f3460)', title:'مجمدات طازجة', sub:'أفضل الأصناف بأقل الأسعار', emoji:'🧊', btnBg:'#E91E8C', btnColor:'#fff' },
            { bg:'linear-gradient(120deg,#880E4F,#c2185b)', title:'عروض المكياج', sub:'خصم يصل لـ 50%', emoji:'💄', btnBg:'#fff', btnColor:'#880E4F' },
            { bg:'linear-gradient(120deg,#1b5e20,#2e7d32)', title:'عطارة طبيعية', sub:'أعشاب وتوابل أصيلة', emoji:'🌿', btnBg:'#FFD54F', btnColor:'#1b5e20' },
          ].map((b, i) => (
            <div key={i} style={{background:b.bg,borderRadius:16,padding:'22px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',cursor:'pointer',transition:'transform .2s'}}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform='scale(1.02)'}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform=''}>
              <div>
                <h3 style={{fontSize:17,fontWeight:900,color:'#fff',marginBottom:4}}>{b.title}</h3>
                <p style={{fontSize:11,color:'rgba(255,255,255,.8)',marginBottom:12}}>{b.sub}</p>
                <button style={{background:b.btnBg,color:b.btnColor,border:'none',padding:'7px 18px',borderRadius:20,fontSize:12,fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}>
                  تسوق الآن
                </button>
              </div>
              <span style={{fontSize:56,opacity:.9}}>{b.emoji}</span>
            </div>
          ))}
        </div>

        {/* Offers Grid */}
        <div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
            <div style={{display:'flex',alignItems:'center',gap:8,fontSize:16,fontWeight:700}}>
              <span style={{width:3,height:18,background:'#E91E8C',borderRadius:2,display:'inline-block'}} />
              عروض اليوم
            </div>
            <a style={{fontSize:12,color:'#E91E8C',fontWeight:600,cursor:'pointer'}}>عرض الكل ›</a>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:14}}>
            {loading ? null : products.slice(10, 20).map(p => (
              <div key={p._id} style={{background:'#fff',borderRadius:14,border:'1px solid #f0e0ee',cursor:'pointer',overflow:'hidden',transition:'transform .2s,box-shadow .2s'}}
                onMouseEnter={e => {const d=e.currentTarget as HTMLDivElement;d.style.transform='translateY(-4px)';d.style.boxShadow='0 8px 28px rgba(233,30,140,.1)'}}
                onMouseLeave={e => {const d=e.currentTarget as HTMLDivElement;d.style.transform='';d.style.boxShadow=''}}>
                <div style={{height:150,display:'flex',alignItems:'center',justifyContent:'center',background:'#fff0f9',position:'relative'}}>
                  {p.image && p.image !== 'no_image'
                    ? <img src={p.image} alt={p.name} style={{width:'100%',height:'100%',objectFit:'contain',padding:12}} />
                    : <span style={{fontSize:60}}>🛍️</span>}
                  {p.discount && <span style={{position:'absolute',top:10,right:10,background:'#E91E8C',color:'#fff',fontSize:10,fontWeight:700,padding:'3px 8px',borderRadius:20}}>-{p.discount}%</span>}
                </div>
                <div style={{padding:'12px 14px'}}>
                  <div style={{background:'#fce8f5',color:'#8a007a',fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:20,display:'inline-block',marginBottom:6}}>{p.category||'عرض'}</div>
                  <div style={{fontSize:13,fontWeight:700,marginBottom:3,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{p.name}</div>
                  <div style={{fontSize:11,color:'#888',marginBottom:10}}>{p.unit||''}</div>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <span style={{fontSize:17,fontWeight:700,color:'#E91E8C'}}>{p.price} ج</span>
                    <button onClick={() => addToCart(p.name)} style={{background:'#E91E8C',color:'#fff',border:'none',padding:'7px 16px',borderRadius:9,fontSize:12,fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}>
                      أضف للسلة
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* App Strip */}
      <div style={{background:'#0f0a12',padding:'28px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:20,flexWrap:'wrap'}}>
        <div>
          <h3 style={{color:'#fff',fontSize:17,fontWeight:900,marginBottom:4}}>📱 زورا — في جيبك دايماً</h3>
          <p style={{color:'rgba(255,255,255,.45)',fontSize:12}}>تسوّق بسهولة واستلم طلبك خلال 30 دقيقة</p>
        </div>
        <div style={{display:'flex',gap:24}}>
          {[{n:'+2000',l:'منتج'},{n:'30 د',l:'توصيل'},{n:'4.8 ⭐',l:'تقييم'}].map(s => (
            <div key={s.l} style={{textAlign:'center'}}>
              <span style={{fontSize:20,fontWeight:900,color:'#E91E8C',display:'block'}}>{s.n}</span>
              <span style={{fontSize:11,color:'rgba(255,255,255,.35)'}}>{s.l}</span>
            </div>
          ))}
        </div>
        <div style={{display:'flex',gap:10}}>
          {[{icon:'▶',store:'Google Play'},{icon:'',store:'App Store'}].map(b => (
            <a key={b.store} href="#" style={{display:'flex',alignItems:'center',gap:8,background:'#fff',color:'#111',border:'none',padding:'10px 18px',borderRadius:10,cursor:'pointer',fontFamily:'inherit',fontSize:13,fontWeight:700,textDecoration:'none'}}>
              <span style={{fontSize:22}}>{b.icon}</span>
              <div><small style={{fontSize:10,color:'#666',display:'block',fontWeight:400}}>حمّل من</small>{b.store}</div>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{background:'#0f0a12',padding:'32px 24px 16px',display:'grid',gridTemplateColumns:'1.5fr 1fr 1fr 1fr',gap:24}}>
        <div>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
            <div style={{width:34,height:34,borderRadius:9,background:'#E91E8C',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:16,fontWeight:900}}>ز</div>
            <span style={{color:'#fff',fontSize:18,fontWeight:900}}>زورا</span>
          </div>
          <p style={{color:'rgba(255,255,255,.35)',fontSize:12,lineHeight:1.7}}>زورا — منصة تسوق إلكترونية لكل احتياجاتك. بقالة، مجمدات، مكياج، عطارة، ومستلزمات المنزل.</p>
        </div>
        {[
          {title:'روابط سريعة', links:['الرئيسية','الأقسام','العروض','تتبع طلبك']},
          {title:'معلومات', links:['من نحن','الشروط والأحكام','سياسة الخصوصية','الأسئلة الشائعة']},
          {title:'تواصل معنا', links:['📞 19XXX','✉️ support@zuraeg.com','📍 القاهرة، مصر']},
        ].map(col => (
          <div key={col.title}>
            <h4 style={{color:'#fff',fontSize:14,fontWeight:700,marginBottom:12}}>{col.title}</h4>
            {col.links.map(l => <a key={l} href="#" style={{display:'block',color:'rgba(255,255,255,.45)',fontSize:12,marginBottom:6,textDecoration:'none'}}>{l}</a>)}
          </div>
        ))}
      </footer>
      <div style={{background:'#0a0609',textAlign:'center',padding:12,color:'rgba(255,255,255,.2)',fontSize:11,borderTop:'1px solid rgba(255,255,255,.05)'}}>
        © 2026 زورا. جميع الحقوق محفوظة
      </div>

      <Toast message={toast} onHide={() => setToast('')} />
    </>
  );
}