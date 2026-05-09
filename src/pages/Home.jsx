import React,{useEffect,useState}from'react';import{supabase}from'../lib/supabase.js';import{requireAuth}from'../lib/auth.js';import*as S from'../styles.js';
export default function Home(){
  const[devices,setDevices]=useState([]);
  useEffect(()=>{requireAuth(window.location.href);supabase.from('registered_devices').select('*').order('created_at',{ascending:false}).then(({data})=>setDevices(data||[]));  },[]);
  return React.createElement('div',{style:S.page},
    React.createElement('div',{style:{display:'flex',justifyContent:'space-between',marginBottom:'1.5rem'}},React.createElement('h1',{style:{...S.h1,marginBottom:0}},'IT-S Device'),React.createElement('button',{style:S.btn,onClick:()=>window.location.href='/devices/new'},'+ Register')),
    devices.length===0&&React.createElement('div',{style:S.card},React.createElement('p',{style:S.muted},'No devices registered.')),
    devices.map(d=>React.createElement('div',{key:d.id,style:{...S.card,cursor:'pointer'},onClick:()=>window.location.href='/devices/'+d.id},
      React.createElement('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center'}},
        React.createElement('h2',{style:S.h2},d.device_name||'Unnamed Device'),
        React.createElement('span',{style:S.badge('#7c3aed')},d.device_type||'unknown')
      ),React.createElement('p',{style:S.muted},d.os||'—',' · Last seen: '+(d.last_seen?new Date(d.last_seen).toLocaleString():'Never'))
    ))
  );
}