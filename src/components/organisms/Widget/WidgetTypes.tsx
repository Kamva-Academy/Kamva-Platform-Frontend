import BigAnswerProblemWidget, {
  BigAnswerQuestionEditWidget,
} from './BigAnswerProblemWidget';
import InviteeUsername, { InviteeUsernameEdit } from './questions/InviteeUsername';
import ImageWidget, { ImageEditWidget } from './ImageWidget';
import MiniGameWidget, { MiniGameEditWidget } from './MiniGameWidget';
import MultiChoiceQuestionWidget, {
  MultiChoiceQuestionEditWidget,
} from './MultiChoiceQuestionWidget';
import SmallAnswerProblemWidget, {
  SmallAnswerProblemEditWidget,
} from './SmallAnswerProblemWidget';
import TextWidget, { TextEditWidget } from './TextWidget';
import UploadFileProblemWidget, {
  UploadFileProblemEditWidget,
} from './UploadFileProblemWidget';
import VideoWidget, { VideoEditWidget } from './VideoWidget';
import AudioWidget, { AudioEditWidget } from './content/AudioWidget';

const WIDGET_TYPES = {
  // InviteeUsernameQuestion: {
  //   WidgetComponent: InviteeUsername,
  //   EditWidgetDialog: InviteeUsernameEdit,
  //   label: 'سوال کد معرف',
  //   backendType: 'InviteeUsernameQuestion',
  // },
  SmallAnswerProblem: {
    WidgetComponent: SmallAnswerProblemWidget,
    EditWidgetDialog: SmallAnswerProblemEditWidget,
    label: 'سوال کوتاه‌پاسخ',
    backendType: 'SmallAnswerProblem',
  },
  BigAnswerProblem: {
    WidgetComponent: BigAnswerProblemWidget,
    EditWidgetDialog: BigAnswerQuestionEditWidget,
    label: 'سوال تشریحی',
    backendType: 'BigAnswerProblem',
  },
  // MultiChoiceProblem: {
  //   WidgetComponent: MultiChoiceQuestionWidget,
  //   EditWidgetDialog: MultiChoiceQuestionEditWidget,
  //   label: 'سوال چند گزینه‌ای',
  //   backendType: 'MultiChoiceProblem',
  // },
  UploadFileProblem: {
    WidgetComponent: UploadFileProblemWidget,
    EditWidgetDialog: UploadFileProblemEditWidget,
    label: 'ارسال فایل',
    backendType: 'UploadFileProblem',
  },
  Description: {
    WidgetComponent: TextWidget,
    EditWidgetDialog: TextEditWidget,
    label: 'متن',
    backendType: 'Description',
  },
  Image: {
    WidgetComponent: ImageWidget,
    EditWidgetDialog: ImageEditWidget,
    label: 'عکس',
    backendType: 'Image',
  },
  Video: {
    WidgetComponent: VideoWidget,
    EditWidgetDialog: VideoEditWidget,
    label: 'فیلم',
    backendType: 'Video',
  },
  Audio: {
    WidgetComponent: AudioWidget,
    EditWidgetDialog: AudioEditWidget,
    label: 'صوت',
    backendType: 'Audio',
  },
  Game: {
    WidgetComponent: MiniGameWidget,
    EditWidgetDialog: MiniGameEditWidget,
    label: 'بازی',
    backendType: 'Game',
  },
};
export default WIDGET_TYPES;
