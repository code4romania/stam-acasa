import React, { useEffect, useState } from "react";
import { Button, Select } from "@code4ro/taskforce-fe-components";
import PropTypes from "prop-types";
import ProfileApi from "../../api/profileApi";

const IntroOtherEvaluation = ({ onFinish }) => {
  useEffect(() => {
    ProfileApi.getDependants().then(members => {
      setDependants(members);
      setSelectedMember(members[0].id);
    });
  }, []);

  const [dependants, setDependants] = useState([]);
  const [selectedMember, setSelectedMember] = useState(undefined);

  const props = {
    onChange: function(el) {
      setSelectedMember(el.target.value);
    }
  };

  const options = dependants.map(dependant => {
    return {
      text: `${dependant.name} ${dependant.surname}`,
      value: dependant.id,
      selected: dependant.id === selectedMember
    };
  });

  return (
    <div>
      <Select
        label={"Alege persoana pentru care faci formularul"}
        options={options}
        selectProps={props}
      />
      <Button onClick={() => onFinish(selectedMember)}>
        Completeaza formularul
      </Button>
    </div>
  );
};

export default IntroOtherEvaluation;

IntroOtherEvaluation.propTypes = {
  onFinish: PropTypes.func.isRequired
};
