"use client";

import { useEffect, useState } from "react";

const Tabs = ({ descriptionHtml }: { descriptionHtml: string }) => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const contentArray = description.split(`--- split content ---`);

  useEffect(() => {
    setDescription(descriptionHtml);
    setLoading(false);
  }, [descriptionHtml]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="border-b-2 relative border-border dark:border-border/40 flex">
        <button
          onClick={() => setSelectedTab(0)}
          className={`${selectedTab === 0
            ? "border-t-2 border-l-2 border-r-2 border-b-0 bg-body dark:bg-darkmode-body border-border dark:border-border/40 translate-y-[2px]"
            : "border-transparent"
            } cursor-pointer focus:outline-none px-6 rounded-tl-md rounded-tr-md h-12 py-2 border-t-2 border-l-2 border-r-2 border-b-0`}
        >
          Description
        </button>
        {contentArray[1] && (
          <button
            onClick={() => setSelectedTab(1)}
            className={`${selectedTab === 1
              ? "border-t-2 border-l-2 border-r-2 border-b-0 border-border dark:border-border/40 bg-body dark:bg-darkmode-body translate-y-[2px]"
              : "border-transparent"
              } cursor-pointer focus:outline-none px-6 rounded-tl-md rounded-tr-md h-12 py-2 border-t-2 border-l-2 border-r-2 border-b-0 ml-8`}
          >
            More Info
          </button>
        )}
      </div>
      <div className="border-l-2 border-r-2 border-b-2 border-border dark:border-border/40 rounded-bl-md rounded-br-md p-6">
        {selectedTab === 0 && (
          <div
            className="space-y-4"
            dangerouslySetInnerHTML={{ __html: contentArray[0] }}
          />
        )}
        {selectedTab === 1 && contentArray[1] && (
          <div
            className="space-y-4"
            dangerouslySetInnerHTML={{ __html: contentArray[1] }}
          />
        )}
      </div>
    </>
  );
};

export default Tabs;
