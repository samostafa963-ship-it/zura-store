'use client';
import { useState, useEffect } from 'react';

const slides = [
  { bg: 'linear-gradient(120deg,#E91E8C 60%,#c2185b)', title: 'عروض حصرية', sub: 'خصم يصل حتى', percent: '40%', desc: 'على أكثر من 2000 منتج', emoji: '🛒' },
  { bg: 'linear-gradient(120deg,#1a4a7a 60%,#1565c0)', title: 'مجمدات وألبان', sub: 'طازجة يومياً', percent: '', desc: 'من أفضل الموردين لبيتك', emoji: '🧊' },
  { bg: 'linear-gradient(120deg,#880E4F 60%,#c2185b)', title: 'مكياج وعناية', sub: 'أفضل الماركات', percent: '', desc: 'أحدث منتجات الجمال', emoji: '💄' },
  { bg: 'linear-gradient(120deg,#1b5e20 60%,#2e7d32)', title: 'عطارة طبيعية', sub: '100% طبيعية', percent: '', desc: 'أعشاب وتوابل أصيلة', emoji: '🌿' },
  { bg: 'linear-gradient(120deg,#4a148c 60%,#7b1fa2)', title: 'آيس كريم', sub: 'أكتر من 50 صنف', percent: '', desc: 'أشهى النكهات لكل العيلة', emoji: '🍦' },
];

export default function Hero() {
  const [cur, setCur] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCur(c => (c + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const s = slides[cur];

  return (
    <div style={{position:'relative',overflow:'hidden',height:260}}>
      <div style={{background:s.bg,height:'100%',display:'flex',alignItems:'center',padding:'32px 48px',transition:'background 0.5s'}}>
        <div style={{zIndex:2,maxWidth:'55%'}}>
          <p style={{color:'rgba(255,255,255,.85)',fontSize:14,marginBottom:4}}>{s.sub}</p>
          <h2 style={{color:'#fff',fontSize:32,fontWeight:900,lineHeight:1.2,marginBottom:4}}>{s.title}</h2>
          {s.percent && <div style={{color:'#FFD54F',fontSize:52,fontWeight:900,lineHeight:1,marginBottom:8}}>{s.percent}</div>}
          <p style={{color:'rgba(255,255,255,.8)',fontSize:13,marginBottom:20}}>{s.desc}</p>
          <button style={{background:'#fff',border:'none',padding:'11px 28px',borderRadius:24,fontSize:14,fontWeight:700,cursor:'pointer',color:'#E91E8C',fontFamily:'inherit'}}>
            تسوق الآن
          </button>
        </div>
        <div style={{position:'absolute',left:80,top:'50%',transform:'translateY(-50%)',fontSize:110,opacity:.15,pointerEvents:'none'}}>
          {s.emoji}
        </div>
        <div style={{position:'absolute',left:60,top:'50%',transform:'translateY(-50%)',fontSize:90,zIndex:2,pointerEvents:'none'}}>
          {s.emoji}
        </div>
      </div>

      {/* Arrows */}
      <button onClick={() => setCur(c => (c - 1 + slides.length) % slides.length)}
        style={{position:'absolute',right:14,top:'50%',transform:'translateY(-50%)',background:'rgba(255,255,255,.2)',color:'#fff',border:'none',width:36,height:36,borderRadius:'50%',fontSize:22,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',zIndex:10}}>
        ›
      </button>
      <button onClick={() => setCur(c => (c + 1) % slides.length)}
        style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',background:'rgba(255,255,255,.2)',color:'#fff',border:'none',width:36,height:36,borderRadius:'50%',fontSize:22,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',zIndex:10}}>
        ‹
      </button>

      {/* Dots */}
      <div style={{position:'absolute',bottom:14,left:'50%',transform:'translateX(-50%)',display:'flex',gap:6,zIndex:10}}>
        {slides.map((_, i) => (
          <div key={i} onClick={() => setCur(i)} style={{width: i===cur ? 20 : 7,height:7,borderRadius:4,background: i===cur ? '#fff' : 'rgba(255,255,255,.4)',cursor:'pointer',transition:'all .3s'}} />
        ))}
      </div>
    </div>
  );
}