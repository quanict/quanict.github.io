import PropTypes from "prop-types";
import QhIcon from "@/components/ui/qh-icon"

const ExperienceCard = ({
    icon = "react",
    title,
    company,
    period,
    skills = [], 
    description,
    children,
}   ) => {
    return (
        <div className="group relative overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
            {/* Glass morphism effect */}
            <div className="absolute inset-0 backdrop-blur-lg bg-white/5 rounded-lg" />

            {/* Animated gradient border */}
            <div className="absolute -inset-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-100 animate-gradient-xy transition-all duration-500" />

            <div className="relative bg-gray-900/90 rounded-lg p-8 h-full border border-gray-800/50 shadow-xl backdrop-blur-xl">
                {/* Floating icon with pulse effect */}
                <div className="relative mb-6">
                    <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-25 rounded-full blur-xl " />
                    <QhIcon name={icon} size="12" className="text-cyan-400 relative z-10" />
                </div>

                {/* Content with improved typography */}
                <div className="space-y-3 capitalize">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        {title}
                    </h3>

                    { period && <div className="flex flex-col justify-between items-start text-gray-300 space-y-2">
                        <span className="font-semibold text-blue-400">{company}</span>
                        <span className="text-sm font-mono bg-blue-500/10 px-2  py-1 rounded-md ">
                            {period}
                        </span>
                    </div>}

                    {skills && skills.length > 0 && (
                        <div className="flex">
                            {skills.map((skill, index) => (
                                <QhIcon name={skill} size="4" key={index} className="mr-2" />
                            ))}
                        </div>
                    )}

                    {description && <p className="text-gray-300 border-l-4 border-blue-500/50 pl-4 mt-4 leading-relaxed">
                        {description}
                    </p>}

                    {children}
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20">
                    <div className="absolute top-0 right-0 w-6 h-[2px] bg-cyan-500/50" />
                    <div className="absolute top-0 right-0 w-[2px] h-6 bg-cyan-500/50" />
                </div>
                <div className="absolute bottom-4 left-4 w-20 h-20">
                    <div className="absolute bottom-0 left-0 w-6 h-[2px] bg-purple-500/50" />
                    <div className="absolute bottom-0 left-0 w-[2px] h-6 bg-purple-500/50" />
                </div>
            </div>
        </div>
    );
}

ExperienceCard.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    company: PropTypes.string,
    period: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
    iconSkillDefault:PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    children: PropTypes.node,
}


export default ExperienceCard