import {
  BookOpenText,
  Layers3,
  Sparkles,
  Workflow,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import handshakeCube from "../assets/handshakeCube.png"
import leverageImage from "../assets/balance.png"

interface ValueProp {
  icon: LucideIcon
  title: string
  copy: string
  imageSrc?: string
}

const valueProps: ValueProp[] = [
  {
    icon: Sparkles,
    title: "A baseline that carries forward",
    copy:
      "Capture a shared baseline of knowledge once, then carry it from sales to delivery to validation with less lost in translation at every handoff.",
    imageSrc: handshakeCube,
  },
  {
    icon: Workflow,
    title: "Aligned, every time",
    copy:
      "No more “he said, she said.” Auctor keeps every conversation, artifact, and decision connected and traceable through go-live and beyond.",
  },
  {
    icon: BookOpenText,
    title: "Leverage rooted knowledge",
    copy:
      "Auctor learns from your past projects and existing workflows, following best practices and helping every implementation move more efficiently.",
  },
  {
    icon: Layers3,
    title: "Do more with less",
    copy:
      "Generate artifacts in hours instead of weeks. Auctor enables smaller teams to deliver faster and focus on outcomes with less overhead.",
    imageSrc: leverageImage,
  },
]

function ValuePropCard({
  item,
  index,
}: {
  item: ValueProp
  index: number
}) {
  return (
    <motion.div
      className={`w-full max-w-[35.5rem] ${index % 2 === 0 ? "mx-auto md:ml-auto md:mr-3 lg:mr-4" : "mx-auto md:ml-3 md:mr-auto lg:ml-4"}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
    >
      <div className="flex flex-col gap-4">
        <Card className="relative min-h-[23rem] overflow-hidden rounded-[1.2rem] border border-border/80 bg-background py-0 shadow-[0_22px_42px_-34px_rgba(15,23,42,0.2)] lg:min-h-[25rem]">
          {item.imageSrc ? (
            <img
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover"
              src={item.imageSrc}
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(226,232,240,0.9),rgba(203,213,225,0.72))]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.7),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.28),transparent_38%)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="max-w-[15rem] px-4 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Product Snippet Placeholder
                </div>
              </div>
            </>
          )}
        </Card>

        <div className="px-1">
          <CardHeader className="gap-3 px-0 pt-0 pb-2">
            <CardTitle className="text-[1.25rem] leading-tight font-semibold tracking-tight text-foreground">
              {item.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <p className="text-[14px] leading-relaxed text-muted-foreground">
              {item.copy}
            </p>
          </CardContent>
        </div>
      </div>
    </motion.div>
  )
}

export function WhatAuctorDoes() {
  return (
    <section className="px-6 py-12 lg:py-20">
      <div className="mx-auto max-w-[88rem]">
        <div className="mx-auto mb-8 max-w-4xl text-center">
          <h2 className="text-[1.38rem] font-semibold leading-tight tracking-tight text-foreground lg:text-[1.62rem]">
            The agentic OS for system integrators, enterprise professional services
            teams, and software vendors running complex implementations
          </h2>
        </div>

        <div className="grid gap-x-3 gap-y-10 md:grid-cols-2 lg:gap-x-0 lg:gap-y-12">
          {valueProps.map((item, index) => (
            <ValuePropCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
