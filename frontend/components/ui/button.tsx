import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "solid" | "text"; // Define your variants here
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "solid", className, children, ...props }, ref) => {
    // Determine the class for the button based on the variant
    const variantClass =
      variant === "outline"
        ? "border-2 border-gray-500 text-gray-500 bg-transparent"
        : variant === "text"
        ? "text-green-600 bg-transparent"
        : "bg-green-600 text-white"; // Default to solid variant

    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 ${variantClass} ${className || ""}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }
