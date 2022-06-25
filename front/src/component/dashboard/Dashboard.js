import { UserButton, useUser } from "@clerk/clerk-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ANONYMOUS_BASE_URL } from "../../constant/endpoint";
import { pageUrl } from "../../constant/pageurl";
import { FeedbackCards } from "../message-cards/FeedbackCards";
import "./dashboard.css";
import { Menu } from "./Menu";
import { SmileyReactions } from "./smiley-helper/SmileyReactions";
import logowhite from './logowhite.png';

export const Dashboard = () => {
  const { username } = useUser();
  const [userFeedbacks, setUserFeedbacks] = useState(null);

  useEffect(() => {
    const retrieveFeedback = async () => {
      const payload = {
        username,
      };
      const { data } = await axios.post(
        `${ANONYMOUS_BASE_URL}/feedbacks/retrieve`,
        payload
      );

      setUserFeedbacks(data.data);
    };

    retrieveFeedback();
  }, [username]);
  return (
    <React.Fragment>
      <div className="dashboard-container">
        {/* <aside className="container-fluid">
          <Menu/>
        </aside> */}

        <section className="container-fluid feedback-stack">
          <div className="fixed-heading-wrap">
            <div className="heading-caption">
              <Link to={pageUrl.HOMEPAGE} className="heading-title">
                {" "}
                <img className="logow" src={logowhite} alt="logo" />
                {" "}
              </Link>
              <h1 className="heading-greet">{username}</h1>
            </div>
            <UserButton />
          </div>
          {/* <p>
            {userFeedbacks?.length >= 5 &&
              "Feedback limit reached, request for upgrade"}
          </p> */}
          {userFeedbacks &&
            userFeedbacks.map(({ feedback, smiley, __createdtime__, id }) => {
              return (
                <FeedbackCards
                  key={id}
                  id={id}
                  feedback={feedback}
                  smiley={smiley}
                  givenDate={__createdtime__}
                />
              );
            })}

          {userFeedbacks?.length === 0 && (
            <div className="feedback-card card h-50 d-flex justify-content-center mb-5">
              <p className="texxt">
                You don't have any feedbacks. Share your link and update the page.
              </p>
            </div>
          )}
        </section>

        {/* <aside className="container-fluid">
          <SmileyReactions userFeedbacks={userFeedbacks} />
        </aside> */}
        
        <aside className="container-fluid">
          <Menu />
        </aside>
      </div>
    </React.Fragment>
  );
};
