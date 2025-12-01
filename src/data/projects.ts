import govBago from '../assets/gov-bago.png';

export interface Project {
  id: number;
  image: string;
  title: string;
  description: string;
  location: { city: string; state: string };
  status: 'in progress' | 'completed';
}

const projects: Project[] = [
  {
    id: 1,
    image: govBago,
    title:
      'Niger State to End Direct Supply of Live Cows, Launch Meat Processing for Southwest Markets',
    location: { city: 'gidan kwano', state: 'niger' },
    description: '123',
    status: 'in progress',
  },
  {
    id: 2,
    image: govBago,
    title:
      'Niger State to End Direct Supply of Live Cows, Launch Meat Processing for Southwest Markets',
    location: { city: 'gidan mangoro', state: 'niger' },
    description: '123',
    status: 'completed',
  },
  {
    id: 3,
    image: govBago,
    title:
      'Niger State to End Direct Supply of Live Cows, Launch Meat Processing for Southwest Markets',
    location: { city: 'minna', state: 'niger' },
    description: '123',
    status: 'in progress',
  },
  {
    id: 4,
    image: govBago,
    title:
      'Niger State to End Direct Supply of Live Cows, Launch Meat Processing for Southwest Markets',
    location: { city: 'chanchaga', state: 'niger' },
    description: '123',
    status: 'completed',
  },
];

export default projects;
