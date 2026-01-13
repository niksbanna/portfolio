import { BookOpen, Github, Linkedin, Mail } from 'lucide-react';
import TypewriterAnimation from './animations/TypewriterAnimation';
import FadeInAnimation from './animations/FadeInAnimation';
import PulseAnimation from './animations/PulseAnimation';
import heroImage from '../assets/hero.jpg';

export default function Hero() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="home" className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-7xl py-32 sm:py-48 lg:py-56">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <div className="text-center md:text-left flex-1">
            <FadeInAnimation delay={0.2}>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                Hi, I'm Narendra
              </h1>
            </FadeInAnimation>
            
            <FadeInAnimation delay={0.4}>
              <TypewriterAnimation />
            </FadeInAnimation>

            <FadeInAnimation delay={0.6}>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                A Full Stack Developer with expertise in building scalable systems, user-friendly interfaces, and cloud solutions.
                Specializing in Node.js, Go, modern cloud architectures, and frontend technologies like React and Next.
              </p>
            </FadeInAnimation>

            <FadeInAnimation delay={0.8}>
              <div className="mt-10 flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start">
                <div className="flex items-center gap-x-6">
                  <a
                    href="https://github.com/niksbanna"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-3 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-gray-800 transition-colors"
                  >
                    <Github className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/narendra-singh-chandrawat/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-3 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-gray-800 transition-colors"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a
                    href="https://medium.com/@bannanicky0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-3 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-gray-800 transition-colors"
                  >
                    <BookOpen className="h-6 w-6" />
                  </a>
                  <a
                    href="mailto:bannanicky0@gmail.com"
                    className="rounded-full p-3 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-gray-800 transition-colors"
                  >
                    <Mail className="h-6 w-6" />
                  </a>
                </div>
                <PulseAnimation>
                  <button
                    onClick={scrollToAbout}
                    className="px-6 py-3 text-base font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                  >
                    Learn More About Me
                  </button>
                </PulseAnimation>
              </div>
            </FadeInAnimation>
          </div>
          <FadeInAnimation delay={0.4}>
            <div className="flex-shrink-0">
              <div className="relative w-64 h-64">
                <img
                  src={heroImage}
                  alt="Narendra Singh"
                  className="absolute inset-0 w-full h-full object-cover rounded-full shadow-2xl"
                />
                <div className="absolute inset-0 rounded-full ring-2 ring-blue-500 ring-offset-4"></div>
              </div>
            </div>
          </FadeInAnimation>
        </div>
      </div>
    </div>
  );
}