import React from 'react';
import ContactFAQ from '../components/contact/ContactFAQ';
import ContactHero from '../components/contact/ContactHero';
import ContactInfo from '../components/contact/ContactInfo';
import ContactForm from '../components/contact/ContactForm';
import CallToAction from '../components/contact/CallToAction';
import Footer from '../components/common/Footer';

export default function Contact() {
  return (
    <div className="w-full">

      <ContactHero />

      <ContactInfo/>

      <ContactForm />

      <ContactFAQ />

      <CallToAction />

      <Footer/>

    </div>
  );
}
