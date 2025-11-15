
import PropTypes from "prop-types";
import { Layout1 } from "@/components/layouts/style1";
import moment from "moment";
import { FaUpwork } from "react-icons/fa6"
import Rating from "@/components/ui/rating";
import { FaLinkedin } from "react-icons/fa";

const JobSiteItem = ({ site }) => {
    let classes = ["p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"]
    if (site && site.name === "UpWork") {
        classes.push("md:col-span-2")
    }
    return (
        <div className={classes.join(" ")}>
            <a href={site.url} target="_blank" rel="noreferrer">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{site.name}</h5>
            </a>

            <div className="">
                <Rating rank={site.rate ?? 0} />
                <a href={site.url} target="_blank" rel="noreferrer">
                    {typeof site.logo == "string" && <img src={site.logo} alt={site.name} className="max-h-12 mx-auto" />}
                    {typeof site.logo == "function" && <site.logo className="text-6xl mx-auto text-green-500" />}
                </a>
            </div>
            {site.description && <p className="mt-4 font-normal text-gray-700 dark:text-gray-400">{site.description}</p>}
        </div>
    )
}

JobSiteItem.propTypes = {
    site: PropTypes.object.isRequired,
}

const CourseItem = ({ course }) => {
    return (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href={course.url} target="_blank">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <span> <img src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg" className="inline-block h-7" /></span> {course.title}
                </h5>
            </a>
            <div className="">
                <a href={course.url} target="_blank">
                    {typeof course.thumbnail == "string" && <img src={course.thumbnail} alt={course.title} className="w-full mx-auto" />}
                </a>
            </div>
            {course.description && <p className="mt-4 font-normal text-gray-700 dark:text-gray-400">{course.description}</p>}
        </div>
    )
}

CourseItem.propTypes = {
    course: PropTypes.object.isRequired,
}

export default function JobApplied() {
    let jobsInterview = []
    data.map((job) => {
        try {
            if (job.date_interview.length < 1) {
                job.date_interview = "2025-07-20"
            }
            job.date_interview_carbon = moment(job.date_interview)
            jobsInterview.push(job)
        } catch (e) {
            console.error("Error parsing date for job:", job, e)
        }
    })

    jobsInterview = jobsInterview.sort((a, b) => {
        const greater = b.date_interview_carbon.isAfter(a.date_interview_carbon)
        const less = b.date_interview_carbon.isBefore(a.date_interview_carbon)
        if (greater) {
            return 1;
        }
        if (less) {
            return -1;
        }
        return 0;
    })

    const jobSites = sites.sort((a, b) => {
        const rateA = a.rate || 0;
        const rateB = b.rate || 0;
        return rateB - rateA;
    });

    return (
        <Layout1 title="Job searching">
            <div className="job-applied-page">
                <h3 className="text-white text-3xl font-bold mb-6">Job Search</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {jobSites && jobSites.map((site, i) => (
                    <JobSiteItem key={i} site={site} />
                ))}
            </div>

            <div className="job-applied-page">
                <h3 className="text-white text-3xl font-bold mb-6">Courses</h3>
            </div>
            <div className="grid grid-flow-row grid-cols-1 md:grid-cols-3 gap-4">
                {courses && courses.map((course, i) => (
                    <CourseItem key={i} course={course} />
                ))}
            </div>

            <div className="job-applied-page mt-5">
                <h3 className="text-white text-3xl font-bold mb-6">Job Applications</h3>
            </div>
            <div className="space-y-4">
                {jobsInterview.map((job, index) => (
                    <div key={index} className="p-4 border rounded-lg shadow-sm">
                        <h2 className=" font-semibold ">
                            <span className="text-white text-xl">{job.position}</span>
                            <span className="text-green-200"> at </span>
                            <span className="text-base text-amber-500">{job.company}</span>
                        </h2>
                        {job.address && <p className="text-white"><strong>Address:</strong> {job.address}</p>}

                        <p className="text-white">
                            <strong>Contact:</strong>
                            <a href={job.contact} className="ms-3 text-amber-500">{job.contact_name}</a>
                        </p>

                        {job.date_interview && <p className="text-white"><strong>Date of Interview:</strong> {job.date_interview_carbon.format("YYYY-MM-DD")}</p>}

                        <p>
                            <strong className="text-white me-3">Status:</strong>
                            {job.status === INTERVIEW_STATUS.PENDING && <span className="text-green-500">Pending</span>}
                            {job.status === INTERVIEW_STATUS.REJECTED && <span className="text-red-600">Fail</span>}
                            {job.status === INTERVIEW_STATUS.NOT_APPLLY && <span className="text-gray-600">Not Apply</span>}
                        </p>
                    </div>
                ))}
            </div>
        </Layout1>
    )
}

const sites = [
    {
        name: "rework times",
        url: "//www.reworktimes.com/",
        logo: "https://cdn.prod.website-files.com/6708e9e1138442bce5d2a4be/67129434e6fe0612d16d9571_Logo-black.svg",
        rate: 1
    },
    {
        name: "UpWork",
        url: "//www.upwork.com/",
        logo: FaUpwork,
        rate: 5
    },

    {
        name: "BJAK",
        url: "//jobs.ashbyhq.com/bjakcareer",
        logo: "https://app.ashbyhq.com/api/images/org-theme-wordmark/cfdb13fd-7d62-4b21-a335-caf230b55bd2/50220d6f-75bd-4d17-9199-b4361604b1da/776b0d6d-b264-47fc-a116-7219811654b6.png",
        description: "BJAK is Southeast Asia’s largest online insurance platform, headquartered in Malaysia"
    }, {
        name: "careerlink",
        url: "//www.careerlink.vn/",
        logo: "https://static.careerlink.vn/web/images/logo.png",
        description: "Tuyển dụng việc làm tại Hà Nội",
        rate: 2
    },
    {
        name: "クラウドワークス テック",
        url: "//tech.crowdworks.jp",
        logo: "https://crowdtech.jp/packs/media/common/logo-bcddfa35.svg",
        description: "",
    },
    {
        name: "it Works Asia",
        url: "https://itworks.asia/job/?filter-location%5B%5D=145",
        logo: "https://itworks.asia/wp-content/uploads/2021/11/logoitworks-e1744677264234.png",
        description: "",
        rate: 2
    },
    {
        name: "Limix",
        url: "https://limix.com/vi/find-open-jobs-vn",
        logo: "https://limix.com/cgzve-content/uploads/2025/01/logo.webp",
        description: "onsite ThaiLan",
        rate: 1
    },
    {
        name: "playstudios",
        url: "https://playstudios-asia.breezy.hr/",
        logo: "https://gallery-cdn.breezy.hr/d0eace02-af20-44d2-bca5-b107e301ae49/Screenshot%202021-06-02%20at%204.34.38%20PM.png",
        description: "",
        rate: 1
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/jobs/",
        logo: FaLinkedin,
        description: "",
        rate: 5
    },
    {
        name: "Clearer.io",
        url: "https://jobs.lever.co/Clearer",
        logo: "https://lever-client-logos.s3.us-west-2.amazonaws.com/5aa24a91-b1aa-4dd6-9896-592d6d7103e2-1730138761940.png",
        description: "Remote work",
        rate: 1
    },
    {
        name: "topdev",
        url: "https://topdev.vn/jobs/search?job_categories_ids=2&salary_min=30000000&keyword=&region_ids=01%2C27%2C33",
        logo: "https://c.topdevvn.com/uploads/2025/07/15/logo_v2.png",
        description: "Top IT Jobs For Developers.",
        rate: 4
    }
]

const courses = [
    {
        title: "Design Thinking 101: Từ ý tưởng đến hiện thực (cơ bản)",
        url: "https://www.udemy.com/course/design-thinking-tu-y-tuong-den-hien-thuc/learn/lecture/42565104",
        thumbnail: "https://img-c.udemycdn.com/course/240x135/5815956_5e78_5.jpg"
    },
    {
        title: "Unity C# Mobile Game Development: Make 3 Games From Scratch",
        url: "https://www.udemy.com/course/unity-mobile/learn/lecture/26123126#announcements/12834159/",
        thumbnail: "https://img-c.udemycdn.com/course/480x270/3822566_69b5_2.jpg"
    },
    {
        title: "Professional Certificate in SQL and SQL for Data Analysis",
        url: "https://www.udemy.com/course-dashboard-redirect/?course_id=6358693",
        thumbnail: "https://img-c.udemycdn.com/course/240x135/6358693_a332.jpg"
    },
    {
        title : "Introduction to Data Science with Python",
        url: "https://learning.edx.org/course/course-v1:HarvardX+CS109x+3T2024/home",
        source: "https://pll.harvard.edu/course/introduction-data-science-python",
        thumbnail: "https://pll.harvard.edu/sites/default/files/styles/16_9_medium/public/course/pll-course-image_dsp1_530x300.png?itok=vKFw6bXj"
    },
    {
        title : "AWS Cloud", 
        url: "https://www.awseducate.com/student/s/content",
        thumbnail : "https://d1.awsstatic.com/aws-educate/Educate-cloud-screenshot.d969d0befb37aa46b6947b0d74fdec636b63207c.png"   
    },
    {
        title: "Power BI",
        url: "https://learn.microsoft.com/en-us/training/browse/?products=power-bi",
        thumbnail: "https://learn.microsoft.com/training/media/training/hero/training_hero_300px_light.png"
    }
]

const INTERVIEW_STATUS = {
    NOT_APPLLY: -1,
    WAIT: 0,
    REJECTED: 1,
    PASS: 2,
    PENDING: 3,
};

const data = [
    {
        company: "Border Z Vietnam",
        contact: "https://www.facebook.com/trinh.nguyen.127648",
        contact_name: "Trinh Nguyễn",
        position: "Technical Leader",
        date_interview: "2025/11/10 15:30",
        status: INTERVIEW_STATUS.WAIT,
        address: "Tòa nhà CIC, số 2 đường Nguyễn Thị Duệ, Yên Hòa, HN",
        jd : "https://docs.google.com/document/d/1DB8iGh4PL1aDxrmPYlC6R9kNRCkkKPRsaLhx1E5drhY/edit?tab=t.0"
    },  
    {
        company: "Crossian",
        contact: "https://www.linkedin.com/in/my-thai-164265ba/",
        contact_name: "My Thai",
        position: "Frontend Technical Leader",
        date_interview: "",
        status: INTERVIEW_STATUS.NOT_APPLLY,
    },
    {
        company: "Gradion Vietnam",
        contact: "gam.ho@gradion.com",
        position: "Senior/Lead Fullstack Engineer",
        date_interview: "",
        status: INTERVIEW_STATUS.NOT_APPLLY,
    },
    {
        company: "Samsung SDS",
        contact: "Fontend Techlead",
        position: "VueJs",
        date_interview: "",
        status: INTERVIEW_STATUS.NOT_APPLLY,
    },
    {
        company: "RECO_SOA",
        contact: "https://www.facebook.com/100009486420046/",
        contact_name: "Thuy Linh  (kitty)",
        position: "Senior PHP Symfony",
        date_interview: "2025-09-10 14:30",
        status: INTERVIEW_STATUS.PENDING,
    }, {
        company: "Scandinavian Software Park",
        contact: "https://www.linkedin.com/in/hieu-cong-ab493870/",
        contact_name: "Hieu Cong",
        position: "Senior/Lead Fullstack Engineer",
        date_interview: "2025-08-11",
        status: INTERVIEW_STATUS.PENDING,
    }
    , {
        company: "FSoft",
        contact: "https://www.linkedin.com/in/vi%E1%BB%87t-h%C6%B0%C6%A1ng-116292a9/",
        contact_name: "Việt Hương",
        position: "Senior/Lead Fullstack Engineer",
        date_interview: "2025-08-01 15:00",
        status: INTERVIEW_STATUS.REJECTED,
    }
    , {
        company: "Pionero JSC",
        address: " Phòng 808, Tầng 8, Tòa nhà Toyota, 315 Trường Chinh, HN",
        contact: "https://www.linkedin.com/in/phamymuon/",
        contact_name: "Phạm Y Muôn",
        position: "Senior Software Engineer ",
        date_interview: "2025-07-31 13:00",
        status: INTERVIEW_STATUS.REJECTED,
        website: "//www.pionero.io"

    },
]

