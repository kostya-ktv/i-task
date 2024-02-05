import ToastProvider from "./toast.provider";
import AuthProvider from "./auth.provider";
import { QueryProvider } from "./query-provider";

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      <QueryProvider>
        {children}
        <ToastProvider />
      </QueryProvider>
    </AuthProvider>
  );
};
export default AppProvider;
