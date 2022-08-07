import { motion } from "framer-motion";
import styled from "styled-components";

const Label = styled(motion.div)`
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

const Marker = ({ noAnimation, isMe }) => {
  return (
    <>
      <motion.div
        style={{ width: "100px", height: "120px", position: "relative" }}
      >
        {!noAnimation && (
          <motion.div
            animate={{
              width: ["0px", "300px"],
              height: ["0px", "300px"],
              opacity: [1, 1, 1, 0],
            }}
            transition={{ repeat: Infinity, ease: "easeInOut", duration: 2 }}
            style={{
              position: "absolute",
              width: "200px",
              height: "200px",
              background: "rgba(106, 60, 225,.2)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "30%",
            }}
          />
        )}

        {!noAnimation && (
          <motion.div
            animate={{
              width: ["0px", "200px"],
              height: ["0px", "200px"],
              opacity: [1, 1, 1, 0],
            }}
            transition={{ repeat: Infinity, ease: "easeInOut", duration: 2 }}
            style={{
              position: "absolute",
              width: "200px",
              height: "200px",
              background: "rgba(255, 48, 160,.2)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "30%",
            }}
          />
        )}

        <motion.div
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
          <motion.div
            animate={{
              width: !noAnimation
                ? ["100px", "88px", "100px"]
                : ["80px", "80px", "80px"],
              height: !noAnimation
                ? ["100px", "92px", "100px"]
                : ["80px", "80px", "80px"],
            }}
            transition={{ repeat: Infinity, ease: "easeInOut", duration: 1.4 }}
            style={{
              border: `10px solid ${isMe ? `#FF6813` : `black`}`,
              background: isMe ? `url("/icons/1.jpg")` : "white",
              backgroundSize: "120%",
              backgroundPosition: "center",
              borderRadius: "35%",
            }}
          ></motion.div>

          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 267 216"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "relative", top: "-2px" }}
          >
            <path
              d="M133.5 216L0 0H267L133.5 216Z"
              fill={isMe ? `#FF6813` : "black"}
            />
          </motion.svg>

          {isMe && (
            <>
              <Label left={`0px`} bottom={`-30px`}>
                YOU're
              </Label>
              <Label left={`30px`} bottom={`-53px`}>
                HERE
              </Label>
            </>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

export default Marker;
