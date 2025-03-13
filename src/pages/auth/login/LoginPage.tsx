<<<<<<< HEAD
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

            if (data.role === "SUPER_ADMIN") {
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
=======
import AuthForm from "@/components/forms/auth-form/AuthForm";
import React from "react";
>>>>>>> d0dc776 (FIX : Login-issue)

const LoginPage: React.FC = () => {
    return (
        <div className="">
            <AuthForm />
        </div>
    );
};

export default LoginPage;
