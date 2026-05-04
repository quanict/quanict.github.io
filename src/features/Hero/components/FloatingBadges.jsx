// import React from 'react';

function FloatingBadges(props) {
    return (
        <>
            <div className="hidden lg:block absolute left-[5.5rem] top-[2.3rem] animate-float-slow">
                <div className="px-4 py-2 rounded-lg bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 text-purple-400">
                    <i className="fas fa-wand-magic-sparkles"></i>&nbsp;&nbsp;UI
                    Magic
                </div>
            </div>
            <div className="hidden lg:block absolute right-10 top-20 animate-float">
                <div className="px-4 py-2 rounded-lg bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 text-blue-400">
                    <i className="fas fa-code"></i>&nbsp;&nbsp;Clean Code
                </div>
            </div>
            <div className="hidden lg:block absolute top-[17rem] left-[70%] transform -translate-x-1/2 animate-float">
                <div className="px-4 py-2 rounded-lg bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 text-amber-400">
                    <i className="fas fa-lightbulb"></i>&nbsp;&nbsp;Innovation
                </div>
            </div>
        </>
    );
}

export default FloatingBadges;