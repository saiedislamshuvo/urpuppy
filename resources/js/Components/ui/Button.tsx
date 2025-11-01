import { cn } from '@/utils/cn'
import { Link } from '@inertiajs/react'
import {cva} from 'class-variance-authority'
import React from 'react'

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
    href?: string
    variant?: 'primary' | 'secondary' | 'white',
    size?: 'sm' | 'md' | 'lg' | 'full'
    type?: 'button' | 'a'
    disabled?: boolean
    loading?: boolean
}

const Button = ({ type = 'a', className, size = 'md', variant, ...props }: ButtonProps) => {

  return  type == 'button' ? (
    <>
    <button className={cn(buttonVariants({variant, size}), className )} {...props}>{props.children}</button>
            </>
    ):
    (
        <Link href={props.href ?? "#"} as={type} className={cn(buttonVariants({variant, size}), className )}>{props.children}</Link>
  )
}

export default Button

const buttonVariants = cva(
  // Base styles shared by all variants
  "",
  {
    variants: {
      variant: {
        white:
          "btn btn-outline-extralight btn-white text-dark d-none d-md-flex align-items-center gap-2 aos-init aos-animate",
        primary:
          "btn btn-primary ",
        secondary:
          "btn btn-secondary text-white font-redhat hover:opacity-75 focus:bg-gray-700 active:bg-secondary",
      },
       size: {
           sm: "text-[0.7em] px-2 py-1 font-semibold",
           md: "text-[0.8em] px-3 py-2 font-semibold rounded-full",
           lg: "text-[0.9em] px-3 py-2 font-semibold",
           full: "w-100",
       }
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

