import { motion } from "framer-motion";
import styled from "styled-components";

const colors = {
  orange: "#FF6813",
};

const Circle = styled.div`
  ${({ full }) =>
    !full
      ? `
  
  `
      : `
      border: 0px !important;
    transform: scale(1.04, 1.04);
  `}

  border: 10px solid ${({ fill }) => (fill ? fill : "black")};

  background-image: ${({ inside }) => (inside ? `url("${inside}")` : "white")};
  background-color: ${({ fill }) => (fill ? fill : "black")};
  background-position: center;
  background-size: cover;
  border-radius: 30px;
  width: 80px;
  height: 80px;

  transition: all 0.5 ease-in-out;
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

const Triangle = styled.svg`
  position: absolute;
  bottom: -16px;
  left: 50%;
  transform: translateX(-50%);
`;

const Emotion = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 48px;
`;

const Timedown = styled.div`
  width: 120px;
  height 120px;
  position: absolute;
  background-image: url('/icons/5.svg');
  background-size: cover;
  top: 20px;

`;

const Play = styled.div`
  width: 60px;
  height: 60px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: relative;
  background-image: url("/icons/7.svg");
  background-size: cover;
`;

const Marker = ({ noAnimation, type, emotion }) => {
  const isMe = type === "me";
  const isSecret = type === "secret";
  const isLocked = type === "locked";
  const isCountdown = type === "countdown";
  const isVoice = type === "voice";
  const isVideo = type === "video";
  const isText = type === "text";
  const isDefault = type === "default";

  let primaryColor, inside;

  if (type === "secret") {
    primaryColor = "#FFC001";
    inside = "/icons/2.png";
  } else if (type === "me") {
    primaryColor = "#FF6813";
    inside = "/icons/1.jpg";
  } else if (type === "locked") {
    primaryColor = "#0080FF";
    inside = "/icons/3.svg";
  } else if (type === "countdown") {
    primaryColor = "#FF026C";
    inside = "/icons/4.jpg";
  } else if (type === "voice") {
    primaryColor = "#4679FE";
    inside = "/icons/6.svg";
  } else if (type === "video") {
    primaryColor = "#4679FE";
    inside = "/icons/4.jpg";
  } else if (type === "text") {
    primaryColor = "black";
    inside = "/icons/8.jpg";
  } else if (type === "default") {
    primaryColor = "#C10000";
    inside = "/icons/4.jpg";
  } else {
    primaryColor = "black";
  }

  const hasEmotion = emotion;

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
          <Circle
            full={isCountdown || isVoice || isVideo || isText}
            fill={primaryColor}
            inside={inside}
          >
            {isVideo && <Play />}
          </Circle>

          {!isVideo && !isVoice && (
            <Triangle
              width="20"
              height="20"
              viewBox="0 0 267 216"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M133.5 216L0 0H267L133.5 216Z" fill={primaryColor} />
            </Triangle>
          )}

          {isMe && (
            <>
              <Label left={`0px`} bottom={`-40px`}>
                YOU're
              </Label>
              <Label left={`30px`} bottom={`-63px`}>
                HERE
              </Label>
            </>
          )}

          {isSecret && (
            <>
              <Label left={`0px`} bottom={`-40px`}>
                Secret
              </Label>
              <Label left={`20px`} bottom={`-63px`}>
                Place
              </Label>
            </>
          )}

          {isCountdown && (
            <>
              <Timedown />

              <Label left={`20px`} bottom={`-40px`}>
                24:05
              </Label>
            </>
          )}

          {hasEmotion && !isCountdown && <Emotion>💣</Emotion>}
        </div>
      </div>
    </>
  );
};

export default Marker;
