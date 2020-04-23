using Heroes.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Heroes.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class HeroListController : ControllerBase
	{
		[HttpGet]
		public List<Hero> GetHeroList()
		{
			var heroes = new List<Hero>();
			//TODO find a better way of grabbing Hero Icons
			var heroIcons = Directory.GetFiles("./ClientApp/public/Icons/heroes").Select(Path.GetFileName).ToList();

			var dbCon = DbConnection.Instance();
			dbCon.DatabaseName = "heroes";

			if (!dbCon.IsConnect()) return new List<Hero>();
			{
				const string query = "SELECT * FROM heroes";
				var cmd = new MySqlCommand(query, dbCon.Connection);
				var reader = cmd.ExecuteReader();

				while (reader.Read())
				{
					var heroIcon = heroIcons.Find(h => h == reader["short_name"] + ".png");
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
						Icon = "Icons/heroes/" + heroIcon
					};
					heroes.Add(hero);
				}

				reader.Close();
			}
			return heroes.OrderBy(h => h.Name).ToList();
		}
	}
}
