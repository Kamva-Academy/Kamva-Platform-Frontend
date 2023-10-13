export type WebsiteAppearanceInitialStateType = {
  banners: BannerType[];
}

export type BannerType = {
  image: string;
  redirect_to: string;
}