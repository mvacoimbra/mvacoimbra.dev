import { useState } from 'react';
import { FaIcon } from '../UI';
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
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className=" shadow-sm">
      <nav className="py-3 px-[100px] max-sm:px-[20px] flex justify-center max-sm:justify-end items-center h-[100px] w-full fixed z-50 backdrop-blur-sm bg-black bg-opacity-5">
        <button
          className="sm:hidden"
          onClick={() => {
            setIsOpen((prev) => !prev);
            console.log('isOpen', isOpen);
          }}
        >
          <FaIcon style="solid" name="bars" className="text-4xl text-white" />
        </button>
        <ul className="max-sm:hidden flex gap-12 max-lg:gap-5">
          {links.map((link) => (
            <li key={link.sectionId}>
              <NavlinkScroll sectionId={link.sectionId} label={link.label} />
            </li>
          ))}
        </ul>
      </nav>
      {isOpen && (
        <menu className="fixed flex justify-center items-center top-0 left-0 z-40 w-full h-screen bg-black bg-opacity-50 backdrop-blur-md">
          <ul className="flex flex-col justify-center items-center gap-3">
            {links.map((link) => (
              <li key={link.sectionId}>
                <NavlinkScroll sectionId={link.sectionId} label={link.label} />
              </li>
            ))}
          </ul>
        </menu>
      )}
    </header>
  );
}
