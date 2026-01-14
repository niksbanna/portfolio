import { Project } from '../types';

export const projects: Project[] = [
  {
    title: 'Medidiet App',
    description:
      'AI-powered nutrition management app for medical conditions. Personalized meal plans via Gemini API, health tracking, and premium UI. Built with React Native & Expo.',
    image:
      'https://plus.unsplash.com/premium_photo-1742908206163-845c47709dc0?q=80&w=2340&auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/niksbanna/medidiet-app',
    technologies: ['ReactJS', 'TypeScript', 'Gemini API', 'Zod', 'React Native', 'Expo', 'Docker', 'TailwindCSS'],
  },
  {
    title: 'Wellness',
    description:
      'A modern telehealth platform for medical weight loss programs, featuring a public marketing site and authenticated member portal.',
    image:
      'https://images.unsplash.com/photo-1461468611824-46457c0e11fd?q=80&w=2340&auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/niksbanna/wellness', 
    technologies: ['Next.js', 'React', 'TypeScript', 'MongoDB', 'Docker', 'TailwindCSS', 'Stripe', 'Auth0'],
  },
  {
    title: 'Healer',
    description:
      'Healer packages the MedGemma 4B instruction-tuned model behind a FastAPI service so you can answer colorectal cancer screening questions from histopathology imagery. ',
    image:
      'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2832&auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/niksbanna/healer',
    technologies: ['FastAPI', 'Python', 'Google Cloud Build', 'MedGemma', 'Docker', 'React', 'TypeScript'],
  },
];
