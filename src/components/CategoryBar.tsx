import { 
  Smartphone, Laptop, Car, Home, Shirt, Camera, Gamepad, Watch 
} from 'lucide-react';

const categories = [
  { icon: Smartphone, label: 'Electronics' },
  { icon: Car, label: 'Vehicles' },
  { icon: Home, label: 'Home & Garden' },
  { icon: Shirt, label: 'Fashion' },
  { icon: Camera, label: 'Cameras' },
  { icon: Gamepad, label: 'Gaming' },
  { icon: Watch, label: 'Jewelry' },
  { icon: Laptop, label: 'Computers' },
];

export function CategoryBar() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 py-4 px-2 min-w-max">
        {categories.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            <Icon className="w-6 h-6 text-gray-700" />
            <span className="text-sm text-gray-600">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}