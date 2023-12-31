'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { AffiliatedLink } from '@/app/type';
import { useEffect, useState } from 'react';

type props = {
    affiliatedAds: AffiliatedLink[]
}

export function AdsManga({ affiliatedAds }: props) {

    return (
        <Swiper
            slidesPerView={3}
            navigation={true}
            modules={[Navigation]}
            className='my-5'
            breakpoints={{
                768: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: 4,
                },
            }}
        >
            {affiliatedAds.map((item, i) => (
                <SwiperSlide key={item.affiliatedLink}>
                    <a href={item.affiliatedLink} className="md:w-[285px] flex items-center gap-3">
                        <picture>
                            <img loading='lazy' className="w-[100px] h-[173px] object-fill rounded-ss-md" width={1200} height={638} src={item.image} alt={"manga" + i} />
                        </picture>
                        <div className="hidden flex-col md:flex">
                            <span className="text-slate-700 sm:w-full md:w-[110px] w-[100px] font-bold">{item.title}</span>
                            <span className="text-red-800 text-xl font-bold">R$ {item.price}</span>
                        </div>
                    </a>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}