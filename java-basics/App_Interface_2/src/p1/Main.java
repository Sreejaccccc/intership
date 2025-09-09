package p1;
import java.util.*;
import p1.WithDraw;
import p1.Deposite;
public class Main {
	public static void main(String[]args)
	{
		Scanner sc=new Scanner(System.in);
		System.out.println("Enter the Amt");
		int amt=sc.nextInt();
		if(amt>0 && amt%100==0)
		{
			System.out.println("Choice");
			System.out.println("\t 1.WithDraw\n\t 2.Deposite");
			System.out.println("Enter your choice:");
			int choice=sc.nextInt();
			switch(choice)
			{
			case 1:
				WithDraw wd=new WithDraw();
				wd.process(amt);
				break;
			case 2:
				Deposite dp=new Deposite();
				dp.process(amt);
				break;
			default:
				System.out.println("Invalid Choice");
			
			}
		}
		else
		{
			System.out.println("Invalid Amt");
		}
	}
}
