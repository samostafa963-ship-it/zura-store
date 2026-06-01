'use client';
import { useState } from 'react';
import Navbar from '../components/Navbar';

const STEPS = [
  { id: 'placed', label: 'تم الطلب', icon: '📋' },
  { id: 'preparing', label: 'جاري التحضير', icon: '👨‍🍳' },
  { id: 'onway', label: 'في الطريق', icon: '🛵' },
  { id: 'delivered', label: 'تم التوصيل', icon: '✅' },
];

export default function TrackPage() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const track = async () => {
    if (!orderId.trim()) return;
    setLoading(true); setError(''); setOrder(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId.trim()}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setOrder(data);
    } catch {
      setError('لم يتم العثور على الطلب، تحقق من الرقم وحاول مرة أخرى');
    } finally {
      setLoading(false);
    }
  };

  const currentStep = order ? STEPS.findIndex(s => s.id === order.status) : -1;

  return (
    <>
      <Navbar />
      <div style={{ background: '#f7f7f7', minHeight: '100vh', direction: 'rtl', padding: '32px 24px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>

          <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 6 }}>تتبع طلبك</h1>
          <p style={{ fontSize: 14, color: '#aaa', marginBottom: 28 }}>أدخل رقم الطلب لمعرفة حالته</p>

          {/* Search */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #f0e0ee', padding: 20, marginBottom: 24 }}>
            <label style={{ fontSize: 13, color: '#888', display: 'block', marginBottom: 8 }}>رقم الطلب</label>
            <div style={{ display: 'flex', gap: 10 }}>
              <input value={orderId} onChange={e => setOrderId(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && track()}
                placeholder="مثال: 664abc123..."
                style={{ flex: 1, padding: '11px 14px', borderRadius: 10, border: '1.5px solid #f0e0ee', fontSize: 14, fontFamily: 'inherit', outline: 'none' }} />
              <button onClick={track} disabled={loading}
                style={{ background: '#E91E8C', color: '#fff', border: 'none', padding: '11px 24px', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', minWidth: 100 }}>
                {loading ? '...' : '🔍 تتبع'}
              </button>
            </div>
            {error && <div style={{ marginTop: 10, fontSize: 13, color: '#ef4444', background: '#fef2f2', padding: '8px 12px', borderRadius: 8 }}>{error}</div>}
          </div>

          {order && (
            <>
              {/* Status card */}
              <div style={{ background: 'linear-gradient(135deg,#E91E8C,#880E4F)', borderRadius: 16, padding: '24px', marginBottom: 20, color: '#fff' }}>
                <div style={{ fontSize: 13, opacity: .8, marginBottom: 6 }}>
                  {currentStep === 2 ? 'طلبك في الطريق إليك خلال' : currentStep === 3 ? 'تم توصيل طلبك' : 'جاري تحضير طلبك'}
                </div>
                {currentStep === 2 && (
                  <div style={{ fontSize: 48, fontWeight: 900, lineHeight: 1 }}>32 <span style={{ fontSize: 18 }}>دقيقة</span></div>
                )}
                <div style={{ fontSize: 13, opacity: .7, marginTop: 6 }}>متوقع الوصول: 12:45 م</div>
              </div>

              {/* Progress steps */}
              <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #f0e0ee', padding: '24px', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  {STEPS.map((step, i) => (
                    <div key={step.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                      {i < STEPS.length - 1 && (
                        <div style={{ position: 'absolute', top: 16, right: '-50%', width: '100%', height: 3, background: i < currentStep ? '#E91E8C' : '#f0e0ee', zIndex: 0 }} />
                      )}
                      <div style={{ width: 34, height: 34, borderRadius: '50%', background: i <= currentStep ? '#E91E8C' : '#f0e0ee', color: i <= currentStep ? '#fff' : '#aaa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, zIndex: 1, marginBottom: 8, border: i === currentStep ? '3px solid #fce8f5' : 'none' }}>
                        {i < currentStep ? '✓' : step.icon}
                      </div>
                      <div style={{ fontSize: 11, color: i <= currentStep ? '#E91E8C' : '#aaa', fontWeight: i === currentStep ? 700 : 400, textAlign: 'center' }}>{step.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order details */}
              <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #f0e0ee', padding: '20px', marginBottom: 20 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>تفاصيل الطلب</h3>
                {[
                  { label: 'رقم الطلب', val: `#${order._id?.slice(-8).toUpperCase()}` },
                  { label: 'التاريخ', val: new Date(order.createdAt).toLocaleDateString('ar-EG') },
                  { label: 'طريقة الدفع', val: order.paymentMethod === 'cash' ? 'دفع عند الاستلام' : order.paymentMethod },
                  { label: 'المجموع الكلي', val: `${order.total} ج`, color: '#E91E8C' },
                ].map(r => (
                  <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 13 }}>
                    <span style={{ color: '#888' }}>{r.label}</span>
                    <span style={{ fontWeight: 600, color: r.color || '#333' }}>{r.val}</span>
                  </div>
                ))}
              </div>

              {/* Delivery info */}
              {order.address && (
                <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #f0e0ee', padding: '20px' }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>معلومات التوصيل</h3>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 20 }}>🏠</span>
                    <div style={{ fontSize: 13, color: '#555', lineHeight: 1.7 }}>
                      {order.address.street}، {order.address.area}<br />
                      {order.address.details}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}