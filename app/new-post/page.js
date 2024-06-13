
import { createPost } from "@/action/post";
import PostForm from "@/components/postForm";

export default function NewPostPage() {

return <PostForm action={createPost}/>
}
