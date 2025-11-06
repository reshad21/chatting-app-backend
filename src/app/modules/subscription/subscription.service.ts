import QueryBuilder from '../../builder/QueryBuilder';
import Subscription from './subscription.model';

const createSubscriptionIntoDB = async (payload: any) => {
    // Create the review
    const result = await Subscription.create(payload);
    return result;
};


const getSubscriptionIntoDB = async (query: Record<string, unknown>) => {

    const subscriptionSearchableFields = ['email'];

    const subscriptionQuery = new QueryBuilder(Subscription.find(), query).search(subscriptionSearchableFields).filter().sort().paginate().fields();

    const result = await subscriptionQuery.modelQuery;
    const meta = await subscriptionQuery.countTotal();

    return {
        meta,
        result,
    };
}


export const SubscriptionServices = {
    createSubscriptionIntoDB,
    getSubscriptionIntoDB,
};
