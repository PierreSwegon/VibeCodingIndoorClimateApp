public class TimeSeriesValue
{
    public DateTime Timestamp { get; set; }
    public double Value { get; set; }
}

public class IndoorClimateNow
{
    public double Temperature { get; set; }
    public double Humidity { get; set; }
    public double CO2 { get; set; }
    public string AirQuality { get; set; }
}