import React, { useEffect, useState } from "react";
import "./smileyreaction.css";

export const SmileyReactions = ({ userFeedbacks }) => {
  // Get the numbers of smiley a user has
  const getSmileyLength = (array, smileyName) => {
    if (userFeedbacks) {
      const numbersOfSmiley = array.filter(
        (arr) => arr.smiley === smileyName
      ).length;
      return numbersOfSmiley;
    }
  };

  return (
    <section className="smiley-container">
      <abbr title={`${getSmileyLength(userFeedbacks, "love")} love emojis`}>
        <button
          className={`smiley love ${
            getSmileyLength(userFeedbacks, "love") > 0 && "active"
          }`}
        >
          <span className="smiley-count">
            {getSmileyLength(userFeedbacks, "love") || 0}
          </span>
          <span>1</span>
        </button>
      </abbr>

      <abbr title={`${getSmileyLength(userFeedbacks, "cry")} cry emojis`}>
        <button
          className={`smiley cry ${
            getSmileyLength(userFeedbacks, "cry") > 0 && "active"
          }`}
        >
          <span className="smiley-count">
            {getSmileyLength(userFeedbacks, "cry") || 0}
          </span>
          <span>2</span>
        </button>
      </abbr>

      <abbr title={`${getSmileyLength(userFeedbacks, "sad")} sad emojis`}>
        <button
          className={`smiley sad ${
            getSmileyLength(userFeedbacks, "sad") > 0 && "active"
          }`}
        >
          <span className="smiley-count">
            {getSmileyLength(userFeedbacks, "sad") || 0}
          </span>
          <span>3</span>
        </button>
      </abbr>

      <abbr title={`${getSmileyLength(userFeedbacks, "hail")} hail emojis`}>
        <button
          className={`smiley hail ${
            getSmileyLength(userFeedbacks, "hail") > 0 && "active"
          }`}
        >
          <span className="smiley-count">
            {getSmileyLength(userFeedbacks, "hail") || 0}
          </span>
          <span>4</span>
        </button>
      </abbr>

      <abbr title={`${getSmileyLength(userFeedbacks, "thumb")} thumb emojis`}>
        <button
          className={`smiley thumb ${
            getSmileyLength(userFeedbacks, "thumb") > 0 && "active"
          }`}
        >
          <span className="smiley-count">
            {getSmileyLength(userFeedbacks, "thumb") || 0}
          </span>
          <span>5</span>
        </button>
      </abbr>
    </section>
  );
};

export const SelectSmileyReaction = (props) => {
  const [selectedSmiley, setSelectedSmiley] = useState(null);

  useEffect(() => {
    const handleSmileyAppearance = () => {
      if (selectedSmiley !== null) {
        const allSmiley = document.querySelectorAll(".smiley");
        for (let x = 0; x < allSmiley.length; x++) {
          if (allSmiley[x].id === selectedSmiley) {
            // Add big font-size to selected Smiley

            props.setSmileyToFrom(allSmiley[x].id);

            document
              .getElementById(allSmiley[x].id)
              .classList.add("selected-smiley");
            // Remove fade
            document
              .getElementById(allSmiley[x].id)
              .classList.remove("unselected-smiley");
          } else if (allSmiley[x].id !== selectedSmiley) {
            // Reset font-size for other smiley
            document
              .getElementById(allSmiley[x].id)
              .classList.remove("selected-smiley");
            // Add fade
            document
              .getElementById(allSmiley[x].id)
              .classList.add("unselected-smiley");
          }
        }
      }
    };

    // Invoke func
    handleSmileyAppearance();
    return () => {
      setSelectedSmiley(null);
    };
  }, [selectedSmiley, props]);

  return (
    <section className="select-smiley-container">
      <div
        className="smiley love "
        id="love"
        onClick={() => setSelectedSmiley("love")}
      >
        1
      </div>
      <div
        className="smiley cry"
        id="cry"
        onClick={() => setSelectedSmiley("cry")}
      >
        2
      </div>
      <div
        className="smiley sad"
        id="sad"
        onClick={() => setSelectedSmiley("sad")}
      >
        3
      </div>
      <div
        className="smiley hail"
        id="hail"
        onClick={() => setSelectedSmiley("hail")}
      >
        4
      </div>
      <div
        className="smiley thumb"
        id="thumb"
        onClick={() => setSelectedSmiley("thumb")}
      >
        5
      </div>
    </section>
  );
};
