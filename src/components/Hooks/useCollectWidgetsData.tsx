import { useState } from "react";

type collectDataPropsType = {
  widgetId?: number;
  widgetType: string;
}

const useCollectWidgetsData = (initialWidgets: any[]) => {
  const [widgets, setWidgets] = useState(initialWidgets);

  const addWidget = ({ widgetType }: collectDataPropsType) => ({ onSuccess, ...widgetData }) => {
    console.log(widgets, widgetType);
    setWidgets([
      ...widgets,
      {
        ...widgetData,
        widget_type: widgetType,
      }
    ]);
    onSuccess?.();
  };

  const removeWidget = () => {

  }

  return { widgets, setWidgets, addWidget, removeWidget };
}

export default useCollectWidgetsData;