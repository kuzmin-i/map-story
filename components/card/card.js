import React from "react";
import styled from "styled-components";
import { Typography, Row, Col } from "antd";
import { colors } from "../../pages/telegram/interests";

const { Text } = Typography;

const Wrapper = styled.div`
  height: calc(100% - 200px);
  width: 100%;
  position: fixed;
  background: ${colors.black};
  top: 0;
  z-index: 100;
  border-radius: 0 0 24px 24px;

  display: flex;
  flex-direction: column;
`;

const Preview = styled.div`
  background: lightgrey;
  width: 100%;
  height: 100%;
  border-radius: 0 0 24px 24px;
  background: url("/splash/1.jpg"),
    linear-gradient(180deg, #e791db 0%, #5c5ef9 100%);
  box-shadow: 0px -1px 17px 4px rgba(9, 10, 90, 0.08);
  background-size: cover;
  position: relative;
  overflow: hidden;
`;

const Descr = styled.div`
  width: 100%;
  height: max-content;
  padding: 15px;

  && * {
    color: white;
  }
`;

const MainTitle = styled(Text)`
  font-weight: 900;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.05em;
`;

const Description = styled(Text)`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
`;

const Label = styled(Text)`
  &&& {
    font-weight: 400;
    font-size: 12px;
    line-height: 24px;
    text-decoration-line: underline;
    color: rgba(255, 255, 255, 0.7);
  }
`;

const Link = styled.div`
  align-items: center;
  text-decoration-line: underline;

  &&& {
    color: #e6ff85;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
  }
`;

const Card = () => {
  return (
    <>
      <Wrapper>
        <Preview />

        <Descr>
          <Row justify="space-between" style={{ marginBottom: "12px" }}>
            <Label>Nizhniy Novgorod, Russia</Label>
            <Label>Dasha Ivanova</Label>
          </Row>

          <Row justify="space-between" style={{ marginBottom: "12px" }}>
            <MainTitle>
              Once in Nizhniy — forever in Nizhniy or how to find hidden gems of
              the sunset capital
            </MainTitle>
          </Row>

          <Row justify="space-between" style={{ marginBottom: "12px" }}>
            <Description>
              Over 3,000 churches were built in Poland between 1945 and 1989,
              1945 and 1989, 194...
            </Description>
          </Row>

          <Row justify="space-between" style={{ marginBottom: "12px" }}>
            <Link>Read more</Link>
          </Row>
        </Descr>
      </Wrapper>
    </>
  );
};

export default Card;
