import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct;
  products: IProduct[] = [];
  id: number;
  errorMessage: string;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService
              ) { }

  getProduct(id: number): IProduct[] {
    return this.products.filter((product: IProduct) => product.productId === id);
  }
    ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProducts().subscribe(
      products => {
          this.products = products;
          this.product = this.getProduct(id)[0];
      },
      error => this.errorMessage = <any>error
      );
  }
  onBack(): void {
    this.router.navigate(['/products']);
  }
}
