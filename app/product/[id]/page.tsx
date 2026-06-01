'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../components/Navbar';

const API = process.env.NEXT_PUBLIC_API_URL || '';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [fav, setFav] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState('desc');
  const [toast, setToast] = useState('');

  useEffect(() => {
    fetch(`${API}/api/products/${id}`)
      .then(r => r.json())
      .then(data => { setProduct(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((i: any) => i._id === product._id);
    if (existing) existing.quantity += qty;
    else cart.push({ ...product, quantity: qty });
    localStorage.setItem('cart', JSON.stringify(cart));
    setToast(`تمت الإضافة: ${product.name}`);
    setTimeout(() => setToast(''), 2500);
  };

  const images = product?.images?.length
    ? product.images
    : product?.image && product.image !== 'no_image'
      ? [product.image]
      : [];

  if (loading) return (
    <>
      <Navbar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 10, color: '#888' }}>
        <div style={{ width: 24, height: 24, border: '3px solid #fce8f5', borderTopColor: '#E91E8C', borderRadius: '50%', animation: 'spin .8s linear infinite' }} />
        جاري التحميل...
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </>
  );

  if (!product) return (
    <>
      <Navbar />
      <div style={{ textAlign: 'center', padding: 60, color: '#888' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>😕</div>
        <div style={{ fontSize: 16, fontWeight: 700 }}>المنتج غير موجود</div>
        <a href="/" style={{ color: '#E91E8C', fontSize: 13, marginTop: 8, display: 'block' }}>العودة للرئيسية</a>
      </div>
    </>
  );

  const discount = product.old_price
    ? Math.round(((product.old_price - product.price) / product.old_price) * 100)
    : null;

  const rating = product.rating || 0;
  const reviewsCount = product.reviews_count || 0;
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <>
      <Navbar />
      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }
        .thumb-item { border:2px solid transparent; border-radius:10px; overflow:hidden; cursor:pointer; transition:border-color .2s; background:#fff; }
        .thumb-item.active { border-color:#E91E8C; }
        .thumb-item:hover { border-color:#f8a8d8; }
        .tab-btn { padding:14px 24px; border:none; background:transparent; cursor:pointer; font-size:14px; font-weight:600; font-family:inherit; transition:color .2s; }
        .add-btn:hover { background:#c91678 !important; }
        .buy-btn:hover { background:#fce8f5 !important; }
        .related-card:hover { transform:translateY(-3px); box-shadow:0 6px 20px rgba(233,30,140,.12); }
        .qty-btn:hover { background:#f5f5f5 !important; }
      `}</style>

      <div style={{ background: '#f7f7f7', minHeight: '100vh', direction: 'rtl', fontFamily: 'inherit' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 24px' }}>

          {/* Breadcrumb */}
          <div style={{ fontSize: 13, color: '#999', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
            <a href="/" style={{ color: '#555', textDecoration: 'none' }}>الرئيسية</a>
            <span style={{ color: '#ccc' }}>›</span>
            {product.category && <><a href="/" style={{ color: '#555', textDecoration: 'none' }}>{product.category}</a><span style={{ color: '#ccc' }}>›</span></>}
            {product.sub_category && <><a href="/" style={{ color: '#555', textDecoration: 'none' }}>{product.sub_category}</a><span style={{ color: '#ccc' }}>›</span></>}
            <span style={{ color: '#333' }}>{product.name}</span>
          </div>

          {/* Main Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>

            {/* ---- LEFT: Images ---- */}
            <div>
              <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #f0e0ee', position: 'relative', overflow: 'hidden', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                {discount && (
                  <div style={{ position: 'absolute', top: 14, right: 14, background: '#E91E8C', color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 20, zIndex: 2 }}>
                    -{discount}%
                  </div>
                )}
                <div style={{ position: 'absolute', top: 14, left: 14, zIndex: 2, display: 'flex', gap: 8 }}>
                  <button onClick={() => setFav(!fav)}
                    style={{ background: '#fff', border: '1px solid #f0e0ee', cursor: 'pointer', width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: fav ? '#E91E8C' : '#ddd', boxShadow: '0 2px 8px rgba(0,0,0,.06)' }}>
                    {fav ? '♥' : '♡'}
                  </button>
                  <button style={{ background: '#fff', border: '1px solid #f0e0ee', cursor: 'pointer', width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#888', boxShadow: '0 2px 8px rgba(0,0,0,.06)' }}>
                    ↗
                  </button>
                </div>
                {images.length > 0
                  ? <img src={images[activeImg]} alt={product.name} style={{ width: '75%', height: '75%', objectFit: 'contain', animation: 'fadeUp .3s ease' }} />
                  : <span style={{ fontSize: 100 }}>🛍️</span>}
                {images.length > 1 && (
                  <>
                    <button onClick={() => setActiveImg(i => (i - 1 + images.length) % images.length)}
                      style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: '#fff', border: '1px solid #eee', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,.08)' }}>‹</button>
                    <button onClick={() => setActiveImg(i => (i + 1) % images.length)}
                      style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: '#fff', border: '1px solid #eee', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,.08)' }}>›</button>
                  </>
                )}
                <div style={{ position: 'absolute', bottom: 12, left: 14, fontSize: 12, color: '#999', background: 'rgba(255,255,255,.9)', padding: '3px 8px', borderRadius: 8, cursor: 'pointer' }}>
                  ⤢ تكبير الصورة
                </div>
              </div>

              {images.length > 1 && (
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {images.map((img: string, i: number) => (
                    <div key={i} className={`thumb-item${activeImg === i ? ' active' : ''}`}
                      onClick={() => setActiveImg(i)}
                      style={{ width: 72, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
                      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                  ))}
                </div>
              )}
              {images.length === 1 && (
                <div style={{ display: 'flex', gap: 10 }}>
                  {[0, 1, 2, 3, 4].map(i => (
                    <div key={i} className={`thumb-item${i === 0 ? ' active' : ''}`}
                      style={{ width: 72, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
                      <img src={images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: i === 0 ? 1 : 0.5 }} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ---- RIGHT: Info ---- */}
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #f0e0ee', padding: '28px 24px', display: 'flex', flexDirection: 'column' }}>

              {/* Badge + best seller */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span style={{ background: '#fce8f5', color: '#8a007a', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>
                  {product.sub_category || 'منتج'}
                </span>
                <span style={{ marginRight: 'auto', background: '#fce8f5', color: '#8a007a', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>الأكثر مبيعاً</span>
              </div>

              {/* Name */}
              <h1 style={{ fontSize: 22, fontWeight: 900, color: '#1a1a1a', margin: '0 0 12px', lineHeight: 1.4 }}>{product.name}</h1>

              {/* Stars rating - interactive */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ display: 'flex', gap: 3 }}>
                  {[1,2,3,4,5].map(s => (
                    <span key={s}
                      onMouseEnter={() => setHoverRating(s)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setUserRating(s)}
                      style={{ fontSize: 26, cursor: 'pointer', color: s <= (hoverRating || userRating || fullStars) ? '#f59e0b' : '#e0e0e0', transition: 'color .15s', userSelect: 'none' as any }}>
                      ★
                    </span>
                  ))}
                </div>
                {userRating > 0
                  ? <span style={{ fontSize: 13, color: '#10b981', fontWeight: 600 }}>شكراً على تقييمك!</span>
                  : reviewsCount > 0
                    ? <span style={{ fontSize: 13, color: '#aaa' }}>({reviewsCount} تقييم)</span>
                    : <span style={{ fontSize: 13, color: '#aaa' }}>كن أول من يقيّم</span>
                }
              </div>

              {/* Description short */}
              <p style={{ fontSize: 13, color: '#777', lineHeight: 1.7, margin: '0 0 16px' }}>
                {product.description
                  ? product.description.slice(0, 120) + (product.description.length > 120 ? '...' : '')
                  : `${product.name} — منتج عالي الجودة متوفر في متجر زورا بأفضل الأسعار.`}
              </p>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20 }}>
                <span style={{ fontSize: 32, fontWeight: 900, color: '#E91E8C' }}>{product.price}</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: '#E91E8C' }}>ج.س</span>
                {product.old_price && (
                  <span style={{ fontSize: 16, color: '#bbb', textDecoration: 'line-through' }}>{product.old_price} ج</span>
                )}
              </div>

              {/* Unit / Stock */}
              {product.unit && (
                <div style={{ display: 'flex', gap: 6, fontSize: 13, color: '#888', marginBottom: 8 }}>
                  <span>الوحدة:</span>
                  <span style={{ fontWeight: 600, color: '#444' }}>{product.unit}</span>
                </div>
              )}
              <div style={{ display: 'flex', gap: 6, fontSize: 13, color: '#888', marginBottom: 20 }}>
                <span>الحالة:</span>
                <span style={{ fontWeight: 600, color: '#10b981' }}>✓ متوفر في المخزن</span>
              </div>

              {/* Qty + Add to cart */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #f0e0ee', borderRadius: 12, overflow: 'hidden', height: 48 }}>
                  <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}
                    style={{ width: 40, height: '100%', background: '#fff', border: 'none', cursor: 'pointer', fontSize: 22, color: '#555', transition: 'background .15s' }}>−</button>
                  <span style={{ width: 44, textAlign: 'center', fontSize: 16, fontWeight: 700, color: '#1a1a1a' }}>{qty}</span>
                  <button onClick={() => setQty(q => q + 1)}
                    style={{ width: 40, height: '100%', background: '#E91E8C', border: 'none', cursor: 'pointer', fontSize: 22, color: '#fff' }}>+</button>
                </div>
                <button className="add-btn" onClick={addToCart}
                  style={{ flex: 1, background: '#E91E8C', color: '#fff', border: 'none', height: 48, borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'background .2s' }}>
                  🛒 أضف للسلة
                </button>
              </div>

              <button className="buy-btn" onClick={() => window.location.href = '/cart'}
                style={{ width: '100%', background: '#fff', color: '#E91E8C', border: '2px solid #E91E8C', height: 48, borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'background .2s' }}>
                ⚡ اشتري الآن
              </button>
            </div>
          </div>

          {/* Store info + Tabs row */}
          <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 20, marginBottom: 20 }}>

            {/* Store card */}
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #f0e0ee', padding: '20px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#888', marginBottom: 14 }}>معلومات المتجر</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, background: '#1a1a1a', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#E91E8C', fontSize: 20, fontWeight: 900 }}>N</span>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>أسواق زورا</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ color: '#f59e0b', fontSize: 13 }}>★</span>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>4.9</span>
                    <span style={{ fontSize: 12, color: '#aaa' }}>98% تقييم إيجابي</span>
                  </div>
                </div>
              </div>
              {[
                { icon: '🕐', label: 'زمن التوصيل', val: '30 - 60 دقيقة' },
                { icon: '📦', label: 'الحد الأدنى للطلب', val: '50 ج.س' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, fontSize: 13 }}>
                  <span style={{ fontSize: 16 }}>{r.icon}</span>
                  <span style={{ color: '#888' }}>{r.label}</span>
                  <span style={{ marginRight: 'auto', fontWeight: 600, color: '#333' }}>{r.val}</span>
                </div>
              ))}
              <button style={{ width: '100%', background: '#fff', color: '#E91E8C', border: '1.5px solid #E91E8C', padding: '10px', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginTop: 4 }}>
                عرض منتجات المتجر
              </button>
            </div>

            {/* Tabs */}
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #f0e0ee', overflow: 'hidden' }}>
              <div style={{ display: 'flex', borderBottom: '1px solid #f0e0ee' }}>
                {[
                  { id: 'desc', label: 'الوصف' },
                  { id: 'specs', label: 'المواصفات' },
                  { id: 'reviews', label: `التقييمات (${reviewsCount})` },
                ].map(tab => (
                  <button key={tab.id} className="tab-btn" onClick={() => setActiveTab(tab.id)}
                    style={{ color: activeTab === tab.id ? '#E91E8C' : '#888', borderBottom: activeTab === tab.id ? '2px solid #E91E8C' : '2px solid transparent' }}>
                    {tab.label}
                  </button>
                ))}
              </div>
              <div style={{ padding: 24 }}>
                {activeTab === 'desc' && (
                  <div>
                    <p style={{ fontSize: 14, color: '#555', lineHeight: 1.9, marginBottom: 20 }}>
                      {product.description || `${product.name} — منتج عالي الجودة متوفر في متجر زورا.`}
                    </p>
                    {!product.features && (
                      <div style={{ display: 'flex', gap: 32 }}>
                        {[
                          { icon: '🌿', label: 'بدون مواد حافظة' },
                          { icon: '☀️', label: 'فيتامين D' },
                          { icon: '💎', label: 'غني بالكالسيوم' },
                        ].map((f, i) => (
                          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontSize: 28 }}>{f.icon}</span>
                            <span style={{ fontSize: 12, color: '#666', fontWeight: 600 }}>{f.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {product.features && (
                      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                        {product.features.map((f: any, i: number) => (
                          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontSize: 28 }}>{f.icon || '✓'}</span>
                            <span style={{ fontSize: 12, color: '#666', fontWeight: 600 }}>{f.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {activeTab === 'specs' && (
                  <div>
                    {product.specs ? (
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                        {Object.entries(product.specs).map(([k, v]: any) => (
                          <tr key={k} style={{ borderBottom: '1px solid #f5f5f5' }}>
                            <td style={{ padding: '10px 0', color: '#888', width: '40%' }}>{k}</td>
                            <td style={{ padding: '10px 0', fontWeight: 600, color: '#333' }}>{v}</td>
                          </tr>
                        ))}
                      </table>
                    ) : (
                      <div style={{ textAlign: 'center', padding: 24, color: '#aaa', fontSize: 14 }}>لا توجد مواصفات مضافة</div>
                    )}
                  </div>
                )}
                {activeTab === 'reviews' && (
                  <div>
                    {/* Rating summary */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24, padding: '16px', background: '#fafafa', borderRadius: 12 }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 48, fontWeight: 900, color: '#1a1a1a', lineHeight: 1 }}>{rating}</div>
                        <div style={{ display: 'flex', gap: 2, justifyContent: 'center', margin: '6px 0' }}>
                          {[1,2,3,4,5].map(s => (
                            <span key={s} style={{ fontSize: 16, color: s <= fullStars ? '#f59e0b' : '#e0e0e0' }}>★</span>
                          ))}
                        </div>
                        <div style={{ fontSize: 12, color: '#aaa' }}>{reviewsCount} تقييم</div>
                      </div>
                      <div style={{ flex: 1 }}>
                        {[5,4,3,2,1].map(star => (
                          <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                            <span style={{ fontSize: 12, color: '#888', width: 10 }}>{star}</span>
                            <span style={{ color: '#f59e0b', fontSize: 12 }}>★</span>
                            <div style={{ flex: 1, height: 6, background: '#eee', borderRadius: 4, overflow: 'hidden' }}>
                              <div style={{ height: '100%', background: '#f59e0b', borderRadius: 4, width: star === 5 ? '70%' : star === 4 ? '20%' : star === 3 ? '6%' : '2%' }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ textAlign: 'center', padding: 16, color: '#aaa', fontSize: 13 }}>لا توجد تقييمات مكتوبة بعد</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #f0e0ee', padding: '20px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: '#1a1a1a', margin: 0 }}>منتجات مشابهة</h2>
              <a href="/" style={{ fontSize: 13, color: '#E91E8C', textDecoration: 'none', fontWeight: 600 }}>عرض الكل</a>
            </div>
            <RelatedProducts category={product.category} currentId={product._id} api={API} />
          </div>

        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: '#1a1a1a', color: '#fff', padding: '12px 24px', borderRadius: 24, fontSize: 13, fontWeight: 700, zIndex: 9999, whiteSpace: 'nowrap', boxShadow: '0 4px 20px rgba(0,0,0,.2)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: '#10b981' }}>✓</span> {toast}
        </div>
      )}
    </>
  );
}

function RelatedProducts({ category, currentId, api }: { category: string; currentId: string; api: string }) {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${api}/api/products?category=${encodeURIComponent(category)}&limit=6`)
      .then(r => r.json())
      .then(data => {
        const arr = Array.isArray(data) ? data : data.products || [];
        setProducts(arr.filter((p: any) => p._id !== currentId).slice(0, 5));
      })
      .catch(() => {});
  }, [category, currentId, api]);

  if (!products.length) return <div style={{ fontSize: 13, color: '#aaa', textAlign: 'center', padding: 20 }}>جاري التحميل...</div>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
      {products.map((p: any) => {
        const discount = p.old_price ? Math.round(((p.old_price - p.price) / p.old_price) * 100) : null;
        return (
          <a key={p._id} href={`/product/${p._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="related-card" style={{ background: '#fff', border: '1px solid #f0e0ee', borderRadius: 12, padding: 12, cursor: 'pointer', transition: 'transform .2s, box-shadow .2s', textAlign: 'center' }}>
              <div style={{ position: 'relative', marginBottom: 8 }}>
                {discount && (
                  <span style={{ position: 'absolute', top: 0, right: 0, background: '#E91E8C', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 10 }}>-{discount}%</span>
                )}
                {p.image && p.image !== 'no_image'
                  ? <img src={p.image} alt={p.name} style={{ width: '100%', height: 100, objectFit: 'contain' }} />
                  : <span style={{ fontSize: 60, display: 'block', lineHeight: '100px' }}>🛍️</span>}
              </div>
              <div style={{ fontSize: 12, color: '#444', fontWeight: 600, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#E91E8C', marginBottom: 4 }}>{p.price} ج</div>
              {p.rating && (
                <div style={{ fontSize: 11, color: '#aaa', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
                  <span style={{ color: '#f59e0b' }}>★</span>{p.rating}
                </div>
              )}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                  const existing = cart.find((i: any) => i._id === p._id);
                  if (existing) existing.quantity += 1;
                  else cart.push({ ...p, quantity: 1 });
                  localStorage.setItem('cart', JSON.stringify(cart));
                }}
                style={{ marginTop: 8, width: '100%', background: '#f5f5f5', color: '#E91E8C', border: '1px solid #f0e0ee', borderRadius: 8, padding: '6px 0', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                + أضف
              </button>
            </div>
          </a>
        );
      })}
    </div>
  );
}