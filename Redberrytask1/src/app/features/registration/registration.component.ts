import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  tap,
} from 'rxjs/operators';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  formStepper1!: FormGroup;
  sub!: Subscription;
  formStepper2!: FormGroup;
  pages: string = 'page1';
  combined!: any;
  userId: any;
  grandmastersArr: any = [];
  arr: object[] = [];

  constructor(private FB: FormBuilder, private userService: UserService) {
    const value = JSON.parse(localStorage.getItem('formValue')!);
    this.formStepper1 = this.FB.group({
      name: [
        (value && value.name) || '',
        [Validators.minLength(2), Validators.required],
      ],
      email: [
        (value && value.email) || '',
        [
          Validators.pattern(/^[A-Za-z0-9._%+-]+@redberry.ge$/),
          Validators.required,
        ],
      ],
      phone: [
        (value && value.phone) || '',
        [Validators.pattern(/^\d{9}$/), Validators.required],
      ],
      date_of_birth: [
        (value && value.date_of_birth) || '',
        Validators.required,
      ],
    });
    this.formStepper1.valueChanges.subscribe(() => {
      localStorage.setItem(
        'formValue',
        JSON.stringify(this.formStepper1.value)
      );
    });

    this.formStepper2 = this.FB.group({
      experience_level: [
        (value && value.experience_level) || 'placeholder',
        Validators.required,
      ],
      chooseCharacter: [
        (value && value.chooseCharacter) || 'placeholder',
        Validators.required,
      ],
      already_participated: [
        (value && value.already_participated) || '',
        Validators.required,
      ],
    });

    this.sub = combineLatest(
      this.formStepper1.valueChanges.pipe(
        startWith({ ...this.formStepper1.value })
      ),
      this.formStepper2.valueChanges.pipe(
        startWith({
          ...this.formStepper2.value,
        })
      )
    )
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map(([step1, step2]) => ({ step1, step2 })),
        tap(({ step1, step2 }) => {
          this.combined = Object.assign(step1, step2);
          localStorage.setItem('formValue', JSON.stringify(this.combined));
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.userService.getGrandmasters().subscribe((data: any) => {
      this.grandmastersArr = data;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  backButton() {
    if ((this.pages = 'page2')) {
      this.pages = 'page1';
    }
  }

  grandmasterId(id: number) {
    this.userId = id;
  }

  onSubmit() {
    this.pages = 'page2';
  }
  onSubmit2() {
    const obj = {
      name: this.formStepper1.value.name,
      email: this.formStepper1.value.email,
      phone: this.formStepper1.value.phone.toString(),
      date_of_birth: this.formStepper1.value.date_of_birth,
      experience_level: this.formStepper2.value.experience_level,
      already_participated: JSON.parse(
        this.formStepper2.value.already_participated.toLowerCase()
      ),
      character_id: parseInt(this.formStepper2.value.chooseCharacter),
    };
    this.userService.addUser(obj).subscribe(
      (_) => {
        console.log('success');
      },
      (err) => {
        console.log('something went wrong!');
      }
    );
    console.log(obj);
    this.pages = 'page3';
    localStorage.removeItem('formValue');
  }
}
