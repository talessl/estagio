import { useAuth } from '../context/AuthProvider';

function LogoutLink() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    // navigate("/", { replace: true }); 
  };

  return (
    <button onClick={handleLogout} className="hover:underline">
      Sair
    </button>
  );
}

export default LogoutLink;
