'use client';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div style={{minHeight:'100vh',background:'#f5f5f5',display:'flex',alignItems:'center',justifyContent:'center',direction:'rtl',padding:20}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:0,background:'#fff',borderRadius:20,overflow:'hidden',boxShadow:'0 20px 60px rgba(233,30,140,.1)',maxWidth:900,width:'100%'}}>

        {/* Left - Form */}
        <div style={{padding:40,display:'flex',flexDirection:'column',justifyContent:'center'}}>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:32}}>
            <img src="/icon.png" alt="زورا" style={{height:36,objectFit:'contain'}} onError={e => {(e.target as HTMLImageElement).style.display='none'}} />
            <span style={{fontSize:22,fontWeight:900,color:'#E91E8C'}}>زورا</span>
          </div>

          <h2 style={{fontSize:24,fontWeight:900,marginBottom:6}}>مرحباً بك!</h2>
          <p style={{fontSize:13,color:'#888',marginBottom:32}}>سجل دخولك للمتابعة والتسوق</p>

          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            style={{display:'flex',alignItems:'center',justifyContent:'center',gap:12,background:'#fff',color:'#1a1a1a',border:'2px solid #f0e0ee',padding:'14px 24px',borderRadius:12,fontSize:15,fontWeight:700,cursor:'pointer',fontFamily:'inherit',marginBottom:16,transition:'border-color .2s,box-shadow .2s',boxShadow:'0 2px 8px rgba(0,0,0,.06)'}}
            onMouseEnter={e => {(e.currentTarget as HTMLButtonElement).style.borderColor='#E91E8C'}}
            onMouseLeave={e => {(e.currentTarget as HTMLButtonElement).style.borderColor='#f0e0ee'}}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            تسجيل الدخول بـ Google
          </button>

          <div style={{textAlign:'center',fontSize:12,color:'#bbb',margin:'8px 0'}}>أو</div>

          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <div style={{display:'flex',alignItems:'center',background:'#f8f0f6',borderRadius:10,border:'1.5px solid #f0e0ee',padding:'0 14px'}}>
              <span style={{color:'#ccc'}}>✉️</span>
              <input placeholder="البريد الإلكتروني" type="email" style={{flex:1,border:'none',background:'transparent',padding:'12px 10px',fontSize:14,outline:'none',fontFamily:'inherit'}} />
            </div>
            <div style={{display:'flex',alignItems:'center',background:'#f8f0f6',borderRadius:10,border:'1.5px solid #f0e0ee',padding:'0 14px'}}>
              <span style={{color:'#ccc'}}>🔒</span>
              <input placeholder="كلمة المرور" type="password" style={{flex:1,border:'none',background:'transparent',padding:'12px 10px',fontSize:14,outline:'none',fontFamily:'inherit'}} />
            </div>
            <button style={{background:'#E91E8C',color:'#fff',border:'none',padding:'13px',borderRadius:10,fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}>
              تسجيل الدخول
            </button>
          </div>

          <div style={{textAlign:'center',fontSize:13,color:'#888',marginTop:20}}>
            ليس لديك حساب؟{' '}
            <span style={{color:'#E91E8C',fontWeight:700,cursor:'pointer'}}>سجل الآن</span>
          </div>
        </div>

        {/* Right - Banner */}
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