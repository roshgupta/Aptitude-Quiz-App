import { useState } from "react";
import styled from "styled-components";
import { OutlinedButton } from "./Styled";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const Main = ({
  isSideBarOpen,
  handleToggleClick,
  currentQuestion,
  setCurrentQuestion,
  numOfPhysicsQues,
  numOfChemistryQues,
  allQuestions,
  setAllQuestions,
}) => {
  const [activeSection, setActiveSection] = useState({
    physics: true,
    chemistry: false,
    maths: false,
  });
  const inactive = {
    physics: false,
    chemistry: false,
    maths: false,
  };
  const [answer, setAnswer] = useState(null);
  let tempCurrentQues = {};
  const saveHandler = () => {
    if (answer !== null) {
      tempCurrentQues = {
        ...currentQuestion,
        answered: answer,
        status: "answered",
      };
      setCurrentQuestion(tempCurrentQues);
      updateAllQuesArray();
      nextQuestion();
    }
  };
  const saveMarkHandler = () => {
    if (answer !== null) {
      tempCurrentQues = {
        ...currentQuestion,
        answered: answer,
        status: "marked-answered",
      };
      setCurrentQuestion(tempCurrentQues);
      updateAllQuesArray();
      nextQuestion();
    }
  };
  const markHandler = () => {
    tempCurrentQues = {
      ...currentQuestion,
      answered: null,
      status: "marked",
    };
    setCurrentQuestion(tempCurrentQues);
    updateAllQuesArray();
    nextQuestion();
  };
  const clearHandler = () => {
    tempCurrentQues = {
      ...currentQuestion,
      answered: null,
      status: "not-answered",
    };
    setCurrentQuestion(tempCurrentQues);
    updateAllQuesArray();
    nextQuestion();
  };

  const updateAllQuesArray = () => {
    let quesArray = allQuestions.map((question) => {
      if (question.index === tempCurrentQues.index) {
        return tempCurrentQues;
      } else {
        return question;
      }
    });
    setAllQuestions(quesArray);
  };
  const nextQuestion = () => {
    if (currentQuestion.index + 1 < allQuestions.length) {
      setCurrentQuestion(allQuestions[currentQuestion.index + 1]);
      setAnswer(allQuestions[currentQuestion.index + 1].answered);
    } else {
      //submit test
    }
  };

  return (
    <MainCont isSideBarOpen={isSideBarOpen}>
      <Toggle onClick={handleToggleClick}>
        <ArrowBackIosIcon />
      </Toggle>
      <SectionHeader>
        <div className="sections">
          <StyledLabel>Sections :</StyledLabel>
          <SectionButton
            active={activeSection.physics}
            onClick={() => {
              setActiveSection({ ...inactive, physics: true });
              tempCurrentQues = {
                ...allQuestions[0],
                status: "not-answered",
              };
              setCurrentQuestion(tempCurrentQues);
              setAnswer(tempCurrentQues.answered);
              updateAllQuesArray();
            }}
          >
            <span className="laptop"> Physics</span>
            <span className="phone">P</span>
          </SectionButton>
          <SectionButton
            active={activeSection.chemistry}
            onClick={() => {
              setActiveSection({ ...inactive, chemistry: true });
              tempCurrentQues = {
                ...allQuestions[numOfPhysicsQues],
                status: "not-answered",
              };
              setCurrentQuestion(tempCurrentQues);
              setAnswer(tempCurrentQues.answered);
              updateAllQuesArray();
            }}
          >
            <span className="laptop"> Chemistry</span>
            <span className="phone">C</span>
          </SectionButton>
          <SectionButton
            active={activeSection.maths}
            onClick={() => {
              setActiveSection({ ...inactive, maths: true });
              tempCurrentQues = {
                ...allQuestions[numOfPhysicsQues + numOfChemistryQues],
                status: "not-answered",
              };
              setCurrentQuestion(tempCurrentQues);
              setAnswer(tempCurrentQues.answered);
              updateAllQuesArray();
            }}
          >
            <span className="laptop">Maths</span>
            <span className="phone">M</span>
          </SectionButton>
        </div>
        <div className="language">
          <StyledLabel htmlFor="language">View in :</StyledLabel>
          <StyledSelect id="language" name="language">
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
          </StyledSelect>
        </div>
      </SectionHeader>
      <MarkingScheme>
        <StyledLabel>Marking Scheme :</StyledLabel>
        <div>
          Correct
          <span className="hide-for-small-screen"> Response</span> :
          <span>+1</span>
        </div>
        <div>
          Incorrect <span className="hide-for-small-screen"> Response</span>:{" "}
          <span>-0.25</span>
        </div>
      </MarkingScheme>
      <QuestionElement
        currentQuestion={currentQuestion}
        setAnswer={setAnswer}
      />
      <ButtonContainer>
        <Button onClick={saveHandler}>Save & Next</Button>
        <Button onClick={saveMarkHandler}>Save & Mark for Review</Button>
        <Button onClick={markHandler}>Mark for Review & Next</Button>
        <Button onClick={clearHandler}>Clear & Next</Button>
      </ButtonContainer>
    </MainCont>
  );
};

const QuestionElement = ({ currentQuestion, setAnswer }) => {
  return (
    <>
      {currentQuestion && (
        <QuestionContainer>
          <QuestionHeader>
            <div className="number">
              Question <span>{currentQuestion.index + 1}</span>
            </div>
            <div className="type">Single Choice Type Question</div>
          </QuestionHeader>
          <Question>
            <div className="ques">{currentQuestion.question}</div>
            <div className="options">
              {currentQuestion.options.map((data, index) => (
                <div className="option" key={index}>
                  <input
                    type="radio"
                    id={`ques_${currentQuestion.index}_option_${index}`}
                    name={`ques_${currentQuestion.index}_answer`}
                    value={`option_${index}`}
                    onChange={() => setAnswer(index)}
                  />
                  <label
                    htmlFor={`ques_${currentQuestion.index}_option_${index}`}
                  >
                    {data}
                  </label>
                </div>
              ))}
            </div>
          </Question>
        </QuestionContainer>
      )}
    </>
  );
};
const SectionHeader = styled.div`
  width: 100%;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 700px) {
    padding: 12px 8px;
  }
  @media (max-width: 650px) {
    padding: 12px 4px;
  }
  @media (max-width: 400px) {
    padding: 10px 0px;
  }
`;

const QuestionContainer = styled.div`
  width: 100%;
  margin-top: 12px;
`;
const QuestionHeader = styled(SectionHeader)`
  border-bottom: 1px solid #1bbc9b;
  color: #1bbc9b;
  .number {
    font-size: 20px;
    @media (max-width: 700px) {
      font-size: 16px;
    }
  }
  .type {
    font-size: 16px;
    @media (max-width: 700px) {
      font-size: 14px;
    }
  }
`;
const Question = styled.div`
  width: 100%;
  color: #1bbc9b;
  padding: 12px 16px;
  @media (max-width: 700px) {
    padding: 12px 12px;
  }
  @media (max-width: 650px) {
    padding: 12px 4px;
  }
  @media (max-width: 400px) {
    padding: 12px 0px;
  }
  .ques {
    font-size: 20px;
    font-weight: 500;
    margin: 12px 0px;
    @media (max-width: 700px) {
      font-size: 16px;
    }
  }
  .options {
    .option {
      margin: 16px 0px;
      input {
        margin-right: 24px;
        cursor: pointer;
      }
      label {
        font-size: 20px;
        font-weight: 500;
        cursor: pointer;
        @media (max-width: 700px) {
          font-size: 16px;
        }
      }
    }
  }
`;
const MainCont = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0px 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  grid-column: ${(props) => (props.isSideBarOpen.byClick ? "1/2" : "1/3")};
  grid-column: ${(props) => (props.isSideBarOpen.bySize ? "" : "1/3")};
`;
const Toggle = styled.div`
  position: absolute;
  top: 70px;
  right: 0px;
  width: 30px;
  height: 36px;
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
  background-color: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1bbc9b;
  border: 2px solid #1bbc9b;
  border-right: none;
  /* transform: translateX(100%); */
  svg {
    margin-left: 12px;
  }
`;
const Button = styled(OutlinedButton)`
  margin-bottom: 32px;
  margin-right: 12px;
  padding: 10px 16px;
  transition: all 0.3s ease-in-out;
  @media (max-width: 850px) {
    padding: 8px 8px;
    margin-right: 10px;
  }
  @media (max-width: 780px) {
    padding: 8px 4px;
    margin-right: 8px;
  }
  @media (max-width: 750px) {
    margin-right: 6px;
    font-size: 14px;
    margin-bottom: 24px;
  }
  @media (max-width: 430px) {
    font-size: 12px;
  }
  @media (max-width: 360px) {
    font-size: 10px;
  }

  &:hover {
    background: linear-gradient(
      86.94deg,
      #1bbc9b 0%,
      #1bbc9b 0.01%,
      #16a086 100%
    );
    color: white;
  }
`;
const ButtonContainer = styled.div`
  margin-top: auto;
  display: flex;
  padding: 0px 12px;
  @media (max-width: 680px) {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    align-items: center;
    div {
      width: 100%;
      justify-self: center;
      margin-right: 0px;
      margin-bottom: 0px;
      justify-content: center;
      &:nth-child(2n + 1) {
        grid-column: 1/2;
      }
      &:nth-child(2n) {
        grid-column: 2/3;
      }
    }
  }
  @media (max-width: 380px) {
    padding: 0px 0px;
  }
`;

const SectionButton = styled.button`
  padding: 6px 16px;
  font-size: 16px;
  background-color: #e5f8ff;
  border: 2px solid ${(props) => (props.active ? "#1bbc9b" : "#e5f8ff")};
  border-radius: 4px;
  color: #1bbc9b;
  font-weight: 500;
  cursor: pointer;
  margin: 0px 16px;
  .laptop {
    display: inline-block;
  }
  .phone {
    display: none;
  }
  @media (max-width: 750px) {
    margin: 0px 8px;
  }
  @media (max-width: 700px) {
    margin: 0px 4px;
    padding: 6px 12px;
  }
  @media (max-width: 650px) {
    margin: 0px 4px;
    padding: 6px 24px;
    .laptop {
      display: none;
    }
    .phone {
      display: inline-block;
    }
  }
  @media (max-width: 600px) {
    font-size: 14px;
  }
  @media (max-width: 500px) {
    padding: 6px 16px;
  }
  @media (max-width: 450px) {
    padding: 6px 10px;
  }
  @media (max-width: 400px) {
    padding: 2px 8px;
    font-size: 12px;
    margin: 0px 2px;
  }
`;
const StyledLabel = styled.label`
  color: #1bbc9b;
  font-size: 16px;
  @media (max-width: 600px) {
    font-size: 14px;
  }
  @media (max-width: 400px) {
    font-size: 12px;
  }
`;
const StyledSelect = styled.select`
  padding: 8px 16px;
  background-color: #e5f8ff;
  border: 2px solid #e5f8ff;
  text-transform: uppercase;
  outline: none;
  border: none;
  margin-left: 8px;
  color: #1bbc9b;
  font-size: 16px;
  @media (max-width: 600px) {
    font-size: 14px;
  }
  @media (max-width: 500px) {
    padding: 8px 12px;
  }
  @media (max-width: 450px) {
    padding: 8px 8px;
  }
  @media (max-width: 400px) {
    padding: 4px 6px;
    font-size: 12px;
  }
  @media (max-width: 350px) {
    font-size: 10px;
  }

  option {
    text-transform: uppercase;
    outline: none;
    border: none;
  }
`;
const MarkingScheme = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  @media (max-width: 700px) {
    padding: 12px 8px;
  }
  @media (max-width: 650px) {
    padding: 12px 4px;
  }
  @media (max-width: 400px) {
    padding: 12px 0px;
  }

  div {
    margin: 0px 8px;
    color: #1bbc9b;
    font-size: 16px;
    font-weight: 500;
    @media (max-width: 700px) {
      margin: 0px 4px;
    }
    @media (max-width: 650px) {
      font-size: 14px;
      .hide-for-small-screen {
        display: none;
      }
    }
    @media (max-width: 400px) {
      font-size: 12px;
    }
    span {
      margin-left: 8px;
      @media (max-width: 700px) {
        margin-left: 4px;
      }
    }
  }
`;
export default Main;
