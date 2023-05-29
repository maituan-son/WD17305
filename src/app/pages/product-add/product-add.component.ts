import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/sevices/product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent {
  productForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    price: [0]
  })

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
    ) { }

    onHandleSubmit() {
      const product:IProduct = {
        name: this.productForm.value.name || '',
        price: this.productForm.value.price || 0
      }
      this.productService.addProduct(product).subscribe(data => {
        console.log('product', product);
        this.router.navigate(['/admin/product']);

      }

      )
    }
}
