import type { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = ComponentProps<'button'> & {
  children: ReactNode,
}

export function Button ({ children, className = '', ...props }: Props) {
  const classes = twMerge(`
    grid place-content-center h-[40px] px-[20px]
    border-solid border-[2px] border-transparent rounded-[4px]
    font-[--font-montserrat] text-[16px] text-[--color-white]
    bg-[--color-black-3] cursor-pointer
    transition-colors duration-400 ease-linear
    hover:bg-[--color-marine-blue]
    disabled:border-[--color-gray]
    disabled:bg-[--color-gray]
    disabled:cursord-not-allowed disabled:opacity-50
    ${className}
  `);
  
  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  );
}