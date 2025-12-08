export interface EmailTemplate {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  description: string;
  subject: string;
  content: string;
}

export const emailTemplates: EmailTemplate[] = [
  {
    id: "announcement-1",
    name: "Official Announcement",
    category: "Announcements",
    thumbnail: "📢",
    description: "Professional government announcement template",
    subject: "Important Announcement from LPRES",
    content: `
      <h2 style="color: #064e3b; margin-top: 0;">Official Announcement</h2>
      <p style="font-size: 16px; line-height: 1.8;">Dear Citizens,</p>
      <p style="font-size: 16px; line-height: 1.8;">
        We are pleased to inform you about [Your announcement here]. This initiative is part of our ongoing commitment to serve the community better.
      </p>
      <div style="background: #f0fdf4; border-left: 4px solid #059669; padding: 20px; margin: 25px 0;">
        <p style="margin: 0; font-weight: 600; color: #064e3b;">Key Points:</p>
        <ul style="margin: 10px 0;">
          <li>Point one</li>
          <li>Point two</li>
          <li>Point three</li>
        </ul>
      </div>
      <p style="font-size: 16px; line-height: 1.8;">
        For more information, please visit our office or contact us through our official channels.
      </p>
      <p style="font-size: 16px; line-height: 1.8; margin-top: 30px;">
        Sincerely,<br>
        <strong>LPRES Administration</strong>
      </p>
    `,
  },
  {
    id: "project-update-1",
    name: "Project Update",
    category: "Projects",
    thumbnail: "🏗️",
    description: "Update citizens on ongoing projects",
    subject: "Community Project Update",
    content: `
      <h2 style="color: #064e3b; margin-top: 0;">Project Progress Update</h2>
      <p style="font-size: 16px; line-height: 1.8;">Dear Residents,</p>
      <p style="font-size: 16px; line-height: 1.8;">
        We are excited to share the latest updates on [Project Name]. Our team has been working diligently to ensure timely completion.
      </p>
      <table style="width: 100%; border-collapse: collapse; margin: 25px 0;">
        <tr style="background: #064e3b;">
          <th style="padding: 15px; text-align: left; color: white;">Phase</th>
          <th style="padding: 15px; text-align: left; color: white;">Status</th>
          <th style="padding: 15px; text-align: left; color: white;">Completion</th>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 15px;">Phase 1</td>
          <td style="padding: 15px; color: #059669; font-weight: 600;">Completed</td>
          <td style="padding: 15px;">100%</td>
        </tr>
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 15px;">Phase 2</td>
          <td style="padding: 15px; color: #d97706; font-weight: 600;">In Progress</td>
          <td style="padding: 15px;">65%</td>
        </tr>
        <tr>
          <td style="padding: 15px;">Phase 3</td>
          <td style="padding: 15px; color: #6b7280;">Pending</td>
          <td style="padding: 15px;">0%</td>
        </tr>
      </table>
      <p style="font-size: 16px; line-height: 1.8;">
        Thank you for your patience and continued support.
      </p>
      <p style="font-size: 16px; line-height: 1.8; margin-top: 30px;">
        Best regards,<br>
        <strong>LPRES Project Management Team</strong>
      </p>
    `,
  },
  {
    id: "event-invitation-1",
    name: "Event Invitation",
    category: "Events",
    thumbnail: "🎉",
    description: "Formal invitation to community events",
    subject: "You're Invited: Community Event",
    content: `
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #064e3b; font-size: 32px; margin: 0;">You're Invited!</h1>
        <p style="color: #059669; font-size: 18px; margin: 10px 0;">Join us for an important community event</p>
      </div>
      <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 30px; border-radius: 10px; margin: 25px 0;">
        <h3 style="color: #064e3b; margin-top: 0;">Event Details</h3>
        <p style="margin: 10px 0;"><strong>📅 Date:</strong> [Event Date]</p>
        <p style="margin: 10px 0;"><strong>🕐 Time:</strong> [Event Time]</p>
        <p style="margin: 10px 0;"><strong>📍 Location:</strong> [Event Location]</p>
        <p style="margin: 10px 0;"><strong>👥 Expected Attendees:</strong> Community Leaders & Residents</p>
      </div>
      <p style="font-size: 16px; line-height: 1.8;">
        This event is an opportunity for us to come together and discuss important matters affecting our community. Your presence and input are highly valued.
      </p>
      <div style="text-align: center; margin: 35px 0;">
        <a href="#" style="display: inline-block; padding: 15px 40px; background-color: #059669; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">Confirm Attendance</a>
      </div>
      <p style="font-size: 16px; line-height: 1.8;">
        We look forward to seeing you there!
      </p>
    `,
  },
  {
    id: "emergency-alert-1",
    name: "Emergency Alert",
    category: "Alerts",
    thumbnail: "⚠️",
    description: "Critical emergency notifications",
    subject: "URGENT: Emergency Alert",
    content: `
      <div style="background: #fef2f2; border: 3px solid #dc2626; padding: 20px; border-radius: 10px; margin-bottom: 25px;">
        <h2 style="color: #dc2626; margin: 0 0 15px 0; display: flex; align-items: center;">
          <span style="font-size: 32px; margin-right: 10px;">⚠️</span>
          URGENT ALERT
        </h2>
        <p style="font-size: 18px; font-weight: 600; color: #991b1b; margin: 0;">
          Immediate action may be required
        </p>
      </div>
      <p style="font-size: 16px; line-height: 1.8; font-weight: 600;">
        Dear Residents,
      </p>
      <p style="font-size: 16px; line-height: 1.8;">
        We are issuing this emergency notification regarding [Emergency Description]. Please read this message carefully and follow the instructions below.
      </p>
      <div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 20px; margin: 25px 0;">
        <h3 style="color: #92400e; margin-top: 0;">Immediate Actions Required:</h3>
        <ol style="margin: 10px 0; color: #78350f;">
          <li style="margin: 10px 0;">Action item one</li>
          <li style="margin: 10px 0;">Action item two</li>
          <li style="margin: 10px 0;">Action item three</li>
        </ol>
      </div>
      <p style="font-size: 16px; line-height: 1.8;">
        <strong>Emergency Contact:</strong> [Phone Number]<br>
        <strong>Available:</strong> 24/7
      </p>
      <p style="font-size: 16px; line-height: 1.8;">
        Stay safe and follow official guidance.
      </p>
    `,
  },
  {
    id: "newsletter-monthly",
    name: "Monthly Newsletter",
    category: "Newsletters",
    thumbnail: "📰",
    description: "Monthly community newsletter template",
    subject: "LPRES Monthly Newsletter - [Month Year]",
    content: `
      <h1 style="color: #064e3b; text-align: center; margin-top: 0;">Monthly Newsletter</h1>
      <p style="text-align: center; color: #059669; font-size: 18px; margin-bottom: 30px;">[Month Year]</p>
      
      <h2 style="color: #064e3b; border-bottom: 3px solid #059669; padding-bottom: 10px;">📌 Highlights This Month</h2>
      <p style="font-size: 16px; line-height: 1.8;">
        Welcome to this month's newsletter! Here's what's been happening in our community.
      </p>
      
      <div style="background: #f0fdf4; padding: 25px; border-radius: 10px; margin: 25px 0;">
        <h3 style="color: #064e3b; margin-top: 0;">🎯 Key Achievements</h3>
        <ul style="line-height: 2;">
          <li>Achievement one</li>
          <li>Achievement two</li>
          <li>Achievement three</li>
        </ul>
      </div>
      
      <h2 style="color: #064e3b; border-bottom: 3px solid #059669; padding-bottom: 10px;">📊 Statistics</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 15px; margin: 25px 0;">
        <div style="flex: 1; min-width: 200px; background: #ecfdf5; padding: 20px; border-radius: 8px; text-align: center;">
          <p style="font-size: 36px; font-weight: 700; color: #059669; margin: 0;">150+</p>
          <p style="color: #064e3b; margin: 10px 0 0 0;">Projects Completed</p>
        </div>
        <div style="flex: 1; min-width: 200px; background: #ecfdf5; padding: 20px; border-radius: 8px; text-align: center;">
          <p style="font-size: 36px; font-weight: 700; color: #059669; margin: 0;">5,000+</p>
          <p style="color: #064e3b; margin: 10px 0 0 0;">Citizens Served</p>
        </div>
      </div>
      
      <h2 style="color: #064e3b; border-bottom: 3px solid #059669; padding-bottom: 10px;">📅 Upcoming Events</h2>
      <p style="font-size: 16px; line-height: 1.8;">
        Mark your calendars for these upcoming events...
      </p>
    `,
  },
  {
    id: "policy-update",
    name: "Policy Update",
    category: "Policy",
    thumbnail: "📋",
    description: "Official policy change notifications",
    subject: "Policy Update: [Policy Name]",
    content: `
      <h2 style="color: #064e3b; margin-top: 0;">Policy Update Notification</h2>
      <p style="font-size: 16px; line-height: 1.8;">Dear Stakeholders,</p>
      <p style="font-size: 16px; line-height: 1.8;">
        We are writing to inform you of important updates to [Policy Name]. These changes take effect on [Effective Date].
      </p>
      
      <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 25px 0;">
        <h3 style="color: #1e40af; margin-top: 0;">Summary of Changes</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #bfdbfe;">
            <td style="padding: 10px; font-weight: 600;">Previous Policy</td>
            <td style="padding: 10px; font-weight: 600;">New Policy</td>
          </tr>
          <tr style="border-bottom: 1px solid #bfdbfe;">
            <td style="padding: 10px;">[Old policy text]</td>
            <td style="padding: 10px; color: #059669;">[New policy text]</td>
          </tr>
        </table>
      </div>
      
      <h3 style="color: #064e3b;">Rationale for Changes</h3>
      <p style="font-size: 16px; line-height: 1.8;">
        These updates are designed to [explain reasoning here].
      </p>
      
      <h3 style="color: #064e3b;">What This Means for You</h3>
      <p style="font-size: 16px; line-height: 1.8;">
        [Explain impact on stakeholders]
      </p>
      
      <div style="text-align: center; margin: 35px 0;">
        <a href="#" style="display: inline-block; padding: 15px 40px; background-color: #059669; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">View Full Policy Document</a>
      </div>
    `,
  },
  {
    id: "survey-request",
    name: "Survey Request",
    category: "Engagement",
    thumbnail: "📝",
    description: "Community feedback and survey template",
    subject: "We Value Your Opinion - Community Survey",
    content: `
      <h2 style="color: #064e3b; margin-top: 0; text-align: center;">Your Opinion Matters!</h2>
      <p style="font-size: 16px; line-height: 1.8; text-align: center;">
        Help us serve you better by participating in our community survey
      </p>
      
      <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 30px; border-radius: 10px; margin: 25px 0; text-align: center;">
        <h3 style="color: #064e3b; margin-top: 0;">Survey Details</h3>
        <p style="margin: 15px 0;"><strong>Duration:</strong> 5-10 minutes</p>
        <p style="margin: 15px 0;"><strong>Deadline:</strong> [Survey Deadline]</p>
        <p style="margin: 15px 0;"><strong>Purpose:</strong> Improve community services</p>
      </div>
      
      <p style="font-size: 16px; line-height: 1.8;">
        Dear Community Members,
      </p>
      <p style="font-size: 16px; line-height: 1.8;">
        We are conducting a survey to understand your needs better and improve our services. Your feedback is crucial in helping us make informed decisions.
      </p>
      
      <h3 style="color: #064e3b;">Topics Covered:</h3>
      <ul style="line-height: 2; font-size: 16px;">
        <li>Service quality and accessibility</li>
        <li>Community infrastructure needs</li>
        <li>Communication effectiveness</li>
        <li>Future project priorities</li>
      </ul>
      
      <div style="text-align: center; margin: 35px 0;">
        <a href="#" style="display: inline-block; padding: 15px 40px; background-color: #059669; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">Take Survey Now</a>
      </div>
      
      <p style="font-size: 16px; line-height: 1.8; text-align: center; color: #6b7280;">
        All responses are confidential and will be used solely for improving our services.
      </p>
    `,
  },
  {
    id: "service-reminder",
    name: "Service Reminder",
    category: "Reminders",
    thumbnail: "⏰",
    description: "Deadline and service reminders",
    subject: "Reminder: [Service/Deadline Name]",
    content: `
      <div style="text-align: center; margin-bottom: 30px;">
        <span style="font-size: 64px;">⏰</span>
        <h2 style="color: #064e3b; margin: 15px 0 0 0;">Important Reminder</h2>
      </div>
      
      <p style="font-size: 16px; line-height: 1.8;">Dear Resident,</p>
      <p style="font-size: 16px; line-height: 1.8;">
        This is a friendly reminder about [Service/Requirement Name].
      </p>
      
      <div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 25px; border-radius: 10px; margin: 25px 0;">
        <h3 style="color: #92400e; margin-top: 0; display: flex; align-items: center;">
          <span style="font-size: 24px; margin-right: 10px;">📌</span>
          Key Information
        </h3>
        <p style="margin: 10px 0;"><strong>Deadline:</strong> [Deadline Date]</p>
        <p style="margin: 10px 0;"><strong>Required Action:</strong> [Action Required]</p>
        <p style="margin: 10px 0;"><strong>Office Hours:</strong> Monday - Friday, 8:00 AM - 5:00 PM</p>
      </div>
      
      <h3 style="color: #064e3b;">How to Complete:</h3>
      <ol style="line-height: 2; font-size: 16px;">
        <li>Step one</li>
        <li>Step two</li>
        <li>Step three</li>
      </ol>
      
      <p style="font-size: 16px; line-height: 1.8;">
        <strong>Need Help?</strong><br>
        Contact our office at [Phone Number] or visit us at [Office Address].
      </p>
      
      <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin-top: 25px;">
        <p style="margin: 0; text-align: center; color: #064e3b;">
          <strong>Don't delay!</strong> Complete this before the deadline to avoid any inconvenience.
        </p>
      </div>
    `,
  },
  {
    id: "welcome-new-resident",
    name: "Welcome New Resident",
    category: "Welcome",
    thumbnail: "👋",
    description: "Welcome message for new community members",
    subject: "Welcome to Our Community!",
    content: `
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #064e3b; font-size: 36px; margin: 0;">Welcome!</h1>
        <p style="color: #059669; font-size: 20px; margin: 15px 0;">We're thrilled to have you in our community</p>
      </div>
      
      <p style="font-size: 16px; line-height: 1.8;">Dear New Resident,</p>
      <p style="font-size: 16px; line-height: 1.8;">
        On behalf of LPRES Administration, we extend a warm welcome to you and your family. We're excited to have you as part of our growing community!
      </p>
      
      <h3 style="color: #064e3b; margin-top: 30px;">🎯 Getting Started</h3>
      <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h4 style="color: #064e3b; margin-top: 0;">Essential Services</h4>
        <ul style="line-height: 2;">
          <li><strong>Registration:</strong> Visit our office to complete registration</li>
          <li><strong>ID Cards:</strong> Obtain your resident ID within 30 days</li>
          <li><strong>Utilities:</strong> Connect water, electricity, and other services</li>
        </ul>
      </div>
      
      <h3 style="color: #064e3b;">📍 Important Locations</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background: #f9fafb; border: 1px solid #e5e7eb;">
          <td style="padding: 15px; font-weight: 600;">LPRES Office</td>
          <td style="padding: 15px;">[Office Address]</td>
        </tr>
        <tr style="border: 1px solid #e5e7eb;">
          <td style="padding: 15px; font-weight: 600;">Contact Number</td>
          <td style="padding: 15px;">[Phone Number]</td>
        </tr>
        <tr style="background: #f9fafb; border: 1px solid #e5e7eb;">
          <td style="padding: 15px; font-weight: 600;">Email</td>
          <td style="padding: 15px;">[Email Address]</td>
        </tr>
      </table>
      
      <div style="text-align: center; margin: 35px 0;">
        <a href="#" style="display: inline-block; padding: 15px 40px; background-color: #059669; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">Download Welcome Guide</a>
      </div>
      
      <p style="font-size: 16px; line-height: 1.8;">
        We're here to help make your transition smooth. Don't hesitate to reach out if you have any questions!
      </p>
    `,
  },
  {
    id: "success-story",
    name: "Success Story",
    category: "Stories",
    thumbnail: "⭐",
    description: "Showcase community achievements",
    subject: "Community Success Story: [Title]",
    content: `
      <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
        <span style="font-size: 64px;">⭐</span>
        <h1 style="color: #78350f; margin: 15px 0 0 0;">Success Story</h1>
      </div>
      
      <h2 style="color: #064e3b; margin-top: 0;">[Success Story Title]</h2>
      <p style="font-size: 16px; line-height: 1.8;">
        We are proud to share this inspiring story from our community that demonstrates the power of collaboration and determination.
      </p>
      
      <div style="background: #f0fdf4; padding: 25px; border-left: 4px solid #059669; margin: 25px 0;">
        <h3 style="color: #064e3b; margin-top: 0;">The Challenge</h3>
        <p style="font-size: 16px; line-height: 1.8; margin: 0;">
          [Describe the initial challenge or problem]
        </p>
      </div>
      
      <div style="background: #eff6ff; padding: 25px; border-left: 4px solid #3b82f6; margin: 25px 0;">
        <h3 style="color: #1e40af; margin-top: 0;">The Solution</h3>
        <p style="font-size: 16px; line-height: 1.8; margin: 0;">
          [Describe how the challenge was addressed]
        </p>
      </div>
      
      <div style="background: #fef3c7; padding: 25px; border-left: 4px solid #f59e0b; margin: 25px 0;">
        <h3 style="color: #92400e; margin-top: 0;">The Impact</h3>
        <p style="font-size: 16px; line-height: 1.8; margin: 0;">
          [Describe the positive outcomes and impact]
        </p>
      </div>
      
      <blockquote style="border-left: 4px solid #059669; padding-left: 20px; margin: 30px 0; font-style: italic; color: #4b5563;">
        "[Include a quote from someone involved]"
        <br><br>
        <strong style="font-style: normal;">- [Name, Title]</strong>
      </blockquote>
      
      <p style="font-size: 16px; line-height: 1.8;">
        This success story inspires us to continue working together for the betterment of our community. Together, we can achieve great things!
      </p>
    `,
  },
  {
    id: "seasonal-greetings",
    name: "Seasonal Greetings",
    category: "Greetings",
    thumbnail: "🎊",
    description: "Holiday and seasonal greetings",
    subject: "Season's Greetings from LPRES",
    content: `
      <div style="text-align: center; background: linear-gradient(135deg, #064e3b 0%, #059669 100%); padding: 40px; border-radius: 10px; margin-bottom: 30px;">
        <span style="font-size: 64px;">🎊</span>
        <h1 style="color: white; margin: 15px 0; font-size: 32px;">Season's Greetings!</h1>
        <p style="color: #d1fae5; font-size: 18px; margin: 0;">From all of us at LPRES Administration</p>
      </div>
      
      <p style="font-size: 16px; line-height: 1.8;">Dear Community Members,</p>
      <p style="font-size: 16px; line-height: 1.8;">
        As we celebrate this special season, we want to take a moment to express our heartfelt gratitude for your continued support and engagement with LPRES Administration.
      </p>
      
      <div style="background: #f0fdf4; padding: 30px; border-radius: 10px; margin: 25px 0; text-align: center;">
        <h3 style="color: #064e3b; margin-top: 0;">This Year's Achievements</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px; justify-content: center;">
          <div style="flex: 1; min-width: 150px;">
            <p style="font-size: 42px; font-weight: 700; color: #059669; margin: 0;">200+</p>
            <p style="color: #064e3b; margin: 10px 0 0 0;">Projects</p>
          </div>
          <div style="flex: 1; min-width: 150px;">
            <p style="font-size: 42px; font-weight: 700; color: #059669; margin: 0;">10K+</p>
            <p style="color: #064e3b; margin: 10px 0 0 0;">Citizens Served</p>
          </div>
          <div style="flex: 1; min-width: 150px;">
            <p style="font-size: 42px; font-weight: 700; color: #059669; margin: 0;">50+</p>
            <p style="color: #064e3b; margin: 10px 0 0 0;">Events Held</p>
          </div>
        </div>
      </div>
      
      <p style="font-size: 16px; line-height: 1.8;">
        None of this would have been possible without your active participation and support. Thank you for making our community stronger!
      </p>
      
      <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 25px; border-radius: 10px; margin: 25px 0; text-align: center;">
        <h3 style="color: #78350f; margin-top: 0;">Looking Ahead</h3>
        <p style="color: #92400e; font-size: 16px; line-height: 1.8; margin: 0;">
          We're excited about the opportunities that lie ahead and look forward to continuing to serve you in the coming year.
        </p>
      </div>
      
      <p style="font-size: 16px; line-height: 1.8; text-align: center;">
        <strong>May this season bring you joy, peace, and prosperity!</strong>
      </p>
      
      <p style="font-size: 16px; line-height: 1.8; text-align: center; margin-top: 30px;">
        Warm regards,<br>
        <strong>The Entire LPRES Team</strong>
      </p>
    `,
  },
  {
    id: "budget-transparency",
    name: "Budget Report",
    category: "Financial",
    thumbnail: "💰",
    description: "Transparent financial reporting template",
    subject: "Budget Report: [Period]",
    content: `
      <h2 style="color: #064e3b; margin-top: 0;">Financial Transparency Report</h2>
      <p style="font-size: 14px; color: #6b7280; margin: 0 0 25px 0;">[Reporting Period]</p>
      
      <p style="font-size: 16px; line-height: 1.8;">Dear Stakeholders,</p>
      <p style="font-size: 16px; line-height: 1.8;">
        In our commitment to transparency and accountability, we present this financial report detailing how public funds have been allocated and utilized.
      </p>
      
      <div style="background: #eff6ff; padding: 25px; border-radius: 10px; margin: 25px 0;">
        <h3 style="color: #1e40af; margin-top: 0;">Budget Overview</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 2px solid #3b82f6;">
            <th style="text-align: left; padding: 15px; color: #1e40af;">Category</th>
            <th style="text-align: right; padding: 15px; color: #1e40af;">Allocated</th>
            <th style="text-align: right; padding: 15px; color: #1e40af;">Spent</th>
            <th style="text-align: right; padding: 15px; color: #1e40af;">%</th>
          </tr>
          <tr style="border-bottom: 1px solid #bfdbfe;">
            <td style="padding: 15px;">Infrastructure</td>
            <td style="text-align: right; padding: 15px;">₦50M</td>
            <td style="text-align: right; padding: 15px;">₦45M</td>
            <td style="text-align: right; padding: 15px; color: #059669; font-weight: 600;">90%</td>
          </tr>
          <tr style="border-bottom: 1px solid #bfdbfe;">
            <td style="padding: 15px;">Education</td>
            <td style="text-align: right; padding: 15px;">₦30M</td>
            <td style="text-align: right; padding: 15px;">₦28M</td>
            <td style="text-align: right; padding: 15px; color: #059669; font-weight: 600;">93%</td>
          </tr>
          <tr style="border-bottom: 1px solid #bfdbfe;">
            <td style="padding: 15px;">Healthcare</td>
            <td style="text-align: right; padding: 15px;">₦25M</td>
            <td style="text-align: right; padding: 15px;">₦22M</td>
            <td style="text-align: right; padding: 15px; color: #059669; font-weight: 600;">88%</td>
          </tr>
          <tr style="background: #f0fdf4; font-weight: 600;">
            <td style="padding: 15px;">Total</td>
            <td style="text-align: right; padding: 15px;">₦105M</td>
            <td style="text-align: right; padding: 15px;">₦95M</td>
            <td style="text-align: right; padding: 15px; color: #059669;">90%</td>
          </tr>
        </table>
      </div>
      
      <h3 style="color: #064e3b;">Key Achievements</h3>
      <ul style="line-height: 2; font-size: 16px;">
        <li>Completed 15 infrastructure projects</li>
        <li>Renovated 8 schools</li>
        <li>Upgraded 3 health centers</li>
      </ul>
      
      <div style="text-align: center; margin: 35px 0;">
        <a href="#" style="display: inline-block; padding: 15px 40px; background-color: #059669; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">View Full Report</a>
      </div>
      
      <p style="font-size: 14px; line-height: 1.6; color: #6b7280; background: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 25px;">
        <strong>Note:</strong> This report has been audited by independent auditors. Full documentation is available upon request at our office.
      </p>
    `,
  },
];

export const getTemplatesByCategory = (category: string) => {
  return emailTemplates.filter((template) => template.category === category);
};

export const getAllCategories = () => {
  const categories = new Set(emailTemplates.map((t) => t.category));
  return Array.from(categories);
};
