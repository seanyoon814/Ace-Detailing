import { createSelector, createEntityAdapter} from '@reduxjs/toolkit';
import {apislice} from '';

// ids used to get data from entities
const vehiclesAdapter = createEntityAdapter();
const initialState = vehiclesAdapter.getInitialState();

export const vehiclesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllVehicles: builder.query({
            query: () =>  '/vehicles/',
            validateStatus: (response) => {return response.status === 200 && !result.isError},
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadVehicles = responseData.map(vehicle => {
                    vehicle.id = vehicle._id;
                    return vehicle;
                });
                return vehiclesAdapter.setAll(initialState, loadVehicles);
            },
            providedTags:(result, error,arg) => {
                if(result?.ids){
                    return [{type: 'Vehicle', id: 'LIST'},
                            ...result.ids.map(id => ({type: 'Vehicle', id}))];
                } else return [{type: 'Vehicle', id: 'LIST'}];
            }
            
        })
    })
})

export const {
    useGetAllVehiclesQuery
} = vehiclesApiSlice;

// return the query result object
export const selectVehicleResult = vehiclesApiSlice.endpoints.getAllVehicles.select();

const selectVehiclesData = createSelector(
    selectVehicleResult,
    vehicles => vehiclesAdapter.getSelectors().selectAll(vehicles)
);

export const {
    selectAll: selectAllVehicles,
    selectById: selectVehicleById,
    selectIds: selectVehicleIds,
} = vehiclesAdapter.getSelectors(state => selectVehiclesData(state) ?? initialState);

