import { Section } from '../UI';
// className="bg-[url(')] py-3 px-[100px] relative max-sm:px-[20px] overflow-hidden bg-no-repeat bg-center flex justify-center items-center bg-cover h-screen w-full bg-fixed"

export default function Hero() {
  return (
    <Section
      id='home'
      // className='h-[100svh] w-full py-3 px-[100px] relative max-sm:px-[20px] overflow-hidden'
      sectionClasses='h-[95vh]'
    >
      <div className='text-white flex flex-col justify-center items-center h-full'>
        <h2 className='text-6xl text-center text-green-glow max-sm:text-4xl'>
          Marcos Coimbra
        </h2>
        <h1 className='text-green-glow text-3xl max-sm:text-xl'>
          Web Developer
        </h1>
      </div>
      <img
        alt='V shape'
        src='https://res.cloudinary.com/mvacoimbra/image/upload/v1713047218/mvacoimbra-porfolio/V.png'
        className={`w-screen h-1/2 absolute bottom-0 left-0 pointer-events-none z-0`}
      />
      <div className='absolute left-0 top-0 w-full h-screen -z-50'>
        <div className='h-[200vh] relative'>
          <figure className='fixed'>
            <div className='bg-gradient-to-b to-20% from-black to-transparent w-full h-full absolute top-0 left-0' />
            <div className='bg-[#1EFCA3] w-full h-full mix-blend-color absolute top-0 left-0' />
            <img
              className='w-screen h-screen object-cover'
              src='https://res.cloudinary.com/mvacoimbra/image/upload/v1713886412/mvacoimbra-porfolio/synth-bg-3_doqmzj.gif'
            />
          </figure>
        </div>
      </div>
    </Section>
  );
}
