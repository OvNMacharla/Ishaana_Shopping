const Items = require('../../models/items');
const CartItems = require('../../models/cart');
const Category = require('../../models/category')
const cartItem = async itemId => {
    try {
        const item = await Items.findById(itemId);
        return item;
    }
    catch (err) {
        throw err;
    }
}
const categoryBind = async id => {
    try {
        const cat = await Category.findById(id);
        return cat;
    }
    catch (err) {
        throw err;
    }
}
module.exports = {
    addCategory: async (args, req) => {
        console.log('categoryInput:', args.categoryInput);
        try {
            const iscat = await Category.findOne({ categoryType: args.categoryInput.categoryType })
            if (iscat) {
                throw new Error('Category Type alredy exists');
            }
            const cat = new Category({
                categoryType: args.categoryInput.categoryType
            })
            const res = await cat.save();
            console.log(res, "save")
            return res
        }
        catch (err) {
            throw err;
        }
    },
    addItems: async (args, req) => {
        try {
            const item = await Items.findOne({ itemName: args.items.itemName })
            if (!item) {
                const mainItem = new Items({
                    itemName: args.items.itemName,
                    itemDescription: args.items.itemDescription,
                    price: args.items.price,
                    itemImage: args.items.itemImage,
                    category: args.categoryId
                })
                const returnItem = mainItem.save();
                return returnItem;
            }
            else {
                throw new Error('Item Alredy Found')
            }
        } catch (err) {
            throw new Error(`Error adding items: ${err.message}`);
        }
    },
    items: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated');
        }
        try {
            const items = await Items.find();
            return items.map(item => {
                return {
                    itemName: item.itemName,
                    itemDescription: item.itemDescription,
                    price: item.price,
                    itemImage: item.itemImage,
                    category: categoryBind.bind(this, item.category)
                };
            })
        }
        catch (err) {
            throw err;
        }
    },
    cartItems: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated');
        }
        try {
            const cart = await CartItems.find({ user: req.userId });
            return cart.map(item => {
                return {
                    item: cartItem.bind(this, item.item),
                    quantity: item.quantity
                };
            });
        }
        catch (err) {
            throw err;
        }
    },
    addToCart: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated');
        }
        try {
            const cart = await CartItems.findOne({ user: req.userId, item: args.itemId });
            const itemDetails = await Items.findOne({ _id: args.itemId });
            if (!cart) {
                const cart = new CartItems({ user: req.userId, item: args.itemId, quantity: 1 });
                const saveCart = await cart.save();

                if (!itemDetails) {
                    throw new Error('Item not found');
                }

                return {
                    itemName: itemDetails.itemName,
                    itemDescription: itemDetails.itemDescription,
                    price: itemDetails.price,
                    itemImage: itemDetails.itemImage,
                    quantity: saveCart.quantity
                };
            } else {
                cart.quantity += 1;
                const savCart = await cart.save();
                return {
                    itemName: itemDetails.itemName,
                    itemDescription: itemDetails.itemDescription,
                    price: itemDetails.price,
                    itemImage: itemDetails.itemImage,
                    quantity: savCart.quantity
                };
            }
        } catch (err) {
            throw new Error(`Error adding item to cart: ${err.message}`);
        }
    },
    categories: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated');
        }
        try {
            const category = await Category.find();
            return category;
        }
        catch (err) {
            throw err;
        }
    }
    ,
    removeFromCart: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated');
        }
        try {
            const cartItem = await CartItems.findOne({ user: req.userId, item: args.itemId });
            const itemDetails = await Items.findOne({ _id: args.itemId });
            if (!cartItem) {
                throw new Error('Item Not Found')
            } else {
                if (cartItem.quantity == 1) {
                    await cartItem.deleteOne(cartItem._id);
                    return {
                        itemName: itemDetails.itemName,
                        itemDescription: itemDetails.itemDescription,
                        price: itemDetails.price,
                        itemImage: itemDetails.itemImage,
                        quantity: 0
                    };
                } else {
                    cartItem.quantity -= 1;
                    const item = await cartItem.save();
                    return {
                        itemName: itemDetails.itemName,
                        itemDescription: itemDetails.itemDescription,
                        price: itemDetails.price,
                        itemImage: itemDetails.itemImage,
                        quantity: item.quantity
                    };;
                }
            }

        } catch (err) {
            throw new Error(`Error removing item from cart: ${err.message}`);
        }
    }
}