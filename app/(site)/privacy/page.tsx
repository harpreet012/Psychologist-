import LegalPage from "@/components/LegalPage";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: `Privacy Notice | ${siteConfig.name}`,
  description: "How personal information submitted through this counselling website is handled.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Your Information"
      title="Privacy Notice"
      intro="This notice explains what information the website collects, why it is needed, and how booking, payment, and calendar providers are involved."
    >
      <section>
        <h2>Information you choose to provide</h2>
        <p>
          The consultation form may collect your name, email address, phone
          number, preferred session details, the general area in which you want
          support, and any optional message you write. Please share only what is
          necessary for arranging an initial conversation.
        </p>
      </section>
      <section>
        <h2>How the information is used</h2>
        <p>
          Form details are used to respond to your enquiry, consider availability,
          arrange or manage an appointment, and keep an administrative record of
          the request. They are not used for advertising or sold to third parties.
        </p>
      </section>
      <section>
        <h2>Storage and access</h2>
        <p>
          Appointment requests are stored using the website&apos;s database and hosting
          providers. Access is intended to be limited to the practitioner and
          authorised technical service providers where necessary to operate the site.
          Internet transmission cannot be guaranteed to be completely risk-free.
        </p>
      </section>
      <section>
        <h2>Payment processing</h2>
        <p>
          Payment is completed on a Razorpay-hosted page. Razorpay receives the
          payment information needed to process the transaction. This website stores
          only administrative details such as the amount, payment-link identifier,
          transaction identifier, and payment status; it does not collect or store
          card numbers, UPI PINs, or banking credentials.
        </p>
      </section>
      <section>
        <h2>Calendar scheduling</h2>
        <p>
          Availability is checked against the practitioner&apos;s Google Calendar. After
          verified payment, a private calendar event containing the appointment time,
          session mode, and an internal booking reference is created. Your optional
          message and detailed concern are not added to the calendar event.
        </p>
      </section>
      <section>
        <h2>Retention and your choices</h2>
        <p>
          Enquiry information is kept only for as long as reasonably needed for
          appointment administration, professional obligations, safety, or legal
          requirements. You may ask about, correct, or request deletion of an enquiry
          record through the contact page, subject to any information that must be retained.
        </p>
      </section>
      <section>
        <h2>Cookies and analytics</h2>
        <p>
          The public website does not intentionally use advertising cookies. A secure
          session cookie is used in the private administrator area. If analytics or
          third-party tools beyond the booking services described here are added later,
          this notice should be updated before use.
        </p>
      </section>
      <section>
        <h2>Urgent or highly sensitive information</h2>
        <p>
          Do not use website forms for emergencies or immediate safety concerns, and
          avoid including detailed clinical records in an initial enquiry. Messages may
          not be seen immediately.
        </p>
      </section>
    </LegalPage>
  );
}
