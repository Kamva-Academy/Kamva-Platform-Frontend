import BigAnswerProblemWidget, { BigAnswerQuestionEditWidget } from '../questions/BigAnswerProblemWidget';
import ImageWidget, { ImageEditWidget } from '../contents/ImageWidget';
import MiniGameWidget, { MiniGameEditWidget } from '../contents/MiniGameWidget';
import MultiChoiceQuestionWidget, { MultiChoiceQuestionEditWidget } from '../questions/MultiChoiceQuestion';
import SmallAnswerProblemWidget, { SmallAnswerProblemEditWidget } from '../questions/SmallAnswerProblemWidget';
import TextWidget, { TextEditWidget } from '../contents/TextWidget';
import UploadFileProblemWidget, { UploadFileProblemEditWidget } from '../questions/UploadFileProblemWidget';
import VideoWidget, { VideoEditWidget } from '../contents/VideoWidget';
import AudioWidget, { AudioEditWidget } from '../contents/AudioWidget';
import DetailBoxWidget, { DetailBoxEditDialog } from '../contents/DetailBoxWidget';

import {
  createSmallAnswerProblemWidgetAction,
  updateSmallAnswerProblemWidgetAction,

  createBigAnswerQuestionWidgetAction,
  updateBigAnswerQuestionWidgetAction,

  createImageWidgetAction,
  updateImageWidgetAction,

  createMiniGameWidgetAction,
  updateMiniGameWidgetAction,

  createAudioWidgetAction,
  updateAudioWidgetAction,

  createTextWidgetAction,
  updateTextWidgetAction,

  createVideoWidgetAction,
  updateVideoWidgetAction,

  createUploadFileWidgetAction,
  updateUploadFileWidgetAction,

  createDetailBoxWidgetAction,
  updateDetailBoxWidgetAction,

  createMultiChoicesQuestionWidgetAction,
  updateMultiChoicesQuestionWidgetAction,

} from 'redux/slices/widget';

import {
  sendSmallAnswerAction,
  sendBigAnswerAction,
  uploadFileAnswerAction,
  sendMultiChoiceAnswerAction,
  sendInviteeUsernameResponseAction,
} from 'redux/slices/Answer';



import InviteeUsername, { InviteeUsernameEdit } from '../questions/InviteeUsername';

const WIDGET_TYPE_MAPPER = {
  SmallAnswerProblem: {
    WidgetComponent: SmallAnswerProblemWidget,
    EditWidgetDialog: SmallAnswerProblemEditWidget,
    label: 'سوال کوتاه‌پاسخ',
    backendType: 'SmallAnswerProblem',
    createAction: createSmallAnswerProblemWidgetAction,
    updateAction: updateSmallAnswerProblemWidgetAction,
    submitAnswerAction: sendSmallAnswerAction,
  },
  BigAnswerProblem: {
    WidgetComponent: BigAnswerProblemWidget,
    EditWidgetDialog: BigAnswerQuestionEditWidget,
    label: 'سوال تشریحی',
    backendType: 'BigAnswerProblem',
    createAction: createBigAnswerQuestionWidgetAction,
    updateAction: updateBigAnswerQuestionWidgetAction,
    submitAnswerAction: sendBigAnswerAction,
  },
  MultiChoiceProblem: {
    WidgetComponent: MultiChoiceQuestionWidget,
    EditWidgetDialog: MultiChoiceQuestionEditWidget,
    label: 'سوال چند‌گزینه‌ای',
    backendType: 'MultiChoiceProblem',
    createAction: createMultiChoicesQuestionWidgetAction,
    updateAction: updateMultiChoicesQuestionWidgetAction,
    submitAnswerAction: sendMultiChoiceAnswerAction,
  },
  InviteeUsername: {
    WidgetComponent: InviteeUsername,
    EditWidgetDialog: InviteeUsernameEdit,
    label: 'سوال کد معرف',
    backendType: 'InviteeUsernameProblem',
    createAction: createSmallAnswerProblemWidgetAction,
    updateAction: updateSmallAnswerProblemWidgetAction,
    submitAnswerAction: sendInviteeUsernameResponseAction,
  },
  UploadFileProblem: {
    WidgetComponent: UploadFileProblemWidget,
    EditWidgetDialog: UploadFileProblemEditWidget,
    label: 'ارسال فایل',
    backendType: 'UploadFileProblem',
    createAction: createUploadFileWidgetAction,
    updateAction: updateUploadFileWidgetAction,
    submitAnswerAction: uploadFileAnswerAction,
  },
  TextWidget: {
    WidgetComponent: TextWidget,
    EditWidgetDialog: TextEditWidget,
    label: 'متن',
    backendType: 'TextWidget',
    createAction: createTextWidgetAction,
    updateAction: updateTextWidgetAction,
  },
  DetailBoxWidget: {
    WidgetComponent: DetailBoxWidget,
    EditWidgetDialog: DetailBoxEditDialog,
    label: 'نکته',
    backendType: 'DetailBoxWidget',
    createAction: createDetailBoxWidgetAction,
    updateAction: updateDetailBoxWidgetAction,
  },
  Image: {
    WidgetComponent: ImageWidget,
    EditWidgetDialog: ImageEditWidget,
    label: 'عکس',
    backendType: 'Image',
    createAction: createImageWidgetAction,
    updateAction: updateImageWidgetAction,
  },
  Video: {
    WidgetComponent: VideoWidget,
    EditWidgetDialog: VideoEditWidget,
    label: 'فیلم',
    backendType: 'Video',
    createAction: createVideoWidgetAction,
    updateAction: updateVideoWidgetAction,
  },
  Audio: {
    WidgetComponent: AudioWidget,
    EditWidgetDialog: AudioEditWidget,
    label: 'صوت',
    backendType: 'Audio',
    createAction: createAudioWidgetAction,
    updateAction: updateAudioWidgetAction,
  },
  Game: {
    WidgetComponent: MiniGameWidget,
    EditWidgetDialog: MiniGameEditWidget,
    label: 'بازی',
    backendType: 'Game',
    createAction: createMiniGameWidgetAction,
    updateAction: updateMiniGameWidgetAction,
  },
};
export default WIDGET_TYPE_MAPPER;
