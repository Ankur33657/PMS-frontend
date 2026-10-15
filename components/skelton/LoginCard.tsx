import { Skeleton } from "@/components/ui/skeleton";

const LoginCardSkeleton = () => {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-300 bg-white">

 
      <div className="flex flex-col gap-5 p-5">

        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-14" />
        </div>

        <Skeleton className="h-4 w-72" />

        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-8 w-full rounded-xl" />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-32" />
          </div>

          <Skeleton className="h-8 w-full rounded-xl" />
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-gray-200 p-5">

        <Skeleton className="h-7 w-full rounded-xl" />

        <Skeleton className="h-7 w-full rounded-xl" />

      </div>
    </div>
  );
};

export default LoginCardSkeleton;