import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ITour } from '../../../models/tours';
import { ToursService } from '../../../services/tours.service';
import { UserService } from '../../../services/user.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms';
import {InputNumberModule} from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { CommonModule, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-order',
  imports: [
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    InputNumberModule,
    InputTextModule,
    DatePickerModule,
    ButtonModule,
    NgTemplateOutlet
    ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent { 
  tourId: string = null;
  tour: ITour;
  userForm: FormGroup;
  userFormFieldsArr = [
  { label: 'Имя', placeholder: 'Введите имя', control: 'firstName', type: 'input' },
  { label: 'Фамилия', placeholder: 'Введите фамилию', control: 'lastName', type: 'input' },
  { label: 'Номер карты', placeholder: 'Введите номер карты', control: 'cardNumber', type: 'input' },
  { label: 'Возраст', control: 'age', type: 'number' },
  { label: 'Дата рождения', control: 'birthDate', type: 'date' },
  { label: 'Гражданство', placeholder: 'Введите гражданство', control: 'citizenship', type: 'input' }
];
  constructor (private tourService: ToursService,
    private route: ActivatedRoute,
  private userService:UserService) {}

ngOnInit(): void {
  this.tourId = this.route.snapshot.paramMap.get('id');
  this.tourService.getTourByID(this.tourId).subscribe((tour) =>{
    this.tour = tour;
  })

  this.userForm = new FormGroup ({
    firstName: new FormControl ('', {validators: Validators.required}),
    lastName: new FormControl ('', [Validators.required, Validators.minLength(2)]),
    cardNumber: new FormControl('',[Validators.required, Validators.minLength(3)]),
    birthDate: new FormControl('',[Validators.required, Validators.required]),
    age: new FormControl('',[Validators.required, Validators.required]),
    citizenship: new FormControl('',[Validators.required, Validators.minLength(3)]),
  })
}

initOrder(): void {
  const userLogin=this.userService.getUser().login;
  const personalData=this.userForm.getRawValue();
  const postObj = {
    userLogin,
    tourId: this.tourId,
    personalData: [personalData]
  }
  this.tourService.postOrder(postObj).subscribe()
}

}
