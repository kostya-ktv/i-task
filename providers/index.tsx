import AuthProvider from "./auth.provider";

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
export default AppProvider;
