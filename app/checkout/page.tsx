'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  unit?: string;
}

export default function CheckoutPage() {
  const [payMethod, setPayMethod] = useState('cash');
  const [deliveryMethod, setDeliveryMethod] = useState('fast');
  const [items, setItems] = useState<CartItem[]>([]);
  const [form, setForm] = useState({ area: '', street: '', details: '', name: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setItems(cart);
  }, []);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const delivery = subtotal >= 200 ? 0 : 25;
  const total = subtotal + delivery;

  const handleOrder = async () => {
    if (!form.name || !form.phone || !form.area || !form.street) {
      alert('من فضلك اكمل بيانات العنوان والاسم والهاتف');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ product: i._id, name: i.name, price: i.price, quantity: i.quantity, image: i.image })),
          address: { area: form.area, street: form.street, details: form.details },
          customer: { name: form.name, phone: form.phone },
          paymentMethod: payMethod,
          deliveryMethod,
          subtotal,
          deliveryFee: delivery,
          total,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.removeItem('cart');
        window.dispatchEvent(new Event('cart-updated'));
        setOrderId(data._id || data.orderId || '#' + Date.now().toString().slice(-6));
        setDone(true);
      } else {
        alert(data.message || 'حدث خطأ، حاول مرة أخرى');
      }
    } catch {
      alert('تعذر الاتصال بالسيرفر');
    } finally {
      setLoading(false);
    }
  };

  // Success screen
  if (done) return (
    <>
      <Navbar />
      <div style={{ background: '#f7f7f7', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', direction: 'rtl' }}>
        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #f0e0ee', padding: '60px 48px', textAlign: 'center', maxWidth: 440 }}>
          <div style={{ width: 80, height: 80, background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 40 }}>✅</div>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: '#1a1a1a', marginBottom: 8 }}>تم تأكيد طلبك!</h2>
          <p style={{ fontSize: 14, color: '#aaa', marginBottom: 6 }}>رقم الطلب</p>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#E91E8C', marginBottom: 20 }}>{orderId}</div>
          <p style={{ fontSize: 13, color: '#888', marginBottom: 28, lineHeight: 1.7 }}>سيتم التواصل معك قريباً لتأكيد التوصيل. متوسط وقت التوصيل 30-60 دقيقة.</p>
          <a href="/" style={{ display: 'block', background: '#E91E8C', color: '#fff', padding: '13px', borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
            العودة للتسوق
          </a>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Navbar />
      <div style={{ background: '#f7f7f7', minHeight: '100vh', padding: '20px 32px', direction: 'rtl' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Breadcrumb */}
          <div style={{ fontSize: 13, color: '#999', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
            <a href="/" style={{ color: '#555', textDecoration: 'none' }}>الرئيسية</a>
            <span style={{ color: '#ccc' }}>›</span>
            <a href="/cart" style={{ color: '#555', textDecoration: 'none' }}>السلة</a>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#333' }}>إتمام الطلب</span>
          </div>

          {/* Steps */}
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #f0e0ee', padding: '16px 24px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
            {[{ n: '1', label: 'بياناتك' }, { n: '2', label: 'العنوان' }, { n: '3', label: 'الدفع' }].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#E91E8C', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>{s.n}</div>
                  <span style={{ fontSize: 11, color: '#E91E8C', fontWeight: 700 }}>{s.label}</span>
                </div>
                {i < 2 && <div style={{ width: 60, height: 1, background: '#f0e0ee', margin: '0 8px', marginBottom: 16 }} />}
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Customer info */}
              <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #f0e0ee', padding: '20px' }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#E91E8C', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>1</span>
                  بياناتك
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    { k: 'name', label: 'الاسم', ph: 'اسمك الكامل' },
                    { k: 'phone', label: 'رقم الهاتف', ph: '01xxxxxxxxx' },
                  ].map(f => (
                    <div key={f.k}>
                      <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>{f.label} *</label>
                      <input value={(form as any)[f.k]} onChange={e => set(f.k, e.target.value)}
                        placeholder={f.ph}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #f0e0ee', fontSize: 13, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #f0e0ee', padding: '20px' }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#E91E8C', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>2</span>
                  العنوان
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                  {[
                    { k: 'area', label: 'المنطقة', ph: 'مثل: مدينة نصر، القاهرة' },
                    { k: 'street', label: 'الشارع', ph: 'اسم الشارع والرقم' },
                  ].map(f => (
                    <div key={f.k}>
                      <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>{f.label} *</label>
                      <input value={(form as any)[f.k]} onChange={e => set(f.k, e.target.value)}
                        placeholder={f.ph}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #f0e0ee', fontSize: 13, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>تفاصيل إضافية</label>
                  <input value={form.details} onChange={e => set('details', e.target.value)}
                    placeholder="الدور، الشقة، علامة مميزة"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #f0e0ee', fontSize: 13, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>

              {/* Delivery Time */}
              <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #f0e0ee', padding: '20px' }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#E91E8C', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>3</span>
                  وقت التوصيل
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    { id: 'fast', label: 'في أسرع وقت', sub: 'خلال 30 - 45 دقيقة', icon: '⚡' },
                    { id: 'scheduled', label: 'تحديد وقت', sub: 'اختر الوقت المناسب', icon: '📅' },
                  ].map(d => (
                    <div key={d.id} onClick={() => setDeliveryMethod(d.id)}
                      style={{ padding: '14px', borderRadius: 10, border: `2px solid ${deliveryMethod === d.id ? '#E91E8C' : '#f0e0ee'}`, cursor: 'pointer', background: deliveryMethod === d.id ? '#fff0f9' : '#fff', transition: 'all .2s' }}>
                      <div style={{ fontSize: 20, marginBottom: 6 }}>{d.icon}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: deliveryMethod === d.id ? '#E91E8C' : '#1a1a1a' }}>{d.label}</div>
                      <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{d.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment */}
              <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #f0e0ee', padding: '20px' }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#E91E8C', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>4</span>
                  طريقة الدفع
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { id: 'cash', label: 'الدفع عند الاستلام', icon: '💵' },
                    { id: 'card', label: 'بطاقة ائتمان / Visa', icon: '💳' },
                    { id: 'wallet', label: 'محفظة إلكترونية (فودافون - اتصالات)', icon: '📱' },
                  ].map(p => (
                    <div key={p.id} onClick={() => setPayMethod(p.id)}
                      style={{ padding: '12px 16px', borderRadius: 10, border: `2px solid ${payMethod === p.id ? '#E91E8C' : '#f0e0ee'}`, cursor: 'pointer', background: payMethod === p.id ? '#fff0f9' : '#fff', display: 'flex', alignItems: 'center', gap: 12, transition: 'all .2s' }}>
                      <span style={{ fontSize: 20 }}>{p.icon}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: payMethod === p.id ? '#E91E8C' : '#1a1a1a' }}>{p.label}</span>
                      <div style={{ marginRight: 'auto', width: 18, height: 18, borderRadius: '50%', border: `2px solid ${payMethod === p.id ? '#E91E8C' : '#ccc'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {payMethod === p.id && <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#E91E8C' }} />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Summary */}
            <div style={{ position: 'sticky', top: 80 }}>
              <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #f0e0ee', overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #f0e0ee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>ملخص الطلب</h2>
                  <span style={{ background: '#fce8f5', color: '#E91E8C', fontSize: 12, fontWeight: 700, padding: '2px 10px', borderRadius: 20 }}>{items.length} منتج</span>
                </div>
                <div style={{ padding: '16px 20px' }}>
                  {/* Items */}
                  <div style={{ maxHeight: 200, overflowY: 'auto', marginBottom: 14 }}>
                    {items.map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 8, background: '#fff0f9', border: '1px solid #f0e0ee', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                          {item.image && item.image !== 'no_image'
                            ? <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            : <span style={{ fontSize: 18 }}>🛍️</span>}
                        </div>
                        <div style={{ flex: 1, fontSize: 12, color: '#555', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.name} × {item.quantity}
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#333', flexShrink: 0 }}>{item.price * item.quantity} ج</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px solid #f0e0ee', paddingTop: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
                      <span style={{ color: '#888' }}>إجمالي المنتجات</span>
                      <span>{subtotal} ج</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 13 }}>
                      <span style={{ color: '#888' }}>رسوم التوصيل</span>
                      <span style={{ color: delivery === 0 ? '#16a34a' : '#333' }}>{delivery === 0 ? 'مجاني 🎉' : `${delivery} ج`}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, borderTop: '2px dashed #f0e0ee', paddingTop: 12 }}>
                      <span style={{ fontSize: 15, fontWeight: 800 }}>الإجمالي</span>
                      <span style={{ fontSize: 20, fontWeight: 900, color: '#E91E8C' }}>{total} ج</span>
                    </div>
                    <button onClick={handleOrder} disabled={loading}
                      style={{ width: '100%', background: loading ? '#f0e0ee' : '#E91E8C', color: loading ? '#aaa' : '#fff', border: 'none', padding: '14px', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', transition: 'background .2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                      {loading
                        ? <><div style={{ width: 18, height: 18, border: '2px solid #ccc', borderTopColor: '#E91E8C', borderRadius: '50%', animation: 'spin .8s linear infinite' }} /> جاري التأكيد...</>
                        : 'أكد الطلب ←'}
                    </button>
                    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}