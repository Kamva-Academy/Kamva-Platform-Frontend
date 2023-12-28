import { useDispatch } from 'react-redux';
import { WidgetModes } from 'components/organisms/Widget';
import WIDGET_TYPE_MAPPER from './WidgetTypeMapper';
import { deleteWidgetAction } from 'redux/slices/widget';

type WidgetFactoryType = {
  widgetId?: number;
  paperId?: number;
  widgetType: string;
  mode: WidgetModes;
  collectWidgetDataToolkit?: any;
  collectAnswerData?: any;
}

const useWidgetFactory = ({
  widgetId,
  paperId,
  widgetType,
  mode,
  collectWidgetDataToolkit,
  collectAnswerData,
}: WidgetFactoryType) => {
  const dispatcher = useDispatch();
  let onDelete, onEdit, onAnswerChange, onViwe, onAnswerSubmit;
  const {
    WidgetComponent,
    EditWidgetDialog,
    createAction,
    updateAction,
    submitAnswerAction,
  } = WIDGET_TYPE_MAPPER[widgetType];

  onEdit = paperId ?
    (widgetId ?
      (arg) => dispatcher(updateAction(arg)) :
      (arg) => dispatcher(createAction(arg))) :
    // todo: fix TOF. لزوماً نباید با ?. هندلش کرد و لزوماً نباید اینجا صداش زد. اینجا صرفاً باید پاسش داد
    (widgetId ?
      collectWidgetDataToolkit?.updateWidget :
      collectWidgetDataToolkit?.addWidget?.({ widgetType }));

  onAnswerChange = collectAnswerData;

  onAnswerSubmit = (arg) => dispatcher(submitAnswerAction(arg));

  onDelete = paperId ?
    (arg) => dispatcher<any>(deleteWidgetAction(arg)) :
    collectWidgetDataToolkit?.removeWidget;

  return {
    onDelete,
    onEdit,
    onAnswerChange,
    onViwe,
    onAnswerSubmit,
    WidgetComponent,
    EditWidgetDialog,
  };
}

export default useWidgetFactory;