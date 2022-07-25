type AudienceTypeType = "All" | "Student" | "Academic";

type EventTypeType = "Team" | "Individual";

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