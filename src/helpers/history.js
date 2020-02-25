//Nos permite construir la historia academica con los datos ingresados en el textArea
export default function setData(data) {
  //([A-ZÁ-Ú][á-úa-zÁ-ÚA-U :-]*[a-uA-U]) (\(\d{7}[-B]*\))\t(\d)\t([A-UÁ-Ú ]*)\t(\d{4})
  //Expresion regular con la version del sia nuevo
  //([A-ZÁ-Ú][á-úa-zÁ-ÚA-Z ,:-]*[a-zA-Z]) (\(\d{7}[-B]*\))\t(\d)\t([A-ZÁ-Ú .]*)\t(\d{4}-\d)S Ordinaria\t(\d.\d)
  let history = {
    periods: [],
    requiredCredits: {
      dispObgl: null,
      degreeWork: null,
      fundObgl: null,
      dispOpt: null,
      elective: null,
      fundOpt: null
    }
  };
  /*
    Array input after match
  0: "Taller de proyectos interdisciplinarios (2024045)	3	DISCIPLINAR OBLIGATORIA	2019-1S Ordinaria	4.1"
  1: "Taller de proyectos interdisciplinarios"
  2: "2024045"
  3: "3"
  4: "DISCIPLINAR OBLIGATORIA"
  5: "2019-1"
  6: "4.1"
  index: 0
  input: "Taller de proyectos interdisciplinarios (2024045)	3	DISCIPLINAR OBLIGATORIA	2019-1S Ordinaria	4.1"
  groups: undefined
  length: 7
  __proto__: Array(0)
    */
  var course = /([A-ZÁ-Ú][á-úa-zÁ-ÚA-Z ,:-]*[a-zA-Z]) \((\d{7})[-B]*\)\t(\d)\t([A-ZÁ-Ú .]*)\t(\d{4}-\d)S Ordinaria\t(\d.\d)/;
  let dispObgl = /DISCIPLINAR OBLIGATORIA\t(\d*)\t(\d*)\t(\d*)\t(\d*)\t(\d*)/;
  let degreeWork = /TRABAJO DE GRADO\t(\d*)\t(\d*)\t(\d*)\t(\d*)\t(\d*)/;
  let fundObgl = /FUND. OBLIGATORIA\t(\d*)\t(\d*)\t(\d*)\t(\d*)\t(\d*)/;
  let dispOpt = /DISCIPLINAR OPTATIVA\t(\d*)\t(\d*)\t(\d*)\t(\d*)\t(\d*)/;
  let elective = /LIBRE ELECCIÓN\t(\d*)\t(\d*)\t(\d*)\t(\d*)\t(\d*)/;
  let fundOpt = /FUND. OPTATIVA\t(\d*)\t(\d*)\t(\d*)\t(\d*)\t(\d*)/;
  let periodsConfirm = {};
  var periodCount = -1;

  for (var i = data.length; i > 0; i--) {
    const str = course.exec(data[i]);

    if (str !== null) {
      if (periodsConfirm[str[5]] === undefined) {
        periodCount++;
        periodsConfirm[str[5]] = 1;
        history.periods.push({
          name: str[5],
          courses: [getFormatCourse(str)]
        });
      } else {
        history.periods[periodCount].courses.push(getFormatCourse(str));
      }
    }
    const strdispObgl = dispObgl.exec(data[i]);
    const strdegreeWork = degreeWork.exec(data[i]);
    const strfundObgl = fundObgl.exec(data[i]);
    const strdispOpt = dispOpt.exec(data[i]);
    const strelective = elective.exec(data[i]);
    const strfundOpt = fundOpt.exec(data[i]);
    
    history.requiredCredits = {
      dispObgl: strdispObgl === null ? history.requiredCredits.dispObgl : strdispObgl[1] ,
      degreeWork: strdegreeWork === null ? history.requiredCredits.degreeWork : strdegreeWork[1] ,
      fundObgl: strfundObgl === null ? history.requiredCredits.fundObgl : strfundObgl[1] ,
      dispOpt: strdispOpt === null ? history.requiredCredits.dispOpt : strdispOpt[1] ,
      elective: strelective === null ? history.requiredCredits.elective : strelective[1] ,
      fundOpt: strfundOpt === null ? history.requiredCredits.fundOpt : strfundOpt[1] ,
    }
  }
  console.log(history)
  return history;
}
function getTypeCourse(str) {
  if (str === "NIVELACIÓN") return "E";
  if (str === "DISCIPLINAR OBLIGATORIA") return "C";
  if (str === "FUND. OPTATIVA") return "O";
  if (str === "DISCIPLINAR OPTATIVA") return "T";
  if (str === "LIBRE ELECCIÓN") return "L";
  if (str === "FUND. OBLIGATORIA") return "B";
}
function getFormatCourse(info) {
  return [
    info[0], // 0 Total
    info[2], // 1 Codxigo
    info[2], // 2 b2 no importa
    info[1], // 3  Nombre de la materia
    0, // 4 no importa, veces vista
    0, // 5 no importa, veces vista
    0, // 6 no importa, veces vista
    getTypeCourse(info[4]), // 7 es el tipo
    info[3], // 8 numero de creditos  de la materia
    0, // 9 no importa, veces vista
    info[6] // 10 nota
  ];
}
