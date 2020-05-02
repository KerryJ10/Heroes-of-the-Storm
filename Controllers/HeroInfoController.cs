using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using Heroes.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures.Infrastructure;
using Microsoft.Extensions.WebEncoders.Testing;
using MySql.Data.MySqlClient;

namespace Heroes.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class HeroInfoController : ControllerBase
	{
		public TalentsAndAbilities GeTalentsAndAbilities(int id, string name)
		{
			var heroAbilities = new List<Ability>();

			var dbCon = DbConnection.Instance();
			dbCon.DatabaseName = "heroes";
			if (!dbCon.IsConnect()) return new TalentsAndAbilities();
			{
				const string query = "SELECT ha.* FROM abilities ha " +
											"INNER JOIN heroes h on ha.hero_id = h.id " +
											"WHERE ha.hero_id = @H_ID;";

				var cmd = new MySqlCommand(query, dbCon.Connection);
				cmd.Parameters.Add("@H_ID", MySqlDbType.Int64);
				cmd.Parameters["@H_ID"].Value = id;

				var reader = cmd.ExecuteReader();

				while (reader.Read())
				{
					var cooldown = reader["cooldown"];
					var manaCost = reader["mana_cost"];

					heroAbilities.Add(new Ability
					{
						Name = reader["name"].ToString(),
						Cooldown = cooldown == DBNull.Value ? (int?)null : (int)cooldown,
						Description = reader["description"].ToString(),
						Hotkey = reader["hotkey"].ToString(),
						Icon = reader["icon"].ToString(),
						Mana_Cost = manaCost == DBNull.Value ? (int?)null : (int)manaCost,
						Owner = reader["owner"].ToString(),
						Title = reader["title"].ToString(),
						Trait = (bool)reader["trait"]
					});
				}
				reader.Close();
			}

			return new TalentsAndAbilities
			{
				Name = name,
				Abilities = heroAbilities,
				Talents = new List<Talent>()
			};
		}
	}
}
