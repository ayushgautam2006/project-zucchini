import ContactSection from "@/components/contact/contact";
import InstituteInfoCard from "@/components/contact/institute-card";
import { SectionHeading } from "@/components/ui";
import { background } from "@/config/events";

export default function AboutPage() {
  return (
    <>
      <div className="fixed inset-0 w-full h-[200svh] md:h-screen -z-10 pointer-events-none">
        <img className="w-full h-full object-cover" alt="Carnival Background" src={background} />
      </div>

      <main className="min-h-screen pb-32 pt-48">
        <div className="h-full max-w-7xl mx-auto px-10" id="contact">
          <SectionHeading title="Contact Us" containerClassName="mb-20" />
          <ContactSection />
        </div>
      </main>

      <section className="w-full flex justify-center items-center pt-20 pb-40 px-5">
        <InstituteInfoCard />
      </section>
    </>
  );
}
