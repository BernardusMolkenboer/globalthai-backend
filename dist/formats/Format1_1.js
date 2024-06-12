"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Format1_1 = void 0;
const Format_1 = require("../Format");
class Format1_1 extends Format_1.Format {
    constructor() {
        super();
        this.shipmentFields = {
            0: { column: 'reference1', type: 'text' },
            1: { column: 'reference2', type: 'text' },
            2: { column: 'reference3', type: 'text' },
            3: { column: 'container_label', type: 'text' },
            4: { column: 'bag_label', type: 'text' },
            5: { column: 'sub_client_code', type: 'text' },
            6: { column: 'shipper_name', type: 'text' },
            7: { column: 'shipper_address1', type: 'text' },
            8: { column: 'shipper_address2', type: 'text' },
            9: { column: 'shipper_address3', type: 'text' },
            10: { column: 'shipper_city', type: 'text' },
            11: { column: 'shipper_state', type: 'text' },
            12: { column: 'shipper_postcode', type: 'text' },
            13: { column: 'shipper_country_code', type: 'text' },
            14: { column: 'ioss', type: 'text' },
            15: { column: 'consignee', type: 'text' },
            16: { column: 'consignee_address1', type: 'text' },
            17: { column: 'consignee_address2', type: 'text' },
            18: { column: 'consignee_address3', type: 'text' },
            19: { column: 'consignee_city', type: 'text' },
            20: { column: 'consignee_state', type: 'text' },
            21: { column: 'consignee_postcode', type: 'text' },
            22: { column: 'consignee_country_code', type: 'text' },
            23: { column: 'consignee_email', type: 'text' },
            24: { column: 'consignee_phone', type: 'text' },
            25: { column: 'eori', type: 'text' },
            31: { column: 'total_weight', type: 'float?' },
            32: { column: 'total_value', type: 'float?' },
            33: { column: 'weight_uom', type: 'uom' },
            34: { column: 'currency', type: 'currency' },
            35: { column: 'incoterms', type: 'incoterm' },
            36: { column: 'shipping_rate', type: 'float' },
        };
        this.shipmentItemFields = {
            26: { column: 'quantity', type: 'int' },
            27: { column: 'weight', type: 'float?' },
            28: { column: 'value', type: 'float?' },
            29: { column: 'line_weight', type: 'float?' },
            30: { column: 'line_value', type: 'float?' },
            37: { column: 'description', type: 'text' },
            38: { column: 'taric_code', type: 'text' },
            39: { column: 'sku', type: 'text' },
            40: { column: 'country_of_origin', type: 'text' },
            41: { column: 'weblink', type: 'text' },
            42: { column: 'notes', type: 'text' },
        };
        this.version = 1.1;
    }
    buildData(csvArray, skipHeader = true) {
        let rowIndex = skipHeader ? 1 : 0, data = {};
        for (; rowIndex < csvArray.length; rowIndex++) {
            let line = csvArray[rowIndex];
            if (line.length !== Format1_1.numberOfFields) {
                this.addError(rowIndex, "Incorrect number of fields.", line);
                continue;
            }
            let reference1, colIndex, columnData;
            try {
                reference1 = "" + Format_1.Format.cleanValue(line[0], this.shipmentFields[0].type);
            }
            catch (e) {
                this.addError(rowIndex, "Invalid Reference1.", reference1);
                continue;
            }
            if (reference1 in data) {
                for (colIndex in this.shipmentFields) {
                    columnData = this.shipmentFields[colIndex];
                    try {
                        let newValue = Format_1.Format.cleanValue(line[colIndex], columnData.type);
                        if (data[reference1][columnData.column] !== newValue) {
                            let context = { currentValue: data[reference1][columnData.column] };
                            context['newValue'] = newValue;
                            this.addError(rowIndex, "Parcel level values should match.", context);
                            continue;
                        }
                    }
                    catch (e) {
                        let context = {};
                        context[columnData.column] = line[colIndex];
                        this.addError(rowIndex, "Invalid Field.", context);
                        continue;
                    }
                }
            }
            else {
                data[reference1] = { items: [] };
                for (colIndex in this.shipmentFields) {
                    columnData = this.shipmentFields[colIndex];
                    try {
                        data[reference1][columnData.column] = Format_1.Format.cleanValue(line[colIndex], columnData.type);
                    }
                    catch (e) {
                        let context = {};
                        context[columnData.column] = line[colIndex];
                        this.addError(rowIndex, "Invalid Field.", context);
                        continue;
                    }
                }
            }
            let item = { article_number: 1 + data[reference1].items.length };
            for (colIndex in this.shipmentItemFields) {
                columnData = this.shipmentItemFields[colIndex];
                try {
                    item[columnData.column] = Format_1.Format.cleanValue(line[colIndex], columnData.type);
                }
                catch (e) {
                    let context = {};
                    context[columnData.column] = line[colIndex];
                    this.addError(rowIndex, "Invalid Field.", context);
                    continue;
                }
            }
            data[reference1].items.push(item);
        }
        this.data = data;
        return this.data;
    }
}
exports.Format1_1 = Format1_1;
Format1_1.numberOfFields = 43;
