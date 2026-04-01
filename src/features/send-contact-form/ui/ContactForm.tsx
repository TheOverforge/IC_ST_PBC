import { useEffect, useState } from 'react';
import type { ContactFormSchema } from '../model/schema';
import { useContactForm } from '../model/useContactForm';
import { formatPhoneRu } from '../model/formatPhone';
import { publicText } from '../../../shared/config/publicText';

const { contacts } = publicText;

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    onSubmit,
    isSubmitted,
    setIsSubmitted,
    watch,
    setValue,
  } = useContactForm();

  const [submitError, setSubmitError] = useState('');
  const agreement = watch('agreement');

  useEffect(() => {
    if (!isSubmitted) return;

    const timer = window.setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [isSubmitted, setIsSubmitted]);

  const handleFormSubmit = async (values: ContactFormSchema) => {
    try {
      setSubmitError('');
      await onSubmit(values);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : contacts.error);
    }
  };

  return (
    <form className="contacts-form" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="contacts-form__honeypot"
        {...register('_hp')}
      />

      <div className="contacts-form__row">
        <label className="contacts-form__field">
          <span className="contacts-form__label">{contacts.name}</span>
          <input
            className={`contacts-form__input ${errors.name ? 'contacts-form__input--error' : ''}`}
            type="text"
            placeholder={contacts.placeholders.name}
            {...register('name')}
          />
          {errors.name && <span className="contacts-form__error">{errors.name.message}</span>}
        </label>

        <label className="contacts-form__field">
          <span className="contacts-form__label">{contacts.company}</span>
          <input
            className={`contacts-form__input ${errors.company ? 'contacts-form__input--error' : ''}`}
            type="text"
            placeholder={contacts.placeholders.company}
            {...register('company')}
          />
          {errors.company && <span className="contacts-form__error">{errors.company.message}</span>}
        </label>
      </div>

      <div className="contacts-form__row">
        <label className="contacts-form__field">
          <span className="contacts-form__label">{contacts.email}</span>
          <input
            className={`contacts-form__input ${errors.email ? 'contacts-form__input--error' : ''}`}
            type="email"
            placeholder="example@mail.com"
            {...register('email')}
          />
          {errors.email && <span className="contacts-form__error">{errors.email.message}</span>}
        </label>

        <label className="contacts-form__field">
          <span className="contacts-form__label">{contacts.phone}</span>
          <input
            className={`contacts-form__input ${errors.phone ? 'contacts-form__input--error' : ''}`}
            type="tel"
            placeholder="+7 (___) ___-__-__"
            value={watch('phone')}
            onChange={(event) => {
              setValue('phone', formatPhoneRu(event.target.value), {
                shouldValidate: true,
                shouldTouch: true,
                shouldDirty: true,
              });
            }}
          />
          {errors.phone && <span className="contacts-form__error">{errors.phone.message}</span>}
        </label>
      </div>

      <label className="contacts-form__field">
        <span className="contacts-form__label">{contacts.message}</span>
        <textarea
          className={`contacts-form__textarea ${errors.message ? 'contacts-form__input--error' : ''}`}
          placeholder={contacts.placeholders.message}
          rows={6}
          {...register('message')}
        />
        {errors.message && <span className="contacts-form__error">{errors.message.message}</span>}
      </label>

      <p className="contacts-form__hint">{contacts.responseNote}</p>

      <label className="contacts-form__checkbox">
        <input type="checkbox" {...register('agreement')} />
        <span>{contacts.agreement}</span>
      </label>

      {errors.agreement && (
        <span className="contacts-form__error contacts-form__error--checkbox">
          {errors.agreement.message}
        </span>
      )}

      <div className="contacts-form__actions">
        <button
          className="contacts-form__submit"
          type="submit"
          disabled={isSubmitting || !agreement || !isValid}
        >
          {isSubmitting ? contacts.sending : contacts.submit}
        </button>
      </div>

      {submitError && <div className="contacts-form__error-box">{submitError}</div>}

      {isSubmitted && (
        <div className="contacts-form__success">
          {contacts.success}
        </div>
      )}
    </form>
  );
};
