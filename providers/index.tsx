import ToastProvider from "./toast.provider";
import AuthProvider from "./auth.provider";

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      {children}
      <ToastProvider />
    </AuthProvider>
  );
};
export default AppProvider;
