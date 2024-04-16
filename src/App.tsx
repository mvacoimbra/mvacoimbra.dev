import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Tools from './components/Tools';
// import ToolSlider from './components/Tools/ToolSlider';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Tools />
      <div className="w-full h-screen bg-synth-neutral1" />
    </>
  );
}

export default App;
