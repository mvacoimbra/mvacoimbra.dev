import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Tools from './components/Tools';
import Services from './components/Services';
import Portfolio from './components/Portfolio';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Tools />
      <Services />
      <Portfolio />
      <div className='w-full h-screen bg-synth-neutral1' />
    </>
  );
}

export default App;
