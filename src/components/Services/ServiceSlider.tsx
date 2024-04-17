import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ServiceCard, { ServiceCardProps } from './ServiceCard';

const slides: ServiceCardProps[] = [
  {
    icon: 'figma-plain',
    title: 'UX/UI',
    subtitle: 'Prototipagem',
    description:
      'Desenvolvimento de protótipos para validação de fluxo e experiência do usuário.',
    bgColor:
      'linear-gradient(135deg, #FF3D00 0%, #FF7361 25%, #B659FF 50%, #00BCFF 75%, #00CF7F 100%)',
  },
  {
    icon: 'html5-plain',
    title: 'Web Apps',
    subtitle: 'Websites',
    description:
      'Desenvolvimento de websites responsivos, optimizados para mecanismos de busca.',
    bgColor: 'linear-gradient(135deg, #E34F26 50%, #EF642A 50%)',
  },
  {
    icon: 'react-original',
    title: 'Aplicativos',
    subtitle: 'Android | IOS',
    description:
      'Desenvolvimento de aplicativos React Native para dispositivos móveis Android e IOS.',
    bgColor: 'linear-gradient(135deg, #222 25.31%, #61DAFB 79.59%)',
  },
];

export default function ServiceSlider() {
  return (
    <div className="flex justify-around gap-y-10 flex-wrap">
      {slides.map((item, index) => (
        <ServiceCard key={index} {...item} className="hover:scale-105" />
      ))}
    </div>
  );
}
