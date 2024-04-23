import { Children, PropsWithChildren } from 'react';

export type SectionProps = PropsWithChildren<{
  id: string;
  sectionClasses?: string;
  containerClasses?: string;
}>;

export default function Section({
  children,
  id,
  sectionClasses,
  containerClasses,
}: SectionProps) {
  const arrayChildren = Children.toArray(children);

  return (
    <section
      id={id}
      className={`${sectionClasses} overflow-hidden w-full relative`}
    >
      {arrayChildren.map((child, index) => {
        if (index === 0) {
          return (
            <div
              className={`${containerClasses ? containerClasses : 'mx-auto px-[100px] py-3 w-full h-full max-w-screen-2xl max-md:px-5'}`}
            >
              {child}
            </div>
          );
        } else {
          return child;
        }
      })}
    </section>
  );
}
