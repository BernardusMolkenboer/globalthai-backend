"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProperty = exports.updateProperty = exports.createProperty = exports.getProperty = exports.getProperties = void 0;
const Property_1 = require("../models/Property");
const getProperties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const properties = yield Property_1.Property.getAll();
        res.json(properties);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch properties" });
    }
});
exports.getProperties = getProperties;
const getProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const property = yield Property_1.Property.getById(Number(id));
        if (property) {
            res.json(property);
        }
        else {
            res.status(404).json({ error: "Property not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch property" });
    }
});
exports.getProperty = getProperty;
const createProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const propertyId = yield Property_1.Property.create(data);
        res.status(201).json({ id: propertyId });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create property" });
    }
});
exports.createProperty = createProperty;
const updateProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    try {
        const propertyId = yield Property_1.Property.update(Number(id), data);
        res.json({ id: propertyId });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update property" });
    }
});
exports.updateProperty = updateProperty;
const deleteProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield Property_1.Property.delete(Number(id));
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete property" });
    }
});
exports.deleteProperty = deleteProperty;
