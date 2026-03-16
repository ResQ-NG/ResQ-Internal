"use client";

import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

export interface AppImageProps extends Omit<ImageProps, "className"> {
  /** Optional wrapper class (e.g. for aspect ratio or max size) */
  wrapperClassName?: string;
  className?: string;
}

export function AppImage({
  wrapperClassName,
  className,
  alt,
  ...rest
}: AppImageProps) {
  return (
    <span className={cn("relative block overflow-hidden", wrapperClassName)}>
      <Image
        alt={alt}
        className={cn("object-cover", className)}
        {...rest}
      />
    </span>
  );
}
