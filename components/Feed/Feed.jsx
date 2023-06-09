"use client";
import "@components/Feed/feed.css";
import {  useEffect,useReducer } from "react";
import PromptCard from "@components/PromptCard/PromptCard";
/**set useReducer args--------start */
const initState={
  SearchText:'',
  posts:[],
  SearchValue:[]}
const reducer=(state,action)=>{
  switch (action.type) {
    case 'newUserInput':
      return {...state,SearchText: action.payload.SearchText,SearchValue:action.payload.SearchValue}
      case 'getPosts':
        return {...state,posts: action.payload}
    default:
     throw new Error("update state failed")
  }

}
/**set useReducer args--------end */

/**=========main function componant======== */
export default function Feed({data}) {
  const [state,dispatch]=useReducer(reducer,initState)
  /**----handle type in search inpute----------- */
  const filterPrompts = (SearchText) => {
    const regex = new RegExp(SearchText, "i");
    return state.posts.filter(
      (item) =>
        regex.test(item.userId.userName) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };
  const handleSearchChange = (e) => {
    dispatch({type:"newUserInput",payload:{SearchText:e.target.value,SearchValue:filterPrompts(e.target.value)}})
    
  };
  /**------------------------------ */
  /**--handle search by click on tag--- */
  const handleTaqClick = (e) => {
    dispatch({type:"newUserInput",payload:{SearchText:e,SearchValue:filterPrompts(e)}})
  };
  /**-------------- */
  useEffect(() => {
    if(!data){
      console.log(data)
    }else{
      dispatch({type:"getPosts",payload:data})
    }
   },[data]);
  return (
    <>
      <section className="feed">
        <form className="relative w-full flex-center">
          <input
            className="search_input peer"
            type="text"
            placeholder="search for atag or a userName"
            value={state.SearchText}
            required
            onChange={handleSearchChange}
          />
        </form>
        {state.SearchText ? (
           <div className="mt-16 prompt_layout">
           {state.SearchValue.map((post) => {
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
          {state.posts?.map((post) => {
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
