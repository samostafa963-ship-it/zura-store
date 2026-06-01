'use client';
import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Toast from '../components/Toast';

const API = process.env.NEXT_PUBLIC_API_URL || '';

const FILTERS = [
  { id: 'all', label: 'الكل' },
  { id: 'discount_50', label: 'خصم 50%' },
  { id: 'discount_30', label: 'خصم 30%' },
  { id: 'discount_20', label: 'خصم 20%' },
  { id: 'new', label: 'وصل حديثاً' },
  { id: 'popular', label: 'الأكثر مبيعاً' },
];

export default function OffersPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [toast, setToast] = useState('');
  const [timeLeft, setTimeLeft] = useState({ d: 2, h: 14, m: 32, s: 45 });

  // Countdown timer
  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft(prev => {
        let { d, h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; d--; }
        if (d < 0) { d = 0; h = 0; m = 0; s = 0; }
        return { d, h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    fetch(`${API}/api/products?limit=100`)
      .then(r => r.json())
      .then(data => {
        const arr = Array.isArray(data) ? data : data.products || [];
        // تعتبر كل منتج عنده old_price عرض
        const offers = arr.filter((p: any) => p.old_price || p.discount);
        setProducts(offers.length > 0 ? offers : arr);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = [...products];
    if (activeFilter === 'discount_50') result = result.filter(p => {
      const d = p.discount || (p.old_price ? Math.round((p.old_price - p.price) / p.old_price * 100) : 0);
      return d >= 50;
    });
    else if (activeFilter === 'discount_30') result = result.filter(p => {
      const d = p.discount || (p.old_price ? Math.round((p.old_price - p.price) / p.old_price * 100) : 0);
      return d >= 30 && d < 50;
    });
    else if (activeFilter === 'discount_20') result = result.filter(p => {
      const d = p.discount || (p.old_price ? Math.round((p.old_price - p.price) / p.old_price * 100) : 0);
      return d >= 20 && d < 30;
    });
    else if (activeFilter === 'popular') result = result.slice(0, 12);
    setFiltered(result);
  }, [activeFilter, products]);

  const addToCart = (name: string) => {
    setToast(`✅ تمت الإضافة: ${name}`);
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <>
      <Navbar />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}`}</style>
      <div style={{ background: '#f7f7f7', minHeight: '100vh', direction: 'rtl' }}>

        {/* Hero Banner */}
        <div style={{ background: 'linear-gradient(135deg, #E91E8C 0%, #880E4F 100%)', padding: '40px 32px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, left: -40, width: 200, height: 200, background: 'rgba(255,255,255,.05)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: -60, right: 100, width: 280, height: 280, background: 'rgba(255,255,255,.05)', borderRadius: '50%' }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
              <div>
                <div style={{ background: 'rgba(255,255,255,.2)', color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 14px', borderRadius: 20, display: 'inline-block', marginBottom: 12 }}>
                  🔥 عروض حصرية
                </div>
                <h1 style={{ fontSize: 36, fontWeight: 900, color: '#fff', margin: '0 0 8px', lineHeight: 1.2 }}>
                  خصومات تصل إلى<br />
                  <span style={{ fontSize: 56 }}>50%</span>
                </h1>
                <p style={{ color: 'rgba(255,255,255,.8)', fontSize: 14, margin: '0 0 20px' }}>على آلاف المنتجات</p>
                <button style={{ background: '#fff', color: '#E91E8C', border: 'none', padding: '12px 28px', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                  تسوق الآن »
                </button>
              </div>

              {/* Countdown */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'rgba(255,255,255,.7)', fontSize: 13, marginBottom: 12 }}>ينتهي العرض خلال</div>
                <div style={{ display: 'flex', gap: 10 }}>
                  {[{ v: timeLeft.d, l: 'يوم' }, { v: timeLeft.h, l: 'ساعة' }, { v: timeLeft.m, l: 'دقيقة' }, { v: timeLeft.s, l: 'ثانية' }].map(({ v, l }) => (
                    <div key={l} style={{ background: 'rgba(0,0,0,.25)', borderRadius: 12, padding: '14px 16px', minWidth: 60, textAlign: 'center' }}>
                      <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', lineHeight: 1 }}>{pad(v)}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,.6)', marginTop: 4 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 32px' }}>

          {/* Filter tabs */}
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #f0e0ee', padding: '6px', marginBottom: 24, display: 'flex', gap: 4, overflowX: 'auto' }}>
            {FILTERS.map(f => (
              <button key={f.id} onClick={() => setActiveFilter(f.id)}
                style={{ padding: '9px 20px', border: 'none', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', transition: 'all .2s', background: activeFilter === f.id ? '#E91E8C' : 'transparent', color: activeFilter === f.id ? '#fff' : '#666' }}>
                {f.label}
              </button>
            ))}
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
            {[
              { n: filtered.length, l: 'منتج متاح', icon: '📦' },
              { n: '50%', l: 'أعلى خصم', icon: '🏷️' },
              { n: '30 د', l: 'توصيل سريع', icon: '🚚' },
            ].map(s => (
              <div key={s.l} style={{ flex: 1, background: '#fff', borderRadius: 12, border: '1px solid #f0e0ee', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 24 }}>{s.icon}</span>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: '#E91E8C' }}>{s.n}</div>
                  <div style={{ fontSize: 12, color: '#aaa' }}>{s.l}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Products */}
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60, gap: 10, color: '#aaa' }}>
              <div style={{ width: 24, height: 24, border: '3px solid #fce8f5', borderTopColor: '#E91E8C', borderRadius: '50%', animation: 'spin .8s linear infinite' }} />
              جاري التحميل...
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 60, color: '#bbb' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🏷️</div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>لا توجد عروض في هذا التصنيف حالياً</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 14 }}>
              {filtered.map(p => (
                <ProductCard key={p._id} product={p} onAdd={addToCart} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Toast message={toast} onHide={() => setToast('')} />
    </>
  );
}