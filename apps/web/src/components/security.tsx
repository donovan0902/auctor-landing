import type { LucideIcon } from "lucide-react"
import {
  BadgeCheck,
  DatabaseZap,
  KeyRound,
  ShieldCheck,
  Workflow,
} from "lucide-react"
import { motion } from "framer-motion"

interface SecurityPoint {
  icon: LucideIcon
  title: string
  copy: string
}

const securityPoints: SecurityPoint[] = [
  {
    icon: DatabaseZap,
    title: "Your Data, Your Control",
    copy:
      "No AI training, Zero Data Retention, access controls, retention controls, deletion controls.",
  },
  {
    icon: ShieldCheck,
    title: "Secure, Encrypted Infrastructure",
    copy:
      "TLS 1.2+, AES-256, encryption in transit and at rest, multi-region infrastructure, monitoring, redundancy.",
  },
  {
    icon: Workflow,
    title: "Granular Retention & Privacy Controls",
    copy:
      "GDPR-aligned workflows, CCPA-aligned workflows, configurable retention, deletion on demand.",
  },
  {
    icon: BadgeCheck,
    title: "Independently Audited Compliance",
    copy:
      "SOC 2 Type II, ISO 27001, independent audits, penetration testing, confidentiality and availability controls.",
  },
  {
    icon: KeyRound,
    title: "Enterprise Access & Threat Protection",
    copy:
      "SSO, SCIM, MFA, role-based access controls, continuous monitoring, automated alerting.",
  },
]

function SecuritySnippet({
  item,
  index,
}: {
  item: SecurityPoint
  index: number
}) {
  const Icon = item.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
      className="max-w-[23rem]"
    >
      <Icon className="size-[1.15rem] text-foreground" strokeWidth={1.8} />
      <h3 className="mt-5 max-w-[16rem] text-[1.08rem] font-medium leading-[1.15] tracking-[-0.03em] text-foreground sm:text-[1.18rem]">
        {item.title}
      </h3>
      <p className="mt-5 text-[0.96rem] leading-7 text-muted-foreground">
        {item.copy}
      </p>
    </motion.div>
  )
}

export function Security() {
  return (
    <section className="px-6 py-14 lg:py-24">
      <div className="mx-auto max-w-[88rem]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="max-w-[42rem]"
        >
          <h2 className="text-[1.55rem] font-semibold leading-[1.12] tracking-tight text-foreground sm:text-[1.85rem] lg:text-[2.1rem]">
            Built with the rigor that global system integrators and enterprise
            software vendors expect from mission-critical delivery platforms.
          </h2>
          <p className="mt-4 text-[0.98rem] leading-7 text-muted-foreground sm:text-[1.03rem]">
            Your data stays private, encrypted, and fully under your control.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-x-12 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
          {securityPoints.map((item, index) => (
            <SecuritySnippet key={item.title} item={item} index={index} />
          ))}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, delay: 0.24, ease: "easeOut" }}
            className="max-w-[23rem] self-center"
          >
            <h3 className="max-w-[18rem] text-[1.18rem] font-medium leading-[1.2] tracking-[-0.03em] text-foreground sm:text-[1.34rem]">
              We meet the highest level of security certification
            </h3>
            <a
              className="mt-8 inline-flex items-center rounded-full bg-foreground px-5 py-3 text-sm font-medium tracking-tight text-background transition-opacity hover:opacity-90"
              href="#"
            >
              Our security portal
              <span className="ml-3 text-base leading-none">↗</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
