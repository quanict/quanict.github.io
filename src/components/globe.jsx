import IconCloud from "./ui/icon-cloud";
import Skills from "@/data/skills"

const slugs = [
  "android",
];

/**
 * https://simpleicons.org/
 */
const MappingSimpleIcons = {
  "express-js":"express",
  "next-js":"nextdotjs",
  "node-js":"nodedotjs",
  "android-studio":"androidstudio",
  // "vs-code":"visualstudiocode",
  // "aws":"amazonaws",
  "google-cloud":"googlecloud",
  "tailwind-css":"tailwindcss"
}

const skipSimpleIcons = [
  "rest-apis",
  "ci-cd", "vs-code",
  "aws", "java"
]

function IconCloudDemo() {
  const imgs = []
  Skills.map(category=>{
    category.skills.map(skill=>{

      let name = skill.toLowerCase()
        .replaceAll(' & ', "-")
        .replaceAll('/', "-")
        .replaceAll(' ', "-")
        .replaceAll('.', "-")
      const mappingKeys = Object.keys(MappingSimpleIcons)
      if( mappingKeys.indexOf(name) >-1 ){
        name = MappingSimpleIcons[name]
      }

        if( slugs.indexOf(name) < 0 && skipSimpleIcons.indexOf(name) < 0 ){
          slugs.push(name)
        }
      
    })
  })
  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg  px-20 pb-20 pt-8 bg-transparent">
      <IconCloud iconSlugs={slugs} />
    </div>
  );
}

export default IconCloudDemo;
