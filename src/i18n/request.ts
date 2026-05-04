import { getRequestConfig } from 'next-intl/server'
import { cookies, headers } from 'next/headers'

const locales = ['vi', 'en'] as const
const defaultLocale = 'vi'

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get('locale')?.value

  let locale = defaultLocale

  if (cookieLocale && locales.includes(cookieLocale as (typeof locales)[number])) {
    locale = cookieLocale as (typeof locales)[number]
  } else {
    // 2️⃣ fallback theo browser
    const headerStore = await headers()
    const accept = headerStore.get('accept-language')
    if (accept?.startsWith('en')) locale = 'en'
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})
