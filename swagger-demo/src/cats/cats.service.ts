import { Injectable } from '@nestjs/common';
import { Cat } from './cat';
import { json } from 'express';

@Injectable()
export class CatsService {
  cats: Array<Cat> = [{ id: 1, name: 'Cat'}];

  getCats() {
    return this.cats;
  }

  createCat(cat: Cat) {
    this.cats = [ ...this.cats, {...cat}];
    return this.cats;
  }
}