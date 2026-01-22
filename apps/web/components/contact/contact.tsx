import { contactsFirstRow, contactsSecondRow } from "@/config/contact";
import { ContactCard } from "./contact-card";
import { SectionHeading } from "../ui";

export default function ContactSection() {
  return (
    <section className="flex flex-col gap-8 sm:gap-12 lg:gap-16 items-center justify-center w-full font-inria">
      <div className="flex flex-col justify-center items-center gap-12 sm:gap-16 lg:gap-20 w-full">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-12 sm:gap-16 md:gap-24 lg:gap-32 xl:gap-40 w-full">
          {contactsFirstRow.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>

        {/* {contactsSecondRow.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))} */}
        <div className="max-w-4xl mx-auto w-full">
          <SectionHeading
            title="Organising Team"
            containerClassName="mb-20 mt-5"
            textClassName="text-base"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {contactsSecondRow.map((contact) => (
              <div
                key={contact.id}
                className="flex flex-col gap-2 bg-white/20 about-card-body-2 w-full p-4"
              >
                <p className="text-base">{contact.name}</p>
                <p className="text-base">{contact.role}</p>
                <p className="text-base">{contact.phone}</p>
              </div>
            ))}
          </div>
        </div>
        {/* <InstituteInfoCard /> */}
      </div>
    </section>
  );
}
