"use client";

import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

/** Lottie animation JSON (from LottieFiles, After Effects, etc.) */
export type LottieAnimationData = object;

export interface AppLottieProps {
  /** JSON animation data (import or from fetch) */
  animationData: LottieAnimationData;
  /** Loop the animation */
  loop?: boolean;
  /** Autoplay on mount */
  autoplay?: boolean;
  /** Optional wrapper class (e.g. for max size or aspect ratio) */
  wrapperClassName?: string;
  /** Class applied to the Lottie container */
  className?: string;
  /** Callback when animation is loaded */
  onLoaded?: () => void;
  /** Ref to control play/stop/goToAndPlay etc. */
  lottieRef?: React.RefObject<LottieRefCurrentProps | null>;
}

export function AppLottie({
  animationData,
  loop = true,
  autoplay = true,
  wrapperClassName,
  className,
  onLoaded,
  lottieRef: externalRef,
}: AppLottieProps) {
  const internalRef = useRef<LottieRefCurrentProps>(null);
  const ref = externalRef ?? internalRef;

  useEffect(() => {
    if (!autoplay || !ref?.current) return;
    ref.current.play?.();
  }, [autoplay, ref]);

  return (
    <span className={cn("relative block overflow-hidden", wrapperClassName)}>
      <Lottie
        lottieRef={ref}
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        onDOMLoaded={onLoaded}
        className={cn("size-full", className)}
        rendererSettings={{
          preserveAspectRatio: "xMidYMid meet",
        }}
      />
    </span>
  );
}
