using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chipn.Models
{
	public class Account
	{
		public int Id { get; set; }
		public string UserName { get; set; }
		public string Password { get; set; }
		public long ChipCount { get; set; }
		public string Email { get; set; }
		public int Age { get; set; }
		public virtual List<AccountGame> AccountGames { get; set; }
	}
}
