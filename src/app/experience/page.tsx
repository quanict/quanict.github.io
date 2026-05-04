
import { getTranslations } from 'next-intl/server'
import ExperiencesSection from "@/components/portfolio/Experiences"

export async function generateMetadata() {
  const t = await getTranslations("seo")

  return {
    title: t('home'),
    description: t('home_description'),
  }
}


export default function Home() {
  return (
    <ExperiencesSection />
  );
}
