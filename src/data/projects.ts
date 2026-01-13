import { Project } from '../types';

export const projects: Project[] = [
  {
    title: 'Solarbees',
    description:
      'Real-time analytical platform for renewable energy sector, enabling instant data processing and interactive visualization for energy metrics. Reduced data analysis time by 50%.',
    image:
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/niksbanna/solarbees',
    technologies: ['Nest.js', 'React', 'MongoDB', 'Docker'],
  },
  {
    title: 'Workflow Optimization System',
    description:
      'Engineered automation solutions to replace repetitive manual tasks, achieving a 40% reduction in manual labor and a 25% decrease in error rates.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/niksbanna/workflow-optimizer',
    technologies: ['Go', 'Temporal', 'MySQL', 'Docker', 'Kubernetes'],
  },
  {
    title: 'Traceability Software',
    description:
      'Developed a station-wise traceability system for TS-Tech Sun Raj Ltd using Node.js, Sqlserver, Socket.IO and Docker to enhance production tracking accuracy.',
    image:
      'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/niksbanna/traceability-system',
    technologies: ['Nest.js', 'SQL Server', 'Socket.IO', 'Docker'],
  },
];
