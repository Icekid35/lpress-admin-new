import govBago from '../assets/gov-bago.png';

export interface News {
  id: number;
  image: string;
  title: string;
  publishDate: string;
  details: string;
  event: string;
  location: string;
}

const date = new Date();

const news: News[] = [
  {
    id: 1,
    image: govBago,
    title:
      'Niger State to End Direct Supply of Live Cows, Launch Meat Processing for Southwest Markets',
    publishDate: date.toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    details:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat, nesciunt quia quidem amet explicabo cupiditate architecto, ducimus animi deleniti tempora dolore in dolorum dolor? Assumenda, odio! Autem aut exercitationem suscipit, velit laudantium possimus eligendi facere nisi sed temporibus hic deleniti! Eum rem labore voluptate earum nemo ex illum nisi facere voluptatum ut magni id sit autem officia adipisci blanditiis, minus laboriosam sunt? Quidem quos molestiae doloribus odio ipsam perspiciatis ad laboriosam voluptas qui rem cum officia earum aspernatur minus adipisci animi corporis a illum laborum culpa esse placeat delectus, laudantium provident? Ea ut nobis voluptatum reiciendis beatae atque fugit maxime?',
    event: 'Lpres event, niger state',
    location: 'Abuja',
  },

  {
    id: 2,
    image: govBago,
    title:
      'Niger State to End Direct Supply of Live Cows, Launch Meat Processing for Southwest Markets',
    publishDate: date.toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    details:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat, nesciunt quia quidem amet explicabo cupiditate architecto, ducimus animi deleniti tempora dolore in dolorum dolor? Assumenda, odio! Autem aut exercitationem suscipit, velit laudantium possimus eligendi facere nisi sed temporibus hic deleniti! Eum rem labore voluptate earum nemo ex illum nisi facere voluptatum ut magni id sit autem officia adipisci blanditiis, minus laboriosam sunt? Quidem quos molestiae doloribus odio ipsam perspiciatis ad laboriosam voluptas qui rem cum officia earum aspernatur minus adipisci animi corporis a illum laborum culpa esse placeat delectus, laudantium provident? Ea ut nobis voluptatum reiciendis beatae atque fugit maxime?',
    event: 'Lpres event, niger state',
    location: 'Abuja',
  },

  {
    id: 3,
    image: govBago,
    title:
      'Niger State to End Direct Supply of Live Cows, Launch Meat Processing for Southwest Markets',
    publishDate: date.toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    details:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat, nesciunt quia quidem amet explicabo cupiditate architecto, ducimus animi deleniti tempora dolore in dolorum dolor? Assumenda, odio! Autem aut exercitationem suscipit, velit laudantium possimus eligendi facere nisi sed temporibus hic deleniti! Eum rem labore voluptate earum nemo ex illum nisi facere voluptatum ut magni id sit autem officia adipisci blanditiis, minus laboriosam sunt? Quidem quos molestiae doloribus odio ipsam perspiciatis ad laboriosam voluptas qui rem cum officia earum aspernatur minus adipisci animi corporis a illum laborum culpa esse placeat delectus, laudantium provident? Ea ut nobis voluptatum reiciendis beatae atque fugit maxime?',
    event: 'Lpres event, niger state',
    location: 'Abuja',
  },

  {
    id: 4,
    image: govBago,
    title:
      'Niger State to End Direct Supply of Live Cows, Launch Meat Processing for Southwest Markets',
    publishDate: date.toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    details:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat, nesciunt quia quidem amet explicabo cupiditate architecto, ducimus animi deleniti tempora dolore in dolorum dolor? Assumenda, odio! Autem aut exercitationem suscipit, velit laudantium possimus eligendi facere nisi sed temporibus hic deleniti! Eum rem labore voluptate earum nemo ex illum nisi facere voluptatum ut magni id sit autem officia adipisci blanditiis, minus laboriosam sunt? Quidem quos molestiae doloribus odio ipsam perspiciatis ad laboriosam voluptas qui rem cum officia earum aspernatur minus adipisci animi corporis a illum laborum culpa esse placeat delectus, laudantium provident? Ea ut nobis voluptatum reiciendis beatae atque fugit maxime?',
    event: 'Lpres event, niger state',
    location: 'Abuja',
  },
];

export default news;
