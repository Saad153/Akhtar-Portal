import moment from "moment";
function recordsReducer(state, action){
    switch (action.type) {

      case 'toggle': {
        return { ...state, [action.fieldName]: action.payload } 
      }
      case 'set': {
        return { ...state, ...action.payload }
      }
      default: return state 
    }
};

const initialState = {
  damcoData:[],
  nexusData:[]
};

const damcoDataFormatter = (data,set) => {
    let tempData = [
        ["PO#", "Plan-HOD", "Country", "Order Qty", "CARTON QTY", "GROSS WT", "CARTON CBM", "CARTON Type"]
    ]

    for(let i = 0; i < data.length ; i++){
        let tempArr = [
            data[i].po_number,
            data[i].plan_hod ? moment(data[i].plan_hod).format("DD-MMMM-YYYY") : "",
            data[i].country ? data[i].country : "",
            data[i].order_qty ? parseInt(data[i].order_qty) : "",
            data[i].carton_qty ? data[i].carton_qty : "",
            data[i].gross_weight ? data[i].gross_weight : "",
            data[i].carton_cbm ? data[i].carton_cbm : "",
            data[i].ctn_type ? data[i].ctn_type : "",
        ]
        tempData.push(tempArr)
    }   

    set({
        damcoData:tempData
    })
}

const nexusDataFormatter = (data,set) => {
    let tempData = [
        ["Invoice Number", "BL / Waybill#", "Select Carrier", "Updated Transload Location (US Only)", "Estimated Departure Date", "Equipment # Type", "Seal Number", "CTN QTY", "UNITS"]
    ]

    for(let i = 0; i < data.length ; i++){
        let tempArr = [
            data[i].invoive_number,
            data[i].bill_waybill ? data[i].plan_hod : "",
            data[i].carrier ? data[i].carrier : "",
            data[i].updated_transload_location_us_only ? parseInt(data[i].updated_transload_location_us_only) : "",
            data[i].estimated_departure_date ? moment(data[i].estimated_departure_date).format("YYYY-MM-DD") : "",
            data[i].equipment_number_type ? data[i].equipment_number_type : "",
            data[i].seal_number ? data[i].seal_number : "",
            data[i].ctn_qty ? data[i].ctn_qty : "",
            data[i].units ? data[i].units : "",
        ]
        tempData.push(tempArr)
    }   

    set({
        nexusData:tempData
    })
}

export {recordsReducer,initialState,damcoDataFormatter,nexusDataFormatter}