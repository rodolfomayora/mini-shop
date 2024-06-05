import type { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from '#components/Button';

type Props = ComponentProps<typeof Button> & {
  children: ReactNode,
}

export function ButtonOutlined ({ children, className = '', ...props }: Props) {
  const classes = twMerge(`
    text-[--color-dark-blue-3] font-bold
    border-[--color-dark-blue-3]
    bg-transparent
    transition-colors
    hover:text-[--color-white]
    hover:bg-[--color-black-3]
    hover:border-[--color-black-3]
    disabled:bg-[--color-gray]
    ${className}
  `);

  return (
    <Button className={classes} {...props}>
      {children}
    </Button>
  );
}