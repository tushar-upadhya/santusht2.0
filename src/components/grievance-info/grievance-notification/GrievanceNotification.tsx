interface GrievanceNotificationProps {
    count: number;
    loading: boolean;
    error: string | null;
}

const GrievanceNotification: React.FC<GrievanceNotificationProps> = ({
    count,
    loading,
    error,
}) => (
    <div
        className={`p-4 rounded-md text-center font-medium ${
            error ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
        }`}
    >
        {loading
            ? "Fetching new grievances..."
            : error
            ? error
            : `You received ${count} new ${
                  count === 1 ? "grievance" : "grievances"
              }`}
    </div>
);

export default GrievanceNotification;
