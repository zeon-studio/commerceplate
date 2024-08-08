import MDXContent from "@/helpers/MDXContent";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { RegularPage } from "@/types";
import { notFound } from "next/navigation";

// Generate static params
export const generateStaticParams = () => {
  const regularPages = getSinglePage("pages").map((page: RegularPage) => ({
    regular: page.slug,
  }));
  return regularPages;
};

// For all regular pages
const RegularPages = ({ params }: { params: { regular: string } }) => {
  const regularData = getSinglePage("pages");
  const data = regularData.find(
    (page: RegularPage) => page.slug === params.regular
  );

  if (!data) return notFound();

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
      <section className="section">
        <div className="container">
          <div className="content">
            <MDXContent content={content} />
          </div>
        </div>
      </section>
      {/* <CallToAction data={callToAction} /> */}
    </>
  );
};

export default RegularPages;
