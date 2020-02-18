export function calculatePAPPI(courses) {
  var creditos = 0;
  var PAPPI = 0;
  for (var i = 0; i < courses.length; i++) {
    const cond =
      courses[i][7] === "T" ||
      courses[i][7] === "O" ||
      courses[i][7] === "C" ||
      courses[i][7] === "L" ||
      courses[i][7] === "B";
    if (cond || courses[i][1] === "1000001") {
      creditos = creditos + parseInt(courses[i][8]);
      PAPPI = PAPPI + courses[i][8] * courses[i][10];
    }
  }
  return (PAPPI / creditos).toFixed(2);
}
export function calculatePAPA(
  courses,
  creditsPerScore,
  totalCredits,
  lost,
  creditsPerScorePA,
  credtisPA
) {
  var creditos = totalCredits;
  var ac = creditsPerScore; //acumulado
  for (var i = 0; i < courses.length; i++) {
    const cond =
      courses[i][7] === "T" ||
      courses[i][7] === "O" ||
      courses[i][7] === "C" ||
      courses[i][7] === "L" ||
      courses[i][7] === "B";
    if (cond || courses[i][1] === "1000001") {
      //Para el calculo del PAPA se tiene en cuenta las materias perdidas
      //verificamos si la materia estubo perdida
      const currentCourse = courses[i];
      const lostCourse = lost[courses[i][1]];
      if (lostCourse !== undefined) {
        if (currentCourse[10] > lostCourse[10] && currentCourse[10] > 3) {
          lost[currentCourse[1]] = undefined;
          //actualizar PA, resta  al acumulado  lostCourse[10]*#creditos + currentCourse[10]#numeroCreditos
          creditsPerScorePA +=
            currentCourse[10] * currentCourse[8] -
            lostCourse[10] * lostCourse[8];
        } else if (
          currentCourse[10] > lostCourse[10] &&
          currentCourse[10] < 3
        ) {
          //actualizar PA, resta  al acumulado  lostCourse[10]*#creditos + currentCourse[10]#numeroCreditos
          lost[currentCourse[1]] = Object.assign({}, currentCourse);
          creditsPerScorePA +=
            currentCourse[10] * currentCourse[8] -
            lostCourse[10] * lostCourse[8];
        }
      } else {
        //si se perdio la materia y no esta registrada (primera vez que se pierde)
        if (courses[i][10] < 3) {
          lost[courses[i][1]] = Object.assign({}, currentCourse);
          creditsPerScorePA += currentCourse[10] * currentCourse[8];
          credtisPA += parseInt(currentCourse[8]);
        } else {
          //si se pasa la materia normalmente
          creditsPerScorePA += currentCourse[10] * currentCourse[8];
          credtisPA += parseInt(currentCourse[8]);
        }
        //actualizar pa y numero de creditos
      }

      creditos = creditos + parseInt(courses[i][8]);
      ac = ac + courses[i][8] * parseFloat(courses[i][10]);
    }
  }
  //ac = ac.toFixed(1);

  return [
    (ac / creditos).toFixed(2),
    ac,
    creditos,
    lost,
    creditsPerScorePA,
    credtisPA,
    (creditsPerScorePA / credtisPA).toFixed(2)
  ];
}
export function averagePerTopology(periods) {
  var courses;

  var fundamentation;
  var disciplinar;
  var elective;

  var creditsL = 0;
  var scorePerCredtis_L = 0;

  var creditsOF = 0;
  var scorePerCredtis_OF = 0;

  var creditsOPF = 0;
  var scorePerCredtis_OPF = 0;

  var creditsOD = 0;
  var scorePerCredtis_OD = 0;

  var creditsOPD = 0;
  var scorePerCredtis_OPD = 0;
  //B FUNDAMENTAL OBLIGATORIA
  //O FUNDAMENTAL OPTATIVA

  //C DISCIPLINAR OBLIGATORIA
  //T DISCIPLINAR OPTATIVA

  //L LIBRE ELECCIÓN
  //TRABAJO DE GRADO
  for (var i = 0; i < periods.length; i++) {
    courses = periods[i].courses;
    for (var j = 0; j < courses.length; j++) {
      if (courses[j][7] === "L") {
        scorePerCredtis_L += courses[j][8] * parseFloat(courses[j][10]);
        creditsL += parseInt(courses[j][8]);
      }

      if (courses[j][7] === "B") {
        scorePerCredtis_OF += courses[j][8] * parseFloat(courses[j][10]);
        creditsOF += parseInt(courses[j][8]);
      }
      if (courses[j][7] === "O") {
        scorePerCredtis_OPF += courses[j][8] * parseFloat(courses[j][10]);
        creditsOPF += parseInt(courses[j][8]);
      }

      if (courses[j][7] === "C") {
        scorePerCredtis_OD += courses[j][8] * parseFloat(courses[j][10]);
        creditsOD += parseInt(courses[j][8]);
      }
      if (courses[j][7] === "T") {
        scorePerCredtis_OPD += courses[j][8] * parseFloat(courses[j][10]);
        creditsOPD += parseInt(courses[j][8]);
      }
    }
  }
  fundamentation = (
    (scorePerCredtis_OF + scorePerCredtis_OPF) /
    (creditsOF + creditsOPF)
  ).toFixed(2);
  disciplinar = (
    (scorePerCredtis_OD + scorePerCredtis_OPD) /
    (creditsOD + creditsOPD)
  ).toFixed(2);
  elective = scorePerCredtis_L / creditsL;
  elective = elective.toFixed(2);

  return [
    parseFloat(fundamentation),
    parseFloat(disciplinar),
    parseFloat(elective)
  ];
}
export function parseObjects(array) {
  let data = [];
  array.forEach(element => {
    let new_element = { ...element };
    new_element.PAPA = parseFloat(element.PAPA);
    new_element.PA = parseFloat(element.PA);
    new_element.PAPPI = parseFloat(element.PAPPI);
    data.push(new_element);
  });
  return data;
}
export function getCoursesByType(periods) {
  let scorePerCredtis_L = 0,
    scorePerCredtis_OF = 0,
    scorePerCredtis_OPF = 0,
    scorePerCredtis_OD = 0,
    scorePerCredtis_OPD = 0;
  for (var i = 0; i < periods.length; i++) {
    const courses = periods[i].courses;
    for (var j = 0; j < courses.length; j++) {
      if (courses[j][7] === "L") {
        scorePerCredtis_L++;
      }

      if (courses[j][7] === "B") {
        scorePerCredtis_OF++;
      }
      if (courses[j][7] === "O") {
        scorePerCredtis_OPF++;
      }

      if (courses[j][7] === "C") {
        scorePerCredtis_OD++;
      }
      if (courses[j][7] === "T") {
        scorePerCredtis_OPD++;
      }
    }
  }
  return {
    elective: scorePerCredtis_L,
    fundObli: scorePerCredtis_OF,
    fundOpt: scorePerCredtis_OPF,
    dispObli: scorePerCredtis_OD,
    dispOpt: scorePerCredtis_OPD
  };
}
export function getCredtisByType(periods) {
  let scorePerCredtis_L = 0,
    scorePerCredtis_OF = 0,
    scorePerCredtis_OPF = 0,
    scorePerCredtis_OD = 0,
    scorePerCredtis_OPD = 0;
  for (var i = 0; i < periods.length; i++) {
    const courses = periods[i].courses;
    for (var j = 0; j < courses.length; j++) {
      if (courses[j][7] === "L") {
        scorePerCredtis_L += parseInt(courses[j][8]);
      }

      if (courses[j][7] === "B") {
        scorePerCredtis_OF += parseInt(courses[j][8]);
      }
      if (courses[j][7] === "O") {
        scorePerCredtis_OPF += parseInt(courses[j][8]);
      }

      if (courses[j][7] === "C") {
        scorePerCredtis_OD += parseInt(courses[j][8]);
      }
      if (courses[j][7] === "T") {
        scorePerCredtis_OPD += parseInt(courses[j][8]);
      }
    }
  }
  return {
    elective: scorePerCredtis_L,
    fundObli: scorePerCredtis_OF,
    fundOpt: scorePerCredtis_OPF,
    dispObli: scorePerCredtis_OD,
    dispOpt: scorePerCredtis_OPD
  };
}
