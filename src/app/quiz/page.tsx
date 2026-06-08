import { getTranslations } from 'next-intl/server'
import Quiz from '@/components/quiz';
import questions from '@/data/questions.json';

export async function generateMetadata() {
  const t = await getTranslations("seo")

  return {
    title: "Quiz - tìm hiểu pháp luật",
    description: "Cuộc thi tìm hiểu Pháp luật của lực lượng tham gia bảo vệ an ninh trật tự cơ sở",
  }
}


export default function Home() {
  return (
    <main className="pt-20 lg:pt-[0rem] bg-[#04081A] text-white min-h-screen" >
          <section className="hero min-h-screen flex items-center relative px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
              <div className="gap-12 items-center mt-20 ">
                <Quiz questions={questions} showCorrectAnswers={true} />
              </div>
            </div>
          </section>
        </main>
    
  );
}
