import logo from "../assets/logo.png"

import { Button } from "@workspace/ui/components/button"
import { ThemeToggle } from "./theme-toggle"

export function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center">
          <img
            alt="Auctor logo"
            className="h-auto max-h-8 w-auto object-contain"
            src={logo}
          />
        </div>
        <div className="flex items-center gap-3">
          <Button size="sm">Book a demo</Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
