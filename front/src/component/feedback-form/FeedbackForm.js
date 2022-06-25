import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ANONYMOUS_BASE_URL } from "../../constant/endpoint";
import { pageUrl } from "../../constant/pageurl";
import { Bubble } from "../../layouts/animation/Bubble";
import { Navbar } from "../../layouts/navbars/Navbar";
import { SelectSmileyReaction } from "../dashboard/smiley-helper/SmileyReactions";
import "./feedbackform.css";
import { convertSmileyText} from '../dashboard/smiley-helper/_smileyFunction.js'
import logo from '../homepage/logo.png'

export const FeedbackForm = () => {
  const { id } = useParams();
  const [receiver, setReceiver] = useState(null);
  const [feedbackSent, setfeedbackSent] = useState(false);
  const [upgrade, setUpgrade] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);

  const [feedback, setFeedback] = useState(null);
  const [smiley, setSmiley] = useState(null);

  useEffect(() => {
    const findReceiver = async () => {
      const username = {
        username: id,
      };
      const { data } = await axios.post(
        `${ANONYMOUS_BASE_URL}/receivers/find`,
        username
      );

      if (data.message) {
        // stop loading and do nothing
        setLoading(false);
        return;
      }

      setReceiver(data);
      setLoading(false);
    };

    findReceiver();
  }, [id]);

  // Feedback message
  const handleChange = (e) => {
    setFeedback(e.target.value);
  };

  // set smiley -callback to selectSmileyReaction component
  const setSmileyToFrom = (selectedSmiley) => {
    setSmiley(selectedSmiley);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (feedback && smiley) {
      const newFeedBack = {
        username: receiver,
        feedback: feedback,
        smiley: smiley,
      };
      try {
        const { data } = await axios.post(
          `${ANONYMOUS_BASE_URL}/new`,
          newFeedBack
        );

        if (data === "full") {
          setUpgrade(true);
        } else {
          setfeedbackSent(true);
        }
      } catch (error) {
        setSubmitting(false);
      }
    }
  };

  // UI for successful feedback
  if (feedbackSent) {
    function reloadPage() {
      window.location.reload();
    }
    return (
      <div className="feedback-success container text-center">
        <h1>Your feedback has been sent successfully. Thanks!</h1>
        {/* <p className="btn mt-3" onClick={() => reloadPage()}>
          Go back
        </p> */}
        <p className="smiley">Given grade: {convertSmileyText(smiley)}/5</p>
        <Bubble />
      </div>
    );
  }
  // if (upgrade) {
  //   return (
  //     <div className="feedback-success container text-center">
  //       <h1>Feedback Limit Reached</h1>
  //       <a href={pageUrl.HOMEPAGE} className="btn mt-3">
  //         {id} has reached their free feedback limit.
  //       </a>
  //       <Bubble />
  //     </div>
  //   );
  // }
  return (
    <React.Fragment>
      {/* <Navbar /> */}
      <img className="logog" src={logo} alt="logo" />
      <div className="feedback-form container">
        {/* {loading ? (
          <h1 className="receiver-alert">Finding receiver. please wait</h1>
        ) : receiver ? (
          <h1 className="receiver-alert">Write Feedback to {receiver}</h1>
        ) : (
          <h1 className="receiver-alert">{id} not found</h1>
        )} */}
      
          <h1 className="receiver-alert"> Feedback for {receiver}</h1>
        

        <div className="select-smiley">
          <SelectSmileyReaction setSmileyToFrom={setSmileyToFrom} />
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
          rows={6}
            placeholder={`${smiley ? "Type some comments on the class" : "Select suitable grade"}`}
            onChange={handleChange}
            disabled={smiley ? false : true}
            required
          />
          <button
            className="btn feedback-btn"
            disabled={receiver ? false : true}
          >
            {isSubmitting ? "Working..." : "Submit"}
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};
