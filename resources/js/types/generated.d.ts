declare namespace App.Data {
export type AuthorData = {
name: string;
email: string;
photo_url: string;
};
export type BreedData = {
name: string;
slug: string;
image: string;
};
export type BreedDataCollection = {
name: string;
};
export type BreedFullData = {
name: string;
slug: string;
image: string;
history_description: string | null;
size_description: string | null;
coat_description: string | null;
temperament_description: string | null;
lifestyle_description: string | null;
activities_description: string | null;
seo_title: string | null;
seo_description: string | null;
};
export type BreedOptionData = {
value: number;
label: string;
};
export type BreederData = {
id: number;
full_name: string;
avatar: string;
slug: string;
email: string;
phone: string | null;
phone_formatted: string | null;
address: string | null;
short_address: string | null;
member_since: string;
breeds: Array<App.Data.BreedDataCollection> | null;
is_breeder: boolean;
social_fb: string | null;
social_tiktok: string | null;
social_x: string | null;
social_ig: string | null;
website: string | null;
kennel_name: string | null;
company_address: string | null;
company_established_on_label: string | null;
company_logo: string | null;
};
export type BreederFullData = {
id: number;
full_name: string;
first_name: string;
avatar: string;
slug: string;
address: string | null;
is_breeder: boolean;
is_seller: boolean;
company_logo: string | null;
video: string | null;
member_since: string;
company_name: string | null;
company_address: string | null;
company_about: string | null;
company_email_address: string | null;
company_phone: string | null;
company_zip_code: string | null;
company_established_on: string | null;
company_established_on_label: string | null;
has_usda_registration: boolean | null;
website: string | null;
phone: string | null;
email: string;
social_fb: string | null;
social_tiktok: string | null;
social_x: string | null;
social_ig: string | null;
video_thumbnail: string | null;
description: string | null;
breeds: Array<any>;
gallery: Array<any>;
comments: Array<App.Data.CommentData> | null;
};
export type CityData = {
id: number;
name: string;
};
export type ColorData = {
value: number;
label: string;
};
export type CommentData = {
rating: number;
body: string;
reviewer: App.Data.UserCommentData | null;
review_on: string;
};
export type DiscountData = {
id: number;
name: string;
slug: string;
code: string | null;
start_date: string;
end_date: string | null;
trial_days: number;
account_type: string;
targeted_emails: string | null;
};
export type OptionData = {
value: number;
label: string;
};
export type PatternData = {
value: number;
label: string;
};
export type PlanData = {
id: number;
name: string;
price: string;
money_formatted: string;
savings_label: string | null;
trial_days: number;
interval: string;
type: string;
is_highlight: string;
plan_days: string;
logo: string | null;
interval_count: number;
details: Array<App.Data.PlanDetail> | null;
features: Array<string>;
badge_color: string | null;
badge_title: string | null;
};
export type PlanDetail = {
name: string;
count: number;
};
export type PlanFeature = {
name: string;
active: boolean;
};
export type PostCategoryData = {
name: string;
slug: string;
description: string;
is_visible: boolean;
};
export type PostData = {
id: number;
title: string;
slug: string;
excerpt: string | null;
banner_url: string;
like_count: number;
unlike_count: number;
content: string;
view_count: number;
published_at: string;
updated_at: string;
published_at_formatted: string;
author: App.Data.AuthorData;
category: App.Data.PostCategoryData;
comments: Array<App.Data.CommentData> | null;
};
export type PriceData = {
amount: number;
currency: string;
formatted: string;
};
export type PuppyCardData = {
id: number;
name: string;
slug: string;
image: string;
gender: string;
formatted_price: string;
is_favorite: boolean | null;
is_new: boolean | null;
age: string;
view_count: number;
breeds: Array<App.Data.BreedData>;
seller: App.Data.BreederData;
};
export type PuppyColorData = {
color: string;
name: string;
};
export type PuppyData = {
id: number;
name: string;
slug: string;
gender: string;
is_favorite: boolean | null;
price: number;
breeds: Array<App.Data.BreedData>;
image: string;
preview_images: Array<string>;
video: string | null;
description: string;
formatted_price: string;
patterns: string;
view_count: number;
is_new: boolean | null;
age: string;
seller: App.Data.BreederData;
puppy_colors: Array<App.Data.PuppyColorData> | null;
published_at: string | null;
features: Array<string> | null;
characteristics: Array<string> | null;
};
export type PuppyEditData = {
id: number;
name: string;
slug: string;
gender: string;
is_favorite: boolean | null;
price: number;
birth_date: string;
breeds: Array<App.Data.OptionData>;
preview_images: Array<string>;
description: string;
formatted_price: string;
patterns: string;
view_count: number;
age: string;
seller: App.Data.BreederData;
puppy_colors: Array<App.Data.OptionData> | null;
puppy_patterns: Array<App.Data.OptionData> | null;
video: string | null;
siblings: Array<App.Data.OptionData> | null;
published_at: string | null;
features: Array<string> | null;
characteristics: Array<string> | null;
has_vaccine: boolean;
has_health_certificate: boolean;
has_vet_exam: boolean;
has_delivery_included: boolean;
has_travel_ready: boolean;
};
export type PuppyPatternData = {
amount: number;
currency: string;
formatted: string;
};
export type PuppySiblingData = {
id: number;
name: string;
slug: string;
image: string;
gender: string;
};
export type RoleData = {
name: Array<string>;
};
export type SEOData = {
title: Array<string>;
description: string;
image: string;
url: string;
};
export type SavedSearchData = {
id: number;
name: string | null;
payload: Array<any>;
created_at: string;
};
export type SiblingData = {
value: number;
label: string;
};
export type StateData = {
id: number;
name: string;
};
export type SubscriptionData = {
id: number;
type: string;
status: string;
trial_ends_at: string | null;
ends_at: string | null;
created_at: string;
};
export type UserCommentData = {
full_name: string;
avatar: string;
initial_name: string;
};
export type UserData = {
id: number;
full_name: string;
first_name: string;
last_name: string;
avatar: string;
slug: string;
email: string;
phone: string | null;
city: string | null;
zip_code: string | null;
address: string | null;
short_address: string | null;
initial_name: string;
email_verified_at: string | null;
member_since: string;
profile_completed: boolean | null;
social_fb: string | null;
social_ig: string | null;
social_tiktok: string | null;
social_x: string | null;
roles: Array<string> | null;
enable_notification: boolean;
premium_plan: App.Data.SubscriptionData | null;
breeder_plan: App.Data.SubscriptionData | null;
breeds: Array<App.Data.OptionData>;
kennel_name: string | null;
company_city: string | null;
company_zip_code: string | null;
company_about: string | null;
company_phone: string | null;
company_state: string | null;
company_name: string | null;
company_email_address: string | null;
gmap_address: string | null;
company_address: string | null;
has_usda_registration: boolean;
company_address_formatted: string | null;
trial_ends_at: string | null;
company_established_on: string | null;
company_logo: string | null;
video: string | null;
gallery: Array<string>;
};
export type VideoData = {
title: string;
url: string;
video_thumbnail: string | null;
};
}
declare namespace App.Enum {
export type Gender = 'male' | 'female';
export type PuppyStatus = 'draft' | 'published';
}
