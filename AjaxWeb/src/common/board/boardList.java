package common.board;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/boardList")
public class boardList extends HttpServlet {
	private static final long serialVersionUID = 1L;
   
    public boardList() {
        super();
       
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		response.setCharacterEncoding("utf-8");
		
		BoardDAO dao = new BoardDAO();
		List<BoardVO> list = dao.getBoardList();
		
		String xml = "<dataset>";
		for(BoardVO brd:list) {
			xml += "<record>";
			xml += "<boardNo>"+brd.getBoardNo()+"</boardNo>"
					+"<title>" + brd.getTitle() + "</title>"
					+"<content>" + brd.getContent() + "</content>"
					+"<writer>" + brd.getWriter() + "</writer>"
					+"<creationDate>" + brd.getCreationDate() + "</creationDate>";
			xml += "</record>";
		}
		xml += "</dataset>";
		
		response.getWriter().append(xml);
	
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		doGet(request, response);
	}

}
