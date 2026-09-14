import LegalPage from "@/components/LegalPage";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: `Professional Disclaimer | ${siteConfig.name}`,
  description: "Scope and limits of counselling information and services on this website.",
};

export default function DisclaimerPage() {
  return (
    <LegalPage
      eyebrow="Scope of Practice"
      title="Professional Disclaimer"
      intro="Clear boundaries help visitors understand what this website and counselling practice can—and cannot—provide."
    >
      <section>
        <h2>Professional designation</h2>
        <p>
          {siteConfig.name} is presented on this website as a counselling
          psychologist. A qualification from an RCI-affiliated programme is listed as
          education and should not be read as a separate claim of current CRR
          registration or the protected title “Clinical Psychologist.” Any registration
          details, if applicable, should be verified directly before they are published.
        </p>
      </section>
      <section>
        <h2>No diagnosis through the website</h2>
        <p>
          Articles, mood check-ins, breathing exercises, service descriptions, and form
          responses cannot diagnose a mental health condition. Personalised assessment
          requires an appropriate professional process and may involve referral.
        </p>
      </section>
      <section>
        <h2>Emergencies and crisis support</h2>
        <p>
          This website and practice do not provide emergency monitoring or crisis
          response. If there is immediate danger, a medical emergency, or a risk of
          harm, contact local emergency services or go to the nearest hospital. Do not
          wait for a website response.
        </p>
      </section>
      <section>
        <h2>Suitability and referral</h2>
        <p>
          A request may be declined or referred when a concern falls outside the
          practitioner&apos;s competence, availability, service format, or professional
          scope. Psychiatric, medical, emergency, or specialist support may sometimes be
          recommended alongside or instead of counselling.
        </p>
      </section>
      <section>
        <h2>Confidentiality has limits</h2>
        <p>
          Privacy is central to counselling but is not absolute. Relevant limits may
          apply in situations involving serious safety concerns, safeguarding duties,
          legal requirements, supervision, or necessary service administration. These
          boundaries should be discussed as part of informed consent.
        </p>
      </section>
    </LegalPage>
  );
}
