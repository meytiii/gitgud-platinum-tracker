"use client";
import ScrollBaseAnimation from "@/components/ui/scroll-text-marquee";
import React from "react";

export default function Default() {
  return (
    <div className="h-[500px] w-full grid place-content-center bg-background text-foreground">
      <ScrollBaseAnimation
        delay={500}
        baseVelocity={-3}
        clasname="font-bold tracking-[-0.07em] leading-[90%]"
      >
        Star the repo if you like it
      </ScrollBaseAnimation>
      <ScrollBaseAnimation
        delay={500}
        baseVelocity={3}
        clasname="font-bold tracking-[-0.07em] leading-[90%]"
      >
        Share it if you like it
      </ScrollBaseAnimation>
    </div>
  );
}
