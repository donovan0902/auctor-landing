import { ContextLayer } from "./context-layer"

export function Hero() {
  return (
    <section className="px-6 pt-20 pb-8 lg:pt-24">
      <div className="mx-auto max-w-[88rem]">
        <div className="relative">
          <div className="relative z-10 mb-6 flex justify-center text-center lg:absolute lg:left-0 lg:-top-1 lg:mb-0 lg:max-w-[42rem] lg:justify-start lg:text-left">
            <div className="max-w-[22rem] sm:max-w-[30rem] lg:max-w-none">
              <h1 className="text-[clamp(2.25rem,8vw,2.75rem)] font-semibold leading-[1.08] tracking-tight text-foreground sm:leading-[1.05] lg:text-[3rem]">
                Keep stakeholders aligned 
                <br className="hidden lg:block" />
                as projects evolve
              </h1>
              <p className="mt-4 max-w-[34rem] text-[0.95rem] leading-7 text-muted-foreground lg:mt-3 lg:text-[15px]">
                Auctor turns calls, docs, and stakeholder input into aligned
                requirements, user stories, SOWs, and test plans for enterprise
                implementations.
              </p>
            </div>
          </div>
          <div className="lg:pt-10">
            <ContextLayer embedded />
          </div>
        </div>
      </div>
    </section>
  )
}
