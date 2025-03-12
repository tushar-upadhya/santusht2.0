import { login } from "@/api/auth/auth";
import { useAuth } from "@/components/auth/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const { login: setAuth } = useAuth();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            setAuth(data.token, data.role, data.username);

            if (data.role === "super-admin") {
                navigate("/super-admin");
            } else if (data.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        },
        onError: () => {
            alert("Invalid credentials");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(credentials);
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 shadow-lg rounded-lg w-96"
            >
                <h2 className="text-xl font-bold mb-4">Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    className="border p-2 w-full mb-3"
                    value={credentials.username}
                    onChange={(e) =>
                        setCredentials({
                            ...credentials,
                            username: e.target.value,
                        })
                    }
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 w-full mb-3"
                    value={credentials.password}
                    onChange={(e) =>
                        setCredentials({
                            ...credentials,
                            password: e.target.value,
                        })
                    }
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 w-full"
                >
                    {mutation.isPending ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
