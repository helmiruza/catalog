export default class Events {
  static all() {
    return [
      {
        id: 1,
        categories: ['Donation'],
        name: 'HUMANITARIAN CARE MALAYSIA',
        description: 'Ayuh bersama membantu saudara kita yang memerlukan di seluruh dunia. Sumbangan anda amat bermakna bagi mereka. Terima kasih di atas keprihatinan anda.',
        cta: {
          buttonText: 'Donate',
          variants: [
            {product_id: 1, name: 'RM50'},
            {product_id: 2, name: 'RM100'},
            {product_id: 3, name: 'RM200'}
          ]
        },
        medias: [
          {id: 4, type: 'video', url: `https://youtu.be/RffHB1xg6YQ`},
          {id: 1, type: 'image', url: `https://source.unsplash.com/random?nature`},
          {id: 2, type: 'image', url: `https://source.unsplash.com/random?city`},
          {id: 3, type: 'image', url: `https://source.unsplash.com/random?night`}
        ],
        imageUrl: 'https://source.unsplash.com/random?kids',
        price: 400.0
      },
      {
        id: 2,
        categories: ['Donation'],
        name: 'HUMANITARIAN CARE MALAYSIA 2',
        description: 'Ayuh bersama membantu saudara kita yang memerlukan di seluruh dunia. Sumbangan anda amat bermakna bagi mereka. Terima kasih di atas keprihatinan anda.',
        cta: {
          buttonText: 'Donate',
          variants: [
            {product_id: 1, name: 'RM50'},
            {product_id: 2, name: 'RM100'},
            {product_id: 3, name: 'RM200'}
          ]
        },
        medias: [
          {id: 4, type: 'video', url: `https://youtu.be/RffHB1xg6YQ`},
          {id: 1, type: 'image', url: `https://source.unsplash.com/random?nature`},
          {id: 2, type: 'image', url: `https://source.unsplash.com/random?city`},
          {id: 3, type: 'image', url: `https://source.unsplash.com/random?night`}
        ],
        imageUrl: 'https://source.unsplash.com/random?elderly',
        price: 500.0
      }
    ]
  }
}
