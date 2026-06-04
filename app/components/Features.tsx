export default function Features() {
  const items = [
    { icon: '🚚', title: 'توصيل سريع', sub: 'توصيل في نفس اليوم' },
    { icon: '🎁', title: 'عروض حصرية', sub: 'خصومات يومية على 2000+ منتج' },
    { icon: '🥬', title: 'منتجات طازجة', sub: 'نضمن لك أعلى جودة' },
    { icon: '🔒', title: 'دفع آمن', sub: 'طرق دفع متعددة وآمنة 100%' },
  ];

  return (
    <div style={{background:'#fff',padding:'14px 24px',display:'flex',borderBottom:'1px solid #f0e0ee'}}>
      {items.map((item, i) => (
        <div key={i} style={{flex:1,display:'flex',alignItems:'center',gap:10,padding:'8px 16px',borderLeft: i < items.length-1 ? '1px solid #f0e0ee' : 'none'}}>
          <div style={{width:38,height:38,borderRadius:10,background:'#fce8f5',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>
            {item.icon}
          </div>
          <div>
            <strong style={{fontSize:13,fontWeight:700,color:'#1a1a1a',display:'block'}}>{item.title}</strong>
            <span style={{fontSize:11,color:'#888'}}>{item.sub}</span>
          </div>
        </div>
      ))}
    </div>
  );
}