import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useEffect, useRef } from 'react';
import PortfolioCard, { PortfolioCardProps } from './PortfolioCard';

const slides: PortfolioCardProps[] = [
  {
    title: 'EMCOS Engenharia',
    tags: ['Landing Page', 'React'],
    img: 'https://res.cloudinary.com/mvacoimbra/image/upload/v1713496008/mvacoimbra-porfolio/portfolio-emcos.png',
    link: 'https://emcos.com.br',
  },
  {
    title: 'Smart Cooling',
    tags: ['Landing Page', 'Next.js'],
    img: 'https://res.cloudinary.com/mvacoimbra/image/upload/v1713496014/mvacoimbra-porfolio/portfolio-smartcooling.png',
    link: 'https://smartcooling.com.br',
  },
  {
    title: 'Bunch Software',
    tags: ['Landing Page', 'Next.js', 'Storybook'],
    img: 'https://res.cloudinary.com/mvacoimbra/image/upload/v1713496010/mvacoimbra-porfolio/portfolio-bunchsoftware.png',
    link: 'https://bunchsoftware.dev',
  },
];

export type PortfolioSliderProps = {
  innerRef: (ref: React.RefObject<Slider>) => void;
};

export default function PortfolioSlider({ innerRef }: PortfolioSliderProps) {
  const responsiveXl = {
    breakpoint: 1280,
    settings: {
      slidesToShow: 2,
    },
  };
  const responsiveLg = {
    breakpoint: 1024,
    settings: {
      slidesToShow: 1,
    },
  };
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 650,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4000,
    responsive: [responsiveXl, responsiveLg],
  };
  // REF
  const sliderRef = useRef<Slider | null>(null);
  useEffect(() => {
    innerRef(sliderRef);
  }, [innerRef]);
  return (
    <Slider {...settings} ref={sliderRef}>
      {slides.map((slide, index) => (
        <PortfolioCard key={index} {...slide} />
      ))}
    </Slider>
  );
}
