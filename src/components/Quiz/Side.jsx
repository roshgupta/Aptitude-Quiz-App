import styled from "styled-components";
import { useEffect, useState } from "react";
import { OutlinedButton } from "./Styled";
import BlurCircularOutlinedIcon from "@material-ui/icons/BlurCircularOutlined";
import useWindowDimensions from "../Util/useWindowDimensions";
import CancelIcon from "@material-ui/icons/Cancel";
import { Avatar } from "@material-ui/core";

const Side = ({
  isSideBarOpen,
  setIsSideBarOpen,
  handleToggleClick,
  allQuestions,
  setCurrentQuestion,
  currentQuestion,
  setAllQuestions,
}) => {
  const [translate, setTranslate] = useState("100%");
  const { width } = useWindowDimensions();
  useEffect(() => {
    if (width < 1050) {
      setIsSideBarOpen({ ...isSideBarOpen, bySize: false, byClick: false });
    } else {
      setIsSideBarOpen({ ...isSideBarOpen, bySize: true });
    }
    // eslint-disable-next-line
  }, [width]);
  //for toogling side bar
  useEffect(() => {
    if (isSideBarOpen.byClick) {
      setTranslate("0%");
    } else {
      setTranslate("100%");
    }
  }, [isSideBarOpen]);

  // functionality for status count
  const [answeredCount, setAnsweredCount] = useState(0);
  const [markedCount, setMarkedCount] = useState(0);
  const [notVisitedCount, setNotVisitedCount] = useState(0);
  const [notAnsweredCount, setNotAnsweredCount] = useState(0);
  const [markedAnsweredCount, setMarkedAnsweredCount] = useState(0);
  const updateStatusCount = () => {
    let answeredCount = 0;
    let markedCount = 0;
    let notVisitedCount = 0;
    let notAnsweredCount = 0;
    let markedAnsweredCount = 0;
    allQuestions.forEach((element) => {
      switch (element.status) {
        case "answered":
          answeredCount++;
          break;
        case "marked":
          markedCount++;
          break;
        case "not-visited":
          notVisitedCount++;
          break;
        case "not-answered":
          notAnsweredCount++;
          break;
        case "marked-answered":
          markedAnsweredCount++;
          break;
        default:
          return;
      }
    });
    setAnsweredCount(answeredCount);
    setMarkedCount(markedCount);
    setNotVisitedCount(notVisitedCount);
    setNotAnsweredCount(notAnsweredCount);
    setMarkedAnsweredCount(markedAnsweredCount);
  };
  useEffect(() => {
    allQuestions && updateStatusCount();
    // eslint-disable-next-line
  }, [allQuestions]);

  //functionality for navigation questions via sidebar
  const goToQues = (quesNo) => {
    let currentQues = { ...allQuestions[quesNo] };
    if (currentQues.status === "not-visited") {
      currentQues = {
        ...currentQues,
        status: "not-answered",
      };
    }
    setCurrentQuestion(currentQues);
    updateAllQuesArray();
  };
  const updateAllQuesArray = () => {
    let tempCurrentQues = { ...currentQuestion };
    let quesArray = allQuestions.map((question) => {
      if (question.index === tempCurrentQues.index) {
        return tempCurrentQues;
      } else {
        return question;
      }
    });
    setAllQuestions(quesArray);
  };

  return (
    <>
      <Wrapper isSideBarOpen={isSideBarOpen} translate={translate}>
        <Name>
          <Avatar />
          <p>Roshan Gupta</p>
          <div className="cross" onClick={handleToggleClick}>
            <CancelIcon />
          </div>
        </Name>
        <Stats>
          <StatCount count={answeredCount} text="Answered" type="answered" />
          <StatCount count={markedCount} text="Marked" type="marked" />
          <StatCount
            count={notVisitedCount}
            text="Not Visited"
            type="not-visited"
          />
          <StatCount
            count={notAnsweredCount}
            text="Not Answered"
            type="not-answered"
          />
          <StatCount
            count={markedAnsweredCount}
            text="Marked and Answered"
            type="marked-answered"
          />
        </Stats>
        <QuestionCountContainer>
          {allQuestions &&
            allQuestions.map((ques) => (
              <QuestionCount
                count={ques.index + 1}
                key={ques.index}
                type={ques.status}
                goToQues={goToQues}
              />
            ))}
        </QuestionCountContainer>
        <Controls>
          <OutlinedButton>
            <BlurCircularOutlinedIcon />
            Instructions
          </OutlinedButton>
          <SubmitButton>Submit Test</SubmitButton>
        </Controls>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  height: 100%;
  display: ${(props) =>
    props.isSideBarOpen.byClick && props.isSideBarOpen.bySize
      ? "flex"
      : "none"};
  flex-direction: column;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 100%;
  min-width: 350px;
  background-color: white;
  ${(props) => {
    if (!props.isSideBarOpen.bySize) {
      return `display:flex;max-width:450px;position:absolute; top:0;right:0;transform:translateX(${props.translate});`;
    }
  }}
`;

const StatCount = ({ count, type, text }) => {
  return (
    <StatCountStyles type={type}>
      <span>{count}</span>
      <p>{text}</p>
    </StatCountStyles>
  );
};
const StatCountStyles = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  span {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 4px;
    ${(props) => ColorForCount(props.type)};
  }
  p {
    color: black;
  }
`;
const ColorForCount = (type) => {
  switch (type) {
    case "answered":
      return `background-color:#24A35A;color:white;border:2px solid #24A35A;`;
    case "marked":
      return `background-color:#8C8C8C;color:white;border:2px solid #8C8C8C;`;
    case "not-visited":
      return `background-color:white;color:black;border:2px solid black;`;
    case "not-answered":
      return `background-color:#FF5656;color:white;border:2px solid #FF5656;`;
    case "marked-answered":
      return `background-color:#0286FF;color:white;border:2px solid #0286FF;`;
    default:
      return `background-color:white;color:black;border:2px solid black;`;
  }
};
const Stats = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 12px;
  width: 100%;
  padding: 4px 32px;
  div {
    &:nth-child(1),
    &:nth-child(3) {
      grid-column: 1/2;
    }
    &:nth-child(2),
    &:nth-child(4) {
      grid-column: 2/3;
    }
    &:nth-child(5) {
      grid-column: 1/3;
    }
  }
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 24px;
  width: 100%;
  margin: 12px auto;
  justify-content: start;
  img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 12px;
  }
  p {
    font-size: 20px;
    font-weight: 600;
    margin-left: 8px;
  }
  //temporary
  .cross {
    color: #1bbc9b;
    margin-left: auto;
    cursor: pointer;
    svg {
      transform: scale(1.5);
    }
  }
`;
const QuestionCountContainer = styled.div`
  padding: 0px 16px 0px 24px;
  max-height: 310px;
  width: 100%;
  margin: 12px auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, 40px);
  gap: 12px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #16a086;
    border-radius: 12px;
  }
`;
const QuestionCount = ({ type, count, goToQues }) => {
  return (
    <QuestionCountStyle
      type={type}
      onClick={() => {
        goToQues(count - 1);
      }}
    >
      {count}
    </QuestionCountStyle>
  );
};
const QuestionCountStyle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${(props) => ColorForCount(props.type)};
  &:hover {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;
const Controls = styled.div`
  width: 100%;
  margin-top: auto;
  button {
    display: block;
  }
`;
const SubmitButton = styled.button`
  width: 100%;
  border-radius: 0px;
  padding: 16px 0px;
  background: linear-gradient(
    86.94deg,
    #1bbc9b 0%,
    #1bbc9b 0.01%,
    #16a086 100%
  );
  border: none;
  color: white;
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 32px;
  cursor: pointer;
`;
export default Side;
