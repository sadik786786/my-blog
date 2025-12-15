export default function StatCard({ icon: Icon, label, value, color = 'blue' }) {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-50 border-blue-200',
    green: 'text-green-600 bg-green-50 border-green-200',
    yellow: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    purple: 'text-purple-600 bg-purple-50 border-purple-200'
  };

  return (
    <div className={`p-4 rounded-lg border ${colorClasses[color]}`}>
      <div className="flex items-center gap-3">
        <Icon className="text-xl" />
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-sm opacity-75">{label}</div>
        </div>
      </div>
    </div>
  );
}