import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Iterator;

/**
 * Created with IntelliJ IDEA.
 * User: kateryna.guliaieva
 * Date: 2/2/15
 * Time: 9:26 PM
 * To change this template use File | Settings | File Templates.
 */
public class Main {




    private static void swap(int array[], int j, int i )
    {
        int temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    private static int findPivotPosition(int array[], int start, int end)
    {
        int i=start+1, j, pivot=array[start];
        for(j=start+1; j<=end; j++)
        {
            if(array[j]<pivot)
            {
                swap(array , j,i);
                i++;
            }
        }
        swap(array,i-1,start);
        return i-1;
    }

    private static long quickSort(int start, int end, int array[]) {
        if (start >= end)
            return 0;
        int pivotPosition =findPivotPosition(array, start, end);

        return (end-start)+
                quickSort(start, pivotPosition-1,array) +
                quickSort(pivotPosition+1, end,array);
    }

    private static long countQuickSortComparisons(int arr[])
    {
        int startIndex = 0;
        int endIndex = arr.length - 1;
        return quickSort(startIndex, endIndex, arr);
    }

    public static void main(String args[]) throws Exception
    {
        ArrayList<Integer> arrlist=new ArrayList<Integer>();

        BufferedReader br = new BufferedReader(new FileReader("QuickSort.txt"));
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
        long result = countQuickSortComparisons(elementlist);
        long timeAfter = System.currentTimeMillis();

        System.out.println("Result: "+result);
        System.out.println("Result: "+elementlist.length);
        System.out.println("Time: "+(timeAfter-timeBefore)/1000);
    }
}
