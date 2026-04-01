import { motion } from "framer-motion"

import { Button } from "@workspace/ui/components/button"

export function CTA() {
  return (
    <section className="px-6 py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-4xl text-center"
      >
        <h2 className="text-[2rem] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-[2.5rem] lg:text-[3rem]">
          You&apos;re going to want to see this
        </h2>
        <div className="mt-8 flex justify-center">
          <Button size="lg">Book a demo</Button>
        </div>
      </motion.div>
    </section>
  )
}
