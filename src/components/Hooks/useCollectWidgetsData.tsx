import { useState } from "react";

type WidgetType = any;

type AddWidgetPropsType = {
  widgetType: string;
  onSuccess?: any;
}

type UpdateWidgetPropsType = {
  widgetId: number;
  onSuccess?: any;
}

type DeleteWidgetPropsType = {
  widgetId: number;
  onSuccess?: any;
}

const useCollectWidgetsData = (initialWidgets: WidgetType[]) => {
  const AN_ALMOST_RANDOM_BIG_NEGATIVE_NUMBER = -100;
  const [tid, _setTid] = useState<number>(AN_ALMOST_RANDOM_BIG_NEGATIVE_NUMBER); // tid means temporary id
  const increaseTid = () => _setTid(pid => pid + 1)
  const [widgets, setWidgets] = useState<WidgetType[]>(initialWidgets);

  const addWidget = ({ widgetType }) => ({ onSuccess, ...widgetData }: AddWidgetPropsType) => {
    setWidgets([
      ...widgets,
      {
        ...widgetData,
        widget_type: widgetType,
        id: tid,
      }
    ]);
    increaseTid();
    onSuccess?.();
  };

  const updateWidget = ({ widgetId, onSuccess, ...updatedWidgetData }: UpdateWidgetPropsType) => {
    const newWidgets = [...widgets];
    newWidgets.forEach((widget, index) => {
      if (widget.id == widgetId) {
        newWidgets[index] = {
          ...widget,
          ...updatedWidgetData,
        }
      }
    })
    setWidgets(newWidgets);
    onSuccess?.();
  }

  const removeWidget = ({ widgetId, onSuccess }: DeleteWidgetPropsType) => {
    const newWidgets = [...widgets];
    newWidgets.forEach((widget, index) => {
      if (widget.id == widgetId) {
        newWidgets.splice(index, 1);
      }
    })
    setWidgets(newWidgets);
    onSuccess?.();
  }

  return { widgets, addWidget, updateWidget, removeWidget };
}

export default useCollectWidgetsData;