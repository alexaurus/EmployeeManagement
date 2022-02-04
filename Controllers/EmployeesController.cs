using EmployeeManagement.DBContext;
using EmployeeManagement.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagement.Controllers
{
	[Route("[controller]/[action]")]
	[ApiController]
	public class EmployeesController : ControllerBase
	{
		AppDbContext context;
		public EmployeesController(AppDbContext context)
		{
			this.context = context;
		}

		[HttpGet]
		public async Task<IActionResult> GetAllEmployees()
		{
			return Ok(await context.Employees.ToListAsync());
		}
		[HttpPost]
		public async Task<IActionResult> AddEmployee(Employee employee)
		{
			await context.Employees.AddAsync(employee);
			int res = await context.SaveChangesAsync();
			if (res > 0)
				return Ok(employee);
			return StatusCode(StatusCodes.Status500InternalServerError);
		}
		[HttpPost]
		public async Task<IActionResult> EditEmployee(Employee employee)
		{
			context.Employees.Update(employee);
			int res = await context.SaveChangesAsync();
			if (res > 0)
				return Ok(employee);
			return StatusCode(StatusCodes.Status500InternalServerError);
		}
		[HttpGet]
		public async Task<IActionResult> DeleteEmployee(int empId)
		{
			var employee = await context.Employees.FindAsync(empId);
			context.Employees.Remove(employee);
			int res = await context.SaveChangesAsync();
			if (res > 0)
				return Ok(employee);
			return StatusCode(StatusCodes.Status500InternalServerError);
		}
	}
}
