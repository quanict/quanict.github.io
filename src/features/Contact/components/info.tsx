
import { useTranslations } from 'next-intl'
import {
  FaGithub,
  FaLinkedin,

} from "react-icons/fa6";
import * as ContactData from "@/features/Contact/config"
import { Send, MapPin, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactInfo() {
    const t = useTranslations("contact")
    const contactData = []
  if (ContactData.phone) {
    contactData.push({
      icon: <FaWhatsapp className="w-6 h-6 text-green-500" />,
      label: "Phone",
      link: `https://wa.me/${ContactData.phone}`,
      text: ContactData.phone,
    })
  }

  if (ContactData.mail) {
    contactData.push({
      icon: <Mail className="w-6 h-6 text-purple-400" />,
      label: "Email",
      link: `mailto:${ContactData.mail}`,
      text: ContactData.mail,
    })
  }
  if (ContactData.github) {
    contactData.push({
      icon: <FaGithub className="w-6 h-6" />,
      label: "Github",
      link: `https://github.com/${ContactData.github}`,
      text: "Check out my GitHub",
    })
  }
  if (ContactData.linkedin) {
    contactData.push({
      icon: <FaLinkedin className="w-6 h-6 text-blue-500" />,
      label: "Linkedin",
      link: `https://www.linkedin.com/in/${ContactData.linkedin}/`,
      text: "Connect with me on LinkedIn",
    })
  }

  if (ContactData.location) {
    contactData.push({
      icon: <MapPin className="w-6 h-6 text-red-500" />,
      label: "Location",
      text: ContactData.location
    })
  }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    {t("contact.get_in_touch")}
                </h2>
                <p className="text-gray-300 text-lg">
                    {t("contact.Have a question or want to work together? Drop us a message!")}
                </p>
            </div>

            <div className="space-y-8">
                {contactData.map((item, index) => (
                    <div key={index + 1} className="flex items-center space-x-4">
                        <div className="bg-pink-500/10 p-3 rounded-lg">
                            {item.icon}
                        </div>
                        <div>
                            <h3 className="font-semibold">{item.label}</h3>
                            {item.link ? (
                                <a href={item.link} target="_blank" className="text-blue-600 capitalize cursor-pointer hover:text-white duration-500">
                                    {item.text}
                                </a>
                            ) : (
                                <p className="text-gray-400">{item.text}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}