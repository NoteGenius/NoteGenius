import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = "G-L69D1WD0W5"; // Google analytics measurement id

export const initGA = () => {
  ReactGA.initialize(GA_MEASUREMENT_ID);
};

export const logPageView = () => {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname + window.location.search,
  });
};
