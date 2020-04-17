using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Heroes.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;

namespace Heroes.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        //[HttpGet]
        //public IEnumerable<WeatherForecast> Get()
        //{
        //    var rng = new Random();
        //    return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        //    {
        //        Date = DateTime.Now.AddDays(index),
        //        TemperatureC = rng.Next(-20, 55),
        //        Summary = Summaries[rng.Next(Summaries.Length)]
        //    })
        //    .ToArray();
        //}

        [HttpGet]
        public async Task<List<Hero>> GetHeroList()
        {
            var heroes = new List<Hero>();

            var dbCon = DbConnection.Instance();
            dbCon.DatabaseName = "heroes";
            if (dbCon.IsConnect())
            {
                var query = "SELECT * FROM heroes";
                var cmd = new MySqlCommand(query, dbCon.Connection);
                var reader = cmd.ExecuteReader();

                var client = new HttpClient();
                while (reader.Read())
                {

                    var heroIconStringFormat = string.Format("http://s3.hotsapi.net/img/heroes/92x93/{0}.png", reader["short_name"].ToString());
                    var heroIconUrl = new Uri(heroIconStringFormat);

                    var response = await client.GetAsync(heroIconStringFormat);
                    var heroIcon = "";
                    if (response.IsSuccessStatusCode)
                    {
                        heroIcon = response.Content.ReadAsStringAsync().Result;
                    }

                    var hero = new Hero()
                    {
                        Name = reader["name"].ToString(),
                        Short_Name = reader["short_name"].ToString(),
                        Role = reader["role"].ToString(),
                        Type = reader["type"].ToString(),
                        Release_Date = (DateTime)reader["release_date"],
                        Attribute_ID = reader["attribute_id"].ToString(),
                        C_Hero_ID = reader["c_hero_id"].ToString(),
                        C_Unit_ID = reader["c_unit_id"].ToString(),
                        Icon = heroIcon
                    };
                    heroes.Add(hero);
                }
            }
            return heroes.ToList();
        }
    }
}
