

import LocationSubNav from '@/components/location/LocationSubNav';
import LocationCulture from '@/components/location/LocationCulture';
import LocationNeedToKnow from '@/components/location/LocationNeedToKnow';
import LocationTransport from '@/components/location/LocationTransport';

export default function LocationPage() {
  return (
    <main className="w-full flex-1">
      <LocationSubNav />
      <LocationCulture />
      <LocationNeedToKnow />
      <LocationTransport />
    </main>
  );
}
