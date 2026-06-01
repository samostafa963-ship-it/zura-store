'use client';
import { useState } from 'react';

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  const links = [
    { label: 'الرئيسية', href: '/' },
    { label: 'الأقسام', href: '/categories' },
    { label: 'العروض', href: '/offers' },
    { label: 'Brands', href: '/brands' },
    { label: 'تتبع الطلب', href: '/track' },
    { label: 'المساعدة', href: '/help' },
  ];

  return (
    <>
      {/* Topbar */}
      <div style={{background:'#E91E8C',color:'#fff',padding:'7px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',fontSize:'12px',fontWeight:500}}>
        <div style={{display:'flex',gap:'20px'}}>
          <span>⚡ توصيل خلال 30 دقيقة</span>
          <span>📞 19XXX</span>
        </div>
        <div style={{display:'flex',gap:'16px'}}>
          <a href="/track" style={{color:'#fff',textDecoration:'none',opacity:.9}}>تتبع طلبك</a>
          <a href="#" style={{color:'#fff',textDecoration:'none',opacity:.9}}>تحميل التطبيق</a>
        </div>
      </div>

      {/* Nav */}
      <nav style={{background:'#fff',borderBottom:'1px solid #f0e0ee',padding:'0 24px',display:'flex',alignItems:'center',gap:'12px',position:'sticky',top:0,zIndex:200,boxShadow:'0 1px 4px rgba(233,30,140,.06)'}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px',padding:'14px 40px 14px 0',borderLeft:'1px solid #f0e0ee',marginLeft:'16px'}}>
          <a href="/"><img src="/icon.png" alt="زورا" style={{height:40,objectFit:'contain',marginLeft:8}} /></a>
        </div>

        <div style={{flex:1,display:'flex',alignItems:'center',background:'#f8f0f6',border:'1.5px solid #f0e0ee',borderRadius:10,overflow:'hidden',maxWidth:600}}>
          <input placeholder="ابحث عن منتجات، أقسام، ماركات..." style={{flex:1,border:'none',background:'transparent',padding:'10px 16px',fontSize:14,outline:'none',fontFamily:'inherit',color:'#1a1a1a'}} />
          <button style={{background:'#E91E8C',color:'#fff',border:'none',padding:'10px 22px',cursor:'pointer',fontSize:14,fontFamily:'inherit',fontWeight:700}}>🔍 ابحث</button>
        </div>

        <div style={{display:'flex',alignItems:'center',gap:'2px',marginRight:'auto'}}>
          {[
            {label:'حسابي', icon:'👤', href:'/account'},
            {label:'المفضلة', icon:'🤍', href:'/wishlist'},
          ].map(b => (
            <a key={b.label} href={b.href} style={{display:'flex',alignItems:'center',gap:6,padding:'8px 14px',borderRadius:8,fontSize:13,color:'#555',textDecoration:'none',fontWeight:500}}>
              {b.icon} {b.label}
            </a>
          ))}
          <a href="/cart" style={{display:'flex',alignItems:'center',gap:6,padding:'8px 14px',borderRadius:8,fontSize:13,color:'#555',textDecoration:'none',fontWeight:500,position:'relative'}}>
            🛒 السلة
            <span style={{background:'#E91E8C',color:'#fff',borderRadius:'50%',width:17,height:17,fontSize:10,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700}}>{cartCount}</span>
          </a>
        </div>

        {/* Nav Links */}
        <div style={{display:'flex',gap:'4px',borderRight:'1px solid #f0e0ee',paddingRight:'16px'}}>
          {links.map(l => (
            <a key={l.label} href={l.href}
              style={{padding:'20px 12px',fontSize:13,color:'#333',textDecoration:'none',fontWeight:500,borderBottom:'2px solid transparent',display:'block',transition:'color .2s,border-color .2s'}}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color='#E91E8C'; (e.currentTarget as HTMLAnchorElement).style.borderBottomColor='#E91E8C'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color='#333'; (e.currentTarget as HTMLAnchorElement).style.borderBottomColor='transparent'; }}>
              {l.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}