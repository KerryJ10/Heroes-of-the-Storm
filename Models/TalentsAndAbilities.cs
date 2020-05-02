using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Heroes.Models
{
	public class TalentsAndAbilities
	{
		public string Name { get; set; }
		public virtual List<Talent> Talents { get; set; }
		public virtual List<Ability> Abilities { get; set; }
	}
}
