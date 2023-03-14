import { useSelector } from "react-redux";
import { selectAllPosts } from "features/posts/postsApiSlice";
import PostWidget from "./PostWidget";

const PostsWidget = ({ isProfile = false }) => {
  const posts = useSelector((state) => selectAllPosts(state));

  return (
    <>
      {posts.map(({ id }) => (
        <PostWidget key={id} postId={id} />
      ))}
    </>
  );
};
export default PostsWidget;
