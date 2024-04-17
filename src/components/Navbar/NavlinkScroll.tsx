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
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
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
