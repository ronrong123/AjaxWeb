package common.board;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import common.EmpDAO;
import common.EmployeeVO;
 
@WebServlet("/upEmp")
public class updateEmp extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public updateEmp() {
        super();
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		String eid = request.getParameter("eid");
		String fName = request.getParameter("fName");
		String lName = request.getParameter("lName");
		String email = request.getParameter("email");
		String pNumber = request.getParameter("pNumber");
		String hireDate = request.getParameter("hireDate");
		String jobId = request.getParameter("jobId");
		
		System.out.println(hireDate);
		
		int employeeId = Integer.parseInt(eid);
		
		EmployeeVO vo = new EmployeeVO();
		vo.setEmployeeId(employeeId);
		vo.setFirstName(fName);
		vo.setLastName(lName);
		vo.setEmail(email);
		vo.setPhoneNumber(pNumber);
		vo.setHireDate(hireDate);
		vo.setJobId(jobId);
		
		EmpDAO dao =new EmpDAO();
		EmployeeVO v = dao.updateEmp(vo);
		String result = "<result>";
		result += "<eid>" + v.getEmployeeId() + "</eid>";
		result += "<fName>" + v.getFirstName() + "</fName>";
		result += "<lName>" + v.getLastName() + "</lName>";
		result += "<email>" + v.getEmail() + "</email>";
		result += "<pNumber>" + v.getPhoneNumber() + "</pNumber>";
		result += "<hDate>" + v.getHireDate() + "</hDate>";
		result += "<jId>" + v.getJobId() + "</jId>";
		result += "</result>";
		
		response.getWriter().append(result);
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
