import { Card, CardContent } from "./ui/card";
import { Utensils, Sofa, DoorOpen, BedDouble, Bed, Plus } from "lucide-react";

interface RoomSelectionProps {
  onSelectRoom: (room: string) => void;
}

export function RoomSelection({ onSelectRoom }: RoomSelectionProps) {
  const rooms = [
    {
      id: "hallway",
      name: "Hallway",
      icon: <DoorOpen className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "living-room",
      name: "Living Room",
      icon: <Sofa className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "kitchen",
      name: "Kitchen",
      icon: <Utensils className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
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
    <div className="min-h-screen p-4" style={{ backgroundColor: "#F5F5F5" }}>
      <div className="max-w-md mx-auto h-screen flex flex-col">
        <div className="text-center py-3">
          <h1 className="text-indigo-900">Swegon Road 42</h1>
          <p className="text-sm text-gray-600">
            Select a room to view climate data
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {rooms.map((room) => (
            <Card
              key={room.id}
              className="overflow-hidden transition-all hover:shadow-lg active:scale-95 cursor-pointer flex flex-col"
              onClick={() => onSelectRoom(room.id)}
            >
              <div className={`h-1 bg-gradient-to-r ${room.color}`} />
              <CardContent className="pt-3 pb-3 px-3 flex flex-col items-center justify-center text-center space-y-2">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br ${room.color} text-white`}
                >
                  {room.icon}
                </div>
                <div className="text-gray-900 text-sm">{room.name}</div>
              </CardContent>
            </Card>
          ))}

          <Card
            className="overflow-hidden transition-all hover:shadow-lg active:scale-95 cursor-pointer flex flex-col border-2 border-dashed"
            style={{ borderColor: "#277D32" }}
            onClick={() =>
              window.open(
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                "_blank"
              )
            }
          >
            <CardContent className="pt-3 pb-3 px-3 flex flex-col items-center justify-center text-center space-y-2 h-full">
              <div className="p-3 rounded-lg bg-gray-200 text-gray-600">
                <Plus className="w-8 h-8" />
              </div>
              <div className="text-gray-600 text-sm">Add Room</div>
            </CardContent>
          </Card>
        </div>

        <Card
          className="mt-3 mb-4 border-2"
          style={{ backgroundColor: "#E9F2E5", borderColor: "#277D32" }}
        >
          <CardContent className="pt-3 pb-3">
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
