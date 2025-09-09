package p1;

public class WithDraw implements Transaction {
	public void process(int amt)
	{
		if(amt<=b.bal)
		{
			System.out.println("Amount WithDraw:"+amt);
			b.bal=b.bal-amt;
			System.out.println("Balance Amount:"+b.getBal());
			System.out.println("Transaction Sucessfullu Done....");
		}
		else
		{
			System.out.println("Insufficent Fund");
		}
	}
}
