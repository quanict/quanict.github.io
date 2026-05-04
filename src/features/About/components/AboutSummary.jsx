import hero from "@/configs/hero"
import {markdownParser } from "@/lib/utils"
import parse from 'html-react-parser';

export default function AboutSummary() {
  const description = markdownParser(hero.about.description)
  const singature = markdownParser(hero.about.singature)
  return (
    <>
      <section id="about" className="py-16 md:py-32  text-white bg-[#04081A]">
        <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
          <h2 className="relative z-10 text-3xl font-medium lg:text-3xl text-white">
            { hero.titles.join(", ") }
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
            <div className="relative mb-6 sm:mb-0">
              <div className="bg-linear-to-b aspect-76/59 relative rounded-2xl p-px from-zinc-300 to-transparent">
                <img
                  src={hero.img}
                  className="rounded-[15px] shadow block"
                  alt="payments illustration"
                />
              </div>
            </div>

            <div className="relative space-y-4 page-about-desc">
              { parse(description) }

              <cite className="mt-6 space-y-3 block font-medium text-white">
                { parse(singature) }
              </cite>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
