import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { DevIcon } from '../UI';
import slides from './slides';

export default function ToolSlider() {
  // responsive settings for the slider
  const responsiveLg = {
    breakpoint: 1024,
    settings: {
      slidesToShow: 6,
    },
  };
  const responsiveMd = {
    breakpoint: 768,
    settings: {
      slidesToShow: 4,
      dots: false,
    },
  };
  const responsiveSm = {
    breakpoint: 640,
    settings: {
      slidesToShow: 3,
      dots: false,
    },
  };
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: slides.length < 10 ? slides.length : 10,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [responsiveLg, responsiveMd, responsiveSm],
  };
  return (
    <div>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div className="flex justify-center items-center">
              <DevIcon
                icon={slide.icon}
                size={slide.size}
                label={slide.label}
                iconColor={slide.iconColor}
                bgColor={slide.bgColor}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
