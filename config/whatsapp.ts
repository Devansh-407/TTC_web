// WhatsApp Contact Configuration
// UPDATE THESE VALUES FOR YOUR WEBSITE

export const WHATSAPP_CONFIG = {
  // OWNER WHATSAPP NUMBER (REQUIRED)
  // Format: International format without + or spaces
  // Example: 919876543210 for +91 98765 43210
  PHONE_NUMBER: "6396202262", // 🔧 UPDATE THIS WITH YOUR NUMBER
  
  // DEFAULT MESSAGE (OPTIONAL)
  // This message will be pre-filled when users click the WhatsApp button
  DEFAULT_MESSAGE: "",
  
  // BUTTON SETTINGS
  BUTTON_LABEL: "Contact on WhatsApp",
  BUTTON_POSITION: "bottom-right", // Options: "bottom-right", "top-right"
  
  // VISUAL SETTINGS
  SHOW_TOOLTIP: true, // Show "Contact on WhatsApp" tooltip on hover
  BUTTON_SIZE: "medium", // Options: "small", "medium", "large"
}

// Helper function to get WhatsApp URL
export const getWhatsAppUrl = (customMessage?: string) => {
  const message = customMessage || WHATSAPP_CONFIG.DEFAULT_MESSAGE
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_CONFIG.PHONE_NUMBER}?text=${encodedMessage}`
}
