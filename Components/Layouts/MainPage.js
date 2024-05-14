"use client"
import React, { useEffect } from 'react';
import Router from 'next/router';
import { delay } from '@/functions/delay';
import Aos from 'aos';

const MainPage = () => {

  useEffect(() => {
    Aos.init()
    const pageRouting = async() => {
      await delay(3003);
      Router.push("/login")
    }
    pageRouting();
  }, [])
  
  return (
    <div className='loader-bg' data-aos="zoom-in">
      <div className="loader" ></div>
    </div>
  )
}

export default MainPage