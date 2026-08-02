export type ServiceCategory = 'All Services' | 'Painting' | 'Waterproofing' | 'Interiors';

export interface CatalogService {
  id: string;
  title: string;
  tag: string;
  category: Exclude<ServiceCategory, 'All Services'>;
  image: string;
  description: string;
  bookable: boolean;
  /** Extra gallery images (e.g. waterproofing detail) */
  gallery?: string[];
}

export const serviceCities = [
  'Delhi',
  'Faridabad',
  'Ghaziabad',
  'Gurugram',
  'Greater Noida',
  'Noida',
  'Others',
] as const;

export const serviceCategories: ServiceCategory[] = [
  'All Services',
  'Painting',
  'Waterproofing',
  'Interiors',
];

export const surveyTimeSlots = [
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
] as const;

export const catalogServices: CatalogService[] = [
  {
    id: 'interior-painting',
    title: 'Interior Painting',
    tag: 'Homes & Apartments',
    category: 'Painting',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=1200',
    description:
      'Smooth interior finishes, accent walls, and dust-controlled painting for living rooms, bedrooms, and kitchens.',
    bookable: true,
  },
  {
    id: 'exterior-painting',
    title: 'Exterior Painting',
    tag: 'Weather-Shield Coat',
    category: 'Painting',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=1200',
    description:
      'Durable exterior emulsions and weather-resistant coats that protect and refresh your building facade.',
    bookable: true,
  },
  {
    id: 'rental-painting',
    title: 'Rental Painting',
    tag: 'Quick Turnaround',
    category: 'Painting',
    image: '/rental-painting.jpg',
    description:
      'Fast, neat painting packages for rental properties — ready for new tenants with minimal disruption.',
    bookable: true,
  },
  {
    id: 'texture',
    title: 'Texture',
    tag: 'Accent & Designer Finishes',
    category: 'Painting',
    image: '/texture.png',
    description:
      'Designer wall textures, metallic accents, and feature finishes that elevate any space.',
    bookable: true,
  },
  {
    id: 'polishing',
    title: 'Polishing',
    tag: 'Wood & Surface Shine',
    category: 'Painting',
    image: '/polishing.jpg',
    description:
      'Professional polishing for woodwork, doors, and furniture surfaces for a lasting shine.',
    bookable: true,
  },
  {
    id: 'waterproofing',
    title: 'Waterproofing',
    tag: 'Terrace, Bathroom & Basement',
    category: 'Waterproofing',
    image: '/waterproofing.jpg',
    description:
      'Multi-layer waterproofing for terraces, bathrooms, basements, and external walls. Expert inspection, quality membranes, and long-lasting leak protection — book a free survey to get a site-specific plan.',
    bookable: true,
    gallery: [
      '/waterproofing.jpg',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200',
    ],
  },
  {
    id: 'interior-renovation',
    title: 'Interior Renovation',
    tag: 'Coming Soon',
    category: 'Interiors',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200',
    description:
      'Full interior renovation and design services are coming soon. Stay tuned for turnkey home makeovers.',
    bookable: false,
  },
];
