import { useState } from 'react';
import { FaIcon } from '../UI';

import NavMenuMobile from './NavMenuMobile';
import NavMenu from './NavMenu';

export default function Navbar() {
  const [mobileMenuActive, setMobileMenuActive] = useState<boolean>(false);
  return (
    <header className=" shadow-sm">
      <nav className="py-3 px-[100px] max-sm:px-[20px] flex justify-center max-sm:justify-end items-center h-[100px] w-full fixed z-50 backdrop-blur-sm bg-black bg-opacity-5">
        <button
          className="sm:hidden"
          onClick={() => {
            setMobileMenuActive((prev) => !prev);
          }}
        >
          <FaIcon style="solid" name="bars" className="text-4xl text-white" />
        </button>
        <NavMenu />
      </nav>
      <NavMenuMobile
        active={mobileMenuActive}
        setMobileMenuActive={setMobileMenuActive}
      />
    </header>
  );
}
