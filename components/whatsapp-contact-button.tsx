"use client"

import { WhatsAppLogo } from "@/components/whatsapp-logo"
import { WHATSAPP_CONFIG, getWhatsAppUrl } from "@/config/whatsapp"

export function WhatsAppContactButton() {
  const handleClick = () => {
    // Get WhatsApp URL from configuration
    const whatsappUrl = getWhatsAppUrl()
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank')
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl z-50 flex items-center justify-center group border-2 border-white/20"
      aria-label={WHATSAPP_CONFIG.BUTTON_LABEL}
      title={WHATSAPP_CONFIG.BUTTON_LABEL}
    >
      <WhatsAppLogo className="w-8 h-8" />
      {WHATSAPP_CONFIG.SHOW_TOOLTIP && (
        <span className="absolute right-full mr-3 bg-white text-green-600 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg border border-green-100">
          Need Help?
        </span>
      )}
    </button>
  )
}

// Alternative Header Button Version (uncomment to use instead of floating button)
/*
export function WhatsAppHeaderButton() {
  const handleClick = () => {
    const whatsappUrl = getWhatsAppUrl()
    window.open(whatsappUrl, '_blank')
  }

  return (
    <button
      onClick={handleClick}
      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors duration-200"
      aria-label={WHATSAPP_CONFIG.BUTTON_LABEL}
    >
      <MessageCircle className="w-4 h-4" />
      <span>{WHATSAPP_CONFIG.BUTTON_LABEL}</span>
    </button>
  )
}
*/
