import { PropsWithChildren } from 'react';

export type NavlinkScrollProps = PropsWithChildren<{
  sectionId: string;
  label?: string;
  extraFunction?: () => void;
  className?: string;
}>;

export default function NavlinkScroll({
  sectionId = '',
  label,
  extraFunction = () => {},
  children = null,
  className,
}: NavlinkScrollProps) {
  // Function to scroll to a section by its id
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const rect = element.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const offsetPosition = rect.top + scrollTop - 100; // Subtract 100 for the offset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <button
      onClick={() => {
        scrollToSection(sectionId);
        extraFunction();
      }}
      className={`${className ? className : 'text-glow'}`}
    >
      {label && <span className="text-white font-light">{label}</span>}
      {children}
    </button>
  );
}
