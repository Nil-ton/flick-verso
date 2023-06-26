'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type props = {
  menu: any
}

export const HamburgerMenu = ({ menu }: props) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button className={`hamburger-button`} onClick={toggleMenu}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </button>

      {isOpen && <div className='menu-items '>
        {isOpen && (
          <ul className="flex flex-col gap-5 uppercase">
            <li
              onClick={() => {
                router.push('/')
                toggleMenu()
              }}
              className="font-bold hover:underline cursor-pointer">
              Home
            </li>
            {menu?.map((item: any) => (
              <li key={item.title}
                onClick={() => {
                  router.push(item.slug)
                  toggleMenu()
                }}
                className="font-bold hover:underline cursor-pointer">
                {item.title}
              </li>
            ))}
          </ul>
        )}
        <button className={`hamburger-button open`} onClick={toggleMenu}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </button>
      </div>}


    </>
  );
};

