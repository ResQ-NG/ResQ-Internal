import { cn } from "@/lib/utils";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface AppHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
  /** Visual size / weight – does not change DOM element by default */
  size?: "xl" | "lg" | "md" | "sm";
  weight?: "thin" | "extralight" | "light" | "regular" | "medium" | "semibold" | "bold" | "extrabold" | "black";
  className?: string;
  children: React.ReactNode;
}

const sizeClasses: Record<NonNullable<AppHeadingProps["size"]>, string> = {
  xl: "text-3xl md:text-4xl font-metropolis-semibold text-primaryDark dark:text-primaryDark-dark",
  lg: "text-2xl md:text-3xl font-metropolis-medium text-primaryDark dark:text-primaryDark-dark",
  md: "text-xl md:text-2xl font-metropolis-medium text-primaryDark dark:text-primaryDark-dark",
  sm: "text-lg md:text-xl font-metropolis-medium text-primaryDark dark:text-primaryDark-dark",
};

const weightMap: Record<NonNullable<AppHeadingProps["weight"]>, string> = {
  thin: "font-metropolis-thin",
  extralight: "font-metropolis-extralight",
  light: "font-metropolis-light",
  regular: "font-metropolis-regular",
  medium: "font-metropolis-medium",
  semibold: "font-metropolis-semibold",
  bold: "font-metropolis-bold",
  extrabold: "font-metropolis-extrabold",
  black: "font-metropolis-black",
};

export function AppHeading({
  as,
  size = "lg",
  weight,
  className,
  children,
  ...rest
}: AppHeadingProps) {
  const Component = (as ? `h${as}` : "h2") as keyof JSX.IntrinsicElements;
  const sizeClass = sizeClasses[size];
  const weightClass = weight ? weightMap[weight] : undefined;

  return (
    <Component
      className={cn(sizeClass, weightClass, className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
