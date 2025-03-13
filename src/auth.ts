export const login = async (mobile: string, password: string) => {
    const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, password }),
    });

    if (!response.ok) throw new Error("Invalid credentials");

    return response.json(); // Must return `{ role, token }`
};
