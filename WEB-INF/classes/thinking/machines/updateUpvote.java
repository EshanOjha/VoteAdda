package thinking.machines;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.sql.*;
import java.io.*;
@WebServlet("/updateUpvote")
public class updateUpvote extends HttpServlet
{
private Connection connection;
private PreparedStatement preparedStatement;
public void doGet(HttpServletRequest request,HttpServletResponse response)
{
String question=request.getParameter("question");
try
{
connection=GlobalResources.getConnection();
preparedStatement=connection.prepareStatement("update question set upvote=upvote+1 where question=?");
preparedStatement.setString(1,question);
preparedStatement.executeUpdate();
preparedStatement.close();
connection.close();
}catch(Exception e)
{
System.out.println(e);
}
}
public void doPost(HttpServletRequest request,HttpServletResponse response)
{
doGet(request,response);
}
}