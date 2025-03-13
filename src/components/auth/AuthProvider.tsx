import { getUser, login } from "@/api/auth/auth";
import { User } from "@/lib/types/auth/user";
import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";

type AuthContext = {
    authToken?: string | null;
    currentUser?: User | null;
    role?: string | null;
    handleLogin: (mobile: string, password: string) => Promise<void>;
    handleLogout: () => void;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await getUser();

                const { token, username, role } = response;

                setAuthToken(token);
                setCurrentUser({ username });
                setRole(role);
                localStorage.setItem("authToken", token);
                localStorage.setItem("role", role);
            } catch {
                setAuthToken(null);
                setCurrentUser(null);
                setRole(null);
            }
        }

        fetchUser();
    }, []);

    async function handleLogin(mobile: string, password: string) {
        try {
            const response = await login(mobile, password);

            const { token, username, role } = response;

            setAuthToken(token);
            setCurrentUser({ username });
            setRole(role);
            localStorage.setItem("authToken", token);
            localStorage.setItem("role", role);
        } catch {
            setAuthToken(null);
            setCurrentUser(null);
            setRole(null);
        }
    }

    function handleLogout() {
        setAuthToken(null);
        setCurrentUser(null);
        setRole(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("role");
    }

    return (
        <AuthContext.Provider
            value={{ authToken, currentUser, role, handleLogin, handleLogout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
}
