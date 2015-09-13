package thinking.machines;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.*;
import java.sql.*;
@WebServlet("/loginInformation")
public class Login extends HttpServlet
{
private Connection connection;
private PreparedStatement prepareStatement;
public void doGet(HttpServletRequest request,HttpServletResponse response)
{
String name=request.getParameter("name");
String email=request.getParameter("email");
response.setContentType("text/html;charset=UTF-8");
try
{
PrintWriter pw=response.getWriter();
connection=GlobalResources.getConnection();
PreparedStatement preparedStatement;
preparedStatement=connection.prepareStatement("select * from userInformation where name=? and email=?");
preparedStatement.setString(1,name);
preparedStatement.setString(2,email);
ResultSet resultSet=preparedStatement.executeQuery();
boolean b=resultSet.next();
if(b)
{
HttpSession session=request.getSession();
session.setAttribute("name",name);
pw.print(name);
}
else
{
}
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