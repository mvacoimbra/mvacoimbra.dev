import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import DevIcon from './DevIcon';
import slides from './slides';

export default function ToolSlider() {
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
    speed: 500,
    slidesToShow: slides.length < 10 ? slides.length : 10,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
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

// import React from 'react';
// import Slider from 'react-slick';

// export default function ToolSlider() {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 3,
//   };
//   return (
//     <div className="slider-container">
//       <Slider {...settings}>
//         <div>
//           <h3>1</h3>
//         </div>
//         <div>
//           <h3>2</h3>
//         </div>
//         <div>
//           <h3>3</h3>
//         </div>
//         <div>
//           <h3>4</h3>
//         </div>
//         <div>
//           <h3>5</h3>
//         </div>
//         <div>
//           <h3>6</h3>
//         </div>
//         <div>
//           <h3>7</h3>
//         </div>
//         <div>
//           <h3>8</h3>
//         </div>
//         <div>
//           <h3>9</h3>
//         </div>
//       </Slider>
//     </div>
//   );
// }
