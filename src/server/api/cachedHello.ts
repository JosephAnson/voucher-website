export default cachedEventHandler(async () => {
  return 'Cached Hello'
}, {
  name: 'sitemap-dynamic-urls',
  maxAge: 60 * 10, // cache URLs for 10 minutes
})
