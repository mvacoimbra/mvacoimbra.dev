import { useState } from 'react';
import { FaIcon } from '../UI';

export type PortfolioCardProps = {
  title: string;
  tags: string[];
  img: string;
  link: string;
};

export default function PortfolioCard({
  title,
  tags,
  img,
  link,
}: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <figure
      className='h-[500px]'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='flex justify-center items-start h-full relative'>
        <button
          onClick={() => {
            if (isHovered) {
              setIsHovered(false);
            } else {
              setIsHovered(true);
            }
          }}
          className='hidden max-sm:flex absolute top-5 z-30 text-4xl text-white'
        >
          <FaIcon
            style='solid'
            name={`${isHovered ? 'circle-xmark' : 'circle-info'}`}
          />
        </button>

        {/* overlay */}
        {isHovered && (
          <div className=' z-10 bg-black flex flex-col gap-2 justify-end w-full h-full p-5 bg-opacity-50'>
            <h5 className='text-white text-lg font-normal'>{title}</h5>
            <div className='flex gap-1 text-black'>
              {tags.map((item, index) => (
                <span
                  className='px-2 py-1 bg-synth-green1 rounded-3xl'
                  key={index}
                >
                  {item}
                </span>
              ))}
            </div>
            <a
              href={link}
              target='_blank'
              className='hover:bg-black py-2 w-full border-2 border-white text-white rounded-3xl text-center'
            >
              Ver detalhes do projeto
            </a>
          </div>
        )}
        <div
          className='w-full h-full absolute top-0 left-0 z-0 bg-cover bg-center bg-no-repeat'
          style={{ backgroundImage: `url(${img})` }}
        />
      </div>
    </figure>
  );
}
