export default class Orders {
  static all() {
    return [
      {
        id: 1,
        orderId: 'ORD-100012',
        status: 'Awaiting Payment',
        total: 900.0,
        recipient: {
          name: 'Abu Bakar Ali',
          email: 'abubaaaaakar@gmail.com',
          phone: '6012345678',
          address_1: 'Lot 196, Jalan 101/14',
          address_2: 'Kg Malaysia Tambahan',
          city: 'Sg Besi',
          state: 'Kuala Lumpur',
          postcode: '57000'
        },
        delivery: {
          trackingNumber: 'EHA102375834MY',
          courier: 'Poslaju'
        }
      },
      {
        id: 2,
        orderId: 'ORD-100014',
        status: 'Paid',
        total: 300.0,
        recipient: {
          name: 'Samad Othman',
          email: 'msasd8830@gmail.com',
          phone: '6012345678',
          address_1: 'Lot 196, Jalan 101/14',
          address_2: 'Kg Malaysia Tambahan',
          city: 'Sg Besi',
          state: 'Kuala Lumpur',
          postcode: '57000'
        },
        delivery: {
          trackingNumber: 'EHA102375834MY',
          courier: 'Poslaju'
        }
      },
      {
        id: 3,
        orderId: 'ORD-100019',
        status: 'Paid',
        total: 430.0,
        recipient: {
          name: 'Azizah Rauf',
          email: 'msasd8830@gmail.com',
          phone: '6012345678',
          address_1: 'Lot 196, Jalan 101/14',
          address_2: 'Kg Malaysia Tambahan',
          city: 'Sg Besi',
          state: 'Kuala Lumpur',
          postcode: '57000'
        },
        delivery: {
          trackingNumber: 'EHA102375834MY',
          courier: 'Poslaju'
        }
      }
    ]
  }
}
