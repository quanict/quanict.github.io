"use client";

import { useState } from "react";
// import * as ContactInfo from "@/data/contact"
import { Send, MapPin, Mail } from "lucide-react";
// import { FaWhatsapp } from "react-icons/fa";

import { useTranslations } from 'next-intl'
import ContactInfo from "@/features/Contact/components/info";


export default function Contact() {
  

  return (
    <main className="pt-20 lg:pt-[0rem] bg-[#04081A] text-white min-h-screen" >
      <section className="hero min-h-screen flex items-center relative px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contact Info */}
            <ContactInfo />

            {/* Contact Form */}
            
          </div>
        </div>
      </section>
    </main>
  );
}