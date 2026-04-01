import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Please enter at least 2 characters.')
    .max(60, 'Name is too long.'),
  company: z
    .string()
    .max(100, 'Company name is too long.')
    .optional()
    .or(z.literal('')),
  email: z
    .string()
    .min(1, 'Email is required.')
    .email('Please enter a valid email address.'),
  phone: z
    .string()
    .min(18, 'Please enter a full phone number.')
    .max(18, 'Please enter a valid phone number.'),
  message: z
    .string()
    .min(10, 'Please describe your request in at least 10 characters.')
    .max(1000, 'Message is too long.'),
  agreement: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You need to agree to the processing of contact information.',
    }),
  _hp: z.string().optional(),
  formStartedAt: z.number(),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;
