import * as Survey from "survey-react";
import "survey-react/survey.css";
import { useState } from "react";

Survey.StylesManager.applyTheme("default");

export default function Quiz(props) {
  var json = {
    title: "American History",
    showProgressBar: "bottom",
    showTimerPanel: "top",
    firstPageIsStarted: true,
    startSurveyText: "Start Quiz",
    pages: [
      {
        questions: [
          {
            type: "html",
            html: "You are about to start quiz on history. <br/><b>'Start Quiz'</b> button when you are ready.",
          },
        ],
      },
      {
        questions: [
          {
            type: "radiogroup",
            name: "civilwar",
            title: "When was the Civil War?",
            choices: [
              "1750-1800",
              "1800-1850",
              "1850-1900",
              "1900-1950",
              "after 1950",
            ],
            correctAnswer: "1850-1900",
          },
          {
            type: "radiogroup",
            name: "libertyordeath",
            title: "Who said 'Give me liberty or give me death?'",
            choicesOrder: "random",
            choices: [
              "John Hancock",
              "James Madison",
              "Patrick Henry",
              "Samuel Adams",
            ],
            correctAnswer: "Patrick Henry",
          },
          {
            type: "radiogroup",
            name: "magnacarta",
            title: "What is the Magna Carta?",
            choicesOrder: "random",
            choices: [
              "The foundation of the British parliamentary system",
              "The Great Seal of the monarchs of England",
              "The French Declaration of the Rights of Man",
              "The charter signed by the Pilgrims on the Mayflower",
            ],
            correctAnswer: "The foundation of the British parliamentary system",
          },
        ],
      },
    ],
    completedHtml:
      "<h4>You have answered correctly <b>{correctedAnswers}</b> questions from <b>{questionCount}</b>.</h4>",
  };

  var [quiz, setQuiz] = useState(new Survey.Model(json));

  return (
    <Survey.Survey
      model={quiz}
      onComplete={function (sender) {
        const completed = new Survey.Model(json);
        completed.data = sender.valuesHash;
        completed.onComplete.add(function (sender) {
          document.querySelector("#surveyResult").textContent =
            "Result JSON:\n" + JSON.stringify(sender.data, null, 3);
        });
        completed.title = "Answer Sheet: American History";
        completed.mode = "display";
        completed.questionsOnPageMode = "singlePage";
        completed.showNavigationButtons = "none";
        completed.showProgressBar = "off";
        completed.showTimerPanel = "none";
        completed.maxTimeToFinishPage = 0;
        completed.maxTimeToFinish = 0;
        completed.onAfterRenderQuestion.add(function (survey, options) {
          var span = document.createElement("span");
          var isCorrect = options.question.isAnswerCorrect();
          span.innerHTML = isCorrect ? "Correct" : "Incorrect";
          span.style.color = isCorrect ? "green" : "red";
          var header = options.htmlElement.querySelector("h5");
          if (!isCorrect) {
            header.style.backgroundColor = "salmon";
            var radio = options.htmlElement.querySelector(
              'input[value="' + options.question.correctAnswer + '"]'
            );
            if (!!radio) {
              radio.parentElement.style.color = "green";
            }
          }
          header.appendChild(span);
        });
        setQuiz(completed);
      }}
    />
  );
}
