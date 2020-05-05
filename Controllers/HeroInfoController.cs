using System;
using System.Collections.Generic;
using Heroes.Models;
using Microsoft.AspNetCore.Mvc;
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
			var heroTalents = new List<Talent>();

			var dbCon = DbConnection.Instance();
			dbCon.DatabaseName = "heroes";
			if (!dbCon.IsConnect()) return new TalentsAndAbilities();
			{
				const string getHeroAbilities = "SELECT ha.* FROM abilities ha " +
				                                "INNER JOIN heroes h on ha.hero_id = h.id " +
				                                "WHERE ha.hero_id = @H_ID;";

				const string getHeroTalents = "SELECT t.* " +
				                              "FROM heroes h " +
				                              "INNER JOIN hero_talent ht ON h.id = ht.hero_id " +
				                              "INNER JOIN talents t ON t.id = ht.talent_id " +
				                              "WHERE h.id = @Hero_ID " +
				                              "ORDER BY t.level";

				var cmd = new MySqlCommand(getHeroAbilities, dbCon.Connection);
				cmd.Parameters.Add("H_ID", MySqlDbType.UInt64); 
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


				try
				{
					cmd.CommandText = getHeroTalents;
					cmd.Parameters.Add("Hero_ID", MySqlDbType.UInt64);
					cmd.Parameters["@Hero_ID"].Value = id;
					var talentsReader = cmd.ExecuteReader();

					while (talentsReader.Read())
					{
						var cooldown = talentsReader["cooldown"];
						var manaCost = talentsReader["mana_cost"];

						heroTalents.Add(new Talent
						{
							ID = (uint)talentsReader["id"],
							Title = talentsReader["title"].ToString(),
							Description = talentsReader["description"].ToString(),
							Icon = talentsReader["icon"].ToString(),
							Cooldown = cooldown == DBNull.Value ? (int?)null : (int)cooldown,
							Mana_Cost = manaCost == DBNull.Value ? (int?)null : (int)manaCost,
							AbilityID = talentsReader["ability_id"].ToString(),
							Level = (sbyte)talentsReader["level"],
							Name = talentsReader["name"].ToString(),
							Sort = (sbyte)talentsReader["sort"]
						});
					}

					talentsReader.Close();
				}
				catch (Exception e)
				{
					Console.WriteLine(e);
					throw;
				}
				

				
			}

			return new TalentsAndAbilities
			{
				Name = name,
				Abilities = heroAbilities,
				Talents = heroTalents
			};
		}
	}
}
