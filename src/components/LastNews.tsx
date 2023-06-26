import { IPosts } from "@/app/type"
import { getData } from "@/hooks/getData"
import Link from "next/link"

type props = {
  posts: IPosts[] | undefined
}

export async function LastNews({ posts }: props) {
  return (
    <div className='lg:grid grid-rows-2 grid-flow-col gap-2'>
      {posts?.map((item, i) => {
        if (i === 0) {
          return (
            <picture key={item.uid} className='row-span-2 relative'>
              <img
                src={item?.thumbnail}
                alt={item?.title}
                className='w-full h-[200px] lg:h-[410px] object-cover aspect-video'
                loading='lazy'
              />

              <Link href={`${item?.uid}`}>
                <span className='absolute top-0 left-0 bg-gradient-to-b from-transparent to-[rgba(1,1,1,1)] w-full h-full block'>
                  <div className='w-full h-full flex items-end justify-center p-5 text-white font-bold text-2xl'>
                    <span className='block hover:underline cursor-pointer'>
                      {item?.title}
                    </span>
                  </div>
                </span>
              </Link>
            </picture>
          )
        }

        return (
          <picture key={item.uid} className='relative'>
            <img
              src={item?.thumbnail}
              alt={item?.title}
              className='w-full h-[200px] object-cover aspect-video'
              loading='lazy'
            />
            <Link href={`${item?.uid}`}>
              <span className='absolute top-0 left-0 bg-gradient-to-b from-transparent to-[rgba(1,1,1,1)] w-full h-full block'>
                <div className='w-full h-full flex items-end justify-center p-5 text-white font-bold text-2xl'>
                  <span className='block hover:underline cursor-pointer'>
                    {item?.title?.length as number < 49 ? item?.title : item?.title.slice(0, 49) + '...'}
                  </span>
                </div>
              </span>
            </Link>
          </picture>
        )
      })}

    </div>
  )
}