import { useState } from "react";

type WidgetType = any;

type AddWidgetPropsType = {
  widgetType: string;
  onSuccess?: any;
}

type UpdateWidgetPropsType = {
  pid: number;
  onSuccess?: any;
}

type DeleteWidgetPropsType = {
  pid: number;
  onSuccess?: any;
}

const useCollectWidgetsData = (initialWidgets: WidgetType[]) => {
  const [id, _setId] = useState<number>(1); // pid means private id
  const increaseId = () => _setId(pid => pid + 1)
  const [widgets, setWidgets] = useState<WidgetType[]>(initialWidgets);

  const addWidget = ({ widgetType }) => ({ onSuccess, ...widgetData }: AddWidgetPropsType) => {
    setWidgets([
      ...widgets,
      {
        ...widgetData,
        widget_type: widgetType,
        id,
      }
    ]);
    increaseId();
    onSuccess?.();
  };

  const updateWidget = ({ pid, onSuccess, ...updatedWidgetData }: UpdateWidgetPropsType) => {
    const newWidgets = [...widgets];
    newWidgets.forEach((widget, index) => {
      if (widget.pid == pid) {
        newWidgets[index] = {
          ...widget,
          ...updatedWidgetData,
        }
      }
    })
    setWidgets(newWidgets);
    onSuccess?.();
  }

  const removeWidget = ({ pid, onSuccess }: DeleteWidgetPropsType) => {
    const newWidgets = [...widgets];
    newWidgets.forEach((widget, index) => {
      if (widget.pid == pid) {
        newWidgets.splice(index, 1);
      }
    })
    setWidgets(newWidgets);
    onSuccess?.();
  }

  return { widgets, addWidget, updateWidget, removeWidget };
}

export default useCollectWidgetsData;