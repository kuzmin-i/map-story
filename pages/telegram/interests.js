import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Script from "next/script";
import TelegramWrapper from "./wrapper";

import { Typography, Row } from "antd";
const { Text } = Typography;

const colors = {
  black: "#313131",
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 10px;
  row-gap: 10px;
`;

const Item = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 123%;
  border-radius: 10px;
  border: 1px solid ${colors.black};
  cursor: pointer;

  && > * + * {
    margin-top: 10px;
  }

  ${({ selected }) =>
    selected
      ? `
    && {
        box-shadow: 0px 0px 0px 4px #766FF6;
    }
  `
      : ``}
`;

Item.Flex = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;

  && > * + * {
    margin-top: 10px;
  }
`;

const Circle = styled.div`
  position: relative;
  width: 100%;
  max-width: 65px;
`;

Circle.Inner = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  background-color: lightgrey;
  border-radius: 50%;

  background-image: ${({ index }) =>
    typeof index === "number" ? `url("/interests/${index}.png")` : `url()`};
  background-size: cover;
  background-position: center;
`;

const Title = styled(Text)`
  font-size: 12px;
  text-align: center;
  line-height: 1.4;
`;

const SectionTitle = styled(Text)`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-align: center;

  color: black;
  padding-bottom: 24px;
`;

const Interests = () => {
  const [selCard, setSelCard] = useState(null);
  const [tgLoaded, setTgLoaded] = useState(false);

  const cards = [
    {
      title: "Культурные объекты",
    },
    {
      title: "Природа и парки",
    },
    {
      title: "Активный отдых",
    },
    {
      title: "Концерты и представления",
    },
    {
      title: "Магазины и покупки",
    },
    {
      title: "Ночная жизнь",
    },
    {
      title: "Еда и напитки",
    },
    {
      title: "Мероприятия и фестивали",
    },
    {
      title: "Другое",
    },
  ];

  const handleClick = (i) => {
    setSelCard((state) => {
      return state === i ? null : i;
    });
  };

  useEffect(() => {
    console.log("window.Telegram", window.Telegram);

    if (window.Telegram && tgLoaded) {
      const webapp = window.Telegram.WebApp;

      const mainbutton = webapp.MainButton;
      mainbutton.isVisible = true;

      console.log("mainbutton", mainbutton);

      if (typeof selCard === "number") {
        mainbutton.setParams({
          is_visible: false,
          text: "Подтвердить",
          color: "#766FF6",
        });
      } else {
        console.log("не работае");
        mainbutton.setParams({ is_visible: false });
      }
    }
  }, [selCard, tgLoaded]);

  return (
    <TelegramWrapper type="interests" state={selCard}>
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        onLoad={() => setTgLoaded(true)}
      ></Script>

      <Row justify="center">
        <SectionTitle>Что вам интересно?</SectionTitle>
      </Row>

      <Grid>
        {cards.map((props, i) => {
          const { title } = props;

          return (
            <Item
              selected={i === selCard}
              key={`card:${i}`}
              onClick={() => handleClick(i)}
            >
              <Item.Flex>
                <Circle>
                  <Circle.Inner index={i} />
                </Circle>

                <Title>{title}</Title>
              </Item.Flex>
            </Item>
          );
        })}
      </Grid>
    </TelegramWrapper>
  );
};

export default Interests;
