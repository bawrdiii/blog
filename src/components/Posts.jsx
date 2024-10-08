import Mapper from "./Mapper";

export default function Posts({ data, deletePost, einzeln }) {
  return (
    <div className={`posts-container ${!einzeln && `grid grid-cols-3`}`}>
      <Mapper data={data} isForPost={true} deletePost={deletePost} />
    </div>
  );
}
