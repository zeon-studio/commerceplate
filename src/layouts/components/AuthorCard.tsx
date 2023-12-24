import Social from "@/components/Social";
import DynamicIcon from "@/helpers/DynamicIcon";
import ImageFallback from "@/helpers/ImageFallback";
import { plainify } from "@/lib/utils/textConverter";
import Link from "next/link";

export interface ISocial {
  name: string;
  icon: string;
  link: string;
}

const AuthorCard = ({ data }: { data: any }) => {
  const { title, image, social } = data.frontmatter;
  return (
    <div className="rounded bg-theme-light p-8 text-center dark:bg-darkmode-theme-light">
      {image && (
        <ImageFallback
          className="mx-auto mb-6 rounded"
          src={image}
          alt={title}
          width={120}
          height={120}
        />
      )}
      <h4 className="mb-3">
        <Link href={`/authors/${data.slug}`}>{title}</Link>
      </h4>
      <p className="mb-4">{plainify(data.content?.slice(0, 100))}</p>

      {/* social share */}
      <ul className="social-icons">
        {social.map((social: ISocial) => (
          <li key={social.name}>
            <a
              aria-label={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <span className="sr-only">{social.name}</span>
              <DynamicIcon className="inline-block" icon={social.icon} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorCard;
