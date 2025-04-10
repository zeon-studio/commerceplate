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
          className={`cursor-pointer px-2 py-1 rounded-md border border-border dark:border-border/40 text-text-light dark:text-darkmode-text-light ${selectedTag === slugify(tag.toLowerCase()) &&
            "bg-light dark:bg-dark"
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
