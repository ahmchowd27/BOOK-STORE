import React, { useState, useContext, useEffect } from "react";
import { Spinner } from "flowbite-react";
import { AuthContext } from "../../contexts/AuthProvider";

const Blog = () => {
  const { loading } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]); // Store blogs (fetched + user-created)
  const [newBlog, setNewBlog] = useState({
    title: "",
    description: "",
    author: "Guest Author",
    date: new Date().toLocaleDateString(),
  });

  // Fetch blogs from an API (e.g., JSONPlaceholder)
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((response) => response.json())
      .then((data) => {
        const formattedBlogs = data.map((post) => ({
          id: post.id,
          title: post.title,
          description: post.body,
          author: "API Author",
          date: "Mar 16, 2020", // Static for demo
        }));
        setBlogs((prev) => [...prev, ...formattedBlogs]);
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  // Handle new blog submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setBlogs((prev) => [
      {
        ...newBlog,
        id: prev.length + 1,
      },
      ...prev,
    ]);
    setNewBlog({ title: "", description: "", author: "Guest Author" });
  };

  if (loading) {
    return (
      <div className="text-center mt-28">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              From the Blog
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Share your thoughts or read blogs from others.
            </p>
          </div>

          {/* Blog Form */}
          <form
            onSubmit={handleSubmit}
            className="mb-10 bg-gray-100 p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-4">Write a New Blog</h3>
            <input
              type="text"
              placeholder="Blog Title"
              value={newBlog.title}
              onChange={(e) =>
                setNewBlog({ ...newBlog, title: e.target.value })
              }
              className="w-full mb-4 p-2 border rounded"
              required
            />
            <textarea
              placeholder="Blog Description"
              value={newBlog.description}
              onChange={(e) =>
                setNewBlog({ ...newBlog, description: e.target.value })
              }
              className="w-full mb-4 p-2 border rounded"
              rows="4"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Post Blog
            </button>
          </form>

          {/* Blogs Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="p-6 bg-white rounded-lg shadow-lg flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                  <p className="text-gray-700">{blog.description}</p>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  <p>By: {blog.author}</p>
                  <p>Date: {blog.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
