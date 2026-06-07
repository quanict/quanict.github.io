"use client"

import { markdownParser } from "@/lib/utils"
import parse from 'html-react-parser';
import AI_datas from "@/configs/ai-info"
import { PillBorderedBadge } from "@/components/ui/flowbite/badge";
import { useState, useMemo } from "react";

export default function AiSection() {
      const [search, setSearch] = useState('');
      const items = useMemo(() => {
            return AI_datas.filter(item =>
                  item.name.toLowerCase().includes(search.trim().toLowerCase())
            );
      }, [search, AI_datas]);
      return (
            <main className="pt-20 lg:pt-[0rem] bg-[#04081A] text-white min-h-screen" >
                  <section className="hero min-h-screen flex items-center relative px-4 sm:px-6 lg:px-8">
                        <div className="container mx-auto">
                              <div className="search-group mt-8 mb-2">

                                    <form className="max-w-md mx-auto">
                                          <label htmlFor="search" className="block mb-2.5 text-sm font-medium text-heading sr-only ">Search</label>
                                          <div className="relative">
                                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                      <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /></svg>
                                                </div>
                                                <input type="search" id="search" className="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
                                                <button type="button" className="absolute end-1.5 bottom-1.5 text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none">Search</button>
                                          </div>
                                    </form>

                              </div>
                              <div className="grid grid-cols-4 gap-4">
                                    {items.map((item, index) => {
                                          return <div key={index} className="border border-gray-400 p-3 bg-gray-500">
                                                <h4>{item.name}</h4>
                                                <div>{item.type}</div>


                                                {/* {"tags" in item &&
                                                      item.tags?.map((tag, i) => (
                                                            <PillBorderedBadge key={`${index}-${i}`}>
                                                                  {tag}
                                                            </PillBorderedBadge>
                                                      ))} */}
                                                {"url" in item  && 
                                                <div>
                                                      {item.url && <a href={item.url}>{item.url}</a>}
                                                </div>
                                          }
                                                <div>{item.short_desc}</div>
                                          </div>
                                    })}

                              </div>
                        </div>
                  </section>
            </main>

      )
}