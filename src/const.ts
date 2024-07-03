export type Place = {
  name: string;
  price: string;
  type: string;
  premium: boolean;
  bookmarked: boolean;
};

export const Setting = {
  offersCount: 312,
  places: [
    {
      name: 'Beautiful & luxurious apartment at great location',
      price: '€120',
      type: 'Apartment',
      premium: true,
      bookmarked: false,
    },
    {
      name: 'Wood and stone place',
      price: '€80',
      type: 'Room',
      premium: false,
      bookmarked: true,
    },
    {
      name: 'Canal View Prinsengracht',
      price: '€132',
      type: 'Apartment',
      premium: false,
      bookmarked: false,
    },
    {
      name: 'Nice, cozy, warm big bed apartment',
      price: '€180',
      type: 'Apartment',
      premium: true,
      bookmarked: false,
    },
    {
      name: 'Wood and stone place',
      price: '€80',
      type: 'Room',
      premium: false,
      bookmarked: true,
    },
  ],
};
