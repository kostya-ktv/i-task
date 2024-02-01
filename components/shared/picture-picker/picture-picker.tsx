"use client";

import { cn } from "@/lib/utils";
import { CheckIcon, LinkIcon, Loader2Icon } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import styles from "./picture-picker.module.scss";
import Link from "next/link";
import { useUnsplashImages } from "@/hooks";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui";

const PicturePickerSkeleton = () => (
  <div className={styles.picturePickerSkeletonBox}>
    <Loader2Icon className={styles.picturePickerSkeletonBoxIcon} />
  </div>
);
interface Props {
  pending?: boolean;
  onSelectPicture: (img: string) => void;
}

export const PicturePicker: React.FC<Props> = (props) => {
  const { pending, onSelectPicture } = props;
  const { images, isLoading } = useUnsplashImages();
  const [selectedImageID, setSelectedImageID] = useState(null);

  const handleSelectImage = useCallback(
    (image?: any) => {
      if (!pending) {
        setSelectedImageID(image.id);
        onSelectPicture(
          `${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`
        );
      }
    },
    [pending, onSelectPicture]
  );

  return isLoading ? (
    <PicturePickerSkeleton />
  ) : (
    <div className={styles.picturePicker}>
      {images.map((image: any, index) => (
        <div
          key={image?.id || index}
          onClick={() => handleSelectImage(image)}
          className={cn(
            styles.picturePickerImgBox,
            "group",
            pending && styles.picturePickerImgBoxPending
          )}
        >
          <Image fill alt="unsplash" src={image.urls.thumb} />
          {selectedImageID === image.id && (
            <div className={styles.picturePickerImgBoxSelected}>
              <CheckIcon />
            </div>
          )}
          <div
            className={cn(
              styles.picturePickerImgBoxLink,
              "group-hover:opacity-100"
            )}
          >
            {image.user.name}
            <Link className="w-min" href={image.links.html} target="_blank">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <LinkIcon className="h-3 w-3 hover:text-black" />
                  </TooltipTrigger>
                  <TooltipContent>{image.links.html}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
