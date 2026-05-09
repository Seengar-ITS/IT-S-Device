import React,{useEffect,useState}from'react';import{supabase}from'../lib/supabase.js';import{requireAuth}from'../lib/auth.js';import*as S from'../styles.js';
export default function Device(){
  const id=window.location.pathname.split('/')[2];
  const[dev,setDev]=useState(null);
  useEffect(()=>{requireAuth(window.location.href);supabase.from('registered_devices').select('*').eq('id',id).single().then(({data})=>setDev(data));},[id]);
  if(!dev)return React.createElement('div',{style:S.page},React.createElement('p',{style:S.muted},'Loading...'));
  return React.createElement('div',{style:S.page},React.createElement('h1',{style:S.h1},dev.device_name||'Device'),
    React.createElement('div',{style:S.card},[['Type',dev.device_type],['OS',dev.os],['Last Seen',dev.last_seen?new Date(dev.last_seen).toLocaleString():'Never'],['Push Token',dev.push_token||'Not set']].map(([k,v])=>React.createElement('div',{key:k,style:{marginBottom:'0.75rem'}},React.createElement('p',{style:S.muted},k),React.createElement('p',{style:{color:'#e2e8f0'}},v||'—'))))
  );
}