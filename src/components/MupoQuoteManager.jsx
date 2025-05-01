import React from "react";
import { QuotesEffect } from "./MupoEffects";

export default function QuoteManager({ name }) {
  if (!name) return null;

  return (
    <QuotesEffect imageUrl={`/effects/${name}.png`} />
  );
}