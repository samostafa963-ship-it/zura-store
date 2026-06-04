'use client';
import { useEffect } from 'react';

export default function Toast({ message, onHide }: { message: string; onHide: () => void }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onHide, 2500);
    return () => clearTimeout(t);
  }, [message, onHide]);

  if (!message) return null;

  return (
    <div style={{
      position:'fixed',bottom:24,left:'50%',transform:'translateX(-50%)',
      background:'#E91E8C',color:'#fff',padding:'12px 24px',borderRadius:24,
      fontSize:13,fontWeight:700,zIndex:9999,whiteSpace:'nowrap',
      boxShadow:'0 4px 20px rgba(233,30,140,.3)',
      animation:'fadeIn .3s ease'
    }}>
      {message}
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`}</style>
    </div>
  );
}