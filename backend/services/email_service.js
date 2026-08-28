const nodemailer = require('nodemailer');
const path = require('path');

const MAIL = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  user: 'tech@helpdesksupport.co.in',
  pass: 'qwhgiwyidqrktgqw',
  from: 'tech@helpdesksupport.co.in',
  contactTo: 'bdrefexairport@refex.co.in',
};

function smtpFromAddress() {
  return MAIL.from;
}

function contactFormToAddress() {
  return MAIL.contactTo;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildSmtpTransportOptions() {
  return {
    host: MAIL.host,
    port: MAIL.port,
    secure: MAIL.secure,
    requireTLS: MAIL.port === 587,
    auth: {
      user: MAIL.user,
      pass: MAIL.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  };
}

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport(buildSmtpTransportOptions());
  }

  // Send contact form email
  async sendContactFormEmail(formData) {
    try {
      const { name, email, phone, company, message, attachment } = formData;
      const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      const from = smtpFromAddress();
      const to = contactFormToAddress();
      const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');
      const attachmentName = attachment?.originalName || '';

      const mailOptions = {
        from: from ? `"Refex Airports" <${from}>` : '"Refex Airports"',
        to,
        replyTo: email,
        subject: `New contact enquiry from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <div style="background: linear-gradient(135deg, #2879b1, #7bbf45); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
              <h2 style="margin: 0; font-size: 24px;">New Contact Form Submission</h2>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Refex Airports website</p>
            </div>
            <div style="padding: 30px; background: #f9f9f9;">
              <div style="background: white; padding: 25px; border-radius: 8px;">
                <h3 style="color: #2879b1; margin-top: 0; border-bottom: 2px solid #2879b1; padding-bottom: 10px;">Contact Details</h3>
                <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                <p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
                <p><strong>Organization:</strong> ${escapeHtml(company || 'Not provided')}</p>
                ${attachmentName ? `<p><strong>Attachment:</strong> ${escapeHtml(attachmentName)}</p>` : ''}
                <p><strong>Message:</strong></p>
                <div style="background: #f8f8f8; padding: 15px; border-radius: 5px; border-left: 4px solid #2879b1; color: #555; line-height: 1.6;">
                  ${safeMessage}
                </div>
              </div>
              <p style="margin-top: 20px; color: #666; font-size: 13px;">Submitted: ${escapeHtml(submittedAt)}</p>
            </div>
          </div>
        `,
        text: `New contact enquiry from the Refex Airports website

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Organization: ${company || 'Not provided'}
${attachmentName ? `Attachment: ${attachmentName}\n` : ''}
Message:
${message}

Submitted: ${submittedAt}
`,
      };

      if (attachment?.path) {
        mailOptions.attachments = [
          {
            filename: attachment.originalName || path.basename(attachment.path),
            path: attachment.path,
          },
        ];
      }

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Contact form email sent:', result.messageId, 'to', to);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Error sending contact form email:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  // Send auto-reply to customer
  async sendAutoReply(customerEmail, customerName) {
    try {
      const mailOptions = {
        from: smtpFromAddress(),
        to: customerEmail,
        subject: 'Thank you for contacting Refex Life Sciences',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #2879b6, #7dc244); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h2 style="margin: 0; font-size: 28px;">Thank You!</h2>
              <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">We've received your message</p>
            </div>
            
            <div style="padding: 30px; background: #f9f9f9;">
              <div style="background: white; padding: 25px; border-radius: 8px;">
                <p style="color: #333; font-size: 16px; line-height: 1.6;">
                  Dear ${customerName},
                </p>
                
                <p style="color: #666; font-size: 15px; line-height: 1.6;">
                  Thank you for reaching out to Refex Life Sciences. We have received your inquiry and our team will review it carefully.
                </p>
                
                <p style="color: #666; font-size: 15px; line-height: 1.6;">
                  We typically respond to all inquiries within 24 hours during business days. If your inquiry is urgent, please call us directly at <strong>+91-44-43405900</strong>.
                </p>
                
                <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2879b6;">
                  <h4 style="color: #2879b6; margin-top: 0;">What happens next?</h4>
                  <ul style="color: #666; padding-left: 20px;">
                    <li>Our team will review your inquiry</li>
                    <li>We'll assign it to the appropriate department</li>
                    <li>You'll receive a detailed response within 24 hours</li>
                    <li>If needed, we'll schedule a follow-up call</li>
                  </ul>
                </div>
                
                <p style="color: #666; font-size: 15px; line-height: 1.6;">
                  In the meantime, feel free to explore our website to learn more about our pharmaceutical services and capabilities.
                </p>
                
                <p style="color: #333; font-size: 15px; line-height: 1.6;">
                  Best regards,<br>
                  <strong>The Refex Life Sciences Team</strong>
                </p>
              </div>
            </div>
            
            <div style="text-align: center; padding: 20px; background: #f0f0f0; border-radius: 0 0 10px 10px;">
              <p style="margin: 0; color: #666; font-size: 14px;">
                Refex Life Sciences | Transforming Healthcare Through Innovation
              </p>
              <p style="margin: 5px 0 0 0; color: #999; font-size: 12px;">
                2nd Floor, No.313, Refex Towers, Sterling Road, Valluvar Kottam High Road,<br>
                Nungambakkam, Chennai – 600034, Tamil Nadu, India
              </p>
            </div>
          </div>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Auto-reply sent successfully:', result.messageId);
      
      return {
        success: true,
        messageId: result.messageId,
        message: 'Auto-reply sent successfully'
      };

    } catch (error) {
      console.error('Error sending auto-reply:', error);
      throw new Error(`Failed to send auto-reply: ${error.message}`);
    }
  }

  // Send business commute form email
  async sendBusinessCommuteEmail(formData) {
    try {
      const {
        name,
        companyName,
        email,
        phone,
        department,
        regions,
        numberOfEmployees,
        comment,
        ipAddress
      } = formData;

      const regionsText = Array.isArray(regions) ? regions.join(', ') : regions;

      const mailOptions = {
        from: `"Refex Mobility" <refexmobility@refex.co.in>`,
        to: 'refexmobility@refex.co.in',
        replyTo: email,
        subject: `Business Commute Enquiry - ${name}`,
        html: `
          <h2>Business Commute Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Company:</strong> ${companyName || 'Not provided'}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Department:</strong> ${department || 'Not provided'}</p>
          <p><strong>Regions:</strong> ${regionsText || 'Not provided'}</p>
          <p><strong>No. of Employees:</strong> ${numberOfEmployees || 'Not provided'}</p>
          <p><strong>Comment:</strong> ${comment || 'N/A'}</p>
          <hr>
          <p><strong>IP Address:</strong> ${ipAddress || 'N/A'}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
        `
      };

      await this.transporter.sendMail(mailOptions);
      return { success: true };
    } catch (error) {
      console.error('Business commute email error:', error);
      throw new Error('Failed to send business commute email');
    }
  }

  async sendWallForgotPasswordEmail({ toEmail, name, password }) {
    try {
      const displayName = name || "there";
      const from = smtpFromAddress();

      const mailOptions = {
        from: from ? `"Refex 30×30 Wall" <${from}>` : '"Refex 30×30 Wall"',
        to: toEmail,
        subject: "Your Refex Wall password",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #b8860b; margin-top: 0;">Refex Wall — password reminder</h2>
            <p style="color: #333; line-height: 1.6;">Hi ${displayName},</p>
            <p style="color: #333; line-height: 1.6;">
              You requested your Wall sign-in password. Use the password below to sign in at The Wall:
            </p>
            <p style="margin: 24px 0; padding: 16px 20px; background: #fffbeb; border: 1px solid #fcd34d; border-radius: 8px; font-size: 18px; font-weight: bold; letter-spacing: 0.05em; color: #92400e;">
              ${password}
            </p>
            <p style="color: #666; font-size: 14px; line-height: 1.6;">
              For security, change this password after signing in if your organisation allows it.
              If you did not request this email, contact your administrator.
            </p>
            <p style="color: #999; font-size: 12px; margin-top: 32px;">
              Refex 30×30 — The Wall
            </p>
          </div>
        `,
        text: `Hi ${displayName},\n\nYour Refex Wall password: ${password}\n\nSign in at The Wall with your work email and this password.\n`,
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log("Wall forgot-password email sent:", result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error("Wall forgot-password email error:", error);
      throw new Error("Failed to send password email");
    }
  }

  // Test email configuration
  async testConnection() {
    try {
      await this.transporter.verify();
      console.log('Email service connection verified successfully');
      return true;
    } catch (error) {
      console.error('Email service connection failed:', error);
      return false;
    }
  }
}

module.exports = new EmailService();
