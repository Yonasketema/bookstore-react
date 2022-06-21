import styled from "@emotion/styled";

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

export { Button, FlexBox, Select };
