import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { Customer } from '../../common/customer';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  customerFormGroup: FormGroup;

constructor(
  private formBuilder: FormBuilder,
  private customerService:CustomerService,
private router:Router){}
ngOnInit(){
  this.customerFormGroup = this.formBuilder.group({
    customer:this.formBuilder.group({
      Name:['',[Validators.required, Validators.pattern('[A-Za-z]+')]],
      
      email: ['',[Validators.required,Validators.email]],
      
      mobile: ['',[Validators.required,Validators.pattern('[6-9][0-9]{9}')]],
    })
  });
}
get Name(){
  return this.customerFormGroup.get('customer.firstName')

}

get email(){
  return this.customerFormGroup.get('customer.email')
  
}
get mobile(){
  return this.customerFormGroup.get('customer.mobile')
  
}
onSubmit(){
  if(this.customerFormGroup.invalid){
    this.customerFormGroup.markAllAsTouched();
    return;
  }
  let customer = new Customer();
  customer = this.customerFormGroup.controls['customer'].value;
  this.customerService.saveCustomer(customer).subscribe((data) =>{
    alert('contact Successful');
    this.router.navigateByUrl('/contact-us');
  });
}


}
