import { FC } from "react";

export type directionType = 'rtl' | 'ltr';

export type WidgetTypes =
  'Description' |
  'Image' |
  'Video' |
  'Aparat' |
  'Game' |
  'SmallAnswerProblem' |
  'BigAnswerProblem' |
  'MultiChoiceProblem' |
  'UploadFileProblem';

export type RegistrationStepType = {
  name: RegistrationStepNameType;
  label: RegistrationStepLabelType;
  component: any;
  onClick?: any;
};

export type RegistrationStepLabelType =
  'تکمیل مشخصات شخصی' |
  'تکمیل مشخصات دانش‌آموزی' |
  'تکمیل مشخصات دانشجویی' |
  'تکمیل فرم ثبت‌نام' |
  'وضعیت ثبت‌نام' |
  'پرداخت هزینه' |
  'ورود به دوره'

export type RegistrationStepNameType =
  'personal-profile' |
  'student-profile' |
  'academic-profile' |
  'form' |
  'status' |
  'payment' |
  'program'