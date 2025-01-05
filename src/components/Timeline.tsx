interface TimelineItem {
  date: string;
  title: string;
  description: string;
  company?: string;
}

const timelineItems: TimelineItem[] = [
  {
    date: 'April 2023 - Present',
    title: 'Associate Developer',
    company: 'Hoicko Pvt. Ltd.',
    description: 'Leading Node.js development and implementing scalable solutions. Achieved 40% increase in user engagement.'
  },
  {
    date: '2018 - 2021',
    title: 'B.Sc Mathematics',
    company: 'MLV Govt. College',
    description: 'Studied Advanced Mathematics, Algorithms and Data Structures, and Database Management Systems.'
  }
];

export default function Timeline() {
  return (
    <div className="relative mt-12">
      <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
      {timelineItems.map((item, index) => (
        <div key={index} className="relative mb-12">
          <div className="flex items-center">
            <div className="flex-1 text-right mr-8 hidden md:block">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
              {item.company && (
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.company}</p>
              )}
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-white dark:border-gray-900"></div>
            </div>
            <div className="flex-1 ml-8">
              <div className="md:hidden mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                {item.company && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.company}</p>
                )}
              </div>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                {item.date}
              </time>
              <p className="text-base text-gray-500 dark:text-gray-300">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}