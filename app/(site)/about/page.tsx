import { BookOpen, CheckCircle2, HeartHandshake, Lightbulb } from "lucide-react";
import Link from "next/link";
import ProfileVisual from "@/components/ProfileVisual";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: `About ${siteConfig.name} | ${siteConfig.professionalTitle}`,
  description:
    "Learn about Anjali Jakhar's counselling approach, qualifications, professional experience, and areas of support.",
};

const qualifications = [
  {
    degree: "Ph.D. in Psychology (Pursuing)",
  },
  {
    degree: "PG Diploma in Rehabilitation Psychology (RCI-affiliated)",
  },
  {
    degree: "Skill Enhancement Course in CBT",
  },
  {
    degree: "PG Diploma in Child Guidance & Family Counselling",
  },
  {
    degree: "M.A. Applied Psychology",
  },
  {
    degree: "B.A. Psychology & Mathematics",
  },
];

const experience = [
  {
    role: "Psychologist",
    organisation: "Athena Behavioral Health, Greater Noida",
    scope: "Individual sessions, psychological assessments, group work, and caregiver PMT sessions.",
  },
  {
    role: "Rehabilitation Psychologist Intern",
    organisation: "NIEPVD, Dehradun",
    scope: "Case-history work and intervention planning under senior clinical supervision.",
  },
  {
    role: "Counselling Psychologist",
    organisation: "SHAARC, Delhi",
    scope: "Individual and group counselling with assessment-informed planning.",
  },
  {
    role: "Family Counsellor",
    organisation: "Don Bosco Navjeevan Society, Chandigarh",
    scope: "Family-conflict counselling, emotional support, and crisis stabilisation.",
  },
  {
    role: "Counsellor Intern",
    organisation: "Santulan Clinic, Delhi",
    scope: "Counselling for adolescents and young adults, group work, and psychoeducation.",
  },
  {
    role: "Counsellor Intern",
    organisation: "SIRTAR, Rohtak",
    scope: "Support for anxiety, stress, relationship concerns, and progress tracking.",
  },
];

const research = [
  "Co-authored a 2024 publication on the efficacy and effectiveness of online therapy and telehealth in modern counselling practice.",
  "Presented on psychology and global religious trends at an international seminar in February 2024.",
  "Presented on positive psychology, well-being, and resilience at a national seminar in April 2024.",
];

const approach = [
  {
    icon: HeartHandshake,
    title: "Collaborative",
    description:
      "You bring lived experience; I bring psychological training. We make sense of the concern and decide the direction together.",
  },
  {
    icon: Lightbulb,
    title: "Integrative",
    description:
      "The work may draw from CBT-informed, REBT, solution-focused, person-centred, and creative methods according to your needs.",
  },
  {
    icon: BookOpen,
    title: "Reflective",
    description:
      "I value continued learning, supervision, feedback, and honest attention to what is—and is not—helping in therapy.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="container-content grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <span className="eyebrow text-sage-500">About Me</span>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
              Hi, I&apos;m {siteConfig.name}.
            </h1>
            <p className="mt-6 text-lg leading-8 text-charcoal-muted">
              I&apos;m a counselling psychologist who believes therapy should feel
              like a genuine, purposeful conversation—one where you are not
              rushed, judged, or reduced to a label.
            </p>
            <p className="mt-4 leading-7 text-charcoal-muted">
              My experience spans counselling, family support, rehabilitation,
              and behavioural-health settings. I have worked with people facing
              anxiety, emotional distress, relationship concerns, life changes,
              family difficulties, and questions of self-worth and direction.
            </p>
            <p className="mt-4 leading-7 text-charcoal-muted">
              What stays central across this work is a simple belief: people
              deserve a private space where their context is taken seriously and
              change is approached with both compassion and honesty.
            </p>
            <p className="mt-4 leading-7 text-charcoal-muted">
              Alongside practice, I am pursuing a Ph.D. in Psychology and have
              contributed to published work on online therapy and telehealth.
            </p>
          </div>
          <ProfileVisual />
        </div>
      </section>

      <section className="bg-cream-soft py-20 sm:py-24">
        <div className="container-content">
          <SectionHeading
            eyebrow="Professional Background"
            title="Academic Qualifications & Professional Experience"
            description="Qualifications and relevant work settings are listed clearly so clients and families can understand the professional background at a glance."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-charcoal/8 bg-white/70 p-7 sm:p-8">
              <h2 className="font-serif text-2xl text-charcoal">Academic Qualifications</h2>
              <ul className="mt-6 space-y-4">
                {qualifications.map((item) => (
                  <li key={item.degree} className="flex gap-3 text-sm leading-6 text-charcoal-soft">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-sage-500" />
                    <div>
                      <p className="font-semibold text-charcoal">{item.degree}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-charcoal/8 bg-white/70 p-7 sm:p-8">
              <h2 className="font-serif text-2xl text-charcoal">Professional Experience</h2>
              <ul className="mt-6 space-y-4">
                {experience.map((item) => (
                  <li key={`${item.role}-${item.organisation}`} className="flex gap-3 text-sm leading-6 text-charcoal-soft">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-sage-500" />
                    <div>
                      <p className="font-semibold text-charcoal">{item.role}</p>
                      <p>{item.organisation}</p>
                      <p className="mt-1 text-xs leading-5 text-charcoal-muted">{item.scope}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-2xl bg-sage-50 p-4 text-xs leading-6 text-charcoal-muted">
                Professional designations on this website are intentionally
                limited to confirmed qualifications. Details of training or
                registration relevant to a service can be discussed before booking.
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-xl border border-charcoal/8 bg-white/70 p-7 sm:p-8">
            <h2 className="font-serif text-2xl text-charcoal">Research & Presentations</h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {research.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-charcoal-soft">
                  <BookOpen size={18} className="mt-0.5 shrink-0 text-sage-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-content">
          <SectionHeading
            eyebrow="How I Work"
            title="Warmth With Structure"
            description="A supportive relationship matters, and so does having a clear sense of what we are working toward."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {approach.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-xl border border-charcoal/8 bg-white/55 p-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-lavender-100 text-sage-700">
                  <Icon size={19} strokeWidth={1.65} />
                </span>
                <div className="mt-5 border-l-2 border-sage-200 pl-3">
                  <h3 className="font-serif text-xl text-charcoal">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-charcoal-muted">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sage-700 py-20 text-cream">
        <div className="container-content grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-2xl">
            <span className="eyebrow text-cream/60">A Good Fit Matters</span>
            <h2 className="mt-3 font-serif text-3xl leading-tight">
              You are allowed to ask questions before choosing a therapist.
            </h2>
            <p className="mt-4 leading-7 text-cream/75">
              An initial consultation is a chance to understand the process,
              discuss your needs, and notice whether the working relationship feels right.
            </p>
          </div>
          <Link
            href="/book-appointment"
            className="inline-flex w-fit items-center rounded-full bg-cream px-7 py-3.5 font-medium text-sage-700 transition-transform hover:-translate-y-0.5"
          >
            Request a Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
