import RegistrationForm from "./components/RegistrationForm";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RegistrationForm></RegistrationForm>
    </QueryClientProvider>

  )
}

