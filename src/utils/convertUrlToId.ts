export function convertUrlToId(url: string) {
  const renderUrl = new URL(url)
  const renderUrlPath = renderUrl.host.split('.')
  const noSubdomains = renderUrlPath.slice(-2).join('.')
  return noSubdomains.toLowerCase()
}
