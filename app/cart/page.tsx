'use client';
import { useState } from 'react';
import Navbar from '../components/Navbar';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  unit?: string;
}

const MOCK_ITEMS: CartItem[] = [
  { id: '1', name: 'زيت دوار الشمس عافية 1.5 لتر', price: 85, quantity: 1, unit: '1.5 لتر' },
  { id: '2', name: 'أرز فاخر 1 كجم', price: 27, quantity: 2, unit: '1 كجم' },
  { id: '3', name: 'لبن كامل الدسم 1 لتر', price: 26, quantity: 1, unit: '1 لتر' },
  { id: '4', name: 'سكر أبيض 1 كجم', price: 18, quantity: 1, unit: '1 كجم' },
];

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(MOCK_ITEMS);
  const [coupon, setCoupon] = useState('');

  const updateQty = (id: string, delta: number) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    ).filter(item => item.quantity > 0));
  };

  const remove = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const delivery = 15;
  const discount = 10;
  const total = subtotal + delivery - discount;

  return (
    <>
      <Navbar />
      <div style={{background:'#f5f5f5',minHeight:'100vh',padding:'20px 24px',direction:'rtl'}}>
        
        {/* Breadcrumb */}
        <div style={{fontSize:13,color:'#888',marginBottom:20,display:'flex',alignItems:'center',gap:6}}>
          <a href="/" style={{color:'#E91E8C',textDecoration:'none'}}>الرئيسية</a>
          <span>›</span>
          <span>سلة الطلب</span>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 340px',gap:20,alignItems:'start'}}>
          
          {/* Cart Items */}
          <div style={{background:'#fff',borderRadius:16,border:'1px solid #f0e0ee',overflow:'hidden'}}>
            <div style={{padding:'16px 20px',borderBottom:'1px solid #f0e0ee',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <h2 style={{fontSize:16,fontWeight:700}}>سلة الطلب</h2>
              <span style={{fontSize:13,color:'#888'}}>{items.length} منتجات</span>
            </div>

            {items.length === 0 ? (
              <div style={{padding:40,textAlign:'center',color:'#888'}}>
                <div style={{fontSize:48,marginBottom:12}}>🛒</div>
                <div style={{fontSize:15,fontWeight:600,marginBottom:8}}>السلة فاضية</div>
                <a href="/" style={{color:'#E91E8C',fontWeight:700,textDecoration:'none',fontSize:13}}>تسوق الآن</a>
              </div>
            ) : items.map((item, i) => (
              <div key={item.id} style={{padding:'16px 20px',borderBottom: i < items.length-1 ? '1px solid #f0e0ee' : 'none',display:'flex',alignItems:'center',gap:14}}>
                
                {/* Delete */}
                <button onClick={() => remove(item.id)} style={{background:'none',border:'none',cursor:'pointer',color:'#E91E8C',fontSize:18,padding:4,flexShrink:0}}>🗑️</button>

                {/* Image */}
                <div style={{width:60,height:60,borderRadius:10,background:'#fff0f9',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,overflow:'hidden'}}>
                  {item.image ? <img src={item.image} style={{width:'100%',height:'100%',objectFit:'contain'}} /> : <span style={{fontSize:28}}>🛍️</span>}
                </div>

                {/* Info */}
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:600,color:'#1a1a1a',marginBottom:3}}>{item.name}</div>
                  <div style={{fontSize:11,color:'#888'}}>{item.unit}</div>
                </div>

                {/* Qty */}
                <div style={{display:'flex',alignItems:'center',gap:8,flexShrink:0}}>
                  <button onClick={() => updateQty(item.id, 1)} style={{width:28,height:28,background:'#E91E8C',color:'#fff',border:'none',borderRadius:7,fontSize:18,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>+</button>
                  <span style={{fontSize:14,fontWeight:700,minWidth:20,textAlign:'center'}}>{item.quantity}</span>
                  <button onClick={() => updateQty(item.id, -1)} style={{width:28,height:28,background:'#f5f5f5',color:'#333',border:'1px solid #e0e0e0',borderRadius:7,fontSize:18,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>-</button>
                </div>

                {/* Price */}
                <div style={{fontSize:15,fontWeight:700,color:'#E91E8C',minWidth:70,textAlign:'left',flexShrink:0}}>
                  {item.price * item.quantity} ج
                </div>
              </div>
            ))}

            {items.length > 0 && (
              <div style={{padding:'14px 20px',background:'#fff0f9',display:'flex',alignItems:'center',gap:8,cursor:'pointer'}}>
                <span style={{color:'#E91E8C',fontSize:18}}>+</span>
                <span style={{fontSize:13,color:'#E91E8C',fontWeight:600}}>إضافة المزيد من المنتجات</span>
              </div>
            )}
          </div>

          {/* Summary */}
          <div style={{background:'#fff',borderRadius:16,border:'1px solid #f0e0ee',overflow:'hidden'}}>
            <div style={{padding:'16px 20px',borderBottom:'1px solid #f0e0ee'}}>
              <h2 style={{fontSize:16,fontWeight:700}}>ملخص الطلب</h2>
            </div>
            <div style={{padding:'16px 20px'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:10,fontSize:13}}>
                <span style={{color:'#888'}}>إجمالي المنتجات</span>
                <span style={{fontWeight:600}}>{subtotal} جنيه</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:10,fontSize:13}}>
                <span style={{color:'#888'}}>رسوم التوصيل</span>
                <span style={{fontWeight:600}}>{delivery} جنيه</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:16,fontSize:13}}>
                <span style={{color:'#888'}}>خصم</span>
                <span style={{fontWeight:600,color:'#E91E8C'}}>- {discount} جنيه</span>
              </div>
              <div style={{borderTop:'1px solid #f0e0ee',paddingTop:14,display:'flex',justifyContent:'space-between',marginBottom:16}}>
                <span style={{fontSize:15,fontWeight:700}}>الإجمالي</span>
                <span style={{fontSize:18,fontWeight:900,color:'#E91E8C'}}>{total} جنيه</span>
              </div>

              {/* Coupon */}
              <div style={{marginBottom:16}}>
                <div style={{fontSize:12,color:'#888',marginBottom:6}}>لديك كوبون خصم؟</div>
                <div style={{display:'flex',gap:8}}>
                  <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="اكتب الكود هنا" style={{flex:1,padding:'8px 12px',borderRadius:8,border:'1px solid #f0e0ee',fontSize:12,fontFamily:'inherit',outline:'none'}} />
                  <button style={{background:'#1a1a1a',color:'#fff',border:'none',padding:'8px 14px',borderRadius:8,fontSize:12,fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}>تطبيق</button>
                </div>
              </div>

              <a href="/checkout" style={{display:'block',background:'#E91E8C',color:'#fff',textAlign:'center',padding:'13px',borderRadius:10,fontSize:14,fontWeight:700,textDecoration:'none',transition:'background .2s'}}>
                إتمام الطلب ←
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}