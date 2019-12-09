export default class Orders {
  static all() {
    return [
      {
        id: 1,
        orderId: 'ORD-100012',
        status: 'Awaiting Payment',
        total: 900.0,
        recipient: {
          name: 'Abu Bakar Ali'
        }
      },
      {
        id: 2,
        orderId: 'ORD-100014',
        status: 'Paid',
        total: 300.0,
        recipient: {
          name: 'Samad Othman'
        }
      },
      {
        id: 3,
        orderId: 'ORD-100019',
        status: 'Paid',
        total: 430.0,
        recipient: {
          name: 'Azizah Rauf'
        }
      }
    ]
  }
}
