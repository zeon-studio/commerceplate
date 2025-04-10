import Expandable from "@/components/Expandable";
import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import Testimonials from "@/partials/Testimonials";
import { AboutUsItem, RegularPage } from "@/types";
import Link from "next/link";
import { FaBoxOpen, FaCheckCircle, FaHeadset } from "react-icons/fa";

const About = () => {
  const data: RegularPage = getListPage("about/_index.md");

  const { frontmatter } = data;
  const {
    title,
    about_us,
    faq_section_title,
    button,
    faq_section_subtitle,
    faqs,
    testimonials_section_enable,
    testimonials_section_title,
    testimonials,
    staff_section_enable,
    staff,
  } = frontmatter;

  return (
    <>
      <SeoMeta {...frontmatter} />

      <PageHeader title={title} />

      <section>
        <div className="container">
          {about_us?.map((section: AboutUsItem, index: number) => (
            <div
              className={`lg:flex gap-8 mt-14 lg:mt-28`}
              key={section?.title}
            >
              {index % 2 === 0 ? (
                <>
                  <ImageFallback
                    className="rounded-md mx-auto"
                    src={section?.image}
                    width={536}
                    height={449}
                    alt={section?.title}
                  />
                  <div className="mt-10 lg:mt-0">
                    <h2>{section?.title}</h2>
                    <p
                      className="mt-4 text-text-light dark:text-darkmode-text-light leading-7"
                      dangerouslySetInnerHTML={markdownify(section?.content)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h2>{section.title}</h2>
                    <p
                      className="mt-4 text-text-light dark:text-darkmode-text-light leading-7"
                      dangerouslySetInnerHTML={markdownify(section.content)}
                    />
                  </div>
                  <ImageFallback
                    className="rounded-md mx-auto mt-10 lg:mt-0"
                    src={section.image}
                    width={536}
                    height={449}
                    alt={section.title}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {testimonials_section_enable && (
        <Testimonials
          title={testimonials_section_title!}
          testimonials={testimonials!}
        />
      )}

      <section>
        <div className="container">
          <div className="text-center">
            <h2>Our Staff</h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-14">
              {staff_section_enable &&
                staff!.map((s, idx) => (
                  <div key={idx} className="border border-border rounded-lg">
                    <div className="py-6 space-y-2">
                      <h3 className="h4">{s.name}</h3>
                      <p className="text-text-dark dark:text-darkmode-text-light">{s.designation}</p>
                    </div>
                    <div className="bg-light rounded-b-xl mx-auto">
                      <ImageFallback
                        src={s.avatar}
                        alt={`Staff-${s.name}`}
                        width={290}
                        height={250}
                        className="mx-auto w-full h-[250px] rounded-b-xl overflow-hidden"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="bg-light px-7 py-20 dark:bg-darkmode-light text-center rounded-md">
            <h2>Reasons to shop with us</h2>

            <div className="row justify-center gap-6 mt-14">
              <div className="col-6 md:col-5 lg:col-3">
                <div className="flex justify-center">
                  <FaHeadset size={48} />
                </div>
                <h3 className="md:h4 mt-6 mb-4">24/7 Friendly Support</h3>
                <p>Our support team always ready for you to 7 days a week</p>
              </div>

              <div className="col-6 md:col-5 lg:col-3">
                <div className="flex justify-center">
                  <FaBoxOpen size={48} />
                </div>
                <h3 className="md:h4 mt-6 mb-4">7 Days Easy Return</h3>
                <p>
                  Product any fault within 7 days for an immediately exchange.
                </p>
              </div>

              <div className="col-6 md:col-5 lg:col-3">
                <div className="flex justify-center">
                  <FaCheckCircle size={48} />
                </div>
                <h3 className="md:h4 mt-6 mb-4">Quality Guaranteed</h3>
                <p>
                  If your product are not perfect, return them for a full refund
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="bg-light px-7 lg:px-32 py-20 dark:bg-darkmode-light mb-14 xl:mb-28 rounded-b-md">
            <div className="row">
              <div className="md:col-5 mx-auto space-y-5 mb-10 md:mb-0">
                <h1 dangerouslySetInnerHTML={markdownify(faq_section_title!)} />
                <p
                  dangerouslySetInnerHTML={markdownify(faq_section_subtitle!)}
                  className="md:text-lg"
                />

                {button?.enable && (
                  <Link
                    className="btn btn-sm md:btn-lg btn-primary font-medium"
                    href={button.link}
                  >
                    {button.label}
                  </Link>
                )}
              </div>

              <div className="md:col-7">
                <Expandable faqs={faqs!} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
