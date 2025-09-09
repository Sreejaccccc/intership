package sreeja;

public class Class1 {

	public static void main(String[]args)
	{
		method2();
		
	}
	public static void method2()

	{
		method1();
	}
	public static void method1()
	{
		System.out.println("program execution start");
		int fnum=9;
		int snum=0;
		int result=0;
		try
		{
			
			result=fnum/snum;
		}
		catch(ArithmeticException ae)
		{
			System.out.println(ae.toString());
			//throw ae;
			//so yahh basically throw is used when we want stop the excution further
			//we have handaled error till line 30 now we are saying java to handel the excepion 
			//and this will throw error so after the line of 29 if we write any code line this will not exute
			
			//System.out.println(ae.toString());
		}
		finally
		{
			System.out.println("finally block");
		}
		System.out.println("output is"+result);
		System.out.println("program execution end");
	}
}
