"use client"

import { useState } from "react"
import { CheckCircle, X, AlertTriangle } from "lucide-react";

const Alert = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    setIsVisible(false)
    if (onClose) onClose()
  }

  if (!isVisible) return null

  const colors = {
    success: {
      from: "from-green-600",
      to: "to-green-400",
      circle: "bg-green-700",
      iconBg: "bg-green-800",
      icon: <CheckCircle className="w-5 h-5 text-white" />
    },
    error: {
      from: "from-red-600",
      to: "to-red-400",
      circle: "bg-red-700",
      iconBg: "bg-red-800",
      icon: <X className="w-5 h-5 text-white" />
    },
    warning: {
      from: "from-yellow-600",
      to: "to-yellow-400",
      circle: "bg-yellow-700",
      iconBg: "bg-yellow-800",
      icon: <AlertTriangle className="w-5 h-5 text-white" />
    },
  }

  const theme = colors[type]

  return (
    <div className="absolute max-w-md mx-auto right-5 top-5">
      {/* Main alert container with gradient background */}
      <div className={`bg-gradient-to-r ${theme.from} ${theme.to} rounded-2xl p-6 pr-12 shadow-lg relative overflow-hidden`}>
        {/* Decorative circles in background */}
        <div className={`absolute -left-4 -bottom-2 w-8 h-8 ${theme.circle} rounded-full opacity-30`}></div>
        <div className={`absolute left-2 bottom-8 w-4 h-4 ${theme.circle} rounded-full opacity-40`}></div>
        <div className={`absolute left-8 bottom-2 w-6 h-6 ${theme.circle} rounded-full opacity-20`}></div>

        {/* Checkmark icon */}
        <div className={`absolute -left-3 -top-3 w-12 h-12 ${theme.iconBg} pl-2 pt-2 rounded-full flex items-center justify-center shadow-lg`}>
          {theme.icon}
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="ml-4">
          <h3 className="text-white text-xl font-semibold mb-1">
            {type === "success" && "Well done!"}
            {type === "error" && "Oops!"}
            {type === "warning" && "Perhatian!"}
          </h3>
          <p className="text-white text-sm opacity-90">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default Alert
