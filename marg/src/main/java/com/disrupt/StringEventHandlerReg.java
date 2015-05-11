package com.disrupt;

import com.lmax.disruptor.EventHandler;

public class StringEventHandlerReg implements EventHandler<StringEvent>
{
    public void onEvent(StringEvent event, long sequence, boolean endOfBatch)
    {
    	String s = event.get();
    	s = s.replace('e', '3');
//    	try {
//			Thread.sleep(2);
//		} catch (InterruptedException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
    	if ( sequence % 1000 == 0) {
    		System.out.println("Consumer ID: " + this.toString() + " Consumer event: " + event + " seq: " + sequence + " value: " + s);
    	}
        
    }

}