import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  forbiddenNames = ['max', 'alex'];
  signupGroup: FormGroup;

  ngOnInit(): void {
    this.signupGroup = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNamesVal.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }

  getControls() {
    return (<FormArray>this.signupGroup.get('hobbies')).controls;
  }

  onSubmit() {
    console.log(this.signupGroup);
  }

  onAddHobby() {
    const control  = new FormControl(null, Validators.required);
    (<FormArray>this.signupGroup.get('hobbies')).push(control);
  }

  forbiddenNamesVal(control: FormControl): { [s: string]: boolean} {
    if (this.forbiddenNames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }
}
