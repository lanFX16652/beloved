const Product = require("../models/productModel.js");
const Media = require("../models/mediaModel.js")

exports.addNewProduct = async (req, res, next) => {
    try {
        console.log(req.body);
        const name = req.body.name;
        const brand = req.body.brand;
        const price = +req.body.price;
        const quantity = +req.body.quantity;
        const category = req.body.category;
        const description = req.body.description;
        const mediaIds = req.body.mediaIds;
        const images = await Media.find({
            _id: {
                $in: mediaIds
            }
        })
        console.log("images:", images)
        const imageUrl = images.map((image) => `http://localhost:5000/upload/${image.name}`)

        //create product
        const newProduct = new Product({
            name: name,
            brand: brand,
            price: price,
            category: category,
            quantity: quantity,
            description: description,
            images: imageUrl,
        })
        const product = await newProduct.save();
        return res.status(201).json({ product: product })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" })
    }
}