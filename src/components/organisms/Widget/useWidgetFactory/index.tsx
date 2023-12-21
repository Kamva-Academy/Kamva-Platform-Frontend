import { useDispatch } from 'react-redux';
import { WidgetModes } from 'components/organisms/Widget';
import WIDGET_TYPE_MAPPER from './WidgetTypeMapper';
import { deleteWidgetAction } from 'redux/slices/Paper';

type WidgetFactoryType = {
  widgetId?: number;
  paperId?: number;
  widgetType: string;
  mode: WidgetModes;
  collectDataForPaper?: any;
}

const useWidgetFactory = ({
  widgetId,
  paperId,
  widgetType,
  mode,
  collectDataForPaper,
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
    collectDataForPaper({ widgetId, widgetType });

  onAnswerSubmit = (arg) => dispatcher(submitAnswerAction(arg));

  onDelete = (arg) => dispatcher<any>(deleteWidgetAction(arg));

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