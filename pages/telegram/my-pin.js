import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Script from "next/script";

import { Typography, Row, Skeleton } from "antd";
import Map from "../../components/tg-map/map";

const Wrapper = styled.div``;

const MyPin = () => {
  const [tgLoaded, setTgLoaded] = useState(false);

  useEffect(() => {
    if (window.Telegram && tgLoaded) {
      const webapp = window.Telegram.WebApp;

      webapp.expand();

      const mainbutton = webapp.MainButton;

      if (false) {
        mainbutton.setParams({
          is_visible: true,
          text: "Подтвердить",
          color: "#766FF6",
        });

        mainbutton.onClick(() => {
          webapp.close();
        });
      } else {
        mainbutton.setParams({ is_visible: false });
      }
    }
  }, [tgLoaded]);

  return (
    <>
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        onLoad={() => setTgLoaded(true)}
      ></Script>

      <Wrapper>
        <Map />
      </Wrapper>
    </>
  );
};

export default MyPin;
