'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function WishlistPage() {
  const [items, setItems] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'products' | 'stores'>('products');
  const [toast, setToast] = useState('');

  useEffect(() => {
    const w = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setItems(w);
  }, []);

  const remove = (id: string) => {
    const updated = items.filter(i => i._id !== id);
    setItems(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  const removeAll = () => {
    setItems([]);
    localStorage.setItem('wishlist', '[]');
  };

  const addToCart = (item: any) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((i: any) => i._id === item._id);
    if (existing) existing.quantity += 1;
    else cart.push({ ...item, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
    setToast(`✅ تمت الإضافة: ${item.name}`);
    setTimeout(() => setToast(''), 2000);
  };

  return (
    <>
      <Navbar />
      <div style={{ background: '#f7f7f7', minHeight: '100vh', direction: 'rtl', padding: '24px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 900, margin: '0 0 4px' }}>المفضلة</h1>
              <p style={{ fontSize: 13, color: '#aaa', margin: 0 }}>{items.length} منتج محفوظ</p>
            </div>
            {items.length > 0 && (
              <button onClick={removeAll}
                style={{ background: '#fff', color: '#ef4444', border: '1px solid #fecaca', padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>
                🗑️ إزالة من المفضلة ({items.length})
              </button>
            )}
          </div>

          {/* Tabs */}
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #f0e0ee', padding: '4px', marginBottom: 24, display: 'inline-flex', gap: 4 }}>
            {[{ id: 'products', label: 'المنتجات' }, { id: 'stores', label: 'المتاجر' }].map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id as any)}
                style={{ padding: '8px 24px', border: 'none', borderRadius: 9, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, background: activeTab === t.id ? '#E91E8C' : 'transparent', color: activeTab === t.id ? '#fff' : '#888', transition: 'all .2s' }}>
                {t.label}
              </button>
            ))}
          </div>

          {activeTab === 'products' && (
            items.length === 0 ? (
              <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #f0e0ee', padding: '80px 40px', textAlign: 'center' }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>🤍</div>
                <h2 style={{ fontSize: 20, fontWeight: 900, color: '#1a1a1a', marginBottom: 8 }}>قائمة المفضلة فاضية</h2>
                <p style={{ fontSize: 14, color: '#aaa', marginBottom: 24 }}>احفظ المنتجات المفضلة لديك هنا</p>
                <a href="/" style={{ display: 'inline-block', background: '#E91E8C', color: '#fff', padding: '12px 32px', borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
                  تصفح المنتجات
                </a>
              </div>
            ) : (
              <>
                {/* Sort bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <span style={{ fontSize: 13, color: '#888' }}>{items.length} منتج</span>
                  <select style={{ border: '1px solid #f0e0ee', borderRadius: 8, padding: '6px 12px', fontSize: 13, fontFamily: 'inherit', color: '#444', background: '#fff', cursor: 'pointer' }}>
                    <option>الأحدث</option>
                    <option>السعر: من الأقل</option>
                    <option>السعر: من الأعلى</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
                  {items.map(item => {
                    const discount = item.old_price ? Math.round((item.old_price - item.price) / item.old_price * 100) : null;
                    return (
                      <div key={item._id} style={{ background: '#fff', borderRadius: 14, border: '1px solid #f0e0ee', overflow: 'hidden', position: 'relative' }}>
                        {/* Remove btn */}
                        <button onClick={() => remove(item._id)}
                          style={{ position: 'absolute', top: 10, left: 10, background: '#fff', border: '1px solid #f0e0ee', borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 14, color: '#E91E8C', zIndex: 1 }}>
                          ♥
                        </button>
                        {discount && (
                          <span style={{ position: 'absolute', top: 10, right: 10, background: '#E91E8C', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, zIndex: 1 }}>
                            -{discount}%
                          </span>
                        )}
                        <a href={`/product/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <div style={{ height: 140, background: '#fff0f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {item.image && item.image !== 'no_image'
                              ? <img src={item.image} alt={item.name} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                              : <span style={{ fontSize: 50 }}>🛍️</span>}
                          </div>
                          <div style={{ padding: '12px 14px' }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
                            {item.unit && <div style={{ fontSize: 11, color: '#aaa', marginBottom: 8 }}>{item.unit}</div>}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div>
                                {item.old_price && <div style={{ fontSize: 11, color: '#bbb', textDecoration: 'line-through' }}>{item.old_price} ج</div>}
                                <div style={{ fontSize: 16, fontWeight: 800, color: '#E91E8C' }}>{item.price} ج</div>
                              </div>
                            </div>
                          </div>
                        </a>
                        <button onClick={() => addToCart(item)}
                          style={{ width: '100%', background: '#E91E8C', color: '#fff', border: 'none', padding: '10px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                          أضف للسلة 🛒
                        </button>
                      </div>
                    );
                  })}
                </div>
              </>
            )
          )}

          {activeTab === 'stores' && (
            <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #f0e0ee', padding: '60px 40px', textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🏪</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#888' }}>لا توجد متاجر محفوظة</div>
            </div>
          )}

        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: '#1a1a1a', color: '#fff', padding: '12px 24px', borderRadius: 24, fontSize: 13, fontWeight: 700, zIndex: 9999, whiteSpace: 'nowrap' }}>
          {toast}
        </div>
      )}
    </>
  );
}