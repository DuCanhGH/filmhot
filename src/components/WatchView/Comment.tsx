import {
  addDoc,
  collection,
  doc,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { type FC, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPaperPlane, FaThumbsDown, FaThumbsUp } from "react-icons/fa";

import { RHFTextArea } from "@/components/Shared/RHFInput";
import { useCollectionQuery } from "@/hooks/useCollectionQuery";
import { resizeImage } from "@/shared/constants";
import { db } from "@/shared/firebase";
import type { CommentType, DetailType } from "@/shared/types";
import { calculateCreatedTime } from "@/shared/utils";
import { useStore } from "@/store";

interface CommentProps {
  data: DetailType;
  episodeIndex: number | undefined;
}

const Comment: FC<CommentProps> = ({ data, episodeIndex }) => {
  const currentUser = useStore((state) => state.currentUser);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const [commentLoading, setCommentLoading] = useState(false);

  const mediaType = typeof episodeIndex === "undefined" ? "movie" : "tv";

  const movieId = `${mediaType}-${data.id}`;

  const [commentLimit, setCommentLimit] = useState(10);

  const handleFormSubmit = handleSubmit(async (data) => {
    const { commentInput } = data;
    if (commentInput) {
      setCommentLoading(true);
      addDoc(collection(db, "comments"), {
        user: currentUser,
        value: commentInput,
        reactions: {},
        createdAt: serverTimestamp(),
        movieId,
      }).finally(() => setCommentLoading(false));
      reset({
        commentInput: "",
      });
    }
  });

  const addReaction = async (commentId: string, value: number) => {
    if (currentUser?.uid)
      updateDoc(doc(db, "comments", commentId), {
        [`reactions.${currentUser?.uid}`]: value,
      });
  };

  const {
    data: commentData,
    error,
    loading,
  } = useCollectionQuery(
    `${movieId}-${commentLimit}`,
    query(
      collection(db, "comments"),
      where("movieId", "==", movieId),
      orderBy("createdAt", "desc"),
      limit(commentLimit)
    )
  );

  return (
    <div className="max-w-[92vw] md:max-w-[calc(88vw-300px)]">
      <h1 className="text-2xl mt-10">Comments</h1>

      {error ? (
        <div className="my-3">Cannot load comments</div>
      ) : (
        <>
          {currentUser ? (
            <form
              onSubmit={handleFormSubmit}
              className="relative border border-gray-600 rounded-full my-6 w-full flex items-center justify-center"
            >
              <Image
                width={30}
                height={30}
                className="w-[30px] h-[30px] rounded-full absolute top-1/2 -translate-y-1/2 left-[10px]"
                src={resizeImage(currentUser.photoURL, "30", "30")}
                alt=""
              />
              <RHFTextArea
                register={register}
                id="comment-section-input"
                name="commentInput"
                className="w-full min-h-[3rem] h-fit break-words bg-transparent outline-none text-white px-12 resize-none"
                errors={errors}
                errorClassName="px-12"
                textareaProps={{
                  placeholder:
                    "Comment what you think...\n(max: 1000 characters)",
                  onKeyDown: (e) => e.stopPropagation(),
                  onKeyUp: (e) => e.stopPropagation(),
                  autoComplete: "off",
                  maxLength: 1000,
                  rows: 2,
                }}
                rules={{
                  maxLength: {
                    value: 1000,
                    message: "Maximum characters reached!",
                  },
                }}
              />
              {commentLoading ? (
                <div className="absolute right-[14px] top-1/2 -translate-y-1/2">
                  <div className="w-[25px] h-[25px] rounded-full border-white border-t-transparent border-[3px] animate-spin"></div>
                </div>
              ) : (
                <button
                  className="absolute right-[14px] top-1/2 -translate-y-1/2"
                  type="submit"
                >
                  <FaPaperPlane className="text-xl" />
                </button>
              )}
            </form>
          ) : (
            <div className="flex items-center gap-3 h-12 border border-gray-600 rounded-full my-6 px-3">
              <Image
                width={30}
                height={30}
                className="w-[30px] h-[30px] rounded-full"
                src="/default-avatar.png"
                alt=""
              />
              <p>
                You need to{" "}
                <Link
                  className="text-primary"
                  href={`/sign-in?redirect=${encodeURIComponent(
                    router.pathname
                  )}`}
                >
                  sign in
                </Link>{" "}
                to comment
              </p>
            </div>
          )}

          <div className="flex flex-col items-stretch gap-3 w-full">
            {commentData?.docs.map((doc) => {
              const docData = doc.data() as CommentType;
              return (
                <div key={doc.id} className="flex gap-2 w-full">
                  <Image
                    width={50}
                    height={50}
                    className="w-[50px] h-[50px] rounded-full flex-shrink-0"
                    src={resizeImage(docData.user.photoURL, "50", "50")}
                    alt=""
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex gap-2 items-end">
                      <p className="font-bold">{docData.user.displayName}</p>
                      <p className="text-gray-400 text-sm">
                        {docData?.createdAt?.seconds
                          ? calculateCreatedTime(
                              docData.createdAt.seconds * 1000
                            )
                          : "Just now"}
                      </p>
                    </div>
                    <p
                      style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}
                    >
                      {docData.value}
                    </p>
                    <div className="flex gap-3 items-center">
                      <button
                        onClick={() =>
                          addReaction(
                            doc.id,
                            Object.entries(docData.reactions).find(
                              (item) => item[0] === currentUser?.uid
                            )?.[1] === 1
                              ? 0
                              : 1
                          )
                        }
                        className={`flex items-center gap-1 transition ${
                          !currentUser
                            ? "cursor-default"
                            : "hover:brightness-75"
                        } ${
                          Object.entries(docData.reactions).find(
                            (item) => item[0] === currentUser?.uid
                          )?.[1] === 1
                            ? "text-primary"
                            : ""
                        }`}
                      >
                        <FaThumbsUp />
                        <span>
                          {
                            Object.values(docData.reactions).filter(
                              (item) => item === 1
                            ).length
                          }
                        </span>
                      </button>

                      <button
                        onClick={() =>
                          addReaction(
                            doc.id,
                            Object.entries(docData.reactions).find(
                              (item) => item[0] === currentUser?.uid
                            )?.[1] === 2
                              ? 0
                              : 2
                          )
                        }
                        className={`flex items-center gap-1 transition ${
                          !currentUser
                            ? "cursor-default"
                            : "hover:brightness-75"
                        } ${
                          Object.entries(docData.reactions).find(
                            (item) => item[0] === currentUser?.uid
                          )?.[1] === 2
                            ? "text-primary"
                            : ""
                        }`}
                      >
                        <FaThumbsDown />
                        <span>
                          {
                            Object.values(docData.reactions).filter(
                              (item) => item === 2
                            ).length
                          }
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {!loading && !commentData?.size && (
            <p className="text-center text-gray-400">No one has commented</p>
          )}

          {!loading &&
            Boolean(commentData?.size) &&
            (commentData?.size as number) >= commentLimit && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setCommentLimit(commentLimit + 10)}
                  className="bg-primary text-white px-4 py-2 rounded hover:brightness-[115%] transition"
                >
                  Load more
                </button>
              </div>
            )}
        </>
      )}
    </div>
  );
};

export default Comment;
