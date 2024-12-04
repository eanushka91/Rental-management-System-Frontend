import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-page',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './item-page.component.html',
  styleUrl: './item-page.component.css'
})
export class ItemPageComponent {
  public item: any = {
    itemid: "",
    itemname:"",
    rentalperday: "",
    fineperday: "",
    availability: ""
  };
  public rent: any = {
    rentalid: "",
    rentaldate:"",
    returndate: "",
    duedate: "",
    totalcost: ""
  };

  public itemList: any = [];
  public searchId: string = '';
  public searchResult: any = null;
 
  

  public showAddModal: boolean = false;
  public showAddRentModal: boolean = false;
  public showUpdateModal: boolean = false;
  public showSearchModal: boolean = false;

  constructor(private http: HttpClient) {
    this.loadcard();
  }

  loadcard() {
    this.http.get("http://localhost:8080/item/get-all") .subscribe(data => {
      console.log(data);
      this.itemList = data;
    });
  }

  public addItem() {
    this.http.post("http://localhost:8080/item/add-item", this.item).subscribe((data) => {
      alert("Item Added!!!!");
      this.loadcard();
      this.showAddModal = false; 
    });
  }

  public addRent() {
    this.http.post("http://localhost:8080/rental/add-rental", this.item).subscribe((data) => {
      alert("Rent Added!!!!");
      this.showAddRentModal = false; 
    });
  }

  deleteItemById(id: any) {
    console.log(id);
    this.http.delete(`http://localhost:8080/item/delete-by-id/${id}`).subscribe(data => {
      alert("Item deleted !!!!");
      this.loadcard();
    });
  }


  public itemTemp:any={}
  updateItem(item:any){
    console.log(item);
    this.itemTemp=item;
    this.showUpdateModal = true;  
    
  }

  saveItem() {
    this.http.put("http://localhost:8080/item/update-item", this.itemTemp).subscribe(data => {
      alert("Item Updated!!!!!");
      this.loadcard();
      this.showUpdateModal = false; 
    });
  }

  searchById(id: any) {
    this.http.get(`http://localhost:8080/item/search-by-id/${id}`).subscribe((data: any) => {
      if (data) {
        console.log(data);
        this.searchResult = data;
        this.showSearchModal = true;
      } else {
        alert("Item not found!");
        this.searchResult = null;
      }
    }, (error) => {
      alert("Error occurred while searching for Item!");
      this.searchResult = null;
    });
  }

}
