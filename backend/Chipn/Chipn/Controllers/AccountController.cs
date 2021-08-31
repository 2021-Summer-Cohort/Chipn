using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Chipn;
using Chipn.Models;

namespace Chipn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ChipnDBContext _context;

        public AccountController(ChipnDBContext context)
        {
            _context = context;
        }

        [Route("Login")]
        [HttpPost]
        public async Task<ActionResult<Account>> Login([FromBody]Account account)
		{
            var user = await _context.Accounts.Where(a => a.UserName == account.UserName && a.Password == EncryptPassword(account.Password)).FirstOrDefaultAsync();
            if(user == null)
			{
                return NotFound();
			}
			else
			{
                user.Password = "";
                return user;
			}
		}

        // GET: api/Account
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Account>>> GetAccount()
        {
            List<Account> accounts = await _context.Accounts.ToListAsync();
            foreach (Account account in accounts)
            {
                account.Password = "";
                account.Email = "";
            }
            return accounts;
        }

        // GET: api/Account/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAccount(int id)
        {
            var account = await _context.Accounts.FindAsync(id);

            if (account == null)
            {
                return NotFound();
            }

            //account.Password = "";

            return account;
        }

        // PUT: api/Account/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAccount(int id, [FromBody] Account account)
        {
            if (id != account.Id)
            {
                return BadRequest();
            }

            _context.Entry(account).State = EntityState.Modified;
            //account.Password = EncryptPassword(account.Password);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Account
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Account>> PostAccount([FromBody] Account account)
        {
            var user = await _context.Accounts.Where(a => a.UserName == account.UserName).FirstOrDefaultAsync();
            if (user != null)
            {
                return UnprocessableEntity();
            }
            else
            {
                account.Password = EncryptPassword(account.Password);
                _context.Accounts.Add(account);
                await _context.SaveChangesAsync();


                account.Password = "";
                return CreatedAtAction("GetAccount", new { id = account.Id }, account);
            }
        }

        // DELETE: api/Account/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(int id)
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }

            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AccountExists(int id)
        {
            return _context.Accounts.Any(e => e.Id == id);
        }

        private string EncryptPassword(string password)
		{
            //var hash = "";
            //do encryption

            System.Security.Cryptography.HashAlgorithm sha = System.Security.Cryptography.SHA256.Create();
            byte[] hash = sha.ComputeHash(System.Text.Encoding.ASCII.GetBytes(password));

            //hash.ToString();

            return System.Text.Encoding.Default.GetString(hash);
            
		}

        private string VerifyPassword(string hash,string password)
		{
            //var password = "";
            
            if(EncryptPassword(password)==hash)
                return password;
            else
                return "";

            // decrypt

            //return password;
		}
    }
}
