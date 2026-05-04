
import { getTranslations } from 'next-intl/server'
import AiSection from "@/features/ArtificialIntelligence/components/AiSection"

export async function generateMetadata() {
  const t = await getTranslations("seo")

  return {
    title: t('home'),
    description: t('home_description'),
  }
}


export default function ContactPage() {
  return (
    <AiSection />
  );
}
