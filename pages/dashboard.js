import ProtectedRoute from "@/layout/components/protected-route";
import { useAuth } from "@/context/auth-context";

const DashboardPage = () => {

  const { user } = useAuth();

    return (
      <ProtectedRoute>
      <div className="flex py-2 container mx-auto">
        <div className="text-gray-600 text-center px-12 py-24 mt-24 overflow-y-hidden mx-auto">
          <h2 className="text-2xl font-semibold">Welcome to Cricbudz </h2>
          <h2 className="text-2xl font-semibold">"{user.email}"</h2>
        </div>
      </div>
      </ProtectedRoute>
    );
  };
  
  export default DashboardPage;