import { Section } from '../UI';
// import DevIcon from './DevIcon';
import ToolSlider from './ToolSlider';

export default function Tools() {
  return (
    <Section
      id='tools'
      // className='bg-black py-3 px-[100px] relative max-sm:px-[20px] overflow-hidden'
      sectionClasses='bg-black'
    >
      <h3 className='text-white text-2xl font-medium text-center border-none'>
        Proficiências
      </h3>
      <div className='relative'>
        <div className='h-1/2 w-full bg-synth-neutral1 bottom-0 left-0 z-0 absolute' />
        <ToolSlider />
      </div>
    </Section>
  );
}
