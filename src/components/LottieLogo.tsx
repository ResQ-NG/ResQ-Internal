"use client";

import { useEffect, useState } from "react";
import { AppLottie } from "@/components/ui";
import type { LottieAnimationData } from "@/components/ui";
import { cn } from "@/lib/utils";

interface LottieLogoProps {
  /** Size: default 48 (w-48 h-48), use "sm" for sidebar (w-10 h-10) */
  size?: "sm" | "md";
  className?: string;
}

const sizeClasses = {
  sm: "w-10 h-10",
  md: "w-48 h-48",
} as const;

export function LottieLogo({ size = "md", className }: LottieLogoProps) {
  const [data, setData] = useState<LottieAnimationData | null>(null);

  useEffect(() => {
    fetch("/lottie/logo.json")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return null;

  return (
    <AppLottie
      animationData={data}
      loop={false}
      autoplay={true}
      wrapperClassName={cn(sizeClasses[size], className)}
      className="object-contain"
    />
  );
}
