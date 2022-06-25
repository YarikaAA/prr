// Converts smiley name to emoji
export const convertSmileyText = (smileyName) => {
  switch (smileyName) {
    case "love":
      return "1";

    case "cry":
      return "2";

    case "sad":
      return "3";

    case "hail":
      return "4";

    case "thumb":
      return "5";

    default:
      break;
  }
};
