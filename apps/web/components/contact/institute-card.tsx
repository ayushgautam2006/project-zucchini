import { instituteInfo } from "@/config/contact";

export default function InstituteInfoCard() {
  return (
    <div className="about-card-body-2 p-8 sm:p-12 w-full max-w-3xl">
      <div className="space-y-10">
        <div className="space-y-2 font-inria">
          <p className="text-sm font-semibold text-white/50 uppercase tracking-widest">
            Legal Name
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-white uppercase">
            {instituteInfo.name}
          </h3>
        </div>
        <div className="space-y-2 font-inria">
          <p className="text-sm font-semibold text-white/50 uppercase tracking-widest">
            Legal Address
          </p>
          <p className="text-lg sm:text-xl font-semibold text-white uppercase leading-relaxed">
            {instituteInfo.location}
          </p>
        </div>
      </div>
    </div>
  );
}
