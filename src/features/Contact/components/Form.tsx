"use client";

import { useState } from "react";
import { Send, MapPin, Mail } from "lucide-react";
import { useTranslations } from 'next-intl'
import app from "@/configs/app"

type FormDataType = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}
type FormErrorType = Partial<Record<keyof FormDataType, string>>;

export default function ContactForm() {
  const t = useTranslations("contact")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: '',
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrorType>({});
  const [status, setStatus] = useState('');



  const validateForm = () => {
    const tempErrors: FormDataType = {
      name: "",
      email: "",
      phone: '',
      subject: "",
      message: "",
    };
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      tempErrors.subject = "Subject is required";
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus("Please fill in all required fields correctly.");
      return;
    }

    // Create a new FormData object to send to Web3Forms API
    const form = new FormData();
    form.append("access_key", app.WEB3FORMS_ACCESS_KEY);

    // https://web3forms.com/ => goto ths site and Create your Access Key 
    // create .env file in root directory and add your access key 
    // or you can directly add your access key here

    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("phone", formData.phone || ""); // Optional field
    form.append("subject", formData.subject || "New Contact Form Submission");
    form.append("message", formData.message);

    try {
      // Send form data to Web3Forms API
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: '',
          subject: "",
          message: "",
        });
        setErrors({});
      } else {
        setStatus(result.message || "There was an error sending your message.");
      }
    } catch (error) {
      setStatus("An error occurred. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="backdrop-blur-lg bg-white/5 p-8 rounded-2xl shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${errors.name ? "border-red-500" : "border-gray-700"
                } focus:border-blue-500 focus:outline-none transition-colors`}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Your Email"
              className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${errors.email ? "border-red-500" : "border-gray-700"
                } focus:border-blue-500 focus:outline-none transition-colors`}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <input
              type="tel"
              placeholder="Your Phone Number Or WhatsApp Number"

              className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${errors.phone ? "border-red-500" : "border-gray-700"
                } focus:border-blue-500 focus:outline-none transition-colors`}
              value={formData.phone || ""}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Subject"
              className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${errors.subject ? "border-red-500" : "border-gray-700"
                } focus:border-blue-500 focus:outline-none transition-colors`}
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">
                {errors.subject}
              </p>
            )}
          </div>


          <div>
            <textarea
              placeholder="Your Message"
              rows={4}
              className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${errors.message ? "border-red-500" : "border-gray-700"
                } focus:border-blue-500 focus:outline-none transition-colors resize-none`}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
        >
          <span>{t("contact.send_message")}</span>
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Status Message */}
      {status && (
        <div
          className={`mt-4 text-center ${status.includes("success")
            ? "text-green-400"
            : "text-red-400"
            }`}
        >
          <p>{status}</p>
        </div>
      )}
    </div>
  )
}