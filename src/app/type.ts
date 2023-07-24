export interface IPosts {
    keywords: string[];
    richText: string;
    title: string;
    subtitle: string;
    type: string;
    description: string;
    sessions: string[];
    createdAt: string;
    updatedAt?: string;
    uid: string;
    thumbnail: string
    author: {
        label: string,
        value: string,
        socialMedia: string
    }
    dateCreatedAt?: string
    dateUpdateAt?: string
}

export type IFetchPosts = {
    posts: IPosts[],
    next_start_after?: string
}

export type ISessions = {
    createdAt: string,
    slug: string,
    title: string,
    updatedAt: string
}


export interface AffiliatedLink {
    affiliatedLink: string;
    createdAt: string;
    image: string;
    price: string;
    title: string;
}