package p2;
import java.util.*;
import p1.SubClass1;
public class Main {
	public static void main(String[]args)
	{
		Scanner sc=new Scanner(System.in);
		SubClass1 sb1=new SubClass1();
		SubClass1.SubClass2 sb2=new SubClass1.SubClass2();
		SubClass1.a=sc.nextInt();
		sb1.b=sc.nextInt();
		SubClass1.SubClass2.x=sc.nextInt();
		sb2.y=sc.nextInt();
		sb1.m1();
		sb2.m2();
		SubClass1.SubClass2.m22();
		
	}

}
