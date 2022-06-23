import styled from "@emotion/styled";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
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
  fontSize: "3rem",
});

const DisLikeButton = styled(FcLike)({
  fontSize: "3rem",
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
  border: "1px solid #f1f1f4",
  background: "#f1f2f7",
  padding: "8px 12px",
};

const Input = styled.input({ borderRadius: "3px" }, inputStyles);

export { Button, FlexBox, Select, Input, LikeButton, DisLikeButton };
