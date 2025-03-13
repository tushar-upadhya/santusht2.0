export const fetchUserRole = async (): Promise<string | null> => {
    try {
        const response = await fetch("/api/user-role"); // Adjust endpoint
        if (!response.ok) throw new Error("Failed to fetch user role");
        const data = await response.json();
        return data.role;
    } catch (error) {
        console.error("Error fetching user role:", error);
        return null;
    }
};
