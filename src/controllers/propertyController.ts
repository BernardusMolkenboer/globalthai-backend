import { Request, Response } from "express";
import { Property } from "../models/Property";

export const getProperties = async (req: Request, res: Response) => {
  try {
    const properties = await Property.getAll();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch properties" });
  }
};

export const getProperty = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const property = await Property.getById(Number(id));
    if (property) {
      res.json(property);
    } else {
      res.status(404).json({ error: "Property not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch property" });
  }
};

export const createProperty = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const propertyId = await Property.create(data);
    res.status(201).json({ id: propertyId });
  } catch (error) {
    res.status(500).json({ error: "Failed to create property" });
  }
};

export const updateProperty = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const propertyId = await Property.update(Number(id), data);
    res.json({ id: propertyId });
  } catch (error) {
    res.status(500).json({ error: "Failed to update property" });
  }
};

export const deleteProperty = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Property.delete(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete property" });
  }
};
