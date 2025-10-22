import moment from "moment";
import {
  CloudSkills as skills,
  CloudSkillsBoostProfile
} from "../../data/GoogleCloudSkillsBoost"
import { Layout1 } from "@/components/layouts/style1";
import ExperienceCard from "@/components/ui/card/Experience"


export default function CloudSkillsBoost() {

  let items = skills
  items.sort((a, b) => {
    const test = moment(a.finished_date).isBefore(b.finished_date)
    return test ? 1 : -1
  })

  items = items.filter(c => {
    const dateSession7Start = moment("2025-09-18")
    const dateSession7End = moment("2025-10-19")

    const isAfter = moment(c.finished_date).isAfter(dateSession7Start)
    const isBefore = moment(c.finished_date).isBefore(dateSession7End)
    return isAfter && isBefore
  });


  const defaultProfileId = CloudSkillsBoostProfile[0].profile_id
  const uriProfile = `https://www.cloudskillsboost.google/public_profiles/${defaultProfileId}`
  const uriProfileBadge = uriProfile + `/badges`
  const uriCourse = `https://www.cloudskillsboost.google/course_templates/`

  return (
    <Layout1 title="Google Cloud Skills Boost">
      
          <div> profile :
            <a href={uriProfile} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
              {CloudSkillsBoostProfile[0].name}
            </a>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {items.map((item, index) => (item.img.length > 0 && 
              <ExperienceCard key={index + 1} title={item.name} period={item.finished_date} skills={item.tags} icon={"cloud-devops"} iconSkillDefault="cloud-devops" >
                <div className="min-h-320px" style={{ minHeight: "300px" }}>
                  <a href={`${uriProfileBadge}/${item.certificate_id}`} target="_blank" rel="noopener noreferrer">
                    <img src={item.img} alt={item.name} className="w-full h-auto rounded-md shadow-lg" />
                  </a>
                </div>
                <div>
                  <a href={`${uriCourse}/${item.course_id}`} target="_blank" > go to course</a>
                </div>

                
              </ExperienceCard>
            ))}
          </div>
    </Layout1>


  )
}