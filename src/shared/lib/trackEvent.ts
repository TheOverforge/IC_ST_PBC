type EventPayload = Record<string, unknown>;

export const trackEvent = (eventName: string, payload: EventPayload = {}) => {
  // Foundation for future analytics integrations (GA4, Plausible, Posthog, etc.)
  console.debug('[analytics]', eventName, payload);
};
