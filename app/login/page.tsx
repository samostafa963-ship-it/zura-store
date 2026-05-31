'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) return setError('يرجى ملء جميع الحقول');
    setLoading(true);
    setError('');
    const res = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) return setError('البريد أو كلمة المرور غلط');
    router.push('/');
  };

  return (
    <div style={{minHeight:'100vh',background:'#f5f5f5',display:'flex',alignItems:'center',justifyContent:'center',direction:'rtl',padding:20}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:0,background:'#fff',borderRadius:20,overflow:'hidden',boxShadow:'0 20px 60px rgba(233,30,140,.1)',maxWidth:900,width:'100%'}}>

        {/* Form */}
        <div style={{padding:40,display:'flex',flexDirection:'column',justifyContent:'center'}}>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:28}}>
            <img src="/icon.png" alt="زورا" style={{height:36,objectFit:'contain'}} onError={e => {(e.target as HTMLImageElement).style.display='none'}} />
            <span style={{fontSize:22,fontWeight:900,color:'#E91E8C'}}>زورا</span>
          </div>

          <h2 style={{fontSize:22,fontWeight:900,marginBottom:4}}>مرحباً بعودتك!</h2>
          <p style={{fontSize:13,color:'#888',marginBottom:28}}>سجل دخولك للمتابعة والتسوق</p>

          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div style={{display:'flex',alignItems:'center',background:'#f8f0f6',borderRadius:10,border:'1.5px solid #f0e0ee',padding:'0 14px'}}>
              <span style={{color:'#ccc',fontSize:15}}>✉️</span>
              <input name="email" type="email" placeholder="البريد الإلكتروني" value={form.email} onChange={handleChange}
                style={{flex:1,border:'none',background:'transparent',padding:'12px 10px',fontSize:14,outline:'none',fontFamily:'inherit'}} />
            </div>

            <div style={{display:'flex',alignItems:'center',background:'#f8f0f6',borderRadius:10,border:'1.5px solid #f0e0ee',padding:'0 14px'}}>
              <span style={{color:'#ccc',fontSize:15}}>🔒</span>
              <input name="password" type={showPass ? 'text' : 'password'} placeholder="كلمة المرور" value={form.password} onChange={handleChange}
                style={{flex:1,border:'none',background:'transparent',padding:'12px 10px',fontSize:14,outline:'none',fontFamily:'inherit'}} />
              <button onClick={() => setShowPass(!showPass)} style={{background:'none',border:'none',cursor:'pointer',color:'#ccc',fontSize:15}}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>

            <div style={{textAlign:'left'}}>
              <a href="#" style={{fontSize:12,color:'#E91E8C',textDecoration:'none'}}>نسيت كلمة المرور؟</a>
            </div>

            {error && <div style={{background:'#fce8f5',color:'#c2185b',fontSize:12,padding:'8px 12px',borderRadius:8,textAlign:'center'}}>{error}</div>}

            <button onClick={handleSubmit} disabled={loading}
              style={{background: loading ? '#f0c8e8' : '#E91E8C',color:'#fff',border:'none',padding:'13px',borderRadius:10,fontSize:14,fontWeight:700,cursor: loading ? 'not-allowed' : 'pointer',fontFamily:'inherit'}}>
              {loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
            </button>

            <div style={{textAlign:'center',fontSize:13,color:'#888'}}>
              ليس لديك حساب؟{' '}
              <a href="/register" style={{color:'#E91E8C',fontWeight:700,textDecoration:'none'}}>إنشاء حساب</a>
            </div>
          </div>
        </div>

        {/* Banner */}
        <div style={{background:'linear-gradient(135deg,#E91E8C,#c2185b)',padding:40,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center'}}>
          <div style={{fontSize:80,marginBottom:20}}>🛍️</div>
          <h3 style={{color:'#fff',fontSize:22,fontWeight:900,marginBottom:12}}>تسوق الآن</h3>
          <p style={{color:'rgba(255,255,255,.8)',fontSize:14,lineHeight:1.7,marginBottom:24}}>واستمتع بأفضل العروض<br/>على آلاف المنتجات</p>
          <div style={{display:'flex',gap:20}}>
            {[{n:'+2000',l:'منتج'},{n:'30د',l:'توصيل'},{n:'4.8⭐',l:'تقييم'}].map(s => (
              <div key={s.l} style={{textAlign:'center'}}>
                <div style={{fontSize:18,fontWeight:900,color:'#fff'}}>{s.n}</div>
                <div style={{fontSize:11,color:'rgba(255,255,255,.7)'}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}