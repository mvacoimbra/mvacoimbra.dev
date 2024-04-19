import { PropsWithChildren } from 'react';

export type SectionProps = PropsWithChildren<{
  id: string;
  className?: string;
}>;

export default function Section({ id, className, children }: SectionProps) {
  return (
    <section
      id={id}
      // className={`${className} py-3 px-[100px] relative max-sm:px-[20px] overflow-hidden`}
      className={`${className ? className : 'py-3 px-[100px] relative max-sm:px-[20px] overflow-hidden'}`}
    >
      {children}
    </section>
  );
}
