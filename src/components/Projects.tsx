const projects = [
  {
    title: 'Solarbees',
    description: 'Real-time analytical platform for renewable energy sector, enabling instant data processing and interactive visualization for energy metrics. Reduced data analysis time by 50%.',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['Nest.js', 'React', 'MongoDB', 'Docker']
  },
  {
    title: 'Workflow Optimization System',
    description: 'Engineered automation solutions to replace repetitive manual tasks, achieving a 40% reduction in manual labor and a 25% decrease in error rates.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['Go', 'Temporal', 'MySQL', 'Docker', 'Kubernetes']
  },
  {
    title: 'Traceability Software',
    description: 'Developed a station-wise traceability system for TS-Tech Sun Raj Ltd using Node.js, Sqlserver, Socket.IO and Docker to enhance production tracking accuracy.',
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['Nest.js', 'Sqlserver', 'Socket.IO', 'Docker']
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Featured Projects</h2>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="flex flex-col overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-700 transition-transform hover:scale-105"
            >
              <div className="flex-shrink-0">
                <img className="h-48 w-full object-cover" src={project.image} alt={project.title} />
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                  <p className="mt-3 text-base text-gray-500 dark:text-gray-300">{project.description}</p>
                </div>
                <div className="mt-6">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-slate-100 dark:bg-blue-900 text-blue-800 dark:text-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}