'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type props = {
  menu: any
  preview?: boolean
}

export const HamburgerMenu = ({ menu, preview }: props) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button className={`lg:hidden hamburger-button`} id="hamburger-button" aria-label="Menu" onClick={toggleMenu}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </button>

      {isOpen && <div className='menu-items '>
        {isOpen && (
          <ul className="flex flex-col gap-5 uppercase">
            <li
              onClick={() => {
                router.push(preview ? '/preview' : '/')
                toggleMenu()
              }}
              className="font-bold hover:underline cursor-pointer">
              Home
            </li>
            {menu?.map((item: any) => (
              <li key={item.title}
                onClick={() => {
                  router.push(preview ? '/preview/' + item.slug : item.slug)
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

