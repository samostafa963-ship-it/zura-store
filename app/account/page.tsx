'use client';
import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
  }, [status, router]);

  if (status === 'loading') return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{width:32,height:32,border:'3px solid #fce8f5',borderTopColor:'#E91E8C',borderRadius:'50%',animation:'spin .8s linear infinite'}} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  if (!session) return null;

  const user = session.user;

  return (
    <>
      <Navbar />
      <div style={{background:'#f5f5f5',minHeight:'100vh',padding:'20px 24px',direction:'rtl'}}>

        {/* Breadcrumb */}
        <div style={{fontSize:13,color:'#888',marginBottom:20,display:'flex',alignItems:'center',gap:6}}>
          <a href="/" style={{color:'#E91E8C',textDecoration:'none'}}>الرئيسية</a>
          <span>›</span>
          <span>حسابي</span>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'280px 1fr',gap:20,alignItems:'start'}}>

          {/* Sidebar */}
          <div style={{background:'#fff',borderRadius:16,border:'1px solid #f0e0ee',overflow:'hidden'}}>
            <div style={{background:'linear-gradient(135deg,#E91E8C,#c2185b)',padding:24,textAlign:'center'}}>
              {user?.image ? (
                <img src={user.image} alt={user.name||''} style={{width:72,height:72,borderRadius:'50%',border:'3px solid #fff',marginBottom:10}} />
              ) : (
                <div style={{width:72,height:72,borderRadius:'50%',background:'rgba(255,255,255,.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,fontWeight:700,color:'#fff',margin:'0 auto 10px'}}>
                  {user?.name?.[0] || '👤'}
                </div>
              )}
              <div style={{color:'#fff',fontSize:16,fontWeight:700}}>{user?.name}</div>
              <div style={{color:'rgba(255,255,255,.8)',fontSize:12,marginTop:3}}>{user?.email}</div>
            </div>

            <div style={{padding:8}}>
              {[
                {icon:'👤', label:'بياناتي'},
                {icon:'📦', label:'طلباتي'},
                {icon:'🤍', label:'المفضلة'},
                {icon:'📍', label:'عناويني'},
                {icon:'💳', label:'طرق الدفع'},
              ].map((item, i) => (
                <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'11px 14px',borderRadius:8,cursor:'pointer',transition:'background .15s'}}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background='#fff0f9'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background='transparent'}>
                  <span style={{fontSize:18}}>{item.icon}</span>
                  <span style={{fontSize:13,fontWeight:600,color:'#333'}}>{item.label}</span>
                </div>
              ))}
              <div style={{borderTop:'1px solid #f0e0ee',margin:'8px 0'}} />
              <div onClick={() => signOut({callbackUrl:'/'})}
                style={{display:'flex',alignItems:'center',gap:10,padding:'11px 14px',borderRadius:8,cursor:'pointer',color:'#E91E8C'}}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background='#fff0f9'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background='transparent'}>
                <span style={{fontSize:18}}>🚪</span>
                <span style={{fontSize:13,fontWeight:700}}>تسجيل الخروج</span>
              </div>
            </div>
          </div>

          {/* Main */}
          <div style={{display:'flex',flexDirection:'column',gap:16}}>

            {/* Welcome */}
            <div style={{background:'#fff',borderRadius:16,border:'1px solid #f0e0ee',padding:24}}>
              <h2 style={{fontSize:17,fontWeight:900,marginBottom:4}}>مرحباً، {user?.name?.split(' ')[0]} 👋</h2>
              <p style={{fontSize:13,color:'#888'}}>يمكنك إدارة حسابك وطلباتك من هنا</p>
            </div>

            {/* Stats */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14}}>
              {[
                {icon:'📦',label:'طلباتي',value:'0'},
                {icon:'🤍',label:'المفضلة',value:'0'},
                {icon:'📍',label:'العناوين',value:'0'},
              ].map((s,i) => (
                <div key={i} style={{background:'#fff',borderRadius:14,border:'1px solid #f0e0ee',padding:20,textAlign:'center',cursor:'pointer'}}>
                  <div style={{fontSize:32,marginBottom:8}}>{s.icon}</div>
                  <div style={{fontSize:22,fontWeight:900,color:'#E91E8C',marginBottom:4}}>{s.value}</div>
                  <div style={{fontSize:12,color:'#888'}}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div style={{background:'#fff',borderRadius:16,border:'1px solid #f0e0ee',overflow:'hidden'}}>
              <div style={{padding:'16px 20px',borderBottom:'1px solid #f0e0ee',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h3 style={{fontSize:15,fontWeight:700}}>آخر الطلبات</h3>
                <a href="#" style={{fontSize:12,color:'#E91E8C',textDecoration:'none'}}>عرض الكل ›</a>
              </div>
              <div style={{padding:40,textAlign:'center',color:'#888'}}>
                <div style={{fontSize:40,marginBottom:10}}>📦</div>
                <div style={{fontSize:14,fontWeight:600,marginBottom:6}}>لا توجد طلبات بعد</div>
                <a href="/" style={{color:'#E91E8C',fontSize:13,fontWeight:700,textDecoration:'none'}}>تسوق الآن</a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}