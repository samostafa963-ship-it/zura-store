'use client';

const cats = [
  { id: '', icon: '🏠', name: 'عرض الكل' },
  { id: 'grocery', icon: '🛒', name: 'بقلة' },
  { id: 'meat', icon: '🥩', name: 'لحوم' },
  { id: 'poultry', icon: '🍗', name: 'دواجن' },
  { id: 'fish', icon: '🐟', name: 'أسماك' },
  { id: 'dairy', icon: '🥛', name: 'ألبان' },
  { id: 'frozen', icon: '🧊', name: 'مجمدات' },
  { id: 'snacks', icon: '🍫', name: 'سناكس' },
  { id: 'icecream', icon: '🍦', name: 'آيس كريم' },
  { id: 'makeup', icon: '💄', name: 'مكياج' },
  { id: 'herbs', icon: '🌿', name: 'عطارة' },
  { id: 'home', icon: '🏡', name: 'المنزل' },
];

export default function Categories({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div style={{background:'#fff',borderBottom:'1px solid #f0e0ee',padding:'0 24px',display:'flex',overflowX:'auto',gap:0}}>
      {cats.map(c => (
        <div key={c.id} onClick={() => onSelect(c.id)}
          style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4,padding:'10px 16px',cursor:'pointer',borderBottom:'2.5px solid transparent',whiteSpace:'nowrap',minWidth:72,transition:'all .2s'}}
          onMouseEnter={e => {(e.currentTarget as HTMLDivElement).style.borderBottomColor='#E91E8C'}}
          onMouseLeave={e => {(e.currentTarget as HTMLDivElement).style.borderBottomColor='transparent'}}
        >
          <span style={{fontSize:20}}>{c.icon}</span>
          <span style={{fontSize:11,fontWeight:600,color:'#666'}}>{c.name}</span>
        </div>
      ))}
    </div>
  );
}