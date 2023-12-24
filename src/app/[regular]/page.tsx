import MDXContent from "@/helpers/MDXContent";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import CallToAction from "@/partials/CallToAction";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { RegularPage } from "@/types";

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams = () => {
  const getRegularPages = getSinglePage("pages");

  const regularPages = getRegularPages.map((page: RegularPage) => ({
    regular: page.slug,
  }));

  return regularPages;
};

// for all regular pages
const RegularPages = ({ params }: { params: { regular: string } }) => {
  const regularData = getSinglePage("pages");
  const data = regularData.filter(
    (page: RegularPage) => page.slug === params.regular,
  )[0];
  const { frontmatter, content } = data;
  const { title, meta_title, description, image } = frontmatter;
  const callToAction = getListPage("sections/call-to-action.md");

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={title} />
      <section className="pt-8 xl:pt-16">
        <div className="container">
          <div className="content">
            <MDXContent content={content} />
          </div>
        </div>
      </section>
      <CallToAction data={callToAction} />
    </>
  );
};

export default RegularPages;
