import { ContextLayer } from "./context-layer"
import { SharedBaselineGraphic } from "./shared-baseline-graphic"

export function Hero() {
  return (
    <section className="px-6 pt-20 pb-12 lg:pt-24 lg:pb-16">
      <div className="mx-auto max-w-[88rem]">
        <div className="grid gap-8 lg:gap-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,34rem)_minmax(0,1fr)] lg:items-start lg:gap-10">
            <div className="mx-auto max-w-[22rem] text-center sm:max-w-[34rem] lg:mx-0 lg:max-w-none lg:pt-6 lg:text-left">
              <h1 className="text-[clamp(2.25rem,8vw,2.75rem)] font-semibold leading-[1.08] tracking-tight text-foreground sm:leading-[1.05] lg:text-[3rem]">
                Keep stakeholders aligned{" "}
                <br className="hidden lg:block" />
                as projects evolve
              </h1>
              <p className="mt-4 max-w-[34rem] text-[0.95rem] leading-7 text-muted-foreground lg:mt-3 lg:text-[15px]">
                Auctor turns calls, docs, and stakeholder input into aligned
                requirements, user stories, SOWs, and test plans for enterprise
                implementations.
              </p>
            </div>

            <SharedBaselineGraphic />
          </div>

          <div className="rounded-[1.75rem] border border-border/80 bg-card/75 px-4 py-5 shadow-[0_24px_44px_-40px_rgba(15,23,42,0.24)] sm:px-5 lg:px-7 lg:py-7">
            <div className="mx-auto max-w-3xl text-center">
              <div className="text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
                How Auctor keeps it aligned
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                Once the baseline is set, Auctor keeps calls, documents, and
                project changes synced back into the delivery artifacts below.
              </p>
            </div>

            <ContextLayer embedded />
          </div>
        </div>
      </div>
    </section>
  )
}
