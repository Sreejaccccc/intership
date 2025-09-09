package Inhertance_1;

public class User {
	public static void main(String[]args)
	{
		
		Guest g=new Guest();
		g.read();
		Developer d=new Developer();
		d.write();
		Admin a=new Admin();
		a.read();
	}

}
