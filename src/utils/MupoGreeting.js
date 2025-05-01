export default function getGreetingFromCheckin({checkin, moodCheckin}) {
    const { sleep_quality, productivity } = checkin;
    const emotions = (moodCheckin.map((eachMood) => `${eachMood.emotion}, `)).join('')
    
  
    if (emotions.includes("Stressed") || emotions.includes("Overwhelmed")) {
      return { quote: "dont_be_too_harsh", emotion: "cry", effect: "hearts" };
    }
  
    if (emotions.includes("Lonely")) {
      return { quote: "im_here_for_you", emotion: "cry", effect: "hearts" };
    }
  
    if (emotions.includes("Peaceful") || emotions.includes("Calm")) {
      return { quote: "u_happi_me_happi", emotion: "default", effect: "hearts" };
    }
  
    if (emotions.includes("Motivated") || emotions.includes("Proud")) {
      return { quote: "you_can_do_it", emotion: "susuna", effect: "fire" };
    }
  
    if (sleep_quality < 5) {
      return { quote: "get_some_rest", emotion: "tired", effect: null };
    }
  
    if (productivity > 7) {
      return { quote: "i_love_you", emotion: "default", effect: "hearts" };
    }
  }