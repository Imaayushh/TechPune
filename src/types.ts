export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  Dashboard: undefined;
  Hackathons: undefined;
  News: undefined;
  Courses: undefined;
  Profile: undefined;
  AccountSettings: undefined;
  ChangePassword: undefined;
  SecurityPrivacy: undefined;
  Notifications: undefined;
  Terms: undefined;
  UploadHackathon: undefined;
  UploadCourse: undefined;
  UploadLecture: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
