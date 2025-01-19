"use client"; // Ensure this runs on the client side

import oak_shelf from "@/public/assets/shelves/0.png";
import book from "@/public/assets/books/0.png";

import React, { useEffect, useRef } from "react";

interface ShelfProps {
  books: { books?: { book_name?: string } }[];
}

export default function Shelf({ books }: ShelfProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Ensure crisp pixel rendering
      ctx.imageSmoothingEnabled = false;

      // Load and draw Image A
      const imageA = new Image();
      imageA.src = oak_shelf.src; // Path to Image A
      imageA.onload = () => {
        const scaleFactor = canvas.width / imageA.width;
        const scaledHeight = imageA.height * scaleFactor;

        // Add drop shadow
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)"; // Shadow color (black with 50% opacity)
        ctx.shadowBlur = 4; // Blur radius for the shadow
        ctx.shadowOffsetX = 5; // Horizontal offset
        ctx.shadowOffsetY = 5; // Vertical offset

        // Draw Image A scaled to fit canvas width
        ctx.drawImage(imageA, 0, 0, canvas.width, scaledHeight);

        // Reset shadow for subsequent drawing operations
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Load and draw Image B
        const imageB = new Image();
        imageB.src = book.src; // Path to Image B
        imageB.onload = () => {
          const scaledBHeight = imageB.height * scaleFactor;

          for (let i = 0; i < books.length; i++) {
            ctx.drawImage(
              imageB,
              i * 4 * scaleFactor, // Scale x position
              0 * scaleFactor, // Scale y position
              imageB.width * scaleFactor, // Scale width
              scaledBHeight, // Scale height
            );
          }
        };
      };
    }
  }, []);

  return (
    <div className="w-full">
      <canvas ref={canvasRef} className="w-full p-8" height={200} />
      <ul>
        {books.map((record, index: number) => (
          <li key={index}>
            {record.books?.book_name || "Book name not found"}
          </li>
        ))}
      </ul>
    </div>
  );
}
