using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

[ApiController]
[Route("api/[controller]")]
public class IndoorClimateController : ControllerBase
{
    private readonly string dataFolder = Path.Combine("Data");

    [HttpGet("now")]
    public ActionResult<IndoorClimateNow> GetNow()
    {
        var temperature = ReadLatestValue("temperature.json");
        var humidity = ReadLatestValue("humidity.json");
        var co2 = ReadLatestValue("co2.json");
        var airQuality = ReadLatestValue("airquality.json");

        var now = new IndoorClimateNow
        {
            Temperature = temperature,
            Humidity = humidity,
            CO2 = co2,
            AirQuality = airQuality.ToString()
        };
        return Ok(now);
    }

    [HttpGet("temperature")]
    public ActionResult<IEnumerable<TimeSeriesValue>> GetTemperature([FromQuery] int hours = 24)
        => Ok(ReadTimeSeries("temperature.json", hours));

    [HttpGet("humidity")]
    public ActionResult<IEnumerable<TimeSeriesValue>> GetHumidity([FromQuery] int hours = 24)
        => Ok(ReadTimeSeries("humidity.json", hours));

    [HttpGet("co2")]
    public ActionResult<IEnumerable<TimeSeriesValue>> GetCO2([FromQuery] int hours = 24)
        => Ok(ReadTimeSeries("co2.json", hours));

    [HttpGet("airquality")]
    public ActionResult<IEnumerable<TimeSeriesValue>> GetAirQuality([FromQuery] int hours = 24)
        => Ok(ReadTimeSeries("airquality.json", hours));

    private List<TimeSeriesValue> ReadTimeSeries(string fileName, int hours)
    {
        var filePath = Path.Combine(dataFolder, fileName);
        if (!System.IO.File.Exists(filePath))
            return new List<TimeSeriesValue>();

        var json = System.IO.File.ReadAllText(filePath);
        var allData = JsonSerializer.Deserialize<List<TimeSeriesValue>>(json);

        var fromTime = DateTime.UtcNow.AddHours(-hours);
        return allData?
            .Where(x => x.Timestamp >= fromTime)
            .OrderBy(x => x.Timestamp)
            .ToList() ?? new List<TimeSeriesValue>();
    }

    private double ReadLatestValue(string fileName)
    {
        var filePath = Path.Combine(dataFolder, fileName);
        if (!System.IO.File.Exists(filePath))
            return 0;

        var json = System.IO.File.ReadAllText(filePath);
        var allData = JsonSerializer.Deserialize<List<TimeSeriesValue>>(json);
        return allData?.OrderByDescending(x => x.Timestamp).FirstOrDefault()?.Value ?? 0;
    }
}