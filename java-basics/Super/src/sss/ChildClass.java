package sss;
interface Parent
{
	
}
class GrandParentClass
{
	
}
class ParentClass extends GrandParentClass 
{
	int age=50;
	String name="sreeja";
	public void details() {
		System.out.println("printing the parent class details");
		System.out.println(age+" "+name);
	}
}

public class ChildClass extends ParentClass implements Parent {
	String name="ssss";
	public void dummy()
	{
		System.out.println("hi!!");
		System.out.println(this.name);
	}
	public void details()
	{
		System.out.println("hoo");
		System.out.println(super.name);
	}
	
	public static void main(String[]args)
	{
		ChildClass c=new ChildClass();
		c.details();
		c.dummy();	
	}
}
