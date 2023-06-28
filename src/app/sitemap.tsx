import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://flickverso.com.br/',
            lastModified: new Date(),
        },
        {
            url: 'https://flickverso.com.br/filmes',
            lastModified: new Date(),
        },
        {
            url: 'https://flickverso.com.br/animes',
            lastModified: new Date(),
        },
        {
            url: 'https://flickverso.com.br/series',
            lastModified: new Date(),
        },
        {
            url: 'https://flickverso.com.br/noticias',
            lastModified: new Date(),
        },
    ]
}