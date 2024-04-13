import type { NavlinkScrollProps } from './NavlinkScroll';
import NavlinkScroll from './NavlinkScroll';

const links: NavlinkScrollProps[] = [
  { sectionId: 'home', label: 'Início' },
  { sectionId: 'about', label: 'Quem sou' },
  { sectionId: 'services', label: 'Serviços' },
  { sectionId: 'portfolio', label: 'Portfólio' },
  { sectionId: 'contact', label: 'Contato' },
];

export default function Navbar() {
  return (
    <header className="py-3 px-[100px] flex justify-center items-center h-[100px] w-full fixed z-50">
      <div className="bg-black bg-opacity-5 w-full h-full absolute top-0 left-0 -z-10 backdrop-blur-md" />
      <nav className="flex">
        <ul>
          {links.map((link) => (
            <li key={link.sectionId} className="inline-block mx-4">
              <NavlinkScroll sectionId={link.sectionId} label={link.label} />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
