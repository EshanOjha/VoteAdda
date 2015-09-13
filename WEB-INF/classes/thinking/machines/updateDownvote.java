package thinking.machines;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.sql.*;
import java.io.*;
@WebServlet("/updateDownvote")
public class updateDownvote extends HttpServlet
{
private PreparedStatement preparedStatement;
private Connection connection;
private ResultSet resultSet;
public void doGet(HttpServletRequest request,HttpServletResponse response)
{
String question=request.getParameter("question");
try
{
connection=GlobalResources.getConnection();
preparedStatement=connection.prepareStatement("update question set downvote=downvote+1 where question=?");
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