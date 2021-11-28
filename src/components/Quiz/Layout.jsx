import { useState, useEffect } from "react";

import styled from "styled-components";
import Header from "./Header";
import Side from "./Side";
import Main from "./Main";
//functionality demo
import data from "./dummy-question-data";
const numOfPhysicsQues = data.physics.length;
const numOfChemistryQues = data.chemistry.length;
const addSomeFields = (quesArray) => {
  let newData = quesArray.map((question) => ({
    ...question,
    status: "not-visited",
    answered: null,
  }));
  return newData;
};

const Layout = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState({
    byClick: true,
    bySize: false,
  });
  const handleToggleClick = () => {
    setIsSideBarOpen({ ...isSideBarOpen, byClick: !isSideBarOpen.byClick });
  };
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const [allQuestions, setAllQuestions] = useState(null);
  const questionArray = (data) => {
    let physicsQuestions = addSomeFields(data.physics);
    let chemistryQuestions = addSomeFields(data.chemistry);
    let mathsQuestions = addSomeFields(data.maths);
    let QuesArray = [
      ...physicsQuestions,
      ...chemistryQuestions,
      ...mathsQuestions,
    ];
    let IndexedData = QuesArray.map((ques, index) => {
      return { ...ques, index: index };
    });
    return IndexedData;
  };
  useEffect(() => {
    setAllQuestions(questionArray(data));
    setCurrentQuestion({ ...questionArray(data)[0], status: "not-answered" });
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <Header />
      {allQuestions && (
        <Container>
          <Main
            isSideBarOpen={isSideBarOpen}
            handleToggleClick={handleToggleClick}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            numOfPhysicsQues={numOfPhysicsQues}
            numOfChemistryQues={numOfChemistryQues}
            allQuestions={allQuestions}
            setAllQuestions={setAllQuestions}
          />
          <Side
            isSideBarOpen={isSideBarOpen}
            setIsSideBarOpen={setIsSideBarOpen}
            handleToggleClick={handleToggleClick}
            allQuestions={allQuestions}
            setCurrentQuestion={setCurrentQuestion}
            currentQuestion={currentQuestion}
            setAllQuestions={setAllQuestions}
          />
        </Container>
      )}
    </Wrapper>
  );
};

const Container = styled.div`
  height: calc(100% - 62px);
  width: 100%;
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  position: relative;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;
export default Layout;
