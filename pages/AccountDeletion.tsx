import React from 'react';

const deletionRequestEmail = 'mailto:trustyyellowcabs@gmail.com?subject=Account%20Deletion%20Request%20-%20TRUSTY%20YELLOW%20CAB%20DRIVER&body=Hello%20Trusty%20Yellow%20Cab%20Team%2C%0A%0AI%20would%20like%20to%20request%20the%20deletion%20of%20my%20driver%20account%20and%20associated%20personal%20information.%0A%0ADriver%20ID%3A%20%0ADriver%20Name%3A%20%0ARegistered%20Mobile%20Number%3A%20%0AReason%20(optional)%3A%20%0A%0AThank%20you.';

export const AccountDeletion: React.FC = () => {
  return (
    <article className="bg-white px-4 py-12 text-[#171717] sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Account Deletion Request</h1>

        <div className="mt-8 space-y-8 text-sm leading-7 text-[#525252] sm:text-base">
          <p>
            <strong className="font-bold text-[#171717]">TRUSTY YELLOW CAB DRIVER</strong> allows drivers to request deletion of their account and associated personal information.
          </p>

          <section>
            <h2 className="text-xl font-extrabold text-[#171717] sm:text-2xl">How to Request Account Deletion</h2>
            <p className="mt-3">To request deletion of your driver account, please contact us using one of the methods below:</p>
            <p className="mt-3"><strong className="font-bold text-[#171717]">Email: </strong><a href="mailto:trustyyellowcabs@gmail.com" className="text-[#171717] underline decoration-[#FFC107] underline-offset-4 hover:text-[#FFB300]"><strong className="font-bold">trustyyellowcabs@gmail.com</strong></a></p>
            <p className="mt-3 font-bold text-[#171717]">Please include:</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Driver ID</li>
              <li>Driver Name</li>
              <li>Registered Mobile Number</li>
              <li>Request for Account Deletion</li>
            </ul>
            <a href={deletionRequestEmail} className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#FFC107] px-5 py-3 text-center text-sm font-bold text-[#171717] transition-colors hover:bg-[#FFB300]">
              Compose Deletion Request Email
            </a>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#171717] sm:text-2xl">What Will Be Deleted</h2>
            <p className="mt-3">Upon successful verification and approval of your request, we may delete:</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Driver Profile Information</li>
              <li>Driver Login Access</li>
              <li>Driver Photograph</li>
              <li>Vehicle Information</li>
              <li>Account-related Personal Information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#171717] sm:text-2xl">What May Be Retained</h2>
            <p className="mt-3">Certain information may be retained where required by law, regulatory requirements, fraud prevention, dispute resolution, audit purposes, tax compliance, or legitimate business obligations.</p>
            <p className="mt-3 font-bold text-[#171717]">Examples may include:</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Trip Records</li>
              <li>Billing Records</li>
              <li>Financial Transaction Records</li>
              <li>Compliance Logs</li>
              <li>Legal Records</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#171717] sm:text-2xl">Processing Time</h2>
            <p className="mt-3">Account deletion requests are generally processed within <strong className="font-bold text-[#171717]">7 to 30 business days</strong> after successful verification.</p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#171717] sm:text-2xl">Effect of Deletion</h2>
            <p className="mt-3 font-bold text-[#171717]">Once the account is deleted:</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Login access will be disabled.</li>
              <li>Driver services will no longer be available.</li>
              <li>Deleted information may not be recoverable.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-[#171717] sm:text-2xl">Contact Information</h2>
            <div className="mt-3 space-y-1">
              <p><strong className="font-bold text-[#171717]">TRUSTY YELLOW CAB</strong></p>
              <p>Email: <a href="mailto:trustyyellowcabs@gmail.com" className="text-[#171717] underline decoration-[#FFC107] underline-offset-4 hover:text-[#FFB300]">trustyyellowcabs@gmail.com</a></p>
              <p>Website: <a href="https://www.trustyyellowcabs.in/" className="text-[#171717] underline decoration-[#FFC107] underline-offset-4 hover:text-[#FFB300]">https://www.trustyyellowcabs.in</a></p>
              <p>Location: Coimbatore, Tamil Nadu, India</p>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
};

export default AccountDeletion;
