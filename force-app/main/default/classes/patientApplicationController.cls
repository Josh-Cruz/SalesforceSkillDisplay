/* @author Josh Cruz
* @date 07/21/21
* @test patientApplicationControllerTest (TODO)
* @description logic for Patient Application LWC
*/


public class patientApplicationController {
    
    /* After someone From the partner portal applys for coverage
    We  get their info & find their medical facility then assign it to a program specialist (user)
    then return a success message
    */
  @AuraEnabled
  public static String updatePatientApplication(Id applicantId){
    Patient__c Applicant = [Select Id, Name,  Medical_Facility__c FROM Patient__c Where ID =:applicantId  ];
      Id Specialist = [Select Id,  Medical_Facility__c, Program_Specialist__c FROM Program_Specialist__c WHERE Medical_Facility__c =: Applicant.Medical_Facility__c LIMIT 1].Program_Specialist__c;
      
      try {
        Application__c newApp = new Application__c();
        newApp.Name = Applicant.Name +' Application';
        newApp.Patient__c = Applicant.Id;
        newApp.Medical_Facility__c = Applicant.Medical_Facility__c;
        newApp.Program_Specialist__c = Specialist;
        newApp.Submitted_Date__c = System.Today();
        newApp.Follow_Up_Date__c = System.Today()+1;
        insert newApp;
        
         return 'Application Recieved';
      } catch (Exception e) {
          throw new AuraHandledException(e.getMessage());
      }
  }
}
