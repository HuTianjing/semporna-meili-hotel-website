import LocationGeo from '@/components/location/LocationGeo';
import LocationRoute from '@/components/location/LocationRoute';
import LocationSchedule from '@/components/location/LocationSchedule';
import LocationMap from '@/components/location/LocationMap';
import LocationChecklist from '@/components/location/LocationChecklist';

export default function LocationPage() {
  return (
    <main className="w-full flex-1">
      <LocationGeo />
      <LocationRoute />
      <LocationSchedule />
      <LocationMap />
      <LocationChecklist />
    </main>
  );
}
