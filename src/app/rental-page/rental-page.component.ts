import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rental-page',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './rental-page.component.html',
  styleUrl: './rental-page.component.css'
})
export class RentalPageComponent {
  public rental: any = {
    rentalid: "",
    rentaldate:"",
    returndate: "",
    duedate: "",
    totalcost: ""
  };

  public rentList: any = [];
  public searchId: string = '';
  public searchResult: any = null;
 
  

  public showAddModal: boolean = false;
  public showUpdateModal: boolean = false;
  public showSearchModal: boolean = false;

  constructor(private http: HttpClient) {
    this.loadcard();
  }

  loadcard() {
    this.http.get("http://localhost:8080/rental/get-all") .subscribe(data => {
      console.log(data);
      this.rentList = data;
    });
  }

  public addRent() {
    this.http.post("http://localhost:8080/rental/add-rental", this.rental).subscribe((data) => {
      alert("Rental Added!!!!");
      this.loadcard();
      this.showAddModal = false; 
    });
  }

  deleteRentById(id: any) {
    console.log(id);
    this.http.delete(`http://localhost:8080/rental/delete-by-id/${id}`).subscribe(data => {
      alert("Rental deleted !!!!");
      this.loadcard();
    });
  }


  public rentTemp:any={}
  updateRent(rent:any){
    console.log(rent);
    this.rentTemp=rent;
    this.showUpdateModal = true;  
    
  }

  saveRent() {
    this.http.put("http://localhost:8080/rantal/update-rental", this.rentTemp).subscribe(data => {
      alert("Item Updated!!!!!");
      this.loadcard();
      this.showUpdateModal = false; 
    });
  }

  searchById(id: any) {
    this.http.get(`http://localhost:8080/rental/search-by-id/${id}`).subscribe((data: any) => {
      if (data) {
        console.log(data);
        this.searchResult = data;
        this.showSearchModal = true;
      } else {
        alert("Rental not found!");
        this.searchResult = null;
      }
    }, (error) => {
      alert("Error occurred while searching for Rental!");
      this.searchResult = null;
    });
  }
}
