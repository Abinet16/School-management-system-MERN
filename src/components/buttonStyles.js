import React from 'react';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        red: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
        black: 'bg-gray-900 text-white hover:bg-gray-800 focus-visible:ring-gray-500',
        darkRed: 'bg-red-800 text-white hover:bg-red-700 focus-visible:ring-red-500',
        blue: 'bg-blue-900 text-white hover:bg-blue-800 focus-visible:ring-blue-500',
        purple: 'bg-purple-900 text-white hover:bg-purple-800 focus-visible:ring-purple-500',
        lightPurple: 'bg-purple-600 text-white hover:bg-purple-700 focus-visible:ring-purple-500',
        green: 'bg-green-800 text-white hover:bg-green-700 focus-visible:ring-green-500',
        brown: 'bg-amber-900 text-white hover:bg-amber-800 focus-visible:ring-amber-500',
        indigo: 'bg-indigo-800 text-white hover:bg-indigo-700 focus-visible:ring-indigo-500'
      },
      size: {
        sm: 'h-9 px-3 py-2 text-xs',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 px-8 py-4 text-base'
      }
    },
    defaultVariants: {
      variant: 'blue',
      size: 'md'
    }
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? 'span' : 'button';
    return (
      <Comp
        className={twMerge(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

// Specific button components for easier usage
export const RedButton = (props) => (
  <Button variant="red" {...props} />
);

export const BlackButton = (props) => (
  <Button variant="black" {...props} />
);

export const DarkRedButton = (props) => (
  <Button variant="darkRed" {...props} />
);

export const BlueButton = (props) => (
  <Button variant="blue" {...props} />
);

export const PurpleButton = (props) => (
  <Button variant="purple" {...props} />
);

export const LightPurpleButton = (props) => (
  <Button variant="lightPurple" {...props} />
);

export const GreenButton = (props) => (
  <Button variant="green" {...props} />
);

export const BrownButton = (props) => (
  <Button variant="brown" {...props} />
);

export const IndigoButton = (props) => (
  <Button variant="indigo" {...props} />
);

// Optional: Export the base Button component with variants
export { Button };