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
        <main className="container mx-auto mt-[70px]">
            <div className="grid grid-cols-4 md:grid-cols-12 gap-4 mt-10 p-10">
            {icons.map((image, index) => {
                return (
                    <div key={index} className="w-32 h-32 border p-2 content-center" ><QhIcon name={image} /></div>
                );
            })}
            </div>
        </main>
    )
}