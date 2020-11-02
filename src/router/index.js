import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import StartMikti from "../views/StartMikti.vue";
import NotFoundComponent from "../views/404.vue";

import IncubateeSignup from "../views/signup/IncubateeSignup";
import IncubateeLogin from "../views/login/Incubatee";
import ActivateAccount from "../views/account/Activate";
import ResetPassword from "../views/account/ResetPassword";

import IncubateeNav from "../views/main/Incubatee";
import IncubateeAccount from "../components/Incubatee/account/IncubateeAccount";
import IncubateeDashboard from "../components/Incubatee/dashboard/Dashboard";
import IncubateeMembership from "../components/Incubatee/membership/Membership";
import IncubateeCandidateships from "../components/Incubatee/candidate/Candidate";
//Founder Profile
import IncubateeProfiles from "../components/Incubatee/profile/ProfileDataList";
import IncubateeProfilesData from "../components/Incubatee/profile/ProfileData";
import IncubateeProfilesForm from "../components/Incubatee/profile/ProfileForm";
import IncubateeProfilesAdd from "../components/Incubatee/profile/addProfile";
//Team Profile
import IncubateeTeamProfiles from "../components/Incubatee/asTeam/teamprofile/ProfileDataList";
import IncubateeTeamProfilesData from "../components/Incubatee/asTeam/teamprofile/ProfileData";
import IncubateeTeamProfilesForm from "../components/Incubatee/asTeam/teamprofile/ProfileForm";
import IncubateeTeamProfilesAdd from "../components/Incubatee/asTeam/teamprofile/addProfile";

import TeamMember from "../components/Incubatee/asTeam/member/Member";
import TeamMemberCandidate from "../components/Incubatee/asTeam/candidate/Candidate";
import TeamMemberInvite from "../components/Incubatee/asTeam/member/searchMember";
import TeamMemberApplication from "../components/Incubatee/asTeam/application/Application";
import TeamMemberParticipation from "../components/Incubatee/asTeam/participation/Participation";
import TeamMemberWorksheet from "../components/Incubatee/asTeam/worksheet/Worksheet";
import TeamMemberWorksheetDetail from "../components/Incubatee/asTeam/worksheet/WorksheetDetail";

//sub participation
import TeamMemberMission from "../components/Incubatee/asTeam/participation/mission/Mission";
import TeamMemberMissionDetail from "../components/Incubatee/asTeam/participation/mission/MissionDetail";
import TeamMemberSchedules from "../components/Incubatee/asTeam/participation/schedule/Schedule";
import TeamMemberNegoSchedulesDetail from "../components/Incubatee/asTeam/participation/schedule/NegoScheduleDetail";
import TeamMemberSchedulesDetail from "../components/Incubatee/asTeam/participation/schedule/ScheduleDetail";
import TeamMemberSchedulesReport from "../components/Incubatee/asTeam/participation/schedule/Report";
import TeamMemberMentoring from "../components/Incubatee/asTeam/participation/schedule/MentoringList";
import TeamMemberMentor from "../components/Incubatee/asTeam/participation/schedule/MentorList";
//Journal
import TeamMemberJournal from "../components/Incubatee/asTeam/participation/journal/Journal";
import TeamMemberJournalDetail from "../components/Incubatee/asTeam/participation/journal/JournalDetail";
import TeamMemberJournalDetail2 from "../components/Incubatee/asTeam/participation/journal/JournalDetail2";
import TeamMemberJournalComment from "../components/Incubatee/asTeam/participation/journal/shorcut/JournalShotcut";
import AddAtomicJournal from "../components/Incubatee/asTeam/participation/atomic/AddAtomicJournal";

import AccountMain from "../views/account/AccountMain";
import ForgotPassword from "../views/account/ForgotPassword";
import RequestActivation from "../views/account/RequestActivation";

import SysAdminLogin from "../views/login/SysAdmin";
import SysAdminNav from "../views/main/SysAdmin";
import SysAdminAdmins from "../components/sysadmin/admin/Admin";
import SysAdminProfile from "../components/sysadmin/profile/SysAdminProfile";
import SysAdminIncubator from "../components/sysadmin/incubator/Incubator";

import PersonnelLogin from "../views/login/Personnel";
import PersonnelNav from "../views/main/Personnel";
import PersonnelAccount from "../components/personnel/account/PersonnelAccount";
import PersonnelPersonnels from "../components/personnel/personnel/Personnel";
import PersonnelFounders from "../components/personnel/founder/Founder";
import PersonnelWorksheet from "../components/personnel/worksheet/Worksheet";
import PersonnelWorksheetBuild from "../components/personnel/worksheet/buildWorksheet";
import PersonnelProfileForm from "../components/personnel/profileform/ProfileForm";
import PersonnelTeamProfileForm from "../components/personnel/teamprofileform/TeamProfileForm";
import PersonnelProfileFormBuild from "../components/personnel/profileform/buildProfileform";
import PersonnelTeamProfileFormBuild from "../components/personnel/teamprofileform/buildProfileform";
import PersonnelMentoringForm from "../components/personnel/mentoringform/MentoringForm";
import PersonnelMentoringFormBuild from "../components/personnel/mentoringform/buildMentoringform";

import PersonnelFormDetail from "../components/buildform/detailForm";

import PersonnelProgramCohort from "../components/personnel/program/cohort/Cohort";
import CohortCoordinator from "../components/personnel/program/cohort/assign/Coordinator";
import CohortMentor from "../components/personnel/program/cohort/assign/Mentor";
import CohortMission from "../components/personnel/program/cohort/mission/Mission";
//Learning Material
import CohortMissionLearning from "../components/personnel/program/cohort/mission/learningmaterial/LearningMaterial";
import CohortMissionLearningPreview from "../components/personnel/program/cohort/mission/learningmaterial/LearningPreview";
import CohortMissionLearningForm from "../components/personnel/program/cohort/mission/learningmaterial/LearningForm";

import CohortMentoring from "../components/personnel/program/cohort/mentoring/Mentoring";
import PersonnelList from "../components/personnel/program/cohort/assign/PersonnelList";

import CoordinatorDashboard from "../components/personnel/asCoordinator/dashboard";
import CoordinatorPhase from "../components/personnel/asCoordinator/phase/Phase";
import CoordinatorParticipant from "../components/personnel/asCoordinator/participant/Participant";
import CoordinatorApplicant from "../components/personnel/asCoordinator/applicant/Applicant";
import CoordinatorMentoring from "../components/personnel/asCoordinator/mentoring/Mentoring";
import CoordinatorMentoringDetail from "../components/personnel/asCoordinator/mentoring/MentoringDetail";

import MentorDashboard from "../components/personnel/asMentor/dashboard";
import MentorParticipant from "../components/personnel/asMentor/participant/participant";
import MentorParticipantJournal from "../components/personnel/asMentor/participant/journal/journal";
import MentorParticipantJournalDetail from "../components/personnel/asMentor/participant/journal/journalDetail";
import MentorSchedule from "../components/personnel/asMentor/schedule/Schedule";
import MentorScheduleDetail from "../components/personnel/asMentor/schedule/ScheduleDetail";
import MentorScheduleReport from "../components/personnel/asMentor/schedule/Report";
import MentorScheduleNegotiate from "../components/personnel/asMentor/schedule/NegotiateSchedule";

import MentorDashboardParticipant from "../components/personnel/asMentor/participant/participant";
import MentorDashboardParticipantDetail from "../components/personnel/asMentor/participant/ParticipantDetail";
// import MentorDashboardParticipantJournal from "../components/personnel/asMentor/participantjournal/ParticipantJournal";
import MentorDashboardParticipantJournal from "../components/personnel/asMentor/participantjournal/JournalTask";
import MentorDashboardMentoringSchedule from "../components/personnel/asMentor/mentoringschedule/MentoringSchedule";
import MentorIntroduction from "../components/personnel/asMentor/introduction/Introduction";

import MentorLearningMaterial from "../components/personnel/asMentor/learningMaterial";

import PastEvent from "../components/PastEvent";

import ConferenceComponent from "../components/Conference";

import InfoProgram from "../components/InfoProgram";

Vue.use(VueRouter);

const routes = [
  {
    path: "/inovide",
    name: "home",
    component: Home,
  },
  {
    path: "/",
    name: "mikti-home",
    component: StartMikti,
  },
  {
    path: "/signup/:incubatorIdentifier?",
    name: "incubateesignup",
    component: IncubateeSignup,
  },
  {
    path:
      "/incubator-identifier/:incubatorIdentifier/activate-founder-account/:email/:token",
    name: "activateaccount",
    component: ActivateAccount,
  },
  {
    path:
      "/incubator-identifier/:incubatorIdentifier/reset-founder-password/:email/:token",
    name: "resetpassword",
    component: ResetPassword,
  },
  {
    path: "/account",
    name: "incubateeaccount",
    component: AccountMain,
    children: [
      {
        path: "/forgot-password/:incubatorIdentifier?/:email?",
        component: ForgotPassword,
      },
      {
        path: "/request-activation/:incubatorIdentifier?/:email?",
        component: RequestActivation,
      },
    ],
  },
  {
    path: "/sysadmin",
    name: "syaadminlogin",
    component: SysAdminLogin,
  },
  {
    path: "/personnel",
    name: "personnellogin",
    component: PersonnelLogin,
  },
  {
    path: "/:identifier?/login",
    name: "incubateelogin2",
    component: IncubateeLogin,
  },
  {
    path: "/login/:identifier?",
    name: "incubateelogin",
    component: IncubateeLogin,
  },
  {
    path: "/sysadmin/main",
    name: "sysadminmain",
    component: SysAdminNav,
    meta: {
      level: 0,
      requiredAuth: true,
      personnelAuth: false,
      sysadminAuth: true,
    },
    children: [
      {
        path: "/sysadmin/admin",
        name: "sysadminadmin",
        component: SysAdminAdmins,
        meta: {
          level: 0,
          requiredAuth: true,
          personnelAuth: false,
          sysadminAuth: true,
        },
      },
      {
        path: "/sysadmin/incubator",
        name: "sysadminincubator",
        component: SysAdminIncubator,
        meta: {
          level: 0,
          requiredAuth: true,
          personnelAuth: false,
          sysadminAuth: true,
        },
      },
      {
        path: "/sysadmin/profile",
        name: "sysadminprofile",
        component: SysAdminProfile,
        meta: {
          level: 0,
          requiredAuth: true,
          personnelAuth: false,
          sysadminAuth: true,
        },
      },
    ],
  },
  {
    path: "/personnel/main",
    name: "personnelmain",
    component: PersonnelNav,
    meta: {
      level: 0,
      requiredAuth: true,
      personnelAuth: true,
      sysadminAuth: false,
    },
    children: [
      {
        path: "/personnel/account",
        component: PersonnelAccount,
        name: "personnel-account",
        meta: {
          text: "My Account",
          level: 0,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/personnel",
        component: PersonnelPersonnels,
        name: "personnel-list",
        meta: {
          text: "Personnel",
          level: 0,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/founder",
        component: PersonnelFounders,
        name: "registrant-list",
        meta: {
          text: "Registrant List",
          level: 0,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/program",
        component: PersonnelProgramCohort,
        name: "program",
        meta: {
          text: "Program",
          level: 0,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/worksheet-forms",
        component: PersonnelWorksheet,
        name: "personnel-worksheet-form",
        meta: {
          text: "Worksheet Form",
          level: 0,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/preview/:formType/:formId",
        component: PersonnelFormDetail,
        name: "worksheet-form-preview",
        meta: {
          text: "Worksheet Form Preview",
          level: 1,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/worksheet-forms/build",
        component: PersonnelWorksheetBuild,
        name: "worksheet-form-create",
        meta: {
          text: "Create Worksheet Form",
          level: 1,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/worksheet-forms/:formId/edit",
        component: PersonnelWorksheetBuild,
        name: "worksheet-form-edit",
        meta: {
          text: "Edit Worksheet Form",
          level: 1,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/profile-forms",
        component: PersonnelProfileForm,
        name: "personnel-profile-forms",
        meta: {
          text: "Profile Form",
          level: 0,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/profile-forms/build",
        component: PersonnelProfileFormBuild,
        name: "personnel-profile-form-create",
        meta: {
          text: "Create Profile Form",
          level: 1,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/profile-forms/:formId/edit",
        component: PersonnelProfileFormBuild,
        name: "personnel-profile-form-edit",
        meta: {
          text: "Edit Profile Form",
          level: 2,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/team-profile-forms",
        component: PersonnelTeamProfileForm,
        name: "team-profile-forms",
        meta: {
          text: "Team Profile Form",
          level: 0,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/team-profile-forms/build",
        component: PersonnelTeamProfileFormBuild,
        name: "team-profile-form-create",
        meta: {
          text: "Create Team Profile Form",
          level: 1,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/team-profile-forms/:formId/edit",
        component: PersonnelTeamProfileFormBuild,
        name: "team-profile-form-edit",
        meta: {
          text: "Edit Team Profile Form",
          level: 2,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/mentoring-feedback-forms",
        component: PersonnelMentoringForm,
        name: "mentoring-forms",
        meta: {
          text: "Mentoring Feedback Form",
          level: 0,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/mentoring-feedback-forms/build",
        component: PersonnelMentoringFormBuild,
        name: "mentoring-feedback-form-create",
        meta: {
          text: "Create Mentoring Feedback Form",
          level: 1,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/mentoring-feedback-forms/:formId/edit",
        component: PersonnelMentoringFormBuild,
        name: "mentoring-feedback-form-edit",
        meta: {
          text: "Edit Mentoring Feedback Form",
          level: 2,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/program/:programId/coordinator",
        component: CohortCoordinator,
        name: "program-coordinator",
        meta: {
          text: "Coordinator",
          level: 2,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/program/:programId/mentor",
        component: CohortMentor,
        name: "program-mentors",
        meta: {
          text: "Mentors",
          level: 2,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/program/:programId/assign",
        component: PersonnelList,
        name: "program-personnel-list",
        meta: {
          text: "Personnel List",
          level: 2,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/program/:programId/mission",
        component: CohortMission,
        name: "program-mission-list",
        meta: {
          text: "Learn & Implement",
          level: 2,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path:
          "/personnel/program/:programId/mission/:missionId/learning-material",
        component: CohortMissionLearning,
        name: "mission-learning-material",
        meta: {
          text: "Mission Learning Material",
          level: 3,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path:
          "/personnel/program/:programId/mission/:missionId/learning-material/:learningId",
        component: CohortMissionLearningPreview,
        name: "mission-learning-material-preview",
        meta: {
          text: "Mission Learning Material Preview",
          level: 4,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path:
          "/personnel/program/:programId/mission/:missionId/learning-material-add",
        component: CohortMissionLearningForm,
        name: "mission-learning-material-add",
        meta: {
          text: "Add Learning Material",
          level: 3,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path:
          "/personnel/program/:programId/mission/:missionId/learning-material/:learningId/edit",
        component: CohortMissionLearningForm,
        name: "mission-learning-material-edit",
        meta: {
          text: "Edit Learning Material",
          level: 3,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/program/:programId/mentoring",
        component: CohortMentoring,
        name: "program-mentoring",
        meta: {
          text: "Mentoring",
          level: 2,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      //Coordinator
      {
        path: "/personnel/coordinator/dashboard",
        component: CoordinatorDashboard,
        name: "coordinator-dashboard",
        meta: {
          text: "Coordinator Dashboard",
          level: 1,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/coordinator/program/:programId/participant",
        component: CoordinatorParticipant,
        name: "Team List",
        meta: {
          text: "Team Participant List",
          level: 2,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/coordinator/program/:programId/phase",
        component: CoordinatorPhase,
        name: "Registration Phase",
        meta: {
          text: "Registration Phase",
          level: 2,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/coordinator/program/:programId/applicant",
        component: CoordinatorApplicant,
        name: "Applicant",
        meta: {
          text: "Applicant",
          level: 2,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/coordinator/program/:programId/mentoring",
        component: CoordinatorMentoring,
        name: "Mentoring",
        meta: {
          text: "Mentoring Report",
          level: 2,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path:
          "/personnel/coordinator/program/:programId/mentoring/:mentoringId",
        component: CoordinatorMentoringDetail,
        name: "Mentoring Report",
        meta: {
          text: "Mentoring Report Detail",
          level: 3,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      //Mentor
      {
        path: "/personnel/mentor/dashboard",
        component: MentorDashboard,
        name: "mentor-dashboard",
        meta: {
          text: "Mentor Dashboard",
          level: 1,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/mentor/introduction",
        component: MentorIntroduction,
        name: "mentor-introduction",
        meta: {
          text: "Selt Introduction",
          level: 1,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/mentor/participant",
        component: MentorDashboardParticipant,
        name: "mentor-dashboard-participant",
        meta: {
          text: "Participants",
          level: 1,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path:
          "/personnel/mentor/:mentorId/:programId/participant/:participantId",
        component: MentorDashboardParticipantDetail,
        name: "mentor-dashboard-participant-detail",
        meta: {
          text: "Participant Detail",
          level: 2,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/mentor/participant-journal",
        component: MentorDashboardParticipantJournal,
        name: "mentor-dashboard-participant-journal",
        meta: {
          text: "Participant Journal",
          level: 1,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/mentor/learning-material",
        component: MentorLearningMaterial,
        name: "mentor-learning-material",
        meta: {
          text: "Mentor Learning Material",
          level: 1,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/mentor/mentoring-schedule",
        component: MentorDashboardMentoringSchedule,
        name: "mentor-dashboard-mentoring-schedule",
        meta: {
          text: "Mentoring Schedule",
          level: 1,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/mentor/:mentorshipId/:programId/schedule",
        component: MentorSchedule,
        name: "mentor-schedule",
        meta: {
          text: "Mentor Schedule",
          level: 2,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/mentor/:mentorId/:programId/participant",
        component: MentorParticipant,
        name: "mentor-program-participant",
        meta: {
          text: "Program's Participant",
          level: 2,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path:
          "/personnel/mentor/:mentorId/:programId/participant/:participantId/journal",
        component: MentorParticipantJournal,
        name: "mentor-program-participant-journal",
        meta: {
          text: "Program's Participant Journal",
          level: 3,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path:
          "/personnel/mentor/:mentorId/:programId/participant/:cohortId/journal/:journalId",
        component: MentorParticipantJournalDetail,
        name: "mentor-program-participant-journal-detail",
        meta: {
          text: "Program's Participant Journal Detail",
          level: 4,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/mentor/:mentorshipId/schedule/:scheduleId",
        component: MentorScheduleDetail,
        name: "mentor-schedule-detail",
        meta: {
          text: "Mentor Schedule Detail",
          level: 3,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/mentor/:mentorshipId/schedule/:scheduleId/report",
        component: MentorScheduleReport,
        name: "mentor-schedule-report",
        meta: {
          text: "Mentor Schedule Report",
          level: 3,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/mentor/:mentorshipId/schedule/:scheduleId/conference",
        component: ConferenceComponent,
        name: "mentor-schedule-conference",
        meta: {
          text: "Mentor Schedule Conference",
          level: 3,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
      {
        path: "/personnel/mentor/:mentorshipId/negotiate-schedule",
        component: MentorScheduleNegotiate,
        name: "mentor-negotiate-schedule",
        meta: {
          text: "Negotiate Schedule",
          level: 2,
          requiredAuth: true,
          personnelAuth: true,
          sysadminAuth: false,
        },
      },
    ],
  },
  {
    path: "/incubatee/main",
    name: "incubateemain",
    component: IncubateeNav,
    meta: {
      text: "Founder Main Layout",
      level: 0,
      requiredAuth: true,
      incubateeAuth: true,
      personnelAuth: false,
      sysadminAuth: false,
    },
    children: [
      {
        path: "/info-program",
        name: "info-program",
        component: InfoProgram,
        meta: {
          text: "Info Program",
          level: 0,
        },
      },
      {
        path: "/PastEvent",
        name: "pastevent",
        component: PastEvent,
        meta: {
          text: "Expert Talk",
          level: 0,
        },
      },
      {
        path: "/incubatee/dashboard",
        component: IncubateeDashboard,
        name: "founder-dashboard",
        meta: {
          text: "Dashboard",
          level: 0,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path: "/incubatee/account",
        component: IncubateeAccount,
        name: "fouder-account",
        meta: {
          text: "My Account",
          level: 1,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path: "/incubatee/membership",
        component: IncubateeMembership,
        name: "Membership",
        meta: {
          text: "Membership",
          level: 1,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path: "/incubatee/candidateship",
        component: IncubateeCandidateships,
        name: "Candidateship",
        meta: {
          text: "Candidateship",
          level: 1,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path: "/incubatee/profile",
        component: IncubateeProfiles,
        name: "Profiles",
        meta: {
          text: "Profiles",
          level: 1,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path: "/incubatee/team/:teamId/profile",
        component: IncubateeTeamProfiles,
        name: "team-profiles",
        meta: {
          text: "Team Profiles",

          level: 2,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path: "/incubatee/profile/:profileId",
        component: IncubateeProfilesData,
        name: "profile-detail",
        meta: {
          text: "Profile Detail",
          level: 2,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path: "/incubatee/team/:teamId/profile/:profileId",
        component: IncubateeTeamProfilesData,
        name: "team-profile",
        meta: {
          text: "Team Profile",
          level: 3,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path: "/incubatee/profile-form",
        component: IncubateeProfilesForm,
        name: "profile-form",
        meta: {
          text: "Profile Form",
          level: 3,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path: "/incubatee/team/:teamId/team-profile-form",
        component: IncubateeTeamProfilesForm,
        name: "team-profile-form",
        meta: {
          text: "Team Profile Form",
          level: 4,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path: "/incubatee/profile-form/:formId/add",
        component: IncubateeProfilesAdd,
        name: "founder-profile-form-add",
        meta: {
          text: "Add Profile Form",
          level: 4,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path: "/incubatee/profile-form/:formId/edit/:profileId",
        component: IncubateeProfilesAdd,
        name: "founder-profile-form-edit",
        meta: {
          text: "Edit Profile Form",
          level: 4,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path: "/incubatee/team/:teamId/team-profile-form/:formId/add",
        component: IncubateeTeamProfilesAdd,
        name: "team-profile-form-add",
        meta: {
          text: "Add Team Profile Form",
          level: 4,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path:
          "/incubatee/team/:teamId/team-profile-form/:formId/edit/:profileId",
        component: IncubateeTeamProfilesAdd,
        name: "founder-team-profile-form-edit",
        meta: {
          text: "Edit Team Profile Form",
          level: 4,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path: "/incubatee/team/:teamId/member",
        component: TeamMember,
        name: "team-members",
        meta: {
          text: "Members",
          level: 1,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path: "/incubatee/team/:teamId/candidate",
        component: TeamMemberCandidate,
        name: "team-candidate",
        meta: {
          text: "Candidate",
          level: 2,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path: "/incubatee/team/:teamId/invite",
        component: TeamMemberInvite,
        name: "team-invite",
        meta: {
          text: "Add New Team Member",
          level: 2,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path: "/incubatee/team/:teamId/application",
        component: TeamMemberApplication,
        name: "team-program-application",
        meta: {
          text: "Program Application",
          level: 2,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path: "/incubatee/team/:teamId/worksheet",
        component: TeamMemberWorksheet,
        name: "team-qorksheet",
        meta: {
          text: "Worksheet",
          level: 2,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path: "/incubatee/team/:teamId/worksheet/:worksheetId",
        component: TeamMemberWorksheetDetail,
        name: "team-worksheet-detail",
        meta: {
          text: "Worksheet Detail",
          level: 3,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path: "/incubatee/team/:teamId/participation",
        component: TeamMemberParticipation,
        name: "tean-participation",
        meta: {
          text: "Participation",
          level: 2,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path: "/incubatee/team/:teamId/participation/:cohortId/mission",
        component: TeamMemberMission,
        name: "team-mission",
        meta: {
          text: "Learn & Implement",
          level: 3,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path:
          "/incubatee/team/:teamId/participation/:cohortId/mission/:missionId",
        component: TeamMemberMissionDetail,
        name: "team-misssion-detail",
        meta: {
          text: "Mission",
          level: 4,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path:
          "/incubatee/team/:teamId/participation/:cohortId/mission-by-pos/:missionPos",
        component: TeamMemberMissionDetail,
        name: "team-misssion-detail-pos",
        meta: {
          text: "Mission",
          level: 4,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path:
          "/incubatee/team/:teamId/participation/:cohortId/mission/:rootId/next/:missionId",
        component: TeamMemberMissionDetail,
        name: "team-misssion-detail2",
        meta: {
          text: "Mission",
          level: 5,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path:
          "/incubatee/team/:teamId/participation/:cohortId/mission/:missionId/atom/:journalId?",
        component: AddAtomicJournal,
        name: "add-journal-atom",
        meta: {
          text: "New Journal",
          level: 5,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path: "/incubatee/team/:teamId/participation/:cohortId/journal",
        component: TeamMemberJournal,
        name: "team-journal",
        meta: {
          text: "Journal",
          level: 3,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path:
          "/incubatee/team/:teamId/participation/:cohortId/mission/:missionId/journal/:journalId/worksheet/:worksheetId",
        component: TeamMemberJournalDetail,
        name: "journal-detail-1",
        meta: {
          text: "Journal Detail",
          level: 4,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path:
          "/incubatee/team/:teamId/participation/:cohortId/mission/:missionId/journal/:journalId/worksheet/:worksheetId/new/:parentJournalId?",
        component: TeamMemberJournalDetail2,
        name: "journal-detail-tab",
        meta: {
          text: "Journal Detail",
          level: 4,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path:
          "/incubatee/team/:teamId/participation/:cohortId/journal/:journalId/comment/:commentId?",
        component: TeamMemberJournalComment,
        name: "journal-detail-comment",
        meta: {
          text: "New Comment from Mentor",
          level: 4,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path: "/incubatee/team/:teamId/participation/:cohortId/schedule",
        component: TeamMemberSchedules,
        name: "team-mentoring-schedule",
        meta: {
          text: "Mentoring Schedule",
          level: 3,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path:
          "/incubatee/team/:teamId/participation/:cohortId/schedule/:scheduleId",
        component: TeamMemberSchedulesDetail,
        name: "team-mentoring-report",
        meta: {
          text: "Mentoring Report",
          level: 4,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path:
          "/incubatee/team/:teamId/participation/:cohortId/negotiate-schedule/:scheduleId",
        component: TeamMemberNegoSchedulesDetail,
        name: "team-mentoring-nego-detail",
        meta: {
          text: "Proposed Schedule",
          level: 4,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path:
          "/incubatee/team/:teamId/participation/:cohortId/schedule/:scheduleId/report",
        component: TeamMemberSchedulesReport,
        name: "team-mentoring-report2",
        meta: {
          text: "Mentoring Report",
          level: 4,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path:
          "/incubatee/team/:teamId/participation/:cohortId/schedule/:scheduleId/conference",
        component: ConferenceComponent,
        name: "team-mentoring-conference",
        meta: {
          text: "Mentoring Conference",
          level: 4,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path: "/incubatee/team/:teamId/participation/:cohortId/mentoring",
        component: TeamMemberMentoring,
        name: "team-mentoring",
        meta: {
          text: "Mentoring",
          level: 4,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
      {
        path:
          "/incubatee/team/:teamId/participation/:cohortId/mentoring/:mentoringId/mentor",
        component: TeamMemberMentor,
        name: "team-mentor",
        meta: {
          text: "Mentor",
          level: 5,
          requiredAuth: true,
          incubateeAuth: true,
          personnelAuth: false,
          sysadminAuth: false,
        },
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  { path: "*", component: NotFoundComponent },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiredAuth) {
    const authUser = JSON.parse(window.localStorage.getItem("lbUser"));
    if (!authUser || !authUser.token) {
      next({ path: "/login", query: { redirect: to.fullPath } });
    } else if (to.meta.sysadminAuth) {
      const authUser = JSON.parse(window.localStorage.getItem("lbUser"));
      if (authUser.role === "SYSADMIN") {
        next();
      } else {
        next("/sysadmin/main");
      }
    } else if (to.meta.personnelAuth) {
      const authUser = JSON.parse(window.localStorage.getItem("lbUser"));
      if (authUser.role === "PERSONNEL") {
        next();
      } else {
        next("/personnel/main");
      }
    } else if (to.meta.incubateeAuth) {
      const authUser = JSON.parse(window.localStorage.getItem("lbUser"));
      if (authUser.valid_until < Math.round(new Date().getTime() / 1000)) {
        localStorage.clear();
        next("/");
      }
      if (authUser.role === "INCUBATEE") {
        next();
      } else {
        next("/incubatee/main");
      }
    }
  } else {
    next();
  }
});

export default router;
