"use client";
import { createUrl } from "@/lib/utils";
import { slugify } from "@/lib/utils/textConverter";
import { useRouter, useSearchParams } from "next/navigation";

type ShowTagsProps = {
  tags: string[];
};

const ShowTags: React.FC<ShowTagsProps> = ({ tags }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get("t");

  const handleTagClick = (name: string) => {
    const slugName = slugify(name.toLowerCase());
    const newParams = new URLSearchParams(searchParams.toString());

    if (slugName === selectedTag) {
      newParams.delete("t");
    } else {
      newParams.set("t", slugName);
    }

    router.push(createUrl("/products", newParams), { scroll: false });
  };

  return (
    <button className="flex flex-wrap gap-3">
      {tags.map((tag: string) => (
        <p
          key={tag}
          className={`px-2 py-1 rounded-md border text-light dark:text-darkmode-light ${
            selectedTag === slugify(tag.toLowerCase()) &&
            "bg-theme-light dark:bg-theme-dark"
          } `}
          onClick={() => handleTagClick(tag)}
        >
          {tag}
        </p>
      ))}
    </button>
  );
};

export default ShowTags;
