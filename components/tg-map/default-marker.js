import styled from "styled-components";

const Icon = styled.div`
  width: 100%;
  padding-bottom: 106%;
  background: url("/pins/2.svg");
  background-size: contain;
  background-position: center;
`;

const Circle = styled.div`
  width: 46.5px;
  height: 46.5px;
  position: absolute;
  background: #7b74ff;
  border-radius: 50%;
  bottom: 0px;
  box-shadow: 0px -0.75px 12.75px 3px rgba(9, 10, 90, 0.08);
  left: 50%;
  transform: translateX(-50%);
`;

const Photo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 38.93px;
  height: 38.93px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: lightgrey;
  background: url("/splash/2.jpg");
  background-position: center;
  background-size: cover;
  z-index: 1;
`;

const Marker = () => {
  return (
    <>
      <div
        style={{
          width: "60px",
          position: "relative",
          height: "63.75px",
          //transform: "translateY(50%)",
        }}
      >
        <Icon />
      </div>
    </>
  );
};

export default Marker;
