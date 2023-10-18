import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecordsIlneDto } from './dto/create-records_ilne.dto';
import { UpdateRecordsIlneDto } from './dto/update-records_ilne.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RecordsIlne, RecordsIlneDocument } from './schemas/records_ilne.schema';
import { Model } from 'mongoose';
import { Animal, AnimalDocument } from '../animals/schemas/animal.schema';
import { Worker, WorkerDocument } from '../worker/schemas/worker.schema';

@Injectable()
export class RecordsIlnesService {

  constructor(
    @InjectModel(RecordsIlne.name) private readonly recordsIlneModel: Model<RecordsIlneDocument>,
    @InjectModel(Animal.name) private readonly animalModel: Model<AnimalDocument>,
    @InjectModel(Worker.name) private readonly workerModel: Model<WorkerDocument>, 
    ) {}

  async create(createRecordsIlneDto: CreateRecordsIlneDto) {
    const animal = await this.animalModel.findOne(createRecordsIlneDto.animal_id);
    const worker = await this.workerModel.findOne(createRecordsIlneDto.worker_id);
    if(!animal && !worker) {
      throw new NotFoundException("Worker or Animal not found")
    }    
    return this.recordsIlneModel.create(createRecordsIlneDto)
  }

  findAll() {
    return this.recordsIlneModel.find();
  }

  findOne(id: string) {
    return this.recordsIlneModel.findById(id);
  }

  update(id: string, updateRecordsIlneDto: UpdateRecordsIlneDto) {
    return this.recordsIlneModel.findByIdAndUpdate(id, updateRecordsIlneDto);
  }

  remove(id: string) {
    return this.recordsIlneModel.findByIdAndDelete(id)
  }
}
