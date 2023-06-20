const timeline = [
  {
    id: 1,
    photoURL:
      'https://imgs.search.brave.com/E6rHqxgTjOxdQDOjWzlhOIFgsYNLknU9fLbNNm7QB-s/rs:fit:429:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC42/OVhnVU9Ra3NNeExh/bEhod29KODRnQUFB/QSZwaWQ9QXBp',
    name: 'Valentino',
    username: 'tinozp',
    message:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus quod labore eligendi quasi unde, voluptas consequatur ipsum dolorem laborum rem debitis deleniti minus commodi suscipit repudiandae aut odio dignissimos. Minus?'
  },
  {
    id: 2,
    photoURL:
      'https://imgs.search.brave.com/E6rHqxgTjOxdQDOjWzlhOIFgsYNLknU9fLbNNm7QB-s/rs:fit:429:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC42/OVhnVU9Ra3NNeExh/bEhod29KODRnQUFB/QSZwaWQ9QXBp',
    name: 'Valentino',
    username: 'tinozp',
    message:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus quod labore eligendi quasi unde, voluptas consequatur ipsum dolorem laborum rem debitis deleniti minus commodi suscipit repudiandae aut odio dignissimos. Minus?'
  },
  {
    id: 3,
    photoURL:
      'https://imgs.search.brave.com/E6rHqxgTjOxdQDOjWzlhOIFgsYNLknU9fLbNNm7QB-s/rs:fit:429:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC42/OVhnVU9Ra3NNeExh/bEhod29KODRnQUFB/QSZwaWQ9QXBp',
    name: 'Valentino',
    username: 'tinozp',
    message:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus quod labore eligendi quasi unde, voluptas consequatur ipsum dolorem laborum rem debitis deleniti minus commodi suscipit repudiandae aut odio dignissimos. Minus?'
  },
  {
    id: 4,
    photoURL:
      'https://imgs.search.brave.com/E6rHqxgTjOxdQDOjWzlhOIFgsYNLknU9fLbNNm7QB-s/rs:fit:429:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC42/OVhnVU9Ra3NNeExh/bEhod29KODRnQUFB/QSZwaWQ9QXBp',
    name: 'Valentino',
    username: 'tinozp',
    message:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus quod labore eligendi quasi unde, voluptas consequatur ipsum dolorem laborum rem debitis deleniti minus commodi suscipit repudiandae aut odio dignissimos. Minus?'
  },
  {
    id: 5,
    photoURL:
      'https://imgs.search.brave.com/E6rHqxgTjOxdQDOjWzlhOIFgsYNLknU9fLbNNm7QB-s/rs:fit:429:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC42/OVhnVU9Ra3NNeExh/bEhod29KODRnQUFB/QSZwaWQ9QXBp',
    name: 'Valentino',
    username: 'tinozp',
    message:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus quod labore eligendi quasi unde, voluptas consequatur ipsum dolorem laborum rem debitis deleniti minus commodi suscipit repudiandae aut odio dignissimos. Minus?'
  },
  {
    id: 6,
    photoURL:
      'https://imgs.search.brave.com/E6rHqxgTjOxdQDOjWzlhOIFgsYNLknU9fLbNNm7QB-s/rs:fit:429:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC42/OVhnVU9Ra3NNeExh/bEhod29KODRnQUFB/QSZwaWQ9QXBp',
    name: 'Valentino',
    username: 'tinozp',
    message:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus quod labore eligendi quasi unde, voluptas consequatur ipsum dolorem laborum rem debitis deleniti minus commodi suscipit repudiandae aut odio dignissimos. Minus?'
  }
]

export default (req, res) => {
  (res.statusCode = 200), res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(timeline))
}
