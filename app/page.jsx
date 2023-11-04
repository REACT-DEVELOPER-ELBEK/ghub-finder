"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchSearchPosts();
  };

  const fetchSearchPosts = async () => {
    try {
      let res = await axios.get(
        `https://api.github.com/search/users?q=${searchQuery}`
      );
      let data = await res.data.items;
      setPosts(data);
      console.log(posts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSearchPosts();
  }, []);

  const handleClear = () => {
    setSearchQuery("");
    setPosts([]);
  };

  return (
    <div className="container p-[30px] mx-auto">
      <form onSubmit={handleSubmit}>
        <input
          className="w-full p-3 outline-none border-2 rounded-md"
          type="text"
          placeholder="Search Users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="w-full bg-[#333333] text-white py-2 rounded-md  hover:bg-white hover:text-[#333333] hover:transition-[0.3s] transition-[0.3s] border-2"
          >
            Search
          </button>
          <button
            onClick={handleClear}
            className="px-[1.4rem] py-[0.5rem] mx-[4.5rem] text-white my-5 bg-[#333333] border-2 text-800 hover:bg-white hover:border-2 hover:text-black transition-[0.3s] hover:transition-[0.3s]"
          >
            Clear
          </button>
        </div>
      </form>
      <div className="grid grid-cols-3 gap-[5rem]">
        {posts.map((ps) => (
          <div
            className="user-card border-2 w-[15rem] h-[15rem] mt-[5rem]"
            key={ps.id}
          >
            <img
              src={ps.avatar_url}
              className="w-[5rem] mx-auto my-5"
              alt="Error"
            />
            <h1 className="mx-[3.4rem] text-[1.5rem]">{ps.login}</h1>
            <Link href={`/${ps.login}`}>
              <button className="px-[1.4rem] py-[0.5rem] mx-[4.5rem] text-white my-5 bg-[#333333] border-2 text-800 hover:bg-white hover:border-2 hover:text-black transition-[0.3s] hover:transition-[0.3s]">
                More
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
