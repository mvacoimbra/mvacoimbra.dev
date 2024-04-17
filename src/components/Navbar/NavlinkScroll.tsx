export type NavlinkScrollProps = {
  sectionId: string;
  label: string;
  extraFunction?: () => void;
};

export default function NavlinkScroll({
  sectionId = '',
  label = 'ScrollLink',
  extraFunction = () => {},
}) {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      onClick={() => {
        scrollToSection(sectionId);
        extraFunction();
      }}
      className="text-glow"
    >
      <span className="text-white font-light">{label}</span>
    </button>
  );
}
