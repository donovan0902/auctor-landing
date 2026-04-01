import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

import { Switch } from "@workspace/ui/components/switch"

import { useTheme } from "./theme-provider"

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("light")

  useEffect(() => {
    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY)

    const syncTheme = () => {
      if (theme === "system") {
        setResolvedTheme(mediaQuery.matches ? "dark" : "light")
        return
      }

      setResolvedTheme(theme)
    }

    syncTheme()
    mediaQuery.addEventListener("change", syncTheme)

    return () => {
      mediaQuery.removeEventListener("change", syncTheme)
    }
  }, [theme])

  const isDark = resolvedTheme === "dark"

  return (
    <label className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-border/80 bg-card px-2 shadow-[0_10px_24px_-18px_rgba(42,34,24,0.18)] transition-colors hover:bg-muted/55">
      <span className="text-muted-foreground/80">
        <Sun className="size-3" strokeWidth={1.9} />
      </span>
      <Switch
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        checked={isDark}
        className="data-checked:bg-foreground data-unchecked:bg-muted"
        onCheckedChange={(checked) => {
          setTheme(checked ? "dark" : "light")
        }}
      />
      <span className="text-muted-foreground/80">
        <Moon className="size-3" strokeWidth={1.9} />
      </span>
    </label>
  )
}
