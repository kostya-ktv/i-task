import { ClerkProvider } from "@clerk/nextjs";

const AuthProvider:React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <ClerkProvider>{children}</ClerkProvider>
  )
}
export default AuthProvider
