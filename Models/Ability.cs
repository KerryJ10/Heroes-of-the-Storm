using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Heroes.Models
{
    public class Ability
    {
        public string Owner { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Icon { get; set; }
        public string Hotkey { get; set; }
        public int Cooldown { get; set; }
        public int Mana_Cost { get; set; }
        public bool Trait { get; set; }
    }
}
