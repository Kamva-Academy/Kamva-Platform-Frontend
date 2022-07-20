export type PersonalProfile = {
  academic_studentship: AcademicStudentship;
  address: string | null;
  bio: string | null;
  birth_date: string | null;
  city: string | null;
  country: string | null;
  date_joined: string | null;
  email: string | null;
  first_name: string | null;
  gender: string | null;
  groups: GroupType[];
  id: string;
  is_active: boolean;
  is_staff: boolean;
  is_supervisor: boolean;
  last_login: string | null;
  last_name: string | null;
  national_code: string | null;
  phone_number: string;
  postal_code: string;
  profile_picture: string;
  province: string;
  school_studentship: SchoolStudentship;
  userPermissions: UserPermissions[];
  username: string;
}

type GroupType = any;

type UserPermissions = any;

type AcademicStudentship = any;

type SchoolStudentship = any;