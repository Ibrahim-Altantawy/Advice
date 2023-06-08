"use client";
import "@components/Feed/feed.css";
import { useState, useEffect } from "react";
import PromptCard from "@components/PromptCard/PromptCard";
/**=========main function componant======== */
export default function Feed({data}) {
  const [searchText, setSearchText] = useState('');
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
    setSearchValue(filterPrompts(e.target.value));
  };
  /**------------------------------ */
  /**--handle search by click on tag--- */
  const handleTaqClick = (e) => {
    setSearchText(e);
    setSearchValue(filterPrompts(e));
  };
  /**-------------- */
  useEffect(() => {
    if(!posts){
      console.log(posts)
    }else{
      setPosts(data);
    }
   },[]);
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
        {searchText ? (
           <div className="mt-16 prompt_layout">
           {searchValue.map((post) => {
             return (
               <PromptCard
                 key={post._id}
                 post={post}
                 handleTaqClick={handleTaqClick}
               />
             );
           })}
         </div>
        ) : (
          <div className="mt-16 prompt_layout">
          {posts?.map((post) => {
            return (
              <PromptCard
                key={post._id}
                post={post}
                handleTaqClick={handleTaqClick}
              />
            );
          })}
        </div>
        )}
      </section>
    </>
  );
}
