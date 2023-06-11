"use client";
import "@components/Feed/feed.css";
import {  useReducer } from "react";
import PromptCard from "@components/PromptCard/PromptCard";
import useSWR from 'swr'
import axios from "axios";
/**---swr set */
const fetcher = url => axios.get(url).then(res => res.data)

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
export default function Feed() {
  const [state,dispatch]=useReducer(reducer,initState)
  /**----handle type in search inpute----------- */
  const filterPrompts = (SearchText) => {
    const regex = new RegExp(SearchText, "i");
    return data.filter(
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

  const { data,error, isLoading  } = useSWR(`/api/prompt/GetAll`, fetcher,{ refreshInterval: 1000,revalidateOnMount:true })
  if (isLoading){
    return <>
    <div>
      <h1> loading data ...............</h1>
    </div>
    </>
  }
  if(error){
    console.log(error)
    return 
   
  } if(data.length<=0){
    return <>
    <div>
      <h1 className="orange_gradient font-satoshi font-semibold mt-10 curisor-pointer"> There is not any advice yet ...be first one share his experience</h1>
     </div>
    </>
   
  }
 
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
          {data?.map((post) => {
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
