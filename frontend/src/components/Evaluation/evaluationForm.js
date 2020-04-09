import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Evaluation from "../Evaluation";
import { Form } from "@code4ro/taskforce-fe-components";
import FinishFormButton from "../Evaluation/finishFormButton";
import IntroSelfEvaluation from "../SelfEvaluation/introSelfEvaluation";

const EvaluationForm = ({ getForm, sendResults }) => {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [introData, setIntroData] = useState({});
  const [evaluationFormData, setEvaluationForm] = useState(null);

  useEffect(() => {
    getForm().then(setEvaluationForm);
  }, [getForm]);

  const evaluateCallback = (formState, options) => options[0];

  const onFinishingForm = result => {
    setFinished(true);
    sendResults(result, introData);
  };

  const onFinishingIntro = introData => {
    setIntroData(introData);
    setStarted(true);
  };

  if (started) {
    return (
      <Evaluation>
        {evaluationFormData && (
          <Form
            data={evaluationFormData}
            evaluateForm={evaluateCallback}
            onFinishingForm={onFinishingForm}
          />
        )}
        {evaluationFormData === null && <div>Formularul se incarca</div>}
        {finished && <FinishFormButton />}
      </Evaluation>
    );
  } else {
    return (
      <Evaluation>
        <IntroSelfEvaluation onFinish={onFinishingIntro} />
      </Evaluation>
    );
  }
};

export default EvaluationForm;

EvaluationForm.propTypes = {
  getForm: PropTypes.func.isRequired,
  sendResults: PropTypes.func.isRequired,
  introType: PropTypes.oneOf(["OTHER", "SELF"])
};
