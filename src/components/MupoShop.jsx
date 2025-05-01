import React from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const Shop = ({ items, coins, onBuy, onClose, ownedItems }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center">
                        <ShoppingBag className="w-6 h-6 text-[#fbb751] mr-2" />
                        <h2 className="text-xl font-bold text-gray-800">Mupo Shop!</h2>
                    </div>
                    <div className="flex items-center">
                        <span className="text-[#1e1f52] font-medium mr-4">{coins} Coins</span>
                        <button
                            onClick={onClose}
                            className="p-1 rounded-full hover:bg-gray-100"
                        >
                            <X className="w-6 h-6 text-gray-500" />
                        </button>
                    </div>
                </div>

                <div className="overflow-y-auto max-h-96 p-4">
                    <div className="grid grid-cols-2 gap-4">
                        {items.map(item => {
                            const isOwned = ownedItems.includes(item.id);
                            const canBuy = coins >= item.price;

                            return (
                                <motion.div
                                    key={item.id}
                                    whileHover={{ scale: 1.03 }}
                                    className={`bg-gray-50 rounded-xl overflow-hidden shadow-md ${!canBuy && !isOwned ? 'opacity-60' : ''
                                        }`}
                                >
                                    <div className="h-40 bg-blue-50">
                                        <img
                                            src={`/items/${item.url}`}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-3">
                                        <h3 className="font-medium text-gray-800">{item.name}</h3>
                                        <div className="flex justify-between items-center mt-2">
                                            {!isOwned ? (
                                                <>
                                                    <span className="text-[#1e1f52] font-bold">{item.price} coins</span>
                                                    <button
                                                        onClick={() => canBuy && onBuy(item)}
                                                        disabled={!canBuy}
                                                        className={`px-3 py-1 rounded-lg text-sm font-medium ${canBuy
                                                                ? 'bg-[#ffc163] text-white hover:bg-[#ffb342]'
                                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                            }`}
                                                    >
                                                        Buy
                                                    </button>
                                                </>
                                            ) : (
                                                <span className="text-green-600 font-medium">Owned</span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

Shop.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        imageUrl: PropTypes.string.isRequired,
        category: PropTypes.oneOf(['hat', 'glasses']).isRequired
    })).isRequired,
    coins: PropTypes.number.isRequired,
    onBuy: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    ownedItems: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Shop;