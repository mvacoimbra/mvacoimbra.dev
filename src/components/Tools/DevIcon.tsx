export type DevIconProps = {
  icon: string;
  iconSize?:
    | 'text-xs'
    | 'text-sm'
    | 'text-base'
    | 'text-lg'
    | 'text-xl'
    | 'text-2xl'
    | 'text-3xl'
    | 'text-4xl'
    | 'text-5xl'
    | 'text-6xl'
    | 'text-7xl'
    | 'text-8xl'
    | 'text-9xl';
  size: number;
  label?: string;
  iconColor?: 'white' | 'black';
  bgColor?: string;
};

export default function DevIcon({
  icon = 'javascript-plain',
  iconSize = 'text-5xl',
  size = 80,
  label,
  iconColor = 'white',
  bgColor = 'bg-gray-500',
}: DevIconProps) {
  const textColor = iconColor === 'white' ? 'text-white' : 'text-black';

  if (size > 0) {
    return (
      <figure className="flex flex-col items-center w-fit gap-1">
        <div
          style={{ width: size, height: size }}
          className={`rounded-lg overflow-hidden relative flex justify-center items-center`}
        >
          <i className={`devicon-${icon} ${iconSize} ${textColor} z-20`}></i>
          <div
            className={`${bgColor} w-full h-full absolute top-0 left-0 -z-10`}
          />
        </div>
        {label && <span className="text-black text-xs">{label}</span>}
      </figure>
    );
  } else {
    return <h1>error</h1>;
  }
}
