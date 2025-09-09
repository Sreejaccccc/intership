package overloading;

public class add {
	public void add1(int x,int y)
	{
		System.out.println(x+y);
	}
	public void add2(int x,int y,int z)
	{
		System.out.println(x+y+z);
	}
	
	public  static void main(String[]args)
	{
		add a=new add();
		a.add2(2, 3,4);
		
	}

}
