import { IPosts, ISessions } from "@/app/type"
import { CardLastPost } from "./CardLastPost"
import { CardLastPost2 } from "./CardLastPost2"
import { fetchData } from "@/hooks/fetchData"

type props = {
  posts: IPosts[] | undefined
  preview?: boolean
}

export async function LastNews({ posts, preview }: props) {
  const tags = (sessions: string[]) => {
    let tag: (ISessions | null)[] = []
    const types = sessions.map(async (item) => {
      const tags = await fetchData<ISessions>('sessions', { byId: item })
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
              <div key={item.uid + `${i}1`} className="lg:contents hidden">
                <CardLastPost post={item} preview={preview} />
              </div>
              <div key={item.uid + `${i}2`} className="lg:hidden contents">
                <CardLastPost2 post={item} preview={preview} />
              </div>
            </>
          )
        }

        return (
          <CardLastPost2 key={item.uid + `${i}3`} post={item} />
        )
      })}

    </div>
  )
}