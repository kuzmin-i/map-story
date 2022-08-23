import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Typography, Row, Col } from "antd";
import { colors } from "../../pages/telegram/interests";
import { CloseOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

const { Text } = Typography;

const Wrapper = styled.div`
  height: calc(100% - 100px);
  width: 100%;
  position: fixed;
  background: ${colors.black};
  top: 0;
  z-index: 100;
  border-radius: 0 0 24px 24px;

  display: flex;
  flex-direction: column;

  &&[data-size="fullsize"] {
    height: 100%;
    border-radius: 0 0 0px 0px;
    overflow: scroll;
  }

  transition: 0.8s ease-in-out;

  &&[data-visible="visible"] {
    opacity: 1;
  }

  &&[data-visible="hidden"] {
    opacity: 0;
  }
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
  background-position: center;
  position: relative;
  overflow: hidden;
  transition: 0.3s ease-in-out;

  &&[data-size="fullsize"] {
    min-height: ${({ height }) => (height ? `${height}px` : "100%")};
  }

  min-height: 300px;
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

const Close = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${colors.black};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &&&,
  && * {
    color: white;
  }
`;

const Card = ({ selPin, setSelPin = () => {} }) => {
  const [isVisible, setVisible] = useState(false);
  const [key, setKey] = useState(uuidv4());

  const prevRef = useRef();
  const [divHeight, setDivHeight] = useState(0);

  const [fullsize, setFullsize] = useState(false);

  useEffect(() => {
    if (typeof selPin === "number") {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 800);

      setDivHeight(prevRef.current.clientHeight);

      return () => {
        clearTimeout(timer);
      };
    } else {
      setVisible(false);
      setFullsize(false);
      setKey(uuidv4());
    }
  }, [selPin, prevRef]);

  const handleClose = () => {
    setSelPin(null);
  };

  const handleFull = () => {
    setFullsize((state) => !state);
  };

  console.log("divHeight", divHeight);

  

  if (!(typeof selPin === "number")) return <></>;

  return (
    <>
      <Wrapper
        data-size={fullsize ? "fullsize" : "mini"}
        data-visible={isVisible ? "visible" : "hidden"}
        key={key}
      >
        <Preview
          ref={prevRef}
          height={divHeight}
          data-size={fullsize ? "fullsize" : "mini"}
        >
          <Close onClick={handleClose}>
            <CloseOutlined />
          </Close>
        </Preview>

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
            {fullsize && (
              <Description>
                Over 3,000 churches were built in Poland between 1945 and 1989,
                despite the socialist state’s hostility towards religion. We
                call this Day-VII Architecture. Built by parishioners using
                materials that were scavenged or pinched, the churches were at
                once an expression of faith and a form of anti-government
                protest. Neither legal nor prohibited, the building of churches
                in this period committed the most talented architects and
                craftsmen, who in turn enabled parish communities to build their
                own houses of worship. Hide
                <br />
                <br />
                Over 3,000 churches were built in Poland between 1945 and 1989,
                despite the socialist state’s hostility towards religion. We
                call this Day-VII Architecture. Built by parishioners using
                materials that were scavenged or pinched, the churches were at
                once an expression of faith and a form of anti-government
                protest. Neither legal nor prohibited, the building of churches
                in this period committed the most talented architects and
                craftsmen, who in turn enabled parish communities to build their
                own houses of worship. Hide
              </Description>
            )}

            {!fullsize && (
              <Description>
                Over 3,000 churches were built in Poland between 1945 and 1989,
                1945 and 1989, 194...
              </Description>
            )}
          </Row>

          <Row justify="space-between" style={{ marginBottom: "12px" }}>
            {!fullsize ? (
              <Link onClick={handleFull}>Read more</Link>
            ) : (
              <Link onClick={handleFull}>Hide</Link>
            )}
          </Row>
        </Descr>
      </Wrapper>
    </>
  );
};

export default Card;
