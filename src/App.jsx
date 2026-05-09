import React from 'react';
import{BrowserRouter,Routes,Route}from'react-router-dom';
import Home from './pages/Home.jsx';
import NewDevice from './pages/NewDevice.jsx';
import DeviceDetail from './pages/DeviceDetail.jsx';
import Nav from './components/Nav.jsx';
export default function App(){return React.createElement(BrowserRouter,null,React.createElement(Nav),React.createElement(Routes,null,
    React.createElement(Route,{path:'/',element:React.createElement(Home)}),
    React.createElement(Route,{path:'/devices/new',element:React.createElement(NewDevice)}),
    React.createElement(Route,{path:'/devices/:id',element:React.createElement(DeviceDetail)})
));}