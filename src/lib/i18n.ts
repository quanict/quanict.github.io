import { cookies, headers } from 'next/headers'

export const locales = ['vi', 'en'] as const
export const defaultLocale = 'vi'

export async function getLocale(): Promise<string> {
  // 1️⃣ Ưu tiên cookie
  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get('locale')?.value

  if (cookieLocale && locales.includes(cookieLocale as (typeof locales)[number])) {
    return cookieLocale
  }

  // 2️⃣ Fallback theo browser
  const headerStore = await headers()
  const accept = headerStore.get('accept-language')

  if (accept?.startsWith('en')) return 'en'

  return defaultLocale
}
