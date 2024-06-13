"use client";
import { formatDate } from '@/lib/format';
import {useOptimistic} from "react";
import LikeButton from './like-icon';
import { togglePostLikeStatus } from '@/action/post';
function Post({ post }) {

  return (
    <article className="post">
      <div className="post-image">
        <img src={post.image} fill alt={post.title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{' '}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form action={togglePostLikeStatus.bind(null,post.id)}
className={post.isLiked?'liked':""}>
            <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {

    const [optimisticPosts, updateOptimisticPosts] = useOptimistic(
      posts,
      (prevPost, updatedPostId) => {
        const updatedPostIndex = prevPosts.findIndex(
          (post) => post.id === updatedPostId
        );

        if (updatedPostIndex === -1) {
          return prevPost;
        }

        const updatedPost = { ...prevPost[updatedPostIndex] };
        updatedPost.likes = updatedPost.like + (updatedPost.isLiked ? -1 : 1);
        updatedPost.isLiked = !updatedPost.isLiked;
        const newPosts = [...prevPosts];
        newPosts[updatedPostIndex] = updatedPost;
        return newPosts;
      }
    );
  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }
const updatedPost=async(postId)=>{
  updateOptimisticPosts(postId);
  await togglePostLikeStatus(postId)
}

  return (
    <ul className="posts">
      {posts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatedPost} />
        </li>
      ))}
    </ul>
  );
}
