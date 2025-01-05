import { Code2, Database, Server, Settings, Terminal } from 'lucide-react';

const skills = {
  frontend: ['HTML', 'CSS', 'React', 'Next.js', 'JavaScript', 'TypeScript'],
  backend: ['Node.js', 'Go', 'NestJS', 'Express.js', 'gRPC', 'REST APIs'],
  database: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis'],
  devops: ['Docker', 'Kubernetes', 'Git', 'CI/CD', 'Azure', 'AWS'],
  other: ['Microservices', 'Kafka', 'RabbitMQ', 'WebSockets', 'Serverless Architecture']
};

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Skills & Technologies</h2>
        </div>
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <SkillCategory title="Frontend" icon={<Code2 />} skills={skills.frontend} />
            <SkillCategory title="Backend" icon={<Terminal />} skills={skills.backend} />
            <SkillCategory title="Database" icon={<Database />} skills={skills.database} />
            <SkillCategory title="DevOps" icon={<Settings />} skills={skills.devops} />
            <SkillCategory title="Other" icon={<Server />} skills={skills.other} />
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillCategory({ title, icon, skills }: { title: string; icon: React.ReactNode; skills: string[] }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
            {icon}
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
        </div>
      </div>
      <div className="mt-4">
        <ul className="space-y-2">
          {skills.map((skill) => (
            <li
              key={skill}
              className="inline-block px-3 py-1 m-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-full"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}