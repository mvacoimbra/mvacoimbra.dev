import { FaIcon, Section } from '../UI';
import PortfolioSlider from './PortfolioSlider';
import Slider from 'react-slick';

export default function Portfolio() {
  let sliderRef: React.RefObject<Slider> | null = null;
  const setSliderRef = (ref: React.RefObject<Slider>) => {
    sliderRef = ref;
  };
  const next = () => {
    if (sliderRef && sliderRef.current !== null) {
      sliderRef.current.slickNext();
    }
  };
  const previous = () => {
    if (sliderRef && sliderRef.current !== null) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <Section
      id='portfolio'
      className='bg-synth-green1 grid grid-cols-4 max-xl:grid-cols-3 max-sm:flex flex-col relative'
    >
      <div className='flex flex-col justify-center ml-[100px] max-lg:ml-5 max-sm:ml-0 max-sm:p-5 max-sm:gap-2 max-sm:items-center gap-5'>
        <h3 className='text-5xl'>Porfólio</h3>
        <p className='max-w-56 max-sm:text-center'>
          Conheça as soluções criadas e desenvolvidas para clientes.
        </p>
        <div className='flex gap-5 max-sm:justify-evenly max-sm:w-full'>
          <button
            className='px-4 border-2 border-black active:bg-black active:text-synth-green1 rounded-full sm:hover:bg-black sm:hover:text-synth-green1'
            onClick={() => previous()}
          >
            <FaIcon name='arrow-left' style='solid' />
          </button>
          <button
            className='px-4 border-2 border-black rounded-full active:bg-black active:text-synth-green1 sm:hover:bg-black sm:hover:text-synth-green1'
            onClick={() => next()}
          >
            <FaIcon name='arrow-right' style='solid' />
          </button>
        </div>
      </div>
      <div className='col-span-3 max-xl:col-span-2'>
        <PortfolioSlider innerRef={setSliderRef} />
      </div>
      <img
        src='https://res.cloudinary.com/mvacoimbra/image/upload/v1713492130/mvacoimbra-porfolio/transition-tilt.png'
        className='w-full absolute top-0 left-0'
      />
    </Section>
  );
}
