package common;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/deleteEmp")
public class DeleteEmpServ extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public DeleteEmpServ() {
		super();
		// TODO Auto-generated constructor stub
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String id = request.getParameter("empId");
		// deleteEmp를 호출할때 empId라는 파라미터값으로 넘기겠다(ex: deleteEmp?empId=210)
		id = id == null ? "0" : id; // id의 값이 null이면 0으로 바꾸고 아니면 id값을 넣겠다.
		int employeeId = Integer.parseInt(id);
		// Integer.parseInt(int 타입으로 바꿔줄 값)
		EmployeeVO vo = new EmployeeVO();
		vo.setEmployeeId(employeeId);

		EmpDAO dao = new EmpDAO();
		if(dao.deleteEmp(vo)) {
			response.getWriter().append("<h1>OK</h1>");			
		}else{
			response.getWriter().append("<h1>NG</h1>");
		}
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
