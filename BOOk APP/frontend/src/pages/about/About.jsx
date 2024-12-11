import React from "react";
import { BsCloudArrowUp } from "react-icons/bs";
import { HiLockClosed, HiServer } from "react-icons/hi";

const About = () => {
  return (
    <div className="mt-20">
      <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg
            className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="grid-pattern"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <p className="text-base font-semibold leading-7 text-indigo-600">
                  About Us
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Transforming Your Reading Experience
                </h1>
                <p className="mt-6 text-xl leading-8 text-gray-700">
                  Our platform makes managing and discovering books seamless.
                  Whether you're an avid reader, a librarian, or someone looking
                  to organize their collection, we've got you covered.
                </p>
              </div>
            </div>
          </div>
          <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <img
              className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
              src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
              alt="Dashboard Screenshot"
            />
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                <p>
                  We provide an intuitive platform for uploading, managing, and
                  exploring books with ease. From tracking your favorite genres
                  to managing your book inventory, we simplify every aspect of
                  book management.
                </p>
                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                  <li className="flex gap-x-3">
                    <BsCloudArrowUp
                      className="mt-1 h-5 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="font-semibold text-gray-900">
                        Easy Book Uploads
                      </strong>{" "}
                      Quickly add books to your collection with detailed
                      descriptions and categorized information.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <HiLockClosed
                      className="mt-1 h-5 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="font-semibold text-gray-900">
                        Secure and Reliable
                      </strong>{" "}
                      Your data is protected with secure connections and regular
                      backups.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <HiServer
                      className="mt-1 h-5 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="font-semibold text-gray-900">
                        Organized Inventory
                      </strong>{" "}
                      Effortlessly manage your books with tools designed for
                      optimal organization.
                    </span>
                  </li>
                </ul>
                <p className="mt-8">
                  Our mission is to enhance your reading journey by providing a
                  comprehensive, user-friendly platform. Whether it's for
                  leisure, learning, or sharing, we aim to be your go-to book
                  management solution.
                </p>
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
                  Ready to Explore?
                </h2>
                <p className="mt-6">
                  Dive into a world of books, manage your collections, and enjoy
                  a hassle-free experience with our intuitive platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
