import "@components/Form/FormStyle.css";
import Link from "next/link";
export default function Form({ type, post, setPost, submit, handleSubmit }) {
  return (
    <>
      <section className="w-full">
        <h1 className="head_text  ">
          <span className="blue_gradient"> {type} prompt</span>
        </h1>
        <p className="desc max-w-md">
          {" "}
          this page to creat or update prompt (this text can change in real
          project)
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-2 w-full max-w-2xl flex flex-col gap-7 glassmorphism  "
        >
            <label>
               <span id="promptText" className="font-satoshi font-semibold text-base text-gray-700">Your Ai Prompt</span> 
            </label>
            <textarea  id="promptText" placeholder="type here your prompt" className="form_textarea"
            value={post.prompt}
            onChange={(e)=>{
                setPost({...post,prompt:e.target.value})
            }}
            required/> 
            {/**========prompt tag=========== */}
            <label className="font-satoshi font-semibold text-base text-gray-700">
                Tag {" "}
               <span id="promptTag" className=" text-gray-400">(#product,#web)</span> 
            </label>
            <input  id="promptTag" placeholder="#tag" className="form_input"
            value={post.tag}
            onChange={(e)=>{
                setPost({...post,tag:e.target.value})
            }}
            required/>
            <div className="flex-end mx-3 mb-5 gap-4">
                <Link href="/" className='text-gray-500 text-sm'>
                Cancel
                </Link>
                <button type="submit"
                diabled={`${submit}`}
                className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white">
                {submit?`${type}....`:type}
                </button>
            </div>
        </form>
      </section>
    </>
  );
}
