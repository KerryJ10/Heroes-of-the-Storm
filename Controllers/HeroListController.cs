using Heroes.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;

namespace Heroes.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HeroListController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Hero> GetHeroList()
        {
            var heroes = new List<Hero>();

            var dbCon = DbConnection.Instance();
            dbCon.DatabaseName = "heroes";
            if (dbCon.IsConnect())
            {
                var query = "SELECT * FROM heroes";
                var cmd = new MySqlCommand(query, dbCon.Connection);
                var reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    var heroIconStringFormat = string.Format("http://s3.hotsapi.net/img/heroes/92x93/{0}.png", reader["short_name"].ToString());

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
                        Icon = heroIconStringFormat
                    };
                    heroes.Add(hero);
                }

                reader.Close();
            }
            
            return heroes.ToList();
        }
    }
}
