import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import { Call_to_action } from "@/types";
import Link from "next/link";

interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: Call_to_action;
}

const CallToAction = ({ data }: { data: PageData }) => {
  return (
    <>
      {data.frontmatter.enable && (
        <section className="section">
          <div className="container">
            <div className="rounded-xl bg-theme-light px-6 py-8 md:py-16 dark:bg-darkmode-theme-light">
              <div className="row items-center">
                <div className="mb-10 md:mb-0 lg:col-6 xl:col-6 mx-auto text-center order-2 lg:order-0">
                  <p
                    dangerouslySetInnerHTML={markdownify(
                      data.frontmatter.sub_title,
                    )}
                    className="md:text-lg text-dark dark:text-darkmode-dark font-bold"
                  />
                  <h2
                    dangerouslySetInnerHTML={markdownify(
                      data.frontmatter.title,
                    )}
                    className="my-2 h1"
                  />
                  <p
                    dangerouslySetInnerHTML={markdownify(
                      data.frontmatter.description,
                    )}
                    className="mb-6 md:text-lg"
                  />

                  {data.frontmatter.button.enable && (
                    <Link
                      className="btn btn-sm md:btn-lg btn-primary font-medium"
                      href={data.frontmatter.button.link}
                    >
                      {data.frontmatter.button.label}
                    </Link>
                  )}
                </div>

                <div className="mx-auto lg:col-5 mb-6 lg:mb-0">
                  <ImageFallback
                    src={data.frontmatter.image}
                    width={543}
                    height={390}
                    alt="cta-image"
                    className="mx-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CallToAction;
