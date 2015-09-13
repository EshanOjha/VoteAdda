package thinking.machines;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.sql.*;
import java.io.*;
@WebServlet("/GetQuestions")
public class GetQuestions extends HttpServlet
{
private Connection connection;
private ResultSet resultSet;
private Statement statement;
public void doGet(HttpServletRequest request,HttpServletResponse response)
{
try
{
PrintWriter pw=response.getWriter();
connection=GlobalResources.getConnection();
statement=connection.createStatement();
resultSet=statement.executeQuery("select * from question");
while(resultSet.next()==true)
{
pw.print(resultSet.getString("question")+","+resultSet.getInt("upvote")+","+resultSet.getInt("downvote"));
pw.println(",");
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