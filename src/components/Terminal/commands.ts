import type { TerminalCommand, TerminalOutput } from '../../types/terminal';
import { projects } from '../../data/projects';

const ASCII_ART = `
 _   _ _ _        _
| \\ | (_) |      | |
|  \\| |_| | _____| |__   __ _ _ __  _ __   __ _
| . \` | | |/ / __| '_ \\ / _\` | '_ \\| '_ \\ / _\` |
| |\\  | |   <\\__ \\ | | | (_| | | | | | | | (_| |
|_| \\_|_|_|\\_\\___/_| |_|\\__,_|_| |_|_| |_|\\__,_|

Full Stack Developer | Node.js | Go | React
Type 'help' to see available commands
`;

const skills = {
  frontend: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
  backend: ['Node.js', 'Go', 'NestJS', 'Express.js', 'gRPC', 'REST APIs'],
  database: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis'],
  devops: ['Docker', 'Kubernetes', 'Git', 'CI/CD', 'Azure', 'AWS'],
};

export const commands: Record<string, TerminalCommand> = {
  help: {
    name: 'help',
    description: 'List all available commands',
    execute: () => [
      { type: 'info', content: 'Available Commands:' },
      { type: 'text', content: '' },
      { type: 'text', content: '  help        - Show this help message' },
      { type: 'text', content: '  about       - Learn about me' },
      { type: 'text', content: '  skills      - View my technical skills' },
      { type: 'text', content: '  projects    - List my featured projects' },
      { type: 'text', content: '  contact     - Get my contact information' },
      { type: 'text', content: '  social      - View my social links' },
      { type: 'text', content: '  experience  - View work experience' },
      { type: 'text', content: '  clear       - Clear the terminal' },
      { type: 'text', content: '  theme       - Toggle dark/light mode' },
      { type: 'text', content: '' },
      { type: 'info', content: 'Tip: Use up/down arrows to navigate command history' },
    ],
  },

  about: {
    name: 'about',
    description: 'Learn about me',
    execute: () => [
      { type: 'success', content: '=== About Nikhil Banna ===' },
      { type: 'text', content: '' },
      {
        type: 'text',
        content:
          "I'm a passionate Full Stack Developer with 2+ years of experience building scalable systems and intuitive user interfaces.",
      },
      { type: 'text', content: '' },
      {
        type: 'text',
        content:
          'Expertise: Node.js, Go, React, Next.js, and modern cloud architectures.',
      },
      { type: 'text', content: '' },
      {
        type: 'text',
        content:
          'I specialize in solving complex challenges, optimizing performance, and delivering high-quality applications.',
      },
      { type: 'text', content: '' },
      { type: 'info', content: 'Run "skills" to see my technical stack' },
    ],
  },

  skills: {
    name: 'skills',
    description: 'View my technical skills',
    execute: (args) => {
      if (args.length > 0) {
        const category = args[0].toLowerCase();
        if (category in skills) {
          return [
            { type: 'success', content: `=== ${category.toUpperCase()} Skills ===` },
            { type: 'text', content: '' },
            { type: 'text', content: skills[category as keyof typeof skills].join(', ') },
          ];
        }
        return [
          {
            type: 'error',
            content: `Unknown category: ${category}. Available: frontend, backend, database, devops`,
          },
        ];
      }

      return [
        { type: 'success', content: '=== Technical Skills ===' },
        { type: 'text', content: '' },
        { type: 'info', content: 'Frontend:' },
        { type: 'text', content: `  ${skills.frontend.join(', ')}` },
        { type: 'text', content: '' },
        { type: 'info', content: 'Backend:' },
        { type: 'text', content: `  ${skills.backend.join(', ')}` },
        { type: 'text', content: '' },
        { type: 'info', content: 'Database:' },
        { type: 'text', content: `  ${skills.database.join(', ')}` },
        { type: 'text', content: '' },
        { type: 'info', content: 'DevOps:' },
        { type: 'text', content: `  ${skills.devops.join(', ')}` },
        { type: 'text', content: '' },
        { type: 'text', content: 'Usage: skills [category]' },
      ];
    },
  },

  projects: {
    name: 'projects',
    description: 'List my featured projects',
    execute: (args) => {
      if (args.length > 0) {
        const projectName = args.join(' ').toLowerCase();
        const project = projects.find((p) => p.title.toLowerCase().includes(projectName));
        if (project) {
          return [
            { type: 'success', content: `=== ${project.title} ===` },
            { type: 'text', content: '' },
            { type: 'text', content: project.description },
            { type: 'text', content: '' },
            { type: 'info', content: 'Technologies:' },
            { type: 'text', content: `  ${project.technologies.join(', ')}` },
            ...(project.githubUrl
              ? [{ type: 'text' as const, content: '' }, { type: 'text' as const, content: `GitHub: ${project.githubUrl}` }]
              : []),
          ];
        }
        return [{ type: 'error', content: `Project not found: ${args.join(' ')}` }];
      }

      const output: TerminalOutput[] = [
        { type: 'success', content: '=== Featured Projects ===' },
        { type: 'text', content: '' },
      ];

      projects.forEach((project, index) => {
        output.push({ type: 'info', content: `${index + 1}. ${project.title}` });
        output.push({ type: 'text', content: `   ${project.technologies.join(', ')}` });
        output.push({ type: 'text', content: '' });
      });

      output.push({ type: 'text', content: 'Usage: projects [name] - for project details' });

      return output;
    },
  },

  contact: {
    name: 'contact',
    description: 'Get my contact information',
    execute: () => [
      { type: 'success', content: '=== Contact Information ===' },
      { type: 'text', content: '' },
      { type: 'text', content: 'Email: bannanicky0@gmail.com' },
      { type: 'text', content: 'Location: India' },
      { type: 'text', content: '' },
      { type: 'info', content: 'Open to freelance and full-time opportunities!' },
    ],
  },

  social: {
    name: 'social',
    description: 'View my social links',
    execute: () => [
      { type: 'success', content: '=== Social Links ===' },
      { type: 'text', content: '' },
      { type: 'text', content: 'GitHub:   https://github.com/niksbanna' },
      { type: 'text', content: 'LinkedIn: https://www.linkedin.com/in/nikhil-banna/' },
      { type: 'text', content: 'Medium:   https://medium.com/@bannanicky0' },
    ],
  },

  experience: {
    name: 'experience',
    description: 'View work experience',
    execute: () => [
      { type: 'success', content: '=== Work Experience ===' },
      { type: 'text', content: '' },
      { type: 'info', content: 'Associate Developer @ Hoicko Pvt. Ltd.' },
      { type: 'text', content: 'April 2023 - Present' },
      { type: 'text', content: '' },
      {
        type: 'text',
        content: '• Leading Node.js development and implementing scalable solutions',
      },
      { type: 'text', content: '• Achieved 40% increase in user engagement' },
      { type: 'text', content: '• Built microservices architecture with Go and Kubernetes' },
      { type: 'text', content: '' },
      { type: 'info', content: 'Education:' },
      { type: 'text', content: 'B.Sc Mathematics - MLV Govt. College (2018-2021)' },
    ],
  },

  clear: {
    name: 'clear',
    description: 'Clear the terminal',
    execute: () => [],
  },

  theme: {
    name: 'theme',
    description: 'Toggle dark/light mode',
    execute: () => {
      const isDark = document.documentElement.classList.toggle('dark');
      return [
        {
          type: 'success',
          content: `Theme switched to ${isDark ? 'dark' : 'light'} mode`,
        },
      ];
    },
  },
};

export function getWelcomeMessage(): TerminalOutput[] {
  return [{ type: 'ascii', content: ASCII_ART }];
}

export function executeCommand(input: string): TerminalOutput[] {
  const trimmed = input.trim();
  if (!trimmed) return [];

  const parts = trimmed.split(/\s+/);
  const commandName = parts[0].toLowerCase();
  const args = parts.slice(1);

  if (commandName in commands) {
    return commands[commandName].execute(args);
  }

  return [
    { type: 'error', content: `Command not found: ${commandName}` },
    { type: 'text', content: 'Type "help" to see available commands' },
  ];
}
