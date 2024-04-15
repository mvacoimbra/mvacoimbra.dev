import { Section } from '../UI';

export default function Hero() {
  return (
    <Section
      id="home"
      className="bg-[url('https://res.cloudinary.com/mvacoimbra/image/upload/v1713044471/mvacoimbra-porfolio/hero-bg.png')] bg-no-repeat bg-center flex justify-center items-center bg-cover h-screen w-full bg-fixed"
    >
      <div className="text-white flex flex-col items-center">
        <h2 className="text-6xl text-green-glow max-sm:text-5xl">
          Marcos Coimbra
        </h2>
        <h1 className="text-green-glow text-3xl">Web Developer</h1>
      </div>
      <img
        src="https://res.cloudinary.com/mvacoimbra/image/upload/v1713047218/mvacoimbra-porfolio/V.png"
        className={`w-screen h-1/2 absolute bottom-0 left-0`}
      ></img>
    </Section>
  );
}
