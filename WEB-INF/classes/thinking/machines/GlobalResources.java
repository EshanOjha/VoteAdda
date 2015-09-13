package thinking.machines;
import java.sql.*;
import java.io.*;
public class GlobalResources 
{
private static  Connection connection=null;
public static Connection getConnection()
{
try
{
Class.forName("com.mysql.jdbc.Driver");
connection=DriverManager.getConnection("jdbc:mysql://localhost:3306/mit","mit","mit");
}catch(Exception e)
{
System.out.println(e);
}
return connection;

}
}