import config from "@/config/config.json";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { ContactUsItem, RegularPage } from "@/types";

const Contact = async () => {
  const data: RegularPage = getListPage("contact/_index.md");
  const { frontmatter } = data;
  const { title, description, meta_title, image, contact_meta } = frontmatter;
  const { contact_form_action } = config.params;

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={title} />
      <section className="pt-12 xl:pt-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contact_meta &&
              contact_meta?.map((contact: ContactUsItem) => (
                <div
                  key={contact.name}
                  className="p-10 bg-theme-light dark:bg-darkmode-theme-light rounded-md text-center"
                >
                  <p
                    dangerouslySetInnerHTML={markdownify(contact.name)}
                    className="mb-6 h3 font-medium text-dark dark:text-darkmode-dark"
                  />
                  <p dangerouslySetInnerHTML={markdownify(contact.contact)} />
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="mx-auto lg:col-10">
            <h2 className="mb-14 text-center">
              We would love to hear from you!
            </h2>

            <form
              className="border border-border dark:border-darkmode-border rounded-md p-10"
              action={contact_form_action}
              method="POST"
            >
              <div className="mb-6 md:grid grid-cols-2 gap-x-8 max-md:space-y-6">
                <div>
                  <label htmlFor="name" className="form-label">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="John"
                    type="text"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="name" className="form-label">
                    Last Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="Doe"
                    type="text"
                  />
                </div>
              </div>

              <div className="mb-6 md:grid grid-cols-2 gap-x-8 max-md:space-y-6">
                <div>
                  <label htmlFor="email" className="form-label">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="john.doe@email.com"
                    type="email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="name" className="form-label">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="Enquiry About"
                    type="text"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="form-label">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-input"
                  placeholder="Type your message..."
                  rows={8}
                  required
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
