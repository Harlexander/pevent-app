export type LegalSection = {
  title: string
  subtext: string
}

export type LegalDocument = {
  title: string
  lastUpdated: string
  sections: LegalSection[]
}

export const privacyPolicy: LegalDocument = {
  title: 'Privacy Policy',
  lastUpdated: 'June 2025',
  sections: [
    {
      title: 'Introduction',
      subtext:
        'Pevent ("we", "us", or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy outlines how we collect, use, store, and safeguard your information when you visit or use our platform.\n\nBy using Pevent.ng, you consent to the data practices described in this policy. We may update this Privacy Policy from time to time. Any changes will be posted with an updated "Effective Date." You are encouraged to review this policy regularly.',
    },
    {
      title: 'Information We Collect',
      subtext:
        'We may collect the following categories of information:\n\n\u2022 Personal Data: Name, email, phone number, event information, and preferences\n\u2022 Device Data: IP address, browser type, operating system, access time, and pages visited\n\u2022 Third-Party Data: If you connect your profile to a third-party service\n\u2022 Payment Data: We do not store your card details. All transactions are processed via secure third-party gateways',
    },
    {
      title: 'How We Use Your Information',
      subtext:
        'We use your information to:\n\n\u2022 Register and manage user accounts\n\u2022 Process payments and send ticket confirmations\n\u2022 Support secure voting and ticket validation\n\u2022 Communicate updates, offers, and service notices\n\u2022 Improve platform functionality and security',
    },
    {
      title: 'Legal Basis for Processing',
      subtext:
        'We process your data based on:\n\n\u2022 Your consent\n\u2022 Contractual necessity\n\u2022 Legal compliance\n\u2022 Legitimate interests (e.g., security, analytics, marketing)',
    },
    {
      title: 'Sharing and Disclosure',
      subtext:
        'We do not sell your personal data. We may share data with:\n\n\u2022 Event Organizers, for communication and event management\n\u2022 Service providers like payment processors and cloud services\n\u2022 Law enforcement, when legally obligated',
    },
    {
      title: 'Your Rights',
      subtext:
        'You have the right to:\n\n\u2022 Access, correct, or delete your personal data\n\u2022 Withdraw consent at any time\n\u2022 Object to or restrict data processing\n\u2022 Request data transfer in a machine-readable format',
    },
    {
      title: 'Data Security and Retention',
      subtext:
        'We apply technical and organizational measures to protect your data. However, no system is fully secure. You are responsible for maintaining the confidentiality of your login credentials.\n\nWe retain your data as long as needed for service delivery or legal compliance. You may request deletion unless legally required otherwise.',
    },
    {
      title: 'Cookies and Tracking',
      subtext:
        'We may use cookies and similar technologies to personalize content and analyze traffic. You may adjust your browser settings to block cookies, though some features may not work properly.',
    },
    {
      title: 'International Data Transfers',
      subtext:
        'Your data may be transferred outside Nigeria. We ensure adequate protection in line with Nigerian law and international best practices.',
    },
    {
      title: "Children's Privacy",
      subtext:
        'Pevent is not intended for users under 18. We do not knowingly collect data from children. If you believe we have, contact us to request deletion.',
    },
    {
      title: 'Contact Us',
      subtext: 'For questions, complaints, or requests:\nEmail: info@pevent.ng',
    },
  ],
}

export const termsOfService: LegalDocument = {
  title: 'Terms of Service',
  lastUpdated: 'June 2025',
  sections: [
    {
      title: 'Introduction',
      subtext:
        'By using Pevent.ng, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use the platform or access our services.\n\nThese Terms constitute a legal agreement between:\n\n\u2022 You (the user, event creator, or attendee), and\n\u2022 Pevent.ng, operated by Pevent Technologies Limited ("we," "us," or "our").',
    },
    {
      title: 'Who We Are',
      subtext:
        'Pevent is a platform designed for event ticketing, e-voting, and audience engagement. We facilitate digital ticket sales, audience polling, and real-time event management for creators and attendees.\n\nCompany Name: Pevent Technologies Limited\nRegistered in: Nigeria',
    },
    {
      title: 'Eligibility and Acceptance',
      subtext:
        'By accessing or using the platform, you confirm that:\n\n\u2022 You are at least 18 years old.\n\u2022 You have read and accepted these Terms and our Privacy Policy.\n\u2022 If you use Pevent on behalf of a business or other legal entity, you warrant that you have the authority to bind that entity to these Terms.',
    },
    {
      title: 'Our Services',
      subtext:
        'Pevent offers services including:\n\n\u2022 Online event ticketing with secure e-tickets and QR codes\n\u2022 On-site check-ins and POS integrations\n\u2022 Digital voting and result display tools for events\n\nWe are not responsible for the content, quality, or execution of any event listed on the platform. All contractual relationships regarding events are between the Event Organizer and the Attendee.',
    },
    {
      title: 'Voting Integrity',
      subtext:
        'We provide secure and tamper-proof voting tools. All results published through our platform are generated directly from user input and are not altered or manipulated by us in any way.',
    },
    {
      title: 'Refund Policy',
      subtext:
        'Pevent is a self-service platform that enables Event Organizers to sell tickets directly to Attendees. We are not responsible for the organization, delivery, or quality of any event.\n\n\u2022 Refunds are not guaranteed. They are only issued if the Event Organizer explicitly authorizes the refund and provides a suitable reason.\n\u2022 Pevent service fees are non-refundable under all circumstances.\n\u2022 If an event is cancelled or significantly changed, we may assist in facilitating communication between the Organizer and Attendees, but we are not liable for any refunds.\n\u2022 Attendees must direct all refund requests to the Event Organizer.\n\nBy purchasing a ticket via Pevent.ng, you acknowledge that refunds are subject solely to the Event Organizer\'s discretion.',
    },
    {
      title: 'User Obligations',
      subtext:
        'By using our services, you agree:\n\n\u2022 To provide accurate, updated information\n\u2022 Not to misuse the platform for illegal or harmful purposes\n\u2022 To comply with all applicable laws and third-party rights',
    },
    {
      title: 'Account and Security',
      subtext:
        'You are responsible for maintaining the confidentiality of your login credentials. Notify us immediately of any unauthorized use of your account. We are not liable for losses resulting from compromised accounts due to your negligence.',
    },
    {
      title: 'Intellectual Property',
      subtext:
        'All content on Pevent is protected by copyright and intellectual property laws. You may not copy, reproduce, or distribute any content without our express permission.',
    },
    {
      title: 'Limitations of Liability',
      subtext:
        'Pevent is not liable for:\n\n\u2022 The success, cancellation, or quality of any event\n\u2022 Disputes between attendees and organizers\n\u2022 Indirect or consequential damages\n\nYou agree to use the platform at your own risk.',
    },
    {
      title: 'Termination',
      subtext:
        'We reserve the right to suspend or terminate access to your account at our discretion, with or without notice, for violation of these Terms.',
    },
    {
      title: 'Governing Law',
      subtext:
        'These Terms are governed by the laws of the Federal Republic of Nigeria. Disputes shall first be resolved through good faith negotiation. If unresolved, the matter may be referred to arbitration in Lagos, Nigeria.',
    },
    {
      title: 'Changes to Terms',
      subtext:
        'We may update these Terms at any time. Continued use of the platform after changes are published constitutes your acceptance of the new Terms.',
    },
  ],
}
