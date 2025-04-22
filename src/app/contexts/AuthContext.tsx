import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type User = {
  username: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => boolean;
  register: (username: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // Load dari localStorage saat pertama kali render
  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    const storedUsers = localStorage.getItem("auth_users");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedUsers) setUsers(JSON.parse(storedUsers));
  }, []);

  // Simpan user ke localStorage setiap kali login/logout
  useEffect(() => {
    if (user) {
      localStorage.setItem("auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("auth_user");
    }
  }, [user]);

  // Simpan daftar user ke localStorage setiap kali users berubah
  useEffect(() => {
    localStorage.setItem("auth_users", JSON.stringify(users));
  }, [users]);

  const login = (username: string, password: string) => {
    if (username === "admin" && password === "1234") {
      const admin = { username, password };
      setUser(admin);
      return true;
    }

    const user = users.find((u) => u.username === username);
    if (user && user.password === password) {
      setUser(user);
      return true;
    }

    return false;
  };

  const register = (username: string, password: string) => {
    const existingUser = users.find((u) => u.username === username);
    if (existingUser) return false;

    const newUser = { username, password };
    setUsers((prev) => [...prev, newUser]);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
