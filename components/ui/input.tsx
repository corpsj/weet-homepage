import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'flex h-10 w-full rounded-lg border border-weet-line bg-weet-surface px-3 py-2 text-sm text-gray-950 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-400 focus-visible:ring-2 focus-visible:ring-weet-gold-deep/30 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',
      className
    )}
    {...props}
  />
));
Input.displayName = 'Input';

export { Input };
