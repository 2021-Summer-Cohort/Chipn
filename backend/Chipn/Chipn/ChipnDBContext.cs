using Chipn.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chipn
{
	public class ChipnDBContext : DbContext
	{
		public DbSet<Account> Accounts { get; set; }
		public DbSet<Game> Games { get; set; }
		public DbSet<AccountGame> AccountGames { get; set; }

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			var connectionString = "Server=(localdb)\\mssqllocaldb;Database=ChipnDB;Trusted_Connection=True;";
			optionsBuilder.UseSqlServer(connectionString).UseLazyLoadingProxies();
			base.OnConfiguring(optionsBuilder);
		}
		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Account>().HasData(
				new Account() { Id = 1, UserName = "ChipnAdmin", ChipCount = 1000, Email = "admin@chipn.gov", Password = "�O���k�w���[���ף�%", Age = 99 },
				new Account() { Id = 2, UserName = "carlos", ChipCount = 420, Email = "carlos@chipn.gov", Password = "�O���k�w���[���ף�%", Age = 36 },
				new Account() { Id = 3, UserName = "davis", ChipCount = 690, Email = "davis@chipn.gov", Password = "�O���k�w���[���ף�%", Age = 27 },
				new Account() { Id = 4, UserName = "gavin", ChipCount = 500, Email = "gavin@chipn.gov", Password = "�O���k�w���[���ף�%", Age = 22 }
			);

			modelBuilder.Entity<Game>().HasData(
				new Game() { Id = 1, Name = "BlackJack" },
				new Game() { Id = 2, Name = "Slots" },
				new Game() { Id = 3, Name = "Craps" },
				new Game() { Id = 4, Name = "Roulette" }
			);

			modelBuilder.Entity<AccountGame>().HasData(
				new AccountGame() { Id = 1, AccountId = 1, GameId = 1, Wagers = 100, Payouts = 0 },
				new AccountGame() { Id = 2, AccountId = 1, GameId = 3, Wagers = 700, Payouts = 210 },
				new AccountGame() { Id = 3, AccountId = 2, GameId = 2, Wagers = 250, Payouts = 20 },
				new AccountGame() { Id = 4, AccountId = 3, GameId = 1, Wagers = 80, Payouts = 450 }
			);
		}
	}
}