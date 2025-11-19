import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
  children: ReactNode;
}

export function Button({
  variant = "default",
  size = "default",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-all disabled:opacity-50 disabled:pointer-events-none outline-none";

  const variantStyles = {
    default: "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95",
    ghost: "hover:bg-gray-100 active:bg-gray-200",
    outline:
      "border border-gray-300 bg-white hover:bg-gray-50 active:bg-gray-100",
  };

  const sizeStyles = {
    default: "h-9 px-4 py-2 text-sm",
    sm: "h-8 px-3 py-1.5 text-sm",
    lg: "h-10 px-6 py-2.5 text-base",
    icon: "h-9 w-9",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
