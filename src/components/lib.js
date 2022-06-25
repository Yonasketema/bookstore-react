import styled from "@emotion/styled";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { BiCommentDetail } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { BsFillBookmarkFill } from "react-icons/bs";
const Button = styled.button({
  fontSize: "1rem",
  fontWeight: "400",
  padding: ".4rem .8rem",
  border: "none",
  borderRadius: ".3rem",
  color: "#fff",
  backgroundColor: "#191919",
  height: "2rem",
});

const LikeButton = styled(FcLikePlaceholder)({
  fontSize: "2.5rem",
});

const DisLikeButton = styled(FcLike)({
  fontSize: "2.5rem",
});

const CommentButton = styled(BiCommentDetail)({
  fontSize: "2.5rem",
});

const UnSavedButton = styled(BsFillBookmarkFill)({
  fontSize: "2.5rem",
});
const SaveButton = styled(BsBookmark)({
  fontSize: "2.5rem",
});

const Select = styled.select({
  fontSize: "1rem",
  fontWeight: "400",
  padding: ".4rem .8rem",
  border: "none",
  borderRadius: ".3rem",
  color: "#fff",
  backgroundColor: "#191919",
  height: "2rem",
  width: "9rem",
});

const FlexBox = styled.div({
  display: "flex",
  gap: "1rem",
});

const inputStyles = {
  border: "1px solid #999",
  background: "#f1f2f7",
  padding: "8px 12px",
  outline: "none",
};

const Input = styled.input({ borderRadius: "3px" }, inputStyles);

export {
  Button,
  FlexBox,
  Select,
  Input,
  LikeButton,
  DisLikeButton,
  CommentButton,
  SaveButton,
  UnSavedButton,
};
