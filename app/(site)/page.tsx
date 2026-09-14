import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Brain,
  HeartHandshake,
  MessageCircleHeart,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import MoodCheckIn from "@/components/MoodCheckIn";
import TherapyProcess from "@/components/TherapyProcess";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import ProfileVisual from "@/components/ProfileVisual";
import { services, trustPoints } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

const trustIconMap = { ShieldCheck, HeartHandshake, BadgeCheck } as const;

const livedExperiences = [
  "You keep replaying conversations long after they end.",
  "You are functioning, but something underneath still feels heavy.",
  "You understand some of your patterns, yet struggle to change them.",
  "You are tired of being the strong one for everyone else.",
];

const approachPoints = [
  {
    icon: MessageCircleHeart,
    title: "A relationship before a technique",
    description:
      "Feeling heard and able to give honest feedback is part of the work—not an extra.",
  },
  {
    icon: Brain,
    title: "Evidence-informed and flexible",
    description:
      "CBT-informed, REBT, solution-focused, person-centred, and creative methods are used thoughtfully around your needs.",
  },
  {
    icon: Sprout,
    title: "Insight that becomes practice",
    description:
      "Sessions connect understanding with small experiments and skills you can use in everyday life.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="py-20 sm:py-24">
        <div className="container-content grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <span className="eyebrow text-sage-500">You Might Be Here Because</span>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-charcoal sm:text-4xl">
              Life looks manageable from outside—but does not feel that way inside.
            </h2>
            <p className="mt-5 leading-7 text-charcoal-muted">
              You do not need a label or a perfectly organised story to begin.
              Therapy can give us room to understand what is happening beneath
              the surface.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {livedExperiences.map((item, index) => (
              <div
                key={item}
                className="rounded-lg border border-charcoal/8 bg-white p-6 shadow-[0_2px_12px_-6px_rgba(43,40,35,0.10)]"
              >
                <span className="font-serif text-sm text-sage-500">0{index + 1}</span>
                <p className="mt-3 font-serif text-lg leading-7 text-charcoal">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-charcoal/5 bg-cream-soft py-20 sm:py-24">
        <div className="container-content">
          <SectionHeading
            eyebrow="The Foundation"
            title="Support That Feels Clear, Human, and Personal"
            description="The process is not about fitting you into a template. It begins with your context, your goals, and what feels possible right now."
          />
          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-3">
            {trustPoints.map((point) => {
              const Icon = trustIconMap[point.icon as keyof typeof trustIconMap];
              return (
                <div
                  key={point.title}
                  className="rounded-lg border border-charcoal/8 bg-white/65 p-6"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-sage-100 text-sage-600">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 font-serif text-lg text-charcoal">{point.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-charcoal-muted">
                    {point.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-content">
          <SectionHeading
            eyebrow="My Approach to Therapy"
            title="Understanding Comes First. Change Follows at Your Pace."
            description="My approach is collaborative and integrative. We may work with thoughts, emotions, behaviour, relationships, and practical coping—depending on what is most useful for you."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {approachPoints.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-xl bg-sage-700 p-7 text-cream shadow-soft"
              >
                <Icon size={24} strokeWidth={1.5} className="text-clay-200" />
                <h3 className="mt-5 font-serif text-xl">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-cream/75">{description}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-7 max-w-3xl text-center text-xs leading-6 text-charcoal-muted">
            Any approach mentioned describes training and an informed way of working;
            it is not a promise that one method will suit every person or concern.
          </p>
        </div>
      </section>

      <section className="bg-cream-soft py-20 sm:py-24">
        <div className="container-content">
          <SectionHeading
            eyebrow="Areas of Support"
            title="What We Can Work On Together"
            description="These are common reasons people reach out. Your experience may overlap several areas—or not fit neatly into any one of them."
          />
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard service={service} index={index} key={service.slug} />
            ))}
          </div>
        </div>
      </section>

      <MoodCheckIn />
      <TherapyProcess />

      <section className="py-20 sm:py-24">
        <div className="container-content grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <ProfileVisual compact />
          <div>
            <span className="eyebrow text-sage-500">Meet Your Counselling Psychologist</span>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-charcoal sm:text-4xl">
              Hi, I&apos;m {siteConfig.name}.
            </h2>
            <p className="mt-5 leading-7 text-charcoal-muted">
              I offer a warm, structured space where you can speak honestly
              without being rushed, judged, or reduced to a problem. My work
              draws on counselling experience across individual, relationship,
              family, rehabilitation, and emotional well-being settings.
            </p>
            <p className="mt-4 leading-7 text-charcoal-muted">
              Alongside practice, I am pursuing a Ph.D. in Psychology and have
              contributed to published work on online therapy and telehealth.
              I see therapy as a partnership: we build understanding together,
              decide what matters, and adjust the process through your feedback.
            </p>
            <ul className="mt-6 space-y-1.5 border-l-2 border-sage-200 pl-4">
              {["M.A. Applied Psychology", "PG Diploma in Rehabilitation Psychology (RCI-affiliated)", "CBT, REBT & PMT", "Ph.D. Scholar"].map((item) => (
                <li
                  key={item}
                  className="text-sm text-charcoal-soft"
                >
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-sage-500 px-6 py-3 font-medium text-cream transition-colors hover:bg-sage-600"
            >
              Read About My Background
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <FAQSection />
      <CTASection />
    </>
  );
}
