package practise;
import java.util.*;

public class vector_1 {
	public static void main(String[]args)
	{
		Vector v1=new Vector();//in the brackests if you keep 20 capicty we can create
		v1.add("sreeja");
		v1.add("sree");
		v1.add(1,"papa");
		System.out.println(v1);
		System.out.println(v1.size());
		System.out.println(v1.capacity());
		Vector v2=new Vector();
		v2.add("lol");
		v2.add("sreeooo");
		/*for(int i=0;i<v2.size();i++)
		{
			v1.add(v2.get(i));
		}*/
		//to add everything atatime
		v1.addAll(0,v2);
		System.out.println(v1);
		System.out.println(v1.remove(0));
		System.out.println(v1);
		System.out.println(v1.removeAll(v2));
		//to remove all elemnts in the list but the list should be tehn use v1.clear();
		v1.clear();
		// to check the particular elemt is there in list then v1.contains
		v1.contains("sree");
		v1.containsAll(v2);
		//update
		v1.set(0);
		//lastIndexOf("sree")
		//isEmpty()
		//v1.lastElement(
		//nill values are allowed4
		
		//
	}

}
