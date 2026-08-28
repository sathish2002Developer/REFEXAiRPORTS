const express = require('express');
const { body, validationResult } = require('express-validator');

const { sendToKissflowWebhook } = require('../helpers/kissflowWebhook');
const { getRequestMeta, phoneToDigitsOnly } = require('../helpers/requestMeta');
const { isValidInternationalPhone } = require('../helpers/phoneValidation');
const { optionalContactAttachment } = require('../middlewares/uploadContact');
const emailService = require('../services/email_service');

const router = express.Router();

const EMAIL_REGEX =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

router.post(
  '/contact-form',
  optionalContactAttachment,
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('is required')
      .isLength({ min: 2, max: 120 })
      .withMessage('must be between 2 and 120 characters')
      .matches(/^[\p{L}\p{M}\s'.\-]+$/u)
      .withMessage('contains invalid characters'),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('is required')
      .matches(EMAIL_REGEX)
      .withMessage('must be a valid email'),
    body('phone')
      .trim()
      .notEmpty()
      .withMessage('is required')
      .custom((value) => {
        if (!isValidInternationalPhone(value)) {
          throw new Error('is invalid');
        }
        return true;
      }),
    body('company')
      .trim()
      .notEmpty()
      .withMessage('is required')
      .isLength({ min: 2, max: 160 })
      .withMessage('must be between 2 and 160 characters'),
    body('message')
      .trim()
      .notEmpty()
      .withMessage('is required')
      .isLength({ max: 4000 })
      .withMessage('must be 4000 characters or less'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const arr = errors.array();
      const fieldLabels = {
        name: 'Full Name',
        email: 'Email ID',
        phone: 'Phone Number',
        company: 'Organization Name',
        message: 'Message',
      };
      const errorMessages = arr.map((e) => {
        const label = fieldLabels[e.path] || e.path;
        return `${label}: ${e.msg}`;
      });
      return res.status(400).json({
        success: false,
        message: errorMessages.join(' '),
        errorMessages,
        errors: arr,
      });
    }

    const { name, email, phone, company, message } = req.body || {};
    const meta = getRequestMeta(req);
    const phoneDigits = phoneToDigitsOnly(phone);
    const attachment = req.file
      ? {
          originalName: req.file.originalname,
          filename: req.file.filename,
          path: req.file.path,
          url: `/uploads/contact/${req.file.filename}`,
          size: req.file.size,
        }
      : null;

    const websiteName = 'Refex Airports';
    const webhookData = {
      name,
      email,
      phone: phoneDigits,
      Phone_Number: phoneDigits,
      company,
      organization: company,
      message,
      attachmentUrl: attachment?.url || '',
      attachmentName: attachment?.originalName || '',
      ...meta,
    };

    sendToKissflowWebhook(websiteName, 'Contact form', webhookData);

    try {
      await emailService.sendContactFormEmail({
        name,
        email,
        phone: phoneDigits || phone,
        company,
        message,
        attachment,
        ipAddress: meta.ip || meta.ipAddress,
      });
    } catch (err) {
      console.error('Contact form email failed:', err);
      return res.status(500).json({
        success: false,
        message: 'We could not send your enquiry email. Please try again.',
      });
    }

    return res.json({
      success: true,
      message: 'Contact form submitted successfully',
      emailSent: true,
    });
  }
);

module.exports = router;
