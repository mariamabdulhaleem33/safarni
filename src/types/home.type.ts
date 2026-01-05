export type TSectoinHeaderProps = {
    title:string;
    path:string;
}
interface BaseCardProps {
  image: string;
  title: string;
  rating: number;
  location: string;
}
export interface RecommendationCardProps extends BaseCardProps {
  variant: 'recommendation';
}
export interface TourCardProps extends BaseCardProps {
  variant: 'tour';
  price: number;
}