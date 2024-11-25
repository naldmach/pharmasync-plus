// src/assets/logo.tsx
import React from 'react';

export const Logo = ({ className = "" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 500 500"
      className={className}
    >
      {/* Background Circle */}
      <circle cx="250" cy="250" r="240" fill="#ffffff" stroke="#2563eb" strokeWidth="8"/>
      
      {/* Sync Arrows */}
      <path d="M250 100 A150 150 0 0 1 400 250" fill="none" stroke="#2563eb" strokeWidth="25" strokeLinecap="round"/>
      <path d="M250 400 A150 150 0 0 1 100 250" fill="none" stroke="#2563eb" strokeWidth="25" strokeLinecap="round"/>
      
      {/* Arrow Heads */}
      <polygon points="385,220 415,250 385,280" fill="#2563eb"/>
      <polygon points="115,220 85,250 115,280" fill="#2563eb"/>
      
      {/* Cross Symbol */}
      <rect x="225" y="175" width="50" height="150" rx="10" fill="#2563eb"/>
      <rect x="175" y="225" width="150" height="50" rx="10" fill="#2563eb"/>
      
      {/* Plus Text */}
      <text x="380" y="380" fontFamily="Arial, sans-serif" fontSize="60" fontWeight="bold" fill="#2563eb">+</text>
      
      {/* Inner Circle */}
      <circle cx="250" cy="250" r="35" fill="#ffffff" stroke="#2563eb" strokeWidth="8"/>
    </svg>
  );
};