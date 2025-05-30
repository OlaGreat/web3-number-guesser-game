import React from 'react'
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, type, ...props }, ref) => {
      return (
        <input
        type={type}
          className={"flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"}
          ref={ref}
          {...props}
        />
      )
    }
  )
  Input.displayName = "Input"
  
  export { Input }  