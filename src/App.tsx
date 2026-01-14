import { Suspense, lazy } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import ScrollToTop from './components/ScrollToTop';
import Skills from './components/Skills';
import About from './components/About';
import { Terminal } from './components/Terminal';

const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const GitHubSection = lazy(() =>
  import('./components/GitHub/GitHubSection').then((m) => ({ default: m.default }))
);
const BlogSection = lazy(() =>
  import('./components/Blog/BlogSection').then((m) => ({ default: m.default }))
);
const MicroservicePlayground = lazy(() =>
  import('./components/MicroservicePlayground/MicroservicePlayground').then((m) => ({
    default: m.default,
  }))
);

function LoadingFallback() {
  return (
    <div className="py-24 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Suspense fallback={<LoadingFallback />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <GitHubSection />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <BlogSection />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <MicroservicePlayground />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
      <Terminal />
      <Analytics />
    </div>
  );
}

export default App;
