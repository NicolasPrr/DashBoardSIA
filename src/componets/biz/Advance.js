import React from "react";
import { connect } from "react-redux";
import { Progress, Typography, Tooltip, Row } from "antd";
const { Text } = Typography;
function buildPercent(credits, required) {
  if (credits > required) return 100;
  else return (credits / required) * 100;
}

function getLimit(credits, required) {
  if (credits > required) return required;
  else return credits;
}
const ProgressTypology = ({ types, requiredCredits }) => {
  const fundamentationR =
    parseFloat(requiredCredits.fundObgl) + parseFloat(requiredCredits.fundOpt);
  const fundamentation = parseFloat(types.fundObli) + parseFloat(types.fundOpt);

  const disciplinarR =
    parseFloat(requiredCredits.dispObgl) + parseFloat(requiredCredits.dispOpt);
  const disciplinar = parseFloat(types.dispObli) + parseFloat(types.dispOpt);

  const fundamentalSum = getLimit(fundamentation, fundamentationR);
  const elective = getLimit(
    parseFloat(types.elective),
    parseFloat(requiredCredits.elective)
  );
  const disciplinarSum = getLimit(disciplinar, disciplinarR);

  const total = fundamentalSum + elective + disciplinarSum;
  const totalRequired =
    parseFloat(requiredCredits.elective) +
    disciplinarR +
    fundamentationR +
    parseFloat(requiredCredits.degreeWork);

  const finalPercent = buildPercent(total, totalRequired);

  return (
    <div>
      <Text>Electivas</Text>
      <Tooltip title={`${types.elective}/${requiredCredits.elective}`}>
        <Progress
          strokeColor={{
            "0%": "#108ee9",
            "100%": "#295A80"
          }}
          percent={buildPercent(types.elective, requiredCredits.elective)}
        />
      </Tooltip>
      <Text>Fundamentación</Text>
      <Tooltip title={`${fundamentation}/${fundamentationR}`}>
        <Progress
          strokeColor={{
            "0%": "#108ee9",
            "100%": "#04BFBF"
          }}
          percent={buildPercent(fundamentation, fundamentationR)}
        />
      </Tooltip>
      <Text>Disciplinar</Text>
      <Tooltip title={`${disciplinar}/${disciplinarR}`}>
        <Progress
          strokeColor={{
            "0%": "#108ee9",
            "100%": "#F23E2E"
          }}
          percent={buildPercent(disciplinar, disciplinarR)}
        />
      </Tooltip>
      <Row type="flex" justify="center">
        <Tooltip title={`${total}/${totalRequired}`}>
          <Progress
            strokeColor={{
              "0%": "#108ee9",
              "100%": "##0FF25E"
            }}
            width={280}
            type="dashboard"
            percent={parseFloat(finalPercent.toFixed(2))}
          />
        </Tooltip>
      </Row>
    </div>
  );
};

const mapStateToProps = state => ({
  requiredCredits: state.requiredCredits
});
export default connect(mapStateToProps, null)(ProgressTypology);
