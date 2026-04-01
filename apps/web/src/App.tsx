import { Navbar } from "./components/navbar"
import { Hero } from "./components/hero"
import { WhatAuctorDoes } from "./components/what-auctor-does"
import { Testimonial } from "./components/testimonial"
import { Security } from "./components/security"
import { CTA } from "./components/cta"

export function App() {
  return (
    <div className="min-h-svh bg-background">
      <Navbar />
      <main>
        <Hero />
        <WhatAuctorDoes />
        <Testimonial />
        <Security />
        <CTA />
      </main>
      <footer className="border-t border-border py-8 px-6">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-5 items-center justify-center overflow-hidden rounded-[0.35rem] bg-card ring-1 ring-border/80">
              <img
                alt="Auctor favicon"
                className="h-3.5 w-3.5 object-contain"
                src="/favicon.png"
              />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              Auctor
            </span>
          </div>
          <p className="text-xs text-muted-foreground/60">
            &copy; 2026 Auctor. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
