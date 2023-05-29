import { Component } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/sevices/product.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
products!: IProduct[];
myName: string = '';
status: boolean = false;
constructor(private productService: ProductService) { 
  this.productService.getProducts().subscribe(data => {
    this.products = data
  })
}

setValue(e: any) {
  this.myName = e.target.value;
}
toggle() {
  this.status = !this.status; 
}

removeItem(id: number) {
  this.productService.deleteProduct(id).subscribe(() => {
    this.products = this.products.filter(product => product.id !== id)  
  })
  // this.onRemove.emit(id);
}
}
