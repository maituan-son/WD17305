import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/sevices/product.service';
import{ Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent {
  product!: IProduct;
  productForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    price: [0]
  })

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: ActivatedRoute,
    private route2: Router
  ) {
    this.router.paramMap.subscribe((params => {
      const id = Number(params.get('id'));
      this.productService.getProduct(id).subscribe(data => {
        this.product = data;

        this.productForm.patchValue({
          name: data.name,
          price: data.price
        })
      }, error => console.log(error.message))
    }))
  }
  onHandleSubmit() {
    if (this.productForm.valid) {
      const product: IProduct = {
        name: this.productForm.value.name || "",
        price: this.productForm.value.price || 0
      }

      this.productService.updateProduct(product).subscribe((product) => {
        console.log('product', product);
        this.route2.navigate(['/admin/product']);
      })
    }
  }
}
