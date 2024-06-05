import type { ReactNode } from 'react';

export function Container ({ children }: { children: ReactNode }) {
  return (
    <div className="
      box-content mx-auto px-[24px] max-w-[1240px]
      md:px-[48px]
    ">
      {children}
    </div>
  );
}