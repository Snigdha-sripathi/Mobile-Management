import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnChanges {
  @Input() mobileToEdit: any = null; 
  @Output() saveMobile = new EventEmitter<any>(); 

  mobileForm!: FormGroup;  

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();  
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mobileToEdit'] && this.mobileToEdit) {
      this.initializeForm();  
    }
  }

  initializeForm(): void {
    this.mobileForm = this.fb.group({
      id: [this.mobileToEdit ? this.mobileToEdit.id : null],
      name: [this.mobileToEdit ? this.mobileToEdit.name : '', [Validators.required, Validators.minLength(2)]],
      brand: [this.mobileToEdit ? this.mobileToEdit.brand : '', [Validators.required, Validators.minLength(2)]],
      price: [this.mobileToEdit ? this.mobileToEdit.price : null, [Validators.required, Validators.min(1)]],
      rating: [this.mobileToEdit ? this.mobileToEdit.rating : null, [Validators.required, Validators.min(1), Validators.max(5)]],
    });
  }

  onSubmit(): void {
    if (this.mobileForm.valid) {
      console.log('Form data before emit:', this.mobileForm.value); // Log the form data before emitting
      this.saveMobile.emit(this.mobileForm.value);  
      this.mobileForm.reset();  
    }
  }

  onCancel(): void {
    this.mobileForm.reset();  
    if (!this.mobileToEdit) {
      this.initializeForm();  
    }
  }
}
