'use client';

import { useState } from 'react';
import { Camera, Image as ImageIcon, Square, Circle, Zap, Sparkles, Sun, Contrast } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const filters = [
  { name: 'Normal', value: 'none', icon: Square },
  { name: 'Bright', value: 'brightness(1.2)', icon: Sun },
  { name: 'Contrast', value: 'contrast(1.3)', icon: Contrast },
  { name: 'Vibrant', value: 'saturate(1.5)', icon: Sparkles },
  { name: 'Vintage', value: 'sepia(0.3) saturate(1.2)', icon: Circle },
  { name: 'Glow', value: 'brightness(1.1) contrast(1.1)', icon: Zap },
];

export default function CreatePage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [caption, setCaption] = useState('');
  const [brightness, setBrightness] = useState([100]);
  const [contrast, setContrast] = useState([100]);
  const [saturation, setSaturation] = useState([100]);

  // Mock current user
  const currentUser = {
    username: 'your_username',
    displayName: 'Your Name',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'
  };

  const handleImageSelect = () => {
    // Mock image selection - in real app, this would open file picker
    const sampleImages = [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=500&fit=crop',
    ];
    const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    setSelectedImage(randomImage);
  };

  const getImageStyle = () => {
    let filterString = selectedFilter;

    if (selectedFilter === 'none') {
      filterString = `brightness(${brightness[0]}%) contrast(${contrast[0]}%) saturate(${saturation[0]}%)`;
    }

    return {
      filter: filterString
    };
  };

  const handlePost = () => {
    console.log('Posting:', {
      image: selectedImage,
      filter: selectedFilter,
      caption,
      brightness: brightness[0],
      contrast: contrast[0],
      saturation: saturation[0]
    });

    // Reset form
    setSelectedImage(null);
    setSelectedFilter('none');
    setCaption('');
    setBrightness([100]);
    setContrast([100]);
    setSaturation([100]);

    alert('Post shared successfully! 🎉');
  };

  return (
    <MobileLayout>
      <div className="bg-background min-h-screen">
        {!selectedImage ? (
          // Image selection screen
          <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] px-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Create New Post</h1>
              <p className="text-muted-foreground">Share a photo to get started</p>
            </div>

            <div className="space-y-4 w-full max-w-sm">
              <Button
                onClick={handleImageSelect}
                className="w-full h-16 instagram-gradient text-white"
                size="lg"
              >
                <Camera className="w-6 h-6 mr-3" />
                Take Photo
              </Button>

              <Button
                onClick={handleImageSelect}
                variant="outline"
                className="w-full h-16"
                size="lg"
              >
                <ImageIcon className="w-6 h-6 mr-3" />
                Choose from Gallery
              </Button>
            </div>
          </div>
        ) : (
          // Edit and post screen
          <div className="space-y-4">
            {/* Image preview */}
            <div className="aspect-square bg-muted relative">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-full object-cover"
                style={getImageStyle()}
              />
            </div>

            {/* Filters */}
            <div className="px-4">
              <h3 className="font-semibold mb-3">Filters</h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setSelectedFilter(filter.value)}
                    className={`flex flex-col items-center gap-1 min-w-[60px] p-2 rounded-lg transition-colors ${
                      selectedFilter === filter.value
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    <filter.icon className="w-4 h-4" />
                    <span className="text-xs">{filter.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Adjustment sliders */}
            {selectedFilter === 'none' && (
              <div className="px-4 space-y-4">
                <h3 className="font-semibold">Adjustments</h3>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Brightness</span>
                      <span className="text-sm text-muted-foreground">{brightness[0]}%</span>
                    </div>
                    <Slider
                      value={brightness}
                      onValueChange={setBrightness}
                      max={200}
                      min={50}
                      step={1}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Contrast</span>
                      <span className="text-sm text-muted-foreground">{contrast[0]}%</span>
                    </div>
                    <Slider
                      value={contrast}
                      onValueChange={setContrast}
                      max={200}
                      min={50}
                      step={1}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Saturation</span>
                      <span className="text-sm text-muted-foreground">{saturation[0]}%</span>
                    </div>
                    <Slider
                      value={saturation}
                      onValueChange={setSaturation}
                      max={200}
                      min={0}
                      step={1}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Caption */}
            <div className="px-4">
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8 mt-1">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.displayName} />
                  <AvatarFallback>{currentUser.displayName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-semibold text-sm mb-1">{currentUser.username}</div>
                  <Textarea
                    placeholder="Write a caption..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="min-h-[100px] resize-none border-none p-0 focus-visible:ring-0"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-4 pb-6 flex gap-3">
              <Button
                variant="outline"
                onClick={() => setSelectedImage(null)}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handlePost}
                className="flex-1 instagram-gradient text-white"
              >
                Share
              </Button>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}