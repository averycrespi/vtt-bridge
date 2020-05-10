import * as classes from "./classes";

export const buildCommands = ({ className, event, data }) => {
  switch (className) {
    case classes.rollAbilityScoreCheck:
      return ["roll ability score check"];
    default:
      console.error("Unrecognized class name: " + className);
      return [];
  }
};
