import React, { useEffect, useState, useRef } from "react";
import NavBar from "../components/NavBar";
import { Package } from "lucide-react";
import { supabase } from "../supabase_config";
import { AnimatePresence } from 'framer-motion';

import MupoEmotions from '../components/MupoEmotions';
import InteractionPanel from '../components/MupoInteraction';
import Shop from '../components/MupoShop';
import Inventory from '../components/MupoInventory';
import { useUser } from "../context/UserContext";
import getGreetingFromCheckin from "../utils/MupoGreeting";

function MupoPage() {
  const user = useUser()

  // Ref Mupo
  const mupoRef = useRef();

  // Inventory open
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);

  // Emotions and effects state
  const [emotion, setEmotion] = useState('default');

  // Fetch coins
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const fetchTodayCheckIn = async () => {
      const { data: daily_checkin, error } = await supabase
        .from('daily_checkin')
        .select('sleep_quality, productivity, id')
        .eq("recorded_date", today)
        .maybeSingle()

      const { data: checkin_emotion, error: error_emotion } = await supabase
        .from('checkin_emotions')
        .select('emotion')
        .eq('checkin_id', daily_checkin.id)

      if (daily_checkin && checkin_emotion) {
        const greeting = getGreetingFromCheckin({ checkin: daily_checkin, moodCheckin: checkin_emotion });
        setEmotion(greeting.emotion);
        if (greeting.quote) {
          mupoRef.current?.playQuote(`${greeting.quote}`);
        }
        if (greeting.effect) {
          mupoRef.current?.playEffect(greeting.effect);
        }
      }
    };

    fetchTodayCheckIn()
  }, [])

  useEffect(() => {

    // Fetch coins
    const fetchCoins = async () => {
      let { data: coins, error } = await supabase
        .from('users')
        .select('coins')
      setCoins(coins[0].coins)
    }
    fetchCoins()
  })

  // Shop
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [ownedItems, setOwnedItems] = useState([]);
  const [equippedItems, setEquippedItems] = useState({
    hat: null,
    glasses: null,
  });
  const [shopItems, setShopItems] = useState([{
    id: null,
    name: null,
    price: null,
    type: null,
    url: null
  }])

  const handleInventoryOpen = () => {
    setIsInventoryOpen(true);
  };

  const fetchShopItems = async () => {
    const { data, error } = await supabase.from('shop_items').select('*')
    if (data) setShopItems(data)
  };

  const fetchUserInventory = async () => {
    // Fetch user's inventory and equipped status
    const { data: user_inventory, error } = await supabase
      .from('user_inventory')
      .select('*, shop_items(*)')

    if (user_inventory) {
      setOwnedItems(user_inventory.map(item => item.item_id))
      const equipped = {}
      user_inventory.forEach(item => {
        if (item.equipped) {
          equipped[item.shop_items.type] = item.item_id
        }
      })
      setEquippedItems(equipped)
    }
  };

  const buyItem = async (item) => {

    // Insert into user_inventory
    const { data, error } = await supabase
      .from('user_inventory')
      .insert([
        {
          user_id: user?.id,
          item_id: item.id,
          equipped: false
        },
      ])
      .select()
  };

  const toggleEquipItem = async (item) => {
    const isCurrentlyEquipped = equippedItems[item.type] === item.id;
    const { data, error } = await supabase
      .from('user_inventory')
      .update({ equipped: !isCurrentlyEquipped })
      .eq('item_id', item.id)
  };

  // Load initial data
  useEffect(() => {
    fetchShopItems();
    fetchUserInventory();
  }, []);

  // Handle interactions
  const [isPetting, setIsPetting] = useState(false)
  const handlePet = async () => {
    setEmotion('default');
    await mupoRef.current.playEffect("hearts");
    await mupoRef.current.playQuote("i_love_you");
  };

  const handleFeed = async () => {
    setEmotion('star');
    await mupoRef.current.playEffect("hearts");
    await mupoRef.current.playQuote("u_happi_me_happi");
  };

  const handleShop = () => {
    setIsShopOpen(true);
  };

  const handleBuy = async (item) => {
    if (coins >= item.price && !ownedItems.includes(item.id)) {
      await setCoins(prev => prev - item.price);

      const { data, error } = await supabase
        .from('users')
        .update({ coins: (coins - item.price) })
        .eq('user_id', user?.id)
        .select()
      if (error) {
        console.log(error.message)
      }

      await buyItem(item);
      await fetchUserInventory(); // Refresh inventory

      // Make penguin happy
      setEmotion('star');

      // Return to default after a delay
      setTimeout(() => {
        setEmotion('default');
      }, 3000);
    }
  };

  const handleEquip = async (item) => {
    const isCurrentlyEquipped = equippedItems[item.type] === item.id;
    setEquippedItems(prev => ({
      ...prev,
      [item.type]: isCurrentlyEquipped ? null : item.id
    }));

    await toggleEquipItem(item);
    await fetchUserInventory();
  };

  // Get the current hat
  const getCurrentHat = () => {
    const hatId = equippedItems.hat;
    if (hatId) {
      const outfit = shopItems.find(item => item.id === hatId);
      return outfit?.url;
    }
    return undefined;
  };

  // Get the current glasses
  const getCurrentGlass = () => {
    const glassesId = equippedItems.glasses;
    if (glassesId) {
      const outfit = shopItems.find(item => item.id === glassesId);
      return outfit?.url;
    }
    return undefined;
  };

  // Get owned items for inventory
  const getOwnedItems = () => {
    return shopItems.filter(item => ownedItems.includes(item.id));
  };

  return (
    <>
      <NavBar></NavBar>
      <div className="ml-20 w-[calc(100%-5rem)] min-h-screen bg-gradient-to-b from-blue-100 to-yellow-100">
        <header className="bg-white backdrop-blur-sm shadow-md py-6 px-6 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#15163a]">Your little Mupo!</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={handleInventoryOpen}
                className="p-3 bg-[#32358b] rounded-xl hover:bg-[#272969] transition-colors"
              >
                <Package className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-7xl mx-auto">

            <div className="flex justify-center">
              <MupoEmotions
                emotion={emotion}
                hat={getCurrentHat()}
                glasses={getCurrentGlass()}
                isPetting={isPetting}
                onEmotionReset={() => setEmotion('default')}
                ref={mupoRef}
              />
            </div>

            <InteractionPanel
              onPet={handlePet}
              onFeed={handleFeed}
              onShop={handleShop}
              coins={coins}
            />
          </div>
        </main>

        <AnimatePresence>
          {isShopOpen && (
            <Shop
              items={shopItems}
              coins={coins}
              onBuy={handleBuy}
              onClose={() => setIsShopOpen(false)}
              ownedItems={ownedItems}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isInventoryOpen && (
            <Inventory
              items={getOwnedItems()}
              onEquip={handleEquip}
              onClose={() => setIsInventoryOpen(false)}
              equippedItems={equippedItems}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default MupoPage