import { useState } from 'react';

const allPhotos = [
  '/photo1.jpeg', '/photo2.jpeg', '/photo3.jpeg', '/photo4.jpeg',
  '/photo5.jpeg', '/photo6.jpeg', '/photo7.jpeg', '/photo8.jpeg',
  '/photo9.jpeg', '/photo10.jpeg', '/photo11.jpeg', '/photo12.jpeg',
  '/photo13.jpeg', '/photo14.jpeg', '/photo15.jpeg', '/photo16.jpeg',
  '/photo17.jpeg', '/photo18.jpeg', '/photo19.jpeg', '/photo20.jpeg',
  '/photo21.jpeg', '/photo22.jpeg', '/photo23.jpeg', '/photo24.jpeg',
  '/photo25.jpeg', '/photo26.jpeg', '/photo27.jpeg', '/photo28.jpeg',
  '/photo29.jpeg', '/photo30.jpeg', '/photo31.jpeg', '/photo32.jpeg',
  '/friend-photo.jpeg',
];

const repeated = [...allPhotos, ...allPhotos, ...allPhotos].slice(0, 66);

interface PhotoBackgroundProps {
  onPhotoClick: (src: string) => void;
}

export default function PhotoBackground({ onPhotoClick }: PhotoBackgroundProps) {
  return (
    <>
      <div
        className="fixed inset-0 z-0"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(11, 1fr)',
          gridAutoRows: '1fr',
          gap: '2px',
          overflow: 'hidden',
        }}
      >
        {repeated.map((src, i) => (
          <div
            key={i}
            onClick={() => onPhotoClick(src)}
            style={{
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative',
            }}
            className="group"
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.3s ease, filter 0.3s ease',
              }}
              className="group-hover:scale-110 group-hover:brightness-110"
            />
          </div>
        ))}
      </div>

      {/* warm tinted overlay so the jar is readable */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background: 'rgba(255, 235, 195, 0.42)',
          backdropFilter: 'blur(0.5px)',
        }}
      />
    </>
  );
}
