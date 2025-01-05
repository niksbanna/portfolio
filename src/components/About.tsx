export default function About() {
  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">About Me</h2>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
            I’m a passionate Full Stack Developer skilled in creating scalable systems and intuitive user interfaces. With expertise in Node.js, Go, and modern frontend frameworks like React and Next.js, I deliver seamless, high-performance applications.<br /><br />

            I specialize in solving complex challenges, optimizing performance, and leveraging cloud architectures for reliable deployments. Constantly learning and innovating, I bring fresh ideas and cutting-edge solutions to every project.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">2+</div>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">10+</div>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">10+</div>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">12+</div>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">Technologies</div>
          </div>
        </div>
      </div>
    </section>
  );
}