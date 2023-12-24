export type RegularPage = {
  frontmatter: {
    title: string;
    image?: string;
    description?: string;
    meta_title?: string;
    layout?: string;
    draft?: boolean;
    about_us?: AboutUsItem[];
    contact_meta?: ContactUsItem[];
    faq_section_title?: string;
    faq_section_subtitle?: string;
    faqs?: { title: string; content: string }[];
    testimonials_section_enable: boolean;
    testimonials_section_title?: string;
    testimonials?: {
      name: string;
      designation: string;
      avatar: string;
      content: string;
    }[];
  };
  content: string;
  slug?: string;
};

export type AboutUsItem = {
  image: string;
  content: string;
  title: string;
};

export type ContactUsItem = {
  name: string;
  contact: string;
};

export type Faq = {
  title: string;
  content: string;
};

export type Post = {
  frontmatter: {
    title: string;
    meta_title?: string;
    description?: string;
    image?: string;
    categories: string[];
    author: string;
    tags: string[];
    date?: string;
    draft?: boolean;
  };
  slug?: string;
  content?: string;
};

export type Author = {
  frontmatter: {
    title: string;
    image?: string;
    description?: string;
    meta_title?: string;
    social: [
      {
        name: string;
        icon: string;
        link: string;
      },
    ];
  };
  content?: string;
  slug?: string;
};

export type Feature = {
  button: button;
  image: string;
  bulletpoints: string[];
  content: string;
  title: string;
};

export type Testimonial = {
  name: string;
  designation: string;
  avatar: string;
  content: string;
};

export type Banner = {
  title: string;
  image: string;
  content?: string;
  button?: Button;
};

export type Call_to_action = {
  enable?: boolean;
  title: string;
  sub_title: string;
  description: string;
  image: string;
  button: Button;
};

export type Button = {
  enable: boolean;
  label: string;
  link: string;
};

export type contact_meta = {
  frontmatter: {
    heading: string;
    subHeading: string;
    subtitle?: string;
  };
  content?: string;
  slug?: string;
};

export type Categories = {
  id: number;
  name: string;
  imageSrc: string;
  itemCount: number;
};
