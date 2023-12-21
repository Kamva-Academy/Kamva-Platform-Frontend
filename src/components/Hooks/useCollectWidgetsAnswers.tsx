import { useState } from "react";

type collectAnswersPropsType = {
  widgetId: number;
  widgetType: string;
}

const useCollectWidgetsAnswers = (initialAnswers: any[]) => {
  const [answers, setAnswers] = useState(initialAnswers);

  const collectAnswers = ({ widgetId, widgetType, }: collectAnswersPropsType) => (data: object) => {
    let isFound = false;
    const tempAnswers = [...answers];
    for (let i = 0; i < tempAnswers.length; i++) {
      if (tempAnswers[i].problem === widgetId) {
        let isDataEmpty = true;
        for (let [key, value] of Object.entries(data)) {
          if (value) {
            isDataEmpty = false;
          }
          tempAnswers[i][key] = value;
        }
        if (isDataEmpty) {
          tempAnswers.splice(i, 1);
        }
        isFound = true;
        break;
      }
    }
    if (!isFound) {
      tempAnswers.push({
        ...data,
        answer_type: widgetType,
        problem: widgetId,
      });
    }
    setAnswers(tempAnswers);
  };

  return { answers, setAnswers, collectAnswers };
}

export default useCollectWidgetsAnswers;