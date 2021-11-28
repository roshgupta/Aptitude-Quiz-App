import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  font-family: 'Poppins', 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
}
#root{
  overflow-x: hidden;
}
button{
  font-family: 'Poppins', 'Roboto', sans-serif;
}
a{
  text-decoration: none;
}
.no-scroll{
  overflow:hidden;
}
.flex {
  display: flex;
  flex-wrap: wrap;
}

.flex-aic {
  align-items: center;
}

.flex-jcc {
  justify-content: center;
}

.flex-jcsb {
  justify-content: space-between;
}

.flex-jcse {
  justify-content: space-evenly;
}

.flex-fdc {
  flex-direction: column;
}
`;
