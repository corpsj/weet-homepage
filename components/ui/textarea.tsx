import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'flex min-h-24 w-full rounded-lg border border-weet-line bg-weet-surface px-3 py-2 text-sm text-gray-950 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-400 focus-visible:ring-2 focus-visible:ring-weet-gold-deep/30 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',
      className
    )}
    {...props}
  />
));
Textarea.displayName = 'Textarea';

export { Textarea };
