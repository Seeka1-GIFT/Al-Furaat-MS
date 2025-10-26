import React, { forwardRef } from 'react'
import { cn } from '../../lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100',
					className
				)}
				ref={ref}
				{...props}
			/>
		)
	}
)
Input.displayName = 'Input'

export { Input }

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, ...props }, ref) => {
		return (
			<textarea
				className={cn(
					'flex min-h-[80px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100',
					className
				)}
				ref={ref}
				{...props}
			/>
		)
	}
)
Textarea.displayName = 'Textarea'

export { Textarea }

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
	({ className, children, ...props }, ref) => {
		return (
			<select
				className={cn(
					'flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100',
					className
				)}
				ref={ref}
				{...props}
			>
				{children}
			</select>
		)
	}
)
Select.displayName = 'Select'

export { Select }

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
	({ className, ...props }, ref) => {
		return (
			<label
				ref={ref}
				className={cn(
					'text-sm font-medium text-gray-900 dark:text-gray-100',
					className
				)}
				{...props}
			/>
		)
	}
)
Label.displayName = 'Label'

export { Label }

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
	size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant = 'default', size = 'default', ...props }, ref) => {
		return (
			<button
				className={cn(
					'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50',
					{
						'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
						'bg-red-600 text-white hover:bg-red-700': variant === 'destructive',
						'border border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800': variant === 'outline',
						'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700': variant === 'secondary',
						'hover:bg-gray-100 dark:hover:bg-gray-800': variant === 'ghost',
						'text-primary underline-offset-4 hover:underline': variant === 'link',
					},
					{
						'h-10 px-4 py-2': size === 'default',
						'h-9 px-3': size === 'sm',
						'h-11 px-8': size === 'lg',
						'h-10 w-10': size === 'icon',
					},
					className
				)}
				ref={ref}
				{...props}
			/>
		)
	}
)
Button.displayName = 'Button'

export { Button }
