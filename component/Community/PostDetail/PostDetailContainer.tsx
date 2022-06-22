import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { postDetailType } from "../../../lib/apitype/post";
import {
  axiosDeleteComment,
  axiosDeletelikecount,
  axiosDeletePostDetail,
  axiosPostComment,
  axiosPostlikecount,
} from "../../../lib/commonFn/api";
import { RootReducer } from "../../../store";
import PostDetail from "./PostDetail";

interface PostDetailContainerProps {
  serverSideData: postDetailType;
}

const PostDetailContainer = ({ serverSideData }: PostDetailContainerProps) => {
  const loginedUser = useSelector((state: RootReducer) => state.userLogin);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [comments, setComments] = useState(serverSideData.Comments);
  const [likelist, setLikelist] = useState(serverSideData.likelist);
  const router = useRouter();

  const postComment = async () => {
    if (textareaRef.current !== null && loginedUser.loginStatus) {
      try {
        const newComment = await axiosPostComment(
          serverSideData.id,
          textareaRef.current.value
        );
        newComment.data.UserId = loginedUser.userInfo.id;
        setComments([...comments, newComment.data]);
        textareaRef.current.value = "";
      } catch (error) {
        alert("에러가 발생하였습니다 다시 시도해주세요");
      }
    } else {
      alert("로그인 해주세요");
      router.push("/user/auth/signin");
    }
  };

  const deleteComment = async (CommentId: number, UserId: number) => {
    const agree = window.confirm("댓글을 삭제하시겠습니까?");
    if (agree) {
      try {
        await axiosDeleteComment(CommentId, UserId);
        setComments(
          comments.filter((data) => {
            if (data.id == CommentId) {
              return false;
            }
            return true;
          })
        );
      } catch (error) {
        alert("에러가 발생했습니다 다시 시도해보세요");
      }
    }
  };

  const deletePost = async (PostId: number, UserId: number) => {
    const agree = window.confirm("포스트를 삭제하시겠습니까?");
    if (agree) {
      try {
        await axiosDeletePostDetail(PostId, UserId);
        router.push("/community/postlist");
      } catch (error) {
        alert("에러가 발생했습니다 다시 시도해보세요");
      }
    }
  };

  const deleteOrPostLikecount = async () => {
    if (loginedUser.loginStatus && loginedUser.userInfo.id !== undefined) {
      try {
        if (likelist.indexOf(loginedUser.userInfo.id) === -1) {
          await axiosPostlikecount(serverSideData.id);
          setLikelist([...likelist, loginedUser.userInfo.id]);
        } else {
          await axiosDeletelikecount(serverSideData.id);
          setLikelist(
            likelist.filter((id: number) => {
              if (id == loginedUser.userInfo.id) {
                return false;
              }
              return true;
            })
          );
        }
      } catch (error) {
        alert("에러가 발생했습니다 다시 시도해보세요");
      }
    } else {
      alert("로그인을 진행해주세요");
    }
  };

  return (
    <PostDetail
      serverSideData={serverSideData}
      textareaRef={textareaRef}
      comments={comments}
      likelist={likelist}
      loginedUser={loginedUser}
      postComment={postComment}
      deleteOrPostLikecount={deleteOrPostLikecount}
      deleteComment={deleteComment}
      deletePost={deletePost}
    />
  );
};

export default PostDetailContainer;
