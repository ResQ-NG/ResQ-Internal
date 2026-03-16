import { cn } from "@/lib/utils";

export interface AppParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Body (default) or caption/muted */
  variant?: "body" | "caption";
  size?: "sm" | "md" | "lg";
  weight?: "light" | "regular" | "medium";
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<NonNullable<AppParagraphProps["variant"]>, string> =
  {
    body:
      "text-primaryDark dark:text-primaryDark-dark font-metropolis-regular",
    caption:
      "text-captionDark dark:text-captionDark-dark font-metropolis-light",
  };

const sizeClasses: Record<NonNullable<AppParagraphProps["size"]>, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const weightMap: Record<NonNullable<AppParagraphProps["weight"]>, string> = {
  light: "font-metropolis-light",
  regular: "font-metropolis-regular",
  medium: "font-metropolis-medium",
};

export function AppParagraph({
  variant = "body",
  size = "md",
  weight,
  className,
  children,
  ...rest
}: AppParagraphProps) {
  return (
    <p
      className={cn(
        variantClasses[variant],
        sizeClasses[size],
        weight && weightMap[weight],
        className
      )}
      {...rest}
    >
      {children}
    </p>
  );
}
