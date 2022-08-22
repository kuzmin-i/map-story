import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  padding: 15px;
  background: white;
`;

const Grid = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  && > * + * {
    margin-top: 20px;
  }
`;

const Card = styled.div`
  width: 100%;
  padding-bottom: 124%;
  border-radius: 16px;
  background: grey;
`;

const Account = () => {
  return (
    <Wrapper>
      <Grid>
        <Card></Card>
        <Card></Card>
      </Grid>
    </Wrapper>
  );
};

export default Account;
