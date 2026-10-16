import React from 'react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <article className="bg-white px-4 py-12 text-[#171717] sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Privacy Policy</h1>

        <div className="mt-8 space-y-8 text-sm leading-7 text-[#525252] sm:text-base">
          <p>
            <strong className="font-bold text-[#171717]">TRUSTY YELLOW CAB DRIVER</strong> ("we", "our", or "the Company") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect information when you use the <strong className="font-bold text-[#171717]">TRUSTY YELLOW CAB DRIVER</strong> mobile application.
          </p>

          <section>
            <h2 className="text-xl font-extrabold text-[#171717] sm:text-2xl">1.Information We Collect</h2>
            <p className="mt-3">We may collect the following information:</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Driver Name</li>
              <li>Driver ID</li>
              <li>Mobile Number</li>
              <li>Vehicle Number</li>
              <li>Vehicle Category</li>
              <li>Driver Photograph</li>
              <li>Driving License and Vehicle Documents (if provided)</li>
              <li>Location Information (GPS)</li>
              <li>Trip Information and Trip History</li>
              <li>Device Information required for app functionality</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#171717] sm:text-2xl">2.Location Information</h2>
            <p className="mt-3">The application may collect location information while the app is in use for:</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Trip allocation and dispatch services</li>
              <li>Driver tracking during active trips</li>
              <li>Route monitoring and trip management</li>
              <li>Improving service quality and operational efficiency</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#171717] sm:text-2xl">3.How We Use Information</h2>
            <p className="mt-3">We use collected information to:</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Verify driver accounts</li>
              <li>Manage driver profiles</li>
              <li>Allocate and manage trips</li>
              <li>Provide dispatch services</li>
              <li>Generate trip records and reports</li>
              <li>Communicate important service updates</li>
              <li>Improve application performance and security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#171717] sm:text-2xl">4.Information Sharing</h2>
            <p className="mt-3">We do not sell personal information.</p>
            <p className="mt-3">Information may be shared only:</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>When required by law or government authorities</li>
              <li>To protect the safety and security of users and the platform</li>
              <li>With authorized service providers supporting app operations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#171717] sm:text-2xl">5.Data Storage and Security</h2>
            <p className="mt-3">We take reasonable measures to protect collected information from unauthorized access, misuse, alteration, or disclosure.</p>
            <p className="mt-3 italic">However, no electronic storage system can be guaranteed to be 100% secure.</p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#171717] sm:text-2xl">6.Driver Responsibilities</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Drivers are responsible for maintaining accurate information and protecting their account credentials.</li>
              <li>Drivers must not share login access with unauthorized persons.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#171717] sm:text-2xl">7.Retention of Information</h2>
            <p className="mt-3">Driver and trip-related information may be retained as required for operational, legal, compliance, audit, and business purposes.</p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#171717] sm:text-2xl">8.Third-Party Services</h2>
            <p className="mt-3">The application may use third-party services such as:</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Google Play Services</li>
              <li>Google Maps Services</li>
            </ul>
            <p className="mt-3">These services may collect information according to their own privacy policies.</p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#171717] sm:text-2xl">9.Your Rights</h2>
            <p className="mt-3">Drivers may request correction of inaccurate profile information by contacting the company.</p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#171717] sm:text-2xl">10.Changes to this Privacy Policy</h2>
            <p className="mt-3">We may update this Privacy Policy from time to time. Continued use of the application after updates constitutes acceptance of the revised policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#171717] sm:text-2xl">11.Contact Information</h2>
            <div className="mt-3 space-y-1">
              <p><strong className="font-bold text-[#171717]">TRUSTY YELLOW CAB</strong></p>
              <p>Website: <a href="https://www.trustyyellowcabs.in/" className="text-[#171717] underline decoration-[#FFC107] underline-offset-4 hover:text-[#FFB300]">https://www.trustyyellowcabs.in</a></p>
              <p>Email: <a href="mailto:trustyyellowcabs@gmail.com" className="text-[#171717] underline decoration-[#FFC107] underline-offset-4 hover:text-[#FFB300]">trustyyellowcabs@gmail.com</a></p>
              <p>Location: Coimbatore, Tamil Nadu, India</p>
            </div>
          </section>

          <p className="font-bold text-[#171717]">By using the TRUSTY YELLOW CAB DRIVER application, you acknowledge that you have read and understood this Privacy Policy.</p>
        </div>
      </div>
    </article>
  );
};

export default PrivacyPolicy;
