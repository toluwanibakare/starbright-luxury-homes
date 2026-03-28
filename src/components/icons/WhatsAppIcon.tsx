import * as React from "react";

export function WhatsAppIcon(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    const { className, alt, width, height, style, ...rest } = props;

    return (
        <img
            src="https://img.icons8.com/material-outlined/24/whatsapp--v1.png"
            alt={alt ?? "WhatsApp"}
            width={width ?? 24}
            height={height ?? 24}
            className={className}
            style={{ filter: "brightness(0) invert(1)", ...style }}
            {...rest}
        />
    );
}
