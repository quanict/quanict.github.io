import Skills from "@/data/skills"
import QhIcon from "@/components/ui/qh-icon"

export default function IconsPage() {
    const icons = [
        "android",
    ];
    Skills.map(category => {
        category.skills.map(skill => {

            let name = skill.toLowerCase()
                .replaceAll(' & ', "-")
                .replaceAll('/', "-")
                .replaceAll(' ', "-")
                .replaceAll('.', "-")
            // const mappingKeys = Object.keys(MappingSimpleIcons)
            // if (mappingKeys.indexOf(name) > -1) {
            //     name = MappingSimpleIcons[name]
            // }

            if (icons.indexOf(name) < 0 ) {
                icons.push(name)
            }

        })
    })

    return (
        <main className="grid grid-flow-col grid-rows-4 gap-4 mt-10 p-10">
            {icons.map((image, index) => {
            return (
              <div key={index} ><QhIcon name={image} /></div>
            );
          })}
        </main>
    )
}