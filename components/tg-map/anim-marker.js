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
        style={{ width: "80px", height: "85px", position: "relative" }}
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
              borderRadius: "50%",
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
              borderRadius: "50%",
            }}
          />
        )}

        <motion.div
          animate={{
            width: ["80px", "90px", "80px"],
            height: ["85px", "90px", "85px"]
          }}
          transition={{ repeat: Infinity, ease: "easeInOut", duration: 2 }}
          style={{
            width: "80px",
            height: "85px",
            background: 'url("/pins/4.png")',
            backgroundSize: "contain",
            backgroundPosition: "center",
            zIndex: 10,
          }}
        ></motion.div>
      </motion.div>
    </>
  );
};

export default Marker;
