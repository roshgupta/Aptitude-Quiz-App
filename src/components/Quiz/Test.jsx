import styled from "styled-components";
import Layout from "./Layout";
// import Foundation from "../Course/Foundation";
// import Header from "./Header";

const Test = () => {
  return (
    <Temp>
      <Layout />
      {/* <Foundation /> */}
    </Temp>
  );
};

//temporary items , this is for my convinience

const Temp = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Test;
