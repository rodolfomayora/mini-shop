import type { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from '#components/Button';

type Props = ComponentProps<typeof Button> & {
  children: ReactNode,
}

export function ButtonOutlined ({ children, className = '', ...props }: Props) {
  const classes = twMerge(`
    text-[var(--color-dark-blue-3)] font-bold
    border-[var(--color-dark-blue-3)]
    bg-transparent
    transition-colors
    hover:text-[var(--color-white)]
    hover:bg-[var(--color-black-3)]
    hover:border-[var(--color-black-3)]
    disabled:bg-[var(--color-gray)]
    ${className}
  `);

  return (
    <Button className={classes} {...props}>
      {children}
    </Button>
  );
}