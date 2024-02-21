import { FC } from "react";

export type directionType = 'rtl' | 'ltr';

export type WidgetTypes =
  'TextWidget' |
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

export type PartyType = {
  party_type: 'individual' | 'company';
  uuid: string;
  name: string;
  local_name: string;
  logo: LogoType;
  main_page_header_data: HeaderData;
  main_page_og_metadata: OpenGraphMetaData;
}

export type LogoType = {
  desktop_image: string;
  mobile_image: string;
}

export type HeaderData = {
  title: string;
  description: string;
  theme_color: string;
  icon: string;
}

export type OpenGraphMetaData = {
  title: string;
  description: string;
  type: string;
  image: string;
  url: string;
}