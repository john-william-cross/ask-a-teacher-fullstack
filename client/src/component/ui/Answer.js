import React from "react";
import toDisplayDate from "date-fns/format";

export default function Answer(props) {
   return (
      <>
         <div className="answers" key={props.answer.id}>
            <p className="mb-4">
               {props.answer.text}
               {props.answer.text && (
                  <span className="text-muted">
                     This question was answered by a teacher in{" "}
                     {props.answer.userHomeState} on{" "}
                     {toDisplayDate(props.answer.answeredAt, "MMMM d, y")}.
                  </span>
               )}
            </p>

            <hr></hr>
         </div>
      </>
   );
}

// all components must render jsx
