"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-full w-full grow overflow-hidden bg-white ">
      <SliderPrimitive.Range className="absolute h-full bg-blue-600 dark:bg-black" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className="block 
    size-2.5 rounded-full border-2 border-transparent 
    bg-neutral-300 ring-offset-neutral-300 transition-colors 
    focus-visible:outline-none focus-visible:ring-2 
    focus-visible:ring-neutral-300 focus-visible:ring-offset-2 
    disabled:pointer-events-none disabled:opacity-50 
    dark:border-neutral-50 dark:bg-neutral-950 
    dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300"
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
