export type WebsiteAppearanceInitialStateType = {
  banners: BannerType[];
}

export type BannerType = {
  desktop_image: string;
  mobile_image: string;
  redirect_to: string;
}