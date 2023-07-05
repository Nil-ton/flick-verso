import { IPosts, ISessions } from "@/app/type"
import { getData } from "@/hooks/getData"
import Link from "next/link"
import PostTags from "./PostTags"
import { getDocData } from "@/hooks/getDoc"
import { CardLastPost } from "./CardLastPost"
import { CardLastPost2 } from "./CardLastPost2"

type props = {
  posts: IPosts[] | undefined
  preview?: boolean
}

export async function LastNews({ posts, preview }: props) {
  const tags = (sessions: string[]) => {
    let tag: (ISessions | null)[] = []
    const types = sessions.map(async (item) => {
      const tags = await getDocData<ISessions>('sessions', item)
      tag = tags as unknown as (ISessions | null)[]
    })
    return tag as (ISessions | null)[]
  }
  return (
    <div className='lg:grid grid-rows-2 grid-flow-col gap-2'>
      {posts?.map((item, i) => {
        if (i === 0) {
          return (
            <>
              <div key={item.uid} className="lg:contents hidden">
                <CardLastPost post={item} preview={preview} />
              </div>
              <div key={item.uid} className="lg:hidden contents">
                <CardLastPost2 post={item} preview={preview} />
              </div>
            </>
          )
        }

        return (
          <CardLastPost2 key={item.uid} post={item} />
        )
      })}

    </div>
  )
}