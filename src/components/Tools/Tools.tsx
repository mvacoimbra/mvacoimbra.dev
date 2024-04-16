import { Section } from '../UI';
// import DevIcon from './DevIcon';
import ToolSlider from './ToolSlider';

export default function Tools() {
  return (
    <div className="mt-4">
      <Section id="tools" className="bg-black ">
        <h3 className="text-white text-2xl font-medium text-center border-none">
          Proficiências
        </h3>
      </Section>
      <div className="relative">
        {/* <DevIcon icon="devicon-javascript-plain" label="JavaScript" /> */}
        <ToolSlider />
        <>
          <div className="h-1/2 w-full bg-black top-0 left-0 -z-10 absolute" />
          <div className="h-1/2 w-full bg-synth-neutral1 bottom-0 left-0 -z-10 absolute" />
        </>
      </div>
    </div>
  );
}
