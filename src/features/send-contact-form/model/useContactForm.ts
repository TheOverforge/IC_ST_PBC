import { useRef, useState } from 'react';
import { PUBLIC_API_BASE_URL } from '../../../shared/config/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { contactFormSchema, type ContactFormSchema } from './schema';

export const useContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const inFlightRef = useRef(false);

  const form = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      message: '',
      agreement: false,
      _hp: '',
      formStartedAt: Date.now(),
    },
  });

  const onSubmit = async (values: ContactFormSchema) => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;

    try {
      const response = await fetch(`${PUBLIC_API_BASE_URL.replace(/\/api$/, '')}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || 'Failed to send form');
      }

      setIsSubmitted(true);

      form.reset({
        name: '',
        company: '',
        email: '',
        phone: '',
        message: '',
        agreement: false,
        _hp: '',
        formStartedAt: Date.now(),
      });
    } finally {
      inFlightRef.current = false;
    }
  };

  return {
    ...form,
    onSubmit,
    isSubmitted,
    setIsSubmitted,
  };
};
