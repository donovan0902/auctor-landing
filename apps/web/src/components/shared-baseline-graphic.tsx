import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Briefcase,
  ClipboardList,
  FileText,
  ListChecks,
  ScrollText,
  Target,
  Users,
  Workflow,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Badge } from "@workspace/ui/components/badge"
import { Card, CardContent } from "@workspace/ui/components/card"

interface AlignmentRow {
  stakeholder: string
  stakeholderDetail: string
  stakeholderIcon: LucideIcon
  expectation: string
  expectationDetail: string
  expectationIcon: LucideIcon
  artifact: string
  artifactDetail: string
  artifactIcon: LucideIcon
}

const alignmentRows: AlignmentRow[] = [
  {
    stakeholder: "Sales engineering",
    stakeholderDetail: "Commercial and scope expectations",
    stakeholderIcon: Briefcase,
    expectation: "Scope boundaries",
    expectationDetail: "Phases, assumptions, and change controls",
    expectationIcon: Target,
    artifact: "SOW",
    artifactDetail: "Commercial baseline shared at handoff",
    artifactIcon: ScrollText,
  },
  {
    stakeholder: "Delivery lead",
    stakeholderDetail: "Operational plan and dependencies",
    stakeholderIcon: Workflow,
    expectation: "Functional requirements",
    expectationDetail: "Decisions, edge cases, and ownership",
    expectationIcon: ClipboardList,
    artifact: "Requirements",
    artifactDetail: "Structured source of truth for execution",
    artifactIcon: ClipboardList,
  },
  {
    stakeholder: "Customer team",
    stakeholderDetail: "What users need to do and why",
    stakeholderIcon: Users,
    expectation: "User outcomes",
    expectationDetail: "Journeys, acceptance criteria, and priorities",
    expectationIcon: Users,
    artifact: "User stories",
    artifactDetail: "Shared language for delivery and review",
    artifactIcon: FileText,
  },
  {
    stakeholder: "QA and PMO",
    stakeholderDetail: "Readiness and validation criteria",
    stakeholderIcon: ListChecks,
    expectation: "Verification rules",
    expectationDetail: "Coverage, go-live checks, and evidence",
    expectationIcon: ListChecks,
    artifact: "Test scripts",
    artifactDetail: "Same baseline carried into validation",
    artifactIcon: ListChecks,
  },
]

function DesktopAlignmentRow({
  isActive,
  row,
}: {
  isActive: boolean
  row: AlignmentRow
}) {
  const StakeholderIcon = row.stakeholderIcon
  const ExpectationIcon = row.expectationIcon
  const ArtifactIcon = row.artifactIcon

  return (
    <motion.div
      animate={{ y: isActive ? -2 : 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="grid grid-cols-[12.5rem_2.75rem_minmax(0,18rem)_2.75rem_12.5rem] items-center gap-3"
    >
      <Card
        className={`rounded-[1.15rem] border bg-background/92 py-0 shadow-[0_18px_36px_-30px_rgba(15,23,42,0.34)] backdrop-blur-sm transition-colors ${
          isActive
            ? "border-stone-600/28"
            : "border-border/80"
        }`}
      >
        <CardContent className="flex items-start gap-3 px-3.5 py-3.5">
          <div
            className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-[0.95rem] border ${
              isActive
                ? "border-stone-600/18 bg-stone-600/10 text-stone-800"
                : "border-border/80 bg-muted/55 text-muted-foreground"
            }`}
          >
            <StakeholderIcon className="size-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[12px] font-semibold tracking-[-0.01em] text-foreground">
              {row.stakeholder}
            </div>
            <div className="mt-1 text-[11px] leading-[1.45] text-muted-foreground">
              {row.stakeholderDetail}
            </div>
          </div>
        </CardContent>
      </Card>

      <motion.div
        animate={{
          opacity: isActive ? 1 : 0.52,
          scaleX: isActive ? 1.04 : 1,
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="relative h-px origin-left bg-gradient-to-r from-stone-700/28 via-stone-700/45 to-stone-700/10"
      >
        <motion.div
          animate={{
            left: isActive ? ["0%", "100%"] : "28%",
            opacity: isActive ? [0, 1, 0] : 0.4,
          }}
          transition={{
            duration: 1.8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-stone-700/70"
        />
      </motion.div>

      <motion.div
        animate={{
          borderColor: isActive
            ? "oklch(0.52 0.03 42 / 0.24)"
            : "oklch(0.91 0.012 72 / 0.95)",
          backgroundColor: isActive
            ? "oklch(0.994 0.006 82 / 0.96)"
            : "oklch(0.994 0.005 80 / 0.88)",
          boxShadow: isActive
            ? "0 20px 38px -30px rgba(72, 58, 39, 0.34)"
            : "0 14px 30px -28px rgba(15, 23, 42, 0.24)",
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="rounded-[1.15rem] border px-4 py-3"
      >
        <div className="flex items-start gap-3">
          <div
            className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-[0.95rem] border ${
              isActive
                ? "border-amber-700/22 bg-amber-700/10 text-amber-900"
                : "border-border/80 bg-background/80 text-muted-foreground"
            }`}
          >
            <ExpectationIcon className="size-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="text-[12px] font-semibold tracking-[-0.01em] text-foreground">
                {row.expectation}
              </div>
              {isActive ? (
                <Badge
                  variant="outline"
                  className="h-5 border-amber-800/18 bg-amber-700/8 px-1.5 text-[10px] font-semibold tracking-[0.12em] text-amber-900 uppercase"
                >
                  Shared
                </Badge>
              ) : null}
            </div>
            <div className="mt-1 text-[11px] leading-[1.45] text-muted-foreground">
              {row.expectationDetail}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{
          opacity: isActive ? 1 : 0.52,
          scaleX: isActive ? 1.04 : 1,
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="relative h-px origin-right bg-gradient-to-r from-stone-700/10 via-stone-700/45 to-stone-700/28"
      >
        <motion.div
          animate={{
            right: isActive ? ["0%", "100%"] : "28%",
            opacity: isActive ? [0, 1, 0] : 0.4,
          }}
          transition={{
            duration: 1.8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 size-2 translate-x-1/2 -translate-y-1/2 rounded-full bg-stone-700/70"
        />
      </motion.div>

      <Card
        className={`rounded-[1.15rem] border bg-background/92 py-0 shadow-[0_18px_36px_-30px_rgba(15,23,42,0.34)] backdrop-blur-sm transition-colors ${
          isActive
            ? "border-stone-600/28"
            : "border-border/80"
        }`}
      >
        <CardContent className="flex items-start gap-3 px-3.5 py-3.5">
          <div
            className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-[0.95rem] border ${
              isActive
                ? "border-stone-600/18 bg-stone-600/10 text-stone-800"
                : "border-border/80 bg-muted/55 text-muted-foreground"
            }`}
          >
            <ArtifactIcon className="size-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[12px] font-semibold tracking-[-0.01em] text-foreground">
              {row.artifact}
            </div>
            <div className="mt-1 text-[11px] leading-[1.45] text-muted-foreground">
              {row.artifactDetail}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function MobileAlignmentRow({
  isActive,
  row,
}: {
  isActive: boolean
  row: AlignmentRow
}) {
  const StakeholderIcon = row.stakeholderIcon
  const ExpectationIcon = row.expectationIcon
  const ArtifactIcon = row.artifactIcon

  return (
    <motion.div
      animate={{
        borderColor: isActive
          ? "oklch(0.52 0.03 42 / 0.2)"
          : "oklch(0.91 0.012 72 / 0.95)",
        y: isActive ? -2 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="rounded-[1.25rem] border bg-background/94 p-4 shadow-[0_18px_36px_-28px_rgba(15,23,42,0.24)]"
    >
      <div className="flex items-center justify-between gap-3">
        <Badge
          variant="outline"
          className="h-6 border-stone-700/14 bg-muted/40 px-2 text-[10px] tracking-[0.12em] text-muted-foreground uppercase"
        >
          Shared baseline
        </Badge>
        <motion.div
          animate={{
            opacity: isActive ? [0.4, 1, 0.4] : 0.4,
            scale: isActive ? [1, 1.12, 1] : 1,
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="size-2 rounded-full bg-stone-700/65"
        />
      </div>

      <div className="mt-4 grid gap-3">
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-[0.95rem] border border-border/80 bg-muted/55 text-muted-foreground">
            <StakeholderIcon className="size-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[12px] font-semibold text-foreground">
              {row.stakeholder}
            </div>
            <div className="mt-1 text-[11px] leading-[1.45] text-muted-foreground">
              {row.stakeholderDetail}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="h-7 w-px bg-gradient-to-b from-stone-700/8 via-stone-700/48 to-stone-700/8" />
        </div>

        <div className="rounded-[1rem] border border-stone-700/16 bg-[linear-gradient(135deg,rgba(255,252,247,0.94),rgba(247,243,236,0.88))] px-3.5 py-3">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-[0.95rem] border border-amber-700/18 bg-amber-700/8 text-amber-900">
              <ExpectationIcon className="size-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[12px] font-semibold text-foreground">
                {row.expectation}
              </div>
              <div className="mt-1 text-[11px] leading-[1.45] text-muted-foreground">
                {row.expectationDetail}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="h-7 w-px bg-gradient-to-b from-stone-700/8 via-stone-700/48 to-stone-700/8" />
        </div>

        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-[0.95rem] border border-border/80 bg-muted/55 text-muted-foreground">
            <ArtifactIcon className="size-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[12px] font-semibold text-foreground">
              {row.artifact}
            </div>
            <div className="mt-1 text-[11px] leading-[1.45] text-muted-foreground">
              {row.artifactDetail}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function SharedBaselineGraphic() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % alignmentRows.length)
    }, 2600)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-[linear-gradient(180deg,rgba(255,252,247,0.96),rgba(249,246,240,0.9))] p-4 shadow-[0_28px_60px_-42px_rgba(24,16,8,0.3)] sm:p-5 lg:p-8">
      <div className="pointer-events-none absolute inset-x-8 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(197,167,118,0.16),transparent_62%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-y-8 left-1/2 hidden w-[24.25rem] -translate-x-1/2 rounded-[2rem] border border-stone-700/10 bg-[linear-gradient(180deg,rgba(255,253,250,0.88),rgba(250,246,240,0.7))] lg:block" />

      <div className="relative">
        <div className="flex flex-col gap-4 lg:gap-5">
          <div className="flex flex-col gap-3 lg:items-center">
            <Badge
              variant="outline"
              className="h-6 w-fit border-stone-700/16 bg-background/70 px-2.5 text-[10px] font-semibold tracking-[0.16em] text-muted-foreground uppercase"
            >
              One baseline
            </Badge>
            <div className="lg:text-center">
              <h3 className="text-[1.1rem] font-semibold tracking-tight text-foreground sm:text-[1.2rem]">
                The same expectations carry from kickoff to go-live
              </h3>
              <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-muted-foreground lg:mx-auto">
                Auctor keeps stakeholder expectations tied to the same
                documented baseline, so every handoff points back to aligned
                scope, requirements, stories, and validation.
              </p>
            </div>
          </div>

          <div className="hidden gap-4 pt-2 lg:grid">
            <div className="grid grid-cols-[12.5rem_2.75rem_minmax(0,18rem)_2.75rem_12.5rem] items-center gap-3 px-1 text-[10px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
              <div>Stakeholders</div>
              <div />
              <div className="text-center">Shared project baseline</div>
              <div />
              <div className="text-right">Delivery artifacts</div>
            </div>
            {alignmentRows.map((row, index) => (
              <DesktopAlignmentRow
                key={row.expectation}
                isActive={index === activeIndex}
                row={row}
              />
            ))}
          </div>

          <div className="grid gap-4 lg:hidden">
            {alignmentRows.map((row, index) => (
              <MobileAlignmentRow
                key={row.expectation}
                isActive={index === activeIndex}
                row={row}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
