import Mapper from "./Mapper";

export default function Posts({ data }) {
  return (
    <div className="posts-container">
      <Mapper data={data} isForPost={true} />
    </div>
  );
}
