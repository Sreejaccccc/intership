package basics;

public class overriding {
	// Example of Overriding in Java
	
	    // Example of Overriding in Java
	    
	    // Make the nested classes static
	    static class Animal {
	        // Base class
	        void move() {
	            System.out.println("Animal is moving.");
	        }
	        void eat() {
	            System.out.println("Animal is eating.");
	        }
	    }

	    static class Dog extends Animal {
	        @Override
	        void move() { // move method from Base class is overridden
	            System.out.println("Dog is running.");
	        }
	        void bark() {
	            System.out.println("Dog is barking.");
	        }
	    }

	    // The Geeks class with the main method can be removed or also made static.
	    // A simpler approach is to place main directly in the top-level class.
	    public static void main(String[] args) {
	        Dog d = new Dog(); // Now this works perfectly
	        d.move();  // Output: Dog is running.
	        d.eat();   // Output: Animal is eating.
	        d.bark();  // Output: Dog is barking.
	    }
	}

