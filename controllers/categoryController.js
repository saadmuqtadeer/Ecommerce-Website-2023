import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
import { get } from "mongoose";

// create category
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(401).send({ message: "Name is required" });
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory)
      return res
        .status(200)
        .send({ success: true, message: "Category Already Exists" });
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "New Category Created",
      category
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Catergory Controller",
    });
  }
};

// update Category
export const updateCategoryController = async (req, res)=>{
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, {name, slug:slugify(name)}, {new:true})
        res.status(201).send({
          success: true,
          message: "Category Updated Successfully",
          category
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error while updating category",
        });
      }
}

// get all categories
export const categoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
          success: true,
          message: "All Category List",
          Total_Categories: category.length,
          category
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error in All category",
        });
      }
}

// get Single category
export const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({slug: req.params.slug})
        res.status(200).send({
          success: true,
          message: "Got Single Category Successfully",
          category
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error while getting  Single category",
        });
      }
}

// delete category
export const deleteSingleCategory = async (req, res) => {
    try {
        const id = req.params.id;
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
          success: true,
          message: "Deleted Category Successfully",
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error while deleting  Single category",
          error,
        });
    }

}
