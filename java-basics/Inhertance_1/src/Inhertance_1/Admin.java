package Inhertance_1;

public class Admin extends Developer {

public void manage()
{
	super.read();
	write();
	System.out.println("has ablity to write and read");
}
public void read()
{
	System.out.println("Admin raed");
}
}
