import links from './links';
import NavlinkScroll from './NavlinkScroll';

export type NavMenuMobileProps = {
  active: boolean;
  setMobileMenuActive: (value: boolean) => void;
};

export default function NavMenuMobile({
  active = false,
  setMobileMenuActive,
}: NavMenuMobileProps) {
  if (!active) return null;
  return (
    <menu className="fixed flex justify-center items-center top-0 left-0 z-40 w-full h-screen bg-black bg-opacity-50 backdrop-blur-md">
      <ul className="flex flex-col justify-center items-center gap-3 text-3xl">
        {links.map((link) => (
          <li key={link.sectionId}>
            <NavlinkScroll
              sectionId={link.sectionId}
              label={link.label}
              extraFunction={() => {
                setTimeout(() => {
                  setMobileMenuActive(false);
                }, 350);
              }}
            />
          </li>
        ))}
      </ul>
    </menu>
  );
}
