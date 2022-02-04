using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagement.Models
{
	public class Employee
	{
		[Key]
		public int EmpId { get; set; }
		public string EmployeeImage { get; set; }
		public string EmployeeName { get; set; }
		public string EmployeeJob { get; set; }
		public string EmployeeMotto { get; set; }
		public string EmployeeHobbies { get; set; }
		public string EmployeeHometown { get; set; }
		public string EmployeePersonalBlog { get; set; }
	}
}
