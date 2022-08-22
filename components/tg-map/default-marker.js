import styled from "styled-components";

const Icon = styled.div`
  width: 100%;
  padding-bottom: 106%;
  background: url("/pins/2.svg");
  background-size: contain;
  background-position: center;
`;

const Marker = () => {
  return (
    <>
      <div style={{ width: "60px", position: "relative" }}>
        <Icon />
      </div>
    </>
  );
};

export default Marker;
