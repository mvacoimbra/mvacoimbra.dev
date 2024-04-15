export type FaIconProps = {
  style: 'solid' | 'regular' | 'brands';
  name: string;
  className?: string;
};

export default function FaIcon({ style, name, className }: FaIconProps) {
  return <i className={`fa-${style} fa-${name} ${className}`} />;
}
