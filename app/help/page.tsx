'use client';
import { useState } from 'react';
import Navbar from '../components/Navbar';

const FAQS = [
  { q: 'كيف يمكنني تتبع طلبي؟', a: 'بعد تأكيد الطلب ستحصل على رقم الطلب، توجه لصفحة تتبع الطلب وأدخل الرقم.' },
  { q: 'ما هي طرق الدفع المتاحة؟', a: 'نقبل الدفع عند الاستلام، بطاقات الائتمان (Visa/Mastercard)، والمحفظة الإلكترونية.' },
  { q: 'هل يمكنني إلغاء طلبي بعد تأكيده؟', a: 'يمكن إلغاء الطلب خلال 5 دقائق من تأكيده، تواصل معنا فوراً عبر الدردشة.' },
  { q: 'كم مدة التوصيل المتوقعة؟', a: 'نوصل خلال 30-60 دقيقة حسب موقعك ووقت الطلب.' },
  { q: 'ما هو الحد الأدنى للطلب؟', a: 'الحد الأدنى للطلب هو 50 ج، والتوصيل مجاني عند الطلب بأكثر من 200 ج.' },
  { q: 'كيف أسترجع منتجاً؟', a: 'نضمن جودة منتجاتنا، في حال وجود مشكلة تواصل معنا خلال 24 ساعة وسنحل الأمر فوراً.' },
];

export default function HelpPage() {
  const [open, setOpen] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);

  const filtered = FAQS.filter(f => f.q.includes(search) || f.a.includes(search));

  return (
    <>
      <Navbar />
      <div style={{ background: '#f7f7f7', minHeight: '100vh', direction: 'rtl', padding: '32px 24px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>

          <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 6 }}>صفحة المساعدة</h1>
          <p style={{ fontSize: 14, color: '#aaa', marginBottom: 28 }}>نحن هنا لمساعدتك في أي وقت</p>

          {/* Search */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #f0e0ee', padding: '14px 16px', marginBottom: 24, display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 18 }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="ابحث عن إجابة..."
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, fontFamily: 'inherit', color: '#333', background: 'transparent' }} />
          </div>

          {/* FAQs */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #f0e0ee', overflow: 'hidden', marginBottom: 24 }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f0e0ee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 18 }}>❓</span> الأسئلة الشائعة
              </h2>
              <span style={{ fontSize: 12, color: '#E91E8C', cursor: 'pointer' }}>عرض الكل</span>
            </div>
            {filtered.map((faq, i) => (
              <div key={i} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                <div onClick={() => setOpen(open === i ? null : i)}
                  style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>{faq.q}</span>
                  <span style={{ fontSize: 18, color: '#aaa', transform: open === i ? 'rotate(90deg)' : '', transition: 'transform .2s' }}>‹</span>
                </div>
                {open === i && (
                  <div style={{ padding: '0 20px 14px', fontSize: 13, color: '#666', lineHeight: 1.7, background: '#fafafa' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact options */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #f0e0ee', padding: '20px', marginBottom: 24 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>💬</span> تواصل معنا
            </h2>
            {[
              { icon: '💬', title: 'محادثة مباشرة', sub: 'تحدث مع أحد ممثلي خدمة العملاء', color: '#E91E8C', action: () => {} },
              { icon: '📞', title: 'اتصل بنا', sub: 'من 8 ص إلى 12 ص يومياً', color: '#10b981', action: () => window.open('tel:19000') },
              { icon: '✉️', title: 'راسلنا', sub: 'نرد عليك خلال 24 ساعة', color: '#f59e0b', action: () => {} },
            ].map((c, i) => (
              <div key={i} onClick={c.action}
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px', borderRadius: 12, border: '1px solid #f0e0ee', marginBottom: 10, cursor: 'pointer', transition: 'background .2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = '#fafafa'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = '#fff'}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: c.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>{c.title}</div>
                  <div style={{ fontSize: 12, color: '#aaa' }}>{c.sub}</div>
                </div>
                <div style={{ marginRight: 'auto', width: 32, height: 32, borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16 }}>›</div>
              </div>
            ))}
          </div>

          {/* Message form */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #f0e0ee', padding: '20px' }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>أرسل لنا رسالة</h2>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>✅</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#10b981' }}>تم إرسال رسالتك بنجاح!</div>
                <div style={{ fontSize: 12, color: '#aaa', marginTop: 4 }}>سنرد عليك خلال 24 ساعة</div>
              </div>
            ) : (
              <>
                <textarea value={msg} onChange={e => setMsg(e.target.value)}
                  placeholder="اكتب رسالتك هنا..."
                  rows={4}
                  style={{ width: '100%', padding: '12px', borderRadius: 10, border: '1.5px solid #f0e0ee', fontSize: 13, fontFamily: 'inherit', outline: 'none', resize: 'none', boxSizing: 'border-box', marginBottom: 12 }} />
                <button onClick={() => { if (msg.trim()) setSent(true); }}
                  style={{ background: '#E91E8C', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                  إرسال الرسالة
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </>
  );
}