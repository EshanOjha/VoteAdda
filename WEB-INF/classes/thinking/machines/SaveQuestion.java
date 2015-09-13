package thinking.machines;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.sql.*;
import java.io.*;
@WebServlet("/saveQuestion")
public class SaveQuestion extends HttpServlet
{
private Connection connection;
private PreparedStatement preparedStatement;
public void doGet(HttpServletRequest request,HttpServletResponse response)
{
HttpSession session=request.getSession();
String name=(String)session.getAttribute("name");
if(name==null)
{
try
{
PrintWriter pw=response.getWriter();
pw.print("NotLogin");
}catch(Exception e)
{
System.out.println(e);
}
}
else
{
try
{
String question=request.getParameter("question");
connection=GlobalResources.getConnection();
preparedStatement=connection.prepareStatement("insert into question(question,upvote,downvote) values(?,?,?)");
preparedStatement.setString(1,question);
preparedStatement.setInt(2,0);
preparedStatement.setInt(3,0);
preparedStatement.executeUpdate();
preparedStatement.close();
connection.close();
PrintWriter pw=response.getWriter();
pw.print("Login");
}catch(Exception e)
{
System.out.println(e);
}
}
}
public void doPost(HttpServletRequest request,HttpServletResponse response)
{
doGet(request,response);
}
}