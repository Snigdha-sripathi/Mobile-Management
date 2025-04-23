import { Component, OnInit } from '@angular/core';
import { MobileService } from './mobile.service';
import { EditComponent } from './edit/edit.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, EditComponent, ReactiveFormsModule],
})
export class AppComponent implements OnInit {
  mobiles: any[] = [];
  showForm: boolean = false;
  mobileToEdit: any = null;

  constructor(private mobileService: MobileService) {}

  ngOnInit(): void {
    this.loadMobiles();  // Make sure to load the mobiles when the component loads
  }

  loadMobiles(): void {
    this.mobileService.getMobiles().subscribe(
      (data) => {
        console.log('Received data from backend:', data);  // Log received data to verify
        if (data && Array.isArray(data)) {
          this.mobiles = data;  // Assign the data to the mobiles array
        } else {
          console.error('Data received is not in the expected format.');
        }
      },
      (error) => {
        console.error('Error loading mobiles:', error);  // Log if error occurs while fetching
      }
    );
  }

  saveMobile(mobile: any): void {
    console.log('Saving mobile:', mobile);  // Log mobile data
    if (mobile.id) {
      this.mobileService.updateMobile(mobile).subscribe(
        (updated) => {
          console.log('Updated mobile:', updated);  // Log the updated mobile
          const index = this.mobiles.findIndex((m) => m.id === mobile.id);
          if (index !== -1) {
            this.mobiles[index] = updated;  // Update the existing mobile in the list
          }
          this.showForm = false;
        },
        (error) => {
          console.error('Error updating mobile:', error);
        }
      );
    } else {
      this.mobileService.addMobile(mobile).subscribe(
        (newMobile) => {
          console.log('Added new mobile:', newMobile);  // Log the newly added mobile
          this.mobiles.push(newMobile);  // Add the new mobile to the list
          this.showForm = false;
        },
        (error) => {
          console.error('Error adding mobile:', error);
        }
      );
    }
  }

  deleteMobile(id: number): void {
    this.mobileService.deleteMobile(id).subscribe(
      () => {
        this.mobiles = this.mobiles.filter((m) => m.id !== id);  // Remove deleted mobile from the list
      },
      (error) => {
        console.error('Error deleting mobile:', error);
      }
    );
  }

  editMobile(mobile: any): void {
    this.mobileToEdit = { ...mobile };  // Make a copy to avoid modifying the original
    this.showForm = true;
  }

  addMobile(): void {
    this.mobileToEdit = null;  // Clear the mobile data
    this.showForm = true;
  }

  cancelForm(): void {
    this.showForm = false;  // Close the form
    this.mobileToEdit = null;  // Reset form data
  }
}
