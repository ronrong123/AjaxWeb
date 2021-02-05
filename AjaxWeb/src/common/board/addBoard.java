package common.board;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/addBoard")
public class addBoard extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public addBoard() {
        super();
    }
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String bNo = request.getParameter("bNo");
		String title = request.getParameter("title");
		String content = request.getParameter("content");
		String writer = request.getParameter("writer");
		String date = request.getParameter("date");
		
		int bdNo = Integer.parseInt(bNo);
		
		BoardVO vo = new BoardVO();
		vo.setBoardNo(bdNo);
		vo.setTitle(title);
		vo.setContent(content);
		vo.setWriter(writer);
		vo.setCreationDate(date);
		
		BoardDAO dao = new BoardDAO();
		BoardVO v = dao.updateBrd(vo);
		String result = "<result>";
		result += "<bNo>" + v.getBoardNo() + "</bNo>";
		result += "<title>" + v.getTitle() + "</title>";
		result += "<content>" + v.getContent() + "</content>";
		result += "<writer>" + v.getWriter() + "</writer>";
		result += "<date>" + v.getCreationDate() + "</date>";
		result += "</result>";
		
		response.getWriter().append(result);
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
