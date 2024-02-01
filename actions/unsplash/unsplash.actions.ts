import { ImagesStorage } from "@/lib/images-store";
// import { createApi } from "unsplash-js";

export type UnsplashImgType = typeof ImagesStorage;
/**
 *
 * @returns UnsplashImgType
 * @description uncomment the fetch function when you are ready to use in production mode
 * according with your subscription plan
 */

// const Unsplash = createApi({
//   accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!,
//   fetch: fetch,
// });
export const fetchImages = async (): Promise<{ response: UnsplashImgType }> => {
  return new Promise((res, req) => res({ response: ImagesStorage }));

  // return await Unsplash.photos
  //   .getRandom({
  //     collectionIds: ["317099"],
  //     count: 9,
  //   })
  //   .catch(() => {
  //     console.log("Error fetching images");
  //   });
};
