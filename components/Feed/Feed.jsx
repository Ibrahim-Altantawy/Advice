"use client";

import "@components/Feed/feed.css";
import { useState, useEffect } from "react";
import PromptCard from "@components/PromptCard/PromptCard.jsx";

const PromptCardList = ({ data, handleTaqClick }) => {
  return (
    <>
      <div className="mt-16 prompt_layout">
        {data.map((post) => {
          return (
            <PromptCard
              key={post._id}
              post={post}
              handleTaqClick={handleTaqClick}
            />
          );
        })}
      </div>
    </>
  );
};
/**=========main function componant======== */
export default function Feed() {
  const [searchText, setSearchText] = useState("");
  const [searchValue, setSearchValue] = useState([]);
  const [posts, setPosts] = useState([]);

  /**----handle type in search inpute----------- */
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); 
    return posts.filter(
      (item) =>
        regex.test(item.userId.userName) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setSearchValue( filterPrompts(e.target.value))
  };
 /**------------------------------ */
 /**--handle search by click on tag--- */
 const handleTaqClick =(e)=>{
    setSearchText(e);
    setSearchValue( filterPrompts(e))
 }
 /**-------------- */
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("api/prompt/GetAll");
      const data = await response.json();
      setPosts(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <section className="feed">
        <form className="relative w-full flex-center">
          <input
            className="search_input peer"
            type="text"
            placeholder="search for atag or a userName"
            value={searchText}
            required
            onChange={handleSearchChange}
          />
        </form>
        {searchText?(<PromptCardList data={searchValue} handleTaqClick={() => {}} />):(<PromptCardList data={posts} handleTaqClick={handleTaqClick} />)}
      </section>
    </>
  );
}
