import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Breed, BreedDocument } from 'src/schemas/breed.schema';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';

@Injectable()
export class BreedsService {
  constructor(
    @InjectModel(Breed.name) private breedModel: Model<BreedDocument>,
  ) {}
  create(createBreedDto: CreateBreedDto): Promise<Breed> {
    const createdBreed = new this.breedModel(createBreedDto); //createBreedDto is the req.body
    return createdBreed.save();
  }

  findAll() {
    return this.breedModel.find();
  }

  findOne(name: string) {
    return this.breedModel.findOne({ name });
  }

  update(name: string, updateBreedDto: UpdateBreedDto) {
    return this.breedModel.updateOne({ name }, { $set: { ...updateBreedDto } });
  }

  remove(name: string) {
    return this.breedModel.deleteOne({ name });
  }
}
