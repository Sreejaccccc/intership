package p1;

public class SubClass1 {
	public static int a;
	public int b;
	public void m1()
	{
		System.out.println("Outer instance method m1()");
		System.out.println("The value a:"+a);
		System.out.println("The value b:"+b);
	}
	public static class SubClass2

	{
		public static int x;
		public int y;
		public void m2()
		{
			System.out.println("Static member Inner Instance method m2()");
			System.out.println("The value of x:"+x);
			System.out.println("The value of y:"+y);
			System.out.println("The value of a:"+a);
			//outer class static variable is a
			//System.out.println("The value of b:"+b);
			//outer class instance variable;
		}
		public static void m22()
		{
			System.out.println("static method of INner Static class m22()");
			System.out.println("The value of x:"+x);
			//System.out.println("The value of y:"+y);
			System.out.println("The value of a:"+a);
			//System.out.println("The value of b:"+b);
		}
	}
}
