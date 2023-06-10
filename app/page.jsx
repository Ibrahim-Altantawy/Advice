import Feed from "@components/Feed/Feed";

export default async function Home() {
  return (
    <>
      <section className=" w-full flex-center flex-col">
        <h1 className="head_text text-center">
          Discover & share
          <br className="max-md:hidden" />
          <span className="orange_gradient text-center">
            AI-Powered experiences
          </span>
        </h1>
        <p className="desc text-center">
        Everything has charity, and the charity of knowledge is spreading it and teaching it to those who do not know, so do not be stingy with your advice
        </p>
      </section>
      <Feed  />
    </>
  );
}
