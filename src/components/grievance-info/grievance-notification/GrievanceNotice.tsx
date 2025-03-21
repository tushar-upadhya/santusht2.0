interface NotificationProps {
  count: number;
}

const Notification: React.FC<NotificationProps> = ({ count }) => (
  <div className="p-4 bg-blue-100 text-blue-800 rounded-md text-center font-medium">
    You received {count} grievances
  </div>
);

export default Notification;
