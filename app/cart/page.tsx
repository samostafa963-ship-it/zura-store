'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  old_price?: number;
  image?: string;
  quantity: number;
  unit?: string;
  category?: string;
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setItems(cart);
  }, []);

  const save = (updated: CartItem[]) => {
    setItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const updateQty = (id: string, delta: number) => {
    const updated = items.map(i => i._id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i).filter(i => i.quantity > 0);
    save(updated);
  };

  const remove = (id: string) => save(items.filter(i => i._id !== id));
  const clearCart = () => save([]);

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const delivery = subtotal >= 200 ? 0 : 25;
  const couponDiscount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + delivery - couponDiscount;

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'ZURA10') setCouponApplied(true);
    else alert('كود الخصم غير صحيح');
  };

  if (!mounted) return <><Navbar /></>;

  return (
    <>
      <Navbar />
      <style>{`
        @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .cart-row { animation: fadeIn .25s ease; }
        .remove-btn:hover { background: #fff0f9 !important; }
        .checkout-btn:hover { background: #c91678 !important; }
        .continue-btn:hover { background: #fce8f5 !important; }
      `}</style>

      <div style={{ background: '#f7f7f7', minHeight: '100vh', padding: '20px 32px', direction: 'rtl' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Breadcrumb */}
          <div style={{ fontSize: 13, color: '#999', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
            <a href="/" style={{ color: '#555', textDecoration: 'none' }}>الرئيسية</a>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#333' }}>سلة الطلب</span>
          </div>

          {items.length === 0 ? (
            /* Empty state */
            <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #f0e0ee', padding: '80px 40px', textAlign: 'center' }}>
              <div style={{ fontSize: 80, marginBottom: 16 }}>🛒</div>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: '#1a1a1a', marginBottom: 8 }}>سلتك فاضية!</h2>
              <p style={{ fontSize: 14, color: '#aaa', marginBottom: 28 }}>ابدأ التسوق وأضف منتجاتك المفضلة</p>
              <a href="/" style={{ display: 'inline-block', background: '#E91E8C', color: '#fff', padding: '13px 36px', borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
                تسوق الآن »
              </a>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'start' }}>

              {/* Cart Items */}
              <div>
                {/* Header */}
                <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #f0e0ee', overflow: 'hidden', marginBottom: 12 }}>
                  <div style={{ padding: '16px 20px', borderBottom: '1px solid #f0e0ee', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <h2 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>سلة الطلب</h2>
                      <span style={{ background: '#fce8f5', color: '#E91E8C', fontSize: 12, fontWeight: 700, padding: '2px 10px', borderRadius: 20 }}>{items.length} منتج</span>
                    </div>
                    <button onClick={clearCart} style={{ fontSize: 12, color: '#aaa', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                      🗑️ مسح الكل
                    </button>
                  </div>

                  {/* Free delivery progress */}
                  {delivery > 0 && (
                    <div style={{ padding: '10px 20px', background: '#fffbf0', borderBottom: '1px solid #f0e0ee' }}>
                      <div style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>
                        أضف <strong style={{ color: '#E91E8C' }}>{200 - subtotal} ج</strong> وأكثر للحصول على توصيل مجاني 🎉
                      </div>
                      <div style={{ height: 5, background: '#f0e0ee', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: '#E91E8C', borderRadius: 4, width: `${Math.min((subtotal / 200) * 100, 100)}%`, transition: 'width .4s' }} />
                      </div>
                    </div>
                  )}
                  {delivery === 0 && (
                    <div style={{ padding: '8px 20px', background: '#f0fdf4', borderBottom: '1px solid #dcfce7', fontSize: 12, color: '#16a34a', fontWeight: 600 }}>
                      ✅ مبروك! حصلت على توصيل مجاني
                    </div>
                  )}

                  {/* Items */}
                  {items.map((item, i) => (
                    <div key={item._id} className="cart-row"
                      style={{ padding: '16px 20px', borderBottom: i < items.length - 1 ? '1px solid #f5f5f5' : 'none', display: 'flex', alignItems: 'center', gap: 14 }}>

                      {/* Image */}
                      <div style={{ width: 70, height: 70, borderRadius: 12, background: '#fff0f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', border: '1px solid #f0e0ee' }}>
                        {item.image && item.image !== 'no_image'
                          ? <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 6 }} />
                          : <span style={{ fontSize: 32 }}>🛍️</span>}
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1 }}>
                        <a href={`/product/${item._id}`} style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a', marginBottom: 3, display: 'block', textDecoration: 'none' }}>{item.name}</a>
                        {item.unit && <div style={{ fontSize: 11, color: '#aaa', marginBottom: 4 }}>{item.unit}</div>}
                        {item.category && <span style={{ background: '#fce8f5', color: '#8a007a', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>{item.category}</span>}
                      </div>

                      {/* Qty */}
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #f0e0ee', borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                        <button onClick={() => updateQty(item._id, -1)}
                          style={{ width: 34, height: 34, background: '#fff', border: 'none', cursor: 'pointer', fontSize: 18, color: '#555', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                        <span style={{ width: 36, textAlign: 'center', fontSize: 14, fontWeight: 700 }}>{item.quantity}</span>
                        <button onClick={() => updateQty(item._id, 1)}
                          style={{ width: 34, height: 34, background: '#E91E8C', border: 'none', cursor: 'pointer', fontSize: 18, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                      </div>

                      {/* Price */}
                      <div style={{ textAlign: 'left', flexShrink: 0, minWidth: 80 }}>
                        <div style={{ fontSize: 16, fontWeight: 800, color: '#E91E8C' }}>{item.price * item.quantity} ج</div>
                        {item.quantity > 1 && <div style={{ fontSize: 11, color: '#aaa' }}>{item.price} ج × {item.quantity}</div>}
                      </div>

                      {/* Remove */}
                      <button className="remove-btn" onClick={() => remove(item._id)}
                        style={{ background: '#fff', border: '1px solid #f0e0ee', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0, transition: 'background .2s' }}>
                        🗑️
                      </button>
                    </div>
                  ))}

                  {/* Add more */}
                  <a href="/" style={{ padding: '14px 20px', background: '#fafafa', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', textDecoration: 'none', borderTop: '1px solid #f0e0ee' }}>
                    <span style={{ color: '#E91E8C', fontSize: 20, fontWeight: 700 }}>+</span>
                    <span style={{ fontSize: 13, color: '#E91E8C', fontWeight: 600 }}>إضافة المزيد من المنتجات</span>
                  </a>
                </div>
              </div>

              {/* Summary */}
              <div style={{ position: 'sticky', top: 80 }}>
                <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #f0e0ee', overflow: 'hidden' }}>
                  <div style={{ padding: '16px 20px', borderBottom: '1px solid #f0e0ee' }}>
                    <h2 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>ملخص الطلب</h2>
                  </div>
                  <div style={{ padding: '20px' }}>

                    {/* Lines */}
                    {[
                      { label: 'إجمالي المنتجات', val: `${subtotal} ج`, color: '#333' },
                      { label: 'رسوم التوصيل', val: delivery === 0 ? 'مجاني 🎉' : `${delivery} ج`, color: delivery === 0 ? '#16a34a' : '#333' },
                      ...(couponApplied ? [{ label: 'خصم الكوبون (10%)', val: `- ${couponDiscount} ج`, color: '#E91E8C' }] : []),
                    ].map(r => (
                      <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 13 }}>
                        <span style={{ color: '#888' }}>{r.label}</span>
                        <span style={{ fontWeight: 600, color: r.color }}>{r.val}</span>
                      </div>
                    ))}

                    <div style={{ borderTop: '2px dashed #f0e0ee', paddingTop: 14, display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                      <span style={{ fontSize: 15, fontWeight: 800 }}>الإجمالي</span>
                      <span style={{ fontSize: 22, fontWeight: 900, color: '#E91E8C' }}>{total} ج</span>
                    </div>

                    {/* Coupon */}
                    {!couponApplied && (
                      <div style={{ marginBottom: 16 }}>
                        <div style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>لديك كوبون خصم؟</div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <input value={coupon} onChange={e => setCoupon(e.target.value)}
                            placeholder="كود الخصم" onKeyDown={e => e.key === 'Enter' && applyCoupon()}
                            style={{ flex: 1, padding: '9px 12px', borderRadius: 8, border: '1px solid #f0e0ee', fontSize: 12, fontFamily: 'inherit', outline: 'none' }} />
                          <button onClick={applyCoupon}
                            style={{ background: '#1a1a1a', color: '#fff', border: 'none', padding: '9px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                            تطبيق
                          </button>
                        </div>
                        <div style={{ fontSize: 11, color: '#ccc', marginTop: 4 }}>جرب: ZURA10</div>
                      </div>
                    )}
                    {couponApplied && (
                      <div style={{ background: '#f0fdf4', border: '1px solid #dcfce7', borderRadius: 8, padding: '8px 12px', marginBottom: 16, fontSize: 12, color: '#16a34a', fontWeight: 600 }}>
                        ✅ تم تطبيق كوبون خصم 10%
                      </div>
                    )}

                    <a href="/checkout" className="checkout-btn"
                      style={{ display: 'block', background: '#E91E8C', color: '#fff', textAlign: 'center', padding: '14px', borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: 'none', transition: 'background .2s', marginBottom: 10 }}>
                      إتمام الطلب ←
                    </a>
                    <a href="/" className="continue-btn"
                      style={{ display: 'block', background: '#f5f5f5', color: '#555', textAlign: 'center', padding: '11px', borderRadius: 12, fontSize: 13, fontWeight: 600, textDecoration: 'none', transition: 'background .2s' }}>
                      متابعة التسوق
                    </a>

                    {/* Trust badges */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16 }}>
                      {['🔒 دفع آمن', '↩ إرجاع مجاني', '🚚 توصيل سريع'].map(b => (
                        <div key={b} style={{ fontSize: 10, color: '#aaa', textAlign: 'center' }}>{b}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </>
  );
}