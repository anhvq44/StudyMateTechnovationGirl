import React from 'react';
import { Package, X } from 'lucide-react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const Inventory = ({ items, onEquip, onClose, equippedItems }) => {

    if (items.length === 0) {
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
                            <Package className="w-6 h-6 text-blue-600 mr-2" />
                            <h2 className="text-xl font-bold text-gray-800">Inventory</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1 rounded-full hover:bg-gray-100"
                        >
                            <X className="w-6 h-6 text-gray-500" />
                        </button>
                    </div>

                    <div className="p-8 text-center">
                        <p className="text-gray-600">You don't have any items yet. Visit the shop to buy some!</p>
                    </div>
                </motion.div>
            </motion.div>
        );
    }

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
                        <Package className="w-6 h-6 text-blue-600 mr-2" />
                        <h2 className="text-xl font-bold text-gray-800">Inventory</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-100"
                    >
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                <div className="overflow-y-auto max-h-96 p-4">
                    <div className="grid grid-cols-2 gap-4">
                        {items.map(item => {
                            const isEquipped = equippedItems[item.type] === item.id;
                            return (
                                <motion.div
                                    key={item.id}
                                    whileHover={{ scale: 1.03 }}
                                    className={`bg-gray-50 rounded-xl overflow-hidden shadow-md ${isEquipped ? 'ring-2 ring-blue-500' : ''
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
                                            <span className="text-gray-500 capitalize">{item.category}</span>
                                            <button
                                                onClick={() => onEquip(item)}
                                                className={`px-3 py-1 rounded-lg text-sm font-medium ${isEquipped
                                                        ? 'bg-gray-200 text-gray-800'
                                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                                    }`}
                                            >
                                                {isEquipped ? 'Unequip' : 'Equip'}
                                            </button>
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

Inventory.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        category: PropTypes.oneOf(['outfit', 'accessory', 'background']).isRequired
    })).isRequired,
    onEquip: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    equippedItems: PropTypes.objectOf(PropTypes.string)
};

export default Inventory;