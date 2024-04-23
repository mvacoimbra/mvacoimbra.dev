import { useEffect, useRef } from 'react';
import { FaIcon, Section } from '../UI';
import ContactForm from './ContactForm';

const links = [
  {
    faIcon: 'square-whatsapp',
    link: 'https://wa.me/5562996194128',
  },
  {
    faIcon: 'linkedin',
    link: 'https://linkedin.com/in/mvacoimbra',
  },
  {
    faIcon: 'square-github',
    link: 'https://github.com/mvacoimbra',
  },
];

export default function Contact() {
  const parentDiv = useRef<HTMLDivElement | null>(null);
  const floatingDiv = useRef<HTMLDivElement | null>(null);
  const floatingDivTwo = useRef<HTMLDivElement | null>(null);
  // floaty div
  useEffect(() => {
    const parent = parentDiv.current;
    const div = floatingDiv.current;
    const divTwo = floatingDivTwo.current;
    if (parent && div && divTwo) {
      const parentWidth = parent.offsetWidth;
      const parentHeight = parent.offsetHeight;

      const keyframes = `
        @keyframes floating {
          0% { transform: translate(${Math.random() * parentWidth}px, ${Math.random() * parentHeight}px) }
          25% { transform: translate(${Math.random() * parentWidth}px, ${Math.random() * parentHeight}px) }
          50% { transform: translate(${Math.random() * parentWidth}px, ${Math.random() * parentHeight}px) }
          100% { transform: translate(${Math.random() * parentWidth}px, ${Math.random() * parentHeight}px) }
        }
      `;

      const keyframesTwo = `
      @keyframes floating2 {
        0% { transform: translate(${Math.random() * parentWidth}px, ${Math.random() * parentHeight}px) }
        25% { transform: translate(${Math.random() * parentWidth}px, ${Math.random() * parentHeight}px) }
        50% { transform: translate(${Math.random() * parentWidth}px, ${Math.random() * parentHeight}px) }
        100% { transform: translate(${Math.random() * parentWidth}px, ${Math.random() * parentHeight}px) }
      }
    `;

      const style = document.createElement('style');
      style.innerHTML = keyframes + keyframesTwo;
      document.head.appendChild(style);

      div.style.animation = 'floating 20s ease-in-out infinite alternate';
      divTwo.style.animation = 'floating2 20s ease-in-out infinite alternate';
    }
  }, []);
  // ----------------------
  return (
    <Section id='contact'>
      <div>
        <h3 className='text-center text-6xl text-synth-green1 my-9'>Contato</h3>
        <div className='grid grid-cols-5 max-xl:flex flex-col max-xl:gap-12'>
          <div className='col-span-2 gap-12 flex flex-col justify-center max-xl:items-center'>
            <p className='text-white text-2xl'>
              Entre em contato clicando nos ícones abaixo ou <br />
              através do formulário.
            </p>
            <ul className='flex gap-7'>
              {links.map((item, index) => {
                return (
                  <li key={index} className='text-synth-green1 text-6xl'>
                    <a href={item.link} target='_blank'>
                      <FaIcon name={item.faIcon} style='brands' />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className='col-span-3'>
            <ContactForm />
          </div>
        </div>
      </div>
      <footer className='flex justify-center items-center py-6 mt-12'>
        <p className='text-white text-sm'>Copyright © 2024 mvacoimbra.dev</p>
      </footer>
      {/* floating dots */}
      <div
        ref={parentDiv}
        className='-z-10 absolute top-0 left-0 w-full h-full'
      >
        <div
          ref={floatingDiv}
          className='pointer-events-none blur-[150px] rounded-full w-[500px] h-[500px] bg-opacity-30 bg-synth-green1 absolute -top-0 -left-0'
        />
        <div
          ref={floatingDivTwo}
          className='pointer-events-none blur-[150px] rounded-full w-[500px] h-[500px] bg-opacity-30 bg-synth-green1 absolute -top-0 -left-0'
        />
      </div>
      {/* BG */}
      <div className='absolute top-0 left-0 w-full h-full bg-black -z-20' />
    </Section>
  );
}

// testing comment bla
