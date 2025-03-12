import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    token: string | null;
    role: string | null;
    username: string | null;
    login: (token: string, role: string, username: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(
        Cookies.get("token") || null
    );
    const [role, setRole] = useState<string | null>(
        Cookies.get("role") || null
    );
    const [username, setUsername] = useState<string | null>(
        Cookies.get("username") || null
    );

    useEffect(() => {
        if (token) {
            Cookies.set("token", token, { expires: 1 });
            Cookies.set("role", role || "", { expires: 1 });
            Cookies.set("username", username || "", { expires: 1 });
        }
    }, [token, role, username]);

    const login = (token: string, role: string, username: string) => {
        setToken(token);
        setRole(role);
        setUsername(username);
    };

    const logout = () => {
        Cookies.remove("token");
        Cookies.remove("role");
        Cookies.remove("username");
        setToken(null);
        setRole(null);
        setUsername(null);
    };

    return (
        <AuthContext.Provider value={{ token, role, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
