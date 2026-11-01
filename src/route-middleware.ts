import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

export const onRequest = defineRouteMiddleware(({ locals }) => {
  const { entry, head } = locals.starlightRoute;
  // Derive this from the body so completed guides become indexable automatically.
  if (!entry.body?.trim()) {
    const robots = head.find(({ tag, attrs }) => tag === 'meta' && attrs?.name === 'robots');
    if (robots) {
      robots.attrs = { ...robots.attrs, content: 'noindex, follow' };
    } else {
      head.push({ tag: 'meta', attrs: { name: 'robots', content: 'noindex, follow' } });
    }
  }
});
