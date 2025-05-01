import { FloatHearts, BurningFireEffect, AngryEffect } from "./MupoEffects";

export default function EffectManager({ name, onComplete }) {
    switch (name) {
      case "hearts":
        return <FloatHearts onComplete={onComplete}/>;
      case "fire":
        return <BurningFireEffect onComplete={onComplete}/>;
      case "tornado":
        return <AngryEffect onComplete={onComplete}/>;
      default:
        return null;
    }
}