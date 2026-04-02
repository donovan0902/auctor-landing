import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  BookOpenText,
  Braces,
  ClipboardList,
  FileText,
  ListChecks,
  Mail,
  MessagesSquare,
  Phone,
  ScrollText,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

interface SourceItem {
  icon: LucideIcon
  label: string
  detail: string
  targets?: number[]
}

interface SourceChipPosition {
  x: number
  y: number
  angle: number
  width: number
}

interface LiveSourceSlot extends SourceChipPosition {
  entries: SourceItem[]
}

interface ActiveLiveNotification {
  slotIndex: number
  entryIndex: number
  key: string
}

interface OutputItem {
  icon: LucideIcon
  label: string
  lines: string[]
}

interface Point {
  x: number
  y: number
}

const DESKTOP_LAYOUT_QUERY = "(min-width: 1024px)"

const persistentSources: Array<SourceItem & SourceChipPosition> = [
  {
    icon: BookOpenText,
    label: "Tribal Knowledge Wiki",
    detail: "Delivery playbooks + workarounds",
    x: 120,
    y: 252,
    angle: 198,
    width: 212,
  },
  {
    icon: ScrollText,
    label: "Security Policy v3",
    detail: "Required controls",
    x: 248,
    y: 592,
    angle: 132,
    width: 204,
  },
  {
    icon: Braces,
    label: "Engineering Conventions",
    detail: "Architecture and implementation patterns",
    x: 972,
    y: 64,
    angle: -58,
    width: 224,
  },
  {
    icon: FileText,
    label: "Legacy Architecture Notes",
    detail: "Baseline topology and constraints",
    x: 1040,
    y: 560,
    angle: 34,
    width: 220,
  },
]

const liveSourceSlots: LiveSourceSlot[] = [
  {
    x: 162,
    y: 116,
    angle: 218,
    width: 214,
    entries: [
      {
        icon: Phone,
        label: "Jane call: scope assumptions",
        detail: "Discovery goals clarified",
        targets: [0, 1],
      },
      {
        icon: Phone,
        label: "Workshop: process gaps",
        detail: "Process gaps surfaced",
        targets: [1, 2],
      },
      {
        icon: MessagesSquare,
        label: "Slack: milestone owners",
        detail: "Milestone owners clarified",
        targets: [0, 3],
      },
      {
        icon: Mail,
        label: "Procurement: SOW redlines",
        detail: "Commercial language revised",
        targets: [0, 1],
      },
    ],
  },
  {
    x: 118,
    y: 392,
    angle: 172,
    width: 220,
    entries: [
      {
        icon: MessagesSquare,
        label: "CS notes: handoff path",
        detail: "Escalation path captured",
        targets: [1, 2],
      },
      {
        icon: Mail,
        label: "Support: edge-case email",
        detail: "Edge cases surfaced",
        targets: [1, 3],
      },
      {
        icon: Phone,
        label: "Standup: cutover dependency",
        detail: "Cutover dependency added",
        targets: [0, 3],
      },
      {
        icon: Mail,
        label: "Customer thread: scope exception",
        detail: "Scope exception requested",
        targets: [0, 1],
      },
    ],
  },
  {
    x: 334,
    y: 670,
    angle: 114,
    width: 214,
    entries: [
      {
        icon: FileText,
        label: "Security questionnaire: controls",
        detail: "Control mapping updated",
        targets: [1, 3],
      },
      {
        icon: FileText,
        label: "Data residency review",
        detail: "Hosting constraint added",
        targets: [1, 3],
      },
      {
        icon: Phone,
        label: "Infra follow-up: env assumptions",
        detail: "Env assumptions updated",
        targets: [1, 3],
      },
      {
        icon: FileText,
        label: "Legal redlines: acceptance terms",
        detail: "Acceptance terms changed",
        targets: [0, 1],
      },
    ],
  },
  {
    x: 1038,
    y: 188,
    angle: -8,
    width: 214,
    entries: [
      {
        icon: MessagesSquare,
        label: "Slack: API contract clarifications",
        detail: "Contract clarified",
        targets: [1, 2],
      },
      {
        icon: Phone,
        label: "SRE meeting: resiliency concerns",
        detail: "Resiliency concerns raised",
        targets: [1, 3],
      },
      {
        icon: FileText,
        label: "Architecture review: integration path",
        detail: "Integration path changed",
        targets: [1, 2],
      },
      {
        icon: Phone,
        label: "Design partner: user journey",
        detail: "User journey refined",
        targets: [2],
      },
    ],
  },
  {
    x: 1070,
    y: 384,
    angle: 6,
    width: 214,
    entries: [
      {
        icon: MessagesSquare,
        label: "Rollout slack: training step",
        detail: "Training step added",
        targets: [2, 3],
      },
      {
        icon: Mail,
        label: "Security email: logging requirement",
        detail: "Logging requirement added",
        targets: [1, 3],
      },
      {
        icon: Mail,
        label: "UAT feedback: coverage gaps",
        detail: "Coverage updated",
        targets: [2, 3],
      },
      {
        icon: Phone,
        label: "Standup: blocker removed",
        detail: "Blocked dependency removed",
        targets: [0, 2],
      },
    ],
  },
  {
    x: 858,
    y: 670,
    angle: 64,
    width: 214,
    entries: [
      {
        icon: Phone,
        label: "Infra office hours: capacity limits",
        detail: "Capacity limits captured",
        targets: [1, 3],
      },
      {
        icon: Mail,
        label: "Finance email: procurement dates",
        detail: "Procurement dates shifted",
        targets: [0],
      },
      {
        icon: MessagesSquare,
        label: "Support handoff: ownership update",
        detail: "Ownership updated",
        targets: [2, 3],
      },
      {
        icon: FileText,
        label: "Incident timeline: mitigation steps",
        detail: "Mitigation steps recorded",
        targets: [3],
      },
    ],
  },
]

const outputs: OutputItem[] = [
  {
    icon: ClipboardList,
    label: "SOW",
    lines: ["Scope framing", "Phases + milestones", "Change controls"],
  },
  {
    icon: ScrollText,
    label: "Requirements",
    lines: [
      "Structured requirements",
      "Decision traceability",
      "Open risks + gaps",
    ],
  },
  {
    icon: FileText,
    label: "User Stories",
    lines: ["Persona + workflow", "Acceptance criteria", "Priority + owner"],
  },
  {
    icon: ListChecks,
    label: "Test Scripts",
    lines: [
      "Validation scenarios",
      "Coverage by requirement",
      "Go-live checks",
    ],
  },
]

function pointOnCircle(
  cx: number,
  cy: number,
  radius: number,
  angleDeg: number
) {
  const angle = (angleDeg * Math.PI) / 180
  return {
    x: cx + Math.cos(angle) * radius,
    y: cy + Math.sin(angle) * radius,
  }
}

function useIsDesktopLayout() {
  const getMatches = () =>
    typeof window !== "undefined"
      ? window.matchMedia(DESKTOP_LAYOUT_QUERY).matches
      : true

  const [isDesktop, setIsDesktop] = useState(getMatches)

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined
    }

    const mediaQuery = window.matchMedia(DESKTOP_LAYOUT_QUERY)
    const syncLayout = () => {
      setIsDesktop(mediaQuery.matches)
    }

    syncLayout()
    mediaQuery.addEventListener("change", syncLayout)

    return () => {
      mediaQuery.removeEventListener("change", syncLayout)
    }
  }, [])

  return isDesktop
}

function SourceChip({
  item,
  index,
  live,
}: {
  item: SourceItem
  index: number
  live?: boolean
}) {
  const Icon = item.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="h-full"
    >
      <Card
        className={`h-full rounded-[0.95rem] border bg-background shadow-[0_14px_30px_-24px_rgba(15,23,42,0.34)] ring-0 ${
          live ? "border-amber-700/28" : "border-border"
        }`}
      >
        <div className="flex h-full items-center px-3.5 py-2">
          <div className="flex w-full min-w-0 items-center gap-2.5">
            <div
              className={`flex size-8 shrink-0 items-center justify-center rounded-[0.8rem] border ${
                live
                  ? "border-amber-700/18 bg-amber-700/8 text-amber-900"
                  : "border-border/80 bg-muted/45 text-muted-foreground"
              }`}
            >
              <Icon className="size-4" />
            </div>
            <div className="min-w-0 self-center">
              <CardTitle
                className="text-[11px] leading-[1.15] font-semibold tracking-[-0.01em] text-balance"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {item.label}
              </CardTitle>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function LiveSourceChip({
  slot,
  item,
  index,
}: {
  slot: LiveSourceSlot
  item: SourceItem
  index: number
}) {
  return (
    <foreignObject
      x={slot.x - slot.width / 2}
      y={slot.y - 28}
      width={slot.width}
      height={56}
    >
      <div className="h-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${item.label}-${item.detail}`}
            initial={{ opacity: 0, y: 10, scale: 0.985, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, scale: 0.985, filter: "blur(6px)" }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            className="h-full"
          >
            <SourceChip item={item} index={index} live />
          </motion.div>
        </AnimatePresence>
      </div>
    </foreignObject>
  )
}

function OutputGallery({
  items,
  docTicks,
  syncingDocs,
  x,
  y,
}: {
  items: OutputItem[]
  docTicks: number[]
  syncingDocs: boolean[]
  x: number
  y: number
}) {
  return (
    <foreignObject x={x - 236} y={y - 198} width={472} height={396}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="grid w-[420px] grid-cols-2 gap-4">
          {items.map((item, index) => {
            const Icon = item.icon
            const tick = docTicks[index] ?? 0
            const isSyncing = syncingDocs[index] ?? false
            const highlightedLineIndex = tick % item.lines.length
            const syncPulseDuration = 1.6

            return (
              <motion.div
                key={item.label}
                className="pointer-events-auto"
                animate={{ y: [0, index % 2 === 0 ? -1.5 : 1.5, 0] }}
                transition={{
                  duration: 5.6 + index * 0.4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Card className="flex h-[168px] rounded-[0.8rem] border border-border/85 bg-muted/55 shadow-[0_18px_34px_-28px_rgba(15,23,42,0.24)]">
                  <div className="flex h-full min-h-0 flex-col">
                    <CardHeader className="px-2.5 pt-1 pb-1">
                      <div className="flex items-start gap-2.5">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-[0.8rem] border border-stone-600/18 bg-stone-600/8 text-stone-700">
                            <Icon className="size-3.5" />
                          </div>
                          <div className="flex min-w-0 items-center gap-2">
                            <CardTitle className="text-[14px] leading-none font-semibold">
                              {item.label}
                            </CardTitle>
                            <motion.div
                              key={`${item.label}-${tick}-${isSyncing ? "sync" : "idle"}`}
                              initial={false}
                              animate={{
                                backgroundColor: isSyncing
                                  ? "oklch(0.56 0.045 58 / 0.92)"
                                  : "oklch(0.56 0.045 58 / 0.36)",
                                width: isSyncing ? 8 : 6,
                                height: isSyncing ? 8 : 6,
                              }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="mt-0.5 shrink-0 rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex min-h-0 flex-1 px-2.5 pb-2">
                      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1">
                        {item.lines.map((line, lineIndex) =>
                          (() => {
                            const isHighlighted =
                              lineIndex === highlightedLineIndex
                            const shouldPulse = isHighlighted && isSyncing
                            const highlightAnimation = shouldPulse
                              ? {
                                  backgroundColor: [
                                    "oklch(1 0 0 / 0)",
                                    "oklch(0.72 0.024 72 / 0.16)",
                                    "oklch(1 0 0 / 0)",
                                    "oklch(0.72 0.024 72 / 0.16)",
                                    "oklch(1 0 0 / 0)",
                                  ],
                                }
                              : {
                                  backgroundColor: "oklch(1 0 0 / 0)",
                                }

                            const highlightBarAnimation = shouldPulse
                              ? { opacity: [0.72, 1, 0.72, 1, 0.72] }
                              : { opacity: 0.8 }

                            return (
                              <motion.div
                                key={`${line}-${shouldPulse ? tick : "rest"}`}
                                className="rounded-md px-1.5 py-0.5"
                                animate={highlightAnimation}
                                transition={{
                                  duration: shouldPulse
                                    ? syncPulseDuration
                                    : 0.2,
                                  ease: "easeInOut",
                                }}
                              >
                                <div className="text-[11px] font-medium text-foreground/90">
                                  {line}
                                </div>
                                <motion.div
                                  className="mt-1.5 h-1.5 rounded-full bg-border/80"
                                  animate={highlightBarAnimation}
                                  transition={{
                                    duration: shouldPulse
                                      ? syncPulseDuration
                                      : 0.2,
                                    ease: "easeInOut",
                                  }}
                                />
                              </motion.div>
                            )
                          })()
                        )}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </foreignObject>
  )
}

function MobileSourceCard({
  item,
  live,
}: {
  item: SourceItem
  live?: boolean
}) {
  const Icon = item.icon

  return (
    <Card
      className={`rounded-[1rem] border bg-background/95 shadow-[0_16px_32px_-24px_rgba(15,23,42,0.28)] ${
        live ? "border-amber-700/24" : "border-border/85"
      }`}
    >
      <CardContent className="flex items-start gap-3 px-3.5 py-3">
        <div
          className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-[0.8rem] border ${
            live
              ? "border-amber-700/18 bg-amber-700/8 text-amber-900"
              : "border-border/80 bg-muted/45 text-muted-foreground"
          }`}
        >
          <Icon className="size-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[12px] leading-[1.3] font-semibold text-foreground">
            {item.label}
          </div>
          <div className="mt-1 text-[11px] leading-[1.45] text-muted-foreground">
            {item.detail}
          </div>
        </div>
        {live ? (
          <div className="rounded-full border border-amber-700/20 bg-amber-700/8 px-2 py-1 text-[10px] font-medium tracking-[0.12em] text-amber-900/80 uppercase">
            Live
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

function MobileOutputCard({
  item,
  tick,
  isSyncing,
}: {
  item: OutputItem
  tick: number
  isSyncing: boolean
}) {
  const Icon = item.icon
  const highlightedLineIndex = tick % item.lines.length

  return (
    <Card className="h-full rounded-[1rem] border border-border/85 bg-muted/55 shadow-[0_16px_32px_-26px_rgba(15,23,42,0.24)]">
    <CardHeader className="px-3 pt-2.5 pb-1">
        <div className="flex items-center gap-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-[0.8rem] border border-stone-600/18 bg-stone-600/8 text-stone-700">
            <Icon className="size-3.5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <CardTitle className="truncate text-[12px] leading-none font-semibold">
                {item.label}
              </CardTitle>
              <motion.div
                animate={{
                  backgroundColor: isSyncing
                    ? "oklch(0.56 0.045 58 / 0.92)"
                    : "oklch(0.56 0.045 58 / 0.34)",
                  scale: isSyncing ? [1, 1.15, 1] : 1,
                }}
                transition={{
                  duration: isSyncing ? 1.1 : 0.2,
                  repeat: isSyncing ? Number.POSITIVE_INFINITY : 0,
                  ease: "easeInOut",
                }}
                className="size-1.5 shrink-0 rounded-full"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-3 pb-2.5">
        <div className="space-y-1.5">
          {item.lines.map((line, lineIndex) => {
            const isHighlighted = lineIndex === highlightedLineIndex

            return (
              <motion.div
                key={`${item.label}-${line}`}
                className="rounded-md px-1.5 py-1"
                animate={{
                  backgroundColor:
                    isHighlighted && isSyncing
                      ? [
                          "oklch(1 0 0 / 0)",
                          "oklch(0.72 0.024 72 / 0.16)",
                          "oklch(1 0 0 / 0)",
                        ]
                      : "oklch(1 0 0 / 0)",
                }}
                transition={{
                  duration: isHighlighted && isSyncing ? 1.5 : 0.2,
                  repeat:
                    isHighlighted && isSyncing ? Number.POSITIVE_INFINITY : 0,
                  ease: "easeInOut",
                }}
              >
                <div className="text-[10px] leading-[1.35] font-medium text-foreground/90">
                  {line}
                </div>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

function MobileContextScene({
  activeLiveNotifications,
  docTicks,
  syncingDocs,
}: {
  activeLiveNotifications: ActiveLiveNotification[]
  docTicks: number[]
  syncingDocs: boolean[]
}) {
  const liveItems = activeLiveNotifications.map((notification) => {
    const slot = liveSourceSlots[notification.slotIndex]
    return slot.entries[notification.entryIndex]
  })

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-x-8 top-16 h-28 rounded-full bg-[radial-gradient(circle,oklch(0.78_0.02_72_/_0.32),transparent_72%)] blur-3xl" />

      <div className="relative grid gap-5">
        <div className="grid gap-3">
          <div className="flex items-center justify-between gap-3">
            <div className="text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
              Project context
            </div>
            <div className="rounded-full border border-amber-700/20 bg-amber-700/8 px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] text-amber-900/80 uppercase">
              Syncing now
            </div>
          </div>
          {liveItems.map((item) => (
            <MobileSourceCard
              key={`${item.label}-${item.detail}`}
              item={item}
              live
            />
          ))}
        </div>

        <div className="grid gap-2">
          <div className="text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Saved inputs
          </div>
          <div className="grid grid-cols-2 gap-2">
            {persistentSources.slice(0, 4).map((item, index) => (
              <SourceChip key={item.label} item={item} index={index} />
            ))}
          </div>
        </div>

        <div className="relative py-2">
          <div className="absolute top-0 left-1/2 h-7 w-px -translate-x-1/2 bg-gradient-to-b from-border/0 via-border to-border/0" />
          <motion.div
            className="relative mx-auto flex size-[5.5rem] items-center justify-center rounded-full border border-stone-700/18 bg-background/95 shadow-[0_20px_44px_-28px_rgba(42,34,24,0.28)]"
            animate={{ y: [0, -2, 0] }}
            transition={{
              duration: 4.8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="absolute inset-[-14px] rounded-full border border-stone-500/12"
              animate={{ scale: [0.98, 1.05, 0.98], opacity: [0.65, 1, 0.65] }}
              transition={{
                duration: 4.8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <img
              alt="Auctor favicon"
              className="h-auto max-h-[38px] w-auto object-contain"
              src="/favicon.png"
            />
          </motion.div>
          <div className="mx-auto mt-4 inline-flex items-center justify-center rounded-full border border-stone-700/12 bg-background/86 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-foreground uppercase">
            Project blueprint
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {outputs.map((item, index) => (
            <MobileOutputCard
              key={item.label}
              isSyncing={syncingDocs[index] ?? false}
              item={item}
              tick={docTicks[index] ?? 0}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function DesktopContextScene({
  activeLiveNotifications,
  cx,
  cy,
  docTicks,
  liveTargets,
  persistentTargets,
  ringRadius,
  syncingDocs,
}: {
  activeLiveNotifications: ActiveLiveNotification[]
  cx: number
  cy: number
  docTicks: number[]
  liveTargets: Point[]
  persistentTargets: Point[]
  ringRadius: number
  syncingDocs: boolean[]
}) {
  return (
    <svg viewBox="0 0 1200 760" className="h-auto w-full" fill="none">
      <defs>
        <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.82 0.014 72)" stopOpacity={0} />
          <stop
            offset="66%"
            stopColor="oklch(0.8 0.018 70)"
            stopOpacity={0.12}
          />
          <stop offset="100%" stopColor="oklch(0.8 0.018 70)" stopOpacity={0} />
        </radialGradient>
        <linearGradient id="ringStroke" x1="15%" y1="10%" x2="85%" y2="90%">
          <stop offset="0%" stopColor="oklch(0.78 0.018 74)" />
          <stop offset="52%" stopColor="oklch(0.66 0.022 60)" />
          <stop offset="100%" stopColor="oklch(0.52 0.03 42)" />
        </linearGradient>
        <linearGradient id="sourceFlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop
            offset="0%"
            stopColor="oklch(0.76 0.015 72)"
            stopOpacity={0.2}
          />
          <stop
            offset="100%"
            stopColor="oklch(0.6 0.028 50)"
            stopOpacity={0.62}
          />
        </linearGradient>
      </defs>

      <motion.circle
        cx={cx}
        cy={cy}
        r={ringRadius + 66}
        fill="url(#ringGlow)"
        animate={{ scale: [0.99, 1.03, 0.99], opacity: [0.7, 1, 0.7] }}
        transition={{
          duration: 5.2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />

      <foreignObject x={46} y={700} width={220} height={40}>
        <div className="flex h-full items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-700/12 bg-background/90 px-3 py-1.5 shadow-[0_14px_28px_-24px_rgba(15,23,42,0.24)] backdrop-blur-sm">
            <div className="size-1.5 rounded-full bg-stone-700/65" />
            <span className="text-[10px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
              Project Context
            </span>
          </div>
        </div>
      </foreignObject>

      {persistentSources.map((source, index) => {
        const target = persistentTargets[index]
        const x1 = source.x
        const y1 = source.y
        const x2 = target.x
        const y2 = target.y

        return (
          <g key={source.label}>
            <motion.line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#sourceFlow)"
              strokeWidth={1.5}
              strokeDasharray="4 6"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{ duration: 0.7, delay: index * 0.06 }}
            />
          </g>
        )
      })}

      <AnimatePresence initial={false}>
        {activeLiveNotifications.map((notification, index) => {
          const slot = liveSourceSlots[notification.slotIndex]
          const target = liveTargets[notification.slotIndex]
          const x1 = slot.x
          const y1 = slot.y
          const x2 = target.x
          const y2 = target.y
          const dx = x2 - x1
          const dy = y2 - y1

          return (
            <motion.g
              key={notification.key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <motion.line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#sourceFlow)"
                strokeWidth={1.5}
                strokeDasharray="4 6"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.65, ease: "easeInOut" }}
              />
              <motion.circle
                cx={x1 + dx * 0.5}
                cy={y1 + dy * 0.5}
                r={4}
                fill="oklch(0.58 0.034 52)"
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{
                  opacity: [0, 0.45, 0.9, 0.45, 0],
                  scale: [0.75, 1, 1.08, 1, 0.75],
                  cx: [
                    x1 + dx * 0.14,
                    x1 + dx * 0.34,
                    x1 + dx * 0.55,
                    x1 + dx * 0.76,
                    x1 + dx * 0.9,
                  ],
                  cy: [
                    y1 + dy * 0.14,
                    y1 + dy * 0.34,
                    y1 + dy * 0.55,
                    y1 + dy * 0.76,
                    y1 + dy * 0.9,
                  ],
                }}
                exit={{ opacity: 0, scale: 0.75 }}
                transition={{
                  duration: 3.9,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  delay: index * 0.42,
                }}
              />
            </motion.g>
          )
        })}
      </AnimatePresence>

      <circle
        cx={cx}
        cy={cy}
        r={ringRadius}
        fill="none"
        stroke="url(#ringStroke)"
        strokeWidth={10}
        opacity={0.9}
        style={{
          filter: "drop-shadow(0 22px 44px rgba(72, 58, 39, 0.12))",
        }}
      />
      <foreignObject x={cx - 170} y={cy - ringRadius + 34} width={340} height={54}>
        <div className="flex h-full items-center justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-700/14 bg-card/96 px-4 py-2 shadow-[0_16px_34px_-24px_rgba(42,34,24,0.22)] backdrop-blur-sm">
            <div className="flex size-7 items-center justify-center rounded-full border border-stone-700/12 bg-background/80">
              <img
                alt="Auctor favicon"
                className="h-auto max-h-[15px] w-auto object-contain"
                src="/favicon.png"
              />
            </div>
            <span className="text-[10px] font-semibold tracking-[0.16em] text-foreground uppercase">
              Project blueprint
            </span>
          </div>
        </div>
      </foreignObject>

      <OutputGallery
        items={outputs}
        docTicks={docTicks}
        syncingDocs={syncingDocs}
        x={cx}
        y={cy + 2}
      />

      {persistentSources.map((item, index) => (
        <foreignObject
          key={item.label}
          x={item.x - item.width / 2}
          y={item.y - 28}
          width={item.width}
          height={56}
        >
          <SourceChip item={item} index={index} />
        </foreignObject>
      ))}

      <AnimatePresence initial={false}>
        {activeLiveNotifications.map((notification, index) => {
          const slot = liveSourceSlots[notification.slotIndex]

          return (
            <motion.g
              key={`chip-${notification.key}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
            >
              <LiveSourceChip
                slot={slot}
                item={slot.entries[notification.entryIndex]}
                index={index + persistentSources.length}
              />
            </motion.g>
          )
        })}
      </AnimatePresence>
    </svg>
  )
}

export function ContextLayer({ embedded = false }: { embedded?: boolean }) {
  const [docTicks, setDocTicks] = useState(() => outputs.map(() => 0))
  const [syncingDocs, setSyncingDocs] = useState(() => outputs.map(() => false))
  const [notificationTick, setNotificationTick] = useState(0)
  const syncTimeoutsRef = useRef<number[]>([])
  const isDesktopLayout = useIsDesktopLayout()
  const cx = 600
  const cy = 360
  const ringRadius = 282

  const persistentTargets = useMemo(
    () =>
      persistentSources.map((source) =>
        pointOnCircle(cx, cy, ringRadius + 2, source.angle)
      ),
    [cx, cy, ringRadius]
  )

  const liveTargets = useMemo(
    () =>
      liveSourceSlots.map((slot) =>
        pointOnCircle(cx, cy, ringRadius + 2, slot.angle)
      ),
    [cx, cy, ringRadius]
  )

  const activeLiveNotifications = useMemo<ActiveLiveNotification[]>(() => {
    const primarySlotIndex = notificationTick % liveSourceSlots.length
    const primaryEntryIndex =
      Math.floor(notificationTick / liveSourceSlots.length) %
      liveSourceSlots[primarySlotIndex].entries.length

    const notifications: ActiveLiveNotification[] = [
      {
        slotIndex: primarySlotIndex,
        entryIndex: primaryEntryIndex,
        key: `primary-${notificationTick}-${primarySlotIndex}-${primaryEntryIndex}`,
      },
    ]

    if (notificationTick % 2 === 1) {
      const secondarySlotIndex = (primarySlotIndex + 3) % liveSourceSlots.length
      const secondaryEntryIndex =
        Math.floor((notificationTick + 2) / liveSourceSlots.length) %
        liveSourceSlots[secondarySlotIndex].entries.length

      notifications.push({
        slotIndex: secondarySlotIndex,
        entryIndex: secondaryEntryIndex,
        key: `secondary-${notificationTick}-${secondarySlotIndex}-${secondaryEntryIndex}`,
      })
    }

    return notifications
  }, [notificationTick])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNotificationTick((current) => current + 1)
    }, 5200)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const docIndexes = Array.from(
      new Set(
        activeLiveNotifications.flatMap((notification) => {
          const entry =
            liveSourceSlots[notification.slotIndex].entries[
              notification.entryIndex
            ]

          return entry.targets?.length
            ? entry.targets
            : [notification.entryIndex % outputs.length]
        })
      )
    )

    setDocTicks((current) =>
      current.map((tick, index) =>
        docIndexes.includes(index) ? tick + 1 : tick
      )
    )
    setSyncingDocs((current) =>
      current.map((_, index) => docIndexes.includes(index))
    )

    syncTimeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout))
    syncTimeoutsRef.current = docIndexes.map((docIndex) =>
      window.setTimeout(() => {
        setSyncingDocs((current) =>
          current.map((value, index) => (index === docIndex ? false : value))
        )
      }, 2200)
    )

    return () => {
      syncTimeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout))
      syncTimeoutsRef.current = []
    }
  }, [activeLiveNotifications])

  return (
    <section
      className={
        embedded ? "px-0 pt-8 pb-0 lg:pt-12" : "px-4 py-20 lg:px-6 lg:py-24"
      }
    >
      <div
        className={embedded ? "mx-auto max-w-[84rem]" : "mx-auto max-w-[84rem]"}
      >
        {embedded ? null : (
          <div className="mx-auto mb-14 max-w-3xl text-center lg:mb-16">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1.5">
              <div className="size-1.5 rounded-full bg-amber-800/70" />
              <span className="text-[11px] font-medium text-muted-foreground">
                Project blueprint
              </span>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground lg:text-[2rem]">
              Project inputs become an implementation blueprint.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              Discovery calls, documents, and team knowledge are captured into
              an implementation blueprint that keeps delivery artifacts aligned
              as scope evolves.
            </p>
          </div>
        )}

        <div
          className={
            embedded
              ? "relative overflow-visible px-0 py-0"
              : "relative overflow-visible rounded-[1.6rem] border border-border bg-card px-4 py-6 shadow-lg shadow-black/5 lg:px-7 lg:py-8"
          }
        >
          {isDesktopLayout ? (
            <DesktopContextScene
              activeLiveNotifications={activeLiveNotifications}
              cx={cx}
              cy={cy}
              docTicks={docTicks}
              liveTargets={liveTargets}
              persistentTargets={persistentTargets}
              ringRadius={ringRadius}
              syncingDocs={syncingDocs}
            />
          ) : (
            <MobileContextScene
              activeLiveNotifications={activeLiveNotifications}
              docTicks={docTicks}
              syncingDocs={syncingDocs}
            />
          )}
        </div>
      </div>
    </section>
  )
}
