'use client';
import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function CheckoutPage() {
  const [payMethod, setPayMethod] = useState('cash');
  const [deliveryMethod, setDeliveryMethod] = useState('fast');

  const items = [
    { name: 'زيت دوار الشمس عافية 1.5 لتر', price: 85, qty: 1 },
    { name: 'أرز فاخر 1 كجم', price: 54, qty: 2 },
    { name: 'لبن كامل الدسم 1 لتر', price: 26, qty: 1 },
    { name: 'سكر أبيض 1 كجم', price: 18, qty: 1 },
  ];

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
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
          <a href="/cart" style={{color:'#E91E8C',textDecoration:'none'}}>سلة الطلب</a>
          <span>›</span>
          <span>إتمام الطلب</span>
        </div>

        {/* Steps */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:0,marginBottom:24,background:'#fff',borderRadius:12,padding:'14px 24px',border:'1px solid #f0e0ee'}}>
          {[{n:'1',label:'العنوان'},{n:'2',label:'وقت التوصيل'},{n:'3',label:'طريقة الدفع'}].map((s,i) => (
            <div key={i} style={{display:'flex',alignItems:'center'}}>
              <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                <div style={{width:32,height:32,borderRadius:'50%',background: i===0 ? '#E91E8C' : '#f0e0ee',color: i===0 ? '#fff' : '#888',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:700}}>{s.n}</div>
                <span style={{fontSize:11,color: i===0 ? '#E91E8C' : '#888',fontWeight: i===0 ? 700 : 400}}>{s.label}</span>
              </div>
              {i < 2 && <div style={{width:60,height:1,background:'#f0e0ee',margin:'0 8px',marginBottom:16}} />}
            </div>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 340px',gap:20,alignItems:'start'}}>

          {/* Left - Form */}
          <div style={{display:'flex',flexDirection:'column',gap:16}}>

            {/* Address */}
            <div style={{background:'#fff',borderRadius:16,border:'1px solid #f0e0ee',padding:'20px'}}>
              <h3 style={{fontSize:15,fontWeight:700,marginBottom:16,display:'flex',alignItems:'center',gap:8}}>
                <span style={{width:24,height:24,borderRadius:'50%',background:'#E91E8C',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700}}>1</span>
                العنوان
              </h3>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                <div>
                  <label style={{fontSize:12,color:'#888',display:'block',marginBottom:4}}>المنطقة</label>
                  <input placeholder="مثل: مدينة نصر، القاهرة" style={{width:'100%',padding:'10px 12px',borderRadius:8,border:'1.5px solid #f0e0ee',fontSize:13,fontFamily:'inherit',outline:'none'}} />
                </div>
                <div>
                  <label style={{fontSize:12,color:'#888',display:'block',marginBottom:4}}>الشارع</label>
                  <input placeholder="اسم الشارع والرقم" style={{width:'100%',padding:'10px 12px',borderRadius:8,border:'1.5px solid #f0e0ee',fontSize:13,fontFamily:'inherit',outline:'none'}} />
                </div>
              </div>
              <div style={{marginTop:12}}>
                <label style={{fontSize:12,color:'#888',display:'block',marginBottom:4}}>إضافة عنوان جديد +</label>
                <input placeholder="تفاصيل إضافية (الدور، الشقة، علامة مميزة)" style={{width:'100%',padding:'10px 12px',borderRadius:8,border:'1.5px solid #f0e0ee',fontSize:13,fontFamily:'inherit',outline:'none'}} />
              </div>
            </div>

            {/* Delivery Time */}
            <div style={{background:'#fff',borderRadius:16,border:'1px solid #f0e0ee',padding:'20px'}}>
              <h3 style={{fontSize:15,fontWeight:700,marginBottom:16,display:'flex',alignItems:'center',gap:8}}>
                <span style={{width:24,height:24,borderRadius:'50%',background:'#E91E8C',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700}}>2</span>
                وقت التوصيل
              </h3>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                {[
                  {id:'fast',label:'في أسرع وقت',sub:'خلال 30 - 45 دقيقة',icon:'⚡'},
                  {id:'scheduled',label:'تحديد وقت',sub:'اختر الوقت المناسب',icon:'📅'},
                ].map(d => (
                  <div key={d.id} onClick={() => setDeliveryMethod(d.id)}
                    style={{padding:'14px',borderRadius:10,border:`2px solid ${deliveryMethod===d.id ? '#E91E8C' : '#f0e0ee'}`,cursor:'pointer',background: deliveryMethod===d.id ? '#fff0f9' : '#fff',transition:'all .2s'}}>
                    <div style={{fontSize:20,marginBottom:6}}>{d.icon}</div>
                    <div style={{fontSize:13,fontWeight:700,color: deliveryMethod===d.id ? '#E91E8C' : '#1a1a1a'}}>{d.label}</div>
                    <div style={{fontSize:11,color:'#888',marginTop:2}}>{d.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment */}
            <div style={{background:'#fff',borderRadius:16,border:'1px solid #f0e0ee',padding:'20px'}}>
              <h3 style={{fontSize:15,fontWeight:700,marginBottom:16,display:'flex',alignItems:'center',gap:8}}>
                <span style={{width:24,height:24,borderRadius:'50%',background:'#E91E8C',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700}}>3</span>
                طريقة الدفع
              </h3>
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {[
                  {id:'cash',label:'الدفع عند الاستلام',icon:'💵'},
                  {id:'card',label:'بطاقة ائتمان / Visa',icon:'💳'},
                  {id:'wallet',label:'المحفظة الإلكترونية',icon:'📱'},
                ].map(p => (
                  <div key={p.id} onClick={() => setPayMethod(p.id)}
                    style={{padding:'12px 16px',borderRadius:10,border:`2px solid ${payMethod===p.id ? '#E91E8C' : '#f0e0ee'}`,cursor:'pointer',background: payMethod===p.id ? '#fff0f9' : '#fff',display:'flex',alignItems:'center',gap:12,transition:'all .2s'}}>
                    <span style={{fontSize:20}}>{p.icon}</span>
                    <span style={{fontSize:13,fontWeight:600,color: payMethod===p.id ? '#E91E8C' : '#1a1a1a'}}>{p.label}</span>
                    <div style={{marginRight:'auto',width:18,height:18,borderRadius:'50%',border:`2px solid ${payMethod===p.id ? '#E91E8C' : '#ccc'}`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                      {payMethod===p.id && <div style={{width:10,height:10,borderRadius:'50%',background:'#E91E8C'}} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right - Summary */}
          <div style={{background:'#fff',borderRadius:16,border:'1px solid #f0e0ee',overflow:'hidden',position:'sticky',top:80}}>
            <div style={{padding:'16px 20px',borderBottom:'1px solid #f0e0ee'}}>
              <h2 style={{fontSize:16,fontWeight:700}}>ملخص الطلب</h2>
            </div>
            <div style={{padding:'16px 20px'}}>
              {items.map((item, i) => (
                <div key={i} style={{display:'flex',justifyContent:'space-between',marginBottom:10,fontSize:13}}>
                  <span style={{color:'#555'}}>{item.name} × {item.qty}</span>
                  <span style={{fontWeight:600}}>{item.price * item.qty} ج</span>
                </div>
              ))}
              <div style={{borderTop:'1px solid #f0e0ee',paddingTop:12,marginTop:4}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:8,fontSize:13}}>
                  <span style={{color:'#888'}}>إجمالي المنتجات</span>
                  <span>{subtotal} جنيه</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:8,fontSize:13}}>
                  <span style={{color:'#888'}}>رسوم التوصيل</span>
                  <span>{delivery} جنيه</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:12,fontSize:13}}>
                  <span style={{color:'#888'}}>خصم</span>
                  <span style={{color:'#E91E8C'}}>- {discount} جنيه</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:16,borderTop:'1px solid #f0e0ee',paddingTop:12}}>
                  <span style={{fontSize:15,fontWeight:700}}>الإجمالي</span>
                  <span style={{fontSize:18,fontWeight:900,color:'#E91E8C'}}>{total} جنيه</span>
                </div>
                <button style={{width:'100%',background:'#E91E8C',color:'#fff',border:'none',padding:'13px',borderRadius:10,fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}>
                  أكد الطلب ←
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}