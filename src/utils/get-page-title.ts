// import defaultSettings from '../settings'

const title = '灰鲸云'

export default function getPageTitle(pageTitle: string): string {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
