import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {v4 as uuid} from 'uuid';

@Injectable()
export class ProductsService {
  private products: CreateProductDto[] = [
    {
        productId: uuid(),
        productName: "Sabritas normal",
        price: 29,
        countSeal: 3,
        provider: uuid(),
    },
    {
        productId: uuid(),
        productName: "Coca cola 600ml",
        price: 40,
        countSeal: 2,
        provider: uuid(),
    },
    {
        productId: uuid(),
        productName: "Chetos",
        price: 15,
        countSeal: 5,
        provider: uuid(),
    },
  ]
  create(createProductDto: CreateProductDto) {
    createProductDto.productId = uuid();
    this.products.push(createProductDto);
    return createProductDto;
  }
  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const productFound = this.products.filter((products)=>products.productId ===id)[0];
    if(!productFound) throw new NotFoundException()
    return productFound
  }
  findByProvider(id: string){
    const productFound = this.products.filter((products)=>products.provider === id);
    if(productFound.length===0) throw new NotFoundException()
      return productFound
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    let product = this.findOne(id)
    return {
      ...product,
      ...updateProductDto
    }
  }

  remove(id: string) {
    const {productId} = this.findOne(id)
    this.products = this.products.filter((product)=> product.productId !== productId)
    return this.products
  }
}
