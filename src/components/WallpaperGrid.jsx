"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Maximize2, X } from "lucide-react";
import Image from "next/image";

export default function WallpaperGrid() {
  const [wallpapers, setWallpapers] = useState([]);
  const [selectedWallpaper, setSelectedWallpaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    async function fetchBucketContents() {
      try {
        const response = await fetch("/api/list-wallpapers");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setWallpapers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBucketContents();
  }, []);

  if (loading) return<p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div ref={scrollContainerRef}>
      {wallpapers.map((wallpaper) => {
        return (
          <div
            key={wallpaper.ETag}
            className="relative group cursor-pointer overflow-hidden rounded-lg"
            onClick={() => setSelectedWallpaper(wallpaper)}
          >
            <Image
              src={`https://${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${wallpaper.Key}`}
              height={1000}
              width={1000}
              alt={wallpaper.Key}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  size="icon"
                  variant="secondary"
                  className="bg-gray-800 hover:bg-gray-700 text-gray-100"
                >
                  <Maximize2 className="h-4 w-4" />
                  <span className="sr-only">View {wallpaper.Key}</span>
                </Button>
              </div>
            </div>
          </div>
        );
      })}
      <Dialog
        open={!!selectedWallpaper}
        onOpenChange={() => setSelectedWallpaper(null)}
      >
        <DialogContent className="max-w-4xl bg-gray-800 text-gray-100 p-0 overflow-hidden">
          {selectedWallpaper && (
            <div className="relative">
              <Image
                src={`https://${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${selectedWallpaper.Key}`}
                height={1000}
                width={1000}
                alt={selectedWallpaper.Key}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-800 flex flex-col justify-end p-6">
                <DialogTitle className="text-2xl font-bold text-gray-100 mb-2">
                  {selectedWallpaper.Key}
                </DialogTitle>
              </div>
              <Button
                className="absolute top-2 right-2 bg-gray-800 hover:bg-gray-700 text-gray-100"
                size="icon"
                onClick={() => setSelectedWallpaper(null)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
