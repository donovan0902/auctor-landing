import { motion } from "framer-motion"

import { Card, CardContent } from "@workspace/ui/components/card"

import danPortrait from "../assets/DanB.avif"
import founderPortrait from "../assets/Willsun.avif"

const testimonial = {
  quote:
    "Auctor has quickly become an essential part of how we work at Valiantys. Our teams spend a significant amount of time gathering requirements, running discoveries, and shaping solution designs across multiple regions and practices. Auctor brings more speed, clarity, and consistency to that work, helping our people focus on value instead of friction. The improvement in collaboration and delivery quality has been immediate. As we continue to scale globally, Auctor is becoming a core enabler of how we operate.",
  author: "Dan B.",
  role: "CIO of Valiantys",
  company: "Atlassian Platinum Solution Partner",
}

const founderQuote = {
  quote:
    "Our vision is to give every professional services organization the tools to focus on what matters most: advising customers, shaping outcomes, and driving real business change. We're building more than a product. Alongside industry experts, we're setting a new gold standard for services teams and redefining professional services automation through agentic delivery. We're building a future where technology amplifies expertise, where teams operate with clarity and efficiency, and where every implementation reaches its full potential.",
  author: "Will Sun",
  role: "Co-founder & CEO",
}

const logoPlaceholders = ["Logos", "Logos", "Logos", "Logos"]
const logoAnimationTimings = [
  { duration: 6.8, delay: 0.4 },
  { duration: 5.9, delay: 2.1 },
  { duration: 7.4, delay: 1.2 },
  { duration: 6.3, delay: 3.3 },
]

function PortraitPanel({
  src,
  alt,
  compact = false,
}: {
  src: string
  alt: string
  compact?: boolean
}) {
  return (
    <Card className="relative gap-0 overflow-hidden rounded-[1.45rem] border border-border/80 bg-card py-0 shadow-[0_24px_48px_-34px_rgba(42,34,24,0.16)]">
      <div
        className={`relative w-full ${compact ? "aspect-[4/5] min-h-[20rem] md:min-h-[22rem]" : "aspect-[4/5] min-h-[26rem]"}`}
      >
        <img alt={alt} className="h-full w-full object-cover" src={src} />
      </div>
    </Card>
  )
}

function TrustedByLogos() {
  return (
    <div className="w-full">
      <p className="mb-4 text-[11px] font-medium tracking-[0.22em] text-muted-foreground uppercase">
        Trusted By
      </p>
      <div className="grid w-full grid-cols-2 gap-4 lg:gap-5">
        {logoPlaceholders.map((label, index) => (
          <motion.div
            key={`${label}-${index}`}
            animate={{
              opacity: [0.38, 0.92, 0.52, 0.84, 0.38],
            }}
            transition={{
              duration: logoAnimationTimings[index].duration,
              delay: logoAnimationTimings[index].delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="mx-auto flex aspect-square w-full max-w-[9.5rem] items-center justify-center rounded-[0.9rem] border border-dashed border-border/80 bg-muted/20 px-4 text-center text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase"
          >
            {label}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export function Testimonial() {
  return (
    <section className="px-6 py-14 lg:py-24">
      <div className="mx-auto grid max-w-[88rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:grid-rows-[auto_auto] lg:items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="lg:col-start-1 lg:row-start-1"
        >
          <PortraitPanel alt="Portrait of Dan B." src={danPortrait} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
          className="lg:col-start-2 lg:row-span-2"
        >
          <div className="flex h-full flex-col gap-5">
            <Card className="flex rounded-[1.65rem] border border-border/80 bg-card shadow-[0_24px_48px_-34px_rgba(15,23,42,0.18)]">
              <CardContent className="flex h-full flex-col justify-between px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
                <div>
                  <blockquote className="mt-5 max-w-[46rem] text-[1.2rem] leading-[1.65] tracking-[-0.015em] text-foreground sm:text-[1.35rem] lg:text-[1.58rem]">
                    <span className="mr-1 text-[1.45em] leading-none text-stone-300">
                      &ldquo;
                    </span>
                    {testimonial.quote}
                    <span className="ml-1 text-[1.45em] leading-none text-stone-300">
                      &rdquo;
                    </span>
                  </blockquote>
                </div>

                <div className="mt-8 border-t border-border/70 pt-5">
                  <p className="text-base font-semibold tracking-tight text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.company}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[1.3rem] border border-border/80 bg-card shadow-[0_20px_40px_-34px_rgba(15,23,42,0.16)]">
              <CardContent className="px-6 py-6 sm:px-8 sm:py-7">
                <div className="grid gap-5 md:grid-cols-[0.42fr_0.58fr] md:items-start">
                  <PortraitPanel
                    alt="Portrait of Will Sun."
                    compact
                    src={founderPortrait}
                  />
                  <div>
                    <p className="text-[11px] font-medium tracking-[0.22em] text-muted-foreground uppercase">
                      From the Founder
                    </p>
                    <blockquote className="mt-4 text-[1rem] leading-[1.75] tracking-[-0.01em] text-foreground sm:text-[1.08rem]">
                      <span className="mr-1 text-[1.35em] leading-none text-stone-300">
                        &ldquo;
                      </span>
                      {founderQuote.quote}
                      <span className="ml-1 text-[1.35em] leading-none text-stone-300">
                        &rdquo;
                      </span>
                    </blockquote>
                    <div className="mt-5 border-t border-border/70 pt-4">
                      <p className="text-sm font-semibold tracking-tight text-foreground">
                        {founderQuote.author}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {founderQuote.role}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.04, ease: "easeOut" }}
          className="lg:col-start-1 lg:row-start-2 lg:flex lg:h-full lg:items-center"
        >
          <TrustedByLogos />
        </motion.div>
      </div>
    </section>
  )
}
