export type NavlinkScrollProps = {
  sectionId: string;
  label: string;
};

export default function NavlinkScroll({
  sectionId = '',
  label = 'ScrollLink',
}) {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button onClick={() => scrollToSection(sectionId)} className="text-glow">
      <span className="text-white font-light text-3xl">{label}</span>
    </button>
  );
}
