import * as React from "react"

export function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M3 21l1.65-3.8A9 9 0 1 1 21 12a9.04 9.04 0 0 1-9 9 8.93 8.93 0 0 1-5.2-1.65L3 21z" />
            <path d="M16 14.5c0 0-1.8 1.5-2.2 1.5s-2.8-1.5-4.2-3c-1.4-1.4-3-4-3-4s1.5-2.2 1.5-2.2c.2-.2.5-.2.7 0l1.4 3c.2.2.2.5 0 .7l-1 1c0 0 1.4 3.4 4 4l1-1c.2-.2.5-.2.7 0l3 1.4c.2.2.2.5 0 .7z" />
        </svg>
    )
}
