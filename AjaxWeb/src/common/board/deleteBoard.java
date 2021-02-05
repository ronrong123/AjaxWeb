package common.board;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/delbd")
public class deleteBoard extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public deleteBoard() {
        super();
    }
	protected void doGet(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		String id = request.getParameter("boardNo");
		
		id = id ==null?"0":id;
		int boardNo = Integer.parseInt(id);
		// id값을 인트로 변환함
		BoardVO vo = new BoardVO();
		vo.setBoardNo(boardNo);
		
		BoardDAO dao = new BoardDAO();
		if(dao.deleteBoard(vo)){
			response.getWriter().append("<h1>OK</h1>");			
		}else{
			response.getWriter().append("<h1>NG</h1>");
		}

	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
