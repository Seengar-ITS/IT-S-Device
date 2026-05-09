import React,{useState,useEffect}from'react';import{supabase}from'../lib/supabase.js';import{requireAuth,getUser}from'../lib/auth.js';import*as S from'../styles.js';
export default function NewDevice(){
  const[name,setName]=useState('');const[type,setType]=useState('mobile');const[os,setOs]=useState('');const[s,setS]=useState(false);
  useEffect(()=>requireAuth(window.location.href),[]);
  const reg=async()=>{setS(true);const u=getUser();if(!u)return;const{data}=await supabase.from('registered_devices').insert({user_id:u.sub,device_name:name,device_type:type,os,last_seen:new Date().toISOString()}).select().single();if(data)window.location.href='/devices/'+data.id;setS(false);};
  return React.createElement('div',{style:S.page},React.createElement('h1',{style:S.h1},'Register Device'),
    React.createElement('div',{style:S.card},
      React.createElement('div',{style:{marginBottom:'1rem'}},React.createElement('label',{style:S.muted},'Device Name'),React.createElement('input',{style:{...S.input,marginTop:'0.3rem'},value:name,onChange:e=>setName(e.target.value),placeholder:"John's iPhone"})),
      React.createElement('div',{style:{marginBottom:'1rem'}},React.createElement('label',{style:S.muted},'Type'),React.createElement('select',{style:{...S.input,marginTop:'0.3rem'},value:type,onChange:e=>setType(e.target.value)},['mobile','desktop','tablet','server','iot'].map(t=>React.createElement('option',{key:t,value:t},t)))),
      React.createElement('div',{style:{marginBottom:'1.5rem'}},React.createElement('label',{style:S.muted},'OS'),React.createElement('input',{style:{...S.input,marginTop:'0.3rem'},value:os,onChange:e=>setOs(e.target.value),placeholder:'iOS 17 / Android 14 / Windows 11'})),
      React.createElement('button',{style:S.btn,onClick:reg,disabled:!name||s},s?'Registering...':'Register')
    )
  );
}