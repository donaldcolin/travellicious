import React from "react";
import "./css/aboutus.css";
import { Accordion,AccordionContent,AccordionTrigger } from "@/components/ui/accordion";

export const AboutUs = () => {
  return (
    <div className="aboutus-container">
      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <h1>About Us</h1>
          <p>
            Welcome to <strong>Travellicious</strong>. We are dedicated to delivering the best products and services tailored
            to our customers' needs. Our team believes in innovation, integrity, and excellence, and we strive to create
            a lasting impact in the industry.
          </p>
        </div>
        <div className="about-image">
          <img src="https://placehold.co/400" alt="About Us" />
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-image">
          <img src="https://placehold.co/400" alt="Our Mission" />
        </div>
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            Our mission is to create value for our customers by providing innovative solutions and building long-term
            relationships. We aim to empower businesses and individuals to achieve their goals through our products and
            services.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <h3>50+</h3>
            <p>Total Treks Conducted</p>
          </div>
          <div className="stat-item">
            <h3>600+</h3>
            <p>Happy Customers</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          {/* Team Member 1 */}
          <div className="team-member">
            <div className="team-member-image">
              <img src="https://placehold.co/400" alt="Chidanandha" />
            </div>
            <div className="team-member-content">
              <h3>Chidanandha</h3>
              <p>CEO</p>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="team-member">
            <div className="team-member-content">
              <h3>Donald Colin</h3>
              <p>CTO & Web Developer</p>
            </div>
            <div className="team-member-image">
              <img src="https://placehold.co/400" alt="Donald Colin" />
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="team-member">
            <div className="team-member-image">
              <img src="https://placehold.co/400" alt="Emily Brown" />
            </div>
            <div className="team-member-content">
              <h3>Random member</h3>
              <p>Business operations</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section>
      <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
        Frequently Asked Questions
      </h2>
      <div className="max-w-5xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1" className="border-slate-200">
            <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 transition-all duration-200 text-slate-700 hover:text-slate-900">
              Is it accessible?
            </AccordionTrigger>
            <AccordionContent className="px-6 py-4 text-slate-600">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2" className=" border-slate-200">
            <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 transition-all duration-200 text-slate-700 hover:text-slate-900">
              How do I book a trek?
            </AccordionTrigger>
            <AccordionContent className="px-6 py-4 text-slate-600">
              You can book a trek through our website or by contacting our customer service team.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3" className=" border-slate-200">
            <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 transition-all duration-200 text-slate-700 hover:text-slate-900">
              What equipment do I need?
            </AccordionTrigger>
            <AccordionContent className="px-6 py-4 text-slate-600">
              We provide a detailed equipment list for each trek. Basic requirements include proper hiking boots, 
              weather-appropriate clothing, and a daypack.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
    </div>
  );
};

export default AboutUs;