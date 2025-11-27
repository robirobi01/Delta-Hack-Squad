import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fill?: boolean;
    priority?: boolean;
}

export default function Image({ src, alt, className, width, height, fill, priority, ...props }: ImageProps) {
    // Handle fill prop
    const fillStyle: React.CSSProperties = fill
        ? { position: 'absolute', height: '100%', width: '100%', inset: 0, objectFit: 'cover' }
        : {};

    // Handle width/height if not fill
    const sizeProps = fill ? {} : { width, height };

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            style={{ ...fillStyle, ...props.style }}
            {...sizeProps}
            {...props}
        />
    );
}
