import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import {useState} from 'react'

const Success = ({ data }) => {

  const { frontmatter } = data;
  const { title, info } = frontmatter;

  return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "text-center font-normal")}
        <div className="flex text-center justify-center pb-0 w-full">
          <div className=" mt-4 w-1/3">
            {markdownify(info.title, "h4", "text-gray-500")}
            {markdownify(info.description, "p", "mt-4")}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Success;
