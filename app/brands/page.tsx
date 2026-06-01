'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Toast from '../components/Toast';

const API = process.env.NEXT_PUBLIC_API_URL || '';

const BRANDS = [
  { name: 'Nestlé', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d8/Nestl%C3%A9.svg/320px-Nestl%C3%A9.svg.png' },
  { name: 'Pepsi', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Pepsi_2023.svg/320px-Pepsi_2023.svg.png' },
  { name: 'Coca-Cola', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/320px-Coca-Cola_logo.svg.png' },
  { name: 'Juhayna', logo: '' },
  { name: 'Lamar', logo: '' },
  { name: 'Panda', logo: '' },
  { name: 'Chipsy', logo: '' },
  { name: 'Edita', logo: '' },
];

export default function BrandsPage() {
  const [selectedBrand, setSelectedBrand] = useState(BRANDS[0].name);
  const [products, setProducts] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');
  const [sort, setSort] = useState('popular');

  useEffect(() => {
    fetch(`${API}/api/products?limit=100`)
      .then(r => r.json())
      .then(data => {
        const arr = Array.isArray(data) ? data : data.products || [];
        setAllProducts(arr);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const filtered = allProducts.filter(p =>
      p.name?.toLowerCase().includes(selectedBrand.toLowerCase()) ||
      p.brand?.toLowerCase().includes(selectedBrand.toLowerCase()) ||
      p.description?.toLowerCase().includes(selectedBrand.toLowerCase())
    );
    const sorted = [...filtered].sort((a, b) => {
      if (sort === 'price_asc') return a.price - b.price;
      if (sort === 'price_desc') return b.price - a.price;
      if (sort === 'discount') return (b.discount || 0) - (a.discount || 0);
      return 0;
    });
    setProducts(sorted);
  }, [selectedBrand, allProducts, sort]);

  const addToCart = (name: string) => {
    setToast(`✅ تمت الإضافة: ${name}`);
  };

  return (
    <>
      <Navbar />
      <div style={{ background: '#f7f7f7', minHeight: '100vh', direction: 'rtl' }}>

        {/* Header */}
        <div style={{ background: '#fff', borderBottom: '1px solid #f0e0ee', padding: '28px 32px 0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h1 style={{ fontSize: 28, fontWeight: 900, color: '#1a1a1a', margin: '0 0 4px' }}>Brands</h1>
            <p style={{ fontSize: 14, color: '#aaa', margin: '0 0 20px' }}>تسوق من أفضل العلامات التجارية</p>

            {/* Brand tabs */}
            <div style={{ display: 'flex', gap: 0, overflowX: 'auto', position: 'relative' }}>
              <button onClick={() => setSelectedBrand('prev')} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: '#E91E8C', color: '#fff', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 16, zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
              <div style={{ display: 'flex', gap: 4, overflowX: 'auto', paddingBottom: 0, scrollbarWidth: 'none', flex: 1 }}>
                {BRANDS.map(b => (
                  <button key={b.name} onClick={() => setSelectedBrand(b.name)}
                    style={{ flexShrink: 0, padding: '10px 24px', border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: selectedBrand === b.name ? '#E91E8C' : '#666', borderBottom: selectedBrand === b.name ? '2px solid #E91E8C' : '2px solid transparent', transition: 'all .2s', display: 'flex', alignItems: 'center', gap: 8 }}>
                    {b.logo
                      ? <img src={b.logo} alt={b.name} style={{ height: 20, objectFit: 'contain', maxWidth: 60 }} />
                      : <span>{b.name}</span>}
                  </button>
                ))}
              </div>
              <button onClick={() => {}} style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', background: '#E91E8C', color: '#fff', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 16, zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 32px' }}>

          {/* Brand hero */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #f0e0ee', padding: '20px 28px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 64, height: 64, background: '#f7f7f7', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #f0e0ee' }}>
                {BRANDS.find(b => b.name === selectedBrand)?.logo
                  ? <img src={BRANDS.find(b => b.name === selectedBrand)!.logo} alt={selectedBrand} style={{ width: 48, height: 48, objectFit: 'contain' }} />
                  : <span style={{ fontSize: 24, fontWeight: 900, color: '#333' }}>{selectedBrand[0]}</span>}
              </div>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 900, color: '#1a1a1a', margin: '0 0 4px' }}>{selectedBrand}</h2>
                <span style={{ fontSize: 13, color: '#aaa' }}>
                  📦 {products.length} منتج
                </span>
              </div>
            </div>
            {/* Sort */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 13, color: '#888' }}>تصفية</span>
              <select value={sort} onChange={e => setSort(e.target.value)}
                style={{ border: '1px solid #f0e0ee', borderRadius: 8, padding: '7px 12px', fontSize: 13, fontFamily: 'inherit', color: '#444', cursor: 'pointer', background: '#fff' }}>
                <option value="popular">الأكثر مبيعاً</option>
                <option value="price_asc">السعر: من الأقل</option>
                <option value="price_desc">السعر: من الأعلى</option>
                <option value="discount">الأعلى خصماً</option>
              </select>
            </div>
          </div>

          {/* Products grid */}
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60, gap: 10, color: '#aaa' }}>
              <div style={{ width: 24, height: 24, border: '3px solid #fce8f5', borderTopColor: '#E91E8C', borderRadius: '50%', animation: 'spin .8s linear infinite' }} />
              جاري التحميل...
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            </div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 60, color: '#bbb' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>لا توجد منتجات لهذه العلامة التجارية</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 14 }}>
              {products.map(p => (
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