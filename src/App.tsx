import React, { useEffect, useRef, useState } from 'react';
import { SITE } from './Site/Site';
import Header from './Components/Partials/Header';
import Footer from './Components/Partials/Footer';
import Hero from './Components/Sections/Hero';
import HowItWorks from './Components/Sections/HowItWorks';
import Assurances from './Components/Sections/Assurances';
import Partners from './Components/Sections/Partners';
import FAQ from './Components/Sections/Faq';
import USPBar from './Components/Sections/USPBar';
import LeadForm2Step from './Forms/LeadForm2Step';
import WhatsAppFloating from './Third-Party services/WhatsApp/WhatsappFloating';
import TrustStrip from './Components/Sections/TrustStrip';

//This is the dev branch

function App() {

  useEffect(() => { document.title = `${SITE.BRAND_NAME} – Snel je auto verkopen`; }, []);

  return (
    <div className="min-h-screen text-gray-900 bg-white">
      <Header />
      <Hero />
      <USPBar />
       <main className="mx-auto max-w-6xl px-4">
        <section className="py-8" id="aanvraag">
          <LeadForm2Step />
        </section>
        <HowItWorks />
        <Assurances />
        <TrustStrip />
        <Partners />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppFloating />
    </div>
  );
}

export default App;
