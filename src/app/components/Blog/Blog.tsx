"use client";

import { motion, Variants } from "framer-motion";
import SingleBlog from "../SingleBlog/SingleBlog";

import BlogImg1 from "../../../../public/images/B1.svg";
import BlogImg2 from "../../../../public/images/B2.svg";
import BlogImg3 from "../../../../public/images/B3.svg";

const blogPosts = [
  {
    image: BlogImg1,
    date: "June 20, 2024",
    title: "Where to Give Now",
    description:
      "Dolor donec eget morbi nisi. Eu ut et enim ornare nisl vel auctor odio a. Curabitur porttitor quis gravida porttitor vel...",
    link: "/blog/where-to-give-now",
  },
  {
    image: BlogImg2,
    date: "July 10, 2024",
    title: "How Donations Change Lives",
    description:
      "Ut id velit tempor eu amet nunc. Vestibulum iaculis cras sed odio. Curabitur porttitor quis gravida...",
    link: "/blog/donations-change-lives",
  },
  {
    image: BlogImg3,
    date: "August 1, 2024",
    title: "Community Stories",
    description:
      "Vestibulum habitasse morbi risus orci in. Cursus ultricies at malesuada arcu, ac posuere...",
    link: "/blog/community-stories",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
  },
};

export default function Blog() {
  return (
    <section className="h-full bg-white py-10 px-6 md:px-14">
      <div className="flex items-center justify-between">
        <h3 className="text-[25px] text-[#0e372d] font-semibold">
          Latest News and Blog
        </h3>
        <button className="border-2 text-[#0e372d] font-medium border-[#0e372d] hover:bg-[#0e372d] hover:text-white px-4 md:px-6 py-1 md:py-2 rounded-[10px] transition duration-100">
          More News
        </button>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5 md:gap-5 lg:gap-10 place-items-center md:place-items-stretch mt-7"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {blogPosts.map((post, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <SingleBlog
              image={post.image}
              date={post.date}
              title={post.title}
              description={post.description}
              link={post.link}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
