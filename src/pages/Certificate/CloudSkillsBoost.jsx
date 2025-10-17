import moment from "moment";
import {
  CloudSkills as skills,
  CloudSkillsBoostProfile
} from "../../data/GoogleCloudSkillsBoost"


export default function CloudSkillsBoost() {
  
    let items = skills
    items.sort((a, b) => {
      const test = moment(a.finished_date).isBefore(b.finished_date)
      console.log(`==== check soft`, {
        t1: a.finished_date,
        t2: b.finished_date,
        test
      })
      return test ? 1 : -1
    })

    items = items.filter(c => {
      const dateSession7Start = moment("2025-09-18")
      const dateSession7End = moment("2025-10-19")

      const isAfter = moment(c.finished_date).isAfter(dateSession7Start)
      const isBefore = moment(c.finished_date).isBefore(dateSession7End)
      return isAfter && isBefore
    });


    console.log(`===========`, {items})

    const defaultProfileId = CloudSkillsBoostProfile[0].profile_id

    return (
      <div className="min-h-screen bg-gradient-to-b relative overflow-hidden pt-32 pb-20">
        <div className="relative container mx-auto px-6 mt-10">
          {/* <main className="pt-20 lg:pt-[0rem] bg-[#04081A] text-white min-h-screen" > */}
                {/* <section className="hero min-h-screen flex items-center relative px-4 sm:px-6 lg:px-8"> */}
                  {/* <div className="container mx-auto"> */}
                  <div> profile : 
                    <a href={ `https://www.cloudskillsboost.google/public_profiles/${CloudSkillsBoostProfile[0].profile_id}` } target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                      {CloudSkillsBoostProfile[0].name}
                    </a>
                  </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                      {items.map((item, index) => ( item.img.length > 0 &&
                          <div key={index + 1} className="flex flex-col border-2 border-solid  p-4">
                              <h2 className="text-base  mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                              {item.name}
                              </h2>
                              <div>{ item.finished_date }</div>
                              <a href={ `https://www.cloudskillsboost.google/public_profiles/${defaultProfileId}/badges/${item.certificate_id}` } target="_blank" rel="noopener noreferrer" className="mt-4">
                                <img src={item.img} alt={item.name} className="w-full h-auto rounded-md shadow-lg " />
                              </a>
                              <a href={`https://www.cloudskillsboost.google/course_templates/${item.course_id}`} target="_blank" > go to course</a>
                          </div>
                          
                      ))}
                    </div>
                    {/* </div> */}
              {/* </section> */}
              {/* </main> */}
        </div>
      </div>
   
    )
}