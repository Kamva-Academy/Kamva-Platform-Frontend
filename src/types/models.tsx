type AudienceTypeType = "All" | "Student" | "Academic";
type EventTypeType = "Team" | "Individual";

export type Workshop = any

export type EventType = {
  accessible_after_closure: boolean;
  audience_type: AudienceTypeType;
  certificates_ready: boolean
  cover_page: string;
  creator: string;
  description: string;
  end_date: string | null;
  event_type: EventTypeType;
  has_certificate: boolean
  holder: number;
  id: number;
  is_active: boolean;
  is_approved: boolean;
  is_paid: boolean;
  is_user_participating: boolean;
  maximum_participant: number | null;
  merchandise: string | null;
  name: string;
  participants_size: number;
  registration_form: number;
  registration_receipt: string | null;
  registration_since: string | null;
  registration_till: string | null;
  start_date: string | null
  team_size: number;
  user_registration_status: string;
}

export type Invitation = any
export type RegistrationReceipt = any
export type Widget = any
export type Team = any
export type Request = any
export type RegistrationForm = any
export type Merchandise = any
export type Article = any
export type Notification = any
export type Problem = any
export type Submission = any
export type SubmissionIsLoading = boolean
export type State = any
export type Answer = any
export type WorkshopEdge = any
export type Player = any
export type Token = any
export type Mentor = { id: string, first_name: string, last_name: string, email: string, phone_number: string, profilePicturePath?: string }
export type UploadedFile = { link: string, name: string, id: string }
