import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const baseClasses =
  'cursor-pointer inline-flex items-center justify-center gap-2 rounded-full';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc]',

  secondary:
    'bg-black! text-foreground hover:bg-black dark:bg-white dark:hover:bg-white',
};

export default function Button({
  variant = 'primary',
  children,
  className = '',
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = [baseClasses, variantClasses[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}