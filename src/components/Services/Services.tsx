import { Section } from '../UI';
import dots from '../../assets/dots.svg';
import ServiceSlider from './ServiceSlider';

type DotsProps = {
  reverse?: boolean;
};

const Dots = ({ reverse = false }: DotsProps) => {
  const direction = reverse ? 'rotate-180' : '';
  return <img src={dots} className={`${direction} w-fit h-fit max-sm:w-20`} />;
};

export default function Services() {
  return (
    <Section id="services" className="bg-synth-neutral1 flex gap-12  flex-col">
      <div className="flex flex-col justify-center items-center">
        <div className="flex items-center gap-10 max-sm:gap-1 mt-10">
          <Dots />
          <h3 className="text-synth-green3 text-5xl">Serviços</h3>
          <Dots reverse />
        </div>
        <h4 className="text-synth-neutral3 text-xl">
          Serviços prestados e soluções
        </h4>
      </div>
      <>
        <ServiceSlider />
      </>
    </Section>
  );
}
