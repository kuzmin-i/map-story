import { motion } from "framer-motion";
import styled from "styled-components";

const colors = {
  orange: "#FF6813",
};

const Circle = styled.div`
  border: 10px solid ${({ fill }) => (fill ? fill : "black")};
  background: ${({ inside }) => (inside ? `url("${inside}")` : "white")};
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  width: 80px;
  height: 80px;
`;

const Label = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: black;
  background: white;
  border-radius: 20px;
  padding: 2px 10px;
  position: absolute;
  left: ${({ left }) => (left ? left : `0px`)};
  bottom: ${({ bottom }) => (bottom ? bottom : `0px`)};
`;

const Marker = ({ noAnimation }) => {
  const type = "me";

  const isMe = type === "me";
  const isSecret = type === "secret";

  let primaryColor;

  switch (type) {
    case "me":
      primaryColor = "#FF6813";
      break;
    case 'secret': 
        primaryColor = '#FFC001'
    default:
      primaryColor = "black";
      break;
  }

  primaryColor = colors.orange;

  return (
    <>
      <div style={{ width: "100px", height: "120px", position: "relative" }}>
        <div
          style={{
            width: "100px",
            height: "120px",
            /*background: "lightgrey",*/
            borderRadius: "5px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Circle fill={primaryColor} inside={`/icons/1.jpg`}></Circle>

          {isMe && (
            <>
              <Label left={`0px`} bottom={`-25px`}>
                YOU're
              </Label>
              <Label left={`30px`} bottom={`-50px`}>
                HERE
              </Label>
            </>
          )}

          <svg
            width="20"
            height="20"
            viewBox="0 0 267 216"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "relative", top: "-2px" }}
          >
            <path d="M133.5 216L0 0H267L133.5 216Z" fill={primaryColor} />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Marker;
