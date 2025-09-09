package p1;

public class Deposite implements Transaction {
	public void process(int amt)
	{
		System.out.println("Amount Deposited:"+amt);
		b.bal=b.bal+amt;
		System.out.println("Balance Amount:"+b.getBal());
		System.out.println("Transaction Sucessful....");
	}
}

