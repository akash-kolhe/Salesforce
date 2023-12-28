import { LightningElement,wire, track } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/MyMessageChannel__c';



import {
  subscribe,
  unsubscribe,
  APPLICATION_SCOPE
} from 'lightning/messageService';


export default class Lms_A_Component extends LightningElement {
  // data pass from Parent A to B
  @track msgA;
  @track pubmessage
  subscription = null;

  lmsdatapassRec='';

 @track allMsg=[];
  
  @wire(MessageContext)
    messageContext;

    changeAhandler(event){
      this.msgA = event.target.value;
    // this.msgA = "Pass to Subscriber Model....";
    }

    publisherHandlertoB(){
      const payload = { lmsMsg:this.msgA };

        publish(this.messageContext, recordSelected, payload);
        this.allMsg.push(this.msgA)
        console.log('LMS A allMsg=='+this.allMsg);
        // console.log('push this.allMsg'+this.allMsg)
    }
// up this we pass data A to B
@wire(MessageContext)
messageContext;

@track arrayOflmsdatapassRec=[];

connectedCallback() {
  this.subscribeToMessageChannel();
}

subscribeToMessageChannel() {
  if (!this.subscription) {
      this.subscription = subscribe(
          this.messageContext,
          recordSelected,
          (message) => this.handleMessage(message),
          { scope: APPLICATION_SCOPE }
      );
  }
}

handleMessage(message) {
  this.lmsdatapassRec = message.lmsdatapass;

  // this.arrayOflmsdatapassRec.push(this.lmsdatapassRec)
  // console.log('arrayOflmsdatapassRec=> '+arrayOflmsdatapassRec)
}

disconnectedCallback() {
  this.unsubscribeToMessageChannel();
}

    
    }