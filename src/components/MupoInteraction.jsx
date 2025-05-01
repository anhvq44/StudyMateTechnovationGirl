import React from 'react';
import { Heart, Utensils, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const InteractionPanel = ({ onPet, onFeed, onShop, coins }) => {
    return (
        <div className="w-full max-w-md mx-auto mb-3">
            <div className="mb-4 flex justify-center">
                <div className="px-4 py-2 bg-white rounded-full shadow-md">
                    <span className="text-lg font-medium text-[#1c1f52]">
                        {coins} Coins
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
                <motion.button
                    className="flex flex-col items-center justify-center p-4 bg-pink-50 rounded-xl shadow-md hover:bg-pink-200 transition-colors"
                    onClick={onPet}
                    whileTap={{ scale: 0.95 }}
                >
                    <Heart className="w-8 h-8 text-pink-500 mb-2" />
                    <span className="text-sm font-medium text-pink-700">Pet</span>
                </motion.button>

                <motion.button
                    className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-xl shadow-md hover:bg-blue-200 transition-colors"
                    onClick={onFeed}
                    whileTap={{ scale: 0.95 }}
                >
                    <Utensils className="w-8 h-8 text-blue-500 mb-2" />
                    <span className="text-sm font-medium text-blue-700">Feed</span>
                </motion.button>

                <motion.button
                    className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-md hover:bg-gray-200 transition-colors"
                    onClick={onShop}
                    whileTap={{ scale: 0.95 }}
                >
                    <ShoppingBag className="w-8 h-8 text-[#fbb751] mb-2" />
                    <span className="text-sm font-medium text-[#fbb751]">Shop</span>
                </motion.button>
            </div>
        </div>
    );
};

InteractionPanel.propTypes = {
    onPet: PropTypes.func.isRequired,
    onFeed: PropTypes.func.isRequired,
    onShop: PropTypes.func.isRequired,
    coins: PropTypes.number.isRequired
};

export default InteractionPanel;