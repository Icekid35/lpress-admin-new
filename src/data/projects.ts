import govBago from '../assets/gov-bago.png';

export interface Project {
  id: number;
  image: string;
  title: string;
  description: string;
  location: string;
  status: 'in progress' | 'completed';
}

const projects: Project[] = [
  {
    id: 1,
    image: govBago,
    title:
      'Niger State to End Direct Supply of Live Cows, Launch Meat Processing for Southwest Markets',
    location: 'gidan kwano, niger state',
    description: '123',
    status: 'in progress',
  },
  {
    id: 2,
    image: govBago,
    title:
      'Niger State to End Direct Supply of Live Cows, Launch Meat Processing for Southwest Markets',
    location: 'gidan mangoro, niger state',
    description: '123',
    status: 'completed',
  },
  {
    id: 3,
    image: govBago,
    title:
      'Niger State to End Direct Supply of Live Cows, Launch Meat Processing for Southwest Markets',
    location: 'minna, niger state',
    description: '123',
    status: 'in progress',
  },
  {
    id: 4,
    image: govBago,
    title:
      'Niger State to End Direct Supply of Live Cows, Launch Meat Processing for Southwest Markets',
    location: 'chanchaga, niger state',
    description: '123',
    status: 'completed',
  },
];

export default projects;
