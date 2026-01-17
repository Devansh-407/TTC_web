export function WhatsAppLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Green WhatsApp bubble with tail */}
      <path
        fill="#25D366"
        d="
          M12 1.8
          c-5.6 0-10.2 4.3-10.2 9.6
          0 1.9.6 3.7 1.6 5.2L2 22l5.6-1.5
          c1.4.7 3 .9 4.4.9
          5.6 0 10.2-4.3 10.2-9.6
          S17.6 1.8 12 1.8
          z
        "
      />

      {/* White phone handset */}
      <path
        fill="white"
        d="
          M16.5 14.2
          c-.4.4-1.9 1.6-4 .6
          -2.2-1-3.7-2.7-4.7-4.5
          -1-1.8-.1-3.1.3-3.5
          l1.1-.9
          c.3-.2.6-.2.8.1
          l1.3 2.1
          c.1.2.1.5-.1.7
          l-.6.7
          c-.1.1-.1.3 0 .5
          .4.8 1.4 1.9 2.3 2.4
          .1.1.3 0 .5-.1
          l.6-.6
          c.2-.2.4-.2.6-.1
          l2.3 1.2
          c.4.2.4.6.1.9
          l-.5.5
          z
        "
      />
    </svg>
  )
}
