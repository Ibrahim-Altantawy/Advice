
import PromptCard from "./PromptCard";
export default function PromptCardList({ data, handleTaqClick }) {
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
  )
}
