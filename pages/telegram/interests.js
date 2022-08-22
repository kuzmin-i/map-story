import React, { useState, useEffect } from "react";
import styled from "styled-components";
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
  background: grey;
  border-radius: 50%;
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
    if (window.Telegram) {
      const webapp = window.Telegram.WebApp;

      const mainbutton = webapp.MainButton;

      if (typeof selCard === "number") {
        mainbutton.setText("Подтвердить");
      } else {
        mainbutton.setText("не работает");
      }
    }
  }, [selCard]);

  return (
    <TelegramWrapper>
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
                  <Circle.Inner />
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
