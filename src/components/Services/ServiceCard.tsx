import NavlinkScroll from '../Navbar/NavlinkScroll';
import { DevIcon } from '../UI';

export type ServiceCardProps = {
  icon: string;
  size?: number;
  title?: string;
  subtitle?: string;
  description?: string;
  bgColor?: string;
  className?: string;
};

export default function ServiceCard({
  icon,
  size = 68,
  title = 'Title',
  subtitle = 'Subtitle',
  description = 'Description',
  bgColor,
  className,
}: ServiceCardProps) {
  return (
    <div className={`flex flex-col gap-5 items-center ${className}`}>
      <div className="flex flex-col items-center">
        <DevIcon
          icon={icon}
          iconSize="text-4xl"
          size={size}
          bgColor={bgColor}
        />
        <h5 className="text-2xl -mb-1">{title}</h5>
        <h6 className="text-synth-neutral3">{subtitle}</h6>
      </div>
      <p className="text-center text-synth-neutral4 text-lg">{description}</p>
      <NavlinkScroll
        sectionId={'contact'}
        className="px-2 py-1 hover:bg-black transition-all duration-300 hover:text-white border-black border-[1.5px] w-fit rounded-3xl"
      >
        <span>Saiba mais</span>
      </NavlinkScroll>
    </div>
  );
}
