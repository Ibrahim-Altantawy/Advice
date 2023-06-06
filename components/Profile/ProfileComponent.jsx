
import PromptCard from '@components/PromptCard/PromptCard'
export default function ProfileComponent({name,data,desc,handleEdit,handleDelet }) {
  return (
    <div className='w-full  '>
      <h1 className='head_text text-left'>
        <span className="blue_gradient">{name} Profile</span>
      </h1>
    <p className='desc text-left'>{desc}</p>
      <div className=' mt-10 prompt_layout'>
      {data.map((post)=>{
      return <PromptCard
      key={post._id}
      post={post} 
      handleEdit={()=>handleEdit&& handleEdit(post)}
      handleDelet={()=>handleDelet&& handleDelet(post)}
      /> })}

      </div>
    </div>
  )
}
