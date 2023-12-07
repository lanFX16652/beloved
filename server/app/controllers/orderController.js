const Product = require("../models/productModel");

exports.createOrder = async (req, res, next) => {
    try {
        const { fullname, email, phoneNumber, address, cart, totalPrice } = req.body;

        // Tìm trong Product Database những sản phẩm có trong giỏ hàng của người dùng
        const itemsCheckStock = await Promise.all(cart.map(productOrder => {
            return Product.findById(productOrder.product._id)
        }))

        // Check những sản phẩm hết hàng
        const itemsOutOfStock = itemsCheckStock.map(product => {
            if (product.quantity === 0) {
                return {
                    productName: product.name
                }
            }
        }).filter(Boolean)

        if (itemsOutOfStock.length) {
            return res.json({
                message: "Order have product out of stock",
                products: itemsOutOfStock
            })
        }

        // Tạo new order sau khi check số lượng từng sản phẩm của client mua với số lượng từng sản phẩm trong kho
        const cartToProcess = []

        cart?.forEach(cartItem => {
            for (const productInDB of itemsCheckStock) {
                if (productInDB._id.toString() === cartItem.product._id) {
                    cartToProcess.push({
                        product: productInDB,
                        quantity: productInDB.quantity < cartItem.quantity ? productInDB.quantity : cartItem.quantity
                    })
                }
            }
        })

        if (cartToProcess.length) {
            const newOrder = await Order.create({
                fullname: fullname,
                email: email,
                phoneNumber: phoneNumber,
                address: address,
                cart: cartToProcess,
                totalPrice: totalPrice,
                userId: req.user._id,
            })

            // Xử lý lại số lượng trong kho và delete cart sau khi tạo order
            await Promise.all(cartToProcess.map(p => Product.findByIdAndUpdate(p.product._id, {
                quantity: p.product.quantity - p.quantity
            })))

            await cart.deleteOne({ userId: req.user._id });

            // Trả về dữ liệu
            const order = newOrder.toObject();
            return res.status(200).json({
                order: {
                    ...order,
                    status: "Waiting for pay",
                    delivery: "Waiting for processing"
                }
            })
        } else {
            res.status(400).json({ message: "Your cart is empty" })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "server error " })
    }
}