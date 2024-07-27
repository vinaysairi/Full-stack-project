import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
onSubmit() {
  const name = (<HTMLInputElement>document.getElementById('name')).value;
  const email = (<HTMLInputElement>document.getElementById('email')).value;
  const phone = (<HTMLInputElement>document.getElementById('phone')).value;
  alert('Your Data has been sent! Our Team Will be Contact You!');
throw new Error('Method not implemented.');
}

}
