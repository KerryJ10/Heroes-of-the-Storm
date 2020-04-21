using System;
using System.Collections.Generic;

namespace Heroes.Models
{
	public class Hero
	{
		public string Name { get; set; }
		public string Short_Name { get; set; }
		public string Role { get; set; }
		public string Type { get; set; }
		public DateTime Release_Date { get; set; }
		public string Attribute_ID { get; set; }
		public string C_Hero_ID { get; set; }
		public string C_Unit_ID { get; set; }
		public string Icon { get; set; }
		public virtual List<Talent> Talents { get; set; }
		public virtual List<Ability> Abilities { get; set; }
	}
}
