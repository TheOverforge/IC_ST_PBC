type MetaPayload = {
  title?: string | null;
  description?: string | null;
  image?: string | null;
  url?: string | null;
};

const ensureMetaTag = (selector: string, attributes: Record<string, string>): HTMLMetaElement => {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement('meta');
    Object.entries(attributes).forEach(([key, value]) => {
      (element as HTMLMetaElement).setAttribute(key, value);
    });
    document.head.appendChild(element);
  }

  return element;
};

export const applyDocumentMeta = ({ title, description, image, url }: MetaPayload) => {
  if (title) {
    document.title = title;
  }

  if (description) {
    const tag = ensureMetaTag('meta[name="description"]', { name: 'description' });
    tag.setAttribute('content', description);
  }

  if (title) {
    ensureMetaTag('meta[property="og:title"]', { property: 'og:title' })
      .setAttribute('content', title);
    ensureMetaTag('meta[name="twitter:title"]', { name: 'twitter:title' })
      .setAttribute('content', title);
  }

  if (description) {
    ensureMetaTag('meta[property="og:description"]', { property: 'og:description' })
      .setAttribute('content', description);
    ensureMetaTag('meta[name="twitter:description"]', { name: 'twitter:description' })
      .setAttribute('content', description);
  }

  if (image) {
    ensureMetaTag('meta[property="og:image"]', { property: 'og:image' })
      .setAttribute('content', image);
    ensureMetaTag('meta[name="twitter:image"]', { name: 'twitter:image' })
      .setAttribute('content', image);
  }

  if (url) {
    ensureMetaTag('meta[property="og:url"]', { property: 'og:url' })
      .setAttribute('content', url);
  }

  ensureMetaTag('meta[property="og:type"]', { property: 'og:type' })
    .setAttribute('content', 'article');

  ensureMetaTag('meta[name="twitter:card"]', { name: 'twitter:card' })
    .setAttribute('content', 'summary_large_image');
};
