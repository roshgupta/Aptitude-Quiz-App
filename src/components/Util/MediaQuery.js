const size = {
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1200px",
  desktop: "1440px",
};
const device = {
  mobileM: `@media (max-width: ${size.mobileM})`,
  mobileL: `@media (max-width: ${size.mobileL})`,
  tablet: `@media (max-width: ${size.tablet})`,
  laptop: `@media (max-width: ${size.laptop})`,
  laptopL: `@media (max-width: ${size.laptopL})`,
  desktop: `@media (max-width: ${size.desktop})`,
};
export default device;
// ${device.tablet} {
//   border: 6px solid green;
// }

//import it and use it like this
//use it like this

//since in styled component we are writing css in back-ticks, so we can access
// variables with the help of interpoliting
