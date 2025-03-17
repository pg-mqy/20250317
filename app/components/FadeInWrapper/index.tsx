'use client';

import React, {useEffect, ReactNode} from 'react';

interface FadeInWrapperProps {
    children: React.ReactNode | React.ReactNode[];
}


export default function FadeInWrapper({children}: FadeInWrapperProps) {
    useEffect(() => {
        const divs = document.querySelectorAll('.fade-in-wrapper');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {threshold: 0.1});

        divs.forEach(div => observer.observe(div));

        return () => observer.disconnect();
    }, []);

    return (
        <div>
            {Array.isArray(children) && (children.map((child: ReactNode, index: number) => (
                    <div key={index} className="fade-in-wrapper">
                        {child}
                    </div>
                ))
            )}
        </div>
    );
}
