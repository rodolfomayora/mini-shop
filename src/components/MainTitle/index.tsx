import type { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = ComponentProps<'h1'> & {
  children: ReactNode,
}

export function MainTitle ({ children, className = '', ...props }: Props) {
  const classes = twMerge(`
    text-[36px] text-[--color-black-2]
    mt-0 mb-[40px]
    ${className}
  `);

  return <h1 className={classes} {...props}>{children}</h1>
}