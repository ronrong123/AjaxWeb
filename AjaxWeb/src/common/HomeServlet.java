package common;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class HomeServlet
 */
@WebServlet("/home")
public class HomeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public HomeServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setCharacterEncoding("utf-8");
		
		EmpDAO dao = new EmpDAO();
		List<EmployeeVO> list = dao.getEmpList();
		String xml = "<dataset>";
		for(EmployeeVO emp : list) {
			xml += "<record>";
			xml += "<empId>" + emp.getEmployeeId() + "</empId>"
					+ "<firstName>"+ emp.getFirstName() + "</firstName>"
					+"<lastName>" + emp.getLastName() +"</lastName>" + "<email>"+emp.getEmail() + "</email>"
					+ "<phoneNumber>" + emp.getPhoneNumber() + "</phoneNumber>" + 
					"<hireDate>" + emp.getHireDate() + "</hireDate>" + 
					"<jobId>" + emp.getJobId() + "</jobId>" + "<salary>" + emp.getSalary() + "</salary>";
			xml += "</record>";
		}
		xml += "</dataset>";
		
		response.getWriter().append(xml);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
