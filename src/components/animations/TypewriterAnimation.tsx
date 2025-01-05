import Typewriter from 'typewriter-effect';

export default function TypewriterAnimation() {
  return (
    <div className="text-3xl sm:text-4xl text-blue-600 dark:text-blue-400 font-semibold">
      <Typewriter
        options={{
          strings: ['Backend Developer', 'Fullstack Developer', 'Mobile Developer'],
          autoStart: true,
          loop: true,
          deleteSpeed: 50,
          delay: 75,
          // pauseFor: 1500,
        }}
      />
    </div>
  );
}