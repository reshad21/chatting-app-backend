import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TBike } from './bike.interface';
import { Bike } from './bike.model';

const createBikeIntoDB = async (payload: TBike) => {
    // Check if a bike with the same name and model already exists
    const existingBike = await Bike.findOne({
        name: payload.name,
        model: payload.model,
        year: payload.year,
    });

    if (existingBike) {
        throw new AppError(httpStatus.FORBIDDEN, "Bike with the same name, model, and year already exists!");
    }

    const result = await Bike.create(payload);
    return result;
};



const getSingleBikeIntoDB = async (id: string) => {
    const result = await Bike.findById(id).populate('reviews');
    return result;
}


const updateBikeIntoDB = async (payload: TBike, id: string) => {
    const result = await Bike.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
}

const deleteBikeFromDB = async (payload: TBike, id: string) => {
    const result = await Bike.findByIdAndDelete(id);
    return result;
}

const getAllBikeIntoDB = async (query: Record<string, unknown>) => {

    const bikeSearchableFields = ['name', 'model', 'brand', 'cc'];

    const bikeQuery = new QueryBuilder(Bike.find(), query).search(bikeSearchableFields).filter().sort().paginate().fields();

    const result = await bikeQuery.modelQuery;
    const meta = await bikeQuery.countTotal();

    return {
        meta,
        result,
    };
}

export const BikeServices = {
    createBikeIntoDB,
    getAllBikeIntoDB,
    getSingleBikeIntoDB,
    updateBikeIntoDB,
    deleteBikeFromDB
};
