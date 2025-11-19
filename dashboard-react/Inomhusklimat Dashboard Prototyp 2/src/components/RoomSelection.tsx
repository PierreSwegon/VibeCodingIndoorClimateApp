import { Card, CardContent } from "./ui/card";
import { 
  Utensils, 
  Sofa, 
  DoorOpen, 
  BedDouble,
  Bed,
  Plus
} from "lucide-react";

interface RoomSelectionProps {
  onSelectRoom: (room: string) => void;
}

export function RoomSelection({ onSelectRoom }: RoomSelectionProps) {
  const rooms = [
    {
      id: "kitchen",
      name: "Kök",
      icon: <Utensils className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
      airQuality: "Bra",
      co2: 650,
    },
    {
      id: "living-room",
      name: "Vardagsrum",
      icon: <Sofa className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      airQuality: "Utmärkt",
      co2: 450,
    },
    {
      id: "hallway",
      name: "Hall",
      icon: <DoorOpen className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      airQuality: "Acceptabel",
      co2: 850,
    },
    {
      id: "bedroom-1",
      name: "Sovrum 1",
      icon: <BedDouble className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      airQuality: "Måttlig",
      co2: 1100,
    },
    {
      id: "bedroom-2",
      name: "Sovrum 2",
      icon: <Bed className="w-8 h-8" />,
      color: "from-indigo-500 to-purple-500",
      airQuality: "Bra",
      co2: 720,
    },
  ];

  const getAirQualityStatus = (quality: string): "good" | "warning" | "critical" => {
    if (quality === "Utmärkt" || quality === "Bra") return "good";
    if (quality === "Acceptabel" || quality === "Måttlig") return "warning";
    return "critical";
  };

  const statusColors = {
    good: "bg-green-100 text-green-800 border-green-300",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
    critical: "bg-red-100 text-red-800 border-red-300",
  };

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="max-w-md mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="text-center py-3">
          <h1 className="text-indigo-900">Aspgatan 28</h1>
          <p className="text-sm text-gray-600">
            Välj rum för att se klimatdata
          </p>
        </div>

        {/* Room Grid */}
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
                <div
                  className={`inline-block px-2 py-1 rounded-full text-xs border ${statusColors[getAirQualityStatus(room.airQuality)]}`}
                >
                  {room.airQuality}
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Add Room Card */}
          <Card
            className="overflow-hidden transition-all hover:shadow-lg active:scale-95 cursor-pointer flex flex-col border-2 border-dashed"
            style={{ borderColor: '#277D32' }}
            onClick={() => alert('Funktion för att lägga till nytt rum')}
          >
            <CardContent className="pt-3 pb-3 px-3 flex flex-col items-center justify-center text-center space-y-2 h-full">
              <div
                className="p-3 rounded-lg bg-gray-200 text-gray-600"
              >
                <Plus className="w-8 h-8" />
              </div>
              <div className="text-gray-600 text-sm">Lägg till rum</div>
            </CardContent>
          </Card>
        </div>

        {/* Info card */}
        <Card className="mt-3 mb-4 border-2" style={{ backgroundColor: '#E9F2E5', borderColor: '#277D32' }}>
          <CardContent className="pt-3 pb-3">
            <p className="text-xs text-gray-700 text-center">
              Klicka på ett rum för att se temperatur, luftfuktighet, CO2-nivåer och luftkvalitet
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}