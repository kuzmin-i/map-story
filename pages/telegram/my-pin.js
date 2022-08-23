import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Script from "next/script";

import { Typography, Row, Skeleton } from "antd";
import Map from "../../components/tg-map/map";
import Card from "../../components/card/card";

const Wrapper = styled.div``;

const MyPin = () => {
  const [tgLoaded, setTgLoaded] = useState(false);
  const [showPins, setShowPins] = useState(true);

  const [selPin, setSelPin] = useState(null);

  useEffect(() => {
    if (tgLoaded && window.Telegram) {
      const webapp = window.Telegram.WebApp;

      webapp.expand();
    }
  }, [tgLoaded]);

  useEffect(() => {
    if (window.Telegram && tgLoaded) {
      const webapp = window.Telegram.WebApp;

      const mainbutton = webapp.MainButton;

      if (!showPins) {
        mainbutton.setParams({
          is_visible: true,
          text: "Показать все пины",
          color: "#766FF6",
        });

        mainbutton.onClick(() => {
          setShowPins(true);
        });
      } else {
        mainbutton.setParams({ is_visible: false });
      }
    }
  }, [tgLoaded, showPins, setShowPins]);

  return (
    <>
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        onLoad={() => setTgLoaded(true)}
      ></Script>

      <Wrapper>
        {selPin && <Card />}

        <Map showPins={showPins} {...{ selPin, setSelPin }} />
      </Wrapper>
    </>
  );
};

export default MyPin;
