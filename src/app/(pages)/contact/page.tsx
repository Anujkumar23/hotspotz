import ContactForm from "@/components/ContactForm";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

const Contact: NextPage = () => {
  return <ContactForm />;
};
export default Contact;
