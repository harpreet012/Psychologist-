import LegalPage from "@/components/LegalPage";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: `Terms of Use | ${siteConfig.name}`,
  description: "Terms governing use of the Anjali Jakhar counselling website.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Website Use"
      title="Terms of Use"
      intro="By using this website, you acknowledge the practical limits of online information and the booking and payment terms described below."
    >
      <section>
        <h2>Information, not individual advice</h2>
        <p>
          Website content is for general educational and practice-information
          purposes. It does not assess your circumstances, provide a diagnosis,
          replace medical care, or create a therapist–client relationship.
        </p>
      </section>
      <section>
        <h2>Appointment booking</h2>
        <p>
          Selecting a time creates a temporary hold for the period shown on the booking
          page. The appointment is confirmed only after successful payment is verified.
          A professional relationship begins only after suitability, boundaries,
          informed consent, and the appointment itself have been addressed.
        </p>
      </section>
      <section>
        <h2>Fees, cancellation, and refunds</h2>
        <p>
          The session fee and current cancellation policy are shown before payment.
          If a payment succeeds but automatic confirmation does not appear, contact the
          practice with the booking reference and do not pay a second time. Cancellations
          and any eligible refund are handled under the displayed policy; cancelling an
          appointment does not by itself create an automatic refund.
        </p>
      </section>
      <section>
        <h2>Responsible use</h2>
        <p>
          Do not attempt to disrupt the website, access private administrative areas,
          submit unlawful material, impersonate another person, or use forms for spam.
          Requests may be declined where the service is not suitable or available.
        </p>
      </section>
      <section>
        <h2>No guaranteed outcome</h2>
        <p>
          Psychological support is individual and outcomes cannot be promised. The
          usefulness of counselling can depend on many factors, including fit, goals,
          participation, context, and needs that may require other professionals.
        </p>
      </section>
      <section>
        <h2>Content and availability</h2>
        <p>
          Original text and design may not be reproduced commercially without
          permission. The website may be updated, paused, or contain occasional errors;
          links to external services, if added, do not imply responsibility for them.
        </p>
      </section>
    </LegalPage>
  );
}
