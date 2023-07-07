'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { RxDragHandleHorizontal, RxCross2 } from 'react-icons/rx'
import { ISessions } from '@/app/type';
import { Menu } from './menu';

type props = {
  menu: ISessions[] | undefined
  preview?: boolean
}

export const HamburguerMenu = ({ menu, preview }: props) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkMenu = (session?: ISessions) => {
    if (session) {
      router.push(preview ? '/preview/' + session?.slug : session?.slug)
      return toggleMenu()
    }

    router.push(preview ? '/preview' : '/')
    toggleMenu()
  }

  return (
    <>
      <button onClick={toggleMenu} className='lg:hidden' aria-label="Menu">
        <RxDragHandleHorizontal className='w-8 h-8' />
      </button>

      <Menu.Root isOpen={isOpen}>
        <Menu.Items>
          <Menu.Item onClick={() => handleLinkMenu()}>
            Home
          </Menu.Item>
          {menu?.map((item: any) => (
            <Menu.Item key={item.title} onClick={() => handleLinkMenu(item)}>
              {item.title}
            </Menu.Item>
          ))}
        </Menu.Items>
        <button onClick={toggleMenu} className='lg:hidden' aria-label="Menu">
          <RxCross2 className='w-8 h-8' />
        </button>
      </Menu.Root>
    </>
  );
};

