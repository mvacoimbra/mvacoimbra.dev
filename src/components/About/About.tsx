import { Section } from '../UI';

export default function About() {
  return (
    <Section
      id='about'
      className="bg-black flex gap-16 max-sm:gap-5 justify-center items-center flex-wrap 'py-3 px-[100px] relative max-sm:px-[20px] overflow-hidden'"
    >
      <img
        alt='Marcos Coimbra profile picture'
        className='pointer-events-none w-[312px] h-[312px]'
        src='https://res.cloudinary.com/mvacoimbra/image/upload/v1713229251/mvacoimbra-porfolio/profile-pic.png'
      />
      <div>
        <h3 className='text-synth-green1 text-6xl mb-4'>Olá,</h3>
        <div className='text-white text-base max-w-[820px] '>
          <p>
            sou Marcos Coimbra, desenvolvedor web entusiasta da solução de
            problemas. Tenho experiência em design, prototipagem e
            desenvolvimento de aplicações web e mobile e atualmente faço parte
            da equipe{' '}
            <strong className='text-synth-green1'>Bunch Software</strong>.
          </p>
          <p>
            Desenvolvimento é minha verdadeira vocação e apreciar o desafio
            incessante de resolver problemas que para mim é como um jogo de
            quebra-cabeças de níveis infinitos.
          </p>
        </div>
      </div>
    </Section>
  );
}
