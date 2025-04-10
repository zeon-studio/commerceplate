"use client";

import { Faq } from "@/types";
import { useState } from "react";

const Expandable = ({ faqs }: { faqs: Faq[] }) => {
  const [activeTab, setActiveTab] = useState<number | null>(0);

  return (
    <>
      {faqs.map((faq: Faq, index) => (
        <div
          key={index}
          className={`accordion ${activeTab === index && "active"}`}
        >
          <button
            className="accordion-header"
            onClick={() => {
              activeTab === index ? setActiveTab(null) : setActiveTab(index);
            }}
          >
            {faq.title}
            <svg
              className="accordion-icon"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
            >
              <path
                fill="currentColor"
                d="M505.755,123.592c-8.341-8.341-21.824-8.341-30.165,0L256.005,343.176L36.421,123.592c-8.341-8.341-21.824-8.341-30.165,0 s-8.341,21.824,0,30.165l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251l234.667-234.667 C514.096,145.416,514.096,131.933,505.755,123.592z"
              ></path>
            </svg>
          </button>
          <div className="accordion-content">{faq.content}</div>
        </div>
      ))}
    </>
  );
};

export default Expandable;
