import { Card, CardContent } from "./ui/card";
import { Utensils, Sofa, DoorOpen, BedDouble, Bed } from "lucide-react";

interface RoomSelectionProps {
  onSelectRoom: (room: string) => void;
}

export function RoomSelection({ onSelectRoom }: RoomSelectionProps) {
  const rooms = [
    {
      id: "kitchen",
      name: "Kitchen",
      icon: <Utensils className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
    },
    {
      id: "living-room",
      name: "Living Room",
      icon: <Sofa className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "hallway",
      name: "Hallway",
      icon: <DoorOpen className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "bedroom-1",
      name: "Bedroom 1",
      icon: <BedDouble className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "bedroom-2",
      name: "Bedroom 2",
      icon: <Bed className="w-8 h-8" />,
      color: "from-indigo-500 to-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto h-screen flex flex-col">
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold text-indigo-900">Aspgatan 28</h1>
          <p className="text-sm text-gray-600">
            Select a room to view climate data
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 flex-1">
          {rooms.map((room) => (
            <Card
              key={room.id}
              className="overflow-hidden transition-all hover:shadow-lg active:scale-95 cursor-pointer h-full flex flex-col"
              onClick={() => onSelectRoom(room.id)}
            >
              <div className={`h-1 bg-gradient-to-r ${room.color}`} />
              <CardContent className="pt-6 pb-6 px-4 flex-1 flex flex-col items-center justify-center text-center space-y-3">
                <div
                  className={`p-4 rounded-lg bg-gradient-to-br ${room.color} text-white`}
                >
                  {room.icon}
                </div>
                <div className="text-base font-medium text-gray-900">
                  {room.name}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-blue-50 border-blue-200 mt-4 mb-6">
          <CardContent className="pt-4 pb-4">
            <p className="text-xs text-gray-700 text-center">
              Click on a room to view temperature, humidity, CO₂ levels, and air
              quality
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
