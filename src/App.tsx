import useLenis from "./lib/useLenis";
import { RouterProvider, useRouter } from "./lib/router";
import { getWork } from "./data/works";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import SelectedWorks from "./components/SelectedWorks";
import PersonalCaseStudies from "./components/PersonalCaseStudies";
import Testimonials from "./components/Testimonials";
import MySpace from "./components/MySpace";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WorkPage from "./components/WorkPage";
import AboutPage from "./components/AboutPage";

function Routes() {
  const { path } = useRouter();

  const workMatch = path.match(/^\/work\/([\w-]+)\/?$/);
  const work = workMatch ? getWork(workMatch[1]) : undefined;
  const isAbout = /^\/about\/?$/.test(path);

  return (
    <main>
      <Header />
      {work ? (
        <WorkPage key={work.slug} work={work} />
      ) : isAbout ? (
        <AboutPage />
      ) : (
        <>
          <Hero />
          <About />
          <SelectedWorks />
          <PersonalCaseStudies />
          <Testimonials />
          <MySpace />
          <Contact />
        </>
      )}
      <Footer />
    </main>
  );
}

export default function App() {
  useLenis();
  return (
    <RouterProvider>
      <Routes />
    </RouterProvider>
  );
}
