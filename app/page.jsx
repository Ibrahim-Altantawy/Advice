import Feed from "@components/Feed/Feed";
export default async function Home() {
  let data;
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL_INTERNAL}/api/prompt/GetAll`,
      { cache: "no-store" }
    );
    data = await response.json();
  } catch (error) {
    console.log(error);
  }
  return (
    <>
      <section className=" w-full flex-center flex-col">
        <h1 className="head_text text-center">
          Discover & share
          <br className="max-md:hidden" />
          <span className="orange_gradient text-center">
            AI-Powered Prompts
          </span>
        </h1>
        <p className="desc text-center">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia
          laborum voluptatibus ducimus culpa voluptate temporibus nihil maiores
          ex corporis eaque!
        </p>
      </section>
      <Feed data={data} />
    </>
  );
}
