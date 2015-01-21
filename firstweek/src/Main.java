import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Iterator;

public class Main {


    public static long mergeSort(int [] list, int low, int high) {
        if (low == high - 1) return 0;
        int mid = (low + high)/2;
        return mergeSort (list, low, mid) + mergeSort (list, mid, high) + merge (list, low, mid, high);
    }

    private static long merge(int [] list, int low, int mid, int high) {
        long count = 0;
        int[] temp = new int[list.length];

        for (int i = low, lb = low, hb = mid; i < high; i++) {

            if (hb >= high || lb < mid && list[lb] <= list[hb]) {
                temp[i]  = list[lb++];
            } else {
                count = count + (mid - lb);
                temp[i]  = list[hb++];
            }
        }

        System.arraycopy(temp, low, list, low, high - low);

        return count;
    }

    public static long countInversions(int[] a) {
        return mergeSort(a, 0, a.length);
    }

    public static void main(String args[]) throws Exception
    {
        Main s= new Main();
        ArrayList<Integer> arrlist=new ArrayList<Integer>();

        BufferedReader br = new BufferedReader(new FileReader("IntegerArray.txt"));
        try {
            StringBuilder sb = new StringBuilder();
            String line = br.readLine();

            while (line != null) {
                int intelement=Integer.parseInt(line);
                arrlist.add(intelement);
                line = br.readLine();
            }
        } finally {
            br.close();
        }

        int elementlist[]  = new int[arrlist.size()];
        Iterator<Integer> iter = arrlist.iterator();
        for (int j=0;iter.hasNext();j++) {
            elementlist[j] = iter.next();
        }
        long timeBefore = System.currentTimeMillis();
        long result=countInversions(elementlist);
        long timeAfter = System.currentTimeMillis();

        System.out.println("Result: "+result);
        System.out.println("Time: "+(timeAfter-timeBefore)/1000);
    }
}