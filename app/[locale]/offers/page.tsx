import OffersHeader from '@/components/offers/OffersHeader';
import OffersGroup from '@/components/offers/OffersGroup';
import OffersMember from '@/components/offers/OffersMember';
import OffersPromotional from '@/components/offers/OffersPromotional';
import OffersContactForm from '@/components/offers/OffersContactForm';

export default function OffersPage() {
  return (
    <main className="w-full flex-1">
      <OffersHeader />
      <OffersGroup />
      <OffersMember />
      <OffersPromotional />
      <OffersContactForm />
    </main>
  );
}
