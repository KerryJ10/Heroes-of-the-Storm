
namespace Heroes.Models
{
	public class Talent
	{
		public uint ID { get; set; }
		public string Name { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public string Icon { get; set; }
		public sbyte Level { get; set; }
		public string AbilityID { get; set; }
		public sbyte Sort { get; set; }
		public int? Cooldown { get; set; }
		public int? Mana_Cost { get; set; }
	}
}
