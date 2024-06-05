import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = ComponentProps<'input'> & {
  type: 'text' | 'email' | 'tel' | 'password' | 'seach',
  value: string,
}

export function InputText ({
  value,
  type = 'text',
  className = '', 
  ...props
}: Props) {
  const classes = twMerge(`
    inline-block w-full leading-[40px] px-[12px]
    text-[--color-black-1] rounded-[6px]
    border-solid border-[1px] border-[--color-black-1]
    bg-[--color-white-2] overflow-hidden
    outline-none

    disabled:cursor-not-allowed
    disabled:bg-[--color-gray]
    disabled:opacity-50
    ${className};
  `);
  return (
    <input className={classes}
      type={type}
      value={value}
      {...props}
    />
  );
}