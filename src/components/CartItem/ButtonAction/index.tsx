import type { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = ComponentProps<'button'> & {
  children: ReactNode,
}
export function ButtonAction ({ children, className = '', ...props }: Props) {
  const classes = twMerge(`
    grid place-items-center
    size-[30px] rounded-[4px] border-transparent border-[2px]
    text-[--color-white] text-[16px]
    bg-[--color-black-3]
    transition-colors duraction-400 ease-linear
    hover:bg-[--color-marine-blue]
    ${className}
  `);
  
  return (
    <button type="button"
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}