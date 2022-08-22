//5739800125:AAFe1jlAQdpi4zETkWpmY7caxTy0FwbyIYk
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Script from "next/script";
import Router from "next/router";

const TelegramWrapper = ({ children, type, state }) => {
  const [tgLoaded, setTgLoaded] = useState(false);
  const [user_id, setUser_id] = useState(null);
  const [first_name, setFirst_name] = useState(null);
  const [last_name, setLast_name] = useState(null);

  const useFishMeta = false;

  const Wrapper = styled.div`
    padding: 15px;
    padding-top: 24px;
  `;

  useEffect(() => {
    if (tgLoaded) {
      const webapp = window.Telegram.WebApp;

      const initDataUnsafe = webapp.initDataUnsafe;

      const { user = {} } = initDataUnsafe;
      const { id, first_name, last_name } = user;

      webapp.expand();

      if (!useFishMeta) {
        setUser_id(id);
        setFirst_name(first_name);
        setLast_name(last_name);
      } else {
        setUser_id("310889849");
        setFirst_name("Ilya");
        setLast_name("Kuzmin");
      }
    }
  }, [tgLoaded, useFishMeta]);

  useEffect(() => {
    if (window.Telegram && type === "interests") {
      const webapp = window.Telegram.WebApp;

      const mainbutton = webapp.MainButton;

      if (typeof state === "number") {
        mainbutton.setText("Подтвердить");
      } else {
        mainbutton.setText("не работает");
      }
    }
  }, [state, type]);

  return (
    <>
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        onLoad={() => setTgLoaded(true)}
      ></Script>

      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default TelegramWrapper;
